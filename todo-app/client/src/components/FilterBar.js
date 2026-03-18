import React from 'react';

const FILTERS = [
  { value: 'all',       label: 'All'       },
  { value: 'pending',   label: 'Pending'   },
  { value: 'completed', label: 'Completed' },
];

const FilterBar = ({ active, onChange, taskCount, onClearCompleted }) => (
  <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
    <div className="flex gap-1 bg-white/5 rounded-xl p-1">
      {FILTERS.map(f => (
        <button key={f.value} onClick={() => onChange(f.value)}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all
            ${active === f.value ? 'bg-blue-600 text-white shadow' : 'text-gray-400 hover:text-white'}`}>
          {f.label}
        </button>
      ))}
    </div>
    <div className="flex items-center gap-3">
      <span className="text-xs text-gray-600">{taskCount} task{taskCount !== 1 ? 's' : ''}</span>
      {active !== 'pending' && (
        <button onClick={onClearCompleted}
          className="text-xs text-gray-500 hover:text-red-400 transition-colors border border-white/5 hover:border-red-400/30 px-3 py-1.5 rounded-lg">
          Clear completed
        </button>
      )}
    </div>
  </div>
);

export default FilterBar;
