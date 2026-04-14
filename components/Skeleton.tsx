import csx from "../lib/csx";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "card" | "circle" | "rect";
}

export default function Skeleton({
  className,
  variant = "rect",
}: SkeletonProps) {
  const variantClasses = {
    text: "h-4 w-3/4 rounded",
    card: "h-64 w-full rounded-2xl",
    circle: "h-10 w-10 rounded-full",
    rect: "h-24 w-full rounded-xl",
  };

  return (
    <div
      className={csx(
        "bg-white/5 rounded shimmer-bg",
        variantClasses[variant],
        className
      )}
    />
  );
}