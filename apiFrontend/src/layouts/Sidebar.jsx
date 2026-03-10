import {NavLink} from "react-router-dom";
import {LayoutDashboard, Folder, Settings, Database} from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-[#0B0513] border-r border-purple-900/20 flex flex-col">
      {/* Logo Section */}
      <div className="h-16 flex items-center px-6 border-b border-purple-900/20">
        <h1 className="text-xl font-bold tracking-wider text-purple-400">
          AUTO API
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        <NavItem
          to="/dashboard"
          icon={<LayoutDashboard size={18} />}
          label="Overview"
        />

        <NavItem
          to="/dashboard/projects"
          icon={<Folder size={18} />}
          label="Projects"
        />

        <NavItem
          to="/dashboard/collections"
          icon={<Database size={18} />}
          label="Collections"
        />

        <NavItem
          to="/dashboard/settings"
          icon={<Settings size={18} />}
          label="Settings"
        />
      </nav>

      {/* Footer */}
      <div className="p-4 text-xs text-gray-500 border-t border-purple-900/20">
        v1.0.0
      </div>
    </aside>
  );
};

const NavItem = ({to, icon, label}) => {
  return (
    <NavLink
      to={to}
      className={({isActive}) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg transition-all
         ${
           isActive
             ? "bg-purple-600/20 text-purple-400"
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
