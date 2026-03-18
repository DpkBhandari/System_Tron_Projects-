import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

export const useTasks = (filter = 'all') => {
  const [tasks, setTasks]   = useState([]);
  const [stats, setStats]   = useState({ total: 0, completed: 0, pending: 0, high: 0 });
  const [loading, setLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const params = filter !== 'all' ? { filter } : {};
      const { data } = await axios.get('/tasks', { params });
      setTasks(data.tasks);
      setStats(data.stats);
    } catch {
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  const addTask = async (taskData) => {
    const { data } = await axios.post('/tasks', taskData);
    setTasks(prev => [data.task, ...prev]);
    setStats(s => ({ ...s, total: s.total + 1, pending: s.pending + 1 }));
    toast.success('Task added!');
    return data.task;
  };

  const updateTask = async (id, updates) => {
    const { data } = await axios.put(`/tasks/${id}`, updates);
    setTasks(prev => prev.map(t => t._id === id ? data.task : t));
    toast.success('Task updated');
    return data.task;
  };

  const toggleTask = async (id) => {
    const { data } = await axios.patch(`/tasks/${id}/toggle`);
    setTasks(prev => prev.map(t => t._id === id ? data.task : t));
    const delta = data.task.completed ? 1 : -1;
    setStats(s => ({ ...s, completed: s.completed + delta, pending: s.pending - delta }));
  };

  const deleteTask = async (id) => {
    const task = tasks.find(t => t._id === id);
    await axios.delete(`/tasks/${id}`);
    setTasks(prev => prev.filter(t => t._id !== id));
    setStats(s => ({
      ...s, total: s.total - 1,
      completed: task?.completed ? s.completed - 1 : s.completed,
      pending: !task?.completed ? s.pending - 1 : s.pending
    }));
    toast.info('Task deleted');
  };

  const clearCompleted = async () => {
    await axios.patch('/tasks/completed/clear');
    await fetchTasks();
    toast.info('Completed tasks cleared');
  };

  return { tasks, stats, loading, addTask, updateTask, toggleTask, deleteTask, clearCompleted, refetch: fetchTasks };
};
