"use client";

import { useCallback, useEffect, useState } from "react";

const PROMPTS = [
  "legjobb fogorvos Debrecen",
  "klímaszerelő Debrecen",
  "marketing ügynökség KKV",
  "autószerviz Nyíregyháza",
];

const RESULTS: Record<
  string,
  { rivals: { name: string; score: number }[]; you: "missing" | "weak" }
> = {
  "legjobb fogorvos Debrecen": {
    rivals: [
      { name: "Smile Dental", score: 86 },
      { name: "Debrecen Fogászat", score: 71 },
    ],
    you: "missing",
  },
  "klímaszerelő Debrecen": {
    rivals: [
      { name: "Kovács Klíma", score: 79 },
      { name: "Cool Service", score: 64 },
    ],
    you: "missing",
  },
  "marketing ügynökség KKV": {
    rivals: [
      { name: "Budapest Agency X", score: 82 },
      { name: "Local Ads Kft.", score: 58 },
    ],
    you: "weak",
  },
  "autószerviz Nyíregyháza": {
    rivals: [
      { name: "Nyír Autó", score: 74 },
      { name: "FastFix SZERVIZ", score: 61 },
    ],
    you: "missing",
  },
};

const PLATFORMS = ["ChatGPT", "Perplexity", "Gemini", "Google AI"] as const;

export function HeroVisual() {
  const [prompt, setPrompt] = useState(PROMPTS[0]);
  const [typed, setTyped] = useState("");
  const [scanning, setScanning] = useState(false);
  const [platformIdx, setPlatformIdx] = useState(-1);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  const runScan = useCallback((next: string) => {
    setPrompt(next);
    setTyped("");
    setScanning(true);
    setDone(false);
    setProgress(0);
    setPlatformIdx(-1);

    let i = 0;
    const typeId = window.setInterval(() => {
      i += 1;
      setTyped(next.slice(0, i));
      if (i >= next.length) window.clearInterval(typeId);
    }, 28);

    const start = Date.now();
    const scanId = window.setInterval(() => {
      const elapsed = Date.now() - start;
      const p = Math.min(100, Math.round((elapsed / 2200) * 100));
      setProgress(p);
      setPlatformIdx(Math.min(3, Math.floor(p / 25)));
      if (p >= 100) {
        window.clearInterval(scanId);
        setScanning(false);
        setDone(true);
        setPlatformIdx(3);
      }
    }, 40);
  }, []);

  useEffect(() => {
    runScan(PROMPTS[0]);
    const id = window.setInterval(() => {
      setPrompt((curr) => {
        const i = PROMPTS.indexOf(curr);
        const next = PROMPTS[(i + 1) % PROMPTS.length];
        window.setTimeout(() => runScan(next), 0);
        return next;
      });
    }, 7200);
    return () => window.clearInterval(id);
  }, [runScan]);

  const result = RESULTS[prompt];

  return (
    <div className="at-hero-stage relative w-full">
      <div className="relative aspect-[5/6] w-full overflow-hidden rounded-2xl border border-[var(--at-line)] bg-[var(--at-ink)] shadow-[0_40px_100px_-28px_rgba(46,240,208,0.5)] sm:aspect-[16/12] lg:aspect-[16/13]">
        <video
          className="at-hero-video absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/aitracker-hero-poster.jpg"
        >
          <source src="/videos/hero-ai.mp4" type="video/mp4" />
        </video>

        <div
          className="absolute inset-0 bg-gradient-to-t from-[var(--at-ink)] via-[var(--at-ink)]/70 to-[var(--at-ink)]/40"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(46,240,208,0.18),transparent_55%)]"
          aria-hidden
        />

        <div className="absolute left-3 right-3 top-3 z-20 flex items-center justify-between gap-2 sm:left-4 sm:right-4 sm:top-4">
          <div className="rounded-full border border-[var(--at-signal)]/35 bg-black/55 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--at-signal)] backdrop-blur-md">
            Élő AI scan demo
          </div>
          <div className="rounded-full border border-white/10 bg-black/45 px-3 py-1.5 text-[10px] font-semibold text-white/70 backdrop-blur-md">
            4 platform · magyar prompt
          </div>
        </div>

        <div className="absolute inset-x-3 bottom-3 z-20 sm:inset-x-4 sm:bottom-4">
          <div className="rounded-2xl border border-white/12 bg-[rgba(6,10,18,0.9)] p-3 shadow-2xl backdrop-blur-2xl sm:p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--at-muted)]">
              Mit kérdez az ügyfél az AI-tól?
            </p>

            <div className="mt-2 flex items-center gap-2 rounded-xl border border-[var(--at-signal)]/25 bg-black/40 px-3 py-2.5">
              <span className="text-[var(--at-signal)]">⌕</span>
              <p className="min-h-[1.25rem] flex-1 font-mono text-sm text-white">
                {typed}
                <span className="at-caret inline-block w-[2px] translate-y-[1px] bg-[var(--at-signal)]">
                  &nbsp;
                </span>
              </p>
            </div>

            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {PROMPTS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => runScan(p)}
                  className={`rounded-md border px-2 py-1 text-left text-[11px] transition ${
                    prompt === p
                      ? "border-[var(--at-signal)] bg-[var(--at-signal)]/15 text-[var(--at-signal)]"
                      : "border-[var(--at-line)] text-white/65 hover:border-[var(--at-signal)]/45"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <div className="mt-3 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
              {PLATFORMS.map((name, i) => {
                const active = platformIdx >= i;
                const current = scanning && platformIdx === i;
                return (
                  <div
                    key={name}
                    className={`rounded-lg border px-2 py-2 text-center transition ${
                      active
                        ? "border-[var(--at-signal)]/40 bg-[var(--at-signal)]/10"
                        : "border-white/8 bg-white/[0.03]"
                    }`}
                  >
                    <p
                      className={`text-[10px] font-bold uppercase tracking-wide ${
                        active ? "text-[var(--at-signal)]" : "text-white/35"
                      }`}
                    >
                      {name}
                    </p>
                    <p className="mt-1 text-[10px] text-white/50">
                      {current ? "scan…" : active ? "kész" : "vár"}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[var(--at-signal)] to-[#7dffe8] transition-[width] duration-100"
                style={{ width: `${scanning ? progress : done ? 100 : 0}%` }}
              />
            </div>
            <p className="mt-1.5 text-[10px] text-[var(--at-muted)]">
              {scanning
                ? `Scan fut… ${progress}%`
                : done
                  ? "Scan kész · említések összevetve"
                  : "Indítás…"}
            </p>

            {done && (
              <div className="at-results mt-3 space-y-1.5 text-sm">
                {result.rivals.map((r) => (
                  <div
                    key={r.name}
                    className="flex items-center justify-between rounded-lg bg-white/5 px-2.5 py-2 text-white/90"
                  >
                    <span>{r.name}</span>
                    <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wide text-[var(--at-signal)]">
                      <span className="inline-block h-1.5 w-10 overflow-hidden rounded-full bg-white/10">
                        <span
                          className="block h-full rounded-full bg-[var(--at-signal)]"
                          style={{ width: `${r.score}%` }}
                        />
                      </span>
                      említve
                    </span>
                  </div>
                ))}
                <div className="flex items-center justify-between rounded-lg border border-[var(--at-warn)]/40 bg-[var(--at-warn)]/15 px-2.5 py-2 text-[#ffc9a8]">
                  <span className="font-semibold">A te céged</span>
                  <span className="text-[10px] font-bold uppercase tracking-wide">
                    {result.you === "missing" ? "hiányzol" : "gyenge említés"}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute -bottom-6 left-1/2 h-16 w-3/4 -translate-x-1/2 rounded-full bg-[var(--at-signal)]/30 blur-3xl"
        aria-hidden
      />
    </div>
  );
}
