import React, {useState} from "react";
import api from "../../../services/api";
import {useNavigate, Link} from "react-router-dom";
import bg from "../images/bg2.jpg";
import icon from "../../landing/image/icon.svg";
import {GoogleLogin} from "@react-oauth/google";

const Login = () => {
  const [formData, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // Google login handler
  const handleGoogleLogin = async (credentialResponse) => {
    if (!credentialResponse?.credential) return;

    try {
      const res = await api.post("/auth/google", {
        token: credentialResponse.credential,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Google login failed");
    }
  };

  // Input change
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Normal login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col lg:flex-row text-white"
      style={{background: "var(--color-slate-950)"}}
    >
      {/* LEFT IMAGE */}
      <div className="hidden lg:flex w-1/2 relative">
        <img
          src={bg}
          alt="background"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />

        <div className="absolute top-8 left-8 flex items-center gap-2">
          <img src={icon} alt="logo" className="w-6 h-6" />
          <h1 className="text-xl font-bold">AutoAPI</h1>
        </div>
      </div>

      {/* RIGHT LOGIN PANEL */}
      <div className="flex items-center justify-center w-full lg:w-1/2 px-4 py-10">
        <div className="w-full max-w-md bg-slate-900/70 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-8">
          {/* HEADER */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-gray-400 text-sm">
                Welcome to{" "}
                <span className="text-green-400 font-semibold">AutoAPI</span>
              </p>
              <h1 className="text-3xl font-bold mt-1">Sign in</h1>
            </div>

            <p className="text-sm text-gray-400">
              No Account?{" "}
              <Link to="/register" className="text-green-400 font-semibold">
                Sign up
              </Link>
            </p>
          </div>

          {/* GOOGLE LOGIN */}
          <div className="flex justify-center mb-6">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => console.log("Google Login Failed")}
              theme="filled_black"
              size="large"
              shape="pill"
              text="signin_with"
            />
          </div>

          {/* DIVIDER */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-white/10"></div>
            <span className="text-gray-400 text-sm">OR</span>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} autoComplete="on" className="space-y-5">
            {/* EMAIL */}
            <div>
              <label className="text-sm text-gray-400">
                Enter your email address
              </label>

              <input
                type="email"
                name="email"
                placeholder="Email address"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-2 w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm text-gray-400">
                Enter your password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-2 w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* FORGOT PASSWORD */}
            <p className="text-right text-slate-400 text-sm cursor-pointer hover:text-white">
              Forgot Password?
            </p>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-linear-to-r from-green-500 to-emerald-500 py-3 rounded-lg font-semibold shadow-lg hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

            {/* REGISTER LINK */}
            <p className="text-center text-gray-400 text-sm">
              Don’t have an account?{" "}
              <Link to="/register" className="text-green-400 font-semibold">
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
