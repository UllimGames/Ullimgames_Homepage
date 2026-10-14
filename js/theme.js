/**
 * Applies the month theme from js/theme-schedule.js.
 * A browser-only preview in localStorage wins until it is cleared.
 */
(function () {
    var THEMES = ["spring", "summer", "autumn", "halloween", "christmas", "new-year", "winter"];
    var MOTION = {
        autumn: { count: 8, weights: [["leaf", 100]] },
        halloween: { count: 10, weights: [["pumpkin", 65], ["candy", 20], ["bat", 15]] },
        christmas: { count: 7, weights: [["snow", 65], ["snow-b", 35]], faint: true, rudolph: true },
        winter: { count: 11, weights: [["snow", 65], ["snowman", 35]] },
        "new-year": { count: 10, weights: [["pouch", 65], ["sunrise", 23], ["sheep", 12]] }
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

    function makePin(kind) {
        var pin = document.createElement("div");
        pin.className = "season-pin season-pin-" + kind;
        pin.setAttribute("aria-hidden", "true");
        document.body.appendChild(pin);
        return pin;
    }

    function startMotion() {
        var spec = MOTION[theme];
        var pattern = PATTERNS[theme];
        if (!spec && !pattern) return;
        if (document.querySelector(".season-pin")) return;

        if (pattern) {
            document.body.classList.add("season-sheet");
            document.body.style.setProperty("--season-sheet", "url(\"/" + pattern + "\")");
        }

        var motionOff = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (spec && !motionOff) {
            var front = makePin("front");
            var layer = document.createElement("div");
            layer.className = "season-fall";

            for (var i = 0; i < spec.count; i++) {
                var piece = pickWeighted(spec.weights);
                var range = SIZE[piece] || [28, 42];
                var bit = document.createElement("span");
                bit.className = "season-piece is-" + piece;
                bit.style.left = Math.random() * 100 + "%";
                bit.style.animationDuration = 12 + Math.random() * 10 + "s";
                bit.style.animationDelay = -Math.random() * 16 + "s";
                bit.style.setProperty("--drift", Math.round(Math.random() * 80 - 40) + "px");
                bit.style.setProperty("--spin", Math.round(80 + Math.random() * 200) + "deg");
                bit.style.setProperty("--size", Math.round(range[0] + Math.random() * (range[1] - range[0])) + "px");
                bit.style.opacity = spec.faint
                    ? (0.34 + Math.random() * 0.16).toFixed(2)
                    : (0.58 + Math.random() * 0.22).toFixed(2);
                layer.appendChild(bit);
            }
            front.appendChild(layer);

            if (spec.rudolph) {
                var deer = document.createElement("div");
                deer.className = "season-rudolph";
                front.appendChild(deer);
            }
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", startMotion);
    } else {
        startMotion();
    }
})();
