import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GameHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/games/history')
      .then(({ data }) => setHistory(data.games || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center text-gray-500 text-sm py-4">Loading history…</div>;
  if (!history.length) return <div className="text-center text-gray-600 text-sm py-4">No games played yet</div>;

  return (
    <div className="mt-6 max-h-64 overflow-y-auto pr-1">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Match History</h3>
      <div className="space-y-2">
        {history.map(g => (
          <div key={g._id} className="bg-white/5 rounded-xl px-4 py-3 flex items-center justify-between text-sm">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full flex-shrink-0
                ${g.winner === 'player1' ? 'bg-red-500' : g.winner === 'player2' ? 'bg-yellow-400' : 'bg-gray-500'}`} />
              <span className="text-gray-300 text-xs">
                {g.player1} vs {g.player2}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span>{g.moves} moves</span>
              <span>{g.winner === 'draw' ? 'Draw' : `${g.winner === 'player1' ? g.player1 : g.player2} won`}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameHistory;
