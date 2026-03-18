const Task = require('../models/Task');

// GET /api/tasks
exports.getTasks = async (req, res) => {
  try {
    const { filter, priority, category, sort = 'createdAt', order = 'desc' } = req.query;
    const query = {};

    if (filter === 'completed') query.completed = true;
    if (filter === 'pending') query.completed = false;
    if (priority) query.priority = priority;
    if (category) query.category = category;

    const sortObj = { [sort]: order === 'desc' ? -1 : 1 };
    const tasks = await Task.find(query).sort(sortObj);

    const stats = {
      total: await Task.countDocuments(),
      completed: await Task.countDocuments({ completed: true }),
      pending: await Task.countDocuments({ completed: false }),
      high: await Task.countDocuments({ priority: 'high', completed: false }),
    };

    res.json({ success: true, tasks, stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/tasks
exports.createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, category } = req.body;
    if (!title?.trim()) return res.status(400).json({ success: false, message: 'Title is required' });

    const task = await Task.create({ title: title.trim(), description, priority, dueDate, category });
    res.status(201).json({ success: true, task });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// PUT /api/tasks/:id
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
    res.json({ success: true, task });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// PATCH /api/tasks/:id/toggle
exports.toggleTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
    task.completed = !task.completed;
    await task.save();
    res.json({ success: true, task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/tasks/:id
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
    res.json({ success: true, message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/tasks/completed/all
exports.clearCompleted = async (req, res) => {
  try {
    const result = await Task.deleteMany({ completed: true });
    res.json({ success: true, message: `Deleted ${result.deletedCount} completed tasks` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PATCH /api/tasks/reorder
exports.reorderTasks = async (req, res) => {
  try {
    const { tasks } = req.body;
    await Promise.all(tasks.map(({ id, order }) => Task.findByIdAndUpdate(id, { order })));
    res.json({ success: true, message: 'Tasks reordered' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
