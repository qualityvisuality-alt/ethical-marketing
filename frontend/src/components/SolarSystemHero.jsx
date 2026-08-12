import React, { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, Volume2, VolumeX, X, Compass, MessageCircle, Sparkles } from "lucide-react";
import { ambient } from "../lib/audio";
import "./QualityVisualityEnhancements.css";
import "./ExperienceUX.css";

const ELEMENT_SOUND={Вода:"water",Дерево:"wood",Вогонь:"fire",Земля:"earth",Метал:"metal"};
const ELEMENT_META={
 Вода:{chakra:"Вішуддха",frequency:"741 Hz",tone:"голос · сенс · глибина"},
 Дерево:{chakra:"Анахата",frequency:"639 Hz",tone:"зв'язок · ріст · напрям"},
 Вогонь:{chakra:"Маніпура",frequency:"528 Hz",tone:"воля · дія · прояв"},
 Земля:{chakra:"Муладхара",frequency:"396 Hz",tone:"опора · втілення · довіра"},
 Метал:{chakra:"Аджна",frequency:"852 Hz",tone:"структура · ясність · система"}
};

const PLANETS=[
{id:"sun",name:"Сонце",en:"Sun",role:"Ядро бренду",enRole:"Brand core",archetype:"Я",element:"Вогонь",color:"#ffd36b",image:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Sun_disk.jpg",orbit:0,speed:0},
{id:"mercury",name:"Меркурій",en:"Mercury",role:"Мова та комунікація",enRole:"Language & communication",archetype:"Інтелект",element:"Метал",color:"#b9a99a",image:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Mercury_-_accurate_colour.png",orbit:1,speed:1},
{id:"venus",name:"Венера",en:"Venus",role:"Візуал і привабливість",enRole:"Visual & attraction",archetype:"Цінність",element:"Земля",color:"#e4b27b",image:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Venus_colour.png",orbit:2,speed:.82},
{id:"earth",name:"Земля",en:"Earth",role:"Досвід і стосунки",enRole:"Experience & relationships",archetype:"Втілення",element:"Земля",color:"#66a9ff",image:"https://commons.wikimedia.org/wiki/Special:Redirect/file/NASA_Earth_America_2002.jpg",orbit:3,speed:.68},
{id:"mars",name:"Марс",en:"Mars",role:"Трафік і дія",enRole:"Traffic & action",archetype:"Воля",element:"Вогонь",color:"#d8784e",image:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Mars_accurate_colour.png",orbit:4,speed:.56},
{id:"jupiter",name:"Юпітер",en:"Jupiter",role:"Стратегія і ріст",enRole:"Strategy & growth",archetype:"Мудрість",element:"Дерево",color:"#d8b98e",image:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Jupiter_in_true_color.jpg",orbit:5,speed:.34},
{id:"saturn",name:"Сатурн",en:"Saturn",role:"Система та аналітика",enRole:"System & analytics",archetype:"Структура",element:"Метал",color:"#d8c08d",image:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Saturn_With_Rhea_and_Dione_%28true_color%29.jpg",orbit:6,speed:.27,rings:true},
{id:"uranus",name:"Уран",en:"Uranus",role:"Інновація та AI",enRole:"Innovation & AI",archetype:"Свобода",element:"Дерево",color:"#8ad4d8",image:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Uranus_true_colour.jpg",orbit:7,speed:.21},
{id:"neptune",name:"Нептун",en:"Neptune",role:"Образ, відео, уява",enRole:"Image, video & imagination",archetype:"Уява",element:"Вода",color:"#5f7cff",image:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Neptune_Full.jpg",orbit:8,speed:.16},
{id:"pluto",name:"Плутон",en:"Pluto",role:"CRO та трансформація",enRole:"CRO & transformation",archetype:"Перетворення",element:"Земля",color:"#b8958a",image:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Nh-pluto-in-true-color_2x.jpg",orbit:9,speed:.12,dwarf:true},
];

const DETAILS={
 sun:{ua:"Позиціонування, ціннісна пропозиція і сенс, навколо якого збирається весь бренд.",en:"Positioning, value proposition and the meaning that holds the brand together."},
 mercury:{ua:"Copywriting, SEO-логіка, email, сценарії й мова, якою бренд стає зрозумілим.",en:"Copywriting, SEO logic, email, scripts and the language that makes the brand clear."},
 venus:{ua:"Фотографія, дизайн, креативи й візуальна система — краса, яка не маскує відсутність сенсу.",en:"Photography, design, creative and a visual system where beauty serves meaning."},
 earth:{ua:"Сайт, UX, community і customer experience: місце, де обіцянка бренду стає реальним досвідом.",en:"Web, UX, community and customer experience: where the brand promise becomes real."},
 mars:{ua:"Google Ads, таргет, paid traffic і запуск — дія тільки після того, як зрозуміло навіщо й куди.",en:"Google Ads, paid social and launches — action after purpose and direction are clear."},
 jupiter:{ua:"Маркетингова стратегія, аналіз ринку, розвиток, освіта й масштабування без хаотичної гонки.",en:"Marketing strategy, market analysis, development, education and growth without chaos."},
 saturn:{ua:"Аналітика, KPI, CRM, воронки й процеси, які роблять маркетинг повторюваним і вимірюваним.",en:"Analytics, KPIs, CRM, funnels and repeatable measurable processes."},
 uranus:{ua:"AI, автоматизація, нові формати й експерименти, де технологія служить людині.",en:"AI, automation, new formats and experiments where technology serves people."},
 neptune:{ua:"Storytelling, відео, емоційний бренд, атмосфера, символ і робота з увагою.",en:"Storytelling, video, emotional branding, atmosphere, symbol and attention."},
 pluto:{ua:"CRO, A/B-тести, UX-фрикції й трансформація шляху людини без маніпулятивних dark patterns.",en:"CRO, A/B tests, UX friction and journey transformation without dark patterns."}
};

const OFFERS={
 sun:["Стратегічна сесія бренду","Позиціонування та офер","Комплексний супровід"],
 mercury:["Tone of voice + copy","SEO / семантика","Email-сценарії"],
 venus:["Фотоконтент","12-тижневий курс фотографії","Візуальна система"],
 earth:["Сайт або лендинг","UX-аудит","Customer journey"],
 mars:["SMM / запуск","Таргетована реклама","Контент для просування"],
 jupiter:["Аналіз ніші й конкурентів","Маркетингова стратегія","Стратегічна сесія"],
 saturn:["Воронка продажів","Web-аналітика","CRO та оптимізація"],
 uranus:["AI-автоматизація","AI-процес для команди","Експериментальний digital sprint"],
 neptune:["Спіритуальна консультація","Сакральна геометрія · фокус уваги","Відео / storytelling"],
 pluto:["CRO-аудит","A/B roadmap","Перебудова конверсійного шляху"]
};
const CASES={
 sun:"З розрізнених ідей — одна ціннісна пропозиція, яку команда може повторити одним реченням.",
 mercury:"Замість випадкових текстів — єдина мова сайту, соцмереж, email і пошуку.",
 venus:"Візуал перестає бути декором і починає пояснювати характер продукту ще до тексту.",
 earth:"Людина швидше розуміє сайт, бачить наступний крок і не губиться між сторінками.",
 mars:"Просування запускається не заради охоплень, а під конкретну метрику й продукт.",
 jupiter:"Аналіз ринку показує вільний напрям росту замість копіювання найближчого конкурента.",
 saturn:"Воронка й аналітика показують, де саме губляться люди та який крок варто змінити.",
 uranus:"Повторювані задачі передаються AI, а людина залишає за собою сенс, контроль і фінальне рішення.",
 neptune:"Через образ, історію й рефлексивні практики стає ясніше, що людина хоче проявляти у світі.",
 pluto:"Замість агресивних тригерів — менше UX-фрикції, ясніший вибір і тестовані гіпотези."
};

export default function SolarSystemHero({lang="ua",onOpen}){
 const [angle,setAngle]=useState(0),[active,setActive]=useState(null),[selected,setSelected]=useState(null),[soundOn,setSoundOn]=useState(true);const hoverRef=useRef(false);
 useEffect(()=>{let last=performance.now(),raf;const tick=now=>{const dt=Math.min(now-last,50);last=now;const speed=hoverRef.current?0.000004:0.000032;setAngle(a=>a+dt*speed);raf=requestAnimationFrame(tick)};raf=requestAnimationFrame(tick);return()=>cancelAnimationFrame(raf)},[]);
 const title=lang==="ua"?"ЕТИЧНИЙ МАРКЕТИНГ":"ETHICAL MARKETING",sub=lang==="ua"?"для людей, які створюють цінність людям":"for people who create value for people";
 const metaFor=p=>ELEMENT_META[p.element]||ELEMENT_META.Вода;
 const planetForModal=p=>({...p,sound:ELEMENT_SOUND[p.element]||"brand",kicker:`ПЛАНЕТАРНИЙ АРХЕТИП · ${p.en}`,essence:`${p.archetype} · ${lang==="ua"?p.role:p.enRole}`,points:[lang==="ua"?p.role:p.enRole,DETAILS[p.id][lang]],valueTitle:lang==="ua"?"Що можна зробити тут":"What can be built here",value:DETAILS[p.id][lang],deliver:OFFERS[p.id],cases:[CASES[p.id]],offers:OFFERS[p.id],chakra:metaFor(p).chakra,frequency:metaFor(p).frequency,soundTone:metaFor(p).tone});
 const playSound=p=>{if(soundOn)ambient.play(ELEMENT_SOUND[p.element]||"brand")};
 const selectPlanet=p=>{setSelected(p);setActive(p);playSound(p)};
 const openDetails=p=>onOpen?.(planetForModal(p));
 const toggleSound=e=>{e.stopPropagation();const next=!soundOn;setSoundOn(next);ambient.toggle(next);if(next&&selected)ambient.play(ELEMENT_SOUND[selected.element]||"brand")};
 return <section id="solar" className="solar-hero"><style>{`@keyframes sunBurn{0%,100%{transform:translate(-50%,-50%) scale(1) rotate(-1deg);filter:saturate(1.08) brightness(.98)}25%{transform:translate(-50%,-50%) scale(1.018) rotate(.4deg);filter:saturate(1.18) brightness(1.04)}50%{transform:translate(-50%,-50%) scale(1.035) rotate(-.4deg);filter:saturate(1.28) brightness(1.09)}75%{transform:translate(-50%,-50%) scale(1.012) rotate(.4deg);filter:saturate(1.14) brightness(1.02)}}@keyframes sunFlare{0%,100%{opacity:.28;transform:scale(.9) rotate(0deg)}35%{opacity:.75;transform:scale(1.06) rotate(8deg)}70%{opacity:.44;transform:scale(.98) rotate(-6deg)}}`}</style>
 <div className="solar-title"><div className="solar-kicker">QUALITY VISUALITY</div><h1>{title}</h1><p>{sub}</p><div className="hero-cta-row"><a className="hero-cta primary" href="#clarity"><Compass size={13}/>{lang==="ua"?"ЗНАЙТИ СВІЙ КРОК":"FIND YOUR NEXT STEP"}</a><a className="hero-cta secondary" href="#dao">{lang==="ua"?"ДОСЛІДИТИ СИСТЕМУ":"EXPLORE THE SYSTEM"}<ArrowDown size={12}/></a></div></div>
 <div className="solar-stage" onMouseEnter={()=>{hoverRef.current=true}} onMouseLeave={()=>{hoverRef.current=false;setActive(selected)}}><div className="solar-nebula nebula-a"/><div className="solar-nebula nebula-b"/>{[1,2,3,4,5,6,7,8,9].map(i=><div key={i} className={`solar-orbit solar-orbit-${i}`}/>)}<button className="sun-core" onClick={()=>selectPlanet(PLANETS[0])} onMouseEnter={()=>setActive(PLANETS[0])} aria-label={lang==="ua"?"Сонце — ядро бренду":"Sun — brand core"}><span className="sun-flare"/><img src={PLANETS[0].image} alt={lang==="ua"?"Сонце":"Sun"}/><span className="sun-copy">{lang==="ua"?<>ЕТИЧНИЙ<br/>МАРКЕТИНГ</>:<>ETHICAL<br/>MARKETING</>}</span></button><div className="solar-rotator">{PLANETS.slice(1).map(p=>{const theta=(p.orbit-1)*((Math.PI*2)/9)-Math.PI/2,r=55+p.orbit*5.15,rotation=angle*p.speed,x=50+(r/2)*Math.cos(theta+rotation),y=50+(r/2)*Math.sin(theta+rotation);return <button key={p.id} className={`planet-node ${active?.id===p.id?"planet-active":""}`} style={{left:`${x}%`,top:`${y}%`,transform:`translate(-50%,-50%)`,"--planet-glow":p.color}} onClick={e=>{e.stopPropagation();selectPlanet(p)}} onMouseEnter={()=>setActive(p)} aria-label={`${lang==="ua"?p.name:p.en} — ${lang==="ua"?p.role:p.enRole}`}><span className="planet-img-wrap" style={{"--planet-glow":p.color}}><img src={p.image} alt={lang==="ua"?p.name:p.en}/>{p.rings&&<i className="planet-rings"/>}<i className="planet-glass"/></span><span className="planet-label"><b>{lang==="ua"?p.name:p.en}</b><small>{lang==="ua"?p.role:p.enRole}</small></span></button>})}</div><div className="solar-instruction">{lang==="ua"?"Натисни на планету — побачиш її сенс, звук, кейс і спосіб працювати разом":"Click a planet — see its meaning, sound, case and ways to work together"}</div></div>
 <a href="#dao" className="solar-next"><span>{lang==="ua"?"ГОРТАЙ ДАЛІ":"SCROLL DOWN"}</span><ArrowDown size={18}/></a><button className="solar-sound-toggle" onClick={toggleSound} aria-label={lang==="ua"?"Перемкнути звук":"Toggle sound"}>{soundOn?<Volume2 size={15}/>:<VolumeX size={15}/>}<span>{soundOn?"ЗВУК ON":"ЗВУК OFF"}</span></button>
 {selected&&<div id="planet-meaning" className="planet-quick planet-quick-expanded" style={{"--planet-glow":selected.color}}><button className="planet-quick-close" onClick={()=>{setSelected(null);setActive(null);ambient.stop()}} aria-label={lang==="ua"?"Закрити":"Close"}><X size={15}/></button><div className="planet-quick-main"><span className="font-label">{lang==="ua"?selected.name:selected.en} · {selected.element}</span><strong>{lang==="ua"?selected.role:selected.enRole}</strong><p>{DETAILS[selected.id][lang]}</p><div className="planet-sound-meta"><Volume2 size={13}/><b>{metaFor(selected).frequency}</b><span>{metaFor(selected).chakra} · {metaFor(selected).tone}</span></div><div className="planet-case"><Sparkles size={13}/><span>{CASES[selected.id]}</span></div></div><div className="planet-quick-actions"><button className="planet-open-label" onClick={()=>openDetails(selected)}>{lang==="ua"?"ДОСЛІДИТИ ПОРТАЛ":"EXPLORE PORTAL"}<ArrowRight size={14}/></button><a className="planet-message" href={`mailto:qualityvisuality@gmail.com?subject=${encodeURIComponent(`Quality Visuality · ${selected.name} · ${selected.role}`)}`}><MessageCircle size={14}/>{lang==="ua"?"НАПИСАТИ МЕНІ":"MESSAGE ME"}</a></div></div>}
 </section>;
}
export {PLANETS,DETAILS,ELEMENT_META,OFFERS,CASES};
