"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { href } from "@/lib/ui";

export function CartLink() {
  const { count } = useCart();
  return (
    <Link
      href={href("/cart")}
      className="relative rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-brand-400 hover:text-brand-700"
    >
      Cart
      {count > 0 ? (
        <span className="ml-2 inline-flex min-w-[20px] items-center justify-center rounded-full bg-brand-600 px-1.5 text-xs font-bold text-white">
          {count}
        </span>
      ) : null}
    </Link>
  );
}
