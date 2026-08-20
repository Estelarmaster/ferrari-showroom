import { useEffect, useRef, useState } from "react";

/**
 * Becomes true once the element has entered the viewport, then stays true.
 * Used to defer mounting expensive WebGL canvases until they're about to be
 * scrolled into view, instead of running every <Canvas> on the page at once.
 */
export function useInViewOnce<T extends HTMLElement>(rootMargin = "200px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (inView || !ref.current) return;
    const node = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [inView, rootMargin]);

  return { ref, inView };
}
