"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { href } from "@/lib/ui";
import { Container, Section } from "@/components/Container";

type Placed = { orderNo: string; total: number; email: string };

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postcode: "",
    country: "",
    notes: "",
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [placed, setPlaced] = useState<Placed | null>(null);

  function set(k: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));
  }

  function placeOrder() {
    const need: string[] = [];
    if (!form.name.trim()) need.push("Full name");
    if (!form.email.trim()) need.push("Email");
    if (!form.address.trim()) need.push("Address");
    if (!form.city.trim()) need.push("City");
    if (!form.country.trim()) need.push("Country");
    if (!items.length) need.push("At least one item");
    setErrors(need);
    if (need.length) return;

    const orderNo = "BNT-" + Date.now().toString().slice(-8);
    try {
      const raw = localStorage.getItem("bente_orders_v1");
      const orders = raw ? (JSON.parse(raw) as unknown[]) : [];
      orders.push({
        orderNo,
        createdAt: new Date().toISOString(),
        customer: form,
        items,
        subtotal,
        status: "pending_payment",
      });
      localStorage.setItem("bente_orders_v1", JSON.stringify(orders));
    } catch (_) {}
    clear();
    setPlaced({ orderNo, total: subtotal, email: form.email });
  }

  if (placed) {
    return (
      <Section>
        <Container>
          <div className="mx-auto max-w-2xl rounded-xl border border-green-200 bg-green-50 p-8">
            <h1 className="text-2xl font-bold text-slate-900">Order received</h1>
            <p className="mt-3 text-slate-700">
              Thank you. Your order number is <span className="font-bold">{placed.orderNo}</span>.
            </p>
            <p className="mt-2 text-slate-700">
              Order total: <span className="font-semibold">USD {placed.total.toFixed(2)}</span>
            </p>
            <div className="mt-6 rounded-md border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
              <div className="font-semibold">Payment is not connected yet.</div>
              <div className="mt-1">
                Online payment is coming soon. We will email a payment link to {placed.email}.
                If you need it now, contact us and we will send one manually.
              </div>
            </div>
            <Link
              href={href("/products")}
              className="mt-6 inline-block rounded-md bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700"
            >
              Continue shopping
            </Link>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section>
      <Container>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Checkout</h1>

        {items.length === 0 ? (
          <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-10 text-center">
            <p className="text-slate-600">Your cart is empty.</p>
            <Link
              href={href("/products")}
              className="mt-4 inline-block rounded-md bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700"
            >
              Back to shop
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Delivery details</h2>

              {errors.length ? (
                <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  Please fill in: {errors.join(", ")}.
                </div>
              ) : null}

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Full name *</span>
                  <input
                    value={form.name}
                    onChange={set("name")}
                    className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Email *</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-sm font-medium text-slate-700">Address *</span>
                  <input
                    value={form.address}
                    onChange={set("address")}
                    className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">City *</span>
                  <input
                    value={form.city}
                    onChange={set("city")}
                    className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Postcode</span>
                  <input
                    value={form.postcode}
                    onChange={set("postcode")}
                    className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-sm font-medium text-slate-700">Country *</span>
                  <input
                    value={form.country}
                    onChange={set("country")}
                    className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-sm font-medium text-slate-700">Order notes</span>
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={set("notes")}
                    className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  />
                </label>
              </div>

              <div className="mt-6 rounded-md border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
                <div className="font-semibold">Payment step is not connected yet.</div>
                <div className="mt-1">
                  Placing the order records it and reserves your items. We will email a secure
                  payment link once online payment goes live.
                </div>
              </div>

              <button
                type="button"
                onClick={placeOrder}
                className="mt-6 w-full rounded-md bg-brand-600 px-8 py-4 text-base font-semibold text-white hover:bg-brand-700 sm:w-auto"
              >
                Place order
              </button>
            </div>

            <aside className="h-fit rounded-xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-lg font-semibold text-slate-900">Order summary</h2>
              <div className="mt-4 space-y-3">
                {items.map((it) => (
                  <div key={it.slug + "-" + it.size} className="flex justify-between text-sm">
                    <span className="text-slate-600">
                      {it.title} · {it.size} × {it.qty}
                    </span>
                    <span className="font-medium text-slate-900">
                      USD {(it.price * it.qty).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-5 border-t border-slate-200 pt-4">
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Subtotal</span>
                  <span>USD {subtotal.toFixed(2)}</span>
                </div>
                <div className="mt-1 flex justify-between text-sm text-slate-600">
                  <span>Shipping</span>
                  <span>Calculated later</span>
                </div>
                <div className="mt-3 flex justify-between text-base font-bold text-slate-900">
                  <span>Total</span>
                  <span>USD {subtotal.toFixed(2)}</span>
                </div>
              </div>
            </aside>
          </div>
        )}
      </Container>
    </Section>
  );
}
