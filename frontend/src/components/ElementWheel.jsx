import React, { useRef, useState, useEffect, useCallback } from "react";
import { RotateCw } from "lucide-react";

// Rotating, draggable, clickable wheel of 5 elements around the brand core.
export default function ElementWheel({ elements, ui, onSelect }) {
  const [angle, setAngle] = useState(0);
  const [auto, setAuto] = useState(true);
  const [active, setActive] = useState(null);
  const drag = useRef({ on: false, startAngle: 0, startPointer: 0 });
  const wrapRef = useRef(null);
  const rafRef = useRef(0);

  // auto rotation
  useEffect(() => {
    let last = performance.now();
    const tick = (now) => {
      const dt = now - last; last = now;
      if (auto && !drag.current.on) setAngle((a) => a + dt * 0.006);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [auto]);

  const pointerAngle = (e) => {
    const r = wrapRef.current.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - cx;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - cy;
    return (Math.atan2(y, x) * 180) / Math.PI;
  };

  const onDown = (e) => {
    setAuto(false);
    drag.current = { on: true, startAngle: angle, startPointer: pointerAngle(e) };
  };
  const onMove = useCallback((e) => {
    if (!drag.current.on) return;
    const cur = pointerAngle(e);
    setAngle(drag.current.startAngle + (cur - drag.current.startPointer));
  }, []);
  const onUp = useCallback(() => {
    drag.current.on = false;
    setTimeout(() => setAuto(true), 2500);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [onMove, onUp]);

  const N = elements.length;
  const radius = 196;

  return (
    <div className="relative mx-auto" style={{ width: 560, maxWidth: "92vw" }}>
      <div className="relative" style={{ paddingBottom: "100%" }}>
        <div ref={wrapRef} className="absolute inset-0 wheel-grab select-none" onMouseDown={onDown} onTouchStart={onDown}>
          {/* sacred geometry rings */}
          <svg className="absolute inset-0 w-full h-full geo-spin" viewBox="0 0 560 560" style={{ opacity: 0.5 }}>
            <circle cx="280" cy="280" r="250" fill="none" stroke="rgba(230,198,122,0.28)" strokeWidth="1" />
            <circle cx="280" cy="280" r="150" fill="none" stroke="rgba(230,198,122,0.18)" strokeWidth="1" />
            {Array.from({ length: 12 }).map((_, i) => {
              const a = (i / 12) * Math.PI * 2;
              return <line key={i} x1={280} y1={280} x2={280 + 250 * Math.cos(a)} y2={280 + 250 * Math.sin(a)} stroke="rgba(230,198,122,0.1)" strokeWidth="0.6" />;
            })}
          </svg>
          <svg className="absolute inset-0 w-full h-full geo-spin-rev" viewBox="0 0 560 560" style={{ opacity: 0.35 }}>
            <polygon points="280,60 470,200 400,430 160,430 90,200" fill="none" stroke="rgba(230,198,122,0.35)" strokeWidth="1" />
            <polygon points="280,120 420,240 365,410 195,410 140,240" fill="none" stroke="rgba(230,198,122,0.15)" strokeWidth="0.8" />
          </svg>

          {/* rotating orbs layer */}
          <div className="absolute inset-0" style={{ transform: `rotate(${angle}deg)`, transition: drag.current.on ? "none" : "transform 0.05s linear" }}>
            {elements.map((el, i) => {
              const a = (i / N) * Math.PI * 2 - Math.PI / 2;
              const cx = 50 + (radius / 5.6) * Math.cos(a);
              const cy = 50 + (radius / 5.6) * Math.sin(a);
              return (
                <button
                  key={el.id}
                  onMouseEnter={() => setActive(el.id)}
                  onMouseLeave={() => setActive(null)}
                  onClick={(e) => { e.stopPropagation(); onSelect(el); }}
                  className="orb absolute"
                  style={{
                    left: `${cx}%`, top: `${cy}%`, width: 118, height: 118,
                    transform: `translate(-50%,-50%) rotate(${-angle}deg)`,
                    border: `2px solid ${el.color}`,
                    boxShadow: `0 0 26px ${el.color}55, 0 0 60px ${el.color}22`,
                  }}
                >
                  <img src={el.image} alt={el.name} className="w-full h-full object-cover" draggable={false} />
                  <span className="absolute inset-0 flex items-end justify-center pb-2">
                    <span className="font-label text-[13px] tracking-widest px-2 py-0.5 rounded" style={{ background: "rgba(5,7,15,0.6)", color: el.color }}>
                      {el.order}. {el.name}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* center brand core */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none" style={{ width: 200 }}>
            <div className="anim-pulse-glow absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ width: 160, height: 160, background: "radial-gradient(circle, rgba(230,198,122,0.28), transparent 70%)" }} />
            <div className="relative">
              <div className="font-display gold-gradient-text" style={{ fontSize: 30, lineHeight: 1, fontWeight: 800 }}>{ui.brand}</div>
              <div className="gold-rule my-2 mx-auto" style={{ width: 90 }} />
              <div className="font-label text-dim" style={{ fontSize: 10, letterSpacing: "0.15em" }}>{ui.brandSub}</div>
            </div>
          </div>
        </div>
      </div>

      {/* controls / hint */}
      <div className="flex items-center justify-center gap-3 mt-4">
        <button onClick={() => { setAuto(false); setAngle((a) => a + 72); setTimeout(() => setAuto(true), 2500); }} className="btn-ghost px-3 py-2 flex items-center gap-2 text-sm font-label">
          <RotateCw size={15} /> {ui.wheelHint}
        </button>
      </div>
    </div>
  );
}
