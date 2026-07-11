import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays, Clock, User } from "lucide-react";
import Reveal from "../../components/Reveal";
import { SITE_URL, ORG_ID, BUSINESS_ID, jsonLdGraph } from "@/lib/seo";
import { getPostBySlug, getRelatedPosts, getAllPosts, formatDate } from "@/lib/blog";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = `/blog/${post.slug}`;
  return {
    title: post.seoTitle ?? post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
      authors: [post.author],
      images: [{ url: post.image, width: 1200, height: 630, alt: post.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.slug);

  const jsonLd = jsonLdGraph([
    {
      "@type": "BlogPosting",
      "@id": `${SITE_URL}/blog/${post.slug}#post`,
      headline: post.title,
      description: post.description,
      image: `${SITE_URL}${post.image}`,
      datePublished: post.datePublished,
      dateModified: post.dateModified,
      author: { "@type": "Organization", name: post.author, url: SITE_URL },
      publisher: { "@id": ORG_ID },
      mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
      inLanguage: "en",
      keywords: post.keywords.join(", "),
      articleSection: post.category,
      about: { "@id": BUSINESS_ID },
    },
    {
      "@type": "FAQPage",
      mainEntity: post.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: `${SITE_URL}/blog/${post.slug}` },
      ],
    },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      {/* ----------------------------------------------------------------- Hero */}
      <section className="relative isolate flex min-h-[52svh] items-end overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image src={post.image} alt={post.imageAlt} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/55 to-black/35" />
        </div>
        <div className="mx-auto w-full max-w-3xl px-4 pb-10 pt-28 text-white">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-xs text-white/75 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All articles
          </Link>
          <span className="mt-4 block">
            <span className="rounded-full bg-(--brand-accent) px-3 py-1 text-[11px] font-semibold text-[#073231]">
              {post.category}
            </span>
          </span>
          <h1 className="font-heading mt-3 text-balance text-3xl leading-[1.12] [text-shadow:0_2px_20px_rgba(0,0,0,0.5)] sm:text-4xl md:text-5xl">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-white/80">
            <span className="inline-flex items-center gap-1.5">
              <User className="h-4 w-4" /> {post.author}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" /> {formatDate(post.datePublished)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" /> {post.readingTime}
            </span>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- Article */}
      <article className="article mx-auto max-w-3xl px-4 py-12 md:py-16 dark:text-zinc-300">
        {post.body}
      </article>

      {/* ------------------------------------------------------------------ FAQ */}
      <section className="mx-auto max-w-3xl px-4 pb-12">
        <h2 className="font-heading text-2xl text-(--brand) dark:text-(--brand-accent)">
          Frequently asked questions
        </h2>
        <span className="heading-accent" />
        <div className="mt-6 divide-y divide-black/5 dark:divide-white/10">
          {post.faqs.map((f) => (
            <details key={f.q} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-zinc-900 dark:text-white">
                {f.q}
                <ArrowRight className="h-4 w-4 shrink-0 text-(--brand) transition-transform group-open:rotate-90 dark:text-(--brand-accent)" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------- Related posts */}
      {related.length > 0 && (
        <section className="border-t border-black/5 bg-[#f7efe6]/60 py-14 dark:border-white/10 dark:bg-zinc-900/40">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="font-heading text-2xl text-zinc-900 dark:text-white">Keep reading</h2>
            <span className="heading-accent" />
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              {related.map((r, i) => (
                <Reveal key={r.slug} delay={(i % 3) as 0 | 1 | 2 | 3}>
                  <article className="hover-lift group h-full overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-950">
                    <Link href={`/blog/${r.slug}`} className="flex h-full flex-col">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={r.image}
                          alt={r.imageAlt}
                          fill
                          sizes="(max-width: 640px) 100vw, 50vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-5">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-(--brand) dark:text-(--brand-accent)">
                          {r.category}
                        </span>
                        <h3 className="font-heading mt-1 text-lg leading-snug text-zinc-900 group-hover:text-(--brand) dark:text-white">
                          {r.title}
                        </h3>
                        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{r.excerpt}</p>
                      </div>
                    </Link>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
