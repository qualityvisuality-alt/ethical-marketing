import React from "react";

// Stylized CSS "planet" spheres for each element.
const GLOW = {
  water: "#5aa9e6", wood: "#7bc47f", fire: "#f0803c", earth: "#d9a24a", metal: "#aeb9cc",
};

function Sequoia({ h }) {
  const w = h * 0.34;
  return (
    <div style={{ position: "relative", width: w, height: h, display: "flex", flexDirection: "column", alignItems: "center" }}>
      {[0.5, 0.72, 1].map((s, i) => (
        <div key={i} style={{
          width: 0, height: 0,
          borderLeft: `${(w * (0.5 + i * 0.25)) / 1.6}px solid transparent`,
          borderRight: `${(w * (0.5 + i * 0.25)) / 1.6}px solid transparent`,
          borderBottom: `${h * 0.33}px solid ${i === 0 ? "#3c7a42" : i === 1 ? "#2f6b37" : "#245a2c"}`,
          marginTop: i === 0 ? 0 : -h * 0.14,
          filter: "drop-shadow(0 0 3px rgba(30,80,30,0.6))",
        }} />
      ))}
      <div style={{ width: Math.max(2, w * 0.14), height: h * 0.16, background: "#4a3116", marginTop: -1 }} />
    </div>
  );
}

export default function Planet({ type, size = 118 }) {
  const R = size / 2;
  const trees = type === "wood"
    ? [-52, -30, -8, 14, 36, 56].map((a, i) => ({ a, h: size * (0.26 + (i % 2) * 0.06) }))
    : [];

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      {/* atmosphere glow */}
      <div style={{
        position: "absolute", inset: "-14%", borderRadius: "50%", pointerEvents: "none",
        background: `radial-gradient(circle, ${GLOW[type]}44, transparent 68%)`,
      }} />
      {/* sphere body (clipped) */}
      <div className={`planet planet--${type}`} style={{ width: size, height: size, boxShadow: `0 0 24px ${GLOW[type]}55` }}>
        <div className="planet-surface" />
        {type === "metal" && <div className="planet-shine" />}
        <div className="planet-shade" />
      </div>
      {/* rim */}
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `1.5px solid ${GLOW[type]}aa`, pointerEvents: "none" }} />
      {/* trees grow radially from wood planet (not clipped) */}
      {trees.map((t, i) => (
        <div key={i} style={{ position: "absolute", left: "50%", top: "50%", width: 0, height: 0, transform: `rotate(${t.a}deg)` }}>
          <div style={{ position: "absolute", left: 0, top: 0, transform: `translate(-50%, ${-R - t.h * 0.72}px)` }}>
            <Sequoia h={t.h} />
          </div>
        </div>
      ))}
    </div>
  );
}
