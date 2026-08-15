import Reveal from "./Reveal";
import FrameText from "./FrameText";
import ProductVideo from "./ProductVideo";

/* Portrait cards so the cup fills the frame — the clips are 16:9, so the
   crop is deliberate and the drink stays centred. */
const drinks = [
  {
    slug: "taiwanese-boba",
    name: "Taiwanese Milk Tea",
    desc: "Stone-brewed black tea, fresh milk and warm tapioca pearls — the one we're known for.",
  },
  {
    slug: "dirty-brown-sugar",
    name: "Brown Sugar Dirty Milk",
    desc: "Caramelised brown sugar striped down ice-cold milk, finished with chewy boba.",
  },
  {
    slug: "chocolate-milk-tea",
    name: "Chocolate Milk Tea",
    desc: "Rich cocoa folded through creamy milk tea for the serious chocolate crowd.",
  },
  {
    slug: "cookies-cream-frappe",
    name: "Cookies & Cream Frappé",
    desc: "Blended thick with crushed cookies and topped with cream. Dessert in a cup.",
  },
];

export default function DrinkShowcase() {
  return (
    <section id="drinks" className="relative overflow-hidden py-24">
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-[#0d0906] via-[#241308] to-[#0d0906]" />

      <div className="mx-auto max-w-6xl px-4">
        <FrameText
          as="h2"
          text="Made to Order, Every Cup"
          className="font-subheading block text-center text-xl text-white md:text-2xl"
        />
        <span className="heading-accent mx-auto" />
        <p className="mx-auto mt-4 max-w-2xl text-center text-white/70">
          Four of the drinks our Doha regulars keep coming back for.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {drinks.map((d, i) => (
            <Reveal key={d.slug} delay={(i % 4) as 0 | 1 | 2 | 3}>
              <article className="hover-lift group relative overflow-hidden rounded-2xl ring-1 ring-white/10">
                <div className="relative aspect-3/4 overflow-hidden">
                  <ProductVideo
                    slug={d.slug}
                    trigger="inview"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Bottom-weighted scrim so the caption stays readable over
                      whatever frame the loop happens to be on. */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <h3 className="font-heading text-lg font-semibold">{d.name}</h3>
                  <p className="mt-1 text-sm text-white/75">{d.desc}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
