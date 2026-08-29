"use client";

import { trackLinkClick } from "./track";

/**
 * Anchor that reports its own click to GTM before the browser navigates.
 *
 * The push is synchronous and the default navigation is left alone — no
 * preventDefault/setTimeout dance — because a queued dataLayer entry survives
 * the page unload here (GTM reads the array on load, and the tag fires from
 * the still-open tab for target=_blank links).
 */
export default function TrackedLink({
  href,
  title,
  group,
  external = true,
  className = "",
  children,
}: {
  href: string;
  /** Analytics label; the visible text lives in `children`. */
  title: string;
  group: string;
  /** tel:/mailto: links must stay in the same tab. */
  external?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onClick={() => trackLinkClick({ title, group, href })}
      className={className}
    >
      {children}
    </a>
  );
}
