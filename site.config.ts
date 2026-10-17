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
  domain: "benteknit.com",
  launchedAt: "2026-10-16",

  brand: {
    name: "Bente",
    tagline: "Knitwear from our own mill",
  },

  industry: {
    name: "Knitwear",
    productsWord: "Shop",
    keywords: [
      "knitwear brand",
      "knitted sweater",
      "intarsia knit sweater",
      "colourwork knitwear",
      "heavyweight knit jumper",
    ],
  },

  market: {
    primary: "North America & Europe",
    language: "en",
  },

  contact: {
    email: "hello@benteknit.com",
    phone: "",
    whatsapp: "8618166084589",
    address: "Dongguan, Guangdong, China",
  },

  form: {
    provider: "none",
    accessKey: "",
  },

  seo: {
    title: "Bente — Knitwear From Our Own Mill",
    description:
      "Bente is a knitwear label making sweaters and knits at our own mill in Dongguan. Colourwork knitted into the fabric, short runs, shipped worldwide.",
    titleTemplate: "%s | Bente",
    googleSiteVerification: "",
  },

  hero: {
    eyebrow: "Knitwear from our own mill",
    title: "Knits with weight, colour and intent.",
    subtitle:
      "Bente is a knitwear label run out of our own mill in Dongguan. We knit the whole garment - the yarn, the pattern, the rib - instead of printing on a blank. First drop: the intarsia knit.",
    bullets: [
      "Knitted in our own mill, not bought in and printed",
      "Colourwork knitted into the fabric, so it never peels or cracks",
      "Short runs, shipped worldwide",
    ],
    ctaPrimary: { label: "Shop the first drop", href: "/products/" },
    ctaSecondary: { label: "Inside the mill", href: "/about/" },
  },

  trustBar: ["Knitted in our own mill", "Colourwork knitted in, not printed", "Tracked worldwide shipping"],

  capabilities: {
    title: "Why our knits hold up",
    subtitle: "Most knitwear is bought in and printed. Ours is knitted from the yarn up.",
    items: [
      {
        title: "Knitted in-house",
        desc: "Our own mill in Dongguan. We choose the yarn, set the gauge and finish every piece ourselves.",
      },
      {
        title: "Pattern knitted in",
        desc: "Intarsia and colourwork are knitted into the garment, so the design cannot peel, crack or wash off the way a print does.",
      },
      {
        title: "Made in short runs",
        desc: "We keep runs short so a new design can be tested before it scales - and the pieces stay considered rather than mass produced.",
      },
    ],
  },

  stats: [
    { value: "Own mill", label: "Yarn to finished knit" },
    { value: "XS - 2XL", label: "Size range" },
    { value: "Worldwide", label: "Tracked shipping" },
  ],

  faq: [
    {
      q: "What does Bente make?",
      a: "Knitwear. The current drop is an intarsia knit sweater, with more knits in development. Everything is knitted at our own mill in Dongguan rather than bought in and decorated.",
    },
    {
      q: "How is the colourwork done?",
      a: "It is knitted into the garment using intarsia, so the pattern is part of the fabric itself. It does not peel, crack or wash off the way a print or coating does.",
    },
    {
      q: "What sizes do you carry?",
      a: "The current range is XS to 2XL. Every product page lists the measurements - size up if you like a looser fit.",
    },
    {
      q: "How long does shipping take?",
      a: "Orders ship tracked from our warehouse. Most destinations arrive within 5 to 12 business days.",
    },
    {
      q: "Can I return it?",
      a: "Yes - unworn items within 30 days of delivery. Reply to your order email and we will send return instructions.",
    },
  ],

  footer: {
    about:
      "Bente is a knitwear label made at our own mill in Dongguan, China. We knit sweaters with the colourwork built into the fabric, in short runs, shipped worldwide.",
    note: "© " + new Date().getFullYear() + " Bente. All rights reserved.",
  },
};
