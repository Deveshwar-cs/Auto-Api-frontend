const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Full Stack Developer",
    img: "https://i.pravatar.cc/100?img=12",
    feedback:
      "AutoAPI helped me generate a complete backend structure in minutes. Authentication and validation setup saved hours of work.",
  },
  {
    name: "Ananya Verma",
    role: "Startup Founder",
    img: "https://i.pravatar.cc/100?img=32",
    feedback:
      "We used AutoAPI to prototype our SaaS backend. Swagger docs and error handling were production-ready out of the box.",
  },
  {
    name: "Michael Chen",
    role: "Backend Engineer",
    img: "https://i.pravatar.cc/100?img=45",
    feedback:
      "The Mongoose modeling and Express routing setup is extremely clean. This tool feels like a senior developer built it.",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-slate-950 text-white px-31.75 py-24 text-center">
      <h2 className="text-[38px] font-bold mb-4">Loved by Developers</h2>

      <p className="text-gray-400 max-w-2xl mx-auto mb-14">
        Thousands of developers trust AutoAPI to prototype faster and ship
        production-ready backends with confidence.
      </p>

      <div className="grid  md:grid-cols-3 gap-8">
        {testimonials.map((item, index) => (
          <div
            key={index}
            className="relative bg-slate-900/60 backdrop-blur-lg p-7 rounded-2xl border border-slate-800 shadow-xl
            hover:-translate-y-2 hover:border-indigo-500 transition duration-300"
          >
            {/* Gradient glow */}
            <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-indigo-500/0 to-purple-500/0 hover:from-indigo-500/10 hover:to-purple-500/10 transition pointer-events-none" />

            {/* Rating */}
            <div className="flex gap-1 text-yellow-400 mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>

            {/* Feedback */}
            <p className="text-gray-300 leading-relaxed mb-6">
              "{item.feedback}"
            </p>

            {/* User */}
            <div className="flex items-center gap-3">
              <img
                src={item.img}
                className="w-10 h-10 rounded-full border border-slate-700"
              />
              <div className="text-left">
                <h4 className="font-semibold">{item.name}</h4>
                <p className="text-sm text-gray-500">{item.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
