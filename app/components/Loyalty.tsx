import Image from "next/image";
import Reveal from "./Reveal";
import FrameText from "./FrameText";

export default function Loyalty() {
  return (
    <section id="loyalty" className="relative mx-auto my-24 max-w-6xl px-4">
      <div className="glass rounded-2xl p-6 shadow-xl md:p-10">
        <FrameText
          as="h2"
          text="Join Our Loyalty Program"
          className="font-subheading block text-center text-xl md:text-2xl"
        />
        <span className="heading-accent mx-auto" />
        <div className="mt-8 grid items-center gap-8 md:grid-cols-2">
          <Reveal>
            <div className="mx-auto w-56 rounded-xl bg-white p-4 shadow md:w-64 dark:bg-black">
              <Image
                src="/Loyalty-Program-QR-Code.png"
                alt="Loyalty QR Code"
                width={400}
                height={400}
                className="mx-auto h-auto w-full"
              />
            </div>
          </Reveal>
          <div className="space-y-5">
            <Reveal delay={1}>
              <div className="flex items-start gap-4">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-(--brand) font-semibold text-white shadow-md shadow-(--brand)/30">1</div>
                <p className="text-zinc-700 dark:text-zinc-300">Scan the QR code or click the button below</p>
              </div>
            </Reveal>
            <Reveal delay={2}>
              <div className="flex items-start gap-4">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-(--brand) font-semibold text-white shadow-md shadow-(--brand)/30">2</div>
                <p className="text-zinc-700 dark:text-zinc-300">Join via Apple/Google Wallet</p>
              </div>
            </Reveal>
            <Reveal delay={3}>
              <div className="flex items-start gap-4">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-(--brand) font-semibold text-white shadow-md shadow-(--brand)/30">3</div>
                <p className="text-zinc-700 dark:text-zinc-300">Enjoy exciting weekly and monthly rewards</p>
              </div>
            </Reveal>
            <Reveal delay={3}>
              <a
                href="#"
                className="hover-lift inline-block rounded-full bg-(--brand) px-5 py-3 font-medium text-white"
              >
                Join Now
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
