import {useNavigate} from "react-router-dom";
const CTA = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-linear-to-r bg-[#55A6F6FF] text-white text-center py-24 px-6">
      <h2 className="text-[38px] font-bold mb-4">Stop Building Boilerplate</h2>

      <p className="text-indigo-100 max-w-xl mx-auto mb-10">
        Join 15,000+ developers who have reclaimed their time with Auto API
        Builder.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        {/* Primary */}
        <button
          onClick={() => navigate("/register")}
          className="bg-white text-black px-7 py-3 rounded-lg font-medium hover:scale-105 transition"
        >
          Create Project
        </button>

        {/* Secondary */}
        <button
          onClick={() => navigate("/docs")}
          className="border border-white px-7 py-3 rounded-lg font-medium hover:bg-white hover:text-black transition"
        >
          View Documentation
        </button>
      </div>
    </section>
  );
};

export default CTA;
