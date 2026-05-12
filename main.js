/* ============================================
   PackAlchemy — Main JavaScript
   Handles: Navigation toggle, scroll behaviour
   ============================================ */

const nav=document.getElementById('nav');
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

/* ── Smooth scroll for all anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── Masthead hide/show on scroll ── */
let lastScroll = 0;
const masthead = document.querySelector('.masthead');
window.addEventListener('scroll', () => {
  const current = window.scrollY;
  if (current > lastScroll && current > 80) {
    masthead.style.transform = 'translateY(-100%)';
    masthead.style.transition = 'transform 0.3s ease';
  } else {
    masthead.style.transform = 'translateY(0)';
  }
  lastScroll = current;
});

/* ── Story card hover arrow animation ── */
document.querySelectorAll('.story-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    const arrow = card.querySelector('.card-arrow');
    if (arrow) arrow.style.transform = 'translateX(6px)';
  });
  card.addEventListener('mouseleave', () => {
    const arrow = card.querySelector('.card-arrow');
    if (arrow) arrow.style.transform = 'translateX(0)';
  });
});

/* ── Newsletter form validation ── */
const nlBtn = document.querySelector('.nl-btn');
const nlInput = document.querySelector('.nl-input');
if (nlBtn && nlInput) {
  nlBtn.addEventListener('click', () => {
    const email = nlInput.value.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
      nlInput.style.border = '2px solid #E8826A';
      nlInput.placeholder = 'Please enter a valid email';
      nlInput.value = '';
    } else {
      nlBtn.textContent = 'Subscribed ✓';
      nlBtn.style.background = '#9ED4B5';
      nlBtn.style.color = '#173404';
      nlInput.value = '';
      nlInput.placeholder = 'Thank you for subscribing!';
    }
  });
}
