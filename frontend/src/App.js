import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { Globe2, Volume2 } from "lucide-react";
import { UI, ELEMENTS, METHOD, STAGES, ABOUT, HELP, CONTACT_EMAIL, ENRICH } from "./mock";
import SolarSystemHero from "./components/SolarSystemHero";
import DaoSense from "./components/DaoSense";
import ElementModal from "./components/ElementModal";
import StagesAccordion from "./components/StagesAccordion";
import Tools from "./components/Tools";
import Courses from "./components/Courses";
import AboutHelp from "./components/AboutHelp";
import { ambient } from "./lib/audio";

function Starfield(){
 const ref=useRef(null);
 useEffect(()=>{const c=ref.current,ctx=c.getContext("2d");let w,h,stars,raf,dpr=Math.min(devicePixelRatio||1,2);const init=()=>{w=c.width=innerWidth*dpr;h=c.height=innerHeight*dpr;c.style.width=`${innerWidth}px`;c.style.height=`${innerHeight}px`;stars=Array.from({length:150},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.3*dpr+.2,a:Math.random(),s:Math.random()*.02+.003,g:Math.random()>.88}))};init();addEventListener("resize",init);const draw=()=>{ctx.clearRect(0,0,w,h);stars.forEach(st=>{st.a+=st.s;ctx.globalAlpha=.16+((Math.sin(st.a)+1)/2)*.7;ctx.fillStyle=st.g?"#e6c67a":"#dfe6f2";if(st.g){ctx.shadowColor="#e6c67a";ctx.shadowBlur=5*dpr}ctx.beginPath();ctx.arc(st.x,st.y,st.r,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0});ctx.globalAlpha=1;raf=requestAnimationFrame(draw)};draw();return()=>{cancelAnimationFrame(raf);removeEventListener("resize",init)}},[]);
 return <canvas ref={ref} className="starfield"/>;
}

export default function App(){
 const [lang,setLang]=useState("ua");const [selected,setSelected]=useState(null);const ui=UI[lang];
 const elements=ELEMENTS[lang].map(e=>({...e,...(ENRICH[lang][e.id]||{})}));
 const method={...METHOD[lang],...(ENRICH[lang].brand||{})};
 useEffect(()=>{const els=document.querySelectorAll(".reveal");const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.12});els.forEach(el=>io.observe(el));return()=>io.disconnect()},[lang]);
 const playBrand=()=>ambient.play("brand");
 return <div className="App"><div className="cosmic-bg"/><Starfield/>
  <header className="sticky top-0 z-40" style={{background:"rgba(5,7,15,.62)",backdropFilter:"blur(12px)",borderBottom:"1px solid rgba(230,198,122,.14)"}}><div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between"><a href="#solar" className="font-display gold-gradient-text" style={{fontSize:20,fontWeight:800}}>Quality Visuality</a><nav className="hidden md:flex items-center gap-7">{[["solar",lang==="ua"?"Сонячна система":"Solar system"],["dao","LESS IS MORE"],["stages",ui.navStages],["tools",ui.navTools],["courses",lang==="ua"?"Курси":"Courses"],["about",ui.navAbout]].map(([id,label])=><a key={id} href={`#${id}`} className="font-label text-[13px] tracking-widest text-dim hover:text-gold transition-colors">{label}</a>)}</nav><div className="flex items-center gap-2"><button onClick={playBrand} className="btn-ghost w-9 h-9 flex items-center justify-center rounded-full" title="Sound"><Volume2 size={15}/></button><button onClick={()=>setLang(lang==="ua"?"en":"ua")} className="btn-ghost px-3 py-1.5 flex items-center gap-2 text-sm font-label" aria-label="Change language"><Globe2 size={15}/>{lang==="ua"?"EN":"UA"}</button></div></div></header>
  <main><SolarSystemHero lang={lang} onOpen={setSelected}/><DaoSense lang={lang}/><StagesAccordion stages={STAGES[lang]} title={ui.stagesTitle}/><Tools title={ui.toolsTitle} lang={lang}/><Courses lang={lang}/><AboutHelp about={ABOUT[lang]} help={HELP[lang]} ui={ui} email={CONTACT_EMAIL}/></main>
  <footer className="relative py-10 px-5 mt-4" style={{borderTop:"1px solid rgba(230,198,122,.16)"}}><div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">{ui.footer.map((f,i)=><React.Fragment key={i}><span className="font-label tracking-[.14em] text-dim text-[12px] md:text-[13px]">{f}</span>{i<ui.footer.length-1&&<span className="diamond hidden md:block"/>}</React.Fragment>)}</div><div className="text-center mt-6 font-body text-[11px] text-dim opacity-60">© {new Date().getFullYear()} Quality Visuality · {CONTACT_EMAIL}</div></footer>
  {selected&&<ElementModal element={selected} ui={ui} onClose={()=>setSelected(null)}/>}</div>;
}
