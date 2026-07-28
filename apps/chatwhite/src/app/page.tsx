import Link from "next/link";

const plans = [
  {
    name: "Start",
    price: "7 990",
    features: ["1 chatbot", "500 üzenet/hó", "Lead gyűjtés", "Email értesítés"],
  },
  {
    name: "Pro",
    price: "14 990",
    featured: true,
    features: ["Korlátlan üzenet", "Saját színek", "CRM webhook", "Prioritás support"],
  },
  {
    name: "Partner",
    price: "99 990",
    features: ["20 chatbot", "White-label", "Saját branding", "Ügynökségi dashboard"],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <span className="text-xl font-bold tracking-tight">ChatWhite</span>
        <span className="text-sm text-slate-400">by TD-AI Marketing</span>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-24">
        <section className="py-16 text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-emerald-400">
            White-label AI chatbot KKV-knak
          </p>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
            24/7 magyar chatbot — lead gyűjtés, amíg te alszol
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
            Egy sor kód a weboldaladra. AI válaszol magyarul, összegyűjti a megkereséseket,
            emailben értesít. Ügynökségként white-labelben is eladható.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/dashboard"
              className="rounded-full bg-emerald-500 px-8 py-3 font-semibold text-slate-950 hover:bg-emerald-400"
            >
              Ingyenes kipróbálás
            </Link>
            <Link
              href="#pricing"
              className="rounded-full border border-slate-700 px-8 py-3 font-semibold hover:bg-slate-900"
            >
              Árak
            </Link>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Beágyazás 1 percben",
              body: "Script tag → kész. Nincs bonyolult integráció.",
            },
            {
              title: "Magyar AI válaszok",
              body: "A te szolgáltatásaidra tanítva — nem generikus bot.",
            },
            {
              title: "Lead + értesítés",
              body: "Név, telefon, email → azonnali email neked.",
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
          <p className="mt-2 text-center text-slate-400">Havidíj, bármikor lemondható</p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl border p-8 ${
                  plan.featured
                    ? "border-emerald-500 bg-emerald-500/10"
                    : "border-slate-800 bg-slate-900/50"
                }`}
              >
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <p className="mt-4 text-3xl font-bold">
                  {plan.price} <span className="text-base font-normal text-slate-400">Ft/hó</span>
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

        <section className="mt-24 rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
          <h2 className="text-xl font-semibold">Beágyazás (MVP)</h2>
          <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-950 p-4 text-sm text-emerald-300">
{`<script src="https://chatwhite.hu/widget.js" data-key="YOUR_EMBED_KEY"></script>`}
          </pre>
        </section>
      </main>

      <footer className="border-t border-slate-800 py-8 text-center text-sm text-slate-500">
        <a href="https://tdaimarketing.hu" className="hover:text-emerald-400">
          tdaimarketing.hu
        </a>
        {" · "}ChatWhite MVP
      </footer>
    </div>
  );
}
