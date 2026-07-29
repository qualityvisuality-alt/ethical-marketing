import React from "react";
import { PenTool, Filter, TrendingUp, Globe, Search, BarChart3, Mail, Megaphone, Instagram, Youtube, Users, Cpu } from "lucide-react";

const ICONS = [PenTool, Filter, TrendingUp, Globe, Search, BarChart3, Mail, Megaphone, Instagram, Youtube, Users, Cpu];

export default function Tools({ tools, title }) {
  return (
    <section id="tools" className="relative py-20 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-14 reveal">
          <span className="diamond" />
          <h2 className="font-label text-center tracking-[0.14em] gold-gradient-text" style={{ fontSize: "clamp(20px,3vw,30px)" }}>{title}</h2>
          <span className="diamond" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {tools.map((t, i) => {
            const Icon = ICONS[i] || PenTool;
            return (
              <div key={i} className="panel p-5 flex flex-col items-center text-center gap-3 reveal group transition-all duration-300 hover:-translate-y-1.5 hover:border-gold"
                style={{ animationDelay: `${i * 0.04}s` }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300"
                  style={{ background: "rgba(230,198,122,0.08)", border: "1px solid rgba(230,198,122,0.3)" }}>
                  <Icon size={22} className="text-gold group-hover:text-gold-bright transition-colors" />
                </div>
                <span className="font-label text-[11px] tracking-wide text-dim leading-tight">{t}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
