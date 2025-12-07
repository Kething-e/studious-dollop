// Attach behavior to open/close the drawers identified by data-index / id=drawer-N

(function () {
  // simple answer dictionary for 12 drawers (case-insensitive)
  const ANSWERS = {
    "1": "apple",
    "2": "banana",
    "3": "cherry",
    "4": "date",
    "5": "elderberry",
    "6": "fig",
    "7": "grape",
    "8": "honeydew",
    "9": "kiwi",
    "10": "lemon",
    "11": "mango",
    "12": "nectarine"
  };

  const openButtons = document.querySelectorAll('.open-btn[data-index]');
  const drawers = new Map();
  document.querySelectorAll('.drawer').forEach(d => {
    const id = d.id; // e.g. drawer-1
    drawers.set(id, d);
    // close triggers inside drawer (backdrop or elements with [data-close])
    d.addEventListener('click', e => {
      if (e.target.closest('[data-close]')) closeDrawer(d);
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
    // close others
    drawers.forEach((el) => {
      if (el !== d) closeDrawer(el);
    });
    d.classList.add('open');
    d.setAttribute('aria-hidden', 'false');
    // focus first input
    const input = d.querySelector('input[name="answer"]');
    if (input) input.focus();
  }

  function closeDrawer(el){
    el.classList.remove('open');
    el.setAttribute('aria-hidden', 'true');
  }

  // handle submissions and answer checking
  document.querySelectorAll('.drawer form[data-index]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const idx = form.getAttribute('data-index');
      const val = (form.answer.value || '').trim();
      const feedbackEl = form.querySelector('.feedback');
      const correct = ANSWERS[idx];
      if (!correct) {
        feedbackEl.textContent = 'No answer configured.';
        feedbackEl.classList.remove('correct', 'incorrect');
        return;
      }
      if (val.length === 0) {
        feedbackEl.textContent = 'Please enter an answer.';
        feedbackEl.classList.remove('correct', 'incorrect');
        return;
      }
      if (val.toLowerCase() === String(correct).toLowerCase()) {
        feedbackEl.textContent = 'Correct!';
        feedbackEl.classList.add('correct');
        feedbackEl.classList.remove('incorrect');
      } else {
        feedbackEl.textContent = 'Incorrect — try again.';
        feedbackEl.classList.add('incorrect');
        feedbackEl.classList.remove('correct');
      }
    });
  });

  // expose basic API
  window.DrawerWindows = { openDrawer, closeDrawer };
})();