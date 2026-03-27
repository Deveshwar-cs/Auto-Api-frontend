import React from "react";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {oneDark} from "react-syntax-highlighter/dist/esm/styles/prism";
import {X, Copy} from "lucide-react";

const CodeViewer = ({file, onClose}) => {
  if (!file) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(file.content);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      {/* Modal Container */}
      <div className="w-[90%] h-[90%] bg-[#1B1330] border border-purple-900/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#241A40] border-b border-purple-900/20">
          {/* Fake File Tabs */}
          <div className="flex items-center gap-3">
            <div className="px-4 py-1.5 bg-[#1B1330] rounded-lg text-sm text-white border border-purple-800/30">
              {file.name}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-purple-700/30 transition"
          >
            <X size={18} className="text-gray-300" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-end px-6 py-2 bg-[#1B1330] border-b border-purple-900/10">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 transition text-white"
          >
            <Copy size={14} />
            Copy Code
          </button>
        </div>

        {/* Code Section */}
        <div className="flex-1 bg-[#0D0716] overflow-auto">
          <SyntaxHighlighter
            language="javascript"
            style={oneDark}
            showLineNumbers
            useInlineStyles={true}
            customStyle={{
              margin: 0,
              padding: "24px",
              background: "#0D0716",
              fontSize: "13px",
              minHeight: "100%",
            }}
            lineNumberStyle={{
              color: "#6B7280",
            }}
          >
            {file.content}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

export default CodeViewer;
