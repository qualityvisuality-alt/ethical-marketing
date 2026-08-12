import React, { useRef, useState, useEffect } from "react";
import { Sparkles, ArrowDown } from "lucide-react";
import Planet from "./Planet";

const PORTAL_META = {
  water: { title: "ВОДА", sub: "ЗАНУРЕННЯ", icon: "≈" },
  wood: { title: "ДЕРЕВО", sub: "НАПРЯМ", icon: "◈" },
  fire: { title: "ВОГОНЬ", sub: "ДІЯ", icon: "✦" },
  earth: { title: "ЗЕМЛЯ", sub: "ВТІЛЕННЯ", icon: "◇" },
  metal: { title: "МЕТАЛ", sub: "СИСТЕМА", icon: "⬡" },
};

export default function ElementWheel({ elements, method, ui, onSelect }) {
  const [angle, setAngle] = useState(0);
  const [hoveredId, setHoveredId] = useState(null);
  const hoverRef = useRef(false);

  useEffect(() => {
    let last = performance.now(), raf;
    const tick = (now) => {
      const dt = Math.min(now - last, 60); last = now;
      const target = hoverRef.current ? 0.0012 : 0.0042;
      setAngle((a) => a - target * dt); // counter-clockwise
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const N = elements.length;
  const radius = 225;

  return (
    <div className="portal-room-wrap">
      <div className="portal-room">
        <div className="portal-room-overlay" />
        <div className="portal-room-title">
          <div className="font-label portal-kicker">QUALITY VISUALITY · ETHICAL MARKETING</div>
          <h2 className="font-display">ЯКА СТИХІЯ СЬОГОДНІ<br/>КЛИЧЕ ТЕБЕ?</h2>
          <p>П'ять архетипів. П'ять входів. Один цілісний бренд.</p>
        </div>

        <div className="portal-orbit">
          <div className="portal-orbit-ring" />
          <button className="portal-center" onClick={() => onSelect(method)} aria-label="Дослідити бренд">
            <div className="portal-center-inner">
              <span className="font-label">ЦЕНТР</span>
              <strong className="font-display">БРЕНД</strong>
              <small>ЕФІР · ЦІЛІСНІСТЬ</small>
            </div>
          </button>

          <div
            className="portal-rotator"
            style={{ transform: `rotate(${angle}deg)` }}
            onMouseEnter={() => { hoverRef.current = true; }}
            onMouseLeave={() => { hoverRef.current = false; setHoveredId(null); }}
          >
            {elements.map((el, i) => {
              const a = (i / N) * Math.PI * 2 - Math.PI / 2;
              const cx = 50 + (radius / 5.8) * Math.cos(a);
              const cy = 50 + (radius / 5.8) * Math.sin(a);
              const isHov = hoveredId === el.id;
              const meta = PORTAL_META[el.id];

              return (
                <div key={el.id} className={`portal-node portal-node--${el.id}`} style={{ left: `${cx}%`, top: `${cy}%`, transform: `translate(-50%,-50%) rotate(${-angle}deg)`, zIndex: isHov ? 20 : 5 }}>
                  <button
                    className={`portal-button ${isHov ? "is-hovered" : ""}`}
                    onClick={(e) => { e.stopPropagation(); onSelect(el); }}
                    onMouseEnter={() => setHoveredId(el.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    aria-label={`Зайти в портал ${meta.title}`}
                  >
                    <div className="portal-image"><Planet type={el.id} size={156} active={isHov} /></div>
                    <div className="portal-copy">
                      <span className="portal-symbol">{meta.icon}</span>
                      <span className="portal-name font-label">{meta.title}</span>
                      <span className="portal-sub">{meta.sub}</span>
                    </div>
                    <span className="portal-pulse" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="portal-room-footer">
          <span><Sparkles size={14}/> {ui.exploreBtn || "Досліджувати стихії"}</span>
          <span>натисни на планету · увійди в портал</span>
        </div>
        <a href="#stages" className="portal-scroll-cue" aria-label="Далі">
          <span>ДАЛІ</span><ArrowDown size={17} />
        </a>
      </div>
    </div>
  );
}
