"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Simple IntersectionObserver-based reveal animation utility.
 * Adds `in-view` when the component enters the viewport.
 */
export default function Reveal({
  children,
  className = "",
  once = true,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  once?: boolean;
  delay?: 0 | 1 | 2 | 3;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  const delayClass = delay ? ` reveal-delay-${delay}` : "";

  return (
    <div ref={ref} className={`reveal${inView ? " in-view" : ""}${delayClass} ${className}`}>
      {children}
    </div>
  );
}
