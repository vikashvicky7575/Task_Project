const Project = require("../models/Project");

//createProject
exports.createProject = async (req, res, next) => {
  try {
    const project = await Project.create({
      title: req.body.title,
      description: req.body.description,
      createdBy: req.user.id
    });

    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};

//fetchProject
exports.getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({
      createdBy: req.user.id
    });

    res.json(projects);
  } catch (error) {
    next(error);
  }
};

//deleteProject
exports.deleteProject = async (req, res, next) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    next(error);
  }
};