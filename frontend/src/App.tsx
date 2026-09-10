import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Lenis from "lenis";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import WhatsAppButton from "@/components/site/WhatsAppButton";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import ServiceDetail from "@/pages/ServiceDetail";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import EpcCapabilities from "@/pages/EpcCapabilities";
import Experience from "@/pages/Experience";
import QualityHse from "@/pages/QualityHse";
import Careers from "@/pages/Careers";
import Contact from "@/pages/Contact";
import LegalPage, { PRIVACY_SECTIONS, TERMS_SECTIONS } from "@/pages/Legal";

function ScrollManager() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollManager />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/epc-capabilities" element={<EpcCapabilities />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/quality-hse" element={<QualityHse />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<LegalPage eyebrow="Legal" title="Privacy Policy" sections={PRIVACY_SECTIONS} testId="privacy-policy-page" />} />
        <Route path="/terms-and-conditions" element={<LegalPage eyebrow="Legal" title="Terms & Conditions" sections={TERMS_SECTIONS} testId="terms-page" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
      <WhatsAppButton />
      <Toaster />
    </div>
  );
}
