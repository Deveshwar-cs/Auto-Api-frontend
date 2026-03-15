import {create} from "zustand";
import api from "../../services/api";

export const useProject = create((set, get) => ({
  // ------------ State -----------
  project: null,
  collections: [],
  files: [],
  loading: false,

  // ----------------- Actions --------------
  fetchProject: async (projectId) => {
    if (!projectId) return;

    try {
      set({loading: true});

      const res = await api.get(`/projects`);

      set({
        project: res.data.data,
        loading: false,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
      set({loading: false});
    }
  },
  addCollection: async (projectId, collectionName, fields = []) => {
    try {
      const res = await api.post(`/collection/createCollection/${projectId}`, {
        collectionName,
        fields,
      });
      set((state) => ({
        collections: [...state.collections, res.data.data],
      }));
    } catch (err) {
      console.log(err);
    }
  },

  fetchCollections: async (projectId) => {
    if (!projectId) return;
    const res = await api.get(`collection/getCollection/${projectId}`);
    set({collections: res.data.data});
  },
  updateCollection: async (projectId, collectionId, data) => {
    if (!projectId) return;

    const res = await api.put(
      `/collection/updateCollection/${projectId}/${collectionId}`,
      data,
    );
    set({collections: res.data.data});
    await get().fetchCollections(projectId);
  },
  fetchGeneratedFiles: async (projectId) => {
    if (!projectId) return;
    const res = await api.get(`/generated-files/${projectId}`);
    await get().fetchCollections(projectId);
    set({files: res.data.files});
  },
  generateFiles: async (projectId, collectionId) => {
    await api.post(`collection/${projectId}/${collectionId}/generate`);

    await get().fetchGeneratedFiles(projectId);
  },

  deleteCollection: async (projectId, collectionId) => {
    await api.delete(`/collection/${projectId}/delete/${collectionId}`);

    await Promise.all([
      get().fetchCollections(projectId),
      get().fetchGeneratedFiles(projectId),
      get().fetchProject(projectId),
    ]);
  },
  generateAllFiles: async (projectId) => {
    await api.post(`collection/${projectId}/generate-all`);
    await Promise.all([
      get().fetchCollections(projectId),
      get().fetchGeneratedFiles(projectId),
      get().fetchProject(projectId),
    ]);
  },
}));
