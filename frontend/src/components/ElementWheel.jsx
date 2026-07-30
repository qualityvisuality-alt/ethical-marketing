import React, { useRef, useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import Planet from "./Planet";

function flowerCenters(cx, cy, r) {
  const pts = [{ x: cx, y: cy }];
  const deg = (d) => (d * Math.PI) / 180;
  for (let i = 0; i < 6; i++) pts.push({ x: cx + r * Math.cos(deg(i * 60)), y: cy + r * Math.sin(deg(i * 60)) });
  for (let i = 0; i < 6; i++) pts.push({ x: cx + r * Math.sqrt(3) * Math.cos(deg(30 + i * 60)), y: cy + r * Math.sqrt(3) * Math.sin(deg(30 + i * 60)) });
  for (let i = 0; i < 6; i++) pts.push({ x: cx + 2 * r * Math.cos(deg(i * 60)), y: cy + 2 * r * Math.sin(deg(i * 60)) });
  return pts;
}

function Mandala({ active }) {
  const V = 260, C = 130, r = 21;
  const centers = flowerCenters(C, C, r);
  return (
    <svg className="mandala" width={V} height={V} viewBox={`0 0 ${V} ${V}`} style={{ transition: "opacity .5s", opacity: active ? 1 : 0.8 }}>
      <g style={{ transformOrigin: "center", animation: "mandalaSpinRev 120s linear infinite" }}>
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i / 24) * Math.PI * 2;
          return <line key={i} x1={C} y1={C} x2={C + 126 * Math.cos(a)} y2={C + 126 * Math.sin(a)} stroke={`rgba(230,198,122,${active ? 0.2 : 0.1})`} strokeWidth="0.6" />;
        })}
        <circle cx={C} cy={C} r={126} fill="none" stroke="rgba(230,198,122,0.25)" strokeWidth="0.8" />
      </g>
      <g style={{ transformOrigin: "center", animation: "mandalaSpin 90s linear infinite" }}>
        {centers.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={r} fill="none" stroke={`rgba(246,231,176,${active ? 0.55 : 0.35})`} strokeWidth="0.8" />
        ))}
        <circle cx={C} cy={C} r={r * 3} fill="none" stroke="rgba(246,231,176,0.35)" strokeWidth="0.8" />
      </g>
    </svg>
  );
}

const FAST = 0.011, SLOW = 0.0016;

export default function ElementWheel({ elements, method, ui, onSelect }) {
  const [angle, setAngle] = useState(0);
  const [areaHover, setAreaHover] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  const hoverRef = useRef(false);
  const speedRef = useRef(FAST);

  useEffect(() => {
    let last = performance.now(), raf;
    const tick = (now) => {
      const dt = Math.min(now - last, 60); last = now;
      const target = hoverRef.current ? SLOW : FAST;
      speedRef.current += (target - speedRef.current) * 0.05;
      setAngle((a) => a + speedRef.current * dt);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const enter = () => { hoverRef.current = true; setAreaHover(true); };
  const leave = () => { hoverRef.current = false; setAreaHover(false); setHoveredId(null); };

  const N = elements.length;
  const radius = 196;

  return (
    <div className="relative mx-auto" style={{ width: 560, maxWidth: "92vw" }}>
      <div className="relative" style={{ paddingBottom: "100%" }}>
        <div className="absolute inset-0 select-none" onMouseEnter={enter} onMouseLeave={leave}>
          {/* outer geometry */}
          <svg className="absolute inset-0 w-full h-full geo-spin" viewBox="0 0 560 560" style={{ opacity: areaHover ? 0.55 : 0.35, transition: "opacity .5s" }}>
            <circle cx="280" cy="280" r="250" fill="none" stroke="rgba(230,198,122,0.22)" strokeWidth="1" />
            {Array.from({ length: 12 }).map((_, i) => {
              const a = (i / 12) * Math.PI * 2;
              return <line key={i} x1={280} y1={280} x2={280 + 250 * Math.cos(a)} y2={280 + 250 * Math.sin(a)} stroke="rgba(230,198,122,0.08)" strokeWidth="0.6" />;
            })}
          </svg>

          {/* rotating planets */}
          <div className="absolute inset-0" style={{ transform: `rotate(${angle}deg)` }}>
            {elements.map((el, i) => {
              const a = (i / N) * Math.PI * 2 - Math.PI / 2;
              const cx = 50 + (radius / 5.6) * Math.cos(a);
              const cy = 50 + (radius / 5.6) * Math.sin(a);
              const isHov = hoveredId === el.id;
              const active = areaHover;
              return (
                <div key={el.id} className="absolute" style={{ left: `${cx}%`, top: `${cy}%`, transform: `translate(-50%,-50%) rotate(${-angle}deg)`, zIndex: isHov ? 20 : 5 }}>
                  <button
                    onClick={(e) => { e.stopPropagation(); onSelect(el); }}
                    onMouseEnter={() => setHoveredId(el.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className="relative block"
                    style={{ background: "none", border: "none", cursor: "pointer" }}
                  >
                    <div style={{ transform: isHov ? "scale(1.12)" : "scale(1)", transition: "transform .4s cubic-bezier(.2,.7,.2,1)" }}>
                      <Planet type={el.id} size={118} active={active || isHov} />
                    </div>
                    {/* designer label */}
                    <span className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-center pointer-events-none" style={{ bottom: -30 }}>
                      <span className="font-label block" style={{ fontSize: 12, letterSpacing: "0.18em", color: el.color, opacity: isHov ? 1 : 0.9, textShadow: "0 1px 6px rgba(0,0,0,0.9)" }}>
                        {el.order} · {el.name}
                      </span>
                      <span className="font-body block italic transition-all duration-300" style={{ fontSize: 10.5, color: "#cfcabb", maxWidth: 150, whiteSpace: "normal", margin: "2px auto 0", opacity: isHov ? 1 : 0, transform: isHov ? "translateY(0)" : "translateY(-4px)", textShadow: "0 1px 6px rgba(0,0,0,0.95)" }}>
                        {el.obraz}
                      </span>
                    </span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* center brand star */}
          <button className="brand-core" onClick={(e) => { e.stopPropagation(); onSelect(method); }}
            onMouseEnter={() => setHoveredId("brand")} onMouseLeave={() => setHoveredId(null)}>
            <Mandala active={areaHover} />
            <div className="relative flex items-center justify-center"
              style={{ width: 150, height: 150, borderRadius: "50%",
                background: "radial-gradient(circle at 42% 38%, #ffffff, #fdf6e3 45%, #f4e2b0 72%, #e6c67a 100%)",
                boxShadow: (areaHover || hoveredId === "brand")
                  ? "0 0 60px rgba(246,231,176,0.95), 0 0 130px rgba(246,231,176,0.5), inset -6px -8px 24px rgba(180,146,63,0.35)"
                  : "0 0 40px rgba(246,231,176,0.7), 0 0 90px rgba(246,231,176,0.35), inset -6px -8px 24px rgba(180,146,63,0.35)",
                transform: hoveredId === "brand" ? "scale(1.06)" : "scale(1)",
                transition: "box-shadow .5s ease, transform .4s ease",
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

      <div className="flex items-center justify-center gap-2 mt-3 text-dim">
        <Sparkles size={14} className="text-gold" />
        <span className="font-label text-[11px] tracking-widest">{ui.wheelHint}</span>
      </div>
    </div>
  );
}
