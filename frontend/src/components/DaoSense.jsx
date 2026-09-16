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
        <div className="dao-kicker">{isUa?"DAO · ЦЕНТРАЛЬНИЙ ШЛЯХ СПІВПРАЦІ":"DAO · THE CENTRAL PATH OF COLLABORATION"}</div><h2>LESS IS MORE</h2>
        <p>{isUa ? "Не більше маркетингу. Не більше інструментів. Спочатку бачимо, де ти є — і відкриваємо тільки ту глибину, яка зараз справді потрібна." : "Not more marketing. Not more tools. First see where you are — then open only the depth that is actually useful now."}</p>
        <div className="dao-path-note"><strong>{isUa?"ДАО НЕ Є ШОСТИМ ЕЛЕМЕНТОМ":"DAO IS NOT A SIXTH ELEMENT"}</strong><p>{isUa?"Це спосіб руху: побачити теперішній стан → обрати найменший точний крок → перевірити, що змінилося → перейти в наступну доречну глибину. П’ять елементів — п’ять способів побачити один живий шлях, а не п’ять обов’язкових пакетів послуг.":"It is the way we move: see the present state → choose the smallest precise step → observe what changed → enter the next relevant depth. The five elements are five ways of seeing one living path, not five mandatory service packages."}</p></div>
        <p className="dao-cycle-copy">{isUa ? "Вода дає ясність. Дерево знаходить напрям. Вогонь збирає стратегію. Земля втілює її у видиму присутність. Метал робить систему стійкою. Далі цикл може знову повернутися до Води — вже з нової точки. Натисни на елемент, щоб побачити його сенс; глибокі інструменти відкриваються всередині відповідного етапу нижче." : "Water brings clarity. Wood finds direction. Fire shapes strategy. Earth gives it visible form. Metal makes the system sustainable. Then the cycle may return to Water from a new point. Open an element for its meaning; deeper tools now live inside the relevant stage below."}</p>
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
