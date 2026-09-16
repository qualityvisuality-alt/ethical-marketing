import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import "./components/RevisionR4.css";
import "./components/RevisionR7.css";
import "./components/MobileStability.css";
import { Globe2, Volume2, Menu, X } from "lucide-react";
import { UI, STAGES, ABOUT, HELP, CONTACT_EMAIL } from "./mock";
import DaoSense from "./components/DaoSense";
import ClarityNavigator from "./components/ClarityNavigator";
import EthicalPrinciples from "./components/EthicalPrinciples";
import ElementModal from "./components/ElementModal";
import StagesAccordion from "./components/StagesAccordion";
import Courses from "./components/Courses";
import WaterConsultationQuestions from "./components/WaterConsultationQuestions";
import AboutHelp from "./components/AboutHelp";
import { ambient } from "./lib/audio";
import portrait from "./assets/portrait.webp";

const BUILD_MARKER="QV UX · 2026-09-16 · R10 · DAO LIVING PATH";

function Starfield(){
  const ref=useRef(null);
  useEffect(()=>{
    const c=ref.current;
    if(!c)return;
    const ctx=c.getContext("2d");
    const reduced=window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if(reduced)return;
    let w,h,stars,raf;
    const mobile=()=>window.matchMedia?.("(max-width: 767px)").matches;
    const dpr=()=>Math.min(window.devicePixelRatio||1,mobile()?1.35:1.8);
    const init=()=>{
      const ratio=dpr();
      const iw=Math.max(document.documentElement.clientWidth||0,window.innerWidth||0);
      const ih=Math.max(document.documentElement.clientHeight||0,window.innerHeight||0);
      w=c.width=Math.round(iw*ratio);h=c.height=Math.round(ih*ratio);
      c.style.width=`${iw}px`;c.style.height=`${ih}px`;
      const count=mobile()?36:96;
      stars=Array.from({length:count},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.15*ratio+.2,a:Math.random(),s:Math.random()*.018+.003,g:Math.random()>.9}));
    };
    const draw=()=>{
      if(document.hidden){raf=requestAnimationFrame(draw);return;}
      ctx.clearRect(0,0,w,h);
      stars.forEach(st=>{st.a+=st.s;ctx.globalAlpha=.16+((Math.sin(st.a)+1)/2)*.62;ctx.fillStyle=st.g?"#e6c67a":"#dfe6f2";ctx.beginPath();ctx.arc(st.x,st.y,st.r,0,Math.PI*2);ctx.fill()});
      ctx.globalAlpha=1;raf=requestAnimationFrame(draw);
    };
    let resizeTimer;
    const onResize=()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(init,120)};
    init();window.addEventListener("resize",onResize,{passive:true});draw();
    return()=>{clearTimeout(resizeTimer);cancelAnimationFrame(raf);window.removeEventListener("resize",onResize)};
  },[]);
  return <canvas ref={ref} className="starfield" aria-hidden="true"/>;
}

function SeasonalPopup({lang,onClose}){
  const ua=lang==="ua";
  return <aside className="seasonal-popup" role="dialog" aria-modal="false" aria-labelledby="seasonal-title"><button className="seasonal-close" onClick={onClose} aria-label={ua?"Закрити":"Close"}><X size={18}/></button><img className="seasonal-photo" src={portrait} alt="" aria-hidden="true" loading="lazy"/><div className="seasonal-copy"><span>QUALITY VISUALITY · TIMING</span><h2 id="seasonal-title">{ua?"Усьому свій час. Або справді?":"Everything has its time. Or does it?"}</h2><p>{ua?"Більшість купує санки взимку. А найвигідніше — тоді, коли про них майже ніхто не думає.":"Most people buy sleds in winter. Opportunity often appears when almost nobody is thinking about them."}</p><strong>{ua?"У природі кожна дія має свій сезон. У маркетингу — теж.":"In nature every action has its season. Marketing does too."}</strong></div></aside>;
}

export default function App(){
  const[lang,setLang]=useState("ua"),[selected,setSelected]=useState(null),[menuOpen,setMenuOpen]=useState(false),[seasonal,setSeasonal]=useState(false);
  const ui=UI[lang];
  useEffect(()=>{const els=document.querySelectorAll(".reveal");const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.08,rootMargin:"0px 0px 80px"});els.forEach(el=>io.observe(el));return()=>io.disconnect()},[lang]);
  useEffect(()=>{if(sessionStorage.getItem("qv-seasonal-dismissed"))return;const timer=setTimeout(()=>setSeasonal(true),6039);return()=>clearTimeout(timer)},[]);
  const closeSeasonal=()=>{setSeasonal(false);sessionStorage.setItem("qv-seasonal-dismissed","1")};
  const nav=[["clarity",lang==="ua"?"Твій крок":"Your step"],["dao","LESS IS MORE"],["stages",lang==="ua"?"5 елементів":"5 elements"],["courses",lang==="ua"?"Продукти":"Products"],["about",ui.navAbout]];
  return <div className="App"><div className="cosmic-bg"/><Starfield/>
    <header className="sticky top-0 z-40" style={{background:"rgba(5,7,15,.68)",backdropFilter:"blur(14px)",WebkitBackdropFilter:"blur(14px)",borderBottom:"1px solid rgba(230,198,122,.14)"}}><div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between"><a href="#dao" className="font-display gold-gradient-text" style={{fontSize:20,fontWeight:800}} onClick={()=>setMenuOpen(false)}>Quality Visuality</a><nav className="hidden md:flex items-center gap-5">{nav.map(([id,label])=><a key={id} href={`#${id}`} className="font-label text-[12px] tracking-widest text-dim hover:text-gold">{label}</a>)}</nav><div className="flex items-center gap-2"><button onClick={()=>ambient.play("brand")} className="btn-ghost w-9 h-9 flex items-center justify-center rounded-full" aria-label={lang==="ua"?"Увімкнути звук простору":"Play ambient sound"}><Volume2 size={15}/></button><button onClick={()=>setLang(lang==="ua"?"en":"ua")} className="btn-ghost px-3 py-1.5 flex items-center gap-2 text-sm font-label" aria-label={lang==="ua"?"Switch to English":"Перемкнути на українську"}><Globe2 size={15}/>{lang==="ua"?"EN":"UA"}</button><button className="mobile-menu-button" aria-label={menuOpen?(lang==="ua"?"Закрити меню":"Close menu"):(lang==="ua"?"Відкрити меню":"Open menu")} aria-expanded={menuOpen} onClick={()=>setMenuOpen(v=>!v)}>{menuOpen?<X size={18}/>:<Menu size={18}/>}</button></div></div>{menuOpen&&<nav className="mobile-drawer md:hidden">{nav.map(([id,label])=><a key={id} href={`#${id}`} onClick={()=>setMenuOpen(false)}>{label}</a>)}</nav>}</header>
    <main><DaoSense lang={lang} onOpen={setSelected}/><ClarityNavigator lang={lang}/><StagesAccordion stages={STAGES[lang]} title={ui.stagesTitle} lang={lang}/><Courses lang={lang}/><WaterConsultationQuestions lang={lang}/><EthicalPrinciples lang={lang}/><AboutHelp about={ABOUT[lang]} help={HELP[lang]} ui={ui} email={CONTACT_EMAIL}/></main>
    <footer className="relative py-10 px-5 mt-4" style={{borderTop:"1px solid rgba(230,198,122,.16)"}}><div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">{ui.footer.map((f,i)=><React.Fragment key={i}><span className="font-label tracking-[.14em] text-dim text-[12px] md:text-[13px]">{f}</span>{i<ui.footer.length-1&&<span className="diamond hidden md:block"/>}</React.Fragment>)}</div><div className="text-center mt-6 font-body text-[11px] text-dim opacity-60">© {new Date().getFullYear()} Quality Visuality · {CONTACT_EMAIL}</div><div data-build-marker className="text-center mt-2 font-label text-[9px] tracking-[.16em]" style={{color:"#6f6a5f",opacity:.7}}>{BUILD_MARKER}</div></footer>
    {selected&&<ElementModal element={selected} ui={ui} onClose={()=>setSelected(null)}/>} {seasonal&&!selected&&<SeasonalPopup lang={lang} onClose={closeSeasonal}/>} 
  </div>;
}
