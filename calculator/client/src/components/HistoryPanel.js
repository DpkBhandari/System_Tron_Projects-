import React from 'react';
import { FaTrash, FaTimes } from 'react-icons/fa';

const HistoryPanel = ({ history, onRecall, onDelete, onClear, onClose }) => (
  <div className="absolute top-0 right-0 w-72 h-full bg-[#161616] border-l border-[#2a2a2a] rounded-r-2xl flex flex-col z-20 animate-history-in">
    <div className="flex items-center justify-between px-4 py-3 border-b border-[#2a2a2a]">
      <span className="text-sm font-semibold text-gray-300">History</span>
      <div className="flex gap-2">
        {history.length > 0 && (
          <button onClick={onClear} title="Clear all"
            className="text-gray-600 hover:text-red-400 transition-colors p-1">
            <FaTrash size={13} />
          </button>
        )}
        <button onClick={onClose} className="text-gray-600 hover:text-white transition-colors p-1">
          <FaTimes size={14} />
        </button>
      </div>
    </div>

    <div className="flex-1 overflow-y-auto p-3 space-y-2">
      {history.length === 0 ? (
        <div className="text-center text-gray-600 text-sm py-8">No history yet</div>
      ) : (
        history.map(item => (
          <div key={item._id}
            className="group bg-[#1e1e1e] hover:bg-[#252525] rounded-xl px-3 py-2.5 cursor-pointer transition-colors relative"
            onClick={() => onRecall(item)}>
            <p className="text-gray-500 text-xs font-mono truncate">{item.expression}</p>
            <p className="text-orange-400 font-semibold font-mono text-sm mt-0.5">= {item.result}</p>
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(item._id); }}
              className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 text-gray-600 hover:text-red-400 transition-all p-1">
              <FaTrash size={10} />
            </button>
          </div>
        ))
      )}
    </div>
  </div>
);

export default HistoryPanel;
