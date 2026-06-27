import Reveal from "./Reveal";
import CircularText from "./CircularText";
import FrameText from "./FrameText";
import BobaPit from "./BobaPit";

export default function Hero() {
  return (
    // `min-h-[88svh]` (small viewport height) keeps the hero from clipping/jumping
    // as the mobile browser's address bar shows and hides; the headline steps up
    // from text-4xl on phones so it never overflows narrow (320px) screens.
    <section
      id="home"
      className="relative isolate -mt-[72px] flex min-h-[88svh] items-center overflow-hidden pt-[72px]"
      aria-label="Hero"
    >
      {/* Layered background: warm tea gradient → bouncing boba pearls → scrim */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-linear-to-br from-[#241308] via-[#3a2113] to-[#0d0906]" />
        <BobaPit className="absolute inset-0" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="pointer-events-none absolute right-3 bottom-3 z-10 md:right-12 md:bottom-12">
        <CircularText
          text="BUBBLE TEA*SNACKS*COFFEE*"
          onHover="speedUp"
          spinDuration={20}
          className="w-20 h-20 sm:w-28 sm:h-28 md:w-48 md:h-48 opacity-80"
        />
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-4 py-20 text-center text-white">
        <Reveal>
          <span className="font-subheading rounded-full bg-white/10 px-3 py-1 text-xs ring-1 ring-white/20 backdrop-blur-sm md:text-sm">
            Doha&apos;s Original
          </span>
        </Reveal>
        <FrameText
          as="h1"
          text="Authentic Bubble Tea"
          splitBy="char"
          stagger={20}
          className="font-heading text-balance px-2 text-4xl leading-[1.08] [text-shadow:0_2px_24px_rgba(0,0,0,0.55)] sm:text-6xl md:text-8xl"
        />
        <Reveal delay={2}>
          <p className="max-w-2xl text-lg text-white/85 [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">
            Hot days or chill nights, Tea Social feels right.
          </p>
        </Reveal>
        <Reveal delay={3}>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <a href="https://app.boomingo.io/program/7551" className="hover-lift rounded-full bg-(--brand-accent) px-5 py-3 font-semibold text-[#073231] md:text-base">
              Join Loyalty Program
            </a>
            <a href="#menu" className="rounded-full border border-white/30 bg-white/5 px-5 py-3 font-medium backdrop-blur-sm hover:bg-white/15">
              Explore Menu
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
