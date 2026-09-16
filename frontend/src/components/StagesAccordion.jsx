import React, { useState } from "react";
import { ChevronDown, ChevronRight, ArrowUpRight } from "lucide-react";
import { ELEMENT_ICON } from "../lib/elementIcons";
import { toolsForElement } from "../constants/toolCatalog";
import ToolModal from "./ToolModal";

const COLORS={water:"#5aa9e6",wood:"#7bc47f",fire:"#f0803c",earth:"#d9a24a",metal:"#aeb9cc"};
const Chip=({text,color})=><span className="font-body text-[11px] px-2.5 py-1 rounded-full" style={{background:`${color}12`,border:`1px solid ${color}33`,color:"#d8d4c6"}}>{text}</span>;

function Card({s,isEn,lang,onTool}){
  const [open,setOpen]=useState(false);
  const [showAll,setShowAll]=useState(false);
  const c=COLORS[s.element];
  const Icon=ELEMENT_ICON[s.element];
  const tools=toolsForElement(s.element);
  const visibleTools=showAll?tools:tools.slice(0,4);
  return <div className="panel stage-card" style={{borderColor:`${c}44`}}>
    <button className="stage-summary" onClick={()=>setOpen(v=>!v)} aria-expanded={open}>
      <span className="stage-icon" style={{borderColor:c,background:`${c}1a`,boxShadow:`0 0 18px ${c}44`}}><Icon size={21} style={{color:c}}/></span>
      <span className="font-display stage-number" style={{color:`${c}66`}}>{s.n}</span>
      <span className="stage-summary-copy"><span className="font-label" style={{color:"#efe9d8"}}>{s.title}</span><small>{s.question}</small></span>
      <span className="stage-output" style={{background:`${c}1f`,borderColor:c,color:c}}>{s.output}</span>
      <ChevronDown size={18} className="text-dim" style={{transform:open?"rotate(180deg)":"none",transition:".25s"}}/>
    </button>
    {open&&<div className="stage-detail">
      <p className="font-body text-[13px] leading-relaxed text-dim mb-4">{s.intro}</p>
      {s.includes&&<div className="mb-4"><div className="font-label text-[11px] tracking-widest mb-2" style={{color:c}}>{s.includesTitle}</div><div className="flex flex-wrap gap-1.5">{s.includes.map((x,i)=><Chip key={i} text={x} color={c}/>)}</div></div>}
      {s.groups&&<div className="grid sm:grid-cols-2 gap-3 mb-4">{s.groups.map((g,i)=><div key={i} className="rounded-lg p-3" style={{background:"rgba(255,255,255,.02)",border:"1px solid rgba(230,198,122,.12)"}}><div className="font-label text-[11px] mb-2" style={{color:c}}>{g.label}</div><div className="flex flex-wrap gap-1.5">{g.items.map((x,j)=><Chip key={j} text={x} color={c}/>)}</div></div>)}</div>}
      {s.format&&<div className="rounded-lg p-3 mb-3" style={{background:`${c}0e`,border:`1px solid ${c}2e`}}><span className="font-label text-[10px] tracking-widest" style={{color:c}}>{isEn?"FORMAT":"ФОРМАТ"}</span><p className="font-body italic text-[12px] mt-1" style={{color:"#d8d4c6"}}>{s.format}</p></div>}
      {s.extra?.map((x,i)=><p key={i} className="font-body italic text-[12px] text-dim mt-2 pl-3" style={{borderLeft:`2px solid ${c}55`}}>{x}</p>)}

      <div className="stage-tools-depth">
        <div className="stage-tools-head"><div><strong style={{color:c}}>{isEn?"GO DEEPER · TOOLS FOR THIS STAGE":"ГЛИБШЕ · ІНСТРУМЕНТИ ЦЬОГО ЕТАПУ"}</strong><span>{isEn?"Open only the depth that is useful now.":"Не окремий каталог: відкриваємо тільки ту глибину, яка доречна зараз."}</span></div><span style={{color:c}}>{tools.length} {isEn?"tools":"інструментів"}</span></div>
        <div className="stage-tools-grid">{visibleTools.map(tool=>{const x=tool[lang]||tool.ua;return <button type="button" key={tool.id} onClick={()=>onTool(tool)} className="stage-tool-card" style={{borderColor:`${c}2f`}}><span className="stage-tool-card-top"><strong>{x.name}</strong><ArrowUpRight size={13} style={{color:c,flex:"0 0 auto"}}/></span><small>{x.solves}</small></button>})}</div>
        {tools.length>4&&<button type="button" className="stage-tools-more" onClick={()=>setShowAll(v=>!v)} style={{color:c}}>{showAll?(isEn?"Show less":"Згорнути"):(isEn?`Show all ${tools.length}`:`Показати всі ${tools.length}`)}</button>}
      </div>

      <a href={`mailto:qualityvisuality@gmail.com?subject=${encodeURIComponent(`Quality Visuality · ${s.title}`)}`} className="btn-gold inline-flex items-center gap-2 px-5 py-2.5 mt-4 text-xs">{isEn?"Describe my situation":"Описати свою ситуацію"}<ChevronRight size={15}/></a>
    </div>}
  </div>;
}

export default function StagesAccordion({stages,title,lang="ua"}){
  const [selectedTool,setSelectedTool]=useState(null);
  const isEn=lang==="en"||title.includes("STAGES");
  return <section id="stages" className="relative py-20 px-5"><div className="max-w-4xl mx-auto">
    <div className="flex items-center justify-center gap-4 mb-5 reveal"><span className="diamond"/><h2 className="font-label text-center tracking-[.14em] gold-gradient-text" style={{fontSize:"clamp(20px,3vw,30px)"}}>{title}</h2><span className="diamond"/></div>
    <p className="text-center text-dim text-sm max-w-2xl mx-auto mb-12 reveal">{isEn?"Five depths of one path. Open a stage to see its meaning, working logic and only the tools relevant to it.":"П’ять глибин одного шляху. Відкрий етап — і всередині побачиш його сенс, логіку роботи та тільки ті інструменти, які належать до цієї глибини."}</p>
    <div className="space-y-3">{stages.map(s=><Card key={s.n} s={s} isEn={isEn} lang={lang} onTool={setSelectedTool}/>)}</div>
  </div>{selectedTool&&<ToolModal tool={selectedTool} lang={lang} onClose={()=>setSelectedTool(null)}/>}</section>;
}
