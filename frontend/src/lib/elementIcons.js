import React from "react";

// Custom line-art glyphs recreated to match the source infographic "Образ" icons.
const S = ({ size = 24, color, style, ...rest }) => ({
  width: size, height: size, viewBox: "0 0 24 24", fill: "none",
  stroke: color || "currentColor", strokeWidth: 1.7, strokeLinecap: "round",
  strokeLinejoin: "round", style: { color, ...style }, ...rest,
});

// WATER — an eye (inner vision), with lashes and a couple of water ripple lines
export const WaterGlyph = (p) => (
  <svg {...S(p)}>
    <path d="M1.8 11 C5 6.5 19 6.5 22.2 11 C19 15.5 5 15.5 1.8 11 Z" />
    <circle cx="12" cy="11" r="3" />
    <path d="M12 4.2 V2.4" />
    <path d="M6.6 5.6 L5.3 3.9" />
    <path d="M17.4 5.6 L18.7 3.9" />
    <path d="M4 18.5 C7 17 9 20 12 18.5 C15 17 17 20 20 18.5" />
  </svg>
);

// WOOD — a single leaf with a central vein
export const WoodGlyph = (p) => (
  <svg {...S(p)}>
    <path d="M5 19 C5 10 11.5 4 20 4 C20 12.5 13.5 19 5 19 Z" />
    <path d="M6.5 17.5 C10 14 14 9.5 18 6.5" />
  </svg>
);

// FIRE — a flame with an inner tongue
export const FireGlyph = (p) => (
  <svg {...S(p)}>
    <path d="M12 2.5 C12 6 15.5 7.5 15.5 11.5 A3.6 3.6 0 0 1 8.5 12 C8.5 10 10 9 10 6 C10.8 6.9 11.6 6.5 12 2.5 Z" />
    <path d="M12 19.3 A2.1 2.1 0 0 0 12.2 12.8 C12.6 14.2 11.7 15 11.7 16.6 A1.4 1.4 0 0 0 12 19.3 Z" />
  </svg>
);

// EARTH — a sprout with two leaves
export const EarthGlyph = (p) => (
  <svg {...S(p)}>
    <path d="M12 21 V10.5" />
    <path d="M12 14 C9.5 14 6.5 13 5.5 9.8 C8.6 9.3 11 10.4 12 14 Z" />
    <path d="M12 11.5 C14.5 11.5 17.5 10.5 18.5 7.3 C15.4 6.8 13 7.9 12 11.5 Z" />
  </svg>
);

// METAL — a gear / cog
export const MetalGlyph = (p) => {
  const cx = 12, cy = 12, ri = 6.2, ro = 8.3;
  const teeth = Array.from({ length: 8 }).map((_, i) => {
    const a = (i * Math.PI) / 4;
    return { x1: cx + ri * Math.cos(a), y1: cy + ri * Math.sin(a), x2: cx + ro * Math.cos(a), y2: cy + ro * Math.sin(a) };
  });
  return (
    <svg {...S(p)}>
      {teeth.map((t, i) => <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} />)}
      <circle cx={cx} cy={cy} r={ri} />
      <circle cx={cx} cy={cy} r={2.6} />
    </svg>
  );
};

// BRAND — a radiant 4-point star (used for the center core)
export const BrandGlyph = (p) => (
  <svg {...S(p)}>
    <path d="M12 2 L13.6 9.4 L21 11 L13.6 12.6 L12 20 L10.4 12.6 L3 11 L10.4 9.4 Z" />
  </svg>
);

export const ELEMENT_ICON = {
  water: WaterGlyph,
  wood: WoodGlyph,
  fire: FireGlyph,
  earth: EarthGlyph,
  metal: MetalGlyph,
  brand: BrandGlyph,
};
