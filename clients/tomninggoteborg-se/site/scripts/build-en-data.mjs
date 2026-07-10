import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { EN_PATCHES } from "./en-content-patches.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const slugMap = JSON.parse(fs.readFileSync(path.join(__dirname, "i18n-config.json"), "utf8")).serviceSlugMap;
const svDataRaw = JSON.parse(fs.readFileSync(path.join(__dirname, "pages-data.json"), "utf8"));
const extraServices = JSON.parse(fs.readFileSync(path.join(__dirname, "extra-services.json"), "utf8"));

function mergeServices(base) {
  const map = new Map(base.map((s) => [s.slug, s]));
  for (const s of extraServices) map.set(s.slug, s);
  return [...map.values()];
}

const svData = { ...svDataRaw, services: mergeServices(svDataRaw.services) };
const svAreas = JSON.parse(fs.readFileSync(path.join(__dirname, "areas-content.json"), "utf8"));

function remapSlug(value) {
  return slugMap[value] || value;
}

function remapLinks(obj) {
  if (Array.isArray(obj)) return obj.map(remapLinks);
  if (!obj || typeof obj !== "object") return obj;
  const out = {};
  for (const [key, value] of Object.entries(obj)) {
    if (key === "slug" && typeof value === "string") out[key] = remapSlug(value);
    else if (key === "link" && typeof value === "string") out[key] = remapSlug(value);
    else if (key === "liveSlug") continue;
    else out[key] = remapLinks(value);
  }
  return out;
}

function areaEn(a) {
  const n = a.name;
  return {
    ...a,
    pageTitle: `Clearance ${n} – Junk & Estate | Alfa Tömning`,
    meta: `Professional house clearance, junk removal and estate clearance in ${n}. Fixed price, free quote and eco-friendly recycling in the Gothenburg region.`,
    h1: `House clearance ${n} – professional help with estates and junk removal`,
    lead: `Need house clearance, apartment clear-out or junk removal in ${n}? We help homeowners and housing associations with fixed pricing and short response times across the Gothenburg region.`,
    bullets: [
      "Free quote within 1–5 minutes",
      "Clearance, estate & storage services",
      "Eco-friendly recycling",
      "Emergency service when needed",
    ],
    introTitle: `Professional house clearance in ${n}`,
    introText: `We provide house clearance in ${n} with experienced teams who know local properties and logistics. Whether you need apartment clearance before a move, storage clear-out or furniture removal, you get a clear quote before we start.`,
    localTitle: `Services we provide in ${n}`,
    localText: `Searches such as house clearance ${n}, junk removal ${n} and estate clearance ${n} often lead to Alfa Tömning – we cover the area with fast response from Gothenburg.`,
    faq: [
      {
        q: `How much does house clearance cost in ${n}?`,
        a: "The price depends on volume and job type. You always receive a fixed quote with no hidden fees before work begins.",
      },
      {
        q: `How quickly can you come to ${n}?`,
        a: "We often book within a few days and offer emergency clearance for urgent situations.",
      },
      {
        q: `Do you handle estate clearance in ${n}?`,
        a: "Yes, we provide respectful estate clearance with discretion for families and executors throughout the area.",
      },
    ],
  };
}

function deepMerge(target, source) {
  if (Array.isArray(source)) return source.map((item) => (typeof item === "object" ? deepMerge({}, item) : item));
  if (!source || typeof source !== "object") return source;
  const out = { ...target };
  for (const [key, value] of Object.entries(source)) {
    if (value && typeof value === "object" && !Array.isArray(value) && target[key] && typeof target[key] === "object") {
      out[key] = deepMerge(target[key], value);
    } else {
      out[key] = value;
    }
  }
  return out;
}

const enServices = svData.services.map((svc) => {
  const base = remapLinks(JSON.parse(JSON.stringify(svc)));
  const patch = EN_PATCHES[svc.slug];
  if (!patch) throw new Error(`Missing EN patch for ${svc.slug}`);
  return deepMerge(base, patch);
});

fs.writeFileSync(path.join(__dirname, "pages-data-en.json"), JSON.stringify({ services: enServices }, null, 2), "utf8");
fs.writeFileSync(path.join(__dirname, "areas-content-en.json"), JSON.stringify(svAreas.map(areaEn), null, 2), "utf8");

function writeServicesDataJs(services, locale) {
  const navOrder = JSON.parse(fs.readFileSync(path.join(__dirname, "i18n-config.json"), "utf8")).serviceNav[
    locale === "en" ? "en" : "sv"
  ];
  const orderedSlugs = navOrder.groups.flatMap((g) => g.items.map((i) => i.slug));
  const sorted = orderedSlugs
    .map((svSlug) => {
      const slug = locale === "en" ? slugMap[svSlug] || svSlug : svSlug;
      const svc = services.find((s) => s.slug === slug);
      return svc ? { value: svc.service, slug: svc.slug } : null;
    })
    .filter(Boolean);
  sorted.push({ value: locale === "en" ? "Other" : "Annat", slug: "" });
  const file = locale === "en" ? "services-data-en.js" : "services-data.js";
  fs.writeFileSync(path.join(root, "js", file), `window.SERVICE_OPTIONS = ${JSON.stringify(sorted, null, 2)};\n`, "utf8");
}

writeServicesDataJs(svData.services, "sv");
writeServicesDataJs(enServices, "en");

console.log("Built pages-data-en.json, areas-content-en.json and services-data JS files");
