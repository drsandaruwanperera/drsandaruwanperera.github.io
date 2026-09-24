/* Premium motion layer */
document.addEventListener('DOMContentLoaded',()=>{
  const sections=[...document.querySelectorAll('main > section')];
  sections.forEach((section,i)=>{
    section.setAttribute('data-motion',i%3===1?'reveal-right':i%3===2?'reveal-left':'reveal');
  });
  document.querySelectorAll('.resource,.resource-card,.program,.program-card,.quote,.testimonial-grid article,.about-card,.why-card,.schedule-card,.feature-item,.strip-item').forEach((el,i)=>{
    el.setAttribute('data-motion','reveal');
    el.style.transitionDelay=(Math.min(i%5,4)*70)+'ms';
  });
  const targets=[...document.querySelectorAll('[data-motion]')];
  if(!('IntersectionObserver' in window)){targets.forEach(el=>el.classList.add('is-visible'));return}
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}})
  },{threshold:.12,rootMargin:'0px 0px -45px 0px'});
  targets.forEach(el=>observer.observe(el));
});
