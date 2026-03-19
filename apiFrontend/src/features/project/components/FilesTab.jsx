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
      <div className="card flex justify-between items-center">
        <h2 className="font-bold text-lg">Generated Files ({files.length})</h2>

        <button
          onClick={() => setShowConfirm(true)}
          className="flex items-center gap-2 px-5 py-2 rounded-lg
             bg-purple-600 text-white font-medium
             hover:bg-purple-700 transition"
        >
          Download Project
        </button>
      </div>

      {/* Files List */}
      <div className="space-y-3">
        {files.map((file, index) => (
          <div key={index} className="card flex justify-between items-center">
            <p className="font-semibold">{file.fileName}</p>

            <div className="flex gap-3">
              <button
                onClick={() => setSelectedFile(file)}
                className="px-4 py-2 rounded-md border border-purple-800/40
               bg-[#241A40] text-white text-sm
               hover:bg-purple-900/30 transition"
              >
                View Code
              </button>

              <button
                onClick={() => downloadFile(file.fileName, file.code)}
                className="px-4 py-2 rounded-md
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
