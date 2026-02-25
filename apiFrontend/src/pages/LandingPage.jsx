import Navbar from "../components/LandingPage/Navbar";
import Hero from "../components/LandingPage/Hero";
import Features from "../components/LandingPage/Features";
import Steps from "../components/LandingPage/Steps";
import CodeSection from "../components/LandingPage/CodeSection";
import Testimonials from "../components/LandingPage/Testimonials";
import Pricing from "../components/LandingPage/Pricing";
import FAQ from "../components/LandingPage/FAQ";
import CTA from "../components/LandingPage/CTA";
import Footer from "../components/LandingPage/Footer";

function LandingPage() {
  return (
    <div className="font-robotoMono ">
      <Navbar />
      <Hero />
      <Features />
      <Steps />
      <CodeSection />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}

export default LandingPage;
