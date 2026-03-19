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
  return (
    <div className="bg-slate-950 text-white min-h-screen flex">
      {/* Sidebar */}
      <aside
        className={`${open ? "w-72" : "w-20"} border-r border-slate-800 bg-slate-950 p-4 sticky top-0 h-screen transition-all duration-300 flex flex-col`}
      >
        {/* Header */}
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

        {/* Nav */}
        <nav className="flex-1 space-y-2">
          {navItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <a
                key={i}
                href={`#${item.id}`}
                className="group flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-800 transition relative"
              >
                <Icon
                  size={18}
                  className="text-gray-400 group-hover:text-white"
                />

                {/* Text */}
                {open && (
                  <span className="text-sm text-gray-400 group-hover:text-white">
                    {item.name}
                  </span>
                )}

                {/* Tooltip (when collapsed) */}
                {!open && (
                  <span className="absolute left-full ml-3 whitespace-nowrap bg-slate-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                    {item.name}
                  </span>
                )}
              </a>
            );
          })}
        </nav>

        {/* Footer */}
        {open && (
          <div className="text-xs text-gray-500 mt-6 border-t border-slate-800 pt-4">
            Docs v1.0
          </div>
        )}
      </aside>

      {/* Content */}
      <main className="flex-1 px-20 py-16 space-y-24">
        {/* Introduction */}
        <Introduction />

        {/* Features */}
        <Features />

        {/* Quick Start */}
        <QuickStart />

        {/* Projects & Collections */}
        <ProjectCollection />

        {/* API & Swagger Usage */}
        <APIswagger />

        {/* Authentication */}
        <Authentication />

        {/* Deployment */}
        <Deployement />

        {/* error section */}
        <Error />

        {/* Best Practice section */}
        <BestPractices />

        {/* FAQ section */}
        <FAQSection />
      </main>
    </div>
  );
};

export default Docs;
