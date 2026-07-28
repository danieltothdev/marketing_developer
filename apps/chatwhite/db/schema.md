/**
 * ChatWhite MVP database schema (Drizzle / Postgres)
 * Run: drizzle-kit generate && drizzle-kit migrate
 */

// organizations — tenant (KKV or agency partner)
export const organizations = {
  id: "uuid PK",
  name: "text",
  slug: "text unique",
  plan: "start | pro | partner",
  stripeCustomerId: "text?",
  stripeSubscriptionId: "text?",
  // white-label (partner tier)
  brandName: "text?",
  brandColor: "text?", // hex
  logoUrl: "text?",
  customDomain: "text?",
  messageLimitMonthly: "integer default 500",
  messagesUsedThisMonth: "integer default 0",
  createdAt: "timestamp",
};

// bots — one per website/embed
export const bots = {
  id: "uuid PK",
  organizationId: "uuid FK",
  name: "text", // pl. "tdaimarketing.hu főoldal"
  welcomeMessage: "text", // magyar üdvözlő
  systemPrompt: "text", // AI persona + szolgáltatás leírás
  collectFields: "jsonb", // ["name","phone","email"]
  notifyEmail: "text", // tulaj email értesítéshez
  isActive: "boolean default true",
  embedKey: "text unique", // public widget key
  createdAt: "timestamp",
};

// conversations
export const conversations = {
  id: "uuid PK",
  botId: "uuid FK",
  visitorId: "text", // cookie/session id
  pageUrl: "text?",
  createdAt: "timestamp",
};

// messages
export const messages = {
  id: "uuid PK",
  conversationId: "uuid FK",
  role: "user | assistant | system",
  content: "text",
  createdAt: "timestamp",
};

// leads — captured from chat
export const leads = {
  id: "uuid PK",
  botId: "uuid FK",
  conversationId: "uuid FK",
  name: "text?",
  phone: "text?",
  email: "text?",
  notes: "text?", // AI összefoglaló
  notifiedAt: "timestamp?",
  createdAt: "timestamp",
};
