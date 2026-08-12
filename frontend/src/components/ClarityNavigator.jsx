import React, { useState } from "react";
import { Droplets, Leaf, Flame, HeartHandshake, Settings2, ArrowRight, Mail } from "lucide-react";
import "./ExperienceUX.css";

const PATHS = [
  {
    id:"water", icon:Droplets, color:"#65b8ff",
    ua:{label:"Я не бачу суті", title:"Потрібна ясність", question:"Хто ми, що створюємо і навіщо це людям?", next:"Починаємо з Води: сенс, людина, продукт, цінності та вихідна точка.", tools:["сесія-заглиблення","Human Design як рефлексивний інструмент","цінності й місія","карта продукту"]},
    en:{label:"I can't see the essence", title:"I need clarity", question:"Who are we, what are we creating, and why does it matter to people?", next:"Start with Water: meaning, person, product, values and the current point.", tools:["immersion session","Human Design as a reflection tool","values & mission","product map"]}
  },
  {
    id:"wood", icon:Leaf, color:"#83cf8b",
    ua:{label:"Не знаю, куди рости", title:"Потрібен напрям", question:"Де є реальний простір для росту, а де просто шум?", next:"Переходимо до Дерева: ринок, люди, конкуренти, попит і позиціонування.", tools:["аналіз ринку","аналіз конкурентів","сегментація","семантичне ядро"]},
    en:{label:"I don't know where to grow", title:"I need direction", question:"Where is there real room to grow, and where is it just noise?", next:"Move to Wood: market, people, competitors, demand and positioning.", tools:["market research","competitor analysis","segmentation","semantic core"]}
  },
  {
    id:"fire", icon:Flame, color:"#ff9459",
    ua:{label:"Є продукт, але нас не видно", title:"Потрібен прояв", question:"Що саме показувати і яким каналом, щоб не розпорошуватися?", next:"Вогонь перетворює напрям на дію: стратегія, контент, запуск і трафік.", tools:["стратегія","контент","SMM","реклама й запуск"]},
    en:{label:"We have a product, but we're unseen", title:"I need visibility", question:"What exactly should we show, and through which channel, without scattering attention?", next:"Fire turns direction into action: strategy, content, launch and traffic.", tools:["strategy","content","SMM","ads & launch"]}
  },
  {
    id:"earth", icon:HeartHandshake, color:"#e6b35f",
    ua:{label:"Люди приходять, але зв'язку мало", title:"Потрібне втілення", question:"Як перетворити увагу на досвід, довіру і зрозумілий шлях людини?", next:"Земля дає форму: сайт, візуальна мова, community, UX і customer journey.", tools:["сайт / лендинг","фото й відео","community","UX та customer journey"]},
    en:{label:"People arrive, but connection is weak", title:"I need embodiment", question:"How do we turn attention into experience, trust and a clear customer path?", next:"Earth gives form: website, visual language, community, UX and customer journey.", tools:["website / landing","photo & video","community","UX & customer journey"]}
  },
  {
    id:"metal", icon:Settings2, color:"#c9d5e6",
    ua:{label:"Все працює, але хаотично", title:"Потрібна система", question:"Що залишити, що прибрати і що автоматизувати?", next:"Метал збирає систему: аналітика, CRO, CRM, AI, автоматизація і вимірювання.", tools:["web-аналітика","CRO","воронки й CRM","етична AI-автоматизація"]},
    en:{label:"It works, but chaotically", title:"I need a system", question:"What should stay, what should go, and what should be automated?", next:"Metal builds the system: analytics, CRO, CRM, AI, automation and measurement.", tools:["web analytics","CRO","funnels & CRM","ethical AI automation"]}
  }
];

export default function ClarityNavigator({lang="ua"}){
  const [active,setActive]=useState("water");
  const current=PATHS.find(x=>x.id===active)||PATHS[0];
  const c=current[lang]||current.ua;
  return <section id="clarity" className="clarity-section">
    <div className="max-w-6xl mx-auto px-5">
      <div className="clarity-heading reveal">
        <span className="clarity-eyebrow">QUALITY VISUALITY · START WITH THE SITUATION</span>
        <h2>{lang==="ua"?"Не обирай інструмент. Спочатку знайди точку, де ти є.":"Don't choose a tool first. Find where you are."}</h2>
        <p>{lang==="ua"?"Етичний маркетинг не починається з «вам потрібен таргет». Він починається з розуміння задачі.":"Ethical marketing doesn't start with “you need ads”. It starts by understanding the task."}</p>
      </div>
      <div className="clarity-tabs reveal" role="tablist" aria-label={lang==="ua"?"Оберіть свою ситуацію":"Choose your situation"}>
        {PATHS.map(p=>{const Icon=p.icon;const text=(p[lang]||p.ua);return <button key={p.id} role="tab" aria-selected={active===p.id} className={`clarity-tab ${active===p.id?"is-active":""}`} style={{"--path-color":p.color}} onClick={()=>setActive(p.id)}><span className="clarity-tab-icon"><Icon size={18}/></span><span>{text.label}</span></button>})}
      </div>
      <div className="clarity-result panel reveal" style={{"--path-color":current.color}}>
        <div className="clarity-result-main">
          <span className="clarity-result-kicker">{c.title}</span>
          <h3>{c.question}</h3>
          <p>{c.next}</p>
          <div className="clarity-tool-chips">{c.tools.map(x=><span key={x}>{x}</span>)}</div>
        </div>
        <div className="clarity-result-actions">
          <a href="#stages" className="clarity-primary">{lang==="ua"?"Побачити маршрут":"See the route"}<ArrowRight size={16}/></a>
          <a href={`mailto:qualityvisuality@gmail.com?subject=${encodeURIComponent(`Quality Visuality · ${c.title}`)}`} className="clarity-secondary"><Mail size={15}/>{lang==="ua"?"Дізнатись цінність":"Discover the value"}</a>
        </div>
      </div>
    </div>
  </section>
}
