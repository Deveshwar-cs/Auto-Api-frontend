import React from "react";

const Features = () => {
  return (
    <section id="features" className="space-y-12">
      {/* Heading */}
      <div className="max-w-3xl">
        <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
        <p className="text-gray-400 text-lg">
          AutoAPI provides everything you need to build, test, and deploy APIs
          faster.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            title: "Automatic CRUD APIs",
            desc: "Instantly generate full CRUD endpoints without writing repetitive backend logic.",
            icon: "⚡",
          },
          {
            title: "MongoDB Schema Generation",
            desc: "Define your data structure once and automatically create database schemas.",
            icon: "🧱",
          },
          {
            title: "JWT Authentication",
            desc: "Secure your APIs with built-in authentication and protected routes.",
            icon: "🔐",
          },
          {
            title: "Swagger Documentation",
            desc: "Auto-generated interactive API docs for testing and integration.",
            icon: "📄",
          },
          {
            title: "Clean Project Structure",
            desc: "Well-organized folders for controllers, routes, models, and middleware.",
            icon: "📁",
          },
          {
            title: "Fast Development Workflow",
            desc: "Focus on building features instead of setting up backend boilerplate.",
            icon: "🚀",
          },
        ].map((feature, i) => (
          <div
            key={i}
            className="group bg-slate-900/70 border border-slate-800 p-6 rounded-2xl hover:border-slate-600 transition-all duration-300 hover:-translate-y-1"
          >
            {/* Icon */}
            <div className="text-2xl mb-3">{feature.icon}</div>

            {/* Title */}
            <h3 className="text-lg font-semibold mb-2 group-hover:text-white">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-400 leading-relaxed">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
