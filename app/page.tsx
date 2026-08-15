import type { Metadata } from "next";
import Hero from "./components/Hero";
import BrewingStrip from "./components/BrewingStrip";
import Featured from "./components/Featured";
import DrinkShowcase from "./components/DrinkShowcase";
import Loyalty from "./components/Loyalty";
import EventForm from "./components/EventForm";
import Contact from "./components/Contact";
import { SITE_URL, BUSINESS, KEYWORDS, WEBSITE_ID, BUSINESS_ID, jsonLdGraph } from "@/lib/seo";

/* -------------------------------------------------------------------------- */
/* SEO                                                                        */
/* -------------------------------------------------------------------------- */

export const metadata: Metadata = {
  // Root page.tsx does NOT inherit the layout's title template, so the brand
  // is included here explicitly.
  title: "Bubble Tea, Specialty Coffee & Snacks in Doha | Tea Social Cafe",
  description:
    "Tea Social Cafe is Doha's cosy cafe for authentic bubble tea, specialty coffee and fresh snacks at Mirage Residence. Dine in, grab a boba to go, or join our loyalty program.",
  keywords: [...KEYWORDS.home],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Tea Social Cafe | Bubble Tea, Coffee & Snacks in Doha",
    description:
      "Doha's original bubble tea café at Mirage Residence — handcrafted boba, specialty coffee and fresh snacks. Dine in or take away.",
    url: "/",
    type: "website",
    images: [
      { url: "/HeroImage.jpg", width: 1200, height: 630, alt: "Tea Social Cafe bubble tea and coffee in Doha, Qatar" },
    ],
  },
};

/* Home-specific structured data: the page itself, tied to the site-wide
   WebSite and LocalBusiness nodes declared in the root layout. */
const homeJsonLd = jsonLdGraph([
  {
    "@type": "WebPage",
    "@id": `${SITE_URL}/#webpage`,
    url: `${SITE_URL}/`,
    name: "Tea Social Cafe | Bubble Tea & Specialty Coffee in Doha, Qatar",
    description: BUSINESS.description,
    inLanguage: "en",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": BUSINESS_ID },
    primaryImageOfPage: { "@type": "ImageObject", url: `${SITE_URL}/HeroImage.jpg` },
  },
  {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    ],
  },
]);

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: homeJsonLd }} />
      <Hero />
      <BrewingStrip />
      <Featured />
      <DrinkShowcase />
      <Loyalty />
      <EventForm />
      <Contact />
    </>
  );
}
