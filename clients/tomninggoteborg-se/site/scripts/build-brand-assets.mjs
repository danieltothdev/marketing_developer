import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.join(__dirname, "..", "assets");
const input = process.argv[2] || path.join(assetsDir, "logo-source.png");

async function main() {
  if (!fs.existsSync(input)) {
    throw new Error(`Logo source not found: ${input}`);
  }

  const logoPath = path.join(assetsDir, "logo.png");
  await sharp(input)
    .resize(256, 256, { fit: "cover", position: "centre" })
    .png({ compressionLevel: 9, palette: true })
    .toFile(logoPath);

  const sizes = [
    { name: "favicon-32.png", size: 32 },
    { name: "favicon-192.png", size: 192 },
    { name: "apple-touch-icon.png", size: 180 },
  ];

  for (const { name, size } of sizes) {
    await sharp(input)
      .resize(size, size, { fit: "cover", position: "centre" })
      .png({ compressionLevel: 9 })
      .toFile(path.join(assetsDir, name));
    console.log("Wrote", name);
  }

  console.log("Wrote logo.png");
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
