"use client";
import { useEffect, useRef, useState } from "react";

type Tag = "span" | "h1" | "h2" | "h3" | "p";

/**
 * Splits text into words/characters and reveals them with a stepped
 * (frame-by-frame, flipbook-style) keyframe animation as it scrolls into view.
 */
export default function FrameText({
  text,
  className = "",
  splitBy = "word",
  stagger = 40,
  once = true,
  as = "span",
}: {
  text: string;
  className?: string;
  splitBy?: "word" | "char";
  stagger?: number;
  once?: boolean;
  as?: Tag;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  const units = splitBy === "char" ? Array.from(text) : text.split(" ");
  const Component = as as React.ElementType;

  return (
    <Component ref={ref} className={`frame-text${inView ? " in-view" : ""} ${className}`}>
      {units.map((unit, i) => (
        <span key={i} className="frame-text-unit" style={{ animationDelay: `${i * stagger}ms` }}>
          {unit}
          {splitBy === "word" && i < units.length - 1 ? " " : ""}
        </span>
      ))}
    </Component>
  );
}
