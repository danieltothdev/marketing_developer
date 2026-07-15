export type PlanId = "free" | "starter" | "pro" | "business";

export interface Plan {
  id: PlanId;
  name: string;
  priceHuf: number;
  priceLabel: string;
  monthlyCredits: number; // AI-generálások száma havonta (-1 = korlátlan)
  tagline: string;
  features: string[];
  highlighted?: boolean;
}

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Ingyenes",
    priceHuf: 0,
    priceLabel: "0 Ft / hó",
    monthlyCredits: 10,
    tagline: "Ismerkedj meg az alapokkal",
    features: [
      "3 ingyenes lecke az Akadémián",
      "10 AI-generálás havonta",
      "Marketing audit kitöltése",
      "Alap automatizációs sablonok",
    ],
  },
  {
    id: "starter",
    name: "Starter",
    priceHuf: 4990,
    priceLabel: "4 990 Ft / hó",
    monthlyCredits: 100,
    tagline: "A tudatos vállalkozóknak",
    features: [
      "Teljes Akadémia hozzáférés",
      "100 AI-kredit havonta",
      "Összes automatizációs sablon",
      "Havi tartalomnaptár-generátor",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    priceHuf: 14990,
    priceLabel: "14 990 Ft / hó",
    monthlyCredits: -1,
    tagline: "A növekedésre gyúró KKV-knak",
    highlighted: true,
    features: [
      "Minden a Starterből",
      "Korlátlan AI-generálás",
      "Részletes AI marketing audit + akcióterv",
      "Kampánysablonok és e-mail szekvenciák",
      "Elsőbbségi támogatás",
    ],
  },
  {
    id: "business",
    name: "Business",
    priceHuf: 39990,
    priceLabel: "39 990 Ft / hó",
    monthlyCredits: -1,
    tagline: "Csapatoknak, teljes kiszolgálással",
    features: [
      "Minden a Próból",
      "5 felhasználói fiók",
      "Havi 1 óra személyes konzultáció",
      "Egyedi automatizáció-tervezés",
      "Zárt mastermind közösség",
    ],
  },
];

export function getPlan(id: PlanId): Plan {
  return PLANS.find((p) => p.id === id) ?? PLANS[0];
}
