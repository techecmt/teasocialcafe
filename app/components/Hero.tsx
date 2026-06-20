import Image from "next/image";
import Reveal from "./Reveal";
import CircularText from "./CircularText";
import FrameText from "./FrameText";

export default function Hero() {
  return (
    <section id="home" className="relative isolate -mt-[72px] pt-[72px]" aria-label="Hero">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/HeroImage.jpg"
          alt="Bubble tea background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
<div className="pointer-events-none absolute right-4 bottom-4 z-10 md:right-12 md:bottom-12">
  <CircularText
    text="BUBBLE TEA*SNACKS*COFFEE*"
    onHover="speedUp"
    spinDuration={20}
    className="w-32 h-32 md:w-48 md:h-48 opacity-80"
  />
</div>
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-28 text-center text-white">
        <Reveal>
          <span className="font-subheading rounded-full bg-white/10 px-3 py-1 text-xs md:text-sm">Doha&apos;s Original</span>
        </Reveal>
        <FrameText
          as="h1"
          text="Authentic Bubble Tea"
          splitBy="char"
          stagger={20}
          className="font-heading text-5xl md:text-8xl"
        />
        <Reveal delay={2}>
          <p className="max-w-2xl text-lg text-white/80">
            Hot days or chill nights, Tea Social feels right.
          </p>
        </Reveal>
        <Reveal delay={3}>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <a href="#loyalty" className="hover-lift rounded-full bg-(--brand) px-5 py-3 font-medium text-black/90 md:text-white md:text-base md:bg-white/15 md:hover:bg-white/25">
              Join Loyalty Program
            </a>
            <a href="#menu" className="rounded-full border border-white/30 px-5 py-3 font-medium hover:bg-white/10">Explore Menu</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
