(function(){
  'use strict';

  const icon = (name) => '<i class="fa-solid fa-' + name + '"></i>';

  function enhanceHero(){
    const heroVisual = document.querySelector('.hero-visual');
    if(!heroVisual || document.getElementById('hero-learning-dashboard')) return;

    const oldPhoto = heroVisual.querySelector('.portrait-photo-wrap');
    const oldCircle = heroVisual.querySelector('.portrait-circle');
    const oldGlow = heroVisual.querySelector('.portrait-glow');
    const oldProfile = heroVisual.querySelector('.profile-card');
    [oldPhoto,oldCircle,oldGlow,oldProfile].forEach(el=>{ if(el) el.classList.add('legacy-hero-detail'); });

    const panel = document.createElement('div');
    panel.id = 'hero-learning-dashboard';
    panel.className = 'hero-learning-dashboard';
    panel.innerHTML =
      '<div class="hero-dashboard-top">' +
        '<div><span class="hero-dashboard-kicker">ACCOUNTING LEARNING</span><strong>Smart study. Clear progress.</strong></div>' +
        '<span class="hero-live-dot">LIVE</span>' +
      '</div>' +
      '<div class="hero-dashboard-main">' +
        '<div class="hero-chart-card">' +
          '<div class="hero-chart-head"><span>Learning Progress</span><strong>82%</strong></div>' +
          '<div class="hero-chart"><span style="height:32%"></span><span style="height:46%"></span><span style="height:41%"></span><span style="height:58%"></span><span style="height:67%"></span><span style="height:78%"></span><span style="height:88%"></span></div>' +
          '<div class="hero-chart-labels"><span>Week 1</span><span>Week 7</span></div>' +
        '</div>' +
        '<div class="hero-mini-stack">' +
          '<div class="hero-mini-card"><b>' + icon('calculator') + '</b><span>Accounting</span><strong>Practice</strong></div>' +
          '<div class="hero-mini-card"><b>' + icon('file-lines') + '</b><span>Model Papers</span><strong>Ready</strong></div>' +
        '</div>' +
      '</div>' +
      '<div class="hero-dashboard-bottom">' +
        '<span>' + icon('circle-check') + ' Structured learning</span>' +
        '<span>' + icon('chart-line') + ' Continuous progress</span>' +
        '<span>' + icon('graduation-cap') + ' Exam focused</span>' +
      '</div>';
    heroVisual.prepend(panel);
  }

  function addSectionProgress(){
    const sections = [...document.querySelectorAll('main > section')];
    if(!sections.length || document.getElementById('section-progress')) return;
    const wrap=document.createElement('div');
    wrap.id='section-progress';
    wrap.setAttribute('aria-hidden','true');
    sections.forEach((section,i)=>{
      const dot=document.createElement('span');
      dot.dataset.index=i;
      wrap.appendChild(dot);
    });
    document.body.appendChild(wrap);
    const dots=[...wrap.children];
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          const index=sections.indexOf(entry.target);
          dots.forEach((d,i)=>d.classList.toggle('active',i===index));
        }
      });
    },{rootMargin:'-35% 0px -55% 0px',threshold:0});
    sections.forEach(s=>observer.observe(s));
  }

  function addScrollProgress(){
    if(document.getElementById('page-progress')) return;
    const bar=document.createElement('div');
    bar.id='page-progress';
    bar.setAttribute('aria-hidden','true');
    document.body.appendChild(bar);
    const update=()=>{
      const h=document.documentElement.scrollHeight-window.innerHeight;
      const p=h>0?(window.scrollY/h)*100:0;
      bar.style.width=p+'%';
    };
    window.addEventListener('scroll',update,{passive:true});
    window.addEventListener('resize',update);
    update();
  }

  function enhanceCards(){
    document.querySelectorAll('.program-card,.about-card,.why-card,.resource-card,.schedule-card,.big-stat-card,.teacher-proof,.parent-card').forEach((card,i)=>{
      card.style.setProperty('--upgrade-delay',(i%6)*45+'ms');
      card.classList.add('upgrade-card');
    });
  }

  function enhanceGallery(){
    const gallery=document.querySelector('.gallery-grid');
    if(!gallery || gallery.dataset.upgraded) return;
    gallery.dataset.upgraded='1';
    const items=[...gallery.children];
    if(items.length<2) return;
    items.forEach((item,i)=>{
      item.classList.add('gallery-upgrade-item');
      item.style.setProperty('--gallery-index',i);
    });
  }

  function improveNav(){
    const nav=document.querySelector('.nav');
    if(!nav || nav.querySelector('.nav-highlight')) return;
    const marker=document.createElement('span');
    marker.className='nav-highlight';
    nav.appendChild(marker);
    const move=link=>{
      if(!link) return;
      const r=link.getBoundingClientRect(), nr=nav.getBoundingClientRect();
      marker.style.width=r.width+'px';
      marker.style.transform='translateX('+(r.left-nr.left)+'px)';
      marker.style.opacity='1';
    };
    document.querySelectorAll('.nav-link').forEach(link=>{
      link.addEventListener('mouseenter',()=>move(link));
      link.addEventListener('focus',()=>move(link));
    });
    const active=nav.querySelector('.nav-link.active');
    if(active) move(active);
  }

  function addVideoReadyHero(){
    const hero=document.querySelector('.hero');
    if(!hero || hero.querySelector('.hero-media-fallback')) return;

    const media=document.createElement('div');
    media.className='hero-media-fallback';
    media.setAttribute('aria-hidden','true');
    media.innerHTML =
      '<div class="media-grid"></div>' +
      '<div class="media-orbit media-orbit-one"></div>' +
      '<div class="media-orbit media-orbit-two"></div>' +
      '<div class="media-float media-float-one">' + icon('calculator') + '</div>' +
      '<div class="media-float media-float-two">' + icon('chart-column') + '</div>' +
      '<div class="media-float media-float-three">' + icon('file-invoice-dollar') + '</div>';
    hero.prepend(media);
  }

  function init(){
    enhanceHero();
    addVideoReadyHero();
    enhanceCards();
    enhanceGallery();
    improveNav();
    addScrollProgress();
    addSectionProgress();
    document.body.classList.add('full-upgrade-active');
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init);
  else init();
})();