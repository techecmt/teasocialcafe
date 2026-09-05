/**
 * Booking submission, shared by every form on the site.
 *
 * Posts to our own /api/booking route, which does the actual sending. Being
 * same-origin, there is no CORS to negotiate and no third-party bot check in
 * front of the request — and unlike the old cross-origin setup, the response is
 * readable, so a failure is a failure the form can honestly report.
 */

export type BookingForm = "table" | "birthday" | "events";

/** Posts one submission. Throws if it did not send. */
export async function submitBooking(form: BookingForm, fields: Record<string, unknown>) {
  const res = await fetch("/api/booking", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ form, fields }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.success) throw new Error(data.message ?? "Submission failed");
}
