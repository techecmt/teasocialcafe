"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Poster-first video layer for the drink clips in /public/videos.
 *
 * The poster JPG is always rendered and is what phones get, full stop — a
 * decorative loop is not worth ~1MB of mobile data, and keeping the still as
 * the paint target protects LCP. The <video> is only mounted once we know the
 * viewport is a desktop-sized one that hasn't asked for reduced motion, so the
 * media bytes are never even requested otherwise. It then crossfades in over
 * the poster, which keeps the swap from flashing.
 *
 * `trigger` picks when playback starts:
 *   auto   — as soon as it mounts (hero / section backgrounds)
 *   inview — when scrolled into view, paused again on the way out
 *   hover  — on pointer hover or keyboard focus of the wrapping card
 */
type Trigger = "auto" | "inview" | "hover";

type Props = {
  /** Basename in /public/videos, e.g. "taiwanese-boba". */
  slug: string;
  /** Resting image. Defaults to the frame extracted from the clip itself. */
  poster?: string;
  trigger?: Trigger;
  /** Set on the one poster that is above the fold. */
  priority?: boolean;
  sizes?: string;
  /** Applied to the positioned wrapper — the caller owns layout. */
  className?: string;
  /** Applied to both media layers, for object-position / scale tweaks. */
  mediaClassName?: string;
};

export default function ProductVideo({
  slug,
  poster,
  trigger = "auto",
  priority = false,
  sizes = "100vw",
  className = "",
  mediaClassName = "",
}: Props) {
  const posterSrc = poster ?? `/videos/${slug}.jpg`;

  const [allowed, setAllowed] = useState(false);
  const [active, setActive] = useState(trigger === "auto");
  const [ready, setReady] = useState(false);
  // Latches on first activation: the element stays in the DOM afterwards so
  // leaving a card fades back to the poster instead of popping.
  const [mounted, setMounted] = useState(trigger === "auto");
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Mounting latches on alongside the first activation, never inside an
  // effect, so a hover or scroll-in doesn't cascade an extra render pass.
  const activate = (on: boolean) => {
    setActive(on);
    if (on) setMounted(true);
  };

  // Gate on capability, not on user agent. Hover-triggered cards additionally
  // require a real pointer so touch devices never get a loop they can't start.
  useEffect(() => {
    const query =
      trigger === "hover"
        ? "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
        : "(min-width: 768px) and (prefers-reduced-motion: no-preference)";
    const mq = window.matchMedia(query);
    const sync = () => setAllowed(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [trigger]);

  // Play/pause on scroll for the showcase grid, so four clips are never
  // decoding at once while off screen.
  useEffect(() => {
    if (!allowed || trigger !== "inview") return;
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => activate(entry.isIntersecting),
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [allowed, trigger]);

  // Drive the element from `active` rather than calling play() inline, so the
  // first hover still works on the render that mounts the <video>.
  useEffect(() => {
    if (!allowed) return;
    const v = videoRef.current;
    if (!v) return;
    if (active) {
      // Autoplay can still be refused (Low Power Mode, data saver); the poster
      // stays visible underneath, so there is nothing to recover from.
      v.play().catch(() => {});
    } else {
      v.pause();
      v.currentTime = 0;
    }
  }, [active, allowed]);

  const hoverProps =
    trigger === "hover"
      ? {
          onPointerEnter: () => activate(true),
          onPointerLeave: () => activate(false),
          onFocus: () => activate(true),
          onBlur: () => activate(false),
        }
      : {};

  return (
    <div ref={wrapRef} className={className} aria-hidden="true" {...hoverProps}>
      <Image
        src={posterSrc}
        alt=""
        fill
        priority={priority}
        sizes={sizes}
        className={`object-cover ${mediaClassName}`}
      />
      {allowed && mounted && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="auto"
          poster={posterSrc}
          onCanPlay={() => setReady(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            active && ready ? "opacity-100" : "opacity-0"
          } ${mediaClassName}`}
        >
          <source src={`/videos/${slug}.webm`} type="video/webm" />
          <source src={`/videos/${slug}.mp4`} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
