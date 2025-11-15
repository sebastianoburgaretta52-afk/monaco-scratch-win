import { MousePointer2, FileText, Trophy } from "lucide-react";

const steps = [
  {
    icon: MousePointer2,
    title: "1. Gratta",
    description:
      "Gratta la card virtuale per sbloccare l'accesso al form di partecipazione",
  },
  {
    icon: FileText,
    title: "2. Compila",
    description:
      "Inserisci i tuoi dati: nome, telefono ed email per partecipare all'estrazione",
  },
  {
    icon: Trophy,
    title: "3. Vinci",
    description:
      "Estrazione il 01/02/2026. I vincitori verranno contattati per ricevere tutti i dettagli",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            Come funziona
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Tre semplici passi per partecipare
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative bg-card p-8 rounded-2xl shadow-lg hover:shadow-[var(--shadow-premium)] transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-accent/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
