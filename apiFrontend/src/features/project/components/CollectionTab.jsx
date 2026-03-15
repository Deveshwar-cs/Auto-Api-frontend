import {useState, useMemo, useEffect} from "react";
import {Plus, Trash2, Database, FileCode, Pencil} from "lucide-react";
import useDelete from "../../../shared/store/useDelete";
import {useProject} from "../../../shared/store/useProject";
import CollectionModal from "./CollectionModal";
import {useParams} from "react-router-dom";
import ConfirmModal from "./ConfirmModal";

const CollectionsTab = () => {
  const {projectId} = useParams();

  const collections = useProject((state) => state.collections);
  const generateAllFiles = useProject((state) => state.generateAllFiles);

  const deleteCollection = useProject((state) => state.deleteCollection);
  const generateFiles = useProject((state) => state.generateFiles);
  const fetchCollections = useProject((state) => state.fetchCollections);
  const [showGenerateConfirm, setShowGenerateConfirm] = useState(false);

  const {openDelete} = useDelete();

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingCollection, setEditingCollection] = useState(null);

  useEffect(() => {
    if (projectId) {
      fetchCollections(projectId);
    }
  }, [projectId, fetchCollections]);

  const filteredCollections = useMemo(() => {
    if (!Array.isArray(collections)) return [];

    return collections.filter((col) =>
      col.collectionName?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [collections, search]);

  const getGenerationStatus = (collection) => {
    if (!collection.lastGeneratedAt) {
      return {
        label: "Not Generated",
        color: "bg-red-500/10 text-red-400",
      };
    }

    const updated = new Date(collection.updatedAt).getTime();
    const generated = new Date(collection.lastGeneratedAt).getTime();

    if (updated - generated > 1000) {
      return {
        label: "Outdated",
        color: "bg-yellow-500/10 text-yellow-400",
      };
    }

    return {
      label: "Up to Date",
      color: "bg-green-500/10 text-green-400",
    };
  };

  const handleDelete = (collection) => {
    openDelete({
      title: "Delete Collection?",
      message: `Delete "${collection.collectionName}" collection and all generated files?`,
      onConfirm: () => deleteCollection(projectId, collection._id),
    });
  };

  const handleGenerateFile = (collection) => {
    generateFiles(projectId, collection._id);
  };

  return (
    <div className="space-y-6">
      {/* Top Controls */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Search collections..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-72 bg-[#241A40] border border-purple-800/30
          rounded-lg px-4 py-2 text-sm text-white
          outline-none focus:ring-2 focus:ring-purple-600"
        />

        <div className="flex gap-3">
          <button
            onClick={() => setShowGenerateConfirm(true)}
            className="flex items-center gap-2 bg-[#241A40]
            border border-purple-800/30
            hover:bg-purple-900/20
            px-4 py-2 rounded-lg text-sm text-purple-300 transition"
          >
            <FileCode size={16} />
            Generate All
          </button>
          {showGenerateConfirm && (
            <ConfirmModal
              title="Generate All Files?"
              message="Do you want to generate files for all collections in this project?"
              onCancel={() => setShowGenerateConfirm(false)}
              onConfirm={() => {
                generateAllFiles(projectId);
                setShowGenerateConfirm(false);
              }}
            />
          )}

          <button
            onClick={() => {
              setEditingCollection(null);
              setShowModal(true);
            }}
            className="flex items-center gap-2 bg-purple-600
            hover:bg-purple-700
            px-4 py-2 rounded-lg text-sm font-medium text-white transition"
          >
            <Plus size={16} />
            Create Collection
          </button>
        </div>
      </div>

      {/* Collections Grid */}
      {filteredCollections.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <Database size={40} className="mx-auto mb-4 text-purple-500/40" />
          <p>No collections found</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCollections.map((collection) => {
            const status = getGenerationStatus(collection);

            return (
              <div
                key={collection._id}
                className="bg-[#1B1330] border border-purple-900/20
                rounded-2xl p-5 hover:bg-[rgb(36,26,64)]
                transition group relative"
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-white font-semibold text-lg">
                      {collection.collectionName}
                    </h3>

                    <p className="text-xs text-gray-400">
                      {collection.fields?.length || 0} fields
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingCollection(collection);
                        setShowModal(true);
                      }}
                      className="p-2 rounded-lg bg-blue-500/10 text-blue-400
                      hover:bg-blue-500/20 opacity-0
                      group-hover:opacity-100 transition"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      onClick={() => handleDelete(collection)}
                      className="p-2 rounded-lg bg-red-500/10 text-red-400
                      hover:bg-red-500/20 opacity-0
                      group-hover:opacity-100 transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Fields Table */}
                <div className="overflow-hidden rounded-lg border border-purple-900/30 mb-4">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#241A40] text-gray-400">
                      <tr>
                        <th className="px-3 py-2">Field</th>
                        <th className="px-3 py-2">Type</th>
                        <th className="px-3 py-2">Req</th>
                      </tr>
                    </thead>

                    <tbody>
                      {collection.fields?.slice(0, 5).map((field) => (
                        <tr
                          key={field._id || field.name}
                          className="border-t border-purple-900/20"
                        >
                          <td className="px-3 py-2 text-white">{field.name}</td>

                          <td className="px-3 py-2 text-purple-300">
                            {field.type}
                          </td>

                          <td className="px-3 py-2">
                            {field.required ? (
                              <span className="text-red-400">Yes</span>
                            ) : (
                              <span className="text-gray-500">No</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {collection.fields?.length > 5 && (
                    <div className="text-xs text-center py-2 text-gray-400 border-t border-purple-900/20">
                      +{collection.fields.length - 5} more fields
                    </div>
                  )}
                </div>

                {/* Status */}
                <div className="mb-4">
                  <span
                    className={`text-xs px-2 py-1 rounded-md ${status.color}`}
                  >
                    {status.label}
                  </span>
                </div>

                {/* Generate Button */}
                <button
                  className="w-full bg-purple-600 hover:bg-purple-700
                  text-white text-sm py-2 rounded-lg transition"
                  onClick={() => handleGenerateFile(collection)}
                >
                  Generate Model + CRUD
                </button>
              </div>
            );
          })}
        </div>
      )}

      {showModal && (
        <CollectionModal
          collection={editingCollection}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default CollectionsTab;
