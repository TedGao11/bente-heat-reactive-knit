import type { Metadata } from "next";
import { site } from "../../../site.config";
import { getAllProducts } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { Section, SectionTitle } from "@/components/Container";
import { ProductCard } from "@/components/ProductCard";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = pageMetadata({
  title: `${site.industry.productsWord} — ${site.brand.name}`,
  description: `Browse our ${site.industry.name.toLowerCase()} range. Custom sizes, materials and branding. Low MOQ, worldwide shipping.`,
  path: "/products/",
  keywords: site.industry.keywords,
});

export default function ProductsPage() {
  const products = getAllProducts();

  return (
    <>
      <Section>
        <SectionTitle
          eyebrow={site.brand.tagline}
          title={site.industry.productsWord}
          subtitle={`Every item below can be customized to your market. Tell us your target price and quantity — we quote within 24 hours.`}
        />
        {products.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        ) : (
          <p className="text-slate-500">
            No {site.industry.productsWord.toLowerCase()} yet. Add markdown files to content/products/.
          </p>
        )}
      </Section>
      <CtaBand />
    </>
  );
}
