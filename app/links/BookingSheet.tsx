"use client";

import {
  AlertCircle,
  CalendarCheck,
  CalendarDays,
  Check,
  ChevronRight,
  Clock,
  Loader2,
  Mail,
  Minus,
  Phone,
  Plus,
  Send,
  User,
  Users,
  UsersRound,
} from "lucide-react";
import { useState } from "react";
import { BUSINESS } from "@/lib/seo";
import { submitToWeb3Forms } from "@/lib/web3forms";
import { addDays, formatDate, formatTime, toDateInput } from "./booking";
import { cardBase, cardFeatured } from "./cardStyles";
import { chipClass, fieldClass, labelClass } from "./formStyles";
import Sheet, { SHEET_BG } from "./Sheet";
import { trackLinkClick } from "./track";

const MAX_GUESTS = 20;

/** Popular sitting times, offered as one-tap chips before the time picker. */
const TIME_PRESETS = [
  { label: "Afternoon", value: "16:00" },
  { label: "Early evening", value: "18:30" },
  { label: "Evening", value: "20:00" },
  { label: "Late", value: "21:30" },
];

const OCCASIONS = [
  "Casual visit",
  "Birthday",
  "Study / work",
  "Friends",
  "Date",
];

/**
 * Table reservations, taken in-page.
 *
 * A card that opens a bottom sheet (a centred card from `sm` up) and emails the
 * request through Web3Forms — the same endpoint and inbox as the events form,
 * so nothing new has to be monitored. Keeping it in-page matters here: this is
 * a link-in-bio page opened from Instagram's in-app browser, where bouncing to
 * a third-party form host is where bookings quietly get lost.
 */
export default function BookingSheet() {
  const [open, setOpen] = useState(false);
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [occasion, setOccasion] = useState("Casual visit");
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
    { label: "Today", value: today },
    { label: "Tomorrow", value: toDateInput(addDays(1)) },
    { label: "In 2 days", value: toDateInput(addDays(2)) },
  ];

  // The guest icon grows with the party size — a small sign the control is live.
  const GuestIcon = guests <= 1 ? User : guests <= 8 ? Users : UsersRound;
  const guestLabel = guests === MAX_GUESTS ? `${MAX_GUESTS}+` : String(guests);

  const summary = `${guestLabel} ${guests === 1 ? "guest" : "guests"} · ${formatDate(date)} · ${formatTime(time)}`;

  const handleOpen = () => {
    trackLinkClick({
      title: "Reserve a Table",
      group: "Reserve",
      href: "/links#book-a-table",
    });
    setOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setError("");

    try {
      await submitToWeb3Forms("table", {
        subject: `Table booking — ${guestLabel} guests, ${formatDate(date)} at ${formatTime(time)}`,
        from_name: "Tea Social Cafe — links page",
        botcheck,
        name,
        phone,
        email: email.trim() || "Not provided",
        guests: guestLabel,
        date: `${date} (${formatDate(date)})`,
        time: `${time} (${formatTime(time)})`,
        occasion,
        notes: notes.trim() || "None",
      });

      trackLinkClick({
        title: "Table booking submitted",
        group: "Reserve",
        href: "/links#book-a-table",
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
    `Hi Tea Social Cafe! I just requested a table for ${summary}. Name: ${name}`,
  )}`;

  return (
    <>
      {/* Trigger — styled exactly like a featured link card. */}
      <button
        type="button"
        onClick={handleOpen}
        className={`${cardBase} ${cardFeatured}`}
      >
        <span
          className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#062b2a]/10"
          aria-hidden
        >
          <CalendarCheck className="h-5 w-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block leading-snug font-semibold">
            Reserve a Table
          </span>
          <span className="mt-0.5 block text-xs text-[#062b2a]/70">
            Book your seat at Mirage Residence
          </span>
        </span>
        <ChevronRight
          className="h-4 w-4 shrink-0 opacity-50 transition group-hover:translate-x-0.5 group-hover:opacity-90"
          aria-hidden
        />
      </button>

      <Sheet
        open={open}
        onClose={() => setOpen(false)}
        titleId="booking-title"
        title="Reserve a Table"
        subtitle={
          sent ? "Request sent" : "Tell us when — we'll confirm shortly."
        }
        decoration={
          /* Warm glow so the sheet reads as part of the brand, not a system dialog. */
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-16 h-56 w-56 rounded-full opacity-25 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, var(--brand-accent), transparent 70%)",
            }}
          />
        }
      >
        {sent ? (
          <div className="relative px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
            <div className="rounded-2xl border border-(--brand-accent)/40 bg-(--brand-accent)/10 p-5 text-center">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-(--brand-accent) text-[#062b2a]">
                <Check className="h-6 w-6" strokeWidth={3} />
              </span>
              <p className="mt-4 text-[15px] font-semibold">
                Thanks {name.split(" ")[0] || "so much"} — we&apos;ve got it.
              </p>
              <p className="mt-1 text-sm text-white/70">{summary}</p>
              <p className="mt-3 text-xs text-white/55">
                Your request is on its way to our team. We&apos;ll be in touch
                to confirm.
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
            {/* Party size */}
            <div>
              <span className={labelClass}>
                <GuestIcon className="h-3.5 w-3.5" /> How many guests?
              </span>
              <div className="flex items-center justify-between rounded-2xl border border-white/15 bg-white/5 px-2 py-2">
                <button
                  type="button"
                  onClick={() => setGuests((g) => Math.max(1, g - 1))}
                  disabled={guests <= 1}
                  aria-label="One guest fewer"
                  className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 transition hover:bg-white/20 active:scale-90 disabled:opacity-30"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="font-heading text-3xl tabular-nums">
                  {guestLabel}
                </span>
                <button
                  type="button"
                  onClick={() => setGuests((g) => Math.min(MAX_GUESTS, g + 1))}
                  disabled={guests >= MAX_GUESTS}
                  aria-label="One guest more"
                  className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 transition hover:bg-white/20 active:scale-90 disabled:opacity-30"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              {guests === MAX_GUESTS && (
                <p className="mt-2 text-xs text-white/50">
                  Larger group? Tell us the number in the notes and we&apos;ll
                  arrange it.
                </p>
              )}
            </div>

            {/* Date */}
            <div>
              <label htmlFor="bk-date" className={labelClass}>
                <CalendarDays className="h-3.5 w-3.5" /> Date *
              </label>
              <div className="mb-2 flex flex-wrap gap-2">
                {datePresets.map((preset) => (
                  <button
                    key={preset.value}
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
                id="bk-date"
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
              <label htmlFor="bk-time" className={labelClass}>
                <Clock className="h-3.5 w-3.5" /> Time *
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
                id="bk-time"
                type="time"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className={`${fieldClass} scheme-dark`}
              />
            </div>

            {/* Occasion */}
            <div>
              <span className={labelClass}>Occasion</span>
              <div className="flex flex-wrap gap-2">
                {OCCASIONS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setOccasion(item)}
                    aria-pressed={occasion === item}
                    className={chipClass(occasion === item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Who to call back */}
            <div className="space-y-3">
              <div>
                <label htmlFor="bk-name" className={labelClass}>
                  <User className="h-3.5 w-3.5" /> Name *
                </label>
                <input
                  id="bk-name"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="bk-phone" className={labelClass}>
                  <Phone className="h-3.5 w-3.5" /> Phone *
                </label>
                <input
                  id="bk-phone"
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
                <label htmlFor="bk-email" className={labelClass}>
                  <Mail className="h-3.5 w-3.5" /> Email
                </label>
                <input
                  id="bk-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com (optional)"
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="bk-notes" className={labelClass}>
                  Anything else?
                </label>
                <textarea
                  id="bk-notes"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Highchair, window seat, celebration…"
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
              <p
                role="alert"
                className="flex items-start gap-2 text-sm text-red-300"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                {error}
              </p>
            )}

            {/* Sticky footer: the summary keeps the choices visible while the
                    fields scroll, and the CTA never leaves the thumb's reach. */}
            <div
              className={`sticky bottom-0 -mx-5 border-t border-white/10 ${SHEET_BG} px-5 pt-3 pb-1 backdrop-blur-xl`}
            >
              {date && time && (
                <p className="mb-2 text-center text-xs text-white/55">
                  {summary}
                </p>
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
                {submitting ? "Sending…" : "Request Table"}
              </button>
            </div>
          </form>
        )}
      </Sheet>
    </>
  );
}
