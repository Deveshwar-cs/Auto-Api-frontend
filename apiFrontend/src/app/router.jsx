import {Route, Routes, useNavigate} from "react-router-dom";
import {useEffect} from "react";

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

import CollectionPage from "../features/collections/pages/CollectionPage";
import SchemaPage from "../features/schema/pages/SchemaPage";

import ProjectProvider from "../shared/store/ProjectProvider";
import {setNavigate} from "../utils/navigation";

const AppRouter = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Dashboard Routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        {/* Overview Page */}
        <Route index element={<Overview />} />
        <Route path="Projects" element={<Projects />} />

        {/* Projects → Inside Project */}
        {/* <Route
          path="projects/:projectId"
          element={
            <ProjectProvider>
              <CollectionPage />
            </ProjectProvider>
          }
        /> */}
        <Route
          path="projects/:projectId"
          element={
            <ProjectProvider>
              <ProjectWorkspace />
            </ProjectProvider>
          }
        >
          <Route index element={<CollectionsTab />} />
          <Route path="files" element={<FilesTab />} />
          <Route path="docs" element={<DocsTab />} />
          <Route path="settings" element={<SettingsTab />} />
        </Route>
        {/* Schema Page */}
        <Route
          path="projects/:projectId/schema"
          element={
            <ProjectProvider>
              <SchemaPage />
            </ProjectProvider>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRouter;
