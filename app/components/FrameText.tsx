"use client";
import { Fragment, useEffect, useRef, useState } from "react";

type Tag = "span" | "h1" | "h2" | "h3" | "p";

/**
 * Reveals text with a stepped, frame-by-frame keyframe as it scrolls into view.
 * Always splits on words first (so words never break across a line and stay
 * properly spaced); in "char" mode each word is further split into letters for
 * a per-letter reveal.
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

  const words = text.split(" ");
  const Component = as as React.ElementType;
  let delayIndex = 0;

  return (
    <Component ref={ref} className={`frame-text${inView ? " in-view" : ""} ${className}`}>
      {words.map((word, wi) => {
        const pieces = splitBy === "char" ? Array.from(word) : [word];
        return (
          <Fragment key={wi}>
            <span className="frame-text-word">
              {pieces.map((piece, pi) => (
                <span
                  key={pi}
                  className="frame-text-unit"
                  style={{ animationDelay: `${delayIndex++ * stagger}ms` }}
                >
                  {piece}
                </span>
              ))}
            </span>
            {wi < words.length - 1 ? " " : ""}
          </Fragment>
        );
      })}
    </Component>
  );
}
