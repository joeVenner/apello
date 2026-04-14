import csx from "../lib/csx";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: "violet" | "apello" | "none";
}

export default function GlassCard({
  children,
  className,
  hover = true,
  glow = "violet",
}: GlassCardProps) {
  const glowShadow =
    glow === "violet"
      ? "hover:shadow-[0_0_20px_rgba(108,99,255,0.3)]"
      : glow === "apello"
        ? "hover:shadow-[0_0_20px_rgba(230,150,0,0.3)]"
        : "";

  return (
    <div
      className={csx(
        "border border-white/10 bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden",
        hover &&
          "transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-glass hover:border-white/20",
        glowShadow,
        className
      )}
    >
      {children}
    </div>
  );
}