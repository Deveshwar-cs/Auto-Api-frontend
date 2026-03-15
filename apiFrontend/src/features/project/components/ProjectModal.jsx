import {useState} from "react";
import useProjectStore from "../store/useProjectStore";

const ProjectModal = ({isOpen, onClose}) => {
  const createProject = useProjectStore((state) => state.createProject);

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

  if (!isOpen) return null; // 👈 Important: don't render if closed

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
      await createProject(form);
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
      onClose(); // 👈 Close modal after success
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
        {/* Modal Box */}
        <div className="relative w-full max-w-4xl bg-[#1B1330] border border-purple-900/30 rounded-2xl shadow-2xl p-10 max-h-[90vh] overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-gray-400 hover:text-white text-xl transition"
          >
            ✕
          </button>

          <h2 className="text-2xl font-semibold text-white mb-8 text-center">
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
              className="w-full px-5 py-4 rounded-xl bg-[#241A40] border border-purple-900/20 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition"
            />

            {/* Port & API Prefix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="number"
                name="port"
                placeholder="Port Number"
                value={form.port}
                onChange={handleChange}
                className="px-5 py-4 rounded-xl bg-[#241A40] border border-purple-900/20 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition"
              />

              <input
                type="text"
                name="apiPrefix"
                placeholder="API Prefix (/api)"
                value={form.apiPrefix}
                onChange={handleChange}
                className="px-5 py-4 rounded-xl bg-[#241A40] border border-purple-900/20 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition"
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
              className="w-full px-5 py-4 rounded-xl bg-[#241A40] border border-purple-900/20 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition"
            />

            {/* JWT Secret */}
            <input
              type="text"
              name="jwtSecret"
              placeholder="JWT Secret"
              value={form.jwtSecret}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 rounded-xl bg-[#241A40] border border-purple-900/20 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition"
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
                  className="flex items-center justify-between bg-[#241A40] border border-purple-900/20 rounded-xl px-5 py-4 cursor-pointer hover:border-purple-500 transition"
                >
                  <span className="text-gray-300 text-sm">{item.label}</span>
                  <input
                    type="checkbox"
                    name={item.name}
                    checked={form[item.name]}
                    onChange={handleChange}
                    className="w-5 h-5 accent-purple-600"
                  />
                </label>
              ))}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-700 transition text-white font-medium disabled:opacity-50"
            >
              {loading ? "Generating Backend..." : "Create Backend Project"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProjectModal;
