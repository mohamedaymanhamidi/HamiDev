
/* =========================================================
   HAMIDEV
   Main JavaScript
   ========================================================= */


/* ================= NAVBAR ================= */

const navbar = document.getElementById("navbar");

function handleNavbar() {

    if (window.scrollY > 30) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

}

window.addEventListener("scroll", handleNavbar);

handleNavbar();


/* ================= MOBILE MENU ================= */

const mobileMenu = document.getElementById("mobileMenu");
const navLinks = document.getElementById("navLinks");

mobileMenu.addEventListener("click", () => {

    navLinks.classList.toggle("open");

    document.body.classList.toggle("menu-open");

});


/* Close menu after clicking a link */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("open");

        document.body.classList.remove("menu-open");

    });

});


/* ================= ACTIVE NAVIGATION ================= */

const sections = document.querySelectorAll("section[id]");
const navigationLinks = document.querySelectorAll(".nav-links a");

function updateActiveNavigation() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 140;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });


    navigationLinks.forEach(link => {

        link.classList.remove("active");

        const target =
            link.getAttribute("href").substring(1);

        if (target === currentSection) {
            link.classList.add("active");
        }

    });

}

window.addEventListener(
    "scroll",
    updateActiveNavigation
);

updateActiveNavigation();


/* ================= REVEAL ANIMATION ================= */

const revealElements = document.querySelectorAll(
    ".service-card, .process-item, .project-card, .about-content, .about-visual"
);

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "revealed"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(25px)";

    element.style.transition =
        "opacity 700ms ease, transform 700ms ease";

    revealObserver.observe(element);

});


/* ================= REVEAL STATE ================= */

const revealStyle =
document.createElement("style");

revealStyle.textContent = `

    .revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }

`;

document.head.appendChild(revealStyle);


/* ================= YEAR ================= */

const currentYear =
    new Date().getFullYear();

const footerYear =
    document.querySelector(".footer-bottom span");

if (footerYear) {

    footerYear.textContent =
        `© ${currentYear} Hamidev. All rights reserved.`;

}


/* ================= SMOOTH BUTTON FEEDBACK ================= */

document.querySelectorAll("a[href^='#']").forEach(anchor => {

    anchor.addEventListener("click", function(event) {

        const target =
            document.querySelector(
                this.getAttribute("href")
            );

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth"
        });

    });

});


/* ================= PROJECT HOVER ================= */

document.querySelectorAll(".project-card").forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.setProperty(
            "--project-hover",
            "1"
        );

    });

    card.addEventListener("mouseleave", () => {

        card.style.setProperty(
            "--project-hover",
            "0"
        );

    });

});
