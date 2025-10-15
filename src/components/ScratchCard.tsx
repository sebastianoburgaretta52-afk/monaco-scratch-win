import { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";

interface ScratchCardProps {
  onReveal: () => void;
  threshold?: number;
}

const ScratchCard = ({ onReveal, threshold = 60 }: ScratchCardProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [hasRevealed, setHasRevealed] = useState(false);
  const [scratchedPercentage, setScratchedPercentage] = useState(0);

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

    // Draw scratch overlay with gradient
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, "#C0C0C0");
    gradient.addColorStop(0.5, "#E8E8E8");
    gradient.addColorStop(1, "#C0C0C0");
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Add texture
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
    for (let i = 0; i < 100; i++) {
      ctx.fillRect(
        Math.random() * rect.width,
        Math.random() * rect.height,
        Math.random() * 3,
        Math.random() * 3
      );
    }

    // Add text
    ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    ctx.font = "bold 24px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("GRATTA QUI", rect.width / 2, rect.height / 2);
  }, []);

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas || hasRevealed) return;

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
    if (hasRevealed) return;

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
      if ((window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: "scratch_complete",
          scratch_percentage: percentage
        });
      }
      
      // Delay to show the message
      setTimeout(() => {
        onReveal();
      }, 500);
    }
  };

  const handleMouseDown = () => setIsScratching(true);
  const handleMouseUp = () => setIsScratching(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isScratching) {
      scratch(e.clientX, e.clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    scratch(touch.clientX, touch.clientY);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-[var(--shadow-premium)] border-4 border-accent/20">
        {/* Hidden message */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/90 flex items-center justify-center p-8">
          <div className="text-center space-y-4">
            <Sparkles className="w-16 h-16 mx-auto text-accent animate-pulse" />
            <h3 className="text-2xl md:text-4xl font-bold text-primary-foreground">
              Hai sbloccato l'accesso!
            </h3>
            <p className="text-lg md:text-xl text-primary-foreground/90">
              Compila i tuoi dati per partecipare
            </p>
          </div>
        </div>

        {/* Scratch overlay */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full cursor-pointer touch-none"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
          onTouchMove={handleTouchMove}
          aria-label="Gratta e vinci - gratta per rivelare il messaggio nascosto"
          role="button"
          tabIndex={0}
        />
      </div>

      {/* Progress indicator */}
      {scratchedPercentage > 0 && scratchedPercentage < threshold && (
        <div className="mt-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full">
            <div className="text-sm font-medium text-accent">
              {scratchedPercentage}% sbloccato
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      {!hasRevealed && scratchedPercentage === 0 && (
        <p className="mt-4 text-center text-muted-foreground text-sm">
          Usa il mouse o il dito per grattare e rivelare il messaggio
        </p>
      )}
    </div>
  );
};

export default ScratchCard;
