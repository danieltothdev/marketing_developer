/** Local image paths + SEO/accessibility alt text (sv / en). */

export const PHOTO_FILES = {
  "foto-lagenhet": "foto-lagenhet-bortforsling.jpg",
  "foto-kontor": "foto-kontor.jpg",
  "foto-transport-lada": "foto-transport-lada.jpg",
  "foto-tradgard": "foto-tradgard-villa.jpg",
  "foto-transport-lastbil": "foto-transport-lastbil.jpg",
  "foto-tradgard-avfall": "foto-tradgard-avfall.jpg",
  "foto-vind": "foto-vind-tom.jpg",
};

export const IMAGE_ALTS = {
  sv: {
    tomning: "Professionell tömning i Göteborg – packad lastbil med bohag för bortforsling",
    bortforsling: "Bortforsling i Göteborg – bortforsling av soffa och möbler framför lägenhetshus",
    transport: "Transport vid bortforsling i Göteborg – flyttlådor i lastbil",
    dodsbo: "Dödsbotömning i Göteborg – varsam bortforsling av bohag i lastbil",
    lagenhet: "Lägenhetstömning i Göteborg – bortforsling av soffa och madrass",
    forrad: "Förrådstömning i Göteborg – tom vind efter professionell tömning",
    akut: "Akut tömning i Göteborg – snabb transport och hämtning samma dag",
    grovsopor: "Grovsopor i Göteborg – trädgårdsavfall och virke på gräsmattan",
    villa: "Villatömning i Göteborg – radhusområde med trädgård och gräsmatta",
    radhus: "Radhustömning i Göteborg – radhusområde med trädgård",
    garage: "Garagetömning i Göteborg – trädgårdsavfall och virke vid bortforsling",
    kallare: "Källartömning i Göteborg – rensning av källare och förråd",
    vind: "Vindstömning i Göteborg – tom och rengjord vind efter tömning",
    sortering: "Sortering och återvinning vid tömning i Göteborg",
    aterbruk: "Återbruk och återvinning av bohag i Göteborgsregionen",
    brf: "Kontorstömning och fastighetsröjning för BRF i Göteborg",
    flytt: "Tömning inför flytt i Göteborg – lägenhet och möbler",
    dokument: "Kontorstömning i Göteborg – rensning av kontorsmöbler",
    elektronik: "Elektronikåtervinning vid bortforsling i Göteborg",
    vitvaror: "Bortforsling av vitvaror i Göteborg",
    mobler: "Bortforsling av möbler i Göteborg – soffa och madrass",
    kontor: "Kontorstömning i Göteborg – rensning av kontorsmöbler och arkiv",
    foretag: "Företagstömning i Göteborg – tömning av kontor och lager",
    "goteborg-hero": "Tömning och bortforsling i Göteborg – professionell lastbil med bohag",
    centrum: "Tömning i Göteborg centrum – lägenhet och bortforsling",
    majorna: "Tömning i Majorna-Linné – lokal tömning och bortforsling",
    linne: "Akut tömning i Linné – utrymning av företagslokal och kontorsmöbler",
    "foto-lagenhet":
      "Lägenhetstömning i Göteborg – bortforsling av soffa och madrass framför flerfamiljshus",
    "foto-kontor": "Kontorstömning i Göteborg – rensning av kontorsmöbler och arkiv",
    "foto-transport-lada": "Transport vid bortforsling i Göteborg – packade flyttlådor i lastbil",
    "foto-tradgard": "Villatömning i Göteborg – radhusområde med trädgård och gräsmatta",
    "foto-transport-lastbil": "Professionell bortforsling i Göteborg – lastbil packad med bohag",
    "foto-tradgard-avfall":
      "Grovsopor och trädgårdsavfall i Göteborg – virke och bråte på gräsmattan",
    "foto-vind": "Vindstömning i Göteborg – tom och rengjord vind efter tömning",
  },
  en: {
    tomning: "Professional house clearance in Gothenburg – loaded removal van with household items",
    bortforsling: "Junk removal in Gothenburg – sofa and furniture removal at apartment buildings",
    transport: "Junk removal transport in Gothenburg – moving boxes in the van",
    dodsbo: "Estate clearance in Gothenburg – respectful removal of household goods",
    lagenhet: "Apartment clearance in Gothenburg – sofa and mattress removal",
    forrad: "Storage clearance in Gothenburg – empty attic after professional clearance",
    akut: "Emergency clearance in Gothenburg – fast same-day collection and transport",
    grovsopor: "Bulk waste in Gothenburg – garden waste and timber on the lawn",
    villa: "Villa clearance in Gothenburg – townhouse area with garden and lawn",
    radhus: "Townhouse clearance in Gothenburg – residential area with garden",
    garage: "Garage clearance in Gothenburg – garden waste and timber for removal",
    kallare: "Basement clearance in Gothenburg",
    vind: "Attic clearance in Gothenburg – empty attic after clearance",
    sortering: "Sorting and recycling during clearance in Gothenburg",
    aterbruk: "Reuse and recycling of household items in the Gothenburg region",
    brf: "Office and property clearance for housing associations in Gothenburg",
    flytt: "Pre-move clearance in Gothenburg – apartments and furniture",
    dokument: "Office clearance in Gothenburg – removal of office furniture",
    elektronik: "Electronics recycling during junk removal in Gothenburg",
    vitvaror: "Appliance removal in Gothenburg",
    mobler: "Furniture removal in Gothenburg – sofa and mattress",
    kontor: "Office clearance in Gothenburg – desks, chairs and archive removal",
    foretag: "Business clearance in Gothenburg – offices and warehouses",
    "goteborg-hero": "House clearance and junk removal in Gothenburg – professional loaded van",
    centrum: "House clearance in central Gothenburg",
    majorna: "House clearance in Majorna-Linné, Gothenburg",
    linne: "Emergency office clearance in Linné, Gothenburg – business premises emptied urgently",
    "foto-lagenhet":
      "Apartment clearance in Gothenburg – sofa and mattress removal at apartment buildings",
    "foto-kontor": "Office clearance in Gothenburg – clearing desks, chairs and archive",
    "foto-transport-lada": "Transport during junk removal in Gothenburg – packed moving boxes in van",
    "foto-tradgard": "Villa clearance in Gothenburg – townhouse area with garden and lawn",
    "foto-transport-lastbil": "Professional junk removal in Gothenburg – van loaded with household goods",
    "foto-tradgard-avfall": "Bulk and garden waste in Gothenburg – timber pile on the lawn",
    "foto-vind": "Attic clearance in Gothenburg – empty attic after professional clearance",
  },
};

const FILE_BY_KEY = {
  ...PHOTO_FILES,
  tomning: PHOTO_FILES["foto-transport-lastbil"],
  bortforsling: PHOTO_FILES["foto-lagenhet"],
  dodsbo: PHOTO_FILES["foto-transport-lastbil"],
  lagenhet: PHOTO_FILES["foto-lagenhet"],
  forrad: PHOTO_FILES["foto-vind"],
  akut: PHOTO_FILES["foto-transport-lada"],
  grovsopor: PHOTO_FILES["foto-tradgard-avfall"],
  villa: PHOTO_FILES["foto-tradgard"],
  radhus: PHOTO_FILES["foto-tradgard"],
  garage: PHOTO_FILES["foto-tradgard-avfall"],
  kallare: PHOTO_FILES["foto-vind"],
  vind: PHOTO_FILES["foto-vind"],
  transport: PHOTO_FILES["foto-transport-lada"],
  sortering: "sortering.jpg",
  aterbruk: "aterbruk.jpg",
  brf: PHOTO_FILES["foto-kontor"],
  flytt: PHOTO_FILES["foto-lagenhet"],
  dokument: PHOTO_FILES["foto-kontor"],
  elektronik: "elektronik.jpg",
  vitvaror: "vitvaror.jpg",
  mobler: PHOTO_FILES["foto-lagenhet"],
  kontor: PHOTO_FILES["foto-kontor"],
  foretag: PHOTO_FILES["foto-kontor"],
  "goteborg-hero": PHOTO_FILES["foto-transport-lastbil"],
  centrum: PHOTO_FILES["foto-lagenhet"],
  majorna: PHOTO_FILES["foto-lagenhet"],
  vasastan: PHOTO_FILES["foto-lagenhet"],
  hisingen: PHOTO_FILES["foto-vind"],
  linne: PHOTO_FILES["foto-kontor"],
};

export function imageFileForKey(imageKey) {
  return FILE_BY_KEY[imageKey] || FILE_BY_KEY.tomning;
}

export function imageAlt(imageKey, locale = "sv") {
  const key = imageKey?.replace(/\.jpg$/, "") || "tomning";
  return IMAGE_ALTS[locale]?.[key] || IMAGE_ALTS.sv[key] || IMAGE_ALTS.sv.tomning;
}

/** Resolve site-relative image path with optional depth prefix (../). */
export function resolveImageSrc(value, assetRoot = "") {
  if (!value) return `${assetRoot}assets/images/${PHOTO_FILES["foto-transport-lastbil"]}`;
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  if (value.startsWith("assets/")) return `${assetRoot}${value}`;
  const file = value.includes(".") ? value : imageFileForKey(value);
  return `${assetRoot}assets/images/${file}`;
}

export function buildServiceImages() {
  const keys = new Set([...Object.keys(FILE_BY_KEY), ...Object.keys(PHOTO_FILES)]);
  const mapSection = () => {
    const out = {};
    for (const key of keys) {
      out[key] = `assets/images/${imageFileForKey(key)}`;
    }
    return out;
  };
  const section = mapSection();
  return {
    hero: { ...section },
    types: { ...section },
    intro: { ...section },
    cases: {
      vasastan: section.lagenhet,
      hisingen: section.hisingen,
      linne: section.linne,
    },
    fallback: section.tomning,
  };
}
