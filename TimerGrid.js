
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
      timer++;
      document.getElementById('timer').textContent = formatTime(timer);
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
        cell.className = 'grid-cell';
        cell.innerHTML = `<span>${i}</span>`;
        cell.addEventListener('click', () => {
          score++;
          updateScore();
        });
        gridContainer.appendChild(cell);
      }
    }

    // Initialize app
    export function init() {
      createGrid();
      timerInterval = setInterval(updateTimer, 1000);
    }

    // Start when page loads
    window.addEventListener('load', init);