import React from "react";
import { ShieldCheck, Scale, Eye, BarChart3, Hand, Sparkles } from "lucide-react";
import "./ExperienceUX.css";

const PRINCIPLES=[
  {icon:Hand,ua:["Без тиску","Не створюємо штучний дефіцит, страх або сором як механіку продажу."],en:["No pressure","We don't use artificial scarcity, fear or shame as a sales mechanism."]},
  {icon:Eye,ua:["Ясність замість маніпуляції","Людина має розуміти, що їй пропонують, для кого це і який наступний крок."],en:["Clarity over manipulation","People should understand what is offered, who it is for and what happens next."]},
  {icon:BarChart3,ua:["Гіпотези вимірюємо","Креатив не звільняє від відповідальності: дивимось на поведінку, метрики та реальний результат."],en:["Measure hypotheses","Creativity doesn't remove accountability: we look at behavior, metrics and real outcomes."]},
  {icon:ShieldCheck,ua:["Повага до даних","Збираємо лише те, що має сенс для роботи; приватність — не декоративне слово."],en:["Respect data","Collect only what serves the work; privacy is not decorative language."]},
  {icon:Scale,ua:["Автономія людини","Маркетинг допомагає прийняти рішення, а не забирає у людини право не купувати."],en:["Human autonomy","Marketing should support a decision, not remove a person's right to say no."]}
];

export default function EthicalPrinciples({lang="ua"}){
  const isUa=lang==="ua";
  return <section id="ethics" className="ethics-section">
    <div className="max-w-6xl mx-auto px-5">
      <div className="ethics-heading reveal">
        <span className="ethics-icon"><Sparkles size={18}/></span>
        <div><span className="clarity-eyebrow">ETHICAL BY DESIGN</span><h2>{isUa?"Етичність — не окремий блок. Це правила, за якими працює система.":"Ethics is not a separate block. It is how the system works."}</h2></div>
      </div>
      <div className="ethics-grid">{PRINCIPLES.map(({icon:Icon,ua,en},i)=>{const [title,text]=isUa?ua:en;return <article className="ethics-card panel reveal" key={title} style={{animationDelay:`${i*.05}s`}}><Icon size={20}/><h3>{title}</h3><p>{text}</p></article>})}</div>
      <div className="reflection-note panel reveal">
        <strong>{isUa?"Про Human Design, Таро, Матрицю Долі та інші символічні системи":"About Human Design, Tarot, Matrix of Destiny and other symbolic systems"}</strong>
        <p>{isUa?"На сайті вони подаються як інструменти рефлексії, постановки запитань і пошуку мови для власного досвіду. Не як медична, психотерапевтична, юридична чи фінансова діагностика і не як гарантія передбачення майбутнього.":"On this site they are used as tools for reflection, inquiry and finding language for personal experience — not as medical, psychotherapeutic, legal or financial diagnosis, and not as a guarantee of predicting the future."}</p>
      </div>
    </div>
  </section>
}
