import React, { useState } from "react";
import { Droplets, Leaf, Flame, Mountain, CircleDot, ArrowUpRight } from "lucide-react";
import ToolModal from "./ToolModal";
import { ELEMENT_SYSTEM } from "../constants/elementSystem";
import { TOOL_CATALOG, toolsForElement } from "../constants/toolCatalog";

const ORDER=["water","wood","fire","earth","metal"];
const ICONS={water:Droplets,wood:Leaf,fire:Flame,earth:Mountain,metal:CircleDot};

export default function Tools({title,lang="ua"}){
 const [selected,setSelected]=useState(null),[activeElement,setActiveElement]=useState("water"),isUa=lang==="ua";
 const active=ELEMENT_SYSTEM[activeElement],activeText=active[lang]||active.ua,ActiveIcon=ICONS[activeElement],activeTools=toolsForElement(activeElement);
 return <section id="tools" className="tools-r4 relative px-5"><div className="max-w-6xl mx-auto">
  <div className="flex items-center justify-center gap-4 mb-4 reveal"><span className="diamond"/><h2 className="font-label text-center tracking-[.14em] gold-gradient-text" style={{fontSize:"clamp(20px,3vw,30px)"}}>{title}</h2><span className="diamond"/></div>
  <p className="tool-subtitle reveal">{isUa?<>Повний каталог: <b>{TOOL_CATALOG.length}</b> інструментів у єдиній логіці 5 елементів. Натисни на будь-який — побачиш, <b>до якого елементу він належить</b>, яку конкретну задачу вирішує і який результат формує.</>:<>Complete catalog: <b>{TOOL_CATALOG.length}</b> tools mapped to the five-element logic. Open any tool to see its element, exact problem and result.</>}</p>
  <div className="tool-tabs" role="tablist" aria-label={isUa?"Елементи системи":"System elements"}>{ORDER.map(id=>{const e=ELEMENT_SYSTEM[id],t=e[lang]||e.ua,Icon=ICONS[id];return <button key={id} type="button" role="tab" aria-selected={activeElement===id} className={activeElement===id?"is-active":""} style={{"--element-color":e.color}} onClick={()=>setActiveElement(id)}><Icon size={16}/><span>{t.name}</span><small>{toolsForElement(id).length}</small></button>})}</div>
  <section className="tool-element-group tool-active-panel panel reveal" style={{"--element-color":active.color}} role="tabpanel"><header className="tool-element-head"><span className="tool-element-icon"><ActiveIcon size={19}/></span><div><span>{activeText.name} · {activeText.phase}</span><strong>{activeText.question} → {activeText.outcome}</strong></div><em>{activeTools.length} {isUa?"інструментів":"tools"}</em></header><p className="tool-element-intro">{activeText.summary}</p><div className="tool-compact-grid">{activeTools.map(tool=>{const x=tool[lang]||tool.ua;return <button type="button" key={tool.id} onClick={()=>setSelected(tool)} className="tool-compact-card"><span>{x.name}</span><small>{x.solves}</small><ArrowUpRight size={13}/></button>})}</div></section>
 </div>{selected&&<ToolModal tool={selected} lang={lang} onClose={()=>setSelected(null)}/>}</section>;
}
