import api from "../../../services/api";

export const getProjects = () => api.get("/projects");

export const createProjectApi = (data) =>
  api.post("/projects/createProject", data);

export const deleteProjectApi = (projectId) =>
  api.delete(`/projects/${projectId}`);

export const updateProjectApi = (projectId, data) =>
  api.put(`/projects/update/${projectId}`, data);
