import React, {useState} from "react";
import api from "../api/axios.js";
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-3xl shadow-xl p-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Create Your Account
        </h2>

        {error && (
          <p className="mb-4 text-center text-red-500 font-medium">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-5 py-4 rounded-2xl border border-gray-300 focus:border-black focus:ring-2 focus:ring-black outline-none transition"
          />

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-5 py-4 rounded-2xl border border-gray-300 focus:border-black focus:ring-2 focus:ring-black outline-none transition"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-5 py-4 rounded-2xl border border-gray-300 focus:border-black focus:ring-2 focus:ring-black outline-none transition"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-black text-white font-semibold text-lg hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          {/* 👇 Login Link */}
          <p className="text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-black font-semibold hover:underline"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
