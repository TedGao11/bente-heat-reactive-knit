import Link from "next/link";
import type { Product } from "@/lib/content";
import { href } from "@/lib/ui";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={href(`/products/${product.slug}`)}
      className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:border-brand-300 hover:shadow-md"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-slate-100">
        {product.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">No image</div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-semibold text-slate-900 group-hover:text-brand-700">{product.title}</h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600">{product.summary}</p>
        <span className="mt-4 text-sm font-semibold text-brand-700">View details →</span>
      </div>
    </Link>
  );
}
