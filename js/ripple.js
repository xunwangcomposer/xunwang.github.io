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

    let nextInterval = randomBetween(40, 160);


    function randomBetween(min, max) {

        return min + Math.random() * (max - min);

    }


    function spawnRipple(x, y) {

        const dot = document.createElement("div");

        dot.className = "ripple-dot";

        // random jitter so ripples don't trace a perfectly even line
        const jitterX = randomBetween(-10, 10);
        const jitterY = randomBetween(-10, 10);

        dot.style.left = (x + jitterX) + "px";
        dot.style.top = (y + jitterY) + "px";

        // random size and duration for a less uniform, more organic feel
        const size = randomBetween(8, 26);

        dot.style.width = size + "px";
        dot.style.height = size + "px";
        dot.style.marginLeft = (-size / 2) + "px";
        dot.style.marginTop = (-size / 2) + "px";

        dot.style.animationDuration = randomBetween(0.8, 1.6) + "s";
        dot.style.setProperty("--peak-opacity", randomBetween(0.5, 0.95));

        layer.appendChild(dot);

        dot.addEventListener("animationend", () => {

            dot.remove();

        });

        // Safety cleanup in case animationend doesn't fire
        // (e.g. tab loses focus mid-animation)
        setTimeout(() => {

            if (dot.parentNode) dot.remove();

        }, 2200);

    }


    function handleMove(x, y) {

        const now = performance.now();

        if (now - lastSpawn > nextInterval) {

            spawnRipple(x, y);

            lastSpawn = now;
            nextInterval = randomBetween(40, 160);

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
