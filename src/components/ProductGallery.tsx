"use client";

import { useRef, useState } from "react";
import type { MouseEvent } from "react";

const ZOOM = 2.6;
const LENS = 190;

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0, w: 0, h: 0 });
  const boxRef = useRef<HTMLDivElement | null>(null);

  if (!images.length) {
    return (
      <div className="flex aspect-[3/4] w-full items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-400">
        No image
      </div>
    );
  }

  const src = images[Math.min(active, images.length - 1)];

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const el = boxRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top, w: r.width, h: r.height });
    setShow(true);
  }

  const bgW = pos.w * ZOOM;
  const bgH = pos.h * ZOOM;
  const bgX = -((pos.x / (pos.w || 1)) * pos.w * ZOOM - LENS / 2);
  const bgY = -((pos.y / (pos.h || 1)) * pos.h * ZOOM - LENS / 2);

  return (
    <div>
      <div
        ref={boxRef}
        onMouseMove={onMove}
        onMouseEnter={onMove}
        onMouseLeave={() => setShow(false)}
        className="relative mx-auto aspect-[3/4] w-full max-w-[560px] cursor-zoom-in overflow-hidden rounded-xl border border-slate-200 bg-slate-100"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="h-full w-full object-cover" />

        {show ? (
          <div
            className="pointer-events-none absolute rounded-full border-2 border-white shadow-xl"
            style={{
              width: LENS,
              height: LENS,
              left: pos.x - LENS / 2,
              top: pos.y - LENS / 2,
              backgroundImage: "url(" + src + ")",
              backgroundRepeat: "no-repeat",
              backgroundSize: bgW + "px " + bgH + "px",
              backgroundPosition: bgX + "px " + bgY + "px",
              backgroundColor: "#fff",
            }}
          />
        ) : null}
      </div>

      {images.length > 1 ? (
        <div className="mt-4 flex flex-wrap gap-3">
          {images.map((im, i) => (
            <button
              key={im}
              type="button"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              aria-label={"View image " + (i + 1)}
              className={
                "aspect-[3/4] w-20 overflow-hidden rounded-lg border bg-slate-100 transition " +
                (i === active ? "border-brand-600 ring-2 ring-brand-200" : "border-slate-200 hover:border-brand-300")
              }
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={im} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
