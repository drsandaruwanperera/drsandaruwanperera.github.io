document.addEventListener('DOMContentLoaded',function(){
  const main=document.getElementById('main-content'); if(!main) return;
  const qs=s=>document.querySelector(s);
  const feature=qs('.feature-strip'), resources=qs('#resources'), results=qs('#results'), programs=qs('#programs'), gallery=qs('#gallery'), contact=qs('#contact'), portal=qs('.portal-section'), about=qs('#about'), why=qs('.why-section'), schedule=qs('.schedule-section');
  if(feature&&resources) feature.after(resources);
  if(resources&&results) resources.after(results);
  const ranks=document.createElement('section');
  ranks.id='district-ranks';
  ranks.className='reference-ranks-section';
  ranks.innerHTML='<div class="container"><div class="reference-section-head"><div><span class="eyebrow"><i class="fa-solid fa-trophy"></i> OUR RESULTS</span><h2>2025 District Ranks - <span>A/L Commerce</span></h2><p>Selected ranks highlighted from the supplied 2025 results material.</p></div><a class="reference-outline-btn" href="#results">View All Results <i class="fa-solid fa-arrow-right"></i></a></div><div class="rank-carousel"><button class="rank-nav rank-prev" aria-label="Previous"><i class="fa-solid fa-chevron-left"></i></button><div class="rank-window"><div class="rank-track">'+[9,10,14,33,36,38,39,44,64,81,94,101,103,105,113,114,144,155,161,174,183,195,200].map((r,i)=>'<article class="rank-card"><div class="rank-avatar"><span>'+r+'</span></div><div class="rank-copy"><small>RANK</small><strong>'+r+'</strong><span>2025 A/L Commerce</span></div></article>').join('')+'</div></div><button class="rank-nav rank-next" aria-label="Next"><i class="fa-solid fa-chevron-right"></i></button></div><div class="rank-dots" aria-hidden="true"></div></div>';
  if(resources) resources.after(ranks);
  if(ranks&&programs) ranks.after(programs);
  const programsIntro=programs?.querySelector('.section-heading h2'); if(programsIntro) programsIntro.textContent='Structured Programs for Your Success';
  const stats=document.createElement('section'); stats.className='reference-stats-section'; stats.innerHTML='<div class="container reference-stats-grid"><div><i class="fa-solid fa-graduation-cap"></i><strong>10,000+</strong><span>Students Taught</span></div><div><i class="fa-solid fa-trophy"></i><strong>Outstanding</strong><span>Results Record</span></div><div><i class="fa-solid fa-book-open"></i><strong>Structured</strong><span>Learning System</span></div><div><i class="fa-solid fa-users"></i><strong>Personal</strong><span>Student Support</span></div></div></section>';
  if(programs) programs.after(stats);
  const testimonials=document.createElement('section'); testimonials.className='reference-testimonials-section'; testimonials.innerHTML='<div class="container"><div class="reference-section-head"><div><span class="eyebrow"><i class="fa-solid fa-comments"></i> STUDENT FEEDBACK</span><h2>What Our <span>Students Say</span></h2></div></div><div class="testimonial-grid"><article><i class="fa-solid fa-quote-left"></i><p>The teaching approach focuses on clear understanding, structured practice and examination preparation.</p><span>Learning approach</span></article><article><i class="fa-solid fa-quote-left"></i><p>Model papers and revision work are presented as part of a structured preparation system.</p><span>Practice resources</span></article><article><i class="fa-solid fa-quote-left"></i><p>Students are supported through continuous assessment and access to the Student Portal.</p><span>Student support</span></article></div></div>';
  if(stats) stats.after(testimonials);
  if(testimonials&&gallery) testimonials.after(gallery);
  if(about) about.classList.add('reference-secondary-section');
  if(why) why.classList.add('reference-secondary-section');
  if(schedule) schedule.classList.add('reference-secondary-section');
  if(portal) portal.classList.add('reference-secondary-section');
  const track=ranks.querySelector('.rank-track'), win=ranks.querySelector('.rank-window'), prev=ranks.querySelector('.rank-prev'), next=ranks.querySelector('.rank-next'), dots=ranks.querySelector('.rank-dots');
  if(track&&win){
    let page=0; const per=window.innerWidth<700?1:window.innerWidth<900?4:8; const pages=Math.ceil(track.children.length/per);
    for(let i=0;i<pages;i++){const d=document.createElement('span');d.className=i===0?'active':'';dots.appendChild(d)}
    const render=()=>{page=(page+pages)%pages; const offset=page*100; track.style.transform='translateX(-'+offset+'%)'; [...dots.children].forEach((d,i)=>d.classList.toggle('active',i===page))};
    prev.onclick=()=>{page--;render()}; next.onclick=()=>{page++;render()};
    let timer=setInterval(()=>{page++;render()},4500);
    win.addEventListener('mouseenter',()=>clearInterval(timer)); win.addEventListener('mouseleave',()=>timer=setInterval(()=>{page++;render()},4500));
  }
  if(contact){
    const cta=document.createElement('div'); cta.className='reference-ready-strip'; cta.innerHTML='<div><span class="eyebrow">READY TO BEGIN</span><h2>Your <span>Commerce Journey?</span></h2><p>Join thousands of successful students and take the next step towards a brighter future.</p></div><a class="btn btn-primary" href="https://wa.me/94777771498?text=Hello%20Dr.%20Sandaruwan%2C%20I%20would%20like%20to%20join%20a%20class." target="_blank" rel="noopener">Join a Class Now <i class="fa-solid fa-arrow-right"></i></a><div class="reference-ready-links"><a href="https://drsandaruwanperera.lk/studentportal/" target="_blank" rel="noopener"><i class="fa-solid fa-lock"></i><span><b>Student Portal</b>Access your learning materials</span><i class="fa-solid fa-chevron-right"></i></a><a href="https://wa.me/94777771498" target="_blank" rel="noopener"><i class="fa-solid fa-headset"></i><span><b>Get in Touch</b>Direct support and guidance</span><i class="fa-solid fa-chevron-right"></i></a></div></div>';
    contact.prepend(cta);
  }
});