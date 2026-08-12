import React, { useState } from "react";
import { PenTool, Filter, TrendingUp, Globe, Search, BarChart3, Mail, Megaphone, Instagram, Youtube, Users, Cpu, ArrowUpRight } from "lucide-react";
import ToolModal from "./ToolModal";

const ICONS = [PenTool, Filter, TrendingUp, Globe, Search, BarChart3, Mail, Megaphone, Instagram, Youtube, Users, Cpu];

export default function Tools({ tools, title }) {
  const [selected, setSelected] = useState(null);
  return (
    <section id="tools" className="relative py-20 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-5 reveal"><span className="diamond" /><h2 className="font-label text-center tracking-[0.14em] gold-gradient-text" style={{ fontSize: "clamp(20px,3vw,30px)" }}>{title}</h2><span className="diamond" /></div>
        <p className="text-center text-dim text-sm max-w-2xl mx-auto mb-12 reveal">Кожен інструмент можна пройти разом зі мною окремо або зібрати в систему під конкретний продукт, курс чи бізнес-задачу.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {tools.map((t, i) => {
            const Icon = ICONS[i] || PenTool;
            return (
              <button key={i} onClick={() => setSelected(t)} className="tool-card panel p-5 flex flex-col items-center text-center gap-3 reveal group" style={{ animationDelay: `${i * 0.04}s` }} aria-label={`Відкрити ${t}`}>
                <div className="tool-card-icon w-12 h-12 rounded-full flex items-center justify-center"><Icon size={22} /></div>
                <span className="font-label text-[11px] tracking-wide text-dim leading-tight">{t}</span>
                <ArrowUpRight size={13} className="tool-card-arrow" />
              </button>
            );
          })}
        </div>
      </div>
      {selected && <ToolModal tool={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
