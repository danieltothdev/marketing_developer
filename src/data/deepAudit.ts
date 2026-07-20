// Mélyaudit: 6 terület × 5 kérdés, területenkénti kiértékeléssel.
import { AuditQuestion } from "./audit";

export interface DeepAuditCategory {
  id: string;
  emoji: string;
  title: string;
  questions: AuditQuestion[];
  // Ha a terület pontszáma gyenge (<60%), ezek a javaslatok jelennek meg.
  recommendations: string[];
  strengthNote: string;
}

const opt = (labels: [string, string, string]): AuditQuestion["options"] => [
  { label: labels[0], score: 0 },
  { label: labels[1], score: 1 },
  { label: labels[2], score: 2 },
];

export const DEEP_AUDIT_CATEGORIES: DeepAuditCategory[] = [
  {
    id: "pozicionalas",
    emoji: "🎯",
    title: "Célközönség és pozicionálás",
    questions: [
      {
        id: "p1",
        question: "Le tudod írni 2 mondatban, kinek és mit oldasz meg?",
        options: opt(["Nem igazán", "Nagyjából", "Igen, kívülről fújom"]),
      },
      {
        id: "p2",
        question: "Tudod, miben vagy más/jobb, mint a 3 fő versenytársad?",
        options: opt(["Nem néztem meg őket", "Sejtem", "Konkrétan meg tudom fogalmazni"]),
      },
      {
        id: "p3",
        question: "Az áraid tudatos döntésen alapulnak?",
        options: opt([
          "A konkurenciához igazítom érzésre",
          "Költség + haszonkulcs alapján számolom",
          "Érték- és pozicionálás-alapú árazásom van",
        ]),
      },
      {
        id: "p4",
        question: "Van olyan vevőkör, akinek tudatosan NEM dolgozol?",
        options: opt(["Mindenkinek dolgozom", "Van, akit kerülök", "Igen, tudatosan szűkítek"]),
      },
      {
        id: "p5",
        question: "A kommunikációd a vevő problémájáról szól, vagy rólad?",
        options: opt([
          "Főleg magunkról írunk",
          "Vegyesen",
          "A vevő problémája és eredménye áll a középpontban",
        ]),
      },
    ],
    recommendations: [
      "Írj vevői profilt: kor, élethelyzet, fő probléma, mitől fél, mire vágyik — minden szöveged ehhez igazítsd.",
      "Elemezd 3 versenytársad kommunikációját, és fogalmazd meg 1 mondatban, miben vagy más (ez a pozicionálós mondatod).",
      "Nézd át az árazásod: az érzésre belőtt ár szinte mindig alulárazás. Számold ki, mennyit ér a vevőnek az eredmény, amit adsz.",
    ],
    strengthNote: "A pozicionálásod erős — ez a legjobb alap, erre épül minden más.",
  },
  {
    id: "jelenlet",
    emoji: "🌐",
    title: "Online jelenlét és tartalom",
    questions: [
      {
        id: "j1",
        question: "Milyen a weboldalad?",
        options: opt([
          "Nincs vagy évek óta elavult",
          "Van, de ritkán frissül",
          "Naprakész, mobilon is jól működik, van rajta CTA",
        ]),
      },
      {
        id: "j2",
        question: "Google Business Profile (cégprofil) állapota?",
        options: opt(["Nincs / nem tudom", "Van, de elhanyagolt", "Kitöltött, friss képekkel és válaszokkal"]),
      },
      {
        id: "j3",
        question: "Milyen gyakran jelenik meg tőled tartalom (poszt, cikk, videó)?",
        options: opt(["Havonta vagy ritkábban", "Hetente-kéthetente, hullámzóan", "Heti ritmusban, tervezetten"]),
      },
      {
        id: "j4",
        question: "A tartalmaid adnak-e önmagukban értéket (tipp, útmutató)?",
        options: opt(["Főleg akciókat posztolunk", "Néha", "Rendszeresen, tudatos arányban"]),
      },
      {
        id: "j5",
        question: "Készítesz-e videós tartalmat (Reels, TikTok, YouTube)?",
        options: opt(["Nem", "Próbálkoztam már", "Rendszeresen"]),
      },
    ],
    recommendations: [
      "A Google Business Profile 1 óra munka és ingyen hoz helyi vevőt — töltsd ki teljesen, tölts fel 10+ képet, válaszolj minden értékelésre.",
      "Állíts be heti fix 'tartalomórát', és dolgozz havi tartalomnaptárból (az AI Copilot generál) — a rendszeresség többet ér, mint a tökéletesség.",
      "Kezdj el rövid videókat készíteni telefonnal: a videós tartalom elérése jelenleg többszöröse a képes posztokénak.",
    ],
    strengthNote: "Az online jelenléted rendezett — a láthatóságod jó alapokon áll.",
  },
  {
    id: "lead",
    emoji: "🧲",
    title: "Lead-szerzés és értékesítés",
    questions: [
      {
        id: "l1",
        question: "Van-e módja az érdeklődőnek egyszerűen jelentkezni (űrlap, foglalás, Messenger)?",
        options: opt(["Csak telefonszám van kint", "Van űrlap vagy üzenetküldés", "Több csatorna + gyors válasz"]),
      },
      {
        id: "l2",
        question: "Milyen gyorsan válaszolsz egy új megkeresésre?",
        options: opt(["1 napon túl", "Aznap", "1-2 órán belül (vagy automata azonnal)"]),
      },
      {
        id: "l3",
        question: "Építesz-e e-mail listát lead magnettel?",
        options: opt(["Nem", "Gyűjtök címeket, de nincs csali", "Van lead magnet és automata szekvencia"]),
      },
      {
        id: "l4",
        question: "Követed-e az ajánlataid sorsát (utánkövetés)?",
        options: opt([
          "Kiküldöm és várok",
          "Néha rákérdezek",
          "Rendszerszintű utánkövetésem van (2-3 érintés)",
        ]),
      },
      {
        id: "l5",
        question: "Kérsz-e ajánlást az elégedett vevőktől?",
        options: opt(["Nem szoktam", "Alkalmanként", "Rendszeresen, akár ösztönzővel"]),
      },
    ],
    recommendations: [
      "Állítsd be az azonnali automata választ minden megkeresésre (Automatizáció fül → recept) — az első válasz sebessége a megbízások egyik legerősebb előrejelzője.",
      "Készíts egy egyszerű lead magnetet (checklist, kalkulátor, mini útmutató), és kösd hozzá az 5 leveles üdvözlő szekvenciát.",
      "Vezess be ajánlatkövetést: minden kiküldött ajánlat után 3. és 7. napon egy udvarias rákérdezés — ez önmagában 20-30%-kal növelheti a megkötéseket.",
    ],
    strengthNote: "A lead-gépezeted működik — az érdeklődőből nálad nem vész el a pénz.",
  },
  {
    id: "hirdetes",
    emoji: "📣",
    title: "Fizetett hirdetések",
    questions: [
      {
        id: "h1",
        question: "Futtatsz-e jelenleg hirdetést?",
        options: opt(["Nem", "Alkalmanként (boost gomb)", "Rendszeresen, hirdetéskezelőből"]),
      },
      {
        id: "h2",
        question: "Van-e a hirdetéseidnek mérhető célja (konverzió)?",
        options: opt(["Lájkokra megy", "Forgalmat hoz az oldalra", "Konverzióra (érdeklődő/vásárlás) optimalizálok"]),
      },
      {
        id: "h3",
        question: "Van-e Meta Pixel / Google mérőkód a weboldaladon?",
        options: opt(["Nincs / nem tudom", "Van, de nem használom", "Van, és események is mérve vannak"]),
      },
      {
        id: "h4",
        question: "Használsz-e remarketinget (visszacélzást)?",
        options: opt(["Nem tudom, mi az", "Hallottam róla", "Fut remarketing kampányom"]),
      },
      {
        id: "h5",
        question: "Tudod-e, mennyibe kerül egy új vevő megszerzése?",
        options: opt(["Nem", "Kb. sejtem", "Számszerűen tudom (CAC)"]),
      },
    ],
    recommendations: [
      "Felejtsd el a 'poszt kiemelése' gombot — a Meta Hirdetéskezelőből indított, célra optimalizált kampány ugyanabból a pénzből többszörös eredményt hoz.",
      "Tedd fel a Meta Pixelt és a Google mérőkódot még a nagyobb költés előtt — mérés nélkül a hirdetés vakrepülés.",
      "Az első skálázható kampányod a remarketing legyen: akik már jártak nálad, 5-10x olcsóbban konvertálnak.",
    ],
    strengthNote: "A hirdetéseid tudatosak és mértek — itt már csak optimalizálni kell.",
  },
  {
    id: "megtartas",
    emoji: "💙",
    title: "Ügyfélmegtartás és vélemények",
    questions: [
      {
        id: "m1",
        question: "Tartod-e a kapcsolatot a régi vevőiddel?",
        options: opt(["Nem jellemző", "Alkalmanként", "Rendszeresen (hírlevél, akciók, évforduló)"]),
      },
      {
        id: "m2",
        question: "Hány Google-értékelésed van?",
        options: opt(["0-5", "6-20", "20+ és folyamatosan gyűlik"]),
      },
      {
        id: "m3",
        question: "Kérsz-e módszeresen véleményt a vevőktől?",
        options: opt(["Nem", "Szóban megemlítem", "Automatizáltan, minden teljesítés után"]),
      },
      {
        id: "m4",
        question: "Van-e visszatérő vevőket ösztönző rendszered (törzsvevő, csomag, bérlet)?",
        options: opt(["Nincs", "Informálisan adok kedvezményt", "Kidolgozott rendszer van"]),
      },
      {
        id: "m5",
        question: "Méred-e a vevői elégedettséget?",
        options: opt(["Nem", "A panaszokból derül ki", "Aktívan kérdezem (kérdőív, utánkövetés)"]),
      },
    ],
    recommendations: [
      "Egy meglévő vevő megtartása 5-7x olcsóbb, mint egy új szerzése — kezdd egy havi hírlevéllel a régi vevőidnek.",
      "Automatizáld a véleménykérést (Automatizáció fül → recept): 20+ friss Google-értékelés a helyi keresésben önmagában vevőket hoz.",
      "Találj ki egy egyszerű visszatérés-ösztönzőt: bérlet, csomagár, 'hozd az ismerősöd' — ami a te piacodon értelmezhető.",
    ],
    strengthNote: "A vevőid visszajárnak és beszélnek rólad — ez a legolcsóbb marketinged.",
  },
  {
    id: "rendszer",
    emoji: "⚙️",
    title: "Automatizáció és mérés",
    questions: [
      {
        id: "r1",
        question: "Hány marketing/admin folyamatod automatizált?",
        options: opt(["Egyik sem", "1-2 apróság", "Több folyamat automatán fut"]),
      },
      {
        id: "r2",
        question: "Használsz-e AI-eszközöket a napi munkában?",
        options: opt(["Nem", "Néha kipróbálom", "Rendszeresen (szövegek, e-mailek, ötletelés)"]),
      },
      {
        id: "r3",
        question: "Egy helyen látod-e az érdeklődőidet és ügyfeleidet (CRM/táblázat)?",
        options: opt(["Fejben / e-mailekben", "Táblázatban vezetem", "CRM-ben, státuszokkal"]),
      },
      {
        id: "r4",
        question: "Tudod-e, melyik csatorna hozza a legtöbb vevőt?",
        options: opt(["Nem", "Sejtésem van", "Számokkal tudom"]),
      },
      {
        id: "r5",
        question: "Nézed-e rendszeresen a marketing-számaidat (havi rutinként)?",
        options: opt(["Nem", "Amikor eszembe jut", "Havi fix rutinom van rá"]),
      },
    ],
    recommendations: [
      "Kezdd egyetlen táblázattal: minden érdeklődő egy sor (honnan jött, státusz, összeg) — ez a legkisebb működő CRM.",
      "Vezess be heti 30 perc AI-rutint: a következő hét posztjait, e-mailjeit az AI Copilottal írasd meg, te csak finomíts.",
      "Jelölj ki havi 1 fix órát a számokra: mennyi érdeklődő, honnan, mennyi lett vevő, mennyibe került — 3 hónap után látni fogod a mintázatokat.",
    ],
    strengthNote: "Rendszerben gondolkodsz — a marketinged nem rajtad múlik, hanem dolgozik helyetted.",
  },
];

export const DEEP_AUDIT_MAX_PER_CATEGORY = 10; // 5 kérdés × max 2 pont

export interface DeepAuditResultBand {
  min: number; // összpontszám (max 60)
  title: string;
  summary: string;
}

export const DEEP_AUDIT_BANDS: DeepAuditResultBand[] = [
  {
    min: 0,
    title: "Alapozásra van szükség 🌱",
    summary:
      "A marketinged több területen is a kezdeteknél tart — de ez azt is jelenti, hogy kis lépésekkel is gyors, látványos javulást érhetsz el. Az alábbi területenkénti javaslatokból válaszd ki a 2 leggyengébb területet, és CSAK azokkal foglalkozz a következő 60 napban.",
  },
  {
    min: 25,
    title: "Működő alapok, kihasználatlan tartalékok 🏗️",
    summary:
      "Több terület már működik nálad, de a rendszer egyenetlen: valahol erős vagy, máshol pénz folyik el észrevétlenül. A legnagyobb megtérülést most a gyenge területek felzárkóztatása hozza — ezek az alábbi javaslatokban pirossal jelölt területek.",
  },
  {
    min: 45,
    title: "Profi szint — a skálázás a tét 🚀",
    summary:
      "A marketinged a KKV-k felső néhány százalékában van. Nálad már nem a hibajavítás, hanem a skálázás a kérdés: több büdzsé a működő csatornákra, delegálás, és a maradék gyenge pontok rendszerszintű bezárása.",
  },
];

export function getDeepAuditBand(total: number): DeepAuditResultBand {
  return [...DEEP_AUDIT_BANDS].reverse().find((b) => total >= b.min) ?? DEEP_AUDIT_BANDS[0];
}
