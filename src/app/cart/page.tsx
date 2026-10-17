"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { href } from "@/lib/ui";
import { Container, Section } from "@/components/Container";

export default function CartPage() {
  const { items, remove, setQty, subtotal, count } = useCart();

  return (
    <Section>
      <Container>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Your cart</h1>

        {items.length === 0 ? (
          <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-10 text-center">
            <p className="text-slate-600">Your cart is empty.</p>
            <Link
              href={href("/products")}
              className="mt-4 inline-block rounded-md bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700"
            >
              Continue shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-8 overflow-hidden rounded-xl border border-slate-200">
              {items.map((it) => (
                <div
                  key={it.slug + "-" + it.size}
                  className="flex flex-wrap items-center gap-4 border-b border-slate-200 p-4 last:border-b-0"
                >
                  <div className="h-24 w-20 shrink-0 overflow-hidden rounded-md border border-slate-200 bg-slate-100">
                    {it.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={it.image} alt={it.title} className="h-full w-full object-cover" />
                    ) : null}
                  </div>

                  <div className="min-w-[160px] flex-1">
                    <div className="font-semibold text-slate-900">{it.title}</div>
                    <div className="text-sm text-slate-500">Size {it.size}</div>
                    <div className="mt-1 text-sm text-slate-600">USD {it.price.toFixed(2)}</div>
                  </div>

                  <div className="flex h-10 items-center rounded-md border border-slate-300">
                    <button
                      type="button"
                      onClick={() => setQty(it.slug, it.size, it.qty - 1)}
                      className="h-full w-9 text-lg font-semibold text-slate-600 hover:text-brand-700"
                      aria-label="Decrease"
                    >
                      -
                    </button>
                    <span className="w-9 text-center text-sm font-semibold">{it.qty}</span>
                    <button
                      type="button"
                      onClick={() => setQty(it.slug, it.size, it.qty + 1)}
                      className="h-full w-9 text-lg font-semibold text-slate-600 hover:text-brand-700"
                      aria-label="Increase"
                    >
                      +
                    </button>
                  </div>

                  <div className="w-24 text-right font-semibold text-slate-900">
                    USD {(it.price * it.qty).toFixed(2)}
                  </div>

                  <button
                    type="button"
                    onClick={() => remove(it.slug, it.size)}
                    className="text-sm text-slate-400 hover:text-red-600"
                    aria-label="Remove"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col items-end gap-2">
              <div className="text-sm text-slate-500">
                {count} item{count > 1 ? "s" : ""}
              </div>
              <div className="text-xl font-bold text-slate-900">
                Subtotal: USD {subtotal.toFixed(2)}
              </div>
              <div className="text-xs text-slate-500">Shipping calculated at checkout.</div>
              <Link
                href={href("/checkout")}
                className="mt-2 rounded-md bg-brand-600 px-8 py-3 font-semibold text-white hover:bg-brand-700"
              >
                Checkout
              </Link>
            </div>
          </>
        )}
      </Container>
    </Section>
  );
}
