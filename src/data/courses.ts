export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface Lesson {
  id: string;
  title: string;
  durationMin: number;
  content: string;
  quiz?: QuizQuestion[];
}

export interface Course {
  id: string;
  emoji: string;
  title: string;
  description: string;
  level: "Kezdő" | "Haladó";
  isPremium: boolean;
  lessons: Lesson[];
}

export const COURSES: Course[] = [
  {
    id: "social-alapok",
    emoji: "📱",
    title: "Social media alapok KKV-knak",
    description:
      "Hogyan építs jelenlétet Facebookon és Instagramon heti 2 óra ráfordítással — ügynökség nélkül.",
    level: "Kezdő",
    isPremium: false,
    lessons: [
      {
        id: "miert-social",
        title: "Miért éri meg a social media egy KKV-nak?",
        durationMin: 5,
        content:
          "A magyar vásárlók 80%-a megnézi a céget Facebookon vagy Instagramon, mielőtt vásárol. Ha nincs élő jelenléted, az olyan, mintha a boltod kirakata be lenne deszkázva.\n\nA jó hír: nem kell napi szinten posztolnod. Heti 2-3 minőségi poszt, ami valódi értéket ad (tipp, kulisszatitok, vevői vélemény), többet ér, mint a napi sablonos tartalom.\n\nA lecke kulcsüzenete: a social media a bizalomépítés eszköze, nem azonnali értékesítési csatorna. Először adj, utána kérj.",
        quiz: [
          {
            question: "Mi a social media elsődleges szerepe egy KKV-nál?",
            options: [
              "Azonnali értékesítés",
              "Bizalomépítés és jelenlét",
              "Álláshirdetések feladása",
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        id: "tartalomtipusok",
        title: "A 4 tartalomtípus, ami mindig működik",
        durationMin: 7,
        content:
          "1. ÉRTÉKADÓ: tippek, útmutatók a szakterületedről. Ez épít szakértői státuszt.\n\n2. KULISSZATITOK: mutasd meg, hogyan dolgozol. Az emberek emberektől vásárolnak.\n\n3. TÁRSADALMI BIZONYÍTÉK: vevői vélemények, esettanulmányok, előtte-utána.\n\n4. AJÁNLAT: konkrét termék vagy szolgáltatás bemutatása CTA-val (cselekvésre ösztönzéssel).\n\nAz arany arány: 3 értékadó/kulissza/bizonyíték posztra jusson 1 ajánlat. Így a követőid nem érzik magukat reklámfalnak.",
        quiz: [
          {
            question: "Milyen arányban posztolj értékadó és ajánlat tartalmat?",
            options: ["1:1", "3:1 az értékadó javára", "1:3 az ajánlat javára"],
            correctIndex: 1,
          },
        ],
      },
      {
        id: "tartalomnaptar",
        title: "Tartalomnaptár 30 perc alatt",
        durationMin: 6,
        content:
          "A legtöbb vállalkozó ott bukik el, hogy 'majd kitalálom aznap'. Nem fogod.\n\nA módszer: ülj le a hónap elején 30 percre, és tervezd meg a 8-12 posztot a 4 tartalomtípus szerint. Használd az app AI Copilot funkcióját: add meg a céged profilját, és generáltass magadnak egy havi tartalomnaptárat kiindulásnak.\n\nEzután már csak testre szabod és időzíted (Meta Business Suite ingyenes időzítő). Heti ráfordítás: kb. 1 óra.",
      },
    ],
  },
  {
    id: "hirdetes-alapok",
    emoji: "🎯",
    title: "Facebook & Google hirdetés alapok",
    description:
      "Hogyan indíts megtérülő hirdetéseket kis büdzsével, és hogyan olvasd az eredményeket.",
    level: "Kezdő",
    isPremium: true,
    lessons: [
      {
        id: "mikor-hirdess",
        title: "Mikor van értelme hirdetni?",
        durationMin: 6,
        content:
          "Hirdetni akkor érdemes, ha (1) tudod, ki a célközönséged, (2) van egy ajánlatod, ami organikusan is működött már, és (3) tudod mérni az eredményt.\n\nHa ezek nincsenek meg, a hirdetés csak felgyorsítja a pénzégetést. Először validáld az ajánlatot organikusan (posztok, ismerősök, meglévő vevők), utána tegyél mögé pénzt.\n\nKezdő büdzsé: napi 1 500 – 3 000 Ft elég a tanuláshoz. A cél az első hónapban nem a profit, hanem az adat.",
        quiz: [
          {
            question: "Mi az első hónap célja egy új hirdetési fióknál?",
            options: ["Azonnali profit", "Adatgyűjtés és tanulás", "Márkaépítés"],
            correctIndex: 1,
          },
        ],
      },
      {
        id: "facebook-vs-google",
        title: "Facebook vagy Google? Melyiket válaszd?",
        durationMin: 8,
        content:
          "GOOGLE: akkor erős, ha a vevő már keresi a megoldást ('vízszerelő Debrecen'). Keresleti piac — magas vásárlási szándék.\n\nFACEBOOK/INSTAGRAM: akkor erős, ha keresletet akarsz teremteni, vagy vizuális a terméked. A célzás érdeklődés és viselkedés alapú.\n\nÖkölszabály: helyi szolgáltató (fodrász, szerelő, ügyvéd) → Google. Termék, e-kereskedelem, élmény → Facebook/Instagram. Ideális esetben mindkettő, de kezdd azzal, ami a te piacodhoz áll közelebb.",
        quiz: [
          {
            question: "Egy helyi vízszerelőnek melyik csatorna a kézenfekvőbb indulásra?",
            options: ["Google keresési hirdetés", "TikTok", "Instagram Reels"],
            correctIndex: 0,
          },
        ],
      },
      {
        id: "merys",
        title: "A 3 szám, amit mindig nézz",
        durationMin: 6,
        content:
          "1. CTR (átkattintási arány): jó-e a kreatív és a szöveg? 1% alatt cserélj kreatívot.\n\n2. KONVERZIÓS KÖLTSÉG: mennyibe kerül egy érdeklődő/vásárló? Ezt vesd össze azzal, mennyit ér neked egy vevő.\n\n3. ROAS (megtérülés): minden elköltött 1 Ft hirdetés hány Ft bevételt hoz? 3x fölött skálázható a kampány.\n\nHetente egyszer nézd át — a napi babrálás többet árt, mint használ, mert nem hagyod tanulni az algoritmust.",
      },
    ],
  },
  {
    id: "email-marketing",
    emoji: "✉️",
    title: "E-mail marketing, ami elad",
    description:
      "Listaépítés, hírlevél és automata e-mail szekvenciák — a legolcsóbb értékesítési csatornád.",
    level: "Haladó",
    isPremium: true,
    lessons: [
      {
        id: "listaepites",
        title: "Listaépítés lead magnettel",
        durationMin: 7,
        content:
          "Az e-mail lista a tiéd — a Facebook-követőid nem. Ha holnap letiltják az oldalad, a lista marad.\n\nListaépítés alapja a LEAD MAGNET: egy ingyenes, azonnal hasznos anyag (checklist, mini útmutató, kalkulátor, kuponkód) e-mail címért cserébe.\n\nJó lead magnet ismérve: 5 perc alatt fogyasztható, egy konkrét problémát old meg, és logikusan vezet a fizetős szolgáltatásod felé. Az AI Copilottal generálhatsz hozzá ötleteket és szöveget.",
        quiz: [
          {
            question: "Mi a lead magnet lényege?",
            options: [
              "Ingyenes érték e-mail címért cserébe",
              "Kedvezménykupon a hűséges vevőknek",
              "Fizetett hirdetési formátum",
            ],
            correctIndex: 0,
          },
        ],
      },
      {
        id: "udvozlo-szekvencia",
        title: "Az üdvözlő szekvencia (a pénzcsináló automata)",
        durationMin: 8,
        content:
          "Aki most iratkozott fel, akkor a legnyitottabb rád. Az üdvözlő szekvencia 4-5 automata e-mail az első 10 napban:\n\n1. nap: a beígért anyag + bemutatkozás.\n2-3. nap: a legjobb tartalmad / sztorid — miért csinálod, amit csinálsz.\n5. nap: társadalmi bizonyíték (vevői eredmények).\n7. nap: puha ajánlat ('ha szeretnéd, segítek').\n10. nap: konkrét ajánlat határidővel vagy bónusszal.\n\nEz egyszer megírod, és utána minden feliratkozónál magától dolgozik. Ez az automatizáció lényege.",
      },
      {
        id: "hirlevel-ritmus",
        title: "Hírlevél: milyen gyakran és miről?",
        durationMin: 5,
        content:
          "A minimum a heti/kétheti egy levél — ennél ritkábban elfelejtenek. A jó hírlevél 80%-ban érték, 20%-ban ajánlat, ugyanúgy, mint a social tartalom.\n\nTémaforrás: a vevőid kérdései. Amit egy héten kétszer megkérdeznek tőled, arról írj levelet.\n\nTárgymező-tipp: rövid, kíváncsiságkeltő, ígéret nélküli túlzás nélkül. Az AI Copilot e-mail generátora tárgymező-variációkat is ad, amiből A/B tesztelhetsz.",
      },
    ],
  },
  {
    id: "ai-automatizacio",
    emoji: "🤖",
    title: "AI és automatizáció a KKV-ban",
    description:
      "Hogyan spórolj heti 5-10 órát AI-eszközökkel és egyszerű automatizációkkal — programozás nélkül.",
    level: "Haladó",
    isPremium: true,
    lessons: [
      {
        id: "mit-automatizalj",
        title: "Mit automatizálj először?",
        durationMin: 6,
        content:
          "Ne a legbonyolultabb folyamattal kezdd. A jó első automatizáció: (1) gyakran ismétlődik, (2) szabálykövető, (3) nem igényel emberi mérlegelést.\n\nTipikus első jelöltek: új érdeklődő adatainak rögzítése táblázatba/CRM-be, automatikus válasz-e-mail ajánlatkérésre, számlaemlékeztető, időpontfoglalás visszaigazolása.\n\nGyakorlat: írd össze, mire megy el a heted, és jelöld meg, ami a 3 feltételnek megfelel. Az első 2-3 automatizáció tipikusan heti 3-5 órát szabadít fel.",
        quiz: [
          {
            question: "Melyik a jó első automatizációs jelölt?",
            options: [
              "Egyedi árajánlatok mérlegelése",
              "Ismétlődő, szabálykövető feladat",
              "Stratégiai tervezés",
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        id: "ai-eszkozok",
        title: "AI a mindennapokban: szöveg, kép, ügyfélszolgálat",
        durationMin: 8,
        content:
          "SZÖVEG: posztok, hirdetések, e-mailek első verziója AI-jal — te már csak finomítasz. Ez önmagában megfelezi a marketingre szánt idődet. (Erre való az app AI Copilot funkciója.)\n\nKÉP: termékfotó-variációk, poszt-grafikák sablonokból (Canva + AI).\n\nÜGYFÉLSZOLGÁLAT: a leggyakoribb 10-15 kérdésre AI-alapú automata válasz a weboldalon vagy Messengerben — a bejövő kérdések 60-70%-át kiszűri.\n\nAranyszabály: az AI a piszkozatot írja, a döntést és a végső hangot te adod.",
      },
      {
        id: "zapier-make",
        title: "Rendszerek összekötése: Zapier és Make alapok",
        durationMin: 7,
        content:
          "A Zapier és a Make olyan eszközök, amikkel programozás nélkül kötsz össze appokat: 'HA történik valami az egyik rendszerben, AKKOR csinálj valamit a másikban'.\n\nPélda: HA valaki kitölti a weboldal űrlapját → AKKOR kerüljön be a Google Sheets-be + kapjon üdvözlő e-mailt + te kapj Slack/e-mail értesítést.\n\nAz app Automatizáció fülén kész recepteket találsz lépésről lépésre — válassz egyet, és állítsd össze 30 perc alatt. Az első működő automatizációd után nem akarsz majd leállni.",
      },
    ],
  },
];

export function getCourse(id: string): Course | undefined {
  return COURSES.find((c) => c.id === id);
}
