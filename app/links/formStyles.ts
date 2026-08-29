/** Field, label and chip styling shared by the booking sheets. */
export const fieldClass =
  "w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-3 text-[15px] text-white placeholder-white/35 outline-none transition focus:border-(--brand-accent) focus:bg-white/10";

export const labelClass =
  "font-subheading mb-2 flex items-center gap-1.5 text-[11px] text-white/55";

export const chipClass = (active: boolean) =>
  `rounded-full border px-3.5 py-2 text-[13px] transition active:scale-95 ${
    active
      ? "border-(--brand-accent) bg-(--brand-accent)/15 text-(--brand-accent)"
      : "border-white/15 bg-white/5 text-white/70 hover:border-white/35 hover:text-white"
  }`;
