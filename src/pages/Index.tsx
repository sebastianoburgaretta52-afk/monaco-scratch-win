import { useRef, useState, useEffect } from "react";
import Hero from "@/components/Hero";
import ScratchCard, { ScratchCardRef } from "@/components/ScratchCard";
import LeadModal from "@/components/LeadModal";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  const scratchRef = useRef<HTMLDivElement>(null);
  const scratchCardRef = useRef<ScratchCardRef>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: "view_landing",
        page_title: "Viaggio Business Monaco 2026",
      });
    }
  }, []);

  const scrollToScratch = () => {
    scratchRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleReveal = () => {
    setIsModalOpen(true);
  };

  const handleCloseWithoutSubmit = () => {
    scratchCardRef.current?.resetScratch();
  };

  const handleSuccessfulSubmit = () => {
    // Ricontrolla lo stato di submission per mostrare "Richiesta già inviata"
    scratchCardRef.current?.checkSubmissionStatus();
  };

  return (
    <div className="min-h-screen bg-background">
      <Hero onScrollToScratch={scrollToScratch} />

      <section ref={scratchRef} className="py-20 bg-background">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Inizia a grattare!
            </h2>
            <p className="text-lg text-muted-foreground">
              Gratta la card sottostante per sbloccare il form di partecipazione
            </p>
          </div>
          <ScratchCard ref={scratchCardRef} onReveal={handleReveal} />
        </div>
      </section>

      <HowItWorks />
      <FAQ />
      <Footer />

      <LeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCloseWithoutSubmit={handleCloseWithoutSubmit}
        onSuccessfulSubmit={handleSuccessfulSubmit}
      />
    </div>
  );
};

export default Index;
