/* -------------------------------------------------------------------------- */
/* Central SEO + business config                                              */
/* -------------------------------------------------------------------------- */
/* Single source of truth for the site's NAP (Name/Address/Phone), structured */
/* data and metadata. Change a value here and it updates the layout, home &    */
/* events pages, sitemap, robots and manifest at once.                         */

export const SITE_URL = "https://teasocialcafe-qa.com";

export const BUSINESS = {
  name: "Tea Social Cafe",
  /* Arabic alternate name — Qatar is bilingual, so this helps Google associate
     the brand with Arabic-language local searches without a full /ar site. */
  alternateNameAr: "تي سوشيال كافيه",
  tagline: "Doha's original bubble tea café",
  description:
    "Authentic bubble tea, specialty coffee and fresh snacks in the heart of Doha, Qatar. Visit Tea Social Cafe at Mirage Residence for handcrafted boba, craft coffee and a warm social spot.",
  telephone: "+974 5585 0343",
  /* WhatsApp booking uses the same number (digits only) for wa.me links. */
  whatsapp: "97455850343",
  email: "info@teasocialcafe-qa.com",
  address: {
    streetAddress: "Building 8 (Mirage Residence), Street 880",
    addressLocality: "Doha",
    addressRegion: "Doha",
    postalCode: "",
    addressCountry: "QA",
  },
  /* Accurate Google Maps query link already used across the site — safe for
     schema `hasMap` even without exact coordinates. */
  mapUrl:
    "https://maps.google.com/?q=Building%208%2C%20Street%20880%2C%20Mirage%20Residence%2C%20Doha%2C%20Qatar",
  /* TODO(owner): exact coordinates from your Google Business Profile. Open your
     listing on Google Maps — the URL shows `@25.xxxx,51.xxxx`; put those here.
     Left null on purpose: a mis-placed map pin hurts local SEO more than a
     missing one. Once set, schema `geo` is emitted automatically. */
  geo: null as { latitude: number; longitude: number } | null,
  /* Verified-looking official profile. Add Instagram / TikTok / Snapchat URLs
     here to strengthen local entity signals. */
  sameAs: ["https://www.facebook.com/Teasocialcafe"],
  priceRange: "$$",
  currenciesAccepted: "QAR",
  servesCuisine: ["Bubble Tea", "Coffee", "Snacks"],
  /* TODO(owner): confirm official opening hours against your Google Business
     Profile, then add entries like:
       { days: ["Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday"], opens: "10:00", closes: "23:00" }
     Left empty because third-party directories disagree — publishing wrong
     hours in schema is worse than none. Filled entries emit
     `openingHoursSpecification` automatically. */
  openingHours: [] as { days: string[]; opens: string; closes: string }[],
} as const;

/* Stable @id values so every page's structured data refers to the same
   entities instead of duplicating them. */
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const BUSINESS_ID = `${SITE_URL}/#business`;

/* Keyword pools — kept here so page metadata stays readable. Google ignores the
   legacy keywords meta for ranking, but these document targeting and feed OG /
   internal tooling. Real Arabic ranking still needs visible Arabic content. */
export const KEYWORDS = {
  home: [
    "bubble tea Doha",
    "boba Doha",
    "bubble tea Qatar",
    "specialty coffee Doha",
    "coffee shop Doha",
    "cafe in Doha",
    "cafe Mirage Residence",
    "best bubble tea Qatar",
    "snacks cafe Doha",
    "Tea Social Cafe",
    /* Arabic */
    "بابل تي الدوحة",
    "شاي الفقاعات قطر",
    "قهوة مختصة الدوحة",
    "مقهى الدوحة",
  ],
  events: [
    "event planning Qatar",
    "birthday party booking Doha",
    "kids birthday party Qatar",
    "corporate events Doha",
    "hi-tea Qatar",
    "party venue Doha",
    "event venue Mirage Residence",
    "bubble tea café Doha events",
    "Tea Social Cafe events",
    /* Arabic */
    "تنظيم فعاليات قطر",
    "حجز حفلات أعياد الميلاد الدوحة",
    "قاعة حفلات الدوحة",
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* Structured-data builders (schema.org / JSON-LD)                            */
/* -------------------------------------------------------------------------- */

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: BUSINESS.name,
    alternateName: BUSINESS.alternateNameAr,
    url: SITE_URL,
    email: BUSINESS.email,
    telephone: BUSINESS.telephone,
    logo: `${SITE_URL}/whitelogo.webp`,
    image: `${SITE_URL}/HeroImage.jpg`,
    sameAs: BUSINESS.sameAs,
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: BUSINESS.name,
    description: BUSINESS.description,
    inLanguage: "en",
    publisher: { "@id": ORG_ID },
  };
}

/* The core local-SEO node. `CafeOrCoffeeShop` is a specific FoodEstablishment
   subtype Google understands, with LocalBusiness kept for broad compatibility. */
export function localBusinessSchema() {
  const node: Record<string, unknown> = {
    "@type": ["CafeOrCoffeeShop", "LocalBusiness"],
    "@id": BUSINESS_ID,
    name: BUSINESS.name,
    alternateName: BUSINESS.alternateNameAr,
    description: BUSINESS.description,
    url: SITE_URL,
    telephone: BUSINESS.telephone,
    email: BUSINESS.email,
    image: `${SITE_URL}/HeroImage.jpg`,
    logo: `${SITE_URL}/whitelogo.webp`,
    priceRange: BUSINESS.priceRange,
    currenciesAccepted: BUSINESS.currenciesAccepted,
    servesCuisine: [...BUSINESS.servesCuisine],
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address.streetAddress,
      addressLocality: BUSINESS.address.addressLocality,
      addressRegion: BUSINESS.address.addressRegion,
      addressCountry: BUSINESS.address.addressCountry,
    },
    areaServed: [
      { "@type": "City", name: "Doha" },
      { "@type": "AdministrativeArea", name: "Qatar" },
    ],
    hasMap: BUSINESS.mapUrl,
    parentOrganization: { "@id": ORG_ID },
    sameAs: BUSINESS.sameAs,
  };

  if (BUSINESS.geo) {
    node.geo = {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.geo.latitude,
      longitude: BUSINESS.geo.longitude,
    };
  }

  if (BUSINESS.openingHours.length) {
    node.openingHoursSpecification = BUSINESS.openingHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    }));
  }

  return node;
}

/* Renders one or more JSON-LD nodes as a schema.org @graph string. */
export function jsonLdGraph(nodes: Record<string, unknown>[]) {
  return JSON.stringify({ "@context": "https://schema.org", "@graph": nodes });
}
