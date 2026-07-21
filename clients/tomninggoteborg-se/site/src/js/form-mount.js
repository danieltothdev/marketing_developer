(function () {
  "use strict";

  var calendarIcon =
    '<svg class="offert-date-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true">' +
    '<rect x="3" y="4" width="18" height="18" rx="2"></rect>' +
    '<path d="M16 2v4M8 2v4M3 10h18"></path></svg>';

  function formLocale() {
    if (window.SITE_I18N && typeof window.SITE_I18N.currentLang === "function") {
      return window.SITE_I18N.currentLang();
    }
    return document.documentElement.lang === "en" ? "en" : "sv";
  }

  function formStrings() {
    var locale = formLocale();
    var pack = (window.FORM_I18N && window.FORM_I18N[locale]) || window.FORM_I18N?.sv || {};
    return pack;
  }

  function serviceOptionsHtml(selected) {
    var options = window.SERVICE_OPTIONS || [];
    var t = formStrings();
    var html = '<option value="">' + escapeHtml(t.selectService || "Välj tjänst") + "</option>";
    options.forEach(function (item) {
      var sel = item.value === selected ? " selected" : "";
      html += '<option value="' + escapeAttr(item.value) + '"' + sel + ">" + escapeHtml(item.value) + "</option>";
    });
    return html;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function escapeAttr(str) {
    return escapeHtml(str);
  }

  function formLogoSrc() {
    var script = document.querySelector('script[src*="form-mount.js"]');
    if (script && script.src) {
      try {
        return new URL("../assets/logo.png", script.src).href;
      } catch (e) {
        /* fall through */
      }
    }
    return "assets/logo.png";
  }

  function formLogoMarkup() {
    var brand = (window.SITE_CONFIG && window.SITE_CONFIG.businessName) || "Alfa Tömning";
    return (
      '<div class="quote-card__logo-wrap" aria-hidden="true">' +
      '<span class="quote-card__logo-ring"></span>' +
      '<span class="quote-card__logo-glow"></span>' +
      '<img class="quote-card__logo" src="' +
      escapeAttr(formLogoSrc()) +
      '" alt="" width="56" height="56" decoding="async" />' +
      '<span class="visually-hidden">' +
      escapeHtml(brand) +
      "</span></div>"
    );
  }

  function renderFormMount(el) {
    var t = formStrings();
    var title = el.dataset.formTitle || t.defaultTitle || "Få snabb offert";
    var subtitle = el.dataset.formSubtitle || t.defaultSubtitle || "Fyll i formuläret så återkommer vi inom kort.";
    var defaultService = el.dataset.defaultService || "";
    var defaultCity = el.dataset.defaultCity || (formLocale() === "en" ? "Gothenburg" : "Göteborg");
    var submitLabel = el.dataset.submitLabel || t.submit || "Skicka offertförfrågan";
    var compact = el.hasAttribute("data-form-compact");

    el.classList.add("quote-card");

    el.innerHTML =
      formLogoMarkup() +
      (compact ? "" : "<h2>" + escapeHtml(title) + "</h2><p class=\"quote-card__sub\">" + escapeHtml(subtitle) + "</p>") +
      '<form class="offert-form" data-supabase-form novalidate>' +
      '<div class="offert-form-grid">' +
      '<label class="offert-field"><span class="offert-label">' + escapeHtml(t.name) + ' <span class="req">' + escapeHtml(t.required) + '</span></span><input type="text" name="name" required autocomplete="name" placeholder="' + escapeAttr(t.namePlaceholder) + '" /></label>' +
      '<label class="offert-field"><span class="offert-label">' + escapeHtml(t.address) + ' <span class="req">' + escapeHtml(t.required) + '</span></span><input type="text" name="address" required autocomplete="street-address" placeholder="' + escapeAttr(t.addressPlaceholder) + '" /></label>' +
      '<label class="offert-field"><span class="offert-label">' + escapeHtml(t.city) + ' <span class="req">' + escapeHtml(t.required) + '</span></span><input type="text" name="city" required autocomplete="address-level2" placeholder="' + escapeAttr(t.cityPlaceholder) + '" value="' + escapeAttr(defaultCity) + '" /></label>' +
      '<label class="offert-field"><span class="offert-label">' + escapeHtml(t.postalCode) + ' <span class="req">' + escapeHtml(t.required) + '</span></span><input type="text" name="postal_code" required autocomplete="postal-code" placeholder="' + escapeAttr(t.postalPlaceholder) + '" inputmode="numeric" /></label>' +
      '<label class="offert-field"><span class="offert-label">' + escapeHtml(t.phone) + ' <span class="req">' + escapeHtml(t.required) + '</span></span><input type="tel" name="phone" required autocomplete="tel" placeholder="' + escapeAttr(t.phonePlaceholder) + '" /></label>' +
      '<label class="offert-field"><span class="offert-label">' + escapeHtml(t.email) + ' <span class="req">' + escapeHtml(t.required) + '</span></span><input type="email" name="email" required autocomplete="email" placeholder="' + escapeAttr(t.emailPlaceholder) + '" /></label>' +
      '<label class="offert-field offert-field--half"><span class="offert-label">' + escapeHtml(t.serviceType) + ' <span class="opt">' + escapeHtml(t.optional) + '</span></span><select name="service">' +
      serviceOptionsHtml(defaultService) +
      "</select></label>" +
      '<label class="offert-field offert-field--half offert-date-wrap"><span class="offert-label">' + escapeHtml(t.preferredDate) + ' <span class="opt">' + escapeHtml(t.optional) + '</span></span><input type="text" name="preferred_date" data-date-picker placeholder="' + escapeAttr(t.datePlaceholder) + '" autocomplete="off" />' +
      calendarIcon +
      "</label>" +
      '<label class="offert-field offert-field--full"><span class="offert-label">' + escapeHtml(t.message) + ' <span class="opt">' + escapeHtml(t.optional) + '</span></span><textarea name="message" rows="4" placeholder="' + escapeAttr(t.messagePlaceholder) + '"></textarea></label>' +
      '<label class="offert-field offert-field--full offert-human-check"><input type="checkbox" name="human_check" required /><span>' + escapeHtml(t.humanCheck) + ' <span class="req">' + escapeHtml(t.required) + '</span></span></label>' +
      '<input type="text" name="website" class="offert-honeypot" tabindex="-1" autocomplete="off" aria-hidden="true" />' +
      "</div>" +
      '<button class="btn btn-primary offert-submit" type="submit">' + escapeHtml(submitLabel) + "</button>" +
      '<p class="form-status" data-form-status hidden></p>' +
      "</form>";
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-offert-form]").forEach(renderFormMount);
    document.dispatchEvent(new CustomEvent("offert-forms-mounted", { detail: { container: document } }));
  });
})();
