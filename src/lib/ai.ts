import { supabase } from "./supabase";

export type GenerationKind = "post" | "ad" | "email" | "calendar";

export interface BusinessProfile {
  businessName: string;
  industry: string;
  audience: string;
  goal: string;
}

export const GENERATION_KINDS: {
  id: GenerationKind;
  emoji: string;
  label: string;
  description: string;
}[] = [
  {
    id: "post",
    emoji: "📱",
    label: "Social media poszt",
    description: "3 posztvariáció Facebookra/Instagramra",
  },
  {
    id: "ad",
    emoji: "🎯",
    label: "Hirdetésszöveg",
    description: "Facebook hirdetés: címsor + szöveg + CTA",
  },
  {
    id: "email",
    emoji: "✉️",
    label: "E-mail / hírlevél",
    description: "Hírlevél tárgymező-variációkkal",
  },
  {
    id: "calendar",
    emoji: "🗓️",
    label: "Havi tartalomnaptár",
    description: "8 posztötlet a hónapra, típusonként",
  },
];

/**
 * AI-szöveg generálása. Ha van Supabase backend, az `ai-generate` edge
 * functiont hívja (ami szerveroldalon hívja a Claude API-t); enélkül
 * demó-tartalmat ad vissza, hogy az app backend nélkül is kipróbálható legyen.
 */
export async function generate(
  kind: GenerationKind,
  profile: BusinessProfile,
  extra: string
): Promise<string> {
  if (supabase) {
    const { data, error } = await supabase.functions.invoke("ai-generate", {
      body: { kind, profile, extra },
    });
    if (error) throw new Error(error.message);
    return data.text as string;
  }
  await new Promise((r) => setTimeout(r, 900));
  return mockGenerate(kind, profile);
}

function mockGenerate(kind: GenerationKind, p: BusinessProfile): string {
  const name = p.businessName || "a vállalkozásod";
  switch (kind) {
    case "post":
      return `🔧 DEMÓ MÓD — így néz ki egy generált eredmény (élesben a Claude AI írja, a te adataiddal):\n\n1️⃣ ÉRTÉKADÓ POSZT\n"Tudtad? A(z) ${p.industry || "szakma"} területén a legtöbb ügyfél az első benyomás alapján dönt. Íme 3 dolog, amit ${name} minden ügyfélnél másképp csinál… 👇"\n\n2️⃣ KULISSZATITOK\n"Ma reggel így indult a nap nálunk… [fotó a munkáról] Ezért szeretjük, amit csinálunk. 💙"\n\n3️⃣ AJÁNLAT\n"${p.goal || "Új szolgáltatásunk"} — most külön kedvezménnyel a követőinknek. Írj üzenetet, és mesélünk! 📩"`;
    case "ad":
      return `🔧 DEMÓ MÓD — minta hirdetésszöveg:\n\nCÍMSOR: ${p.audience || "Vállalkozóknak"}: elég volt a(z) [probléma]-ból?\n\nSZÖVEG: A(z) ${name} pontosan tudja, mivel küzdesz. [Konkrét eredmény, számokkal.] Több száz elégedett ügyfél után bátran ígérjük: [fő ígéret].\n\nCTA: Kérj ingyenes konzultációt még ma! 👉`;
    case "email":
      return `🔧 DEMÓ MÓD — minta hírlevél:\n\nTÁRGYMEZŐ-VARIÁCIÓK:\n• A hiba, amit a legtöbb ${p.audience || "vevő"} elkövet\n• Ezt kevesen tudják a(z) ${p.industry || "szakmáról"}…\n• 3 perc, ami pénzt hoz neked\n\nLEVÉL:\nSzia [Keresztnév]!\n\n[Személyes felütés a szakterületedről…] A lényeg: [1 konkrét, hasznos tipp].\n\nHa ebben segítség kell, válaszolj erre a levélre — ${name} szívesen segít.\n\nÜdv,\n[Aláírás]`;
    case "calendar":
      return `🔧 DEMÓ MÓD — minta tartalomnaptár (8 poszt):\n\n1. hét\n• HÉ: Értékadó — "3 tipp ${p.audience || "az ügyfeleknek"}"\n• CSÜ: Kulisszatitok — egy munkanap képekben\n\n2. hét\n• HÉ: Vevői vélemény + sztori\n• CSÜ: Értékadó — gyakori hiba és megoldása\n\n3. hét\n• HÉ: AJÁNLAT — ${p.goal || "fő szolgáltatás"} bemutatása CTA-val\n• CSÜ: Kulisszatitok — a csapat/az eszközök\n\n4. hét\n• HÉ: Értékadó — mini útmutató\n• CSÜ: Közösségi kérdés — "Ti mit gondoltok…?"`;
  }
}
