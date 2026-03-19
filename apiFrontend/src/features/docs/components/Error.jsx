import React from "react";
const errors = [
  {
    code: 400,
    title: "Bad Request",
    description: "The request is invalid or missing required fields.",
    example: `{ "status": 400, "message": "Invalid request data" }`,
    when: "Occurs when the client sends malformed data or missing required parameters.",
  },
  {
    code: 401,
    title: "Unauthorized",
    description: "Authentication is required and has failed or not provided.",
    example: `{ "status": 401, "message": "Authentication failed" }`,
    when: "Occurs when JWT token is missing, expired, or invalid.",
  },
  {
    code: 403,
    title: "Forbidden",
    description: "The client does not have permission to access this resource.",
    example: `{ "status": 403, "message": "Access denied" }`,
    when: "Occurs when user tries to access resources without required role or permissions.",
  },
  {
    code: 404,
    title: "Not Found",
    description: "The requested resource does not exist.",
    example: `{ "status": 404, "message": "Resource not found" }`,
    when: "Occurs when the endpoint or resource ID does not exist in the database.",
  },
  {
    code: 409,
    title: "Conflict",
    description: "The request could not be completed due to a conflict.",
    example: `{ "status": 409, "message": "Email already exists" }`,
    when: "Occurs when trying to create a resource that violates unique constraints.",
  },
  {
    code: 422,
    title: "Unprocessable Entity",
    description: "The server understands the request but cannot process it.",
    example: `{ "status": 422, "message": "Validation failed" }`,
    when: "Occurs when data validation fails for required fields or types.",
  },
  {
    code: 500,
    title: "Internal Server Error",
    description: "The server encountered an unexpected condition.",
    example: `{ "status": 500, "message": "Something went wrong" }`,
    when: "Occurs when an unexpected error happens on the server side.",
  },
];
const Error = () => {
  return (
    <section id="errors" className="space-y-16">
      {/* Heading */}
      <div className="max-w-3xl">
        <h2 className="text-4xl font-bold mb-4 text-gray-100">
          ⚠️ General HTTP Errors
        </h2>
        <p className="text-gray-400 text-lg leading-relaxed">
          This section covers standard HTTP errors returned by the Auto API
          project. It includes error codes, descriptions, examples, and when
          they occur.
        </p>
      </div>

      {/* Error Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
        {errors.map((error, i) => (
          <div
            key={i}
            className="bg-slate-900/70 border border-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex items-center mb-2">
              <span className="text-red-500 font-bold text-xl mr-2">
                {error.code}
              </span>
              <h3 className="text-lg font-semibold text-gray-100">
                {error.title}
              </h3>
            </div>
            <p className="text-gray-400 text-sm mb-2">{error.description}</p>
            <p className="text-gray-500 text-xs mb-2">
              <strong>When:</strong> {error.when}
            </p>
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-2 text-xs text-green-400 font-mono overflow-x-auto">
              <pre>{error.example}</pre>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Error;
