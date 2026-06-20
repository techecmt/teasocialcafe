"use client";
import { useState } from "react";
import Image from "next/image";
import { Cake, Briefcase, Wine, Check, type LucideIcon } from "lucide-react";

type EventType = {
  id: string;
  label: string;
  icon: LucideIcon;
  heading: string;
  tagline: string;
  body: string;
  perks: string[];
  img: string;
};

const EVENT_TYPES: EventType[] = [
  {
    id: "birthday",
    label: "Birthday Events",
    icon: Cake,
    heading: "Make Your Child's Special Day Unforgettable",
    tagline: "Magical birthdays, zero stress.",
    body:
      "Whether it's a cozy party or a fully themed celebration, we provide the perfect space to make your child's birthday magical. With kid-friendly menus, colourful décor and warm service, we take the stress out of planning so you can focus on making memories.",
    perks: [
      "Themed décor & balloon setups",
      "Kid-friendly bubble tea & snack menus",
      "Dedicated party host & service staff",
      "Cake-cutting corner & photo spot",
    ],
    img: "/BubbleTea-Section-1.png",
  },
  {
    id: "corporate",
    label: "Corporate Events",
    icon: Briefcase,
    heading: "Professional Vibes, Comfortable Setting",
    tagline: "Where great conversations brew.",
    body:
      "From team meetings and networking sessions to product launches and client dinners, Tea Social Café offers the ideal space for your next corporate gathering. Enjoy a relaxed atmosphere paired with our curated menu and attentive service — perfect for inspiring conversations and lasting impressions.",
    perks: [
      "Private & semi-private seating",
      "Curated catering & beverage packages",
      "Reliable Wi-Fi & presentation-friendly space",
      "Flexible timings, including evenings",
    ],
    img: "/Coffee-section2.png",
  },
  {
    id: "hitea",
    label: "Hi-Tea Catchups",
    icon: Wine,
    heading: "Elegant Evenings. Delicious Moments.",
    tagline: "Savoury bites, sweet treats, premium teas.",
    body:
      "Catch up with friends, family or colleagues over a delightful hi-tea experience. Our carefully crafted hi-tea menu features savoury bites, sweet treats and premium teas in a cosy, Instagram-worthy setting that everyone will love.",
    perks: [
      "Signature hi-tea tiers & grazing boards",
      "Premium loose-leaf tea selection",
      "Instagram-worthy cosy setting",
      "Group bookings welcome",
    ],
    img: "/Snacks-section1.png",
  },
];

export default function EventTypeTabs() {
  const [active, setActive] = useState(EVENT_TYPES[0].id);
  const current = EVENT_TYPES.find((e) => e.id === active) ?? EVENT_TYPES[0];

  return (
    <div>
      {/* Tab triggers */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3" role="tablist" aria-label="Event types">
        {EVENT_TYPES.map((e) => {
          const isActive = e.id === active;
          return (
            <button
              key={e.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(e.id)}
              className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all sm:px-5 ${
                isActive
                  ? "bg-(--brand) text-white shadow-lg shadow-(--brand)/30"
                  : "bg-(--brand)/10 text-(--brand) hover:bg-(--brand)/20 dark:bg-white/5 dark:text-(--brand-accent) dark:hover:bg-white/10"
              }`}
            >
              <e.icon className="h-4 w-4" />
              {e.label}
            </button>
          );
        })}
      </div>

      {/* Active panel */}
      <div
        key={current.id}
        role="tabpanel"
        className="mt-8 grid items-center gap-8 rounded-3xl border border-black/5 bg-white p-5 shadow-sm motion-safe:animate-[frame-in_400ms_ease] sm:p-8 md:grid-cols-2 dark:border-white/10 dark:bg-zinc-950"
      >
        <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
          <Image
            src={current.img}
            alt={current.heading}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 h-1.5 bg-linear-to-r from-(--brand) to-(--brand-accent)" />
        </div>
        <div>
          <span className="font-subheading text-xs text-(--brand) dark:text-(--brand-accent)">{current.tagline}</span>
          <h3 className="font-heading mt-1 text-2xl md:text-3xl">{current.heading}</h3>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{current.body}</p>
          <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
            {current.perks.map((p) => (
              <li key={p} className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-(--brand)" />
                {p}
              </li>
            ))}
          </ul>
          <a
            href="#book"
            className="hover-lift mt-6 inline-flex rounded-full bg-(--brand-accent) px-5 py-3 text-sm font-semibold text-[#073231]"
          >
            Enquire about {current.label}
          </a>
        </div>
      </div>
    </div>
  );
}
