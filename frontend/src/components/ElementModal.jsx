import React, { useEffect, useState } from "react";
import { X, Volume2, VolumeX, ArrowRight, Check, Sparkles } from "lucide-react";
import ElementCanvas from "./ElementCanvas";
import { ambient } from "../lib/audio";
import { ELEMENT_ICON } from "../lib/elementIcons";

export default function ElementModal({ element, ui, onClose }) {
  const EIcon = ELEMENT_ICON[element.id] || Sparkles;
  const [sound, setSound] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    if (sound) ambient.play(element.sound);
    const esc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => {
      document.body.style.overflow = "";
      ambient.stop();
      window.removeEventListener("keydown", esc);
    };
    // eslint-disable-next-line
  }, [element]);

  const toggleSound = () => {
    const next = !sound;
    setSound(next);
    ambient.toggle(next);
    if (next) ambient.play(element.sound);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(3,5,10,0.82)", backdropFilter: "blur(6px)" }} onClick={onClose}>
      <div
        className="panel panel-glow relative w-full max-w-4xl max-h-[90vh] overflow-y-auto reveal in"
        style={{ borderColor: `${element.color}66` }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* header visual with live animation */}
        <div className="relative h-52 md:h-60 overflow-hidden rounded-t-[14px]">
          <div className="absolute inset-0"><ElementCanvas element={element.sound} /></div>
          <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 40%, rgba(8,11,22,0.9))` }} />
          <div className="absolute top-3 right-3 flex gap-2">
            <button onClick={toggleSound} className="btn-ghost w-10 h-10 flex items-center justify-center rounded-full" title={ui.soundOn}>
              {sound ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
            <button onClick={onClose} className="btn-ghost w-10 h-10 flex items-center justify-center rounded-full">
              <X size={18} />
            </button>
          </div>
          <div className="absolute bottom-4 left-5 md:left-7">
            <div className="font-label text-dim tracking-widest text-xs mb-1">{element.kicker || `${element.order} · ${ui.brand}`}</div>
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center rounded-full flex-shrink-0" style={{ width: 46, height: 46, border: `1.5px solid ${element.color}`, background: `${element.color}1f`, boxShadow: `0 0 18px ${element.color}55` }}>
                <EIcon size={24} style={{ color: element.color }} />
              </span>
              <h3 className="font-display" style={{ fontSize: 42, fontWeight: 800, color: element.color, lineHeight: 1 }}>{element.name}</h3>
            </div>
            <div className="font-body text-sm mt-1" style={{ color: "#d8d4c6" }}>{element.essence}</div>
          </div>
        </div>

        {/* body */}
        <div className="p-5 md:p-7 grid md:grid-cols-2 gap-6">
          <div>
            <div className="font-label text-xs tracking-widest mb-3" style={{ color: element.color }}>{ui.whatIncludes}</div>
            <ul className="space-y-2">
              {element.points.map((p, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-dim">
                  <span className="mt-1.5 flex-shrink-0 rounded-full" style={{ width: 6, height: 6, background: element.color }} />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex items-center gap-2 text-xs">
              <EIcon size={16} style={{ color: element.color }} />
              <span className="font-label tracking-widest text-dim">{ui.obraz}:</span>
              <span className="italic" style={{ color: element.color }}>{element.obraz}</span>
            </div>
          </div>

          <div className="rounded-xl p-4" style={{ background: `linear-gradient(160deg, ${element.color}14, transparent)`, border: `1px solid ${element.color}33` }}>
            <div className="font-label text-xs tracking-widest mb-2" style={{ color: element.color }}>{element.valueTitle}</div>
            <p className="font-body text-[13.5px] leading-relaxed" style={{ color: "#e4e0d3" }}>{element.value}</p>
            <div className="gold-rule my-4" />
            <ul className="space-y-2">
              {element.deliver.map((d, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#cdc9bb" }}>
                  <Check size={15} className="mt-0.5 flex-shrink-0" style={{ color: element.color }} />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="px-5 md:px-7 pb-2">
          {element.creatures && (
            <div className="flex items-start gap-2 mb-3 rounded-lg px-3 py-2" style={{ background: `${element.color}10`, border: `1px solid ${element.color}2e` }}>
              <Sparkles size={15} className="mt-0.5 flex-shrink-0" style={{ color: element.color }} />
              <span className="font-body italic text-[12.5px]" style={{ color: "#d8d4c6" }}>{element.creatures}</span>
            </div>
          )}
          {element.cases && (
            <div>
              <div className="font-label text-xs tracking-widest mb-2" style={{ color: element.color }}>{ui.casesTitle}</div>
              <div className="grid md:grid-cols-2 gap-3">
                {element.cases.map((c, i) => (
                  <div key={i} className="rounded-lg p-3 font-body text-[12.5px] leading-relaxed" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(230,198,122,0.15)", color: "#cdc9bb" }}>{c}</div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="px-5 md:px-7 pb-6 pt-4">
          <a href="#contact" onClick={onClose} className="btn-gold inline-flex items-center gap-2 px-6 py-3 text-sm">
            {ui.startBtn} <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
