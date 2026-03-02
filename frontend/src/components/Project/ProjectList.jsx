import React from "react";
import styles from "./ProjectList.module.css";
import { deleteProject } from "../../api/projectApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProjectList = ({ projects = [], refreshProjects }) => {

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await deleteProject(id);
      toast.success("Project deleted successfully");
      refreshProjects();
    } catch (error) {
      toast.error("Failed to delete project");
    }
  };

  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className={styles.heading}>Your Projects</h4>
        <span className={styles.countBadge}>
          {projects.length} Projects
        </span>
      </div>

      {projects.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No Projects Found</p>
        </div>
      ) : (
        <div className="row g-4">
          {projects.map((project) => (
            <div key={project._id} className="col-md-6 col-lg-4">

              <div className={`${styles.card} card h-100`}>

                <div className="card-body d-flex flex-column">

                  <h5 className={`card-title ${styles.title}`}>
                    {project.title}
                  </h5>

                  <p className={`card-text ${styles.description}`}>
                    {project.description || "No description provided."}
                  </p>

                  <div className="mt-auto d-flex justify-content-between align-items-center">

                    <span className={styles.createdDate}>
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>

                    {/* View Task */}
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => navigate(`/project/${project._id}/tasks`)}
                    >
                      View Tasks
                    </button>

                    {/* Delete Button  */}
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(project._id)}
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default ProjectList;