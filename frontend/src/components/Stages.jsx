import React from "react";
import { ArrowDown, RefreshCw, ChevronRight } from "lucide-react";
import { ELEMENT_ICON } from "../lib/elementIcons";

const COLORS = { water: "#5aa9e6", wood: "#7bc47f", fire: "#f0803c", earth: "#d9a24a", metal: "#aeb9cc" };

function Chip({ text, color }) {
  return (
    <span className="font-body text-[11.5px] px-2.5 py-1 rounded-full whitespace-nowrap"
      style={{ background: `${color}12`, border: `1px solid ${color}33`, color: "#d8d4c6" }}>{text}</span>
  );
}

function StageCard({ s }) {
  const c = COLORS[s.element];
  const Icon = ELEMENT_ICON[s.element];
  return (
    <div className="reveal panel p-6 md:p-7 relative overflow-hidden" style={{ borderColor: `${c}44` }}>
      <div className="absolute top-0 left-0 h-full" style={{ width: 4, background: `linear-gradient(${c}, transparent)` }} />
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="flex items-center justify-center rounded-full flex-shrink-0" style={{ width: 46, height: 46, border: `1.5px solid ${c}`, background: `${c}1a`, boxShadow: `0 0 18px ${c}44` }}>
          <Icon size={22} style={{ color: c }} />
        </span>
        <span className="font-display" style={{ fontSize: 30, fontWeight: 800, color: `${c}66` }}>{s.n}</span>
        <div className="flex-1 min-w-[180px]">
          <h3 className="font-label tracking-wide leading-tight" style={{ fontSize: 16, color: "#efe9d8" }}>{s.title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-body text-[11px] px-2 py-0.5 rounded" style={{ color: "#b7b3a4", border: "1px solid rgba(230,198,122,0.2)" }}>{s.question}</span>
          <span className="font-label text-[11px] tracking-widest px-3 py-1 rounded-full" style={{ background: `${c}1f`, border: `1px solid ${c}`, color: c }}>➜ {s.output}</span>
        </div>
      </div>

      <p className="font-body text-[13px] leading-relaxed text-dim mb-4">{s.intro}</p>

      {s.includes && (
        <div className="mb-3">
          <div className="font-label text-[11px] tracking-widest mb-2" style={{ color: c }}>{s.includesTitle}</div>
          <div className="flex flex-wrap gap-1.5">
            {s.includes.map((it, i) => <Chip key={i} text={it} color={c} />)}
          </div>
        </div>
      )}

      {s.groups && (
        <div className="grid sm:grid-cols-2 gap-3 mb-3">
          {s.groups.map((g, i) => (
            <div key={i} className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(230,198,122,0.12)" }}>
              <div className="font-label text-[11px] tracking-wide mb-2" style={{ color: c }}>{g.label}</div>
              <div className="flex flex-wrap gap-1.5">
                {g.items.map((it, j) => <Chip key={j} text={it} color={c} />)}
              </div>
            </div>
          ))}
        </div>
      )}

      {s.format && (
        <div className="rounded-lg p-3 mb-2" style={{ background: `${c}0e`, border: `1px solid ${c}2e` }}>
          <span className="font-label text-[10.5px] tracking-widest" style={{ color: c }}>ФОРМАТ · FORMAT</span>
          <p className="font-body italic text-[12.5px] leading-relaxed mt-1" style={{ color: "#d8d4c6" }}>{s.format}</p>
        </div>
      )}

      {s.extra && s.extra.map((e, i) => (
        <p key={i} className="font-body italic text-[12px] leading-relaxed text-dim mt-2 pl-3" style={{ borderLeft: `2px solid ${c}55` }}>{e}</p>
      ))}
    </div>
  );
}

function FlowDiagram({ stages, flow }) {
  return (
    <div className="reveal panel panel-glow p-6 md:p-8 mt-8">
      <div className="text-center mb-5">
        <span className="font-display gold-gradient-text" style={{ fontSize: 22, fontWeight: 800 }}>☯ {flow.dao}</span>
      </div>
      <div className="flex flex-col items-center gap-1.5">
        {stages.map((s) => {
          const c = COLORS[s.element];
          const Icon = ELEMENT_ICON[s.element];
          return (
            <React.Fragment key={s.n}>
              <ArrowDown size={16} className="text-gold opacity-50" />
              <div className="flex items-center gap-3 rounded-xl px-4 py-2.5 w-full max-w-md justify-center" style={{ background: `${c}12`, border: `1px solid ${c}3a` }}>
                <Icon size={18} style={{ color: c }} />
                <span className="font-label tracking-wide text-[13px]" style={{ color: c }}>{s.short}</span>
                <ChevronRight size={13} className="opacity-40" style={{ color: c }} />
                <span className="font-body text-[12px] text-dim">{s.phase}</span>
                <span className="font-body text-[11px] italic ml-auto" style={{ color: "#b7b3a4" }}>«{s.question}»</span>
              </div>
            </React.Fragment>
          );
        })}
        <ArrowDown size={16} className="text-gold opacity-50" />
        <div className="flex items-center gap-2 rounded-full px-4 py-2" style={{ background: "rgba(90,169,230,0.12)", border: "1px solid rgba(90,169,230,0.4)" }}>
          <RefreshCw size={15} style={{ color: "#5aa9e6" }} className="anim-pulse-glow" />
          <span className="font-label tracking-widest text-[12px]" style={{ color: "#5aa9e6" }}>ВОДА · {flow.loop} ↺</span>
        </div>
      </div>
    </div>
  );
}

export default function Stages({ stages, title, flow }) {
  return (
    <section id="stages" className="relative py-20 px-5">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-14 reveal">
          <span className="diamond" />
          <h2 className="font-label text-center tracking-[0.14em] gold-gradient-text" style={{ fontSize: "clamp(20px,3vw,30px)" }}>{title}</h2>
          <span className="diamond" />
        </div>

        <div className="space-y-4">
          {stages.map((s, i) => (
            <React.Fragment key={s.n}>
              <StageCard s={s} />
              {i < stages.length - 1 && (
                <div className="flex justify-center reveal">
                  <ArrowDown size={22} className="text-gold opacity-60" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <FlowDiagram stages={stages} flow={flow} />
      </div>
    </section>
  );
}
