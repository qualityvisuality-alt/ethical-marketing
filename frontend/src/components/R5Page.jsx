import React,{useState}from"react";
import{Globe2,Volume2}from"lucide-react";
import{UI,STAGES,ABOUT,HELP,CONTACT_EMAIL}from"../mock";
import SolarSystemHeroR5 from"./SolarSystemHeroR5";
import DaoSenseR5 from"./DaoSenseR5";
import StagesAccordion from"./StagesAccordion";
import ClarityNavigator from"./ClarityNavigator";
import Tools from"./Tools";
import CoursesR5 from"./CoursesR5";
import EthicalPrinciples from"./EthicalPrinciples";
import AboutHelp from"./AboutHelp";
import ElementModal from"./ElementModal";
import{ambient}from"../lib/audio";
export default function R5Page(){const[lang,setLang]=useState("ua"),[selected,setSelected]=useState(null);const ui=UI[lang];const nav=[["solar",lang==="ua"?"Система":"System"],["dao","LESS IS MORE"],["stages",lang==="ua"?"Етапи":"Stages"],["clarity",lang==="ua"?"Старт":"Start"],["tools",ui.navTools],["courses",lang==="ua"?"Продукти":"Products"]];return <div className="App"><div className="cosmic-bg"/><header className="sticky top-0 z-40" style={{background:"rgba(5,7,15,.78)",backdropFilter:"blur(14px)",borderBottom:"1px solid rgba(230,198,122,.14)"}}><div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between"><a href="#solar" className="font-display gold-gradient-text" style={{fontSize:20,fontWeight:800}}>Quality Visuality</a><nav className="hidden md:flex items-center gap-5">{nav.map(([id,label])=><a key={id} href={`#${id}`} className="font-label text-[11px] tracking-widest text-dim hover:text-gold transition-colors">{label}</a>)}</nav><div className="flex items-center gap-2"><button onClick={()=>ambient.play("brand")} className="btn-ghost w-9 h-9 flex items-center justify-center rounded-full" title="Звук простору"><Volume2 size={15}/></button><button onClick={()=>setLang(lang==="ua"?"en":"ua")} className="btn-ghost px-3 py-1.5 flex items-center gap-2 text-sm font-label"><Globe2 size={15}/>{lang==="ua"?"EN":"UA"}</button></div></div></header><main><SolarSystemHeroR5 lang={lang} onOpen={setSelected}/><DaoSenseR5 lang={lang}/><StagesAccordion stages={STAGES[lang]} title={ui.stagesTitle}/><ClarityNavigator lang={lang}/><Tools title={ui.toolsTitle} lang={lang}/><CoursesR5 lang={lang}/><EthicalPrinciples lang={lang}/><AboutHelp about={ABOUT[lang]} help={HELP[lang]} ui={ui} email={CONTACT_EMAIL}/></main><footer className="relative py-10 px-5" style={{borderTop:"1px solid rgba(230,198,122,.16)"}}><div className="text-center font-body text-[11px] text-dim">© {new Date().getFullYear()} Quality Visuality · {CONTACT_EMAIL}</div><div className="text-center mt-2 font-label text-[9px] tracking-[.16em]" style={{color:"#6f6a5f"}}>QV UX · R5 LIVE PREVIEW</div></footer>{selected&&<ElementModal element={selected} ui={ui} onClose={()=>setSelected(null)}/>}</div>}
