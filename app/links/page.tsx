import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Clock, ExternalLink, Facebook, Instagram, MapPin, Phone } from "lucide-react";
import { BUSINESS, SITE_URL } from "@/lib/seo";
import BirthdaySheet from "./BirthdaySheet";
import BookingSheet from "./BookingSheet";
import { cardBase, cardFeatured, cardIdle } from "./cardStyles";
import { LINK_GROUPS } from "./links";
import ShareButton from "./ShareButton";
import TrackedLink from "./TrackedLink";
import VideoBackdrop from "./VideoBackdrop";

export const metadata: Metadata = {
  title: "Links",
  description:
    "Every Tea Social Cafe link in one place — reserve a table, claim free boba, join the loyalty programme, get directions and order delivery in Doha, Qatar.",
  alternates: { canonical: "/links" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/links`,
    title: "Tea Social Cafe | All Our Links",
    description:
      "Reserve a table, claim free boba, join the loyalty programme, get directions and order delivery.",
    images: [{ url: "/HeroImage.jpg", width: 1200, height: 630, alt: BUSINESS.name }],
  },
};

/* Lucide has Facebook and Instagram, but no TikTok glyph — this is the
   same stroke-weight note used by most Lucide-adjacent sets. */
function TikTokIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

const socials = [
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61577651706119", Icon: Facebook },
  { label: "Instagram", href: "https://www.instagram.com/teasocialcafe.qa/", Icon: Instagram },
  { label: "TikTok", href: "https://www.tiktok.com/@tea.social.cafe", Icon: TikTokIcon },
];

/* Applied to the copy that sits directly on the video rather than on a card. */
const textOnVideo = "[text-shadow:0_1px_14px_rgba(0,0,0,0.9)]";

export default function LinksPage() {
  const { address } = BUSINESS;

  return (
    <div className="relative min-h-dvh text-white">
      <VideoBackdrop />

      <div className="mx-auto w-full max-w-[30rem] px-5 pt-10 pb-[calc(3rem+env(safe-area-inset-bottom))]">
        {/* Identity */}
        <header className="flex flex-col items-center text-center">
          <Link href="/" className="transition-transform duration-300 hover:scale-105">
            <Image
              src="/whitelogo.webp"
              alt={BUSINESS.name}
              width={1600}
              height={300}
              priority
              className="h-auto w-[190px] drop-shadow-lg"
            />
          </Link>
          <p className={`font-subheading mt-4 text-[11px] text-white/75 ${textOnVideo}`}>
            {BUSINESS.tagline}
          </p>
          <p className={`mt-3 text-sm text-balance text-white/85 ${textOnVideo}`}>
            Bubble tea, specialty coffee &amp; fresh snacks — Mirage Residence, Doha.
          </p>

          {socials.length > 0 && (
            <div className="mt-5 flex items-center gap-3">
              {socials.map(({ label, href, Icon }) => (
                <TrackedLink
                  key={label}
                  href={href}
                  title={label}
                  group="Social"
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-black/30 backdrop-blur-md transition hover:bg-black/45 active:scale-95"
                >
                  <Icon className="h-5 w-5" aria-hidden />
                  <span className="sr-only">{label}</span>
                </TrackedLink>
              ))}
            </div>
          )}
        </header>

        {/* Quick actions — chat, call, pass the page on. */}
        <div className="mt-7 grid grid-cols-3 gap-3">
          <TrackedLink
            href={`https://wa.me/${BUSINESS.whatsapp}`}
            title="WhatsApp"
            group="Quick actions"
            className="flex h-14 items-center justify-center gap-2 rounded-2xl border border-white/20 bg-black/30 text-sm font-medium backdrop-blur-md transition hover:bg-black/45 active:scale-95"
          >
            {/* Lucide has no WhatsApp glyph and the brand mark is trademarked —
                the phone icon plus the label reads clearly enough. */}
            <Phone className="h-5 w-5" aria-hidden />
            WhatsApp
          </TrackedLink>
          <TrackedLink
            href={`tel:${BUSINESS.telephone.replace(/\s/g, "")}`}
            title="Call"
            group="Quick actions"
            external={false}
            className="flex h-14 items-center justify-center gap-2 rounded-2xl border border-white/20 bg-black/30 text-sm font-medium backdrop-blur-md transition hover:bg-black/45 active:scale-95"
          >
            <Phone className="h-5 w-5" aria-hidden />
            Call
          </TrackedLink>
          <ShareButton className="flex h-14 items-center justify-center gap-2 rounded-2xl border border-white/20 bg-black/30 text-sm font-medium backdrop-blur-md transition hover:bg-black/45 active:scale-95" />
        </div>

        {/* Reservations happen in-page — see BookingSheet. */}
        <section className="mt-9">
          <h2 className={`font-subheading mb-3 px-1 text-[11px] text-white/70 ${textOnVideo}`}>Reserve</h2>
          <div className="space-y-3">
            <BookingSheet />
            <BirthdaySheet />
          </div>
        </section>

        {/* Outbound links */}
        {LINK_GROUPS.map((group) => (
          <section key={group.heading} className="mt-9">
            <h2 className={`font-subheading mb-3 px-1 text-[11px] text-white/70 ${textOnVideo}`}>
              {group.heading}
            </h2>
            <ul className="space-y-3">
              {group.items.map((item) => (
                <li key={item.href}>
                  <TrackedLink
                    href={item.href}
                    title={item.title}
                    group={group.heading}
                    className={`${cardBase} ${item.featured ? cardFeatured : cardIdle}`}
                  >
                    {/* Partner logos sit on a white tile: the source PNGs are
                        dark-on-transparent or dark-on-white, so the frosted
                        badge used elsewhere would swallow them. */}
                    <span
                      className={`grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-xl ${
                        item.logo
                          ? "bg-white p-1.5"
                          : item.featured
                            ? "bg-[#062b2a]/10"
                            : "bg-white/15"
                      }`}
                      aria-hidden
                    >
                      {item.logo ? (
                        <Image
                          src={item.logo.src}
                          alt=""
                          width={88}
                          height={88}
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        item.icon && <item.icon className="h-5 w-5" />
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block leading-snug font-semibold">{item.title}</span>
                      {item.note && (
                        <span
                          className={`mt-0.5 block text-xs ${
                            item.featured ? "text-[#062b2a]/70" : "text-white/65"
                          }`}
                        >
                          {item.note}
                        </span>
                      )}
                    </span>
                    <ExternalLink
                      className="h-4 w-4 shrink-0 opacity-50 transition group-hover:opacity-90"
                      aria-hidden
                    />
                  </TrackedLink>
                </li>
              ))}
            </ul>
          </section>
        ))}

        {/* Where to find us */}
        <section className="mt-9 rounded-2xl border border-white/20 bg-black/30 p-4 backdrop-blur-md">
          <h2 className="font-subheading mb-3 text-[11px] text-white/55">Visit Us</h2>
          <p className="flex items-start gap-3 text-sm text-white/85">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 opacity-70" aria-hidden />
            <span>
              {address.streetAddress}
              <br />
              {address.addressLocality}, Qatar
            </span>
          </p>
          {/* Hours render only once BUSINESS.openingHours is filled in — see the
              note in lib/seo.ts. Wrong hours on a page people tap before
              driving over are worse than no hours. */}
          {BUSINESS.openingHours.length > 0 && (
            <ul className="mt-3 space-y-1 text-sm text-white/85">
              {BUSINESS.openingHours.map((slot) => (
                <li key={slot.days.join()} className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 opacity-70" aria-hidden />
                  <span>
                    {slot.days.join(", ")} · {slot.opens}–{slot.closes}
                  </span>
                </li>
              ))}
            </ul>
          )}
          <TrackedLink
            href={BUSINESS.mapUrl}
            title="Open in Google Maps"
            group="Visit us"
            className="mt-4 flex h-12 items-center justify-center gap-2 rounded-xl bg-(--brand) text-sm font-medium text-white transition hover:brightness-110 active:scale-[0.98]"
          >
            <MapPin className="h-4 w-4" aria-hidden />
            Open in Google Maps
          </TrackedLink>
        </section>

        <footer className="mt-10 text-center">
          <Link
            href="/"
            className={`font-subheading text-[11px] text-white/70 underline-offset-4 transition hover:text-white hover:underline ${textOnVideo}`}
          >
            teasocialcafe-qa.com
          </Link>
          <p className={`mt-2 text-xs text-white/55 ${textOnVideo}`}>
            © {new Date().getFullYear()} {BUSINESS.name}
          </p>
        </footer>
      </div>
    </div>
  );
}
