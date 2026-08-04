/*==================================================
    Xun Wang Portfolio
    parallax.js
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const background = document.querySelector(".background-image");

    const bloom = document.querySelector(".hero-bloom");

    const heroArt = document.querySelector(".hero-art");

    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;

    document.addEventListener("mousemove", (e) => {

        mouseX = (e.clientX / window.innerWidth - 0.5);

        mouseY = (e.clientY / window.innerHeight - 0.5);

    });

    function animate() {

        currentX += (mouseX - currentX) * 0.05;

        currentY += (mouseY - currentY) * 0.05;

        if (background) {

            background.style.transform =

                `translate(calc(-50% + ${currentX * 25}px),

                           calc(-50% + ${currentY * 25}px))

                 scale(1.02)`;

        }

        if (heroArt) {

            heroArt.style.transform =

                `translate(${currentX * 12}px,

                           ${currentY * 12}px)`;

        }

        if (bloom) {

            bloom.style.transform =

                `translate(${currentX * 40}px,

                           ${currentY * 40}px)`;

        }

        requestAnimationFrame(animate);

    }

    animate();

});
