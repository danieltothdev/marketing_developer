import Link from "next/link";

const plans = [
  {
    name: "Start",
    price: "7 990",
    blurb: "Egy bot, ami éjjel is dolgozik.",
    features: [
      "1 chatbot a weboldaladon",
      "500 üzenet / hó",
      "Lead gyűjtés (név, telefon, email)",
      "Azonnali email értesítés",
      "Magyar AI válaszok",
    ],
    cta: "Kezdd a Starttal",
  },
  {
    name: "Pro",
    price: "14 990",
    blurb: "A legtöbb KKV-nak ezt ajánljuk.",
    featured: true,
    features: [
      "Korlátlan üzenet",
      "Saját színek és hangnem",
      "CRM / Zapier webhook",
      "Prioritás válaszidő",
      "Heti lead összesítő",
    ],
    cta: "Pro — 14 nap próba",
  },
  {
    name: "Partner",
    price: "99 990",
    blurb: "Ügynökségeknek, white-labelben.",
    features: [
      "20 chatbot / ügyfél",
      "Saját branding, nincs ChatWhite logo",
      "Saját aldomain",
      "Ügynökségi dashboard",
      "Partner support",
    ],
    cta: "Partner érdeklődés",
  },
];

const faqs = [
  {
    q: "Mennyi idő, mire él a chatbot a weboldalamon?",
    a: "Általában 10–15 perc. Bemásolod a scriptet, megadod a szolgáltatásaidat — a bot azonnal válaszol magyarul.",
  },
  {
    q: "Nem lesz gagyi, generikus válasz?",
    a: "A bot a te áraidra, szolgáltatásaidra és gyakori kérdéseidre tanítható. Nem „általános AI”, hanem a céged hangja.",
  },
  {
    q: "Mi történik, ha valaki ajánlatot kér este?",
    a: "A bot összegyűjti a nevet, telefont, emailcímet, és azonnal emailt küld neked. Te döntöd el, mikor hívod vissza — a lead nem vész el.",
  },
  {
    q: "Kell bankkártya a próbaidőhöz?",
    a: "Nem. 14 napig ingyen kipróbálhatod. Ha nem jön be, egyszerűen leállítod — nincs kötbér.",
  },
  {
    q: "Ügynökségként eladhatom a saját nevem alatt?",
    a: "Igen — a Partner csomag white-label: saját logo, színek, domain. Te számlázol az ügyfélnek.",
  },
  {
    q: "Miben más, mint a Facebook Messenger bot?",
    a: "A ChatWhite a te weboldaladon él — ahol a hirdetésedből érkező látogató már érdeklődik. Nincs Messenger-függőség, és a lead nálad van.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "ChatWhite",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      inLanguage: "hu-HU",
      description:
        "Magyar nyelvű, beágyazható AI chatbot KKV-knak — 24/7 lead gyűjtés és azonnali értesítés.",
      offers: [
        {
          "@type": "Offer",
          name: "Start",
          price: "7990",
          priceCurrency: "HUF",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "7990",
            priceCurrency: "HUF",
            billingDuration: "P1M",
          },
        },
        {
          "@type": "Offer",
          name: "Pro",
          price: "14990",
          priceCurrency: "HUF",
        },
      ],
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
    <div className="min-h-screen overflow-x-hidden text-[var(--cw-ink)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="relative z-20 mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href="#" className="font-display text-2xl font-extrabold tracking-tight">
          Chat<span className="text-[var(--cw-mint)]">White</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm font-medium text-[var(--cw-muted)] md:flex">
          <a href="#problem" className="hover:text-[var(--cw-ink)]">
            Probléma
          </a>
          <a href="#how" className="hover:text-[var(--cw-ink)]">
            Így működik
          </a>
          <a href="#pricing" className="hover:text-[var(--cw-ink)]">
            Árak
          </a>
          <a href="#faq" className="hover:text-[var(--cw-ink)]">
            FAQ
          </a>
        </nav>
        <Link
          href="/dashboard"
          className="rounded-md bg-[var(--cw-mint-deep)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--cw-mint)]"
        >
          14 nap próba
        </Link>
      </header>

      {/* HERO — brand first, one composition, full-bleed atmosphere */}
      <section className="cw-mesh relative isolate min-h-[calc(100svh-4.5rem)] overflow-hidden">
        <div className="cw-grid absolute inset-0 opacity-60" aria-hidden />
        <div
          className="cw-drift pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-[var(--cw-mint)]/20 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-sky-300/25 blur-3xl"
          aria-hidden
        />

        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-6 pb-16 pt-10 lg:grid-cols-12 lg:gap-8 lg:pb-20 lg:pt-6">
          <div className="lg:col-span-6">
            <p className="cw-rise mb-5 text-sm font-semibold uppercase tracking-[0.22em] text-[var(--cw-mint-deep)]">
              ChatWhite
            </p>
            <h1 className="cw-rise cw-rise-delay-1 font-display text-[clamp(2.4rem,5.5vw,4.25rem)] font-extrabold leading-[1.05] tracking-tight">
              A hétvégi megkeresés
              <span className="block text-[var(--cw-mint-deep)]">
                ne a konkurenciához menjen.
              </span>
            </h1>
            <p className="cw-rise cw-rise-delay-2 mt-6 max-w-xl text-lg leading-relaxed text-[var(--cw-muted)] md:text-xl">
              Magyar AI chatbot a weboldaladon: válaszol, leadet gyűjt, azonnal
              értesít — akkor is, ha te alszol vagy a családdal vagy.
            </p>
            <div className="cw-rise cw-rise-delay-3 mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-md bg-[var(--cw-mint-deep)] px-7 py-3.5 text-base font-semibold text-white shadow-[0_1px_0_rgba(255,255,255,0.2)_inset] transition hover:bg-[var(--cw-mint)]"
              >
                Indítsd a 14 napos próbát
              </Link>
              <a
                href="#how"
                className="inline-flex items-center justify-center rounded-md border border-[var(--cw-line)] bg-white/50 px-6 py-3.5 text-base font-semibold text-[var(--cw-ink)] backdrop-blur-sm transition hover:border-[var(--cw-mint)]"
              >
                Így működik
              </a>
            </div>
            <p className="cw-rise cw-rise-delay-3 mt-4 text-sm text-[var(--cw-muted)]">
              Bankkártya nélkül · 1 sor kód · Bármikor lemondható
            </p>
          </div>

          {/* Product visual — edge-to-edge feel on large screens */}
          <div className="cw-rise cw-rise-delay-2 relative lg:col-span-6">
            <div className="relative mx-auto max-w-md lg:ml-auto lg:max-w-none">
              <div className="overflow-hidden rounded-2xl border border-[var(--cw-line)] bg-[#0b1f1a] text-[#e8f5ef] shadow-[0_24px_60px_-28px_rgba(11,31,26,0.55)]">
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="cw-pulse-dot h-2 w-2 rounded-full bg-[var(--cw-mint)]" />
                    <span className="text-sm font-medium">Élő a weboldalon</span>
                  </div>
                  <span className="text-xs text-white/50">Szombat 22:41</span>
                </div>
                <div className="space-y-3 p-4 text-sm leading-relaxed">
                  <div className="cw-bubble max-w-[85%] rounded-2xl rounded-tl-sm bg-white/10 px-3.5 py-2.5">
                    Szia! Klímaszerelést keresek Debrecenben. Holnap tudnátok
                    jönni?
                  </div>
                  <div className="cw-bubble cw-bubble-2 ml-auto max-w-[88%] rounded-2xl rounded-tr-sm bg-[var(--cw-mint)]/25 px-3.5 py-2.5 text-[#d8ffe9]">
                    Igen — Debrecenben és 30 km-es körzetben dolgozunk. Holnap
                    9–12 vagy 14–17 között van szabad időnk. Milyen típusú
                    klímáról van szó?
                  </div>
                  <div className="cw-bubble cw-bubble-3 max-w-[80%] rounded-2xl rounded-tl-sm bg-white/10 px-3.5 py-2.5">
                    Split, 3,5 kW. A telefonom: 06 30 …
                  </div>
                </div>
                <div className="border-t border-white/10 bg-white/5 px-4 py-3 text-xs text-[#9fd4bb]">
                  Lead mentve · Email elküldve a tulajdonosnak · 12 mp alatt
                </div>
              </div>
              <p className="mt-3 text-center text-xs text-[var(--cw-muted)] lg:text-right">
                Tipikus este: érdeklődő ír → bot kérdez → te reggel visszahívod
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust / social proof strip */}
      <section className="border-y border-[var(--cw-line)] bg-white/70">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-6 py-6 text-sm text-[var(--cw-muted)]">
          <p>
            <span className="font-semibold text-[var(--cw-ink)]">KKV-knak</span>{" "}
            — szerelő, szépség, B2B szolgáltató
          </p>
          <p>
            <span className="font-semibold text-[var(--cw-ink)]">Magyar AI</span>{" "}
            — nem angol fordítás
          </p>
          <p>
            <span className="font-semibold text-[var(--cw-ink)]">
              TD-AI Marketing
            </span>{" "}
            — Debrecenből, országosan
          </p>
        </div>
      </section>

      {/* PROBLEM — PAS */}
      <section id="problem" className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--cw-mint-deep)]">
          A valódi költség
        </p>
        <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold tracking-tight md:text-4xl">
          A weboldalad éjjel is forgalmat kap. Te nem.
        </h2>
        <p className="mt-5 max-w-2xl text-lg text-[var(--cw-muted)]">
          A látogató kérdez — te alszol, a családdal vagy, vagy a következő
          munkán vagy. Másnap a telefonja már a következő találatot hívja.
        </p>

        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {[
            {
              title: "Elveszett lead = elveszett munka",
              body: "Egy kihagyott ajánlatkérés gyakran 30–80 ezer Ft-nyi munka. Havi 4–5 ilyen, és a chatbot ára eltörpül.",
            },
            {
              title: "A „majd visszahívom” nem stratégia",
              body: "Ha a válasz több órát késik, a döntés máshol születik meg. Az ügyfél nem vár — keres.",
            },
            {
              title: "A hirdetésed fizet a forgalomért",
              body: "Google és Meta pénzt éget, ha a landing nem gyűjt leadet. A chatbot a forgalmat megkereséssé alakítja.",
            },
          ].map((item) => (
            <div key={item.title} className="border-t border-[var(--cw-line)] pt-6">
              <h3 className="font-display text-xl font-bold">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-[var(--cw-muted)]">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SOLUTION / benefits */}
      <section className="cw-mesh border-y border-[var(--cw-line)]">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--cw-mint-deep)]">
            A megoldás
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold tracking-tight md:text-4xl">
            Egy bot, ami a te nevedben beszél — és leadet ad át.
          </h2>
          <div className="mt-14 grid gap-12 lg:grid-cols-2">
            {[
              {
                title: "Magyarul, a te szolgáltatásaiddal",
                body: "Árak, területek, gyakori kérdések — a bot tudja, mit kínálsz. Nem „ChatGPT a weboldalon”, hanem a céged ügyfélszerzője.",
              },
              {
                title: "Lead, nem csak csevegés",
                body: "Név, telefon, email. Azonnali email neked. Opcionálisan CRM / Google Sheets webhook — hogy ne vesszen el a táblázatban.",
              },
              {
                title: "1 sor kód — nincs IT projekt",
                body: "Script a footerbe. Kész. Nincs bonyolult integráció, nincs hetekig tartó bevezetés.",
              },
              {
                title: "White-label ügynökségeknek",
                body: "A Partner csomaggal a saját márkád alatt adod el. Te számlázol, a ChatWhite a háttérben fut.",
              },
            ].map((item) => (
              <div key={item.title}>
                <h3 className="font-display text-2xl font-bold">{item.title}</h3>
                <p className="mt-3 max-w-md leading-relaxed text-[var(--cw-muted)]">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--cw-mint-deep)]">
          Így működik
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
          Három lépés. Ma élhet.
        </h2>
        <ol className="mt-12 grid gap-8 md:grid-cols-3">
          {[
            {
              n: "01",
              title: "Regisztrálj és tanítsd",
              body: "Megadod a szolgáltatásokat, területeket, hangnemet. 10 perc — nem kell programozni.",
            },
            {
              n: "02",
              title: "Beágyazod a scriptet",
              body: "Egy sor a weboldaladra. A widget megjelenik — mobilra is optimalizálva.",
            },
            {
              n: "03",
              title: "Lead érkezik — te hívsz",
              body: "Értesítést kapsz. Visszahívod, amikor neked jó. A bot addig is válaszolt.",
            },
          ].map((step) => (
            <li key={step.n} className="relative">
              <span className="font-display text-5xl font-extrabold text-[var(--cw-mint)]/25">
                {step.n}
              </span>
              <h3 className="mt-2 font-display text-xl font-bold">{step.title}</h3>
              <p className="mt-2 text-[var(--cw-muted)]">{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-14 border border-[var(--cw-line)] bg-[#0b1f1a] p-6 text-[#9fd4bb] md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--cw-mint)]">
            Beágyazás
          </p>
          <pre className="mt-3 overflow-x-auto text-sm leading-relaxed text-[#d8ffe9]">
            {`<script src="https://chatwhite.hu/widget.js" data-key="YOUR_EMBED_KEY"></script>`}
          </pre>
        </div>
      </section>

      {/* Before / After — BAB micro */}
      <section className="border-y border-[var(--cw-line)] bg-white/80">
        <div className="mx-auto grid max-w-6xl gap-0 px-6 md:grid-cols-2">
          <div className="border-b border-[var(--cw-line)] py-14 md:border-b-0 md:border-r md:pr-12">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-700/70">
              Előtte
            </p>
            <h3 className="mt-3 font-display text-2xl font-bold">
              Érdeklődő ír este → válasz holnap → már mást hívott
            </h3>
            <p className="mt-4 text-[var(--cw-muted)]">
              A hirdetés fizetett a kattintásért. A munka máshova ment.
            </p>
          </div>
          <div className="py-14 md:pl-12">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--cw-mint-deep)]">
              Utána
            </p>
            <h3 className="mt-3 font-display text-2xl font-bold">
              Érdeklődő ír este → bot válaszol → te reggel visszahívod
            </h3>
            <p className="mt-4 text-[var(--cw-muted)]">
              Ugyanabból a forgalomból több ajánlatkérés — mérhetően.
            </p>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-[var(--cw-mint-deep)]">
          Árazás
        </p>
        <h2 className="mt-3 text-center font-display text-3xl font-bold tracking-tight md:text-4xl">
          Kevesebb, mint egy elszalasztott munka ára
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-[var(--cw-muted)]">
          Havidíj. Bármikor lemondható. 14 nap próba bankkártya nélkül.
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col rounded-xl border p-8 ${
                plan.featured
                  ? "border-[var(--cw-mint)] bg-[var(--cw-foam)] ring-1 ring-[var(--cw-mint)]/40"
                  : "border-[var(--cw-line)] bg-white/70"
              }`}
            >
              {plan.featured && (
                <span className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--cw-mint-deep)]">
                  Ajánlott
                </span>
              )}
              <h3 className="font-display text-2xl font-bold">{plan.name}</h3>
              <p className="mt-1 text-sm text-[var(--cw-muted)]">{plan.blurb}</p>
              <p className="mt-6 font-display text-4xl font-extrabold tracking-tight">
                {plan.price}
                <span className="ml-1 text-base font-medium text-[var(--cw-muted)]">
                  Ft/hó
                </span>
              </p>
              <ul className="mt-6 flex-1 space-y-2.5 text-sm text-[var(--cw-muted)]">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-[var(--cw-mint)]" aria-hidden>
                      ✓
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/dashboard"
                className={`mt-8 block rounded-md px-4 py-3 text-center text-sm font-semibold transition ${
                  plan.featured
                    ? "bg-[var(--cw-mint-deep)] text-white hover:bg-[var(--cw-mint)]"
                    : "border border-[var(--cw-line)] bg-white hover:border-[var(--cw-mint)]"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-[var(--cw-muted)]">
          Garantáltan: ha 14 napon belül nem érzed hasznosnak, leállítod — nincs
          kötbér, nincs „éves elköteleződés”.
        </p>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-[var(--cw-line)] bg-white/60">
        <div className="mx-auto max-w-3xl px-6 py-24">
          <h2 className="font-display text-3xl font-bold tracking-tight">
            Gyakori kérdések
          </h2>
          <div className="mt-10 divide-y divide-[var(--cw-line)]">
            {faqs.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="cursor-pointer list-none font-display text-lg font-semibold marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start justify-between gap-4">
                    {item.q}
                    <span className="text-[var(--cw-mint)] transition group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-[var(--cw-muted)]">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="cw-mesh relative overflow-hidden border-t border-[var(--cw-line)]">
        <div className="relative z-10 mx-auto max-w-3xl px-6 py-24 text-center">
          <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
            Ne veszíts el még egy esti megkeresést.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-[var(--cw-muted)]">
            14 nap. Bankkártya nélkül. Ha nem hoz leadet — leállítod. Ha hoz —
            megtartod.
          </p>
          <Link
            href="/dashboard"
            className="mt-8 inline-flex rounded-md bg-[var(--cw-mint-deep)] px-8 py-4 text-base font-semibold text-white transition hover:bg-[var(--cw-mint)]"
          >
            Indítsd a ChatWhite próbát
          </Link>
          <p className="mt-4 text-sm text-[var(--cw-muted)]">
            Kérdés?{" "}
            <a
              href="https://tdaimarketing.hu"
              className="font-semibold text-[var(--cw-mint-deep)] underline-offset-2 hover:underline"
            >
              tdaimarketing.hu
            </a>{" "}
            · +36 30 352 7975
          </p>
        </div>
      </section>

      <footer className="border-t border-[var(--cw-line)] bg-white/80 py-10 text-center text-sm text-[var(--cw-muted)]">
        <p className="font-display text-lg font-bold text-[var(--cw-ink)]">
          Chat<span className="text-[var(--cw-mint)]">White</span>
        </p>
        <p className="mt-2">
          by{" "}
          <a
            href="https://tdaimarketing.hu"
            className="font-medium text-[var(--cw-ink)] hover:text-[var(--cw-mint-deep)]"
          >
            TD-AI & Marketing
          </a>
        </p>
      </footer>
    </div>
  );
}
