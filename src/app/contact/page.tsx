import type { Metadata } from "next";
import { site } from "../../../site.config";
import { pageMetadata } from "@/lib/seo";
import { Section, SectionTitle } from "@/components/Container";
import { InquiryForm } from "@/components/InquiryForm";

export const metadata: Metadata = pageMetadata({
  title: `Contact ${site.brand.name} — Request a Quote`,
  description: `Contact ${site.brand.name} for a quote on custom ${site.industry.name.toLowerCase()}. Email ${site.contact.email}. Reply within one business day.`,
  path: "/contact/",
  keywords: [...site.industry.keywords, `${site.industry.name} supplier`, `${site.industry.name} manufacturer`],
});

export default function ContactPage() {
  return (
    <Section>
      <SectionTitle
        eyebrow="Get in touch"
        title="Request a quote"
        subtitle="Tell us what you need. Include quantity and destination so we can quote shipping in the same reply."
      />

      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <InquiryForm />

        <aside className="space-y-6">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="font-semibold text-slate-900">Direct contact</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-slate-500">Email</dt>
                <dd>
                  <a href={`mailto:${site.contact.email}`} className="font-medium text-brand-700 hover:underline">
                    {site.contact.email}
                  </a>
                </dd>
              </div>
              {site.contact.phone ? (
                <div>
                  <dt className="text-slate-500">Phone</dt>
                  <dd className="font-medium text-slate-800">{site.contact.phone}</dd>
                </div>
              ) : null}
              {site.contact.whatsapp ? (
                <div>
                  <dt className="text-slate-500">WhatsApp</dt>
                  <dd>
                    <a
                      href={`https://wa.me/${site.contact.whatsapp}`}
                      rel="noopener"
                      className="font-medium text-brand-700 hover:underline"
                    >
                      Chat now
                    </a>
                  </dd>
                </div>
              ) : null}
              {site.contact.address ? (
                <div>
                  <dt className="text-slate-500">Address</dt>
                  <dd className="font-medium text-slate-800">{site.contact.address}</dd>
                </div>
              ) : null}
            </dl>
          </div>

          <div className="rounded-xl border border-slate-200 p-6">
            <h2 className="font-semibold text-slate-900">What to include</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>• Product / model number</li>
              <li>• Quantity you plan to order</li>
              <li>• Specification, drawing or reference photo</li>
              <li>• Destination country or port</li>
              <li>• Any certification you must have</li>
            </ul>
          </div>
        </aside>
      </div>
    </Section>
  );
}
