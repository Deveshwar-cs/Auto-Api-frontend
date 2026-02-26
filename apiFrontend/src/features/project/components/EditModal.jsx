import React, {useState} from "react";

const EditModal = ({project, onCancel, onSave}) => {
  const [form, setForm] = useState({
    projectName: project.projectName,
    port: project.port,
    mongoUri: project.mongoUri,
    jwtSecret: project.jwtSecret,
    apiPrefix: project.apiPrefix,
    enableAuth: project.enableAuth,
    enableCors: project.enableCors,
    enableLogger: project.enableLogger,
  });
  const handleChange = (e) => {
    const {name, value, type, checked} = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  console.log(form);
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-semibold mb-8 text-center">
          Edit Project
        </h3>

        {/* Inputs */}
        <div className="space-y-5">
          <input
            type="text"
            name="projectName"
            value={form.projectName}
            onChange={handleChange}
            placeholder="Project Name"
            className="w-full border border-gray-300 focus:border-black focus:ring-1 focus:ring-black rounded-xl p-3 outline-none"
          />

          <div className="grid md:grid-cols-2 gap-5">
            <input
              type="number"
              name="port"
              value={form.port}
              onChange={handleChange}
              placeholder="Port"
              className="w-full border border-gray-300 focus:border-black focus:ring-1 focus:ring-black rounded-xl p-3 outline-none"
            />

            <input
              type="text"
              name="apiPrefix"
              value={form.apiPrefix}
              onChange={handleChange}
              placeholder="API Prefix"
              className="w-full border border-gray-300 focus:border-black focus:ring-1 focus:ring-black rounded-xl p-3 outline-none"
            />
          </div>

          <input
            type="text"
            name="mongoUri"
            value={form.mongoUri}
            onChange={handleChange}
            placeholder="Mongo URI"
            className="w-full border border-gray-300 focus:border-black focus:ring-1 focus:ring-black rounded-xl p-3 outline-none"
          />

          <input
            type="text"
            name="jwtSecret"
            value={form.jwtSecret}
            onChange={handleChange}
            placeholder="JWT Secret"
            className="w-full border border-gray-300 focus:border-black focus:ring-1 focus:ring-black rounded-xl p-3 outline-none"
          />
        </div>

        {/* Toggles */}
        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          {[
            {name: "enableAuth", label: "Enable Authentication"},
            {name: "enableCors", label: "Enable CORS"},
            {name: "enableLogger", label: "Enable Logger"},
          ].map((item) => (
            <label
              key={item.name}
              className="flex items-center justify-between border border-gray-200 rounded-2xl px-5 py-4 bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
            >
              <span className="text-gray-700 font-medium">{item.label}</span>
              <input
                type="checkbox"
                name={item.name}
                checked={form[item.name]}
                onChange={handleChange}
                className="w-5 h-5 accent-black"
              />
            </label>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-10">
          <button
            onClick={onCancel}
            className="px-5 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={() => onSave(form)}
            className="px-6 py-2.5 bg-black text-white rounded-xl hover:opacity-90 transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
