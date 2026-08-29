/**
 * Card chrome shared by the link rows and the booking trigger, so the button
 * that opens the reservation sheet is visually identical to a real link.
 *
 * Frosted panel over the video backdrop, 64px+ tall — a comfortable thumb
 * target on a phone.
 */
export const cardBase =
  "group flex w-full items-center gap-4 rounded-2xl border px-4 py-4 text-left transition duration-200 active:scale-[0.98]";

/* Dark-tinted frost rather than a light one: the wash over the video is now
   thin, so a translucent white panel could not guarantee contrast for white
   text against a bright frame. The blur still lets the drink read through. */
export const cardIdle =
  "border-white/20 bg-black/30 text-white backdrop-blur-md hover:border-white/40 hover:bg-black/40";

export const cardFeatured =
  "border-transparent bg-(--brand-accent) text-[#062b2a] shadow-lg shadow-black/30 hover:brightness-105";
