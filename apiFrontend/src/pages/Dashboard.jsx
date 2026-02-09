import React, {useEffect, useState} from "react";
import ProjectForm from "../components/ProjectForm.jsx";
import ProjectList from "../components/ProjectList.jsx";
import api from "../api/axios.js";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const res = await api.get("/projects");
        setProjects(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleProjectCreated = (newProject) => {
    setProjects((prev) => [newProject, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-14 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-900 mb-14 text-center">
          Backend Project Generator
        </h1>

        {/* Project Form Card */}
        <div className="bg-white border border-gray-200 rounded-3xl shadow-xl p-10 mb-16">
          <ProjectForm onProjectCreated={handleProjectCreated} />
        </div>

        {/* Project List */}
        <div className="bg-white border border-gray-200 rounded-3xl shadow-xl p-10">
          {loading ? (
            <p className="text-gray-500">Loading projects...</p>
          ) : (
            <ProjectList projects={projects} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
