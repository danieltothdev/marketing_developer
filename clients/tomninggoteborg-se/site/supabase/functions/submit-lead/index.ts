import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type LeadPayload = {
  site_domain?: string;
  name?: string;
  address?: string;
  city?: string;
  postal_code?: string;
  phone?: string;
  email?: string;
  service?: string;
  preferred_date?: string;
  message?: string;
};

function requiredFields(lead: LeadPayload) {
  return ["name", "address", "city", "postal_code", "phone", "email"] as const;
}

function escapeHtml(value: unknown) {
  return String(value ?? "").replace(/</g, "&lt;");
}

function wrapEmailDocument(title: string, body: string) {
  return `<!DOCTYPE html>
<html lang="sv">
<head>
<meta charset="utf-8">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:24px;background:#f5f5f5;font-family:Inter,Arial,sans-serif;">
${body}
</body>
</html>`;
}

function buildEmailHtml(lead: LeadPayload) {
  const rows = [
    ["Namn", lead.name],
    ["Telefon", lead.phone],
    ["Adress", lead.address],
    ["Ort", lead.city],
    ["Postnummer", lead.postal_code],
    ["Tjänst", lead.service || "—"],
    ["Önskat datum", lead.preferred_date || "—"],
    ["Meddelande", lead.message || "—"],
    ["E-post", lead.email],
    ["Webbplats", lead.site_domain || "—"],
  ];

  const body = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;border:1px solid #eee;font-weight:600">${label}</td><td style="padding:8px 12px;border:1px solid #eee">${escapeHtml(value)}</td></tr>`
    )
    .join("");

  return wrapEmailDocument(
    "Ny offertförfrågan",
    `<div style="max-width:640px;margin:0 auto;background:#fff;padding:24px;border-radius:8px;">
<h2 style="margin:0 0 16px;color:#111;">Ny offertförfrågan</h2>
<table style="border-collapse:collapse;width:100%;color:#111;">${body}</table>
</div>`
  );
}

function buildAutoReplyHtml(lead: LeadPayload) {
  const firstName = escapeHtml(String(lead.name ?? "").trim().split(/\s+/)[0] || "där");
  const serviceLine = lead.service
    ? `<p style="margin:0 0 16px;color:#333;">Vi har tagit emot din förfrågan om <strong>${escapeHtml(lead.service)}</strong>.</p>`
    : `<p style="margin:0 0 16px;color:#333;">Vi har tagit emot din offertförfrågan.</p>`;

  return wrapEmailDocument(
    "Tack för din offertförfrågan",
    `<div style="max-width:560px;margin:0 auto;background:#fff;padding:24px;border-radius:8px;color:#111;line-height:1.6;">
  <p style="margin:0 0 16px;">Hej ${firstName},</p>
  ${serviceLine}
  <p style="margin:0 0 16px;color:#333;">Tack för att du kontaktade <strong>Alfa Tömning Göteborg</strong>. Vi återkommer inom kort med ett prisförslag.</p>
  <p style="margin:0 0 16px;color:#333;">Behöver du snabb hjälp? Ring oss på <a href="tel:+46707293986" style="color:#111;font-weight:700;">070 729 39 86</a>.</p>
  <p style="margin:0 0 8px;color:#333;">Med vänliga hälsningar,<br><strong>Alfa Tömning Göteborg</strong><br><a href="mailto:info@tomninggoteborg.se" style="color:#111;">info@tomninggoteborg.se</a></p>
  <p style="margin:24px 0 0;font-size:12px;color:#666;">Detta är ett automatiskt svar – du behöver inte svara på detta mejl.</p>
</div>`
  );
}

async function sendResendEmail(
  to: string[],
  subject: string,
  html: string,
  options: { replyTo?: string } = {}
) {
  const resendKey = Deno.env.get("RESEND_API_KEY");
  const fromEmail = Deno.env.get("NOTIFY_FROM") || "Offert <info@tomninggoteborg.se>";

  if (!resendKey) {
    console.warn("Email skipped: RESEND_API_KEY missing");
    return;
  }

  const payload: Record<string, unknown> = { from: fromEmail, to, subject, html };
  if (options.replyTo) {
    payload.reply_to = options.replyTo;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const detail = await res.text();
    console.error("Resend error:", detail);
    throw new Error("Kunde inte skicka e-post");
  }
}

async function sendNotificationEmail(lead: LeadPayload) {
  const notifyEmail = Deno.env.get("NOTIFY_EMAIL");
  if (!notifyEmail) {
    console.warn("Email notification skipped: NOTIFY_EMAIL missing");
    return;
  }

  const customerEmail = String(lead.email ?? "").trim();
  const customerName = String(lead.name ?? "").trim();
  const replyTo =
    customerEmail && customerName
      ? `${customerName} <${customerEmail}>`
      : customerEmail || undefined;

  await sendResendEmail(
    [notifyEmail],
    `Ny offertförfrågan – ${lead.name} (${lead.city || "Göteborg"})`,
    buildEmailHtml(lead),
    { replyTo }
  );
}

async function sendAutoReplyEmail(lead: LeadPayload) {
  const customerEmail = String(lead.email ?? "").trim();
  if (!customerEmail) return;

  await sendResendEmail(
    [customerEmail],
    "Tack för din offertförfrågan – Alfa Tömning Göteborg",
    buildAutoReplyHtml(lead)
  );
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const lead = (await req.json()) as LeadPayload;

    for (const field of requiredFields(lead)) {
      if (!String(lead[field] ?? "").trim()) {
        return new Response(JSON.stringify({ error: `Saknar fält: ${field}` }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const row = {
      site_domain: lead.site_domain || "tomninggoteborg.se",
      name: String(lead.name).trim(),
      address: String(lead.address).trim(),
      city: String(lead.city).trim(),
      postal_code: String(lead.postal_code).trim(),
      phone: String(lead.phone).trim(),
      email: String(lead.email).trim(),
      service: lead.service ? String(lead.service).trim() : null,
      preferred_date: lead.preferred_date ? String(lead.preferred_date).trim() : null,
      message: lead.message ? String(lead.message).trim() : null,
    };

    const { error } = await supabase.from("leads").insert(row);
    if (error) throw error;

    try {
      await sendNotificationEmail(row);
    } catch (emailErr) {
      console.error("Email notification failed after lead insert:", emailErr);
    }

    try {
      await sendAutoReplyEmail(row);
    } catch (replyErr) {
      console.error("Auto-reply email failed after lead insert:", replyErr);
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
