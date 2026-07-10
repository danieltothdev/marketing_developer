import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  backLinkHtml,
  chevronIcon,
  homeServiceCards,
  iconBadgeHtml,
  iconSvg,
  navToggleIcon,
  visualServiceCardHtml,
} from "./type-icons.mjs";
import { footerHtml } from "./footer.mjs";
import { normalizeSeoTitle } from "./seo-titles.mjs";
import { faviconHeadHtml } from "./brand-assets.mjs";
import { localBusinessScript } from "./business-schema.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const i18nConfig = JSON.parse(fs.readFileSync(path.join(__dirname, "i18n-config.json"), "utf8"));
const routeMap = JSON.parse(fs.readFileSync(path.join(root, "js", "i18n-routes.json"), "utf8"));
const serviceImages = JSON.parse(fs.readFileSync(path.join(__dirname, "service-images.json"), "utf8"));

function esc(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function langSwitcher(locale) {
  return `        <div class="lang-switcher" role="group" aria-label="Language">
          <button type="button" class="lang-switcher__btn${locale === "sv" ? " is-active" : ""}" data-lang-switch="sv" title="Svenska" aria-pressed="${locale === "sv"}">SV</button>
          <button type="button" class="lang-switcher__btn${locale === "en" ? " is-active" : ""}" data-lang-switch="en" title="English" aria-pressed="${locale === "en"}">EN</button>
        </div>`;
}

function hreflangTags(svPath, enPath) {
  const base = i18nConfig.siteUrl;
  const clean = (p) => p.replace(/index\.html$/, "").replace(/\.html$/, "");
  return `  <link rel="alternate" hreflang="sv" href="${base}/${clean(svPath)}" />
  <link rel="alternate" hreflang="en" href="${base}/${clean(enPath)}" />
  <link rel="alternate" hreflang="x-default" href="${base}/${clean(svPath)}" />`;
}

function serviceNavDropdown(navPrefix, locale) {
  const navConfig = i18nConfig.serviceNav[locale];
  const servicesDir = i18nConfig.locales[locale].servicesDir;
  const map = i18nConfig.serviceSlugMap;

  function hrefFor(svSlug) {
    const slug = locale === "en" ? map[svSlug] || svSlug : svSlug;
    return `${navPrefix}${servicesDir}/${slug}.html`;
  }

  const groups = navConfig.groups
    .map((group) => {
      const items = group.items
        .map((item) => `            <li><a href="${hrefFor(item.slug)}">${esc(item.label)}</a></li>`)
        .join("\n");
      return `        <li class="nav-dropdown-group"><span class="nav-dropdown-label">${esc(group.label)}</span><ul class="nav-dropdown-sublist">\n${items}\n          </ul></li>`;
    })
    .join("\n");

  const overview = navConfig.overview
    ? `\n        <li class="nav-dropdown-divider" role="separator"></li>\n        <li><a class="nav-dropdown-overview" href="${hrefFor(navConfig.overview.slug)}">${esc(navConfig.overview.label)}</a></li>`
    : "";

  return `${groups}${overview}`;
}

function nav(prefix, locale, current) {
  const ui = i18nConfig.ui[locale];
  const loc = i18nConfig.locales[locale];
  const dropdown = serviceNavDropdown(prefix, locale);

  const homeHref = prefix + "index.html";
  const pricingHref = prefix + (locale === "en" ? "pricing.html" : "priser.html");
  const areasHref = prefix + (locale === "en" ? "areas.html" : "omraden.html");
  const contactHref = prefix + (locale === "en" ? "contact.html" : "kontakt.html");
  const quoteHref = prefix + (locale === "en" ? "quote.html" : "offert.html");

  const currentAttr = (id) => (current === id ? ' aria-current="page"' : "");

  return `  <header class="site-header">
    <div class="container nav-bar">
      <a href="${homeHref}" class="nav-brand" aria-label="${esc(ui.brand)}"><img src="${prefix}${loc.assetPrefix || ""}assets/logo.png" alt="" width="40" height="40" decoding="async" /><span>${esc(ui.brand)}</span></a>
      <button type="button" class="nav-toggle" id="navToggle" aria-label="${esc(ui.navMenu)}">${navToggleIcon()}</button>
      <ul class="nav-links" id="primaryNav">
        <li><a href="${homeHref}"${currentAttr("home")}>${esc(ui.navHome)}</a></li>
        <li class="nav-dropdown"><button type="button" class="nav-dropdown-toggle" aria-expanded="false">${esc(ui.navServices)}</button>
          <ul class="nav-dropdown-menu">\n${dropdown}\n          </ul>
        </li>
        <li><a href="${pricingHref}"${currentAttr("pricing")}>${esc(ui.navPricing)}</a></li>
        <li><a href="${areasHref}"${currentAttr("areas")}>${esc(ui.navAreas)}</a></li>
        <li><a href="${contactHref}"${currentAttr("contact")}>${esc(ui.navContact)}</a></li>
      </ul>
      <div class="nav-actions">
${langSwitcher(locale)}
        <a class="nav-phone" href="tel:+46707293986">070 729 39 86</a>
        <a class="btn btn-primary" href="${quoteHref}">${esc(ui.navQuote)}</a>
      </div>
    </div>
  </header>`;
}

function formAssets(prefix) {
  return `  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css" />
  <link rel="stylesheet" href="${prefix}css/flatpickr-dark.css" />`;
}

function scripts(prefix, locale, opts = {}) {
  const flatpickrLocale = locale === "en" ? "" : '  <script src="https://cdn.jsdelivr.net/npm/flatpickr/dist/l10n/sv.js"></script>\n';
  const servicesData = locale === "en" ? `${prefix}js/services-data-en.js` : `${prefix}js/services-data.js`;
  const areasData = locale === "en" ? `${prefix}js/areas-data-en.js` : `${prefix}js/areas-data.js`;
  const reviews = opts.reviews
    ? `  <script src="${prefix}js/${locale === "en" ? "reviews-data-en.js" : "reviews-data.js"}"></script>\n`
    : "";
  const areas = opts.areas ? `  <script src="${areasData}"></script>\n` : "";
  return `${reviews}${areas}  <script type="application/json" id="i18n-routes">${JSON.stringify(routeMap)}</script>
  <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
${flatpickrLocale}  <script src="${servicesData}"></script>
  <script src="${prefix}js/config.js"></script>
  <script src="${prefix}js/form-i18n.js"></script>
  <script src="${prefix}js/form-mount.js"></script>
  <script src="${prefix}js/date-picker.js"></script>
  <script src="${prefix}js/form-submit.js"></script>
  <script src="${prefix}js/i18n.js"></script>
  <script src="${prefix}js/main.js"></script>`;
}

function pageShell({ locale, title, description, canonical, svPath, enPath, current, body, prefix, scriptOpts, schemaOverrides }) {
  const loc = i18nConfig.locales[locale];
  return `<!doctype html>
<html lang="${loc.htmlLang}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(normalizeSeoTitle(title))}</title>
  <meta name="description" content="${esc(description)}" />
  <link rel="canonical" href="${i18nConfig.siteUrl}/${canonical}" />
${hreflangTags(svPath, enPath)}
${faviconHeadHtml(prefix + (loc.assetPrefix || ""))}
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="${prefix}${loc.assetPrefix || ""}css/main.css" />
${formAssets(prefix + (loc.assetPrefix || ""))}
${localBusinessScript(locale, schemaOverrides || { description })}
</head>
<body>
${nav(prefix, locale, current)}
${body}
${footerHtml(locale)}
${scripts(prefix + (loc.assetPrefix || ""), locale, scriptOpts)}
</body>
</html>`;
}

function serviceCardEn(slug, title, text, readMore) {
  return `          <article class="service-card">
            ${iconBadgeHtml("recycle", 22)}
            <h3>${esc(title)}</h3>
            <p>${esc(text)}</p>
            <div class="card-actions">
              <a class="btn btn-primary" href="#offert">${esc(readMore === "quote" ? "Get a Quote" : "Get a Quote")}</a>
              <a class="btn btn-ghost" href="services/${slug}.html">Read more</a>
            </div>
          </article>`;
}

function homeEn() {
  const ui = i18nConfig.ui.en;
  const prefix = "../";
  const cards = homeServiceCards.en;

  const body = `<main>
    <section class="hero" id="top">
      <div class="container hero-grid">
        <div>
          <p class="eyebrow">Gothenburg &amp; region</p>
          <h1 class="display-title">House clearance Gothenburg – professional help with estates, storage and junk removal</h1>
          <p class="hero-lead">Need help clearing an apartment, villa, storage unit or estate? We offer professional house clearance and junk removal across the Gothenburg region with fixed prices and fast service.</p>
          <ul class="hero-bullets">
            <li>Free quote within 1–5 minutes</li>
            <li>Public liability insurance up to SEK 10M</li>
            <li>Fixed price with no hidden fees</li>
            <li>24/7 emergency clearance</li>
          </ul>
          <div class="hero-trust-badges hero-trust-badges--home">
            <span class="hero-trust-badge">${iconSvg("shield", 16)} Insured up to SEK 10M</span>
            <span class="hero-trust-badge">${iconSvg("clock", 16)} Response within 1–5 min</span>
            <span class="hero-trust-badge">${iconSvg("bolt", 16)} 24/7 emergency line</span>
          </div>
        </div>
        <aside id="offert" data-offert-form data-form-title="${esc(ui.formTitle)}" data-form-subtitle="${esc(ui.formSubtitle)}"></aside>
      </div>
      <div class="container stats-grid">
        <article class="stat-card"><h3>5000+ happy customers</h3><p>Trusted clearance, moving and recycling help across Gothenburg.</p></article>
        <article class="stat-card"><h3>10 years of experience</h3><p>Experienced, trained teams for every type of job.</p></article>
        <article class="stat-card"><h3>Fully insured</h3><p>Public liability insurance and transport licence included.</p></article>
        <article class="stat-card"><h3>Eco-friendly recycling</h3><p>We sort, recycle and minimise waste on every project.</p></article>
      </div>
    </section>
    <section class="section" id="services">
      <div class="container">
        <div class="section-head">
          <p class="section-eyebrow">Our services</p>
          <h2>House Clearance &amp; Junk Removal in Gothenburg</h2>
          <p>Whether you need estate clearance, apartment clear-out, storage clearance or furniture removal – we offer secure, efficient solutions with fixed prices and fast response times.</p>
        </div>
        <div class="cards-4">
${cards.map((c) => visualServiceCardHtml(c, { servicesDir: "services", quoteLabel: "Get a Quote", readMoreLabel: "Read more", images: serviceImages, assetRoot: "../", locale: "en" })).join("\n")}
        </div>
        <div class="trust-strip trust-strip--icons">
          <span>${iconSvg("clock", 14)} 10+ years of experience</span>
          <span>${iconSvg("heart", 14)} 5000+ happy customers</span>
          <span>${iconSvg("recycle", 14)} 85% recycling rate</span>
          <span>${iconSvg("bolt", 14)} 24/7 customer service</span>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="section-head"><p class="section-eyebrow">Why Alfa Tömning</p><h2>Why Gothenburg chooses us</h2><p>Secure, fast and professional house clearance, estate clearance and junk removal across the region.</p></div>
        <div class="cards-4">
          <article class="feature-card">${iconBadgeHtml("shield")}<h3>High security</h3><p>Fully insured with experienced teams who handle every clearance with respect for property and the environment.</p></article>
          <article class="feature-card">${iconBadgeHtml("bolt")}<h3>Fast service</h3><p>Short-notice collection and clearance across Gothenburg – ideal for urgent needs and estates.</p></article>
          <article class="feature-card">${iconBadgeHtml("leaf")}<h3>Responsible recycling</h3><p>Careful sorting ensures reusable and recyclable items are handled correctly.</p></article>
          <article class="feature-card">${iconBadgeHtml("coin")}<h3>Fixed prices</h3><p>No hidden fees. You always receive a transparent fixed price before work begins.</p></article>
        </div>
      </div>
    </section>
    <section class="section section--muted" id="how-it-works">
      <div class="container">
        <div class="section-head section-head--center"><p class="section-eyebrow">Simple &amp; secure</p><h2>How it works</h2><p>From first contact to finished clearance – three clear steps without hassle.</p></div>
        <div class="process-grid process-grid--home">
          <article class="process-step"><span class="process-step__num">1</span><div><h3>Request a quote</h3><p>Fill in the form or call us. We usually respond within 1–5 minutes.</p></div></article>
          <article class="process-step"><span class="process-step__num">2</span><div><h3>Inspection &amp; fixed price</h3><p>We assess scope, access and timing. You receive a fixed price before we start.</p></div></article>
          <article class="process-step"><span class="process-step__num">3</span><div><h3>Clearance &amp; recycling</h3><p>Our team clears, sorts and transports everything for eco-friendly recycling or reuse.</p></div></article>
        </div>
      </div>
    </section>
    <section class="section reviews" data-reviews aria-labelledby="reviewsHeading">
      <div class="container">
        <div class="section-head section-head--center"><p class="section-eyebrow">Reviews</p><h2 id="reviewsHeading">What our customers say</h2><p>Our best marketing is satisfied customers.</p></div>
        <div class="reviews-stage"><div class="review-viewport"><div class="review-track" data-review-track></div></div><div class="review-controls"><button type="button" data-review-prev aria-label="Previous review">${chevronIcon("left")}</button><div class="review-dots" data-review-dots></div><button type="button" data-review-next aria-label="Next review">${chevronIcon("right")}</button></div></div>
      </div>
    </section>
    <section class="section area-section" id="areas">
      <div class="container">
        <div class="section-head section-head--center"><p class="section-eyebrow">Coverage</p><h2>Which areas in Gothenburg do you cover?</h2><p>We offer <strong>house clearance</strong>, <strong>estate clearance</strong> and <strong>junk removal</strong> across the Gothenburg region – from Västra Göteborg and Hisingen to Mölndal, Partille, Kungälv, Lerum and Kungsbacka.</p></div>
        <div class="area-grid" data-area-grid data-area-prefix="areas/"></div>
        <p class="area-footnote">Can't find your area? We often travel to nearby municipalities too. <a href="contact.html">Contact us</a></p>
      </div>
    </section>
    <section class="section" id="faq">
      <div class="container">
        <div class="section-head"><p class="section-eyebrow">FAQ</p><h2>Frequently asked questions</h2></div>
        <div class="faq-list">
          <article class="faq-item"><button type="button" aria-expanded="false">Which areas in Gothenburg do you cover?</button><div class="faq-panel">We cover the entire Gothenburg region including Mölndal, Partille, Kungälv, Lerum, Kungsbacka and surrounding towns.</div></article>
          <article class="faq-item"><button type="button" aria-expanded="false">How much does house clearance cost?</button><div class="faq-panel">Price depends on volume, access and job type. You always receive a fixed quote before work begins.</div></article>
          <article class="faq-item"><button type="button" aria-expanded="false">How quickly can you help?</button><div class="faq-panel">We often offer short-notice slots and 24/7 emergency clearance for urgent needs.</div></article>
          <article class="faq-item"><button type="button" aria-expanded="false">What happens to the items you collect?</button><div class="faq-panel">Everything is sorted and transported for recycling, reuse or approved disposal according to regulations.</div></article>
          <article class="faq-item"><button type="button" aria-expanded="false">Do you handle estate clearance?</button><div class="faq-panel">Yes – respectful, professional estate clearance including sorting and removal for families and executors.</div></article>
        </div>
      </div>
    </section>
    <section class="section"><div class="container cta-band"><div><h2>${esc(ui.ctaReady)}</h2><p style="color:var(--muted)">${esc(ui.ctaLead)}</p></div><div style="display:flex;gap:.65rem;flex-wrap:wrap"><a class="btn btn-primary" href="#offert">${esc(ui.navQuote)}</a><a class="btn btn-ghost" href="tel:+46707293986">Call us 24/7</a></div></div></section>
    <section class="section section--muted"><div class="container"><div class="section-head"><p class="section-eyebrow">Map</p><h2>Find us</h2><p>Based in Gothenburg and covering the entire region.</p></div><div class="map-wrap map-wrap--full"><iframe title="Map Gothenburg" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.openstreetmap.org/export/embed.html?bbox=11.85%2C57.65%2C12.10%2C57.75&amp;layer=mapnik&amp;marker=57.7089%2C11.9746"></iframe></div></div></section>
  </main>`;

  const schema = localBusinessScript("en");

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>House Clearance Gothenburg – Estate &amp; Junk | Alfa Tömning</title>
  <meta name="description" content="Professional house clearance, estate clearance and junk removal in Gothenburg and the region. Fixed prices, fast service and free quote within 1–5 minutes." />
  <link rel="canonical" href="https://tomninggoteborg.se/en/" />
${hreflangTags("index.html", "en/index.html")}
  <meta property="og:title" content="House Clearance Gothenburg – Estate &amp; Junk | Alfa Tömning" />
  <meta property="og:description" content="Fast help with apartment, villa, storage and estate clearance across the Gothenburg region." />
  <meta property="og:locale" content="en_GB" />
  <meta property="og:url" content="https://tomninggoteborg.se/en/" />
${faviconHeadHtml("../")}
  <link rel="preload" as="image" href="../assets/images/centrum.jpg" fetchpriority="high" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../css/main.css" />
${formAssets("../")}
  ${schema}
</head>
<body>
${nav("", "en", "home")}
${body}
${footerHtml("en")}
${scripts("", "en", { reviews: true, areas: true })}
</body>
</html>`;
}

fs.mkdirSync(path.join(root, "en"), { recursive: true });

// Swedish static pages
const svPages = {
  offert: {
    title: "Offert Tömning Göteborg – Gratis & Snabb | Alfa Tömning",
    description: "Begär gratis offert för tömning i Göteborg. Fast pris och snabb återkoppling.",
    canonical: "offert",
    body: `<main>
  <section class="page-hero"><div class="container"><h1 class="display-title">Offert för tömning Göteborg – gratis och snabb</h1><p class="hero-lead">Fyll i formuläret nedan så återkommer vi med offert så snart som möjligt.</p></div></section>
  <section class="section"><div class="container" style="max-width:920px"><div data-offert-form data-form-title="Offertförfrågan"></div></div></section>
</main>`,
  },
  kontakt: {
    title: "Kontakt – Tömning Göteborg | Alfa Tömning",
    description: "Kontakta Alfa Tömning Göteborg för offert, bokning eller frågor om tömning och bortforsling.",
    canonical: "kontakt",
    current: "contact",
    body: `<main>
  <section class="page-hero"><div class="container"><h1 class="display-title">Kontakta oss</h1><p>Har du frågor eller vill ha en gratis offert? Tveka inte att höra av dig.</p></div></section>
  <section class="section"><div class="container"><div class="contact-grid">
    <article class="contact-card"><h3>Ring oss</h3><p><a href="tel:+46707293986">070 729 39 86</a></p></article>
    <article class="contact-card"><h3>Mejla oss</h3><p><a href="mailto:info@tomninggoteborg.se">info@tomninggoteborg.se</a></p></article>
    <article class="contact-card"><h3>Vår bas</h3><p>Göteborg, Sverige<br />Mån–Sön: 07:00 – 22:00<br />Akut hjälp: 24/7</p></article>
  </div></div></section>
  <section class="section section--muted"><div class="container contact-page-grid"><div class="contact-page-copy"><p class="eyebrow">Gratis offert</p><h2>Få snabb offert</h2><p class="hero-lead">Fyll i formuläret så återkommer vi inom kort med fast pris.</p></div><aside id="offert" data-offert-form data-form-title="Offertförfrågan"></aside></div></section>
</main>`,
  },
  priser: {
    title: "Priser Tömning Göteborg – Fast Pris & Offert | Alfa Tömning",
    description: "Fasta priser på tömning, dödsbotömning och bortforsling i Göteborg. Gratis offert utan dolda avgifter.",
    canonical: "priser",
    current: "pricing",
    body: `<main>
  <section class="page-hero"><div class="container"><h1 class="display-title">Priser &amp; offert</h1><p>Fasta priser utan dolda avgifter. Exakt kostnad beror på volym och typ av uppdrag.</p></div></section>
  <section class="section"><div class="container cards-4">
    <article class="service-card"><h3>Bortforsling</h3><p>Från enstaka möbler till större partier.</p><a class="btn btn-primary" href="tjanster/bortforsling-i-goteborg.html">Läs mer</a></article>
    <article class="service-card"><h3>Förrådstömning</h3><p>Fast pris efter mängd och tillgång.</p><a class="btn btn-primary" href="tjanster/forradstomning-i-goteborg.html">Läs mer</a></article>
    <article class="service-card"><h3>Lägenhetstömning</h3><p>Pris efter storlek och våning.</p><a class="btn btn-primary" href="tjanster/lagenhetstomning-i-goteborg.html">Läs mer</a></article>
    <article class="service-card"><h3>Dödsbotömning</h3><p>Individuell offert efter omfattning.</p><a class="btn btn-primary" href="tjanster/dodsbotomning-i-goteborg.html">Läs mer</a></article>
  </div></section>
  <section class="section"><div class="container" style="max-width:920px"><div data-offert-form data-form-title="Begär prisoffert"></div></div></section>
</main>`,
  },
  omraden: {
    title: "Områden – Tömning Göteborg & Region | Alfa Tömning",
    description: "Tömning, dödsbotömning och bortforsling i hela Göteborgsregionen.",
    canonical: "omraden",
    current: "areas",
    body: `<main>
  <section class="page-hero"><div class="container section-head--center"><h1 class="display-title">Vilka områden i Göteborg arbetar ni i?</h1><p>Vi erbjuder <strong>tömning</strong>, <strong>dödsbotömning</strong> och <strong>bortforsling</strong> i hela Göteborgsregionen.</p></div></section>
  <section class="section area-section"><div class="container"><div class="area-grid" data-area-grid data-area-prefix="omraden/"></div></div></section>
  <section class="section"><div class="container" style="max-width:920px"><div data-offert-form data-form-title="Offert för ditt område"></div></div></section>
</main>`,
    scriptOpts: { areas: true },
  },
};

for (const [name, p] of Object.entries(svPages)) {
  const file = name === "offert" ? "offert.html" : `${name}.html`;
  const enFile = routeMap[file];
  fs.writeFileSync(
    path.join(root, file),
    pageShell({
      locale: "sv",
      title: p.title,
      description: p.description,
      canonical: p.canonical,
      svPath: file,
      enPath: enFile,
      current: p.current,
      body: p.body,
      prefix: "",
      scriptOpts: p.scriptOpts || {},
    }),
    "utf8"
  );
}

// English static pages
const enPages = {
  quote: {
    title: "Quote House Clearance Gothenburg – Free | Alfa Tömning",
    description: "Request a free quote for house clearance in Gothenburg. Fixed price and fast response.",
    canonical: "en/quote",
    body: `<main>
  <section class="page-hero"><div class="container"><h1 class="display-title">Request a quote for house clearance in Gothenburg</h1><p class="hero-lead">Fill in the form below and we will respond with a quote as soon as possible.</p></div></section>
  <section class="section"><div class="container" style="max-width:920px"><div data-offert-form data-form-title="Quote request"></div></div></section>
</main>`,
  },
  contact: {
    title: "Contact – House Clearance Gothenburg | Alfa Tömning",
    description: "Contact Alfa Tömning Gothenburg for quotes, bookings or questions about house clearance and junk removal.",
    canonical: "en/contact",
    current: "contact",
    body: `<main>
  <section class="page-hero"><div class="container"><h1 class="display-title">Contact us</h1><p>Questions or need a free quote? Get in touch – we respond quickly.</p></div></section>
  <section class="section"><div class="container"><div class="contact-grid">
    <article class="contact-card"><h3>Call us</h3><p><a href="tel:+46707293986">070 729 39 86</a></p></article>
    <article class="contact-card"><h3>Email us</h3><p><a href="mailto:info@tomninggoteborg.se">info@tomninggoteborg.se</a></p></article>
    <article class="contact-card"><h3>Our base</h3><p>Gothenburg, Sweden<br />Mon–Sun: 07:00 – 22:00<br />Emergency: 24/7</p></article>
  </div></div></section>
  <section class="section section--muted"><div class="container contact-page-grid"><div class="contact-page-copy"><p class="eyebrow">Free quote</p><h2>Get a quick quote</h2><p class="hero-lead">Fill in the form and we will get back to you shortly with a fixed price.</p></div><aside id="offert" data-offert-form data-form-title="Quote request"></aside></div></section>
</main>`,
  },
  pricing: {
    title: "House Clearance Pricing Gothenburg – Fixed | Alfa Tömning",
    description: "Fixed prices for house clearance, estate clearance and junk removal in Gothenburg. Free quote with no hidden fees.",
    canonical: "en/pricing",
    current: "pricing",
    body: `<main>
  <section class="page-hero"><div class="container"><h1 class="display-title">Pricing &amp; quotes</h1><p>Fixed prices with no hidden fees. Exact cost depends on volume and job type.</p></div></section>
  <section class="section"><div class="container cards-4">
    <article class="service-card"><h3>Junk removal</h3><p>From single items to larger loads.</p><a class="btn btn-primary" href="services/junk-removal-gothenburg.html">Read more</a></article>
    <article class="service-card"><h3>Storage clearance</h3><p>Fixed price based on volume and access.</p><a class="btn btn-primary" href="services/storage-clearance-gothenburg.html">Read more</a></article>
    <article class="service-card"><h3>Apartment clearance</h3><p>Priced by size and floor level.</p><a class="btn btn-primary" href="services/apartment-clearance-gothenburg.html">Read more</a></article>
    <article class="service-card"><h3>Estate clearance</h3><p>Individual quote based on scope.</p><a class="btn btn-primary" href="services/estate-clearance-gothenburg.html">Read more</a></article>
  </div></section>
  <section class="section"><div class="container" style="max-width:920px"><div data-offert-form data-form-title="Request a price quote"></div></div></section>
</main>`,
  },
  areas: {
    title: "Areas – House Clearance Gothenburg | Alfa Tömning",
    description: "House clearance, estate clearance and junk removal across the Gothenburg region.",
    canonical: "en/areas",
    current: "areas",
    body: `<main>
  <section class="page-hero"><div class="container section-head--center"><h1 class="display-title">Which areas in Gothenburg do you cover?</h1><p>We offer <strong>house clearance</strong>, <strong>estate clearance</strong> and <strong>junk removal</strong> across the Gothenburg region.</p></div></section>
  <section class="section area-section"><div class="container"><div class="area-grid" data-area-grid data-area-prefix="areas/"></div></div></section>
  <section class="section"><div class="container" style="max-width:920px"><div data-offert-form data-form-title="Quote for your area"></div></div></section>
</main>`,
    scriptOpts: { areas: true },
  },
  "privacy-policy": {
    title: "Privacy Policy | Alfa Tömning",
    description: "Privacy policy for Alfa Tömning Gothenburg – how we handle personal data for quote requests.",
    canonical: "en/privacy-policy",
    body: `<main>
  <section class="page-hero"><div class="container"><h1>Privacy policy</h1><p style="color:var(--muted);max-width:70ch">We process personal data such as name, email and phone number to handle quote requests and customer contact. Data is stored securely in our database (Supabase) and is not shared with third parties beyond what is required to deliver the service.</p></div></section>
  <section class="section"><div class="container" style="max-width:760px;color:var(--muted)"><p>You may request correction or deletion of your data at any time via <a href="mailto:info@tomninggoteborg.se" style="color:var(--accent)">info@tomninggoteborg.se</a>.</p><p style="margin-top:1rem">${backLinkHtml("index.html", "Back to homepage")}</p></div></section>
</main>`,
    scriptOpts: {},
  },
};

for (const [name, p] of Object.entries(enPages)) {
  const file = `en/${name}.html`;
  const svFile = Object.entries(routeMap).find(([, en]) => en === file)?.[0] || "index.html";
  fs.writeFileSync(
    path.join(root, file),
    pageShell({
      locale: "en",
      title: p.title,
      description: p.description,
      canonical: p.canonical,
      svPath: svFile,
      enPath: file,
      current: p.current,
      body: p.body,
      prefix: "",
      scriptOpts: p.scriptOpts || {},
    }),
    "utf8"
  );
}

fs.writeFileSync(path.join(root, "en", "index.html"), homeEn(), "utf8");

// Update integritetspolicy with lang switcher minimal nav
const integritet = `<!doctype html>
<html lang="sv">
<head>
  <meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Integritetspolicy | Alfa Tömning</title>
  <link rel="canonical" href="https://tomninggoteborg.se/integritetspolicy" />
${hreflangTags("integritetspolicy.html", "en/privacy-policy.html")}
  <link rel="icon" type="image/png" sizes="32x32" href="assets/favicon-32.png" />
  <link rel="icon" type="image/png" sizes="192x192" href="assets/favicon-192.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="assets/apple-touch-icon.png" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="css/main.css" />
${localBusinessScript("sv")}
</head>
<body>
${nav("", "sv")}
  <main>
    <section class="page-hero"><div class="container"><h1>Integritetspolicy</h1><p style="color:var(--muted);max-width:70ch">Vi behandlar personuppgifter som namn, e-post och telefonnummer för att hantera offertförfrågningar och kundkontakt. Uppgifter lagras säkert i vår databas (Supabase) och delas inte med tredje part utanför det som krävs för att utföra tjänsten.</p></div></section>
    <section class="section"><div class="container" style="max-width:760px;color:var(--muted)"><p>Du kan när som helst begära rättelse eller radering av dina uppgifter via <a href="mailto:info@tomninggoteborg.se" style="color:var(--accent)">info@tomninggoteborg.se</a>.</p><p style="margin-top:1rem">${backLinkHtml("index.html", "Tillbaka till startsidan")}</p></div></section>
  </main>
${footerHtml("sv")}
${scripts("", "sv")}
</body>
</html>`;
fs.writeFileSync(path.join(root, "integritetspolicy.html"), integritet, "utf8");

// Sitemap
const urls = [
  "https://tomninggoteborg.se/",
  "https://tomninggoteborg.se/en/",
  "https://tomninggoteborg.se/offert",
  "https://tomninggoteborg.se/en/quote",
  "https://tomninggoteborg.se/kontakt",
  "https://tomninggoteborg.se/en/contact",
  "https://tomninggoteborg.se/priser",
  "https://tomninggoteborg.se/en/pricing",
  "https://tomninggoteborg.se/omraden",
  "https://tomninggoteborg.se/en/areas",
  "https://tomninggoteborg.se/integritetspolicy",
  "https://tomninggoteborg.se/en/privacy-policy",
];

for (const [sv, en] of Object.entries(routeMap)) {
  if (sv.startsWith("tjanster/") || sv.startsWith("omraden/")) {
    urls.push(`https://tomninggoteborg.se/${sv.replace(".html", "")}`);
    urls.push(`https://tomninggoteborg.se/${en.replace(".html", "")}`);
  }
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${[...new Set(urls)].map((u) => `  <url><loc>${u}</loc></url>`).join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(root, "sitemap.xml"), sitemap, "utf8");

console.log("Generated static i18n pages, en/index.html and sitemap.xml");
