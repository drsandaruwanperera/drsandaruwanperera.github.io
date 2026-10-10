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

  // Build lightweight 3D depth layers without adding extra image assets.
  const depthMarkup=`
    <span class="hero-depth-layer hero-depth-grid" aria-hidden="true"></span>
    <span class="hero-depth-layer hero-depth-ring" aria-hidden="true"></span>
    <span class="hero-depth-layer hero-depth-orb" aria-hidden="true"></span>
    <span class="hero-cursor-glow" aria-hidden="true"></span>
  `;
  if(!art.querySelector('.hero-depth-layer')) art.insertAdjacentHTML('afterbegin',depthMarkup);
  const depthGrid=art.querySelector('.hero-depth-grid');
  const depthRing=art.querySelector('.hero-depth-ring');
  const depthOrb=art.querySelector('.hero-depth-orb');
  const cursorGlow=art.querySelector('.hero-cursor-glow');

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
    depthGrid.style.transform=`translate3d(${x*-7}px,${y*-4}px,15px)`;
    depthRing.style.transform=`translate3d(${x*18}px,${y*10}px,55px) rotate(${x*8}deg)`;
    depthOrb.style.transform=`translate3d(${x*-24}px,${y*-14}px,95px) scale(1.06)`;
    cursorGlow.style.left=`${px-(r.left)}px`;
    cursorGlow.style.top=`${py-(r.top)}px`;
  };
  hero.addEventListener('pointermove',e=>{px=e.clientX;py=e.clientY;if(!raf)raf=requestAnimationFrame(apply)});
  hero.addEventListener('pointerleave',()=>{
    [art,copy,sir,books,watch,depthGrid,depthRing,depthOrb].forEach(el=>{if(el)el.style.transform=''});
    cursorGlow.style.opacity='0';
  });
  hero.addEventListener('pointerenter',()=>{cursorGlow.style.opacity='1'});
});

/* Professional scroll experience: progress, active navigation and polished section reveals. */
document.addEventListener('DOMContentLoaded',()=>{
  const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const bar=document.createElement('div');
  bar.className='site-scroll-progress';
  bar.setAttribute('aria-hidden','true');
  document.body.appendChild(bar);

  const updateProgress=()=>{
    const root=document.documentElement;
    const max=root.scrollHeight-window.innerHeight;
    const progress=max>0?Math.min(100,Math.max(0,window.scrollY/max*100)):0;
    bar.style.transform='scaleX('+(progress/100)+')';
  };
  updateProgress();
  window.addEventListener('scroll',updateProgress,{passive:true});
  window.addEventListener('resize',updateProgress);

  const navLinks=[...document.querySelectorAll('.header .links a[href^="#"]')];
  const sections=navLinks.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if('IntersectionObserver' in window && navLinks.length){
    const navObserver=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting)return;
        navLinks.forEach(link=>{
          const active=link.getAttribute('href')==='#'+entry.target.id;
          link.classList.toggle('active',active);
          if(active)link.setAttribute('aria-current','location');
          else link.removeAttribute('aria-current');
        });
      });
    },{rootMargin:'-28% 0px -58% 0px',threshold:0});
    sections.forEach(section=>navObserver.observe(section));
  }

  if(!reduceMotion && 'IntersectionObserver' in window){
    document.querySelectorAll('.path-card,.premium-resource-card,.legacy-qualification-grid>div,.legacy-achievements>div,.coming-card,.stat,.ready-links>a').forEach((el,i)=>{
      if(el.hasAttribute('data-motion'))return;
      el.setAttribute('data-motion','reveal');
      el.style.transitionDelay=(Math.min(i%4,3)*75)+'ms';
    });
    const unseen=[...document.querySelectorAll('[data-motion]:not(.is-visible)')];
    const revealObserver=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },{threshold:.10,rootMargin:'0px 0px -35px 0px'});
    unseen.forEach(el=>revealObserver.observe(el));
  }
});
