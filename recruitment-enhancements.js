document.addEventListener('DOMContentLoaded', function () {
  const whatsapp = 'https://wa.me/94777771498';
  const wa = (program) => whatsapp + '?text=' + encodeURIComponent('Hello Dr. Sandaruwan, I would like to get details about ' + program + '.');
  const portal = 'https://drsandaruwanperera.lk/studentportal/';

  const addSection = (afterEl, id, html) => {
    if (!afterEl || document.getElementById(id)) return;
    const section = document.createElement('section');
    section.className = 'section recruitment-added-section';
    section.id = id;
    section.innerHTML = html;
    afterEl.insertAdjacentElement('afterend', section);
    return section;
  };

  /* 1. Recruitment-first hero CTA */
  const hero = document.querySelector('.hero-buttons');
  if (hero && !hero.querySelector('.recruitment-join-btn')) {
    const join = document.createElement('a');
    join.className = 'btn btn-primary recruitment-join-btn';
    join.href = wa('joining a class'); join.target = '_blank'; join.rel = 'noopener';
    join.innerHTML = '<i class="fa-brands fa-whatsapp"></i> Join a Class';
    hero.prepend(join);
  }

  /* 2. Program cards -> direct inquiry */
  const programs = ['Grade 10 Commerce', 'Grade 11 Commerce', 'A/L Accounting'];
  document.querySelectorAll('.program-card').forEach((card, i) => {
    const link = card.querySelector('a');
    if (!link || !programs[i]) return;
    link.href = wa(programs[i]); link.target = '_blank'; link.rel = 'noopener';
    link.innerHTML = 'Get Class Details <i class="fa-solid fa-arrow-right"></i>';
  });

  /* 3. Program cards get the recruitment information layer */
  const programDetails = [
    ['Theory & Foundation', 'Structured lessons', 'Model & practice papers', 'Continuous assessment', 'Student Portal access'],
    ['Syllabus & Revision', 'Exam-focused teaching', 'Model & past-paper practice', 'Continuous assessment', 'Student Portal access'],
    ['Complete Syllabus', 'Structured exam preparation', 'Model & province papers', 'Continuous assessment', 'Student Portal access']
  ];
  document.querySelectorAll('.program-card').forEach((card, i) => {
    if (card.querySelector('.program-benefits') || !programDetails[i]) return;
    const ul = document.createElement('ul');
    ul.className = 'program-benefits';
    programDetails[i].forEach(item => { const li = document.createElement('li'); li.innerHTML = '<i class="fa-solid fa-check"></i><span>' + item + '</span>'; ul.appendChild(li); });
    const link = card.querySelector('a');
    if (link) link.before(ul);
  });

  /* 4. Schedule cards -> inquiry CTA */
  document.querySelectorAll('.schedule-card').forEach((card, i) => {
    if (!programs[i] || card.querySelector('.schedule-cta')) return;
    const p = card.querySelector('.schedule-info p');
    if (p) p.textContent = 'Schedule, venue & class details available on inquiry';
    const link = document.createElement('a');
    link.className = 'schedule-cta'; link.href = wa(programs[i]); link.target = '_blank'; link.rel = 'noopener';
    link.innerHTML = '<i class="fa-brands fa-whatsapp"></i> Get Details';
    card.appendChild(link);
  });

  /* 5. Replace fake-looking portal numbers with honest product features */
  const preview = document.querySelector('.portal-mini-stats');
  if (preview) preview.innerHTML = '<span><b>Model</b> Papers</span><span><b>Live</b> Progress</span><span><b>Online</b> Portal</span>';

  /* 6. 2025 results graphic intentionally removed from the homepage. */
  const results = document.getElementById('results');
  if (results) {
    results.querySelectorAll('.results-live-showcase').forEach(el => el.remove());
    const oldHeading = results.querySelector('.results-heading');
    const oldStats = results.querySelector('.results-stat-grid');
    if (oldHeading) oldHeading.style.display = '';
    if (oldStats) oldStats.style.display = '';
  }

  /* 7. Teacher authority section — factual claims kept conservative */
  addSection(document.getElementById('about'), 'teacher-profile', '<div class="container"><div class="section-heading reveal"><div><span class="eyebrow">TEACHER PROFILE</span><h2>Learn With Experience, Structure & Purpose</h2><p>Dr. Sandaruwan Perera focuses on Commerce and Accounting education with a teaching journey dating back to 2002.</p></div></div><div class="teacher-profile-grid"><div class="teacher-profile-main"><div class="teacher-profile-badge"><i class="fa-solid fa-chalkboard-user"></i></div><div><h3>Commerce & Accounting Education</h3><p>Concept clarity, structured practice and examination readiness are at the centre of the learning approach.</p></div></div><div class="teacher-proof"><strong>2002</strong><span>Teaching Since</span></div><div class="teacher-proof"><strong>Grade 10–11</strong><span>Commerce</span></div><div class="teacher-proof"><strong>A/L</strong><span>Accounting</span></div></div></div>');

  /* 8. Parent trust section */
  addSection(document.querySelector('.portal-section'), 'parents', '<div class="container"><div class="section-heading reveal"><div><span class="eyebrow">FOR PARENTS</span><h2>A Structured Learning Environment For Your Child</h2><p>Understand how the learning experience supports consistency, practice and examination preparation.</p></div></div><div class="parent-grid"><article class="parent-card"><i class="fa-solid fa-clipboard-check"></i><h3>Regular Assessment</h3><p>Students can practise and follow assessment work through the learning system.</p></article><article class="parent-card"><i class="fa-solid fa-chart-line"></i><h3>Progress Awareness</h3><p>Student progress can be followed through the Student Assessment Portal.</p></article><article class="parent-card"><i class="fa-solid fa-file-lines"></i><h3>Practice Resources</h3><p>Model papers and examination-focused resources support consistent preparation.</p></article><article class="parent-card"><i class="fa-brands fa-whatsapp"></i><h3>Direct Class Information</h3><p>Get current class schedules and joining information directly through WhatsApp.</p></article></div></div>');

  /* 9. Testimonials placeholder is deliberately not invented. Use a clear collection CTA instead. */
  addSection(document.getElementById('gallery'), 'student-stories', '<div class="container"><div class="section-heading reveal"><div><span class="eyebrow">STUDENT STORIES</span><h2>Real Student Experiences</h2><p>We value genuine student and parent feedback. Testimonials can be added here once approved by the respective students or parents.</p></div></div><div class="story-request-card"><div><i class="fa-solid fa-quote-left"></i><h3>Share Your Learning Experience</h3><p>Current students and parents can contact us to provide an approved testimonial for the website.</p></div><a class="btn btn-primary" href="' + wa('sharing a student or parent testimonial') + '" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i> Contact Us</a></div></div>');

  /* 10. FAQ for conversion + search intent */
  addSection(document.getElementById('student-stories'), 'faq', '<div class="container"><div class="section-heading reveal"><div><span class="eyebrow">FREQUENTLY ASKED QUESTIONS</span><h2>Questions Before You Join?</h2><p>Quick answers about classes, resources and the Student Portal.</p></div></div><div class="faq-grid"><div class="faq-item"><div class="faq-question">Which classes are available?</div><div class="faq-answer">Grade 10 Commerce, Grade 11 Commerce and A/L Accounting programs are presented on this website.</div></div><div class="faq-item"><div class="faq-question">How can I get the current class schedule?</div><div class="faq-answer">Class schedules, venues and current joining information can be requested directly through WhatsApp.</div></div><div class="faq-item"><div class="faq-question">Are model and past papers available?</div><div class="faq-answer">Learning resources are provided through the Student Assessment Portal, according to the relevant student program.</div></div><div class="faq-item"><div class="faq-question">How does the Student Portal help students?</div><div class="faq-answer">The portal provides access to learning resources, assessments and progress-related features.</div></div><div class="faq-item"><div class="faq-question">How do I join a class?</div><div class="faq-answer">Use any Join a Class or Get Class Details button to contact Dr. Sandaruwan directly through WhatsApp.</div></div><div class="faq-item"><div class="faq-question">Can parents request class information?</div><div class="faq-answer">Yes. Parents can use WhatsApp to request current class details and joining information.</div></div></div></div>');

  /* 11. Final conversion block */
  const contact = document.getElementById('contact');
  if (contact && !document.querySelector('.recruitment-final-cta')) {
    const section = document.createElement('section'); section.className = 'recruitment-final-cta';
    section.innerHTML = '<div class="container"><div class="recruitment-final-card"><div><span class="eyebrow light">START YOUR JOURNEY</span><h2>Ready to Choose the Right Commerce or Accounting Class?</h2><p>Get current class details, schedules and joining information directly through WhatsApp.</p></div><div class="recruitment-final-actions"><a class="btn portal-white-btn" href="' + wa('joining a Commerce or Accounting class') + '" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i> Join a Class</a><a class="btn btn-outline light-outline" href="' + portal + '" target="_blank" rel="noopener"><i class="fa-solid fa-lock"></i> Student Portal</a></div></div></div>';
    contact.parentNode.insertBefore(section, contact);
  }

  /* 12. Floating mobile-friendly recruitment CTA */
  if (!document.querySelector('.recruitment-whatsapp-fab')) {
    const fab = document.createElement('a'); fab.className = 'recruitment-whatsapp-fab'; fab.href = wa('joining a class'); fab.target = '_blank'; fab.rel = 'noopener';
    fab.setAttribute('aria-label', 'Contact Dr. Sandaruwan on WhatsApp about joining a class');
    fab.innerHTML = '<i class="fa-brands fa-whatsapp"></i><span>Join a Class</span>'; document.body.appendChild(fab);
  }

  /* FAQ interaction for dynamically-created items */
  document.querySelectorAll('#faq .faq-item').forEach(item => {
    const q = item.querySelector('.faq-question');
    const a = item.querySelector('.faq-answer');
    if (!q || !a || q.dataset.bound) return;
    q.dataset.bound = '1'; q.tabIndex = 0; q.setAttribute('role','button'); q.setAttribute('aria-expanded','false');
    const toggle = () => { const active = item.classList.contains('active'); document.querySelectorAll('#faq .faq-item').forEach(x => { x.classList.remove('active'); const xa=x.querySelector('.faq-answer'); const xq=x.querySelector('.faq-question'); if(xa) xa.style.maxHeight=null; if(xq) xq.setAttribute('aria-expanded','false'); }); if(!active){item.classList.add('active');a.style.maxHeight=a.scrollHeight+'px';q.setAttribute('aria-expanded','true');} };
    q.addEventListener('click', toggle); q.addEventListener('keydown', e => { if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle();} });
  });
});
