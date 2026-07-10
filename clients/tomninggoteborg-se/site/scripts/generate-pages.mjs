import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { iconSvg, navToggleIcon, resolveTypeIcon, linkChevronHtml, checklistItemHtml, trustStripSpanHtml, areaTrustStripItems } from "./type-icons.mjs";
import { footerHtml } from "./footer.mjs";
import { normalizeSeoTitle } from "./seo-titles.mjs";
import { resolveImageSrc } from "./image-assets.mjs";
import { createPageImageTracker } from "./page-images.mjs";
import { faviconHeadHtml } from "./brand-assets.mjs";
import { areaPageSchema, schemaScript, servicePageSchema } from "./business-schema.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const i18nConfig = JSON.parse(fs.readFileSync(path.join(__dirname, "i18n-config.json"), "utf8"));
const serviceImages = JSON.parse(fs.readFileSync(path.join(__dirname, "service-images.json"), "utf8"));
const dataSvRaw = JSON.parse(fs.readFileSync(path.join(__dirname, "pages-data.json"), "utf8"));
const extraServices = JSON.parse(fs.readFileSync(path.join(__dirname, "extra-services.json"), "utf8"));

function mergeServices(base) {
  const map = new Map(base.map((s) => [s.slug, s]));
  for (const s of extraServices) map.set(s.slug, s);
  return [...map.values()];
}

const dataSv = { ...dataSvRaw, services: mergeServices(dataSvRaw.services) };
const areasSv = JSON.parse(fs.readFileSync(path.join(__dirname, "areas-content.json"), "utf8"));

function buildRouteMap() {
  const map = {
    "index.html": "en/index.html",
    "offert.html": "en/quote.html",
    "priser.html": "en/pricing.html",
    "omraden.html": "en/areas.html",
    "kontakt.html": "en/contact.html",
    "integritetspolicy.html": "en/privacy-policy.html",
  };
  for (const s of dataSv.services) {
    const enSlug = i18nConfig.serviceSlugMap[s.slug] || s.slug;
    map[`tjanster/${s.slug}.html`] = `en/services/${enSlug}.html`;
  }
  for (const a of areasSv) {
    map[`omraden/${a.slug}.html`] = `en/areas/${a.slug}.html`;
  }
  return map;
}

let routeMap = buildRouteMap();
const dataEn = JSON.parse(fs.readFileSync(path.join(__dirname, "pages-data-en.json"), "utf8"));
const areasEn = JSON.parse(fs.readFileSync(path.join(__dirname, "areas-content-en.json"), "utf8"));

const DEFAULT_WHY_US = {
  title: "Varför välja Alfa Tömning?",
  text: "Vi är göteborgare som förstår Göteborg. Med över 14 års erfarenhet, hundratals avklarade tömningar och hög kundnöjdhet erbjuder vi en komplett lösning – från tömning till återvinning. Vi är fullt ansvarsförsäkrade och har jour dygnet runt vid akuta behov.",
  stats: [
    { value: "14+", label: "Års erfarenhet" },
    { value: "2000+", label: "Genomförda projekt" },
    { value: "98%", label: "Återvinningsgrad" },
    { value: "24/7", label: "Beredskap" },
  ],
};

const DEFAULT_PIPELINE = [
  { label: "Tömning", desc: "Sortering på plats" },
  { label: "Transport", desc: "Säker lastning" },
  { label: "Återvinning", desc: "Certifierad mottagning" },
  { label: "Bortforsling", desc: "Slutlig hantering" },
];

const DEFAULT_AREA_HERO = "assets/images/goteborg-hero.jpg";

const areaServiceCards = [
  { label: "Tömning", slug: "tomning-i-goteborg", desc: "Lägenhet, villa & förråd" },
  { label: "Bortforsling", slug: "bortforsling-i-goteborg", desc: "Möbler, vitvaror & grovsopor" },
  { label: "Dödsbotömning", slug: "dodsbotomning-i-goteborg", desc: "Respektfull hjälp till anhöriga" },
  { label: "Akut hjälp", slug: "akut-hjalp-tomning", desc: "Samma dag vid brådskande behov" },
];

const serviceLinks = [
  ["tomning-i-goteborg", "Tömning i Göteborg"],
  ["bortforsling-i-goteborg", "Bortforsling i Göteborg"],
  ["dodsbotomning-i-goteborg", "Dödsbotömning i Göteborg"],
  ["lagenhetstomning-i-goteborg", "Lägenhetstömning"],
  ["forradstomning-i-goteborg", "Förrådstömning"],
  ["akut-hjalp-tomning", "Akut hjälp & tömning"],
  ["grovsopor-foreningar", "Grovsopor för föreningar"],
];

function esc(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function langSwitcher(locale) {
  return `      <div class="lang-switcher" role="group" aria-label="Language">
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

function nav(navPrefix, locale, services, assetRoot) {
  const ui = i18nConfig.ui[locale];
  const assets = assetRoot || navPrefix;
  const dropdown = serviceNavDropdown(navPrefix, locale);
  const homeHref = navPrefix + "index.html";
  const pricingHref = navPrefix + (locale === "en" ? "pricing.html" : "priser.html");
  const areasHref = navPrefix + (locale === "en" ? "areas.html" : "omraden.html");
  const contactHref = navPrefix + (locale === "en" ? "contact.html" : "kontakt.html");
  const quoteHref = navPrefix + (locale === "en" ? "quote.html" : "offert.html");
  return `  <header class="site-header">
    <div class="container nav-bar">
      <a href="${homeHref}" class="nav-brand" aria-label="${esc(ui.brand)}"><img src="${assets}assets/logo.png" alt="" width="40" height="40" decoding="async" /><span>${esc(ui.brand)}</span></a>
      <button type="button" class="nav-toggle" id="navToggle" aria-label="${esc(ui.navMenu)}">${navToggleIcon()}</button>
      <ul class="nav-links" id="primaryNav">
        <li><a href="${homeHref}">${esc(ui.navHome)}</a></li>
        <li class="nav-dropdown"><button type="button" class="nav-dropdown-toggle" aria-expanded="false">${esc(ui.navServices)}</button>
          <ul class="nav-dropdown-menu">\n${dropdown}\n          </ul>
        </li>
        <li><a href="${pricingHref}">${esc(ui.navPricing)}</a></li>
        <li><a href="${areasHref}">${esc(ui.navAreas)}</a></li>
        <li><a href="${contactHref}">${esc(ui.navContact)}</a></li>
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

function scripts(prefix, locale) {
  const flatpickrLocale = locale === "en" ? "" : '  <script src="https://cdn.jsdelivr.net/npm/flatpickr/dist/l10n/sv.js"></script>\n';
  const servicesData = locale === "en" ? `${prefix}js/services-data-en.js` : `${prefix}js/services-data.js`;
  const areasData = locale === "en" ? `${prefix}js/areas-data-en.js` : `${prefix}js/areas-data.js`;
  return `  <script type="application/json" id="i18n-routes">${JSON.stringify(routeMap)}</script>
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

function formCta(prefix, service, city) {
  return `    <section class="section final-offer" id="offert">
      <div class="container final-offer-grid">
        <div>
          <p class="eyebrow">Alltid gratis offert</p>
          <h2>Begär offert nu</h2>
          <p class="hero-lead">Fyll i formuläret så återkommer vi med fast pris utan dolda avgifter.</p>
          <ul class="final-offer-bullets">${checklistItemHtml("Svar inom 5 minuter", "inline")}${checklistItemHtml("Försäkrad & trygg service", "inline")}${checklistItemHtml("Inga dolda avgifter", "inline")}</ul>
        </div>
        <div data-offert-form data-default-service="${esc(service)}" data-default-city="${esc(city)}" data-form-title="Få snabb offert"></div>
      </div>
    </section>`;
}

function bulletsHtml(items) {
  return items.map((item) => checklistItemHtml(item, "bullet")).join("\n");
}

function trustBadgeHtml(badge) {
  if (typeof badge === "string") {
    return `<span class="hero-trust-badge">${esc(badge)}</span>`;
  }
  const icon = badge.icon ? iconSvg(badge.icon, 16) : "";
  return `<span class="hero-trust-badge">${icon} ${esc(badge.label)}</span>`;
}

function breadcrumbHtml(items, extraClass = "") {
  const crumbs = items
    .map((item) => {
      if (item.href) {
        const homeIcon =
          item.homeIcon === true
            ? `<span class="breadcrumb__home-icon">${iconSvg("home", 14)}</span>`
            : "";
        return `      <li><a href="${item.href}">${homeIcon}${esc(item.label)}</a></li>`;
      }
      return `      <li aria-current="page">${esc(item.label)}</li>`;
    })
    .join("\n");
  return `  <nav class="breadcrumb container breadcrumb--above-hero${extraClass ? ` ${extraClass}` : ""}" aria-label="Breadcrumb">
    <ol>
${crumbs}
    </ol>
  </nav>`;
}

function offertAside(formService, formCity, ui, prefix = "") {
  return `      <aside id="offert" data-offert-form data-default-service="${esc(formService)}" data-default-city="${esc(formCity)}" data-form-title="${esc(ui?.formTitle || "Få snabb offert")}" data-form-subtitle="${esc(ui?.formSubtitle || "Fyll i formuläret så återkommer vi inom kort.")}"></aside>`;
}

function emergencyHeroHtml(opts) {
  const {
    h1,
    h1Accent,
    lead,
    urgencyBadge,
    heroBadges,
    formService,
    formCity,
    breadcrumbItems,
    ui,
  } = opts;

  const badgesHtml = (heroBadges || []).map(trustBadgeHtml).join("\n        ");
  const breadcrumb = breadcrumbHtml(breadcrumbItems, "breadcrumb--emergency");

  return `${breadcrumb}

  <section class="hero hero--subpage hero--emergency">
    <div class="container hero-grid">
      <div class="hero-emergency__copy">
        ${urgencyBadge ? `<p class="urgency-badge">${iconSvg("bolt", 16)} ${esc(urgencyBadge)}</p>` : ""}
        <h1 class="display-title">${esc(h1)}${h1Accent ? `<span class="display-title-accent">${esc(h1Accent)}</span>` : ""}</h1>
        <p class="hero-lead">${esc(lead)}</p>
        <div class="service-hero-actions">
          <a class="btn btn-emergency" href="tel:+46707293986">${iconSvg("phone", 18)} ${esc(ui?.locale === "en" ? "Call Now: 070-729 39 86" : "Ring Nu: 070-729 39 86")}</a>
          <a class="btn btn-outline-accent" href="#offert">${linkChevronHtml(ui?.heroQuote || "Få Offert", "right", 16)}</a>
        </div>
        ${badgesHtml ? `<div class="hero-trust-badges">\n        ${badgesHtml}\n        </div>` : ""}
      </div>
${offertAside(formService, formCity, ui)}
    </div>
  </section>`;
}

function heroWithForm(opts) {
  const {
    eyebrow,
    h1,
    lead,
    bullets,
    heroImage,
    heroBadges,
    formService,
    formCity,
    breadcrumbItems,
    prefix,
    plainHero = false,
    ui,
  } = opts;

  const crumbs = breadcrumbItems
    .map((item) => {
      if (item.href) {
        return `      <li><a href="${item.href}">${esc(item.label)}</a></li>`;
      }
      return `      <li aria-current="page">${esc(item.label)}</li>`;
    })
    .join("\n");

  const badgesHtml = (heroBadges || []).map(trustBadgeHtml).join("\n        ");

  const heroBg = resolveImageSrc(heroImage || DEFAULT_AREA_HERO, prefix || "");
  const heroAttrs = plainHero
    ? 'class="hero hero--subpage hero--plain"'
    : `class="hero hero--subpage" style="--hero-bg: url('${heroBg}')"`;

  return `  <nav class="breadcrumb container breadcrumb--above-hero" aria-label="Breadcrumb">
    <ol>
${crumbs}
    </ol>
  </nav>

  <section ${heroAttrs}>
    <div class="container hero-grid">
      <div>
        <p class="eyebrow">${esc(eyebrow)}</p>
        ${badgesHtml ? `<div class="hero-trust-badges">\n        ${badgesHtml}\n        </div>` : ""}
        <h1 class="display-title">${esc(h1)}</h1>
        <p class="hero-lead">${esc(lead)}</p>
        <ul class="hero-bullets">
${bulletsHtml(bullets)}
        </ul>
        <div class="service-hero-actions">
          <a class="btn btn-primary" href="#offert">${esc(ui?.heroQuote || "Begär Offert Nu")}</a>
          <a class="btn btn-ghost link-phone" href="tel:+46707293986">070 729 39 86</a>
        </div>
      </div>
      <aside id="offert" data-offert-form data-default-service="${esc(formService)}" data-default-city="${esc(formCity)}" data-form-title="${esc(ui?.formTitle || "Få snabb offert")}" data-form-subtitle="${esc(ui?.formSubtitle || "Fyll i formuläret så återkommer vi inom kort.")}"></aside>
    </div>
  </section>`;
}

function serviceCardsHtml(prefix, locale, services) {
  const loc = i18nConfig.locales[locale];
  const cards = locale === "en"
    ? [
        { label: "Clearance", slug: services.find((s) => s.slug.includes("professional"))?.slug, desc: "Apartment, villa & storage" },
        { label: "Junk removal", slug: services.find((s) => s.slug.includes("junk"))?.slug, desc: "Furniture, appliances & bulk waste" },
        { label: "Estate clearance", slug: services.find((s) => s.slug.includes("estate"))?.slug, desc: "Respectful help for families" },
        { label: "Emergency help", slug: services.find((s) => s.slug.includes("emergency"))?.slug, desc: "Same-day urgent service" },
      ]
    : areaServiceCards;
  return cards
    .filter((c) => c.slug)
    .map(
      (c) => `          <a class="service-link-card" href="${prefix}${loc.servicesDir}/${c.slug}.html">
            <h3>${esc(c.label)}</h3>
            <p>${esc(c.desc)}</p>
          </a>`
    )
    .join("\n");
}

function relatedAreasHtml(prefix, areas, areasDir, currentSlug) {
  return areas
    .filter((a) => a.slug !== currentSlug)
    .slice(0, 8)
    .map((a) => `          <a class="area-chip" href="${prefix}${areasDir}/${a.slug}.html">${esc(a.name)}</a>`)
    .join("\n");
}

function faqHtml(faq) {
  return faq
    .map(
      (item) => `          <article class="faq-item">
            <button type="button" aria-expanded="false">${esc(item.q)}</button>
            <div class="faq-panel"><p>${esc(item.a)}</p></div>
          </article>`
    )
    .join("\n");
}

function trustStatsHtml(stats) {
  if (!stats?.length) return "";
  const cards = stats
    .map((s) => `          <article class="trust-stat"><strong>${esc(s.value)}</strong><span>${esc(s.label)}</span></article>`)
    .join("\n");
  return `        <div class="service-trust-stats">\n${cards}\n        </div>\n`;
}

function processHtml(steps) {
  return steps
    .map(
      (step, i) => `          <article class="process-step process-step--timeline">
            <span class="process-step__num">${i + 1}</span>
            <div>
              <h3>${esc(step.title)}</h3>
              <p>${esc(step.text)}</p>
            </div>
          </article>`
    )
    .join("\n");
}

function typesHtml(types, prefix, servicesDir, readMore, imageTracker) {
  return types
    .map((t) => {
      const iconName = resolveTypeIcon(t);
      const link = t.link
        ? `${prefix}${servicesDir}/${t.link}.html`
        : t.href
          ? t.href
          : null;
      const img = imageTracker?.tryUse(t.imageKey);
      if (img) {
        const body = `            <div class="type-tile__body">
              <h3>${esc(t.title)}</h3>
              <p>${esc(t.text)}</p>
              ${t.example ? `<p class="type-tile__example"><em>${esc(t.example)}</em></p>` : ""}
              ${link ? `<span class="type-tile__link">${linkChevronHtml(readMore)}</span>` : ""}
            </div>`;
        const media = `            <div class="type-tile__media">
              <img src="${img.src}" alt="${esc(img.alt)}" loading="lazy" decoding="async" width="400" height="250" />
              <span class="type-tile__letter" aria-hidden="true">${esc(t.letter || "")}</span>
            </div>`;
        const inner = `${media}\n${body}`;
        if (link) {
          return `          <a class="type-tile" href="${link}">\n${inner}\n          </a>`;
        }
        return `          <article class="type-tile type-tile--static">\n${inner}\n          </article>`;
      }
      const inner = `            <span class="type-card__icon" aria-hidden="true">${iconSvg(iconName, 18)}</span>
            <div class="type-card__body">
              <h3>${esc(t.title)}</h3>
              <p>${esc(t.text)}</p>
              ${t.example ? `<p class="type-card__example"><em>${esc(t.example)}</em></p>` : ""}
              ${link ? `<span class="type-card__link">${linkChevronHtml(readMore)}</span>` : ""}
            </div>`;
      if (link) {
        return `          <a class="type-card" href="${link}">\n${inner}\n          </a>`;
      }
      return `          <article class="type-card type-card--static">\n${inner}\n          </article>`;
    })
    .join("\n");
}

function typesGridClass(typesHtmlOutput) {
  return typesHtmlOutput.includes("type-tile__media") ? "type-tile-grid" : "type-card-grid";
}

function situationsHtml(items) {
  return items
    .map(
      (item, i) => `          <article class="situation-card">
            <span class="situation-card__num">${i + 1}</span>
            <h3>${esc(item.title)}</h3>
            <p>${esc(item.text)}</p>
            ${item.example ? `<p class="situation-card__example">${esc(item.example)}</p>` : ""}
          </article>`
    )
    .join("\n");
}

function whyUsHtml(why, ui) {
  const w =
    why ||
    (ui?.locale === "en"
      ? {
          title: "Why choose Alfa Tömning?",
          text: "We are Gothenburg locals who understand Gothenburg. With over 14 years of experience, hundreds of completed clearances and high customer satisfaction, we offer a complete solution from clearance to recycling. We are fully insured and offer 24/7 emergency service when needed.",
          stats: [
            { value: "14+", label: "Years of experience" },
            { value: "2000+", label: "Completed projects" },
            { value: "98%", label: "Recycling rate" },
            { value: "24/7", label: "Emergency readiness" },
          ],
        }
      : DEFAULT_WHY_US);
  const stats = w.stats
    .map((s) => `          <article class="why-stat"><strong>${esc(s.value)}</strong><span>${esc(s.label)}</span></article>`)
    .join("\n");
  return `  <section class="section section--muted">
    <div class="container">
      <div class="section-head section-head--center">
        <p class="section-eyebrow">${esc(ui?.whyEyebrow || "Trygg partner")}</p>
        <h2 class="section-title">${esc(w.title)}</h2>
        <p>${esc(w.text)}</p>
      </div>
      <div class="why-stats-grid">
${stats}
      </div>
    </div>
  </section>`;
}

function casesHtml(cases, prefix, servicesDir, ui, imageTracker) {
  return cases
    .map((c) => {
      const link = c.link ? `${prefix}${servicesDir}/${c.link}.html` : null;
      const img = imageTracker?.tryUse(c.imageKey);
      const media = img
        ? `            <div class="case-card__media">
              <img src="${img.src}" alt="${esc(img.alt)}" loading="lazy" decoding="async" width="400" height="250" />
            </div>`
        : "";
      return `          <article class="case-card${img ? "" : " case-card--text"}">
${media}            <div class="case-card__body">
              <h3>${esc(c.title)}</h3>
              <p><strong>${esc(ui?.challenge || "Utmaning:")}</strong> ${esc(c.challenge || c.before || "")}</p>
              <p><strong>${esc(ui?.solution || "Lösning:")}</strong> ${esc(c.solution || c.after || "")}</p>
              ${c.result ? `<p class="case-card__result">${esc(c.result)}</p>` : ""}
              ${link ? `<a class="case-card__link" href="${link}">${linkChevronHtml(ui?.readMore || "Läs mer")}</a>` : ""}
            </div>
          </article>`;
    })
    .join("\n");
}

function pipelineHtml(steps, ui) {
  const items = (steps || DEFAULT_PIPELINE)
    .map(
      (step, i) => `          <article class="pipeline-step">
            <span class="pipeline-step__num">${i + 1}</span>
            <h3>${esc(step.label)}</h3>
            <p>${esc(step.desc || "")}</p>
          </article>`
    )
    .join("\n");
  return `  <section class="section">
    <div class="container">
      <div class="section-head section-head--center">
        <p class="section-eyebrow">${esc(ui?.pipelineEyebrow || "Hela kedjan")}</p>
        <h2 class="section-title">${esc(ui?.pipelineTitle || "Från tömning till återvinning")}</h2>
        <p>${esc(ui?.pipelineIntro || "En miljövänlig process där inget lämnas åt slumpen – transport och sluthantering ingår.")}</p>
      </div>
      <div class="pipeline-flow">
${items}
      </div>
    </div>
  </section>`;
}

function introSection(s, ui, imageTracker) {
  const paragraphs = s.introParagraphs?.length ? s.introParagraphs : [s.introText];
  const ps = paragraphs.map((p) => `          <p>${esc(p)}</p>`).join("\n");
  const img = s.introImageKey ? imageTracker?.tryUse(s.introImageKey) : null;
  if (img) {
    return `  <section class="section">
    <div class="container split-section">
      <div class="service-content intro-section">
        <p class="section-eyebrow">${esc(ui?.overviewEyebrow || "Översikt")}</p>
        <h2 class="section-title">${esc(s.introTitle)}</h2>
${ps}
      </div>
      <div class="split-section__media">
        <img src="${img.src}" alt="${esc(img.alt)}" loading="lazy" decoding="async" width="600" height="450" />
      </div>
    </div>
  </section>`;
  }
  return `  <section class="section">
    <div class="container intro-section">
      <div class="service-content">
        <p class="section-eyebrow">${esc(ui?.overviewEyebrow || "Översikt")}</p>
        <h2 class="section-title">${esc(s.introTitle)}</h2>
${ps}
      </div>
    </div>
  </section>`;
}

function pricingSection(s, ui, prefix, servicesDir) {
  if (!s.pricing) return "";
  const p = s.pricing;

  if (p.mode === "tiers" && p.tiers?.length) {
    const includes = (p.includes || [])
      .map((item) => checklistItemHtml(item, "circle"))
      .join("\n");
    const links = (p.links || [])
      .map(
        (l) =>
          `          <a href="${prefix}${servicesDir}/${l.slug}.html">${linkChevronHtml(l.label)}</a>`
      )
      .join("\n");
    const tiers = p.tiers
      .map(
        (t) =>
          `          <li class="price-tier-row"><span>${esc(t.label)}</span><strong>${esc(t.price)}</strong></li>`
      )
      .join("\n");
    const headIcon = iconSvg(p.icon || "home", 22);
    return `  <section class="section section--muted">
    <div class="container pricing-tiers">
      <aside class="pricing-tiers__includes">
        <h2>${esc(p.includesTitle || "Vad ingår i priset?")}</h2>
        <ul class="pricing-tiers__checklist">
${includes}
        </ul>
        ${links ? `<div class="pricing-tiers__links">\n${links}\n        </div>` : ""}
      </aside>
      <div class="pricing-tiers__table">
        <div class="pricing-tiers__head">
          <span class="pricing-tiers__head-icon">${headIcon}</span>
          <div>
            <h2>${esc(p.title)}</h2>
            <p>${esc(p.text)}</p>
          </div>
        </div>
        <ul class="price-tier-rows">
${tiers}
        </ul>
      </div>
    </div>
  </section>`;
  }

  const list = (ui?.pricingList || ["Volym (kubikmeter)", "Fordon & arbetstid", "Tipp- och hanteringsavgifter", "Fast pris efter besiktning"])
    .map((item) => checklistItemHtml(item, "inline"))
    .join("\n");
  return `  <section class="section section--muted">
    <div class="container pricing-block">
      <div class="pricing-block__copy">
        <p class="section-eyebrow">${esc(ui?.pricingEyebrow || "Transparent prissättning")}</p>
        <h2 class="section-title">${esc(p.title || ui?.pricingEyebrow || "Transparent prissättning")}</h2>
        <p>${esc(p.text)}</p>
        <a class="btn btn-primary" href="#offert">${esc(p.cta || ui?.heroQuote || "Begär kostnadsfri offert")}</a>
      </div>
      <ul class="pricing-block__list">
${list}
      </ul>
    </div>
  </section>`;
}

function relatedServicesHtml(related, prefix, servicesDir, ui) {
  return related
    .map(
      (r) => `          <a class="related-service-card related-service-card--rich" href="${prefix}${servicesDir}/${r.slug}.html">
            <div>
              <h3>${esc(r.label)}</h3>
              <p>${esc(r.desc || (ui?.locale === "en" ? "Read more about this service" : "Läs mer om tjänsten"))}</p>
            </div>
            <span class="related-service-card__cta">${linkChevronHtml(ui?.readMore || "Läs mer")}</span>
          </a>`
    )
    .join("\n");
}

function servicePage(s, locale, services, areas) {
  const ui = { ...i18nConfig.ui[locale], locale };
  const loc = i18nConfig.locales[locale];
  const navPrefix = "../";
  const assetRoot = locale === "en" ? "../../" : "../";
  const servicesDir = loc.servicesDir;
  const areasDir = loc.areasDir;
  const cityName = locale === "en" ? "Gothenburg" : "Göteborg";
  const svSlug = locale === "sv" ? s.slug : Object.entries(i18nConfig.serviceSlugMap).find(([, en]) => en === s.slug)?.[0] || s.slug;
  const enSlug = locale === "en" ? s.slug : i18nConfig.serviceSlugMap[s.slug] || s.slug;
  const svServicePath = `tjanster/${svSlug}.html`;
  const enServicePath = `en/services/${enSlug}.html`;
  const canonicalPath = locale === "en" ? enServicePath : svServicePath;
  const bullets = s.heroBullets || ui.defaultHeroBullets;
  const heroBadges = s.heroBadges || ui.defaultHeroBadges;
  const schema = servicePageSchema({ name: s.service, description: s.meta }, locale);

  const bodyClass = "";
  const cases = s.cases?.length
    ? s.cases
    : s.caseBefore
      ? [{ title: s.caseTitle || (locale === "en" ? "Project example" : "Projektexempel"), challenge: s.caseBefore, solution: s.caseAfter, result: s.caseResult }]
      : [];
  const related = s.relatedServices || [];
  const showPipeline = s.showPipeline !== false && (s.pipeline || DEFAULT_PIPELINE);
  const homeHref = navPrefix + (locale === "en" ? "index.html" : "index.html");
  const imageTracker = createPageImageTracker(assetRoot, locale);
  const introHtml = introSection(s, ui, imageTracker);
  const typesBlock = typesHtml(s.types, navPrefix, servicesDir, ui.readMore, imageTracker);
  const typesGrid = typesGridClass(typesBlock);
  const casesBlock = cases.length
    ? casesHtml(cases, navPrefix, servicesDir, ui, imageTracker)
    : "";

  return `<!doctype html>
<html lang="${loc.htmlLang}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(normalizeSeoTitle(s.pageTitle))}</title>
  <meta name="description" content="${esc(s.meta)}" />
  <link rel="canonical" href="${i18nConfig.siteUrl}/${canonicalPath.replace(".html", "")}" />
${hreflangTags(svServicePath, enServicePath)}
${faviconHeadHtml(assetRoot)}
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="${assetRoot}css/main.css" />
${formAssets(assetRoot)}
${schemaScript(schema)}
</head>
<body${bodyClass}>
${nav(navPrefix, locale, services, assetRoot)}
<main>
${s.heroVariant === "emergency"
    ? emergencyHeroHtml({
        h1: s.h1,
        h1Accent: s.h1Accent,
        lead: s.lead,
        urgencyBadge: s.urgencyBadge,
        heroBadges: s.heroBadges,
        formService: s.service,
        formCity: cityName,
        breadcrumbItems: [
          { label: ui.home, href: homeHref, homeIcon: true },
          { label: s.breadcrumb },
        ],
        ui,
      })
    : heroWithForm({
        eyebrow: ui.serviceEyebrow,
        h1: s.h1,
        lead: s.lead,
        bullets,
        heroBadges,
        plainHero: true,
        formService: s.service,
        formCity: cityName,
        breadcrumbItems: [
          { label: ui.home, href: homeHref },
          { label: s.breadcrumb },
        ],
        prefix: assetRoot,
        ui,
      })}
${trustStatsHtml(s.trustStats) ? `  <section class="section section--compact"><div class="container">${trustStatsHtml(s.trustStats)}</div></section>` : ""}
${introHtml}

  <section class="section section--muted">
    <div class="container">
      <div class="section-head">
        <p class="section-eyebrow">${esc(ui.servicesEyebrow)}</p>
        <h2 class="section-title">${esc(s.typesTitle)}</h2>
        ${s.typesIntro ? `<p>${esc(s.typesIntro)}</p>` : ""}
      </div>
      <div class="${typesGrid}">
${typesBlock}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head section-head--center">
        <p class="section-eyebrow">${esc(ui.processEyebrow)}</p>
        <h2 class="section-title">${esc(s.processTitle)}</h2>
        ${s.processIntro ? `<p>${esc(s.processIntro)}</p>` : `<p>${esc(ui.processDefaultIntro)}</p>`}
      </div>
      <div class="process-grid process-grid--timeline">
${processHtml(s.process)}
      </div>
    </div>
  </section>
${s.situations?.length ? `  <section class="section section--muted">
    <div class="container">
      <div class="section-head">
        <p class="section-eyebrow">${esc(ui.situationsEyebrow)}</p>
        <h2 class="section-title">${esc(s.situationsTitle || ui.situationsDefaultTitle)}</h2>
        ${s.situationsIntro ? `<p>${esc(s.situationsIntro)}</p>` : ""}
      </div>
      <div class="situations-grid">
${situationsHtml(s.situations)}
      </div>
    </div>
  </section>` : ""}
${pricingSection(s, ui, navPrefix, servicesDir)}
${whyUsHtml(s.whyUs, ui)}
${casesBlock ? `  <section class="section">
    <div class="container">
      <div class="section-head section-head--center">
        <p class="section-eyebrow">${esc(ui.casesEyebrow)}</p>
        <h2 class="section-title">${esc(s.casesTitle || ui.casesDefaultTitle)}</h2>
      </div>
      <div class="case-cards-grid">
${casesBlock}
      </div>
    </div>
  </section>` : ""}
${showPipeline ? pipelineHtml(s.pipeline, ui) : ""}

  <section class="section section--muted">
    <div class="container">
      <div class="section-head">
        <p class="section-eyebrow">${esc(ui.faqEyebrow)}</p>
        <h2 class="section-title">${esc(ui.faqTitle)}</h2>
      </div>
      <div class="faq-list">
${faqHtml(s.faq)}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head">
        <p class="section-eyebrow">${esc(ui.relatedEyebrow)}</p>
        <h2 class="section-title">${esc(ui.relatedTitle)}</h2>
      </div>
      <div class="related-services-grid">
${relatedServicesHtml(related, navPrefix, servicesDir, ui)}
      </div>
    </div>
  </section>

  <section class="section section--muted">
    <div class="container">
      <div class="section-head">
        <p class="section-eyebrow">${esc(ui.areasSectionEyebrow)}</p>
        <h2 class="section-title">${esc(ui.areasTitle)}</h2>
      </div>
      <div class="area-chips">
${relatedAreasHtml(navPrefix, areas, areasDir, null)}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="cta-band cta-band--premium">
        <div>
          <h2 class="display-title" style="font-size:clamp(1.5rem,3vw,2rem)">${esc(ui.ctaReady)}</h2>
          <p>${esc(ui.ctaLead)}</p>
        </div>
        <div class="cta-band__actions">
          <a class="btn btn-primary" href="#offert">${esc(ui.navQuote)}</a>
          <a class="btn btn-ghost link-phone" href="tel:+46707293986">070 729 39 86</a>
        </div>
      </div>
    </div>
  </section>
</main>
${footerHtml(locale)}
${scripts(assetRoot, locale)}
</body>
</html>`;
}

function areaPage(a, locale, services, areas) {
  const ui = { ...i18nConfig.ui[locale], locale };
  const loc = i18nConfig.locales[locale];
  const navPrefix = "../";
  const assetRoot = locale === "en" ? "../../" : "../";
  const areasDir = loc.areasDir;
  const svAreaPath = `omraden/${a.slug}.html`;
  const enAreaPath = `en/areas/${a.slug}.html`;
  const canonicalPath = locale === "en" ? enAreaPath : svAreaPath;
  const heroPreload = resolveImageSrc(a.heroImage || DEFAULT_AREA_HERO, assetRoot);
  const schema = areaPageSchema(a, locale);
  const defaultService = locale === "en" ? "Professional Clearance in Gothenburg" : "Tömning i Göteborg";
  const trustStrip = areaTrustStripItems[locale] || areaTrustStripItems.sv;

  return `<!doctype html>
<html lang="${loc.htmlLang}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(normalizeSeoTitle(a.pageTitle))}</title>
  <meta name="description" content="${esc(a.meta)}" />
  <link rel="canonical" href="${i18nConfig.siteUrl}/${canonicalPath.replace(".html", "")}" />
  <link rel="preload" as="image" href="${heroPreload}" fetchpriority="high" />
${hreflangTags(svAreaPath, enAreaPath)}
${faviconHeadHtml(assetRoot)}
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="${assetRoot}css/main.css" />
${formAssets(assetRoot)}
${schemaScript(schema)}
</head>
<body>
${nav(navPrefix, locale, services, assetRoot)}
<main>
${heroWithForm({
  eyebrow: `${ui.areaEyebrow} · ${a.region}`,
  h1: a.h1,
  lead: a.lead,
  bullets: a.bullets,
  heroImage: a.heroImage || DEFAULT_AREA_HERO,
  formService: defaultService,
  formCity: a.name,
  breadcrumbItems: [
    { label: ui.home, href: navPrefix + "index.html" },
    { label: ui.areasList, href: navPrefix + (locale === "en" ? "areas.html" : "omraden.html") },
    { label: a.name },
  ],
  prefix: assetRoot,
  ui,
})}

  <section class="section">
    <div class="container service-content">
      <h2>${esc(a.introTitle)}</h2>
      <p>${esc(a.introText)}</p>
      <div class="trust-strip-inline trust-strip--icons">
        ${trustStrip.map((t) => trustStripSpanHtml(t)).join("\n        ")}
      </div>
    </div>
  </section>

  <section class="section section--muted">
    <div class="container service-content">
      <h2 class="section-title">${esc(a.localTitle)}</h2>
      <p>${esc(a.localText)}</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <h2 class="section-title">${locale === "en" ? `Our services in ${esc(a.name)}` : `Våra tjänster i ${esc(a.name)}`}</h2>
      <div class="service-cards-row">
${serviceCardsHtml(navPrefix, locale, services)}
      </div>
    </div>
  </section>

  <section class="section section--muted">
    <div class="container">
      <h2 class="section-title">${locale === "en" ? `FAQ about clearance in ${esc(a.name)}` : `Vanliga frågor om tömning i ${esc(a.name)}`}</h2>
      <div class="faq-list">
${faqHtml(a.faq)}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <h2 class="section-title">${locale === "en" ? "Other areas we cover" : "Andra områden vi täcker"}</h2>
      <div class="area-chips">
${relatedAreasHtml(navPrefix, areas, areasDir, a.slug)}
      </div>
      <p class="section-footnote" style="margin-top:1rem;color:var(--muted);font-size:0.92rem"><a href="${navPrefix}${locale === "en" ? "areas.html" : "omraden.html"}">${locale === "en" ? "See all areas" : "Se alla områden"}</a> · <a href="${navPrefix}${locale === "en" ? "quote.html" : "offert.html"}">${esc(ui.footerQuote)}</a></p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="cta-band">
        <div>
          <h2>${locale === "en" ? `Need help in ${esc(a.name)}?` : `Behöver du hjälp i ${esc(a.name)}?`}</h2>
          <p>${locale === "en" ? "Use the quote form above – we will respond with a fixed price shortly." : "Fyll i offertformuläret ovan – vi återkommer med fast pris inom kort."}</p>
        </div>
        <div class="cta-band__actions">
          <a class="btn btn-primary" href="#offert">${esc(ui.navQuote)}</a>
          <a class="btn btn-ghost" href="tel:+46707293986">070 729 39 86</a>
        </div>
      </div>
    </div>
  </section>
</main>
${footerHtml(locale)}
${scripts(assetRoot, locale)}
</body>
</html>`;
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

for (const s of dataSv.services) {
  fs.writeFileSync(path.join(root, "tjanster", `${s.slug}.html`), servicePage(s, "sv", dataSv.services, areasSv), "utf8");
}

for (const a of areasSv) {
  fs.writeFileSync(path.join(root, "omraden", `${a.slug}.html`), areaPage(a, "sv", dataSv.services, areasSv), "utf8");
}

ensureDir(path.join(root, "en", "services"));
ensureDir(path.join(root, "en", "areas"));

for (const s of dataEn.services) {
  fs.writeFileSync(path.join(root, "en", "services", `${s.slug}.html`), servicePage(s, "en", dataEn.services, areasEn), "utf8");
}

for (const a of areasEn) {
  fs.writeFileSync(path.join(root, "en", "areas", `${a.slug}.html`), areaPage(a, "en", dataEn.services, areasEn), "utf8");
}

fs.writeFileSync(path.join(root, "js", "i18n-routes.json"), JSON.stringify(routeMap, null, 2) + "\n", "utf8");

console.log("Generated service and area pages with UTF-8");
