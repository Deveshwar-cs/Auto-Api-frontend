const Steps = () => {
  const steps = [
    {
      title: "Define Schema",
      des: "Use our visual drag-and-drop builder to define your entities and data types.",
    },
    {
      title: "Generate Backend",
      des: "Click one button to instantly build models, controllers, and routes automatically.",
    },
    {
      title: "Deploy & Export",
      des: "Download the source code or deploy directly to your cloud provider with one click.",
    },
  ];

  return (
    <section className="bg-slate-950 text-white px-8 py-24 text-center">
      <h2 className="text-[36px] font-bold mb-4">
        Launch Your Backend in 3 Steps
      </h2>

      <p className="mb-16 text-[18px]">
        The fastest path from an idea to a live API endpoint.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((s, i) => (
          <div key={i} className="relative flex flex-col items-center px-8">
            {/* connector line (not on last step) */}
            {i !== steps.length - 1 && (
              <div className="hidden md:block absolute top-8 left-1/2 w-full border-t-2 border-dashed border-[#303840FF] z-0"></div>
            )}

            {/* circle */}
            <div className="w-16 h-16 rounded-full border-2 border-[#55A6F6FF] text-[#55A6F6FF] flex items-center justify-center relative z-10 bg-[#161A1DFF]">
              {i + 1}
            </div>

            <p className="text-blue-400 mb-3 text-xl mt-4">{s.title}</p>
            <p className="mt-2">{s.des}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Steps;
