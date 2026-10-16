// 本文件由 scripts/brief-to-config.mjs 从 bente-heat-reactive-knit.md 生成
// 生成时间：2026-10-16
// 之后可以直接手改，改完重新 push 就生效。

export type NavItem = { label: string; href: string };
export type Link = { label: string; href: string };
export type Capability = { title: string; desc: string };
export type Stat = { value: string; label: string };
export type FaqItem = { q: string; a: string };

export type SiteConfig = {
  domain: string;
  launchedAt: string;
  brand: { name: string; tagline: string };
  industry: { name: string; productsWord: string; keywords: string[] };
  market: { primary: string; language: string };
  contact: { email: string; phone?: string; whatsapp?: string; address?: string };
  form: { provider: "web3forms" | "formspree" | "none"; accessKey?: string };
  seo: {
    title: string;
    description: string;
    titleTemplate: string;
    googleSiteVerification?: string;
    ogImage?: string;
  };
  hero: {
    eyebrow?: string;
    title: string;
    subtitle: string;
    bullets: string[];
    ctaPrimary: Link;
    ctaSecondary?: Link;
  };
  trustBar: string[];
  capabilities: { title: string; subtitle?: string; items: Capability[] };
  stats: Stat[];
  faq: FaqItem[];
  footer: { about: string; note?: string };
};

export const site: SiteConfig = {
  domain: "benteheatknit.com",
  launchedAt: "2026-10-16",

  brand: {
    name: "Bente",
    tagline: "Colour-changing knitwear, knitted in our own mill",
  },

  industry: {
    name: "Heat-Reactive Knitwear",
    productsWord: "Shop",
    keywords: ["heat reactive knitwear","color changing sweater","temperature changing hoodie","heat reactive long sleeve knit","colour changing knit jumper"],
  },

  market: {
    primary: "North America & Europe",
    language: "en",
  },

  contact: {
    email: "hello@benteheatknit.com",
    phone: "",
    whatsapp: "8618166084589",
    address: "Dongguan, Guangdong, China",
  },

  form: {
    provider: "none",
    accessKey: "",
  },

  seo: {
    title: "Heat Reactive Knitwear | Colour-Changing Knits by Bente",
    description: "Heat-reactive knitwear that changes colour with temperature. Knitted in our own mill, wash-resistant, low MOQ, worldwide shipping.",
    titleTemplate: "%s | Bente",
    googleSiteVerification: "",
    // ogImage: "/og.jpg",
  },

  hero: {
    eyebrow: "Knitted in our own mill",
    title: "Knitwear that changes colour with the weather.",
    subtitle: "Heat-reactive yarn, knitted in our own mill in Dongguan — not sourced, not printed on. Below 15°C it turns one colour, above it turns another.",
    bullets: ["Colour change is knitted into the yarn, not printed on top","Wash-resistant formulation, tested over repeated cycles","Worldwide shipping, tracked door to door"],
    ctaPrimary: { label: "Shop the collection", href: "/products/" },
    ctaSecondary: { label: "Our mill", href: "/about/" },
  },

  trustBar: ["Own knitting mill","Wash-resistant colour change","Worldwide shipping"],

  capabilities: {
    title: "Why our colour change lasts",
    subtitle: "Most colour-changing clothes are printed or coated. Ours is knitted.",
    items: [
      { title: "Yarn-level colour change", desc: "The thermochromic pigment sits inside the yarn, so the colour change is part of the knit - not a layer that peels or cracks." },
      { title: "Gradual, not a hard switch", desc: "Cheaper pieces jump colour at a threshold. Ours transitions gradually across the temperature range, so the effect looks intentional." },
      { title: "Made in our own mill", desc: "We knit in our own factory in Dongguan, which means we control the yarn spec, the gauge and the wash testing - not a trading company reselling someone else's stock." },
    ],
  },

  stats: [
    { value: "15°C", label: "Switch point, tunable" },
    { value: "50+", label: "Wash cycles tested" },
    { value: "Worldwide", label: "Tracked shipping" },
  ],

  faq: [
    { q: "How does the colour change work?", a: "The knit is made with thermochromic yarn. Below roughly 15°C it reads one colour, and as it warms past that it transitions to another. The switch point can be tuned per style." },
    { q: "Does it wash out?", a: "The pigment is inside the yarn rather than printed on the surface, and we use a wash-resistant formulation tested over repeated cycles. Wash cold and air dry to extend the life of the effect." },
    { q: "What sizes do you carry?", a: "Our knitwear runs from XS to 2XL. Each product page lists the measurements - size up if you like a looser fit." },
    { q: "How long does shipping take?", a: "Orders ship tracked from our warehouse. Most destinations arrive within 5 to 12 business days depending on location." },
    { q: "Can I return it?", a: "Yes. Unworn items can be returned within 30 days of delivery. Contact us and we will send return instructions." },
  ],

  footer: {
    about: "Bente is a knitwear maker in Dongguan, China, producing heat-reactive and custom knitwear in our own mill. This is our own brand - made in the same factory we knit for other labels.",
    note: "© " + new Date().getFullYear() + " " + "Bente" + ". All rights reserved.",
  },
};
