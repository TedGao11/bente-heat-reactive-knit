"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = {
  slug: string;
  title: string;
  size: string;
  price: number;
  qty: number;
  image?: string;
};

type CartContextValue = {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (slug: string, size: string) => void;
  setQty: (slug: string, size: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "bente_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as CartItem[]);
    } catch (_) {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (_) {}
  }, [items, ready]);

  const value = useMemo<CartContextValue>(() => {
    return {
      items,
      add: (item) =>
        setItems((prev) => {
          const i = prev.findIndex((p) => p.slug === item.slug && p.size === item.size);
          if (i >= 0) {
            const next = [...prev];
            next[i] = { ...next[i], qty: next[i].qty + item.qty };
            return next;
          }
          return [...prev, item];
        }),
      remove: (slug, size) =>
        setItems((prev) => prev.filter((p) => !(p.slug === slug && p.size === size))),
      setQty: (slug, size, qty) =>
        setItems((prev) =>
          prev.map((p) =>
            p.slug === slug && p.size === size ? { ...p, qty: Math.max(1, qty) } : p
          )
        ),
      clear: () => setItems([]),
      count: items.reduce((n, p) => n + p.qty, 0),
      subtotal: items.reduce((n, p) => n + p.qty * p.price, 0),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
