import { Gift, MapPin, type LucideIcon } from "lucide-react";

/**
 * Every outbound link shown on /links, in display order.
 *
 * This is the only file to edit when a campaign link changes — the page itself
 * holds no URLs. Table reservations are not here: they are handled in-page by
 * BookingSheet, which emails the request rather than sending people off-site.
 */
export type LinkItem = {
  title: string;
  /** Second line: the offer, or what tapping actually does. */
  note?: string;
  href: string;
  /** Used when the item has no `logo`. */
  icon?: LucideIcon;
  /** Partner mark from /public/platform_icons, rendered on a white tile. */
  logo?: { src: string; alt: string };
  /** Solid accent card — reserved for a primary call to action. */
  featured?: boolean;
};

export type LinkGroup = {
  /** Shown above the group; also the `link_group` value sent to GTM. */
  heading: string;
  items: LinkItem[];
};

export const LINK_GROUPS: LinkGroup[] = [
  {
    heading: "Other Links",
    items: [
      {
        title: "Join Our Loyalty Program",
        note: "Earn rewards on every visit",
        href: "https://app.boomingo.io/program/7551",
        icon: Gift,
      },
      {
        title: "Get Directions",
        note: "Building 8, Street 880 — Mirage Residence",
        href: "https://g.co/kgs/afES3to",
        icon: MapPin,
      },
    ],
  },
  {
    heading: "Online Delivery Platforms",
    items: [
      {
        title: "Talabat",
        note: "Free delivery for Pro+",
        href: "https://www.talabat.com/qatar/tea-social-cafe",
        logo: { src: "/platform_icons/talabat.png", alt: "Talabat" },
      },
      {
        title: "Snoonu",
        note: "Free delivery",
        href: "https://snoonu.com/restaurants/tea-social-cafe",
        logo: { src: "/platform_icons/snoonu_logo.png", alt: "Snoonu" },
      },
      {
        title: "Keeta",
        href: "https://m.mykeeta.com/marketing/applaunch/index.html?inner_url=sailorc%3A%2F%2Fkeeta.com%2FmarketTransfer%2Fmachpro%3Fmach_bundle_name%3Dmach_pro_sailor_c_shop%26shopId%3D1329595412%26channel%3Dbd",
        logo: { src: "/platform_icons/keeta-logo.png", alt: "Keeta" },
      },
    ],
  },
];
