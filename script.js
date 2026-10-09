const $=s=>document.querySelector(s);const loader=$('#loader');setTimeout(()=>loader?.classList.add('hide'),1200);const btn=$('#menu-btn'),nav=document.querySelector('header nav');btn?.addEventListener('click',()=>{const open=nav.classList.toggle('open');btn.setAttribute('aria-expanded',open)});$('#contact-form')?.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(e.target);const text=`Olá, Mezha!
Nome: ${d.get('nome')}
WhatsApp: ${d.get('whatsapp')}
Mensagem: ${d.get('mensagem')||''}`;window.open('https://wa.me/5561999999999?text='+encodeURIComponent(text),'_blank')});
const fadeElements = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.14,
  }
);

fadeElements.forEach((element) => observer.observe(element));
const topButton = document.querySelector(".floating-top");

topButton?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});