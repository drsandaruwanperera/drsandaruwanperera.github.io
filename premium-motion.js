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


/* Hero 3D mouse parallax */
document.addEventListener('DOMContentLoaded',()=>{
  const hero=document.querySelector('.hero');
  const art=document.querySelector('.hero-art');
  const copy=document.querySelector('.hero-copy');
  const sir=document.querySelector('.hero-art .sir');
  const books=document.querySelector('.hero-art .books');
  const watch=document.querySelector('.hero-art .watch');
  if(!hero||!art||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;

  let raf=0,px=0,py=0;
  const reset=()=>{
    [art,copy,sir,books,watch].forEach(el=>{if(el)el.style.transform=''});
  };
  const apply=()=>{
    raf=0;
    const r=hero.getBoundingClientRect();
    const x=Math.max(-1,Math.min(1,(px-(r.left+r.width/2))/(r.width/2)));
    const y=Math.max(-1,Math.min(1,(py-(r.top+r.height/2))/(r.height/2)));
    art.style.transform=`rotateY(${x*2.8}deg) rotateX(${-y*1.8}deg) translate3d(${x*4}px,${y*2}px,0)`;
    copy.style.transform=`translate3d(${x*-7}px,${y*-3}px,35px)`;
    sir.style.transform=`translate3d(${x*12}px,${y*7}px,80px) scale(1.02)`;
    books.style.transform=`translate3d(${x*-9}px,${y*-5}px,45px)`;
    watch.style.transform=`translate3d(${x*15}px,${y*8}px,65px)`;
  };
  hero.addEventListener('pointermove',e=>{px=e.clientX;py=e.clientY;if(!raf)raf=requestAnimationFrame(apply)});
  hero.addEventListener('pointerleave',reset);
});