/* Scroll-driven activation for the Why You Should Select section. */
document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".why-select-section");
  if (!section) return;
  const items = [...section.querySelectorAll(".why-select-item")];
  if (!items.length) return;
  const update = () => {
    const rect = section.getBoundingClientRect();
    const travel = Math.max(1, rect.height - window.innerHeight);
    const progress = Math.min(1, Math.max(0, -rect.top / travel));
    const index = Math.min(items.length - 1, Math.floor(progress * items.length));
    items.forEach((item, i) => item.classList.toggle("active", i === index));
  };
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { update(); ticking = false; });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", update, { passive: true });
  update();
});
