const config=window.BLUSH_CONFIG||{};
const menuBtn=document.querySelector('.menu-toggle');const nav=document.querySelector('.nav');
menuBtn.addEventListener('click',()=>{const opened=nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(opened));menuBtn.textContent=opened?'✕':'☰'});
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuBtn.setAttribute('aria-expanded','false');menuBtn.textContent='☰'}));
document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));btn.classList.add('active');document.querySelectorAll('.gallery-grid figure').forEach(item=>{item.hidden=btn.dataset.filter!=='all'&&item.dataset.category!==btn.dataset.filter})}));
document.querySelectorAll('[data-service]').forEach(btn=>btn.addEventListener('click',()=>{document.querySelector('#serviceSelect').value=btn.dataset.service;document.querySelector('#booking').scrollIntoView({behavior:'smooth'})}));
const dateInput=document.querySelector('#bookingDate');const localToday=()=>{const d=new Date();return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-')};dateInput.min=localToday();
document.querySelector('#year').textContent=new Date().getFullYear();
if(config.instagramUrl)document.querySelector('#instagramLink').href=config.instagramUrl;
if(config.mapsUrl)document.querySelector('#mapLink').href=config.mapsUrl;
if(config.whatsappNumber)document.querySelector('#whatsappLink').href='https://wa.me/'+config.whatsappNumber;
const form=document.querySelector('#bookingForm');const msg=document.querySelector('#formMessage');
form.addEventListener('submit',e=>{e.preventDefault();msg.textContent='';if(!form.reportValidity())return;const data=new FormData(form);if(data.get('date')<localToday()){msg.textContent='اختاري تاريخ اليوم أو تاريخاً قادماً.';return}const number=(config.whatsappNumber||'').replace(/\D/g,'');if(!/^\d{8,15}$/.test(number)){msg.textContent='هذا موقع تجريبي. لتفعيل الحجز، أضيفي رقم واتساب الصالون بصيغة دولية في ملف config.js.';return}const message=`مرحباً ${config.salonName||'Blush Beauty Studio'} 🌸\nأرغب بطلب موعد:\nالاسم: ${data.get('name')}\nرقم الهاتف: ${data.get('phone')}\nالخدمة: ${data.get('service')}\nالتاريخ المفضل: ${data.get('date')}\nالوقت المفضل: ${data.get('time')}\nملاحظات: ${data.get('notes')||'لا يوجد'}\nيرجى تأكيد توفر الموعد. شكراً!`;const url='https://wa.me/'+number+'?text='+encodeURIComponent(message);const w=window.open(url,'_blank','noopener,noreferrer');if(!w){msg.textContent='إذا لم تفتح واتساب، اسمحي بالنوافذ المنبثقة ثم أعيدي المحاولة.'}else{msg.textContent='تم فتح واتساب برسالة جاهزة. أرسلي الرسالة لإكمال طلب الحجز.'}});

// Editorial interactions: scroll reading progress, quiet reveals, gallery lightbox.
const progress=document.querySelector('.scroll-progress');
let scrollQueued=false;
window.addEventListener('scroll',()=>{if(scrollQueued)return;scrollQueued=true;requestAnimationFrame(()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max>0?scrollY/max*100:0)+'%';scrollQueued=false})},{passive:true});
const revealTargets=document.querySelectorAll('.section-heading,.service-card,.team-grid article,.offer-copy,.booking-side,.faq-list,.contact-section>div');
if('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');observer.unobserve(e.target)}})},{threshold:.08});revealTargets.forEach(el=>{el.setAttribute('data-reveal','');observer.observe(el)})}
const photoDialog=document.querySelector('#photoDialog');
if(photoDialog && typeof photoDialog.showModal==='function'){
  document.querySelectorAll('.gallery-grid figure').forEach(figure=>{figure.tabIndex=0;figure.setAttribute('role','button');figure.setAttribute('aria-label','تكبير صورة: '+(figure.querySelector('figcaption')?.textContent||''));const open=()=>{const img=figure.querySelector('img');photoDialog.querySelector('img').src=img.currentSrc||img.src;photoDialog.querySelector('img').alt=img.alt;photoDialog.querySelector('p').textContent=figure.querySelector('figcaption')?.textContent||'';photoDialog.showModal()};figure.addEventListener('click',open);figure.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open()}})});
  photoDialog.querySelector('.dialog-close').addEventListener('click',()=>photoDialog.close());
  photoDialog.addEventListener('click',e=>{if(e.target===photoDialog)photoDialog.close()});
}
