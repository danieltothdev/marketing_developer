export type TudastarArticle = {
  id: string;
  title: string;
  summary: string;
  answer: string;
  tags: string[];
};

export const tudastarArticles: TudastarArticle[] = [
  {
    id: "mi-az-aeo",
    title: "Mi az az AEO (Answer Engine Optimization)?",
    summary:
      "Az AEO célja, hogy a céged megjelenjen az AI keresők válaszaiban — ChatGPT, Perplexity, Gemini, Google AI.",
    answer:
      "Az AEO (Answer Engine Optimization) az AI keresőkre optimalizálás: amikor valaki kérdést tesz fel a ChatGPT-nek vagy a Perplexity-nek, az AI neveket és cégeket ajánl. Ha a te márkád nincs a válaszban, a megkeresés máshova megy. Az AI Tracker HU méri, említik-e a cégedet magyar kulcsszavakra.",
    tags: ["AEO", "AI SEO", "ChatGPT"],
  },
  {
    id: "zero-click",
    title: "Mi a zero-click veszteség az AI keresőben?",
    summary:
      "A döntés az AI válaszban születik — kattintás nélkül. Ha nincs a neved, nem jön lead.",
    answer:
      "Zero-click veszteség: az ügyfél a ChatGPT-t vagy Google AI-t kérdezi, az AI összefoglal és ajánl cégeket. Ha te nincs a listán, a felhasználó nem kattint a weboldaladra — a megkeresés el sem jut hozzád. Ezért kell mérni az AI említéseket, nem csak a klasszikus Google rangsort.",
    tags: ["zero-click", "AI kereső", "lead"],
  },
  {
    id: "search-console-ai",
    title: "Mutatja-e a Google Search Console az AI láthatóságot?",
    summary:
      "Nem. Nincs hivatalos AI Search Console — külön monitor kell.",
    answer:
      "A Google Search Console nem mutatja, mit ajánl a ChatGPT vagy a Perplexity a kulcsszavaidra. Az AI Overviews részben látható, de a teljes AI kereső láthatóság mérésére külön eszköz kell — ez az AI Tracker HU célja: 4 platform, magyar promptok, versenytárs lista.",
    tags: ["Search Console", "monitor", "mérés"],
  },
  {
    id: "magyar-promptok",
    title: "Milyen magyar kulcsszavakat érdemes figyelni az AI-ban?",
    summary:
      "Amit az ügyfeleid tényleg kérdeznek: szolgáltatás + város, „legjobb X”, ár, ajánló.",
    answer:
      "Az AI Tracker HU-nál érdemes figyelni: „legjobb fogorvos Debrecen”, „klímaszerelő [város]”, „marketing ügynökség KKV”, „[szolgáltatás] ár” típusú magyar promptokat. Ezeket az ügyfelek ténylegesen kérdezik a ChatGPT-től — nem angol SEO kulcsszavakat.",
    tags: ["kulcsszavak", "magyar", "prompt"],
  },
  {
    id: "seo-vs-aeo",
    title: "Elég a klasszikus SEO tool az AI láthatósághoz?",
    summary:
      "Nem. A SEO tool nem mondja meg, mit válaszol a ChatGPT a kulcsszavadra.",
    answer:
      "A klasszikus SEO eszközök (Ahrefs, Semrush stb.) a Google rangsort mérik. Az AI Tracker HU azt méri, mit mond a ChatGPT, Perplexity, Gemini és Google AI, amikor valaki magyarul kérdez a szolgáltatásodra. Két külön csatorna — mindkettő számít 2026-ban.",
    tags: ["SEO", "AEO", "verseny"],
  },
  {
    id: "javitas-hianyzas",
    title: "Mit tegyek, ha hiányzom az AI válaszból?",
    summary:
      "Először mérés, aztán konkrét javítási lista: schema, tartalom, értékelések, forráshelyek.",
    answer:
      "Ha hiányzol az AI válaszból: (1) AI audit a Trackerrel — látod, kit említenek helyetted; (2) javítási lista: FAQ schema, E-E-A-T tartalom, Google értékelések, helyi forráshelyek; (3) havi monitor — trend, nem egyszeri pillanatkép. Opcionálisan a TD-AI AEO csomag a végrehajtáshoz.",
    tags: ["javítás", "audit", "AEO"],
  },
];
