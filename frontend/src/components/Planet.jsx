import React from "react";
import waterImg from "../assets/planets/water.png";
import metalImg from "../assets/planets/metal.png";
import woodImg from "../assets/planets/wood.png";
import fireImg from "../assets/planets/fire.png";
import earthImg from "../assets/planets/earth.png";

// The first screen stays celestial: five hyperreal visual planet archetypes.
// The mythic creatures belong inside the portals, not on the opening orbit.
const IMAGES = { water: waterImg, metal: metalImg, wood: woodImg, fire: fireImg, earth: earthImg };
const GLOW = { water: "#4bb7ff", wood: "#73d18a", fire: "#ff7b32", earth: "#d9a24a", metal: "#bfcce0" };

export default function Planet({ type, size = 118, active = false }) {
  const color = GLOW[type] || "#e6c67a";
  const img = IMAGES[type];
  const glow = active
    ? `0 0 36px ${color}, 0 0 78px ${color}88, 0 0 140px ${color}44`
    : `0 0 18px ${color}55`;

  return (
    <div className={`celestial-planet celestial-planet--${type}`} style={{ position: "relative", width: size, height: size }}>
      <div className="planet-aura" style={{ position: "absolute", inset: active ? "-34%" : "-22%", borderRadius: "50%", background: `radial-gradient(circle, ${color}${active ? "55" : "22"}, transparent 68%)`, filter: "blur(4px)", transition: "all .5s ease" }} />
      {img ? (
        <div className="planet-orb" style={{ width: size, height: size, borderRadius: "50%", overflow: "hidden", boxShadow: glow, transition: "box-shadow .5s ease, transform .5s ease", transform: active ? "scale(1.06)" : "scale(1)" }}>
          <img src={img} alt={`${type} planet`} draggable={false} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block", filter: "contrast(1.08) saturate(1.08) brightness(.96)" }} />
          <span className="planet-atmosphere" />
          <span className="planet-terminator" />
        </div>
      ) : (
        <div className="planet" style={{ width: size, height: size, boxShadow: glow }}><div className="planet-surface" /><div className="planet-shade" /></div>
      )}
      <span className="planet-rim" style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `1px solid ${color}${active ? "dd" : "66"}`, pointerEvents: "none" }} />
      <span className="planet-specular" />
      {active && <span className="planet-energy-ring" style={{ borderColor: `${color}99` }} />}
    </div>
  );
}
