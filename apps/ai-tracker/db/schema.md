/**
 * AI Tracker HU MVP database schema (Drizzle / Postgres)
 */

// organizations
export const organizations = {
  id: "uuid PK",
  name: "text",
  plan: "audit | monitor | agency",
  stripeCustomerId: "text?",
  stripeSubscriptionId: "text?",
  createdAt: "timestamp",
};

// tracked_domains
export const trackedDomains = {
  id: "uuid PK",
  organizationId: "uuid FK",
  domain: "text", // tdaimarketing.hu
  brandName: "text", // TD-AI Marketing
  isActive: "boolean default true",
  createdAt: "timestamp",
};

// keywords — magyar kulcsszavak domainhez
export const keywords = {
  id: "uuid PK",
  domainId: "uuid FK",
  query: "text", // "marketing ügynökség Debrecen"
  locale: "text default hu-HU",
  createdAt: "timestamp",
};

// scan_runs — havi vagy manuális scan
export const scanRuns = {
  id: "uuid PK",
  domainId: "uuid FK",
  status: "pending | running | completed | failed",
  startedAt: "timestamp",
  completedAt: "timestamp?",
};

// scan_results — platform × keyword
export const scanResults = {
  id: "uuid PK",
  scanRunId: "uuid FK",
  keywordId: "uuid FK",
  platform: "chatgpt | perplexity | gemini | google_ai",
  mentioned: "boolean", // brand/domain szerepel?
  cited: "boolean", // linkelve van?
  snippet: "text?", // AI válasz részlet
  rawResponse: "text?",
  score: "integer 0-100", // visibility score
  createdAt: "timestamp",
};

// recommendations — ai-seo skill alapján
export const recommendations = {
  id: "uuid PK",
  domainId: "uuid FK",
  scanRunId: "uuid FK",
  priority: "high | medium | low",
  category: "content | schema | eeat | technical",
  title: "text",
  description: "text",
  createdAt: "timestamp",
};
