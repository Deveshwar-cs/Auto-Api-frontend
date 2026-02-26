import createProjectIcon from "../image/createProject.svg";
import defineCollectionIcon from "../image/DefineCollection.svg";
import autoGenIcon from "../image/AutoGen.svg";
import Download from "../image/Download.svg";
import ScrollFloat from "./ScrollFloat";

const Features = () => {
  const items = [
    {
      title: "Create Projects",
      desc: "Organize your backend architectures into logical projects with shared authentication and middleware.",
      icon: createProjectIcon,
    },
    {
      title: "Define Collection",
      desc: "Intuitive visual editor for defining MongoDB collections, relationships, and data validation rules.",
      icon: defineCollectionIcon,
    },
    {
      title: "Auto-Gen REST APIs",
      desc: "Instant creation of robust RESTful endpoints with built-in sorting, filtering, and pagination.",
      icon: autoGenIcon,
    },
    {
      title: "Download Clean Code",
      desc: "Export a fully documented Node.js/Express environment that follows industry best practices.",
      icon: Download,
    },
  ];

  return (
    <section className="bg-slate-950 text-white py-24">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* HEADER */}
        <ScrollFloat
          animationDuration={1}
          ease="back.inOut(3)"
          scrollStart="center bottom+=25%"
          scrollEnd="bottom bottom-=30%"
          stagger={0.03}
        >
          Built for High-Velocity Teams
        </ScrollFloat>

        <p className="max-w-2xl mx-auto text-gray-400 text-lg mt-4">
          Stop writing boilerplate code. Auto API Builder handles the heavy
          lifting so you can focus on building unique features.
        </p>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {items.map((f, i) => (
            <div
              key={i}
              className="bg-slate-900 p-6 text-left rounded-2xl border border-slate-700 hover:border-blue-500/40 hover:-translate-y-1 transition shadow-lg"
            >
              {/* ICON BADGE */}
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-500/10">
                <img src={f.icon} alt={f.title} className="w-6 h-6" />
              </div>

              <h3 className="mt-4 font-semibold text-lg">{f.title}</h3>

              <p className="text-gray-400 mt-3 text-sm leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
