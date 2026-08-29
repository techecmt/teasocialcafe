/**
 * Web3Forms submission, shared by every form on the site.
 *
 * Sent as multipart FormData with no custom headers, which makes it a CORS
 * "simple request" the browser fires directly. That is not a style choice:
 * `Content-Type: application/json` forces a preflight, and api.web3forms.com
 * answers OPTIONS with a 403 carrying no Access-Control-Allow-Origin, so a
 * JSON submission never leaves the browser — it fails with "TypeError: Failed
 * to fetch" before the request is made. Multipart is also what their plain
 * HTML form integration posts, so it is the best-supported path.
 *
 * Server-side submission is not an option to fall back on: their free plan
 * rejects requests from a server IP ("Use our API in client side").
 */

// Access keys are public by design (the request is made from the browser);
// the env var just makes it swappable per deployment.
const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "895002bb-0b41-4545-98a0-694c8cdd3290";

/** Posts one submission. Throws if the request or the API rejects it. */
export async function submitToWeb3Forms(fields: Record<string, unknown>) {
  const body = new FormData();
  body.append("access_key", WEB3FORMS_ACCESS_KEY);

  for (const [key, value] of Object.entries(fields)) {
    // The honeypot follows checkbox semantics: an unticked box is never
    // submitted, and the string "false" would read as a tick.
    if (key === "botcheck" && !value) continue;
    body.append(key, String(value));
  }

  const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body });
  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.message ?? "Submission failed");
}
