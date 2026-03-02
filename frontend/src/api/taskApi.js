import API from '../api/axiosInstance';

// create Task 
export const createTask = (data) => API.post("/task", data);
// fetch task 
export const getTasks = (projectId) => API.get(`/task/${projectId}`);
// updated task
export const updateTaskStatus = (id, status) =>
  API.patch(`/task/${id}`, { status });
// delete task
export const deleteTask = (id) => API.delete(`/task/${id}`);