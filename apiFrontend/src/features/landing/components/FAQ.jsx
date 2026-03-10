import {useState} from "react";

const faqs = [
  {
    q: "Is the generated code proprietary?",
    a: "No. All generated backend code belongs entirely to you. You can modify, deploy, and scale it without restrictions.",
  },
  {
    q: "Which databases are supported?",
    a: "Currently MongoDB is fully supported with Mongoose modeling. SQL database support is coming soon.",
  },
  {
    q: "Can I export and deploy the backend?",
    a: "Yes. You can export the generated backend and deploy it to any cloud provider including Vercel, AWS, and Railway.",
  },
  {
    q: "Does AutoAPI include authentication?",
    a: "Yes. JWT-based authentication and role management are generated automatically.",
  },
];

const FAQ = () => {
  const [open, setOpen] = useState(null);

  const toggle = (index) => {
    setOpen(open === index ? null : index);
  };

  return (
    <section className="bg-slate-950 text-white px-8 py-24">
      <h2 className="text-[38px] font-bold text-center mb-14">
        Frequently Asked Questions
      </h2>

      <div className="max-w-2xl mx-auto space-y-4">
        {faqs.map((item, index) => (
          <div
            key={index}
            className="bg-slate-900/60 backdrop-blur-lg border border-slate-800 rounded-xl overflow-hidden"
          >
            {/* Question */}
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center p-5 text-left"
            >
              <span className="font-medium">{item.q}</span>

              {/* Arrow */}
              <span
                className={`transition transform ${
                  open === index
                    ? "rotate-180 text-indigo-400"
                    : "text-gray-400"
                }`}
              >
                ▼
              </span>
            </button>

            {/* Answer */}
            <div
              className={`grid transition-all duration-300 ${
                open === index ? "grid-rows-[1fr] p-5 pt-0" : "grid-rows-[0fr]"
              }`}
            >
              <p className="overflow-hidden text-gray-400 leading-relaxed">
                {item.a}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
