import { NextResponse } from "next/server";

/** Public widget chat endpoint — MVP stub */
export async function POST(req: Request) {
  const body = await req.json();
  const { embedKey, message, visitorId } = body as {
    embedKey?: string;
    message?: string;
    visitorId?: string;
  };

  if (!embedKey || !message) {
    return NextResponse.json({ error: "embedKey and message required" }, { status: 400 });
  }

  // TODO: load bot by embedKey, call OpenAI, store message, detect lead intent
  return NextResponse.json({
    reply:
      "Köszönjük az üzenetet! MVP mód — hamarosan élő AI válasz. Kérjük, hagyja meg telefonszámát, visszahívjuk.",
    visitorId: visitorId ?? crypto.randomUUID(),
  });
}
