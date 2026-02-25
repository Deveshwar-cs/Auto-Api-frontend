import React from "react";
import {useState} from "react";
import CollectionEditModal from "./CollectionEditModal";
import {useProject} from "../context/useProject";
import useDelete from "../context/useDelete";

const CollectionCard = ({col, setCollections}) => {
  const [isOpen, setOpen] = useState(false);
  const {deleteCollection} = useProject();
  const {openDelete} = useDelete();
  const handleDeleteClick = (collection) => {
    openDelete({
      title: "Delete Collection",
      message: `Are you sure you want to delete ${collection.collectionName}?`,
      onConfirm: () => deleteCollection(collection._id),
    });
  };
  return (
    <div>
      <div
        key={col._id}
        className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6"
      >
        {/* Collection Name */}
        <h3 className="text-xl text-center font-semibold text-indigo-600 mb-4">
          {col.collectionName}
        </h3>

        {/* Fields Table */}
        <div className="overflow-hidden rounded-lg border border-gray-100">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 text-left">
              <tr>
                <th className="px-4 py-2 font-medium">Field</th>
                <th className="px-4 py-2 font-medium">Type</th>
                <th className="px-4 py-2 font-medium">Required</th>
              </tr>
            </thead>
            <tbody>
              {col.fields.map((f, i) => (
                <tr
                  key={i}
                  className="border-t border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-4 py-2 font-medium text-gray-700">
                    {f.name}
                  </td>
                  <td className="px-4 py-2 text-gray-600">{f.type}</td>
                  <td className="px-4 py-2">
                    {f.required ? (
                      <span className="text-green-600 font-medium">Yes</span>
                    ) : (
                      <span className="text-gray-400">No</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex gap-3 justify-around mt-6">
          <button
            onClick={() => {
              setOpen(true);
            }}
            className="text-[oklch(1_0_0)] font-semibold hover:text-[oklch(0.13_0_0)] hover:cursor-pointer py-2 px-7 bg-[#583dfc] rounded"
          >
            Edit
          </button>

          <button
            onClick={() => handleDeleteClick(col)}
            className="text-[oklch(1_0_0)] font-semibold hover:text-[oklch(0.13_0_0)] hover:cursor-pointer py-2 px-7 bg-[#b12a2a] rounded"
          >
            Delete
          </button>
        </div>
        <CollectionEditModal
          key={col._id}
          isOpen={isOpen}
          onClose={() => setOpen(false)}
          collection={col}
          setCollections={setCollections}
        />
      </div>
    </div>
  );
};

export default CollectionCard;
