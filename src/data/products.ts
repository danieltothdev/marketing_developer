// Egyszeri (nem előfizetéses) termékek: kredit csomagok, sablonboltos
// csomagok és a mélyaudit. Élesben ezek App Store / Play Store
// "non-consumable" / "consumable" termékek (RevenueCat-en keresztül).

export interface CreditPack {
  id: string;
  credits: number;
  priceLabel: string;
  note?: string;
}

export const CREDIT_PACKS: CreditPack[] = [
  { id: "credits-50", credits: 50, priceLabel: "1 990 Ft" },
  { id: "credits-150", credits: 150, priceLabel: "4 990 Ft", note: "17% megtakarítás" },
  { id: "credits-500", credits: 500, priceLabel: "12 990 Ft", note: "35% megtakarítás" },
];

export interface ShopSection {
  heading: string;
  items: string[];
}

export interface ShopProduct {
  id: string;
  emoji: string;
  title: string;
  priceLabel: string;
  description: string;
  bullets: string[];
  sections: ShopSection[];
}

export const SHOP_PRODUCTS: ShopProduct[] = [
  {
    id: "posztsablonok",
    emoji: "📱",
    title: "30 posztsablon csomag",
    priceLabel: "4 990 Ft",
    description:
      "30 kitöltős posztsablon a 4 tartalomtípusra — soha többé nem ülsz üres képernyő előtt. Minden sablonba csak a saját adataidat írod be.",
    bullets: [
      "10 értékadó + 8 kulisszatitok + 7 bizonyíték + 5 ajánlat sablon",
      "Kitöltős [szögletes zárójeles] formátum",
      "Bármely iparágra alkalmazható",
    ],
    sections: [
      {
        heading: "Értékadó sablonok (10)",
        items: [
          "3 hiba, amit a legtöbb [célközönség] elkövet [téma] terén — és hogyan kerüld el őket 👇",
          "Ha csak 1 dolgot tehetnél a [cél] érdekében, ez legyen az: [tipp + rövid magyarázat]",
          "GYIK: „[gyakori kérdés]?” — Íme a válasz, amit a legtöbben nem mondanak el: [válasz]",
          "[Szám] jel, hogy ideje [megoldás]-ra gondolnod: 1) [jel] 2) [jel] 3) [jel]",
          "Mítosz vs. valóság: sokan hiszik, hogy [tévhit]. Az igazság: [tény + miért számít]",
          "Így csináld lépésről lépésre: [folyamat] — 1) [lépés] 2) [lépés] 3) [lépés]. Mentsd el későbbre! 📌",
          "Mennyibe kerül a [szolgáltatás]? Őszintén a számokról: [ártartomány + mitől függ]",
          "Mielőtt [döntés]-t hozol, ezt az [szám] kérdést tedd fel: [kérdéslista]",
          "A legolcsóbb vs. a legjobb megoldás [probléma]-ra — mikor melyiket válaszd: [összehasonlítás]",
          "1 perces tipp: [azonnal használható apró tanács]. Próbáld ki még ma, és írd meg, bevált-e! 💬",
        ],
      },
      {
        heading: "Kulisszatitok sablonok (8)",
        items: [
          "Így indul nálunk egy átlagos [hétfő]: [fotó + 2-3 mondat a munkafolyamatról]",
          "A színfalak mögött: így készül a [termék/szolgáltatás] — [folyamat röviden, képekkel]",
          "Bemutatjuk: [csapattag neve], aki [feladat]. Kedvenc része a munkában: [idézet]",
          "Ezt a hibát követtük el [időszak]-ban — és ezt tanultuk belőle: [tanulság]",
          "Miért csináljuk? [Személyes sztori arról, miért indult a vállalkozás]",
          "Egy nap számokban: [X] ügyfél, [Y] csésze kávé, [Z] elkészült munka ☕",
          "Új eszköz/fejlesztés érkezett: [mi az + mit javít az ügyfeleknek]",
          "Előtte-utána a műhelyből: [folyamat közbeni és kész állapot képpel]",
        ],
      },
      {
        heading: "Bizonyíték sablonok (7)",
        items: [
          "„[Vevői idézet]” — köszönjük, [keresztnév]! 🙏 Ilyen visszajelzésekért dolgozunk.",
          "Esettanulmány: [ügyfél] azzal keresett meg, hogy [probléma]. [Idő] alatt: [eredmény számokkal].",
          "Előtte ➡️ Utána: [rövid leírás + képpár]. Neked is hasonlóra van szükséged? Írj!",
          "[Szám]. elégedett ügyfelünk ebben a hónapban 🎉 [Rövid sztori az esetről]",
          "Ezt kaptuk ma: [screenshot vevői üzenetről] — ennél jobb hétkezdés nincs.",
          "[Ismert helyi partner/cég] is minket választott. Amiben segítettünk: [feladat].",
          "5 csillagos értékelés a Google-ön: „[idézet]” ⭐⭐⭐⭐⭐ Köszönjük a bizalmat!",
        ],
      },
      {
        heading: "Ajánlat sablonok (5)",
        items: [
          "[Hónap]-ban [X] hely maradt [szolgáltatás]-ra. Ha idén tervezed, most érdemes: [CTA + elérhetőség]",
          "Csak a követőinknek: [kedvezmény/bónusz] minden [termék]-re [dátum]-ig. Írj üzenetet! 📩",
          "Új szolgáltatás: [név]. Kinek való? [célcsoport]. Mit old meg? [eredmény]. Részletek: [CTA]",
          "Gyakran kérdezitek, mikor lesz [termék]. Itt van! 🎉 [1-2 mondat + link/CTA]",
          "Ingyenes [konzultáció/felmérés/minta] [dátum]-ig — kötelezettség nélkül megnézzük, tudunk-e segíteni. [CTA]",
        ],
      },
    ],
  },
  {
    id: "email-szekvencia",
    emoji: "✉️",
    title: "Üdvözlő e-mail szekvencia (5 levél)",
    priceLabel: "9 990 Ft",
    description:
      "Kész, kitöltős 5 leveles automata szekvencia új feliratkozóknak — a levelek, amik a hideg érdeklődőből vevőt csinálnak. Egyszer beállítod, örökre dolgozik.",
    bullets: [
      "5 teljes levél szövege + tárgymező-variációk",
      "Bevált időzítési terv (1., 2., 5., 7., 10. nap)",
      "Bármely e-mail rendszerbe (MailerLite, Brevo, Mailchimp) bemásolható",
    ],
    sections: [
      {
        heading: "1. levél — azonnal: a beígért anyag + bemutatkozás",
        items: [
          "TÁRGY: Itt van, amit ígértünk 🎁 / [Lead magnet neve] — letöltés",
          "Szia [Keresztnév]! Itt a [lead magnet], amiért feliratkoztál: [LINK]. Két mondatban rólunk: [kik vagytok + kinek segítetek]. A következő napokban küldök még pár rövid, hasznos levelet [téma] témában — érdemes lesz megnyitni. Üdv, [Aláírás]",
        ],
      },
      {
        heading: "2. levél — 2. nap: a legjobb tartalmad / sztorid",
        items: [
          "TÁRGY: Miért csináljuk ezt? (őszinte sztori)",
          "Szia [Keresztnév]! Hadd meséljem el, miért indult a [cégnév]: [személyes sztori 3-4 mondatban — a probléma, amit láttál a piacon]. Ezért ma minden ügyfelünknél arra figyelünk, hogy [fő érték]. Holnapután küldök egy konkrét, azonnal használható tippet. Üdv, [Aláírás]",
        ],
      },
      {
        heading: "3. levél — 5. nap: érték + társadalmi bizonyíték",
        items: [
          "TÁRGY: Így érte el [ügyfél] hogy [eredmény]",
          "Szia [Keresztnév]! Egy gyors eset a gyakorlatból: [ügyfél] azzal jött, hogy [probléma]. Amit tettünk: [megoldás 2 mondatban]. Az eredmény: [konkrét szám/változás]. A tanulság neked: [1 alkalmazható tipp]. Üdv, [Aláírás]",
        ],
      },
      {
        heading: "4. levél — 7. nap: puha ajánlat",
        items: [
          "TÁRGY: Segíthetünk ebben?",
          "Szia [Keresztnév]! Az elmúlt napokban [témák]-ról írtam. Ha ezek közül bármelyik aktuális nálad, szívesen megnézzük együtt, mi lenne az első lépés — kötelezettség nélkül. Válaszolj erre a levélre egy rövid „érdekel”-lel, és egyeztetünk egy [15 perces hívást/felmérést]. Üdv, [Aláírás]",
        ],
      },
      {
        heading: "5. levél — 10. nap: konkrét ajánlat határidővel",
        items: [
          "TÁRGY: [Ajánlat] — [dátum]-ig / Ez a levél [dátum]-ig érvényes",
          "Szia [Keresztnév]! Rövid leszek: a feliratkozóinknak [dátum]-ig [ajánlat: kedvezmény/bónusz/extra]. Ez azt jelenti, hogy [mit kap pontosan + ár]. Ha szeretnéd: [CTA link/válasz]. Ha most nem aktuális, semmi gond — a heti leveleimben továbbra is kapsz hasznos tippeket. Üdv, [Aláírás]",
        ],
      },
    ],
  },
  {
    id: "hirdetes-swipe",
    emoji: "🎯",
    title: "Hirdetés swipe file (10 formula)",
    priceLabel: "7 990 Ft",
    description:
      "10 bevált hirdetésszöveg-formula kitöltős vázzal és példával — Facebook és Instagram hirdetésekhez. Nem kell szövegírónak lenned: válassz formulát, töltsd ki, indítsd.",
    bullets: [
      "10 formula: PAS, AIDA, sztori, kifogáskezelő, social proof és társai",
      "Mindegyikhez kitöltős váz + mikor használd",
      "Címsor-bank 20 bevált címsorkezdéssel",
    ],
    sections: [
      {
        heading: "A 10 formula",
        items: [
          "1. PAS (Probléma–Ráerősítés–Megoldás): „[Probléma]? […és ami még rosszabb: következmény]. A [megoldás]-sal [eredmény]. [CTA]” — a legbiztosabb kezdőformula.",
          "2. AIDA: figyelemfelkeltő állítás → érdeklődés (miért releváns) → vágy (mit nyer) → cselekvés (CTA). Hosszabb szövegű hirdetésekhez.",
          "3. Sztori-formula: „[Ügyfél] [idő]-vel ezelőtt azzal keresett meg… [fordulat] … ma [eredmény].” — hideg közönségre kiváló.",
          "4. Kifogáskezelő: „Tudom, mire gondolsz: [tipikus kifogás]. Pont ezért [hogyan oldja fel a terméked].” — remarketingre.",
          "5. Social proof: „[Szám] [célcsoport] választott minket [időszak] alatt. Ők ezt mondják: [idézet].” — bizalomépítésre.",
          "6. Kérdés-nyitás: „Te is [gyakori frusztráció]? Nem vagy egyedül — és van rá megoldás: [ajánlat].” — magas CTR-ű nyitás.",
          "7. Lista-formula: „[Szám] ok, amiért [célcsoport] a [terméket] választja: 1)… 2)… 3)… [CTA]” — gyorsan fogyasztható.",
          "8. Előtte-utána: „Előtte: [állapot]. Utána: [állapot]. A különbség: [termék/szolgáltatás].” — vizuális kreatívval a legerősebb.",
          "9. Sürgető ajánlat: „[Ajánlat] — csak [dátum]-ig / csak [darab] elérhető. [Mit kap pontosan]. [CTA]” — meleg közönségre, ritkán használd.",
          "10. Edukáló-hook: „A legtöbben rosszul csinálják a [téma]-t. Íme, hogyan érdemes: [tipp]. Ha mélyebben érdekel: [CTA lead magnetre].” — lead-gyűjtésre.",
        ],
      },
      {
        heading: "Címsor-bank (20 kezdés)",
        items: [
          "„[Célcsoport] figyelem:…” · „Elég volt a [probléma]-ból?” · „Így [eredmény] [idő] alatt” · „A [szám] legnagyobb hiba [téma] terén” · „Mi lenne, ha [vágyott állapot]?”",
          "„Ezt senki nem mondja el a [téma]-ról” · „[Város/környék]: új [szolgáltatás]” · „Kérdés: mennyit ér neked [eredmény]?” · „[Szám] Ft-tól: [szolgáltatás]” · „Utolsó [darab/hely/nap]",
          "„Ne fizess többet [összeg]-nél [szolgáltatás]-ért” · „A vevőink [szám]%-a visszatér — ez az oka” · „[Ismert probléma]? 24 órán belül segítünk” · „Ingyenes [felmérés/minta/konzultáció]” · „Így válassz [szolgáltatót] — checklist",
          "„[Évszak/hónap] = [szezonális apropó]” · „Bizonyíték: [konkrét eredmény számmal]” · „Nem a legolcsóbbak vagyunk. Ez az oka.” · „Egy [foglalkozás] őszinte tanácsa” · „Mielőtt [döntés], olvasd el ezt",
        ],
      },
    ],
  },
];

export function getShopProduct(id: string): ShopProduct | undefined {
  return SHOP_PRODUCTS.find((p) => p.id === id);
}

export const DEEP_AUDIT_PRODUCT = {
  id: "deep-audit",
  emoji: "🔬",
  title: "Mélyaudit — részletes marketingdiagnózis",
  priceLabel: "14 990 Ft",
  description:
    "30 kérdéses, 6 területet vizsgáló részletes audit. A végén területenkénti pontszámot, erősség-gyengeség térképet és személyre szabott akciótervet kapsz — előfizetés nélkül, egyszeri díjért.",
};
