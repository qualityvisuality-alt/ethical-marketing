import React,{useMemo,useRef,useState} from "react";
import hero from "../assets/qv-monkey-hero.webp";
import "./SensoryMonkeyHero.css";

const ITEMS=[
  {id:"vision",title:"БАЧИТИ",closed:"НЕ БАЧУ ЗЛА",open:"Я ОБИРАЮ БАЧИТИ",desc:"Мистецтво, фотографія, кіно й візуальні історії свідомих авторів.",href:"#tools"},
  {id:"hearing",title:"СЛУХАТИ",closed:"НЕ ЧУЮ ЗЛА",open:"Я ОБИРАЮ СЛУХАТИ",desc:"Музика, подкасти, голоси й розмови, до яких хочеться прислухатися.",href:"#courses"},
  {id:"speech",title:"ГОВОРИТИ",closed:"НЕ ГОВОРЮ ЗЛА",open:"Я ОБИРАЮ ГОВОРИТИ",desc:"Мова, думки, тексти та люди, які формулюють важливе без шуму.",href:"#about"},
  {id:"relation",title:"БУДУВАТИ",closed:"НЕ РОБЛЮ ЗЛА",open:"Я ОБИРАЮ БУДУВАТИ",desc:"Психологія стосунків, партнерство, освіта та практики зрілого контакту.",href:"#clarity"},
  {id:"love",title:"ЛЮБИТИ",closed:"СЕРЦЕ ЗАКРИТЕ",open:"Я ОБИРАЮ ЛЮБОВ",desc:"Там, де любові потрібно найбільше: люди, війна, базові потреби, підтримка й відновлення.",href:"#contact"}
];

export default function SensoryMonkeyHero(){
  const ref=useRef(null);
  const [active,setActive]=useState(null);
  const [pos,setPos]=useState({x:50,y:50});
  const activeItem=useMemo(()=>ITEMS.find(i=>i.id===active),[active]);
  const onMove=e=>{
    const r=ref.current?.getBoundingClientRect(); if(!r)return;
    const x=((e.clientX-r.left)/r.width)*100; const y=((e.clientY-r.top)/r.height)*100;
    setPos({x,y});
    ref.current.style.setProperty("--mx",`${(x-50)*.08}px`);
    ref.current.style.setProperty("--my",`${(y-50)*.05}px`);
  };
  return <section ref={ref} className="sensory-hero" onMouseMove={onMove} onMouseLeave={()=>setActive(null)}>
    <div className="sensory-hero__scene" aria-hidden="true"><img src={hero} alt=""/></div>
    <div className="sensory-hero__cursor" style={{left:`${pos.x}%`,top:`${pos.y}%`}}/>
    <div className="sensory-hero__intro">
      <span>AYEPORT · FIVE SENSES / ONE HEART</span>
      <h1>Ми можемо обирати, чим наповнювати увагу.</h1>
      <p>Наведи курсор. П’ять мавп — не декор, а жива навігація: бачити, слухати, говорити, будувати й любити.</p>
    </div>
    <div className="sensory-hero__zones">
      {ITEMS.map((item,i)=><a key={item.id} href={item.href} className={`sensory-zone sensory-zone--${i+1} ${active===item.id?"is-active":""}`} onMouseEnter={()=>setActive(item.id)} onFocus={()=>setActive(item.id)}>
        <span className="sensory-zone__dot"/>
        <span className="sensory-zone__title">{active===item.id?item.open:item.closed}</span>
        <span className="sensory-zone__sub">{item.title}</span>
      </a>)}
    </div>
    <div className={`sensory-hero__story ${activeItem?"is-visible":""}`}>
      <div className="sensory-hero__story-kicker">{activeItem?.open||"ОБЕРИ НАПРЯМОК"}</div>
      <p>{activeItem?.desc||"Кожна зона веде до окремого шару платформи — від мистецтва і музики до психології стосунків та підтримки людей."}</p>
      {activeItem&&<a href={activeItem.href}>Відкрити напрямок ↗</a>}
    </div>
    <div className="sensory-hero__scroll">ГОРТАЙ ДАЛІ <span>↓</span></div>
  </section>
}
