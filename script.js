const menuToggle=document.querySelector('.menu-toggle');
const mobileMenu=document.querySelector('.mobile-menu');
const mobileLinks=document.querySelectorAll('.mobile-menu a');
if(menuToggle&&mobileMenu){
  menuToggle.addEventListener('click',()=>{
    const open=mobileMenu.classList.toggle('open');
    document.body.classList.toggle('menu-open',open);
    menuToggle.setAttribute('aria-expanded',String(open));
    mobileMenu.setAttribute('aria-hidden',String(!open));
    menuToggle.textContent=open?'×':'☰';
  });
  mobileLinks.forEach(link=>link.addEventListener('click',()=>{
    mobileMenu.classList.remove('open');
    document.body.classList.remove('menu-open');
    menuToggle.setAttribute('aria-expanded','false');
    mobileMenu.setAttribute('aria-hidden','true');
    menuToggle.textContent='☰';
  }));
}
const revealItems=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){
  const observer=new IntersectionObserver((entries,obs)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('visible');obs.unobserve(entry.target);}
    });
  },{threshold:.12});
  revealItems.forEach(el=>observer.observe(el));
}else{revealItems.forEach(el=>el.classList.add('visible'));}
const navLinks=[...document.querySelectorAll('.desktop-nav a')];
const sections=navLinks.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
const setActive=()=>{
  let current='';
  sections.forEach(section=>{if(window.scrollY>=section.offsetTop-150)current='#'+section.id;});
  navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===current));
};
window.addEventListener('scroll',setActive,{passive:true});
setActive();
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
  const target=document.querySelector(a.getAttribute('href'));
  if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth'});}
}));