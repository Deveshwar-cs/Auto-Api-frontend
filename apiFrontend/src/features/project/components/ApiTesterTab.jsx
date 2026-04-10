import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useProject} from "../../../shared/store/useProject";
import {Send, ChevronDown, Zap, Lock, Unlock} from "lucide-react";

import ApiAuthSection from "./ApiAuthSection";
import ApiResponseViewer from "./ApiResponseViewer";
import {
  METHOD_COLORS,
  inputCls,
  getEndpoints,
  makeRequest,
} from "./ApiTesterUtils.js";

const ApiTesterTab = () => {
  const {projectId} = useParams();
  const collections = useProject((state) => state.collections);
  const fetchCollections = useProject((state) => state.fetchCollections);

  const [baseUrl, setBaseUrl] = useState("http://localhost:5000");
  const [token, setToken] = useState("");
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [selectedEndpoint, setSelectedEndpoint] = useState(null);
  const [resourceId, setResourceId] = useState("");
  const [bodyFields, setBodyFields] = useState({});
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showCollectionDropdown, setShowCollectionDropdown] = useState(false);
  const [showEndpointDropdown, setShowEndpointDropdown] = useState(false);

  useEffect(() => {
    if (projectId) fetchCollections(projectId);
  }, [projectId, fetchCollections]);

  const handleSelectCollection = (col) => {
    setSelectedCollection(col);
    setSelectedEndpoint(null);
    setBodyFields({});
    setResponse(null);
    setResourceId("");
    setShowCollectionDropdown(false);
  };

  const handleSelectEndpoint = (ep) => {
    setSelectedEndpoint(ep);
    setResponse(null);
    setResourceId("");
    if (ep.hasBody && selectedCollection?.fields) {
      const initial = {};
      selectedCollection.fields.forEach((f) => {
        initial[f.name] = "";
      });
      setBodyFields(initial);
    } else {
      setBodyFields({});
    }
    setShowEndpointDropdown(false);
  };

  const handleSend = async () => {
    if (!selectedEndpoint) return;
    setLoading(true);
    setResponse(null);
    try {
      let url = baseUrl.replace(/\/$/, "") + selectedEndpoint.path;
      if (selectedEndpoint.hasId) url = url.replace(":id", resourceId.trim());

      const headers = {"Content-Type": "application/json"};
      if (token.trim()) headers["Authorization"] = `Bearer ${token.trim()}`;

      const result = await makeRequest({
        url,
        method: selectedEndpoint.method,
        headers,
        body: selectedEndpoint.hasBody ? JSON.stringify(bodyFields) : undefined,
      });
      setResponse(result);
    } catch (err) {
      setResponse({
        status: 0,
        ok: false,
        data: {
          error: err.message || "Request failed. Check base URL and CORS.",
        },
        time: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(response?.data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const endpoints = selectedCollection
    ? getEndpoints(selectedCollection.collectionName)
    : [];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
          <Zap size={18} />
        </div>
        <div>
          <h2 className="text-white font-semibold text-lg">API Tester</h2>
          <p className="text-xs text-gray-400">
            Test your generated API endpoints live
          </p>
        </div>
      </div>

      {/* Configuration */}
      <div className="bg-[#1B1330] border border-purple-900/20 rounded-2xl p-5 space-y-4">
        <p className="text-xs text-gray-400 uppercase tracking-widest">
          Configuration
        </p>

        {/* Base URL */}
        <div>
          <label className="text-xs text-gray-400 mb-1 block">Base URL</label>
          <input
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            placeholder="http://localhost:5000"
            className={`${inputCls} font-mono`}
          />
        </div>

        {/* Bearer Token */}
        <div className="min-w-0">
          <label className="text-xs text-gray-400 mb-1 flex items-center gap-1.5">
            {token ? (
              <Lock size={11} className="text-purple-400" />
            ) : (
              <Unlock size={11} />
            )}
            Bearer Token
            <span className="text-purple-500">(auto-filled after login)</span>
          </label>
          <input
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Login below to auto-fill, or paste manually..."
            className={`${inputCls} font-mono overflow-hidden text-ellipsis`}
          />
          {token && (
            <p className="text-xs text-gray-600 mt-1 truncate">
              {token.slice(0, 40)}...
            </p>
          )}
        </div>
      </div>

      {/* Auth Section — Login / Register */}
      <ApiAuthSection baseUrl={baseUrl} onTokenReceived={setToken} />

      {/* Request Builder */}
      <div className="bg-[#1B1330] border border-purple-900/20 rounded-2xl p-5 space-y-4">
        <p className="text-xs text-gray-400 uppercase tracking-widest">
          Request
        </p>

        <div className="flex gap-3 flex-wrap">
          {/* Collection Dropdown */}
          <div className="relative">
            <label className="text-xs text-gray-400 mb-1 block">
              Collection
            </label>
            <button
              onClick={() => setShowCollectionDropdown(!showCollectionDropdown)}
              className="flex items-center gap-2 bg-[#241A40] border border-purple-800/30
                rounded-lg px-4 py-2.5 text-sm text-white min-w-44 hover:bg-purple-900/20 transition"
            >
              <span className="flex-1 text-left">
                {selectedCollection?.collectionName || "Select collection"}
              </span>
              <ChevronDown size={14} className="text-gray-400" />
            </button>

            {showCollectionDropdown && (
              <div
                className="absolute top-full mt-1 left-0 z-50 w-full bg-[#0D0716]
                border border-purple-900/30 rounded-xl shadow-xl overflow-hidden"
              >
                {collections.length === 0 ? (
                  <p className="text-gray-500 text-sm p-3">
                    No collections found
                  </p>
                ) : (
                  collections.map((col) => (
                    <div
                      key={col._id}
                      onClick={() => handleSelectCollection(col)}
                      className="px-4 py-2.5 text-sm text-gray-300 hover:bg-purple-600/10
                      cursor-pointer transition border-b border-purple-900/10 last:border-0"
                    >
                      {col.collectionName}
                      {col.protect && (
                        <Lock
                          size={10}
                          className="inline ml-2 text-purple-400"
                        />
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Endpoint Dropdown */}
          <div className="relative flex-1 min-w-56">
            <label className="text-xs text-gray-400 mb-1 block">Endpoint</label>
            <button
              disabled={!selectedCollection}
              onClick={() => setShowEndpointDropdown(!showEndpointDropdown)}
              className="flex items-center gap-2 bg-[#241A40] border border-purple-800/30
                rounded-lg px-4 py-2.5 text-sm text-white w-full
                hover:bg-purple-900/20 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {selectedEndpoint ? (
                <>
                  <span
                    className={`text-xs font-bold px-1.5 py-0.5 rounded border ${METHOD_COLORS[selectedEndpoint.method]}`}
                  >
                    {selectedEndpoint.method}
                  </span>
                  <span className="font-mono text-xs text-gray-300 flex-1 text-left truncate">
                    {selectedEndpoint.path}
                  </span>
                </>
              ) : (
                <span className="flex-1 text-left text-gray-400">
                  Select endpoint
                </span>
              )}
              <ChevronDown size={14} className="text-gray-400 shrink-0" />
            </button>

            {showEndpointDropdown && (
              <div
                className="absolute top-full mt-1 left-0 z-50 w-full bg-[#0D0716]
                border border-purple-900/30 rounded-xl shadow-xl overflow-hidden"
              >
                {endpoints.map((ep, i) => (
                  <div
                    key={i}
                    onClick={() => handleSelectEndpoint(ep)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm
                      hover:bg-purple-600/10 cursor-pointer transition border-b border-purple-900/10 last:border-0"
                  >
                    <span
                      className={`text-xs font-bold px-1.5 py-0.5 rounded border shrink-0 ${METHOD_COLORS[ep.method]}`}
                    >
                      {ep.method}
                    </span>
                    <span className="font-mono text-xs text-gray-300">
                      {ep.path}
                    </span>
                    <span className="text-gray-500 text-xs ml-auto">
                      {ep.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Resource ID */}
        {selectedEndpoint?.hasId && (
          <div>
            <label className="text-xs text-gray-400 mb-1 block">
              Resource ID
            </label>
            <input
              value={resourceId}
              onChange={(e) => setResourceId(e.target.value)}
              placeholder="Enter MongoDB ObjectId..."
              className={`${inputCls} font-mono`}
            />
          </div>
        )}

        {/* Body Fields */}
        {selectedEndpoint?.hasBody &&
          selectedCollection?.fields?.length > 0 && (
            <div>
              <label className="text-xs text-gray-400 mb-2 block">
                Request Body
              </label>
              <div className="space-y-2">
                {selectedCollection.fields.map((field) => (
                  <div
                    key={field._id || field.name}
                    className="flex items-center gap-3"
                  >
                    <div className="w-36 shrink-0">
                      <span className="text-xs text-purple-300 font-mono">
                        {field.name}
                      </span>
                      <span className="text-xs text-gray-600 ml-1">
                        ({field.type})
                      </span>
                    </div>
                    <input
                      value={bodyFields[field.name] || ""}
                      onChange={(e) =>
                        setBodyFields((prev) => ({
                          ...prev,
                          [field.name]: e.target.value,
                        }))
                      }
                      placeholder={
                        field.type === "Number"
                          ? "0"
                          : field.type === "Boolean"
                            ? "true / false"
                            : field.type === "Date"
                              ? "2024-01-01"
                              : `Enter ${field.name}...`
                      }
                      className="flex-1 bg-[#241A40] border border-purple-800/30 rounded-lg
                      px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-purple-600"
                    />
                    {field.required && (
                      <span className="text-red-400 text-xs shrink-0">
                        required
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={
            !selectedEndpoint ||
            loading ||
            (selectedEndpoint?.hasId && !resourceId.trim())
          }
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700
            px-6 py-2.5 rounded-lg text-sm font-medium text-white
            transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Send size={15} />
          {loading ? "Sending..." : "Send Request"}
        </button>
      </div>

      {/* Response */}
      {response && (
        <ApiResponseViewer
          response={response}
          onCopy={handleCopy}
          copied={copied}
        />
      )}
    </div>
  );
};

export default ApiTesterTab;
