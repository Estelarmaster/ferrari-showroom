import { useEffect, useRef } from "react";
import { useStore } from "../../store/useStore";

export function CustomCursor() {
  const cursorLabel = useStore((s) => s.cursorLabel);
  const isTouchDevice = useStore((s) => s.isTouchDevice);
  const setIsTouchDevice = useStore((s) => s.setIsTouchDevice);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const touch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    setIsTouchDevice(touch);
    if (touch) return;

    document.body.classList.add("has-custom-cursor");

    const move = (e: PointerEvent) => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };
    window.addEventListener("pointermove", move);
    return () => {
      window.removeEventListener("pointermove", move);
      document.body.classList.remove("has-custom-cursor");
    };
  }, [setIsTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2 will-change-transform"
    >
      <div
        className={`flex items-center justify-center rounded-full border border-white/70 bg-white/5 backdrop-blur-sm transition-all duration-200 ${
          cursorLabel ? "h-16 w-16" : "h-3 w-3"
        }`}
      >
        {cursorLabel && <span className="text-[9px] font-semibold tracking-[0.2em] text-white">{cursorLabel}</span>}
      </div>
    </div>
  );
}
