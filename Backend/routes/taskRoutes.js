const express = require('express');
const protect = require("../middleware/authMiddleware");
const {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask
} = require("../controllers/taskController");

const router = express.Router();

//createTask
router.post("/", protect, createTask);
//fetch the taskDatas
router.get("/:projectId", protect, getTasks);
//update the taskDatas
router.patch("/:id", protect, updateTaskStatus);
//delete the taskDatas
router.delete("/:id", protect, deleteTask);

module.exports = router;