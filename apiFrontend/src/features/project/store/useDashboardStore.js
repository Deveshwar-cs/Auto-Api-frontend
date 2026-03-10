import {create} from "zustand";
import api from "../../../services/api";

const useDashboardStore = create((set) => ({
  stats: {
    totalProjects: 0,
    totalCollections: 0,
    totalApis: 0,
  },

  recentProjects: [],

  fetchStats: async () => {
    try {
      const res = await api.get("/dashboard/stats");
      set({
        stats: {
          totalProjects: res.data.totalProjects,
          totalCollections: res.data.totalCollections,
          totalApis: res.data.totalApis,
        },
        recentProjects: res.data.recentProjects,
      });
    } catch (error) {
      console.error("Failed to fetch dashboard stats", error);
    }
  },
}));

export default useDashboardStore;
