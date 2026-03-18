import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Board from './components/Board';
import ScoreBoard from './components/ScoreBoard';
import GameHistory from './components/GameHistory';
import { useLocalGame } from './hooks/useLocalGame';
import { FaRedo, FaHistory, FaTimes } from 'react-icons/fa';

const defaultNames = { 1: 'Player 1', 2: 'Player 2' };

export default function App() {
  const [names, setNames]           = useState({ ...defaultNames });
  const [editingNames, setEditing]  = useState(true);
  const [tempNames, setTempNames]   = useState({ ...defaultNames });
  const [showHistory, setHistory]   = useState(false);

  const game = useLocalGame(names);

  const handleStart = (e) => {
    e.preventDefault();
    setNames({ ...tempNames });
    setEditing(false);
    game.reset();
  };

  const handleDrop = (col) => {
    const ok = game.drop(col);
    if (!ok) toast.warn('Column is full!', { autoClose: 1200 });
  };

  // Announce winner
  React.useEffect(() => {
    if (game.winner === 'draw') toast.info("It's a Draw! 🤝", { autoClose: 3000 });
    else if (game.winner) toast.success(`🏆 ${game.playerName(game.winner)} wins!`, { autoClose: 3000 });
  }, [game.winner]);  // eslint-disable-line

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-8 px-4 relative">
      {/* Stars bg */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div key={i} className="absolute w-px h-px bg-white/40 rounded-full"
            style={{ left: `${Math.random()*100}%`, top: `${Math.random()*100}%`,
              width: `${Math.random()*2+1}px`, height: `${Math.random()*2+1}px`, opacity: Math.random()*0.6+0.2 }} />
        ))}
      </div>

      {/* Header */}
      <div className="text-center mb-6 relative z-10">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          CONNECT<span className="text-yellow-400">FOUR</span>
        </h1>
        <p className="text-gray-500 text-sm mt-1">Drop your piece. Beat your rival.</p>
      </div>

      {/* Name Setup Modal */}
      {editingNames && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <form onSubmit={handleStart}
            className="bg-[#0d1b3e] border border-white/10 rounded-2xl p-8 w-full max-w-sm shadow-2xl">
            <h2 className="text-white font-bold text-xl mb-6 text-center" style={{ fontFamily: 'Orbitron' }}>
              Enter Player Names
            </h2>
            <div className="space-y-4 mb-6">
              {[1,2].map(p => (
                <div key={p} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 ${p===1?'bg-red-500':'bg-yellow-400'}`} />
                  <input
                    value={tempNames[p]}
                    onChange={e => setTempNames(n => ({ ...n, [p]: e.target.value || `Player ${p}` }))}
                    placeholder={`Player ${p} name`}
                    maxLength={16}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              ))}
            </div>
            <button type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 rounded-xl transition-all text-sm tracking-wide">
              START GAME
            </button>
          </form>
        </div>
      )}

      <div className="w-full max-w-lg relative z-10">
        <ScoreBoard names={names} scores={game.scores} currentPlayer={game.currentPlayer} winner={game.winner} />

        {/* Turn indicator */}
        {!game.winner && (
          <div className="text-center mb-4">
            <span className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-sm">
              <div className={`w-4 h-4 rounded-full ${game.currentPlayer===1?'bg-red-500':'bg-yellow-400'}`} />
              <span className="text-gray-300">{game.playerName(game.currentPlayer)}'s turn</span>
            </span>
          </div>
        )}

        {game.winner && (
          <div className={`text-center mb-4 py-3 rounded-2xl font-bold text-lg
            ${game.winner==='draw' ? 'text-gray-300 bg-white/5' :
              game.winner===1 ? 'text-red-300 bg-red-500/10' : 'text-yellow-300 bg-yellow-500/10'}`}>
            {game.winner === 'draw' ? "🤝 It's a Draw!" : `🏆 ${game.playerName(game.winner)} Wins!`}
          </div>
        )}

        <Board
          board={game.board}
          currentPlayer={game.currentPlayer}
          onDrop={handleDrop}
          winner={game.winner}
          isWinCell={game.isWinCell}
          lastDrop={game.lastDrop}
          disabled={!!game.winner}
        />

        {/* Controls */}
        <div className="flex gap-3 mt-5 justify-center">
          <button onClick={game.reset}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 px-5 py-2.5 rounded-xl text-sm font-medium transition-all">
            <FaRedo size={12} /> New Game
          </button>
          <button onClick={() => setEditing(true)}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 px-5 py-2.5 rounded-xl text-sm font-medium transition-all">
            Change Names
          </button>
          <button onClick={() => setHistory(h => !h)}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 px-5 py-2.5 rounded-xl text-sm font-medium transition-all">
            <FaHistory size={12} /> History
          </button>
        </div>

        {showHistory && (
          <div className="mt-4 bg-white/5 border border-white/10 rounded-2xl p-4 relative">
            <button onClick={() => setHistory(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-white">
              <FaTimes size={14} />
            </button>
            <GameHistory />
          </div>
        )}
      </div>

      <ToastContainer position="top-center" theme="dark" autoClose={2500}
        toastStyle={{ background: '#0d1b3e', border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'Inter' }} />
    </div>
  );
}
