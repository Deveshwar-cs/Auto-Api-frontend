import React, {useEffect, useState} from "react";
import {downloadFile} from "../../../utils/downloadFile";
import CodeViewer from "./CodeViewer";
import ConfirmModal from "../components/ConfirmModal";
import {useProject} from "../../../shared/store/useProject";
import {useParams} from "react-router-dom";

const FilesTab = () => {
  const files = useProject((state) => state.files);
  const {projectId} = useParams();
  const fetchGeneratedFiles = useProject((state) => state.fetchGeneratedFiles);
  const downloadProject = useProject((state) => state.downloadProject);

  const [selectedFile, setSelectedFile] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const getProject = async () => {
      await fetchGeneratedFiles(projectId);
    };
    getProject();
  }, [fetchGeneratedFiles, projectId]);

  const handleConfirmDownload = () => {
    downloadProject(projectId);
    setShowConfirm(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="font-bold text-lg text-center sm:text-left">
          Generated Files ({files.length})
        </h2>

        <button
          onClick={() => setShowConfirm(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2 rounded-lg
          bg-purple-600 text-white font-medium
          hover:bg-purple-700 transition"
        >
          Download Project
        </button>
      </div>

      {/* Files List */}
      <div className="space-y-3">
        {files.map((file, index) => (
          <div
            key={index}
            className="card flex flex-col sm:flex-row sm:justify-between items-center sm:items-center gap-4"
          >
            {/* File Name */}
            <div className="min-w-0 flex-1">
              <p
                className="
    inline-block
    break-all
    text-sm sm:text-base
    font-semibold
    text-purple-300
    bg-purple-500/10
    border border-purple-500/20
    px-3 py-1.5
    rounded-lg
  "
              >
                {file.name}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button
                onClick={() => setSelectedFile(file)}
                className="w-full sm:w-auto px-4 py-2 rounded-md border border-purple-800/40
                bg-[#241A40] text-white text-sm
                hover:bg-purple-900/30 transition"
              >
                View Code
              </button>

              <button
                onClick={() => downloadFile(file.name, file.content)}
                className="w-full sm:w-auto px-4 py-2 rounded-md
                bg-purple-600 text-white text-sm
                hover:bg-purple-700 transition"
              >
                Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Code Viewer */}
      <CodeViewer file={selectedFile} onClose={() => setSelectedFile(null)} />

      {/* Confirm Modal */}
      {showConfirm && (
        <ConfirmModal
          title="Download Project"
          message="Are you sure you want to download the complete project as a ZIP file?"
          onConfirm={handleConfirmDownload}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
};

export default FilesTab;
