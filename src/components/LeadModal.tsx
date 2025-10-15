import { useState } from "react";
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
    .min(2, "Il nome deve contenere almeno 2 caratteri")
    .max(100, "Il nome deve contenere massimo 100 caratteri"),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9\s+()-]{8,20}$/, "Inserisci un numero di telefono valido"),
  email: z
    .string()
    .trim()
    .email("Inserisci un indirizzo email valido")
    .max(255, "L'email deve contenere massimo 255 caratteri"),
  consent: z.boolean().refine((val) => val === true, {
    message: "Devi accettare l'informativa privacy e i termini",
  }),
  honeypot: z.string().max(0), // Anti-spam honeypot
});

type FormData = z.infer<typeof formSchema>;

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LeadModal = ({ isOpen, onClose }: LeadModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      consent: false,
      honeypot: "",
    },
  });

  const consent = watch("consent");

  const onSubmit = async (data: FormData) => {
    // Check honeypot
    if (data.honeypot) {
      console.warn("Spam detected");
      return;
    }

    // Rate limiting check (client-side)
    const submitAttempts = JSON.parse(
      localStorage.getItem("submitAttempts") || "[]"
    );
    const now = Date.now();
    const recentAttempts = submitAttempts.filter(
      (timestamp: number) => now - timestamp < 3600000 // 1 hour
    );

    if (recentAttempts.length >= 3) {
      toast.error("Hai raggiunto il limite di tentativi. Riprova più tardi.");
      return;
    }

    setIsSubmitting(true);

    try {
      const webhookUrl = import.meta.env.VITE_SHEETS_WEBHOOK_URL;

      if (!webhookUrl) {
        throw new Error("Webhook URL non configurato");
      }

      // Prepare payload
      const payload = {
        name: data.name,
        phone: data.phone,
        email: data.email,
        consent_marketing: true,
        source_campaign: "ads_monaco_2026",
        timestamp: new Date().toISOString(),
        user_agent: navigator.userAgent,
      };

      // Send to Google Sheets webhook
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Errore nell'invio dei dati");
      }

      // Track successful submission
      recentAttempts.push(now);
      localStorage.setItem("submitAttempts", JSON.stringify(recentAttempts));

      // Track in dataLayer
      if ((window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: "lead_submit_success",
          lead_email: data.email,
        });
      }

      setIsSuccess(true);
      toast.success("Dati inviati con successo!");
    } catch (error) {
      console.error("Error submitting lead:", error);
      
      // Track error in dataLayer
      if ((window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: "sheets_sync_error",
          error_message: error instanceof Error ? error.message : "Unknown error",
        });
      }

      // Still show success to user (as per requirements)
      setIsSuccess(true);
      toast.success("Dati inviati con successo!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      setTimeout(() => setIsSuccess(false), 300);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        {isSuccess ? (
          <div className="text-center py-8 space-y-6">
            <CheckCircle2 className="w-20 h-20 mx-auto text-accent" />
            <DialogHeader>
              <DialogTitle className="text-3xl">
                Grazie! Ti contatteremo a breve
              </DialogTitle>
              <DialogDescription className="text-base mt-4">
                Riceverai tutte le informazioni e come si agirà per la partenza.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-3">
              <Button onClick={handleClose} size="lg" className="w-full">
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
              {/* Honeypot field - hidden from users */}
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
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefono *</Label>
                <Input
                  id="phone"
                  type="tel"
                  {...register("phone")}
                  placeholder="+39 123 456 7890"
                  disabled={isSubmitting}
                />
                {errors.phone && (
                  <p className="text-sm text-destructive">{errors.phone.message}</p>
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
                  <p className="text-sm text-destructive">{errors.email.message}</p>
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
                    Ho letto l'{" "}
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
