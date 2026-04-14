import csx from "../lib/csx";

type ButtonVariantType = "standard" | "outline" | "glass";

const variantStyles: Record<
  ButtonVariantType,
  Record<string, string>
> = {
  standard: {
    apello: "bg-apello border-apello text-fauxblack hover:brightness-[0.8] active:brightness-[1.2]",
    green: "bg-green border-green text-fauxblack hover:brightness-[0.8] active:brightness-[1.2]",
    violet: "bg-violet border-violet text-white hover:brightness-[0.8] active:brightness-[1.2]",
    bleu: "bg-bleu border-bleu text-fauxblack hover:brightness-[0.8] active:brightness-[1.2]",
  },
  outline: {
    apello: "bg-transparent border-apello text-apello hover:bg-apello/10",
    green: "bg-transparent border-green text-green hover:bg-green/10",
    violet: "bg-transparent border-violet text-violet hover:bg-violet/10",
    bleu: "bg-transparent border-bleu text-bleu hover:bg-bleu/10",
  },
  glass: {
    apello: "bg-white/5 border-white/10 backdrop-blur-xl text-white hover:bg-white/10 hover:border-white/20 hover:shadow-glass",
    green: "bg-white/5 border-white/10 backdrop-blur-xl text-white hover:bg-white/10 hover:border-white/20 hover:shadow-glass",
    violet: "bg-white/5 border-white/10 backdrop-blur-xl text-white hover:bg-white/10 hover:border-white/20 hover:shadow-glass",
    bleu: "bg-white/5 border-white/10 backdrop-blur-xl text-white hover:bg-white/10 hover:border-white/20 hover:shadow-glass",
  },
};

interface ButtonProps {
  variant?: ButtonVariantType;
  color?: string;
  onClick?: (e: any) => void;
  inactive?: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function Button({
  variant = "standard",
  color = "apello",
  onClick = () => {},
  inactive = false,
  children,
  className,
}: ButtonProps) {
  const styles =
    variantStyles[variant]?.[color] ||
    variantStyles[variant]?.apello ||
    variantStyles.standard.apello;

  return (
    <button
      className={csx(
        "relative flex items-center justify-center gap-x-4",
        "px-[1.4em] py-[0.6em]",
        "rounded-xl",
        "border-2",
        styles,
        "tracking-wider",
        "duration-200 transition-all",
        inactive && "cursor-default opacity-50",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}