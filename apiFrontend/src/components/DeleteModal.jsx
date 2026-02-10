import React from "react";

const DeleteModal = ({project, onCancel, onConfirm}) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-96">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Delete Project
        </h3>

        <p className="text-gray-600 mb-6">
          Are you sure you want to delete{" "}
          <span className="font-bold">{project.projectName}</span>? This action
          cannot be undone.
        </p>

        <div className="flex justify-end gap-4">
          <button onClick={onCancel} className="px-4 py-2 rounded-lg border">
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-500 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
