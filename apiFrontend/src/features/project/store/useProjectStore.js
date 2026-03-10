import {create} from "zustand";
import {
  getProjects,
  createProjectApi,
  deleteProjectApi,
  updateProjectApi,
} from "../services/projectApi";

const useProjectStore = create((set) => ({
  projects: [],
  loading: false,

  // 🔹 FETCH
  fetchProjects: async () => {
    set({loading: true});
    try {
      const res = await getProjects();
      set({projects: res.data});
    } catch (err) {
      console.error("Fetch projects failed:", err);
    } finally {
      set({loading: false});
    }
  },

  // 🔹 CREATE
  createProject: async (data) => {
    const res = await createProjectApi(data);
    set((state) => ({
      projects: [res.data, ...state.projects],
    }));
  },

  // 🔹 DELETE
  deleteProject: async (projectId) => {
    await deleteProjectApi(projectId);
    set((state) => ({
      projects: state.projects.filter((p) => p._id !== projectId),
    }));
  },

  // 🔹 UPDATE
  updateProject: async (projectId, data) => {
    try {
      const res = await updateProjectApi(projectId, data);
      set((state) => ({
        projects: state.projects.map((p) =>
          p._id === projectId ? res.data.project : p,
        ),
      }));
    } catch (err) {
      console.error("Update failed:", err);
    }
  },

  // 🔥 OPTIONAL: increment collection count
  incrementCollectionCount: (projectId) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p._id === projectId
          ? {...p, collectionsCount: p.collectionsCount + 1}
          : p,
      ),
    })),

  decrementCollectionCount: (projectId) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p._id === projectId
          ? {...p, collectionsCount: p.collectionsCount - 1}
          : p,
      ),
    })),
}));

export default useProjectStore;
