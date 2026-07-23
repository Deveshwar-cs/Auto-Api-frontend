import {NavLink} from "react-router-dom";
import {LayoutDashboard, Folder, Settings, X} from "lucide-react";
import useSettingStore from "../features/project/store/useSettingStore";
import useTheme from "../hooks/useTheme";

const Sidebar = ({onClose}) => {
  const name = useSettingStore((state) => state.name);
  const profilePhoto = useSettingStore((state) => state.profilePhoto);

  const isDark = useTheme();

  return (
    <aside
      className={`w-64 border-r flex flex-col ${
        isDark
          ? "bg-[#0B0513] border-purple-900/20"
          : "bg-white border-slate-200"
      }`}
    >
      {/* Logo */}
      <div
        className={`h-16 flex items-center px-6 border-b ${
          isDark ? "border-purple-900/20" : "border-slate-200"
        }`}
      >
        <h1 className="text-xl font-bold tracking-wider text-purple-400">
          AUTO API
        </h1>
      </div>

      {/* User Profile */}
      <div
        className={`flex items-center gap-3 px-6 py-5 border-b ${
          isDark ? "border-purple-900/20" : "border-slate-200"
        }`}
      >
        <div className="w-10 h-10 rounded-full overflow-hidden bg-purple-600 flex items-center justify-center text-white font-semibold">
          {profilePhoto ? (
            <img
              src={`${profilePhoto}`}
              alt="profile"
              className="w-full h-full object-cover"
            />
          ) : (
            name?.charAt(0)
          )}
        </div>

        <div className="flex flex-col">
          <span
            className={`text-sm font-medium ${
              isDark ? "text-gray-200" : "text-slate-800"
            }`}
          >
            {name}
          </span>
          <span
            className={`text-xs ${isDark ? "text-gray-500" : "text-slate-500"}`}
          >
            Developer
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        <NavItem
          to="/dashboard"
          icon={<LayoutDashboard size={18} />}
          label="Overview"
          isDark={isDark}
          onClick={onClose}
        />

        <NavItem
          to="/dashboard/projects"
          icon={<Folder size={18} />}
          label="Projects"
          isDark={isDark}
          onClick={onClose}
        />

        <NavItem
          to="/dashboard/settings"
          icon={<Settings size={18} />}
          label="Settings"
          isDark={isDark}
          onClick={onClose}
        />
      </nav>

      {/* Footer */}
      <div
        className={`p-4 text-xs border-t flex justify-between ${
          isDark
            ? "text-gray-500 border-purple-900/20"
            : "text-slate-500 border-slate-200"
        }`}
      >
        <span>v1.0.0</span>
        <span className="text-purple-400">AUTO API</span>
      </div>
    </aside>
  );
};

const NavItem = ({to, icon, label, isDark, onClick}) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({isActive}) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
          isActive
            ? isDark
              ? "bg-purple-600/20 text-purple-400 border border-purple-600/30"
              : "bg-purple-100 text-purple-700 border border-purple-200"
            : isDark
              ? "text-gray-400 hover:bg-purple-600/10 hover:text-white"
              : "text-slate-600 hover:bg-purple-50 hover:text-slate-900"
        }`
      }
    >
      {icon}
      <span className="text-sm">{label}</span>
    </NavLink>
  );
};

export default Sidebar;
