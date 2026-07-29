import React from "react";
import { Coffee, Search, Target, Share2, Cpu, ArrowRight } from "lucide-react";

const ICONS = { "01": Coffee, "02": Search, "03": Target, "04": Share2, "05": Cpu };
const COLORS = { water: "#5aa9e6", wood: "#7bc47f", fire: "#f0803c", earth: "#d9a24a", metal: "#aeb9cc" };

export default function Stages({ stages, title }) {
  return (
    <section id="stages" className="relative py-20 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-14 reveal">
          <span className="diamond" />
          <h2 className="font-label text-center tracking-[0.14em] gold-gradient-text" style={{ fontSize: "clamp(20px,3vw,30px)" }}>{title}</h2>
          <span className="diamond" />
        </div>

        <div className="grid md:grid-cols-5 gap-5">
          {stages.map((s, i) => {
            const Icon = ICONS[s.n] || Coffee;
            const c = COLORS[s.element];
            return (
              <div key={s.n} className="relative reveal" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="panel h-full p-5 transition-transform duration-300 hover:-translate-y-1.5" style={{ borderColor: `${c}44` }}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: `${c}1a`, border: `1px solid ${c}55` }}>
                      <Icon size={20} style={{ color: c }} />
                    </div>
                    <span className="font-display" style={{ fontSize: 30, fontWeight: 800, color: `${c}55` }}>{s.n}</span>
                  </div>
                  <h3 className="font-label tracking-wide mb-3 leading-tight" style={{ fontSize: 14.5, color: "#efe9d8" }}>{s.title}</h3>
                  <p className="font-body text-[12.5px] leading-relaxed text-dim">{s.text}</p>
                </div>
                {i < stages.length - 1 && (
                  <ArrowRight size={18} className="hidden md:block absolute top-8 -right-3.5 text-gold" style={{ opacity: 0.6 }} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
