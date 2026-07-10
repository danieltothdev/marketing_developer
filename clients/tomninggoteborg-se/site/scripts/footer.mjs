const POWERED_BY_URL = "https://alfaflyttstad.se/sv/";

export function footerHtml(locale) {
  const rights =
    locale === "en" ? "All rights reserved." : "Alla rättigheter reserverade.";
  return `<footer class="site-footer"><div class="container footer-grid">
      <p>© <span id="year"></span> Alfa Tömning – ${rights}</p>
      <p class="footer-powered">Powered by <a class="footer-powered__link" href="${POWERED_BY_URL}" target="_blank" rel="noopener noreferrer">Alfa Flytt &amp; Städ AB</a></p>
    </div></footer>`;
}
