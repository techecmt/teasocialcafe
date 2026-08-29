"use client";

import { X } from "lucide-react";
import { useEffect, useRef } from "react";

/** Panel background, exported so a sticky footer inside a sheet can match it. */
export const SHEET_BG = "bg-[#0b1817]/95";

/**
 * The modal shell both booking forms sit in.
 *
 * A bottom sheet on phones and a centred card from `sm` up, with the usual
 * obligations handled once: Escape and backdrop close it, the page behind is
 * scroll-locked (iOS will otherwise happily scroll the body under a fixed
 * overlay), and focus moves into the panel on open.
 */
export default function Sheet({
  open,
  onClose,
  title,
  subtitle,
  titleId,
  decoration,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  /** Must be unique per sheet — wires up `aria-labelledby`. */
  titleId: string;
  /** Optional decorative layer painted behind the header. */
  decoration?: React.ReactNode;
  children: React.ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    panelRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <button
        type="button"
        aria-label="Close form"
        onClick={onClose}
        className="animate-in fade-in absolute inset-0 bg-black/70 backdrop-blur-sm duration-200"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={`animate-in slide-in-from-bottom-6 fade-in relative flex max-h-[92dvh] w-full max-w-[30rem] flex-col overflow-hidden rounded-t-3xl border border-white/15 ${SHEET_BG} text-white shadow-2xl backdrop-blur-xl duration-300 outline-none sm:rounded-3xl`}
      >
        {decoration}

        <header className="relative flex items-start justify-between gap-4 px-5 pt-5 pb-4">
          <div>
            <h2 id={titleId} className="font-heading text-2xl leading-tight">
              {title}
            </h2>
            {subtitle && <p className="mt-1 text-xs text-white/55">{subtitle}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/15 bg-white/5 transition hover:bg-white/15 active:scale-95"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        {children}
      </div>
    </div>
  );
}
