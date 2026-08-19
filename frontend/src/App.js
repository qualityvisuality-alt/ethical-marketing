import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import "./components/RevisionR4.css";
import { Globe2, Volume2, Menu, X } from "lucide-react";
import { UI, STAGES, ABOUT, HELP, CONTACT_EMAIL } from "./mock";
import DaoSense from "./components/DaoSense";
import ClarityNavigator from "./components/ClarityNavigator";
import EthicalPrinciples from "./components/EthicalPrinciples";
import ElementModal from "./components/ElementModal";
import StagesAccordion from "./components/StagesAccordion";
import Tools from "./components/Tools";
import Courses from "./components/Courses";
import WaterConsultationQuestions from "./components/WaterConsultationQuestions";
import AboutHelp from "./components/AboutHelp";
import { ambient } from "./lib/audio";

const BUILD_MARKER="QV UX · 2026-08-19 · R6 · CLEAN HERO";

function Starfield(){
  const ref=useRef(null);
  useEffect(()=>{
    const c=ref.current,ctx=c.getContext("2d");let w,h,stars,raf,dpr=Math.min(devicePixelRatio||1,2);
    const init=()=>{w=c.width=innerWidth*dpr;h=c.height=innerHeight*dpr;c.style.width=`${innerWidth}px`;c.style.height=`${innerHeight}px`;stars=Array.from({length:150},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.3*dpr+.2,a:Math.random(),s:Math.random()*.02+.003,g:Math.random()>.88}))};
    init();addEventListener("resize",init);
    const draw=()=>{ctx.clearRect(0,0,w,h);stars.forEach(st=>{st.a+=st.s;ctx.globalAlpha=.16+((Math.sin(st.a)+1)/2)*.7;ctx.fillStyle=st.g?"#e6c67a":"#dfe6f2";if(st.g){ctx.shadowColor="#e6c67a";ctx.shadowBlur=5*dpr}ctx.beginPath();ctx.arc(st.x,st.y,st.r,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0});ctx.globalAlpha=1;raf=requestAnimationFrame(draw)};
    draw();return()=>{cancelAnimationFrame(raf);removeEventListener("resize",init)}
  },[]);
  return <canvas ref={ref} className="starfield"/>
}

export default function App(){
  const [lang,setLang]=useState("ua");
  const [selected,setSelected]=useState(null);
  const [menuOpen,setMenuOpen]=useState(false);
  const ui=UI[lang];
  useEffect(()=>{const els=document.querySelectorAll(".reveal");const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.12});els.forEach(el=>io.observe(el));return()=>io.disconnect()},[lang]);
  const playBrand=()=>ambient.play("brand");
  const nav=[
    ["dao","LESS IS MORE"],
    ["clarity",lang==="ua"?"З чого почати":"Start here"],
    ["stages",lang==="ua"?"Маршрут":"Route"],
    ["tools",ui.navTools],
    ["courses",lang==="ua"?"Продукти":"Products"],
    ["about",ui.navAbout]
  ];
  return <div className="App"><div className="cosmic-bg"/><Starfield/>
    <header className="sticky top-0 z-40" style={{background:"rgba(5,7,15,.68)",backdropFilter:"blur(14px)",borderBottom:"1px solid rgba(230,198,122,.14)"}}>
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <a href="#dao" className="font-display gold-gradient-text" style={{fontSize:20,fontWeight:800}} onClick={()=>setMenuOpen(false)}>Quality Visuality</a>
        <nav className="hidden md:flex items-center gap-5">{nav.map(([id,label])=><a key={id} href={`#${id}`} className="font-label text-[12px] tracking-widest text-dim hover:text-gold transition-colors">{label}</a>)}</nav>
        <div className="flex items-center gap-2">
          <button onClick={playBrand} className="btn-ghost w-9 h-9 flex items-center justify-center rounded-full" title={lang==="ua"?"Звук простору":"Ambient sound"}><Volume2 size={15}/></button>
          <button onClick={()=>setLang(lang==="ua"?"en":"ua")} className="btn-ghost px-3 py-1.5 flex items-center gap-2 text-sm font-label" aria-label="Change language"><Globe2 size={15}/>{lang==="ua"?"EN":"UA"}</button>
          <button className="mobile-menu-button" aria-label={menuOpen?(lang==="ua"?"Закрити меню":"Close menu"):(lang==="ua"?"Відкрити меню":"Open menu")} aria-expanded={menuOpen} onClick={()=>setMenuOpen(v=>!v)}>{menuOpen?<X size={18}/>:<Menu size={18}/>}</button>
        </div>
      </div>
      {menuOpen&&<nav className="mobile-drawer md:hidden">{nav.map(([id,label])=><a key={id} href={`#${id}`} onClick={()=>setMenuOpen(false)}>{label}</a>)}</nav>}
    </header>
    <main>
      <DaoSense lang={lang} onOpen={setSelected}/>
      <ClarityNavigator lang={lang}/>
      <StagesAccordion stages={STAGES[lang]} title={ui.stagesTitle}/>
      <Tools title={ui.toolsTitle} lang={lang}/>
      <Courses lang={lang}/>
      <WaterConsultationQuestions lang={lang}/>
      <EthicalPrinciples lang={lang}/>
      <AboutHelp about={ABOUT[lang]} help={HELP[lang]} ui={ui} email={CONTACT_EMAIL}/>
    </main>
    <footer className="relative py-10 px-5 mt-4" style={{borderTop:"1px solid rgba(230,198,122,.16)"}}><div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">{ui.footer.map((f,i)=><React.Fragment key={i}><span className="font-label tracking-[.14em] text-dim text-[12px] md:text-[13px]">{f}</span>{i<ui.footer.length-1&&<span className="diamond hidden md:block"/>}</React.Fragment>)}</div><div className="text-center mt-6 font-body text-[11px] text-dim opacity-60">© {new Date().getFullYear()} Quality Visuality · {CONTACT_EMAIL}</div><div data-build-marker className="text-center mt-2 font-label text-[9px] tracking-[.16em]" style={{color:"#6f6a5f",opacity:.7}}>{BUILD_MARKER}</div></footer>
    {selected&&<ElementModal element={selected} ui={ui} onClose={()=>setSelected(null)}/>} 
  </div>
}
