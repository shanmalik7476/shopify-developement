const darkFinalStyles = document.createElement('link');
darkFinalStyles.rel = 'stylesheet';
darkFinalStyles.href = 'dark-final.css';
document.head.appendChild(darkFinalStyles);
const settingsKey = 'morrowWhatsAppSettings';
const defaults = { number: '923042736561', greeting: 'Hello Malik Shahnawaz, I want to discuss a project.' };
const settings = { ...defaults, ...JSON.parse(localStorage.getItem(settingsKey) || '{}') };
const numberInput = document.querySelector('#wa-number');
const greetingInput = document.querySelector('#wa-greeting');
const openWhatsApp = document.querySelector('#open-whatsapp');
const saveNote = document.querySelector('#save-note');

numberInput.value = settings.number;
greetingInput.value = settings.greeting;

function updateWhatsAppLink() {
  const number = numberInput.value.replace(/\D/g, '');
  openWhatsApp.href = `https://wa.me/${number}?text=${encodeURIComponent(greetingInput.value)}`;
}

numberInput.addEventListener('input', updateWhatsAppLink);
greetingInput.addEventListener('input', updateWhatsAppLink);
document.querySelector('#save-settings').addEventListener('click', () => {
  const nextSettings = { number: numberInput.value.replace(/\D/g, ''), greeting: greetingInput.value.trim() };
  localStorage.setItem(settingsKey, JSON.stringify(nextSettings));
  saveNote.textContent = 'Saved. This browser will now use the updated WhatsApp destination.';
  updateWhatsAppLink();
});
updateWhatsAppLink();

const adminServiceImages = { 'google-ads':'service-google-ads.jpeg','meta-ads':'service-meta-ads.jpeg','ai-ads':'service-ai-video-ads.jpeg','ai-explainer':'service-ai-explainer.jpeg','ai-product':'service-ai-product.jpeg','ai-reels':'ai-thumbnail-reel.jpeg','video-editing':'service-video-editing.jpeg','seo':'service-seo.jpeg','web':'service-web.jpeg','shopify':'service-shopify.jpeg','wordpress':'service-wordpress.jpeg','content-creation':'service-content.jpeg','social-media':'service-social-marketing.jpeg','social-management':'service-social-management.jpeg','email':'service-email.jpeg','branding':'service-branding.jpeg','automation':'service-automation.jpeg','virtual-assistant':'service-virtual-assistant.jpeg','consulting':'service-consulting.jpeg' };
document.querySelectorAll('.admin-service-grid a').forEach((link) => { const key = link.getAttribute('href')?.split('#')[1]; const image = adminServiceImages[key]; const img = link.querySelector('img'); if (image && img) img.src = `assets/${image}`; });
