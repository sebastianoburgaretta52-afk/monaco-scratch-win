import {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Sparkles, CheckCircle } from "lucide-react";

interface ScratchCardProps {
  onReveal: () => void;
  threshold?: number;
}

export interface ScratchCardRef {
  resetScratch: () => void;
  checkSubmissionStatus: () => void;
}

const ScratchCard = forwardRef<ScratchCardRef, ScratchCardProps>(
  ({ onReveal, threshold = 60 }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isScratching, setIsScratching] = useState(false);
    const [hasRevealed, setHasRevealed] = useState(false);
    const [scratchedPercentage, setScratchedPercentage] = useState(0);
    const [alreadySubmitted, setAlreadySubmitted] = useState(false);

    // Check se utente ha già mandato richiesta
    useEffect(() => {
      const submitted = localStorage.getItem("leadSubmitted");
      if (submitted === "true") {
        setAlreadySubmitted(true);
        setHasRevealed(true);
      }
    }, []);

    const drawOverlay = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();

      // Draw gold gradient overlay
      const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
      gradient.addColorStop(0, "#B8860B");
      gradient.addColorStop(0.5, "#FFD700");
      gradient.addColorStop(1, "#E6C200");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Add noise texture for metallic effect
      ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
      for (let i = 0; i < 150; i++) {
        ctx.fillRect(
          Math.random() * rect.width,
          Math.random() * rect.height,
          Math.random() * 2,
          Math.random() * 2
        );
      }

      // Add darker noise
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      for (let i = 0; i < 100; i++) {
        ctx.fillRect(
          Math.random() * rect.width,
          Math.random() * rect.height,
          Math.random() * 2,
          Math.random() * 2
        );
      }

      // Add text
      ctx.fillStyle = "rgba(139, 107, 0, 0.4)";
      ctx.font = "bold 24px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("GRATTA QUI", rect.width / 2, rect.height / 2);
    };

    const checkSubmissionStatus = () => {
      const submitted = localStorage.getItem("leadSubmitted");
      if (submitted === "true") {
        setAlreadySubmitted(true);
        setHasRevealed(true);
      }
    };

    const resetScratch = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      // Reset state
      setHasRevealed(false);
      setScratchedPercentage(0);
      setIsScratching(false);
      setAlreadySubmitted(false);

      // Redraw overlay
      drawOverlay();
    };

    useImperativeHandle(ref, () => ({
      resetScratch,
      checkSubmissionStatus,
    }));

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      // Set canvas size
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      // Don't draw overlay if already submitted
      if (!alreadySubmitted) {
        drawOverlay();
      }
    }, [alreadySubmitted]);

    const scratch = (x: number, y: number) => {
      const canvas = canvasRef.current;
      if (!canvas || hasRevealed || alreadySubmitted) return;

      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(
        (x - rect.left) * scaleX,
        (y - rect.top) * scaleY,
        30 * (window.devicePixelRatio || 1),
        0,
        Math.PI * 2
      );
      ctx.fill();

      // Calculate scratched percentage
      checkScratchedPercentage(ctx, canvas.width, canvas.height);
    };

    const checkScratchedPercentage = (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number
    ) => {
      if (hasRevealed || alreadySubmitted) return;

      const imageData = ctx.getImageData(0, 0, width, height);
      const pixels = imageData.data;
      let transparent = 0;

      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] < 128) transparent++;
      }

      const percentage = (transparent / (pixels.length / 4)) * 100;
      setScratchedPercentage(Math.round(percentage));

      if (percentage >= threshold && !hasRevealed) {
        setHasRevealed(true);

        // Trigger dataLayer event
        if (window.dataLayer) {
          window.dataLayer.push({
            event: "scratch_complete",
            scratch_percentage: percentage,
          });
        }

        // Delay to show the message
        setTimeout(() => {
          onReveal();
        }, 500);
      }
    };

    const handleMouseDown = () => {
      if (!alreadySubmitted) setIsScratching(true);
    };
    const handleMouseUp = () => setIsScratching(false);

    const handleMouseMove = (e: React.MouseEvent) => {
      if (isScratching && !alreadySubmitted) {
        scratch(e.clientX, e.clientY);
      }
    };

    const handleTouchMove = (e: React.TouchEvent) => {
      if (alreadySubmitted) return;
      e.preventDefault();
      const touch = e.touches[0];
      scratch(touch.clientX, touch.clientY);
    };

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas || alreadySubmitted) return;

      const handleTouchMoveNative = (e: TouchEvent) => {
        e.preventDefault();
        const touch = e.touches[0];
        scratch(touch.clientX, touch.clientY);
      };

      canvas.addEventListener("touchmove", handleTouchMoveNative, {
        passive: false,
      });

      return () => {
        canvas.removeEventListener("touchmove", handleTouchMoveNative);
      };
    }, [alreadySubmitted, isScratching]);

    return (
      <div className="relative w-full max-w-2xl mx-auto">
        <div className="scratch-card-container relative aspect-[16/9] rounded-2xl overflow-hidden shadow-[var(--shadow-premium)]">
          {/* Hidden message */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/90 flex items-center justify-center p-8">
            <div className="text-center space-y-4">
              {alreadySubmitted ? (
                <>
                  <CheckCircle className="w-16 h-16 mx-auto text-accent animate-pulse" />
                  <h3 className="text-2xl md:text-4xl font-bold text-primary-foreground">
                    Richiesta già inviata!
                  </h3>
                  <p className="text-lg md:text-xl text-primary-foreground/90">
                    Ti abbiamo già registrato per l'iniziativa
                  </p>
                </>
              ) : (
                <>
                  <Sparkles className="w-16 h-16 mx-auto text-accent animate-pulse" />
                  <h3 className="text-2xl md:text-4xl font-bold text-primary-foreground">
                    Hai sbloccato l'accesso!
                  </h3>
                  <p className="text-lg md:text-xl text-primary-foreground/90">
                    Compila i tuoi dati per partecipare
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Scratch overlay */}
          {!alreadySubmitted && (
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full cursor-pointer touch-none"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleMouseDown}
              onTouchEnd={handleMouseUp}
              aria-label="Gratta e vinci - gratta per rivelare il messaggio nascosto"
              role="button"
              tabIndex={0}
            />
          )}
        </div>

        {/* Progress indicator */}
        {!alreadySubmitted &&
          scratchedPercentage > 0 &&
          scratchedPercentage < threshold && (
            <div className="mt-4 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full">
                <div className="text-sm font-medium text-accent">
                  {scratchedPercentage}% sbloccato
                </div>
              </div>
            </div>
          )}

        {/* Instructions */}
        {!hasRevealed && !alreadySubmitted && scratchedPercentage === 0 && (
          <p className="mt-4 text-center text-muted-foreground text-sm">
            Usa il mouse o il dito per grattare e rivelare il messaggio
          </p>
        )}

        {/* Already submitted message */}
        {alreadySubmitted && (
          <div className="mt-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 rounded-full">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <div className="text-sm font-medium text-green-600">
                Registrazione completata
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

ScratchCard.displayName = "ScratchCard";

export default ScratchCard;
