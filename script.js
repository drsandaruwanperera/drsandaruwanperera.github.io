/* =====================================================
   MAIN SITE INTERACTIONS + DARK / DAY MODE
===================================================== */
(() => {
    const loadEnhancementCSS = () => {
        if (document.querySelector('link[href="site-enhancements.css"]')) return;
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "site-enhancements.css";
        document.head.appendChild(link);
    };
    loadEnhancementCSS();

    if (!document.querySelector(".skip-link")) {
        const skip = document.createElement("a");
        skip.className = "skip-link";
        skip.href = "#main-content";
        skip.textContent = "Skip to content";
        document.body.prepend(skip);
    }

    const main = document.querySelector("main");
    if (main && !main.id) main.id = "main-content";

    /* Mobile navigation */
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

    /* Active navigation */
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
            link.classList.toggle("active", link.getAttribute("href") === `#${currentSection}`);
        });
    }

    window.addEventListener("scroll", updateActiveNavigation, { passive: true });

    /* Scroll reveal */
    const revealElements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale");
    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add("visible");
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });

        revealElements.forEach(element => revealObserver.observe(element));
    } else {
        revealElements.forEach(element => element.classList.add("visible"));
    }

    /* FAQ accordion */
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach(item => {
        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");
        if (!question || !answer) return;

        question.tabIndex = 0;
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

    /* Back to top */
    const backTop = document.getElementById("backTop");
    if (backTop) {
        const updateBackTop = () => backTop.classList.toggle("show", window.scrollY > 500);
        window.addEventListener("scroll", updateBackTop, { passive: true });
        backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
        updateBackTop();
    }

    /* Header shadow */
    const header = document.getElementById("header");
    if (header) {
        const updateHeader = () => {
            const dark = document.documentElement.classList.contains("site-dark");
            header.style.boxShadow = window.scrollY > 20
                ? (dark ? "0 8px 30px rgba(0,0,0,.28)" : "0 8px 30px rgba(30,30,100,.08)")
                : "none";
        };
        window.addEventListener("scroll", updateHeader, { passive: true });
        window.addEventListener("themechange", updateHeader);
        updateHeader();
    }

    /* Smooth anchor scrolling */
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

    /* Hero visual motion */
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

    /* Hero portrait */
    const portraitWrap = document.querySelector(".portrait-photo-wrap");
    const heroPhoto = document.querySelector(".hero-photo");

    function shapeHeroPortrait() {
        if (!portraitWrap || !heroPhoto) return;
        const mobile = window.innerWidth < 700;
        const tablet = window.innerWidth >= 700 && window.innerWidth < 1000;
        const size = mobile ? Math.min(window.innerWidth * 0.82, 380) : tablet ? 430 : 500;

        portraitWrap.style.width = `${size}px`;
        portraitWrap.style.height = `${size}px`;
        portraitWrap.style.borderRadius = "50%";
        portraitWrap.style.overflow = "hidden";
        portraitWrap.style.left = "50%";
        portraitWrap.style.bottom = "0";
        portraitWrap.style.transform = "translateX(-50%)";
        portraitWrap.style.zIndex = "2";

        heroPhoto.style.width = "100%";
        heroPhoto.style.height = "100%";
        heroPhoto.style.objectFit = "cover";
        heroPhoto.style.objectPosition = "center top";
    }

    shapeHeroPortrait();
    window.addEventListener("resize", shapeHeroPortrait, { passive: true });

    /* Image performance */
    document.querySelectorAll("img").forEach(img => {
        if (!img.classList.contains("hero-photo") && !img.hasAttribute("loading")) img.loading = "lazy";
        if (!img.hasAttribute("decoding")) img.decoding = "async";
    });

    const footerYear = document.getElementById("footerYear");
    if (footerYear) footerYear.textContent = new Date().getFullYear();

    /* =====================================================
       DARK / DAY MODE
       Language selector intentionally removed.
    ===================================================== */
    const navActions = document.querySelector(".nav-actions");

    function getPreferredTheme() {
        const saved = localStorage.getItem("siteTheme");
        if (saved === "dark" || saved === "light") return saved;
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    function applyTheme(theme) {
        const dark = theme === "dark";
        document.documentElement.classList.toggle("site-dark", dark);
        document.documentElement.classList.toggle("site-light", !dark);
        document.documentElement.style.colorScheme = dark ? "dark" : "light";

        const themeToggle = document.getElementById("themeToggle");
        if (themeToggle) {
            themeToggle.classList.toggle("is-dark", dark);
            themeToggle.setAttribute("aria-pressed", String(dark));
            themeToggle.setAttribute("aria-label", dark ? "Switch to Day Mode" : "Switch to Dark Mode");
            themeToggle.title = dark ? "Switch to Day Mode" : "Switch to Dark Mode";
            themeToggle.innerHTML = dark
                ? '<i class="fa-solid fa-sun"></i><span>Day</span>'
                : '<i class="fa-solid fa-moon"></i><span>Dark</span>';
        }

        window.dispatchEvent(new Event("themechange"));
    }

    if (navActions && !document.getElementById("themeToggle")) {
        const control = document.createElement("div");
        control.className = "site-controls";
        control.innerHTML = `
            <button class="theme-toggle" id="themeToggle" type="button" aria-pressed="false">
                <i class="fa-solid fa-moon"></i>
                <span>Dark</span>
            </button>
        `;
        navActions.insertBefore(control, navActions.firstChild);
    }

    const initialTheme = getPreferredTheme();
    applyTheme(initialTheme);

    const themeToggle = document.getElementById("themeToggle");
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const nextTheme = document.documentElement.classList.contains("site-dark") ? "light" : "dark";
            localStorage.setItem("siteTheme", nextTheme);
            applyTheme(nextTheme);
        });
    }

    /* Follow OS theme only until the visitor explicitly chooses a mode. */
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = event => {
        if (localStorage.getItem("siteTheme")) return;
        applyTheme(event.matches ? "dark" : "light");
    };

    if (systemTheme.addEventListener) {
        systemTheme.addEventListener("change", handleSystemThemeChange);
    } else if (systemTheme.addListener) {
        systemTheme.addListener(handleSystemThemeChange);
    }

    updateActiveNavigation();
})();
