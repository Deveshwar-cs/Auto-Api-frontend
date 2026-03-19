import icon from "../image/icon.svg";
import message from "../image/message.svg";
import share from "../image/share.svg";
import github from "../image/github_logo.svg";
import {useNavigate} from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  const openGithub = () => {
    window.open(
      "https://github.com/Deveshwar-cs/Auto-Api-frontend",
      "_blank",
      "noopener,noreferrer",
    );
  };

  const scrollToSection = (id) => {
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({behavior: "smooth"});
    }
  };

  return (
    <footer className="bg-slate-950 text-gray-400 px-8 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        {/* Grid */}
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div
              onClick={() => navigate("/")}
              className="flex items-center gap-3 mb-4 cursor-pointer"
            >
              <img src={icon} className="w-9 h-9" alt="logo" />
              <h3 className="text-white text-xl font-semibold">AutoAPI</h3>
            </div>

            <p className="leading-relaxed mb-6 text-gray-400">
              Generate production-ready backend APIs instantly. Focus on
              building products — not boilerplate.
            </p>

            {/* Social */}
            <div className="flex gap-4">
              <div
                onClick={openGithub}
                className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center cursor-pointer hover:border-indigo-500 hover:scale-110 transition"
              >
                <img src={github} alt="github" />
              </div>

              <div
                onClick={() =>
                  navigator.share({
                    title: "AutoAPI",
                    text: "Check out this backend generator!",
                    url: window.location.href,
                  })
                }
                className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center cursor-pointer hover:border-indigo-500 hover:scale-110 transition"
              >
                <img src={share} alt="instagram" />
              </div>

              <div
                onClick={() => window.open("mailto:goboby744@gmail.com")}
                className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center cursor-pointer hover:border-indigo-500 hover:scale-110 transition"
              >
                <img src={message} alt="message" />
              </div>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>

            <ul className="space-y-3">
              <li
                onClick={() => scrollToSection("#features")}
                className="hover:text-white cursor-pointer transition"
              >
                Features
              </li>

              <li
                onClick={() => scrollToSection("#pricing")}
                className="hover:text-white cursor-pointer transition"
              >
                Pricing
              </li>

              <li
                onClick={() => scrollToSection("#steps")}
                className="hover:text-white cursor-pointer transition"
              >
                How it Works
              </li>

              <li
                onClick={() => navigate("/register")}
                className="hover:text-white cursor-pointer transition"
              >
                Get Started
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>

            <ul className="space-y-3">
              <li
                onClick={() => navigate("/docs")}
                className="hover:text-white cursor-pointer transition"
              >
                Documentation
              </li>

              <li
                onClick={() => navigate("/docs")}
                className="hover:text-white cursor-pointer transition"
              >
                API Reference
              </li>

              <li
                onClick={() => navigate("/docs")}
                className="hover:text-white cursor-pointer transition"
              >
                Tutorials
              </li>

              <li
                onClick={openGithub}
                className="hover:text-white cursor-pointer transition"
              >
                GitHub Repository
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>

            <ul className="space-y-3">
              <li
                onClick={() => window.open("mailto:goboby744@gmail.com")}
                className="hover:text-white cursor-pointer transition"
              >
                Contact
              </li>

              <li
                onClick={openGithub}
                className="hover:text-white cursor-pointer transition"
              >
                GitHub Issues
              </li>

              <li
                onClick={() =>
                  window.open("https://discord.gg/2kkxeUCBsr", "_blank")
                }
                className="hover:text-white cursor-pointer transition"
              >
                Discord Community
              </li>

              <li className="hover:text-white cursor-pointer transition">
                Status Page
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 my-10"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between gap-6 items-center">
          <p className="text-sm">© {year} AutoAPI. Built for developers.</p>

          <div className="flex gap-6 text-sm">
            <span className="hover:text-white cursor-pointer transition">
              Privacy Policy
            </span>

            <span className="hover:text-white cursor-pointer transition">
              Terms of Service
            </span>

            <span className="hover:text-white cursor-pointer transition">
              Cookie Policy
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
