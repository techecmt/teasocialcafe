"use client";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import GooeyNav from "@/components/GooeyNav";

// These fragments are root-relative on purpose. A bare "#home" resolves
// against the *current* path, so from /blog it became /blog#home — a link to
// an element that doesn't exist on that page, which silently did nothing.
// The sections all live on the home page, so the links have to say so.
const navItems = [
  { label: "Home", href: "/#home" },
  { label: "Menu", href: "/#menu" },
  { label: "Loyalty", href: "/#loyalty" },
  { label: "Events", href: "/events-planning-in-qatar" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Which pill GooeyNav should light up. Only the items that are real routes
  // can be matched against the path; the "/#..." ones are all home-page
  // sections, so anything unmatched falls back to Home.
  const routeIndex = navItems.findIndex(
    (item) => !item.href.startsWith("/#") && pathname.startsWith(item.href),
  );
  const activeIndex = routeIndex === -1 ? 0 : routeIndex;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-linear-to-r from-[#062b2a]/95 via-(--brand)/90 to-[#062b2a]/95 shadow-lg shadow-black/20 backdrop-blur-md"
          : "bg-linear-to-b from-black/60 via-black/40 to-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3 transition-transform duration-300 hover:scale-105">
          {/* Logo steps down on small phones so it never crowds the hamburger at 320px. */}
          <Image src="/whitelogo.webp" alt="Tea Social Cafe" width={160} height={40} priority className="h-auto w-[130px] drop-shadow-md sm:w-[150px] lg:w-[160px]" />
        </Link>

        {/* The full GooeyNav + contact pill only fit comfortably from ~1024px, so
            tablets (768–1023px) keep the clean hamburger layout below. */}
        {/* GooeyNav seeds its highlight from initialActiveIndex once and then
            owns it, so in-page clicks animate normally. Keying on the
            route-derived index re-seeds it on an actual navigation, which is
            the only time the current page disagrees with the highlight. */}
        <div className="hidden lg:flex">
          <GooeyNav
            key={activeIndex}
            items={navItems}
            initialActiveIndex={activeIndex}
            particleCount={12}
            particleDistances={[80, 12]}
            particleR={90}
            animationTime={500}
            timeVariance={250}
          />
        </div>

        <div className="hidden items-center gap-2 rounded-full bg-white/10 px-2 py-1 text-xs shadow-lg ring-1 ring-white/20 backdrop-blur-md lg:flex">
          <span className="hidden pl-2 text-[11px] text-zinc-200 lg:inline">Call or WhatsApp</span>
          <a href="tel:+97455850343" className="hover-lift rounded-full bg-(--brand-accent) px-3 py-1.5 text-[11px] font-semibold text-[#073231]">+974 5585 0343</a>
          <a href="mailto:info@teasocialcafe-qa.com" className="rounded-full bg-white/5 px-3 py-1.5 text-[11px] font-medium text-zinc-100 hover:bg-white/15">Email</a>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          // h-11/w-11 = 44px, the minimum comfortable touch-target size.
          className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition-colors hover:bg-white/20 lg:hidden"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div
        className={`overflow-hidden border-t border-white/10 bg-[#062b2a]/97 backdrop-blur-md transition-[max-height] duration-300 lg:hidden ${
          mobileOpen ? "max-h-96" : "max-h-0 border-t-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-4 py-3">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="font-subheading rounded-lg px-3 py-2.5 text-sm text-zinc-100 transition-colors hover:bg-white/10"
            >
              {item.label}
            </a>
          ))}
          <a
            href="tel:+97455850343"
            onClick={() => setMobileOpen(false)}
            className="hover-lift mt-2 rounded-full bg-(--brand-accent) px-4 py-2.5 text-center text-sm font-semibold text-[#073231]"
          >
            Call +974 5585 0343
          </a>
        </nav>
      </div>
    </header>
  );
}
