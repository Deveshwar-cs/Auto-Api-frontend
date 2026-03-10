const plans = [
  {
    name: "Free",
    price: "$0",
    desc: "Perfect for learning and small experiments.",
    features: [
      "1 Project",
      "Basic API Generation",
      "JWT Authentication",
      "Community Support",
    ],
    popular: false,
  },
  {
    name: "Pro",
    price: "$29",
    desc: "Best for individual developers building production apps.",
    features: [
      "Unlimited Projects",
      "Advanced Validation",
      "Swagger Docs",
      "Priority Support",
      "Environment Config",
    ],
    popular: true,
  },
  {
    name: "Team",
    price: "$99",
    desc: "For startups and teams collaborating on backend architecture.",
    features: [
      "Team Collaboration",
      "Role Management",
      "Custom Middleware",
      "CI/CD Export",
      "Dedicated Support",
    ],
    popular: false,
  },
];

const Pricing = () => {
  return (
    <section className="bg-slate-950 text-white px-31.75 py-24 text-center">
      <h2 className="text-[38px] font-bold mb-4">
        Simple, Transparent Pricing
      </h2>
      <p className="text-gray-400 mb-14 max-w-xl mx-auto">
        Choose a plan that fits your workflow. Upgrade anytime as your backend
        grows.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`relative p-8 rounded-2xl border backdrop-blur-lg transition duration-300
            ${
              plan.popular
                ? "bg-slate-900 border-indigo-500 scale-105 shadow-2xl"
                : "bg-slate-900/60 border-slate-800 hover:-translate-y-2 hover:border-indigo-500"
            }`}
          >
            {/* Popular badge */}
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-500 text-xs px-3 py-1 rounded-full">
                Most Popular
              </span>
            )}

            {/* Plan */}
            <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
            <p className="text-gray-400 mb-6">{plan.desc}</p>

            {/* Price */}
            <div className="text-4xl font-bold mb-6">
              {plan.price}
              <span className="text-gray-400 text-sm"> / month</span>
            </div>

            {/* Features */}
            <ul className="text-left space-y-3 mb-8">
              {plan.features.map((f, idx) => (
                <li key={idx} className="flex gap-2 text-gray-300">
                  <span className="text-indigo-400">✔</span>
                  {f}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              className={`w-full py-3 rounded-lg font-medium transition
              ${
                plan.popular
                  ? "bg-indigo-500 hover:bg-indigo-600"
                  : "bg-slate-800 hover:bg-slate-700"
              }`}
            >
              Get Started
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
