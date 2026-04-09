import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Steps from "../components/Steps";
import CodeSection from "../components/CodeSection";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import {useEffect} from "react";
import Lenis from "@studio-freight/lenis";

function LandingPage() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: false,
    });

    let rafId;

    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // ✅ Cleanup: destroy lenis and cancel the animation loop
    // This removes the "lenis lenis-smooth" classes from <html>
    // which were blocking scroll on the dashboard after navigation
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="font-robotoMono">
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
