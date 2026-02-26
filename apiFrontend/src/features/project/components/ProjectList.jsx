import React, {useState} from "react";
import ProjectCard from "./ProjectCard";
import EditModal from "./EditModal";
import useProjectStore from "../store/useProjectStore";
import useDelete from "../../../shared/store/useDelete";

const ProjectList = () => {
  const {projects, deleteProject, updateProject} = useProjectStore();
  const {openDelete} = useDelete();

  const [projectToEdit, setProjectToEdit] = useState(null);

  if (!projects.length) {
    return (
      <p className="text-center text-gray-500 mt-10 text-lg">
        No projects found.
      </p>
    );
  }

  const handleEdit = async (allData) => {
    await updateProject(projectToEdit._id, allData);
    setProjectToEdit(null);
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
            onDelete={() =>
              openDelete({
                title: "Delete Project",
                message: `Delete "${project.projectName}"?`,
                onConfirm: () => deleteProject(project._id),
              })
            }
          />
        ))}
      </ul>

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
