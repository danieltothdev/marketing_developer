"use client";

import { useCallback, useEffect, useState } from "react";

const PROMPTS = [
  "legjobb fogorvos Debrecen",
  "klímaszerelő Debrecen",
  "marketing ügynökség KKV",
];

const RESULTS: Record<
  string,
  { rivals: string[]; you: "missing" | "weak" }
> = {
  "legjobb fogorvos Debrecen": {
    rivals: ["Smile Dental", "Debrecen Fogászat"],
    you: "missing",
  },
  "klímaszerelő Debrecen": {
    rivals: ["Kovács Klíma", "Cool Service"],
    you: "missing",
  },
  "marketing ügynökség KKV": {
    rivals: ["Budapest Agency X", "Local Ads Kft."],
    you: "weak",
  },
};

export function HeroVisual() {
  const [prompt, setPrompt] = useState(PROMPTS[0]);
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(100);
  const [done, setDone] = useState(true);

  const runScan = useCallback((next: string) => {
    setPrompt(next);
    setScanning(true);
    setDone(false);
    setProgress(0);
    const start = Date.now();
    const id = window.setInterval(() => {
      const p = Math.min(100, Math.round(((Date.now() - start) / 1400) * 100));
      setProgress(p);
      if (p >= 100) {
        window.clearInterval(id);
        setScanning(false);
        setDone(true);
      }
    }, 40);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setPrompt((curr) => {
        const i = PROMPTS.indexOf(curr);
        const next = PROMPTS[(i + 1) % PROMPTS.length];
        // schedule scan outside setState
        window.setTimeout(() => runScan(next), 0);
        return next;
      });
    }, 5200);
    return () => window.clearInterval(id);
  }, [runScan]);

  const result = RESULTS[prompt];

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-[var(--at-line)] bg-[var(--at-panel)] shadow-[0_40px_80px_-36px_rgba(46,240,208,0.4)]">
      <div className="relative aspect-[16/11] w-full overflow-hidden bg-[var(--at-ink)]">
        <video
          className="absolute inset-0 h-full w-full scale-105 object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/aitracker-hero.webp"
        >
          <source src="/videos/hero-ai.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--at-ink)] via-[var(--at-ink)]/75 to-[var(--at-ink)]/35" />

        <div className="absolute left-4 top-4 rounded-full border border-[var(--at-signal)]/30 bg-black/50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--at-signal)] backdrop-blur-md">
          Élő AI scan demo
        </div>

        <div className="absolute inset-x-4 bottom-4 sm:inset-x-5">
          <div className="rounded-xl border border-white/10 bg-[rgba(8,12,20,0.9)] p-3 backdrop-blur-xl sm:p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--at-muted)]">
              Kattints egy promptra
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {PROMPTS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => runScan(p)}
                  className={`rounded-md border px-2.5 py-1.5 text-left text-xs transition ${
                    prompt === p
                      ? "border-[var(--at-signal)] bg-[var(--at-signal)]/15 text-[var(--at-signal)]"
                      : "border-[var(--at-line)] text-white/70 hover:border-[var(--at-signal)]/50"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-[var(--at-signal)] transition-[width] duration-100"
                style={{ width: `${scanning ? progress : done ? 100 : 0}%` }}
              />
            </div>
            <p className="mt-1.5 text-[10px] text-[var(--at-muted)]">
              {scanning
                ? `Scan: ChatGPT · Perplexity · Gemini · Google AI… ${progress}%`
                : "Scan kész · 4 platform"}
            </p>

            {done && (
              <div className="mt-3 space-y-1.5 text-sm">
                {result.rivals.map((name) => (
                  <div
                    key={name}
                    className="flex items-center justify-between rounded-md bg-white/5 px-2.5 py-1.5 text-white/85"
                  >
                    <span>{name}</span>
                    <span className="text-[10px] font-bold uppercase text-[var(--at-signal)]">
                      említve
                    </span>
                  </div>
                ))}
                <div className="flex items-center justify-between rounded-md bg-[var(--at-warn)]/20 px-2.5 py-1.5 text-[#ffc9a8]">
                  <span>A te céged</span>
                  <span className="text-[10px] font-bold uppercase">
                    {result.you === "missing" ? "hiányzol" : "gyenge"}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
