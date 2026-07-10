const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-webhook-secret",
};

type LeadPayload = {
  id?: number;
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

type WebhookPayload = {
  type?: string;
  table?: string;
  record?: LeadPayload;
};

function escapeHtml(value: unknown) {
  return String(value ?? "").replace(/</g, "&lt;");
}

function wrapEmailDocument(title: string, body: string) {
  return `<!DOCTYPE html>
<html lang="sv">
<head>
<meta charset="utf-8">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
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
    ["Adress", lead.address || "—"],
    ["Ort", lead.city || "—"],
    ["Postnummer", lead.postal_code || "—"],
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
  <p style="margin:0 0 8px;color:#333;">Med vänliga hälsningar,<br><strong>Alfa Tömning Göteborg</strong></p>
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
    throw new Error("RESEND_API_KEY missing");
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
    throw new Error(`Resend error: ${await res.text()}`);
  }
}

function parseLead(body: unknown): LeadPayload | null {
  if (!body || typeof body !== "object") return null;

  const payload = body as WebhookPayload & LeadPayload;
  if (payload.record && typeof payload.record === "object") {
    return payload.record;
  }
  if (payload.name && payload.email) {
    return payload;
  }
  return null;
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
    const lead = parseLead(await req.json());
    if (!lead?.email || !lead?.name) {
      return new Response(JSON.stringify({ error: "Invalid lead payload" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const notifyEmail = Deno.env.get("NOTIFY_EMAIL");
    if (!notifyEmail) {
      throw new Error("NOTIFY_EMAIL missing – állítsd be: info@tomninggoteborg.se");
    }

    const customerEmail = String(lead.email).trim();
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

    await sendResendEmail(
      [customerEmail],
      "Tack för din offertförfrågan – Alfa Tömning Göteborg",
      buildAutoReplyHtml(lead)
    );

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("notify-lead failed:", message);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
