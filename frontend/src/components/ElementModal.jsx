import React, { useEffect, useState } from "react";
import { X, Volume2, VolumeX, ArrowRight, Check, Waves, Trees, Flame, Gem, Cog, Fish, Sparkles, MessageCircle } from "lucide-react";
import ElementCanvas from "./ElementCanvas";
import { ambient } from "../lib/audio";
import { ELEMENT_ICON } from "../lib/elementIcons";

const SCENES = {
  water: { title: "Занурення", lead: "Вода — це не поверхня. Це занурення в те, навіщо існує твій бренд.", freq: "741 Hz · Вішуддха", nature: "вода · глибина · дельфіни · кити · затонуле місто", Icon: Waves, Creature: Fish },
  wood: { title: "Напрям", lead: "Дерево — це напрям росту: побачити світло, конкуренцію і простір, де твій бренд може вирости.", freq: "639 Hz · Анахата", nature: "ліс · секвої · вітер · птахи · живі феї", Icon: Trees, Creature: Sparkles },
  fire: { title: "Дія", lead: "Вогонь — це момент, коли стратегія перестає бути документом і стає дією.", freq: "396 Hz · Мулadhара", nature: "камін · жар · іскри · рух · трансформація", Icon: Flame, Creature: Sparkles },
  earth: { title: "Втілення", lead: "Земля — це те, що тримає бренд у реальному світі: довіра, досвід, спільнота і стійкість.", freq: "256 Hz · коренева опора", nature: "сліди · лісова печера · кристали · мінерали · коріння", Icon: Gem, Creature: Gem },
  metal: { title: "Система", lead: "Метал — це ясність процесів: аналітика, автоматизація, AI та система, яка звільняє час для людини.", freq: "1111 Hz · резонанс структури", nature: "гонг · handpan · механізми · шестерні · геометрія", Icon: Cog, Creature: Cog },
  brand: { title: "Ефір · Бренд", lead: "Ефір — не ще одна послуга. Це простір, у якому п'ять стихій стають одним живим брендом.", freq: "936 Hz · дуже тихий фон", nature: "місто · дороги · велосипед · люди · птахи · життя", Icon: Sparkles, Creature: Sparkles },
};

function SceneVisual({ element }) {
  const scene = SCENES[element.id] || SCENES.brand;
  const Icon = scene.Icon;
  const Creature = scene.Creature;
  return (
    <div className={`portal-scene portal-scene--${element.id}`}>
      <div className="portal-scene-bg" style={{ backgroundImage: `linear-gradient(180deg, rgba(4,7,13,.08), rgba(4,7,13,.88)), url(${element.image || ""})` }} />
      <div className="portal-scene-vignette" />
      <div className="portal-scene-rune"><Icon size={24} /><span>{scene.freq}</span></div>
      <div className="scene-creature scene-creature-a"><Creature size={28} /></div>
      <div className="scene-creature scene-creature-b"><Sparkles size={19} /></div>
      <div className="scene-light" />
      <div className="portal-scene-caption"><span className="font-label">{scene.title}</span><strong>{scene.lead}</strong></div>
    </div>
  );
}

export default function ElementModal({ element, ui, onClose }) {
  const EIcon = ELEMENT_ICON[element.id] || Sparkles;
  const [sound, setSound] = useState(true);
  const scene = SCENES[element.id] || SCENES.brand;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    if (sound) ambient.play(element.sound);
    const esc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => { document.body.style.overflow = ""; ambient.stop(); window.removeEventListener("keydown", esc); };
    // eslint-disable-next-line
  }, [element]);

  const toggleSound = () => {
    const next = !sound; setSound(next); ambient.toggle(next); if (next) ambient.play(element.sound);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(3,5,10,0.88)", backdropFilter: "blur(10px)" }} onClick={onClose}>
      <div className="panel panel-glow relative w-full max-w-5xl max-h-[92vh] overflow-y-auto reveal in" style={{ borderColor: `${element.color}66` }} onClick={(e) => e.stopPropagation()}>
        <div className="relative overflow-hidden rounded-t-[14px]">
          <SceneVisual element={element} />
          <div className="absolute inset-0"><ElementCanvas element={element.sound} /></div>
          <div className="absolute top-3 right-3 flex gap-2 z-10">
            <button onClick={toggleSound} className="btn-ghost w-10 h-10 flex items-center justify-center rounded-full" title={sound ? ui.soundOn : "Увімкнути звук"}>{sound ? <Volume2 size={18} /> : <VolumeX size={18} />}</button>
            <button onClick={onClose} className="btn-ghost w-10 h-10 flex items-center justify-center rounded-full"><X size={18} /></button>
          </div>
        </div>

        <div className="px-5 md:px-8 pt-6">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center rounded-full flex-shrink-0" style={{ width: 46, height: 46, border: `1.5px solid ${element.color}`, background: `${element.color}1f`, boxShadow: `0 0 18px ${element.color}55` }}><EIcon size={24} style={{ color: element.color }} /></span>
            <div><div className="font-label text-dim tracking-widest text-xs">{element.kicker || `${element.order} · ${ui.brand}`}</div><h3 className="font-display" style={{ fontSize: 42, fontWeight: 800, color: element.color, lineHeight: 1 }}>{element.name}</h3></div>
          </div>
          <p className="font-body text-sm mt-3 max-w-3xl" style={{ color: "#d8d4c6" }}>{element.essence}</p>
          <div className="sound-signature mt-3"><Volume2 size={14} /><span>{scene.nature}</span><b>{scene.freq}</b></div>
        </div>

        <div className="p-5 md:p-8 grid md:grid-cols-2 gap-6">
          <div><div className="font-label text-xs tracking-widest mb-3" style={{ color: element.color }}>{ui.whatIncludes}</div><ul className="space-y-2">{element.points.map((p, i) => <li key={i} className="flex items-start gap-2 text-sm text-dim"><span className="mt-1.5 flex-shrink-0 rounded-full" style={{ width: 6, height: 6, background: element.color }} /><span>{p}</span></li>)}</ul></div>
          <div className="rounded-xl p-4" style={{ background: `linear-gradient(160deg, ${element.color}14, transparent)`, border: `1px solid ${element.color}33` }}>
            <div className="font-label text-xs tracking-widest mb-2" style={{ color: element.color }}>{element.valueTitle}</div>
            <p className="font-body text-[13.5px] leading-relaxed" style={{ color: "#e4e0d3" }}>{element.value}</p>
            <div className="gold-rule my-4" /><ul className="space-y-2">{element.deliver.map((d, i) => <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#cdc9bb" }}><Check size={15} className="mt-0.5 flex-shrink-0" style={{ color: element.color }} /><span>{d}</span></li>)}</ul>
          </div>
        </div>

        {element.cases && <div className="px-5 md:px-8 pb-2"><div className="font-label text-xs tracking-widest mb-2" style={{ color: element.color }}>{ui.casesTitle}</div><div className="grid md:grid-cols-2 gap-3">{element.cases.map((c, i) => <div key={i} className="rounded-lg p-3 font-body text-[12.5px] leading-relaxed" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(230,198,122,0.15)", color: "#cdc9bb" }}>{c}</div>)}</div></div>}

        <div className="px-5 md:px-8 pb-7 pt-5 flex flex-wrap gap-3 items-center">
          <a href={`mailto:qualityvisuality@gmail.com?subject=${encodeURIComponent(`Quality Visuality · ${element.name}`)}`} className="btn-gold inline-flex items-center gap-2 px-6 py-3 text-sm"><MessageCircle size={16} /> Написати мені <ArrowRight size={16} /></a>
          <span className="font-body text-[11px] text-dim">Вартість і формат узгоджуємо під конкретну задачу — без прихованих пакетів.</span>
        </div>
      </div>
    </div>
  );
}
