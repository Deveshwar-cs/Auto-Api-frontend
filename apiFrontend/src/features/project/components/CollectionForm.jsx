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

  const [collectionName, setCollectionName] = useState(
    collection?.collectionName || "",
  );

  const [fields, setFields] = useState(
    collection?.fields?.length
      ? collection.fields.map((f) => ({
          ...f,
          enum: Array.isArray(f.enum) ? f.enum.join(", ") : "",
        }))
      : [{...emptyField}],
  );

  const [loading, setLoading] = useState(false);

  const parseEnum = (value) => {
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

  const handleAdd = () => {
    setFields([...fields, {...emptyField}]);
  };

  const handleRemove = (i) => {
    setFields(fields.filter((_, index) => index !== i));
  };

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
        // UPDATE COLLECTION
        await updateCollection(projectId, collection._id, {
          collectionName,
          fields: payloadFields,
        });
      } else {
        // CREATE COLLECTION
        await addCollection(projectId, collectionName, payloadFields);
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
