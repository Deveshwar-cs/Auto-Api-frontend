import useDelete from "../store/useDelete";
import {AlertTriangle} from "lucide-react";

const DeleteModal = () => {
  const {deleteState, closeDelete} = useDelete();

  if (!deleteState) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      {/* Modal Card */}
      <div
        className="w-105 bg-[#1B1330] border border-purple-900/20 
                      rounded-2xl shadow-2xl p-6 animate-scaleIn"
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-red-500/10 text-red-400">
            <AlertTriangle size={20} />
          </div>

          <h2 className="text-lg font-semibold text-white">
            {deleteState.title}
          </h2>
        </div>

        {/* Message */}
        <p className="text-sm text-gray-400 leading-relaxed">
          {deleteState.message}
        </p>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={closeDelete}
            className="px-4 py-2 rounded-lg bg-[#241A40] 
                       border border-purple-800/30
                       text-gray-300 hover:bg-purple-900/20 
                       transition"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              deleteState.onConfirm();
              closeDelete();
            }}
            className="px-4 py-2 rounded-lg bg-red-600 
                       text-white hover:bg-red-700 
                       transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
