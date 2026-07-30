import React from "react";
import waterImg from "../assets/planets/water.png";
import metalImg from "../assets/planets/metal.png";

// Hyperreal generated planet images (add wood/fire/earth here once generated)
const IMAGES = { water: waterImg, metal: metalImg };

const GLOW = { water: "#5aa9e6", wood: "#7bc47f", fire: "#f0803c", earth: "#d9a24a", metal: "#aeb9cc", brand: "#f6e7b0" };

function Sequoia({ h }) {
  const w = h * 0.34;
  return (
    <div style={{ position: "relative", width: w, height: h, display: "flex", flexDirection: "column", alignItems: "center" }}>
      {[0, 1, 2].map((i) => (
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

export default function Planet({ type, size = 118, active = false }) {
  const R = size / 2;
  const color = GLOW[type];
  const img = IMAGES[type];
  const trees = (!img && type === "wood")
    ? [-52, -30, -8, 14, 36, 56].map((a, i) => ({ a, h: size * (0.26 + (i % 2) * 0.06) }))
    : [];

  const glow = active
    ? `0 0 34px ${color}, 0 0 70px ${color}88, 0 0 120px ${color}44`
    : `0 0 22px ${color}66`;

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      {/* atmosphere */}
      <div style={{
        position: "absolute", inset: active ? "-24%" : "-14%", borderRadius: "50%", pointerEvents: "none",
        background: `radial-gradient(circle, ${color}${active ? "66" : "3a"}, transparent 70%)`,
        transition: "inset .5s ease, background .5s ease",
      }} />

      {img ? (
        <div style={{
          width: size, height: size, borderRadius: "50%", overflow: "hidden",
          boxShadow: glow, transition: "box-shadow .5s ease",
        }}>
          <img src={img} alt={type} draggable={false}
            style={{ width: "132%", height: "132%", objectFit: "cover", marginLeft: "-16%", marginTop: "-16%",
              transform: active ? "scale(1.06)" : "scale(1)", transition: "transform .6s ease" }} />
        </div>
      ) : (
        <div className={`planet planet--${type}`} style={{ width: size, height: size, boxShadow: glow, transition: "box-shadow .5s ease" }}>
          <div className="planet-surface" />
          {type === "metal" && <div className="planet-shine" />}
          <div className="planet-shade" />
        </div>
      )}

      {/* rim */}
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `1.5px solid ${color}${active ? "ee" : "99"}`, pointerEvents: "none", transition: "border-color .5s ease" }} />

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
