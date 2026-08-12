import React from "react";
import { X, ArrowRight, MessageCircle, CheckCircle2 } from "lucide-react";

const DETAILS = {
  "Створення фотоконтенту": { title: "Фотоконтент", promise: "Візуальна система, яка не просто прикрашає бренд, а допомагає йому бути впізнаваним.", how: ["визначаємо візуальний напрям", "створюємо shot-list і сценарії", "знімаємо / кураторимо матеріал", "готуємо контент під соцмережі, сайт і рекламу"] },
  "Підготовка до просування": { title: "Підготовка до просування", promise: "Перед рекламою прибираємо те, що змушує бюджет працювати проти бізнесу.", how: ["перевіряємо оффер і позиціонування", "аналізуємо аудиторію та конкурентів", "визначаємо KPI", "готуємо креативи й точки конверсії"] },
  "Аналіз конкурентів": { title: "Аналіз конкурентів", promise: "Не копіювати ринок — побачити, де в ньому є вільний простір.", how: ["карта конкурентів", "продукти, оффери, комунікації", "контент і рекламні патерни", "можливості диференціації"] },
  "SMM": { title: "SMM", promise: "Соцмережі як продовження бренду, а не фабрика випадкових постів.", how: ["контент-архітектура", "рубрики та сценарії", "контент-план", "аналітика й оптимізація"] },
  "Web-аналітика": { title: "Web-аналітика", promise: "Перетворити поведінку людей на рішення, а не на таблицю заради таблиці.", how: ["події та конверсії", "воронка", "дашборд", "гіпотези для покращення"] },
  "Воронки": { title: "Воронки продажів", promise: "Побудувати шлях від першого контакту до рішення про купівлю конкретного продукту.", how: ["карта customer journey", "лід-магніт / контент / оффер", "лендинг і точки конверсії", "email / messenger / remarketing сценарії"] },
  "Conversion rate optimization": { title: "Conversion Rate Optimization", promise: "Знаходимо, де люди губляться, і тестуємо, що допомагає їм рухатися далі.", how: ["аналіз поведінки", "аудит лендингу", "гіпотези", "A/B-тести та вимірювання"] },
  "Таргетована реклама": { title: "Таргетована реклама", promise: "Платний трафік тільки там, де є сенс його купувати.", how: ["сегментація", "креативні гіпотези", "кампанії", "оптимізація за KPI"] },
  "Google Ads": { title: "Google Ads", promise: "Працюємо з попитом, який уже сформувався, і вимірюємо результат.", how: ["семантика", "структура кампаній", "оголошення", "аналітика та оптимізація"] },
  "AI": { title: "Етичний AI", promise: "Автоматизувати рутину так, щоб технологія залишалася інструментом людини.", how: ["визначаємо повторювані задачі", "проєктуємо AI-процес", "автоматизуємо", "контролюємо якість і людський тон"] },
  "SEO": { title: "SEO", promise: "Зробити сайт зрозумілим одночасно людям і пошуковим системам.", how: ["семантика", "структура сторінок", "технічний SEO", "контент та внутрішня перелінковка"] },
  "Контент-маркетинг": { title: "Контент-маркетинг", promise: "Контент як довга система довіри, а не нескінченна гонка за охопленнями.", how: ["контент-стратегія", "пошукові та соціальні формати", "редакційна система", "аналітика результатів"] },
  "Email-маркетинг & Push": { title: "Email & Push", promise: "Повертати людину до бренду доречно, а не переслідувати її повідомленнями.", how: ["сегментація", "ланцюжки", "автоматизація", "тестування"] },
  "YouTube": { title: "YouTube", promise: "Побудувати відео як медіа-актив бренду.", how: ["позиціонування каналу", "контентні серії", "сценарії", "аналітика утримання"] },
  "Створення відеоконтенту": { title: "Відеоконтент", promise: "Кадр, звук і історія працюють на одну думку.", how: ["концепція", "сценарій", "зйомка / монтаж", "адаптації під канали"] },
};

export default function ToolModal({ tool, onClose }) {
  const d = DETAILS[tool] || { title: tool, promise: "Індивідуальний інструмент під конкретну задачу бізнесу.", how: ["визначаємо задачу", "обираємо метрику", "створюємо рішення", "вимірюємо результат"] };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(3,5,10,.86)", backdropFilter: "blur(8px)" }} onClick={onClose}>
      <div className="panel panel-glow tool-modal reveal in" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="btn-ghost absolute right-4 top-4 w-10 h-10 flex items-center justify-center rounded-full"><X size={18}/></button>
        <div className="font-label text-gold text-xs tracking-[.24em] mb-3">ІНСТРУМЕНТ · QUALITY VISUALITY</div>
        <h3 className="font-display text-4xl md:text-5xl text-[#f1ddb0] pr-10">{d.title}</h3>
        <p className="font-body text-[#ddd8c9] leading-relaxed mt-4 max-w-2xl">{d.promise}</p>
        <div className="gold-rule my-6" />
        <div className="font-label text-xs tracking-widest text-gold mb-3">ЯК ПРАЦЮЄМО РАЗОМ</div>
        <div className="grid sm:grid-cols-2 gap-3">{d.how.map((x, i) => <div key={i} className="tool-step"><CheckCircle2 size={16}/><span>{x}</span></div>)}</div>
        <div className="mt-7 flex flex-wrap gap-3 items-center">
          <a className="btn-gold inline-flex items-center gap-2 px-5 py-3 text-sm" href={`mailto:qualityvisuality@gmail.com?subject=${encodeURIComponent(`Quality Visuality · ${d.title}`)}`}><MessageCircle size={16}/> Написати мені <ArrowRight size={16}/></a>
          <span className="text-dim text-xs">Вартість — після короткого брифу; можна замовити окремо або як частину системи.</span>
        </div>
      </div>
    </div>
  );
}
