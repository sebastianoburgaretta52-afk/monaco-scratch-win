import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          {/* Disclaimer */}
          <div className="bg-primary-foreground/10 rounded-lg p-6 mb-8">
            <p className="text-sm leading-relaxed text-primary-foreground/90">
              <strong>Disclaimer:</strong> Nessun acquisto necessario.
              Iniziativa valida dal 15/11/2025 al 31/01/2026. Estrazione
              prevista per il 01/02/2026. Per il regolamento completo e
              l'informativa privacy, consulta i link indicati di seguito. "Rush
              to Munich 2026" soggetto a disponibilità.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <Link
              to="/termini"
              className="text-primary-foreground/80 hover:text-accent transition-colors text-sm font-medium"
            >
              Termini e Condizioni
            </Link>
            <span className="text-primary-foreground/40">•</span>
            <Link
              to="/privacy"
              className="text-primary-foreground/80 hover:text-accent transition-colors text-sm font-medium"
            >
              Informativa Privacy
            </Link>
          </div>

          {/* Promoter info */}
          <div className="text-center space-y-2 pt-8 border-t border-primary-foreground/20">
            <p className="text-sm text-primary-foreground/70">
              Promotore: <strong>Rush to Munich</strong> rappresentato da Marina
              Caruso
            </p>
            <p className="text-xs text-primary-foreground/50 mt-4">
              © 2025 Rush to Munich 2026. Tutti i diritti riservati.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
