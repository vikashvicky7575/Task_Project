import React, { useEffect, useState, useCallback } from "react";
import { getTasks, updateTaskStatus, deleteTask } from "../../api/taskApi";
import styles from "./TaskBoard.module.css";
import toast from "react-hot-toast";
import AddTask from "./AddTask";

const TaskBoard = ({ projectId }) => {
  const [tasks, setTasks] = useState([]);

  const loadTasks = useCallback(async () => {
    const res = await getTasks(projectId);
    setTasks(res.data);
  }, [projectId]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleStatusChange = async (id, status) => {
    await updateTaskStatus(id, status);
    toast.success("Status updated");
    loadTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    toast.success("Task deleted");
    loadTasks();
  };

  const renderColumn = (status) => (
    <div className="col-md-4">
      <div className={styles.column}>
        <h6>{status}</h6>

        {tasks
          .filter((task) => task.status === status)
          .map((task) => (
            <div key={task._id} className={styles.taskCard}>
              <p>{task.title}</p>
              <small>{new Date(task.dueDate).toLocaleDateString()}</small>

              <div className="mt-2 d-flex gap-2">
                {status !== "Completed" && (
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() =>
                      handleStatusChange(
                        task._id,
                        status === "Todo"
                          ? "In Progress"
                          : "Completed"
                      )
                    }
                  >
                    Move →
                  </button>
                )}

                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(task._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );

  return (
    <div className="container mt-4">
      <AddTask projectId={projectId} refreshTasks={loadTasks} />

      <div className="row mt-4">
        {renderColumn("Todo")}
        {renderColumn("In Progress")}
        {renderColumn("Completed")}
      </div>
    </div>
  );
};

export default TaskBoard;