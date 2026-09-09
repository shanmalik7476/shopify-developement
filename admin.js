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
