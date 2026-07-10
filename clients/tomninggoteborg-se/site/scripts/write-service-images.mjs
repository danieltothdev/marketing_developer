import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { buildServiceImages } from "./image-assets.mjs";

const out = path.join(path.dirname(fileURLToPath(import.meta.url)), "service-images.json");
fs.writeFileSync(out, JSON.stringify(buildServiceImages(), null, 2) + "\n", "utf8");
console.log("Wrote service-images.json with local paths");
