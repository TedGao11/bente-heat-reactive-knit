import Link from "next/link";
import { site } from "../../site.config";
import { href } from "@/lib/ui";
import { Container } from "./Container";
import { CartLink } from "./CartLink";

const NAV = [
  { label: "Home", href: "/" },
  { label: site.industry.productsWord, href: "/products" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between gap-6">
          <Link href="/" className="flex items-baseline gap-2">
            <span className="text-lg font-bold tracking-tight text-slate-900">{site.brand.name}</span>
            <span className="hidden text-xs text-slate-500 sm:inline">{site.brand.tagline}</span>
          </Link>

          <nav className="flex items-center gap-5 text-sm font-medium text-slate-600">
            {NAV.map((item) => (
              <Link key={item.href} href={href(item.href)} className="hover:text-brand-700">
                {item.label}
              </Link>
            ))}
            <CartLink />
          </nav>
        </div>
      </Container>
    </header>
  );
}
