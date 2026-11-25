/**
 * Runs in <head> before the page draws: picks the language.
 * Order: ?lang=ko|en in the address > saved choice > browser language.
 * Korean browsers get Korean; every other language gets English.
 */
(function () {
    var lang = null;
    try {
        var fromUrl = new URLSearchParams(location.search).get("lang");
        if (fromUrl === "ko" || fromUrl === "en") {
            localStorage.setItem("ullim-lang", fromUrl);
            lang = fromUrl;
        } else {
            lang = localStorage.getItem("ullim-lang");
        }
    } catch (e) {}
    if (lang !== "ko" && lang !== "en") {
        var first = (navigator.languages && navigator.languages[0]) || navigator.language || "ko";
        lang = /^ko\b/i.test(first) ? "ko" : "en";
    }
    var root = document.documentElement;
    root.lang = lang;
    // Hide the Korean text for a moment while English is filled in (CSS shows it again after 1.2s at most).
    if (lang === "en") root.classList.add("i18n-pending");
    window.UllimLang = lang;
})();
