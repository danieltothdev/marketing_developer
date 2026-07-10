/** Site logo + favicon markup (paths relative to site root). */

export const LOGO_FILE = "assets/logo.png";

export function logoSrc(assetRoot = "") {
  return `${assetRoot}${LOGO_FILE}`;
}

export function faviconHeadHtml(assetRoot = "") {
  const p = assetRoot;
  return `  <link rel="icon" type="image/png" sizes="32x32" href="${p}assets/favicon-32.png" />
  <link rel="icon" type="image/png" sizes="192x192" href="${p}assets/favicon-192.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="${p}assets/apple-touch-icon.png" />`;
}

export function navLogoHtml(homeHref, assetRoot, brandLabel) {
  const src = logoSrc(assetRoot);
  const label = brandLabel.replace(/"/g, "&quot;");
  return `      <a href="${homeHref}" class="nav-brand" aria-label="${label}">
        <img src="${src}" alt="" width="40" height="40" decoding="async" />
        <span>${brandLabel}</span>
      </a>`;
}
