export interface AuditQuestion {
  id: string;
  question: string;
  options: { label: string; score: number }[];
}

export const AUDIT_QUESTIONS: AuditQuestion[] = [
  {
    id: "celkozonseg",
    question: "Mennyire pontosan tudod megfogalmazni, ki az ideális vevőd?",
    options: [
      { label: "Nem gondolkodtam még rajta", score: 0 },
      { label: "Nagyjából tudom", score: 1 },
      { label: "Pontosan le tudom írni (kor, probléma, motiváció)", score: 2 },
    ],
  },
  {
    id: "online-jelenlet",
    question: "Milyen az online jelenléted?",
    options: [
      { label: "Nincs weboldal / elavult", score: 0 },
      { label: "Van weboldal vagy aktív social oldal", score: 1 },
      { label: "Weboldal + aktív social + Google Business Profile", score: 2 },
    ],
  },
  {
    id: "tartalom",
    question: "Milyen rendszerességgel készítesz tartalmat (poszt, hírlevél, blog)?",
    options: [
      { label: "Szinte soha", score: 0 },
      { label: "Alkalomszerűen, amikor van idő", score: 1 },
      { label: "Tervezetten, heti rendszerességgel", score: 2 },
    ],
  },
  {
    id: "lista",
    question: "Építesz-e e-mail listát vagy vevő-adatbázist?",
    options: [
      { label: "Nem", score: 0 },
      { label: "Gyűjtöm a címeket, de nem használom", score: 1 },
      { label: "Igen, és rendszeresen küldök is rá", score: 2 },
    ],
  },
  {
    id: "hirdetes",
    question: "Hirdetsz-e fizetett csatornákon (Google, Facebook)?",
    options: [
      { label: "Nem, még soha", score: 0 },
      { label: "Próbáltam, de nem mértem az eredményét", score: 1 },
      { label: "Igen, és követem a megtérülést", score: 2 },
    ],
  },
  {
    id: "meres",
    question: "Tudod-e, honnan jönnek az új vevőid?",
    options: [
      { label: "Nem tudom pontosan", score: 0 },
      { label: "Sejtem, de nem mérem", score: 1 },
      { label: "Mérem és tudom számokkal", score: 2 },
    ],
  },
  {
    id: "automatizacio",
    question: "Használsz-e automatizációt (automata e-mail, emlékeztetők, AI)?",
    options: [
      { label: "Semmit", score: 0 },
      { label: "1-2 apróságot", score: 1 },
      { label: "Több folyamatom is automatizált", score: 2 },
    ],
  },
  {
    id: "ido",
    question: "Mennyi időt tudsz hetente a marketingre szánni?",
    options: [
      { label: "Kevesebb mint 1 órát", score: 0 },
      { label: "1-3 órát", score: 1 },
      { label: "3+ órát vagy van rá emberem", score: 2 },
    ],
  },
];

export interface AuditBand {
  min: number;
  max: number;
  title: string;
  summary: string;
  actions: string[];
}

export const AUDIT_BANDS: AuditBand[] = [
  {
    min: 0,
    max: 5,
    title: "Alapozó szakasz 🌱",
    summary:
      "A marketinged jelenleg inkább ad-hoc, mint rendszer. Ez nem baj — innen a leglátványosabb a fejlődés. Az első lépés nem a hirdetés, hanem az alapok: célközönség, jelenlét, és egy egyszerű, tartható tartalomritmus.",
    actions: [
      "Írd le 5 mondatban az ideális vevődet (az Akadémia 1. kurzusa segít).",
      "Hozd rendbe a Google Business Profile-odat és a Facebook-oldalad.",
      "Kezdj heti 2 poszttal — az AI Copilot generálja az első verziókat.",
      "Állítsd be az első automatizációt: azonnali válasz ajánlatkérésre.",
    ],
  },
  {
    min: 6,
    max: 11,
    title: "Építkező szakasz 🏗️",
    summary:
      "Az alapok megvannak, de a rendszer még lyukas: valószínűleg sok múlik azon, mennyi időd van éppen. A következő szint kulcsa a következetesség és a mérés — hogy ne érzésre, hanem számokra hozz döntést.",
    actions: [
      "Készíts havi tartalomnaptárat (AI Copilot → tartalomnaptár-generátor).",
      "Indítsd el a listaépítést egy egyszerű lead magnettel.",
      "Vezess egy táblázatot: honnan jött minden új érdeklődő.",
      "Automatizáld a véleménykérést és az időpont-emlékeztetőket.",
    ],
  },
  {
    min: 12,
    max: 16,
    title: "Skálázó szakasz 🚀",
    summary:
      "Erős alapokon állsz — nálad már nem az a kérdés, hogy 'mit csináljak', hanem hogy 'mit érdemes felskálázni'. A növekedésed legnagyobb fékje most valószínűleg a saját időd: az automatizáció és a delegálás a következő lépés.",
    actions: [
      "Auditáld a hirdetéseidet: a 3+ ROAS-os kampányokra tegyél több büdzsét.",
      "Építsd ki a teljes üdvözlő e-mail szekvenciát (Akadémia: E-mail marketing kurzus).",
      "Automatizáld az adminisztrációt: számlaemlékeztető, CRM-frissítés.",
      "Fontold meg a Business csomagot: havi konzultáción egyedi növekedési tervet kapsz.",
    ],
  },
];

export function getAuditBand(score: number): AuditBand {
  return (
    AUDIT_BANDS.find((b) => score >= b.min && score <= b.max) ?? AUDIT_BANDS[0]
  );
}
