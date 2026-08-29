/**
 * GTM dataLayer push for the /links page.
 *
 * Fires a single `links_page_click` event with the link's title, group and
 * destination, which is what the Linktree click counters gave us. Create a
 * Custom Event trigger on that name in GTM and forward it to GA4 as an event
 * with `link_title` / `link_group` / `link_url` as parameters.
 *
 * The array is created if GTM has not loaded yet (it is production-only, see
 * app/layout.tsx), so the call is always safe and never blocks navigation.
 */
type DataLayerWindow = Window & { dataLayer?: Record<string, unknown>[] };

export function trackLinkClick(args: {
  title: string;
  group: string;
  href: string;
}) {
  if (typeof window === "undefined") return;
  const w = window as DataLayerWindow;
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({
    event: "links_page_click",
    link_title: args.title,
    link_group: args.group,
    link_url: args.href,
  });
}
