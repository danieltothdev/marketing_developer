/** Normalize <title> — single brand suffix, no duplicate "Alfa Tömning Göteborg". */
export const BRAND_SUFFIX = "| Alfa Tömning";

export function normalizeSeoTitle(raw) {
  let title = String(raw).trim();
  title = title.replace(/\s*[–—-]\s*Alfa Tömning Göteborg\s*$/i, "");
  title = title.replace(/\s*[|–—]\s*Alfa Tömning\s*[–—-]\s*Alfa Tömning Göteborg\s*$/i, "");
  title = title.replace(/\s*[|–—]\s*Alfa Tömning Gothenburg\s*$/i, ` ${BRAND_SUFFIX}`);
  title = title.replace(/\s*[|–—]\s*Alfa Tömning Göteborg\s*$/i, ` ${BRAND_SUFFIX}`);
  return title.trim();
}
