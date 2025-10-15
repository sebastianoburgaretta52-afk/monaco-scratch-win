import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Termini = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Torna alla home
        </Link>
        
        <h1 className="text-4xl font-bold mb-8 text-foreground">Termini e Condizioni</h1>
        
        <div className="prose prose-lg max-w-none space-y-6 text-foreground">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">1. Promotore</h2>
            <p>
              L'iniziativa promozionale "Viaggio Business Monaco 2026" è organizzata da:<br />
              <strong>Luca Pacella</strong><br />
              Codice Fiscale: PCLLCU01T13D548E<br />
              Indirizzo: Via Martiri del Lavoro 19E
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">2. Durata della Promozione</h2>
            <p>
              <strong>Inizio</strong>: 15 ottobre 2025, ore 00:00 (fuso orario Europe/Rome)<br />
              <strong>Fine</strong>: 25 ottobre 2025, ore 23:59 (fuso orario Europe/Rome)<br />
              <strong>Estrazione</strong>: 26 ottobre 2025
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">3. Ambito Territoriale e Destinatari</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Ambito</strong>: Italia</li>
              <li><strong>Destinatari</strong>: persone fisiche maggiorenni (18+) residenti in Italia</li>
              <li>La partecipazione è gratuita e non richiede alcun acquisto</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">4. Modalità di Partecipazione</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Accedere alla landing page dell'iniziativa</li>
              <li>Grattare la "scratch card" virtuale fino a rivelare il messaggio nascosto</li>
              <li>Compilare il form di partecipazione con: nome completo, telefono, email</li>
              <li>Accettare l'Informativa Privacy e i presenti Termini e Condizioni</li>
              <li>Confermare l'invio del modulo</li>
            </ol>
            <p className="mt-4">
              Ogni partecipante può registrarsi una sola volta con la stessa email. Tentativi di partecipazione multipla 
              con dati duplicati verranno esclusi.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">5. Premio</h2>
            <p>
              <strong>Descrizione</strong>: Viaggio Business per Monaco 2026<br />
              <strong>Valore unitario indicativo</strong>: € 400,00 (IVA inclusa)<br />
              <strong>Numero vincitori</strong>: variabile/indeterminato, in base al budget disponibile
            </p>
            <p className="mt-4">
              Il premio include tipicamente trasporto e/o alloggio per l'evento a Monaco nel 2026. 
              I dettagli specifici (date, modalità, eventuali limitazioni) verranno comunicati ai vincitori al momento della notifica.
            </p>
            <p className="mt-2">
              <strong>Note</strong>: Il premio "Monaco 2026" è soggetto a disponibilità. Il Promotore si riserva il diritto di sostituire 
              il premio con uno di valore equivalente in caso di indisponibilità.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">6. Estrazione e Selezione dei Vincitori</h2>
            <p>
              L'estrazione avverrà tramite <strong>sorteggio casuale</strong> tra tutti i partecipanti validi che hanno completato 
              la registrazione entro il 25 ottobre 2025, ore 23:59.
            </p>
            <p className="mt-4">
              <strong>Data estrazione</strong>: 26 ottobre 2025<br />
              <strong>Modalità</strong>: estrazione a sorte utilizzando strumenti digitali certificabili
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">7. Comunicazione ai Vincitori</h2>
            <p>
              I vincitori verranno contattati via <strong>telefono e/o email</strong> entro 7 giorni lavorativi dall'estrazione.
            </p>
            <p className="mt-4">
              Il vincitore dovrà confermare l'accettazione del premio entro 10 giorni dalla notifica. In caso di mancata risposta 
              o rinuncia, il Promotore si riserva il diritto di assegnare il premio a un altro partecipante estratto.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">8. Fruizione del Premio</h2>
            <p>
              Il viaggio a Monaco si svolgerà indicativamente nel corso del <strong>2026</strong>, in date che verranno comunicate 
              ai vincitori con ragionevole anticipo.
            </p>
            <p className="mt-4">
              Il premio è personale e non cedibile a terzi. Non è convertibile in denaro né in altri beni o servizi.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">9. Esclusioni</h2>
            <p>Sono esclusi dalla partecipazione:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Minori di 18 anni</li>
              <li>Dipendenti del Promotore e loro familiari diretti</li>
              <li>Soggetti che forniscono dati falsi, incompleti o duplicati</li>
              <li>Partecipanti che violano i presenti Termini e Condizioni</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">10. Responsabilità</h2>
            <p>
              Il Promotore non è responsabile per:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Problemi tecnici, malfunzionamenti o interruzioni del servizio non imputabili al Promotore</li>
              <li>Dati errati o non aggiornati forniti dai partecipanti</li>
              <li>Impossibilità di contattare il vincitore per recapiti errati o non raggiungibili</li>
              <li>Modifiche o cancellazioni dell'evento "Monaco 2026" causate da forza maggiore</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">11. Privacy</h2>
            <p>
              Il trattamento dei dati personali avviene nel rispetto del GDPR (Regolamento UE 2016/679) e della normativa italiana applicabile. 
              Per maggiori dettagli, consultare l'<Link to="/privacy" className="text-accent hover:underline">Informativa Privacy</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">12. Modifiche e Sospensione</h2>
            <p>
              Il Promotore si riserva il diritto di modificare, sospendere o annullare l'iniziativa in caso di forza maggiore, 
              circostanze straordinarie o per ragioni organizzative. Eventuali modifiche saranno comunicate tempestivamente sulla landing page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">13. Legge Applicabile e Foro Competente</h2>
            <p>
              I presenti Termini e Condizioni sono regolati dalla legge italiana. Per qualsiasi controversia è competente 
              il foro del luogo di residenza del consumatore.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">14. Contatti</h2>
            <p>
              Per informazioni sull'iniziativa, contattare il Promotore tramite il modulo presente sulla landing page.
            </p>
            <p className="text-muted-foreground text-sm mt-4">Ultimo aggiornamento: 15 ottobre 2025</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Termini;
