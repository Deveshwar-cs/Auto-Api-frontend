import {useEffect, useState, useCallback, useMemo} from "react";
import api from "../api/axios";
import ProjectStoreContext from "./ProjectStoreContext";

export const ProjectStoreProvider = ({children}) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  // -------- FETCH --------
  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // -------- CREATE --------
  const createProject = useCallback(async (data) => {
    const res = await api.post("/projects/createProject", data);
    setProjects((prev) => [res.data, ...prev]);
  }, []);

  // -------- DELETE --------
  const deleteProject = useCallback(async (projectId) => {
    await api.delete(`/projects/${projectId}`);
    setProjects((prev) => prev.filter((p) => p._id !== projectId));
  }, []);

  // -------- EDIT ----------
  const updateProject = useCallback(async (projectId, data) => {
    try {
      const res = await api.put(`/projects/update/${projectId}`, data);

      setProjects((prev) =>
        prev.map((p) => (p._id === projectId ? res.data.project : p)),
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update project");
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const value = useMemo(
    () => ({
      projects,
      loading,
      fetchProjects,
      createProject,
      deleteProject,
      updateProject,
    }),
    [
      projects,
      loading,
      fetchProjects,
      createProject,
      deleteProject,
      updateProject,
    ],
  );

  return (
    <ProjectStoreContext.Provider value={value}>
      {children}
    </ProjectStoreContext.Provider>
  );
};
