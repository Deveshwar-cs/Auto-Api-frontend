import React, {useState} from "react";
import api from "../../../services/api";
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";

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
      navigate("/");
    } catch {
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-3xl shadow-xl p-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-5 py-4 rounded-2xl border border-gray-300 focus:border-black focus:ring-2 focus:ring-black outline-none transition"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-5 py-4 rounded-2xl border border-gray-300 focus:border-black focus:ring-2 focus:ring-black outline-none transition"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-black text-white font-semibold text-lg hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* 👇 Register Link */}
          <p className="text-center text-gray-600 text-sm">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-black font-semibold hover:underline"
            >
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
