const WHATSAPP_NUMBER = '923042736561';
const serviceCatalog = ['Google Ads','Meta Ads','AI Video Ads','AI Explainer Videos','AI Product Videos','AI Reels & Shorts','Video Editing','SEO Services','Web Development','Shopify Development','WordPress / CMS','Content Creation','Social Media Marketing','Social Media Management','Email Marketing','Branding & Graphic Design','Automation & AI','Virtual Assistance','Digital Strategy & Consulting'];
const serviceImages = { 'google-ads':'assets/service-google-ads.jpeg','meta-ads':'assets/service-meta-ads.jpeg','social-media':'assets/service-social-marketing.jpeg','social-management':'assets/service-social-management.jpeg','ai-ads':'assets/service-ai-video-ads.jpeg','ai-explainer':'assets/service-ai-explainer.jpeg','ai-product':'assets/service-ai-product.jpeg','ai-reels':'assets/ai-thumbnail-reel.jpeg','video-editing':'assets/service-video-editing.jpeg','web':'assets/service-web.jpeg','shopify':'assets/service-shopify.jpeg','wordpress':'assets/service-wordpress.jpeg','seo':'assets/service-seo.jpeg','content-creation':'assets/service-content.jpeg','email':'assets/service-email.jpeg','branding':'assets/service-branding.jpeg','automation':'assets/service-automation.jpeg','virtual-assistant':'assets/service-virtual-assistant.jpeg','consulting':'assets/service-consulting.jpeg' };
const openWhatsApp = (message) => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');

const serviceSelect = document.querySelector('#contact-form select[name="service"]');
if (serviceSelect) serviceCatalog.forEach((service) => { if (![...serviceSelect.options].some((option) => option.text === service)) serviceSelect.add(new Option(service, service)); });

const modalStyle = document.createElement('style');
modalStyle.textContent = `.service-modal{position:fixed;inset:0;background:#10152dcc;z-index:50;display:grid;place-items:center;padding:18px}.service-modal[hidden]{display:none}.service-modal-card{background:#fff;border-radius:10px;max-width:620px;width:100%;max-height:92vh;overflow:auto;padding:28px;position:relative;box-shadow:0 25px 70px #0004}.service-modal-close{position:absolute;right:18px;top:15px;border:0;background:#eef0ff;color:#1859e8;border-radius:50%;width:30px;height:30px;font-size:18px;cursor:pointer}.service-modal h2{font:500 29px/1.05 var(--display);letter-spacing:-.05em;margin:0 35px 8px 0}.service-modal p{color:#60657c;font-size:11px}.service-modal .modal-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.service-modal label{display:block;font-size:9px;font-weight:600;color:#555a70;margin-top:15px}.service-modal input,.service-modal select,.service-modal textarea{display:block;width:100%;margin-top:6px;background:#f1f3ff;border:1px solid transparent;border-radius:4px;padding:11px;color:#10152d;font:11px var(--body)}.service-modal input:focus,.service-modal select:focus,.service-modal textarea:focus{border-color:#1859e8;outline:0;background:#fff}.service-modal textarea{resize:vertical}.service-modal button[type=submit]{width:100%;margin-top:20px;border:0;border-radius:5px;padding:13px;background:#1859e8;color:#fff;font-weight:600;cursor:pointer}.service-modal .modal-note{font-size:9px;text-align:center;margin:10px 0 0}@media(max-width:520px){.service-modal-card{padding:22px 18px}.service-modal .modal-grid{grid-template-columns:1fr}}`;
document.head.appendChild(modalStyle);

const modal = document.createElement('div');
modal.className = 'service-modal';
modal.hidden = true;
modal.innerHTML = `<div class="service-modal-card" role="dialog" aria-modal="true" aria-labelledby="service-modal-title"><button class="service-modal-close" type="button" aria-label="Close inquiry">×</button><p class="eyebrow">Service inquiry / WhatsApp only</p><h2 id="service-modal-title">Tell us about your project</h2><p id="service-modal-intro">Share your details and the request will open in WhatsApp.</p><form id="service-modal-form"><div class="modal-grid"><label>Full name *<input name="name" required placeholder="Your name"></label><label>Your WhatsApp number *<input name="phone" type="tel" required placeholder="+92 300 0000000"></label><label>Email address<input name="email" type="email" placeholder="you@example.com"></label><label>Budget range<select name="budget"><option>Not decided yet</option><option>$250 - $750</option><option>$750 - $1,500</option><option>$1,500 - $5,000</option><option>$5,000+</option></select></label></div><label>What do you need? *<textarea name="details" required rows="4" placeholder="Tell us about your goals, timeline and current situation..."></textarea></label><button type="submit">Send inquiry on WhatsApp <span>→</span></button><p class="modal-note">Your WhatsApp number is included so Malik can reply directly.</p></form></div>`;
document.body.appendChild(modal);
const modalForm = modal.querySelector('#service-modal-form');
const modalTitle = modal.querySelector('#service-modal-title');
const modalIntro = modal.querySelector('#service-modal-intro');
let selectedService = '';

function closeModal() { modal.hidden = true; document.body.style.overflow = ''; }
function openServiceModal(service) { selectedService = service; modalTitle.textContent = `${service} inquiry`; modalIntro.textContent = `Tell us what you need for ${service}. Your brief will open directly in WhatsApp.`; modal.hidden = false; document.body.style.overflow = 'hidden'; modal.querySelector('input[name="name"]').focus(); }

document.querySelectorAll('.wa-service').forEach((link) => link.addEventListener('click', (event) => { event.preventDefault(); openServiceModal((link.dataset.message || 'this service').replace(/^I want to discuss /, '')); }));
modal.querySelector('.service-modal-close').addEventListener('click', closeModal);
modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !modal.hidden) closeModal(); });
modalForm.addEventListener('submit', (event) => { event.preventDefault(); if (!modalForm.reportValidity()) return; const data = new FormData(modalForm); openWhatsApp(['New service inquiry - Malik Shahnawaz', '', `Service: ${selectedService}`, `Client name: ${data.get('name')}`, `Client WhatsApp: ${data.get('phone')}`, `Client email: ${data.get('email') || 'Not provided'}`, `Budget: ${data.get('budget')}`, `Project details: ${data.get('details')}`].join('\n')); closeModal(); });

const contactForm = document.querySelector('#contact-form');
if (contactForm) contactForm.addEventListener('submit', (event) => { event.preventDefault(); if (!contactForm.reportValidity()) return; const data = new FormData(contactForm); openWhatsApp(['New project inquiry - Malik Shahnawaz', '', `Name: ${data.get('name')}`, `Company: ${data.get('company') || 'Not specified'}`, `Phone: ${data.get('phone')}`, `Service: ${data.get('service')}`, `Details: ${data.get('details')}`].join('\n')); });

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
if (menuToggle && nav) menuToggle.addEventListener('click', () => { const open = menuToggle.getAttribute('aria-expanded') === 'true'; menuToggle.setAttribute('aria-expanded', String(!open)); nav.classList.toggle('open', !open); });
document.querySelectorAll('.portrait-art').forEach((portrait) => { portrait.innerHTML = '<img src="founder-photo.png" alt="Malik Shahnawaz, founder of Digital Growth & Tech">'; });

function addServiceVisuals() {
	document.querySelectorAll('.service-detail[id]').forEach((detail) => {
		const image = serviceImages[detail.id];
		if (!image || detail.querySelector('.service-visual')) return;
		const visual = document.createElement('div');
		visual.className = 'service-visual';
		visual.innerHTML = `<img src="${image}" alt="${detail.querySelector('h2')?.textContent || 'Digital service'} preview"><span>${String(detail.querySelector('.detail-number')?.textContent || '').padStart(2, '0')}</span>`;
		detail.insertBefore(visual, detail.firstElementChild);
	});
}

function addInnerPageSections() {
	const main = document.querySelector('main');
	if (!main || main.querySelector('.premium-proof')) return;
	const proof = document.createElement('section');
	proof.className = 'premium-proof section-shell';
	proof.innerHTML = `<div class="proof-copy"><p class="eyebrow">A better way to work</p><h2>Clear thinking. Beautiful execution. <span>Measurable movement.</span></h2><p>Every engagement is built around a visible goal, a practical delivery plan and a feedback loop that keeps the work honest.</p><a class="text-link" href="contact.html">Start a focused conversation ↗</a></div><div class="proof-image"><img src="3.png" alt="Digital strategy and creative work preview"><div class="progress-list"><span><b>Strategy clarity</b><i><em style="width:92%"></em></i><strong>92%</strong></span><span><b>Delivery quality</b><i><em style="width:98%"></em></i><strong>98%</strong></span><span><b>Growth readiness</b><i><em style="width:86%"></em></i><strong>86%</strong></span></div></div>`;
	const cta = main.querySelector('.cta-band');
	main.insertBefore(proof, cta || null);
	const testimonials = document.createElement('section');
	testimonials.className = 'testimonial-band';
	testimonials.innerHTML = `<div class="section-shell"><p class="eyebrow">Words from the other side</p><div class="testimonial-track"><article class="testimonial active"><span>★★★★★</span><blockquote>“The rare partner who can talk performance, product and brand in the same conversation.”</blockquote><strong>Sarah J. / Founder, Northstar</strong></article><article class="testimonial"><span>★★★★★</span><blockquote>“We finally had a store that felt like our brand and worked like a sales system.”</blockquote><strong>Omar R. / Ecommerce Director</strong></article><article class="testimonial"><span>★★★★★</span><blockquote>“Clear process, fast communication and work our team could actually take forward.”</blockquote><strong>Ayesha K. / Operations Lead</strong></article></div><div class="testimonial-dots"><button class="active" aria-label="Show testimonial 1"></button><button aria-label="Show testimonial 2"></button><button aria-label="Show testimonial 3"></button></div></div>`;
	main.insertBefore(testimonials, cta || null);
	let testimonialIndex = 0;
	const cards = [...testimonials.querySelectorAll('.testimonial')];
	const dots = [...testimonials.querySelectorAll('.testimonial-dots button')];
	setInterval(() => { cards[testimonialIndex].classList.remove('active'); dots[testimonialIndex].classList.remove('active'); testimonialIndex = (testimonialIndex + 1) % cards.length; cards[testimonialIndex].classList.add('active'); dots[testimonialIndex].classList.add('active'); }, 4200);
	dots.forEach((dot, index) => dot.addEventListener('click', () => { cards[testimonialIndex].classList.remove('active'); dots[testimonialIndex].classList.remove('active'); testimonialIndex = index; cards[index].classList.add('active'); dot.classList.add('active'); }));
}

addServiceVisuals();
addInnerPageSections();

document.querySelectorAll('.case-art').forEach((art, index) => {
	const image = `assets/portfolio-0${index + 1}.jpeg`;
	art.style.backgroundImage = `linear-gradient(180deg, #10152d11, #10152d66), url("${image}")`;
	art.style.backgroundSize = 'cover';
	art.style.backgroundPosition = 'center';
});

const aboutHero = document.querySelector('.about-hero');
if (aboutHero && !aboutHero.querySelector('.about-hero-image')) {
	const image = document.createElement('img');
	image.className = 'about-hero-image';
	image.src = 'assets/about-workspace.jpeg';
	image.alt = 'Malik Shahnawaz workspace';
	aboutHero.appendChild(image);
}
