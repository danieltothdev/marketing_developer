/** Inline SVG icons for service/type cards (20×20, stroke). */

import { resolveImageSrc, imageAlt } from "./image-assets.mjs";

function esc(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

const paths = {
  bolt: '<path d="M13 2L4 12h6l-1 8 9-10h-6l1-8z" fill="currentColor" stroke="none"/>',
  clock: '<circle cx="10" cy="10" r="7.5"/><path d="M10 6v4.5l3 2"/>',
  calendar:
    '<rect x="3" y="5" width="14" height="12" rx="2"/><path d="M7 3v4M13 3v4M3 9h14"/>',
  home: '<path d="M3 10.5L10 4l7 6.5V17a1 1 0 01-1 1h-4v-5H8v5H4a1 1 0 01-1-1v-6.5z"/>',
  building:
    '<rect x="4" y="3" width="12" height="15" rx="1"/><path d="M8 7h1M11 7h1M8 10h1M11 10h1M8 13h1M11 13h1"/>',
  box: '<path d="M3 7l7-4 7 4v10l-7 4-7-4V7z"/><path d="M10 11v10M3 7l7 4 7-4"/>',
  truck:
    '<path d="M2 13h1.5a2.5 2.5 0 004.5 0H13a2.5 2.5 0 004.5 0H19"/><path d="M2 13V7h9v6"/><path d="M11 7l3-2h3v8h-1"/>',
  heart:
    '<path d="M10 17s-6-3.6-6-8a3.5 3.5 0 016-2 3.5 3.5 0 016 2c0 4.4-6 8-6 8z"/>',
  droplet: '<path d="M10 3s5 5.5 5 9a5 5 0 01-10 0c0-3.5 5-9 5-9z"/>',
  recycle:
    '<path d="M7 4l-2 3h3l1-4M13 4l2 3h-3l-1-4M6 14l-1 3h4l1-3M14 14l1 3h-4l-1-3"/><path d="M10 8v3"/>',
  shield:
    '<path d="M10 2l6 2v5c0 4.5-3 7.5-6 9-3-1.5-6-4.5-6-9V4l6-2z"/>',
  users: '<circle cx="7" cy="8" r="2.5"/><circle cx="14" cy="9" r="2"/><path d="M3 17c0-2.2 1.8-4 4-4M13 17c0-1.8 1.5-3.2 3.5-3.5"/>',
  briefcase: '<rect x="3" y="7" width="14" height="10" rx="1"/><path d="M8 7V5a2 2 0 012-2h0a2 2 0 012 2v2"/>',
  garage:
    '<path d="M3 10l7-6 7 6"/><rect x="4" y="10" width="12" height="8" rx="1"/><path d="M8 14h4"/>',
  attic: '<path d="M3 12l7-7 7 7"/><rect x="5" y="12" width="10" height="6"/>',
  phone:
    '<path d="M6.5 4.5c.5 2.5 1.8 4.8 3.7 6.7s4.2 3.2 6.7 3.7l1.8-1.8c.3-.3.8-.4 1.2-.2 1 .4 2.1.7 3.2.7.7 0 1.2.5 1.2 1.2V18c0 .7-.5 1.2-1.2 1.2C9.6 19.2 4.8 14.4 4.8 7.2 4.8 6.5 5.3 6 6 6h1.3c.7 0 1.2.5 1.2 1.2 0 1.1.3 2.2.7 3.2.1.4 0 .9-.2 1.2l-1.5 1.1z"/>',
  menu: '<path d="M4 6h12M4 10h12M4 14h12"/>',
  chevronLeft: '<path d="M12 5l-6 6 6 6"/>',
  chevronRight: '<path d="M8 5l6 6-6 6"/>',
  leaf: '<path d="M10 3s-4 3.5-4 7.5a4 4 0 008 0C14 6.5 10 3 10 3z"/><path d="M10 10.5V17"/>',
  coin: '<circle cx="10" cy="10" r="6"/><path d="M10 7.5v5M8 10h4"/>',
  star: '<path d="M10 2.2l2.1 5.4h5.6l-4.5 3.5 1.7 5.5L10 14l-4.9 3.6 1.7-5.5-4.5-3.5h5.6L10 2.2z" fill="currentColor" stroke="none"/>',
  check: '<path d="M5 10l3 3 7-7"/>',
};

const filledIcons = new Set(["bolt", "phone", "star"]);

const imageKeyToIcon = {
  akut: "bolt",
  kallare: "droplet",
  dodsbo: "heart",
  lagenhet: "building",
  villa: "home",
  radhus: "home",
  forrad: "box",
  garage: "garage",
  vind: "attic",
  transport: "truck",
  bortforsling: "truck",
  sortering: "recycle",
  brf: "users",
  grovsopor: "box",
  flytt: "truck",
  mobler: "box",
  vitvaror: "box",
  elektronik: "box",
  dokument: "briefcase",
  tomning: "home",
  aterbruk: "recycle",
};

export function iconSvg(name, size = 20) {
  const key = paths[name] ? name : "home";
  const inner = paths[key];
  const fill = filledIcons.has(key) ? ' fill="currentColor"' : ' fill="none"';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 20 20"${fill} stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
}

export function iconBadgeHtml(name, size = 22) {
  return `<div class="icon-badge">${iconSvg(name, size)}</div>`;
}

export function navToggleIcon() {
  return iconSvg("menu", 20);
}

export function chevronIcon(direction, size = 18) {
  return iconSvg(direction === "left" ? "chevronLeft" : "chevronRight", size);
}

export function stripArrowSuffix(label) {
  return String(label)
    .replace(/\s*[→←]\s*$/u, "")
    .trim();
}

export function linkChevronHtml(label, direction = "right", size = 14) {
  const text = stripArrowSuffix(label);
  const icon = chevronIcon(direction, size);
  if (direction === "left") {
    return `<span class="link-chevron">${icon}<span>${esc(text)}</span></span>`;
  }
  return `<span class="link-chevron"><span>${esc(text)}</span>${icon}</span>`;
}

export function backLinkHtml(href, label, size = 14) {
  const text = stripArrowSuffix(label);
  return `<a class="link-chevron link-chevron--back" href="${href}">${chevronIcon("left", size)}<span>${esc(text)}</span></a>`;
}

export function checklistItemHtml(text, variant = "bullet") {
  const size = variant === "circle" ? 12 : 14;
  return `<li><span class="list-check list-check--${variant}">${iconSvg("check", size)}</span><span>${esc(text)}</span></li>`;
}

export function trustStripSpanHtml(item) {
  if (typeof item === "string") {
    return `<span>${esc(item)}</span>`;
  }
  const icon = item.icon ? iconSvg(item.icon, 14) : "";
  return `<span>${icon} ${esc(item.label)}</span>`;
}

export const areaTrustStripItems = {
  sv: [
    { icon: "coin", label: "Fast pris" },
    { icon: "clock", label: "Snabb offert" },
    { icon: "recycle", label: "Miljövänlig återvinning" },
    { icon: "shield", label: "Försäkrad service" },
  ],
  en: [
    { icon: "coin", label: "Fixed price" },
    { icon: "clock", label: "Fast quote" },
    { icon: "recycle", label: "Eco-friendly recycling" },
    { icon: "shield", label: "Insured service" },
  ],
};

export function reviewStarsHtml(count = 5) {
  const stars = Array.from({ length: count }, () => iconSvg("star", 16)).join("");
  return `<span class="review-stars" aria-label="${count} av 5">${stars}</span>`;
}

export function resolveTypeIcon(type) {
  if (type.icon && paths[type.icon]) return type.icon;
  if (type.imageKey && imageKeyToIcon[type.imageKey]) return imageKeyToIcon[type.imageKey];
  const letter = (type.letter || "A").toLowerCase();
  const fallback = { a: "home", b: "box", c: "heart", d: "building" };
  return fallback[letter] || "home";
}

export const homeServiceCards = {
  sv: [
    {
      slug: "dodsbotomning-i-goteborg",
      title: "Dödsbotömning",
      text: "Vi hjälper er med en respektfull och professionell tömning av dödsbon. Vi sköter allt från sortering och bortforsling till slutstädning med stor omsorg.",
      imageKey: "dodsbo",
      icon: "heart",
    },
    {
      slug: "lagenhetstomning-i-goteborg",
      title: "Lägenhetstömning",
      text: "Ska du flytta till mindre eller tömma en hyresrätt? Vi tömmer lägenheter snabbt och effektivt, oavsett våningsplan eller hiss-tillgång i hela Göteborg.",
      imageKey: "lagenhet",
      icon: "building",
    },
    {
      slug: "forradstomning-i-goteborg",
      title: "Förrådstömning",
      text: "Har förrådet eller källaren blivit full av gamla saker? Vi hjälper dig att rensa ut och forsla bort allt skräp till återvinningen så du får ordning igen.",
      imageKey: "forrad",
      icon: "box",
    },
    {
      slug: "bortforsling-i-goteborg",
      title: "Bortforsling",
      text: "Behöver du bli av med enstaka möbler, vitvaror eller grovsopor? Vi erbjuder snabb hämtning och bortforsling till fasta priser med kort varsel.",
      imageKey: "transport",
      icon: "truck",
    },
  ],
  en: [
    {
      slug: "estate-clearance-gothenburg",
      title: "Estate Clearance",
      text: "Respectful, professional estate clearance. We handle sorting, removal and optional final cleaning with care.",
      imageKey: "dodsbo",
      icon: "heart",
    },
    {
      slug: "apartment-clearance-gothenburg",
      title: "Apartment Clearance",
      text: "Moving or downsizing? We clear apartments quickly and efficiently across Gothenburg, any floor level.",
      imageKey: "lagenhet",
      icon: "building",
    },
    {
      slug: "storage-clearance-gothenburg",
      title: "Storage Clearance",
      text: "Full basement, attic or lock-up? We clear it out and transport everything for eco-friendly recycling.",
      imageKey: "forrad",
      icon: "box",
    },
    {
      slug: "junk-removal-gothenburg",
      title: "Junk Removal",
      text: "Single furniture items, appliances or bulky waste – fast collection at fixed prices with short notice.",
      imageKey: "transport",
      icon: "truck",
    },
  ],
};

export function cardImageUrl(imageKey, serviceImages, assetRoot = "") {
  const raw =
    serviceImages.types?.[imageKey] ||
    serviceImages.hero?.[imageKey] ||
    serviceImages.fallback;
  return resolveImageSrc(raw, assetRoot);
}

export function visualServiceCardHtml(card, opts = {}) {
  const {
    servicesDir = "tjanster",
    prefix = "",
    assetRoot = prefix,
    locale = "sv",
    quoteLabel = "Få Offert",
    readMoreLabel = "Läs mer",
    images,
  } = opts;
  const img = cardImageUrl(card.imageKey, images, assetRoot);
  const alt = esc(card.imageAlt || imageAlt(card.imageKey, locale));
  return `          <article class="service-card service-card--visual">
            <div class="service-card__media">
              <img src="${img}" alt="${alt}" loading="lazy" decoding="async" width="400" height="250" />
              <span class="service-card__icon">${iconSvg(card.icon, 20)}</span>
            </div>
            <h3>${card.title}</h3>
            <p>${card.text}</p>
            <div class="card-actions">
              <a class="btn btn-primary" href="#offert">${quoteLabel}</a>
              <a class="btn btn-ghost" href="${prefix}${servicesDir}/${card.slug}.html">${readMoreLabel}</a>
            </div>
          </article>`;
}
