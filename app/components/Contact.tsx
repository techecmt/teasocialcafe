import Reveal from "./Reveal";
import FrameText from "./FrameText";

export default function Contact() {
  return (
    <section id="contact" className="mx-auto my-24 max-w-6xl px-4">
      <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-950 md:p-10">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <FrameText as="h2" text="Contact Us" className="font-subheading block text-xl md:text-2xl" />
            <span className="heading-accent" />
            <Reveal delay={1}>
              <ul className="mt-4 space-y-2 text-zinc-700 dark:text-zinc-300">
                <li>Phone: <a className="underline" href="tel:+97430303467">+974 3030 3467</a></li>
                <li>Email: <a className="underline" href="mailto:Info@teasocialcafe-qa.com">Info@teasocialcafe-qa.com</a></li>
                <li>Address: Building 8, Street 880, Mirage Residence, Doha, Qatar</li>
              </ul>
            </Reveal>
            <Reveal delay={2}>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="https://maps.google.com/?q=Building%208%2C%20Street%20880%2C%20Mirage%20Residence%2C%20Doha%2C%20Qatar" target="_blank" rel="noreferrer" className="hover-lift rounded-full bg-(--brand) px-5 py-3 font-medium text-white">Open in Maps</a>
                <a href="tel:+97430303467" className="rounded-full border border-black/10 px-5 py-3 font-medium dark:border-white/20">Call</a>
              </div>
            </Reveal>
          </div>
          <div>
            <Reveal>
              <iframe
                title="Map"
                className="h-72 w-full rounded-xl border border-black/5 dark:border-white/10"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=Building%208,%20Street%20880,%20Mirage%20Residence,%20Doha,%20Qatar&output=embed"
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
