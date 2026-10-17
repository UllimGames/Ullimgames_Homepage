/**
 * Applies the month theme from js/theme-schedule.js.
 * A browser-only preview in localStorage wins until it is cleared.
 */
(function () {
    var THEMES = ["spring", "summer", "autumn", "halloween", "christmas", "new-year", "winter"];
    var MOTION = {
        autumn: { count: 6, weights: [["leaf", 100]] },
        halloween: { count: 8, weights: [["pumpkin", 65], ["candy", 20], ["bat", 15]] },
        christmas: { count: 5, weights: [["snow", 65], ["snow-b", 35]], faint: true, rudolph: true },
        winter: { count: 8, weights: [["snow", 65], ["snowman", 35]] },
        "new-year": { count: 8, weights: [["pouch", 65], ["sunrise", 23], ["sheep", 12]] }
    };
    var SIZE = {
        leaf: [30, 44],
        pumpkin: [34, 48],
        candy: [26, 36],
        bat: [28, 40],
        snow: [20, 30],
        "snow-b": [16, 24],
        snowman: [36, 50],
        pouch: [32, 46],
        sunrise: [26, 36],
        sheep: [20, 28]
    };

    function pickWeighted(weights) {
        var total = 0;
        var i;
        for (i = 0; i < weights.length; i++) total += weights[i][1];
        var roll = Math.random() * total;
        var acc = 0;
        for (i = 0; i < weights.length; i++) {
            acc += weights[i][1];
            if (roll < acc) return weights[i][0];
        }
        return weights[0][0];
    }

    function loadSchedule() {
        try {
            var raw = localStorage.getItem("ullim-theme-override");
            if (raw) return JSON.parse(raw);
        } catch (e) {}
        return window.UllimThemeSchedule || null;
    }

    function pick(schedule) {
        if (!schedule) return "autumn";
        if (schedule.manual && THEMES.indexOf(schedule.manual) !== -1) return schedule.manual;
        var month = String(new Date().getMonth() + 1);
        var theme = schedule.months && schedule.months[month];
        if (THEMES.indexOf(theme) === -1) return "autumn";
        return theme;
    }

    var theme = pick(loadSchedule());
    THEMES.forEach(function (name) {
        document.body.classList.remove("theme-" + name);
    });
    document.body.classList.remove("season-autumn", "season-spring", "season-summer", "season-winter");
    document.body.classList.add("theme-" + theme);

    var PATTERNS = {
        autumn: "images/seasons/autumn-pattern.png",
        halloween: "images/seasons/halloween-pattern.png",
        christmas: "images/seasons/christmas-pattern.png",
        winter: "images/seasons/winter-pattern.png",
        "new-year": "images/seasons/new-year-pattern.png"
    };

    function spinFor(piece) {
        var range = {
            leaf: [70, 150],
            "leaf-b": [70, 150],
            snow: [20, 60],
            "snow-b": [12, 40],
            candy: [24, 60],
            bat: [6, 18],
            pumpkin: [6, 18],
            snowman: [4, 14],
            pouch: [4, 14],
            sheep: [4, 14],
            sunrise: [2, 8]
        }[piece] || [8, 20];
        return Math.round(range[0] + Math.random() * (range[1] - range[0])) + "deg";
    }

    function flutterFor(bit, piece) {
        var kind = {
            leaf: ["11px", "8deg", "0px", 2.4, 3.1],
            "leaf-b": ["11px", "8deg", "0px", 2.4, 3.1],
            snow: ["7px", "5deg", "0px", 3.4, 4.6],
            "snow-b": ["6px", "4deg", "0px", 3.6, 4.8],
            candy: ["6px", "6deg", "0px", 2.8, 3.6],
            bat: ["2px", "7deg", "3px", 0.9, 1.25]
        }[piece];
        if (!kind) return;
        bit.style.setProperty("--sway", kind[0]);
        bit.style.setProperty("--tilt", kind[1]);
        bit.style.setProperty("--bob", kind[2]);
        bit.style.setProperty("--flutter", (kind[3] + Math.random() * (kind[4] - kind[3])).toFixed(2) + "s");
        bit.style.setProperty("--flutter-delay", (-Math.random() * 2).toFixed(2) + "s");
    }

    function makePin(kind) {
        var pin = document.createElement("div");
        pin.className = "season-pin season-pin-" + kind;
        pin.setAttribute("aria-hidden", "true");
        document.body.appendChild(pin);
        return pin;
    }

    var motionLayer = null;
    var motionSpec = null;
    var laidHeight = 0;
    var laidView = 0;

    function layoutPieces() {
        if (!motionLayer || !motionSpec) return;
        var spec = motionSpec;
        var viewH = Math.max(window.innerHeight || 800, 320);
        var pageH = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, viewH);
        if (motionLayer.childElementCount && Math.abs(pageH - laidHeight) < 40 && Math.abs(viewH - laidView) < 40) return;
        laidHeight = pageH;
        laidView = viewH;
        var screens = Math.max(1, Math.ceil(pageH / viewH));
        var travel = pageH + 160;
        var seconds = Math.max(18, 14 * (travel / viewH));
        motionLayer.innerHTML = "";
        var n = spec.count * screens;
        var i;
        for (i = 0; i < n; i++) {
            var piece = pickWeighted(spec.weights);
            var range = SIZE[piece] || [28, 42];
            var bit = document.createElement("span");
            var duration = seconds * (0.88 + Math.random() * 0.24);
            bit.className = "season-piece is-" + piece;
            bit.style.left = Math.random() * 100 + "%";
            bit.style.top = "-48px";
            bit.style.animationDuration = duration.toFixed(1) + "s";
            bit.style.animationDelay = (-Math.random() * duration).toFixed(1) + "s";
            bit.style.setProperty("--drift", Math.round(Math.random() * 80 - 40) + "px");
            bit.style.setProperty("--spin", spinFor(piece));
            bit.style.setProperty("--size", Math.round(range[0] + Math.random() * (range[1] - range[0])) + "px");
            bit.style.setProperty("--fall", Math.round(travel) + "px");
            flutterFor(bit, piece);
            bit.style.opacity = spec.faint
                ? (0.20 + Math.random() * 0.12).toFixed(2)
                : (0.32 + Math.random() * 0.14).toFixed(2);
            motionLayer.appendChild(bit);
        }
    }

    function startMotion() {
        var spec = MOTION[theme];
        var pattern = PATTERNS[theme];
        if (!spec && !pattern) return;

        if (pattern) {
            document.body.classList.add("season-sheet");
            document.body.style.setProperty("--season-sheet", "url(\"/" + pattern + "?v=even1\")");
        }

        var motionOff = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (spec && !motionOff && !motionLayer) {
            var front = makePin("front");
            motionLayer = document.createElement("div");
            motionLayer.className = "season-fall";
            motionSpec = spec;
            front.appendChild(motionLayer);
            layoutPieces();

            if (spec.rudolph) {
                var deer = document.createElement("div");
                deer.className = "season-rudolph";
                front.appendChild(deer);
            }
        }
    }

    var resizeTimer = 0;
    window.addEventListener("resize", function () {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(layoutPieces, 200);
    });
    window.addEventListener("load", layoutPieces);

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", startMotion);
    } else {
        startMotion();
    }
})();
