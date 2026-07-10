(function () {
  "use strict";

  var STORAGE_KEY = "siteLang";
  var routes = null;

  function normalizePath(pathname) {
    var path = pathname.replace(/\\/g, "/");
    if (path.endsWith("/")) path += "index.html";
    if (path.startsWith("/")) path = path.slice(1);
    return path || "index.html";
  }

  function invertRoutes(map) {
    var inv = {};
    Object.keys(map).forEach(function (sv) {
      inv[map[sv]] = sv;
    });
    return inv;
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
    return path.startsWith("en/") ? "en" : "sv";
  }

  function counterpartPath(fromLang, toLang) {
    var path = normalizePath(window.location.pathname);
    var map = getRoutes();
    var inv = invertRoutes(map);

    if (fromLang === "sv" && toLang === "en") {
      return map[path] || "en/index.html";
    }
    if (fromLang === "en" && toLang === "sv") {
      return inv[path] || "index.html";
    }
    return path;
  }

  function setLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
    document.documentElement.lang = lang === "en" ? "en" : "sv";
  }

  function rootPrefix() {
    var path = normalizePath(window.location.pathname);
    var depth = path.split("/").length - 1;
    return depth === 0 ? "./" : "../".repeat(depth);
  }

  function switchLang(lang) {
    var from = currentLang();
    if (from === lang) return;
    setLang(lang);
    var path = normalizePath(window.location.pathname);
    var map = getRoutes();
    var inv = invertRoutes(map);
    var target = lang === "en" ? map[path] || "en/index.html" : inv[path] || "index.html";
    window.location.href = rootPrefix() + target;
  }

  function resolveHref(targetPath) {
    var lang = currentLang();
    if (lang === "en" && !targetPath.startsWith("en/") && !targetPath.startsWith("http") && !targetPath.startsWith("#")) {
      var map = getRoutes();
      return map[targetPath] || targetPath;
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
