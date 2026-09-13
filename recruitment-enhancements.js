document.addEventListener('DOMContentLoaded', function () {
  var whatsapp = 'https://wa.me/94777771498';
  function wa(program) { return whatsapp + '?text=' + encodeURIComponent('Hello Dr. Sandaruwan, I would like to get details about ' + program + '.'); }

  var hero = document.querySelector('.hero-buttons');
  if (hero && !hero.querySelector('.recruitment-join-btn')) {
    var join = document.createElement('a');
    join.className = 'btn btn-primary recruitment-join-btn';
    join.href = wa('joining a class'); join.target = '_blank'; join.rel = 'noopener';
    join.innerHTML = '<i class="fa-brands fa-whatsapp"></i> Join a Class';
    hero.prepend(join);
  }

  var cards = document.querySelectorAll('.program-card');
  var programs = ['Grade 10 Commerce', 'Grade 11 Commerce', 'A/L Accounting'];
  cards.forEach(function (card, i) {
    var link = card.querySelector('a');
    if (!link || !programs[i]) return;
    link.href = wa(programs[i]); link.target = '_blank'; link.rel = 'noopener';
    link.innerHTML = 'Get Class Details <i class="fa-solid fa-arrow-right"></i>';
  });

  document.querySelectorAll('.schedule-card').forEach(function (card, i) {
    if (!programs[i]) return;
    var p = card.querySelector('.schedule-info p');
    if (p) p.textContent = 'Schedule, venue & class details available on inquiry';
    var link = document.createElement('a');
    link.className = 'schedule-cta'; link.href = wa(programs[i]); link.target = '_blank'; link.rel = 'noopener';
    link.innerHTML = '<i class="fa-brands fa-whatsapp"></i> Get Details';
    card.appendChild(link);
  });

  var preview = document.querySelector('.portal-mini-stats');
  if (preview) preview.innerHTML = '<span><b>Model</b> Papers</span><span><b>Live</b> Progress</span><span><b>Online</b> Portal</span>';

  var contact = document.querySelector('#contact');
  if (contact && !document.querySelector('.recruitment-final-cta')) {
    var section = document.createElement('section'); section.className = 'recruitment-final-cta';
    section.innerHTML = '<div class="container"><div class="recruitment-final-card"><div><span class="eyebrow light">START YOUR JOURNEY</span><h2>Looking for the Right Commerce or Accounting Class?</h2><p>Get class details, schedules and joining information directly through WhatsApp.</p></div><div class="recruitment-final-actions"><a class="btn portal-white-btn" href="' + wa('joining a Commerce or Accounting class') + '" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i> Join a Class</a><a class="btn btn-outline light-outline" href="https://drsandaruwanperera.lk/studentportal/" target="_blank" rel="noopener"><i class="fa-solid fa-lock"></i> Student Portal</a></div></div></div>';
    contact.parentNode.insertBefore(section, contact);
  }

  if (!document.querySelector('.recruitment-whatsapp-fab')) {
    var fab = document.createElement('a'); fab.className = 'recruitment-whatsapp-fab'; fab.href = wa('joining a class'); fab.target = '_blank'; fab.rel = 'noopener';
    fab.setAttribute('aria-label', 'Contact Dr. Sandaruwan on WhatsApp about joining a class');
    fab.innerHTML = '<i class="fa-brands fa-whatsapp"></i><span>Join a Class</span>'; document.body.appendChild(fab);
  }
});