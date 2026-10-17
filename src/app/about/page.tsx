import type { Metadata } from "next";
import { site } from "../../../site.config";
import { getPage } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { Section, SectionTitle } from "@/components/Container";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = pageMetadata({
  title: `About ${site.brand.name}`,
  description: `${site.brand.name} is a knitwear label made at our own mill in Dongguan, China.`,
  path: "/about/",
  keywords: site.industry.keywords,
});

export default function AboutPage() {
  const page = getPage("about");

  return (
    <>
      <Section>
        <SectionTitle
          eyebrow="About us"
          title={page?.title || `About ${site.brand.name}`}
          subtitle={`${site.brand.name} — ${site.brand.tagline.toLowerCase()}.`}
        />

        {page ? (
          <div className="prose-site max-w-3xl" dangerouslySetInnerHTML={{ __html: page.bodyHtml }} />
        ) : (
          <p className="max-w-3xl text-slate-600">
            Write your company story in <code>content/pages/about.md</code>.
          </p>
        )}

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {site.capabilities.items.map((c) => (
            <div key={c.title} className="rounded-xl border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900">{c.title}</h3>
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
      <CtaBand />
    </>
  );
}
