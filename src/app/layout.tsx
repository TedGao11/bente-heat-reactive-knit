import type { Metadata } from "next";
import { site } from "../../site.config";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/lib/cart";
import { SITE_URL, pageMetadata } from "@/lib/seo";
import { organizationSchema } from "@/lib/schema";
import "./globals.css";

export const metadata: Metadata = {
  ...pageMetadata({
    title: site.seo.title,
    description: site.seo.description,
    path: "/",
  }),
  title: {
    default: site.seo.title,
    template: site.seo.titleTemplate,
  },
  metadataBase: new URL(SITE_URL),
  robots: { index: true, follow: true },
  verification: site.seo.googleSiteVerification
    ? { google: site.seo.googleSiteVerification }
    : undefined,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={site.market.language}>
      <body className="flex min-h-screen flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
