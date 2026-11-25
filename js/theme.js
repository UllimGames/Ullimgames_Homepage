/**
 * Season theme engine.
 * Needs js/theme-catalog.js (what each theme looks like) and
 * js/theme-schedule.js (which theme each month uses) loaded first.
 *
 * The theme always follows the calendar: schedule.months[current month].
 * The admin page can call UllimTheme.show(name) to preview a theme on that
 * page only. Nothing is saved in the browser.
 */
(function () {
    "use strict";

    var CATALOG = window.UllimThemeCatalog || {};
    var NAMES = Object.keys(CATALOG);

    // Clean up keys left by older versions (they could pin a theme forever).
    try {
        localStorage.removeItem("ullim-theme-override");
        localStorage.removeItem("ullim-theme-preview");
    } catch (e) {}

    // How each piece moves.
    //   leaf:  rocks left-right in a zigzag while it drops
    //   snow:  light, slow, drifts a little
    //   heavy: drops fairly straight, slight wobble
    //   float: rises slowly (bubbles)
    var STYLE = {
        leaf:  { fall: [12, 16], sway: [28, 44], beat: [2.6, 3.6], spin: 0 },
        snow:  { fall: [16, 24], sway: [8, 18],  beat: [3.5, 5.5], spin: 120 },
        heavy: { fall: [9, 12],  sway: [2, 4],   beat: [1.8, 2.6], spin: 30 },
        float: { fall: [12, 18], sway: [6, 12],  beat: [3, 4.5],   spin: 0 }
    };

    // Style and size range (px) for each piece.
    var FEEL = {
        petal:     { style: "leaf",  size: [16, 24] },
        clover:    { style: "leaf",  size: [18, 26] },
        maple:     { style: "leaf",  size: [24, 36] },
        ginkgo:    { style: "leaf",  size: [22, 32] },
        plum:      { style: "leaf",  size: [18, 26] },
        snowflake: { style: "snow",  size: [14, 26] },
        snowdot:   { style: "snow",  size: [6, 11] },
        star:      { style: "snow",  size: [14, 22] },
        bubble:    { style: "float", size: [18, 34] },
        pumpkin:   { style: "heavy", size: [28, 40] },
        candy:     { style: "heavy", size: [22, 30] },
        bat:       { style: "heavy", size: [26, 38] },
        pouch:     { style: "heavy", size: [26, 36] }
    };

    function isTheme(name) {
        return NAMES.indexOf(name) !== -1;
    }

    function scheduledTheme(date) {
        var schedule = window.UllimThemeSchedule || {};
        var month = String((date || new Date()).getMonth() + 1);
        var name = schedule.months && schedule.months[month];
        return isTheme(name) ? name : NAMES[0];
    }

    function rand(min, max) {
        return min + Math.random() * (max - min);
    }

    function pickWeighted(pieces) {
        var total = 0;
        pieces.forEach(function (p) { total += p[1]; });
        var roll = Math.random() * total;
        for (var i = 0; i < pieces.length; i++) {
            roll -= pieces[i][1];
            if (roll <= 0) return pieces[i][0];
        }
        return pieces[0][0];
    }

    var body = document.body;
    var layer = null;
    var current = null;

    function applySkin(name) {
        NAMES.forEach(function (n) { body.classList.remove("theme-" + n); });
        body.classList.add("theme-" + name, "season-sheet");
        body.style.setProperty("--season-sheet", 'url("/images/seasons/' + name + '-tile.svg?v=5")');
    }

    // Pieces live in one fixed, screen-sized layer, so the cost stays the same
    // no matter how long the page is.
    function renderPieces(name) {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        if (!layer) {
            layer = document.createElement("div");
            layer.className = "season-pin";
            layer.setAttribute("aria-hidden", "true");
            body.appendChild(layer);
        }
        var spec = CATALOG[name];
        var rise = spec.motion === "rise";
        var frag = document.createDocumentFragment();
        for (var i = 0; i < spec.count; i++) {
            var piece = pickWeighted(spec.pieces);
            var feel = FEEL[piece] || { style: "snow", size: [20, 30] };
            var style = STYLE[feel.style];
            var duration = rand(style.fall[0], style.fall[1]);
            var bit = document.createElement("span");
            bit.className = "season-piece is-" + feel.style + (rise ? " is-rise" : "");
            bit.style.left = rand(2, 98).toFixed(1) + "%";
            bit.style.animationDuration = duration.toFixed(1) + "s";
            bit.style.animationDelay = (-rand(0, duration)).toFixed(1) + "s";
            bit.style.setProperty("--piece", 'url("/images/seasons/' + piece + '.svg")');
            bit.style.setProperty("--size", Math.round(rand(feel.size[0], feel.size[1])) + "px");
            bit.style.setProperty("--drift", Math.round(rand(-30, 30)) + "px");
            bit.style.setProperty("--spin", Math.round(rand(-1, 1) * style.spin) + "deg");
            bit.style.setProperty("--sway", Math.round(rand(style.sway[0], style.sway[1])) + "px");
            bit.style.setProperty("--beat", rand(style.beat[0], style.beat[1]).toFixed(2) + "s");
            bit.style.setProperty("--beat-delay", (-rand(0, 3)).toFixed(2) + "s");
            bit.style.opacity = rand(0.55, 0.85).toFixed(2);
            frag.appendChild(bit);
        }
        if (spec.flyer) {
            var flyer = document.createElement("span");
            flyer.className = "season-flyer";
            flyer.style.setProperty("--piece", 'url("/images/seasons/' + spec.flyer + '.svg")');
            flyer.style.top = rand(10, 24).toFixed(1) + "vh";
            frag.appendChild(flyer);
        }
        layer.textContent = "";
        layer.appendChild(frag);
    }

    function show(name) {
        if (!isTheme(name) || name === current) return;
        current = name;
        applySkin(name);
        renderPieces(name);
        window.UllimTheme.current = name;
    }

    window.UllimTheme = {
        current: null,
        scheduledTheme: scheduledTheme,
        show: show
    };

    var initial = scheduledTheme();
    applySkin(initial);
    current = null;

    function start() {
        show(initial);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", start);
    } else {
        start();
    }
})();
