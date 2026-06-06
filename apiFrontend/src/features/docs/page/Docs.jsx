import React from "react";
import {useState} from "react";
import {
  Home,
  Zap,
  Layers,
  Code,
  Lock,
  Rocket,
  AlertCircle,
  BookOpen,
  HelpCircle,
  Menu,
  X,
} from "lucide-react";
import BestPractices from "../components/BestPractices";
import FAQSection from "../components/FAQSection";
import Introduction from "../components/Introduction";
import Features from "../components/Features";
import QuickStart from "../components/QuickStart";
import ProjectCollection from "../components/ProjectCollection";
import APIswagger from "../components/APIswagger";
import Authentication from "../components/Authentication";
import Deployement from "../components/Deployement";
import Error from "../components/Error";

const navItems = [
  {name: "Introduction", icon: Home, id: "introduction"},
  {name: "Features", icon: Zap, id: "features"},
  {name: "Quick Start", icon: Rocket, id: "quick-start"},
  {name: "Projects & Collections", icon: Layers, id: "projects-collections"},
  {name: "API & Swagger", icon: Code, id: "api-swagger"},
  {name: "Authentication", icon: Lock, id: "authentication"},
  {name: "Deployment", icon: Rocket, id: "deployment"},
  {name: "Errors", icon: AlertCircle, id: "errors"},
  {name: "Best Practices", icon: BookOpen, id: "best-practices"},
  {name: "FAQ", icon: HelpCircle, id: "faq"},
];

const Docs = () => {
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const NavContent = ({onLinkClick}) => (
    <>
      <nav className="flex-1 space-y-2">
        {navItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <a
              key={i}
              href={`#${item.id}`}
              onClick={onLinkClick}
              className="group flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-800 transition relative"
            >
              <Icon
                size={18}
                className="text-gray-400 group-hover:text-white shrink-0"
              />

              {/* Text — always shown on mobile drawer, conditional on desktop */}
              <span className={`text-sm text-gray-400 group-hover:text-white ${!open ? "hidden" : ""}`}>
                {item.name}
              </span>

              {/* Tooltip (when collapsed, desktop only) */}
              {!open && (
                <span className="absolute left-full ml-3 whitespace-nowrap bg-slate-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition hidden lg:block">
                  {item.name}
                </span>
              )}
            </a>
          );
        })}
      </nav>

      {open && (
        <div className="text-xs text-gray-500 mt-6 border-t border-slate-800 pt-4">
          Docs v1.0
        </div>
      )}
    </>
  );

  return (
    <div className="bg-slate-950 text-white min-h-screen flex">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-72 bg-slate-950 border-r border-slate-800 p-4 flex flex-col
          transform transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:hidden
        `}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-blue-400">AutoAPI</h2>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 rounded-lg hover:bg-slate-800 transition"
          >
            <X size={18} />
          </button>
        </div>
        <NavContent onLinkClick={() => setMobileOpen(false)} />
      </aside>

      {/* Desktop sidebar */}
      <aside
        className={`${open ? "w-72" : "w-20"} border-r border-slate-800 bg-slate-950 p-4 sticky top-0 h-screen transition-all duration-300 flex-col hidden lg:flex`}
      >
        <div
          className={`flex items-center ${open ? "justify-between" : "justify-center"} mb-8`}
        >
          {open && <h2 className="text-xl font-bold text-blue-400">AutoAPI</h2>}
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-lg hover:bg-slate-800 transition"
          >
            <Menu size={18} />
          </button>
        </div>
        <NavContent onLinkClick={null} />
      </aside>

      {/* Content */}
      <main className="flex-1 min-w-0 px-5 sm:px-10 md:px-16 lg:px-20 py-10 md:py-16 space-y-16 md:space-y-24">
        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-4"
        >
          <Menu size={16} /> Menu
        </button>

        <Introduction />
        <Features />
        <QuickStart />
        <ProjectCollection />
        <APIswagger />
        <Authentication />
        <Deployement />
        <Error />
        <BestPractices />
        <FAQSection />
      </main>
    </div>
  );
};

export default Docs;
