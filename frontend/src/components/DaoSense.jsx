import React from "react";
import { ArrowDown, Droplets, Leaf, Flame, Mountain, CircleDot } from "lucide-react";
import "./ProductArt.css";

const ITEMS=[
 {id:"water",name:"ВОДА",sub:"СЕНС",icon:Droplets,text:"Заглиблення. Хто ми? Що насправді хочемо створювати?",color:"#65b8ff"},
 {id:"wood",name:"ДЕРЕВО",sub:"НАПРЯМ",icon:Leaf,text:"Дослідження. Де є світло, попит і простір для росту?",color:"#83cf8b"},
 {id:"fire",name:"ВОГОНЬ",sub:"ДІЯ",icon:Flame,text:"Прояв. Що саме ми готові зробити видимим?",color:"#ff9459"},
 {id:"earth",name:"ЗЕМЛЯ",sub:"ВТІЛЕННЯ",icon:Mountain,text:"Форма. Як люди побачать, почують і відчують цінність?",color:"#e6b35f"},
 {id:"metal",name:"МЕТАЛ",sub:"СИСТЕМА",icon:CircleDot,text:"Точність. Що вимірюємо, оптимізуємо, автоматизуємо?",color:"#c9d5e6"},
];

export default function DaoSense({lang="ua"}){
 return <section id="dao" className="dao-section"><div className="max-w-6xl mx-auto px-5">
  <div className="dao-heading reveal"><span className="diamond"/><div><div className="dao-kicker">DAO · У-СІН · 5 ЕЛЕМЕНТІВ</div><h2>LESS IS MORE</h2><p>{lang==="ua"?"Не додавати шум. Прибрати зайве — і побачити, що вже працює.":"Don't add noise. Remove the excess — and see what already works."}</p></div><span className="diamond"/></div>
  <div className="dao-grid">{ITEMS.map((item,i)=>{const Icon=item.icon;return <article key={item.id} className={`dao-item dao-${item.id} reveal`} style={{animationDelay:`${i*.08}s`}}><div className="dao-icon" style={{color:item.color,borderColor:`${item.color}55`,boxShadow:`0 0 30px ${item.color}16`}}><Icon size={22}/></div><div><div className="dao-name" style={{color:item.color}}>{item.name}</div><div className="dao-sub">{item.sub}</div><p>{item.text}</p></div></article>})}</div>
  <div className="tea-pour reveal"><div className="tea-steam"><i/><i/><i/></div><div className="tea-pot" aria-label="Китайський чайник"><span className="tea-lid"/><span className="tea-body"/><span className="tea-handle"/><span className="tea-spout"/></div><div className="tea-copy"><span>下一泡 · NEXT POUR</span><strong>{lang==="ua"?"Додаємо ще води для наступного проливу":"Add more water for the next pour"}</strong><p>{lang==="ua"?"Цикл не закінчується. Нові дані повертають нас до Води.":"The cycle does not end. New data returns to Water."}</p><a href="#stages"><ArrowDown size={15}/>{lang==="ua"?"Далі — етапи":"Next — stages"}</a></div></div>
 </div></section>;
}
