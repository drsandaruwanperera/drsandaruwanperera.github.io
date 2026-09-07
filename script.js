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

    /* Complete theme layer. Kept here so the mode works across every section
       without changing the existing site layout or content. */
    if (!document.getElementById("siteThemeStyles")) {
        const style = document.createElement("style");
        style.id = "siteThemeStyles";
        style.textContent = `
            html.site-light { color-scheme: light; }
            html.site-dark { color-scheme: dark; }
            body, .header, section, footer, [class*="-card"], .faq-item, .contact-card,
            .feature-strip, .schedule-section, .results-section, .about-section,
            .testimonials-section, .resources-section, .gallery-section, .faq-section,
            .contact-section, .footer, .nav, .theme-toggle {
                transition: background-color .28s ease, color .28s ease, border-color .28s ease, box-shadow .28s ease;
            }

            html.site-dark body {
                background:#0b1020 !important;
                color:#edf2ff !important;
            }
            html.site-dark body::before,
            html.site-dark body::after { opacity:.45; }

            html.site-dark .header {
                background:rgba(11,16,32,.94) !important;
                border-bottom-color:rgba(255,255,255,.08) !important;
                backdrop-filter:blur(18px);
            }
            html.site-dark .brand-text strong,
            html.site-dark .nav-link,
            html.site-dark h1,
            html.site-dark h2,
            html.site-dark h3,
            html.site-dark h4,
            html.site-dark strong { color:#f4f7ff !important; }
            html.site-dark .brand-text span,
            html.site-dark p,
            html.site-dark .section-heading p,
            html.site-dark .results-heading p,
            html.site-dark .schedule-info p,
            html.site-dark .student-info span,
            html.site-dark .faq-answer,
            html.site-dark .contact-item span,
            html.site-dark .footer p,
            html.site-dark .footer a { color:#aeb8ce !important; }

            html.site-dark .hero,
            html.site-dark .programs-section,
            html.site-dark .schedule-section,
            html.site-dark .results-section,
            html.site-dark .about-section,
            html.site-dark .testimonials-section,
            html.site-dark .resources-section,
            html.site-dark .gallery-section,
            html.site-dark .faq-section,
            html.site-dark .contact-section {
                background:#0b1020 !important;
            }
            html.site-dark .feature-strip {
                background:#11182a !important;
                border-color:rgba(255,255,255,.08) !important;
            }

            html.site-dark .program-card,
            html.site-dark .schedule-card,
            html.site-dark .big-stat-card,
            html.site-dark .achievement-card,
            html.site-dark .testimonial-card,
            html.site-dark .resource-card,
            html.site-dark .gallery-card,
            html.site-dark .faq-item,
            html.site-dark .contact-card,
            html.site-dark .profile-card,
            html.site-dark .feature-item,
            html.site-dark .results-heading-badge {
                background:#131b2f !important;
                border-color:rgba(255,255,255,.09) !important;
                box-shadow:0 12px 34px rgba(0,0,0,.20) !important;
            }

            html.site-dark .program-card:hover,
            html.site-dark .schedule-card:hover,
            html.site-dark .big-stat-card:hover,
            html.site-dark .achievement-card:hover,
            html.site-dark .testimonial-card:hover,
            html.site-dark .resource-card:hover,
            html.site-dark .gallery-card:hover {
                background:#18233b !important;
                border-color:rgba(132,120,255,.35) !important;
            }

            html.site-dark .nav {
                background:rgba(15,22,38,.98) !important;
                border-color:#2a354d !important;
                box-shadow:0 20px 55px rgba(0,0,0,.34) !important;
            }
            html.site-dark .nav-link:hover,
            html.site-dark .nav-link.active {
                background:#222d48 !important;
                color:#fff !important;
            }
            html.site-dark .menu-btn { color:#f4f7ff !important; }

            html.site-dark .btn-outline,
            html.site-dark .text-btn {
                color:#c7cfff !important;
                border-color:rgba(255,255,255,.18) !important;
            }
            html.site-dark .btn-outline:hover {
                background:#1b2540 !important;
                color:#fff !important;
            }

            html.site-dark input,
            html.site-dark textarea,
            html.site-dark select {
                background:#111a2c !important;
                color:#f4f7ff !important;
                border-color:#303b54 !important;
            }
            html.site-dark input::placeholder,
            html.site-dark textarea::placeholder { color:#77839c !important; }

            html.site-dark .footer,
            html.site-dark footer { background:#080d19 !important; }
            html.site-dark hr { border-color:rgba(255,255,255,.08) !important; }

            .site-controls {
                display:flex;
                align-items:center;
                flex-shrink:0;
                margin-right:2px;
            }
            .theme-toggle {
                min-width:86px;
                height:36px;
                padding:0 12px;
                border:1px solid #dfe4ee;
                border-radius:999px;
                background:#f5f7fb;
                color:#20283a;
                display:inline-flex;
                align-items:center;
                justify-content:center;
                gap:8px;
                cursor:pointer;
                font:700 11px/1 Inter,Arial,sans-serif;
                box-shadow:0 4px 14px rgba(30,40,80,.08);
            }
            .theme-toggle:hover { transform:translateY(-1px); background:#eef1f8; }
            .theme-toggle i { font-size:14px; }
            html.site-dark .theme-toggle {
                background:#182239 !important;
                color:#ffe596 !important;
                border-color:#33415f !important;
                box-shadow:0 5px 16px rgba(0,0,0,.26) !important;
            }
            html.site-dark .theme-toggle:hover { background:#202c48 !important; }

            @media (max-width:620px) {
                .theme-toggle { min-width:36px; width:36px; height:36px; padding:0; }
                .theme-toggle span { display:none; }
            }
        `;
        document.head.appendChild(style);
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

    const menuBtn = document.getElementById("menuBtn");
    const mainNav = document.getElementById("mainNav");
    function closeMobileMenu() {
        if (!mainNav || !menuBtn) return;
        mainNav.classList.remove("open");
        const icon = menuBtn.querySelector("i");
        if (icon) { icon.classList.remove("fa-xmark"); icon.classList.add("fa-bars"); }
        document.body.classList.remove("menu-open");
    }
    if (menuBtn && mainNav) {
        menuBtn.addEventListener("click", () => {
            const open = mainNav.classList.toggle("open");
            const icon = menuBtn.querySelector("i");
            if (icon) { icon.classList.toggle("fa-bars", !open); icon.classList.toggle("fa-xmark", open); }
            document.body.classList.toggle("menu-open", open);
        });
        document.querySelectorAll(".nav-link").forEach(link => link.addEventListener("click", closeMobileMenu));
        document.addEventListener("keydown", event => { if (event.key === "Escape") closeMobileMenu(); });
    }

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");
    function updateActiveNavigation() {
        let currentSection = "home";
        const scrollPosition = window.scrollY + 170;
        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            if (scrollPosition >= top && scrollPosition < bottom) currentSection = section.id;
        });
        navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${currentSection}`));
    }
    window.addEventListener("scroll", updateActiveNavigation, { passive: true });

    const revealElements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale");
    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add("visible"); });
        }, { threshold:0.12, rootMargin:"0px 0px -60px 0px" });
        revealElements.forEach(element => revealObserver.observe(element));
    } else revealElements.forEach(element => element.classList.add("visible"));

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
            if (event.key === "Enter" || event.key === " ") { event.preventDefault(); toggleFaq(); }
        });
    });

    const backTop = document.getElementById("backTop");
    if (backTop) {
        const updateBackTop = () => backTop.classList.toggle("show", window.scrollY > 500);
        window.addEventListener("scroll", updateBackTop, { passive:true });
        backTop.addEventListener("click", () => window.scrollTo({ top:0, behavior:"smooth" }));
        updateBackTop();
    }

    const header = document.getElementById("header");
    const updateHeader = () => {
        if (!header) return;
        const dark = document.documentElement.classList.contains("site-dark");
        header.style.boxShadow = window.scrollY > 20
            ? (dark ? "0 8px 30px rgba(0,0,0,.28)" : "0 8px 30px rgba(30,30,100,.08)")
            : "none";
    };
    if (header) {
        window.addEventListener("scroll", updateHeader, { passive:true });
        window.addEventListener("themechange", updateHeader);
        updateHeader();
    }

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const targetId = link.getAttribute("href");
            if (!targetId || targetId === "#") return;
            const target = document.querySelector(targetId);
            if (!target) return;
            event.preventDefault();
            const headerHeight = header ? header.offsetHeight : 0;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
            window.scrollTo({ top:targetPosition, behavior:"smooth" });
        });
    });

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
        heroVisual.addEventListener("mouseleave", () => { profileCard.style.transform = "translate(0,0)"; });
    }

    const portraitWrap = document.querySelector(".portrait-photo-wrap");
    const heroPhoto = document.querySelector(".hero-photo");
    function shapeHeroPortrait() {
        if (!portraitWrap || !heroPhoto) return;
        const mobile = window.innerWidth < 700;
        const tablet = window.innerWidth >= 700 && window.innerWidth < 1000;
        const size = mobile ? Math.min(window.innerWidth * .82, 380) : tablet ? 430 : 500;
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
    window.addEventListener("resize", shapeHeroPortrait, { passive:true });

    document.querySelectorAll("img").forEach(img => {
        if (!img.classList.contains("hero-photo") && !img.hasAttribute("loading")) img.loading = "lazy";
        if (!img.hasAttribute("decoding")) img.decoding = "async";
    });
    const footerYear = document.getElementById("footerYear");
    if (footerYear) footerYear.textContent = new Date().getFullYear();

    /* Replace the old compact location row with a real map panel. */
    const locationCard = document.querySelector(".location-card");
    if (locationCard) {
        const mapCard = document.createElement("div");
        mapCard.className = "location-map-card reveal visible";
        mapCard.innerHTML = `
            <iframe
                title="Sri Lanka location map"
                loading="lazy"
                src="https://www.openstreetmap.org/export/embed.html?bbox=79.70,6.70,81.90,9.90&layer=mapnik&marker=7.8731,80.7718">
            </iframe>
            <div class="location-map-overlay">
                <div class="location-icon"><i class="fa-solid fa-location-dot"></i></div>
                <div>
                    <strong>Our Location</strong>
                    <span>Sri Lanka</span>
                </div>
            </div>
            <a class="location-map-link" href="https://maps.app.goo.gl/bzrYeGjxbVFvLbrd8" target="_blank" rel="noopener">
                Open in Google Maps <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
        `;
        locationCard.replaceWith(mapCard);
    }

    /* DARK / DAY MODE — language selector removed */
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

        const button = document.getElementById("themeToggle");
        if (button) {
            button.classList.toggle("is-dark", dark);
            button.setAttribute("aria-pressed", String(dark));
            button.setAttribute("aria-label", dark ? "Switch to Day Mode" : "Switch to Dark Mode");
            button.title = dark ? "Switch to Day Mode" : "Switch to Dark Mode";
            button.innerHTML = dark
                ? '<i class="fa-solid fa-sun"></i><span>Day</span>'
                : '<i class="fa-solid fa-moon"></i><span>Dark</span>';
        }
        window.dispatchEvent(new Event("themechange"));
    }

    if (navActions && !document.getElementById("themeToggle")) {
        const controls = document.createElement("div");
        controls.className = "site-controls";
        controls.innerHTML = '<button class="theme-toggle" id="themeToggle" type="button" aria-pressed="false"><i class="fa-solid fa-moon"></i><span>Dark</span></button>';
        navActions.insertBefore(controls, navActions.firstChild);
    }

    applyTheme(getPreferredTheme());

    const themeToggle = document.getElementById("themeToggle");
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const next = document.documentElement.classList.contains("site-dark") ? "light" : "dark";
            localStorage.setItem("siteTheme", next);
            applyTheme(next);
        });
    }

    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemThemeChange = event => {
        if (localStorage.getItem("siteTheme")) return;
        applyTheme(event.matches ? "dark" : "light");
    };
    if (systemTheme.addEventListener) systemTheme.addEventListener("change", onSystemThemeChange);
    else if (systemTheme.addListener) systemTheme.addListener(onSystemThemeChange);

    updateActiveNavigation();
})();
