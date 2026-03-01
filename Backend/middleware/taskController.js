const Task = require("../models/Task");

//createTask
exports.createTask = async (req, res, next) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

//fetchTask
exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({
      projectId: req.params.projectId
    });

    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

//updateTaskStatus
exports.updateTaskStatus = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json(task);
  } catch (error) {
    next(error);
  }
};

//deletedTask
exports.deleteTask = async (req, res, next) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    next(error);
  }
};