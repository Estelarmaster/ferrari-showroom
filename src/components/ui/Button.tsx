import { useRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { useStore } from "../../store/useStore";

interface Props extends HTMLMotionProps<"button"> {
  variant?: "primary" | "ghost" | "outline";
  magnetic?: boolean;
}

export function Button({ variant = "primary", magnetic = true, className = "", children, ...rest }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const isTouchDevice = useStore((s) => s.isTouchDevice);
  const setCursorLabel = useStore((s) => s.setCursorLabel);

  const base =
    "relative inline-flex items-center justify-center gap-2 px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.25em] transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed";
  const variants: Record<string, string> = {
    primary: "bg-[var(--color-rosso)] text-white hover:bg-[var(--color-rosso-bright)]",
    ghost: "text-white hover:text-[var(--color-rosso-bright)]",
    outline: "border border-white/30 text-white hover:border-[var(--color-rosso)] hover:text-[var(--color-rosso-bright)]",
  };

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!magnetic || isTouchDevice || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
  };

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
    setCursorLabel(null);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onMouseEnter={() => !isTouchDevice && setCursorLabel("VIEW")}
      whileTap={{ scale: 0.96 }}
      style={{ transition: "transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)" }}
      className={`${base} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
