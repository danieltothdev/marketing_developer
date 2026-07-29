import Link from "next/link";
import { BrandedImage } from "@/components/BrandedImage";
import { HeroVisual } from "@/components/HeroVisual";
import { tudastarArticles } from "@/data/tudastar";

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
    a: "Általában 10–15 perc. Bemásolod a scriptet, megadod a szolgáltatásaidat. A bot azonnal válaszol magyarul.",
  },
  {
    q: "Este és hétvégén is válaszol?",
    a: "Igen. Pont ezért van: amikor te nem vagy a gépnél, a bot fogadja a megkeresést és leadet gyűjt.",
  },
  {
    q: "Mi van, ha rossz választ ad?",
    a: "A bot a te szolgáltatásaidra, áraidra és területeidre tanítható. Ha nem tud valamit, átadja neked leadként, nem találgat.",
  },
  {
    q: "Nem lesz gagyi, generikus válasz?",
    a: "Nem „általános AI”. A céged hangja, árai és gyakori kérdései alapján válaszol.",
  },
  {
    q: "Mi történik, ha valaki ajánlatot kér este?",
    a: "Név, telefon, email összegyűlik, és azonnal emailt kapsz. Te döntöd el, mikor hívod vissza.",
  },
  {
    q: "Kell bankkártya a próbaidőhöz?",
    a: "Nem. 14 napig ingyen kipróbálhatod. Ha nem jön be, leállítod. Nincs kötbér.",
  },
  {
    q: "Ügynökségként eladhatom a saját nevem alatt?",
    a: "Igen. A Partner csomag white-label: saját logo, színek, domain. Te számlázol az ügyfélnek.",
  },
  {
    q: "Miben más, mint a Facebook Messenger bot?",
    a: "A ChatWhite a te weboldaladon él, ahol a hirdetésből érkező látogató már érdeklődik. A lead nálad van.",
  },
  {
    q: "Mennyi leadet veszítek el most chatbot nélkül?",
    a: "Helyi szolgáltatóknál tipikus, hogy a megkeresések 30–50%-a este vagy hétvégén jön. Ha nincs válasz, máshova mennek.",
  },
  {
    q: "Kell programozót hívnom a beállításhoz?",
    a: "Nem. Egy script a weboldaladra, plusz a szolgáltatások leírása. IT projekt nélkül indul.",
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
    {
      "@type": "CollectionPage",
      "@id": "https://chatwhite.hu/#tudastar",
      name: "ChatWhite Tudástár — AI chatbot KKV-knak",
      description:
        "Gyakorlati útmutatók lead gyűjtéshez, éjszakai megkeresésekhez és magyar webchat beállításhoz.",
      inLanguage: "hu-HU",
      hasPart: tudastarArticles.map((a) => ({
        "@type": "Article",
        "@id": `https://chatwhite.hu/#tudastar-${a.id}`,
        headline: a.title,
        description: a.summary,
        articleBody: a.answer,
        inLanguage: "hu-HU",
        author: { "@id": "https://chatwhite.hu/#organization" },
        publisher: { "@id": "https://chatwhite.hu/#organization" },
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
          <a href="#problems" className="hover:text-white">
            Problémák
          </a>
          <a href="#how" className="hover:text-white">
            Így működik
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
          className="rounded-md bg-[var(--cw-lime)] px-4 py-2 text-sm font-bold text-[var(--cw-ink)] transition hover:bg-white"
        >
          14 nap próba
        </Link>
      </header>

      {/* HERO — CSS animáció + élő chat demo (videó nélkül) */}
      <section className="cw-hero-wash relative isolate overflow-hidden" aria-labelledby="cw-hero-title">
        <div className="cw-noise pointer-events-none absolute inset-0" aria-hidden />
        <div
          className="cw-glow pointer-events-none absolute -left-20 top-24 h-72 w-72 rounded-full bg-[var(--cw-lime)]/20 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-[var(--cw-coral)]/10 blur-3xl"
          aria-hidden
        />

        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-16 pt-8 lg:grid lg:grid-cols-2 lg:items-center lg:gap-14 lg:pb-24 lg:pt-12">
          <div className="min-w-0">
            <p className="cw-rise mb-4 text-sm font-bold uppercase tracking-[0.24em] text-[var(--cw-lime)]">
              <Brand className="text-sm tracking-[0.08em]" />
            </p>
            <h1
              id="cw-hero-title"
              className="cw-rise cw-rise-1 cw-h1 font-display text-[clamp(2rem,4vw,3.5rem)] font-extrabold leading-[1.2] tracking-tight text-white"
            >
              Este is jön a megkeresés —{" "}
              <span className="text-[var(--cw-lime)]">ne a riválisé legyen</span>
            </h1>
            <p className="cw-rise cw-rise-2 mt-6 max-w-lg text-lg leading-relaxed text-[var(--cw-soft)] md:text-xl">
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
                href="#problems"
                className="inline-flex items-center justify-center rounded-md border border-[var(--cw-line)] bg-white/5 px-6 py-3.5 text-base font-semibold text-white transition hover:border-[var(--cw-lime)]"
              >
                Ismerős a baj?
              </a>
            </div>
            <p className="cw-rise cw-rise-3 mt-4 text-sm text-[var(--cw-muted)]">
              Bankkártya nélkül · 1 sor kód · Bármikor leállítható
            </p>
            <ul className="cw-rise cw-rise-3 mt-8 grid max-w-lg gap-2 text-sm text-[var(--cw-soft)]">
              {[
                "Ki válaszol este 22:40-kor a weboldalon?",
                "Miért nincs ajánlatkérés a Google Ads után?",
                "Hétvégén is elveszik a megkeresés?",
              ].map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="text-[var(--cw-coral)]">?</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="cw-rise cw-rise-2 relative min-w-0 w-full">
            <HeroVisual />
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

      <section className="border-b border-[var(--cw-line)] bg-[var(--cw-panel)]" aria-labelledby="cw-gallery">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h2 id="cw-gallery" className="sr-only">
            ChatWhite vizuális példák
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <BrandedImage
              src="/images/chatwhite-hero.webp"
              alt="ChatWhite: éjszakai lead értesítés és webchat a weboldalon"
              caption="Este is dolgozik a bot — te alszol, a lead megérkezik."
              priority
            />
            <BrandedImage
              src="/images/chatwhite-phone.webp"
              alt="ChatWhite lead értesítés okostelefonon — név, telefon, igény"
              caption="Azonnali értesítés: név, telefon, üzenet a zsebedben."
            />
          </div>
        </div>
      </section>

      {/* PROBLEMS — business pain Qs */}
      <section id="problems" className="border-b border-[var(--cw-line)] bg-[var(--cw-ink)]">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--cw-coral)]">
            Ismerős kérdések
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
            Ezeket kérdezik a KKV tulajdonosok. A ChatWhite ezekre ad választ.
          </h2>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {[
              {
                q: "Este 22:40-kor írnak a weboldalon. Ki válaszol?",
                a: "A bot. Leadet gyűjt, te reggel visszahívod. A riválisnak nem megy el a munka.",
              },
              {
                q: "Fizetek Google Ads-re. Miért nincs ajánlatkérés?",
                a: "A forgalom megvan, de ha nincs azonnali válasz, a látogató továbbmegy. A bot a kattintást leaddé alakítja.",
              },
              {
                q: "Hétvégén zárva vagyok. Akkor is jönnek megkeresések?",
                a: "Igen, és pont akkor vesznek el. A ChatWhite 24/7 fogadja őket.",
              },
              {
                q: "Mennyi egy elszalasztott lead?",
                a: "Helyi szolgáltatóknál gyakran 30–80 ezer Ft munka. Havi pár ilyen, és a chatbot ára eltörpül.",
              },
              {
                q: "A recepcióm csak 9–17 között elérhető. Ez baj?",
                a: "Ha a forgalmad este is megy, igen. A bot kitölti a rést, amikor te nem vagy ott.",
              },
              {
                q: "Messenger botom van. Az nem elég?",
                a: "A hirdetésből érkező látogató a weboldalon van. Ott kell megszólítani, mielőtt bezárja a fület.",
              },
              {
                q: "Az ügyfél 3 helyet is megkérdez. Miért engem választana?",
                a: "Mert te válaszolsz először — ár, terület, időpont. A többiek még alszanak.",
              },
              {
                q: "Telefonon nem birok mindent felvenni. Elvesznek a hívások?",
                a: "A webchat leadet gyűjt, ha nem veszed fel. Név, szám, igény — reggel a dashboardon.",
              },
              {
                q: "Szezonban zsúfolt vagyok. Ki szűri a komoly érdeklődőket?",
                a: "A bot kérdez: szolgáltatás, város, időablak. Csak a kész lead megy tovább hozzád.",
              },
              {
                q: "Facebookról jönnek, de a weboldalamon eltűnnek. Miért?",
                a: "Nincs azonnali beszélgetés. A ChatWhite widget ott fogja meg őket, ahol a döntés születik.",
              },
              {
                q: "Árajánlatot kérnek éjjel — én csak napközben küldök. Elbukom?",
                a: "A bot rögzíti az igényt, te napközben küldöd az árat. A lead már nálad van, nem a konkurensnél.",
              },
              {
                q: "Több telephelyem / szolgáltatási körzetem van. Bírja a bot?",
                a: "Igen. Területek, árak, szolgáltatások külön taníthatók — magyarul, a te hangodon.",
              },
              {
                q: "Honnan tudom, hogy megéri?",
                a: "14 nap próba. Ha nem hoz leadet, leállítod. Ha hoz, látod a számokat a dashboardon.",
              },
              {
                q: "Nem értek az AI-hoz. Túl bonyolult?",
                a: "Nem. Megadod a szolgáltatásokat, beilleszted a scriptet. Programozó nélkül.",
              },
            ].map((item) => (
              <article
                key={item.q}
                className="rounded-xl border border-[var(--cw-line)] bg-[var(--cw-panel)] p-6 transition hover:border-[var(--cw-lime)]/40"
              >
                <h3 className="font-display text-lg font-bold text-white">
                  {item.q}
                </h3>
                <p className="mt-3 leading-relaxed text-[var(--cw-muted)]">
                  <span className="font-semibold text-[var(--cw-lime)]">Megoldás: </span>
                  {item.a}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM visual */}
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
              A látogató kérdez. Te alszol. Másnap a telefonja már a következő
              találatot hívja.
            </p>
            <ul className="mt-8 space-y-4 text-[var(--cw-muted)]">
              {[
                "Elveszett lead = elveszett munka",
                "A „majd visszahívom” nem stratégia",
                "A hirdetésed fizet a forgalomért. A bot alakítja leaddé.",
              ].map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-1 text-[var(--cw-coral)]">▸</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-[var(--cw-line)]">
            <BrandedImage
              src="/images/chatwhite-missed.webp"
              alt="ChatWhite: elveszett esti megkeresések listája"
              fill
              sizes="(max-width: 1024px) 100vw, 520px"
              badge="Este 22:41 · senki nem válaszolt"
            />
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="border-y border-[var(--cw-line)] bg-[var(--cw-panel)]">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative order-2 aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--cw-line)] lg:order-1">
              <BrandedImage
                src="/images/chatwhite-dashboard.webp"
                alt="ChatWhite lead dashboard — esti lead számláló és válaszidő"
                fill
                sizes="(max-width: 1024px) 100vw, 480px"
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

      {/* TUDÁSTÁR — SEO / AEO content hub */}
      <section id="tudastar" className="border-y border-[var(--cw-line)] bg-[var(--cw-ink)]">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--cw-lime)]">
            Tudástár
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
            Gyakorlati útmutatók KKV tulajdonosoknak
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--cw-soft)]">
            Rövid, kiolvasható válaszok — lead gyűjtés, éjszakai megkeresések,
            magyar chatbot, ROI. AI keresők és Google is idézheti ezeket a
            blokkokat.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {tudastarArticles.map((article) => (
              <article
                key={article.id}
                id={`tudastar-${article.id}`}
                className="rounded-2xl border border-[var(--cw-line)] bg-[var(--cw-panel)] p-6 transition hover:border-[var(--cw-lime)]/40"
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
                  className="mt-3 text-base leading-relaxed text-[var(--cw-muted)]"
                  itemProp="description"
                >
                  {article.summary}
                </p>
                <div className="mt-4 rounded-xl border border-[var(--cw-lime)]/20 bg-[var(--cw-lime)]/5 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--cw-lime)]">
                    Válasz
                  </p>
                  <p
                    className="cw-prose mt-2 text-[var(--cw-soft)]"
                    itemProp="articleBody"
                  >
                    {article.answer}
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[var(--cw-line)] px-2.5 py-0.5 text-xs text-[var(--cw-muted)]"
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
