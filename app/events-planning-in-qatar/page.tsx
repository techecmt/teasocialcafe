import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Cake,
  Armchair,
  UtensilsCrossed,
  Users,
  Car,
  Star,
  Quote,
  CalendarCheck,
  PartyPopper,
  Smile,
  Sparkles,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import Reveal from "../components/Reveal";
import FrameText from "../components/FrameText";
import EventForm from "../components/EventForm";
import StatCounter from "./StatCounter";
import EventTypeTabs from "./EventTypeTabs";
import FaqAccordion, { type Faq } from "./FaqAccordion";

/* -------------------------------------------------------------------------- */
/* SEO                                                                        */
/* -------------------------------------------------------------------------- */

export const metadata: Metadata = {
  title: "Event Planning in Qatar | Birthday, Corporate & Hi-Tea Bookings | Tea Social Café",
  description:
    "Book birthday parties, corporate events and hi-tea catchups at Tea Social Café in Doha, Qatar. Themed décor, handcrafted bubble tea & coffee menus, indoor & outdoor seating and friendly event staff. Enquire on WhatsApp today.",
  keywords: [
    "event planning Qatar",
    "birthday party booking Doha",
    "kids birthday party Qatar",
    "corporate events Doha",
    "hi-tea Qatar",
    "bubble tea café Doha",
    "party venue Mirage Residence",
    "Tea Social Café events",
  ],
  alternates: { canonical: "/events-planning-in-qatar" },
  openGraph: {
    title: "Event Planning in Qatar | Tea Social Café",
    description:
      "Celebrate birthdays, corporate gatherings and hi-tea catchups at Doha's original bubble tea café. Book your event in Qatar today.",
    url: "/events-planning-in-qatar",
    type: "website",
    images: [{ url: "/HeroImage.jpg", width: 1200, height: 630, alt: "Events at Tea Social Café, Doha" }],
  },
};

/* -------------------------------------------------------------------------- */
/* Content data                                                               */
/* -------------------------------------------------------------------------- */

type Stat = { icon: LucideIcon; value: number; suffix: string; label: string; decimals?: boolean };

const stats: Stat[] = [
  { icon: PartyPopper, value: 500, suffix: "+", label: "Events Hosted" },
  { icon: Smile, value: 12, suffix: "K+", label: "Happy Guests" },
  { icon: Star, value: 4.9, suffix: "★", label: "Average Rating", decimals: true },
  { icon: CalendarCheck, value: 7, suffix: " days", label: "Open Every Week" },
];

const whyUs = [
  { icon: Armchair, title: "Indoor & Outdoor Seating", desc: "Versatile spaces that flex from intimate catchups to lively celebrations." },
  { icon: UtensilsCrossed, title: "Handcrafted Menu", desc: "Signature bubble tea, specialty coffee and fresh snacks made to order." },
  { icon: Users, title: "Professional Event Staff", desc: "Friendly hosts who handle the details so you can enjoy the moment." },
  { icon: Car, title: "Convenient Location & Parking", desc: "Easy to find at Mirage Residence, Doha — with parking right on hand." },
];

const gallery = [
  // NOTE: swap these for real Qatar event/birthday photos by dropping them in
  // /public/events/ and updating the `src` paths below.
  { src: "/HeroImage.jpg", alt: "Celebration setup at Tea Social Café" },
  { src: "/BubbleTea-Section-1.png", alt: "Signature bubble tea for parties" },
  { src: "/Coffee-section2.png", alt: "Craft coffee for corporate events" },
  { src: "/Snacks-section1.png", alt: "Fresh snacks and sweet treats" },
  { src: "/BubbleTea-Section-1.png", alt: "Colourful drinks for birthdays" },
  { src: "/Snacks-section1.png", alt: "Hi-tea grazing treats" },
];

const testimonials = [
  { name: "Aisha M.", role: "Birthday party, Doha", quote: "They turned my daughter's birthday into pure magic — the décor, the drinks and the staff were perfect." },
  { name: "Khalid R.", role: "Corporate networking", quote: "Relaxed, professional and the coffee was excellent. Our team launch went off without a hitch." },
  { name: "Sara T.", role: "Hi-tea catchup", quote: "The cosiest hi-tea spot in Qatar. Beautiful setting and the sweet treats were unreal." },
];

const faqs: Faq[] = [
  {
    q: "How do I book an event at Tea Social Café?",
    a: "Fill in the enquiry form on this page and it opens WhatsApp pre-filled with your details, or call us directly on +974 3030 3467. We'll confirm availability and walk you through the options.",
  },
  {
    q: "What types of events can you host?",
    a: "We host kids' and adults' birthday parties, corporate gatherings, networking sessions, product launches, college events and elegant hi-tea catchups — indoors or outdoors.",
  },
  {
    q: "How many guests can you accommodate?",
    a: "From intimate groups of a few people up to larger celebrations of 40+ guests. Tell us your headcount in the enquiry form and we'll tailor the space and menu to suit.",
  },
  {
    q: "Do you offer themed décor for birthdays?",
    a: "Yes — we arrange colourful themed décor, balloon setups, a cake-cutting corner and a photo spot so every birthday feels special.",
  },
  {
    q: "Where are you located in Qatar?",
    a: "Building 8 (at Mirage Residence), Street 880, Doha, Qatar — with convenient parking nearby.",
  },
];

/* JSON-LD structured data helps Google show rich results for the page. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      name: "Tea Social Café",
      image: "https://teasocialcafe.example/HeroImage.jpg",
      "@id": "https://teasocialcafe.example/#business",
      url: "https://teasocialcafe.example/events-planning-in-qatar",
      telephone: "+974 3030 3467",
      email: "info@teasocialcafe-qa.com",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Building 8 (Mirage Residence), Street 880",
        addressLocality: "Doha",
        addressCountry: "QA",
      },
      servesCuisine: ["Bubble Tea", "Coffee", "Snacks"],
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "500" },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://teasocialcafe.example/" },
        { "@type": "ListItem", position: 2, name: "Event Planning in Qatar", item: "https://teasocialcafe.example/events-planning-in-qatar" },
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function EventsPlanningPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative isolate -mt-[72px] flex min-h-[78svh] items-center overflow-hidden pt-[72px]">
        <div className="absolute inset-0 -z-10">
          <Image src="/HeroImage.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-linear-to-br from-[#062b2a]/95 via-[#0e1413]/85 to-black/85" />
        </div>

        {/* Floating decorative party icons */}
        <PartyPopper className="pointer-events-none absolute left-[8%] top-[22%] h-8 w-8 text-(--brand-accent)/40 brew-float md:h-12 md:w-12" />
        <Cake className="pointer-events-none absolute right-[10%] top-[30%] h-8 w-8 text-(--brand-accent)/30 brew-float md:h-12 md:w-12" style={{ animationDelay: "1s" }} />
        <Sparkles className="pointer-events-none absolute bottom-[18%] left-[14%] h-7 w-7 text-(--brand-accent)/30 brew-float md:h-10 md:w-10" style={{ animationDelay: "0.5s" }} />

        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-4 py-20 text-center text-white">
          <Reveal>
            <span className="font-subheading inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs ring-1 ring-white/20 backdrop-blur-sm">
              <MapPin className="h-3.5 w-3.5" /> Doha, Qatar
            </span>
          </Reveal>
          <FrameText
            as="h1"
            text="Celebrate Life's Special Moments"
            splitBy="char"
            stagger={18}
            className="font-heading text-balance text-4xl leading-[1.08] [text-shadow:0_2px_24px_rgba(0,0,0,0.55)] sm:text-5xl md:text-7xl"
          />
          <Reveal delay={2}>
            <p className="max-w-2xl text-base text-white/85 sm:text-lg [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">
              Birthday bashes, polished corporate gatherings and cosy hi-tea catchups — Tea Social Café is your go-to
              event venue in Qatar.
            </p>
          </Reveal>
          <Reveal delay={3}>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
              <a href="#book" className="hover-lift inline-flex items-center gap-2 rounded-full bg-(--brand-accent) px-6 py-3 font-semibold text-[#073231]">
                Book Now <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#event-types" className="rounded-full border border-white/30 bg-white/5 px-6 py-3 font-medium backdrop-blur-sm hover:bg-white/15">
                Explore Events
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------------- Stats */}
      <section className="bg-linear-to-r from-(--brand) to-[#062b2a] py-12 text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={(i % 3) as 0 | 1 | 2 | 3}>
              <div className="flex flex-col items-center gap-1 text-center">
                <s.icon className="h-7 w-7 text-(--brand-accent)" />
                <div className="font-heading text-3xl font-bold md:text-4xl">
                  {/* count-up animates whole numbers; the decimal rating is shown as-is */}
                  {s.decimals ? `${s.value}${s.suffix}` : <StatCounter value={s.value} suffix={s.suffix} />}
                </div>
                <div className="font-subheading text-[11px] text-white/70">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* --------------------------------------------------------- Event types */}
      <section id="event-types" className="mx-auto max-w-6xl px-4 py-20">
        <div className="text-center">
          <FrameText as="h2" text="Events We Love to Host" className="font-subheading block text-xl md:text-2xl" />
          <span className="heading-accent mx-auto" />
          <p className="mx-auto mt-4 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
            Pick an occasion to see what we offer — then send us an enquiry and we'll handle the rest.
          </p>
        </div>
        <div className="mt-10">
          <EventTypeTabs />
        </div>
      </section>

      {/* ----------------------------------------------------------- Why us */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-[#f7efe6] to-white dark:from-zinc-900 dark:to-black" />
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <FrameText as="h2" text="Why Celebrate With Us" className="font-subheading block text-xl md:text-2xl" />
            <span className="heading-accent mx-auto" />
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyUs.map((w, i) => (
              <Reveal key={w.title} delay={(i % 3) as 0 | 1 | 2 | 3}>
                <div className="hover-lift h-full rounded-2xl border border-black/5 bg-white p-6 text-center shadow-sm dark:border-white/10 dark:bg-zinc-950">
                  <div className="brew-float mx-auto grid h-16 w-16 place-items-center rounded-full bg-(--brand) text-white shadow-lg shadow-(--brand)/30" style={{ animationDelay: `${i * 0.3}s` }}>
                    <w.icon className="h-8 w-8" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-heading mt-4 text-lg">{w.title}</h3>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{w.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- Gallery */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="text-center">
          <FrameText as="h2" text="A Few of Our Beautiful Moments" className="font-subheading block text-xl md:text-2xl" />
          <span className="heading-accent mx-auto" />
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {gallery.map((g, i) => (
            <Reveal key={i} delay={(i % 3) as 0 | 1 | 2 | 3}>
              <div className="group relative aspect-square overflow-hidden rounded-2xl">
                <Image
                  src={g.src}
                  alt={g.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="absolute bottom-3 left-3 right-3 translate-y-2 text-left text-xs font-medium text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {g.alt}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------- Testimonials */}
      <section className="relative overflow-hidden bg-[#0e1413] py-20 text-white">
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, var(--brand-accent), transparent 70%)" }} />
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <FrameText as="h2" text="Loved by Our Guests" className="font-subheading block text-xl md:text-2xl" />
            <span className="heading-accent mx-auto" />
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={(i % 3) as 0 | 1 | 2 | 3}>
                <figure className="hover-lift h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <Quote className="h-7 w-7 text-(--brand-accent)" />
                  <div className="mt-3 flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="h-4 w-4 fill-(--brand-accent) text-(--brand-accent)" />
                    ))}
                  </div>
                  <blockquote className="mt-3 text-sm leading-relaxed text-white/85">&ldquo;{t.quote}&rdquo;</blockquote>
                  <figcaption className="mt-4 text-sm">
                    <span className="font-semibold">{t.name}</span>
                    <span className="block text-xs text-white/55">{t.role}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- Booking */}
      <div id="book">
        <EventForm />
      </div>

      {/* --------------------------------------------------------------- FAQ */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="text-center">
          <FrameText as="h2" text="Frequently Asked Questions" className="font-subheading block text-xl md:text-2xl" />
          <span className="heading-accent mx-auto" />
        </div>
        <div className="mt-10">
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* ----------------------------------------------------------- CTA band */}
      <section className="mx-auto max-w-6xl px-4 pb-24">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-(--brand) to-[#062b2a] p-8 text-center text-white md:p-12">
          <Sparkles className="pointer-events-none absolute right-6 top-6 h-10 w-10 text-(--brand-accent)/30" />
          <h2 className="font-heading text-2xl md:text-3xl">Ready to plan your event in Qatar?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/80">
            Tell us your date and headcount and we'll take care of the rest — décor, menu and a warm welcome.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a href="#book" className="hover-lift inline-flex items-center gap-2 rounded-full bg-(--brand-accent) px-6 py-3 font-semibold text-[#073231]">
              <Cake className="h-4 w-4" /> Start Your Booking
            </a>
            <a href="tel:+97430303467" className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 py-3 font-medium hover:bg-white/15">
              <Phone className="h-4 w-4" /> +974 3030 3467
            </a>
            <a href="mailto:info@teasocialcafe-qa.com" className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 py-3 font-medium hover:bg-white/15">
              <Mail className="h-4 w-4" /> Email Us
            </a>
          </div>
          <Link href="/" className="mt-6 inline-block text-xs text-white/60 underline hover:text-white">
            ← Back to home
          </Link>
        </div>
      </section>
    </>
  );
}
