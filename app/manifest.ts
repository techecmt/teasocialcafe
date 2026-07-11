import type { MetadataRoute } from "next";
import { BUSINESS } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${BUSINESS.name} — Bubble Tea & Coffee in Doha`,
    short_name: BUSINESS.name,
    description: BUSINESS.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0d0906",
    theme_color: "#062b2a",
    lang: "en",
    categories: ["food", "drink", "lifestyle"],
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
