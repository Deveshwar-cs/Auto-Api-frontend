import React, {useState} from "react";

const faqs = [
  {
    question: "What is the Auto API project?",
    answer:
      "The Auto API project provides endpoints for managing vehicles, routes, and scheduling. It allows CRUD operations, filtering, and integration with frontend applications.",
  },
  {
    question: "How do I authenticate my requests?",
    answer:
      "Use JWT authentication. Include your token in the Authorization header: `Authorization: Bearer <your_token>`.",
  },
  {
    question: "What should I do if I get a 400 error?",
    answer:
      "Check the request payload for missing or invalid fields. Ensure all required parameters are provided and follow the correct data types.",
  },
  {
    question: "Can I use the API for production?",
    answer:
      "Yes, but make sure you secure your endpoints, handle errors gracefully, and never expose your secret keys in frontend code.",
  },
  {
    question: "How can I get a list of all routes?",
    answer:
      "Use the GET `/api/routes` endpoint. You can apply query parameters for filtering, sorting, and pagination.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="space-y-16">
      {/* Heading */}
      <div className="max-w-3xl">
        <h2 className="text-4xl font-bold mb-4 text-gray-100">❓ FAQ</h2>
        <p className="text-gray-400 text-lg leading-relaxed">
          Frequently Asked Questions about the Auto API project.
        </p>
      </div>

      {/* FAQ List */}
      <div className="space-y-4 max-w-7xl">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden"
          >
            <button
              className="w-full text-left px-6 py-4 flex justify-between items-center hover:bg-slate-800 transition"
              onClick={() => toggleFAQ(i)}
            >
              <span className="text-gray-100 font-semibold">
                {faq.question}
              </span>
              <span className="text-gray-400">
                {openIndex === i ? "−" : "+"}
              </span>
            </button>
            {openIndex === i && (
              <div className="px-6 py-4 border-t border-slate-800 text-gray-400 text-sm">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
