import React from "react";

const Introduction = () => {
  return (
    <section id="introduction" className="space-y-12">
      {/* Heading */}
      <div className="max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
          Build APIs Faster with <span className="text-blue-400">AutoAPI</span>
        </h1>

        <p className="text-gray-400 text-lg leading-relaxed mb-4">
          AutoAPI is a powerful developer tool that automatically generates
          fully functional backend APIs from simple schema definitions.
        </p>

        <p className="text-gray-500 text-lg leading-relaxed">
          Skip repetitive CRUD logic, authentication setup, and documentation.
          Define your data structure once and instantly generate a complete
          backend system.
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="flex gap-4">
        <a
          href="#quick-start"
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl text-sm font-medium transition shadow-lg shadow-blue-500/20"
        >
          Get Started
        </a>

        <a
          href="/api-docs"
          target="_blank"
          className="px-6 py-3 border border-slate-700 hover:border-slate-500 rounded-xl text-sm font-medium transition"
        >
          Try Swagger →
        </a>
      </div>

      {/* Highlight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        {[
          {
            title: "Fast Setup",
            icon: "⚡",
            desc: "Generate a complete backend in minutes without writing boilerplate code.",
          },
          {
            title: "Built-in Auth",
            icon: "🔐",
            desc: "Secure your APIs instantly using JWT authentication.",
          },
          {
            title: "Swagger Docs",
            icon: "📄",
            desc: "Auto-generated API docs for easy testing and integration.",
          },
        ].map((card, i) => (
          <div
            key={i}
            className="group bg-slate-900/70 backdrop-blur border border-slate-800 p-6 rounded-2xl hover:border-slate-600 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="text-2xl mb-3">{card.icon}</div>

            <h3 className="text-lg font-semibold mb-2 group-hover:text-white">
              {card.title}
            </h3>

            <p className="text-sm text-gray-400 leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Introduction;
