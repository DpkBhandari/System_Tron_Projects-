import { useState, useCallback } from 'react';

const ROWS = 6, COLS = 7;
const empty = () => Array.from({ length: ROWS }, () => Array(COLS).fill(0));

const checkWin = (board, player) => {
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c <= COLS - 4; c++)
      if ([0,1,2,3].every(i => board[r][c+i] === player))
        return { won: true, cells: [[r,c],[r,c+1],[r,c+2],[r,c+3]] };
  for (let c = 0; c < COLS; c++)
    for (let r = 0; r <= ROWS - 4; r++)
      if ([0,1,2,3].every(i => board[r+i][c] === player))
        return { won: true, cells: [[r,c],[r+1,c],[r+2,c],[r+3,c]] };
  for (let r = 0; r <= ROWS - 4; r++)
    for (let c = 0; c <= COLS - 4; c++)
      if ([0,1,2,3].every(i => board[r+i][c+i] === player))
        return { won: true, cells: [[r,c],[r+1,c+1],[r+2,c+2],[r+3,c+3]] };
  for (let r = 0; r <= ROWS - 4; r++)
    for (let c = 3; c < COLS; c++)
      if ([0,1,2,3].every(i => board[r+i][c-i] === player))
        return { won: true, cells: [[r,c],[r+1,c-1],[r+2,c-2],[r+3,c-3]] };
  return { won: false };
};

export const useLocalGame = (names) => {
  const [board,         setBoard]         = useState(empty());
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [winner,        setWinner]        = useState(null);   // 1 | 2 | 'draw'
  const [winCells,      setWinCells]      = useState([]);
  const [lastDrop,      setLastDrop]      = useState(null);
  const [scores,        setScores]        = useState({ 1: 0, 2: 0 });

  const drop = useCallback((col) => {
    if (winner) return false;
    const next = board.map(r => [...r]);
    let placed = false, row = -1;
    for (let r = ROWS - 1; r >= 0; r--) {
      if (next[r][col] === 0) { next[r][col] = currentPlayer; row = r; placed = true; break; }
    }
    if (!placed) return false;

    setBoard(next);
    setLastDrop({ row, col });

    const result = checkWin(next, currentPlayer);
    const full   = next[0].every(c => c !== 0);

    if (result.won) {
      setWinner(currentPlayer);
      setWinCells(result.cells);
      setScores(s => ({ ...s, [currentPlayer]: s[currentPlayer] + 1 }));
    } else if (full) {
      setWinner('draw');
    } else {
      setCurrentPlayer(p => p === 1 ? 2 : 1);
    }
    return true;
  }, [board, currentPlayer, winner]);

  const reset = useCallback(() => {
    setBoard(empty());
    setCurrentPlayer(1);
    setWinner(null);
    setWinCells([]);
    setLastDrop(null);
  }, []);

  const isWinCell = (r, c) => winCells.some(([wr, wc]) => wr === r && wc === c);

  return { board, currentPlayer, winner, winCells, lastDrop, scores, drop, reset, isWinCell,
    playerName: (p) => names[p] || `Player ${p}` };
};
