/* =====================================================
   MAIN SITE INTERACTIONS + THEME + FULL LANGUAGE SYSTEM
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
        document.querySelectorAll(".nav-link").forEach(link => link.addEventListener("click", closeMobileMenu));
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
            if (scrollPosition >= top && scrollPosition < bottom) currentSection = section.id;
        });
        navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${currentSection}`));
    }
    window.addEventListener("scroll", updateActiveNavigation, { passive: true });

    /* Scroll reveal */
    const revealElements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale");
    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => entry.target.classList.toggle("visible", entry.isIntersecting));
        }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
        revealElements.forEach(element => revealObserver.observe(element));
    } else revealElements.forEach(element => element.classList.add("visible"));

    /* FAQ */
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
            header.style.boxShadow = window.scrollY > 20 ? "0 8px 30px rgba(30,30,100,.08)" : "none";
        };
        window.addEventListener("scroll", updateHeader, { passive: true });
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

    document.querySelectorAll("img").forEach(img => {
        if (!img.classList.contains("hero-photo") && !img.hasAttribute("loading")) img.loading = "lazy";
        if (!img.hasAttribute("decoding")) img.decoding = "async";
    });

    const footerYear = document.getElementById("footerYear");
    if (footerYear) footerYear.textContent = new Date().getFullYear();

    /* =====================================================
       THEME + LANGUAGE CONTROLS
    ===================================================== */
    const navActions = document.querySelector(".nav-actions");
    if (!navActions || document.getElementById("siteLanguageControl")) {
        updateActiveNavigation();
        return;
    }

    const control = document.createElement("div");
    control.className = "site-controls";
    control.id = "siteLanguageControl";
    control.innerHTML = `
        <button class="theme-toggle" id="themeToggle" type="button" aria-label="Toggle dark mode" title="Toggle dark mode">
            <i class="fa-regular fa-moon"></i>
        </button>
        <div class="language-switcher" role="group" aria-label="Language selector">
            <button type="button" class="language-option active" data-language="en">English</button>
            <button type="button" class="language-option" data-language="si">සිංහල</button>
            <button type="button" class="language-option" data-language="ta">தமிழ்</button>
        </div>
    `;
    navActions.insertBefore(control, navActions.firstChild);

    const savedTheme = localStorage.getItem("siteTheme");
    if (savedTheme === "dark") document.documentElement.classList.add("site-dark");
    const themeToggle = document.getElementById("themeToggle");
    const updateThemeIcon = () => {
        if (!themeToggle) return;
        const dark = document.documentElement.classList.contains("site-dark");
        themeToggle.innerHTML = dark
            ? '<i class="fa-regular fa-sun"></i>'
            : '<i class="fa-regular fa-moon"></i>';
        themeToggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Toggle dark mode");
        themeToggle.title = dark ? "Switch to light mode" : "Toggle dark mode";
    };
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const dark = document.documentElement.classList.toggle("site-dark");
            localStorage.setItem("siteTheme", dark ? "dark" : "light");
            updateThemeIcon();
        });
        updateThemeIcon();
    }

    /* =====================================================
       COMPLETE ENGLISH / SINHALA / TAMIL TRANSLATION
       The English text is kept as the source of truth. Every
       text node is cached so switching languages never loses
       the original content.
    ===================================================== */
    const translations = {
        si: {
            "Commerce & Accounting Education": "වාණිජ හා ගිණුම්කරණ අධ්‍යාපනය",
            "Home": "මුල් පිටුව",
            "About": "අප ගැන",
            "Programs": "පාඨමාලා",
            "Results": "ප්‍රතිඵල",
            "Resources": "අධ්‍යයන සම්පත්",
            "Gallery": "ගැලරිය",
            "Contact": "සම්බන්ධ වන්න",
            "Student Portal": "ශිෂ්‍ය ද්වාරය",
            "Open navigation": "සංචාලනය විවෘත කරන්න",
            "COMMERCE & ACCOUNTING EDUCATION": "වාණිජ හා ගිණුම්කරණ අධ්‍යාපනය",
            "Build Stronger Foundations for a Brighter Future": "ශක්තිමත් පදනමක් ගොඩනඟා දීප්තිමත් අනාගතයක් කරා",
            "Quality teaching, structured learning and continuous support to help students achieve their academic goals in Commerce & Accounting.": "ගුණාත්මක ඉගැන්වීම්, ක්‍රමවත් ඉගෙනීම සහ අඛණ්ඩ සහාය තුළින් වාණිජ හා ගිණුම්කරණ අධ්‍යයන අරමුණු සාර්ථක කර ගැනීමට සිසුන්ට උපකාර කරමු.",
            "Explore Programs": "පාඨමාලා බලන්න",
            "Structured Learning": "ක්‍රමවත් ඉගෙනීම",
            "Expert Guidance": "විශේෂඥ මඟපෙන්වීම",
            "Exam-Focused Preparation": "විභාග කේන්ද්‍රගත සූදානම",
            "Structured": "ක්‍රමවත්",
            "Learning": "ඉගෙනීම",
            "Expert": "විශේෂඥ",
            "Guidance": "මඟපෙන්වීම",
            "Exam-Focused": "විභාග කේන්ද්‍රගත",
            "Preparation": "සූදානම",
            "Grade 10 Commerce": "10 ශ්‍රේණිය වාණිජ",
            "Grade 11 Commerce": "11 ශ්‍රේණිය වාණිජ",
            "A/L Accounting": "උසස් පෙළ ගිණුම්කරණය",
            "Clear & systematic teaching": "පැහැදිලි හා ක්‍රමවත් ඉගැන්වීම",
            "Student-focused support": "ශිෂ්‍ය කේන්ද්‍රගත සහාය",
            "Focused on performance": "ප්‍රතිඵල කෙරෙහි අවධානය",
            "Model & Past Papers": "ආදර්ශ හා පසුගිය ප්‍රශ්න පත්‍ර",
            "Practice resources": "පුහුණු සම්පත්",
            "Continuous Assessment": "අඛණ්ඩ ඇගයීම",
            "Track your progress": "ඔබේ ප්‍රගතිය නිරීක්ෂණය කරන්න",
            "OUR PROGRAMS": "අපගේ පාඨමාලා",
            "What You Can Study": "ඔබට ඉගෙන ගත හැකි දේ",
            "Comprehensive programs designed to build strong knowledge and achieve excellent examination results.": "ශක්තිමත් දැනුමක් ගොඩනඟා විශිෂ්ට විභාග ප්‍රතිඵල ලබා ගැනීමට සැලසුම් කළ සම්පූර්ණ පාඨමාලා.",
            "Get Program Information": "පාඨමාලා තොරතුරු ලබාගන්න",
            "Learn More": "වැඩිදුර දැනගන්න",
            "Build a strong foundation in Commerce and develop the essential knowledge required for successful future studies.": "වාණිජ විෂයයේ ශක්තිමත් පදනමක් ගොඩනඟා අනාගත අධ්‍යයන සඳහා අවශ්‍ය මූලික දැනුම වර්ධනය කරගන්න.",
            "Deepen your Commerce knowledge and develop examination-focused skills for the O/L journey.": "වාණිජ දැනුම තවදුරටත් වර්ධනය කර O/L විභාගය සඳහා අවශ්‍ය කුසලතා ගොඩනඟා ගන්න.",
            "Complete syllabus coverage with structured examination preparation and continuous practice.": "සම්පූර්ණ විෂය නිර්දේශ ආවරණය, ක්‍රමවත් විභාග සූදානම සහ අඛණ්ඩ පුහුණුව.",
            "UPCOMING CLASSES": "ඉදිරි පන්ති",
            "Next Classes": "ඊළඟ පන්ති",
            "Contact for Schedule": "කාලසටහන සඳහා සම්බන්ධ වන්න",
            "Class schedule available on inquiry": "විමසීමෙන් පන්ති කාලසටහන ලබාගත හැක",
            "STUDENT ASSESSMENT PORTAL": "ශිෂ්‍ය ඇගයීම් ද්වාරය",
            "Your Learning. Your Progress. Your Results.": "ඔබේ ඉගෙනීම. ඔබේ ප්‍රගතිය. ඔබේ ප්‍රතිඵල.",
            "Access model papers, assignments, assessments, results and learning resources through the Student Assessment Portal.": "ශිෂ්‍ය ඇගයීම් ද්වාරය හරහා ආදර්ශ ප්‍රශ්න පත්‍ර, පැවරුම්, ඇගයීම්, ප්‍රතිඵල සහ අධ්‍යයන සම්පත් වෙත ප්‍රවේශ වන්න.",
            "Open Student Portal": "ශිෂ්‍ය ද්වාරය විවෘත කරන්න",
            "Practice Papers": "පුහුණු ප්‍රශ්න පත්‍ර",
            "Track Progress": "ප්‍රගතිය නිරීක්ෂණය කරන්න",
            "View Results": "ප්‍රතිඵල බලන්න",
            "RESULTS & SUCCESS": "ප්‍රතිඵල හා සාර්ථකත්වය",
            "Experience That Builds Student Success": "ශිෂ්‍ය සාර්ථකත්වය ගොඩනඟන අත්දැකීම",
            "With teaching experience since 2015, our approach is built around clear understanding, continuous practice, examination preparation and long-term academic development.": "2015 සිට ලැබූ ඉගැන්වීම් අත්දැකීම් සමඟ අපගේ ක්‍රමවේදය පැහැදිලි අවබෝධය, අඛණ්ඩ පුහුණුව, විභාග සූදානම සහ දිගුකාලීන අධ්‍යයන සංවර්ධනය මත පදනම් වේ.",
            "Since 2015": "2015 සිට",
            "Teaching Experience": "ඉගැන්වීම් අත්දැකීම්",
            "Students Guided": "මඟපෙන්වූ සිසුන්",
            "Teaching Since": "ඉගැන්වීම ආරම්භ කළේ",
            "1000+": "1000+",
            "2015": "2015",
            "ABOUT": "අප ගැන",
            "OUR ACHIEVEMENTS": "අපගේ ජයග්‍රහණ",
            "STUDENT VOICES": "ශිෂ්‍ය අදහස්",
            "LEARNING RESOURCES": "අධ්‍යයන සම්පත්",
            "GALLERY": "ගැලරිය",
            "FREQUENTLY ASKED QUESTIONS": "නිතර අසන ප්‍රශ්න",
            "CONTACT": "සම්බන්ධ වන්න",
            "Get in Touch": "අප හා සම්බන්ධ වන්න",
            "Send a Message": "පණිවිඩයක් යවන්න",
            "WhatsApp": "WhatsApp",
            "Facebook": "Facebook",
            "Instagram": "Instagram",
            "TikTok": "TikTok",
            "Email": "විද්‍යුත් තැපෑල",
            "Phone": "දුරකථන",
            "Address": "ලිපිනය",
            "Submit": "යවන්න",
            "Send Message": "පණිවිඩය යවන්න",
            "Learn More About Me": "මා ගැන වැඩිදුර දැනගන්න",
            "Read More": "වැඩිදුර කියවන්න",
            "View All": "සියල්ල බලන්න",
            "View Gallery": "ගැලරිය බලන්න",
            "View Resources": "සම්පත් බලන්න",
            "See Results": "ප්‍රතිඵල බලන්න",
            "FAQ": "නිතර අසන ප්‍රශ්න",
            "Frequently Asked Questions": "නිතර අසන ප්‍රශ්න",
            "Home": "මුල් පිටුව"
        },
        ta: {
            "Commerce & Accounting Education": "வணிகம் மற்றும் கணக்கியல் கல்வி",
            "Home": "முகப்பு",
            "About": "எங்களைப் பற்றி",
            "Programs": "பாடநெறிகள்",
            "Results": "பெறுபேறுகள்",
            "Resources": "கற்றல் வளங்கள்",
            "Gallery": "படத்தொகுப்பு",
            "Contact": "தொடர்பு",
            "Student Portal": "மாணவர் தளம்",
            "Open navigation": "வழிசெலுத்தலைத் திறக்கவும்",
            "COMMERCE & ACCOUNTING EDUCATION": "வணிகம் மற்றும் கணக்கியல் கல்வி",
            "Build Stronger Foundations for a Brighter Future": "வலுவான அடித்தளத்தை உருவாக்கி பிரகாசமான எதிர்காலத்தை நோக்கி",
            "Quality teaching, structured learning and continuous support to help students achieve their academic goals in Commerce & Accounting.": "தரமான கற்பித்தல், ஒழுங்கமைக்கப்பட்ட கற்றல் மற்றும் தொடர்ச்சியான ஆதரவின் மூலம் வணிகம் மற்றும் கணக்கியல் கல்வி இலக்குகளை மாணவர்கள் அடைய உதவுகிறோம்.",
            "Explore Programs": "பாடநெறிகளைப் பார்க்கவும்",
            "Structured Learning": "ஒழுங்கமைக்கப்பட்ட கற்றல்",
            "Expert Guidance": "நிபுணர் வழிகாட்டுதல்",
            "Exam-Focused Preparation": "தேர்வு மையப்படுத்திய தயாரிப்பு",
            "Structured": "ஒழுங்கமைக்கப்பட்ட",
            "Learning": "கற்றல்",
            "Expert": "நிபுணர்",
            "Guidance": "வழிகாட்டுதல்",
            "Exam-Focused": "தேர்வு மையப்படுத்திய",
            "Preparation": "தயாரிப்பு",
            "Grade 10 Commerce": "தரம் 10 வணிகம்",
            "Grade 11 Commerce": "தரம் 11 வணிகம்",
            "A/L Accounting": "உயர்தர கணக்கியல்",
            "Clear & systematic teaching": "தெளிவான மற்றும் முறையான கற்பித்தல்",
            "Student-focused support": "மாணவர் மையப்படுத்திய ஆதரவு",
            "Focused on performance": "செயல்திறனை மையப்படுத்தியது",
            "Model & Past Papers": "மாதிரி மற்றும் கடந்தகால வினாத்தாள்கள்",
            "Practice resources": "பயிற்சி வளங்கள்",
            "Continuous Assessment": "தொடர்ச்சியான மதிப்பீடு",
            "Track your progress": "உங்கள் முன்னேற்றத்தை கண்காணிக்கவும்",
            "OUR PROGRAMS": "எங்கள் பாடநெறிகள்",
            "What You Can Study": "நீங்கள் கற்கக்கூடியவை",
            "Comprehensive programs designed to build strong knowledge and achieve excellent examination results.": "வலுவான அறிவை உருவாக்கவும் சிறந்த தேர்வு பெறுபேறுகளைப் பெறவும் வடிவமைக்கப்பட்ட முழுமையான பாடநெறிகள்.",
            "Get Program Information": "பாடநெறி தகவலைப் பெறவும்",
            "Learn More": "மேலும் அறியவும்",
            "Build a strong foundation in Commerce and develop the essential knowledge required for successful future studies.": "வணிகத்தில் வலுவான அடித்தளத்தை உருவாக்கி எதிர்கால கல்விக்குத் தேவையான அடிப்படை அறிவை வளர்த்துக் கொள்ளுங்கள்.",
            "Deepen your Commerce knowledge and develop examination-focused skills for the O/L journey.": "வணிக அறிவை ஆழப்படுத்தி O/L தேர்வுக்குத் தேவையான திறன்களை வளர்த்துக் கொள்ளுங்கள்.",
            "Complete syllabus coverage with structured examination preparation and continuous practice.": "முழுமையான பாடத்திட்ட உள்ளடக்கம், முறையான தேர்வு தயாரிப்பு மற்றும் தொடர்ச்சியான பயிற்சி.",
            "UPCOMING CLASSES": "வரவிருக்கும் வகுப்புகள்",
            "Next Classes": "அடுத்த வகுப்புகள்",
            "Contact for Schedule": "அட்டவணைக்குத் தொடர்புகொள்ளவும்",
            "Class schedule available on inquiry": "விசாரணையின் பேரில் வகுப்பு அட்டவணை வழங்கப்படும்",
            "STUDENT ASSESSMENT PORTAL": "மாணவர் மதிப்பீட்டு தளம்",
            "Your Learning. Your Progress. Your Results.": "உங்கள் கற்றல். உங்கள் முன்னேற்றம். உங்கள் பெறுபேறுகள்.",
            "Access model papers, assignments, assessments, results and learning resources through the Student Assessment Portal.": "மாணவர் மதிப்பீட்டு தளம் மூலம் மாதிரி வினாத்தாள்கள், பணிகள், மதிப்பீடுகள், பெறுபேறுகள் மற்றும் கற்றல் வளங்களை அணுகவும்.",
            "Open Student Portal": "மாணவர் தளத்தைத் திறக்கவும்",
            "Practice Papers": "பயிற்சி வினாத்தாள்கள்",
            "Track Progress": "முன்னேற்றத்தை கண்காணிக்கவும்",
            "View Results": "பெறுபேறுகளைப் பார்க்கவும்",
            "RESULTS & SUCCESS": "பெறுபேறுகள் மற்றும் வெற்றி",
            "Experience That Builds Student Success": "மாணவர் வெற்றியை உருவாக்கும் அனுபவம்",
            "With teaching experience since 2015, our approach is built around clear understanding, continuous practice, examination preparation and long-term academic development.": "2015 முதல் கிடைத்த கற்பித்தல் அனுபவத்தின் அடிப்படையில், தெளிவான புரிதல், தொடர்ச்சியான பயிற்சி, தேர்வு தயாரிப்பு மற்றும் நீண்டகால கல்வி வளர்ச்சியை மையமாகக் கொண்டு எங்கள் அணுகுமுறை அமைந்துள்ளது.",
            "Since 2015": "2015 முதல்",
            "Teaching Experience": "கற்பித்தல் அனுபவம்",
            "Students Guided": "வழிகாட்டப்பட்ட மாணவர்கள்",
            "Teaching Since": "கற்பித்தல் தொடக்கம்",
            "1000+": "1000+",
            "2015": "2015",
            "ABOUT": "எங்களைப் பற்றி",
            "OUR ACHIEVEMENTS": "எங்கள் சாதனைகள்",
            "STUDENT VOICES": "மாணவர் கருத்துகள்",
            "LEARNING RESOURCES": "கற்றல் வளங்கள்",
            "GALLERY": "படத்தொகுப்பு",
            "FREQUENTLY ASKED QUESTIONS": "அடிக்கடி கேட்கப்படும் கேள்விகள்",
            "CONTACT": "தொடர்பு",
            "Get in Touch": "எங்களைத் தொடர்புகொள்ளவும்",
            "Send a Message": "செய்தி அனுப்பவும்",
            "WhatsApp": "WhatsApp",
            "Facebook": "Facebook",
            "Instagram": "Instagram",
            "TikTok": "TikTok",
            "Email": "மின்னஞ்சல்",
            "Phone": "தொலைபேசி",
            "Address": "முகவரி",
            "Submit": "சமர்ப்பிக்கவும்",
            "Send Message": "செய்தியை அனுப்பவும்",
            "Learn More About Me": "என்னைப் பற்றி மேலும் அறியவும்",
            "Read More": "மேலும் படிக்கவும்",
            "View All": "அனைத்தையும் பார்க்கவும்",
            "View Gallery": "படத்தொகுப்பைப் பார்க்கவும்",
            "View Resources": "வளங்களைப் பார்க்கவும்",
            "See Results": "பெறுபேறுகளைப் பார்க்கவும்",
            "FAQ": "அடிக்கடி கேட்கப்படும் கேள்விகள்",
            "Frequently Asked Questions": "அடிக்கடி கேட்கப்படும் கேள்விகள்"
        }
    };

    const originalText = new WeakMap();
    const originalAttrs = new WeakMap();
    const normalized = value => value.replace(/\s+/g, " ").trim();

    function cacheOriginals() {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        let node;
        while ((node = walker.nextNode())) {
            if (!originalText.has(node)) originalText.set(node, node.nodeValue);
        }
        document.querySelectorAll("[aria-label],[title],img[alt]").forEach(element => {
            if (!originalAttrs.has(element)) {
                originalAttrs.set(element, {
                    ariaLabel: element.getAttribute("aria-label"),
                    title: element.getAttribute("title"),
                    alt: element.getAttribute("alt")
                });
            }
        });
    }

    function translatePage(language) {
        cacheOriginals();
        const dictionary = translations[language] || {};
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        const nodes = [];
        let node;
        while ((node = walker.nextNode())) nodes.push(node);

        nodes.forEach(textNode => {
            const source = originalText.get(textNode) ?? textNode.nodeValue;
            const key = normalized(source);
            if (!key) return;
            const translated = language === "en" ? source : (dictionary[key] || source);
            if (translated !== source && source.trim() !== key) {
                const leading = source.match(/^\s*/)?.[0] || "";
                const trailing = source.match(/\s*$/)?.[0] || "";
                textNode.nodeValue = leading + translated + trailing;
            } else {
                textNode.nodeValue = translated;
            }
        });

        document.querySelectorAll("[aria-label],[title],img[alt]").forEach(element => {
            const source = originalAttrs.get(element);
            if (!source) return;
            if (source.ariaLabel) element.setAttribute("aria-label", language === "en" ? source.ariaLabel : (dictionary[source.ariaLabel] || source.ariaLabel));
            if (source.title) element.setAttribute("title", language === "en" ? source.title : (dictionary[source.title] || source.title));
            if (source.alt) element.setAttribute("alt", language === "en" ? source.alt : (dictionary[source.alt] || source.alt));
        });

        document.documentElement.lang = language;
        const titleMap = {
            en: "Dr. Sandaruwan Perera | Commerce & Accounting Education",
            si: "ආචාර්ය සඳරුවන් පෙරේරා | වාණිජ හා ගිණුම්කරණ අධ්‍යාපනය",
            ta: "டாக்டர் சந்தருவன் பெரேரா | வணிகம் மற்றும் கணக்கியல் கல்வி"
        };
        document.title = titleMap[language] || titleMap.en;
        localStorage.setItem("siteLanguage", language);
    }

    const languageButtons = control.querySelectorAll(".language-option");
    const savedLanguage = localStorage.getItem("siteLanguage") || "en";
    languageButtons.forEach(button => {
        button.classList.toggle("active", button.dataset.language === savedLanguage);
        button.addEventListener("click", () => {
            const selected = button.dataset.language;
            languageButtons.forEach(item => item.classList.toggle("active", item === button));
            translatePage(selected);
        });
    });
    translatePage(savedLanguage);

    updateActiveNavigation();
})();