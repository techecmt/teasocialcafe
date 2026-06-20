"use client";
import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  User,
  Users,
  UsersRound,
  Cake,
  Wine,
  Briefcase,
  GraduationCap,
  Sparkles,
  CalendarDays,
  Send,
  CheckCircle2,
} from "lucide-react";
import FrameText from "./FrameText";

const contacts = [
  { icon: MapPin, title: "Physical Address", lines: ["Building 8 (Mirage Residence), Street 880", "Doha, Qatar"] },
  { icon: Phone, title: "Phone Numbers", lines: ["+974 3030 3467"] },
  { icon: Mail, title: "Email Address", lines: ["Info@teasocialcafe-qa.com"] },
];

const categories = [
  { label: "Birthday Party", icon: Cake },
  { label: "Private Party", icon: Wine },
  { label: "Corporate Party", icon: Briefcase },
  { label: "College Event", icon: GraduationCap },
  { label: "Others", icon: Sparkles },
];

const WHATSAPP_NUMBER = "97430303467";

export default function EventForm() {
  const [persons, setPersons] = useState(10);
  const [category, setCategory] = useState("Birthday Party");
  const [other, setOther] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [sent, setSent] = useState(false);

  // The persons icon grows with the group size — a little interactive flourish.
  const PersonIcon = persons <= 1 ? User : persons <= 12 ? Users : UsersRound;
  const pct = ((persons - 1) / (40 - 1)) * 100;
  const needsOther = category === "Others";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const eventType = needsOther ? `Others — ${other.trim() || "(unspecified)"}` : category;
    const lines = [
      "Hi Tea Social Café! I'd like to enquire about hosting an event:",
      `• Name: ${name}`,
      email && `• Email: ${email}`,
      phone && `• Phone: ${phone}`,
      `• Guests: ${persons}`,
      `• Event: ${eventType}`,
      date && `• Preferred date: ${date}`,
    ].filter(Boolean);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  const fieldClass =
    "w-full border-0 border-b border-white/25 bg-transparent py-2 text-white placeholder-white/35 outline-none transition-colors focus:border-(--brand-accent)";
  const labelClass = "font-subheading mb-1 block text-[11px] text-white/60";

  return (
    <section id="events" className="relative overflow-hidden bg-[#0e1413] py-14 text-white md:py-20">
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--brand-accent), transparent 70%)" }}
      />
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-12 md:grid-cols-[1fr_1.5fr] md:gap-16">
          {/* Contact column */}
          <div className="order-2 md:order-1">
            <ul className="space-y-8">
              {contacts.map((c) => (
                <li key={c.title} className="group flex items-start gap-4">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-(--brand-accent) text-[#073231] shadow-lg shadow-(--brand-accent)/20 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                    <c.icon className="h-6 w-6" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="font-heading text-lg">{c.title}</h3>
                    {c.lines.map((l) => (
                      <p key={l} className="text-sm text-white/65">{l}</p>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Form column */}
          <div className="order-1 md:order-2">
            <FrameText
              as="h2"
              text="Make Your Event More Delicious with Tea Social Café"
              className="font-heading block text-2xl leading-tight sm:text-3xl md:text-4xl"
            />
            <p className="mt-4 max-w-xl text-sm text-white/65">
              Looking for the perfect place to host your next celebration? Tea Social Café is more than a chill spot —
              it&apos;s the ideal venue for creating unforgettable memories.
            </p>

            {sent ? (
              <div className="mt-8 flex items-center gap-3 rounded-2xl border border-(--brand-accent)/40 bg-(--brand-accent)/10 p-5">
                <CheckCircle2 className="h-7 w-7 shrink-0 text-(--brand-accent)" />
                <p className="text-sm text-white/85">
                  Opening WhatsApp with your details — just hit send to reach us. We&apos;ll confirm your booking shortly!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="ev-name" className={labelClass}>Name *</label>
                    <input id="ev-name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className={fieldClass} />
                  </div>
                  <div>
                    <label htmlFor="ev-email" className={labelClass}>Email Address</label>
                    <input id="ev-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" className={fieldClass} />
                  </div>
                </div>

                <div>
                  <label htmlFor="ev-phone" className={labelClass}>Phone</label>
                  <input id="ev-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+974 …" className={fieldClass} />
                </div>

                {/* Interactive persons slider */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label htmlFor="ev-persons" className={labelClass + " mb-0"}>Persons *</label>
                    <span className="flex items-center gap-2 rounded-full bg-(--brand-accent)/15 px-3 py-1 text-sm font-semibold text-(--brand-accent)">
                      <PersonIcon className="h-4 w-4" />
                      {persons}
                      {persons === 40 ? "+" : ""}
                    </span>
                  </div>
                  <input
                    id="ev-persons"
                    type="range"
                    min={1}
                    max={40}
                    value={persons}
                    onChange={(e) => setPersons(Number(e.target.value))}
                    className="range-slider w-full"
                    style={{ background: `linear-gradient(to right, var(--brand-accent) ${pct}%, rgba(255,255,255,0.15) ${pct}%)` }}
                  />
                  <div className="mt-1 flex justify-between text-[10px] text-white/40">
                    <span>1</span>
                    <span>40 guests</span>
                  </div>
                </div>

                {/* Event category icon chips */}
                <div>
                  <span className={labelClass}>Event Category</span>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((c) => {
                      const active = category === c.label;
                      return (
                        <button
                          key={c.label}
                          type="button"
                          onClick={() => setCategory(c.label)}
                          aria-pressed={active}
                          className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
                            active
                              ? "border-(--brand-accent) bg-(--brand-accent)/15 text-white"
                              : "border-white/20 text-white/70 hover:border-white/45 hover:text-white"
                          }`}
                        >
                          <c.icon className="h-4 w-4" />
                          {c.label}
                        </button>
                      );
                    })}
                  </div>
                  {needsOther && (
                    <input
                      required
                      value={other}
                      onChange={(e) => setOther(e.target.value)}
                      placeholder="Please specify your event type"
                      className={fieldClass + " mt-3"}
                    />
                  )}
                </div>

                {/* Date */}
                <div>
                  <label htmlFor="ev-date" className={`${labelClass} flex items-center gap-1.5`}>
                    <CalendarDays className="h-3.5 w-3.5" /> Planned Event Date
                  </label>
                  <input id="ev-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className={`${fieldClass} scheme-dark`} />
                </div>

                <button
                  type="submit"
                  className="hover-lift inline-flex items-center gap-2 rounded-full bg-(--brand-accent) px-6 py-3 font-semibold text-[#073231]"
                >
                  <Send className="h-4 w-4" />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
