import React, {useState} from "react";
import FieldRow from "./FieldRow.jsx";
import api from "../../../services/api.js";
import {useProject} from "../../../shared/store/useProject";

const emptyField = {
  name: "",
  type: "String",
  required: false,
  enum: "",
  ref: "",
  itemsType: "String",
  default: "",
};

const CollectionForm = () => {
  const {projectId, fetchCollections, fetchGeneratedFiles} = useProject();

  const [collectionName, setCollectionName] = useState("");
  const [fields, setFields] = useState([{...emptyField}]);
  const [loading, setLoading] = useState(false);

  const parseEnum = (value) => {
    if (typeof value !== "string") return undefined;

    const arr = value
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);

    return arr.length ? arr : undefined;
  };

  const handleChange = (i, key, value) => {
    setFields((prev) =>
      prev.map((field, index) =>
        index === i ? {...field, [key]: value} : field,
      ),
    );
  };

  const handleAdd = () => setFields([...fields, {...emptyField}]);
  const handleRemove = (i) =>
    setFields(fields.filter((_, index) => index !== i));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      collectionName,
      fields: fields.map((f) => ({
        name: f.name,
        type: f.type,
        required: f.required,
        itemsType: f.itemsType,
        enum: parseEnum(f.enum),
        ref: f.ref,
      })),
    };

    try {
      await api.post(`/collection/createCollection/${projectId}`, payload);

      // reset form
      setCollectionName("");
      setFields([{...emptyField}]);

      // 🔥 refresh global state
      await fetchCollections();
      await fetchGeneratedFiles();
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Collection Name
        </label>
        <input
          type="text"
          placeholder="e.g. Users, Products"
          value={collectionName}
          onChange={(e) => setCollectionName(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
      </div>

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
          {loading ? "Creating..." : "Create Collection"}
        </button>
      </div>
    </form>
  );
};

export default CollectionForm;
