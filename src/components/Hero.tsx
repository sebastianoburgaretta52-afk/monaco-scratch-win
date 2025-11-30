import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronDown, ExternalLink } from "lucide-react";

interface HeroProps {
  onScrollToScratch: () => void;
}

const Hero = ({ onScrollToScratch }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/images/munichBg.avif)",
        }}
      />

      {/* Blue overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0C2055]/45 to-[#0C2055]/30" />

      {/* Animated circles */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="flex flex-wrap justify-center gap-3 mt-8 mb-3">
            <Badge
              variant="secondary"
              className="px-4 py-2 text-sm text-primary-foreground bg-accent/30 hover:bg-accent/30 border-accent/60"
            >
              Nessun acquisto necessario
            </Badge>
            <Badge
              variant="secondary"
              className="px-4 py-2 text-sm bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground border-primary-foreground/60"
            >
              Valido fino al 31/01/2026
            </Badge>
          </div>
          <div className="mb-8">
            <Badge
              variant="secondary"
              className="mx-10 sm:mx-0 px-2 sm:px-4 py-2 text-sm bg-primary/50 hover:bg-primary/50 text-primary-foreground border-primary/60"
            >
              Solo un accesso disponibile per ciascun partecipante
            </Badge>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight">
            Vinci un Viaggio Business
            <span
              className="block mt-2 bg-clip-text text-transparent bg-[image:var(--gradient-accent)]"
              style={{
                backgroundImage: "var(--gradient-accent)",
              }}
            >
              a Monaco 2026
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl lg:text-2xl text-primary-foreground/90 max-w-2xl mx-auto font-bold leading-relaxed text-shadow-lg">
            Partecipa ora: gratti, lasci i tuoi contatti e, se selezionato,
            ricevi tutti i dettagli per volare a Monaco nel 2026.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button
              size="lg"
              onClick={onScrollToScratch}
              className="text-lg px-8 py-6 bg-accent hover:bg-accent/90 text-accent-foreground shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-premium)] transition-all duration-300 hover:scale-105"
            >
              Gratta per iniziare
              <ChevronDown className="ml-2 h-5 w-5 animate-bounce" />
            </Button>
          </div>

          {/* Legal links */}
          <div className="flex flex-wrap justify-center gap-4 text-sm text-primary-foreground/70">
            <Link
              to="/termini"
              className="hover:text-accent transition-colors inline-flex items-center gap-1"
            >
              Termini e Condizioni
              <ExternalLink className="w-3 h-3" />
            </Link>
            <span>•</span>
            <Link
              to="/privacy"
              className="hover:text-accent transition-colors inline-flex items-center gap-1"
            >
              Informativa Privacy
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-[60px] bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
