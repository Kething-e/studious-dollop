// Attach behavior to open/close the drawers identified by data-index / id=drawer-N
 window.addEventListener('load', init);  

// simple answer dictionary for 12 drawers (case-insensitive)
  const ANSWERS = {
    "1": "CTF{us3_y0ur_bIg_bRAINs}",
    "2": "banana",
    "3": "cherry",
    "4": "date",
    "5": "elderberry",
    "6": "fig",
    "7": "grape",
    "8": "honeydew",
    "9": "kiwi",
  };

  const SOLVED ={
    "1": false,
    "2": false,
    "3": false,
    "4": false,
    "5": false,
    "6": false,
    "7": false,
    "8": false,
    "9": false
  }
   
  const drawers = new Map();
  document.querySelectorAll('.drawer').forEach(d => {
    const id = d.id; // e.g. drawer-1
    drawers.set(id, d);
    // close triggers inside drawer (backdrop or elements with [data-close])
    d.addEventListener('click', e => {
      if (e.target.closest('[data-close]')) closeDrawer(d);
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
      if (val.toLowerCase() === String(correct).toLowerCase() && !SOLVED[idx]) {
        feedbackEl.textContent = 'Correct!';
        feedbackEl.classList.add('correct');
        feedbackEl.classList.remove('incorrect');
        score++;
        updateScore();
        SOLVED[idx] = true;
      }else if (SOLVED[idx]){
        feedbackEl.textContent = 'You have already solved this one.';
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

    let score = 0;
    let timer = 0;
    let timerInterval;

    // Format time as MM:SS
    function formatTime(seconds) {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    // Update timer display
    function updateTimer() {
      if(SOLVED["1"] && SOLVED["2"] && SOLVED["3"] && SOLVED["4"] && SOLVED["5"] && SOLVED["6"] && SOLVED["7"] && SOLVED["8"] && SOLVED["9"] && SOLVED["10"] && SOLVED["11"] && SOLVED["12"]){
        return;
      }
      else{          
        timer++;
        document.getElementById('timer').textContent = formatTime(timer);
      }
    }

    // Update score display
    function updateScore() {
      document.getElementById('score').textContent = score;
    }

    // Create grid cells
    function createGrid() {
      const gridContainer = document.getElementById('grid');
      for (let i = 1; i <= 9; i++) {
        const cell = document.createElement('div');
        cell.setAttribute('data-index', i);
        cell.className = 'grid-cell';
        cell.innerHTML = `<span>${i}</span>`;
        cell.addEventListener('click', () => {
            const idx = cell.getAttribute('data-index');
            openDrawer(idx);
        });
        gridContainer.appendChild(cell);
      }
    }

    // Initialize app
    function init() {
      createGrid();
      timerInterval = setInterval(updateTimer, 1000);
    }

    // Start when page loads
    