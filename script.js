/* Mobile menu */
const menu = document.getElementById('menu');
document.getElementById('burger').onclick = () => menu.classList.toggle('open');
menu.addEventListener('click', e => { if (e.target.tagName === 'A') menu.classList.remove('open'); });

/* Certificate lightbox */
const lb = document.getElementById('lightbox'), lbImg = document.getElementById('lbImg'), lbCount = document.getElementById('lbCount');
let imgs = [], idx = 0;
function show() {
  lbImg.src = imgs[idx];
  lbCount.textContent = imgs.length > 1 ? (idx + 1) + ' / ' + imgs.length : '';
  document.getElementById('lbPrev').style.display = document.getElementById('lbNext').style.display = imgs.length > 1 ? '' : 'none';
}
function openLb(list, start) { imgs = list; idx = start || 0; show(); lb.hidden = false; document.body.style.overflow = 'hidden'; }
function closeLb() { lb.hidden = true; document.body.style.overflow = ''; }
document.querySelectorAll('[data-gallery]').forEach(b => b.onclick = () => openLb(b.dataset.gallery.split('|'), +b.dataset.start || 0));
document.getElementById('lbClose').onclick = closeLb;
document.getElementById('lbPrev').onclick = () => { idx = (idx - 1 + imgs.length) % imgs.length; show(); };
document.getElementById('lbNext').onclick = () => { idx = (idx + 1) % imgs.length; show(); };
lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
document.addEventListener('keydown', e => {
  if (lb.hidden) return;
  if (e.key === 'Escape') closeLb();
  if (e.key === 'ArrowLeft') document.getElementById('lbPrev').click();
  if (e.key === 'ArrowRight') document.getElementById('lbNext').click();
});

/* Contact form -> WhatsApp */
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const v = id => document.getElementById(id).value.trim();
  const lines = ['Hello Lingaraju,', '', 'Name: ' + v('senderName')];
  if (v('senderCompany')) lines.push('Company: ' + v('senderCompany'));
  if (v('senderRole')) lines.push('Role: ' + v('senderRole'));
  lines.push('Subject: ' + v('msgSubject'), '', v('msgBody'));
  window.open('https://wa.me/918105358641?text=' + encodeURIComponent(lines.join('\n')), '_blank');
});

/* Scroll reveal (content stays visible if JS is off) */
document.documentElement.classList.add('js');
const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } }), { threshold: .12 });
document.querySelectorAll('.card, .sec h2, .hero-grid > *').forEach(el => { el.classList.add('reveal'); io.observe(el); });
