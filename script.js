const board = document.getElementById('board');
const info = document.getElementById('info');
const resetBtn = document.getElementById('resetBtn');
const cells = Array.from(document.querySelectorAll('.cell'));

let currentPlayer = 'X';
let gameState = Array(9).fill(null);
let isGameActive = true;


const winningCombinations = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function handleCellClick(e) {
  const index = e.target.dataset.index;
  if(gameState[index] || !isGameActive) return;

  gameState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if(checkWinner()) {
    info.textContent = `Player ${currentPlayer} wins!`;
    highlightWinner();
    isGameActive = false;
    return;
  }

  if(gameState.every(cell => cell)) {
    info.textContent = "It's a draw!";
    isGameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  info.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
  return winningCombinations.some(comb => 
    comb.every(i => gameState[i] === currentPlayer)
  );
}

function highlightWinner() {
  winningCombinations.forEach(comb => {
    if(comb.every(i => gameState[i] === currentPlayer)){
      comb.forEach(i => cells[i].classList.add('win'));
    }
  });
}

function resetGame() {
  gameState.fill(null);
  currentPlayer = 'X';
  isGameActive = true;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('win');
  });
  info.textContent = `Player ${currentPlayer}'s turn`;
}

// Event Listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
