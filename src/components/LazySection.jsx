import { useState, useEffect, useRef } from "react";

export function LazySection({ children, minHeight = "600px", onVisible }) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          if (onVisible) requestAnimationFrame(() => onVisible());

          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "400px" }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [onVisible]);

  return (
    <div
      ref={containerRef}
      style={{ minHeight: isVisible ? "auto" : minHeight }}
      className="relative w-full"
    >
      {isVisible ? (
        children
      ) : (
        <div style={{ height: minHeight }} className="flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}