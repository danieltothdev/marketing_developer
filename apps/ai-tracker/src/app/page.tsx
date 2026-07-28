import Link from "next/link";

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
    a: "Amikor valaki a ChatGPT-t, Perplexity-t vagy a Google AI-t kérdezi („ki a legjobb fogorvos Debrecenben?”), az AI neveket és forrásokat ajánl. Ha te nem vagy a listán, a megkeresés máshova megy — anélkül, hogy Google Ads-et látnál.",
  },
  {
    q: "Ez nem ugyanaz, mint a klasszikus SEO?",
    a: "Részben átfed. A Google AI Overviews még erősen a hagyományos rangsorra épül. A ChatGPT és a Perplexity viszont másképp válogat forrást: struktúra, E-E-A-T, harmadik fél említések. Az AI Tracker mindkét világot méri.",
  },
  {
    q: "Milyen kulcsszavakat érdemes figyelni?",
    a: "Azt, amit az ügyfeleid kérdeznek magyarul: szolgáltatás + város, „legjobb X”, „X ár”, „X ajánló”. Pl. „klímaszerelő Debrecen”, „marketing ügynökség KKV”.",
  },
  {
    q: "Mit kapok, ha nem említenek?",
    a: "Nem csak egy piros X-et: konkrét javítási listát (értékelések, schema, tartalom, forráshelyek). Ha kell, a TD-AI AEO csomaggal meg is csináljuk.",
  },
  {
    q: "Mennyi idő egy scan?",
    a: "Az első audit általában 1 munkanapon belül kész. A Monitor csomagnál havonta automatikusan fut, és emailt kapsz.",
  },
  {
    q: "Kell technikai tudás a javításhoz?",
    a: "A riport közérthető. A technikai lépéseket (schema, llms.txt) leírjuk; ha nincs rá kapacitásod, ügynökségi segítség is kérhető.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "AI Tracker HU",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      inLanguage: "hu-HU",
      description:
        "Magyar AI kereső láthatóság monitor: ChatGPT, Perplexity, Gemini és Google AI említések mérése kulcsszavanként.",
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "14900",
        highPrice: "79900",
        priceCurrency: "HUF",
      },
      provider: {
        "@type": "Organization",
        name: "TD-AI & Marketing",
        url: "https://tdaimarketing.hu",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    },
  ],
};

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden text-[var(--at-ink)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="relative z-20 mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href="#" className="text-xl font-semibold tracking-tight">
          AI Tracker{" "}
          <span className="text-[var(--at-signal)]">HU</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm font-medium text-[var(--at-muted)] md:flex">
          <a href="#why" className="hover:text-[var(--at-ink)]">
            Miért számít
          </a>
          <a href="#how" className="hover:text-[var(--at-ink)]">
            Így mérünk
          </a>
          <a href="#pricing" className="hover:text-[var(--at-ink)]">
            Árak
          </a>
          <a href="#faq" className="hover:text-[var(--at-ink)]">
            FAQ
          </a>
        </nav>
        <Link
          href="/dashboard"
          className="rounded-md bg-[var(--at-signal-deep)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--at-signal)]"
        >
          Első scan
        </Link>
      </header>

      {/* HERO */}
      <section className="at-radar relative isolate min-h-[calc(100svh-4.5rem)] overflow-hidden">
        <div className="at-rings absolute inset-0 opacity-80" aria-hidden />
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2"
          aria-hidden
        >
          <div className="at-sweep absolute inset-0 rounded-full border border-[var(--at-signal)]/20">
            <div className="absolute left-1/2 top-1/2 h-1/2 w-px origin-bottom -translate-x-1/2 bg-gradient-to-t from-[var(--at-signal)]/50 to-transparent" />
          </div>
        </div>

        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-6 pb-16 pt-10 lg:grid-cols-12 lg:pb-20 lg:pt-4">
          <div className="lg:col-span-6">
            <p className="at-rise mb-5 text-sm font-semibold uppercase tracking-[0.22em] text-[var(--at-signal-deep)]">
              AI Tracker HU
            </p>
            <h1 className="at-rise at-rise-1 font-serif text-[clamp(2.35rem,5.2vw,4rem)] font-bold leading-[1.08] tracking-tight">
              A ChatGPT a konkurenciát ajánlja.
              <span className="mt-1 block text-[var(--at-warn)]">
                Téged nem.
              </span>
            </h1>
            <p className="at-rise at-rise-2 mt-6 max-w-xl font-serif text-lg leading-relaxed text-[var(--at-muted)] md:text-xl">
              Havi monitor magyar kulcsszavakra: megjelenik-e a céged a ChatGPT,
              Perplexity, Gemini és Google AI válaszaiban — és kit említ helyetted.
            </p>
            <div className="at-rise at-rise-3 mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/dashboard"
                className="inline-flex rounded-md bg-[var(--at-signal-deep)] px-7 py-3.5 text-base font-semibold text-white transition hover:bg-[var(--at-signal)]"
              >
                Kérem az első AI auditot
              </Link>
              <a
                href="#pricing"
                className="inline-flex rounded-md border border-[var(--at-line)] bg-white/60 px-6 py-3.5 text-base font-semibold backdrop-blur-sm transition hover:border-[var(--at-signal)]"
              >
                Árak megtekintése
              </a>
            </div>
            <p className="at-rise at-rise-3 mt-4 text-sm text-[var(--at-muted)]">
              Első scan 14 900 Ft · PDF riport · Javítási terv
            </p>
          </div>

          {/* Competitor FOMO visual */}
          <div className="at-rise at-rise-2 lg:col-span-6">
            <div className="mx-auto max-w-md overflow-hidden rounded-xl border border-[var(--at-line)] bg-[#0b1220] text-[#e8eef6] shadow-[0_28px_60px_-30px_rgba(11,18,32,0.65)] lg:ml-auto lg:max-w-none">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <span className="text-sm font-medium">
                  Prompt: „legjobb klímaszerelő Debrecen”
                </span>
                <span className="at-blink text-xs text-[var(--at-warn)]">
                  Te: nincs említés
                </span>
              </div>
              <div className="space-y-0 p-2 text-sm">
                {[
                  { rank: "1", name: "Kovács Klíma Kft.", note: "ChatGPT · Perplexity", ok: true },
                  { rank: "2", name: "Debrecen Cool Service", note: "Gemini · Google AI", ok: true },
                  { rank: "3", name: "Észak-Alföld HVAC", note: "ChatGPT", ok: true },
                  { rank: "—", name: "A te céged", note: "0 / 4 platform", ok: false },
                ].map((row) => (
                  <div
                    key={row.name}
                    className={`flex items-center justify-between rounded-lg px-3 py-3 ${
                      row.ok ? "text-white/85" : "bg-[var(--at-warn)]/15 text-[#ffd2b8]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 font-semibold text-white/40">
                        {row.rank}
                      </span>
                      <div>
                        <p className="font-medium">{row.name}</p>
                        <p className="text-xs opacity-60">{row.note}</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wide">
                      {row.ok ? "említve" : "hiányzol"}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 px-4 py-3 text-xs text-white/50">
                Forrás: AI Tracker HU minta-riport · 4 platform
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platforms strip */}
      <section className="border-y border-[var(--at-line)] bg-white/70">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5">
          <p className="text-sm text-[var(--at-muted)]">Figyelt platformok:</p>
          <div className="flex flex-wrap gap-3">
            {platforms.map((p) => (
              <span
                key={p}
                className="border border-[var(--at-line)] bg-[var(--at-panel)] px-3 py-1.5 text-sm font-medium"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* WHY — problem / loss aversion */}
      <section id="why" className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--at-signal-deep)]">
          Miért számít 2026-ban
        </p>
        <h2 className="mt-3 max-w-3xl font-serif text-3xl font-bold tracking-tight md:text-4xl">
          Az ügyfél már nem csak a Google első oldalát nézi — az AI-t kérdezi.
        </h2>
        <p className="mt-5 max-w-2xl text-lg text-[var(--at-muted)]">
          Ha a válaszban nincs a neved, a megkeresés el sem jut hozzád. Nincs
          kattintás, amit mérnél — csak csend.
        </p>

        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {[
            {
              title: "Zero-click veszteség",
              body: "Az AI összefoglal és ajánl. A látogató gyakran nem kattint tovább — a döntés a válaszban születik meg.",
            },
            {
              title: "A konkurencia már ott van",
              body: "Ha ők kapnak említést, te „láthatatlan” vagy — még akkor is, ha a Google Ads-ed fut.",
            },
            {
              title: "Nem tudod, amíg nem méred",
              body: "Nincs Search Console az AI-ra. Tippelés helyett: platformonként, kulcsszónként, havonta.",
            },
          ].map((item) => (
            <div key={item.title} className="border-t-2 border-[var(--at-ink)] pt-5">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-[var(--at-muted)]">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Answer block — ai-seo extractable */}
      <section className="border-y border-[var(--at-line)] bg-[var(--at-panel)]/60">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <h2 className="font-serif text-2xl font-bold md:text-3xl">
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

      {/* HOW */}
      <section id="how" className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--at-signal-deep)]">
          Így mérünk
        </p>
        <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight md:text-4xl">
          Domain + kulcsszavak → riport → terv
        </h2>
        <ol className="mt-12 grid gap-8 md:grid-cols-3">
          {[
            {
              n: "01",
              title: "Beállítod, mit figyeljünk",
              body: "Domain, márkanév, 5–10 magyar kulcsszó — amit az ügyfeleid tényleg kérdeznek.",
            },
            {
              n: "02",
              title: "Scan a 4 AI platformon",
              body: "Ugyanazokra a promptokra: említés, citáció, versenytársak a válaszban.",
            },
            {
              n: "03",
              title: "Dashboard + PDF + teendők",
              body: "Látod a trendet. Kapod a javítási listát. Opcionálisan AEO csomag a végrehajtáshoz.",
            },
          ].map((step) => (
            <li key={step.n}>
              <span className="text-4xl font-semibold text-[var(--at-signal)]/30">
                {step.n}
              </span>
              <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-[var(--at-muted)]">{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="text-xl font-semibold">Mit kapsz a riportban</h3>
            <ul className="mt-4 space-y-3 text-[var(--at-muted)]">
              {[
                "Platformonként: említve / nincs említés",
                "Kik jelennek meg helyetted a válaszban",
                "Melyik kulcsszón vagy erős / gyenge",
                "E-E-A-T és tartalom javaslatok",
                "Schema / forráshely tippek (ahol releváns)",
              ].map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="text-[var(--at-signal)]">→</span>
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-[var(--at-line)] bg-white/80 p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--at-signal-deep)]">
              Példa insight
            </p>
            <p className="mt-4 font-serif text-xl leading-snug">
              „A „marketing ügynökség Debrecen” promptnál a ChatGPT 3 céget
              említ — a tiéd nincs köztük. A Perplexity egy blogposztot citál,
              ami nem a tied.”
            </p>
            <p className="mt-4 text-sm text-[var(--at-muted)]">
              Következő lépés a riportban: 2 új értékelés-oldal + 1 összehasonlító
              cikk + LocalBusiness schema.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison table — ai-seo friendly */}
      <section className="border-y border-[var(--at-line)] bg-white/70">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-serif text-3xl font-bold">
            Klasszikus SEO vs. AI Tracker
          </h2>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--at-line)] text-[var(--at-muted)]">
                  <th className="py-3 pr-4 font-medium">Kérdés</th>
                  <th className="py-3 pr-4 font-medium">Search Console / SEO tool</th>
                  <th className="py-3 font-medium text-[var(--at-signal-deep)]">
                    AI Tracker HU
                  </th>
                </tr>
              </thead>
              <tbody className="text-[var(--at-ink)]">
                {[
                  ["Megjelenek a ChatGPT-ben?", "Nem méri", "Igen — platformonként"],
                  ["Kit ajánlanak helyettem?", "Nem mutatja", "Versenytárs lista a válaszból"],
                  ["Magyar promptok?", "Kulcsszó toolok", "Saját, üzleti nyelvű promptok"],
                  ["Mit javítsak az AEO-hoz?", "Általános SEO tippek", "Riport + konkrét teendők"],
                ].map((row) => (
                  <tr key={row[0]} className="border-b border-[var(--at-line)]/70">
                    <td className="py-4 pr-4 font-medium">{row[0]}</td>
                    <td className="py-4 pr-4 text-[var(--at-muted)]">{row[1]}</td>
                    <td className="py-4 font-medium">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-[var(--at-signal-deep)]">
          Árazás
        </p>
        <h2 className="mt-3 text-center font-serif text-3xl font-bold md:text-4xl">
          Először láss — aztán dönts, javítasz-e
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-[var(--at-muted)]">
          Egyszeri audit, ha csak pillanatképet akarsz. Monitor, ha nem akarsz
          meglepetést hónapról hónapra.
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col rounded-xl border p-8 ${
                plan.featured
                  ? "border-[var(--at-signal)] bg-[var(--at-panel)] ring-1 ring-[var(--at-signal)]/30"
                  : "border-[var(--at-line)] bg-white/80"
              }`}
            >
              {plan.featured && (
                <span className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--at-signal-deep)]">
                  Ajánlott
                </span>
              )}
              <h3 className="text-2xl font-semibold">{plan.name}</h3>
              <p className="mt-1 text-sm text-[var(--at-muted)]">{plan.blurb}</p>
              <p className="mt-6 text-4xl font-semibold tracking-tight">
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
                className={`mt-8 block rounded-md px-4 py-3 text-center text-sm font-semibold transition ${
                  plan.featured
                    ? "bg-[var(--at-signal-deep)] text-white hover:bg-[var(--at-signal)]"
                    : "border border-[var(--at-line)] bg-white hover:border-[var(--at-signal)]"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Proof / agency bridge */}
      <section className="border-y border-[var(--at-line)] at-radar">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--at-signal-deep)]">
            Proof
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold">
            Először a saját domainünkön mérünk
          </h2>
          <p className="mt-4 text-lg text-[var(--at-muted)]">
            A tdaimarketing.hu lesz az első nyilvános case study — mert ha mi nem
            merjük mérni magunkat, miért várnánk el tőled?
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-white/70">
        <div className="mx-auto max-w-3xl px-6 py-24">
          <h2 className="font-serif text-3xl font-bold">Gyakori kérdések</h2>
          <div className="mt-10 divide-y divide-[var(--at-line)]">
            {faqs.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="cursor-pointer list-none text-lg font-semibold marker:content-none [&::-webkit-details-marker]:hidden">
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

      {/* FINAL CTA */}
      <section className="at-radar border-t border-[var(--at-line)]">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <h2 className="font-serif text-3xl font-bold md:text-4xl">
            Ne derüljön ki fél év múlva, hogy az AI mást ajánlott.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-[var(--at-muted)]">
            Első scan 14 900 Ft. Ha a riport azt mutatja, hogy hiányzol — legalább
            tudod. Ha ott vagy — dokumentálva van.
          </p>
          <Link
            href="/dashboard"
            className="mt-8 inline-flex rounded-md bg-[var(--at-signal-deep)] px-8 py-4 text-base font-semibold text-white transition hover:bg-[var(--at-signal)]"
          >
            Indítsd az első AI auditot
          </Link>
          <p className="mt-4 text-sm text-[var(--at-muted)]">
            <a
              href="https://tdaimarketing.hu"
              className="font-semibold text-[var(--at-signal-deep)] underline-offset-2 hover:underline"
            >
              tdaimarketing.hu
            </a>{" "}
            · +36 30 352 7975
          </p>
        </div>
      </section>

      <footer className="border-t border-[var(--at-line)] bg-white/80 py-10 text-center text-sm text-[var(--at-muted)]">
        <p className="text-lg font-semibold text-[var(--at-ink)]">
          AI Tracker <span className="text-[var(--at-signal)]">HU</span>
        </p>
        <p className="mt-2">
          by{" "}
          <a
            href="https://tdaimarketing.hu"
            className="font-medium text-[var(--at-ink)] hover:text-[var(--at-signal-deep)]"
          >
            TD-AI & Marketing
          </a>
        </p>
      </footer>
    </div>
  );
}
