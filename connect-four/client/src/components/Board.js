import React, { useState } from 'react';

const ROWS = 6, COLS = 7;

const Board = ({ board, currentPlayer, onDrop, winner, isWinCell, lastDrop, disabled }) => {
  const [hoverCol, setHoverCol] = useState(null);

  const getCellClass = (r, c) => {
    const val = board[r][c];
    const isLast = lastDrop?.row === r && lastDrop?.col === c;
    const isWin  = isWinCell(r, c);
    let cls = 'cell ';
    if (val === 1) cls += 'p1 ';
    if (val === 2) cls += 'p2 ';
    if (isLast)   cls += 'new ';
    if (isWin)    cls += 'win ';
    return cls;
  };

  return (
    <div className="board-grid select-none">
      {/* Column hover indicators */}
      <div className="flex gap-2 mb-2 px-1">
        {Array.from({ length: COLS }, (_, c) => (
          <div key={c} className="flex-1 h-6 flex items-center justify-center">
            {hoverCol === c && !winner && !disabled && (
              <div className={`w-5 h-5 rounded-full opacity-80 transition-opacity
                ${currentPlayer === 1
                  ? 'bg-gradient-to-br from-red-400 to-red-600'
                  : 'bg-gradient-to-br from-yellow-300 to-yellow-500'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="flex flex-col gap-2">
        {Array.from({ length: ROWS }, (_, r) => (
          <div key={r} className="flex gap-2">
            {Array.from({ length: COLS }, (_, c) => (
              <div
                key={c}
                className={`cell ${getCellClass(r, c)} ${!winner && !disabled ? 'cursor-pointer' : 'cursor-default'}`}
                onClick={() => !winner && !disabled && onDrop(c)}
                onMouseEnter={() => setHoverCol(c)}
                onMouseLeave={() => setHoverCol(null)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
