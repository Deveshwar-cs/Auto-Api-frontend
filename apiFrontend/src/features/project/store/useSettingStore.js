import {create} from "zustand";
import api from "../../../services/api";

const useSettingStore = create((set) => ({
  password: "",
  name: "",
  profilePhoto: "",
  bio: "",
  theme: "",

  updateProfileData: async (formData) => {
    const res = await api.put("/settings/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    set({
      name: res.data.name,
      bio: res.data.bio,
      profilePhoto: res.data.profilePhoto,
    });
  },

  fetchProfileData: async () => {
    const res = await api.get("/settings/profile");

    set({
      name: res.data.name,
      bio: res.data.bio,
      profilePhoto: res.data.profilePhoto,
    });
  },
}));

export default useSettingStore;
