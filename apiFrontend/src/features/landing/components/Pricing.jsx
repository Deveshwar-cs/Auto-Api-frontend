import React from "react";
import {useNavigate} from "react-router-dom";

const freeFeatures = [
  "Unlimited Projects",
  "Automatic API Generation",
  "JWT Authentication",
  "Advanced Validation",
  "Swagger Documentation",
  "Environment Config",
  "Community Support",
];

const Pricing = () => {
  const navigate = useNavigate();
  return (
    <section
      id="pricing"
      className="bg-slate-950 text-white px-32 py-24 text-center"
    >
      {/* Heading */}
      <h2 className="text-[38px] font-bold mb-4">
        Completely Free for Developers
      </h2>

      <p className="text-gray-400 mb-14 max-w-xl mx-auto">
        Build and generate backend APIs without worrying about pricing. Our
        platform is free to use for learning, experiments, and production apps.
      </p>

      {/* Card Container */}
      <div className="max-w-xl mx-auto">
        <div className="relative p-10 rounded-2xl border bg-slate-900 border-indigo-500 shadow-2xl">
          {/* Badge */}
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-500 text-xs px-3 py-1 rounded-full">
            Free Forever
          </span>

          {/* Plan Title */}
          <h3 className="text-2xl font-semibold mb-4">Developer Plan</h3>

          {/* Price */}
          <div className="text-4xl font-bold mb-6">
            $0
            <span className="text-gray-400 text-sm"> / forever</span>
          </div>

          {/* Features */}
          <ul className="text-left space-y-3 mb-8">
            {freeFeatures.map((feature, index) => (
              <li key={index} className="flex gap-2 text-gray-300">
                <span className="text-indigo-400">✔</span>
                {feature}
              </li>
            ))}
          </ul>

          {/* Button */}
          <button
            onClick={() => navigate("/register")}
            className="w-full py-3 rounded-lg font-medium hover:cursor-pointer bg-indigo-500 hover:bg-indigo-600 transition"
          >
            Start Building
          </button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
