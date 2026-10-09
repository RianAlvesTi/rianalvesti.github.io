(() => {
  const menu = document.getElementById('menu-toggle');
  const nav = document.getElementById('site-nav');
  if(menu && nav){
    menu.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      menu.setAttribute('aria-expanded', String(open));
      menu.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>{
      nav.classList.remove('is-open'); menu.setAttribute('aria-expanded','false');
      menu.setAttribute('aria-label','Abrir menu');
    }));
  }
  const buttons=[...document.querySelectorAll('.filter-btn')];
  const cards=[...document.querySelectorAll('.project-card')];
  buttons.forEach(btn=>btn.addEventListener('click',()=>{
    const filter=btn.dataset.filter;
    buttons.forEach(b=>{
      const selected=b===btn;
      b.classList.toggle('is-active',selected);
      b.setAttribute('aria-pressed',String(selected));
    });
    cards.forEach(card=>{card.hidden=filter!=='todos'&&card.dataset.category!==filter;});
  }));
  const year=document.getElementById('year');
  if(year){year.textContent=String(new Date().getFullYear());}
})();