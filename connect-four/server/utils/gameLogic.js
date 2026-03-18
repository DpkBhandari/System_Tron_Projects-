const ROWS = 6, COLS = 7;

const createBoard = () => Array.from({ length: ROWS }, () => Array(COLS).fill(0));

const dropPiece = (board, col, player) => {
  for (let r = ROWS - 1; r >= 0; r--) {
    if (board[r][col] === 0) {
      board[r][col] = player;
      return { row: r, col, success: true };
    }
  }
  return { success: false };
};

const checkWin = (board, player) => {
  // Horizontal
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c <= COLS - 4; c++)
      if ([0,1,2,3].every(i => board[r][c+i] === player))
        return { won: true, cells: [[r,c],[r,c+1],[r,c+2],[r,c+3]] };

  // Vertical
  for (let c = 0; c < COLS; c++)
    for (let r = 0; r <= ROWS - 4; r++)
      if ([0,1,2,3].every(i => board[r+i][c] === player))
        return { won: true, cells: [[r,c],[r+1,c],[r+2,c],[r+3,c]] };

  // Diagonal down-right
  for (let r = 0; r <= ROWS - 4; r++)
    for (let c = 0; c <= COLS - 4; c++)
      if ([0,1,2,3].every(i => board[r+i][c+i] === player))
        return { won: true, cells: [[r,c],[r+1,c+1],[r+2,c+2],[r+3,c+3]] };

  // Diagonal down-left
  for (let r = 0; r <= ROWS - 4; r++)
    for (let c = 3; c < COLS; c++)
      if ([0,1,2,3].every(i => board[r+i][c-i] === player))
        return { won: true, cells: [[r,c],[r+1,c-1],[r+2,c-2],[r+3,c-3]] };

  return { won: false };
};

const isBoardFull = (board) => board[0].every(cell => cell !== 0);

module.exports = { createBoard, dropPiece, checkWin, isBoardFull };
