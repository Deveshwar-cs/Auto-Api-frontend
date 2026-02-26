import {useRef} from "react";
import VariableProximity from "./VariableProximity.jsx";
import "@fontsource/inter";

const Hero = () => {
  const containerRef = useRef(null);

  return (
    <section className="bg-slate-950 text-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-14 items-center">
        {/* LEFT CONTENT */}
        <div>
          <div ref={containerRef} className="relative">
            <VariableProximity
              label={"Build Backends in "}
              className="font-inter text-4xl md:text-6xl font-extrabold tracking-tight leading-tight inline"
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 1000, 'opsz' 40"
              containerRef={containerRef}
              radius={120}
              falloff="linear"
            />

            <span className="bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent text-4xl md:text-6xl font-extrabold">
              Minutes
            </span>

            <VariableProximity
              label={", Not Weeks."}
              className="font-inter text-4xl md:text-6xl font-extrabold tracking-tight leading-tight inline"
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 1000, 'opsz' 40"
              containerRef={containerRef}
              radius={120}
              falloff="linear"
            />
          </div>

          <p className="text-gray-400 text-lg md:text-xl mt-6 max-w-xl">
            The ultimate No-Code MERN Stack generator. Define your data schemas
            and instantly get production-ready MongoDB models, REST APIs, and a
            downloadable codebase.
          </p>

          <div className="flex gap-4 mt-8 flex-wrap">
            <button className="bg-blue-500 hover:bg-blue-600 transition px-6 py-3 rounded-lg font-medium shadow-lg shadow-blue-500/20">
              Get Started Free
            </button>

            <button className="border border-slate-600 hover:border-slate-400 transition px-6 py-3 rounded-lg">
              Demo
            </button>
          </div>
        </div>

        {/* RIGHT CODE CARD */}
        <div className="bg-slate-900/70 backdrop-blur border border-slate-700 rounded-xl p-6 shadow-xl">
          <pre className="text-green-400 text-sm whitespace-pre-wrap">
            {`{
  "firstname": "String",
  "email": "String",
  "role": "Admin"
}`}
          </pre>
        </div>
      </div>
    </section>
  );
};

export default Hero;
