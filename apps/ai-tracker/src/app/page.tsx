import Link from "next/link";

const plans = [
  {
    name: "Audit",
    price: "14 900",
    period: "egyszeri",
    features: ["1 domain scan", "4 AI platform", "PDF riport", "Javítási javaslatok"],
  },
  {
    name: "Monitor",
    price: "19 900",
    period: "hó",
    featured: true,
    features: ["1 domain", "10 kulcsszó", "Havi automatikus scan", "Email riport", "Dashboard"],
  },
  {
    name: "Agency",
    price: "79 900",
    period: "hó",
    features: ["10 domain", "White-label riport", "Ügyfél dashboard", "Prioritás scan"],
  },
];

const platforms = ["ChatGPT", "Perplexity", "Gemini", "Google AI"];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <span className="text-xl font-bold tracking-tight">AI Tracker HU</span>
        <span className="text-sm text-slate-400">by TD-AI Marketing</span>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-24">
        <section className="py-16 text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-violet-400">
            Első magyar AI kereső monitor
          </p>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
            Látod, ha a ChatGPT említ téged?
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
            Havi riport: megjelenik-e a céged a ChatGPT, Perplexity, Gemini és Google AI
            válaszaiban — magyar kulcsszavakra. Javítási javaslatokkal.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/dashboard"
              className="rounded-full bg-violet-500 px-8 py-3 font-semibold text-white hover:bg-violet-400"
            >
              Ingyenes audit kérés
            </Link>
            <Link
              href="#pricing"
              className="rounded-full border border-slate-700 px-8 py-3 font-semibold hover:bg-slate-900"
            >
              Árak
            </Link>
          </div>
        </section>

        <section className="flex flex-wrap justify-center gap-3">
          {platforms.map((p) => (
            <span
              key={p}
              className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm"
            >
              {p}
            </span>
          ))}
        </section>

        <section className="mt-16 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Mérhető AI láthatóság",
              body: "Nem találgatás — platformonként, kulcsszónként.",
            },
            {
              title: "Magyar kulcsszavak",
              body: '"marketing ügynökség Debrecen" - amit az ügyfeleid kérdeznek.',
            },
            {
              title: "Javítási terv",
              body: "E-E-A-T, schema, tartalom — konkrét lépések.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-slate-400">{item.body}</p>
            </div>
          ))}
        </section>

        <section id="pricing" className="mt-24">
          <h2 className="text-center text-3xl font-bold">Árazás</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl border p-8 ${
                  plan.featured
                    ? "border-violet-500 bg-violet-500/10"
                    : "border-slate-800 bg-slate-900/50"
                }`}
              >
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <p className="mt-4 text-3xl font-bold">
                  {plan.price}{" "}
                  <span className="text-base font-normal text-slate-400">Ft/{plan.period}</span>
                </p>
                <ul className="mt-6 space-y-2 text-sm text-slate-300">
                  {plan.features.map((f) => (
                    <li key={f}>✓ {f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24 rounded-2xl border border-violet-500/30 bg-violet-500/5 p-8 text-center">
          <h2 className="text-2xl font-bold">Proof: tdaimarketing.hu</h2>
          <p className="mt-2 text-slate-400">
            Első scan a saját domainünkön — case study a launchhoz.
          </p>
        </section>
      </main>

      <footer className="border-t border-slate-800 py-8 text-center text-sm text-slate-500">
        <a href="https://tdaimarketing.hu" className="hover:text-violet-400">
          tdaimarketing.hu
        </a>
        {" · "}AI Tracker HU MVP
      </footer>
    </div>
  );
}
