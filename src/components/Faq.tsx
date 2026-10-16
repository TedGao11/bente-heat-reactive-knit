import { site } from "../../site.config";

export function Faq() {
  if (!site.faq.length) return null;
  return (
    <div className="divide-y divide-slate-200 border-y border-slate-200">
      {site.faq.map((item) => (
        <details key={item.q} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-slate-900 marker:hidden">
            {item.q}
            <span className="text-slate-400 transition group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 text-slate-600">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
