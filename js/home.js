/**
 * Home page only: main visual slider.
 * Only the visible slide's video loads and plays, so the other videos
 * do not download until the visitor reaches them.
 */
(function () {
    "use strict";

    function init() {
        var root = document.querySelector(".mainSwiper");
        if (!root || !window.Swiper) return;

        var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        var pauseBtn = document.getElementById("visualPauseBtn");
        var paused = reduceMotion;

        function videos() {
            return root.querySelectorAll("video");
        }

        function syncVideos(swiper) {
            var active = swiper.slides[swiper.activeIndex];
            videos().forEach(function (video) {
                var isActive = active && active.contains(video);
                if (isActive && !paused) {
                    if (video.preload !== "auto") video.preload = "auto";
                    var playing = video.play();
                    if (playing && playing.catch) playing.catch(function () {});
                } else {
                    video.pause();
                }
            });
        }

        var swiper = new window.Swiper(root, {
            loop: true,
            autoplay: reduceMotion ? false : { delay: 8000, disableOnInteraction: false },
            navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
            pagination: { el: ".swiper-pagination", clickable: true },
            a11y: {
                prevSlideMessage: "이전 영상",
                nextSlideMessage: "다음 영상",
                paginationBulletMessage: "{{index}}번째 영상으로 이동",
            },
            on: {
                init: syncVideos,
                slideChange: syncVideos,
            },
        });

        function renderPauseButton() {
            if (!pauseBtn) return;
            pauseBtn.setAttribute("aria-pressed", paused ? "true" : "false");
            pauseBtn.setAttribute("aria-label", paused ? "영상 재생" : "영상 일시정지");
            pauseBtn.classList.toggle("is-paused", paused);
        }

        if (pauseBtn) {
            pauseBtn.addEventListener("click", function () {
                paused = !paused;
                if (swiper.autoplay) {
                    if (paused) swiper.autoplay.stop();
                    else if (!reduceMotion) swiper.autoplay.start();
                }
                syncVideos(swiper);
                renderPauseButton();
            });
        }
        renderPauseButton();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
