import React from 'react';

const ScoreBoard = ({ names, scores, currentPlayer, winner }) => {
  const players = [1, 2];
  return (
    <div className="flex gap-4 justify-center mb-6">
      {players.map(p => {
        const isActive = currentPlayer === p && !winner;
        const isWinner = winner === p;
        return (
          <div key={p} className={`flex-1 max-w-[160px] rounded-2xl p-4 text-center transition-all duration-300 border
            ${isWinner
              ? p === 1 ? 'bg-red-500/20 border-red-500/50 shadow-lg shadow-red-500/20'
                        : 'bg-yellow-500/20 border-yellow-500/50 shadow-lg shadow-yellow-500/20'
              : isActive
              ? p === 1 ? 'bg-red-500/10 border-red-500/30' : 'bg-yellow-500/10 border-yellow-500/30'
              : 'bg-white/5 border-white/5'}`}>
            <div className={`w-8 h-8 rounded-full mx-auto mb-2 shadow-md
              ${p === 1
                ? 'bg-gradient-to-br from-red-400 to-red-600'
                : 'bg-gradient-to-br from-yellow-300 to-yellow-500'}`} />
            <p className="text-xs text-gray-400 font-medium truncate">{names[p] || `Player ${p}`}</p>
            <p className={`text-3xl font-black mt-1 ${p === 1 ? 'text-red-400' : 'text-yellow-400'}`}>
              {scores[p]}
            </p>
            {isActive && (
              <span className="text-xs text-white/50 animate-pulse2">Your turn</span>
            )}
            {isWinner && (
              <span className={`text-xs font-bold ${p === 1 ? 'text-red-300' : 'text-yellow-300'}`}>
                🏆 Winner!
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ScoreBoard;
