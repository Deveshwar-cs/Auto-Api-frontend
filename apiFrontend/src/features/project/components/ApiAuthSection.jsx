import {useState} from "react";
import {Send, ChevronDown, User, ShieldCheck, KeyRound} from "lucide-react";
import ApiResponseViewer from "./ApiResponseViewer";
import {
  AUTH_ENDPOINTS,
  inputCls,
  makeRequest,
  extractToken,
} from "./ApiTesterUtils.js";

const ApiAuthSection = ({baseUrl, onTokenReceived}) => {
  const [selectedAuth, setSelectedAuth] = useState(AUTH_ENDPOINTS[0]); // Login default
  const [authFields, setAuthFields] = useState({email: "", password: ""});
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSelectAuth = (ep) => {
    setSelectedAuth(ep);
    const initial = {};
    ep.fields.forEach((f) => (initial[f] = ""));
    setAuthFields(initial);
    setResponse(null);
    setShowDropdown(false);
  };

  const handleSend = async () => {
    setLoading(true);
    setResponse(null);
    try {
      const url = baseUrl.replace(/\/$/, "") + selectedAuth.path;
      const result = await makeRequest({
        url,
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(authFields),
      });
      setResponse(result);

      // Auto-extract token and pass up to parent (ApiTesterTab)
      const token = extractToken(result.data);
      if (token) onTokenReceived(token);
    } catch (err) {
      setResponse({status: 0, ok: false, data: {error: err.message}, time: 0});
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(response?.data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const autoToken = response ? extractToken(response.data) : null;

  return (
    <div className="bg-[#1B1330] border border-purple-900/20 rounded-2xl p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <ShieldCheck size={15} className="text-purple-400" />
        <p className="text-xs text-gray-400 uppercase tracking-widest">
          Authentication
        </p>
        <span className="text-xs text-gray-600 ml-auto">
          Login or Register to get your token
        </span>
      </div>

      {/* Auth Type Dropdown */}
      <div className="relative w-48">
        <label className="text-xs text-gray-400 mb-1 block">Auth Type</label>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-2 bg-[#241A40] border border-purple-800/30
            rounded-lg px-4 py-2.5 text-sm text-white w-full hover:bg-purple-900/20 transition"
        >
          <span className="flex-1 text-left">{selectedAuth.label}</span>
          <ChevronDown size={14} className="text-gray-400" />
        </button>

        {showDropdown && (
          <div
            className="absolute top-full mt-1 left-0 z-50 w-full bg-[#0D0716]
            border border-purple-900/30 rounded-xl shadow-xl overflow-hidden"
          >
            {AUTH_ENDPOINTS.map((ep) => (
              <div
                key={ep.label}
                onClick={() => handleSelectAuth(ep)}
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300
                  hover:bg-purple-600/10 cursor-pointer transition border-b border-purple-900/10 last:border-0"
              >
                <User size={13} className="text-purple-400" />
                {ep.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fields */}
      <div className="space-y-2">
        {selectedAuth.fields.map((field) => (
          <div key={field} className="flex items-center gap-3">
            <div className="w-24 shrink-0">
              <span className="text-xs text-purple-300 font-mono">{field}</span>
            </div>
            <input
              type={field === "password" ? "password" : "text"}
              value={authFields[field] || ""}
              onChange={(e) =>
                setAuthFields((p) => ({...p, [field]: e.target.value}))
              }
              placeholder={
                field === "email"
                  ? "user@example.com"
                  : field === "password"
                    ? "••••••••"
                    : `Enter ${field}...`
              }
              className={inputCls}
            />
          </div>
        ))}
      </div>

      {/* Send Button */}
      <button
        onClick={handleSend}
        disabled={loading}
        className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700
          px-6 py-2.5 rounded-lg text-sm font-medium text-white
          transition disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <Send size={15} />
        {loading ? "Sending..." : `Send ${selectedAuth.label}`}
      </button>

      {/* Response */}
      {response && (
        <>
          {autoToken && (
            <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-2.5">
              <KeyRound size={14} className="text-green-400 shrink-0" />
              <p className="text-xs text-green-400">
                Token auto-filled in Bearer Token field ✓
              </p>
            </div>
          )}
          <ApiResponseViewer
            response={response}
            onCopy={handleCopy}
            copied={copied}
          />
        </>
      )}
    </div>
  );
};

export default ApiAuthSection;
