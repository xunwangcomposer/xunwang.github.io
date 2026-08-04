// =========================================
// Liquid Glass Effect
// =========================================

function initLiquid() {

    const glass = document.querySelector(".glass-menu");

    if (!glass) return;

    glass.addEventListener("mousemove", (e) => {

        const rect = glass.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        const rx = (x / rect.width - 0.5) * 12;
        const ry = (y / rect.height - 0.5) * -12;

        glass.style.transform =
            `perspective(900px)
             rotateX(${ry}deg)
             rotateY(${rx}deg)
             scale(1.02)`;

        glass.style.backgroundPosition =
            `${50 + rx}% ${50 + ry}%`;

    });

    glass.addEventListener("mouseleave", () => {

        glass.style.transform =
            "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";

        glass.style.backgroundPosition =
            "50% 50%";

    });

}
