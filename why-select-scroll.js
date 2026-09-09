/* Build the reference-style Why You Should Select section and activate each benefit as the user scrolls. */
document.addEventListener("DOMContentLoaded", () => {
  const programs = document.querySelector(".programs-section");
  if (!programs || document.querySelector(".why-select-section")) return;

  const benefits = [
    ["fa-solid fa-shield-halved", "Accredited in", "4 qualifications", "top"],
    ["fa-solid fa-wallet", "Reasonable", "Class fees", "bottom"],
    ["fa-solid fa-person-chalkboard", "Not crashing", "Uni or Work life", "top"],
    ["fa-solid fa-medal", "300+ Prize winners", "in last 5 years", "bottom"],
    ["fa-solid fa-user-graduate", "85,000+", "students", "top"],
    ["fa-solid fa-trophy", "High Pass", "Students", "bottom"],
    ["fa-solid fa-users", "100%", "Syllabus Coverage", "top"],
    ["fa-solid fa-glasses", "Learn Anytime,", "Anywhere, Any number of times", "bottom"],
    ["fa-solid fa-chalkboard-user", "1,500+ CAs", "& ACCAs Produced", "top"]
  ];

  const section = document.createElement("section");
  section.className = "why-select-section";
  section.id = "why-select";
  section.innerHTML = `
    <div class="why-select-wrap">
      <h2 class="why-select-heading">Why you should select <span>Dr. Sandaruwan Perera</span></h2>
      <div class="why-select-stage" aria-label="Reasons to select Dr. Sandaruwan Perera">
        <div class="why-select-track" aria-hidden="true"></div>
        ${benefits.map((b, i) => `
          <div class="why-select-item${i === 0 ? " active" : ""}" data-index="${i}">
            <div class="why-select-label ${b[3]}">${b[1]}<br>${b[2]}</div>
            <div class="why-select-line" aria-hidden="true"></div>
            <div class="why-select-icon"><i class="${b[0]}" aria-hidden="true"></i></div>
          </div>`).join("")}
      </div>
      <p class="why-select-scroll-note"><strong>Scroll</strong> to move through the benefits</p>
    </div>`;

  programs.parentNode.insertBefore(section, programs);

  const items = [...section.querySelectorAll(".why-select-item")];
  if (!items.length) return;
  let ticking = false;

  const update = () => {
    const rect = section.getBoundingClientRect();
    const viewport = window.innerHeight || document.documentElement.clientHeight;
    const start = viewport * 0.82;
    const end = viewport * 0.18;
    const progress = Math.min(1, Math.max(0, (start - rect.top) / Math.max(1, rect.height - start + end)));
    const index = Math.min(items.length - 1, Math.floor(progress * items.length));
    items.forEach((item, i) => item.classList.toggle("active", i === index));
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { update(); ticking = false; });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", update, { passive: true });
  update();
});
