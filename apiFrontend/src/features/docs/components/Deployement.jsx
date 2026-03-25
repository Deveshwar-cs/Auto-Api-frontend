import React from "react";

const Deployement = () => {
  return (
    <section id="deployment" className="space-y-16">
      {/* Heading */}
      <div className="max-w-3xl">
        <h2 className="text-4xl font-bold mb-4">
          Deployment & Running the Project
        </h2>

        <p className="text-gray-400 text-lg leading-relaxed">
          After generating your backend, you can run it locally or deploy it to
          a production server in just a few steps.
        </p>
      </div>

      {/* Steps Flow */}
      <div>
        <h3 className="text-2xl font-semibold mb-6 text-center">Setup Flow</h3>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          {["Install", "Configure", "Run", "Deploy"].map((step, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="bg-slate-900/70 border border-slate-800 px-6 py-4 rounded-2xl text-center min-w-32.5">
                <p className="text-xs text-gray-500 mb-1">Step {i + 1}</p>
                <h4 className="font-semibold">{step}</h4>
              </div>

              {i !== 3 && (
                <div className="hidden md:block text-gray-600 text-xl">→</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Grid Sections */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Prerequisites */}
        <div className="bg-slate-900/70 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-semibold mb-4">📦 Prerequisites</h3>

          <ul className="text-sm text-gray-400 space-y-2">
            <li>• Node.js installed</li>
            <li>• MongoDB (local or cloud)</li>
            <li>• Environment variables</li>
          </ul>
        </div>

        {/* Install */}
        <div className="bg-slate-900/70 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-semibold mb-4">⚙️ Install & Run</h3>

          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-sm text-gray-300">
            <pre>{`npm install
npm run dev`}</pre>
          </div>

          <p className="text-gray-500 text-sm mt-3">
            Starts your server locally.
          </p>
        </div>

        {/* Env Variables */}
        <div className="md:col-span-2 bg-slate-900/70 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-semibold mb-4">Environment Variables</h3>

          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-sm text-gray-300">
            <pre>{`PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key`}</pre>
          </div>
        </div>
      </div>

      {/* Deployment Platforms */}
      <div>
        <h3 className="text-2xl font-semibold mb-6">🌍 Deploy to Production</h3>

        <p className="text-gray-400 mb-6 text-sm">
          You can deploy your backend to these platforms:
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {name: "Render", desc: "Easy deployment with free tier"},
            {name: "Railway", desc: "Quick setup and database support"},
            {name: "Vercel", desc: "Serverless deployment (advanced)"},
          ].map((platform, i) => (
            <div
              key={i}
              className="group bg-slate-900/70 border border-slate-800 p-6 rounded-2xl hover:border-blue-500/40 transition"
            >
              <h4 className="font-semibold mb-2 group-hover:text-white">
                {platform.name}
              </h4>
              <p className="text-sm text-gray-400">{platform.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Deployement;
