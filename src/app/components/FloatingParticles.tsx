import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  opacitySpeed: number;
  type: "firefly" | "petal";
  angle: number;
  angleSpeed: number;
  color: string;
}

export function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const petalColors = ["#F2B5C5", "#EDD5C0", "#C9E4F0", "#F5C8D8", "#E8D5C4"];

    const createParticle = (): Particle => {
      const type = Math.random() > 0.4 ? "firefly" : "petal";
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: type === "firefly" ? Math.random() * 3 + 1 : Math.random() * 8 + 4,
        speedY: type === "firefly" ? (Math.random() - 0.5) * 0.4 : Math.random() * -0.5 - 0.2,
        speedX: type === "firefly" ? (Math.random() - 0.5) * 0.4 : (Math.random() - 0.5) * 0.3,
        opacity: Math.random(),
        opacitySpeed: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
        type,
        angle: Math.random() * Math.PI * 2,
        angleSpeed: (Math.random() - 0.5) * 0.04,
        color: type === "firefly" ? "#F5E6B0" : petalColors[Math.floor(Math.random() * petalColors.length)],
      };
    };

    for (let i = 0; i < 60; i++) {
      particles.current.push(createParticle());
    }

    const drawFirefly = (p: Particle) => {
      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, p.opacity));
      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
      gradient.addColorStop(0, p.color);
      gradient.addColorStop(0.4, "rgba(245, 230, 176, 0.4)");
      gradient.addColorStop(1, "rgba(245, 230, 176, 0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#FFFDE0";
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const drawPetal = (p: Particle) => {
      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(0.7, p.opacity));
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size, p.size * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current.forEach((p, i) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.opacity += p.opacitySpeed;
        p.angle += p.angleSpeed;

        if (p.opacity <= 0 || p.opacity >= 1) p.opacitySpeed *= -1;
        if (p.y < -20 || p.y > canvas.height + 20) {
          particles.current[i] = { ...createParticle(), y: canvas.height + 10 };
        }
        if (p.x < -20 || p.x > canvas.width + 20) {
          particles.current[i] = createParticle();
        }

        if (p.type === "firefly") drawFirefly(p);
        else drawPetal(p);
      });

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
