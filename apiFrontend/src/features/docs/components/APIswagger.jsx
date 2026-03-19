import React from "react";

const APIswagger = () => {
  return (
    <section id="api-swagger" className="space-y-16">
      {/* Heading */}
      <div className="max-w-3xl">
        <h2 className="text-4xl font-bold mb-4">API & Swagger Usage</h2>

        <p className="text-gray-400 text-lg leading-relaxed">
          AutoAPI provides an interactive Swagger UI where you can explore,
          test, and understand your generated APIs in real-time.
        </p>
      </div>

      {/* Swagger Access */}
      <div className="bg-slate-900/70 border border-slate-800 p-6 rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">🌐 Access Swagger</h3>

          <a
            href="/api-docs"
            target="_blank"
            className="text-sm px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition"
          >
            Open →
          </a>
        </div>

        <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-sm text-gray-300">
          <pre>http://localhost:5000/api-docs</pre>
        </div>

        <p className="text-gray-400 mt-4 text-sm">
          Open this URL after starting your server to test all endpoints
          visually.
        </p>
      </div>

      {/* API + Request + Response Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Endpoints */}
        <div className="bg-slate-900/70 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-semibold mb-4">📡 Endpoints</h3>

          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-sm text-gray-300 space-y-1">
            <p>
              <span className="text-green-400">GET</span> /api/products
            </p>
            <p>
              <span className="text-blue-400">POST</span> /api/products
            </p>
            <p>
              <span className="text-yellow-400">GET</span> /api/products/:id
            </p>
            <p>
              <span className="text-purple-400">PUT</span> /api/products/:id
            </p>
            <p>
              <span className="text-red-400">DELETE</span> /api/products/:id
            </p>
          </div>
        </div>

        {/* Request */}
        <div className="bg-slate-900/70 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-semibold mb-4">📥 Request</h3>

          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-sm text-gray-300">
            <pre>{`POST /api/products

{
  "name": "iPhone 14",
  "price": 799,
  "description": "Latest Apple smartphone",
  "stock": 50
}`}</pre>
          </div>
        </div>

        {/* Response */}
        <div className="md:col-span-2 bg-slate-900/70 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-semibold mb-4">📤 Response</h3>

          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-sm text-gray-300">
            <pre>{`{
  "success": true,
  "data": {
    "_id": "123abc",
    "name": "iPhone 14",
    "price": 799,
    "description": "Latest Apple smartphone",
    "stock": 50
  }
}`}</pre>
          </div>
        </div>
      </div>
    </section>
  );
};

export default APIswagger;
