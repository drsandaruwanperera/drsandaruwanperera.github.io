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
                cursorGhost.style.transform = "translate3d(" +
                    Math.round(event.clientX + 16) + "px," +
                    Math.round(event.clientY + 14) + "px,0)";
                layer.classList.add("he-cursor-active");
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

    function removeEffects() {
        aborter.abort();
        cleanupTimers.forEach(timer => window.clearTimeout(timer));
        cleanupTimers.clear();
        layer.remove();
        style.remove();
    }

    // Also remove immediately if the page stays open across the cutoff.
    const cutoffTimer = window.setTimeout(removeEffects, remaining);
    window.addEventListener("pagehide", () => {
        window.clearTimeout(cutoffTimer);
        aborter.abort();
    }, { once: true });
})();