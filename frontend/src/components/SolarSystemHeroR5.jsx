import React, { useEffect, useRef, useState } from "react";
import { ArrowDown, Compass, Volume2, VolumeX } from "lucide-react";
import { ambient } from "../lib/audio";
import "./R5Experience.css";

const ELEMENT_SOUND={Вода:"water",Дерево:"wood",Вогонь:"fire",Земля:"earth",Метал:"metal"};
const ELEMENT_META={
  Вода:{chakra:"Вішуддха",frequency:"741 Hz",tone:"голос · сенс · глибина"},
  Дерево:{chakra:"Анахата",frequency:"639 Hz",tone:"зв'язок · ріст · напрям"},
  Вогонь:{chakra:"Маніпура",frequency:"528 Hz",tone:"воля · дія · прояв"},
  Земля:{chakra:"Муладхара",frequency:"396 Hz",tone:"опора · втілення · довіра"},
  Метал:{chakra:"Аджна",frequency:"852 Hz",tone:"структура · ясність · система"}
};
const PLANETS=[
  {id:"sun",name:"Сонце",en:"Sun",role:"Ядро бренду",enRole:"Brand core",archetype:"Ядро",element:"Вогонь",color:"#ffd36b",orbit:0,speed:0,size:104,base:0,moons:[]},
  {id:"mercury",name:"Меркурій",en:"Mercury",role:"Мова та комунікація",enRole:"Language & communication",archetype:"Інтелект",element:"Метал",color:"#b9a99a",orbit:1,speed:1.35,size:26,base:.35,moons:[]},
  {id:"venus",name:"Венера",en:"Venus",role:"Візуал і привабливість",enRole:"Visual & attraction",archetype:"Цінність",element:"Земля",color:"#e4b27b",orbit:2,speed:1.16,size:38,base:1.4,moons:[]},
  {id:"earth",name:"Земля",en:"Earth",role:"Досвід і стосунки",enRole:"Experience & relationships",archetype:"Втілення",element:"Земля",color:"#66a9ff",orbit:3,speed:1,size:42,base:2.7,moons:["Місяць"]},
  {id:"mars",name:"Марс",en:"Mars",role:"Трафік і дія",enRole:"Traffic & action",archetype:"Воля",element:"Вогонь",color:"#d8784e",orbit:4,speed:.83,size:34,base:4.1,moons:["Фобос","Деймос"]},
  {id:"jupiter",name:"Юпітер",en:"Jupiter",role:"Стратегія і ріст",enRole:"Strategy & growth",archetype:"Мудрість",element:"Дерево",color:"#d8b98e",orbit:5,speed:.52,size:72,base:5.15,moons:["Іо","Європа","Ганімед","Каллісто"]},
  {id:"saturn",name:"Сатурн",en:"Saturn",role:"Система та аналітика",enRole:"System & analytics",archetype:"Структура",element:"Метал",color:"#d8c08d",orbit:6,speed:.39,size:66,base:.95,rings:true,moons:["Титан","Рея","Енцелад"]},
  {id:"uranus",name:"Уран",en:"Uranus",role:"Інновація та AI",enRole:"Innovation & AI",archetype:"Свобода",element:"Дерево",color:"#8ad4d8",orbit:7,speed:.28,size:52,base:2.05,moons:["Титанія","Оберон","Аріель"]},
  {id:"neptune",name:"Нептун",en:"Neptune",role:"Образ, відео, уява",enRole:"Image, video & imagination",archetype:"Уява",element:"Вода",color:"#5f7cff",orbit:8,speed:.21,size:50,base:3.25,moons:["Тритон"]},
  {id:"pluto",name:"Плутон",en:"Pluto",role:"CRO та трансформація",enRole:"CRO & transformation",archetype:"Перетворення",element:"Земля",color:"#b8958a",orbit:9,speed:.15,size:24,base:5.65,dwarf:true,moons:["Харон"]}
];
const TEXTURES={
  sun:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Sun_disk.jpg",
  mercury:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Mercury_-_accurate_colour.png",
  venus:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Venus_colour.png",
  earth:"https://commons.wikimedia.org/wiki/Special:Redirect/file/NASA_Earth_America_2002.jpg",
  mars:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Mars_accurate_colour.png",
  jupiter:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Jupiter_in_true_color.jpg",
  saturn:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Saturn_With_Rhea_and_Dione_%28true_color%29.jpg",
  uranus:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Uranus_true_colour.jpg",
  neptune:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Neptune_Full.jpg",
  pluto:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Nh-pluto-in-true-color_2x.jpg"
};
const DETAILS={
  sun:"Позиціонування, ціннісна пропозиція і сенс, навколо якого збирається весь бренд.",
  mercury:"Copywriting, SEO-логіка, email, сценарії й мова, якою бренд стає зрозумілим.",
  venus:"Фотографія, дизайн, креативи й візуальна система — краса, яка служить сенсу.",
  earth:"Сайт, UX, community і customer experience: місце, де обіцянка бренду стає реальним досвідом.",
  mars:"SMM, paid traffic і запуск — дія тільки після того, як зрозуміло навіщо й куди.",
  jupiter:"Маркетингова стратегія, аналіз ринку, розвиток і масштабування без хаотичної гонки.",
  saturn:"Аналітика, KPI, CRM, воронки й процеси, які роблять маркетинг повторюваним і вимірюваним.",
  uranus:"AI, автоматизація й експерименти, де технологія служить людині.",
  neptune:"Storytelling, відео, атмосфера, символ і робота з увагою.",
  pluto:"CRO, A/B-тести, UX-фрикції й трансформація шляху людини без dark patterns."
};
const OFFERS={
  sun:["Стратегічна сесія бренду","Позиціонування та офер","Комплексний супровід"],
  mercury:["Tone of voice + copy","SEO / семантика","Email-сценарії"],
  venus:["Фотоконтент","12-тижневий відеокурс фотографії","Візуальна система"],
  earth:["Сайт або лендинг","UX-аудит","Customer journey"],
  mars:["SMM / запуск","Таргетована реклама","Контент для просування"],
  jupiter:["Аналіз ніші й конкурентів","Маркетингова стратегія","Стратегічна сесія"],
  saturn:["Воронка продажів","Web-аналітика","CRO та оптимізація"],
  uranus:["AI-автоматизація","AI-процес для команди","Digital sprint"],
  neptune:["Сесія заглиблення","Фокус уваги · сакральна геометрія","Відео / storytelling"],
  pluto:["CRO-аудит","A/B roadmap","Перебудова конверсійного шляху"]
};
const CASES={
  sun:"З розрізнених ідей — одна ціннісна пропозиція, яку команда може повторити одним реченням.",
  mercury:"Замість випадкових текстів — одна мова сайту, соцмереж, email і пошуку.",
  venus:"Візуал перестає бути декором і починає пояснювати характер продукту ще до тексту.",
  earth:"Людина швидше розуміє сайт, бачить наступний крок і не губиться між сторінками.",
  mars:"Просування запускається не заради охоплень, а під конкретну метрику й продукт.",
  jupiter:"Аналіз ринку показує простір росту замість копіювання найближчого конкурента.",
  saturn:"Воронка й аналітика показують, де саме губляться люди та який крок варто змінити.",
  uranus:"Повторювані задачі передаються AI, а людина залишає за собою сенс і фінальне рішення.",
  neptune:"Через образ та історію стає ясніше, що саме людина хоче проявляти у світі.",
  pluto:"Менше UX-фрикції, ясніший вибір і тестовані гіпотези замість агресивних тригерів."
};
function projectedPosition(p,angle){
  if(p.orbit===0)return{x:0,y:0,depth:1,scale:1,z:60};
  const radius=72+p.orbit*49,theta=p.base+angle*p.speed,depth=(Math.sin(theta)+1)/2;
  return{x:Math.cos(theta)*radius,y:Math.sin(theta)*radius*.31,depth,scale:.72+depth*.34,z:20+Math.round(depth*35)};
}
function Planet({p,pos,onOpen}){
  return <button className={`r5-planet r5-planet-${p.id}`} style={{"--planet-color":p.color,"--planet-size":`${p.size}px`,left:`calc(50% + ${pos.x}px)`,top:`calc(52% + ${pos.y}px)`,zIndex:pos.z,transform:`translate(-50%,-50%) scale(${pos.scale})`,opacity:.72+pos.depth*.28}} onClick={()=>onOpen(p)} aria-label={`${p.name}: ${p.role}`} title={`${p.role} · натисни, щоб увійти`}>
    {p.rings&&<span className="r5-saturn-rings"/>}<span className="r5-planet-sphere"><img src={TEXTURES[p.id]} alt=""/></span>
    {p.moons.map((moon,i)=><span key={moon} className="r5-moon-orbit" style={{"--moon-index":i,"--moon-speed":`${7+i*2.7}s`,"--moon-radius":`${Math.max(25,p.size*.55+i*8)}px`}}><i title={moon}/></span>)}
  </button>;
}
export default function SolarSystemHeroR5({lang="ua",onOpen}){
  const[angle,setAngle]=useState(0),[soundOn,setSoundOn]=useState(true);const paused=useRef(false);
  useEffect(()=>{let raf,last=performance.now();const tick=now=>{const dt=Math.min(now-last,48);last=now;if(!paused.current)setAngle(v=>v+dt*.0000026);raf=requestAnimationFrame(tick)};raf=requestAnimationFrame(tick);return()=>cancelAnimationFrame(raf)},[]);
  const metaFor=p=>ELEMENT_META[p.element]||ELEMENT_META.Вода;
  const openPlanet=p=>{if(soundOn)ambient.play(ELEMENT_SOUND[p.element]||"brand");const meta=metaFor(p);onOpen?.({...p,image:TEXTURES[p.id],sound:ELEMENT_SOUND[p.element]||"brand",kicker:`ПЛАНЕТАРНИЙ АРХЕТИП · ${p.en}`,essence:`${p.archetype} · ${lang==="ua"?p.role:p.enRole}`,points:[lang==="ua"?p.role:p.enRole,DETAILS[p.id]],valueTitle:lang==="ua"?"Що можна зробити тут":"What can be built here",value:DETAILS[p.id],deliver:OFFERS[p.id],offers:OFFERS[p.id],cases:[CASES[p.id]],chakra:meta.chakra,frequency:meta.frequency,soundTone:meta.tone})};
  const title=lang==="ua"?"ЕТИЧНИЙ МАРКЕТИНГ":"ETHICAL MARKETING",sub=lang==="ua"?"для людей, які створюють цінність людям":"for people who create value for people";
  return <section id="solar" className="r5-solar-hero"><div className="r5-solar-title"><div className="r5-kicker">QUALITY VISUALITY · SOLAR MAP</div><h1>{title}</h1><p>{sub}</p><div className="r5-hero-actions"><a href="#dao" className="r5-pill"><Compass size={14}/>{lang==="ua"?"ДОСЛІДИТИ СИСТЕМУ":"EXPLORE THE SYSTEM"}</a><button className="r5-icon-btn" onClick={()=>{const next=!soundOn;setSoundOn(next);ambient.toggle(next);if(!next)ambient.stop()}} aria-label="toggle sound">{soundOn?<Volume2 size={16}/>:<VolumeX size={16}/>}</button></div></div>
    <div className="r5-space" onMouseEnter={()=>{paused.current=true}} onMouseLeave={()=>{paused.current=false}}><div className="r5-space-haze r5-haze-a"/><div className="r5-space-haze r5-haze-b"/>{[1,2,3,4,5,6,7,8,9].map(i=><span key={i} className="r5-orbit" style={{"--orbit-w":`${150+i*98}px`,"--orbit-z":10+i}}/>)}<div className="r5-asteroid-belt">{Array.from({length:44}).map((_,i)=><i key={i} style={{"--a":`${i*8.18}deg`,"--d":`${310+(i%5)*7}px`,"--s":`${1+(i%4)*.45}px`}}/> )}</div>{Array.from({length:7}).map((_,i)=><span key={i} className={`r5-meteor r5-meteor-${i+1}`}/>)}
      <button className="r5-sun" onClick={()=>openPlanet(PLANETS[0])} aria-label="Сонце — ядро бренду"><span className="r5-sun-surface"/><span className="r5-sun-corona"/></button>{PLANETS.slice(1).map(p=><Planet key={p.id} p={p} pos={projectedPosition(p,angle)} onOpen={openPlanet}/>)}<div className="r5-depth-note">{lang==="ua"?"Орбіти рухаються повільно. Натисни на планету — вона відкриє свій маркетинговий архетип.":"Orbits move slowly. Click a planet to open its marketing archetype."}</div></div>
    <a className="r5-scroll-cue" href="#dao"><ArrowDown size={15}/>{lang==="ua"?"LESS IS MORE · ДАЛІ":"LESS IS MORE · NEXT"}</a></section>;
}
