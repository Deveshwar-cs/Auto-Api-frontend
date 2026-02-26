import {Route, Routes, useNavigate} from "react-router-dom";
import {useEffect} from "react";

import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";
import Dashboard from "../features/project/pages/DashboardPage";
import CollectionPage from "../features/collections/pages/CollectionPage";
import SchemaPage from "../features/schema/pages/SchemaPage";
import LandingPage from "../features/landing/pages/LandingPage";

import ProjectProvider from "../shared/store/ProjectProvider";
import {setNavigate} from "../utils/navigation";

const AppRouter = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/landingPage" element={<LandingPage />} />

      <Route
        path="/schema"
        element={
          <ProjectProvider>
            <SchemaPage />
          </ProjectProvider>
        }
      />

      <Route
        path="/project/:projectId"
        element={
          <ProjectProvider>
            <CollectionPage />
          </ProjectProvider>
        }
      />
    </Routes>
  );
};

export default AppRouter;
