export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-950 p-8 text-slate-100">
      <h1 className="text-2xl font-bold">ChatWhite Dashboard</h1>
      <p className="mt-2 text-slate-400">MVP — botok, beszélgetések, leadek</p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {["Aktív botok", "Leadek (30 nap)", "Üzenetek (hó)"].map((label) => (
          <div key={label} className="rounded-xl border border-slate-800 p-6">
            <p className="text-sm text-slate-400">{label}</p>
            <p className="mt-2 text-3xl font-bold">—</p>
          </div>
        ))}
      </div>
    </div>
  );
}
