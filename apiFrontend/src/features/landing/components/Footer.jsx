import icon from "../image/icon.svg";
import message from "../image/message.svg";
import share from "../image/share.svg";
import github from "../image/github_logo.svg";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-gray-400 px-8 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        {/* Top grid */}
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg  flex items-center justify-center text-white font-bold">
                <img src={icon} className="text-white" alt="icon" />
              </div>
              <h3 className="text-white text-xl font-semibold">AutoAPI</h3>
            </div>

            <p className="leading-relaxed mb-6">
              The leading no-code backend generator for modern web developers.
              Simplify the stack, amplify the output.
            </p>

            {/* Social icons */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:border-indigo-500 cursor-pointer">
                <img src={github} alt="githubLogo" />
              </div>
              <div className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:border-indigo-500 cursor-pointer">
                <img src={share} alt="sharelogo" />
              </div>
              <div className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:border-indigo-500 cursor-pointer">
                <img src={message} alt="messagelogo" />
              </div>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              <li className="hover:text-white cursor-pointer">Features</li>
              <li className="hover:text-white cursor-pointer">Pricing</li>
              <li className="hover:text-white cursor-pointer">Integrations</li>
              <li className="hover:text-white cursor-pointer">Enterprise</li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              <li className="hover:text-white cursor-pointer">Documentation</li>
              <li className="hover:text-white cursor-pointer">API Reference</li>
              <li className="hover:text-white cursor-pointer">Tutorials</li>
              <li className="hover:text-white cursor-pointer">Release Notes</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
              <li className="hover:text-white cursor-pointer">Contact Us</li>
              <li className="hover:text-white cursor-pointer">GitHub Issues</li>
              <li className="hover:text-white cursor-pointer">
                Discord Community
              </li>
              <li className="hover:text-white cursor-pointer">Status Page</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 my-10"></div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <p>© 2024 Auto API Builder Inc. All rights reserved.</p>

          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-white cursor-pointer">
              Terms of Service
            </span>
            <span className="hover:text-white cursor-pointer">
              Cookie Policy
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
