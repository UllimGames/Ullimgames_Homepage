/**
 * Shared behavior for every page that uses partials/header.html and partials/footer.html.
 * - Mobile sidebar (open/close, Esc key, focus return, accordion)
 * - Game links from js/games-config.js (data-link="key")
 * - Placeholder menu links (href="#") do nothing instead of jumping to the top
 * - Back-to-top button and the floating play button near the footer
 */
(function () {
    "use strict";

    function wireLinks() {
        var config = window.UllimGamesConfig || {};
        document.querySelectorAll("[data-link]").forEach(function (el) {
            var url = config[el.getAttribute("data-link")];
            if (url) {
                el.setAttribute("href", url);
                if (/^https?:/.test(url) && !el.hasAttribute("target")) {
                    el.setAttribute("target", "_blank");
                    el.setAttribute("rel", "noopener noreferrer");
                }
            } else {
                el.removeAttribute("href");
                el.removeAttribute("target");
                el.classList.add("is-unlinked");
            }
        });
    }

    function blockPlaceholderLinks() {
        document.querySelectorAll('a[href="#"]').forEach(function (el) {
            el.setAttribute("aria-disabled", "true");
            el.addEventListener("click", function (event) {
                event.preventDefault();
            });
        });
    }

    function setupSidebar() {
        var toggle = document.getElementById("menuToggleBtn");
        var closeBtn = document.getElementById("closeSidebarBtn");
        var sidebar = document.getElementById("mobileSidebar");
        var overlay = document.getElementById("sidebarOverlay");
        if (!toggle || !closeBtn || !sidebar || !overlay) return;

        var groups = sidebar.querySelectorAll(".sidebar-group");

        function collapse(group) {
            var btn = group.querySelector(".sidebar-title-btn");
            var sub = group.querySelector(".sidebar-sub-menu");
            group.classList.remove("active");
            btn.setAttribute("aria-expanded", "false");
            sub.style.maxHeight = null;
        }

        function open() {
            sidebar.classList.add("active");
            sidebar.removeAttribute("inert");
            overlay.classList.add("active");
            document.body.classList.add("is-sidebar-open");
            toggle.setAttribute("aria-expanded", "true");
            window.setTimeout(function () {
                closeBtn.focus();
            }, 50);
        }

        function close() {
            sidebar.classList.remove("active");
            sidebar.setAttribute("inert", "");
            overlay.classList.remove("active");
            document.body.classList.remove("is-sidebar-open");
            toggle.setAttribute("aria-expanded", "false");
            groups.forEach(collapse);
            toggle.focus();
        }

        sidebar.setAttribute("inert", "");
        toggle.addEventListener("click", open);
        closeBtn.addEventListener("click", close);
        overlay.addEventListener("click", close);
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && sidebar.classList.contains("active")) close();
        });

        groups.forEach(function (group) {
            var btn = group.querySelector(".sidebar-title-btn");
            var sub = group.querySelector(".sidebar-sub-menu");
            btn.addEventListener("click", function () {
                var willOpen = !group.classList.contains("active");
                groups.forEach(collapse);
                if (willOpen) {
                    group.classList.add("active");
                    btn.setAttribute("aria-expanded", "true");
                    sub.style.maxHeight = sub.scrollHeight + "px";
                }
            });
        });
    }

    function setupBackToTop() {
        var btn = document.getElementById("backToTop");
        if (!btn) return;
        btn.addEventListener("click", function () {
            var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
            var skipTarget = document.getElementById("main");
            if (skipTarget) skipTarget.focus({ preventScroll: true });
        });
    }

    function setupFloatingCta() {
        var cta = document.getElementById("fruitValleyCta");
        var footer = document.querySelector(".site-footer");
        if (!cta || !footer || !("IntersectionObserver" in window)) return;
        new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                cta.classList.toggle("is-near-footer", entry.isIntersecting);
            });
        }).observe(footer);
    }

    function init() {
        wireLinks();
        blockPlaceholderLinks();
        setupSidebar();
        setupBackToTop();
        setupFloatingCta();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
