import type { Metadata } from "next";
import { site } from "../../site.config";

export const SITE_URL = `https://${site.domain}`;

/** 生成一个页面的 metadata（自动带上 canonical、OG、Twitter） */
export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;              // 以 / 开头，如 "/products/"
  keywords?: string[];
}): Metadata {
  const url = `${SITE_URL}${opts.path}`;
  const ogImage = site.seo.ogImage ? `${SITE_URL}${site.seo.ogImage}` : undefined;
  return {
    title: opts.title,
    description: opts.description,
    keywords: opts.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: site.brand.name,
      locale: site.market.language === "en" ? "en_US" : site.market.language,
      type: "website",
      images: ogImage ? [ogImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}
