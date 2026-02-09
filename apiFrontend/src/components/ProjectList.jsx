import React, {useState} from "react";
import {Link} from "react-router-dom";
import api from "../api/axios.js";

const ProjectList = ({projects = []}) => {
  const [projectToDelete, setProjectToDelete] = useState(null);
  if (!projects.length)
    return (
      <p className="text-center text-gray-500 mt-10 text-lg">
        No projects found.
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto mt-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Your Projects</h2>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <li className="bg-white border border-gray-200 rounded-3xl p-8 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
            <Link key={project._id} to={`/project/${project._id}`}>
              <h3 className="text-xl font-semibold text-gray-800">
                {project.projectName}
              </h3>
              <p className="text-gray-500 mt-3 text-sm">
                Open and manage this backend →
              </p>
            </Link>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setProjectToDelete(project);
              }}
              className="hover:cursor-pointer absolute top-4 right-4 text-red-500 hover:text-red-700 font-bold"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {projectToDelete && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-96">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Delete Project
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-bold">{projectToDelete.projectName}</span>?
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setProjectToDelete(null)}
                className="px-4 py-2 rounded-lg border hover:cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  await api.delete(`/projects/${projectToDelete._id}`);
                  setProjectToDelete(null);
                  window.location.reload(); // quick refresh (later we improve)
                }}
                className="px-4 py-2 rounded-lg hover:cursor-pointer bg-red-500 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
