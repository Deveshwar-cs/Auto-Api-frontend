import React from "react";
import {Trash2} from "lucide-react";

const fieldTypes = ["String", "Number", "Boolean", "Date", "ObjectId", "Array"];

const FieldRow = ({field, index, onChange, onRemove, canRemove}) => {
  return (
    <div
      className="relative bg-[#241A40] border border-purple-900/20 rounded-2xl p-6 pr-14
                 grid grid-cols-1 md:grid-cols-12 gap-5
                 transition hover:border-purple-700/40"
    >
      {/* Remove Button */}
      {canRemove && (
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center
                     rounded-full bg-red-500/10 text-red-400
                     hover:bg-red-500/20 hover:text-red-500
                     transition"
        >
          <Trash2 size={18} />
        </button>
      )}

      {/* Field Name */}
      <div className="md:col-span-3 space-y-1">
        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
          Field Name
        </label>
        <input
          type="text"
          placeholder="e.g. username"
          value={field.name}
          onChange={(e) => onChange(index, "name", e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl bg-[#1B1330] border border-purple-800/30
                     text-white placeholder-gray-500
                     focus:ring-2 focus:ring-purple-600 focus:border-purple-600
                     outline-none transition"
        />
      </div>

      {/* Type */}
      <div className="md:col-span-2 space-y-1">
        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
          Type
        </label>
        <select
          value={field.type}
          onChange={(e) => onChange(index, "type", e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl bg-[#1B1330] border border-purple-800/30
                     text-white
                     focus:ring-2 focus:ring-purple-600 focus:border-purple-600
                     outline-none transition"
        >
          {fieldTypes.map((type) => (
            <option key={type} className="bg-[#1B1330]">
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Required */}
      <div className="md:col-span-2 flex items-center gap-3 pt-6">
        <input
          type="checkbox"
          checked={field.required}
          onChange={(e) => onChange(index, "required", e.target.checked)}
          className="h-5 w-5 rounded-md bg-[#1B1330] border-purple-700
                     text-purple-600 focus:ring-purple-600 transition"
        />
        <span className="text-sm font-medium text-gray-300">Required</span>
      </div>

      {/* Items Type */}
      {field.type === "Array" && (
        <div className="md:col-span-2 space-y-1">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
            Items Type
          </label>
          <select
            value={field.itemsType}
            onChange={(e) => onChange(index, "itemsType", e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-[#1B1330] border border-purple-800/30
                       text-white
                       focus:ring-2 focus:ring-purple-600 focus:border-purple-600
                       outline-none transition"
          >
            {fieldTypes.map((type) => (
              <option key={type} className="bg-[#1B1330]">
                {type}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Enum */}
      {(field.type === "String" || field.type === "Array") && (
        <div className="md:col-span-3 space-y-1">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
            Enum Values
          </label>
          <input
            type="text"
            placeholder="e.g. admin,user"
            value={field.enum}
            onChange={(e) => onChange(index, "enum", e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-[#1B1330] border border-purple-800/30
                       text-white placeholder-gray-500
                       focus:ring-2 focus:ring-purple-600 focus:border-purple-600
                       outline-none transition"
          />
        </div>
      )}

      {/* Reference */}
      {field.type === "ObjectId" && (
        <div className="md:col-span-3 space-y-1">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
            Reference Model
          </label>
          <input
            type="text"
            placeholder="e.g. User"
            value={field.ref}
            onChange={(e) => onChange(index, "ref", e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-[#1B1330] border border-purple-800/30
                       text-white placeholder-gray-500
                       focus:ring-2 focus:ring-purple-600 focus:border-purple-600
                       outline-none transition"
          />
        </div>
      )}
    </div>
  );
};

export default FieldRow;
