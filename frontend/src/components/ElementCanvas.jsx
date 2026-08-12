import React, { useRef, useEffect } from "react";

// Transparent particle layer: the portal scene remains visible underneath.
const CONFIG = {
  water: { colors:["#7fc2f0","#5aa9e6","#bfe3ff"], count:34, mode:"bubbles" },
  wood: { colors:["#9bd99e","#7bc47f","#d8f0c0"], count:30, mode:"leaves" },
  fire: { colors:["#ffd27a","#f0803c","#ff5a2c"], count:55, mode:"embers" },
  earth:{ colors:["#e6c07a","#d9a24a","#c98b3a"], count:24, mode:"rings" },
  metal:{ colors:["#dfe6f2","#aeb9cc","#ffffff"], count:44, mode:"shimmer" },
  brand:{ colors:["#f6e7b0","#ffffff","#e6c67a"], count:55, mode:"shimmer" },
};
export default function ElementCanvas({ element }) {
  const ref=useRef(null), raf=useRef(0);
  useEffect(()=>{
    const canvas=ref.current;if(!canvas)return;const ctx=canvas.getContext("2d"),cfg=CONFIG[element]||CONFIG.water;let W=0,H=0,dpr=Math.min(window.devicePixelRatio||1,2);
    const resize=()=>{const r=canvas.getBoundingClientRect();W=r.width;H=r.height;canvas.width=W*dpr;canvas.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0)};resize();const ro=new ResizeObserver(resize);ro.observe(canvas);
    const rnd=(a,b)=>a+Math.random()*(b-a),pick=a=>a[Math.floor(Math.random()*a.length)];
    const make=()=>{const base={c:pick(cfg.colors),a:rnd(.25,.8)};if(cfg.mode==='embers')return {...base,x:rnd(0,W),y:H+rnd(0,40),r:rnd(1,3),vy:rnd(-2.1,-.7),vx:rnd(-.4,.4)};if(cfg.mode==='bubbles')return {...base,x:rnd(0,W),y:H+rnd(0,50),r:rnd(1.5,5),vy:rnd(-1.3,-.4),vx:rnd(-.2,.2)};if(cfg.mode==='leaves')return {...base,x:rnd(0,W),y:H+rnd(0,50),r:rnd(2,5),vy:rnd(-1,-.35),vx:rnd(-.5,.5),rot:rnd(0,6.28),vr:rnd(-.04,.04)};if(cfg.mode==='shimmer')return {...base,x:rnd(0,W),y:rnd(0,H),r:rnd(.6,2.2),tw:rnd(0,6.28),ts:rnd(.02,.07)};return {...base,x:rnd(0,W),y:rnd(0,H),r:rnd(1,2.5)};};
    let ps=Array.from({length:cfg.count},make),rings=[],t=0;
    const draw=()=>{t++;ctx.clearRect(0,0,W,H);
      if(cfg.mode==='rings'){if(t%55===0)rings.push({r:0,a:.35});rings.forEach(r=>{r.r+=1.5;r.a*=.985});rings=rings.filter(r=>r.a>.02);rings.forEach(r=>{ctx.beginPath();ctx.arc(W/2,H/2,r.r,0,6.283);ctx.strokeStyle=`rgba(230,192,122,${r.a})`;ctx.lineWidth=1.2;ctx.stroke()});}
      ps.forEach(p=>{if(cfg.mode==='shimmer'){p.tw+=p.ts;const a=(Math.sin(p.tw)+1)/2;ctx.globalAlpha=.15+a*.65;ctx.fillStyle=p.c;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,6.283);ctx.fill();if(a>.86){ctx.strokeStyle=p.c;ctx.lineWidth=.5;ctx.beginPath();ctx.moveTo(p.x-p.r*3,p.y);ctx.lineTo(p.x+p.r*3,p.y);ctx.moveTo(p.x,p.y-p.r*3);ctx.lineTo(p.x,p.y+p.r*3);ctx.stroke()}ctx.globalAlpha=1;return;}p.x+=p.vx;p.y+=p.vy;if(cfg.mode==='leaves'){p.rot+=p.vr;p.x+=Math.sin(t/20+p.y/40)*.3}if(cfg.mode==='embers')p.x+=Math.sin(t/15+p.y/30)*.4;if(p.y<-10||p.x<-10||p.x>W+10)Object.assign(p,make(),{y:H+10});ctx.globalAlpha=p.a*.7;ctx.fillStyle=p.c;if(cfg.mode==='embers'){ctx.shadowColor=p.c;ctx.shadowBlur=8}ctx.beginPath();if(cfg.mode==='leaves'){ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot);ctx.ellipse(0,0,p.r,p.r*.5,0,0,6.283);ctx.fill();ctx.restore()}else{ctx.arc(p.x,p.y,p.r,0,6.283);ctx.fill()}ctx.shadowBlur=0;ctx.globalAlpha=1});raf.current=requestAnimationFrame(draw)};draw();return()=>{cancelAnimationFrame(raf.current);ro.disconnect()};
  },[element]);
  return <canvas ref={ref} className="w-full h-full block pointer-events-none"/>;
}
