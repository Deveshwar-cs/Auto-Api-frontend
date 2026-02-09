import React, {useEffect} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import {setNavigate} from "./utils/navigation";
import Dashboard from "./pages/Dashboard";
import Project from "./pages/Project";

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
      <Route path="/project/:projectId" element={<Project />} />
    </Routes>
  );
};

export default App;
