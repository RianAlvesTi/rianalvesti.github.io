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

  // Amplia imagens da galeria, preservando navegação pelo teclado.
  const lightbox = document.getElementById('project-lightbox');
  if (lightbox && typeof lightbox.showModal === 'function') {
    const bigImage = document.getElementById('lightbox-image');
    const title = document.getElementById('lightbox-title');
    const description = document.getElementById('lightbox-description');
    const fullImageLink = document.getElementById('lightbox-full-image');
    const closeButton = document.getElementById('lightbox-close');
    let previousFocus = null;
    document.querySelectorAll('.project-zoom').forEach(button => {
      button.addEventListener('click', () => {
        const card = button.closest('.project-card');
        const img = button.querySelector('img');
        if (!card || !img) return;
        previousFocus = button;
        bigImage.src = img.currentSrc || img.src;
        bigImage.alt = img.alt;
        title.textContent = card.querySelector('h3')?.textContent || 'Projeto';
        description.textContent = card.querySelector('.project-info p')?.textContent || '';
        fullImageLink.href = img.src;
        lightbox.showModal();
        document.body.classList.add('lightbox-open');
        closeButton.focus();
      });
    });
    closeButton.addEventListener('click', () => lightbox.close());
    lightbox.addEventListener('click', event => {
      if (event.target === lightbox) lightbox.close();
    });
    lightbox.addEventListener('close', () => {
      document.body.classList.remove('lightbox-open');
      bigImage.removeAttribute('src');
      if (previousFocus && previousFocus.isConnected) previousFocus.focus();
    });
  }
  const year=document.getElementById('year');
  if(year){year.textContent=String(new Date().getFullYear());}
})();