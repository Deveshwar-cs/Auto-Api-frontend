import React from "react";

const ProjectCollection = () => {
  return (
    <section id="projects-collections" className="space-y-16">
      {/* Heading */}
      <div className="max-w-3xl">
        <h2 className="text-4xl font-bold mb-4">Projects & Collections</h2>

        <p className="text-gray-400 text-lg leading-relaxed">
          AutoAPI is built around two core concepts:{" "}
          <span className="text-white font-medium">Projects</span> and{" "}
          <span className="text-white font-medium">Collections</span>. Together,
          they define how your backend is structured and generated.
        </p>
      </div>

      {/* Project + Collection Side by Side */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Project */}
        <div className="group bg-slate-900/70 border border-slate-800 p-6 rounded-2xl hover:border-blue-500/40 transition">
          <div className="text-2xl mb-3">📁</div>

          <h3 className="text-xl font-semibold mb-3 group-hover:text-white">
            Projects
          </h3>

          <p className="text-gray-400 mb-5 text-sm">
            A project acts as a container for your APIs. It groups multiple
            collections into one complete backend system.
          </p>

          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-sm text-gray-400">
            <p className="mb-1 text-gray-300">Example</p>
            <p>
              <span className="text-white">Name:</span> Ecommerce API
            </p>
            <p>
              <span className="text-white">Description:</span> Backend for
              ecommerce platform
            </p>
          </div>
        </div>

        {/* Collection */}
        <div className="group bg-slate-900/70 border border-slate-800 p-6 rounded-2xl hover:border-blue-500/40 transition">
          <div className="text-2xl mb-3">🧱</div>

          <h3 className="text-xl font-semibold mb-3 group-hover:text-white">
            Collections
          </h3>

          <p className="text-gray-400 mb-5 text-sm">
            Collections define your database structure and automatically
            generate CRUD APIs.
          </p>

          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-sm text-gray-400 space-y-1">
            <p className="mb-1 text-gray-300">Products</p>
            <p>name: string</p>
            <p>price: number</p>
            <p>description: string</p>
            <p>stock: number</p>
          </div>
        </div>
      </div>

      {/* Visual Connection */}
      <div className="text-center text-gray-500 text-sm">
        A project contains multiple collections → which generate APIs
      </div>

      {/* Flow Section */}
      <div>
        <h3 className="text-2xl font-semibold mb-6 text-center">
          🔄 How It Works
        </h3>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          {[
            {
              step: "1",
              title: "Create Project",
            },
            {
              step: "2",
              title: "Add Collections",
            },
            {
              step: "3",
              title: "Generate API",
            },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="bg-slate-900 border border-slate-800 px-6 py-4 rounded-2xl text-center">
                <p className="text-sm text-gray-500 mb-1">Step {item.step}</p>
                <h4 className="font-semibold">{item.title}</h4>
              </div>

              {/* Arrow */}
              {i !== 2 && (
                <div className="hidden md:block text-gray-600 text-xl">→</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectCollection;
