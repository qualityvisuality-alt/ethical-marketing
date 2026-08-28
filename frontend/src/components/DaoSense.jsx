import React from "react";
import { CircleDot, Droplets, Flame, Leaf, Mountain } from "lucide-react";
import { ELEMENT_SYSTEM } from "../constants/elementSystem";
import TeaScrollScene from "./TeaScrollScene";
import "./ProductArt.css";
import "./RevisionR4.css";

const ICONS = { water: Droplets, wood: Leaf, fire: Flame, earth: Mountain, metal: CircleDot };
const ORDER = ["water", "wood", "fire", "earth", "metal"];

export default function DaoSense({ lang = "ua", onOpen }) {
  const isUa = lang === "ua";
  const openElement = id => {
    const element = ELEMENT_SYSTEM[id];
    const text = element[lang] || element.ua;
    onOpen?.({ id, sound:id, name:text.name, color:element.color, kicker:`5 ELEMENTS · ${text.phase}`, essence:`${text.question} → ${text.outcome}`, points:text.clientQuestions, valueTitle:isUa?"СЕНС ЕТАПУ":"STAGE MEANING", value:text.summary });
  };
  return <section id="dao" className="dao-section">
    <div className="max-w-6xl mx-auto px-5">
      <div className="dao-heading reveal"><span className="diamond"/><div>
        <div className="dao-kicker">DAO · WU XING · 5 ELEMENTS</div><h2>LESS IS MORE</h2>
        <p>{isUa ? "Шум чи симфонія життя, яка звучить у різних гранях? Прибираємо зайве. Бачимо, що вже працює. Підсилюємо. Масштабуємо." : "Noise — or a symphony of life sounding through different facets? Remove the excess. See what already works. Strengthen it. Scale it."}</p>
        <p className="dao-cycle-copy">{isUa ? "Вода породжує Дерево. Дерево — Вогонь. Вогонь — Землю. Земля — Метал. Метал повертає нас до Води. Як рік має пори року, так і будь-який живий процес має свою стадію. П’ять елементів створюють Дао — не одноразову маркетингову дію, а шлях постійної присутності, зміни й нового циклу. Дорога етичного маркетингу починається тут ↓" : "Water gives rise to Wood. Wood to Fire. Fire to Earth. Earth to Metal. Metal returns us to Water. As a year has seasons, every living process has its stage. The five elements form a Dao: not a one-off marketing action, but an evolving path of presence, change and renewal. The ethical marketing journey begins here ↓"}</p>
      </div><span className="diamond"/></div>
      <div className="dao-grid dao-sequence">
        {ORDER.map((id,index)=>{const item=ELEMENT_SYSTEM[id];const Icon=ICONS[id];const text=item[lang]||item.ua;return <button type="button" key={id} className={`dao-item dao-${id} reveal dao-clickable dao-pulse-step`} style={{animationDelay:`${index*.9}s`,"--dao-color":item.color,"--pulse-delay":`${index*.9}s`}} onClick={()=>openElement(id)} aria-label={`${text.name}: ${text.outcome}`}>
          <div className="dao-icon" style={{color:item.color,borderColor:`${item.color}55`,boxShadow:`0 0 30px ${item.color}16`}}><Icon size={22}/></div>
          <div><div className="dao-name" style={{color:item.color}}>{text.name}</div><div className="dao-sub">{text.outcome}</div><p>{text.question}</p></div>
        </button>})}
      </div>
    </div><TeaScrollScene lang={lang}/>
  </section>;
}
