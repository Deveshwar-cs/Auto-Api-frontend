import React, {useState} from "react";
import FieldRow from "./FieldRow.jsx";
import {useProject} from "../../../shared/store/useProject.js";
import {useParams} from "react-router-dom";

const emptyField = {
  name: "",
  type: "String",
  required: false,
  enum: "",
  ref: "",
  itemsType: "String",
};

const CollectionForm = ({onSuccess, collection}) => {
  const {projectId} = useParams();
  const {addCollection, updateCollection, fetchCollections} = useProject();

  // ✅ Initialize state directly from props (NO useEffect)
  const [collectionName, setCollectionName] = useState(
    collection?.collectionName || "",
  );

  const [isProtected, setIsProtected] = useState(collection?.protect || false);

  const [fields, setFields] = useState(() => {
    if (collection?.fields?.length) {
      return collection.fields.map((f) => ({
        ...f,
        enum: Array.isArray(f.enum) ? f.enum.join(", ") : "",
      }));
    }
    return [{...emptyField}];
  });

  const [loading, setLoading] = useState(false);

  // ✅ Convert enum string → array
  const parseEnum = (value) => {
    const arr = value
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);

    return arr.length ? arr : undefined;
  };

  // ✅ Field change
  const handleChange = (i, key, value) => {
    setFields((prev) =>
      prev.map((field, index) =>
        index === i ? {...field, [key]: value} : field,
      ),
    );
  };

  // ✅ Add field
  const handleAdd = () => {
    setFields([...fields, {...emptyField}]);
  };

  // ✅ Remove field
  const handleRemove = (i) => {
    setFields(fields.filter((_, index) => index !== i));
  };

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payloadFields = fields.map((f) => ({
      name: f.name,
      type: f.type,
      required: f.required,
      itemsType: f.itemsType,
      enum: parseEnum(f.enum),
      ref: f.ref,
    }));

    try {
      if (collection) {
        // 🔥 UPDATE
        await updateCollection(projectId, collection._id, {
          collectionName,
          protect: isProtected,
          fields: payloadFields,
        });
      } else {
        // 🔥 CREATE
        await addCollection(
          projectId,
          collectionName,
          payloadFields,
          isProtected,
        );
      }

      await fetchCollections(projectId);

      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Collection Name */}
      <div>
        <label className="text-sm text-gray-300">Collection Name</label>

        <input
          type="text"
          value={collectionName}
          onChange={(e) => setCollectionName(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-[#241A40]
          border border-purple-800/30 text-white"
        />
      </div>

      {/* 🔐 Protected Toggle */}
      <div className="bg-[#241A40] border border-purple-900/30 rounded-2xl p-5">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={isProtected}
            onChange={(e) => setIsProtected(e.target.checked)}
            className="mt-1 h-5 w-5 rounded-md bg-[#1B1330] border-purple-700
                       text-purple-600 focus:ring-purple-600"
          />

          <div>
            <p className="text-sm font-semibold text-white">
              Protected Routes 🔐
            </p>

            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
              If enabled, all routes will require authentication.
            </p>
          </div>
        </label>
      </div>

      {/* Fields */}
      <div className="space-y-6">
        {fields.map((field, i) => (
          <FieldRow
            key={i}
            field={field}
            index={i}
            onChange={handleChange}
            onRemove={handleRemove}
            canRemove={fields.length > 1}
          />
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={handleAdd}
          className="px-5 py-3 border border-purple-700
          text-purple-400 rounded-xl"
        >
          + Add Field
        </button>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-purple-600
          text-white rounded-xl"
        >
          {loading
            ? collection
              ? "Updating..."
              : "Creating..."
            : collection
              ? "Update Collection"
              : "Create Collection"}
        </button>
      </div>
    </form>
  );
};

export default CollectionForm;
