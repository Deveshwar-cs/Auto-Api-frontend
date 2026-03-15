import {useState} from "react";
import useSettingStore from "../store/useSettingStore";

const ProfileTab = () => {
  const [form, setForm] = useState({
    name: "",
    bio: "",
    profilePhoto: null,
  });
  const updateProfileData = useSettingStore((state) => state.updateProfileData);

  const handleChange = (e) => {
    const {name, value, files} = e.target;
    if (files) {
      setForm({...form, [name]: files[0]});
    } else {
      setForm({...form, [name]: value});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("bio", form.bio);
    formData.append("profilePhoto", form.profilePhoto);
    await updateProfileData(formData);
  };

  return (
    <div className="max-w-xl">
      <form
        onSubmit={handleSubmit}
        className="bg-[#0B0513] border border-purple-900/30 rounded-xl p-6 space-y-6"
      >
        <h2 className="text-lg font-semibold text-purple-400">
          Profile Settings
        </h2>

        {/* Username */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-400">Username</label>
          <input
            name="name"
            placeholder="Enter your username"
            onChange={handleChange}
            className="bg-[#140A1F] border border-purple-900/30 rounded-lg px-4 py-2
            text-gray-200 placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-purple-600
            transition"
          />
        </div>

        {/* Bio */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-400">Bio</label>
          <textarea
            name="bio"
            rows="3"
            placeholder="Write something about yourself..."
            onChange={handleChange}
            className="bg-[#140A1F] border border-purple-900/30 rounded-lg px-4 py-2
            text-gray-200 placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-purple-600
            transition"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-400">Profile Photo</label>

          <input
            type="file"
            name="profilePhoto"
            accept="image/*"
            onChange={handleChange}
            className="bg-[#140A1F] border border-purple-900/30 rounded-lg px-4 py-2
    text-gray-200
    focus:outline-none focus:ring-2 focus:ring-purple-600
    transition"
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            className="bg-purple-600 hover:bg-purple-700
            text-white text-sm font-medium
            px-5 py-2 rounded-lg
            transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileTab;
