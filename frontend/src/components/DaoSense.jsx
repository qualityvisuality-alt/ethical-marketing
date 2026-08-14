import React from "react";
import { ArrowUpRight, CircleDot, Droplets, Flame, Leaf, Mountain } from "lucide-react";
import { ELEMENT_SYSTEM } from "../constants/elementSystem";
import { toolsForElement } from "../constants/toolCatalog";
import TeaScrollScene from "./TeaScrollScene";
import "./ProductArt.css";
import "./RevisionR4.css";

const ICONS = { water: Droplets, wood: Leaf, fire: Flame, earth: Mountain, metal: CircleDot };
const ORDER = ["water", "wood", "fire", "earth", "metal"];

export default function DaoSense({ lang = "ua", onOpen }) {
  const isUa = lang === "ua";
  const openElement = id => {
    const element = ELEMENT_SYSTEM[id];
    const text = element[lang] || element.ua;
    const tools = toolsForElement(id);
    onOpen?.({
      id,
      sound: id,
      name: text.name,
      color: element.color,
      kicker: `5 ELEMENTS · ${text.phase}`,
      essence: `${text.question} → ${text.outcome}`,
      points: text.clientQuestions,
      valueTitle: isUa ? "ДЕ І ЯКІ ПИТАННЯ ВИРІШУЄМО" : "WHERE THIS HELPS",
      value: text.summary,
      deliver: tools.map(tool => (tool[lang] || tool.ua).name),
      offers: tools.map(tool => (tool[lang] || tool.ua).name),
      cases: text.cases,
    });
  };

  return <section id="dao" className="dao-section">
    <div className="max-w-6xl mx-auto px-5">
      <div className="dao-heading reveal">
        <span className="diamond" />
        <div>
          <div className="dao-kicker">DAO · WU XING · 5 ELEMENTS</div>
          <h2>LESS IS MORE</h2>
          <p>{isUa ? "Не додавати шум. Прибрати зайве — і побачити, що вже працює. Натисни на елемент: побачиш 3 клієнтські кейси, питання та всі інструменти цього етапу." : "Don't add noise. Remove the excess and see what already works. Open an element for three client cases, questions and every tool in that stage."}</p>
        </div>
        <span className="diamond" />
      </div>
      <div className="dao-grid">
        {ORDER.map((id, index) => {
          const item = ELEMENT_SYSTEM[id];
          const Icon = ICONS[id];
          const text = item[lang] || item.ua;
          return <button type="button" key={id} className={`dao-item dao-${id} reveal dao-clickable`} style={{ animationDelay: `${index * 0.08}s`, "--dao-color": item.color }} onClick={() => openElement(id)}>
            <div className="dao-icon" style={{ color: item.color, borderColor: `${item.color}55`, boxShadow: `0 0 30px ${item.color}16` }}><Icon size={22} /></div>
            <div><div className="dao-name" style={{ color: item.color }}>{text.name}</div><div className="dao-sub">{text.outcome}</div><p>{text.question} {text.summary.split(".")[0]}.</p><span className="dao-open">{isUa ? "Відкрити логіку" : "Open logic"}<ArrowUpRight size={12} /></span></div>
          </button>;
        })}
      </div>
    </div>
    <TeaScrollScene lang={lang} />
  </section>;
}
