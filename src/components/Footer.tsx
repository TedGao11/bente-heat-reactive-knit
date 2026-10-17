import Link from "next/link";
import { site } from "../../site.config";
import { href } from "@/lib/ui";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <Container className="py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="text-base font-bold text-slate-900">{site.brand.name}</p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600">{site.footer.about}</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">Pages</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><Link href={href("/products")} className="hover:text-brand-700">{site.industry.productsWord}</Link></li>
              <li><Link href={href("/about")} className="hover:text-brand-700">About</Link></li>
              <li><Link href={href("/contact")} className="hover:text-brand-700">Contact</Link></li>
              <li>
                <a href={site.wholesale.href} target="_blank" rel="noopener" className="hover:text-brand-700">
                  {site.wholesale.label}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">Contact</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><a href={`mailto:${site.contact.email}`} className="hover:text-brand-700">{site.contact.email}</a></li>
              {site.contact.phone ? <li>{site.contact.phone}</li> : null}
              {site.contact.whatsapp ? (
                <li>
                  <a href={`https://wa.me/${site.contact.whatsapp}`} className="hover:text-brand-700" rel="noopener">
                    WhatsApp
                  </a>
                </li>
              ) : null}
              {site.contact.address ? <li>{site.contact.address}</li> : null}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 text-xs text-slate-500">
          {site.footer.note}
        </div>
      </Container>
    </footer>
  );
}
