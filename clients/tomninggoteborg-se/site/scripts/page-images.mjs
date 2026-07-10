import { imageAlt, imageFileForKey, resolveImageSrc } from "./image-assets.mjs";

/** Ensures each image file appears at most once per generated page. */
export function createPageImageTracker(assetRoot, locale = "sv") {
  const used = new Set();
  return {
    tryUse(imageKey) {
      if (!imageKey) return null;
      const file = imageFileForKey(imageKey);
      if (used.has(file)) return null;
      used.add(file);
      return {
        src: resolveImageSrc(file, assetRoot),
        alt: imageAlt(imageKey, locale),
      };
    },
  };
}
