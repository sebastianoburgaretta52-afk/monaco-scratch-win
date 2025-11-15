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

        <h1 className="text-4xl font-bold text-foreground">
          Informativa Privacy
        </h1>
        <p className="mb-8">
          (ai sensi degli artt. 13 e 14 del Regolamento UE 2016/679 – “GDPR”){" "}
        </p>

        <div className="prose prose-lg max-w-none space-y-6 text-foreground">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              1. Titolare del Trattamento
            </h2>
            <p>
              <strong>Rush to Munich</strong>, rappresentato da Marina Caruso{" "}
              <br />
              Sede: Via Alberto Pansa 2, Reggio Emilia (RE), 42124 <br />
              Email di contatto per la privacy: privacy@rushtomunich.com <br />
              Di seguito anche “Rush to Munich” o il “Titolare”.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              2. Finalità del Trattamento
            </h2>
            <p>
              Attraverso il sito e la partecipazione all’iniziativa “Vinci un
              Viaggio Business a Monaco 2026” vengono raccolti e trattati:
            </p>
            <p className="mt-2">
              {" "}
              <strong>
                2.1 Dati forniti volontariamente dall’utente
              </strong>: <br />
              partecipazione al concorso "Viaggio Business Monaco 2026",
              estrazione e comunicazione ai vincitori.
            </p>
            <ul className="list-disc pl-6">
              <li>Indirizzo email</li>
              <li>Numero di telefono</li>
              <li>Nome e Cognome</li>
              <li>Esito dell’interazione con la card “gratta e vinci”</li>
            </ul>

            <p className="mt-2">
              {" "}
              <strong>22.2 Dati di navigazione e tecnici</strong>: <br />
              durante la navigazione possono essere raccolti:
            </p>
            <ul className="list-disc pl-6">
              <li>dentificativi cookie o tecnologie simili</li>
            </ul>
            <p>
              Questi dati sono trattati principalmente in forma aggregata per
              finalità tecniche e statistiche. <br /> Il Titolare non richiede
              né tratta deliberatamente categorie particolari di dati (art. 9
              GDPR: es. dati sanitari, religione, opinioni politiche, ecc.).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              3. ⁠Finalità e basi giuridiche del trattamento
            </h2>
            <p>
              I dati personali sono trattati per le seguenti finalità: <br />{" "}
            </p>
            <p className="mt-2">
              {" "}
              <strong>
                A) Partecipazione all’iniziativa “Vinci un Viaggio Business a
                Monaco 2026”
              </strong>
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Permettere all’utente di accedere al gratta e vinci digitale;
              </li>
              <li>Consentire la compilazione del form di partecipazione;</li>
              <li>
                Gestire l’eventuale estrazione dei vincitori, come descritto nel
                Regolamento ufficiale dell’iniziativa.
              </li>
            </ul>
            <p>
              Base giuridica: <br />
              art. 6, par. 1, lett. b) GDPR – esecuzione di misure
              precontrattuali adottate su richiesta dell’interessato.
            </p>

            <p className="mt-2">
              {" "}
              <strong>
                B) Ricontatto informativo e gestione delle richieste
              </strong>
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Fornire informazioni sull’iniziativa, sull’estrazione e
                sull’eventuale premio;
              </li>
              <li>
                Rispondere a domande o richieste ricevute tramite i canali di
                contatto;
              </li>
              <li>
                Fornire maggiori dettagli sull’evento Rush to Munich / Monaco
                2026.
              </li>
            </ul>
            <p>
              Base giuridica: <br />
              aart. 6, par. 1, lett. a) GDPR – consenso espresso dall’utente
              tramite il form.
            </p>

            <p className="mt-2">
              {" "}
              <strong>
                C)Analisi statistiche, sicurezza e miglioramento del servizio{" "}
              </strong>
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Elaborazione di statistiche anonime o aggregate sull’uso del
                sito;
              </li>
              <li>
                Verifica del corretto funzionamento delle pagine e delle
                funzionalità (es. gratta e vinci, form, FAQ);
              </li>
              <li>
                Prevenzione e rilevazione di attività fraudolente o abusi;
              </li>{" "}
              <li>
                Ottimizzazione delle campagne pubblicitarie (es. Meta Ads).
              </li>
            </ul>
            <p>
              Base giuridica: <br />
              art. 6, par. 1, lett. f) GDPR – legittimo interesse del Titolare a
              mantenere sicuro ed efficiente il sito e a migliorare le proprie
              attività promozionali.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              4. Natura del conferimento dei dati
            </h2>
            <p>
              Il conferimento di email e numero di telefono per la finalità di
              cui al punto A) è necessario per partecipare all’iniziativa:{" "}
              <br /> in mancanza, non sarà possibile completare la
              registrazione.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              5. Modalità di Trattamento
            </h2>
            <p>Il trattamento dei dati avviene:</p>

            <ul className="list-disc pl-6">
              <li> Con strumenti informatici e telematici;</li>
              <li>
                Secondo principi di liceità, correttezza, trasparenza,
                minimizzazione e proporzionalità;
              </li>
              <li>
                Con misure di sicurezza tecniche ed organizzative adeguate (es.
                protocolli HTTPS, sistemi di autenticazione, backup e
                limitazione degli accessi).
              </li>
            </ul>

            <p>
              Il Titolare non effettua processi decisionali automatizzati che
              producano effetti giuridici sull’utente ai sensi dell’art. 22
              GDPR.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              6. Destinatari dei dati personali
            </h2>
            <p>I dati potranno essere comunicati a:</p>
            <p>
              1. Collaboratori e partner operativi coinvolti nella gestione
              dell’iniziativa e dell’evento Rush to Munich. <br />
              2. Soggetti pubblici o autorità competenti, quando ciò sia
              richiesto da obblighi di legge.
            </p>{" "}
            <p className="mt-2">
              Tutti i soggetti sopra indicati tratteranno i dati in qualità di
              Responsabili del trattamento (art. 28 GDPR), ove nominati, oppure
              come autorizzati sotto l’autorità del Titolare. I dati non sono
              oggetto di diffusione generalizzata né venduti a terzi.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              7. Periodo di conservazione dei dati
            </h2>
            <p>
              I dati personali saranno conservati per il tempo strettamente
              necessario alle finalità per cui sono stati raccolti, e in
              particolare:
            </p>
            <ul className="list-disc pl-6">
              <li>
                Dati relativi alla partecipazione all’iniziativa: fino alla
                conclusione dell’iniziativa e per un periodo massimo di 12 mesi
                successivi, per eventuali verifiche o contenziosi;
              </li>
              <li>
                Dati utilizzati per finalità di marketing: fino alla revoca del
                consenso da parte dell’utente e, in ogni caso, non oltre i
                termini massimi previsti dalla normativa applicabile;
              </li>
              <li>
                Dati tecnici e di navigazione: secondo quanto indicato nella
                Cookie Policy e comunque per un periodo non superiore a 24 mesi,
                salvo necessità di ulteriori conservazioni per motivi di
                sicurezza o obblighi di legge.
              </li>
            </ul>
            <p className="mt-2">
              Al termine dei periodi indicati, i dati saranno cancellati o
              anonimizzati in modo irreversibile.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              8. Diritti degli interessati
            </h2>
            <p>
              In qualità di interessato, l’utente può esercitare in qualsiasi
              momento i diritti previsti dagli artt. 15–22 GDPR, tra cui:
            </p>
            <ul className="list-disc pl-6">
              <li>
                Diritto di accesso: ottenere conferma che sia o meno in corso un
                trattamento di dati personali che lo riguardano e ricevere una
                copia di tali dati;
              </li>
              <li>
                Diritto di rettifica: ottenere la correzione di dati inesatti o
                l’integrazione di quelli incompleti;
              </li>
              <li>
                Diritto alla cancellazione (“diritto all’oblio”): ottenere la
                cancellazione dei dati nei casi previsti dall’art. 17 GDPR;
              </li>
              <li>
                Diritto di limitazione del trattamento: nei casi previsti
                dall’art. 18 GDPR;
              </li>{" "}
              <li>
                Diritto alla portabilità dei dati: ricevere i dati in formato
                strutturato, di uso comune e leggibile da dispositivo
                automatico, e trasmetterli a un altro titolare;
              </li>{" "}
              <li>
                Diritto di opposizione: opporsi in qualsiasi momento al
                trattamento basato sul legittimo interesse del Titolare o al
                trattamento per finalità di marketing diretto;
              </li>{" "}
              <li>
                Diritto di revoca del consenso: senza pregiudicare la liceità
                del trattamento basato sul consenso prima della revoca.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              9. Modalità di esercizio dei diritti
            </h2>
            <p>
              Per esercitare i propri diritti o ottenere qualsiasi informazione
              in merito al trattamento dei dati personali, l’utente può scrivere
              a: <strong>privacy@rushtomunich.com</strong>
            </p>
            <p className="mt-2">
              Il Titolare si impegna a rispondere alle richieste entro i termini
              previsti dall’art. 12 GDPR (normalmente 30 giorni).
            </p>
            <p className="mt-2">
              L’utente ha inoltre il diritto di proporre reclamo all’Autorità
              Garante per la Protezione dei Dati Personali competente (in
              Italia, il Garante Privacy – www.garanteprivacy.it) qualora
              ritenga che il trattamento violi la normativa applicabile.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              10. ⁠Cookie e strumenti di tracciamento
            </h2>
            <p>
              Il sito utilizza cookie tecnici, analitici e, previo consenso,
              cookie di profilazione e strumenti di tracciamento (ad es. Meta
              Pixel, Google Analytics o simili) per finalità statistiche e di
              marketing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              11.⁠ ⁠Modifiche alla presente informativa
            </h2>
            <p>
              Il Titolare si riserva il diritto di modificare o aggiornare in
              qualsiasi momento la presente informativa, anche in funzione di
              cambi normativi o evoluzioni dei servizi offerti.
            </p>
            <p className="mt-2">
              Il Titolare si riserva il diritto di modificare o aggiornare in
              qualsiasi momento la presente informativa, anche in funzione di
              cambi normativi o evoluzioni dei servizi offerti.
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

export default Privacy;
