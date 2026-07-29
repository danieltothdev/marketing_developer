"use client";

import { useEffect, useState } from "react";

const DEMO = [
  {
    user: "Szia! Klímaszerelés kellene holnap Debrecenben.",
    bot: "Szia! Debrecenben és 30 km-en belül megyünk. 9–12 vagy 14–17 jobb?",
  },
  {
    user: "14–17. Mennyibe kerül egy 3,5 kW split?",
    bot: "Árajánlatot 1 órán belül küldünk. Hagyj telefont, visszahívunk.",
  },
  {
    user: "06 30 123 4567 · Kovács Péter",
    bot: "Lead mentve. Email elment a tulajdonosnak. 12 mp alatt.",
  },
];

type Phase = "typing" | "user" | "bot";

export function HeroVisual() {
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");

  useEffect(() => {
    let cancelled = false;
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        window.setTimeout(() => {
          if (!cancelled) resolve();
        }, ms);
      });

    const loop = async () => {
      while (!cancelled) {
        for (let i = 0; i < DEMO.length; i++) {
          if (cancelled) return;
          setStep(i);
          setPhase("typing");
          await wait(700);
          if (cancelled) return;
          setPhase("user");
          await wait(900);
          if (cancelled) return;
          setPhase("bot");
          await wait(2600);
        }
      }
    };

    void loop();
    return () => {
      cancelled = true;
    };
  }, []);

  const current = DEMO[step];

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-[var(--cw-line)] bg-[var(--cw-panel)] shadow-[0_40px_80px_-40px_rgba(200,255,61,0.35)]">
      <div className="relative aspect-[16/11] w-full overflow-hidden bg-[var(--cw-ink)]">
        <video
          className="absolute inset-0 h-full w-full scale-105 object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/chatwhite-hero.webp"
        >
          <source src="/videos/hero-chat.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-tr from-[var(--cw-ink)] via-[var(--cw-ink)]/60 to-[var(--cw-ink)]/20" />

        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--cw-lime)] opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--cw-lime)]" />
          </span>
          Élő a weboldalon
        </div>

        <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-[min(100%,340px)]">
          <div className="overflow-hidden rounded-xl border border-white/15 bg-[rgba(10,16,24,0.86)] shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/10 px-3 py-2.5">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--cw-lime)] text-[10px] font-extrabold text-[var(--cw-ink)]">
                  CW
                </span>
                <div>
                  <p className="text-xs font-semibold text-white">ChatWhite bot</p>
                  <p className="text-[10px] text-[var(--cw-lime)]">Online · magyar AI</p>
                </div>
              </div>
              <span className="text-[10px] text-white/40">demo</span>
            </div>

            <div className="min-h-[150px] space-y-2 px-3 py-3 text-sm">
              {(phase === "user" || phase === "bot") && (
                <p
                  key={`u-${step}`}
                  className="cw-msg-in max-w-[92%] rounded-2xl rounded-tl-sm bg-white/10 px-3 py-2 text-white/90"
                >
                  {current.user}
                </p>
              )}
              {phase === "bot" && (
                <p
                  key={`b-${step}`}
                  className="cw-msg-in ml-auto max-w-[92%] rounded-2xl rounded-tr-sm bg-[var(--cw-lime)]/20 px-3 py-2 text-[var(--cw-lime)]"
                >
                  {current.bot}
                </p>
              )}
              {phase === "typing" && (
                <p className="flex gap-1 px-1 pt-2 text-[var(--cw-muted)]">
                  <span className="cw-typing-dot" />
                  <span className="cw-typing-dot" style={{ animationDelay: "0.15s" }} />
                  <span className="cw-typing-dot" style={{ animationDelay: "0.3s" }} />
                </p>
              )}
            </div>

            <div className="border-t border-white/10 px-3 py-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--cw-lime)]">
                Lead mentve · Email a tulajnak
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
