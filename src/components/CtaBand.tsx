import Link from "next/link";
import { site } from "../../site.config";
import { href } from "@/lib/ui";
import { Container } from "./Container";

export function CtaBand() {
  return (
    <section className="bg-slate-900 py-16 text-white">
      <Container className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold sm:text-3xl">{site.hero.ctaPrimary.label}</h2>
          <p className="mt-2 max-w-xl text-slate-300">
            Send your specification or drawing. We reply with price, lead time and shipping within 24 hours.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href={href("/contact")}
            className="rounded-md bg-brand-500 px-6 py-3 font-semibold text-white hover:bg-brand-600"
          >
            {site.hero.ctaPrimary.label}
          </Link>
          <a
            href={`mailto:${site.contact.email}`}
            className="rounded-md border border-white/25 px-6 py-3 font-semibold text-white hover:bg-white/10"
          >
            Email us
          </a>
        </div>
      </Container>
    </section>
  );
}
