import React from "react";

const QuickStart = () => {
  return (
    <section id="quick-start" className="space-y-12">
      {/* Heading */}
      <div className="max-w-3xl">
        <h2 className="text-4xl font-bold mb-4">Quick Start</h2>
        <p className="text-gray-400 text-lg">
          Follow these simple steps to generate your first API in minutes.
        </p>
      </div>

      {/* Steps */}
      <div className="grid md:grid-cols-2 gap-6">
        {[
          {
            step: "01",
            title: "Create an Account",
            desc: "Sign up and log in to access the dashboard.",
          },
          {
            step: "02",
            title: "Create a Project",
            desc: "Start a new project to organize your APIs.",
          },
          {
            step: "03",
            title: "Add Collections",
            desc: "Define your data structure and fields.",
          },
          {
            step: "04",
            title: "Generate API",
            desc: "Automatically generate backend and endpoints.",
          },
          {
            step: "05",
            title: "Test with Swagger",
            desc: "Use Swagger UI to test your APIs instantly.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="group relative bg-slate-900/70 border border-slate-800 p-6 rounded-2xl hover:border-blue-500/40 transition-all duration-300"
          >
            {/* Step Number */}
            <div className="absolute top-4 right-4 text-xs text-gray-500">
              {item.step}
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold mb-2 group-hover:text-white">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="flex gap-4 pt-4">
        <a
          href="#projects-collections"
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl text-sm font-medium transition shadow-lg shadow-blue-500/20"
        >
          Start Building →
        </a>

        <a
          href="/api-docs"
          target="_blank"
          className="px-6 py-3 border border-slate-700 hover:border-slate-500 rounded-xl text-sm font-medium transition"
        >
          Open Swagger
        </a>
      </div>
    </section>
  );
};

export default QuickStart;
