"use client";

import { useState } from "react";
import { site } from "../../site.config";

type Status = "idle" | "sending" | "ok" | "error";

/**
 * 联系表单。静态站没有后端，provider 在 site.config.ts 里配（web3forms / formspree）。
 * provider 为 "none" 时不渲染表单，只显示邮箱和 WhatsApp。
 */
export function InquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  if (site.form.provider === "none" || !site.form.accessKey) {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
        <p className="font-semibold text-slate-900">Email us</p>
        <p className="mt-2 text-sm text-slate-600">
          Questions about a size, an order or a piece? Write to us and we will reply, usually
          within one business day.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={"mailto:" + site.contact.email + "?subject=Question from " + site.domain}
            className="rounded-md bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
          >
            {site.contact.email}
          </a>
          {site.contact.whatsapp ? (
            <a
              href={"https://wa.me/" + site.contact.whatsapp}
              rel="noopener"
              className="rounded-md border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-white"
            >
              WhatsApp
            </a>
          ) : null}
        </div>
      </div>
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setError("");

    const endpoint =
      site.form.provider === "web3forms"
        ? "https://api.web3forms.com/submit"
        : "https://formspree.io/f/" + site.form.accessKey;

    if (site.form.provider === "web3forms") data.append("access_key", site.form.accessKey!);
    data.append("subject", "New message from " + site.domain);
    data.append("from_name", site.brand.name);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error("HTTP " + res.status);
      setStatus("ok");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-6">
        <p className="font-semibold text-green-900">Thanks - your message has been sent.</p>
        <p className="mt-2 text-sm text-green-800">We will reply to your email soon.</p>
      </div>
    );
  }

  const input =
    "w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100";

  return (
    <form onSubmit={onSubmit} className="rounded-xl border border-slate-200 bg-white p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium text-slate-700">
          Name *
          <input name="name" required className={input + " mt-1.5"} placeholder="Your name" />
        </label>
        <label className="text-sm font-medium text-slate-700">
          Email *
          <input name="email" type="email" required className={input + " mt-1.5"} placeholder="you@email.com" />
        </label>
      </div>

      <label className="mt-4 block text-sm font-medium text-slate-700">
        Message *
        <textarea
          name="message"
          required
          rows={5}
          className={input + " mt-1.5"}
          placeholder={"How can we help?"}
        />
      </label>

      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

      {status === "error" ? (
        <p className="mt-4 text-sm text-red-600">
          Sending failed ({error}). Please email us at {site.contact.email}.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-5 w-full rounded-md bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700 disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      <p className="mt-3 text-xs text-slate-500">
        We only use your details to reply. No newsletters, no sharing.
      </p>
    </form>
  );
}
