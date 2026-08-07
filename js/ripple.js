/*==================================================
    Ripple
    A soft water-ripple trail that follows the
    cursor (or finger, on touch) across the
    homepage background.
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const canvas = document.getElementById("rippleCanvas");

    if (!canvas) return;

    const prefersReducedMotion =
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const ctx = canvas.getContext("2d");

    let width, height;

    let ripples = [];

    let lastSpawn = 0;

    const SPAWN_INTERVAL = 55;   // ms between ripples while moving
    const MAX_RADIUS = 130;
    const GROWTH = 1.6;
    const FADE = 0.012;


    function resize() {

        const rect = canvas.parentElement.getBoundingClientRect();

        width = rect.width;
        height = rect.height;

        canvas.width = width * window.devicePixelRatio;
        canvas.height = height * window.devicePixelRatio;

        canvas.style.width = width + "px";
        canvas.style.height = height + "px";

        ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);

    }

    resize();

    window.addEventListener("resize", resize);


    function spawnRipple(x, y) {

        ripples.push({

            x,
            y,
            radius: 0,
            opacity: 0.32

        });

    }


    function handleMove(x, y) {

        const now = performance.now();

        if (now - lastSpawn > SPAWN_INTERVAL) {

            spawnRipple(x, y);

            lastSpawn = now;

        }

    }


    window.addEventListener("mousemove", (e) => {

        const rect = canvas.getBoundingClientRect();

        handleMove(e.clientX - rect.left, e.clientY - rect.top);

    });


    window.addEventListener("touchmove", (e) => {

        if (!e.touches || !e.touches.length) return;

        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];

        handleMove(touch.clientX - rect.left, touch.clientY - rect.top);

    }, { passive: true });


    function draw() {

        ctx.clearRect(0, 0, width, height);

        ripples.forEach((r) => {

            r.radius += GROWTH;
            r.opacity -= FADE;

            if (r.opacity <= 0) return;

            const gradient = ctx.createRadialGradient(
                r.x, r.y, Math.max(r.radius - 8, 0),
                r.x, r.y, r.radius
            );

            gradient.addColorStop(0, "rgba(255,255,255,0)");
            gradient.addColorStop(0.85, `rgba(255,255,255,${r.opacity})`);
            gradient.addColorStop(1, "rgba(255,255,255,0)");

            ctx.beginPath();
            ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1.4;
            ctx.stroke();

        });

        ripples = ripples.filter((r) => r.opacity > 0 && r.radius < MAX_RADIUS);

        requestAnimationFrame(draw);

    }

    draw();

});
