import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Quanto costa partecipare?",
    answer:
      "La partecipazione è completamente gratuita. Non è richiesto alcun acquisto per partecipare all'estrazione.",
  },
  {
    question: "Quando avverrà l'estrazione?",
    answer:
      "L'estrazione si terrà il 26 ottobre 2025. I vincitori saranno contattati via telefono e/o email entro 7 giorni lavorativi dall'estrazione.",
  },
  {
    question: "Qual è il valore del premio?",
    answer:
      "Il premio consiste in un Viaggio Business per Monaco 2026 del valore indicativo di € 400,00 (IVA inclusa). Include tipicamente trasporto e/o alloggio per l'evento.",
  },
  {
    question: "Come vengono utilizzati i miei dati?",
    answer:
      "I tuoi dati personali vengono utilizzati esclusivamente per la gestione dell'iniziativa promozionale e per contattarti in caso di vincita. Se acconsenti, potranno essere utilizzati anche per inviarti comunicazioni commerciali. Per maggiori dettagli, consulta l'Informativa Privacy.",
  },
  {
    question: "Posso partecipare più volte?",
    answer:
      "Ogni partecipante può registrarsi una sola volta con la stessa email. Tentativi di partecipazione multipla con dati duplicati verranno esclusi.",
  },
  {
    question: "Chi può partecipare?",
    answer:
      "Possono partecipare tutte le persone fisiche maggiorenni (18+) residenti in Italia.",
  },
];

const FAQ = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            Domande frequenti
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Tutto quello che devi sapere
          </p>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-lg px-6 border-0 shadow-sm"
              >
                <AccordionTrigger className="text-left hover:text-accent transition-colors">
                  <span className="font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
