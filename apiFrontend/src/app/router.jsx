import {
  Route,
  Routes,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";
import LandingPage from "../features/landing/pages/LandingPage";

import DashboardLayout from "../layouts/DashboardLayout";

import Overview from "../features/project/pages/Overview";
import Projects from "../features/project/pages/Projects";
import ProjectWorkspace from "../features/project/pages/ProjectWorkspace";
import FilesTab from "../features/project/components/FilesTab";
import CollectionsTab from "../features/project/components/CollectionTab";
import DocsTab from "../features/project/components/DocsTab";
import SettingsTab from "../features/project/components/SettingsTab";
import SettingsPage from "../features/project/pages/SettingsPage";

import Docs from "../features/docs/page/Docs";
import ApiTesterTab from "../features/project/components/Apitestertab";

const AppRouter = () => {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/docs",
      element: <Docs />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        {
          index: true,
          element: <Overview />,
        },
        {
          path: "Projects",
          element: <Projects />,
        },
        {
          path: "settings",
          element: <SettingsPage />,
        },
        {
          path: "projects/:projectId",
          element: <ProjectWorkspace />,
          children: [
            {
              index: true,
              element: <CollectionsTab />,
            },
            {
              path: "files",
              element: <FilesTab />,
            },
            {
              path: "docs",
              element: <DocsTab />,
            },
            {
              path: "apiTesting",
              element: <ApiTesterTab />,
            },
            {
              path: "settings",
              element: <SettingsTab />,
            },
          ],
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={route} />
    </>
  );
};

export default AppRouter;
