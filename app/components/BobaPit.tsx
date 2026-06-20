"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// three.js is heavy and touches window/document — load it only on the client,
// after mount, and never during SSR.
const Ballpit = dynamic(() => import("@/components/Ballpit"), { ssr: false });

// Boba pearl tones: dark tapioca browns through to a caramel highlight.
// (Hex as numbers, which is what three.js Color expects.)
const BOBA_COLORS = [0x3a2113, 0x241308, 0x4a2c17, 0x140b05];

export default function BobaPit({ className = "" }: { className?: string }) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    // Skip the simulation entirely for reduced-motion users.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // The collision step is O(n²) per frame, so keep the pearl count modest
    // on phones to stay smooth.
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    setCount(mobile ? 55 : 110);
  }, []);

  if (count === null) return null;

  return (
    <div className={className} aria-hidden="true">
      <Ballpit
        count={count}
        colors={BOBA_COLORS}
        gravity={0.6}
        friction={0.9975}
        wallBounce={0.95}
        followCursor
        minSize={0.6}
        maxSize={1.15}
        ambientIntensity={1.3}
        lightIntensity={240}
      />
    </div>
  );
}
