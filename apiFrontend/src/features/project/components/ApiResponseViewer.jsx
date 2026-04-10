import {Copy, Check} from "lucide-react";

const statusColor = (s) => {
  if (s >= 200 && s < 300) return "text-green-400";
  if (s >= 400 && s < 500) return "text-yellow-400";
  if (s >= 500) return "text-red-400";
  return "text-gray-400";
};

const ApiResponseViewer = ({response, onCopy, copied}) => {
  return (
    <div className="bg-[#1B1330] border border-purple-900/20 rounded-2xl p-5 space-y-3">
      {/* Status Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <p className="text-xs text-gray-400 uppercase tracking-widest">
            Response
          </p>

          <span className={`text-sm font-bold ${statusColor(response.status)}`}>
            {response.status || "ERR"}
          </span>

          <span className="text-xs text-gray-500">{response.time}ms</span>

          {response.ok ? (
            <span className="text-xs bg-green-500/10 text-green-400 px-2 py-0.5 rounded-md border border-green-500/20">
              Success
            </span>
          ) : (
            <span className="text-xs bg-red-500/10 text-red-400 px-2 py-0.5 rounded-md border border-red-500/20">
              Failed
            </span>
          )}
        </div>

        {/* Copy Button */}
        <button
          onClick={onCopy}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white
            transition px-3 py-1.5 rounded-lg bg-[#241A40] border border-purple-800/30"
        >
          {copied ? (
            <Check size={12} className="text-green-400" />
          ) : (
            <Copy size={12} />
          )}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* JSON Body */}
      <pre
        className="bg-[#0D0716] rounded-xl p-4 text-xs text-green-300 font-mono
        overflow-x-auto max-h-72 border border-purple-900/20 whitespace-pre-wrap break-all"
      >
        {JSON.stringify(response.data, null, 2)}
      </pre>
    </div>
  );
};

export default ApiResponseViewer;
