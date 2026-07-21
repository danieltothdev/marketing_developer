window.SITE_CONFIG = {
  domain: "tomninggoteborg.se",
  businessName: "Alfa Tömning Göteborg",
  phone: "0707293986",
  phoneDisplay: "070 729 39 86",
  email: "info@tomninggoteborg.se",
  city: "Göteborg",
  country: "SE",
};

window.SUPABASE_CONFIG = {
  // Project Settings → API → Project URL
  url: "https://YOUR_PROJECT.supabase.co",
  // Project Settings → API → anon public key
  anonKey: "YOUR_ANON_KEY",
  table: "leads",

  // "rest" = bara spara i databas (kräver RLS insert-policy)
  // "edge" = spara + e-postnotis via Edge Function submit-lead (rekommenderas)
  submitVia: "edge",
  submitLeadFunction: "submit-lead",

  columnMap: {
    name: "name",
    address: "address",
    city: "city",
    postal_code: "postal_code",
    phone: "phone",
    email: "email",
    service: "service",
    preferred_date: "preferred_date",
    message: "message",
    site_domain: "site_domain",
  },
  extraFields: {
    site_domain: "tomninggoteborg.se",
  },
};

// Edge Function secrets (Supabase Dashboard → Edge Functions → submit-lead → Secrets):
// NOTIFY_EMAIL=din@email.se          ← dit kommer notisen
// RESEND_API_KEY=re_...              ← gratis på resend.com
// NOTIFY_FROM=Offert <onboarding@resend.dev>   ← byt till verifierad domän senare
//
// Deploy:
//   supabase functions deploy submit-lead --no-verify-jwt
// Kör SQL: supabase/leads-example.sql
