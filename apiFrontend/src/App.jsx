import React, {useEffect} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import {setNavigate} from "./utils/navigation";
import Dashboard from "./pages/Dashboard";
import Project from "./pages/Project";
import ProjectProvider from "./context/ProjectProvider";
import SchemaPage from "./pages/SchemaPage";
import LandingPage from "./pages/LandingPage";
const App = () => {
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
            <Project />
          </ProjectProvider>
        }
      />
    </Routes>
  );
};

export default App;
