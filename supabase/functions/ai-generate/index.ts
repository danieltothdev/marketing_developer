// Supabase Edge Function: ai-generate
// A mobilapp AI Copilot funkciója hívja. A Claude API-kulcs csak itt,
// szerveroldalon él — a kliensbe soha nem kerül be.
//
// Telepítés:
//   supabase secrets set ANTHROPIC_API_KEY=sk-ant-...
//   supabase functions deploy ai-generate

import Anthropic from "npm:@anthropic-ai/sdk";

type GenerationKind = "post" | "ad" | "email" | "calendar";

interface BusinessProfile {
  businessName: string;
  industry: string;
  audience: string;
  goal: string;
}

const client = new Anthropic({
  apiKey: Deno.env.get("ANTHROPIC_API_KEY"),
});

const SYSTEM_PROMPT = `Te egy tapasztalt magyar marketingszakértő vagy, aki kis- és középvállalkozásoknak ír tartalmat.
Stílusod: közvetlen, gyakorlatias, magyar piacra szabott — kerülöd az üres marketinges közhelyeket és a tükörfordítás-ízű megfogalmazásokat.
Mindig magyarul válaszolsz. A kimenet legyen azonnal felhasználható: a felhasználó másolja és publikálja.
Ne magyarázd a munkádat, csak add át a kész tartalmat, jól tagolva.`;

function buildPrompt(kind: GenerationKind, p: BusinessProfile, extra: string): string {
  const base = `Vállalkozás: ${p.businessName}
Iparág / szolgáltatás: ${p.industry}
Célközönség: ${p.audience}
Cél: ${p.goal}${extra ? `\nEgyéb kérés: ${extra}` : ""}`;

  switch (kind) {
    case "post":
      return `${base}\n\nÍrj 3 különböző social media posztot (Facebook/Instagram): egy értékadót, egy kulisszatitkot és egy ajánlat-posztot CTA-val. Mindegyikhez adj emoji-javaslatot és 3-5 releváns hashtaget.`;
    case "ad":
      return `${base}\n\nÍrj egy Facebook-hirdetést: 3 címsor-variáció, elsődleges szöveg (kb. 100-150 szó, konkrét, előnyközpontú), és CTA-javaslat. Jelöld a részeket.`;
    case "email":
      return `${base}\n\nÍrj egy hírlevelet: 3 tárgymező-variáció, majd a levél szövege (barátságos, értékadó, a végén puha CTA). Használj [Keresztnév] behelyettesítőt.`;
    case "calendar":
      return `${base}\n\nKészíts havi tartalomnaptárat 8 poszttal (heti 2), a 3:1 értékadó/ajánlat arány szerint. Minden poszthoz: hét + nap, tartalomtípus, konkrét téma és 1 mondatos hook-javaslat.`;
  }
}

Deno.serve(async (req: Request) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
  };
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { kind, profile, extra } = (await req.json()) as {
      kind: GenerationKind;
      profile: BusinessProfile;
      extra?: string;
    };

    const response = await client.messages.create({
      model: "claude-opus-4-8",
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: buildPrompt(kind, profile, extra ?? "") }],
    });

    const text = response.content
      .filter((block) => block.type === "text")
      .map((block) => (block as { text: string }).text)
      .join("\n");

    return new Response(JSON.stringify({ text }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Ismeretlen hiba";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
