"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";
import { href } from "@/lib/ui";

export function AddToCart({
  slug,
  title,
  price,
  image,
  sizes,
}: {
  slug: string;
  title: string;
  price: number;
  image?: string;
  sizes: string[];
}) {
  const { add } = useCart();
  const [size, setSize] = useState<string>("");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [warn, setWarn] = useState(false);

  function onAdd() {
    if (!size) {
      setWarn(true);
      return;
    }
    add({ slug, title, size, price, qty, image });
    setAdded(true);
    setWarn(false);
    window.setTimeout(() => setAdded(false), 2500);
  }

  return (
    <div className="mt-8">
      <div className="text-2xl font-bold text-slate-900">
        USD {price.toFixed(2)}
      </div>

      <div className="mt-6">
        <div className="mb-2 text-sm font-semibold text-slate-900">Size</div>
        <div className="flex flex-wrap gap-2">
          {sizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setSize(s);
                setWarn(false);
              }}
              className={
                "h-10 w-12 rounded-md border text-sm font-semibold transition " +
                (size === s
                  ? "border-brand-600 bg-brand-600 text-white"
                  : "border-slate-300 text-slate-700 hover:border-brand-400 hover:text-brand-700")
              }
              aria-pressed={size === s}
            >
              {s}
            </button>
          ))}
        </div>
        {warn ? (
          <p className="mt-2 text-sm font-medium text-red-600">Please choose a size first.</p>
        ) : null}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="flex h-11 items-center rounded-md border border-slate-300">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="h-full w-10 text-lg font-semibold text-slate-600 hover:text-brand-700"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="w-10 text-center text-sm font-semibold">{qty}</span>
          <button
            type="button"
            onClick={() => setQty((q) => q + 1)}
            className="h-full w-10 text-lg font-semibold text-slate-600 hover:text-brand-700"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={onAdd}
          className="h-11 rounded-md bg-brand-600 px-8 font-semibold text-white transition hover:bg-brand-700"
        >
          Add to cart
        </button>
      </div>

      {added ? (
        <div className="mt-4 flex items-center gap-4 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          <span>Added to your cart.</span>
          <a href={href("/cart")} className="font-semibold underline underline-offset-2">
            View cart
          </a>
        </div>
      ) : null}
    </div>
  );
}
