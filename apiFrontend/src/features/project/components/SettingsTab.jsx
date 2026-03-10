import React, {useState} from "react";
import {useOutletContext} from "react-router-dom";

const SettingsTab = () => {
  const {project, updateProject, projectId, deleteProject} = useOutletContext();

  const [form, setForm] = useState({
    projectName: project?.projectName || "",
    port: project?.port || "",
    mongoUri: project?.mongoUri || "",
    jwtSecret: project?.jwtSecret || "",
    apiPrefix: project?.apiPrefix || "",
    enableAuth: project?.enableAuth || false,
    enableCors: project?.enableCors || false,
    enableLogger: project?.enableLogger || false,
  });

  const [showConfirm, setShowConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const {name, value, type, checked} = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await updateProject(projectId, form);
      setSuccess(true);
      setShowConfirm(false);

      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteProject(projectId);
      setShowDeleteConfirm(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 text-white">
      <h2 className="text-xl font-semibold">Project Settings</h2>

      {success && (
        <div className="bg-green-500/20 border border-green-500 p-3 rounded">
          Settings updated successfully ✅
        </div>
      )}

      {/* SETTINGS CARD */}
      <div className="bg-[#1B1330] border border-purple-900/20 p-6 rounded-lg space-y-5">
        <div>
          <label className="text-sm text-gray-400">Project Name</label>
          <input
            type="text"
            name="projectName"
            value={form.projectName}
            onChange={handleChange}
            className="w-full mt-1 bg-[#241A40] border border-purple-800/30 rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-400">Port</label>
            <input
              type="number"
              name="port"
              value={form.port}
              onChange={handleChange}
              className="w-full mt-1 bg-[#241A40] border border-purple-800/30 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">API Prefix</label>
            <input
              type="text"
              name="apiPrefix"
              value={form.apiPrefix}
              onChange={handleChange}
              className="w-full mt-1 bg-[#241A40] border border-purple-800/30 rounded-lg px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-400">Mongo URI</label>
          <input
            type="text"
            name="mongoUri"
            value={form.mongoUri}
            onChange={handleChange}
            className="w-full mt-1 bg-[#241A40] border border-purple-800/30 rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="text-sm text-gray-400">JWT Secret</label>
          <input
            type="text"
            name="jwtSecret"
            value={form.jwtSecret}
            onChange={handleChange}
            className="w-full mt-1 bg-[#241A40] border border-purple-800/30 rounded-lg px-3 py-2 text-sm"
          />
        </div>

        {/* TOGGLES */}
        <div className="grid sm:grid-cols-2 gap-4 pt-3">
          {[
            {name: "enableAuth", label: "Enable Authentication"},
            {name: "enableCors", label: "Enable CORS"},
            {name: "enableLogger", label: "Enable Logger"},
          ].map((item) => (
            <label
              key={item.name}
              className="flex items-center justify-between border border-purple-800/30 rounded-xl px-4 py-3 bg-[#241A40]"
            >
              <span className="text-sm">{item.label}</span>

              <input
                type="checkbox"
                name={item.name}
                checked={form[item.name]}
                onChange={handleChange}
                className="w-4 h-4 accent-purple-500"
              />
            </label>
          ))}
        </div>

        <button
          onClick={() => setShowConfirm(true)}
          className="bg-purple-600 hover:cursor-pointer hover:bg-purple-700 px-4 py-2 rounded-lg text-sm"
        >
          Save Changes
        </button>
      </div>

      {/* DANGER ZONE */}
      <div className="bg-red-900/20 border border-red-700 p-6 rounded-lg">
        <p className="text-red-400 font-medium mb-3">Danger Zone</p>

        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="bg-red-600 hover:cursor-pointer hover:bg-red-700 px-4 py-2 rounded-lg text-sm"
        >
          Delete Project
        </button>
      </div>

      {/* SAVE CONFIRM MODAL */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-[#1B1330] p-6 rounded-lg w-87.5 space-y-4 border border-purple-800/30">
            <h3 className="text-lg font-semibold">Confirm Changes</h3>

            <p className="text-sm text-gray-400">
              Are you sure you want to update the project settings?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-700 hover:cursor-pointer rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-4 py-2 hover:cursor-pointer bg-purple-600 rounded"
                disabled={loading}
              >
                {loading ? "Saving..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM MODAL */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-[#1B1330] p-6 rounded-lg w-87.5 space-y-4 border border-red-800/30">
            <h3 className="text-lg font-semibold text-red-400">
              Delete Project
            </h3>

            <p className="text-sm text-gray-400">
              This action cannot be undone. Are you sure you want to delete this
              project?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-700 hover:cursor-pointer rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 hover:cursor-pointer rounded"
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsTab;
