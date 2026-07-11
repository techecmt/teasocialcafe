import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import Reveal from "../components/Reveal";
import FrameText from "../components/FrameText";
import { SITE_URL, ORG_ID, jsonLdGraph } from "@/lib/seo";
import { getAllPosts, formatDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Bubble Tea, Coffee & Café Life in Doha",
  description:
    "Guides, tips and stories from Tea Social Cafe in Doha — the best bubble tea in Qatar, cosy cafés to study and work, hi-tea culture and more from our corner of Mirage Residence.",
  keywords: [
    "Doha cafe blog",
    "bubble tea Doha",
    "cafes in Doha",
    "hi-tea Qatar",
    "things to do in Doha",
    "Tea Social Cafe blog",
  ],
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Tea Social Cafe Blog — Café Life in Doha",
    description:
      "Bubble tea guides, café tips and hi-tea culture from Doha's original bubble tea café.",
    url: "/blog",
    type: "website",
    images: [{ url: "/HeroImage.jpg", width: 1200, height: 630, alt: "Tea Social Cafe blog, Doha" }],
  },
};

const posts = getAllPosts();

const jsonLd = jsonLdGraph([
  {
    "@type": "Blog",
    "@id": `${SITE_URL}/blog#blog`,
    name: "Tea Social Cafe Blog",
    description:
      "Guides, tips and stories about bubble tea, specialty coffee and café life in Doha, Qatar.",
    url: `${SITE_URL}/blog`,
    inLanguage: "en",
    publisher: { "@id": ORG_ID },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${SITE_URL}/blog/${p.slug}`,
      datePublished: p.datePublished,
      dateModified: p.dateModified,
      image: `${SITE_URL}${p.image}`,
    })),
  },
  {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
    ],
  },
]);

export default function BlogIndexPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      {/* --------------------------------------------------------------- Header */}
      <section className="relative overflow-hidden bg-linear-to-br from-(--brand) to-[#062b2a] py-16 text-white md:py-20">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <Reveal>
            <span className="font-subheading inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs ring-1 ring-white/20 backdrop-blur-sm">
              From Doha, with love
            </span>
          </Reveal>
          <FrameText
            as="h1"
            text="The Tea Social Cafe Blog"
            splitBy="char"
            stagger={16}
            className="font-heading mt-4 text-balance text-4xl leading-[1.1] sm:text-5xl md:text-6xl"
          />
          <Reveal delay={2}>
            <p className="mx-auto mt-4 max-w-2xl text-white/85">
              Bubble tea guides, cosy café tips and hi-tea culture — stories and local know-how from
              our corner of Doha.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- Cards */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) as 0 | 1 | 2 | 3}>
              <article className="hover-lift group h-full overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-950">
                <Link href={`/blog/${p.slug}`} className="block">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-(--brand-accent) px-3 py-1 text-[11px] font-semibold text-[#073231]">
                      {p.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 text-[11px] text-zinc-500 dark:text-zinc-400">
                      <span className="inline-flex items-center gap-1">
                        <CalendarDays className="h-3.5 w-3.5" /> {formatDate(p.datePublished)}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> {p.readingTime}
                      </span>
                    </div>
                    <h2 className="font-heading mt-2 text-xl leading-snug text-zinc-900 group-hover:text-(--brand) dark:text-white">
                      {p.title}
                    </h2>
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{p.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-(--brand) dark:text-(--brand-accent)">
                      Read more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
