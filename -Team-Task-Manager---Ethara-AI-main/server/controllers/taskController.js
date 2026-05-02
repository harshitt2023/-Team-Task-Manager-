const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      assignedTo: req.user._id  // User's own tasks
    }).populate('project', 'name').sort({ createdAt: -1 });
    
    res.json(tasks);
  } catch (error) {
    console.error('Tasks error:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

exports.createTask = async (req, res) => {
  try {
    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      project: req.body.project,
      assignedTo: req.body.assignedTo || req.user._id,
      status: req.body.status || 'pending',
      dueDate: req.body.dueDate
    });
    
    await task.save();
    const populatedTask = await Task.findById(task._id).populate('project assignedTo', 'name email');
    
    res.status(201).json(populatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};