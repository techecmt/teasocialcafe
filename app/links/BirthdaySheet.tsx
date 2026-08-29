"use client";

import {
  AlertCircle,
  Cake,
  CalendarDays,
  Check,
  ChevronRight,
  Clock,
  Gift,
  Loader2,
  Mail,
  PartyPopper,
  Phone,
  Send,
  Sparkles,
  User,
} from "lucide-react";
import { useState } from "react";
import { BUSINESS } from "@/lib/seo";
import { addDays, formatDate, formatTime, sendBooking, toDateInput } from "./booking";
import { chipClass, fieldClass, labelClass } from "./formStyles";
import Sheet, { SHEET_BG } from "./Sheet";
import { trackLinkClick } from "./track";

const MIN_GUESTS = 5;
const MAX_GUESTS = 60;

const TIME_PRESETS = [
  { label: "Afternoon", value: "15:00" },
  { label: "Early evening", value: "18:00" },
  { label: "Evening", value: "20:00" },
];

/** Multi-select: birthday parties are assembled, not picked from a menu. */
const EXTRAS = [
  "Cake from us",
  "Balloons & décor",
  "Reserved corner",
  "Photo wall",
  "Music playlist",
  "Party favours",
];

/* Decorative confetti pinned inside the trigger card. Positions are hand-placed
   so nothing lands on the text, and each delay is offset so the card never
   pulses in unison. */
const FLOATERS = [
  { Icon: Cake, style: { left: "6%", top: "14%" }, size: "h-6 w-6", delay: "0s" },
  { Icon: Gift, style: { right: "18%", top: "8%" }, size: "h-5 w-5", delay: "1.1s" },
  { Icon: PartyPopper, style: { right: "6%", bottom: "12%" }, size: "h-6 w-6", delay: "2.2s" },
  { Icon: Sparkles, style: { left: "34%", bottom: "6%" }, size: "h-4 w-4", delay: "0.6s" },
];

const BULBS = ["#ffd166", "#ff8fc7", "#7ee8dc", "#ffd166", "#ff8fc7", "#7ee8dc"];

/** Cakes and gifts drifting up through the sheet header. */
const RISERS = [
  { Icon: Cake, left: "8%", delay: "0s", size: "h-7 w-7" },
  { Icon: Gift, left: "28%", delay: "2.4s", size: "h-5 w-5" },
  { Icon: PartyPopper, left: "52%", delay: "1.2s", size: "h-6 w-6" },
  { Icon: Cake, left: "72%", delay: "4s", size: "h-5 w-5" },
  { Icon: Sparkles, left: "88%", delay: "3.1s", size: "h-4 w-4" },
];

/**
 * Birthday party bookings, taken in-page.
 *
 * Same Web3Forms pipeline as the table sheet and the events page form, but the
 * card is deliberately the loudest thing on /links: a rotating gradient ring,
 * floating cakes, blinking party bulbs and a sheen sweeping across it. A
 * birthday is the highest-value booking the café takes, so it gets to shout —
 * everything is CSS on the compositor, and it all stops flat under
 * prefers-reduced-motion (see the flourishes block in globals.css).
 */
export default function BirthdaySheet() {
  const [open, setOpen] = useState(false);
  const [celebrant, setCelebrant] = useState("");
  const [age, setAge] = useState("");
  const [guests, setGuests] = useState(15);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [extras, setExtras] = useState<string[]>(["Cake from us", "Balloons & décor"]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  // Honeypot — real users never tick this; bots that fill every field do.
  const [botcheck, setBotcheck] = useState(false);

  const today = toDateInput(new Date());
  const datePresets = [
    { label: "This weekend", value: toDateInput(addDays(((5 - new Date().getDay() + 7) % 7) || 7)) },
    { label: "In a week", value: toDateInput(addDays(7)) },
    { label: "In 2 weeks", value: toDateInput(addDays(14)) },
  ];

  const guestLabel = guests === MAX_GUESTS ? `${MAX_GUESTS}+` : String(guests);
  const fillPct = ((guests - MIN_GUESTS) / (MAX_GUESTS - MIN_GUESTS)) * 100;
  const summary = `${guestLabel} guests · ${formatDate(date)} · ${formatTime(time)}`;

  const toggleExtra = (item: string) =>
    setExtras((current) =>
      current.includes(item) ? current.filter((x) => x !== item) : [...current, item],
    );

  const handleOpen = () => {
    trackLinkClick({
      title: "Book a Birthday Party",
      group: "Reserve",
      href: "/links#birthday-booking",
    });
    setOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setError("");

    try {
      await sendBooking({
        subject: `Birthday booking — ${celebrant}, ${guestLabel} guests on ${formatDate(date)}`,
        from_name: "Tea Social Cafe — links page",
        botcheck,
        event_type: "Birthday party",
        celebrant,
        age: age.trim() || "Not shared",
        guests: guestLabel,
        date: `${date} (${formatDate(date)})`,
        time: `${time} (${formatTime(time)})`,
        extras: extras.length ? extras.join(", ") : "None selected",
        name,
        phone,
        email: email.trim() || "Not provided",
        notes: notes.trim() || "None",
      });

      trackLinkClick({
        title: "Birthday booking submitted",
        group: "Reserve",
        href: "/links#birthday-booking",
      });
      setSent(true);
    } catch {
      setError(
        `We couldn't send your request just now. Please try again, or call us on ${BUSINESS.telephone}.`,
      );
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappConfirm = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(
    `Hi Tea Social Cafe! I just requested a birthday party for ${celebrant || "us"} — ${summary}.`,
  )}`;

  return (
    <>
      {/* Trigger: 1.5px padded wrapper carrying the rotating gradient ring. */}
      <div className="bd-ring rounded-2xl p-[1.5px] shadow-lg shadow-black/40">
        <button
          type="button"
          onClick={handleOpen}
          className="group relative flex w-full items-center gap-4 overflow-hidden rounded-[calc(1rem-1.5px)] bg-[linear-gradient(135deg,#10312f_0%,#1a2340_55%,#331740_100%)] px-4 py-4 text-left text-white transition duration-200 active:scale-[0.98]"
        >
          {/* Party layer — decorative only, never in the accessibility tree. */}
          <span aria-hidden className="pointer-events-none absolute inset-0">
            {FLOATERS.map(({ Icon, style, size, delay }, i) => (
              <Icon
                key={i}
                style={{ ...style, animationDelay: delay }}
                className={`bd-float absolute ${size} text-(--brand-accent)/35`}
              />
            ))}
            {BULBS.map((color, i) => (
              <span
                key={i}
                style={{
                  left: `${8 + i * 16}%`,
                  top: i % 2 === 0 ? "10%" : "76%",
                  background: color,
                  animationDelay: `${i * 0.32}s`,
                  boxShadow: `0 0 8px ${color}`,
                }}
                className="bd-twinkle absolute h-1.5 w-1.5 rounded-full"
              />
            ))}
            <span className="bd-sheen absolute inset-y-0 -left-8 w-14 bg-white/20 blur-md" />
          </span>

          <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-(--brand-accent)/15">
            {/* Candle glow behind the cake, flickering just off the beat. */}
            <span
              aria-hidden
              className="bd-flicker absolute h-6 w-6 rounded-full bg-(--brand-accent)"
            />
            <Cake className="relative h-5 w-5 text-(--brand-accent)" />
          </span>

          <span className="relative min-w-0 flex-1">
            <span className="block leading-snug font-semibold">Book a Birthday Party</span>
            <span className="mt-0.5 block text-xs text-white/65">
              Cake, décor &amp; a table full of friends
            </span>
          </span>

          <ChevronRight
            className="relative h-4 w-4 shrink-0 text-white/50 transition group-hover:translate-x-0.5 group-hover:text-white"
            aria-hidden
          />
        </button>
      </div>

      <Sheet
        open={open}
        onClose={() => setOpen(false)}
        titleId="birthday-title"
        title="Birthday at Tea Social"
        subtitle={sent ? "Request sent" : "Tell us the plan — we'll set the table."}
        decoration={
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-44 overflow-hidden">
            <div
              className="absolute -top-20 left-1/2 h-56 w-[130%] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, var(--brand-accent) 0%, #ff8fc7 45%, transparent 72%)",
              }}
            />
            {/* Rising cakes */}
            {RISERS.map(({ Icon, left, delay, size }, i) => (
              <Icon
                key={i}
                style={{ left, animationDelay: delay }}
                className={`bd-rise absolute top-24 ${size} text-(--brand-accent)/45`}
              />
            ))}
            {/* String of party bulbs across the top of the sheet */}
            <div className="absolute inset-x-0 top-0 h-px bg-white/15" />
            <div className="absolute inset-x-4 top-0 flex justify-between">
              {[...BULBS, ...BULBS].map((color, i) => (
                <span
                  key={i}
                  style={{
                    background: color,
                    animationDelay: `${i * 0.24}s`,
                    boxShadow: `0 0 10px ${color}`,
                  }}
                  className="bd-twinkle h-2 w-2 rounded-full"
                />
              ))}
            </div>
          </div>
        }
      >
        {sent ? (
          <div className="relative px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
            <div className="rounded-2xl border border-(--brand-accent)/40 bg-(--brand-accent)/10 p-5 text-center">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-(--brand-accent) text-[#062b2a]">
                <Check className="h-6 w-6" strokeWidth={3} />
              </span>
              <p className="mt-4 text-[15px] font-semibold">
                {celebrant ? `${celebrant}'s party is in motion!` : "Your party is in motion!"}
              </p>
              <p className="mt-1 text-sm text-white/70">{summary}</p>
              <p className="mt-3 text-xs text-white/55">
                Our team will call you to confirm the details and the cake.
              </p>
            </div>
            <a
              href={whatsappConfirm}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex h-12 items-center justify-center gap-2 rounded-xl bg-(--brand-accent) text-sm font-semibold text-[#062b2a] transition hover:brightness-105 active:scale-[0.98]"
            >
              <Phone className="h-4 w-4" />
              Confirm faster on WhatsApp
            </a>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-2 h-12 w-full rounded-xl border border-white/15 text-sm text-white/75 transition hover:bg-white/10"
            >
              Back to links
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="relative space-y-5 overflow-y-auto px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))]"
          >
            {/* Whose party */}
            <div className="grid grid-cols-[1fr_5.5rem] gap-3">
              <div>
                <label htmlFor="bd-celebrant" className={labelClass}>
                  <Cake className="h-3.5 w-3.5" /> Birthday star *
                </label>
                <input
                  id="bd-celebrant"
                  required
                  value={celebrant}
                  onChange={(e) => setCelebrant(e.target.value)}
                  placeholder="Who's celebrating?"
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="bd-age" className={labelClass}>
                  Turning
                </label>
                <input
                  id="bd-age"
                  type="number"
                  min={1}
                  max={120}
                  inputMode="numeric"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="—"
                  className={`${fieldClass} text-center`}
                />
              </div>
            </div>

            {/* Guests */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className={`${labelClass} mb-0`}>
                  <PartyPopper className="h-3.5 w-3.5" /> Guests
                </span>
                <span className="rounded-full bg-(--brand-accent)/15 px-3 py-1 text-sm font-semibold text-(--brand-accent) tabular-nums">
                  {guestLabel}
                </span>
              </div>
              <input
                type="range"
                aria-label="Number of guests"
                min={MIN_GUESTS}
                max={MAX_GUESTS}
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="range-slider w-full"
                style={{
                  background: `linear-gradient(to right, var(--brand-accent) ${fillPct}%, rgba(255,255,255,0.15) ${fillPct}%)`,
                }}
              />
              <div className="mt-1 flex justify-between text-[10px] text-white/40">
                <span>{MIN_GUESTS}</span>
                <span>{MAX_GUESTS}+ guests</span>
              </div>
            </div>

            {/* Date */}
            <div>
              <label htmlFor="bd-date" className={labelClass}>
                <CalendarDays className="h-3.5 w-3.5" /> Party date *
              </label>
              <div className="mb-2 flex flex-wrap gap-2">
                {datePresets.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setDate(preset.value)}
                    aria-pressed={date === preset.value}
                    className={chipClass(date === preset.value)}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
              <input
                id="bd-date"
                type="date"
                required
                min={today}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={`${fieldClass} scheme-dark`}
              />
            </div>

            {/* Time */}
            <div>
              <label htmlFor="bd-time" className={labelClass}>
                <Clock className="h-3.5 w-3.5" /> Start time *
              </label>
              <div className="mb-2 flex flex-wrap gap-2">
                {TIME_PRESETS.map((preset) => (
                  <button
                    key={preset.value}
                    type="button"
                    onClick={() => setTime(preset.value)}
                    aria-pressed={time === preset.value}
                    className={chipClass(time === preset.value)}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
              <input
                id="bd-time"
                type="time"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className={`${fieldClass} scheme-dark`}
              />
            </div>

            {/* Extras — multi-select, unlike the single-choice chips above. */}
            <div>
              <span className={labelClass}>
                <Gift className="h-3.5 w-3.5" /> Add to the party
              </span>
              <div className="flex flex-wrap gap-2">
                {EXTRAS.map((item) => {
                  const active = extras.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleExtra(item)}
                      aria-pressed={active}
                      className={`${chipClass(active)} inline-flex items-center gap-1.5`}
                    >
                      {active && <Check className="h-3.5 w-3.5" />}
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Who to call back */}
            <div className="space-y-3">
              <div>
                <label htmlFor="bd-name" className={labelClass}>
                  <User className="h-3.5 w-3.5" /> Your name *
                </label>
                <input
                  id="bd-name"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Who should we contact?"
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="bd-phone" className={labelClass}>
                  <Phone className="h-3.5 w-3.5" /> Phone *
                </label>
                <input
                  id="bd-phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+974 …"
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="bd-email" className={labelClass}>
                  <Mail className="h-3.5 w-3.5" /> Email
                </label>
                <input
                  id="bd-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com (optional)"
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="bd-notes" className={labelClass}>
                  Theme, cake flavour, anything else?
                </label>
                <textarea
                  id="bd-notes"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Colour theme, dietary needs, surprise timing…"
                  className={`${fieldClass} resize-y`}
                />
              </div>
            </div>

            {/* Honeypot: hidden from users and assistive tech, catnip for bots. */}
            <input
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              checked={botcheck}
              onChange={(e) => setBotcheck(e.target.checked)}
              className="hidden"
            />

            {error && (
              <p role="alert" className="flex items-start gap-2 text-sm text-red-300">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                {error}
              </p>
            )}

            {/* Sticky footer keeps the summary and the CTA in thumb reach. */}
            <div
              className={`sticky bottom-0 -mx-5 border-t border-white/10 ${SHEET_BG} px-5 pt-3 pb-1 backdrop-blur-xl`}
            >
              {date && time && (
                <p className="mb-2 text-center text-xs text-white/55">{summary}</p>
              )}
              <button
                type="submit"
                disabled={submitting}
                aria-busy={submitting}
                className="flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-(--brand-accent) text-[15px] font-semibold text-[#062b2a] transition hover:brightness-105 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                {submitting ? "Sending…" : "Request Birthday Booking"}
              </button>
            </div>
          </form>
        )}
      </Sheet>
    </>
  );
}
