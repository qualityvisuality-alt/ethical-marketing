import React, { useState } from "react";
import { ArrowDown, Droplets, Leaf, Flame, Mountain, CircleDot, Volume2 } from "lucide-react";
import { ambient } from "../lib/audio";
import "./QualityVisualityEnhancements.css";

const PORTALS=[
 {id:"water",icon:Droplets,scene:"water",ua:{name:"ВОДА",title:"СЕНС",text:"Заглиблення й пізнання: побачити, що насправді хочеться створювати."},en:{name:"WATER",title:"MEANING",text:"Immersion and knowing: see what you genuinely want to create."}},
 {id:"wood",icon:Leaf,scene:"wood",ua:{name:"ДЕРЕВО",title:"НАПРЯМ",text:"Дослідження ринку, простору для росту й живого маршруту бренду."},en:{name:"WOOD",title:"DIRECTION",text:"Research the market, room to grow and the living route of the brand."}},
 {id:"fire",icon:Flame,scene:"fire",ua:{name:"ВОГОНЬ",title:"ДІЯ",text:"Проявити задум: контент, запуск, реклама, рух і експеримент."},en:{name:"FIRE",title:"ACTION",text:"Make the idea visible: content, launch, advertising, movement and experiment."}},
 {id:"earth",icon:Mountain,scene:"earth",ua:{name:"ЗЕМЛЯ",title:"ВТІЛЕННЯ",text:"Перетворити сенс на досвід, стосунки, сайт і конкретну форму."},en:{name:"EARTH",title:"EMBODIMENT",text:"Turn meaning into experience, relationships, a website and concrete form."}},
 {id:"metal",icon:CircleDot,scene:"metal",ua:{name:"МЕТАЛ",title:"СИСТЕМА",text:"Аналітика, процеси, CRM, автоматизація та повторюваний результат."},en:{name:"METAL",title:"SYSTEM",text:"Analytics, processes, CRM, automation and repeatable outcomes."}},
];

export default function ElementPortals({lang="ua"}){
 const [selected,setSelected]=useState(null);const isUa=lang==="ua";
 const choose=p=>{setSelected(p);ambient.play(p.id)};
 const selectedText=selected?(selected[lang]||selected.ua):null;
 return <section id="element-portals" className="element-portals"><div className="max-w-6xl mx-auto px-5"><div className="portal-heading reveal"><span className="diamond"/><div><div className="section-kicker">QUALITY VISUALITY · EXPERIENCE</div><h2>{isUa?"ПРОЙДИ КРІЗЬ 5 ЕЛЕМЕНТІВ":"MOVE THROUGH 5 ELEMENTS"}</h2><p>{isUa?"Не п'ять послуг. П'ять станів, у яких маркетинг стає зрозумілим.":"Not five services. Five states in which marketing becomes understandable."}</p></div><span className="diamond"/></div><div className="portal-grid">{PORTALS.map((p,i)=>{const Icon=p.icon,t=p[lang]||p.ua;return <button key={p.id} className={`element-portal portal-${p.scene} ${selected?.id===p.id?"is-selected":""}`} onClick={()=>choose(p)} style={{animationDelay:`${i*.12}s`}}><div className="portal-scene-orb"><span className="portal-particle a"/><span className="portal-particle b"/><span className="portal-particle c"/><Icon size={24}/></div><span className="portal-name">{t.name}</span><strong>{t.title}</strong><small>{t.text}</small><span className="portal-sound"><Volume2 size={12}/> {selected?.id===p.id?(isUa?"слухай":"listen"):(isUa?"натисни":"tap")}</span></button>})}</div>{selected&&<div className="portal-detail panel reveal"><div><span className="section-kicker">{selectedText.name} · {selectedText.title}</span><h3>{selectedText.text}</h3><p>{isUa?"Цей елемент можна пройти як частину комплексної підтримки або з'єднати з конкретним інструментом під задачу.":"Use this element as part of complete support or connect it to a concrete tool for the task."}</p></div><a href="#courses" className="course-cta"><ArrowDown size={15}/>{isUa?"Далі — продукти та підтримка":"Next — products & support"}</a></div>}</div></section>
}
