export default function Footer() {
  return (
    <footer className="mt-20">
      <div className="h-[3px] bg-linear-to-r from-(--brand) via-(--brand-accent) to-(--brand)" />
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-6 md:grid-cols-3">
        <div>
          <h3 className="font-heading mb-3 text-lg text-(--brand) dark:text-(--brand-accent)">Tea Social Cafe</h3>
          <h4 className="mb-2 text-sm font-semibold tracking-wider text-zinc-600 dark:text-zinc-300">About</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Tea Social Cafe serves authentic bubble tea, specialty coffee, and fresh snacks in the heart of Doha.
          </p>
        </div>
        <div>
          <h4 className="mb-2 text-sm font-semibold tracking-wider text-zinc-600 dark:text-zinc-300">Contact</h4>
          <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
            <li>Phone: <a className="underline hover:text-black dark:hover:text-white" href="tel:+97430303467">+974 3030 3467</a></li>
            <li>Email: <a className="underline hover:text-black dark:hover:text-white" href="mailto:Info@teasocialcafe-qa.com">Info@teasocialcafe-qa.com</a></li>
            <li>Address: Building 8, Street 880, Mirage Residence, Doha, Qatar</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-2 text-sm font-semibold tracking-wider text-zinc-600 dark:text-zinc-300">Find Us</h4>
          <a
            className="hover-lift inline-block rounded-lg bg-(--brand) px-4 py-2 text-white"
            href="https://maps.google.com/?q=Building%208%2C%20Street%20880%2C%20Mirage%20Residence%2C%20Doha%2C%20Qatar"
            target="_blank"
            rel="noreferrer"
          >
            Open in Google Maps
          </a>
        </div>
      </div>
      <div className="border-t border-black/5 dark:border-white/10 py-4 text-center text-xs text-zinc-500 dark:text-zinc-400">
        © {new Date().getFullYear()} Tea Social Cafe. All rights reserved.
      </div>
    </footer>
  );
}
