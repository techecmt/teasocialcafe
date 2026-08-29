"use client";

import { Check, Share2 } from "lucide-react";
import { useState } from "react";
import { trackLinkClick } from "./track";

/**
 * Opens the phone's native share sheet, falling back to copying the URL.
 *
 * `navigator.share` needs a secure context and a user gesture, and is absent
 * on most desktop browsers — the clipboard path covers both, and the button
 * confirms in place so nothing about the tap feels unanswered.
 */
export default function ShareButton({ className = "" }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  const onShare = async () => {
    const url = window.location.href;
    trackLinkClick({ title: "Share this page", group: "Quick actions", href: url });

    if (navigator.share) {
      try {
        await navigator.share({ title: "Tea Social Cafe", url });
        return;
      } catch {
        // Sheet dismissed, or sharing refused — fall through to copying.
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (insecure context / permission): nothing useful left
      // to do, and the address bar already shows the URL.
    }
  };

  return (
    <button type="button" onClick={onShare} className={className} aria-live="polite">
      {copied ? <Check className="h-5 w-5" /> : <Share2 className="h-5 w-5" />}
      {copied ? "Copied" : "Share"}
    </button>
  );
}
