"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/** Smallest clip in /public/videos (577 KB webm) — this one plays on phones. */
const SLUG = "taiwanese-boba";

/**
 * Fixed drink loop behind the links list.
 *
 * Unlike ProductVideo — which refuses to send video bytes to phones at all —
 * this page is opened almost entirely on mobile, so a poster-only backdrop
 * would mean nobody ever sees the loop. The compromise: the poster is always
 * what paints first (so LCP never waits on media), and the video is only
 * mounted after mount when the device hasn't asked for reduced motion and
 * isn't on Data Saver or a 2G-class connection.
 */
/** True on Data Saver or a 2G-class connection, where ~600 KB of loop is rude. */
function isMetered() {
  const connection = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;
  if (!connection) return false;
  return Boolean(connection.saveData) || /(^|-)2g$/.test(connection.effectiveType ?? "");
}

export default function VideoBackdrop() {
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Same capability-gated pattern as ProductVideo: state is only ever set
    // from the matchMedia subscription, so a change to the OS reduced-motion
    // setting takes effect without a reload.
    const mq = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const sync = () => setMounted(mq.matches && !isMetered());
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Autoplay can still be refused (low power mode, browser policy). The poster
  // stays underneath in that case, so failure is invisible.
  useEffect(() => {
    if (mounted) videoRef.current?.play().catch(() => {});
  }, [mounted]);

  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden bg-[#04100f]">
      <Image
        src={`/videos/${SLUG}.jpg`}
        alt=""
        fill
        priority
        sizes="100vw"
        className="scale-105 object-cover brightness-110 saturate-[1.15]"
      />
      {mounted && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          poster={`/videos/${SLUG}.jpg`}
          onCanPlay={() => setReady(true)}
          className={`absolute inset-0 h-full w-full scale-105 object-cover brightness-110 saturate-[1.15] transition-opacity duration-1000 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={`/videos/${SLUG}.webm`} type="video/webm" />
          <source src={`/videos/${SLUG}.mp4`} type="video/mp4" />
        </video>
      )}
      {/* Legibility wash, kept as light as the text allows so the drink is
          actually the star. It is graded rather than flat: darkest at the very
          top and bottom, where the logo and footer text sit directly on the
          video, and near-clear through the middle, where the link cards carry
          their own frosted panel and need no help. */}
      <div className="absolute inset-0 bg-[radial-gradient(125%_80%_at_50%_0%,rgba(6,43,42,0.30),rgba(0,0,0,0.55))]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.55),rgba(0,0,0,0.12)_28%,rgba(0,0,0,0.12)_68%,rgba(0,0,0,0.6))]" />
    </div>
  );
}
