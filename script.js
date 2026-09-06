/* =====================================================
   FINAL SITE ENHANCEMENTS
===================================================== */

/* Load the final CSS polish without changing the existing page markup. */
(() => {
    if (!document.querySelector('link[href="site-enhancements.css"]')) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "site-enhancements.css";
        document.head.appendChild(link);
    }

    if (!document.querySelector(".skip-link")) {
        const skip = document.createElement("a");
        skip.className = "skip-link";
        skip.href = "#main-content";
        skip.textContent = "Skip to content";
        document.body.prepend(skip);
    }

    const main = document.querySelector("main");
    if (main && !main.id) main.id = "main-content";
})();

/* =====================================================
   MOBILE NAVIGATION
===================================================== */

const menuBtn = document.getElementById("menuBtn");
const mainNav = document.getElementById("mainNav");

function closeMobileMenu() {
    if (!mainNav || !menuBtn) return;
    mainNav.classList.remove("open");
    const icon = menuBtn.querySelector("i");
    if (icon) {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }
    document.body.classList.remove("menu-open");
}

if (menuBtn && mainNav) {
    menuBtn.addEventListener("click", () => {
        const open = mainNav.classList.toggle("open");
        const icon = menuBtn.querySelector("i");

        if (icon) {
            icon.classList.toggle("fa-bars", !open);
            icon.classList.toggle("fa-xmark", open);
        }

        document.body.classList.toggle("menu-open", open);
    });

    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", closeMobileMenu);
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") closeMobileMenu();
    });
}

/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveNavigation() {
    let currentSection = "home";
    const scrollPosition = window.scrollY + 170;

    sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        if (scrollPosition >= top && scrollPosition < bottom) {
            currentSection = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${currentSection}`
        );
    });
}

window.addEventListener("scroll", updateActiveNavigation, { passive: true });

/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right, .reveal-scale"
);

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                } else {
                    entry.target.classList.remove("visible");
                }
            });
        },
        { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    revealElements.forEach(element => revealObserver.observe(element));
} else {
    revealElements.forEach(element => element.classList.add("visible"));
}

/* =====================================================
   FAQ - accessible keyboard support
===================================================== */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    if (!question || !answer) return;

    if (!question.hasAttribute("tabindex")) question.setAttribute("tabindex", "0");
    question.setAttribute("role", "button");
    question.setAttribute("aria-expanded", "false");

    const toggleFaq = () => {
        const isActive = item.classList.contains("active");

        faqItems.forEach(otherItem => {
            otherItem.classList.remove("active");
            const otherAnswer = otherItem.querySelector(".faq-answer");
            const otherQuestion = otherItem.querySelector(".faq-question");
            if (otherAnswer) otherAnswer.style.maxHeight = null;
            if (otherQuestion) otherQuestion.setAttribute("aria-expanded", "false");
        });

        if (!isActive) {
            item.classList.add("active");
            answer.style.maxHeight = `${answer.scrollHeight}px`;
            question.setAttribute("aria-expanded", "true");
        }
    };

    question.addEventListener("click", toggleFaq);
    question.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggleFaq();
        }
    });
});

/* =====================================================
   BACK TO TOP
===================================================== */

const backTop = document.getElementById("backTop");

if (backTop) {
    const updateBackTop = () => {
        backTop.classList.toggle("show", window.scrollY > 500);
    };

    window.addEventListener("scroll", updateBackTop, { passive: true });
    backTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
    updateBackTop();
}

/* =====================================================
   HEADER SHADOW
===================================================== */

const header = document.getElementById("header");

if (header) {
    const updateHeader = () => {
        header.style.boxShadow = window.scrollY > 20
            ? "0 8px 30px rgba(30,30,100,.08)"
            : "none";
    };

    window.addEventListener("scroll", updateHeader, { passive: true });
    updateHeader();
}

/* =====================================================
   INTERNAL SMOOTH LINKS
===================================================== */

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
        const targetId = link.getAttribute("href");
        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);
        if (!target) return;

        event.preventDefault();
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

        window.scrollTo({ top: targetPosition, behavior: "smooth" });
    });
});

/* =====================================================
   HERO PROFILE CARD PARALLAX
===================================================== */

const heroVisual = document.querySelector(".hero-visual");
const profileCard = document.querySelector(".profile-card");

if (heroVisual && profileCard) {
    heroVisual.addEventListener("mousemove", event => {
        if (window.innerWidth < 900 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const rect = heroVisual.getBoundingClientRect();
        const moveX = (event.clientX - rect.left) / rect.width * 8 - 4;
        const moveY = (event.clientY - rect.top) / rect.height * 8 - 4;

        profileCard.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    heroVisual.addEventListener("mouseleave", () => {
        profileCard.style.transform = "translate(0,0)";
    });
}

/* =====================================================
   IMAGE PERFORMANCE
===================================================== */

document.querySelectorAll("img").forEach(img => {
    if (!img.classList.contains("hero-photo") && !img.hasAttribute("loading")) {
        img.loading = "lazy";
    }
    if (!img.hasAttribute("decoding")) img.decoding = "async";
});

/* =====================================================
   FOOTER YEAR
===================================================== */

const footerYear = document.getElementById("footerYear");
if (footerYear) footerYear.textContent = new Date().getFullYear();

/* =====================================================
   INITIAL
===================================================== */

updateActiveNavigation();
