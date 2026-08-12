import React from "react";
import { ArrowDown, Droplets, Leaf, Flame, Mountain, CircleDot } from "lucide-react";
import "./ProductArt.css";

const ITEMS=[
 {id:"water",icon:Droplets,color:"#65b8ff",ua:{name:"ВОДА",sub:"СЕНС",text:"Заглиблення. Хто ми? Що насправді хочемо створювати?"},en:{name:"WATER",sub:"MEANING",text:"Immersion. Who are we? What do we genuinely want to create?"}},
 {id:"wood",icon:Leaf,color:"#83cf8b",ua:{name:"ДЕРЕВО",sub:"НАПРЯМ",text:"Дослідження. Де є світло, попит і простір для росту?"},en:{name:"WOOD",sub:"DIRECTION",text:"Research. Where are the light, demand and room to grow?"}},
 {id:"fire",icon:Flame,color:"#ff9459",ua:{name:"ВОГОНЬ",sub:"ДІЯ",text:"Прояв. Що саме ми готові зробити видимим?"},en:{name:"FIRE",sub:"ACTION",text:"Manifestation. What are we ready to make visible?"}},
 {id:"earth",icon:Mountain,color:"#e6b35f",ua:{name:"ЗЕМЛЯ",sub:"ВТІЛЕННЯ",text:"Форма. Як люди побачать, почують і відчують цінність?"},en:{name:"EARTH",sub:"EMBODIMENT",text:"Form. How will people see, hear and feel the value?"}},
 {id:"metal",icon:CircleDot,color:"#c9d5e6",ua:{name:"МЕТАЛ",sub:"СИСТЕМА",text:"Точність. Що вимірюємо, оптимізуємо, автоматизуємо?"},en:{name:"METAL",sub:"SYSTEM",text:"Precision. What do we measure, optimize and automate?"}},
];

export default function DaoSense({lang="ua"}){
 const isUa=lang==="ua";
 return <section id="dao" className="dao-section"><div className="max-w-6xl mx-auto px-5">
  <div className="dao-heading reveal"><span className="diamond"/><div><div className="dao-kicker">DAO · WU XING · 5 ELEMENTS</div><h2>LESS IS MORE</h2><p>{isUa?"Не додавати шум. Прибрати зайве — і побачити, що вже працює.":"Don't add noise. Remove the excess — and see what already works."}</p></div><span className="diamond"/></div>
  <div className="dao-grid">{ITEMS.map((item,i)=>{const Icon=item.icon,t=item[lang]||item.ua;return <article key={item.id} className={`dao-item dao-${item.id} reveal`} style={{animationDelay:`${i*.08}s`}}><div className="dao-icon" style={{color:item.color,borderColor:`${item.color}55`,boxShadow:`0 0 30px ${item.color}16`}}><Icon size={22}/></div><div><div className="dao-name" style={{color:item.color}}>{t.name}</div><div className="dao-sub">{t.sub}</div><p>{t.text}</p></div></article>})}</div>
  <div className="tea-pour reveal"><div className="tea-steam"><i/><i/><i/></div><div className="tea-pot" aria-label={isUa?"Китайський чайник":"Chinese teapot"}><span className="tea-lid"/><span className="tea-body"/><span className="tea-handle"/><span className="tea-spout"/></div><div className="tea-copy"><span>下一泡 · NEXT POUR</span><strong>{isUa?"Додаємо ще води для наступного проливу":"Add more water for the next pour"}</strong><p>{isUa?"Цикл не закінчується. Нові дані повертають нас до Води.":"The cycle doesn't end. New data brings us back to Water."}</p><a href="#clarity"><ArrowDown size={15}/>{isUa?"Далі — знайти свою точку":"Next — find your starting point"}</a></div></div>
 </div></section>;
}
