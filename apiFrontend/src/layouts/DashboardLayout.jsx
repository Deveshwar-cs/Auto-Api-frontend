import {Outlet} from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-[#0D0716] text-slate-900 dark:text-white">
      <Sidebar />

      <div className="flex flex-col flex-1 min-h-0">
        <Topbar />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
