export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-950 p-8 text-slate-100">
      <h1 className="text-2xl font-bold">AI Tracker Dashboard</h1>
      <p className="mt-2 text-slate-400">MVP — domainek, kulcsszavak, scan eredmények</p>
      <div className="mt-8 overflow-hidden rounded-xl border border-slate-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-900 text-slate-400">
            <tr>
              <th className="p-4">Kulcsszó</th>
              <th className="p-4">ChatGPT</th>
              <th className="p-4">Perplexity</th>
              <th className="p-4">Gemini</th>
              <th className="p-4">Google AI</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-slate-800">
              <td className="p-4">marketing ügynökség Debrecen</td>
              <td className="p-4 text-amber-400">— scan pending</td>
              <td className="p-4 text-amber-400">—</td>
              <td className="p-4 text-amber-400">—</td>
              <td className="p-4 text-amber-400">—</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
