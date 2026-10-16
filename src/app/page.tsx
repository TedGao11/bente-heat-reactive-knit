import Link from "next/link";
import { site } from "../../site.config";
import { getAllProducts } from "@/lib/content";
import { href } from "@/lib/ui";
import { faqSchema } from "@/lib/schema";
import { Container, Section, SectionTitle } from "@/components/Container";
import { ProductCard } from "@/components/ProductCard";
import { Faq } from "@/components/Faq";
import { CtaBand } from "@/components/CtaBand";

export default function HomePage() {
  const products = getAllProducts().slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white">
        <Container className="py-16 sm:py-24">
          <div className="max-w-3xl">
            {site.hero.eyebrow ? (
              <p className="mb-3 inline-block rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700">
                {site.hero.eyebrow}
              </p>
            ) : null}
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              {site.hero.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">{site.hero.subtitle}</p>

            {site.hero.bullets.length ? (
              <ul className="mt-6 space-y-2">
                {site.hero.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-slate-700">
                    <span className="mt-1 text-brand-600">✓</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={href(site.hero.ctaPrimary.href)}
                className="rounded-md bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700"
              >
                {site.hero.ctaPrimary.label}
              </Link>
              {site.hero.ctaSecondary ? (
                <Link
                  href={href(site.hero.ctaSecondary.href)}
                  className="rounded-md border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
                >
                  {site.hero.ctaSecondary.label}
                </Link>
              ) : null}
            </div>
          </div>
        </Container>
      </section>

      {/* 信任条 */}
      {site.trustBar.length ? (
        <div className="border-b border-slate-200 bg-white py-6">
          <Container>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm font-semibold uppercase tracking-wide text-slate-400">
              {site.trustBar.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </Container>
        </div>
      ) : null}

      {/* 产品 */}
      {products.length ? (
        <Section>
          <SectionTitle
            eyebrow={site.industry.name}
            title={site.industry.productsWord}
            subtitle={`Custom-made for ${site.market.primary} buyers. Send your spec for a quote.`}
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
          <div className="mt-8">
            <Link href={href("/products")} className="font-semibold text-brand-700 hover:underline">
              View all {site.industry.productsWord.toLowerCase()} →
            </Link>
          </div>
        </Section>
      ) : null}

      {/* 能力 */}
      <Section className="bg-slate-50">
        <SectionTitle title={site.capabilities.title} subtitle={site.capabilities.subtitle} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {site.capabilities.items.map((c) => (
            <div key={c.title} className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="text-base font-semibold text-slate-900">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{c.desc}</p>
            </div>
          ))}
        </div>

        {site.stats.length ? (
          <div className="mt-12 grid gap-6 border-t border-slate-200 pt-10 sm:grid-cols-3">
            {site.stats.map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-bold text-brand-700">{s.value}</p>
                <p className="mt-1 text-sm text-slate-600">{s.label}</p>
              </div>
            ))}
          </div>
        ) : null}
      </Section>

      {/* FAQ */}
      {site.faq.length ? (
        <Section>
          <SectionTitle title="Frequently asked questions" />
          <Faq />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(site.faq)) }}
          />
        </Section>
      ) : null}

      <CtaBand />
    </>
  );
}
