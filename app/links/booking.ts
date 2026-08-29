/** Shared plumbing for the two booking sheets on /links. */

// Web3Forms access keys are public by design (the request is made from the
// browser); the env var just makes it swappable per deployment. Same key as
// the events enquiry form, so every request lands in the same inbox.
const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "895002bb-0b41-4545-98a0-694c8cdd3290";

/** `YYYY-MM-DD` in the visitor's own timezone — `toISOString()` would shift the day. */
export function toDateInput(date: Date) {
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 10);
}

export function addDays(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d;
}

export function formatDate(value: string) {
  if (!value) return "";
  // Parsed as local midnight, not UTC, so the weekday matches what was picked.
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export function formatTime(value: string) {
  if (!value) return "";
  const [h, m] = value.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, "0")} ${suffix}`;
}

/** Posts a booking to Web3Forms. Throws if the request or the API rejects it. */
export async function sendBooking(fields: Record<string, unknown>) {
  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ access_key: WEB3FORMS_ACCESS_KEY, ...fields }),
  });

  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.message ?? "Submission failed");
}
