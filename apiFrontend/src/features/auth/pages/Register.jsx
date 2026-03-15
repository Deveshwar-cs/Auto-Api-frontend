import React, {useState} from "react";
import api from "../../../services/api.js";
import {useNavigate, Link} from "react-router-dom";
import bg from "../images/bg5.jpg";
import {GoogleLogin} from "@react-oauth/google";

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
    } catch (err) {
      setError("Registration failed. Try again.", err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    if (!credentialResponse?.credential) return;

    try {
      const res = await api.post("/auth/google", {
        token: credentialResponse.credential,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      setError("Google authentication failed.");
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

      {/* LEFT HERO */}
      <div className="hidden lg:flex flex-col justify-center px-20 relative z-10 w-1/2">
        <h1
          style={{fontFamily: "samurai"}}
          className="text-5xl font-bold mb-6 leading-tight"
        >
          Start your journey
        </h1>

        <p className="text-gray-300 max-w-md text-lg">
          Join thousands of developers building scalable products with our
          platform.
        </p>
      </div>

      {/* REGISTER PANEL */}
      <div className="flex items-center justify-center w-full lg:w-1/2 relative z-10 p-6">
        <div className="w-full max-w-md bg-slate-900/70 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-10">
          {/* HEADER */}
          <h2 className="text-3xl font-bold mb-1">Create account</h2>
          <p className="text-gray-400 mb-6">It takes less than a minute</p>

          {error && (
            <p className="mb-4 text-center text-red-400 font-medium">{error}</p>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} autoComplete="on" className="space-y-5">
            {/* NAME */}
            <input
              type="text"
              name="name"
              placeholder="Full name"
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />

            {/* EMAIL */}
            <input
              type="email"
              name="email"
              placeholder="Email address"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />

            {/* PASSWORD */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />

            {/* REGISTER BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-linear-to-r from-green-500 to-emerald-500 py-3 rounded-lg font-semibold shadow-lg hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Registering..." : "Create account"}
            </button>

            {/* DIVIDER */}
            <div className="flex items-center my-4">
              <div className="grow h-px bg-white/10"></div>
              <span className="px-3 text-gray-400 text-sm">OR</span>
              <div className="grow h-px bg-white/10"></div>
            </div>

            {/* GOOGLE REGISTER */}
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => console.log("Google Register Failed")}
                theme="filled_black"
                size="large"
                shape="pill"
                text="signup_with"
              />
            </div>

            {/* LOGIN LINK */}
            <p className="text-center text-gray-400 text-sm mt-4">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-green-400 font-semibold hover:text-green-300"
              >
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
