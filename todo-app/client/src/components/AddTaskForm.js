import React, { useState } from 'react';
import { FaPlus, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { toast } from 'react-toastify';

const PRIORITIES = [
  { value: 'low',    label: 'Low',    color: 'text-emerald-400' },
  { value: 'medium', label: 'Medium', color: 'text-amber-400'   },
  { value: 'high',   label: 'High',   color: 'text-red-400'     },
];

const AddTaskForm = ({ onAdd }) => {
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [form, setForm] = useState({
    title: '', description: '', priority: 'medium', dueDate: '', category: ''
  });

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) { toast.error('Title is required'); return; }
    setLoading(true);
    try {
      await onAdd(form);
      setForm({ title: '', description: '', priority: 'medium', dueDate: '', category: '' });
      setExpanded(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass rounded-2xl p-5 mb-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0">
          <FaPlus className="text-blue-400 text-xs" />
        </div>
        <input
          type="text"
          placeholder="Add a new task…"
          value={form.title}
          onChange={set('title')}
          onFocus={() => setExpanded(true)}
          className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-sm"
        />
        <button type="button" onClick={() => setExpanded(x => !x)}
          className="text-gray-500 hover:text-gray-300 transition-colors ml-2">
          {expanded ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
        </button>
      </div>

      {expanded && (
        <div className="mt-4 space-y-3 animate-slide-in">
          <textarea
            placeholder="Description (optional)"
            value={form.description}
            onChange={set('description')}
            rows={2}
            className="w-full bg-white/5 text-white text-sm rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-600 resize-none"
          />
          <div className="flex gap-3 flex-wrap">
            <div className="flex gap-1">
              {PRIORITIES.map(p => (
                <button key={p.value} type="button"
                  onClick={() => setForm(f => ({ ...f, priority: p.value }))}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all border
                    ${form.priority === p.value
                      ? 'bg-white/10 border-white/20 ' + p.color
                      : 'border-white/5 text-gray-500 hover:border-white/10'}`}>
                  {p.label}
                </button>
              ))}
            </div>
            <input type="date" value={form.dueDate} onChange={set('dueDate')}
              className="bg-white/5 text-gray-300 text-xs rounded-lg px-3 py-1 outline-none focus:ring-1 focus:ring-blue-500" />
            <input type="text" placeholder="Category" value={form.category} onChange={set('category')}
              className="bg-white/5 text-gray-300 text-xs rounded-lg px-3 py-1 outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-600 w-28" />
          </div>
          <div className="flex justify-end">
            <button type="submit" disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl text-sm font-medium transition-colors disabled:opacity-60 flex items-center gap-2">
              {loading ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <FaPlus size={10} />}
              Add Task
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default AddTaskForm;
