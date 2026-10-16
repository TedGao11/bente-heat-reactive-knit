import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "../../../../site.config";
import { getAllProducts, getProduct } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { productSchema } from "@/lib/schema";
import { href } from "@/lib/ui";
import { Container, Section } from "@/components/Container";
import { CtaBand } from "@/components/CtaBand";
import { InquiryForm } from "@/components/InquiryForm";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return pageMetadata({
    title: `${product.title} — Custom Manufacturer`,
    description: product.summary.slice(0, 155),
    path: `/products/${product.slug}/`,
    keywords: product.keywords,
  });
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const others = getAllProducts()
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3);

  return (
    <>
      <Section>
        <nav className="mb-6 text-sm text-slate-500">
          <Link href="/" className="hover:text-brand-700">Home</Link>
          <span className="mx-2">/</span>
          <Link href={href("/products")} className="hover:text-brand-700">{site.industry.productsWord}</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-700">{product.title}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
            {product.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={product.image} alt={product.title} className="h-full w-full object-cover" />
            ) : (
              <div className="flex aspect-[4/3] items-center justify-center text-slate-400">No image</div>
            )}
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {product.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">{product.summary}</p>

            {product.specs.length ? (
              <dl className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
                {product.specs.map((s) => (
                  <div key={s.label} className="grid grid-cols-3 gap-4 py-3 text-sm">
                    <dt className="font-medium text-slate-500">{s.label}</dt>
                    <dd className="col-span-2 text-slate-800">{s.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}

            <div className="mt-8">
              <Link
                href={href("/contact")}
                className="inline-block rounded-md bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700"
              >
                Request a quote
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {product.bodyHtml ? (
        <Section className="border-t border-slate-200 bg-slate-50">
          <div className="prose-site max-w-3xl" dangerouslySetInnerHTML={{ __html: product.bodyHtml }} />
        </Section>
      ) : null}

      <Section>
        <h2 className="mb-6 text-2xl font-bold text-slate-900">Send your specification</h2>
        <div className="max-w-3xl">
          <InquiryForm />
        </div>
      </Section>

      {others.length ? (
        <Section className="border-t border-slate-200">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">Related {site.industry.productsWord.toLowerCase()}</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {others.map((p) => (
              <Link
                key={p.slug}
                href={href(`/products/${p.slug}`)}
                className="rounded-lg border border-slate-200 p-5 hover:border-brand-300"
              >
                <p className="font-semibold text-slate-900">{p.title}</p>
                <p className="mt-2 line-clamp-2 text-sm text-slate-600">{p.summary}</p>
              </Link>
            ))}
          </div>
        </Section>
      ) : null}

      <CtaBand />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema(product)),
        }}
      />
    </>
  );
}
