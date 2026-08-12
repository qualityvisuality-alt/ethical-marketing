import React from "react";

// Celestial archetypes for the opening orbit. Public-domain / NASA-derived Wikimedia Commons sources.
const IMAGES={
 water:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Neptune_Full.jpg",
 wood:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Jupiter_in_true_color.jpg",
 fire:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Sun_disk.jpg",
 earth:"https://commons.wikimedia.org/wiki/Special:Redirect/file/NASA_Earth_America_2002.jpg",
 metal:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Saturn_With_Rhea_and_Dione_%28true_color%29.jpg"
};
const NAMES={water:"Neptune",wood:"Jupiter",fire:"Sun",earth:"Earth",metal:"Saturn"};
const GLOW={water:"#4bb7ff",wood:"#e7b86a",fire:"#ff7b32",earth:"#4c9cf5",metal:"#c6d3e6"};
export default function Planet({type,size=118,active=false}){
 const color=GLOW[type]||"#e6c67a",img=IMAGES[type],name=NAMES[type]||type;
 const glow=active?`0 0 36px ${color},0 0 78px ${color}88,0 0 140px ${color}44`:`0 0 18px ${color}55`;
 return <div className={`celestial-planet celestial-planet--${type}`} style={{position:"relative",width:size,height:size}}>
  <div className="planet-aura" style={{position:"absolute",inset:active?"-34%":"-22%",borderRadius:"50%",background:`radial-gradient(circle,${color}${active?"55":"22"},transparent 68%)`,filter:"blur(4px)",transition:"all .5s ease"}}/>
  <div className="planet-orb" style={{width:size,height:size,borderRadius:"50%",overflow:"hidden",boxShadow:glow,transition:"box-shadow .5s ease,transform .5s ease",transform:active?"scale(1.06)":"scale(1)"}}>
   <img src={img} alt={`${name} — solar system archetype`} draggable={false} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center",display:"block",filter:"contrast(1.08) saturate(1.08) brightness(.96)"}}/>
   <span className="planet-atmosphere"/><span className="planet-terminator"/>
  </div>
  <span className="planet-rim" style={{position:"absolute",inset:0,borderRadius:"50%",border:`1px solid ${color}${active?"dd":"66"}`,pointerEvents:"none"}}/>
  <span className="planet-specular"/>{active&&<span className="planet-energy-ring" style={{borderColor:`${color}99`}}/>}
 </div>;
}
