import type { Metadata, Viewport } from "next";
import { Sansita_Swashed, Lexend_Zetta } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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
  title: "Tea Social Cafe | Authentic Bubble Tea in Doha",
  description: "Bubble tea, specialty coffee and snacks in Mirage Residence, Doha. Join our loyalty program!",
  metadataBase: new URL("https://teasocialcafe.example"),
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
      <body className={`${heading.variable} ${subheading.variable} antialiased bg-zinc-50 dark:bg-black`}>
        <Navbar />
        <main className="min-h-screen pt-[72px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
