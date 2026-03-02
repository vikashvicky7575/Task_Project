import API from '../api/axiosInstance';

// Create new project
export const createProject = (data) => API.post("/projects", data);

// Get all projects of logged user
export const fetchProjects = () => API.get("/projects");

// Delete project
export const deleteProject = (id) => API.delete(`/projects/${id}`);