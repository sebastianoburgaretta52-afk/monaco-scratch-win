import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .regex(
      /^[A-Za-zÀ-ÖØ-öø-ÿ]{2,}(?:\s[A-Za-zÀ-ÖØ-öø-ÿ]{2,})+$/,
      "Nome e Cognome non validi"
    ),
  phone: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "Inserisci un numero di telefono valido"),
  email: z
    .string()
    .trim()
    .email("Inserisci un indirizzo email valido")
    .regex(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Inserisci un indirizzo email valido"
    ),
  consent: z.boolean().refine((val) => val === true, {
    message: "Devi accettare l'informativa privacy e i termini",
  }),
  honeypot: z.string().max(0),
});

type FormData = z.infer<typeof formSchema>;

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCloseWithoutSubmit?: () => void;
  onSuccessfulSubmit?: () => void;
}

const LeadModal = ({
  isOpen,
  onClose,
  onCloseWithoutSubmit,
  onSuccessfulSubmit,
}: LeadModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      consent: false,
      honeypot: "",
    },
  });

  const consent = watch("consent");

  // Controllo localstorage
  useEffect(() => {
    const submitted = localStorage.getItem("leadSubmitted");
    if (submitted === "true") {
      setAlreadySubmitted(true);
      setIsSuccess(true);
    }
  }, [isOpen]);

  const splitFullName = (
    fullName: string
  ): { nome: string; cognome: string } => {
    const trimmed = fullName.trim().replace(/\s+/g, " ");
    const parts = trimmed.split(" ");

    if (parts.length === 0 || (parts.length === 1 && parts[0] === "")) {
      return { nome: "", cognome: "" };
    }

    if (parts.length === 1) {
      return { nome: parts[0], cognome: "" };
    }

    const cognome = parts[parts.length - 1];
    const nome = parts.slice(0, -1).join(" ");
    return { nome, cognome };
  };

  const checkEmailExists = async (email: string): Promise<boolean> => {
    const webhookUrl = import.meta.env.VITE_SHEETS_WEBHOOK_URL;

    if (!webhookUrl) {
      console.warn("Google Sheets webhook URL non configurato");
      return false;
    }

    try {
      const url = `${webhookUrl}?action=checkEmail&email=${encodeURIComponent(
        email.toLowerCase()
      )}`;
      const response = await fetch(url, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result = await response.json();
      return result.exists || false;
    } catch (error) {
      console.error("Errore nel controllo email:", error);
      return false;
    }
  };

  const sendToGoogleSheets = async (
    payload: {
      nome: string;
      cognome: string;
      telefono: string;
      email: string;
    },
    retryCount = 0
  ): Promise<{ success: boolean; error?: string }> => {
    const webhookUrl = import.meta.env.VITE_SHEETS_WEBHOOK_URL;

    if (!webhookUrl) {
      console.warn("Google Sheets webhook URL non configurato");
      return { success: false, error: "URL non configurato" };
    }

    console.log("Invio a Google Sheets:", payload);

    try {
      const params = new URLSearchParams({
        action: "addLead",
        nome: payload.nome,
        cognome: payload.cognome,
        email: payload.email,
        telefono: payload.telefono,
      });

      const url = `${webhookUrl}?${params.toString()}`;
      const response = await fetch(url, {
        method: "GET",
      });

      console.log("Response status:", response.status);

      const result = await response.json();
      console.log("Response result:", result);

      if (!result.success) {
        if (result.error === "EMAIL_EXISTS") {
          return { success: false, error: "EMAIL_EXISTS" };
        }
        throw new Error(result.error || "Errore sconosciuto");
      }

      return { success: true };
    } catch (error) {
      console.error(`Tentativo ${retryCount + 1} fallito:`, error);

      // Retry with exponential backoff (max 2 attempts)
      if (retryCount < 1) {
        const delay = Math.pow(2, retryCount) * 1000;
        await new Promise((resolve) => setTimeout(resolve, delay));
        return sendToGoogleSheets(payload, retryCount + 1);
      }

      if (window.dataLayer) {
        window.dataLayer.push({
          event: "sheets_sync_error",
          error_message:
            error instanceof Error ? error.message : "Unknown error",
        });
      }

      return {
        success: false,
        error: error instanceof Error ? error.message : "Errore sconosciuto",
      };
    }
  };

  const onSubmit = async (data: FormData) => {
    if (data.honeypot) {
      console.warn("Spam detected");
      return;
    }

    // Controllo se ha già mandato richiesta
    if (localStorage.getItem("leadSubmitted") === "true") {
      toast.error("Hai già inviato la tua richiesta");
      return;
    }

    setIsSubmitting(true);

    try {
      // Check se mail esiste già in Google Sheet
      const emailExists = await checkEmailExists(data.email);

      if (emailExists) {
        toast.error("Questa email è già stata registrata");
        setIsSubmitting(false);

        if (window.dataLayer) {
          window.dataLayer.push({
            event: "lead_duplicate_email",
            lead_email: data.email,
          });
        }
        return;
      }

      const { nome, cognome } = splitFullName(data.name);

      const payload = {
        nome,
        cognome,
        telefono: data.phone,
        email: data.email,
      };

      // Mando a Google Sheets
      const result = await sendToGoogleSheets(payload);

      if (!result.success) {
        if (result.error === "EMAIL_EXISTS") {
          toast.error("Questa email è già stata registrata");
        } else {
          toast.error("Errore durante l'invio. Riprova più tardi.");
        }
        setIsSubmitting(false);
        return;
      }

      // Successo
      setIsSuccess(true);
      localStorage.setItem("leadSubmitted", "true");
      localStorage.setItem("leadEmail", data.email);
      toast.success("Dati inviati con successo!");

      if (window.dataLayer) {
        window.dataLayer.push({
          event: "lead_submit_success",
          lead_email: data.email,
        });
      }
    } catch (error) {
      console.error("Errore nell'invio:", error);
      toast.error("Errore durante l'invio. Riprova più tardi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      if (!isSuccess && onCloseWithoutSubmit) {
        onCloseWithoutSubmit();
      }
    }
  };

  const handleRestart = () => {
    // Se l'invio è andato a buon fine, non resettare ma solo chiudere la modale
    if (isSuccess) {
      // Notifica il componente padre che la submission è avvenuta
      if (onSuccessfulSubmit) {
        onSuccessfulSubmit();
      }
      // Chiudi la modale
      onClose();
    } else {
      // Se NON è andato a buon fine (utente ha chiuso senza inviare), resetta tutto
      localStorage.removeItem("leadSubmitted");
      localStorage.removeItem("leadEmail");
      setIsSuccess(false);
      setAlreadySubmitted(false);
      reset();

      if (onCloseWithoutSubmit) {
        onCloseWithoutSubmit();
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        {isSuccess || alreadySubmitted ? (
          <div className="text-center py-8 space-y-6">
            <CheckCircle2 className="w-20 h-20 mx-auto text-accent" />
            <DialogHeader>
              <DialogTitle className="text-3xl">
                {alreadySubmitted
                  ? "Richiesta già inviata!"
                  : "Grazie! Ti contatteremo a breve"}
              </DialogTitle>
              <DialogDescription className="text-base mt-4">
                {alreadySubmitted
                  ? "Hai già completato la registrazione. Riceverai presto tutte le informazioni."
                  : "Riceverai tutte le informazioni e come si agirà per la partenza."}
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-3">
              <Button onClick={handleRestart} size="lg" className="w-full">
                Torna all'inizio
              </Button>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">
                Completa la tua partecipazione
              </DialogTitle>
              <DialogDescription>
                Inserisci i tuoi dati per partecipare all'estrazione
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <input
                type="text"
                {...register("honeypot")}
                style={{
                  position: "absolute",
                  left: "-9999px",
                  width: "1px",
                  height: "1px",
                }}
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="space-y-2">
                <Label htmlFor="name">Nome completo *</Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Mario Rossi"
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefono *</Label>
                <Input
                  id="phone"
                  type="tel"
                  {...register("phone")}
                  placeholder="3354567890"
                  disabled={isSubmitting}
                />
                {errors.phone && (
                  <p className="text-sm text-destructive">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="mario.rossi@email.com"
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="flex items-start space-x-3 pt-2">
                <Checkbox
                  id="consent"
                  checked={consent}
                  onCheckedChange={(checked) =>
                    setValue("consent", checked as boolean, {
                      shouldValidate: true,
                    })
                  }
                  disabled={isSubmitting}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="consent"
                    className="text-sm font-medium leading-relaxed cursor-pointer"
                  >
                    Ho letto l'
                    <Link
                      to="/privacy"
                      className="text-accent hover:underline"
                      target="_blank"
                    >
                      Informativa Privacy
                    </Link>{" "}
                    e accetto i{" "}
                    <Link
                      to="/termini"
                      className="text-accent hover:underline"
                      target="_blank"
                    >
                      Termini e Condizioni
                    </Link>
                    . Acconsento a essere ricontattato per questa iniziativa. *
                  </label>
                  {errors.consent && (
                    <p className="text-sm text-destructive">
                      {errors.consent.message}
                    </p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isSubmitting || !consent}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Invio in corso...
                  </>
                ) : (
                  "Conferma partecipazione"
                )}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LeadModal;
