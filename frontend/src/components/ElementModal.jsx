import React, { useEffect, useState } from "react";
import { X, Volume2, VolumeX, ArrowRight, Check, Waves, Trees, Flame, Gem, Cog, Sparkles, MessageCircle, ShoppingBag } from "lucide-react";
import ElementCanvas from "./ElementCanvas";
import { ambient } from "../lib/audio";
import { ELEMENT_ICON } from "../lib/elementIcons";

const SCENES={
 water:{title:"Занурення",nature:"вода · глибина · голос · інтуїція",Icon:Waves},
 wood:{title:"Напрям",nature:"ліс · вітер · птахи · ріст",Icon:Trees},
 fire:{title:"Прояв",nature:"полум'я · жар · іскри · дія",Icon:Flame},
 earth:{title:"Втілення",nature:"ґрунт · камінь · кристали · коріння",Icon:Gem},
 metal:{title:"Система",nature:"гонг · handpan · метал · геометрія",Icon:Cog},
 brand:{title:"Ефір · Бренд",nature:"місто · дороги · люди · птахи · життя",Icon:Sparkles}
};

function SceneVisual({element}){
 const s=SCENES[element.sound]||SCENES[element.id]||{title:element.name||"Архетип",nature:"природний фон",Icon:Sparkles};
 const Icon=s.Icon||Sparkles;
 return <div className={`portal-scene portal-scene--${element.sound||element.id}`}>
  <div className="portal-scene-bg" style={{backgroundImage:`linear-gradient(180deg,rgba(4,7,13,.05),rgba(4,7,13,.9)),url(${element.image||""})`}}/>
  <div className="portal-scene-vignette"/>
  <div className="portal-scene-rune"><Icon size={24}/><span>{element.frequency||"soundscape"}</span></div>
  <div className="scene-creature scene-creature-a"><Sparkles size={26}/></div><div className="scene-creature scene-creature-b"><Sparkles size={18}/></div><div className="scene-light"/>
  <div className="portal-scene-caption"><span className="font-label">{s.title}</span><strong>{element.essence||element.role||""}</strong></div>
 </div>
}

export default function ElementModal({element,ui,onClose}){
 const isEn=ui.navAbout==="About";const EIcon=ELEMENT_ICON[element.sound]||ELEMENT_ICON[element.id]||Sparkles;const [sound,setSound]=useState(true);const scene=SCENES[element.sound]||SCENES[element.id]||{nature:isEn?"natural background":"природний фон"};
 useEffect(()=>{document.body.style.overflow="hidden";if(sound)ambient.play(element.sound||element.id);const esc=e=>e.key==="Escape"&&onClose();addEventListener("keydown",esc);return()=>{document.body.style.overflow="";ambient.stop();removeEventListener("keydown",esc)}},[element]);
 const toggleSound=()=>{const next=!sound;setSound(next);ambient.toggle(next);if(next)ambient.play(element.sound||element.id)};
 const points=element.points||[],deliver=element.deliver||[],offers=element.offers||deliver,cases=element.cases||[];
 return <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{background:"rgba(3,5,10,.92)",backdropFilter:"blur(11px)"}} onClick={onClose}>
  <div className="panel panel-glow relative w-full max-w-5xl max-h-[92vh] overflow-y-auto reveal in planet-detail-modal" style={{borderColor:`${element.color||"#e6c67a"}66`}} onClick={e=>e.stopPropagation()}>
   <div className="relative overflow-hidden rounded-t-[14px]"><SceneVisual element={element}/><div className="absolute inset-0"><ElementCanvas element={element.sound||element.id}/></div><div className="absolute top-3 right-3 flex gap-2 z-10"><button onClick={toggleSound} className="btn-ghost w-10 h-10 flex items-center justify-center rounded-full">{sound?<Volume2 size={18}/>:<VolumeX size={18}/>}</button><button onClick={onClose} className="btn-ghost w-10 h-10 flex items-center justify-center rounded-full"><X size={18}/></button></div></div>
   <div className="px-5 md:px-8 pt-6"><div className="flex items-center gap-3"><span className="flex items-center justify-center rounded-full flex-shrink-0" style={{width:46,height:46,border:`1.5px solid ${element.color||"#e6c67a"}`,background:`${element.color||"#e6c67a"}1f`}}><EIcon size={24} style={{color:element.color||"#e6c67a"}}/></span><div><div className="font-label text-dim tracking-widest text-xs">{element.kicker||ui.brand}</div><h3 className="font-display" style={{fontSize:42,fontWeight:800,color:element.color||"#e6c67a",lineHeight:1}}>{element.name}</h3></div></div><p className="font-body text-sm mt-3 max-w-3xl" style={{color:"#d8d4c6"}}>{element.essence||element.role}</p><div className="sound-signature mt-3"><Volume2 size={14}/><span>{scene.nature}</span>{element.frequency&&<b>{element.frequency}</b>}{element.chakra&&<em>{element.chakra}</em>}{element.soundTone&&<small>{element.soundTone}</small>}</div><div className="sound-note">{isEn?"Frequency labels are an artistic symbolic mapping for sound design, not a medical claim.":"Частоти тут — символічна художня мапа для саунд-дизайну, а не медичне твердження."}</div></div>
   <div className="p-5 md:p-8 grid md:grid-cols-2 gap-6"><div><div className="font-label text-xs tracking-widest mb-3" style={{color:element.color||"#e6c67a"}}>{isEn?"WHAT THIS PLANET IS ABOUT":"ПРО ЩО ЦЯ ПЛАНЕТА"}</div><ul className="space-y-2">{points.map((p,i)=><li key={i} className="flex items-start gap-2 text-sm text-dim"><span className="mt-1.5 flex-shrink-0 rounded-full" style={{width:6,height:6,background:element.color||"#e6c67a"}}/><span>{p}</span></li>)}</ul></div><div className="rounded-xl p-4" style={{background:`linear-gradient(160deg,${element.color||"#e6c67a"}14,transparent)`,border:`1px solid ${element.color||"#e6c67a"}33`}}><div className="font-label text-xs tracking-widest mb-2" style={{color:element.color||"#e6c67a"}}>{element.valueTitle||(isEn?"What this gives":"Що це дає")}</div><p className="font-body text-[13.5px] leading-relaxed" style={{color:"#e4e0d3"}}>{element.value||""}</p><div className="gold-rule my-4"/><ul className="space-y-2">{deliver.map((d,i)=><li key={i} className="flex items-start gap-2 text-sm" style={{color:"#cdc9bb"}}><Check size={15} className="mt-0.5 flex-shrink-0" style={{color:element.color||"#e6c67a"}}/><span>{d}</span></li>)}</ul></div></div>
   {offers.length>0&&<div className="px-5 md:px-8 pb-4"><div className="font-label text-xs tracking-widest mb-3" style={{color:element.color||"#e6c67a"}}>{isEn?"BUY THIS PART SEPARATELY":"МОЖНА ВЗЯТИ ОКРЕМО"}</div><div className="planet-offer-grid">{offers.map((o,i)=><a key={i} className="planet-offer-card" href={`mailto:qualityvisuality@gmail.com?subject=${encodeURIComponent(`Quality Visuality · ${o}`)}`}><ShoppingBag size={15}/><span>{o}</span><ArrowRight size={14}/></a>)}</div></div>}
   {cases.length>0&&<div className="px-5 md:px-8 pb-2"><div className="font-label text-xs tracking-widest mb-2" style={{color:element.color||"#e6c67a"}}>{isEn?"CASE LOGIC":"КЕЙС / РЕЗУЛЬТАТ"}</div><div className="grid md:grid-cols-2 gap-3">{cases.map((c,i)=><div key={i} className="rounded-lg p-3 font-body text-[12.5px] leading-relaxed" style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(230,198,122,.15)",color:"#cdc9bb"}}>{c}</div>)}</div></div>}
   <div className="px-5 md:px-8 pb-7 pt-5 flex flex-wrap gap-3 items-center"><a href={`mailto:qualityvisuality@gmail.com?subject=${encodeURIComponent(`Quality Visuality · ${element.name}`)}`} className="btn-gold inline-flex items-center gap-2 px-6 py-3 text-sm"><MessageCircle size={16}/>{isEn?"Write to me":"Написати мені"}<ArrowRight size={16}/></a><a href="#tools" onClick={onClose} className="btn-ghost inline-flex items-center gap-2 px-5 py-3 text-sm">{isEn?"All tools":"Усі інструменти"}<ArrowRight size={15}/></a><span className="font-body text-[11px] text-dim w-full">{isEn?"Choose one tool or combine several into complete support.":"Можна взяти один інструмент або зібрати кілька у комплексний супровід."}</span></div>
  </div>
 </div>
}
