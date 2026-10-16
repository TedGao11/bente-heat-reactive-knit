import { site } from "../../site.config";
import { SITE_URL } from "./seo";

/** 首页 Organization + WebSite 结构化数据（帮 Google 认品牌） */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: site.brand.name,
        url: SITE_URL,
        description: site.seo.description,
        email: site.contact.email,
        telephone: site.contact.phone,
        address: site.contact.address
          ? { "@type": "PostalAddress", streetAddress: site.contact.address }
          : undefined,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: site.brand.name,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: site.market.language,
      },
    ],
  };
}

export function productSchema(p: { title: string; summary: string; slug: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.title,
    description: p.summary,
    url: `${SITE_URL}/products/${p.slug}/`,
    brand: { "@type": "Brand", name: site.brand.name },
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}
