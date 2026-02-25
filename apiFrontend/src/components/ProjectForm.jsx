import React, {useState} from "react";
import useProjectStore from "../context/useProjectStore";

const ProjectForm = () => {
  const {createProject} = useProjectStore();
  const [form, setForm] = useState({
    projectName: "",
    port: 5000,
    mongoUri: "",
    jwtSecret: "",
    apiPrefix: "/api",
    enableAuth: true,
    enableCors: false,
    enableLogger: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const {name, value, type, checked} = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      createProject(form);

      setForm({
        projectName: "",
        port: 5000,
        mongoUri: "",
        jwtSecret: "",
        apiPrefix: "/api",
        enableAuth: true,
        enableCors: false,
        enableLogger: false,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-3xl shadow-xl p-10 mt-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Create New Backend Project
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Project Name */}
        <input
          type="text"
          name="projectName"
          placeholder="Project Name"
          value={form.projectName}
          onChange={handleChange}
          required
          className="w-full px-5 py-4 rounded-2xl border border-gray-300 focus:border-black focus:ring-2 focus:ring-black outline-none transition placeholder-gray-400"
        />

        {/* Port & API Prefix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="number"
            name="port"
            placeholder="Port Number"
            value={form.port}
            onChange={handleChange}
            className="px-5 py-4 rounded-2xl border border-gray-300 focus:border-black focus:ring-2 focus:ring-black outline-none transition"
          />

          <input
            type="text"
            name="apiPrefix"
            placeholder="API Prefix (/api)"
            value={form.apiPrefix}
            onChange={handleChange}
            className="px-5 py-4 rounded-2xl border border-gray-300 focus:border-black focus:ring-2 focus:ring-black outline-none transition"
          />
        </div>

        {/* Mongo URI */}
        <input
          type="text"
          name="mongoUri"
          placeholder="MongoDB URI"
          value={form.mongoUri}
          onChange={handleChange}
          required
          className="w-full px-5 py-4 rounded-2xl border border-gray-300 focus:border-black focus:ring-2 focus:ring-black outline-none transition"
        />

        {/* JWT Secret */}
        <input
          type="text"
          name="jwtSecret"
          placeholder="JWT Secret"
          value={form.jwtSecret}
          onChange={handleChange}
          required
          className="w-full px-5 py-4 rounded-2xl border border-gray-300 focus:border-black focus:ring-2 focus:ring-black outline-none transition"
        />

        {/* Toggles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {name: "enableAuth", label: "Enable Authentication"},
            {name: "enableCors", label: "Enable CORS"},
            {name: "enableLogger", label: "Enable Logger"},
          ].map((item) => (
            <label
              key={item.name}
              className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 cursor-pointer"
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

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-2xl bg-black text-white font-semibold text-lg hover:opacity-90 transition shadow-md disabled:opacity-50"
        >
          {loading ? "Generating Backend..." : "Create Backend Project"}
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
