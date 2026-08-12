import React from "react";
import { Waves, Compass, Heart, BriefcaseBusiness, Gem, CalendarDays, ArrowUpRight, MessageCircle } from "lucide-react";
import "./PlanetUXR3.css";

const GROUPS=[
 {icon:Compass,title:"Я і мій напрям",q:["Який період я зараз проживаю?","На що варто звернути увагу в найближчому циклі?","Які мої природні сильні сторони та ролі?"]},
 {icon:Heart,title:"Стосунки",q:["Що я повторюю у стосунках?","Як ми відрізняємось у потребах і способі взаємодії?","На що подивитися перед важливим рішенням у парі?"]},
 {icon:BriefcaseBusiness,title:"Робота і реалізація",q:["Який формат роботи зараз мені підходить?","Де я витрачаю енергію не на своє?","Як поєднати сенс, гроші та реальні дії?"]},
 {icon:CalendarDays,title:"Цикли і рішення",q:["Які теми повторюються зараз у житті?","Які рішення потребують більше часу, а які вже дозріли?","Як скласти особисту карту наступних кроків?"]},
 {icon:Gem,title:"Символи і мінерали",q:["Які камені або символи резонують із моєю поточною практикою?","Як використати їх як нагадування про намір, а не як магічну гарантію?","Як зібрати особистий набір символів і ритуалів уваги?"]}
];

export default function WaterConsultationQuestions({lang="ua"}){
 if(lang!=="ua")return null;
 return <section className="water-questions-section"><div className="max-w-6xl mx-auto px-5"><div className="water-questions-head"><span className="water-questions-icon"><Waves size={22}/></span><div><span>ВОДА · РЕФЛЕКСИВНА КОНСУЛЬТАЦІЯ</span><h2>З якими питаннями можна прийти</h2><p>Не обов'язково знати, яку систему обрати. Можна прийти з реальною ситуацією — ми дивимося на неї через питання, Human Design, астрологічні й таро-архетипи як інструменти рефлексії та збираємо практичні наступні кроки.</p></div></div><div className="water-question-grid">{GROUPS.map(({icon:Icon,title,q})=><article key={title} className="panel water-question-card"><Icon size={18}/><h3>{title}</h3>{q.map(x=><p key={x}>— {x}</p>)}</article>)}</div><div className="water-question-cta panel"><div><strong>Можна взяти лише цю консультацію.</strong><p>Або використати її як вхід у комплексний маршрут Quality Visuality, якщо питання переходить у продукт, бренд, контент чи стратегію.</p><small>Астрологічні, таро та мінеральні відповідності подаються як символічні системи для рефлексії, не як медичні чи гарантовані прогнози.</small></div><a href={`mailto:qualityvisuality@gmail.com?subject=${encodeURIComponent("Quality Visuality · Вода · консультація")}`}><MessageCircle size={15}/>Написати мені<ArrowUpRight size={14}/></a></div></div></section>
}
