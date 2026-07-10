(function () {
  "use strict";

  const phone = window.SITE_CONFIG?.phoneDisplay || "070 729 39 86";
  const phoneTel = window.SITE_CONFIG?.phone ? "tel:+" + String(window.SITE_CONFIG.phone).replace(/\D/g, "") : "tel:+46707293986";

  function resolveOffertHref() {
    if (document.querySelector("#offert[data-offert-form], aside#offert")) {
      return "#offert";
    }
    const navOffert = document.querySelector('.nav-actions a[href*="offert"], .nav-actions a[href*="quote"]');
    return navOffert?.getAttribute("href") || (document.documentElement.lang === "en" ? "quote.html" : "offert.html");
  }

  function uiStrings() {
    const lang = window.SITE_I18N?.currentLang?.() || (document.documentElement.lang === "en" ? "en" : "sv");
    if (lang === "en") {
      return { ctaLabel: "Quick contact", call: "Call", quote: "Get a quote" };
    }
    return { ctaLabel: "Snabbkontakt", call: "Ring", quote: "Begär offert" };
  }

  function initMobileCta() {
    if (document.getElementById("mobileCtaBar")) return;

    const offertHref = resolveOffertHref();
    const ui = uiStrings();
    const bar = document.createElement("div");
    bar.id = "mobileCtaBar";
    bar.className = "mobile-cta-bar";
    bar.setAttribute("role", "region");
    bar.setAttribute("aria-label", ui.ctaLabel);
    bar.innerHTML =
      '<div class="mobile-cta-bar__inner">' +
      '<a class="btn btn-call" href="' +
      phoneTel +
      '">' +
      ui.call +
      " " +
      phone +
      "</a>" +
      '<a class="btn btn-primary" href="' +
      offertHref +
      '">' +
      ui.quote +
      "</a>" +
      "</div>";

    document.body.appendChild(bar);
    document.body.classList.add("has-mobile-cta");
  }

  const navToggle = document.getElementById("navToggle");
  const primaryNav = document.getElementById("primaryNav");
  const navBar = document.querySelector(".nav-bar");

  function closeNav() {
    if (!primaryNav) return;
    primaryNav.classList.remove("is-open");
    navBar?.classList.remove("is-menu-open");
    navToggle?.setAttribute("aria-expanded", "false");
    document.querySelectorAll(".nav-dropdown.is-open").forEach(function (el) {
      el.classList.remove("is-open");
    });
  }

  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", function () {
      const open = primaryNav.classList.toggle("is-open");
      navBar?.classList.toggle("is-menu-open", open);
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    primaryNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("click", function (event) {
      if (!primaryNav.classList.contains("is-open")) return;
      if (navBar?.contains(event.target)) return;
      closeNav();
    });
  }

  document.querySelectorAll(".nav-dropdown-toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const parent = btn.closest(".nav-dropdown");
      const open = parent.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  document.querySelectorAll(".faq-item button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const item = btn.closest(".faq-item");
      const open = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  function starIcon(size) {
    return (
      '<svg xmlns="http://www.w3.org/2000/svg" width="' +
      size +
      '" height="' +
      size +
      '" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M10 2.2l2.1 5.4h5.6l-4.5 3.5 1.7 5.5L10 14l-4.9 3.6 1.7-5.5-4.5-3.5h5.6L10 2.2z" fill="currentColor" stroke="none"/>' +
      "</svg>"
    );
  }

  function reviewStarsHtml(count) {
    const lang = document.documentElement.lang === "en" ? "en" : "sv";
    const label = lang === "en" ? count + " of 5" : count + " av 5";
    const stars = Array.from({ length: count }, function () {
      return starIcon(16);
    }).join("");
    return '<div class="review-stars" aria-label="' + label + '">' + stars + "</div>";
  }

  function pinIcon() {
    return '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/></svg>';
  }

  function arrowIcon() {
    return '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';
  }

  function renderAreaGrid(container) {
    const areas = window.AREA_LINKS || [];
    const prefix = container.dataset.areaPrefix || "omraden/";
    container.innerHTML = areas
      .map(function (area) {
        return (
          '<a class="area-card" href="' +
          prefix +
          area.slug +
          '.html">' +
          '<span class="area-card__left">' +
          '<span class="area-card__pin">' +
          pinIcon() +
          "</span>" +
          "<span>" +
          area.name +
          "</span>" +
          "</span>" +
          '<span class="area-card__arrow">' +
          arrowIcon() +
          "</span>" +
          "</a>"
        );
      })
      .join("");
  }

  function renderReviews(root) {
    const items = window.REVIEW_ITEMS || [];
    const track = root.querySelector("[data-review-track]");
    const dots = root.querySelector("[data-review-dots]");
    if (!track || !items.length) return;

    track.innerHTML = items
      .map(function (item) {
        return (
          '<article class="review-card">' +
          reviewStarsHtml(5) +
          "<blockquote>" +
          item.text +
          "</blockquote>" +
          '<div class="review-meta">' +
          "<cite>" +
          item.label +
          "</cite>" +
          "<span>" +
          item.area +
          "</span>" +
          '<span class="review-tag">' +
          item.service +
          "</span>" +
          "</div>" +
          "</article>"
        );
      })
      .join("");

    if (dots) {
      dots.innerHTML = items
        .map(function (_, i) {
          return '<button type="button" data-review-dot="' + i + '" aria-label="Visa omdöme ' + (i + 1) + '"></button>';
        })
        .join("");
    }

    initReviewCarousel(root);
  }

  function initReviewCarousel(root) {
    const track = root.querySelector("[data-review-track]");
    const cards = Array.from(track.children);
    const dots = Array.from(root.querySelectorAll("[data-review-dot]"));
    let index = 0;
    let timer = null;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const intervalMs = reduceMotion ? 0 : 6000;

    function updateDots() {
      dots.forEach(function (dot, i) {
        dot.setAttribute("aria-current", i === index ? "true" : "false");
      });
    }

    function show(nextIndex, animate) {
      index = (nextIndex + cards.length) % cards.length;
      track.style.transform = "translateX(-" + index * 100 + "%)";
      cards.forEach(function (card, i) {
        card.classList.toggle("is-entering", animate && i === index);
      });
      updateDots();
    }

    function startAutoplay() {
      if (!intervalMs) return;
      stopAutoplay();
      timer = window.setInterval(function () {
        show(index + 1, true);
      }, intervalMs);
    }

    function stopAutoplay() {
      if (timer) window.clearInterval(timer);
      timer = null;
    }

    root.querySelector("[data-review-prev]")?.addEventListener("click", function () {
      show(index - 1, true);
      startAutoplay();
    });
    root.querySelector("[data-review-next]")?.addEventListener("click", function () {
      show(index + 1, true);
      startAutoplay();
    });

    dots.forEach(function (dot) {
      dot.addEventListener("click", function () {
        show(Number(dot.dataset.reviewDot), true);
        startAutoplay();
      });
    });

    root.addEventListener("mouseenter", stopAutoplay);
    root.addEventListener("mouseleave", startAutoplay);
    root.addEventListener("focusin", stopAutoplay);
    root.addEventListener("focusout", startAutoplay);

    show(0, false);
    startAutoplay();
  }

  document.addEventListener("DOMContentLoaded", function () {
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
    initMobileCta();
    document.querySelectorAll("[data-area-grid]").forEach(renderAreaGrid);
    document.querySelectorAll("[data-reviews]").forEach(renderReviews);
  });

  const cookieKey = "alfa_tomning_cookie";
  const banner = document.getElementById("cookieBanner");
  if (banner && !localStorage.getItem(cookieKey)) {
    banner.hidden = false;
  }
  document.getElementById("cookieAccept")?.addEventListener("click", function () {
    localStorage.setItem(cookieKey, "accepted");
    if (banner) banner.hidden = true;
  });
  document.getElementById("cookieDecline")?.addEventListener("click", function () {
    localStorage.setItem(cookieKey, "declined");
    if (banner) banner.hidden = true;
  });
})();
