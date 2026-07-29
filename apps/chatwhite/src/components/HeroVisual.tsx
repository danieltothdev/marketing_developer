"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Msg = { role: "user" | "bot"; text: string };

const SCRIPT: { pause: number; msg?: Msg; toast?: string }[] = [
  {
    pause: 400,
    msg: {
      role: "user",
      text: "Szia! Klímaszerelés kellene holnap Debrecenben.",
    },
  },
  {
    pause: 1100,
    msg: {
      role: "bot",
      text: "Szia! Debrecenben és 30 km-en belül megyünk. 9–12 vagy 14–17 jobb?",
    },
  },
  {
    pause: 800,
    msg: { role: "user", text: "14–17. Mennyibe kerül egy 3,5 kW split?" },
  },
  {
    pause: 1000,
    msg: {
      role: "bot",
      text: "Árajánlatot 1 órán belül küldünk. Hagyd a telefonod, visszahívunk.",
    },
  },
  {
    pause: 700,
    msg: { role: "user", text: "06 30 123 4567 · Kovács Péter" },
  },
  {
    pause: 900,
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
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;

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
            await wait(step.msg.role === "bot" ? 600 : 350);
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
  }, [ready]);

  return (
    <div className="cw-hero-stage relative w-full">
      <div className="cw-hero-frame relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-[var(--cw-line)] shadow-[0_48px_120px_-32px_rgba(200,255,61,0.35)] sm:aspect-[16/12] lg:aspect-[16/11]">
        <Image
          src="/images/chatwhite-hero-bg.webp"
          alt=""
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 560px"
          className="cw-hero-img object-cover object-center"
          aria-hidden
        />

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070b12]/90 via-[#070b12]/25 to-[#070b12]/15"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#070b12]/40 via-transparent to-[#070b12]/55"
          aria-hidden
        />

        <div className="absolute left-4 top-4 z-20 flex flex-wrap gap-2">
          <span className="flex items-center gap-2 rounded-full border border-white/15 bg-black/55 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-xl">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--cw-lime)] opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--cw-lime)]" />
            </span>
            Élő demo
          </span>
          <span className="rounded-full border border-[var(--cw-lime)]/35 bg-[var(--cw-lime)]/12 px-3 py-1.5 text-xs font-bold text-[var(--cw-lime)] backdrop-blur-xl">
            {leads} lead ma este
          </span>
        </div>

        {toast && (
          <div className="cw-toast absolute left-4 top-[4.5rem] z-20 max-w-[280px] rounded-xl border border-[var(--cw-lime)]/40 bg-[rgba(8,12,18,0.94)] px-3.5 py-3 shadow-2xl backdrop-blur-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--cw-lime)]">
              Email a tulajdonosnak
            </p>
            <p className="mt-1 text-sm font-semibold text-white">{toast}</p>
          </div>
        )}

        <div className="absolute bottom-4 left-4 right-4 z-20 sm:left-auto sm:right-5 sm:w-[min(100%,380px)]">
          <div className="overflow-hidden rounded-2xl border border-white/15 bg-[rgba(6,10,16,0.88)] shadow-[0_24px_80px_-12px_rgba(0,0,0,0.75)] backdrop-blur-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--cw-lime)] text-xs font-extrabold text-[var(--cw-ink)] shadow-[0_0_24px_rgba(200,255,61,0.45)]">
                  CW
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">
                    <span className="text-[var(--cw-lime)]">Chat</span>
                    <span className="text-white">White</span> bot
                  </p>
                  <p className="text-xs text-[var(--cw-lime)]">Online · magyar AI</p>
                </div>
              </div>
              <span className="rounded-full bg-[var(--cw-lime)]/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[var(--cw-lime)]">
                Live
              </span>
            </div>

            <div className="flex min-h-[220px] max-h-[280px] flex-col justify-end gap-2.5 overflow-y-auto px-4 py-4">
              {messages.length === 0 && !typing && (
                <p className="text-center text-xs text-white/40">
                  Beszélgetés indul…
                </p>
              )}
              {messages.map((m, i) => (
                <p
                  key={`${i}-${m.text.slice(0, 8)}`}
                  className={`cw-msg-in max-w-[92%] px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "rounded-2xl rounded-tl-sm bg-white/12 text-white"
                      : "ml-auto rounded-2xl rounded-tr-sm border border-[var(--cw-lime)]/30 bg-[var(--cw-lime)]/12 text-[var(--cw-lime)]"
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

            <div className="border-t border-white/10 px-4 py-2.5">
              <p className="text-xs font-semibold text-[var(--cw-lime)]">
                Lead mentve · azonnali értesítés
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
