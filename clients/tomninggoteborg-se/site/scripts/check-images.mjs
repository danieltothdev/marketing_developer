import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const dirs = ["", "tjanster", "omraden", "en", "en/services", "en/areas"];
const imageRefs = new Set();
let emptyContentAlt = 0;
let unsplash = 0;

for (const dir of dirs) {
  const full = path.join(root, dir);
  if (!fs.existsSync(full)) continue;
  for (const file of fs.readdirSync(full)) {
    if (!file.endsWith(".html")) continue;
    const html = fs.readFileSync(path.join(full, file), "utf8");
    if (/unsplash\.com/.test(html)) unsplash++;
    for (const m of html.matchAll(/<img[^>]+>/g)) {
      const tag = m[0];
      if (/service-card__media|intro-section/.test(html) === false && /alt=""/.test(tag) && /favicon/.test(tag)) continue;
      if (/alt=""/.test(tag) && !/favicon/.test(tag)) emptyContentAlt++;
    }
    for (const m of html.matchAll(/(?:src|href)=["'](assets\/images\/[^"']+)["']/g)) {
      imageRefs.add(m[1]);
    }
    for (const m of html.matchAll(/(?:src|href)=["'](\.\.\/)+assets\/images\/[^"']+["']/g)) {
      const rel = m[0].match(/assets\/images\/[^"']+/)[0];
      imageRefs.add(rel);
    }
  }
}

let missing = 0;
for (const ref of imageRefs) {
  const file = path.join(root, ref.replace(/\//g, path.sep));
  if (!fs.existsSync(file)) {
    console.log("MISSING", ref);
    missing++;
  }
}

console.log(`Local image refs: ${imageRefs.size}, missing: ${missing}`);
console.log(`Pages with unsplash: ${unsplash}`);
console.log(`Content images with empty alt: ${emptyContentAlt}`);
process.exit(missing || unsplash || emptyContentAlt ? 1 : 0);
