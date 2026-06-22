// Scroll progress bar + sticky header state
const progressBar = document.getElementById('progressBar');
const header = document.getElementById('siteHeader');
const floatingCta = document.querySelector('.floating-cta');

function onScroll(){
  const scrolled = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (max > 0 ? (scrolled / max) * 100 : 0) + '%';
  header.classList.toggle('scrolled', scrolled > 40);
  floatingCta.classList.toggle('show', scrolled > 600);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile nav drawer
const navToggle = document.getElementById('navToggle');
const navDrawer = document.getElementById('navDrawer');
navToggle.addEventListener('click', () => {
  navDrawer.classList.toggle('open');
});
navDrawer.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navDrawer.classList.remove('open'));
});

// Reveal-on-scroll animation
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => observer.observe(el));

// Animated stat counters
const statEls = document.querySelectorAll('.stat-num');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
statEls.forEach(el => statObserver.observe(el));

function animateCount(el){
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1200;
  const start = performance.now();
  function tick(now){
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target).toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// Tier CTA pre-fills the enquiry form select
document.querySelectorAll('.tier-cta').forEach(btn => {
  btn.addEventListener('click', () => {
    const tier = btn.dataset.tier;
    const select = document.getElementById('tierSelect');
    if (!tier || !select) return;
    const match = Array.from(select.options).find(o => o.value.startsWith(tier));
    if (match) select.value = match.value;
  });
});

// Contact form (front-end only — replace action with real endpoint/CRM as needed)
const form = document.getElementById('sponsorForm');
const formNote = document.getElementById('formNote');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name = data.get('name');
  formNote.textContent = `Thanks, ${name}! Your enquiry has been noted. Our partnerships team will reach out shortly — you can also email sponsorships@psnthattakam.com directly.`;
  formNote.style.color = '#1a7a3c';
  form.reset();
});
