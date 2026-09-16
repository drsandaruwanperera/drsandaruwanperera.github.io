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

  const hero = document.querySelector('.hero-buttons');
  if (hero && !hero.querySelector('.recruitment-join-btn')) {
    const join = document.createElement('a');
    join.className = 'btn btn-primary recruitment-join-btn';
    join.href = wa('joining a class'); join.target = '_blank'; join.rel = 'noopener';
    join.innerHTML = '<i class="fa-brands fa-whatsapp"></i> Join a Class';
    hero.prepend(join);
  }

  const programs = ['Grade 10 Commerce', 'Grade 11 Commerce', 'A/L Accounting'];
  document.querySelectorAll('.program-card').forEach((card, i) => {
    const link = card.querySelector('a');
    if (!link || !programs[i]) return;
    link.href = wa(programs[i]); link.target = '_blank'; link.rel = 'noopener';
    link.innerHTML = 'Get Class Details <i class="fa-solid fa-arrow-right"></i>';
  });

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

  document.querySelectorAll('.schedule-card').forEach((card, i) => {
    if (!programs[i] || card.querySelector('.schedule-cta')) return;
    const p = card.querySelector('.schedule-info p');
    if (p) p.textContent = 'Schedule, venue & class details available on inquiry';
    const link = document.createElement('a');
    link.className = 'schedule-cta'; link.href = wa(programs[i]); link.target = '_blank'; link.rel = 'noopener';
    link.innerHTML = '<i class="fa-brands fa-whatsapp"></i> Get Details';
    card.appendChild(link);
  });

  const preview = document.querySelector('.portal-mini-stats');
  if (preview) preview.innerHTML = '<span><b>Model</b> Papers</span><span><b>Live</b> Progress</span><span><b>Online</b> Portal</span>';

  const results = document.getElementById('results');
  if (results) {
    results.querySelectorAll('.results-live-showcase').forEach(el => el.remove());
    const oldHeading = results.querySelector('.results-heading');
    const oldStats = results.querySelector('.results-stat-grid');
    if (oldHeading) oldHeading.style.display = '';
    if (oldStats) oldStats.style.display = '';
  }

  addSection(document.getElementById('about'), 'teacher-profile', '<div class="container"><div class="section-heading reveal"><div><span class="eyebrow">TEACHER PROFILE</span><h2>Learn With Experience, Structure & Purpose</h2><p>Dr. Sandaruwan Perera focuses on Commerce and Accounting education with a teaching journey dating back to 2002.</p></div></div><div class="teacher-profile-grid"><div class="teacher-profile-main"><div class="teacher-profile-badge"><i class="fa-solid fa-chalkboard-user"></i></div><div><h3>Commerce & Accounting Education</h3><p>Concept clarity, structured practice and examination readiness are at the centre of the learning approach.</p></div></div><div class="teacher-proof"><strong>2002</strong><span>Teaching Since</span></div><div class="teacher-proof"><strong>Grade 10–11</strong><span>Commerce</span></div><div class="teacher-proof"><strong>A/L</strong><span>Accounting</span></div></div></div>');

  addSection(document.querySelector('.portal-section'), 'parents', '<div class="container"><div class="section-heading reveal"><div><span class="eyebrow">FOR PARENTS</span><h2>A Structured Learning Environment For Your Child</h2><p>Understand how the learning experience supports consistency, practice and examination preparation.</p></div></div><div class="parent-grid"><article class="parent-card"><i class="fa-solid fa-clipboard-check"></i><h3>Regular Assessment</h3><p>Students can practise and follow assessment work through the learning system.</p></article><article class="parent-card"><i class="fa-solid fa-chart-line"></i><h3>Progress Awareness</h3><p>Student progress can be followed through the Student Assessment Portal.</p></article><article class="parent-card"><i class="fa-solid fa-file-lines"></i><h3>Practice Resources</h3><p>Model papers and examination-focused resources support consistent preparation.</p></article><article class="parent-card"><i class="fa-brands fa-whatsapp"></i><h3>Direct Class Information</h3><p>Get current class schedules and joining information directly through WhatsApp.</p></article></div></div>');

  addSection(document.getElementById('gallery'), 'student-stories', '<div class="container"><div class="section-heading reveal"><div><span class="eyebrow">STUDENT STORIES</span><h2>Real Student Experiences</h2><p>We value genuine student and parent feedback. Testimonials can be added here once approved by the respective students or parents.</p></div></div><div class="story-request-card"><div><i class="fa-solid fa-quote-left"></i><h3>Share Your Learning Experience</h3><p>Current students and parents can contact us to provide an approved testimonial for the website.</p></div><a class="btn btn-primary" href="' + wa('sharing a student or parent testimonial') + '" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i> Contact Us</a></div></div>');

  addSection(document.getElementById('student-stories'), 'faq', '<div class="container"><div class="section-heading reveal"><div><span class="eyebrow">FREQUENTLY ASKED QUESTIONS</span><h2>Questions Before You Join?</h2><p>Quick answers about classes, resources and the Student Portal.</p></div></div><div class="faq-grid"><div class="faq-item"><div class="faq-question">Which classes are available?</div><div class="faq-answer">Grade 10 Commerce, Grade 11 Commerce and A/L Accounting programs are presented on this website.</div></div><div class="faq-item"><div class="faq-question">How can I get the current class schedule?</div><div class="faq-answer">Class schedules, venues and current joining information can be requested directly through WhatsApp.</div></div><div class="faq-item"><div class="faq-question">Are model and past papers available?</div><div class="faq-answer">Learning resources are provided through the Student Assessment Portal, according to the relevant student program.</div></div><div class="faq-item"><div class="faq-question">How does the Student Portal help students?</div><div class="faq-answer">The portal provides access to learning resources, assessments and progress-related features.</div></div><div class="faq-item"><div class="faq-question">How do I join a class?</div><div class="faq-answer">Use any Join a Class or Get Class Details button to contact Dr. Sandaruwan directly through WhatsApp.</div></div><div class="faq-item"><div class="faq-question">Can parents request class information?</div><div class="faq-answer">Yes. Parents can use WhatsApp to request current class details and joining information.</div></div></div></div>');

  const contact = document.getElementById('contact');
  if (contact && !document.querySelector('.recruitment-final-cta')) {
    const section = document.createElement('section'); section.className = 'recruitment-final-cta';
    section.innerHTML = '<div class="container"><div class="recruitment-final-card"><div><span class="eyebrow light">START YOUR JOURNEY</span><h2>Ready to Choose the Right Commerce or Accounting Class?</h2><p>Get current class details, schedules and joining information directly through WhatsApp.</p></div><div class="recruitment-final-actions"><a class="btn portal-white-btn" href="' + wa('joining a Commerce or Accounting class') + '" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i> Join a Class</a><a class="btn btn-outline light-outline" href="' + portal + '" target="_blank" rel="noopener"><i class="fa-solid fa-lock"></i> Student Portal</a></div></div></div>';
    contact.parentNode.insertBefore(section, contact);
  }

  if (!document.querySelector('.recruitment-whatsapp-fab')) {
    const fab = document.createElement('a'); fab.className = 'recruitment-whatsapp-fab'; fab.href = wa('joining a class'); fab.target = '_blank'; fab.rel = 'noopener';
    fab.setAttribute('aria-label', 'Contact Dr. Sandaruwan on WhatsApp about joining a class');
    fab.innerHTML = '<i class="fa-brands fa-whatsapp"></i><span>Join a Class</span>'; document.body.appendChild(fab);
  }

  document.querySelectorAll('#faq .faq-item').forEach(item => {
    const q = item.querySelector('.faq-question');
    const a = item.querySelector('.faq-answer');
    if (!q || !a || q.dataset.bound) return;
    q.dataset.bound = '1'; q.tabIndex = 0; q.setAttribute('role','button'); q.setAttribute('aria-expanded','false');
    const toggle = () => { const active = item.classList.contains('active'); document.querySelectorAll('#faq .faq-item').forEach(x => { x.classList.remove('active'); const xa=x.querySelector('.faq-answer'); const xq=x.querySelector('.faq-question'); if(xa) xa.style.maxHeight=null; if(xq) xq.setAttribute('aria-expanded','false'); }); if(!active){item.classList.add('active');a.style.maxHeight=a.scrollHeight+'px';q.setAttribute('aria-expanded','true');} };
    q.addEventListener('click', toggle); q.addEventListener('keydown', e => { if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle();} });
  });

  /* Facebook-style auto-swiping social strip.
     The Facebook share URL is kept as the single source link. Facebook does not expose
     public post media to a static GitHub Pages site without a Page/app access token, so
     this UI intentionally does not invent or scrape fake post data. */
  if (!document.getElementById('facebook-updates')) {
    const facebookUrl = 'https://www.facebook.com/share/1GX47aK3SV/?mibextid=wwXIfr';
    const section = document.createElement('section');
    section.className = 'facebook-updates-section';
    section.id = 'facebook-updates';
    section.innerHTML = `
      <div class="container">
        <div class="facebook-updates-heading">
          <div>
            <span class="eyebrow"><i class="fa-brands fa-facebook-f"></i> FACEBOOK UPDATES</span>
            <h2>Follow the Latest Updates</h2>
            <p>New announcements, class updates and educational content are shared on Facebook.</p>
          </div>
          <a class="facebook-follow-btn" href="${facebookUrl}" target="_blank" rel="noopener"><i class="fa-brands fa-facebook-f"></i> Visit Facebook</a>
        </div>
        <div class="facebook-carousel" aria-label="Facebook update links">
          <div class="facebook-track">
            ${[
              ['Latest Updates','Announcements & new class information','fa-bullhorn'],
              ['Class Updates','Current classes, schedules & notices','fa-calendar-days'],
              ['Learning Content','Accounting & Commerce learning highlights','fa-book-open'],
              ['Exam Preparation','Papers, revision & examination tips','fa-file-lines'],
              ['Student Highlights','Learning milestones & achievements','fa-user-graduate'],
              ['More on Facebook','Open the page for the newest posts','fa-arrow-up-right-from-square']
            ].map(([title,text,icon]) => `<a class="facebook-card" href="${facebookUrl}" target="_blank" rel="noopener"><div class="facebook-card-icon"><i class="fa-brands fa-facebook-f"></i></div><span>FACEBOOK</span><h3>${title}</h3><p>${text}</p><strong>View on Facebook <i class="fa-solid ${icon}"></i></strong></a>`).join('')}
          </div>
        </div>
      </div>`;
    const contactSection = document.getElementById('contact');
    if (contactSection) contactSection.insertAdjacentElement('beforebegin', section);
    else document.querySelector('main')?.appendChild(section);

    const style = document.createElement('style');
    style.id = 'facebookUpdatesStyles';
    style.textContent = `
      .facebook-updates-section{padding:82px 0;background:#0b1020;overflow:hidden}
      .facebook-updates-heading{display:flex;align-items:end;justify-content:space-between;gap:24px;margin-bottom:28px}
      .facebook-updates-heading h2{margin:8px 0 8px;color:#f4f7ff}
      .facebook-updates-heading p{margin:0;color:#aeb8ce;max-width:680px}
      .facebook-updates-heading .eyebrow{color:#a6ff2e}
      .facebook-follow-btn{display:inline-flex;align-items:center;gap:9px;padding:13px 19px;border-radius:999px;background:#4037c9;color:#fff;text-decoration:none;font-weight:800;white-space:nowrap;box-shadow:0 10px 28px rgba(64,55,201,.28)}
      .facebook-carousel{position:relative;overflow:hidden;padding:10px 0 22px;mask-image:linear-gradient(to right,transparent 0,#000 5%,#000 95%,transparent 100%)}
      .facebook-track{display:flex;gap:18px;width:max-content;animation:facebookAutoSwipe 30s linear infinite}
      .facebook-carousel:hover .facebook-track,.facebook-carousel:focus-within .facebook-track{animation-play-state:paused}
      .facebook-card{width:280px;min-height:235px;box-sizing:border-box;flex:0 0 280px;padding:23px;border-radius:22px;background:linear-gradient(145deg,#151f35,#11182b);border:1px solid rgba(255,255,255,.09);box-shadow:0 16px 42px rgba(0,0,0,.22);text-decoration:none;color:#f4f7ff;transition:transform .25s ease,border-color .25s ease,box-shadow .25s ease}
      .facebook-card:hover{transform:translateY(-7px);border-color:rgba(166,255,46,.38);box-shadow:0 22px 50px rgba(0,0,0,.3)}
      .facebook-card-icon{width:45px;height:45px;border-radius:14px;display:grid;place-items:center;background:#1877f2;color:#fff;font-size:21px;margin-bottom:18px}
      .facebook-card span{font-size:10px;letter-spacing:.16em;font-weight:900;color:#a6ff2e}
      .facebook-card h3{margin:8px 0 9px;font-size:19px}
      .facebook-card p{margin:0 0 22px;color:#aeb8ce;line-height:1.55;font-size:13px;min-height:41px}
      .facebook-card strong{font-size:12px;color:#f4f7ff}
      .facebook-card strong i{color:#a6ff2e;margin-left:5px}
      @keyframes facebookAutoSwipe{from{transform:translateX(0)}to{transform:translateX(calc(-50% - 9px))}}
      @media(max-width:760px){.facebook-updates-heading{align-items:flex-start;flex-direction:column}.facebook-follow-btn{width:max-content}.facebook-card{width:250px;flex-basis:250px;min-height:220px}.facebook-track{gap:14px;animation-duration:26s}}
      @media(prefers-reduced-motion:reduce){.facebook-track{animation:none;overflow:auto}}
    `;
    document.head.appendChild(style);
  }
});
