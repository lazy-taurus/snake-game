const game_board = document.getElementById('game_board');
let boardSize = 20;

let drawBoard = () => {
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      let cell = document.createElement('div');
      cell.className = 'grid-item';
      game_board.appendChild(cell);
    }
  }
};
drawBoard();
