const express = require('express');

//protect using authMiddleware
const protect = require("../middleware/authMiddleware");

//destructed createProject,getProjects,deleteProject in projectController
const { createProject, getProjects, deleteProject } = require('../controllers/projectController');

//router using express
const router = express.Router();

//createProject
router.post("/", protect, createProject);
//fetch projectDatas
router.get("/", protect, getProjects);
//delete ProjectDatas
router.delete("/:id", protect, deleteProject);

module.exports = router;