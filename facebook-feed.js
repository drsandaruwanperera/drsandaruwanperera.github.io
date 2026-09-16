(function () {
  'use strict';

  const FEED_URL = './assets/facebook-feed.json?v=1';
  const FALLBACK_FACEBOOK_URL = 'https://www.facebook.com/share/1GX47aK3SV/?mibextid=wwXIfr';

  const escapeHtml = (value) => String(value || '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[char]));

  const formatDate = (value) => {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    return new Intl.DateTimeFormat('en-LK', { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
  };

  const iconFor = (post) => {
    const type = String(post.type || '').toLowerCase();
    if (type.includes('video')) return 'fa-play';
    if (post.image) return 'fa-image';
    return 'fa-facebook-f';
  };

  const render = (posts) => {
    const section = document.getElementById('facebook-updates');
    if (!section || !Array.isArray(posts) || !posts.length) return;

    const facebookUrl = posts[0].page_url || FALLBACK_FACEBOOK_URL;
    const cards = posts.map((post) => {
      const title = post.title || (post.message ? post.message.split(/\s+/).slice(0, 8).join(' ') + (post.message.split(/\s+/).length > 8 ? '…' : '') : 'Latest Facebook Update');
      const text = post.message || 'See the latest update on Facebook.';
      const image = post.image ? `<img src="${escapeHtml(post.image)}" alt="" loading="lazy" referrerpolicy="no-referrer">` : `<div class="live-facebook-card-placeholder"><i class="fa-brands fa-facebook-f"></i></div>`;
      const date = formatDate(post.created_time);
      return `<a class="facebook-card live-facebook-card" href="${escapeHtml(post.permalink_url || facebookUrl)}" target="_blank" rel="noopener">
        <div class="live-facebook-card-media">${image}<span class="live-facebook-card-badge"><i class="fa-brands fa-facebook-f"></i> Facebook</span></div>
        <div class="live-facebook-card-body"><div class="live-facebook-card-meta">${date ? escapeHtml(date) : 'Latest update'}</div><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p><strong>View post <i class="fa-solid fa-arrow-up-right-from-square"></i></strong></div>
      </a>`;
    }).join('');

    const trackCards = cards + cards;
    section.innerHTML = `<div class="container">
      <div class="facebook-updates-heading">
        <div><span class="eyebrow"><i class="fa-brands fa-facebook-f"></i> FACEBOOK UPDATES</span><h2>Follow the Latest Updates</h2><p>Latest posts from the Facebook page, automatically refreshed for the website.</p></div>
        <a class="facebook-follow-btn" href="${escapeHtml(facebookUrl)}" target="_blank" rel="noopener"><i class="fa-brands fa-facebook-f"></i> Visit Facebook</a>
      </div>
      <div class="facebook-carousel live-facebook-carousel" aria-label="Latest Facebook posts"><div class="facebook-track">${trackCards}</div></div>
    </div>`;

    const style = document.createElement('style');
    style.id = 'liveFacebookFeedStyles';
    style.textContent = `
      .live-facebook-card{padding:0;overflow:hidden;display:block}
      .live-facebook-card-media{height:155px;position:relative;background:#11182b;overflow:hidden}
      .live-facebook-card-media img{width:100%;height:100%;display:block;object-fit:cover}
      .live-facebook-card-badge{position:absolute;left:12px;top:12px;padding:6px 9px;border-radius:999px;background:rgba(10,14,27,.82);backdrop-filter:blur(8px);font-size:10px;font-weight:800;color:#fff;text-transform:uppercase;letter-spacing:.04em}
      .live-facebook-card-placeholder{height:100%;display:grid;place-items:center;font-size:42px;color:#1877f2;background:radial-gradient(circle at center,#1d2b4a 0,#11182b 70%)}
      .live-facebook-card-body{padding:17px 19px 20px}
      .live-facebook-card-meta{font-size:10px;text-transform:uppercase;letter-spacing:.1em;font-weight:800;color:#a6ff2e;margin-bottom:7px}
      .live-facebook-card h3{margin:0 0 7px;font-size:17px;line-height:1.25;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
      .live-facebook-card p{margin:0 0 14px;min-height:39px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
      .live-facebook-card strong{font-size:11px}
      .live-facebook-card strong i{color:#a6ff2e;margin-left:4px}
      .live-facebook-carousel .facebook-track{animation-name:facebookLiveAutoSwipe;animation-duration:36s}
      @keyframes facebookLiveAutoSwipe{from{transform:translateX(0)}to{transform:translateX(calc(-50% - 9px))}}
      @media(max-width:760px){.live-facebook-carousel .facebook-track{animation-duration:30s}}
      @media(prefers-reduced-motion:reduce){.live-facebook-carousel .facebook-track{animation:none}}
    `;
    document.head.appendChild(style);
  };

  const load = async () => {
    try {
      const response = await fetch(FEED_URL, { cache: 'no-store' });
      if (!response.ok) return;
      const payload = await response.json();
      if (payload && Array.isArray(payload.posts)) render(payload.posts);
    } catch (error) {
      console.warn('Facebook live feed unavailable:', error);
    }
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', load, { once: true });
  else load();
})();
