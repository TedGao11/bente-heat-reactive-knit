import type { Metadata } from "next";
import { site } from "../../../site.config";
import { pageMetadata } from "@/lib/seo";
import { Section, SectionTitle } from "@/components/Container";
import { InquiryForm } from "@/components/InquiryForm";

export const metadata: Metadata = pageMetadata({
  title: `Contact ${site.brand.name}`,
  description: `Questions about a piece, a size or an order? Contact ${site.brand.name} at ${site.contact.email}. We usually reply within one business day.`,
  path: "/contact/",
});

const HELP = [
  "Which size to choose",
  "Help with an existing order",
  "Returns and exchanges",
  "Care and washing questions",
];

export default function ContactPage() {
  return (
    <Section>
      <SectionTitle
        eyebrow="Get in touch"
        title="Contact us"
        subtitle="Questions about a piece, a size or an order? Send us a message and a person will reply."
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
                  <a href={"mailto:" + site.contact.email} className="font-medium text-brand-700 hover:underline">
                    {site.contact.email}
                  </a>
                </dd>
              </div>
              {site.contact.whatsapp ? (
                <div>
                  <dt className="text-slate-500">WhatsApp</dt>
                  <dd>
                    <a
                      href={"https://wa.me/" + site.contact.whatsapp}
                      rel="noopener"
                      className="font-medium text-brand-700 hover:underline"
                    >
                      Chat now
                    </a>
                  </dd>
                </div>
              ) : null}
              <div>
                <dt className="text-slate-500">Made in</dt>
                <dd className="font-medium text-slate-800">Dongguan, China</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-xl border border-slate-200 p-6">
            <h2 className="font-semibold text-slate-900">We can help with</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {HELP.map((h) => (
                <li key={h}>• {h}</li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </Section>
  );
}
