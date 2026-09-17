/* =========================================================
   HAMIDEV — INTERACTIONS
========================================================= */


/* =========================================================
   NAVBAR
========================================================= */

const navbar = document.getElementById("navbar");

function handleNavbar() {

    if (window.scrollY > 40) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
}

window.addEventListener("scroll", handleNavbar);

handleNavbar();


/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("open");

});


/* Close mobile menu when clicking a link */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
    });

});


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach((entry, index) => {

            if (!entry.isIntersecting) {
                return;
            }

            /*
             * Small stagger effect.
             * Makes groups of elements appear naturally.
             */

            const delay = Math.min(index * 60, 300);

            setTimeout(() => {
                entry.target.classList.add("visible");
            }, delay);

            observer.unobserve(entry.target);

        });

    },
    {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px"
    }
);

revealElements.forEach(element => {
    revealObserver.observe(element);
});


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) {
                return;
            }

            const id = entry.target.getAttribute("id");

            navItems.forEach(link => {

                link.classList.remove("active");

                if (link.getAttribute("href") === `#${id}`) {
                    link.classList.add("active");
                }

            });

        });

    },
    {
        threshold: 0.25,
        rootMargin: "-20% 0px -60% 0px"
    }
);

sections.forEach(section => {
    sectionObserver.observe(section);
});


/* =========================================================
   COUNTERS
========================================================= */

const counters = document.querySelectorAll(".counter");

function animateCounter(counter) {

    const target = Number(counter.dataset.target);

    let current = 0;

    const duration = 1300;
    const startTime = performance.now();

    function update(currentTime) {

        const elapsed = currentTime - startTime;

        const progress = Math.min(elapsed / duration, 1);

        /*
         * Ease-out animation
         */

        const eased =
            1 - Math.pow(1 - progress, 3);

        current = Math.floor(target * eased);

        counter.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            counter.textContent = target;
        }

    }

    requestAnimationFrame(update);
}


const counterObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) {
                return;
            }

            animateCounter(entry.target);

            counterObserver.unobserve(entry.target);

        });

    },
    {
        threshold: 0.7
    }
);

counters.forEach(counter => {
    counterObserver.observe(counter);
});


/* =========================================================
   BACK TO TOP
========================================================= */

const backTop = document.getElementById("backTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 700) {
        backTop.classList.add("visible");
    } else {
        backTop.classList.remove("visible");
    }

});

backTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================================================
   FOOTER YEAR
========================================================= */

const year = document.getElementById("year");

year.textContent = new Date().getFullYear();


/* =========================================================
   SUBTLE MOUSE PARALLAX
========================================================= */

const heroVisual = document.querySelector(".hero-visual");

if (heroVisual && window.matchMedia("(pointer: fine)").matches) {

    heroVisual.addEventListener("mousemove", event => {

        const rect = heroVisual.getBoundingClientRect();

        const x =
            (event.clientX - rect.left) / rect.width - 0.5;

        const y =
            (event.clientY - rect.top) / rect.height - 0.5;

        const codeWindow =
            heroVisual.querySelector(".code-window");

        if (!codeWindow) return;

        codeWindow.style.transform = `
            perspective(900px)
            rotateY(${x * 8}deg)
            rotateX(${y * -6}deg)
        `;

    });


    heroVisual.addEventListener("mouseleave", () => {

        const codeWindow =
            heroVisual.querySelector(".code-window");

        if (!codeWindow) return;

        codeWindow.style.transform = `
            perspective(900px)
            rotateY(-5deg)
            rotateX(3deg)
        `;

    });

}


/* =========================================================
   PROJECT CARD TILT
========================================================= */

const projectCards =
    document.querySelectorAll(".project-card");

if (window.matchMedia("(pointer: fine)").matches) {

    projectCards.forEach(card => {

        card.addEventListener("mousemove", event => {

            const rect = card.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) / rect.width;

            const y =
                (event.clientY - rect.top) / rect.height;

            const rotateX = (0.5 - y) * 3;
            const rotateY = (x - 0.5) * 3;

            card.style.transform = `
                perspective(900px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-5px)
            `;

        });


        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });

}


/* =========================================================
   KEYBOARD ACCESSIBILITY
========================================================= */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        navLinks.classList.remove("open");
    }

});


/* =========================================================
   CURSOR GLOW
========================================================= */

if (window.matchMedia("(pointer: fine)").matches) {

    const cursorGlow = document.createElement("div");

    cursorGlow.style.position = "fixed";
    cursorGlow.style.width = "180px";
    cursorGlow.style.height = "180px";
    cursorGlow.style.borderRadius = "50%";
    cursorGlow.style.pointerEvents = "none";
    cursorGlow.style.zIndex = "-1";
    cursorGlow.style.background =
        "radial-gradient(circle, rgba(0,170,255,.06), transparent 65%)";
    cursorGlow.style.transform = "translate(-50%, -50%)";
    cursorGlow.style.left = "0";
    cursorGlow.style.top = "0";
    cursorGlow.style.transition = "opacity .3s ease";

    document.body.appendChild(cursorGlow);


    window.addEventListener("mousemove", event => {

        cursorGlow.style.left = `${event.clientX}px`;
        cursorGlow.style.top = `${event.clientY}px`;

    });

}