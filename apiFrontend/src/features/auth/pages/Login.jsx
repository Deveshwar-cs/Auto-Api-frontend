import React, {useState} from "react";
import api from "../../../services/api";
import {useNavigate, Link} from "react-router-dom";
import bg from "../images/bg2.jpg";
import icon from "../../landing/image/icon.svg";

const Login = () => {
  const [formData, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch {
      alert("Invalid credentials");
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
        <div className="absolute top-8 left-8 text-xl flex items-center gap-2 font-semibold text-white">
          <img src={icon} alt="main_icon" className="w-6 h-6" />
          <h1 className="text-xl font-bold text-white">AutoAPI</h1>
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="flex items-center justify-center w-full lg:w-1/2 px-4 py-10 sm:px-6">
        <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10">
          {/* HEADER */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
            <div>
              <p className="text-gray-400 text-sm">
                Welcome to{" "}
                <span className="text-green-400 font-semibold">AutoAPI</span>
              </p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-1 text-white">
                Sign in
              </h1>
            </div>

            <p className="text-sm text-gray-400">
              No Account?{" "}
              <Link to="/register" className="text-green-400 font-semibold">
                Sign up
              </Link>
            </p>
          </div>

          {/* SOCIAL BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-2 bg-white/10 py-3 rounded-lg hover:bg-white/20 transition"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
                className="w-5"
                alt="google"
              />
              Sign in with Google
            </button>

            <div className="flex gap-3">
              <button
                type="button"
                className="flex-1 sm:flex-none w-full sm:w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition"
              >
                F
              </button>

              <button
                type="button"
                className="flex-1 sm:flex-none w-full sm:w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition"
              >
                A
              </button>
            </div>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm text-gray-400">
                Enter your username or email address
              </label>
              <input
                type="email"
                name="email"
                placeholder="Username or email address"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-2 w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-600"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">
                Enter your Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-2 w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-600"
              />
            </div>

            <p className="text-right text-slate-400 text-sm cursor-pointer hover:text-white">
              Forgot Password
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white py-3 rounded-lg shadow-lg hover:bg-slate-800 transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Sign in"}
            </button>

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
