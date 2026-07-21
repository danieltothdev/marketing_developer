(function () {
  "use strict";

  function getConfig() {
    if (!window.SUPABASE_CONFIG?.url || window.SUPABASE_CONFIG.url.includes("YOUR_PROJECT")) {
      return null;
    }
    return window.SUPABASE_CONFIG;
  }

  function buildPayload(form, config) {
    const map = config.columnMap || {};
    const payload = { ...(config.extraFields || {}) };
    const fd = new FormData(form);

    if (String(fd.get("website") || "").trim()) {
      throw new Error("Formuläret kunde inte skickas.");
    }

    if (!fd.get("human_check")) {
      throw new Error("Bekräfta att du är en människa innan du skickar.");
    }

    for (const [field, column] of Object.entries(map)) {
      if (field === "site_domain" && config.extraFields?.site_domain) continue;
      if (field === "human_check" || field === "website") continue;
      const value = fd.get(field);
      if (value != null && String(value).trim() !== "") {
        payload[column] = String(value).trim();
      }
    }

    if (!payload[map.site_domain || "site_domain"]) {
      payload[map.site_domain || "site_domain"] =
        config.extraFields?.site_domain || window.SITE_CONFIG?.domain || location.hostname;
    }

    return payload;
  }

  function setStatus(form, type, message) {
    const el = form.querySelector("[data-form-status]");
    if (!el) return;
    el.hidden = !message;
    el.className = "form-status form-status--" + type;
    el.textContent = message;
  }

  function setLoading(form, loading) {
    const btn = form.querySelector('[type="submit"]');
    if (!btn) return;
    btn.disabled = loading;
    btn.setAttribute("aria-busy", loading ? "true" : "false");
    if (!btn.dataset.defaultLabel) btn.dataset.defaultLabel = btn.textContent;
    btn.textContent = loading ? "Skickar..." : btn.dataset.defaultLabel;
  }

  async function parseErrorResponse(res) {
    let detail = "";
    try {
      const data = await res.json();
      detail = data.error || data.message || JSON.stringify(data);
    } catch (_) {
      detail = res.statusText;
    }
    return detail || "Kunde inte skicka formuläret (" + res.status + ")";
  }

  async function submitViaEdgeFunction(payload, config) {
    const fn = config.submitLeadFunction || "submit-lead";
    const url = config.url.replace(/\/$/, "") + "/functions/v1/" + encodeURIComponent(fn);

    const res = await fetch(url, {
      method: "POST",
      headers: {
        apikey: config.anonKey,
        Authorization: "Bearer " + config.anonKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(await parseErrorResponse(res));
    }
  }

  async function submitViaRest(payload, config) {
    const url = config.url.replace(/\/$/, "") + "/rest/v1/" + encodeURIComponent(config.table);

    const res = await fetch(url, {
      method: "POST",
      headers: {
        apikey: config.anonKey,
        Authorization: "Bearer " + config.anonKey,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(await parseErrorResponse(res));
    }
  }

  async function submitToSupabase(form) {
    const config = getConfig();
    if (!config) {
      throw new Error("Supabase är inte konfigurerad. Kontakta webbadministratören.");
    }

    const payload = buildPayload(form, config);

    if (config.submitVia === "edge") {
      await submitViaEdgeFunction(payload, config);
    } else {
      await submitViaRest(payload, config);
    }
  }

  function bindForm(form) {
    if (form.dataset.supabaseBound === "true") return;
    form.dataset.supabaseBound = "true";
    form.addEventListener("submit", async function (event) {
      event.preventDefault();
      setStatus(form, "info", "");
      setLoading(form, true);

      try {
        await submitToSupabase(form);
        form.reset();
        setStatus(form, "success", "Tack! Vi återkommer inom kort med en offert.");
      } catch (err) {
        setStatus(form, "error", err.message || "Något gick fel. Ring oss gärna direkt.");
      } finally {
        setLoading(form, false);
      }
    });
  }

  function bindAllForms() {
    document.querySelectorAll("form[data-supabase-form]").forEach(bindForm);
  }

  document.addEventListener("DOMContentLoaded", bindAllForms);
  document.addEventListener("offert-forms-mounted", bindAllForms);
})();
