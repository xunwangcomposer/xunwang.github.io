/*==================================================
    Ripple
    A soft water-ripple trail that follows the
    cursor (or finger, on touch) across the
    homepage. Implemented as plain DOM elements
    animated with CSS, so it doesn't depend on
    canvas sizing/layering quirks.
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const layer = document.getElementById("rippleLayer");

    if (!layer) return;

    const prefersReducedMotion =
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    let lastSpawn = 0;

    const SPAWN_INTERVAL = 60; // ms between ripples while moving


    function spawnRipple(x, y) {

        const dot = document.createElement("div");

        dot.className = "ripple-dot";
        dot.style.left = x + "px";
        dot.style.top = y + "px";

        layer.appendChild(dot);

        dot.addEventListener("animationend", () => {

            dot.remove();

        });

        // Safety cleanup in case animationend doesn't fire
        // (e.g. tab loses focus mid-animation)
        setTimeout(() => {

            if (dot.parentNode) dot.remove();

        }, 2000);

    }


    function handleMove(x, y) {

        const now = performance.now();

        if (now - lastSpawn > SPAWN_INTERVAL) {

            spawnRipple(x, y);

            lastSpawn = now;

        }

    }


    window.addEventListener("mousemove", (e) => {

        handleMove(e.clientX, e.clientY);

    });


    window.addEventListener("touchmove", (e) => {

        if (!e.touches || !e.touches.length) return;

        const touch = e.touches[0];

        handleMove(touch.clientX, touch.clientY);

    }, { passive: true });

});
