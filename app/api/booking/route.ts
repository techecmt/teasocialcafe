import { BUSINESS } from "@/lib/seo";

/**
 * Booking and enquiry submissions, emailed to the café via Resend.
 *
 * This runs on the server on purpose. The previous provider had to be called
 * from the browser, which put every submission at the mercy of the endpoint's
 * CORS headers and bot protection — when those changed, submissions failed in
 * a way the page could not even detect. Posting to our own origin removes CORS
 * from the picture entirely, keeps the API key off the client, and gives the
 * form a real success/failure answer to show the visitor.
 */

const FORM_LABELS = {
  table: "Table booking",
  birthday: "Birthday booking",
  events: "Event enquiry",
} as const;

type Form = keyof typeof FORM_LABELS;

/**
 * Sender address. Must be on a domain verified in the café's own Resend
 * account — Resend rejects anything else before it sends, so this is not a
 * detail that can be left to guesswork. Override with BOOKING_FROM if the
 * verified domain ever differs from the site's.
 */
const FROM = process.env.BOOKING_FROM ?? `${BUSINESS.name} <bookings@teasocialcafe-qa.com>`;
const TO = process.env.BOOKING_TO ?? BUSINESS.email;

const MAX_FIELDS = 40;
const MAX_VALUE = 2000;

const ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (c) => ESCAPES[c]);

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const titleCase = (key: string) =>
  key.replace(/_/g, " ").replace(/^./, (c) => c.toUpperCase());

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — booking email not sent");
    return Response.json({ success: false, message: "Email is not configured" }, { status: 500 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ success: false, message: "Invalid request" }, { status: 400 });
  }

  const { form, fields } = (payload ?? {}) as {
    form?: string;
    fields?: Record<string, unknown>;
  };

  if (!form || !(form in FORM_LABELS) || !fields || typeof fields !== "object") {
    return Response.json({ success: false, message: "Invalid request" }, { status: 400 });
  }

  // Honeypot. Answer as though it sent so the bot has nothing to learn from.
  if (fields.botcheck) return Response.json({ success: true });

  const label = FORM_LABELS[form as Form];

  const rows = Object.entries(fields)
    .filter(([key]) => !["botcheck", "subject", "from_name"].includes(key))
    .slice(0, MAX_FIELDS)
    .map(([key, value]) => [titleCase(key), String(value ?? "").slice(0, MAX_VALUE)] as const);

  const subject =
    String(fields.subject ?? `${label} — ${BUSINESS.name}`)
      .replace(/[\r\n]+/g, " ")
      .slice(0, 200);

  const replyTo = typeof fields.email === "string" && isEmail(fields.email.trim())
    ? fields.email.trim()
    : undefined;

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;max-width:600px">
      <h2 style="margin:0 0 4px">${escapeHtml(label)}</h2>
      <p style="margin:0 0 16px;color:#666;font-size:13px">via ${escapeHtml(BUSINESS.name)} website</p>
      <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;font-size:14px">
        ${rows
          .map(
            ([key, value], i) => `
          <tr style="background:${i % 2 ? "#fff" : "#f6f8f8"}">
            <td style="vertical-align:top;color:#666;white-space:nowrap">${escapeHtml(key)}</td>
            <td style="vertical-align:top"><strong>${escapeHtml(value)}</strong></td>
          </tr>`,
          )
          .join("")}
      </table>
    </div>`;

  const text = rows.map(([key, value]) => `${key}: ${value}`).join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: FROM, to: [TO], subject, html, text, reply_to: replyTo }),
  });

  if (!res.ok) {
    console.error("Resend rejected a booking:", res.status, await res.text());
    return Response.json({ success: false, message: "Could not send" }, { status: 502 });
  }

  return Response.json({ success: true });
}
