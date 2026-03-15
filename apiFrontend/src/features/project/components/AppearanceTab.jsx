import api from "../../../services/api";

const AppearanceTab = () => {
  const changeTheme = async (theme) => {
    await api.put("/settings/theme", {theme});

    localStorage.setItem("theme", theme);

    // apply immediately
    document.documentElement.setAttribute("data-theme", theme);
  };

  return (
    <div className="max-w-xl">
      <div className="bg-[#0B0513] border border-purple-900/30 rounded-xl p-6 space-y-6">
        <h2 className="text-lg font-semibold text-purple-400">Appearance</h2>

        <p className="text-sm text-gray-400">
          Customize how AUTO API looks on your device.
        </p>

        {/* Theme Options */}
        <div className="grid grid-cols-3 gap-4">
          {/* Dark */}
          <button
            onClick={() => changeTheme("dark")}
            className="bg-[#140A1F] border border-purple-900/30 rounded-lg p-4
            hover:border-purple-600 transition flex flex-col items-center gap-2"
          >
            <div className="w-10 h-6 rounded bg-black border border-gray-700"></div>
            <span className="text-sm text-gray-300">Dark</span>
          </button>

          {/* Light */}
          <button
            onClick={() => changeTheme("light")}
            className="bg-[#140A1F] border border-purple-900/30 rounded-lg p-4
            hover:border-purple-600 transition flex flex-col items-center gap-2"
          >
            <div className="w-10 h-6 rounded bg-gray-200 border"></div>
            <span className="text-sm text-gray-300">Light</span>
          </button>

          {/* System */}
          <button
            onClick={() => changeTheme("system")}
            className="bg-[#140A1F] border border-purple-900/30 rounded-lg p-4
            hover:border-purple-600 transition flex flex-col items-center gap-2"
          >
            <div className="w-10 h-6 rounded bg-linear-to-r from-black to-gray-200 border"></div>
            <span className="text-sm text-gray-300">System</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppearanceTab;
