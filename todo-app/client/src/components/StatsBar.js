import React from 'react';
import { FaCheckCircle, FaClock, FaFire, FaListUl } from 'react-icons/fa';

const StatsBar = ({ stats }) => {
  const pct = stats.total ? Math.round((stats.completed / stats.total) * 100) : 0;
  const cards = [
    { icon: <FaListUl />,      label: 'Total',     value: stats.total,     color: 'text-blue-400',    bg: 'bg-blue-400/10'    },
    { icon: <FaClock />,       label: 'Pending',   value: stats.pending,   color: 'text-amber-400',   bg: 'bg-amber-400/10'   },
    { icon: <FaCheckCircle />, label: 'Completed', value: stats.completed, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { icon: <FaFire />,        label: 'Urgent',    value: stats.high,      color: 'text-red-400',     bg: 'bg-red-400/10'     },
  ];

  return (
    <div className="mb-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {cards.map(c => (
          <div key={c.label} className="glass rounded-xl p-4 flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg ${c.bg} ${c.color} flex items-center justify-center text-sm`}>
              {c.icon}
            </div>
            <div>
              <p className="text-xl font-bold text-white">{c.value}</p>
              <p className="text-xs text-gray-500">{c.label}</p>
            </div>
          </div>
        ))}
      </div>
      {stats.total > 0 && (
        <div className="glass rounded-xl p-4">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>Progress</span>
            <span>{pct}% complete</span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-700"
              style={{ width: `${pct}%` }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsBar;
