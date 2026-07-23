import {useState} from "react";
import api from "../../../services/api";

const SecurityTab = () => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.put("/settings/password", form);

    alert("Password updated");
  };

  const inputClass = `
    bg-slate-50
    dark:bg-[#140A1F]
    border
    border-slate-200
    dark:border-purple-900/30
    rounded-lg
    px-4
    py-2
    text-slate-900
    dark:text-gray-200
    placeholder-slate-400
    dark:placeholder-gray-500
    focus:outline-none
    focus:ring-2
    focus:ring-purple-600
    transition
  `;

  return (
    <div className="max-w-xl">
      <form
        onSubmit={handleSubmit}
        className="
          bg-white
          dark:bg-[#0B0513]
          border
          border-slate-200
          dark:border-purple-900/30
          rounded-xl
          p-6
          space-y-6
          shadow-sm
          dark:shadow-none
        "
      >
        <h2 className="text-lg font-semibold text-purple-600 dark:text-purple-400">
          Security Settings
        </h2>

        <p className="text-sm text-slate-600 dark:text-gray-400">
          Update your account password to keep your account secure.
        </p>

        {/* Current Password */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-slate-600 dark:text-gray-400">
            Current Password
          </label>

          <input
            type="password"
            name="currentPassword"
            value={form.currentPassword}
            placeholder="Enter current password"
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* New Password */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-slate-600 dark:text-gray-400">
            New Password
          </label>

          <input
            type="password"
            name="newPassword"
            value={form.newPassword}
            placeholder="Enter new password"
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="
              bg-purple-600
              hover:bg-purple-700
              text-white
              text-sm
              font-medium
              px-5
              py-2
              rounded-lg
              transition
            "
          >
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default SecurityTab;
