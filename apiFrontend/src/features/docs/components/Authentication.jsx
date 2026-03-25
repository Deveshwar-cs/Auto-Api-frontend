import React from "react";

const Authentication = () => {
  return (
    <section id="authentication" className="space-y-16">
      {/* Heading */}
      <div className="max-w-3xl">
        <h2 className="text-4xl font-bold mb-4">Authentication</h2>

        <p className="text-gray-400 text-lg leading-relaxed">
          AutoAPI secures your endpoints using JWT (JSON Web Token). After
          logging in, you receive a token that must be included in protected
          requests.
        </p>
      </div>

      {/* Flow */}
      <div>
        <h3 className="text-2xl font-semibold mb-6 text-center">
          Authentication Flow
        </h3>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          {[
            {title: "Register", desc: "Create a new account"},
            {title: "Login", desc: "Receive JWT token"},
            {title: "Attach Token", desc: "Send in headers"},
            {title: "Access API", desc: "Use protected routes"},
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="bg-slate-900/70 border border-slate-800 px-6 py-4 rounded-2xl text-center min-w-37.5">
                <p className="text-xs text-gray-500 mb-1">Step {i + 1}</p>
                <h4 className="font-semibold mb-1">{step.title}</h4>
                <p className="text-xs text-gray-400">{step.desc}</p>
              </div>

              {/* Arrow */}
              {i !== 3 && (
                <div className="hidden md:block text-gray-600 text-xl">→</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* API Examples Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Login */}
        <div className="bg-slate-900/70 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-semibold mb-4">Login</h3>

          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-sm text-gray-300">
            <pre>{`POST /api/auth/login

{
  "email": "user@example.com",
  "password": "123456"
}`}</pre>
          </div>
        </div>

        {/* Token */}
        <div className="bg-slate-900/70 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-semibold mb-4">Token</h3>

          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-sm text-gray-300">
            <pre>{`{
  "success": true,
  "token": "JWT_TOKEN_HERE"
}`}</pre>
          </div>
        </div>

        {/* Usage */}
        <div className="md:col-span-2 bg-slate-900/70 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-semibold mb-4">Using Token</h3>

          <p className="text-gray-400 mb-4 text-sm">
            Include the token in the Authorization header for protected routes.
          </p>

          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-sm text-gray-300">
            <pre>{`GET /api/products

Headers:
Authorization: Bearer JWT_TOKEN_HERE`}</pre>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Authentication;
