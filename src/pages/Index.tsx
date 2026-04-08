import { useState, useEffect } from "react";
import { sections } from "@/components/shared";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import CalculatorSection from "@/components/Calculator";
import ResultsAndAbout from "@/components/ResultsAndAbout";

export default function Index() {
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--c-bg)] text-white font-body">
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden>
        <div className="grid-bg absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--c-bg)]/80 via-transparent to-[var(--c-bg)]/80" />
      </div>

      <HeroSection
        activeSection={activeSection}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        scrollTo={scrollTo}
      />
      <HowItWorksSection />
      <CalculatorSection />
      <ResultsAndAbout />
    </div>
  );
}
