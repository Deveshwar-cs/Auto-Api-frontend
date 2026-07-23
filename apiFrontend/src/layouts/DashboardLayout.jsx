import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const getStoredTheme = () => {
  if (typeof window === "undefined") return "dark";

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light" || savedTheme === "dark") return savedTheme;

  const rootTheme = document.documentElement.getAttribute("data-theme");
  if (rootTheme === "light" || rootTheme === "dark") return rootTheme;

  return "dark";
};

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-[#0D0716] text-white">
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
