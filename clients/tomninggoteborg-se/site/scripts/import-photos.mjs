import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { buildServiceImages } from "./image-assets.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir =
  process.env.PHOTO_SRC_DIR ||
  path.join(
    process.env.USERPROFILE || "",
    ".cursor",
    "projects",
    "c-Users-User-Desktop-Cursor",
    "assets"
  );
const outDir = path.join(__dirname, "..", "assets", "images");

const PHOTOS = [
  {
    out: "foto-lagenhet-bortforsling.jpg",
    match: "IMG_9910",
    alt:
      "Lägenhetstömning i Göteborg – bortforsling av soffa och madrass framför flerfamiljshus",
  },
  {
    out: "foto-kontor.jpg",
    match: "IMG_9332",
    alt: "Kontorstömning i Göteborg – rensning av kontorsmöbler och arkiv",
  },
  {
    out: "foto-transport-lada.jpg",
    match: "IMG_9380",
    alt: "Transport vid bortforsling i Göteborg – packade flyttlådor i lastbil",
  },
  {
    out: "foto-tradgard-villa.jpg",
    match: "IMG_9524",
    alt: "Villatömning i Göteborg – radhusområde med trädgård och gräsmatta",
  },
  {
    out: "foto-transport-lastbil.jpg",
    match: "IMG_9376",
    alt: "Professionell bortforsling i Göteborg – lastbil packad med bohag",
  },
  {
    out: "foto-tradgard-avfall.jpg",
    match: "IMG_9523",
    alt: "Grovsopor och trädgårdsavfall i Göteborg – virke och bråte på gräsmattan",
  },
  {
    out: "foto-vind-tom.jpg",
    match: "IMG_9381",
    alt: "Vindstömning i Göteborg – tom och rengjord vind efter tömning",
  },
];

function findSource(match) {
  const files = fs.readdirSync(srcDir);
  const hit = files.find((f) => f.includes(match));
  if (!hit) throw new Error(`Source not found for ${match} in ${srcDir}`);
  return path.join(srcDir, hit);
}

async function convert(src, dest) {
  try {
    const sharp = (await import("sharp")).default;
    await sharp(src)
      .rotate()
      .resize({ width: 1400, withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(dest);
    return "sharp";
  } catch {
    fs.copyFileSync(src, dest.replace(/\.jpg$/, ".png"));
    return "copy-png";
  }
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });
  for (const photo of PHOTOS) {
    const src = findSource(photo.match);
    const dest = path.join(outDir, photo.out);
    const mode = await convert(src, dest);
    const finalPath = fs.existsSync(dest) ? dest : dest.replace(/\.jpg$/, ".png");
    console.log(`${photo.out} ← ${path.basename(src)} (${mode}, ${fs.statSync(finalPath).size} bytes)`);
  }
  fs.writeFileSync(
    path.join(__dirname, "service-images.json"),
    `${JSON.stringify(buildServiceImages(), null, 2)}\n`
  );
  console.log("Updated service-images.json");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
