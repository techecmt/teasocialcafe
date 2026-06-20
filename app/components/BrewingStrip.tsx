import { Leaf, Coffee, CupSoda } from "lucide-react";
import Reveal from "./Reveal";
import FrameText from "./FrameText";

const steps = [
  { icon: Leaf, title: "Sourced", desc: "Premium leaves & beans, hand-picked for every cup." },
  { icon: Coffee, title: "Brewed", desc: "Freshly steeped and pulled to order — never sitting around.", steam: true },
  { icon: CupSoda, title: "Served", desc: "Shaken cold and finished with chewy tapioca pearls." },
];

function Steam() {
  return (
    <div className="pointer-events-none absolute -top-4 left-1/2 flex -translate-x-1/2 gap-1.5">
      <span className="steam-wisp" />
      <span className="steam-wisp [animation-delay:0.5s]" />
      <span className="steam-wisp [animation-delay:1s]" />
    </div>
  );
}

export default function BrewingStrip() {
  return (
    <section className="relative overflow-hidden py-16 md:py-20">
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-[#f7efe6] to-white dark:from-zinc-900 dark:to-black" />
      <div className="mx-auto max-w-6xl px-4 text-center">
        <FrameText as="h2" text="Brewed Fresh, Shaken with Love" className="font-subheading block text-xl md:text-2xl" />
        <span className="heading-accent mx-auto" />

        <div className="mt-12 grid gap-10 sm:grid-cols-3 md:gap-8">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) as 0 | 1 | 2 | 3}>
              <div className="flex flex-col items-center gap-3">
                <div
                  className="brew-float relative grid h-20 w-20 place-items-center rounded-full bg-(--brand) text-white shadow-lg shadow-(--brand)/30"
                  style={{ animationDelay: `${i * 0.4}s` }}
                >
                  {s.steam && <Steam />}
                  <s.icon className="h-9 w-9" strokeWidth={1.5} />
                </div>
                <h3 className="font-heading text-lg">{s.title}</h3>
                <p className="mx-auto max-w-xs text-sm text-zinc-600 dark:text-zinc-400">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
