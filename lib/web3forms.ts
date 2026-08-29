/**
 * Web3Forms submission, shared by every form on the site.
 *
 * Two paths, in order:
 *
 * 1. `fetch` with multipart FormData and no custom headers, which is a CORS
 *    "simple request" the browser sends directly. This matters: with
 *    `Content-Type: application/json` the browser must preflight, and
 *    api.web3forms.com answers OPTIONS with a 403 carrying no
 *    Access-Control-Allow-Origin, so a JSON submission never leaves the
 *    browser at all. Multipart is also what their plain HTML form
 *    integration posts, so it is their best-supported path.
 *
 * 2. If that fetch is blocked before it reaches the network — a TypeError,
 *    which is all the browser will tell us about a CORS or connectivity
 *    failure — the same fields are posted again through a hidden form
 *    targeting a hidden iframe. A cross-origin *form* POST is not subject to
 *    CORS in any way, so the submission still arrives; the trade is that the
 *    reply lands in an opaque iframe we are not allowed to read, so success
 *    can only be assumed. That is the right trade for a booking: a request
 *    that quietly arrives beats one the visitor is told to phone in.
 *
 * Submitting from the server is not an option to fall back on: the free plan
 * rejects requests from a server IP ("Use our API in client side").
 */

const ENDPOINT = "https://api.web3forms.com/submit";

// Access keys are public by design (the request is made from the browser);
// the env var just makes it swappable per deployment.
const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "895002bb-0b41-4545-98a0-694c8cdd3290";

/** How long to wait for the fallback iframe before assuming it landed. */
const FALLBACK_TIMEOUT_MS = 12_000;

/**
 * Field pairs as they go on the wire.
 *
 * The honeypot follows checkbox semantics: an unticked box is never submitted,
 * and the string "false" would read as a tick.
 */
function entries(fields: Record<string, unknown>) {
  return [
    ["access_key", WEB3FORMS_ACCESS_KEY] as const,
    ...Object.entries(fields)
      .filter(([key, value]) => !(key === "botcheck" && !value))
      .map(([key, value]) => [key, String(value)] as const),
  ];
}

/** Posts one submission. Throws if the API itself rejects it. */
export async function submitToWeb3Forms(fields: Record<string, unknown>) {
  const body = new FormData();
  for (const [key, value] of entries(fields)) body.append(key, value);

  try {
    const res = await fetch(ENDPOINT, { method: "POST", body });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message ?? "Submission failed");
  } catch (error) {
    // Only a blocked/failed request is worth retrying. An API rejection is a
    // real answer — retrying it through the iframe would send it twice.
    if (!(error instanceof TypeError)) throw error;
    await submitViaHiddenForm(fields);
  }
}

function submitViaHiddenForm(fields: Record<string, unknown>) {
  return new Promise<void>((resolve, reject) => {
    if (typeof document === "undefined") {
      reject(new Error("No document to submit from"));
      return;
    }

    const target = `w3f-${Date.now()}`;
    const iframe = document.createElement("iframe");
    iframe.name = target;
    iframe.src = "about:blank";
    iframe.setAttribute("aria-hidden", "true");
    iframe.style.display = "none";

    const form = document.createElement("form");
    form.action = ENDPOINT;
    form.method = "POST";
    form.target = target;
    form.style.display = "none";
    for (const [key, value] of entries(fields)) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value;
      form.append(input);
    }

    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      form.remove();
      iframe.remove();
      resolve();
    };

    // The response is cross-origin, so `load` firing is the only signal we
    // get; if even that is swallowed, assume the POST landed rather than
    // pushing the visitor to submit a second time.
    const timer = setTimeout(finish, FALLBACK_TIMEOUT_MS);

    // The first load is the iframe's own about:blank. Submit on that, and
    // treat the next one as the response.
    iframe.addEventListener(
      "load",
      () => {
        iframe.addEventListener("load", finish, { once: true });
        form.submit();
      },
      { once: true },
    );

    document.body.append(iframe, form);
  });
}
