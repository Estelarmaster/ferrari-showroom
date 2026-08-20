import { useInViewOnce } from "../../hooks/useInViewOnce";
import { CarScene } from "./CarScene";

interface Props {
  showHotspots?: boolean;
  interactive?: boolean;
  enableZoom?: boolean;
  shadows?: boolean;
  dpr?: [number, number];
  className?: string;
}

/**
 * Defers mounting a <CarScene> (and its WebGL context) until the container
 * is about to scroll into view. Running every 3D canvas on the page at once
 * is what causes the frame-rate stutter — this keeps it to one active
 * canvas most of the time.
 */
export function LazyCarScene({ className = "h-full w-full", ...sceneProps }: Props) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();

  return (
    <div ref={ref} className={className}>
      {inView ? (
        <CarScene {...sceneProps} />
      ) : (
        <div className="h-full w-full animate-pulse bg-gradient-to-br from-[#141414] to-[#050505]" aria-hidden="true" />
      )}
    </div>
  );
}
