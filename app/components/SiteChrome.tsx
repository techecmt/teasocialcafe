"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

/** Routes that render standalone, without the site navbar and footer. */
const BARE_ROUTES = ["/links"];

/**
 * Decides whether a route gets the site chrome.
 *
 * /links is a share-in-bio page: it is opened from Instagram and WhatsApp, is
 * meant to be one screen of tappable links, and a navbar on top of it would
 * both push the links down and invite people back out of the funnel. Doing
 * this here — rather than moving every page into a (site) route group — keeps
 * the existing routes and their imports untouched.
 */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const bare = BARE_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (bare) return <main className="min-h-screen">{children}</main>;

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-[72px]">{children}</main>
      <Footer />
    </>
  );
}
