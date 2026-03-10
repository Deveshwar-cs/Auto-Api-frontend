const CodeSection = () => {
  return (
    <section className="bg-slate-950 text-white px-31.75 py-20 grid md:grid-cols-2 gap-10">
      <div>
        <h2 className="text-[36px] font-bold">
          Professional Code, Without the Effort
        </h2>
        <p className="mt-4 text-gray-400 mb-6.5">
          The code generated isn't just "filler". It uses **Mongoose** for
          modeling, **Express** for routing, and includes enterprise-level
          features like:
        </p>
        <ul className="list-disc pl-6 marker:text-indigo-400">
          <li className="mb-3">JWT-based Authentication</li>
          <li className="mb-3">Input Validation (Joi/Zod)</li>
          <li className="mb-3">Unified Error Handling</li>
          <li className="mb-3">Auto-generated Swagger Docs</li>
          <li className="mb-3">Environment Configuration</li>
        </ul>
      </div>

      {/* left part */}
      <div className="flex flex-col justify-center">
        {/* Terminal */}
        <div className="bg-[#1e1e1e] rounded-xl shadow-2xl border border-gray-800 overflow-hidden">
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-2 bg-[#3232f4] border-b border-gray-700">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
            <p className="ml-4 text-xs text-gray-400">terminal</p>
          </div>

          {/* Code */}
          <pre className="p-6 text-white bg-black text-sm font-mono leading-relaxed">
            {`router.get("/", async (req,res)=>{
  const users = await User.find();
  res.json(users);
});`}
          </pre>
        </div>
      </div>
    </section>
  );
};

export default CodeSection;
