/** Shared Schema.org LocalBusiness + Service graph for all pages. */

export const SITE_URL = "https://tomninggoteborg.se";
export const BUSINESS_ID = `${SITE_URL}/#localbusiness`;

export function localBusinessEntity(locale = "sv", overrides = {}) {
  const isEn = locale === "en";
  return {
    "@type": "LocalBusiness",
    "@id": BUSINESS_ID,
    name: "Alfa Tömning Göteborg",
    url: isEn ? `${SITE_URL}/en/` : `${SITE_URL}/`,
    telephone: "+46707293986",
    email: "info@tomninggoteborg.se",
    image: `${SITE_URL}/assets/logo.png`,
    logo: `${SITE_URL}/assets/logo.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: isEn ? "Gothenburg" : "Göteborg",
      addressCountry: "SE",
    },
    areaServed: isEn
      ? ["Gothenburg", "Mölndal", "Partille", "Kungälv", "Lerum", "Kungsbacka"]
      : ["Göteborg", "Mölndal", "Partille", "Kungälv", "Lerum", "Kungsbacka"],
    description: isEn
      ? "Professional house clearance, estate clearance and junk removal in the Gothenburg region."
      : "Professionell tömning, dödsbotömning och bortforsling i Göteborgsregionen.",
    inLanguage: isEn ? "en-GB" : "sv-SE",
    ...overrides,
  };
}

export function schemaScript(data) {
  return `  <script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

export function localBusinessScript(locale, overrides = {}) {
  return schemaScript({
    "@context": "https://schema.org",
    ...localBusinessEntity(locale, overrides),
  });
}

export function servicePageSchema(service, locale) {
  const cityName = locale === "en" ? "Gothenburg" : "Göteborg";
  return {
    "@context": "https://schema.org",
    "@graph": [
      localBusinessEntity(locale),
      {
        "@type": "Service",
        name: service.name,
        description: service.description,
        areaServed: cityName,
        inLanguage: locale === "en" ? "en-GB" : "sv-SE",
        provider: { "@id": BUSINESS_ID },
      },
    ],
  };
}

export function areaPageSchema(area, locale) {
  return {
    "@context": "https://schema.org",
    ...localBusinessEntity(locale, {
      areaServed: area.name,
      description: area.meta,
    }),
  };
}
