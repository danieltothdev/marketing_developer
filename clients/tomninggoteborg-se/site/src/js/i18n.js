(function () {
  "use strict";

  var STORAGE_KEY = "siteLang";
  var routes = null;
  var cleanMap = null;

  // Egy route-bejegyzést (pl. "en/services/foo.html", "index.html") a végleges,
  // abszolút, kiterjesztés nélküli URL-re alakít ("/en/services/foo", "/").
  function toFinal(entry) {
    var p = entry.replace(/\\/g, "/");
    if (p.charAt(0) !== "/") p = "/" + p;
    if (/\/index\.html$/.test(p)) {
      p = p.replace(/index\.html$/, ""); // ".../" könyvtár
      if (p !== "/" && p !== "/en/") p = p.replace(/\/$/, ""); // /blogg/ -> /blogg
      return p;
    }
    return p.replace(/\.html$/, "");
  }

  // Az aktuális böngésző-útvonalat a végleges alakra normalizálja.
  function normalizePath(pathname) {
    var p = (pathname || "/").replace(/\\/g, "/");
    if (p.charAt(0) !== "/") p = "/" + p;
    if (/\/index\.html$/.test(p)) return toFinal(p);
    p = p.replace(/\.html$/, "");
    if (p !== "/" && p !== "/en/") p = p.replace(/\/$/, "");
    return p || "/";
  }

  function getCleanMap() {
    if (cleanMap) return cleanMap;
    var raw = getRoutes();
    cleanMap = { sv2en: {}, en2sv: {} };
    Object.keys(raw).forEach(function (sv) {
      var svF = toFinal(sv);
      var enF = toFinal(raw[sv]);
      cleanMap.sv2en[svF] = enF;
      cleanMap.en2sv[enF] = svF;
    });
    return cleanMap;
  }

  function getRoutes() {
    if (routes) return routes;
    var el = document.getElementById("i18n-routes");
    if (el && el.textContent) {
      routes = JSON.parse(el.textContent);
      return routes;
    }
    return {};
  }

  function loadRoutes(callback) {
    if (routes) {
      callback();
      return;
    }
    var el = document.getElementById("i18n-routes");
    if (el && el.textContent) {
      routes = JSON.parse(el.textContent);
      callback();
      return;
    }
    fetch(document.currentScript ? new URL("i18n-routes.json", document.currentScript.src).href : "js/i18n-routes.json")
      .then(function (r) {
        return r.json();
      })
      .then(function (data) {
        routes = data;
        callback();
      })
      .catch(function () {
        routes = {};
        callback();
      });
  }

  function currentLang() {
    var path = normalizePath(window.location.pathname);
    return path === "/en" || path === "/en/" || path.indexOf("/en/") === 0 ? "en" : "sv";
  }

  function counterpartPath(fromLang, toLang) {
    var path = normalizePath(window.location.pathname);
    var m = getCleanMap();
    if (fromLang === "sv" && toLang === "en") {
      return m.sv2en[path] || "/en/";
    }
    if (fromLang === "en" && toLang === "sv") {
      return m.en2sv[path] || "/";
    }
    return path;
  }

  function setLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
    document.documentElement.lang = lang === "en" ? "en" : "sv";
  }

  function switchLang(lang) {
    var from = currentLang();
    if (from === lang) return;
    setLang(lang);
    // A végleges, abszolút, kiterjesztés nélküli megfelelő oldalra navigálunk.
    window.location.href = counterpartPath(from, lang);
  }

  function resolveHref(targetPath) {
    var lang = currentLang();
    if (lang === "en" && targetPath.indexOf("/en/") !== 0 && targetPath.indexOf("http") !== 0 && targetPath.charAt(0) !== "#") {
      var m = getCleanMap();
      return m.sv2en[normalizePath(targetPath)] || targetPath;
    }
    return targetPath;
  }

  function initSwitcher() {
    document.querySelectorAll("[data-lang-switch]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        switchLang(btn.getAttribute("data-lang-switch"));
      });
    });

    var lang = currentLang();
    setLang(lang);
    document.querySelectorAll("[data-lang-switch]").forEach(function (btn) {
      var active = btn.getAttribute("data-lang-switch") === lang;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  window.SITE_I18N = {
    currentLang: currentLang,
    switchLang: switchLang,
    resolveHref: resolveHref,
    getStoredLang: function () {
      try {
        return localStorage.getItem(STORAGE_KEY);
      } catch (e) {
        return null;
      }
    },
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      loadRoutes(initSwitcher);
    });
  } else {
    loadRoutes(initSwitcher);
  }
})();
