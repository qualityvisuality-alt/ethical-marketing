import React, { useState } from "react";
import { ArrowDown, Droplets, Leaf, Flame, Mountain, CircleDot, Volume2 } from "lucide-react";
import { ambient } from "../lib/audio";
import "./QualityVisualityEnhancements.css";

const PORTALS=[
 {id:"water",name:"ВОДА",title:"СЕНС",icon:Droplets,text:"Заглиблення й пізнання: побачити, що насправді хочеться створювати.",scene:"water"},
 {id:"wood",name:"ДЕРЕВО",title:"НАПРЯМ",icon:Leaf,text:"Дослідження ринку, простору для росту й живого маршруту бренду.",scene:"wood"},
 {id:"fire",name:"ВОГОНЬ",title:"ДІЯ",icon:Flame,text:"Проявити задум: контент, запуск, реклама, рух і експеримент.",scene:"fire"},
 {id:"earth",name:"ЗЕМЛЯ",title:"ВТІЛЕННЯ",icon:Mountain,text:"Перетворити сенс на досвід, стосунки, сайт і конкретну форму.",scene:"earth"},
 {id:"metal",name:"МЕТАЛ",title:"СИСТЕМА",icon:CircleDot,text:"Аналітика, процеси, CRM, автоматизація та повторюваний результат.",scene:"metal"},
];

export default function ElementPortals({lang="ua"}){const [selected,setSelected]=useState(null);const choose=p=>{setSelected(p);ambient.play(p.id)};return <section id="element-portals" className="element-portals"><div className="max-w-6xl mx-auto px-5"><div className="portal-heading reveal"><span className="diamond"/><div><div className="section-kicker">QUALITY VISUALITY · EXPERIENCE</div><h2>ПРОЙДИ КРІЗЬ 5 ЕЛЕМЕНТІВ</h2><p>Не п'ять послуг. П'ять станів, у яких маркетинг стає зрозумілим.</p></div><span className="diamond"/></div><div className="portal-grid">{PORTALS.map((p,i)=>{const Icon=p.icon;return <button key={p.id} className={`element-portal portal-${p.scene} ${selected?.id===p.id?"is-selected":""}`} onClick={()=>choose(p)} style={{animationDelay:`${i*.12}s`}}><div className="portal-scene-orb"><span className="portal-particle a"/><span className="portal-particle b"/><span className="portal-particle c"/><Icon size={24}/></div><span className="portal-name">{p.name}</span><strong>{p.title}</strong><small>{p.text}</small><span className="portal-sound"><Volume2 size={12}/> {selected?.id===p.id?"слухай":"натисни"}</span></button>})}</div>{selected&&<div className="portal-detail panel reveal"><div><span className="section-kicker">{selected.name} · {selected.title}</span><h3>{selected.text}</h3><p>Цей елемент можна пройти як частину комплексної підтримки або з'єднати з конкретним інструментом під задачу.</p></div><a href="#courses" className="course-cta"><ArrowDown size={15}/> Далі — продукти та підтримка</a></div>}</div></section>}
