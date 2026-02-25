import {useState} from "react";
import icon from "./image/icon.svg";
import gitLogo from "./image/github_logo.svg";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  const navItems = [
    {
      label: "Features",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: ["Visual Builder", "Auto Generate", "Export Code"],
    },
    {
      label: "How it works",
      bgColor: "#170D27",
      textColor: "#fff",
      links: ["Define Schema", "Generate Backend", "Deploy"],
    },
    {
      label: "Pricing",
      bgColor: "#271E37",
      textColor: "#fff",
      links: ["Free", "Pro", "Enterprise"],
    },
    {
      label: "Docs",
      bgColor: "#1A2233",
      textColor: "#fff",
      links: ["API Docs", "Guides"],
    },
  ];

  return (
    <nav className="flex items-center justify-between px-6 md:px-12 lg:px-30.5 py-4 bg-slate-950 text-white sticky top-0 z-50 shadow-md backdrop-blur-md">
      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer">
        <img src={icon} alt="main_icon" className="w-6 h-6" />
        <h1 className="text-xl font-bold text-blue-400">AutoAPI</h1>
      </div>

      {/* Desktop Menu with Card Effect */}
      <div className="hidden md:flex gap-8 text-sm relative">
        {navItems.map((item, i) => (
          <div
            key={i}
            className="relative"
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
          >
            <button className="hover:text-blue-400 transition cursor-pointer">
              {item.label}
            </button>

            {/* Dropdown Card */}
            {active === i && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-5">
                {/* arrow */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 top-1 w-3 h-3 rotate-45 border border-white/10"
                  style={{background: item.bgColor}}
                ></div>

                {/* card */}
                <div
                  className="p-5 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,.5)] backdrop-blur-2xl border border-white/10 animate-dropdown relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${item.bgColor}, #111827)`,
                    color: item.textColor,
                    minWidth: "260px",
                  }}
                >
                  {/* glow overlay */}
                  <div className="absolute inset-0 opacity-30 bg-linear-to-br from-blue-500/20 via-transparent to-purple-500/20 pointer-events-none"></div>

                  <div className="flex flex-col gap-1 relative">
                    {item.links.map((link, idx) => (
                      <a
                        key={idx}
                        className="px-3 py-2 rounded-lg hover:bg-white/5 hover:translate-x-1 transition-all cursor-pointer opacity-90 hover:opacity-100"
                      >
                        {link}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Desktop Buttons */}
      <div className="hidden md:flex items-center gap-4">
        <button className="bg-[#161A1D] flex items-center gap-2 px-4 py-2 border rounded-lg text-sm hover:bg-[#0f1113] hover:scale-105 transition">
          <img src={gitLogo} alt="gitlogo" className="w-4 h-4" />
          GitHub
        </button>

        <button className="bg-[#55A6F6] px-4 py-2 text-[#161A1D] rounded-lg text-sm hover:scale-105 hover:shadow-lg transition">
          Get started
        </button>
      </div>

      {/* Mobile Toggle */}
      <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
        ☰
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-[#161A1D] flex flex-col items-center gap-4 py-6 md:hidden animate-fade">
          {navItems.map((item, i) => (
            <a key={i} className="hover:text-blue-400">
              {item.label}
            </a>
          ))}

          <button className="bg-[#161A1D] flex items-center gap-2 px-4 py-2 border rounded-lg text-sm">
            <img src={gitLogo} alt="gitlogo" className="w-4 h-4" />
            GitHub
          </button>

          <button className="bg-[#55A6F6] px-4 py-2 text-[#161A1D] rounded-lg text-sm">
            Get started
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
