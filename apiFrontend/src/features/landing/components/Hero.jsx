import {useRef} from "react";
import VariableProximity from "./VariableProximity.jsx";
import "@fontsource/inter";
import {useNavigate} from "react-router-dom";

const Hero = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();
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
            <button
              onClick={() => navigate("/register")}
              className="bg-blue-500 hover:bg-blue-600 transition px-6 py-3 rounded-lg font-medium shadow-lg shadow-blue-500/20"
            >
              Get Started Free
            </button>

            <button className="border border-slate-600 hover:border-slate-400 transition px-6 py-3 rounded-lg">
              Demo
            </button>
          </div>
        </div>

        {/* RIGHT CODE CARD */}
        <div className="bg-[#3232f4] rounded-xl shadow-2xl border border-gray-800 overflow-hidden">
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-2 bg-[#3232f4] border-b border-gray-700">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
            <p className="ml-4 text-xs text-gray-400">UserSchema.js</p>
          </div>

          {/* Code */}
          <pre className="p-6 text-white bg-black text-sm font-mono leading-relaxed">
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
