import Link from "next/link";
import type { ReactNode } from "react";

/* -------------------------------------------------------------------------- */
/* Blog content + registry                                                    */
/* -------------------------------------------------------------------------- */
/* Doha-targeted posts for local SEO. Add a new object to `posts` and it       */
/* automatically appears on /blog, gets its own /blog/[slug] page, and is       */
/* included in the sitemap. Prose is styled by the `.article` class in           */
/* globals.css, so bodies only need semantic elements.                          */

export type Faq = { q: string; a: string };

export type BlogPost = {
  slug: string;
  title: string;
  /* Optional override for the <title> tag; falls back to `title`. */
  seoTitle?: string;
  description: string;
  excerpt: string;
  keywords: string[];
  image: string;
  imageAlt: string;
  category: string;
  datePublished: string; // ISO date
  dateModified: string; // ISO date
  author: string;
  readingTime: string;
  faqs: Faq[];
  body: ReactNode;
};

/* Shared inline CTA used at the foot of every post body. */
function PostCta() {
  return (
    <div className="not-prose my-8 rounded-2xl bg-linear-to-r from-(--brand) to-[#062b2a] p-6 text-white md:p-8">
      <p className="font-heading text-xl md:text-2xl">Come say hello at Tea Social Cafe</p>
      <p className="mt-2 text-sm text-white/80">
        Find us at Building 8 (Mirage Residence), Street 880, Doha. Dine in, grab a boba to go, or plan
        something special with us.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Link
          href="/#contact"
          className="hover-lift rounded-full bg-(--brand-accent) px-5 py-2.5 text-sm font-semibold text-[#073231]"
        >
          Find &amp; visit us
        </Link>
        <Link
          href="/events-planning-in-qatar"
          className="rounded-full border border-white/30 bg-white/5 px-5 py-2.5 text-sm font-medium hover:bg-white/15"
        >
          Plan an event
        </Link>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Posts                                                                      */
/* -------------------------------------------------------------------------- */

export const posts: BlogPost[] = [
  {
    slug: "best-bubble-tea-in-doha",
    title: "The Best Bubble Tea in Doha: A Local's Guide to Boba",
    seoTitle: "Best Bubble Tea in Doha — A Local's Guide to Boba (2026)",
    description:
      "Craving boba in Doha? Our local guide covers the best bubble tea flavours, how to order, what makes great pearls and where to find fresh, handcrafted bubble tea in Qatar.",
    excerpt:
      "From classic brown sugar to fruity fresh-tea blends — everything you need to know about finding great bubble tea in Doha, and how to order like a local.",
    keywords: [
      "best bubble tea Doha",
      "bubble tea Doha",
      "boba Doha",
      "bubble tea Qatar",
      "bubble tea near me Doha",
      "brown sugar boba Qatar",
      "بابل تي الدوحة",
    ],
    image: "/BubbleTea-Section-1.png",
    imageAlt: "Freshly made bubble tea with tapioca pearls at Tea Social Cafe, Doha",
    category: "Bubble Tea",
    datePublished: "2026-06-16",
    dateModified: "2026-07-08",
    author: "Tea Social Cafe Team",
    readingTime: "7 min read",
    faqs: [
      {
        q: "Where can I find the best bubble tea in Doha?",
        a: "Doha's bubble tea scene has grown fast, but the freshest cups come from cafés that cook their tapioca pearls in small batches throughout the day. Tea Social Cafe at Mirage Residence brews tea to order and makes its brown sugar and fruit blends fresh, so you get chewy pearls and balanced sweetness every time.",
      },
      {
        q: "What is bubble tea made of?",
        a: "Bubble tea (also called boba) is a tea base — black, green, oolong or fruit tea — shaken with milk and/or fruit, sweetener and ice, then finished with toppings such as tapioca pearls, popping boba or jelly. The 'bubbles' are the chewy tapioca pearls at the bottom of the cup.",
      },
      {
        q: "How much sugar should I order in my bubble tea?",
        a: "Most cafés let you choose your sweetness level from 0% to 100%. If you are new to boba, try 50% sweetness first — the brown sugar and fruit flavours still come through without being overpowering. You can always adjust on your next visit.",
      },
      {
        q: "Is bubble tea popular in Qatar?",
        a: "Very. Bubble tea has become one of Doha's favourite social drinks, especially among students and young professionals who meet over boba the way others meet over coffee. It is a year-round treat — refreshing in Qatar's summer heat and cosy on cooler evenings.",
      },
    ],
    body: (
      <>
        <p>
          If you have spent any time in Doha lately, you have probably noticed it: bubble tea is
          everywhere. What started as a niche Taiwanese drink has become one of Qatar&apos;s favourite
          ways to catch up with friends, power through a study session or simply treat yourself on a
          hot afternoon. But with so many options popping up, how do you find a cup that&apos;s actually
          worth it? This local&apos;s guide breaks down what makes great bubble tea, the flavours worth
          trying, and how to order boba in Doha like you have been doing it for years.
        </p>

        <h2>What exactly is bubble tea?</h2>
        <p>
          Bubble tea — or boba — is a tea-based drink built on three things: a good tea base, a
          balance of milk or fruit and sweetness, and chewy toppings. The classic version pairs
          brewed black tea with milk, sweetener and ice, then adds tapioca pearls that sink to the
          bottom and give the drink its signature texture. The &ldquo;bubbles&rdquo; are those pearls,
          which you sip up through an oversized straw.
        </p>
        <p>
          The magic is in freshness. Tapioca pearls are at their best within a few hours of being
          cooked — soft, springy and slightly sweet. Left too long, they turn hard and chalky. That
          single detail is the biggest difference between a forgettable cup and a genuinely great one,
          which is why the best spots in Doha cook their pearls in small batches through the day
          rather than all at once in the morning.
        </p>

        <h2>The flavours worth trying in Doha</h2>
        <p>
          If you are building your bubble tea shortlist, these are the crowd-pleasers to start with:
        </p>
        <ul>
          <li>
            <strong>Brown sugar milk tea</strong> — the modern classic. Warm caramel notes from
            brown sugar syrup streaked down the cup, paired with milk and chewy pearls. Rich without
            being cloying.
          </li>
          <li>
            <strong>Classic milk tea</strong> — the benchmark every café should nail. If a place gets
            this one right, everything else usually follows.
          </li>
          <li>
            <strong>Fresh fruit teas</strong> — mango, passionfruit and strawberry blends made with
            real fruit are perfect for Qatar&apos;s climate: bright, refreshing and lighter than milk
            tea.
          </li>
          <li>
            <strong>Matcha</strong> — for green-tea lovers, a good matcha boba is earthy, smooth and
            not too sweet.
          </li>
          <li>
            <strong>Taro</strong> — nutty, vanilla-like and famously photogenic thanks to its soft
            purple colour.
          </li>
        </ul>

        <h2>How to order boba like a local</h2>
        <p>
          Ordering bubble tea comes with a few choices that first-timers sometimes find surprising.
          Here is the quick version so you can order with confidence:
        </p>
        <ul>
          <li>
            <strong>Choose your sweetness.</strong> Most menus let you pick 0%, 25%, 50%, 75% or
            100%. Newcomers should try 50% — you still taste the flavour without a sugar rush.
          </li>
          <li>
            <strong>Pick your ice level.</strong> Less ice means a stronger, less diluted drink; more
            ice keeps it frosty in the Doha heat.
          </li>
          <li>
            <strong>Add your toppings.</strong> Tapioca pearls are standard, but popping boba,
            grass jelly, pudding and cheese foam are all worth experimenting with.
          </li>
        </ul>
        <p>
          Half the fun is dialling in your personal order over a few visits until it&apos;s exactly
          how you like it — and that is where a nearby, dependable café really pays off.
        </p>

        <h2>Where bubble tea fits into Doha&apos;s café culture</h2>
        <p>
          In Doha, boba is social. It is what you order when you meet a friend between classes, when
          the family wants a treat after dinner, or when you need a reason to sit somewhere pleasant
          for an hour. That is exactly the spirit behind{" "}
          <Link href="/">Tea Social Cafe</Link> at Mirage Residence — a relaxed spot where the tea is
          brewed to order and the pearls are made fresh, alongside{" "}
          <Link href="/blog/best-cafes-to-study-and-work-in-doha">
            a comfortable space to sit, study or work
          </Link>
          . Whether you are grabbing a quick cup to go or settling in with friends, bubble tea is
          best enjoyed unhurried.
        </p>
        <p>
          If you are planning something bigger — a birthday, a college meet-up or a team catch-up —
          a boba bar is always a hit. You can see how we handle that on our{" "}
          <Link href="/events-planning-in-qatar">event planning page</Link>.
        </p>

        <h2>The bottom line</h2>
        <p>
          The best bubble tea in Doha is the one that is fresh, balanced and made the way you like it.
          Look for cafés that brew tea to order, cook their pearls in small batches, and let you
          control the sweetness. Start with a brown sugar milk tea or a fresh fruit blend, tweak from
          there, and you will quickly find your go-to cup. Boba is a small, everyday joy — and Doha
          has embraced it fully.
        </p>

        <PostCta />
      </>
    ),
  },

  {
    slug: "best-cafes-to-study-and-work-in-doha",
    title: "The Best Cafés to Study and Work in Doha",
    seoTitle: "Best Cafés to Study & Work in Doha — A Practical Guide",
    description:
      "Looking for a quiet, comfortable café to study or work in Doha? Here's what to look for — Wi-Fi, seating, coffee and atmosphere — plus how to find a productive spot in Qatar.",
    excerpt:
      "Reliable Wi-Fi, comfy seating, good coffee and the right vibe — a practical guide to finding a café in Doha where you can actually get things done.",
    keywords: [
      "cafes to study in Doha",
      "work friendly cafe Doha",
      "quiet cafe Doha",
      "wifi cafe Doha",
      "best cafe to work Qatar",
      "study spots Doha",
      "coffee shop Doha",
    ],
    image: "/Coffee-section2.png",
    imageAlt: "A calm café corner with specialty coffee, ideal for working in Doha",
    category: "Café Life",
    datePublished: "2026-06-29",
    dateModified: "2026-07-09",
    author: "Tea Social Cafe Team",
    readingTime: "8 min read",
    faqs: [
      {
        q: "What makes a café good for studying or working?",
        a: "The essentials are dependable Wi-Fi, plenty of power outlets, comfortable seating you can use for a couple of hours, a noise level that lets you focus, and good coffee or tea to keep you going. A relaxed staff who don't rush you is just as important.",
      },
      {
        q: "Are there quiet cafés in Doha for remote work?",
        a: "Yes. Beyond the busy mall food courts, Doha has neighbourhood cafés — like Tea Social Cafe at Mirage Residence — that offer calmer, more comfortable settings with indoor and outdoor seating, which suit remote work and study far better than high-traffic chains.",
      },
      {
        q: "Is it okay to work for a few hours in a café in Doha?",
        a: "In most independent cafés, yes — especially outside peak meal times. A good rule of etiquette is to order something every hour or so, avoid taking loud calls, and free up larger tables during busy periods so you're a welcome regular rather than a one-time guest.",
      },
      {
        q: "What should I order to stay productive?",
        a: "A specialty coffee such as a flat white or pour-over gives you a clean caffeine lift, while a lighter tea or fruit-based bubble tea is a good afternoon option when you want energy without another strong coffee. Pair it with a small snack to keep focus steady.",
      },
    ],
    body: (
      <>
        <p>
          Whether you are a university student with exams around the corner, a freelancer chasing a
          deadline or a remote worker who just needs a change of scenery, the right café can make a
          real difference to how much you actually get done. Doha has no shortage of places to grab a
          coffee — but a great <em>work</em> café is a different thing entirely. Here is a practical
          guide to what separates a productive spot from a pretty one, and how to find your ideal
          study base in Qatar.
        </p>

        <h2>The five things that actually matter</h2>
        <p>
          Ignore the aesthetics for a second. When you are there to focus, these are the factors that
          decide whether you have a productive session or pack up after twenty minutes:
        </p>
        <ul>
          <li>
            <strong>Reliable Wi-Fi.</strong> Non-negotiable. Fast, stable internet is the whole point
            of working outside your home or office.
          </li>
          <li>
            <strong>Power outlets.</strong> A laptop that dies at 40% ends the session. The best
            work cafés make outlets easy to reach.
          </li>
          <li>
            <strong>Comfortable seating.</strong> You need a chair and table you can happily use for
            two hours — not a bar stool that leaves your back aching.
          </li>
          <li>
            <strong>A manageable noise level.</strong> A gentle hum of background chatter is fine —
            even helpful — but you want to be able to think and take the occasional quiet call.
          </li>
          <li>
            <strong>Staff who let you settle in.</strong> A relaxed café where you are not rushed
            makes all the difference between a one-off visit and a regular routine.
          </li>
        </ul>

        <h2>Neighbourhood cafés beat the food court</h2>
        <p>
          Doha&apos;s malls are convenient, but food courts and high-traffic chains are rarely built
          for focus — they are loud, seating turns over quickly and it is hard to find an outlet.
          Neighbourhood and residence cafés tend to be the smarter choice. They are calmer, the
          seating is more comfortable, and the pace is slower, which is exactly what you want when
          you are settling in for a study block.
        </p>
        <p>
          A spot like <Link href="/">Tea Social Cafe</Link> at Mirage Residence is a good example of
          the type: indoor and outdoor seating, a relaxed atmosphere, and both{" "}
          <Link href="/blog/best-bubble-tea-in-doha">bubble tea</Link> and specialty coffee on the
          menu, so you can switch drinks as the hours go by. Convenient parking nearby also means you
          are not circling for a spot before you have even opened your laptop.
        </p>

        <h2>What to order for a long session</h2>
        <p>
          Your drink strategy matters more than you might think. Here is a simple approach:
        </p>
        <ul>
          <li>
            <strong>Start with a specialty coffee.</strong> A flat white, cortado or pour-over gives
            you a clean, focused lift to open the session.
          </li>
          <li>
            <strong>Switch to something lighter mid-afternoon.</strong> A fruit tea or a lower-sugar
            bubble tea keeps your energy up without a second heavy hit of caffeine.
          </li>
          <li>
            <strong>Keep a small snack on hand.</strong> A pastry or light bite steadies your focus
            and gives you a natural reason to take a short break.
          </li>
        </ul>

        <h2>Café etiquette for regulars</h2>
        <p>
          If you want a café to become your reliable second office, be the kind of guest they are
          happy to see. Order something roughly every hour, avoid taking loud calls at your table,
          and during busy meal times try to free up larger tables for groups. Treat the space well
          and you will quickly go from customer to regular — often with a friendlier welcome and the
          best seat in the house.
        </p>

        <h2>Finding your spot</h2>
        <p>
          The perfect study or work café in Doha is the one that ticks your personal boxes: strong
          Wi-Fi, a comfy chair, good coffee and an atmosphere that helps you focus. Test a couple of
          neighbourhood cafés during the hours you actually plan to work, notice where you feel most
          productive, and make it your base. Once you have found it, a great café does not just help
          you finish the task — it makes the work itself more enjoyable.
        </p>

        <PostCta />
      </>
    ),
  },

  {
    slug: "hi-tea-culture-in-qatar",
    title: "A Guide to Hi-Tea Culture in Qatar",
    seoTitle: "Hi-Tea in Qatar — A Guide to Afternoon Tea in Doha",
    description:
      "What is hi-tea, and why is it so popular in Qatar? A friendly guide to Doha's afternoon hi-tea culture — what to expect, what to order and how to plan the perfect catch-up.",
    excerpt:
      "Part afternoon tea, part social ritual — here's what hi-tea means in Qatar, what a great spread includes, and how to plan a relaxed hi-tea catch-up in Doha.",
    keywords: [
      "hi-tea Qatar",
      "hi-tea Doha",
      "high tea Doha",
      "afternoon tea Qatar",
      "hi tea places Doha",
      "hi-tea catch up Doha",
    ],
    image: "/Snacks-section1.png",
    imageAlt: "A hi-tea spread of sweet and savoury treats in Doha, Qatar",
    category: "Hi-Tea",
    datePublished: "2026-07-06",
    dateModified: "2026-07-10",
    author: "Tea Social Cafe Team",
    readingTime: "7 min read",
    faqs: [
      {
        q: "What is hi-tea?",
        a: "Hi-tea (often written high tea or afternoon tea) is a relaxed mid-to-late afternoon meal built around tea or coffee and a spread of small sweet and savoury bites — think pastries, cakes, sandwiches and treats. In Qatar it has become a popular social occasion for catching up with friends and family.",
      },
      {
        q: "Why is hi-tea so popular in Qatar?",
        a: "Hi-tea suits the local rhythm of the day perfectly. Afternoons are ideal for unhurried catch-ups, and the format is naturally social — a shared table of treats, unlimited conversation and no rush. It works for friends, family gatherings and celebrations alike.",
      },
      {
        q: "What is usually served at a hi-tea in Doha?",
        a: "A good hi-tea balances sweet and savoury: pastries, cakes and sweet treats alongside sandwiches or savoury bites, all paired with a range of teas, specialty coffee and often bubble tea. Presentation matters — expect a beautifully arranged spread that is as photogenic as it is tasty.",
      },
      {
        q: "How do I plan a hi-tea catch-up or celebration?",
        a: "Decide on your group size, pick a café with a relaxed setting and both indoor and outdoor seating, and let them know your headcount in advance so they can prepare the spread. Tea Social Cafe in Doha hosts hi-tea catch-ups and celebrations — you can enquire through our event planning page.",
      },
    ],
    body: (
      <>
        <p>
          Ask around in Doha and you will find that &ldquo;hi-tea&rdquo; means something more than a
          pot of tea and a biscuit. In Qatar, hi-tea has grown into a beloved social ritual — a
          relaxed afternoon occasion built around good company, a beautiful spread of sweet and
          savoury bites, and no reason to rush. If you have been meaning to try it, or you want to
          host one yourself, here is everything you need to know about hi-tea culture in Qatar.
        </p>

        <h2>So, what is hi-tea?</h2>
        <p>
          Hi-tea — you will also see it written as high tea or afternoon tea — is a mid-to-late
          afternoon gathering centred on tea or coffee and an assortment of small dishes. The idea
          has roots in British afternoon-tea tradition, but Qatar has made it its own: a warm,
          social, unhurried event that fits neatly into the local rhythm of the day. It is less about
          a formal menu and more about the experience of sitting down together over lovely food and
          endless conversation.
        </p>

        <h2>What a great hi-tea spread looks like</h2>
        <p>
          The heart of hi-tea is variety and balance. A well-put-together spread gives everyone at
          the table something to reach for:
        </p>
        <ul>
          <li>
            <strong>Sweet treats</strong> — cakes, pastries, tarts and other little desserts are the
            stars of the table.
          </li>
          <li>
            <strong>Savoury bites</strong> — sandwiches and savoury snacks balance out the sweetness
            and keep the spread satisfying.
          </li>
          <li>
            <strong>A range of drinks</strong> — a proper selection of teas is essential, but in Doha
            you will usually find specialty coffee and{" "}
            <Link href="/blog/best-bubble-tea-in-doha">bubble tea</Link> on offer too, so everyone
            gets their favourite.
          </li>
          <li>
            <strong>Beautiful presentation</strong> — half the joy of hi-tea is how it looks. A
            well-styled table is made for slowing down, sharing and, yes, a few photos.
          </li>
        </ul>

        <h2>Why hi-tea suits Qatar so well</h2>
        <p>
          Hi-tea has taken off in Qatar for a simple reason: it fits how people here like to spend
          time. Afternoons are made for unhurried catch-ups, and the hi-tea format is social by
          design — a shared table, a generous spread and hours of conversation. It works just as well
          for a quiet catch-up between two friends as it does for a larger family gathering or a
          small celebration. It is relaxed, inclusive and endlessly repeatable, which is exactly why
          it has become a fixture of Doha&apos;s café scene.
        </p>

        <h2>How to plan the perfect hi-tea catch-up</h2>
        <p>
          Hosting a memorable hi-tea is straightforward when you plan a little ahead:
        </p>
        <ul>
          <li>
            <strong>Know your numbers.</strong> A rough headcount helps the café prepare the right
            amount of food and set aside comfortable seating.
          </li>
          <li>
            <strong>Pick the right setting.</strong> Look for a relaxed café with both indoor and
            outdoor seating so you can choose the mood on the day.
          </li>
          <li>
            <strong>Give a little notice.</strong> Letting the café know in advance means the spread
            is ready and beautifully arranged when you arrive.
          </li>
          <li>
            <strong>Make it yours.</strong> Celebrating a birthday or a milestone? A few personal
            touches turn an afternoon tea into a proper occasion.
          </li>
        </ul>
        <p>
          At <Link href="/">Tea Social Cafe</Link> in Doha, hi-tea catch-ups are one of our
          favourite things to host — cosy seating, a handcrafted drinks menu and a spread designed to
          be shared. If you are planning a larger gathering or a celebration, our{" "}
          <Link href="/events-planning-in-qatar">event planning page</Link> walks you through the
          options.
        </p>

        <h2>The takeaway</h2>
        <p>
          Hi-tea in Qatar is really about the pause it creates — an excuse to slow down, gather the
          people you like and enjoy something lovely together. Whether you keep it simple with a
          friend or plan a full spread for a celebration, it is one of the most charming ways to
          spend an afternoon in Doha. All that is left to decide is who you will invite.
        </p>

        <PostCta />
      </>
    ),
  },
];

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

export function getAllPosts(): BlogPost[] {
  /* Newest first. */
  return [...posts].sort(
    (a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, limit = 2): BlogPost[] {
  return getAllPosts()
    .filter((p) => p.slug !== slug)
    .slice(0, limit);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
