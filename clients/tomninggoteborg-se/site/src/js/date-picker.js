(function () {
  "use strict";

  function initDatePickers(root) {
    if (typeof flatpickr === "undefined") return;

    const locale = flatpickr.l10ns.sv || flatpickr.l10ns.default;

    root.querySelectorAll("[data-date-picker]").forEach(function (input) {
      if (input._flatpickr) return;

      flatpickr(input, {
        locale: locale,
        dateFormat: "Y-m-d",
        altInput: true,
        altFormat: "Y.m.d",
        minDate: "today",
        disableMobile: false,
        allowInput: true,
        clickOpens: true,
        monthSelectorType: "static",
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initDatePickers(document);
  });

  document.addEventListener("offert-forms-mounted", function (event) {
    const root = event.detail?.container || document;
    initDatePickers(root);
  });
})();
