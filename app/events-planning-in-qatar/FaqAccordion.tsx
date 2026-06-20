"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export type Faq = { q: string; a: string };

export default function FaqAccordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl divide-y divide-black/5 overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm dark:divide-white/10 dark:border-white/10 dark:bg-zinc-950">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-(--brand)/5 dark:hover:bg-white/5"
            >
              <span className="font-medium text-zinc-900 dark:text-zinc-100">{item.q}</span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-(--brand) transition-transform duration-300 dark:text-(--brand-accent) ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
