import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Privacy = () => {
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
        
        <h1 className="text-4xl font-bold mb-8 text-foreground">Informativa Privacy</h1>
        
        <div className="prose prose-lg max-w-none space-y-6 text-foreground">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">1. Titolare del Trattamento</h2>
            <p>
              Il Titolare del trattamento dei dati personali è:<br />
              <strong>Luca Pacella</strong><br />
              Codice Fiscale: PCLLCU01T13D548E<br />
              Indirizzo: Via Martiri del Lavoro 19E<br />
              Contatto: tramite modulo presente sulla landing page
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">2. Finalità del Trattamento</h2>
            <p>I dati personali raccolti (nome, telefono, email) vengono trattati per le seguenti finalità:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Gestione dell'iniziativa promozionale</strong>: partecipazione al concorso "Viaggio Business Monaco 2026", estrazione e comunicazione ai vincitori.</li>
              <li><strong>Marketing diretto</strong> (previo consenso esplicito): invio di comunicazioni commerciali e promozionali relative a iniziative future.</li>
              <li><strong>Adempimenti di legge</strong>: obblighi fiscali, contabili e amministrativi.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">3. Base Giuridica</h2>
            <p>Il trattamento dei dati si basa su:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Consenso dell'interessato</strong> (art. 6, par. 1, lett. a GDPR) per la partecipazione all'iniziativa e per le attività di marketing.</li>
              <li><strong>Obblighi di legge</strong> (art. 6, par. 1, lett. c GDPR) per adempimenti fiscali e amministrativi.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">4. Periodo di Conservazione</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Dati per la gestione dell'iniziativa</strong>: 12 mesi dalla chiusura della promozione (26/10/2025).</li>
              <li><strong>Dati per marketing</strong>: 24 mesi dalla raccolta o fino a revoca del consenso.</li>
              <li><strong>Log tecnici e sicurezza</strong>: 12 mesi.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">5. Modalità di Trattamento</h2>
            <p>
              I dati sono trattati con strumenti elettronici e manuali, con misure di sicurezza adeguate per prevenire accessi non autorizzati, 
              perdita o divulgazione. Il trattamento è effettuato da personale autorizzato e, ove necessario, da fornitori terzi designati come Responsabili del Trattamento.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">6. Destinatari dei Dati</h2>
            <p>I dati personali possono essere comunicati a:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Fornitori di servizi di hosting e infrastruttura web</li>
              <li>Google Sheets per l'archiviazione dei lead</li>
              <li>Fornitori di servizi di captcha e anti-spam</li>
              <li>Eventuali consulenti fiscali e legali</li>
              <li>Autorità competenti, su richiesta di legge</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">7. Diritti dell'Interessato</h2>
            <p>Ai sensi degli articoli 15-22 del GDPR, l'interessato ha diritto di:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Accesso</strong>: ottenere conferma dell'esistenza dei propri dati e riceverne copia.</li>
              <li><strong>Rettifica</strong>: correggere dati inesatti o incompleti.</li>
              <li><strong>Cancellazione</strong>: richiedere la rimozione dei dati non più necessari.</li>
              <li><strong>Limitazione</strong>: limitare il trattamento in determinate circostanze.</li>
              <li><strong>Portabilità</strong>: ricevere i dati in formato strutturato e trasmetterli ad altro titolare.</li>
              <li><strong>Opposizione</strong>: opporsi al trattamento per motivi legittimi.</li>
              <li><strong>Revoca del consenso</strong>: revocare il consenso in qualsiasi momento, senza pregiudicare la liceità del trattamento pregresso.</li>
            </ul>
            <p className="mt-4">
              Per esercitare i propri diritti, contattare il Titolare tramite il modulo presente sulla landing page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">8. Reclamo</h2>
            <p>
              L'interessato ha diritto di proporre reclamo all'Autorità Garante per la Protezione dei Dati Personali 
              (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">www.garanteprivacy.it</a>).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">9. Modifiche</h2>
            <p>
              La presente Informativa può essere aggiornata periodicamente. La versione più recente sarà sempre disponibile su questa pagina.
            </p>
            <p className="text-muted-foreground text-sm mt-4">Ultimo aggiornamento: 15 ottobre 2025</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
