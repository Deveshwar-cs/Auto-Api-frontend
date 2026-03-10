import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import {Outlet} from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-[#0D0716] text-white">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
