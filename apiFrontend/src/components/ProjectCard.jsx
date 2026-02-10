import React from "react";
import {Link} from "react-router-dom";

const ProjectCard = ({project, onEdit, onDelete}) => {
  return (
    <li className="relative bg-white border border-gray-200 rounded-3xl p-8 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <h3 className="text-xl font-semibold text-gray-800">
        <Link to={`/project/${project._id}`}>{project.projectName}</Link>
      </h3>

      <p className="text-gray-500 mt-3 text-sm">
        Open and manage this backend →
      </p>

      <div className="absolute top-4 right-4 flex gap-3">
        <button
          onClick={onEdit}
          className="text-blue-600 font-semibold hover:text-blue-800"
        >
          Edit
        </button>

        <button
          onClick={onDelete}
          className="text-red-500 font-semibold hover:text-red-700"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default ProjectCard;
