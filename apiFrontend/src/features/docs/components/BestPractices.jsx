// BestPracticesSection.jsx
import React from "react";

const bestPractices = [
  {
    title: "Use Proper HTTP Methods",
    description:
      "Always use the correct HTTP method for your requests: GET for fetching data, POST for creating, PUT/PATCH for updating, and DELETE for removing resources.",
  },
  {
    title: "Validate Request Data",
    description:
      "Ensure all incoming requests are validated to prevent malformed data and security vulnerabilities.",
  },
  {
    title: "Handle Errors Gracefully",
    description:
      "Return meaningful HTTP status codes and error messages. Use consistent error structures as shown in the Errors section.",
  },
  {
    title: "Use Authentication & Authorization",
    description:
      "Protect sensitive endpoints with JWT tokens or other authentication methods, and enforce role-based access control.",
  },
  {
    title: "Paginate Large Responses",
    description:
      "Avoid sending huge payloads by implementing pagination or filtering to improve performance and reduce bandwidth usage.",
  },
  {
    title: "Secure Environment Variables",
    description:
      "Never commit secrets like JWT_SECRET or database credentials to version control. Use environment variables safely.",
  },
  {
    title: "Document Everything",
    description:
      "Keep API docs up to date. Include request parameters, responses, error codes, and examples to make it easy for developers to integrate.",
  },
];

const BestPractices = () => {
  return (
    <section id="best-practices" className="space-y-16">
      {/* Heading */}
      <div className="max-w-3xl">
        <h2 className="text-4xl font-bold mb-4 text-gray-100">
          Best Practices
        </h2>
        <p className="text-gray-400 text-lg leading-relaxed">
          Follow these best practices when using the Auto API to ensure robust,
          secure, and maintainable integration.
        </p>
      </div>

      {/* Practices Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bestPractices.map((practice, i) => (
          <div
            key={i}
            className="bg-slate-900/70 border border-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-200"
          >
            <h3 className="text-lg font-semibold text-gray-100 mb-2">
              {practice.title}
            </h3>
            <p className="text-gray-400 text-sm">{practice.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestPractices;
