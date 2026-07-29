import React, { useRef, useEffect } from "react";

// Per-element particle animation drawn on a canvas.
const CONFIG = {
  water: { colors: ["#7fc2f0", "#5aa9e6", "#bfe3ff"], bg: ["#0a2540", "#04101f"], count: 46, mode: "bubbles" },
  wood:  { colors: ["#9bd99e", "#7bc47f", "#d8f0c0"], bg: ["#0d2417", "#04120a"], count: 40, mode: "leaves" },
  fire:  { colors: ["#ffd27a", "#f0803c", "#ff5a2c"], bg: ["#2a1005", "#120602"], count: 70, mode: "embers" },
  earth: { colors: ["#e6c07a", "#d9a24a", "#c98b3a"], bg: ["#221808", "#0f0a03"], count: 34, mode: "rings" },
  metal: { colors: ["#dfe6f2", "#aeb9cc", "#ffffff"], bg: ["#141a28", "#070a12"], count: 60, mode: "shimmer" },
  brand: { colors: ["#f6e7b0", "#ffffff", "#e6c67a"], bg: ["#12142a", "#05060f"], count: 80, mode: "shimmer" },
};

export default function ElementCanvas({ element }) {
  const ref = useRef(null);
  const raf = useRef(0);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const cfg = CONFIG[element] || CONFIG.water;
    let W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const rnd = (a, b) => a + Math.random() * (b - a);
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

    const makeP = () => {
      const base = { c: pick(cfg.colors), a: rnd(0.3, 0.9) };
      if (cfg.mode === "embers") return { ...base, x: rnd(0, W), y: H + rnd(0, 40), r: rnd(1, 3.2), vy: rnd(-2.2, -0.7), vx: rnd(-0.4, 0.4), life: rnd(0.4, 1) };
      if (cfg.mode === "bubbles") return { ...base, x: rnd(0, W), y: H + rnd(0, 60), r: rnd(1.5, 5), vy: rnd(-1.4, -0.4), vx: rnd(-0.2, 0.2) };
      if (cfg.mode === "leaves") return { ...base, x: rnd(0, W), y: H + rnd(0, 60), r: rnd(2, 5), vy: rnd(-1.1, -0.4), vx: rnd(-0.5, 0.5), rot: rnd(0, 6.28), vr: rnd(-0.04, 0.04) };
      if (cfg.mode === "shimmer") return { ...base, x: rnd(0, W), y: rnd(0, H), r: rnd(0.6, 2.2), tw: rnd(0, 6.28), ts: rnd(0.02, 0.07) };
      return { ...base, x: rnd(0, W), y: rnd(0, H), r: rnd(1, 2.5), vy: rnd(-0.3, 0.3), vx: rnd(-0.3, 0.3) };
    };

    let ps = Array.from({ length: cfg.count }, makeP);
    let rings = [];
    let t = 0;

    const draw = () => {
      t += 1;
      const g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, cfg.bg[0]); g.addColorStop(1, cfg.bg[1]);
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);

      // water waves
      if (cfg.mode === "bubbles") {
        ctx.globalAlpha = 0.25;
        for (let k = 0; k < 3; k++) {
          ctx.beginPath();
          for (let x = 0; x <= W; x += 8) {
            const y = H * (0.35 + k * 0.2) + Math.sin((x / 60) + t / 30 + k) * 10;
            x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          }
          ctx.strokeStyle = cfg.colors[k % cfg.colors.length]; ctx.lineWidth = 1.4; ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }

      // earth 369 rings
      if (cfg.mode === "rings") {
        if (t % 55 === 0) rings.push({ r: 0, a: 0.5 });
        rings.forEach((rg) => { rg.r += 1.6; rg.a *= 0.985; });
        rings = rings.filter((rg) => rg.a > 0.02);
        rings.forEach((rg) => {
          ctx.beginPath();
          ctx.arc(W / 2, H / 2, rg.r, 0, 6.283);
          ctx.strokeStyle = `rgba(230,192,122,${rg.a})`; ctx.lineWidth = 1.5; ctx.stroke();
        });
        ctx.fillStyle = "rgba(230,192,122,0.9)";
        ctx.font = "600 13px Oswald, sans-serif"; ctx.textAlign = "center";
        ctx.fillText("3 · 6 · 9", W / 2, H / 2 + 4);
      }

      ps.forEach((p) => {
        if (cfg.mode === "shimmer") {
          p.tw += p.ts;
          const a = (Math.sin(p.tw) + 1) / 2;
          ctx.globalAlpha = 0.2 + a * 0.8;
          ctx.fillStyle = p.c;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill();
          // sparkle cross
          if (a > 0.85) {
            ctx.strokeStyle = p.c; ctx.lineWidth = 0.6; ctx.beginPath();
            ctx.moveTo(p.x - p.r * 3, p.y); ctx.lineTo(p.x + p.r * 3, p.y);
            ctx.moveTo(p.x, p.y - p.r * 3); ctx.lineTo(p.x, p.y + p.r * 3); ctx.stroke();
          }
          ctx.globalAlpha = 1;
          return;
        }
        p.x += p.vx; p.y += p.vy;
        if (cfg.mode === "leaves") { p.rot += p.vr; p.x += Math.sin(t / 20 + p.y / 40) * 0.3; }
        if (cfg.mode === "embers") p.x += Math.sin(t / 15 + p.y / 30) * 0.4;
        if (p.y < -10 || p.x < -10 || p.x > W + 10) Object.assign(p, makeP(), cfg.mode === "earth" ? {} : { y: cfg.mode === "rings" ? rnd(0, H) : H + 10 });
        ctx.globalAlpha = p.a * (cfg.mode === "embers" ? 0.9 : 0.8);
        ctx.fillStyle = p.c;
        if (cfg.mode === "embers") { ctx.shadowColor = p.c; ctx.shadowBlur = 8; }
        ctx.beginPath();
        if (cfg.mode === "leaves") {
          ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
          ctx.ellipse(0, 0, p.r, p.r * 0.5, 0, 0, 6.283); ctx.fill(); ctx.restore();
        } else {
          ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill();
        }
        ctx.shadowBlur = 0; ctx.globalAlpha = 1;
      });

      raf.current = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(raf.current); ro.disconnect(); };
  }, [element]);

  return <canvas ref={ref} className="w-full h-full block" />;
}
