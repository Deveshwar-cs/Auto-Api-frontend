import {create} from "zustand";
import api from "../../../services/api";

const useNotificationStore = create((set) => ({
  notifications: [],
  fetchNotifications: async () => {
    const res = await api.get("/notifications");
    set({notifications: res.data});
  },
  markAsRead: async (id) => {
    await api.put(`/notifications/${id}/read`);
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n._id === id ? {...n, read: true} : n,
      ),
    }));
  },
  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
    })),
}));
export default useNotificationStore;
