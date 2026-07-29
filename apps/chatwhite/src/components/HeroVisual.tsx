"use client";

import { useEffect, useState } from "react";

type Msg = { role: "user" | "bot"; text: string };

const SCRIPT: { pause: number; msg?: Msg; toast?: string }[] = [
  { pause: 600 },
  {
    pause: 900,
    msg: {
      role: "user",
      text: "Szia! Klímaszerelés kellene holnap Debrecenben.",
    },
  },
  {
    pause: 1400,
    msg: {
      role: "bot",
      text: "Szia! Debrecenben és 30 km-en belül megyünk. 9–12 vagy 14–17 jobb?",
    },
  },
  {
    pause: 1000,
    msg: { role: "user", text: "14–17. Mennyibe kerül egy 3,5 kW split?" },
  },
  {
    pause: 1300,
    msg: {
      role: "bot",
      text: "Árajánlatot 1 órán belül küldünk. Hagyd a telefonod, visszahívunk.",
    },
  },
  {
    pause: 900,
    msg: { role: "user", text: "06 30 123 4567 · Kovács Péter" },
  },
  {
    pause: 1100,
    msg: {
      role: "bot",
      text: "Lead mentve. Email elment a tulajdonosnak — 12 mp alatt.",
    },
    toast: "Új lead · Kovács Péter · Debrecen",
  },
  { pause: 2800 },
];

export function HeroVisual() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [leads, setLeads] = useState(3);
  const [clock, setClock] = useState("22:41");

  useEffect(() => {
    const tick = window.setInterval(() => {
      const d = new Date();
      setClock(
        `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`,
      );
    }, 30_000);
    return () => window.clearInterval(tick);
  }, []);

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
        setMessages([]);
        setToast(null);
        setTyping(false);

        for (const step of SCRIPT) {
          if (cancelled) return;
          if (step.msg) {
            setTyping(true);
            await wait(step.msg.role === "bot" ? 700 : 450);
            if (cancelled) return;
            setTyping(false);
            setMessages((prev) => [...prev, step.msg!]);
            if (step.toast) {
              setToast(step.toast);
              setLeads((n) => n + 1);
            }
          }
          await wait(step.pause);
        }
      }
    };

    void loop();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="cw-hero-stage relative w-full">
      <div className="relative aspect-[5/6] w-full overflow-hidden rounded-2xl border border-[var(--cw-line)] bg-[var(--cw-ink)] shadow-[0_40px_100px_-30px_rgba(200,255,61,0.45)] sm:aspect-[16/12] lg:aspect-[16/13]">
        <video
          className="cw-hero-video absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/chatwhite-hero-poster.jpg"
        >
          <source src="/videos/hero-chat.mp4" type="video/mp4" />
        </video>

        <div
          className="absolute inset-0 bg-gradient-to-t from-[var(--cw-ink)] via-[var(--cw-ink)]/55 to-[var(--cw-ink)]/25"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[var(--cw-ink)]/70 via-transparent to-[var(--cw-ink)]/30"
          aria-hidden
        />

        {/* Top status row */}
        <div className="absolute left-3 right-3 top-3 z-20 flex items-start justify-between gap-2 sm:left-4 sm:right-4 sm:top-4">
          <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/50 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--cw-lime)] opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--cw-lime)]" />
            </span>
            Élő a weboldalon · {clock}
          </div>
          <div className="rounded-full border border-[var(--cw-lime)]/30 bg-[var(--cw-lime)]/15 px-3 py-1.5 text-[11px] font-bold text-[var(--cw-lime)] backdrop-blur-md">
            {leads} lead ma este
          </div>
        </div>

        {/* Floating toast */}
        {toast && (
          <div className="cw-toast absolute left-3 top-14 z-20 max-w-[85%] rounded-xl border border-[var(--cw-lime)]/35 bg-[rgba(10,16,24,0.92)] px-3 py-2.5 shadow-2xl backdrop-blur-xl sm:left-4 sm:top-16 sm:max-w-[260px]">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--cw-lime)]">
              Email a tulajdonosnak
            </p>
            <p className="mt-1 text-sm font-semibold text-white">{toast}</p>
            <p className="mt-0.5 text-[11px] text-[var(--cw-muted)]">
              12 mp válaszidő · mentve
            </p>
          </div>
        )}

        {/* Phone chat mock */}
        <div className="absolute bottom-3 left-3 right-3 z-20 sm:bottom-4 sm:left-auto sm:right-4 sm:w-[min(100%,360px)]">
          <div className="overflow-hidden rounded-2xl border border-white/20 bg-[rgba(8,12,18,0.88)] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-3.5 py-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--cw-lime)] text-[11px] font-extrabold text-[var(--cw-ink)] shadow-[0_0_24px_rgba(200,255,61,0.45)]">
                  CW
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">
                    Chat<span className="text-white">White</span> bot
                  </p>
                  <p className="text-[11px] text-[var(--cw-lime)]">
                    Online · magyar AI · válaszol
                  </p>
                </div>
              </div>
              <span className="rounded-md bg-white/5 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/45">
                demo
              </span>
            </div>

            <div className="flex min-h-[210px] flex-col justify-end gap-2 px-3.5 py-3 sm:min-h-[230px]">
              {messages.length === 0 && !typing && (
                <p className="px-1 text-xs text-[var(--cw-muted)]">
                  Érdeklődő ír este 22:41-kor…
                </p>
              )}
              {messages.map((m, i) => (
                <p
                  key={`${i}-${m.text.slice(0, 12)}`}
                  className={`cw-msg-in max-w-[92%] px-3 py-2 text-[13px] leading-snug sm:text-sm ${
                    m.role === "user"
                      ? "rounded-2xl rounded-tl-sm bg-white/10 text-white/92"
                      : "ml-auto rounded-2xl rounded-tr-sm bg-[var(--cw-lime)]/20 text-[var(--cw-lime)]"
                  }`}
                >
                  {m.text}
                </p>
              ))}
              {typing && (
                <p className="flex gap-1.5 px-2 py-1">
                  <span className="cw-typing-dot" />
                  <span
                    className="cw-typing-dot"
                    style={{ animationDelay: "0.15s" }}
                  />
                  <span
                    className="cw-typing-dot"
                    style={{ animationDelay: "0.3s" }}
                  />
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 border-t border-white/10 px-3.5 py-2.5">
              <div className="flex-1 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[11px] text-white/35">
                Írj üzenetet…
              </div>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--cw-lime)] text-xs font-bold text-[var(--cw-ink)]">
                →
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Ambient glow under stage */}
      <div
        className="pointer-events-none absolute -bottom-6 left-1/2 h-16 w-3/4 -translate-x-1/2 rounded-full bg-[var(--cw-lime)]/25 blur-3xl"
        aria-hidden
      />
    </div>
  );
}
