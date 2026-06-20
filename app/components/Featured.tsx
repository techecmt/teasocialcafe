import Image from "next/image";
import Reveal from "./Reveal";
import FrameText from "./FrameText";

const items = [
  {
    title: "Signature Bubble Tea",
    img: "/BubbleTea-Section-1.png",
    desc: "Chewy pearls, creamy blends, pure joy.",
  },
  {
    title: "Craft Coffee",
    img: "/Coffee-section2.png",
    desc: "Silky cappuccinos and rich lattes.",
  },
  {
    title: "Fresh Snacks",
    img: "/Snacks-section1.png",
    desc: "Waffles, croissants, and sweet treats.",
  },
];

export default function Featured() {
  return (
    <section id="menu" className="mx-auto my-24 max-w-6xl px-4">
      <FrameText
        as="h2"
        text="Customer Favorites"
        className="font-subheading block text-center text-xl md:text-2xl"
      />
      <span className="heading-accent mx-auto" />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {items.map((it, i) => (
          <Reveal key={it.title} delay={(i % 3) as 0 | 1 | 2 | 3}>
            <div className="hover-lift group overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-shadow hover:shadow-xl hover:shadow-(--brand)/15 dark:border-white/10 dark:bg-zinc-950">
              <div className="relative aspect-4/3 overflow-hidden">
                <Image
                  src={it.img}
                  alt={it.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 h-1 bg-linear-to-r from-(--brand) to-(--brand-accent)" />
              </div>
              <div className="p-4">
                <h3 className="font-heading font-semibold">{it.title}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{it.desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
