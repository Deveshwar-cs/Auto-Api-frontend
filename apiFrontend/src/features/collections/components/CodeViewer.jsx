import React from "react";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {oneDark} from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeViewer = ({file, onClose}) => {
  if (!file) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white w-4/5 h-4/5 rounded-2xl p-6 overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{file.fileName}</h2>
          <button onClick={onClose} className="btn-secondary">
            Close
          </button>
        </div>

        <SyntaxHighlighter
          language="javascript"
          style={oneDark}
          customStyle={{
            borderRadius: "12px",
            padding: "20px",
            fontSize: "14px",
          }}
          showLineNumbers
        >
          {file.code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeViewer;
