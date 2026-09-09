const DEFAULT_WHATSAPP_NUMBER = '923042736561';
const savedSettings = JSON.parse(localStorage.getItem('morrowWhatsAppSettings') || '{}');
const WHATSAPP_NUMBER = (savedSettings.number || DEFAULT_WHATSAPP_NUMBER).replace(/\D/g, '');

const form = document.querySelector('#lead-form');
const serviceSelect = form.querySelector('[name="service"]');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const budget = data.get('budget') || 'Not specified';
  const message = [
    'New project inquiry - Malik Shahnawaz',
    '',
    `Name: ${data.get('name')}`,
    `Company: ${data.get('company') || 'Not specified'}`,
    `Email: ${data.get('email')}`,
    `WhatsApp / Phone: ${data.get('phone')}`,
    `Country / Market: ${data.get('country') || 'Not specified'}`,
    `Service: ${data.get('service')}`,
    `Budget: ${budget}`,
    `Project details: ${data.get('details') || 'Not provided'}`
  ].join('\n');

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
});

document.querySelectorAll('[data-service]').forEach((link) => {
  link.addEventListener('click', () => {
    serviceSelect.value = link.dataset.service;
  });
});

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  nav.classList.toggle('open', !isOpen);
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuToggle.setAttribute('aria-expanded', 'false');
  nav.classList.remove('open');
}));

document.querySelectorAll('.portrait-art').forEach((portrait) => {
  portrait.innerHTML = '<img src="founder-photo.png" alt="Malik Shahnawaz, founder of Digital Growth & Tech">';
});

const homeMain = document.querySelector('main');
if (homeMain && !document.querySelector('.home-showcase')) {
  const showcase = document.createElement('section');
  showcase.className = 'home-showcase section-shell';
  showcase.innerHTML = `<div class="showcase-copy"><p class="eyebrow">A studio built around outcomes</p><h2>Strategy that looks good <span>and works hard.</span></h2><p>From the first sketch to the final click, every detail has a job: build trust, remove friction and move the right people forward.</p><div class="showcase-points"><span>01 / Clear positioning</span><span>02 / High-converting experience</span><span>03 / Compounding growth</span></div><a class="text-link" href="services.html">Explore the full service system ↗</a></div><div class="showcase-image"><img src="assets/feature-web.jpeg" alt="Web development strategy visual"><span class="image-caption">Selected direction / 01</span></div>`;
  const process = homeMain.querySelector('#process');
  homeMain.insertBefore(showcase, process || null);
  const testimonial = document.createElement('section');
  testimonial.className = 'testimonial-band home-testimonials';
  testimonial.innerHTML = `<div class="section-shell"><div class="testimonial-heading"><p class="eyebrow">The signal from clients</p><h2>Good work leaves<br><span>a little momentum behind.</span></h2></div><div class="testimonial-quote"><span>★★★★★</span><blockquote>“Malik brought the rare combination of strategic calm and hands-on speed. We knew what mattered every week.”</blockquote><strong>— Founder, growth-stage ecommerce</strong></div></div>`;
  homeMain.insertBefore(testimonial, process || null);
  const comparison = document.createElement('section');
  comparison.className = 'comparison-section section-shell';
  comparison.innerHTML = `<div class="section-heading"><div><p class="eyebrow">The difference</p><h2>More than a supplier.<br><span>A sharper partner.</span></h2></div></div><div class="comparison-table"><div class="comparison-row comparison-head"><span></span><b>Typical freelancer</b><b>Malik Shahnawaz</b></div><div class="comparison-row"><span>Strategy before execution</span><i>—</i><strong>✓</strong></div><div class="comparison-row"><span>One accountable senior partner</span><i>—</i><strong>✓</strong></div><div class="comparison-row"><span>Creative tied to measurable goals</span><i>Sometimes</i><strong>Always</strong></div><div class="comparison-row"><span>WhatsApp-first communication</span><i>—</i><strong>✓</strong></div></div>`;
  homeMain.insertBefore(comparison, process || null);
}

const heroPanel = document.querySelector('.hero-panel');
if (heroPanel && !heroPanel.querySelector('.hero-slideshow')) {
  const slides = ['assets/hero-01.jpeg','assets/hero-02.jpeg','assets/hero-03.jpeg','assets/hero-04.jpeg','assets/hero-05.jpeg'];
  const slideshow = document.createElement('div');
  slideshow.className = 'hero-slideshow';
  slideshow.innerHTML = slides.map((src, index) => `<img src="${src}" alt="Digital growth service visual ${index + 1}" class="${index === 0 ? 'active' : ''}">`).join('');
  heroPanel.prepend(slideshow);
  let current = 0;
  setInterval(() => { const images = [...slideshow.querySelectorAll('img')]; images[current].classList.remove('active'); current = (current + 1) % images.length; images[current].classList.add('active'); }, 4500);
}
