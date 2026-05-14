/* ============================================
   PackAlchemy — Article Page JavaScript
   Handles: Reading progress bar, scroll
   animations, bar chart animation
   ============================================ */

/* ── FIX: Inject initial hidden styles early to prevent FOUC ──
   Elements that will fade in are hidden via a stylesheet injected
   before they render, so they never flash visible on load.       */
(function () {
  const style = document.createElement('style');
  style.textContent = `
    .sec-div, .pull-q, .inline-stat, .callout, .takeaways, .data-insight {
      opacity: 0;
      transform: translateY(16px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
  `;
  document.head.appendChild(style);
})();

/* ── Reading Progress Bar ── */
const progressBar = document.createElement('div');
progressBar.style.cssText = `
  position: fixed; top: 62px; left: 0; height: 3px;
  background: linear-gradient(90deg, #F5B85A, #E8826A, #4AAFC4);
  width: 0%; z-index: 999; transition: width 0.1s linear;
`;
document.body.appendChild(progressBar);

/* ── FIX: Merge progress bar + masthead into one scroll listener ──
   Previously two separate scroll listeners; now one does both,
   which reduces layout thrashing and scroll jank.                 */
let lastScroll = 0;
const masthead = document.querySelector('.masthead');

window.addEventListener('scroll', () => {
  const current = window.scrollY;

  // Reading progress
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = ((current / docHeight) * 100) + '%';

  // Masthead hide/show
  if (masthead) {
    if (current > lastScroll && current > 80) {
      masthead.style.transform = 'translateY(-100%)';
      masthead.style.transition = 'transform 0.3s ease';
    } else {
      masthead.style.transform = 'translateY(0)';
    }
  }

  lastScroll = current;
});

/* ── Animate bar chart fills on scroll ── */
const barFills = document.querySelectorAll('.di-bar-fill');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target;
      const width = target.style.width;
      target.style.width = '0%';
      target.style.transition = 'width 1.2s ease';
      setTimeout(() => { target.style.width = width; }, 100);
      barObserver.unobserve(target);
    }
  });
}, { threshold: 0.3 });

barFills.forEach(bar => barObserver.observe(bar));

/* ── Smooth scroll ──
   NOTE: If your article pages also load main.js, remove this block
   to avoid double-firing. Keep it if article pages load this file alone. */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ── Fade in article sections on scroll ── */
const fadeEls = document.querySelectorAll('.sec-div, .pull-q, .inline-stat, .callout, .takeaways, .data-insight');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => fadeObserver.observe(el));
