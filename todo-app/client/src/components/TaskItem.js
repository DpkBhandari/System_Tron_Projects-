import React, { useState } from 'react';
import { FaTrash, FaEdit, FaCheck, FaFlag, FaCalendar, FaTimes } from 'react-icons/fa';

const PRIORITY_COLORS = {
  high:   { text: 'text-red-400',     bg: 'bg-red-400/10',     border: 'priority-high'   },
  medium: { text: 'text-amber-400',   bg: 'bg-amber-400/10',   border: 'priority-medium' },
  low:    { text: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'priority-low'    },
};

const TaskItem = ({ task, onToggle, onDelete, onUpdate }) => {
  const [editing, setEditing]   = useState(false);
  const [editTitle, setTitle]   = useState(task.title);
  const [editDesc, setDesc]     = useState(task.description || '');
  const pc = PRIORITY_COLORS[task.priority] || PRIORITY_COLORS.medium;

  const isOverdue = task.dueDate && !task.completed && new Date(task.dueDate) < new Date();

  const saveEdit = async () => {
    if (!editTitle.trim()) return;
    await onUpdate(task._id, { title: editTitle, description: editDesc });
    setEditing(false);
  };

  const fmtDate = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <div className={`task-item glass rounded-xl p-4 mb-3 ${pc.border} group animate-slide-in`}>
      {editing ? (
        <div className="space-y-2">
          <input value={editTitle} onChange={e => setTitle(e.target.value)}
            className="w-full bg-white/5 text-white text-sm rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500"
            autoFocus onKeyDown={e => e.key === 'Enter' && saveEdit()} />
          <textarea value={editDesc} onChange={e => setDesc(e.target.value)} rows={2}
            className="w-full bg-white/5 text-white text-xs rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500 resize-none placeholder-gray-600"
            placeholder="Description…" />
          <div className="flex gap-2 justify-end">
            <button onClick={() => setEditing(false)}
              className="px-3 py-1 text-xs text-gray-400 hover:text-white rounded-lg transition-colors flex items-center gap-1">
              <FaTimes size={10} /> Cancel
            </button>
            <button onClick={saveEdit}
              className="px-4 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-1">
              <FaCheck size={10} /> Save
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-3">
          {/* Checkbox */}
          <div className={`checkbox-custom mt-0.5 ${task.completed ? 'checked' : ''}`}
            onClick={() => onToggle(task._id)}>
            {task.completed && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" className="checkmark-path" />
              </svg>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-medium leading-snug ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>
              {task.title}
            </p>
            {task.description && (
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{task.description}</p>
            )}
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1 ${pc.text} ${pc.bg}`}>
                <FaFlag size={8} /> {task.priority}
              </span>
              {task.category && (
                <span className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">{task.category}</span>
              )}
              {task.dueDate && (
                <span className={`text-xs flex items-center gap-1 ${isOverdue ? 'text-red-400' : 'text-gray-500'}`}>
                  <FaCalendar size={8} />
                  {isOverdue ? 'Overdue · ' : ''}{fmtDate(task.dueDate)}
                </span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={() => setEditing(true)}
              className="p-1.5 text-gray-500 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all">
              <FaEdit size={12} />
            </button>
            <button onClick={() => onDelete(task._id)}
              className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all">
              <FaTrash size={12} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
