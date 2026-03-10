import {Search, Bell, User} from "lucide-react";

const Topbar = () => {
  return (
    <header className="h-16 bg-[#0D0716] border-b border-purple-900/20 flex items-center justify-between px-6">
      {/* Left Side */}
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold text-gray-200">Dashboard</h2>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-5">
        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute top-2.5 left-3 text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-[#151026] text-sm pl-9 pr-3 py-2 rounded-lg outline-none border border-purple-900/20 focus:border-purple-500"
          />
        </div>

        {/* Notifications */}
        <button className="relative text-gray-400 hover:text-white transition">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full"></span>
        </button>

        {/* User */}
        <div className="flex items-center gap-2 cursor-pointer hover:bg-purple-600/10 px-3 py-2 rounded-lg transition">
          <User size={18} />
          <span className="text-sm text-gray-300">Devesh</span>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
