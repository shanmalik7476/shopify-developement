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
