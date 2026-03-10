import React from "react";
import {X} from "lucide-react";
import CollectionForm from "./CollectionForm";

const CollectionModal = ({onClose}) => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      {/* Modal Container */}
      <div className="w-306 max-h-[90vh] bg-[#1B1330] border border-purple-900/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#241A40] border-b border-purple-900/20">
          <h2 className="text-lg font-semibold text-white">
            Create New Collection
          </h2>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-purple-700/30 transition"
          >
            <X size={18} className="text-gray-300" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#1B1330]">
          <CollectionForm onSuccess={onClose} />
        </div>
      </div>
    </div>
  );
};

export default CollectionModal;
