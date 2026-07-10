import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "assets", "images");

const FILES = [
  {
    name: "goteborg-hero.jpg",
    url: "https://images.unsplash.com/photo-1642764732251-9dacf60eb423?w=1400&q=80&auto=format&fit=crop",
  },
  {
    name: "bortforsling.jpg",
    url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80&auto=format&fit=crop",
  },
  {
    name: "dodsbo.jpg",
    url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80&auto=format&fit=crop",
  },
  {
    name: "lagenhet.jpg",
    url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80&auto=format&fit=crop",
  },
  {
    name: "forrad.jpg",
    url: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&q=80&auto=format&fit=crop",
  },
  {
    name: "akut.jpg",
    url: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80&auto=format&fit=crop",
  },
  {
    name: "grovsopor.jpg",
    url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80&auto=format&fit=crop",
  },
  {
    name: "villa.jpg",
    url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80&auto=format&fit=crop",
  },
  {
    name: "radhus.jpg",
    url: "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=1200&q=80&auto=format&fit=crop",
  },
  {
    name: "garage.jpg",
    url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80&auto=format&fit=crop",
  },
  {
    name: "sortering.jpg",
    url: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=80&auto=format&fit=crop",
  },
  {
    name: "aterbruk.jpg",
    url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80&auto=format&fit=crop",
  },
  {
    name: "brf.jpg",
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80&auto=format&fit=crop",
  },
  {
    name: "dokument.jpg",
    url: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80&auto=format&fit=crop",
  },
  {
    name: "elektronik.jpg",
    url: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&q=80&auto=format&fit=crop",
  },
  {
    name: "vitvaror.jpg",
    url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1200&q=80&auto=format&fit=crop",
  },
  {
    name: "centrum.jpg",
    url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1400&q=80&auto=format&fit=crop",
  },
  {
    name: "majorna.jpg",
    url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=80&auto=format&fit=crop",
  },
];

fs.mkdirSync(outDir, { recursive: true });

let ok = 0;
let skipped = 0;

for (const { name, url } of FILES) {
  const dest = path.join(outDir, name);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 10_000) {
    skipped++;
    continue;
  }
  const res = await fetch(url);
  if (!res.ok) {
    console.error("FAIL", res.status, name);
    continue;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
  ok++;
  console.log("Saved", name, `${Math.round(buf.length / 1024)} KB`);
}

console.log(`Done: ${ok} downloaded, ${skipped} skipped, ${FILES.length} total.`);
