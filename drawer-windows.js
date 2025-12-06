// Attach behavior to open/close the drawers identified by data-index / id=drawer-N

(function(){
  const openButtons = document.querySelectorAll('.open-btn[data-index]');
  const drawers = new Map();
  document.querySelectorAll('.drawer').forEach(d => {
    const id = d.id; // e.g. drawer-1
    drawers.set(id, d);
    // close triggers inside drawer (backdrop or elements with [data-close])
    d.addEventListener('click', e => {
      if (e.target.closest('[data-close]')) closeDrawerByEl(d);
    });
  });

  openButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = btn.getAttribute('data-index');
      openDrawer(idx);
    });
  });

  // Open drawer by index (number or string)
  function openDrawer(index){
    const id = `drawer-${index}`;
    const d = drawers.get(id);
    if (!d) return console.warn('No drawer:', id);
    // close any other open drawers first (optional)
    drawers.forEach((el, key) => {
      if (el !== d) closeDrawer(el);
    });
    d.classList.add('open');
    d.setAttribute('aria-hidden','false');
    // focus management: find first focusable inside
    const focusable = d.querySelector('button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])');
    if (focusable) focusable.focus();
    // trap escape
    document.addEventListener('keydown', escHandler);
  }

  function closeDrawerByEl(el){
    closeDrawer(el);
  }

  function closeDrawer(el){
    if (!el) return;
    el.classList.remove('open');
    el.setAttribute('aria-hidden','true');
    document.removeEventListener('keydown', escHandler);
  }

  function escHandler(e){
    if (e.key === 'Escape'){
      // close the topmost open drawer
      const open = Array.from(drawers.values()).reverse().find(d => d.classList.contains('open'));
      if (open) closeDrawer(open);
    }
  }

  // optional API for other scripts
  window.DrawerWindows = { openDrawer, closeDrawer };
})();