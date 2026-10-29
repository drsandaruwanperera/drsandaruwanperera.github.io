/* 
 * Seasonal Halloween decorations for the existing homepage.
 * No layout, copy, links, colours, or page sections are modified.
 * Automatically expires at 2026-11-15 00:00 Asia/Colombo
 * (2026-11-14T18:30:00Z).
 */
(() => {
    "use strict";

    const CUTOFF = Date.parse("2026-11-14T18:30:00Z");
    const remaining = CUTOFF - Date.now();

    // If the season is over, don't inject any styles or decorative elements.
    if (remaining <= 0 || document.getElementById("halloween-effects-layer")) return;

    const style = document.createElement("style");
    style.id = "halloween-effects-styles";
    style.textContent = `
        #halloween-effects-layer {
            position: fixed;
            inset: 0;
            z-index: 998;
            overflow: hidden;
            pointer-events: none;
            contain: layout style;
        }
        #halloween-effects-layer .he-ghost,
        #halloween-effects-layer .he-pumpkin,
        #halloween-effects-layer .he-bat,
        #halloween-effects-layer .he-ember {
            position: absolute;
            user-select: none;
            -webkit-user-select: none;
            pointer-events: none;
            will-change: transform, opacity;
        }
        #halloween-effects-layer .he-ghost {
            font-family: system-ui, sans-serif;
            line-height: 1;
            filter: drop-shadow(0 0 8px rgba(178, 135, 255, .52));
            animation: he-ghost-float 6.8s ease-in-out infinite;
            opacity: .92;
        }
        #halloween-effects-layer .he-ghost-left {
            left: 13px;
            top: 24%;
            font-size: clamp(27px, 3.2vw, 43px);
            animation-delay: -1.8s;
        }
        #halloween-effects-layer .he-ghost-right {
            right: 13px;
            top: 57%;
            font-size: clamp(25px, 2.8vw, 38px);
            animation-delay: -4.4s;
        }
        #halloween-effects-layer .he-cursor-ghost {
            left: 0;
            top: 0;
            z-index: 3;
            font-size: 25px;
            opacity: 0;
            transform: translate3d(-100px, -100px, 0);
            transition: opacity .2s ease;
            filter: drop-shadow(0 0 9px rgba(160, 104, 255, .72));
            animation: he-cursor-wiggle 2.6s ease-in-out infinite;
        }
        #halloween-effects-layer.he-cursor-active .he-cursor-ghost { opacity: .9; }
        #halloween-effects-layer .he-pumpkin {
            font-family: system-ui, sans-serif;
            font-size: clamp(28px, 3vw, 42px);
            line-height: 1;
            filter: drop-shadow(0 0 7px rgba(255, 120, 24, .45));
            animation: he-pumpkin-glow 3s ease-in-out infinite;
        }
        #halloween-effects-layer .he-pumpkin-left {
            left: 9px;
            top: 43%;
            animation-delay: -.8s;
        }
        #halloween-effects-layer .he-pumpkin-right {
            right: 10px;
            top: 25%;
            animation-delay: -2s;
        }
        #halloween-effects-layer .he-pumpkin.he-react {
            animation: he-pumpkin-react .72s cubic-bezier(.2,.85,.35,1.25) both;
            filter: drop-shadow(0 0 15px rgba(255, 111, 18, .95));
        }
        #halloween-effects-layer .he-bat {
            left: -60px;
            top: 17%;
            font-size: clamp(20px, 2vw, 27px);
            opacity: .82;
            animation: he-bat-flight 19s linear infinite;
            animation-delay: -5s;
        }
        #halloween-effects-layer .he-bat-two {
            top: 39%;
            font-size: 19px;
            opacity: .55;
            animation-duration: 25s;
            animation-delay: -13s;
        }
        #halloween-effects-layer .he-bat-three {
            top: 72%;
            font-size: 17px;
            opacity: .48;
            animation-duration: 28s;
            animation-delay: -20s;
        }
        #halloween-effects-layer .he-ember {
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background: #ff8a24;
            box-shadow: 0 0 8px 2px rgba(255, 112, 15, .4);
            animation: he-ember-rise 5.5s ease-in-out infinite;
        }
        @keyframes he-ghost-float {
            0%, 100% { translate: 0 0; rotate: -5deg; }
            50% { translate: 4px -17px; rotate: 5deg; }
        }
        @keyframes he-cursor-wiggle {
            0%, 100% { rotate: -9deg; }
            50% { rotate: 9deg; }
        }
        @keyframes he-pumpkin-glow {
            0%, 100% { transform: translateY(0) rotate(-3deg) scale(1); }
            50% { transform: translateY(-5px) rotate(3deg) scale(1.035); }
        }
        @keyframes he-pumpkin-react {
            0% { transform: scale(1) rotate(0); }
            38% { transform: scale(1.35) rotate(-13deg); }
            68% { transform: scale(1.14) rotate(10deg); }
            100% { transform: scale(1.08) rotate(0); }
        }
        @keyframes he-bat-flight {
            0% { transform: translate3d(-7vw, 0, 0) rotate(-8deg); }
            48% { transform: translate3d(52vw, -18px, 0) rotate(5deg); }
            100% { transform: translate3d(112vw, 10px, 0) rotate(-2deg); }
        }
        @keyframes he-ember-rise {
            0%, 100% { transform: translate3d(0, 12px, 0) scale(.55); opacity: .2; }
            45% { transform: translate3d(7px, -18px, 0) scale(1.15); opacity: .85; }
            75% { opacity: .45; }
        }
        @media (max-width: 700px) {
            #halloween-effects-layer .he-ghost-left { left: 4px; top: 19%; }
            #halloween-effects-layer .he-ghost-right { right: 4px; top: 59%; }
            #halloween-effects-layer .he-pumpkin-left { left: 3px; top: 43%; font-size: 29px; }
            #halloween-effects-layer .he-pumpkin-right { right: 3px; top: 27%; font-size: 29px; }
            #halloween-effects-layer .he-cursor-ghost { display: none; }
            #halloween-effects-layer .he-bat-three { display: none; }
            #halloween-effects-layer .he-ember { width: 3px; height: 3px; }
        }
        @media (prefers-reduced-motion: reduce) {
            #halloween-effects-layer .he-ghost,
            #halloween-effects-layer .he-pumpkin,
            #halloween-effects-layer .he-bat,
            #halloween-effects-layer .he-ember,
            #halloween-effects-layer .he-cursor-ghost {
                animation: none !important;
                transition: none !important;
            }
            #halloween-effects-layer .he-cursor-ghost { display: none !important; }
        }
    `;
    document.head.appendChild(style);

    const widgetStyle = document.createElement("style");
    widgetStyle.id = "he-halloween-widget-styles";
    widgetStyle.textContent = `
        #he-halloween-widget {
            position: fixed;
            left: 20px;
            bottom: 20px;
            z-index: 1005;
            width: 60px;
            height: 60px;
            pointer-events: auto;
            font-family: Inter, "Segoe UI", Arial, sans-serif;
        }
        #he-halloween-widget .he-widget-trigger {
            position: relative;
            display: grid;
            place-items: center;
            width: 60px;
            height: 60px;
            padding: 0;
            border: 1px solid rgba(166, 255, 46, .5);
            border-radius: 50%;
            background: radial-gradient(circle at 32% 24%, #30225a, #10182c 74%);
            color: #fff;
            cursor: pointer;
            isolation: isolate;
            box-shadow: 0 9px 30px rgba(0,0,0,.32), 0 0 22px rgba(124,58,237,.22);
            transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
        }
        #he-halloween-widget .he-widget-trigger::before {
            content: "";
            position: absolute;
            inset: -5px;
            border: 1px solid rgba(255, 138, 36, .55);
            border-radius: 50%;
            z-index: -1;
            animation: he-widget-pulse 2.8s ease-out infinite;
        }
        #he-halloween-widget .he-widget-trigger:hover,
        #he-halloween-widget .he-widget-trigger:focus-visible {
            transform: translateY(-3px) scale(1.04);
            border-color: #a6ff2e;
            box-shadow: 0 12px 34px rgba(0,0,0,.38), 0 0 24px rgba(255,138,36,.28);
            outline: none;
        }
        #he-halloween-widget .he-widget-icon {
            display: block;
            font-size: 30px;
            line-height: 1;
            filter: drop-shadow(0 0 7px rgba(255,138,36,.35));
            animation: he-widget-pumpkin 3.2s ease-in-out infinite;
        }
        #he-halloween-widget .he-widget-dot {
            position: absolute;
            right: 4px;
            top: 4px;
            width: 10px;
            height: 10px;
            border: 2px solid #11182b;
            border-radius: 50%;
            background: #a6ff2e;
            box-shadow: 0 0 9px rgba(166,255,46,.65);
        }
        #he-halloween-widget .he-widget-panel {
            position: absolute;
            left: 0;
            bottom: calc(100% + 13px);
            display: none;
            width: min(300px, calc(100vw - 28px));
            padding: 16px;
            border: 1px solid rgba(166,255,46,.22);
            border-radius: 18px;
            background: linear-gradient(145deg, rgba(17,24,43,.98), rgba(34,24,67,.98));
            color: #f4f7ff;
            box-shadow: 0 20px 55px rgba(0,0,0,.42), 0 0 25px rgba(124,58,237,.13);
            backdrop-filter: blur(14px);
            -webkit-backdrop-filter: blur(14px);
        }
        #he-halloween-widget .he-widget-panel.is-open {
            display: block;
            animation: he-widget-panel-in .22s ease-out both;
        }
        #he-halloween-widget .he-widget-panel-head {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        #he-halloween-widget .he-widget-ghost {
            display: grid;
            place-items: center;
            width: 42px;
            height: 42px;
            flex: 0 0 42px;
            border: 1px solid rgba(167,139,250,.28);
            border-radius: 13px;
            background: rgba(124,58,237,.18);
            font-size: 24px;
            animation: he-widget-ghost 3.4s ease-in-out infinite;
        }
        #he-halloween-widget .he-widget-heading {
            min-width: 0;
            flex: 1;
        }
        #he-halloween-widget .he-widget-heading strong {
            display: block;
            color: #f4f7ff;
            font-size: 13px;
            font-weight: 800;
            letter-spacing: .1px;
        }
        #he-halloween-widget .he-widget-heading small {
            display: block;
            margin-top: 4px;
            color: #aeb8ce;
            font-size: 10px;
        }
        #he-halloween-widget .he-widget-close {
            display: grid;
            place-items: center;
            width: 29px;
            height: 29px;
            flex: 0 0 29px;
            border: 1px solid rgba(255,255,255,.1);
            border-radius: 9px;
            background: rgba(255,255,255,.04);
            color: #cbd5e1;
            font-size: 20px;
            cursor: pointer;
        }
        #he-halloween-widget .he-widget-copy {
            margin: 13px 0 11px;
            color: #c5cee0;
            font-size: 11px;
            line-height: 1.6;
        }
        #he-halloween-widget .he-widget-expiry {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 9px 10px;
            border: 1px solid rgba(255,255,255,.08);
            border-radius: 10px;
            background: rgba(255,255,255,.04);
            color: #b8c4d8;
            font-size: 10px;
        }
        #he-halloween-widget .he-widget-expiry span:first-child {
            color: #ff9a3d;
            font-size: 13px;
        }
        #he-halloween-widget .he-widget-pause {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            width: 100%;
            min-height: 39px;
            margin-top: 11px;
            padding: 9px 12px;
            border: 1px solid rgba(166,255,46,.35);
            border-radius: 11px;
            background: linear-gradient(135deg, rgba(64,55,201,.42), rgba(124,58,237,.28));
            color: #f4f7ff;
            font: 750 11px/1.2 Inter, "Segoe UI", Arial, sans-serif;
            cursor: pointer;
            transition: background .2s ease, border-color .2s ease;
        }
        #he-halloween-widget .he-widget-pause:hover {
            border-color: #a6ff2e;
            background: rgba(64,55,201,.52);
        }
        #he-halloween-widget .he-widget-action-icon {
            color: #a6ff2e;
            font-size: 13px;
        }
        #he-halloween-widget .he-widget-trigger:focus-visible,
        #he-halloween-widget .he-widget-close:focus-visible,
        #he-halloween-widget .he-widget-pause:focus-visible {
            outline: 2px solid #a6ff2e;
            outline-offset: 3px;
        }
        #halloween-effects-layer.he-effects-paused *,
        #portal-halloween-layer.he-effects-paused * {
            animation-play-state: paused !important;
        }
        #he-halloween-widget .he-widget-surprise {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 9px;
            width: 100%;
            min-height: 42px;
            margin-top: 10px;
            padding: 10px 12px;
            border: 1px solid rgba(255, 166, 75, .45);
            border-radius: 12px;
            background: linear-gradient(100deg, #f97316, #c2410c);
            color: #fff;
            font: 800 11px/1.2 Inter, "Segoe UI", Arial, sans-serif;
            cursor: pointer;
            box-shadow: 0 8px 20px rgba(234,88,12,.20);
            transition: filter .2s ease, transform .2s ease;
        }
        #he-halloween-widget .he-widget-surprise:hover {
            filter: brightness(1.09);
            transform: translateY(-1px);
        }
        #he-halloween-widget .he-widget-surprise-result {
            margin: 10px 0 0;
            padding: 10px 11px;
            border: 1px solid rgba(167,139,250,.25);
            border-radius: 11px;
            background: rgba(124,58,237,.12);
            color: #e9ddff;
            font-size: 11px;
            line-height: 1.5;
        }
        #he-halloween-widget .he-widget-surprise-result[hidden] { display: none; }
        #halloween-effects-layer .he-candy-pop {
            position: absolute;
            z-index: 4;
            pointer-events: none;
            font-size: 22px;
            line-height: 1;
            will-change: transform, opacity;
            animation: he-candy-pop 1.15s cubic-bezier(.16,.7,.3,1) both;
        }
        @keyframes he-candy-pop {
            0% { transform: translate(-50%, -50%) scale(.35) rotate(0deg); opacity: 0; }
            14% { opacity: 1; }
            100% { transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(1.08) rotate(var(--rot)); opacity: 0; }
        }
        @keyframes he-widget-pulse {
            0% { transform: scale(.93); opacity: .8; }
            100% { transform: scale(1.35); opacity: 0; }
        }
        @keyframes he-widget-pumpkin {
            0%, 100% { transform: translateY(0) rotate(-4deg); }
            50% { transform: translateY(-3px) rotate(4deg); }
        }
        @keyframes he-widget-ghost {
            0%, 100% { transform: translateY(0) rotate(-4deg); }
            50% { transform: translateY(-4px) rotate(4deg); }
        }
        @keyframes he-widget-panel-in {
            from { opacity: 0; transform: translateY(7px) scale(.98); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (max-width: 700px) {
            #he-halloween-widget { left: 12px; bottom: 14px; width: 54px; height: 54px; }
            #he-halloween-widget .he-widget-trigger { width: 54px; height: 54px; }
            #he-halloween-widget .he-widget-icon { font-size: 27px; }
            #he-halloween-widget .he-widget-panel { width: min(290px, calc(100vw - 24px)); }
        }
        @media (prefers-reduced-motion: reduce) {
            #he-halloween-widget *,
            #he-halloween-widget .he-widget-trigger::before {
                animation: none !important;
                transition: none !important;
            }
        }
    `;
    document.head.appendChild(widgetStyle);

    const halloweenWidget = document.createElement("div");
    halloweenWidget.id = "he-halloween-widget";
    halloweenWidget.innerHTML =
        '<button type="button" class="he-widget-trigger" id="he-widget-trigger" aria-label="Open Halloween effects widget" aria-expanded="false" aria-controls="he-widget-panel">' +
            '<span class="he-widget-icon" aria-hidden="true">🎃</span><span class="he-widget-dot" aria-hidden="true"></span>' +
        '</button>' +
        '<section id="he-widget-panel" class="he-widget-panel" role="dialog" aria-label="Halloween effects" aria-hidden="true">' +
            '<div class="he-widget-panel-head">' +
                '<span class="he-widget-ghost" aria-hidden="true">👻</span>' +
                '<div class="he-widget-heading"><strong>Spooky season</strong><small>Little surprises are active</small></div>' +
                '<button type="button" class="he-widget-close" aria-label="Close Halloween widget">×</button>' +
            '</div>' +
            '<p class="he-widget-copy">A little Halloween magic, while keeping the website design just as it is.</p>' +
            '<div class="he-widget-expiry"><span aria-hidden="true">◷</span><span>Auto-removes Nov 15, 2026</span></div>' +
            '<button type="button" class="he-widget-surprise"><span aria-hidden="true">🍬</span><span>Trick or treat</span><span aria-hidden="true">→</span></button>' +
            '<p class="he-widget-surprise-result" role="status" aria-live="polite" hidden></p>' +
            '<button type="button" class="he-widget-pause" aria-pressed="false"><span class="he-widget-action-icon" aria-hidden="true">Ⅱ</span><span>Pause animations</span></button>' +
        '</section>';
    document.body.appendChild(halloweenWidget);

    const layer = document.createElement("div");
    layer.id = "halloween-effects-layer";
    layer.setAttribute("aria-hidden", "true");
    layer.innerHTML =
        '<span class="he-ghost he-ghost-left">👻</span>' +
        '<span class="he-ghost he-ghost-right">👻</span>' +
        '<span class="he-ghost he-cursor-ghost">👻</span>' +
        '<span class="he-pumpkin he-pumpkin-left">🎃</span>' +
        '<span class="he-pumpkin he-pumpkin-right">🎃</span>' +
        '<span class="he-bat">🦇</span>' +
        '<span class="he-bat he-bat-two">🦇</span>' +
        '<span class="he-bat he-bat-three">🦇</span>';
    document.body.appendChild(layer);

    // Small, low-cost glowing particles; these are decorative only.
    const emberPositions = [
        [8, 18, 0.2], [19, 66, 1.4], [28, 31, 2.3], [38, 83, 0.8],
        [49, 22, 2.8], [58, 69, 1.8], [68, 15, 3.1], [76, 48, 0.5],
        [86, 77, 2.1], [94, 35, 1.1], [14, 88, 3.6], [62, 91, 2.6]
    ];
    emberPositions.forEach((entry, index) => {
        const ember = document.createElement("span");
        ember.className = "he-ember";
        ember.style.left = entry[0] + "%";
        ember.style.top = entry[1] + "%";
        ember.style.animationDelay = "-" + entry[2] + "s";
        ember.style.opacity = index % 3 === 0 ? ".6" : ".85";
        layer.appendChild(ember);
    });

    const aborter = new AbortController();
    const cleanupTimers = new Set();
    const pumpkins = Array.from(layer.querySelectorAll(".he-pumpkin"));
    const cursorGhost = layer.querySelector(".he-cursor-ghost");
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let lastCursorMove = 0;

    const widgetTrigger = halloweenWidget.querySelector(".he-widget-trigger");
    const widgetPanel = halloweenWidget.querySelector(".he-widget-panel");
    const widgetClose = halloweenWidget.querySelector(".he-widget-close");
    const widgetPause = halloweenWidget.querySelector(".he-widget-pause");
    const widgetPauseIcon = halloweenWidget.querySelector(".he-widget-action-icon");
    const widgetPauseLabel = widgetPause.querySelector("span:last-child");
    const widgetSurprise = halloweenWidget.querySelector(".he-widget-surprise");
    const widgetSurpriseResult = halloweenWidget.querySelector(".he-widget-surprise-result");
    let animationsPaused = false;

    const surpriseMessages = [
        "🎃 Treat unlocked! Keep your learning streak glowing.",
        "👻 A friendly ghost says: you are doing boo-tifully!",
        "🍬 Sweet success! One small step at a time.",
        "🦇 Spooky focus activated. You’ve got this!",
        "✨ A little Halloween magic for your study session."
    ];
    const candyEmojis = ["🍬", "🍭", "✨", "🎃", "👻", "🦇", "🍬", "⭐", "🍭", "✨", "🎃", "💜"];

    function runTrickOrTreat() {
        widgetSurpriseResult.textContent = surpriseMessages[Math.floor(Math.random() * surpriseMessages.length)];
        widgetSurpriseResult.hidden = false;

        const rect = widgetTrigger.getBoundingClientRect();
        candyEmojis.forEach((emoji, index) => {
            const particle = document.createElement("span");
            particle.className = "he-candy-pop";
            particle.textContent = emoji;
            particle.style.left = Math.round(rect.left + rect.width / 2) + "px";
            particle.style.top = Math.round(rect.top + rect.height / 2) + "px";
            particle.style.setProperty("--dx", Math.round((Math.random() - .5) * 190) + "px");
            particle.style.setProperty("--dy", Math.round(-35 - Math.random() * 115) + "px");
            particle.style.setProperty("--rot", Math.round((Math.random() - .5) * 150) + "deg");
            particle.style.animationDelay = Math.round(index * 22) + "ms";
            layer.appendChild(particle);

            const timer = window.setTimeout(() => {
                particle.remove();
                cleanupTimers.delete(timer);
            }, 1400 + index * 22);
            cleanupTimers.add(timer);
        });

        widgetSurprise.innerHTML = '<span aria-hidden="true">✨</span><span>Surprise again</span><span aria-hidden="true">↻</span>';
    }

    function setWidgetOpen(open) {
        widgetPanel.classList.toggle("is-open", open);
        widgetPanel.setAttribute("aria-hidden", String(!open));
        widgetTrigger.setAttribute("aria-expanded", String(open));
    }

    function setAnimationsPaused(paused) {
        animationsPaused = paused;
        layer.classList.toggle("he-effects-paused", paused);
        widgetPause.setAttribute("aria-pressed", String(paused));
        widgetPauseIcon.textContent = paused ? "▶" : "Ⅱ";
        widgetPauseLabel.textContent = paused ? "Resume animations" : "Pause animations";
    }

    widgetTrigger.addEventListener("click", () => {
        setWidgetOpen(!widgetPanel.classList.contains("is-open"));
    }, { signal: aborter.signal });
    widgetClose.addEventListener("click", () => setWidgetOpen(false), { signal: aborter.signal });
    widgetPause.addEventListener("click", () => setAnimationsPaused(!animationsPaused), { signal: aborter.signal });
    widgetSurprise.addEventListener("click", runTrickOrTreat, { signal: aborter.signal });
    document.addEventListener("pointerdown", event => {
        if (event.target instanceof Node && !halloweenWidget.contains(event.target)) {
            setWidgetOpen(false);
        }
    }, { signal: aborter.signal });
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") setWidgetOpen(false);
    }, { signal: aborter.signal });


    function reactToPumpkin(pumpkin) {
        pumpkin.classList.remove("he-react");
        // Reflow lets repeated quick interactions restart the little bounce.
        void pumpkin.offsetWidth;
        pumpkin.classList.add("he-react");
        const timer = window.setTimeout(() => {
            pumpkin.classList.remove("he-react");
            cleanupTimers.delete(timer);
        }, 780);
        cleanupTimers.add(timer);
    }

    // Nearby cursor movements make pumpkins glow and bounce; clicks near one
    // also trigger the same visual reaction without preventing page controls.
    if (canHover) {
        window.addEventListener("pointermove", event => {
            const now = Date.now();
            if (now - lastCursorMove > 30) {
                const overHalloweenWidget = event.target instanceof Element && !!event.target.closest("#he-halloween-widget");
                if (overHalloweenWidget) {
                    layer.classList.remove("he-cursor-active");
                } else {
                    cursorGhost.style.transform = "translate3d(" +
                        Math.round(event.clientX + 16) + "px," +
                        Math.round(event.clientY + 14) + "px,0)";
                    layer.classList.add("he-cursor-active");
                }
                lastCursorMove = now;
            }

            pumpkins.forEach(pumpkin => {
                const rect = pumpkin.getBoundingClientRect();
                const dx = event.clientX - (rect.left + rect.width / 2);
                const dy = event.clientY - (rect.top + rect.height / 2);
                if (Math.hypot(dx, dy) < 72 && !pumpkin.classList.contains("he-react")) {
                    pumpkin.classList.add("he-react");
                    const timer = window.setTimeout(() => {
                        pumpkin.classList.remove("he-react");
                        cleanupTimers.delete(timer);
                    }, 780);
                    cleanupTimers.add(timer);
                }
            });
        }, { passive: true, signal: aborter.signal });

        window.addEventListener("pointerdown", event => {
            pumpkins.forEach(pumpkin => {
                const rect = pumpkin.getBoundingClientRect();
                if (event.clientX >= rect.left - 18 && event.clientX <= rect.right + 18 &&
                    event.clientY >= rect.top - 18 && event.clientY <= rect.bottom + 18) {
                    reactToPumpkin(pumpkin);
                }
            });
        }, { passive: true, signal: aborter.signal });

        window.addEventListener("pointerleave", () => {
            layer.classList.remove("he-cursor-active");
        }, { passive: true, signal: aborter.signal });
    }

    let cutoffTimer = null;
    function removeEffects() {
        aborter.abort();
        if (cutoffTimer !== null) window.clearTimeout(cutoffTimer);
        cleanupTimers.forEach(timer => window.clearTimeout(timer));
        cleanupTimers.clear();
        layer.remove();
        halloweenWidget.remove();
        widgetStyle.remove();
        style.remove();
    }

    // Remove effects and widget on the exact cutoff, including if the tab stays open.
    cutoffTimer = window.setTimeout(removeEffects, remaining);
    const checkCutoff = () => {
        if (Date.now() >= CUTOFF) removeEffects();
    };
    // Browsers may pause timers while a page is backgrounded or in the back/forward cache.
    window.addEventListener("pageshow", checkCutoff, { signal: aborter.signal });
    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") checkCutoff();
    }, { signal: aborter.signal });
})();