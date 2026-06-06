const CodeSection = () => {
  return (
    <section className="bg-slate-950 text-white px-5 sm:px-8 md:px-16 lg:px-24 py-12 md:py-20 grid md:grid-cols-2 gap-10">
      {/* Content */}
      <div>
        <h2 className="text-3xl md:text-4xl font-bold leading-tight">
          Professional Code, Without the Effort
        </h2>

        <p className="mt-4 text-gray-400 mb-6">
          The code generated isn't just "filler". It uses
          <span className="font-semibold text-white"> Mongoose </span>
          for modeling,
          <span className="font-semibold text-white"> Express </span>
          for routing, and includes enterprise-level features like:
        </p>

        <ul className="list-disc pl-6 marker:text-indigo-400">
          <li className="mb-3">JWT-based Authentication</li>
          <li className="mb-3">Input Validation (Joi/Zod)</li>
          <li className="mb-3">Unified Error Handling</li>
          <li className="mb-3">Auto-generated Swagger Docs</li>
          <li className="mb-3">Environment Configuration</li>
        </ul>
      </div>

      {/* Code Block */}
      <div className="flex flex-col justify-center">
        <div className="bg-[#1e1e1e] rounded-xl shadow-2xl border border-gray-800 overflow-hidden">
          {/* Terminal Header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-[#3232f4] border-b border-gray-700">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
            <span className="w-3 h-3 rounded-full bg-green-500"></span>

            <p className="ml-2 text-xs text-gray-200">terminal</p>
          </div>

          {/* Code */}
          <pre className="p-4 md:p-6 text-xs sm:text-sm font-mono bg-black overflow-x-auto">
            <code>
              {`router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});`}
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
};

export default CodeSection;
