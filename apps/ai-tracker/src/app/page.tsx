import Link from "next/link";
import { BrandedImage } from "@/components/BrandedImage";
import { HeroVisual } from "@/components/HeroVisual";
import { tudastarArticles } from "@/data/tudastar";

const platforms = ["ChatGPT", "Perplexity", "Gemini", "Google AI"];

const plans = [
  {
    name: "Audit",
    price: "14 900",
    period: "egyszeri",
    blurb: "Egyszeri pillanatkép — mi van most.",
    features: [
      "1 domain, 5–10 magyar kulcsszó",
      "4 AI platform scan",
      "PDF riport + említés / nem említés",
      "Konkrét javítási javaslatok",
    ],
    cta: "Kérem az első scan-t",
  },
  {
    name: "Monitor",
    price: "19 900",
    period: "hó",
    featured: true,
    blurb: "Havi radar — ne lepjen meg a verseny.",
    features: [
      "1 domain, 10 kulcsszó",
      "Automatikus havi scan",
      "Dashboard + email riport",
      "Trend: javulsz vagy visszaestél?",
      "Versenytárs lista a válaszokban",
    ],
    cta: "Monitor indítása",
  },
  {
    name: "Agency",
    price: "79 900",
    period: "hó",
    blurb: "Ügynökségeknek, több ügyfélre.",
    features: [
      "10 domain",
      "White-label PDF riport",
      "Ügyfél dashboard",
      "Prioritás scan sor",
      "Partner támogatás",
    ],
    cta: "Agency érdeklődés",
  },
];

const faqs = [
  {
    q: "Mi az az AI kereső láthatóság?",
    a: "Amikor valaki a ChatGPT-t, Perplexity-t vagy a Google AI-t kérdezi, az AI neveket ajánl. Ha te nem vagy a listán, a megkeresés máshova megy.",
  },
  {
    q: "Ez nem ugyanaz, mint a klasszikus SEO?",
    a: "Részben átfed. A Google AI Overviews a rangsorra épül. A ChatGPT és a Perplexity másképp válogat. Az AI Tracker mindkettőt méri.",
  },
  {
    q: "Honnan tudom, hogy engem említ az AI?",
    a: "Sehonnan, amíg nem méred. Nincs Search Console az AI-ra. Ezért kell a Tracker.",
  },
  {
    q: "Milyen kulcsszavakat érdemes figyelni?",
    a: "Amit az ügyfeleid kérdeznek magyarul: szolgáltatás + város, „legjobb X”, „X ár”.",
  },
  {
    q: "Mit kapok, ha nem említenek?",
    a: "Konkrét javítási listát: értékelések, schema, tartalom, forráshelyek. Opcionálisan AEO csomag a végrehajtáshoz.",
  },
  {
    q: "Mennyi idő egy scan?",
    a: "Az első audit általában 1 munkanapon belül kész. A Monitor havonta automatikusan fut.",
  },
  {
    q: "A riválisom már ott van az AI válaszban. Mit tegyek?",
    a: "Először lásd a riportot: hol és miért említik őket. Utána lépésről lépésre javítunk.",
  },
  {
    q: "Kell technikai tudás a javításhoz?",
    a: "A riport közérthető. Ha nincs kapacitásod, ügynökségi segítség kérhető.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://aitracker.hu/#organization",
      name: "AI Tracker HU",
      url: "https://aitracker.hu",
      logo: "https://aitracker.hu/images/aitracker-hero-bg.webp",
      parentOrganization: {
        "@type": "Organization",
        name: "TD-AI & Marketing",
        url: "https://tdaimarketing.hu",
        telephone: "+36-30-352-7975",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+36-30-352-7975",
        contactType: "customer service",
        availableLanguage: ["Hungarian"],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://aitracker.hu/#website",
      url: "https://aitracker.hu",
      name: "AI Tracker HU",
      inLanguage: "hu-HU",
      publisher: { "@id": "https://aitracker.hu/#organization" },
    },
    {
      "@type": "WebPage",
      "@id": "https://aitracker.hu/#webpage",
      url: "https://aitracker.hu",
      name: "AI Tracker HU — AI kereső láthatóság monitor",
      isPartOf: { "@id": "https://aitracker.hu/#website" },
      about: { "@id": "https://aitracker.hu/#software" },
      inLanguage: "hu-HU",
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://aitracker.hu/#software",
      name: "AI Tracker HU",
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "AI SEO / AEO Monitor",
      operatingSystem: "Web",
      inLanguage: "hu-HU",
      description:
        "Magyar AI kereső láthatóság monitor: ChatGPT, Perplexity, Gemini és Google AI említések mérése kulcsszavanként, versenytárs listával és javítási tervvel.",
      featureList: [
        "ChatGPT említés monitor",
        "Perplexity scan",
        "Gemini és Google AI",
        "Magyar kulcsszavak",
        "PDF riport és javítási terv",
      ],
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "14900",
        highPrice: "79900",
        priceCurrency: "HUF",
        offerCount: "3",
        availability: "https://schema.org/InStock",
        url: "https://aitracker.hu/#pricing",
      },
      provider: { "@id": "https://aitracker.hu/#organization" },
    },
    {
      "@type": "HowTo",
      name: "Hogyan mérd az AI kereső láthatóságodat",
      description:
        "Domain és kulcsszavak beállítása után AI Tracker HU scanneli a fő AI platformokat.",
      totalTime: "PT10M",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Beállítod, mit figyeljünk",
          text: "Domain, márkanév és 5–10 magyar kulcsszó.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Scan a 4 AI platformon",
          text: "ChatGPT, Perplexity, Gemini, Google AI — említés és versenytársak.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Dashboard + PDF + teendők",
          text: "Trend, versenytárs lista és konkrét javítási lépések.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
    {
      "@type": "CollectionPage",
      "@id": "https://aitracker.hu/#tudastar",
      name: "AI Tracker HU Tudástár — AEO és AI láthatóság",
      description:
        "Útmutatók az AI kereső láthatóságról, zero-click veszteségről és magyar prompt monitorozásról.",
      inLanguage: "hu-HU",
      hasPart: tudastarArticles.map((a) => ({
        "@type": "Article",
        "@id": `https://aitracker.hu/#tudastar-${a.id}`,
        headline: a.title,
        description: a.summary,
        articleBody: a.answer,
        inLanguage: "hu-HU",
        author: { "@id": "https://aitracker.hu/#organization" },
        publisher: { "@id": "https://aitracker.hu/#organization" },
      })),
    },
  ],
};

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--at-ink)] text-[var(--at-soft)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="relative z-30 mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href="#" className="text-xl font-semibold tracking-tight text-white">
          AI Tracker{" "}
          <span className="text-[var(--at-signal)]">HU</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm font-medium text-[var(--at-muted)] md:flex">
          <a href="#problems" className="hover:text-white">
            Problémák
          </a>
          <a href="#why" className="hover:text-white">
            Miért számít
          </a>
          <a href="#how" className="hover:text-white">
            Így mérünk
          </a>
          <a href="#tudastar" className="hover:text-white">
            Tudástár
          </a>
          <a href="#pricing" className="hover:text-white">
            Árak
          </a>
          <a href="#faq" className="hover:text-white">
            FAQ
          </a>
        </nav>
        <Link
          href="/dashboard"
          className="rounded-md bg-[var(--at-signal)] px-4 py-2 text-sm font-bold text-[var(--at-ink)] transition hover:bg-white"
        >
          Első scan
        </Link>
      </header>

      {/* HERO — CSS radar animáció + interaktív scan (videó nélkül) */}
      <section className="at-radar relative isolate overflow-hidden" aria-labelledby="at-hero-title">
        <div className="at-rings absolute inset-0" aria-hidden />
        <div
          className="pointer-events-none absolute -left-16 top-20 h-72 w-72 rounded-full bg-[var(--at-signal)]/15 blur-3xl"
          aria-hidden
        />

        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-16 pt-8 lg:grid lg:grid-cols-2 lg:items-center lg:gap-14 lg:pb-24 lg:pt-12">
          <div className="min-w-0">
            <p className="at-rise mb-5 text-sm font-bold uppercase tracking-[0.22em] text-[var(--at-signal)]">
              AI Tracker HU
            </p>
            <h1
              id="at-hero-title"
              className="at-rise at-rise-1 at-h1 font-display text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.2] tracking-tight text-white"
            >
              A ChatGPT mást ajánl —{" "}
              <span className="text-[var(--at-warn)]">téged nem</span>
            </h1>
            <p className="at-rise at-rise-2 mt-6 max-w-lg text-lg leading-relaxed text-[var(--at-soft)] md:text-xl">
              Havi monitor magyar kulcsszavakra. ChatGPT, Perplexity, Gemini,
              Google AI. Látod, kit említ helyetted.
            </p>
            <div className="at-rise at-rise-3 mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/dashboard"
                className="inline-flex rounded-md bg-[var(--at-signal)] px-7 py-3.5 text-base font-bold text-[var(--at-ink)] transition hover:bg-white"
              >
                Első AI audit
              </Link>
              <a
                href="#problems"
                className="inline-flex rounded-md border border-[var(--at-line)] bg-white/5 px-6 py-3.5 text-base font-semibold text-white transition hover:border-[var(--at-signal)]"
              >
                Ismerős a baj?
              </a>
            </div>
            <p className="at-rise at-rise-3 mt-4 text-sm text-[var(--at-muted)]">
              14 900 Ft · PDF riport · Javítási terv
            </p>
            <ul className="at-rise at-rise-3 mt-8 grid max-w-lg gap-2 text-sm text-[var(--at-soft)]">
              {[
                "Ha a ChatGPT-t kérdezik, engem ajánl?",
                "Miért a rivális jelenik meg az AI válaszban?",
                "Van Search Console az AI keresőkre?",
              ].map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="text-[var(--at-warn)]">?</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="at-rise at-rise-2 relative min-w-0 w-full">
            <HeroVisual />
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--at-line)] bg-[var(--at-panel)]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5">
          <p className="text-sm text-[var(--at-muted)]">Figyelt platformok:</p>
          <div className="flex flex-wrap gap-3">
            {platforms.map((p) => (
              <span
                key={p}
                className="border border-[var(--at-line)] bg-[var(--at-panel-2)] px-3 py-1.5 text-sm font-medium text-white"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--at-line)] bg-[var(--at-ink)]" aria-labelledby="at-gallery">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h2 id="at-gallery" className="sr-only">
            AI Tracker HU vizuális példák
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <BrandedImage
              src="/images/aitracker-hero-bg.webp"
              alt="AI Tracker HU radar: ki jelenik meg az AI válaszban"
              caption="Radar nézet: hol vagy látható az AI keresőben."
              priority
            />
            <BrandedImage
              src="/images/aitracker-radar-premium.webp"
              alt="AI Tracker platformonkénti versenytárs említések"
              caption="4 platform · versenytárs lista · hiányzás jelzés."
            />
          </div>
        </div>
      </section>

      {/* PROBLEMS — business pain Qs */}
      <section id="problems" className="border-b border-[var(--at-line)] bg-[var(--at-panel)]">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--at-warn)]">
            Ismerős kérdések
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
            Ezeket kérdezik a vállalkozók. Az AI Tracker ezekre ad választ.
          </h2>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {[
              {
                q: "Ha valaki a ChatGPT-t kérdezi, engem ajánl?",
                a: "Ezt méri a Tracker. Platformonként, kulcsszónként. Tippelés helyett adat.",
              },
              {
                q: "A riválisom miért jön elő az AI válaszban?",
                a: "A riport megmutatja: kit említ, milyen forrásból. Utána tudsz javítani.",
              },
              {
                q: "A Search Console mutatja az AI láthatóságot?",
                a: "Nem. Nincs hivatalos AI Search Console. Ezért kell külön monitor.",
              },
              {
                q: "Mi az a zero-click veszteség?",
                a: "Az AI összefoglal és ajánl. A döntés a válaszban születik. Ha nincs a neved, nem jön lead.",
              },
              {
                q: "SEO toolom van. Az nem elég?",
                a: "A klasszikus SEO tool nem mondja meg, mit válaszol a ChatGPT vagy a Perplexity a kulcsszavadra.",
              },
              {
                q: "Milyen magyar promptokat érdemes figyelni?",
                a: "Szolgáltatás + város, „legjobb X”, „X ár”, „X ajánló”. Amit az ügyfeleid tényleg kérdeznek.",
              },
              {
                q: "Google Ads-re kölök. Az AI válaszban is ott vagyok?",
                a: "Nem feltétlenül. A hirdetés kattintást vesz. Az AI ajánlás organikus említés — ezt külön kell mérni.",
              },
              {
                q: "Helyi vállalkozás vagyok. Engem is érint az AI kereső?",
                a: "Igen. „legjobb fogorvos Debrecen” típusú kérdéseknél az AI neveket dob. Ha kimaradsz, a riválisé a telefon.",
              },
              {
                q: "Honnan tudom, hogy romlik vagy javul a láthatóságom?",
                a: "A Monitor havi trendet mutat: említés / hiányzás platformonként. Nem egyszeri tippelés.",
              },
              {
                q: "Ügynökségként hogyan adom tovább az ügyfélnek?",
                a: "Agency csomag: több domain, white-label PDF. Te prezentálod, te számlázol.",
              },
              {
                q: "Mi van, ha a Perplexity említ, a ChatGPT nem?",
                a: "Pont ezért scannelünk 4 platformot. Látod a különbséget, és hol kell erősíteni.",
              },
              {
                q: "Értékeléseim jók a Google-on. Az AI akkor engem ajánl?",
                a: "Segít, de nem garantál. Schema, tartalom, forráshelyek is számítanak — a riport ezeket is nézi.",
              },
              {
                q: "Mit csináljak, ha hiányzom az AI-ból?",
                a: "A riport ad javítási listát. Ha kell, a TD-AI AEO csomaggal meg is csináljuk.",
              },
              {
                q: "Mennyibe kerül először megnézni?",
                a: "Egyszeri audit 14 900 Ft. Ha rendszeresen akarod, Monitor 19 900 Ft/hó.",
              },
            ].map((item) => (
              <article
                key={item.q}
                className="rounded-xl border border-[var(--at-line)] bg-[var(--at-ink)] p-6 transition hover:border-[var(--at-signal)]/40"
              >
                <h3 className="text-lg font-semibold text-white">{item.q}</h3>
                <p className="mt-3 leading-relaxed text-[var(--at-muted)]">
                  <span className="font-semibold text-[var(--at-signal)]">Megoldás: </span>
                  {item.a}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHY + radar image */}
      <section id="why" className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--at-warn)]">
              Miért számít 2026-ban
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
              Az ügyfél már az AI-t kérdezi — nem csak a Google első oldalát.
            </h2>
            <p className="mt-5 text-lg text-[var(--at-muted)]">
              Ha a válaszban nincs a neved, a megkeresés el sem jut hozzád. Nincs
              kattintás, amit mérnél — csak csend.
            </p>
            <ul className="mt-8 space-y-4 text-[var(--at-muted)]">
              {[
                "Zero-click veszteség — a döntés az AI válaszban születik",
                "A konkurencia már említést kap — te láthatatlan vagy",
                "Nincs Search Console az AI-ra: tippelés helyett mérés kell",
              ].map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="text-[var(--at-signal)]">→</span>
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-[var(--at-line)]">
            <BrandedImage
              src="/images/aitracker-radar-premium.webp"
              alt="AI Tracker versenytárs radar — ki említett az AI válaszban"
              fill
              sizes="(max-width: 1024px) 100vw, 520px"
              badge="Ki hiányzik a radarról?"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--at-line)] bg-[var(--at-panel)]">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
            Mi az az AI Tracker HU?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--at-muted)]">
            Az AI Tracker HU egy magyar SaaS, amely rendszeresen lekérdezi a
            ChatGPT, Perplexity, Gemini és Google AI válaszait a te
            kulcsszavaidra, és megmutatja: említik-e a márkádat, kit ajánlanak
            helyetted, és milyen lépésekkel javíthatod a láthatóságodat.
          </p>
        </div>
      </section>

      {/* HOW + report image */}
      <section id="how" className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--at-signal)]">
              Így mérünk
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
              Domain + kulcsszavak → riport → terv
            </h2>
            <ol className="mt-10 space-y-8">
              {[
                {
                  n: "01",
                  title: "Beállítod, mit figyeljünk",
                  body: "Domain, márkanév, 5–10 magyar kulcsszó.",
                },
                {
                  n: "02",
                  title: "Scan a 4 AI platformon",
                  body: "Említés, citáció, versenytársak a válaszban.",
                },
                {
                  n: "03",
                  title: "Dashboard + PDF + teendők",
                  body: "Trend + javítási lista. Opcionális AEO végrehajtás.",
                },
              ].map((step) => (
                <li key={step.n} className="flex gap-4">
                  <span className="text-2xl font-bold text-[var(--at-signal)]/40">
                    {step.n}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-[var(--at-muted)]">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--at-line)]">
            <BrandedImage
              src="/images/aitracker-report-premium.webp"
              alt="AI Tracker HU PDF riport — említés, versenytárs, javítási terv"
              fill
              sizes="(max-width: 1024px) 100vw, 480px"
              badge="PDF riport + teendők"
            />
          </div>
        </div>

        <div className="mt-16 overflow-x-auto border border-[var(--at-line)] bg-[var(--at-panel)]">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--at-line)] text-[var(--at-muted)]">
                <th className="px-5 py-4 font-medium">Kérdés</th>
                <th className="px-5 py-4 font-medium">Klasszikus SEO tool</th>
                <th className="px-5 py-4 font-medium text-[var(--at-signal)]">
                  AI Tracker HU
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Megjelenek a ChatGPT-ben?", "Nem méri", "Igen — platformonként"],
                ["Kit ajánlanak helyettem?", "Nem mutatja", "Versenytárs lista"],
                ["Magyar promptok?", "Általános toolok", "Saját üzleti promptok"],
                ["AEO javítási terv?", "Általános SEO tippek", "Konkrét teendők"],
              ].map((row) => (
                <tr key={row[0]} className="border-b border-[var(--at-line)]/70">
                  <td className="px-5 py-4 font-medium text-white">{row[0]}</td>
                  <td className="px-5 py-4 text-[var(--at-muted)]">{row[1]}</td>
                  <td className="px-5 py-4 font-medium text-white">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="border-t border-[var(--at-line)] bg-[var(--at-panel)]">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="text-center text-sm font-bold uppercase tracking-[0.2em] text-[var(--at-signal)]">
            Árazás
          </p>
          <h2 className="mt-3 text-center font-display text-3xl font-bold text-white md:text-4xl">
            Először láss — aztán dönts, javítasz-e
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-[var(--at-muted)]">
            Egyszeri audit, ha csak pillanatképet akarsz. Monitor, ha nem akarsz
            meglepetést.
          </p>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`flex flex-col rounded-xl border p-8 ${
                  plan.featured
                    ? "border-[var(--at-signal)] bg-[var(--at-panel-2)] ring-1 ring-[var(--at-signal)]/35"
                    : "border-[var(--at-line)] bg-[var(--at-ink)]"
                }`}
              >
                {plan.featured && (
                  <span className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[var(--at-signal)]">
                    Ajánlott
                  </span>
                )}
                <h3 className="text-2xl font-semibold text-white">{plan.name}</h3>
                <p className="mt-1 text-sm text-[var(--at-muted)]">{plan.blurb}</p>
                <p className="mt-6 text-4xl font-semibold tracking-tight text-white">
                  {plan.price}
                  <span className="ml-1 text-base font-normal text-[var(--at-muted)]">
                    Ft/{plan.period}
                  </span>
                </p>
                <ul className="mt-6 flex-1 space-y-2.5 text-sm text-[var(--at-muted)]">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="text-[var(--at-signal)]">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/dashboard"
                  className={`mt-8 block rounded-md px-4 py-3 text-center text-sm font-bold transition ${
                    plan.featured
                      ? "bg-[var(--at-signal)] text-[var(--at-ink)] hover:bg-white"
                      : "border border-[var(--at-line)] text-white hover:border-[var(--at-signal)]"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="at-radar border-y border-[var(--at-line)]">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--at-signal)]">
            Proof
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-white">
            Először a saját domainünkön mérünk
          </h2>
          <p className="mt-4 text-lg text-[var(--at-muted)]">
            A tdaimarketing.hu lesz az első nyilvános case study.
          </p>
        </div>
      </section>

      {/* TUDÁSTÁR — SEO / AEO content hub */}
      <section id="tudastar" className="border-y border-[var(--at-line)] bg-[var(--at-ink)]">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--at-signal)]">
            Tudástár
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
            AEO és AI láthatóság — kiolvasható válaszok
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--at-soft)]">
            Mit jelent az AEO, mi a zero-click veszteség, milyen magyar promptokat
            érdemes figyelni — és mit tegyél, ha hiányzol az AI válaszból.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {tudastarArticles.map((article) => (
              <article
                key={article.id}
                id={`tudastar-${article.id}`}
                className="rounded-2xl border border-[var(--at-line)] bg-[var(--at-panel)] p-6 transition hover:border-[var(--at-signal)]/40"
                itemScope
                itemType="https://schema.org/Article"
              >
                <meta itemProp="inLanguage" content="hu-HU" />
                <h3
                  className="font-display text-xl font-bold leading-snug text-white"
                  itemProp="headline"
                >
                  {article.title}
                </h3>
                <p
                  className="mt-3 text-base leading-relaxed text-[var(--at-muted)]"
                  itemProp="description"
                >
                  {article.summary}
                </p>
                <div className="mt-4 rounded-xl border border-[var(--at-signal)]/20 bg-[var(--at-signal)]/5 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--at-signal)]">
                    Válasz
                  </p>
                  <p
                    className="mt-2 text-base leading-relaxed text-[var(--at-soft)]"
                    itemProp="articleBody"
                  >
                    {article.answer}
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[var(--at-line)] px-2.5 py-0.5 text-xs text-[var(--at-muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="bg-[var(--at-panel)]">
        <div className="mx-auto max-w-3xl px-6 py-24">
          <h2 className="font-display text-3xl font-bold text-white">
            Gyakori kérdések
          </h2>
          <div className="mt-10 divide-y divide-[var(--at-line)]">
            {faqs.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="cursor-pointer list-none text-lg font-semibold text-white marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start justify-between gap-4">
                    {item.q}
                    <span className="text-[var(--at-signal)] transition group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-[var(--at-muted)]">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="at-radar border-t border-[var(--at-line)]">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
            Ne derüljön ki fél év múlva, hogy az AI mást ajánlott.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-[var(--at-muted)]">
            Első scan 14 900 Ft. Ha hiányzol — legalább tudod. Ha ott vagy —
            dokumentálva van.
          </p>
          <Link
            href="/dashboard"
            className="mt-8 inline-flex rounded-md bg-[var(--at-signal)] px-8 py-4 text-base font-bold text-[var(--at-ink)] transition hover:bg-white"
          >
            Indítsd az első AI auditot
          </Link>
          <p className="mt-4 text-sm text-[var(--at-muted)]">
            <a
              href="https://tdaimarketing.hu"
              className="font-semibold text-[var(--at-signal)] underline-offset-2 hover:underline"
            >
              tdaimarketing.hu
            </a>{" "}
            · +36 30 352 7975
          </p>
        </div>
      </section>

      <footer className="border-t border-[var(--at-line)] bg-[var(--at-ink)] py-10 text-center text-sm text-[var(--at-muted)]">
        <p className="text-lg font-semibold text-white">
          AI Tracker <span className="text-[var(--at-signal)]">HU</span>
        </p>
        <p className="mt-2">
          by{" "}
          <a
            href="https://tdaimarketing.hu"
            className="font-medium text-white hover:text-[var(--at-signal)]"
          >
            TD-AI & Marketing
          </a>
        </p>
      </footer>
    </div>
  );
}
