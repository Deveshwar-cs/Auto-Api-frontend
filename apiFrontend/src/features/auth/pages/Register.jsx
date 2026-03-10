import React, {useState} from "react";
import api from "../../../services/api.js";
import {useNavigate, Link} from "react-router-dom";
import bg from "../images/bg5.jpg";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/auth/register", form);
      navigate("/login");
    } catch {
      setError("Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex relative text-white"
      style={{background: "var(--color-slate-950)"}}
    >
      {/* BACKGROUND IMAGE */}
      <img
        src={bg}
        alt="bg"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />

      {/* LEFT HERO TEXT */}
      <div className="hidden lg:flex flex-col justify-center px-20 relative z-10 w-1/2">
        <h1
          style={{fontFamily: "samurai"}}
          className="text-5xl font-samurai font-bold mb-6"
        >
          Start your journey
        </h1>
        <p className="text-gray-300 max-w-md ">
          Join thousands of developers building scalable products with our
          platform.
        </p>
      </div>

      {/* RIGHT REGISTER PANEL */}
      <div className="flex items-center justify-center w-full lg:w-1/2 relative z-10 p-6">
        <div className="w-full max-w-md bg-slate-950 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-10">
          <h2 className="text-3xl font-bold mb-2">Create account</h2>
          <p className="text-gray-400 mb-6">It takes less than a minute</p>

          {error && (
            <p className="mb-4 text-center text-red-400 font-medium">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Full name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-600"
            />

            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-600"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-600"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white py-3 rounded-lg shadow-lg hover:bg-slate-800 transition disabled:opacity-50"
            >
              {loading ? "Registering..." : "Create account"}
            </button>

            <p className="text-center text-gray-400 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-[#3232f4] font-semibold">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
