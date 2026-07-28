import Image from "next/image";
import Link from "next/link";

function Brand({ className = "text-2xl" }: { className?: string }) {
  return (
    <span className={`font-display font-extrabold tracking-tight ${className}`}>
      <span className="brand-chat">Chat</span>
      <span className="brand-white">White</span>
    </span>
  );
}

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
      "@type": "Organization",
      "@id": "https://chatwhite.hu/#organization",
      name: "ChatWhite",
      url: "https://chatwhite.hu",
      logo: "https://chatwhite.hu/images/chatwhite-hero.webp",
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
      "@id": "https://chatwhite.hu/#website",
      url: "https://chatwhite.hu",
      name: "ChatWhite",
      inLanguage: "hu-HU",
      publisher: { "@id": "https://chatwhite.hu/#organization" },
    },
    {
      "@type": "WebPage",
      "@id": "https://chatwhite.hu/#webpage",
      url: "https://chatwhite.hu",
      name: "ChatWhite — Magyar AI chatbot KKV-knak",
      isPartOf: { "@id": "https://chatwhite.hu/#website" },
      about: { "@id": "https://chatwhite.hu/#software" },
      inLanguage: "hu-HU",
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://chatwhite.hu/#software",
      name: "ChatWhite",
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "AI Chatbot",
      operatingSystem: "Web",
      inLanguage: "hu-HU",
      description:
        "Magyar nyelvű, beágyazható AI chatbot KKV-knak — 24/7 lead gyűjtés, azonnali email értesítés, white-label partner opció.",
      featureList: [
        "Magyar AI válaszok",
        "Lead gyűjtés",
        "Email értesítés",
        "1 soros beágyazás",
        "White-label partner csomag",
      ],
      offers: [
        {
          "@type": "Offer",
          name: "Start",
          price: "7990",
          priceCurrency: "HUF",
          availability: "https://schema.org/InStock",
          url: "https://chatwhite.hu/#pricing",
        },
        {
          "@type": "Offer",
          name: "Pro",
          price: "14990",
          priceCurrency: "HUF",
          availability: "https://schema.org/InStock",
          url: "https://chatwhite.hu/#pricing",
        },
        {
          "@type": "Offer",
          name: "Partner",
          price: "99990",
          priceCurrency: "HUF",
          availability: "https://schema.org/InStock",
          url: "https://chatwhite.hu/#pricing",
        },
      ],
      provider: { "@id": "https://chatwhite.hu/#organization" },
    },
    {
      "@type": "HowTo",
      name: "Hogyan indíts ChatWhite chatbotot",
      description: "Három lépésben élő magyar AI chatbot a weboldaladon.",
      totalTime: "PT15M",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Regisztrálj és tanítsd",
          text: "Megadod a szolgáltatásokat, területeket és hangnemet — kb. 10 perc.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Beágyazod a scriptet",
          text: "Egy sor kódot teszél a weboldaladra; a widget megjelenik.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Lead érkezik — te hívsz",
          text: "Azonnali email értesítést kapsz; visszahívod, amikor neked jó.",
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
  ],
};

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--cw-ink)] text-[var(--cw-soft)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="relative z-30 mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href="#">
          <Brand />
        </a>
        <nav className="hidden items-center gap-8 text-sm font-medium text-[var(--cw-muted)] md:flex">
          <a href="#problem" className="hover:text-white">
            Probléma
          </a>
          <a href="#how" className="hover:text-white">
            Így működik
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
          className="rounded-md bg-[var(--cw-lime)] px-4 py-2 text-sm font-bold text-[var(--cw-ink)] transition hover:bg-white"
        >
          14 nap próba
        </Link>
      </header>

      {/* HERO — CSS animation + copy with fixed line breaks (no mid-word wrap) */}
      <section className="cw-hero-wash relative isolate overflow-hidden">
        <div className="cw-noise pointer-events-none absolute inset-0" aria-hidden />
        <div
          className="cw-glow pointer-events-none absolute -left-20 top-24 h-72 w-72 rounded-full bg-[var(--cw-lime)]/20 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-10 bottom-0 h-96 w-96 rounded-full bg-[var(--cw-coral)]/15 blur-3xl"
          aria-hidden
        />

        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-16 pt-8 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12 lg:pb-20">
          <div className="min-w-0">
            <p className="cw-rise mb-4 text-sm font-bold uppercase tracking-[0.24em] text-[var(--cw-lime)]">
              <Brand className="text-sm tracking-[0.08em]" />
            </p>
            <h1 className="cw-rise cw-rise-1 cw-h1 font-display text-[clamp(1.85rem,3.6vw,3.35rem)] font-extrabold leading-[1.15] tracking-tight text-white">
              <span className="cw-h1-line">Este is jön</span>
              <span className="cw-h1-line">a megkeresés.</span>
              <span className="cw-h1-line text-[var(--cw-lime)]">
                Ne a riválisé legyen.
              </span>
            </h1>
            <p className="cw-rise cw-rise-2 mt-6 max-w-lg text-lg leading-relaxed text-[var(--cw-muted)] md:text-xl">
              Magyar AI a weboldaladon. Válaszol, leadet gyűjt, azonnal értesít.
              Akkor is, ha te alszol.
            </p>
            <div className="cw-rise cw-rise-3 mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-md bg-[var(--cw-lime)] px-7 py-3.5 text-base font-bold text-[var(--cw-ink)] transition hover:bg-white"
              >
                14 napos próba
              </Link>
              <a
                href="#how"
                className="inline-flex items-center justify-center rounded-md border border-[var(--cw-line)] bg-white/5 px-6 py-3.5 text-base font-semibold text-white transition hover:border-[var(--cw-lime)]"
              >
                Így működik
              </a>
            </div>
            <p className="cw-rise cw-rise-3 mt-4 text-sm text-[var(--cw-muted)]">
              Bankkártya nélkül · 1 sor kód · Bármikor leállítható
            </p>
          </div>

          <div className="cw-rise cw-rise-2 relative min-w-0 w-full" aria-hidden>
            <div className="cw-anim-stage">
              <div className="cw-anim-orbit">
                <span className="cw-anim-dot" />
              </div>
              <div className="cw-anim-orbit cw-anim-orbit-2">
                <span className="cw-anim-dot cw-anim-dot-coral" />
              </div>
              <div className="cw-anim-bubble-a">
                Holnap tudnátok jönni Debrecenbe?
              </div>
              <div className="cw-anim-bubble-b">
                Igen, 9–12 vagy 14–17 között.
              </div>
              <div className="cw-anim-bubble-c">
                Szuper. A számom: 06 30…
              </div>
              <div className="cw-anim-pulse" />
            </div>
            <p className="mt-3 text-center text-xs text-[var(--cw-muted)] lg:text-right">
              Élő chat animáció · lead 12 mp alatt
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--cw-line)] bg-[var(--cw-panel)]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-6 py-5 text-sm text-[var(--cw-muted)]">
          <p>
            <span className="font-semibold text-white">KKV-knak</span> — szerelő,
            szépség, B2B
          </p>
          <p>
            <span className="font-semibold text-[var(--cw-lime)]">Magyar AI</span>{" "}
            — nem fordítás
          </p>
          <p>
            <span className="font-semibold text-white">TD-AI Marketing</span> —
            Debrecenből, országosan
          </p>
        </div>
      </section>

      {/* AEO extractable answer block */}
      <section className="border-b border-[var(--cw-line)] bg-[var(--cw-ink)]" aria-labelledby="cw-what-is">
        <div className="mx-auto max-w-3xl px-6 py-14">
          <h2 id="cw-what-is" className="font-display text-2xl font-bold text-white md:text-3xl">
            Mi az a ChatWhite?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--cw-muted)]">
            A ChatWhite egy magyar AI chatbot SaaS KKV-knak: egy sor kóddal
            beágyazható a weboldaladra, 24/7 magyarul válaszol a szolgáltatásaidról,
            összegyűjti a leadet (név, telefon, email), és azonnal értesít emaillel.
            Ára 7 990 Ft/hó-tól indul; 14 napos próba bankkártya nélkül elérhető.
          </p>
        </div>
      </section>

      <section className="border-b border-[var(--cw-line)] bg-[var(--cw-panel)]">
        <div className="mx-auto grid max-w-6xl gap-4 px-6 py-12 md:grid-cols-2">
          <figure className="overflow-hidden rounded-xl border border-[var(--cw-line)]">
            <Image
              src="/images/chatwhite-hero.webp"
              alt="Éjszakai iroda laptoppal: a ChatWhite bot dolgozik helyetted"
              width={1120}
              height={700}
              sizes="(max-width: 768px) 100vw, 560px"
              className="h-auto w-full object-cover"
            />
            <figcaption className="px-4 py-3 text-sm text-[var(--cw-muted)]">
              Este is fut a weboldalad. A bot is.
            </figcaption>
          </figure>
          <figure className="overflow-hidden rounded-xl border border-[var(--cw-line)]">
            <Image
              src="/images/chatwhite-phone.webp"
              alt="Telefonos chat: érdeklődő és ChatWhite beszélgetés"
              width={900}
              height={700}
              sizes="(max-width: 768px) 100vw, 560px"
              className="h-auto w-full object-cover"
            />
            <figcaption className="px-4 py-3 text-sm text-[var(--cw-muted)]">
              Lead a telefonodon: név, szám, üzenet.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* PROBLEM + image */}
      <section id="problem" className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--cw-coral)]">
              A valódi költség
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
              A weboldalad éjjel is forgalmat kap. Te nem.
            </h2>
            <p className="mt-5 text-lg text-[var(--cw-muted)]">
              A látogató kérdez — te alszol. Másnap a telefonja már a következő
              találatot hívja. Egy kihagyott ajánlatkérés gyakran 30–80 ezer Ft
              munka.
            </p>
            <ul className="mt-8 space-y-4 text-[var(--cw-muted)]">
              {[
                "Elveszett lead = elveszett munka",
                "A „majd visszahívom” nem stratégia",
                "A hirdetésed fizet a forgalomért — a bot alakítja leadé",
              ].map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-1 text-[var(--cw-coral)]">▸</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-[var(--cw-line)]">
            <Image
              src="/images/chatwhite-missed.webp"
              alt="Üres recepció este — kihagyott hívások és elveszett megkeresések"
              fill
              sizes="(max-width: 1024px) 100vw, 520px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--cw-ink)]/50 to-transparent" />
            <p className="absolute bottom-4 left-4 rounded-md bg-[var(--cw-coral)] px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
              Este 22:41 — senki nem válaszol
            </p>
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="border-y border-[var(--cw-line)] bg-[var(--cw-panel)]">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative order-2 aspect-[4/3] overflow-hidden rounded-xl border border-[var(--cw-line)] lg:order-1">
              <Image
                src="/images/chatwhite-phone.webp"
                alt="Okostelefon élő chat beszélgetéssel — ChatWhite lead gyűjtés"
                fill
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--cw-lime)]">
                A megoldás
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
                Egy bot, ami a te nevedben beszél — és leadet ad át.
              </h2>
              <div className="mt-8 space-y-6">
                {[
                  {
                    t: "Magyarul, a te szolgáltatásaiddal",
                    b: "Árak, területek, gyakori kérdések — a bot tudja, mit kínálsz.",
                  },
                  {
                    t: "Lead, nem csak csevegés",
                    b: "Név, telefon, email + azonnali értesítés. CRM webhook opcióval.",
                  },
                  {
                    t: "1 sor kód — nincs IT projekt",
                    b: "Script a footerbe. Kész. Mobilra is.",
                  },
                ].map((item) => (
                  <div key={item.t} className="border-l-2 border-[var(--cw-lime)] pl-4">
                    <h3 className="font-display text-lg font-bold text-white">
                      {item.t}
                    </h3>
                    <p className="mt-1 text-[var(--cw-muted)]">{item.b}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW */}
      <section id="how" className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--cw-lime)]">
          Így működik
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
          Három lépés. Ma élhet.
        </h2>
        <ol className="mt-12 grid gap-8 md:grid-cols-3">
          {[
            {
              n: "01",
              title: "Regisztrálj és tanítsd",
              body: "Szolgáltatások, területek, hangnem. 10 perc — nem kell programozni.",
            },
            {
              n: "02",
              title: "Beágyazod a scriptet",
              body: "Egy sor a weboldaladra. A widget megjelenik.",
            },
            {
              n: "03",
              title: "Lead érkezik — te hívsz",
              body: "Értesítést kapsz. Visszahívod, amikor neked jó.",
            },
          ].map((step) => (
            <li key={step.n}>
              <span className="font-display text-5xl font-extrabold text-[var(--cw-lime)]/25">
                {step.n}
              </span>
              <h3 className="mt-2 font-display text-xl font-bold text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-[var(--cw-muted)]">{step.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-14 border border-[var(--cw-line)] bg-[var(--cw-panel)] p-6 md:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--cw-lime)]">
            Beágyazás
          </p>
          <pre className="mt-3 overflow-x-auto text-sm text-[var(--cw-lime)]">
            {`<script src="https://chatwhite.hu/widget.js" data-key="YOUR_EMBED_KEY"></script>`}
          </pre>
        </div>
      </section>

      {/* Before / After */}
      <section className="border-y border-[var(--cw-line)]">
        <div className="mx-auto grid max-w-6xl md:grid-cols-2">
          <div className="border-b border-[var(--cw-line)] bg-[var(--cw-panel)] px-6 py-14 md:border-b-0 md:border-r">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--cw-coral)]">
              Előtte
            </p>
            <h3 className="mt-3 font-display text-2xl font-bold text-white">
              Érdeklődő ír este → válasz holnap → már mást hívott
            </h3>
          </div>
          <div className="bg-[var(--cw-panel-2)] px-6 py-14">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--cw-lime)]">
              Utána
            </p>
            <h3 className="mt-3 font-display text-2xl font-bold text-white">
              Érdeklődő ír este → bot válaszol → te reggel visszahívod
            </h3>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-center text-sm font-bold uppercase tracking-[0.2em] text-[var(--cw-lime)]">
          Árazás
        </p>
        <h2 className="mt-3 text-center font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
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
                  ? "border-[var(--cw-lime)] bg-[var(--cw-panel-2)] ring-1 ring-[var(--cw-lime)]/40"
                  : "border-[var(--cw-line)] bg-[var(--cw-panel)]"
              }`}
            >
              {plan.featured && (
                <span className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[var(--cw-lime)]">
                  Ajánlott
                </span>
              )}
              <h3 className="font-display text-2xl font-bold text-white">
                {plan.name}
              </h3>
              <p className="mt-1 text-sm text-[var(--cw-muted)]">{plan.blurb}</p>
              <p className="mt-6 font-display text-4xl font-extrabold tracking-tight text-white">
                {plan.price}
                <span className="ml-1 text-base font-medium text-[var(--cw-muted)]">
                  Ft/hó
                </span>
              </p>
              <ul className="mt-6 flex-1 space-y-2.5 text-sm text-[var(--cw-muted)]">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-[var(--cw-lime)]">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/dashboard"
                className={`mt-8 block rounded-md px-4 py-3 text-center text-sm font-bold transition ${
                  plan.featured
                    ? "bg-[var(--cw-lime)] text-[var(--cw-ink)] hover:bg-white"
                    : "border border-[var(--cw-line)] text-white hover:border-[var(--cw-lime)]"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-[var(--cw-line)] bg-[var(--cw-panel)]">
        <div className="mx-auto max-w-3xl px-6 py-24">
          <h2 className="font-display text-3xl font-bold tracking-tight text-white">
            Gyakori kérdések
          </h2>
          <div className="mt-10 divide-y divide-[var(--cw-line)]">
            {faqs.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="cursor-pointer list-none font-display text-lg font-semibold text-white marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start justify-between gap-4">
                    {item.q}
                    <span className="text-[var(--cw-lime)] transition group-open:rotate-45">
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
      <section className="cw-hero-wash relative overflow-hidden border-t border-[var(--cw-line)]">
        <div className="relative z-10 mx-auto max-w-3xl px-6 py-24 text-center">
          <Brand className="text-3xl md:text-4xl" />
          <h2 className="mt-6 font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            Ne veszíts el még egy esti megkeresést.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-[var(--cw-muted)]">
            14 nap. Bankkártya nélkül. Ha nem hoz leadet — leállítod.
          </p>
          <Link
            href="/dashboard"
            className="mt-8 inline-flex rounded-md bg-[var(--cw-lime)] px-8 py-4 text-base font-bold text-[var(--cw-ink)] transition hover:bg-white"
          >
            Indítsd a ChatWhite próbát
          </Link>
          <p className="mt-4 text-sm text-[var(--cw-muted)]">
            <a
              href="https://tdaimarketing.hu"
              className="font-semibold text-[var(--cw-lime)] underline-offset-2 hover:underline"
            >
              tdaimarketing.hu
            </a>{" "}
            · +36 30 352 7975
          </p>
        </div>
      </section>

      <footer className="border-t border-[var(--cw-line)] bg-[var(--cw-ink)] py-10 text-center text-sm text-[var(--cw-muted)]">
        <Brand className="text-xl" />
        <p className="mt-2">
          by{" "}
          <a
            href="https://tdaimarketing.hu"
            className="font-medium text-white hover:text-[var(--cw-lime)]"
          >
            TD-AI & Marketing
          </a>
        </p>
      </footer>
    </div>
  );
}
