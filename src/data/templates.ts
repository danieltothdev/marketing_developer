export interface AutomationTemplate {
  id: string;
  emoji: string;
  title: string;
  category: "Lead-kezelés" | "Értékesítés" | "Ügyfélszolgálat" | "Adminisztráció";
  difficulty: "Könnyű" | "Közepes";
  timeSavedPerWeek: string;
  tools: string[];
  isPremium: boolean;
  description: string;
  steps: string[];
}

export const TEMPLATES: AutomationTemplate[] = [
  {
    id: "lead-to-sheet",
    emoji: "📥",
    title: "Új érdeklődő → táblázat + üdvözlő e-mail",
    category: "Lead-kezelés",
    difficulty: "Könnyű",
    timeSavedPerWeek: "~2 óra",
    tools: ["Google Forms / weboldal űrlap", "Zapier vagy Make", "Google Sheets", "Gmail"],
    isPremium: false,
    description:
      "Minden űrlapkitöltés automatikusan bekerül egy táblázatba, az érdeklődő pedig azonnal kap egy személyre szabott üdvözlő e-mailt.",
    steps: [
      "Készíts űrlapot (Google Forms vagy weboldal-űrlap) név + e-mail + üzenet mezőkkel.",
      "Zapierben hozz létre egy Zap-et: Trigger = új űrlapkitöltés.",
      "1. akció: sor hozzáadása a Google Sheets 'Érdeklődők' táblázathoz.",
      "2. akció: Gmail e-mail küldése az érdeklődőnek (használj sablont, a nevét illeszd be változóként).",
      "3. akció (opcionális): értesítés neked e-mailben vagy Slacken.",
      "Teszteld egy próbakitöltéssel, majd kapcsold be.",
    ],
  },
  {
    id: "ajanlatkero-valasz",
    emoji: "⚡",
    title: "Azonnali válasz ajánlatkérésre",
    category: "Értékesítés",
    difficulty: "Könnyű",
    timeSavedPerWeek: "~1,5 óra",
    tools: ["E-mail fiók", "Zapier vagy Make"],
    isPremium: false,
    description:
      "Az ajánlatkérő 2 percen belül kap egy profi visszaigazolást a következő lépésekkel — akkor is, ha te épp dolgozol. Az első válasz sebessége a megbízások egyik legerősebb előrejelzője.",
    steps: [
      "Írd meg a visszaigazoló sablont: megkaptuk, mikorra várhat választ, mire készüljön (pl. kérdéslista).",
      "Zapierben: Trigger = új e-mail az 'ajanlat@' címre vagy űrlapkitöltés.",
      "Akció: automatikus válasz küldése a sablonnal.",
      "Extra: az ajánlatkérés adatai kerüljenek be a CRM-be/táblázatba határidővel.",
    ],
  },
  {
    id: "google-velemeny",
    emoji: "⭐",
    title: "Vélemenykérés vásárlás után",
    category: "Értékesítés",
    difficulty: "Könnyű",
    timeSavedPerWeek: "~1 óra",
    tools: ["Számlázó / CRM", "Zapier vagy Make", "E-mail"],
    isPremium: true,
    description:
      "3 nappal a teljesítés után automata e-mail kéri meg a vevőt egy Google-értékelésre. A több értékelés több új vevőt hoz — magától.",
    steps: [
      "Készítsd el a Google-értékelés közvetlen linkjét (Google Business Profile → értékelés kérése).",
      "Trigger: számla kiegyenlítve / projekt lezárva a rendszeredben.",
      "Késleltetés: 3 nap (Zapier Delay / Make Sleep).",
      "Akció: barátságos e-mail a véleménykérő linkkel — rövid, személyes, egy kérés.",
      "Szűrés: elégedetlen ügyfélnél (jelöld a CRM-ben) ne menjen ki automatikusan.",
    ],
  },
  {
    id: "no-show-emlekezteto",
    emoji: "📅",
    title: "Időpont-emlékeztető (no-show csökkentés)",
    category: "Ügyfélszolgálat",
    difficulty: "Könnyű",
    timeSavedPerWeek: "~1 óra + kiesett bevétel",
    tools: ["Google Naptár / foglalórendszer", "Zapier vagy Make", "E-mail vagy SMS"],
    isPremium: true,
    description:
      "24 órával és 2 órával az időpont előtt automatikus emlékeztető megy ki. A meg nem jelenések tipikusan 50-70%-kal csökkennek.",
    steps: [
      "Trigger: közelgő naptáresemény a foglalási naptáradban.",
      "Akció 1: e-mail emlékeztető 24 órával előtte (időpont, cím, lemondási lehetőség).",
      "Akció 2: rövid SMS vagy e-mail 2 órával előtte.",
      "Extra: lemondás esetén automatikus értesítés neked, hogy újra ki tudd adni az időpontot.",
    ],
  },
  {
    id: "szamla-emlekezteto",
    emoji: "💰",
    title: "Fizetési emlékeztető lejárt számlára",
    category: "Adminisztráció",
    difficulty: "Közepes",
    timeSavedPerWeek: "~1 óra + gyorsabb cash flow",
    tools: ["Számlázó (pl. Billingo, Számlázz.hu)", "Zapier vagy Make", "E-mail"],
    isPremium: true,
    description:
      "Lejárt számlánál udvarias, majd határozottabb emlékeztetők mennek ki automatikusan — neked nem kell kellemetlen e-maileket írnod.",
    steps: [
      "Trigger: a számlázóprogram jelzi a lejárt, kiegyenlítetlen számlát.",
      "Akció 1: udvarias emlékeztető a lejárat után 3 nappal.",
      "Akció 2: határozottabb levél 10 nap után, fizetési link újraküldésével.",
      "Akció 3: 20 nap után értesítés neked, hogy személyesen lépj közbe.",
    ],
  },
  {
    id: "social-ujrahasznositas",
    emoji: "♻️",
    title: "Tartalom-újrahasznosítás csatornák között",
    category: "Lead-kezelés",
    difficulty: "Közepes",
    timeSavedPerWeek: "~2 óra",
    tools: ["Facebook / Instagram", "Zapier vagy Make", "Google Sheets"],
    isPremium: true,
    description:
      "A jól teljesítő posztjaid automatikusan bekerülnek egy 'legjobb tartalmak' táblázatba, ahonnan 2-3 havonta újra kimehetnek — a legtöbb követőd úgysem látta először.",
    steps: [
      "Trigger: új poszt a Facebook-oldaladon.",
      "Akció: a poszt szövege + linkje kerüljön be egy Google Sheets archívumba.",
      "Havonta: nézd át, jelöld a legjobbakat (elérés/reakció alapján).",
      "Időzítsd újra a legjobbakat frissített szöveggel — az AI Copilot átfogalmazza neked.",
    ],
  },
];
