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

        <h1 className="text-4xl font-bold mb-8 text-foreground">
          Termini e Condizioni
        </h1>

        <div className="prose prose-lg max-w-none space-y-6 text-foreground">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              1. Promotore
            </h2>
            <p>
              L&apos;iniziativa promozionale &quot;Viaggio Business Monaco
              2026&quot; (di seguito, l&apos;&quot;Iniziativa&quot;) è
              organizzata da:
              <br />
              <strong>Rush to Munich</strong>, rappresentato da{" "}
              <strong>Marina Caruso</strong>, con sede in{" "}
              <strong>Via Alberto Pansa 2, Reggio Emilia (RE), 42124</strong> e
              contatto email <strong>privacy@rushtomunich.com</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              2. Durata della Promozione
            </h2>
            <p>
              <strong>Inizio</strong>: 16 Novembre 2025, ore 00:00 (fuso orario
              Europe/Rome)
              <br />
              <strong>Fine</strong>: 31 Gennaio 2026, ore 23:59 (fuso orario
              Europe/Rome)
              <br />
              <strong>Estrazione</strong>: 01 Febbraio 2026
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              3. Ambito Territoriale e Destinatari
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Ambito</strong>: Italia
              </li>
              <li>
                <strong>Destinatari</strong>: persone fisiche maggiorenni (18+)
                residenti in Italia
              </li>
              <li>
                La partecipazione è gratuita e non richiede alcun acquisto
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              4. Modalità di Partecipazione
            </h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Accedere alla landing page dedicata all&apos;Iniziativa</li>
              <li>
                Interagire con la &quot;scratch card&quot; virtuale fino a
                rivelare il messaggio nascosto
              </li>
              <li>
                Compilare il form di partecipazione con i dati richiesti:{" "}
                <strong>nome</strong>, <strong>email</strong> e{" "}
                <strong>numero di telefono</strong>.
              </li>
              <li>
                Accettare l&apos;Informativa Privacy e i presenti Termini e
                Condizioni
              </li>
              <li>Confermare l&apos;invio del modulo</li>
            </ol>
            <p className="mt-4">
              Ogni partecipante può registrarsi una sola volta con la stessa
              combinazione di email e numero di telefono. Tentativi di
              partecipazione multipla con dati duplicati o falsi potranno essere
              esclusi.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              5. Premio
            </h2>
            <p>
              <strong>Descrizione</strong>: Viaggio Business per partecipare
              all&apos;evento a Monaco nel 2026.
              <br />
              <strong>Numero premi</strong>: <strong>1</strong> viaggio.
              <br />
              <strong>Valore unitario indicativo</strong>: € 400,00 (IVA
              inclusa).
            </p>
            <p className="mt-4">Il premio comprende indicativamente:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                n. 1 biglietto di ingresso per l&apos;evento &quot;Rush to
                Munich 2026&quot;;
              </li>
              <li>
                viaggio A/R da una località italiana concordata con il vincitore
                a Monaco (mezzo di trasporto definito dal Promotore);
              </li>
              <li>
                eventuale sistemazione in hotel per il periodo dell&apos;evento.
              </li>
            </ul>
            <p className="mt-4">
              Sono esclusi dal premio, a titolo esemplificativo e non esaustivo:
              pasti, spese personali, tasse di soggiorno, spostamenti non
              espressamente indicati, extra in hotel e tutto quanto non
              chiaramente incluso nella descrizione del premio.
            </p>
            <p className="mt-2">
              Il premio non è convertibile in denaro né in altri beni o servizi.
              In caso di indisponibilità per cause non imputabili al Promotore,
              il premio potrà essere sostituito con un premio di valore uguale o
              superiore.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              6. Estrazione e Selezione dei Vincitori
            </h2>
            <p>
              Alla data del <strong>01 Febbraio 2026</strong>, tra tutte le
              partecipazioni valide pervenute entro il 31 Gennaio 2026, ore
              23:59, verranno estratti con modalità casuale:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>
                n. 1 vincitore;{" "}
                <small className="text-gray-50">
                  (se sei donna hai più probabilità di vincere, se sei uomo non
                  partecipare.)
                </small>
              </li>
              <li>n. 1 eventuale riserva.</li>
            </ul>
            <p className="mt-4">
              L&apos;estrazione avverrà tramite sistema informatico di selezione
              casuale. In caso di rifiuto del premio, mancata risposta o
              impossibilità di contatto, il premio potrà essere assegnato alla
              prima riserva disponibile, seguendo l&apos;ordine di estrazione.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              7. Comunicazione ai Vincitori
            </h2>
            <p>
              I vincitori verranno contattati dal Promotore via{" "}
              <strong>telefono e/o email</strong> entro 7 giorni lavorativi
              dall&apos;estrazione.
            </p>
            <p className="mt-4">
              Il vincitore dovrà confermare l&apos;accettazione del premio entro{" "}
              <strong>10 giorni</strong> dalla notifica. In caso di mancata
              risposta entro il termine indicato, rifiuto o impossibilità di
              consegna, il premio potrà essere riassegnato ad una delle riserve.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              8. Fruizione del Premio
            </h2>
            <p>
              Il viaggio a Monaco si svolgerà indicativamente nel corso del{" "}
              <strong>2026</strong>, in date che verranno comunicate ai
              vincitori con congruo preavviso.
            </p>
            <p className="mt-4">
              Il premio è personale e non cedibile a terzi senza il consenso
              scritto del Promotore. Il premio non è convertibile in denaro né
              in altri vantaggi economici.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              9. Esclusioni
            </h2>
            <p>Sono esclusi dalla partecipazione:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Minori di 18 anni;</li>
              <li>Dipendenti e collaboratori continuativi del Promotore;</li>
              <li>Loro familiari diretti (coniuge, genitori, figli);</li>
              <li>
                Soggetti che forniscono dati falsi, incompleti o manifestamente
                non veritieri;
              </li>
              <li>
                Partecipanti che non rispettano i presenti Termini e Condizioni.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              10. Responsabilità
            </h2>
            <p>Il Promotore non è responsabile per:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Problemi tecnici, malfunzionamenti o interruzioni del servizio
                non imputabili al Promotore;
              </li>
              <li>
                Dati errati, incompleti o non aggiornati forniti dai
                partecipanti;
              </li>
              <li>
                Impossibilità di contattare il vincitore per recapiti errati,
                inesistenti o non raggiungibili;
              </li>
              <li>
                Modifiche, rinvii o cancellazioni dell&apos;evento &quot;Monaco
                2026&quot; dovuti a forza maggiore o circostanze indipendenti
                dalla volontà del Promotore.
              </li>
            </ul>
            <p className="mt-4">
              Resta ferma l&apos;applicazione delle norme inderogabili a tutela
              del consumatore previste dalla legge italiana.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              11. Privacy
            </h2>
            <p>
              Il trattamento dei dati personali dei partecipanti avviene nel
              rispetto del Regolamento (UE) 2016/679 (&quot;GDPR&quot;) e della
              normativa italiana applicabile. Per maggiori dettagli, consulta la{" "}
              <Link to="/privacy" className="text-accent hover:underline">
                Informativa Privacy
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              12. Modifiche e Sospensione
            </h2>
            <p>
              Il Promotore si riserva il diritto di modificare, sospendere o
              annullare l&apos;Iniziativa in caso di forza maggiore, circostanze
              straordinarie o per ragioni organizzative che ne compromettano il
              regolare svolgimento. Eventuali modifiche sostanziali saranno
              comunicate sulla landing page dell&apos;Iniziativa.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              13. Legge Applicabile e Foro Competente
            </h2>
            <p>
              I presenti Termini e Condizioni sono regolati dalla legge
              italiana. Per qualsiasi controversia relativa all&apos;Iniziativa
              è competente il foro del luogo di residenza o domicilio del
              consumatore.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              14. Contatti
            </h2>
            <p>
              Per informazioni sull&apos;Iniziativa o sui presenti Termini e
              Condizioni è possibile contattare il Promotore tramite il modulo
              presente sulla landing page o all&apos;indirizzo email{" "}
              <strong>privacy@rushtomunich.com</strong>.
            </p>
          </section>

          <p className="text-muted-foreground text-sm mt-4">
            <small mb-0>Ultimo aggiornamento: 13/11/2025</small> <br />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Termini;
