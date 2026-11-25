/**
 * Korean / English switch.
 * Korean stays in the HTML. English sits next to it in attributes:
 *   data-en="..."              text
 *   data-en-html="..."         text with tags (line breaks, bold)
 *   data-en-aria-label="..."   screen reader label
 *   data-en-alt="..."          image description
 *   data-lang="ko" / "en"      whole blocks (long pages such as the privacy policy)
 *   <html data-title-en="..."> page title
 */
(function () {
    "use strict";

    var root = document.documentElement;
    var korean = new WeakMap();
    var koTitle = document.title;

    function remember(el, key, value) {
        var saved = korean.get(el) || {};
        if (!(key in saved)) saved[key] = value;
        korean.set(el, saved);
        return saved[key];
    }

    function apply(lang) {
        var en = lang === "en";
        root.lang = lang;
        window.UllimLang = lang;

        document.querySelectorAll("[data-en]").forEach(function (el) {
            var ko = remember(el, "text", el.textContent);
            el.textContent = en ? el.getAttribute("data-en") : ko;
        });
        document.querySelectorAll("[data-en-html]").forEach(function (el) {
            var ko = remember(el, "html", el.innerHTML);
            el.innerHTML = en ? el.getAttribute("data-en-html") : ko;
        });
        ["aria-label", "alt"].forEach(function (attr) {
            document.querySelectorAll("[data-en-" + attr + "]").forEach(function (el) {
                var ko = remember(el, attr, el.getAttribute(attr) || "");
                el.setAttribute(attr, en ? el.getAttribute("data-en-" + attr) : ko);
            });
        });
        document.querySelectorAll("[data-lang]").forEach(function (el) {
            el.hidden = el.getAttribute("data-lang") !== lang;
        });
        var enTitle = root.getAttribute("data-title-en");
        document.title = en && enTitle ? enTitle : koTitle;

        root.classList.remove("i18n-pending");
        document.dispatchEvent(new CustomEvent("ullim:lang", { detail: lang }));
    }

    function init() {
        apply(window.UllimLang === "en" ? "en" : "ko");
        var toggle = document.getElementById("langToggle");
        if (toggle) {
            toggle.addEventListener("click", function () {
                var next = window.UllimLang === "en" ? "ko" : "en";
                try { localStorage.setItem("ullim-lang", next); } catch (e) {}
                apply(next);
            });
        }
    }

    window.UllimI18n = { apply: apply };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
