import React, { useRef, useState, useEffect, useCallback } from "react";
import { RotateCw } from "lucide-react";
import Planet from "./Planet";

// Flower of Life circle centers (Metatron seed -> 19 circles)
function flowerCenters(cx, cy, r) {
  const pts = [{ x: cx, y: cy }];
  const deg = (d) => (d * Math.PI) / 180;
  for (let i = 0; i < 6; i++) pts.push({ x: cx + r * Math.cos(deg(i * 60)), y: cy + r * Math.sin(deg(i * 60)) });
  for (let i = 0; i < 6; i++) pts.push({ x: cx + r * Math.sqrt(3) * Math.cos(deg(30 + i * 60)), y: cy + r * Math.sqrt(3) * Math.sin(deg(30 + i * 60)) });
  for (let i = 0; i < 6; i++) pts.push({ x: cx + 2 * r * Math.cos(deg(i * 60)), y: cy + 2 * r * Math.sin(deg(i * 60)) });
  return pts;
}

function Mandala() {
  const V = 260, C = 130, r = 21;
  const centers = flowerCenters(C, C, r);
  const rays = Array.from({ length: 24 });
  return (
    <svg className="mandala" width={V} height={V} viewBox={`0 0 ${V} ${V}`}>
      <g style={{ transformOrigin: "center", animation: "mandalaSpinRev 120s linear infinite" }}>
        {rays.map((_, i) => {
          const a = (i / 24) * Math.PI * 2;
          return <line key={i} x1={C} y1={C} x2={C + 126 * Math.cos(a)} y2={C + 126 * Math.sin(a)} stroke="rgba(230,198,122,0.12)" strokeWidth="0.6" />;
        })}
        <circle cx={C} cy={C} r={126} fill="none" stroke="rgba(230,198,122,0.25)" strokeWidth="0.8" />
      </g>
      <g style={{ transformOrigin: "center", animation: "mandalaSpin 90s linear infinite" }}>
        {centers.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={r} fill="none" stroke="rgba(246,231,176,0.4)" strokeWidth="0.8" />
        ))}
        <circle cx={C} cy={C} r={r * 3} fill="none" stroke="rgba(246,231,176,0.35)" strokeWidth="0.8" />
      </g>
    </svg>
  );
}

export default function ElementWheel({ elements, method, ui, onSelect }) {
  const [angle, setAngle] = useState(0);
  const [auto, setAuto] = useState(true);
  const drag = useRef({ on: false, startAngle: 0, startPointer: 0 });
  const wrapRef = useRef(null);
  const rafRef = useRef(0);

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
    const rc = wrapRef.current.getBoundingClientRect();
    const cx = rc.left + rc.width / 2, cy = rc.top + rc.height / 2;
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - cx;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - cy;
    return (Math.atan2(y, x) * 180) / Math.PI;
  };
  const onDown = (e) => { setAuto(false); drag.current = { on: true, startAngle: angle, startPointer: pointerAngle(e) }; };
  const onMove = useCallback((e) => { if (!drag.current.on) return; setAngle(drag.current.startAngle + (pointerAngle(e) - drag.current.startPointer)); }, []);
  const onUp = useCallback(() => { drag.current.on = false; setTimeout(() => setAuto(true), 2500); }, []);

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
          {/* outer sacred geometry */}
          <svg className="absolute inset-0 w-full h-full geo-spin" viewBox="0 0 560 560" style={{ opacity: 0.4 }}>
            <circle cx="280" cy="280" r="250" fill="none" stroke="rgba(230,198,122,0.25)" strokeWidth="1" />
            {Array.from({ length: 12 }).map((_, i) => {
              const a = (i / 12) * Math.PI * 2;
              return <line key={i} x1={280} y1={280} x2={280 + 250 * Math.cos(a)} y2={280 + 250 * Math.sin(a)} stroke="rgba(230,198,122,0.09)" strokeWidth="0.6" />;
            })}
          </svg>

          {/* rotating planets */}
          <div className="absolute inset-0" style={{ transform: `rotate(${angle}deg)`, transition: drag.current.on ? "none" : "transform 0.05s linear" }}>
            {elements.map((el, i) => {
              const a = (i / N) * Math.PI * 2 - Math.PI / 2;
              const cx = 50 + (radius / 5.6) * Math.cos(a);
              const cy = 50 + (radius / 5.6) * Math.sin(a);
              return (
                <div key={el.id} className="absolute" style={{ left: `${cx}%`, top: `${cy}%`, transform: `translate(-50%,-50%) rotate(${-angle}deg)` }}>
                  <button
                    onClick={(e) => { e.stopPropagation(); onSelect(el); }}
                    onMouseDown={(e) => e.stopPropagation()}
                    className="relative block group"
                    style={{ background: "none", border: "none", cursor: "pointer" }}
                  >
                    <div className="transition-transform duration-300 group-hover:scale-110">
                      <Planet type={el.id} size={118} />
                    </div>
                    <span className="absolute left-1/2 -translate-x-1/2 -bottom-6 whitespace-nowrap">
                      <span className="font-label text-[12px] tracking-widest px-2 py-0.5 rounded" style={{ background: "rgba(5,7,15,0.7)", color: el.color }}>
                        {el.order}. {el.name}
                      </span>
                    </span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* center brand star (clickable) */}
          <button
            className="brand-core group"
            onClick={(e) => { e.stopPropagation(); onSelect(method); }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <Mandala />
            <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
              style={{ width: 152, height: 152, borderRadius: "50%",
                background: "radial-gradient(circle at 42% 38%, #ffffff, #fdf6e3 45%, #f4e2b0 72%, #e6c67a 100%)",
                boxShadow: "0 0 40px rgba(246,231,176,0.7), 0 0 90px rgba(246,231,176,0.35), inset -6px -8px 24px rgba(180,146,63,0.35)",
                animation: "starPulse 5s ease-in-out infinite" }}>
              <div className="text-center px-3">
                <div className="font-display" style={{ fontSize: 24, fontWeight: 800, color: "#1c1405", lineHeight: 1 }}>{ui.brand}</div>
                <div style={{ height: 1, background: "rgba(28,20,5,0.35)", margin: "5px auto", width: 70 }} />
                <div className="font-label" style={{ fontSize: 8.5, letterSpacing: "0.12em", color: "#5a4a20" }}>{ui.brandSub}</div>
              </div>
            </div>
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 mt-4">
        <button onClick={() => { setAuto(false); setAngle((a) => a + 72); setTimeout(() => setAuto(true), 2500); }} className="btn-ghost px-3 py-2 flex items-center gap-2 text-sm font-label">
          <RotateCw size={15} /> {ui.wheelHint}
        </button>
      </div>
    </div>
  );
}
