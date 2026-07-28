import { NextResponse } from "next/server";

/** Trigger AI visibility scan — MVP stub (cron or manual) */
export async function POST(req: Request) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}` && process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const { domainId } = body as { domainId?: string };

  // TODO: load domain + keywords, query OpenAI/Perplexity, store scan_results
  return NextResponse.json({
    status: "queued",
    domainId: domainId ?? "demo",
    message: "MVP — scan engine not wired yet",
  });
}
