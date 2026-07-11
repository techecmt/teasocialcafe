import type { Metadata, Viewport } from "next";
import { Sansita_Swashed, Lexend_Zetta } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import {
  SITE_URL,
  BUSINESS,
  KEYWORDS,
  jsonLdGraph,
  organizationSchema,
  websiteSchema,
  localBusinessSchema,
} from "@/lib/seo";

const GTM_ID = "GTM-5GHCHPDZ";
// Load GTM in production only: keeps the dev error overlay clean if a container
// tag throws, and avoids polluting analytics with local dev traffic. GTM's own
// Preview/Tag Assistant mode still works for testing the container.
const GTM_ENABLED = process.env.NODE_ENV === "production";

const heading = Sansita_Swashed({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const subheading = Lexend_Zetta({
  variable: "--font-subheading",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tea Social Cafe | Bubble Tea & Specialty Coffee in Doha, Qatar",
    template: "%s | Tea Social Cafe",
  },
  description: BUSINESS.description,
  applicationName: BUSINESS.name,
  keywords: [...KEYWORDS.home],
  authors: [{ name: BUSINESS.name, url: SITE_URL }],
  creator: BUSINESS.name,
  publisher: BUSINESS.name,
  category: "restaurant",
  formatDetection: { telephone: true, address: true, email: true },
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: BUSINESS.name,
    locale: "en_QA",
    url: SITE_URL,
    title: "Tea Social Cafe | Bubble Tea & Specialty Coffee in Doha, Qatar",
    description: BUSINESS.description,
    images: [
      {
        url: "/HeroImage.jpg",
        width: 1200,
        height: 630,
        alt: "Tea Social Cafe — bubble tea and specialty coffee in Doha, Qatar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tea Social Cafe | Bubble Tea & Specialty Coffee in Doha, Qatar",
    description: BUSINESS.description,
    images: ["/HeroImage.jpg"],
  },
  icons: { icon: "/favicon.ico", shortcut: "/favicon.ico", apple: "/favicon.ico" },
};

// Mobile viewport: `viewportFit: "cover"` lets content extend into the safe
// areas on notched phones, and `themeColor` tints the browser UI to match the navbar.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#062b2a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager — loaded early so tags fire on first paint. */}
        {GTM_ENABLED && (
          <Script id="gtm-base" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
        )}
        {/* Site-wide structured data: Organization, WebSite and the local café. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLdGraph([
              organizationSchema(),
              websiteSchema(),
              localBusinessSchema(),
            ]),
          }}
        />
      </head>
      <body className={`${heading.variable} ${subheading.variable} antialiased bg-zinc-50 dark:bg-black`}>
        {/* Google Tag Manager (noscript) — must be the first element in <body>. */}
        {GTM_ENABLED && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="Google Tag Manager"
            />
          </noscript>
        )}
        <Navbar />
        <main className="min-h-screen pt-[72px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
