import React, {useState} from "react";
import ProjectCard from "./ProjectCard";
import DeleteModal from "./DeleteModal.jsx";
import EditModal from "./EditModal";
import api from "../api/axios.js";

const ProjectList = ({projects = [], setProjects}) => {
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [projectToEdit, setProjectToEdit] = useState(null);

  if (!projects.length) {
    return (
      <p className="text-center text-gray-500 mt-10 text-lg">
        No projects found.
      </p>
    );
  }

  // ✅ reusable update function
  const onProjectUpdated = (updated) => {
    setProjects((prev) =>
      prev.map((p) => (p._id === updated._id ? updated : p)),
    );
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/projects/${projectToDelete._id}`);
      setProjects((prev) => prev.filter((p) => p._id !== projectToDelete._id));
      setProjectToDelete(null);
    } catch {
      alert("Failed to delete project");
    }
  };

  const handleEdit = async (allData) => {
    try {
      const res = await api.put(
        `/projects/update/${projectToEdit._id}`,
        allData,
      );
      console.log(allData);
      onProjectUpdated(res.data.project);
      setProjectToEdit(null);
    } catch {
      alert("Failed to update project");
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Your Projects</h2>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard
            key={project._id}
            project={project}
            onEdit={() => setProjectToEdit(project)}
            onDelete={() => setProjectToDelete(project)}
          />
        ))}
      </ul>

      {projectToDelete && (
        <DeleteModal
          project={projectToDelete}
          onCancel={() => setProjectToDelete(null)}
          onConfirm={handleDelete}
        />
      )}

      {projectToEdit && (
        <EditModal
          project={projectToEdit}
          onCancel={() => setProjectToEdit(null)}
          onSave={handleEdit}
        />
      )}
    </div>
  );
};

export default ProjectList;
