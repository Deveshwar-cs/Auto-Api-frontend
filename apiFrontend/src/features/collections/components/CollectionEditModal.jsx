import React, {useState, useEffect} from "react";
import FieldRow from "./FieldRow";
import api from "../../../services/api";

const emptyField = {
  name: "",
  type: "String",
  required: false,
  itemsType: "",
  enum: "",
  ref: "",
};

const CollectionEditModal = ({isOpen, onClose, collection, setCollections}) => {
  const [collectionName, setCollectionName] = useState(
    collection?.collectionName || "",
  );

  const [fields, setFields] = useState(() => {
    if (!collection?.fields) return [{...emptyField}];

    return collection.fields.map((f) => ({
      name: f.name || "",
      type: f.type || "String",
      required: !!f.required,
      itemsType: f.itemsType || "",
      enum: Array.isArray(f.enum) ? f.enum.join(",") : "",
      ref: f.ref || "",
    }));
  });
  const [loading, setLoading] = useState(false);
  const projectId = collection.projectId;

  /* -------------------- Lock background scroll -------------------- */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  /* -------------------- Handlers -------------------- */
  const handleChange = (index, key, value) => {
    setFields((prev) => {
      const updated = [...prev];
      updated[index] = {...updated[index], [key]: value};
      return updated;
    });
  };

  const handleAdd = () => setFields((prev) => [...prev, {...emptyField}]);

  const handleRemove = (index) =>
    setFields((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      collectionName,
      fields: fields.map((f) => ({
        name: f.name,
        type: f.type,
        required: f.required,
        itemsType: f.itemsType || undefined,
        enum: f.enum
          ? f.enum
              .split(",")
              .map((v) => v.trim())
              .filter(Boolean)
          : [],
        ref: f.ref || undefined,
      })),
    };

    try {
      const res = await api.put(
        `/collection/${projectId}/update/${collection._id}`,
        payload,
      );

      const updatedCollection = res.data;
      // Update parent state
      setCollections((prev) =>
        prev.map((col) =>
          col._id === collection._id ? updatedCollection.data : col,
        ),
      );

      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  /* -------------------- UI -------------------- */
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-6xl max-h-[90vh] rounded-xl shadow-lg flex flex-col">
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Edit Collection</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-lg hover:cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto flex-1">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Collection Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Collection Name
              </label>
              <input
                type="text"
                value={collectionName}
                onChange={(e) => setCollectionName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="e.g. Users, Products"
              />
            </div>

            {/* Fields */}
            <div className="space-y-6">
              {fields.map((field, index) => (
                <FieldRow
                  key={index}
                  field={field}
                  index={index}
                  onChange={handleChange}
                  onRemove={handleRemove}
                  canRemove={fields.length > 1}
                />
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-4">
              <button
                type="button"
                onClick={handleAdd}
                className="px-5 py-3 rounded-xl border border-indigo-200 text-indigo-600 font-medium hover:bg-indigo-50 transition"
              >
                + Add Field
              </button>

              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
              >
                {loading ? "Updating..." : "Update Collection"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CollectionEditModal;
