import {NavLink} from "react-router-dom";
import {LayoutDashboard, Folder, Settings, X} from "lucide-react";
import useSettingStore from "../features/project/store/useSettingStore";

const Sidebar = ({isOpen, onClose}) => {
  const name = useSettingStore((state) => state.name);
  const profilePhoto = useSettingStore((state) => state.profilePhoto);

  const BASE_URL = "https://auto-api-backend.onrender.com";

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64 bg-[#0B0513] border-r border-purple-900/20
          flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-purple-900/20">
          <h1 className="text-xl font-bold tracking-wider text-purple-400">
            AUTO API
          </h1>
          <button
            onClick={onClose}
            className="lg:hidden text-gray-400 hover:text-white p-1"
          >
            <X size={18} />
          </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-purple-900/20">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-purple-600 flex items-center justify-center text-white font-semibold shrink-0">
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

          <div className="flex flex-col min-w-0">
            <span className="text-sm text-gray-200 font-medium truncate">{name}</span>
            <span className="text-xs text-gray-500">Developer</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          <NavItem
            to="/dashboard"
            icon={<LayoutDashboard size={18} />}
            label="Overview"
            onClick={onClose}
          />

          <NavItem
            to="/dashboard/projects"
            icon={<Folder size={18} />}
            label="Projects"
            onClick={onClose}
          />

          <NavItem
            to="/dashboard/settings"
            icon={<Settings size={18} />}
            label="Settings"
            onClick={onClose}
          />
        </nav>

        {/* Footer */}
        <div className="p-4 text-xs text-gray-500 border-t border-purple-900/20 flex justify-between">
          <span>v1.0.0</span>
          <span className="text-purple-400">AUTO API</span>
        </div>
      </aside>
    </>
  );
};

const NavItem = ({to, icon, label, onClick}) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({isActive}) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg transition-all
        ${
          isActive
            ? "bg-purple-600/20 text-purple-400 border border-purple-600/30"
            : "text-gray-400 hover:bg-purple-600/10 hover:text-white"
        }`
      }
    >
      {icon}
      <span className="text-sm">{label}</span>
    </NavLink>
  );
};

export default Sidebar;
