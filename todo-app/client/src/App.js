import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTasks } from './hooks/useTasks';
import AddTaskForm from './components/AddTaskForm';
import TaskItem from './components/TaskItem';
import StatsBar from './components/StatsBar';
import FilterBar from './components/FilterBar';

export default function App() {
  const [filter, setFilter] = useState('all');
  const { tasks, stats, loading, addTask, toggleTask, deleteTask, updateTask, clearCompleted } = useTasks(filter);

  return (
    <div className="min-h-screen bg-[#0f0f1a] py-10 px-4">
      {/* Background glow */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto relative">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-1">
            Task<span className="text-blue-400">Flow</span>
          </h1>
          <p className="text-gray-500 text-sm">Stay focused. Get things done.</p>
        </div>

        <StatsBar stats={stats} />
        <AddTaskForm onAdd={addTask} />

        <FilterBar
          active={filter}
          onChange={setFilter}
          taskCount={tasks.length}
          onClearCompleted={clearCompleted}
        />

        {loading ? (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-16 rounded-xl animate-pulse bg-white/5" />
            ))}
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-20 glass rounded-2xl">
            <div className="text-5xl mb-4">
              {filter === 'completed' ? '🎉' : filter === 'pending' ? '✅' : '📋'}
            </div>
            <p className="text-gray-400 font-medium">
              {filter === 'completed' ? 'No completed tasks yet' :
               filter === 'pending'   ? 'All caught up!' :
               'No tasks yet. Add one above!'}
            </p>
          </div>
        ) : (
          <div>
            {tasks.map(task => (
              <TaskItem
                key={task._id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onUpdate={updateTask}
              />
            ))}
          </div>
        )}
      </div>

      <ToastContainer position="bottom-right" theme="dark" autoClose={2500}
        toastStyle={{ background: '#1e1e2e', border: '1px solid rgba(255,255,255,0.06)', fontSize: '14px' }} />
    </div>
  );
}
