import React from "react";

const fieldTypes = ["String", "Number", "Boolean", "Date", "ObjectId"];

const FieldRow = ({field, index, onChange, onRemove, canRemove}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-end shadow-sm">
      {/* Field Name */}
      <div className="md:col-span-3">
        <label className="block text-xs font-medium text-gray-500 mb-1">
          Field Name
        </label>
        <input
          type="text"
          placeholder="e.g. username"
          value={field.name}
          onChange={(e) => onChange(index, "name", e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
      </div>

      {/* Type */}
      <div className="md:col-span-2">
        <label className="block text-xs font-medium text-gray-500 mb-1">
          Type
        </label>
        <select
          value={field.type}
          onChange={(e) => onChange(index, "type", e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        >
          {fieldTypes.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Required */}
      <div className="md:col-span-2 flex items-center gap-2 pt-6">
        <input
          type="checkbox"
          checked={field.required}
          onChange={(e) => onChange(index, "required", e.target.checked)}
          className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
        />
        <span className="text-sm text-gray-700">Required</span>
      </div>

      {/* Enum (String) */}
      {field.type === "String" && (
        <div className="md:col-span-3">
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Enum Values
          </label>
          <input
            type="text"
            placeholder="e.g. admin,user"
            value={field.enum}
            onChange={(e) => onChange(index, "enum", e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>
      )}

      {/* Ref (ObjectId) */}
      {field.type === "ObjectId" && (
        <div className="md:col-span-3">
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Reference Model
          </label>
          <input
            type="text"
            placeholder="e.g. User"
            value={field.ref}
            onChange={(e) => onChange(index, "ref", e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>
      )}

      {/* Remove */}
      {canRemove && (
        <div className="md:col-span-1 flex justify-end pt-6">
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="text-red-500 hover:text-red-700 font-bold text-lg"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default FieldRow;
