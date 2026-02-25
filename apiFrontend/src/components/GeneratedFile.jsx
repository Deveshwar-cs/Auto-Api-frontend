import React, {useState} from "react";
import {downloadFile} from "../utils/downloadFile";
import CodeViewer from "./CodeViewer";
import {useProject} from "../context/useProject";

const GeneratedFile = () => {
  const {files} = useProject();
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <div className="space-y-4">
      {files.map((file, index) => (
        <div key={index} className="card flex justify-between items-center">
          <p className="font-semibold">{file.fileName}</p>
          <div className="flex gap-3">
            <button
              className="btn-secondary"
              onClick={() => setSelectedFile(file)}
            >
              View Code
            </button>

            <button
              className="btn-primary"
              onClick={() => downloadFile(file.fileName, file.code)}
            >
              Download
            </button>
          </div>
        </div>
      ))}

      <CodeViewer file={selectedFile} onClose={() => setSelectedFile(null)} />
    </div>
  );
};

export default GeneratedFile;
