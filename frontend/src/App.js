import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import { ArrowRight, ChevronDown, Mail, Menu, Send, X } from "lucide-react";
import portrait from "./assets/portrait.webp";
import teaScene from "./assets/tea-scroll-scene.webp";

const EMAIL = "qualityvisuality@gmail.com";
const BUILD_MARKER = "QV · 2026-09-16 · R11 · PREMIUM DENSE";

const elements = [
  {
    key: "water",
    no: "01",
    name: "ВОДА",
    title: "ЯСНІСТЬ",
    cue: "Пізнання · Хто ми? · Побачити суть",
    text: "Знімаємо зайвий шум і формулюємо, що насправді важливо для проєкту, клієнта й тебе.",
    tools: ["Суть", "Контекст", "Потреба", "Північна зірка"],
  },
  {
    key: "wood",
    no: "02",
    name: "ДЕРЕВО",
    title: "НАПРЯМ",
    cue: "Ріст · Де ми? · Розвиток",
    text: "Досліджуємо поле, конкурентів, аудиторію та знаходимо напрям, який можна розвивати без копіювання чужих формул.",
    tools: ["Дослідження", "Аудиторія", "Бенчмарки", "Гіпотези"],
  },
  {
    key: "fire",
    no: "03",
    name: "ВОГОНЬ",
    title: "ПРОЯВ",
    cue: "Дія · Що робимо? · Тест",
    text: "Перетворюємо сенс у сильний прояв: повідомлення, контент, пропозицію й візуальну подачу, яку легко відчути.",
    tools: ["Офер", "Контент", "Креатив", "Комунікація"],
  },
  {
    key: "earth",
    no: "04",
    name: "ЗЕМЛЯ",
    title: "ВТІЛЕННЯ",
    cue: "Стабільність · Як реалізуємо? · Ресурс",
    text: "Збираємо реалістичний план із доступного часу, бюджету й енергії. Менше пунктів — більше завершених дій.",
    tools: ["План", "Ритм", "Ресурси", "Пріоритет"],
  },
  {
    key: "metal",
    no: "05",
    name: "МЕТАЛ",
    title: "СИСТЕМА",
    cue: "Структура · Як це працює? · Оптимізація",
    text: "Закріплюємо те, що вже дає сенс і результат: процеси, шаблони, аналітику та автоматизації без зайвої складності.",
    tools: ["Процеси", "Метрики", "Шаблони", "Автоматизація"],
  },
];

const process = [
  ["01", "Заглиблення", "Спокійний простір і чесний діалог. Спочатку розуміємо ситуацію, а не продаємо готове рішення."],
  ["02", "Прояснення", "Знаходимо суть, бачимо можливості та обираємо той наступний крок, який має найбільший сенс зараз."],
  ["03", "Втілення", "Перекладаємо ясність у конкретний план, контент, візуальну систему або процес, який можна виконати."],
];

const services = [
  {
    kicker: "ВОДА · 30 ХВ",
    title: "Знайти свою Північну зірку",
    text: "Коли думок багато, а наступний крок неочевидний. Розбираємо ситуацію й виходимо з однією ясною точкою дії.",
  },
  {
    kicker: "КОНТЕНТ · СИСТЕМА",
    title: "Живий контент без шуму",
    text: "Сенси, рубрики, ритм і формат комунікації, які відповідають твоєму голосу й не перетворюють бренд на фабрику постів.",
  },
  {
    kicker: "ВІЗУАЛ · НАПРЯМ",
    title: "Візуальна мова бренду",
    text: "Збираємо стиль, настрій, кадр, текст і цифрову подачу в одну впізнавану систему — без декоративності заради декоративності.",
  },
];

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <span className="brand-q">Q</span>
      <span className="brand-eye" />
    </span>
  );
}

function DragonSigil({ compact = false }) {
  return (
    <svg className={compact ? "dragon-sigil compact" : "dragon-sigil"} viewBox="0 0 420 360" role="img" aria-label="Дракон — маскот Quality Visuality">
      <defs>
        <linearGradient id="dragonGold" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#f4dc91" />
          <stop offset="0.48" stopColor="#ce8e48" />
          <stop offset="1" stopColor="#8d342b" />
        </linearGradient>
        <filter id="dragonGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3.2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <g fill="none" stroke="url(#dragonGold)" strokeLinecap="round" strokeLinejoin="round" filter="url(#dragonGlow)">
        <path strokeWidth="13" d="M304 72c-40 1-80 25-101 62-18 32-18 70 1 99 18 29 51 44 84 35 28-8 47-33 46-60-1-25-17-47-40-55-24-9-51-3-67 16-14 17-17 42-6 61 11 20 35 31 57 25 17-5 30-19 32-36" />
        <path strokeWidth="9" d="M304 72c17-22 38-33 61-31-11 9-16 19-16 31 14-4 27-1 38 10-17 1-30 7-40 19 11 2 21 8 29 18-20-2-36 3-49 14" />
        <path strokeWidth="7" d="M283 79c-13-21-32-33-57-36 11 9 16 19 17 31-12-4-24-3-35 5 14 3 24 10 31 20" />
        <path strokeWidth="6" d="M324 117c14 0 25 5 34 15M331 131c11 3 20 10 26 19M240 267c-15 20-38 35-70 45 22 3 41 2 58-4-10 13-25 22-45 28 33 4 60-6 80-31" />
        <path strokeWidth="4" d="M218 132l-17-18m35 4-8-26m35 18 3-28m20 42 15-24m-99 101-28 10m32 14-22 20m42 3-8 27" />
      </g>
      <circle cx="337" cy="92" r="5" fill="#f8e7a7" />
      <circle cx="337" cy="92" r="14" fill="none" stroke="#d79d51" opacity=".24" />
    </svg>
  );
}

function SeasonalPopup({ onClose }) {
  return (
    <aside className="seasonal-popup" role="dialog" aria-labelledby="seasonal-title">
      <button className="seasonal-close" onClick={onClose} aria-label="Закрити"><X size={18} /></button>
      <img src={portrait} alt="" aria-hidden="true" className="seasonal-photo" />
      <div>
        <span className="eyebrow">QUALITY VISUALITY · TIMING</span>
        <h2 id="seasonal-title">Усьому свій час. Або справді?</h2>
        <p>У природі кожна дія має сезон. У маркетингу теж: інколи найсильніший крок — не додати ще одне, а вчасно прибрати зайве.</p>
      </div>
    </aside>
  );
}

function AskDragon({ initialQuestion = "" }) {
  const [question, setQuestion] = useState(initialQuestion);
  useEffect(() => setQuestion(initialQuestion), [initialQuestion]);

  const send = (e) => {
    e.preventDefault();
    const text = question.trim();
    if (!text) return;
    const subject = encodeURIComponent("Запит із Quality Visuality");
    const body = encodeURIComponent(`Привіт! Моя ситуація / запит:\n\n${text}\n\nХочу зрозуміти наступний індивідуальний крок.`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="ask" className="ask-dragon panel reveal-static">
      <div className="ask-dragon-art"><DragonSigil compact /></div>
      <div className="ask-dragon-copy">
        <span className="eyebrow">МАСКОТ · ДРАКОН</span>
        <h2>Запитай. Не треба знати правильне формулювання.</h2>
        <p>Опиши ситуацію своїми словами. Я прочитаю контекст і повернуся не з універсальною схемою, а з питанням або кроком, який допоможе рухатись далі.</p>
        <form onSubmit={send} className="dragon-form">
          <label htmlFor="dragon-question" className="sr-only">Опиши свою ситуацію</label>
          <textarea id="dragon-question" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Наприклад: є продукт і сильна ідея, але не розумію, що зараз важливіше — сайт, контент чи перша пропозиція…" rows="3" />
          <button type="submit" className="btn primary"><Send size={17} /> Відправити запит</button>
        </form>
      </div>
    </section>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [seasonal, setSeasonal] = useState(false);
  const [prefill, setPrefill] = useState("");

  useEffect(() => {
    try {
      if (sessionStorage.getItem("qv-seasonal-dismissed")) return;
      const timer = window.setTimeout(() => setSeasonal(true), 6039);
      return () => window.clearTimeout(timer);
    } catch (_) {
      const timer = window.setTimeout(() => setSeasonal(true), 6039);
      return () => window.clearTimeout(timer);
    }
  }, []);

  const closeSeasonal = () => {
    setSeasonal(false);
    try { sessionStorage.setItem("qv-seasonal-dismissed", "1"); } catch (_) {}
  };

  const nav = useMemo(() => [
    ["clarity", "Твій крок"],
    ["less", "LESS IS MORE"],
    ["elements", "5 елементів"],
    ["tea", "Чай"],
    ["products", "Продукти"],
    ["about", "Про мене"],
  ], []);

  const askAbout = (label) => {
    setPrefill(`Хочу запитати про ${label}. Мій контекст: `);
    window.setTimeout(() => document.getElementById("ask")?.scrollIntoView({ behavior: "smooth", block: "center" }), 40);
  };

  return (
    <div className="qv-site">
      <div className="ambient-bg" aria-hidden="true" />
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#top" onClick={() => setMenuOpen(false)}>
            <BrandMark />
            <span><strong>Quality Visuality</strong><small>ETHICAL MARKETING SYSTEM</small></span>
          </a>
          <nav className="desktop-nav" aria-label="Головна навігація">
            {nav.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
          </nav>
          <button className="menu-toggle" onClick={() => setMenuOpen((v) => !v)} aria-expanded={menuOpen} aria-label={menuOpen ? "Закрити меню" : "Відкрити меню"}>
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
        {menuOpen && (
          <nav className="mobile-nav" aria-label="Мобільна навігація">
            {nav.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}
          </nav>
        )}
      </header>

      <main id="top">
        <section className="hero container">
          <div className="hero-copy">
            <span className="eyebrow">QUALITY VISUALITY · ETHICAL MARKETING SYSTEM</span>
            <h1>Етичний маркетинг,<br />у якому менше дій —<br /><em>більше результату.</em></h1>
            <p className="hero-lead">Тут ти не купуєш «весь маркетинг одразу». Ми знаходимо наступний індивідуальний крок — той, що прибирає шум, підсилює сенс і реально рухає проєкт.</p>
            <div className="hero-actions">
              <a className="btn primary" href="#clarity">Побачити свій шлях <ArrowRight size={17} /></a>
              <a className="btn secondary" href="#products">Дізнатись, з чого почати</a>
            </div>
            <div className="hero-proof" aria-label="Принципи роботи">
              <span>ясність до інструментів</span><span>сенс до контенту</span><span>система після тесту</span>
            </div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="hero-sun" />
            <DragonSigil />
            <div className="hero-quote"><span>БІЛЬШЕ СЕНСУ.</span><span>МЕНШЕ ШУМУ.</span><strong>LESS IS MORE</strong></div>
          </div>
        </section>

        <section id="less" className="container less-panel panel">
          <div>
            <span className="eyebrow">ПРИНЦИП</span>
            <h2>LESS IS MORE</h2>
            <p>Ми прибираємо зайве, щоб увага залишилась на тому, що справді впливає на рішення клієнта й результат проєкту.</p>
          </div>
          <div className="principle-row">
            {["ЯСНІСТЬ", "НАПРЯМ", "ПРОЯВ", "ЕТИКА", "ГАРМОНІЯ"].map((item, i) => <span key={item}><b>{String(i + 1).padStart(2, "0")}</b>{item}</span>)}
          </div>
        </section>

        <section id="clarity" className="container intro-grid section-block">
          <div>
            <span className="section-label">✦ 5 ЕЛЕМЕНТІВ</span>
            <h2>Шлях до цілісності — не ще одна методика. Це спосіб побачити, <em>чого саме бракує зараз.</em></h2>
            <p>Вода дає ясність. Дерево — напрям. Вогонь — прояв. Земля — втілення. Метал — систему. Не потрібно проходити все по черзі: ми входимо в той елемент, який відповідає реальній задачі.</p>
            <p>Так стратегія не стає великою презентацією «на потім». Вона стає логікою рішень: що прибрати, що перевірити, що посилити й що вже не треба робити.</p>
          </div>
          <blockquote>«Гармонія починається всередині, а змінює те, що бачить клієнт назовні.»</blockquote>
        </section>

        <section className="container section-block">
          <div className="section-heading">
            <div><span className="section-label">✦ ЯК МИ ПРАЦЮЄМО</span><h2>Простий процес. Глибокі зміни.</h2></div>
            <span className="microcopy">БІЛЬШЕ, НІЖ ПРОСТО «ЗРОБИТИ МАРКЕТИНГ»</span>
          </div>
          <div className="process-grid">
            {process.map(([no, title, text]) => <article className="process-card panel" key={no}><span>{no}</span><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </section>

        <section className="container dao-panel section-block" aria-label="Шлях DAO">
          <div className="dao-line" />
          <div className="dao-title"><span>Шлях</span><strong>DAO</strong><small>центральний шлях, що поєднує всі елементи</small></div>
          <div className="dao-elements">
            {elements.map((el) => <a href={`#${el.key}`} className={`dao-node ${el.key}`} key={el.key}><i>{el.no}</i><b>{el.name}</b></a>)}
          </div>
        </section>

        <section id="elements" className="container section-block">
          <div className="section-heading compact-heading">
            <div><span className="section-label">✦ 5 ЕЛЕМЕНТІВ</span><h2>Кожен елемент — окремий вхід до результату.</h2></div>
            <span className="microcopy">ВІДКРИЙ ТОЙ, ЯКИЙ ВІДГУКУЄТЬСЯ</span>
          </div>
          <div className="elements-stack">
            {elements.map((el, index) => (
              <details id={el.key} className={`element-row ${el.key}`} key={el.key} open={index === 0}>
                <summary>
                  <span className="element-number">{el.no}</span>
                  <span className="element-name">{el.name} — <strong>{el.title}</strong></span>
                  <span className="element-cue">{el.cue}</span>
                  <ChevronDown size={19} className="chevron" />
                </summary>
                <div className="element-body">
                  <p>{el.text}</p>
                  <div className="tool-grid">{el.tools.map((tool, i) => <span key={tool}><b>{String(i + 1).padStart(2, "0")}</b>{tool}</span>)}</div>
                </div>
              </details>
            ))}
          </div>
        </section>

        <section id="tea" className="container tea-section section-block">
          <div className="tea-visual panel"><img src={teaScene} alt="Чайна атмосфера Quality Visuality" loading="lazy" /><div><span className="eyebrow">ЧАЙ · РИТУАЛ УВАГИ</span><h2>Наш чай — не декор. Це спосіб змінити темп розмови.</h2></div></div>
          <div className="tea-products">
            <article className="tea-card panel">
              <span className="tea-index">01</span><small>ПУЕР · ЮНЬНАНЬ</small><h3>Шу Пуер</h3><p>Глибокий, землистий, спокійний профіль. Для моментів, коли хочеться сповільнити темп і зібрати увагу в одну точку.</p><button onClick={() => askAbout("Шу Пуер")} className="text-link">Запитати про чай <ArrowRight size={15} /></button>
            </article>
            <article className="tea-card panel">
              <span className="tea-index">02</span><small>УЛУН · УЇШАНЬ</small><h3>Да Хун Пао</h3><p>Мінеральний, теплий, багатошаровий улун. Для розмов, у яких потрібні присутність, нюанс і простір між словами.</p><button onClick={() => askAbout("Да Хун Пао")} className="text-link">Запитати про чай <ArrowRight size={15} /></button>
            </article>
          </div>
        </section>

        <section id="products" className="container section-block">
          <div className="section-heading">
            <div><span className="section-label">✦ ПРОДУКТИ</span><h2>Почати можна з малого — але точного.</h2></div>
            <span className="microcopy">НЕ ПАКЕТИ. КОНКРЕТНІ ТОЧКИ ВХОДУ.</span>
          </div>
          <div className="services-grid">
            {services.map((s) => <article className="service-card panel" key={s.title}><span className="eyebrow">{s.kicker}</span><h3>{s.title}</h3><p>{s.text}</p><button className="text-link" onClick={() => askAbout(s.title)}>Обговорити <ArrowRight size={15} /></button></article>)}
          </div>
        </section>

        <section id="about" className="container about-section section-block">
          <div className="about-photo panel"><img src={portrait} alt="Засновник Quality Visuality" loading="lazy" /></div>
          <div className="about-copy">
            <span className="section-label">✦ ПРО МЕНЕ</span>
            <h2>Партнер у ясності, сенсі та втіленні.</h2>
            <p>Я працюю на перетині етичного маркетингу, візуальної мови, комунікації та клієнтського досвіду. Моя задача — зібрати розрізнене в систему, яку можна зрозуміти й виконати.</p>
            <p>Ми не починаємо з «який канал зараз модний». Починаємо з контексту: що ти створюєш, для кого, навіщо це важливо і яка одна дія зараз дасть найбільше ясності або руху.</p>
            <a className="btn secondary" href={`mailto:${EMAIL}`}><Mail size={17} /> Написати напряму</a>
          </div>
          <div className="about-dragon"><DragonSigil compact /><p>Справжня сила — у ясності, цілісності та послідовності.</p></div>
        </section>

        <AskDragon initialQuestion={prefill} />

        <section className="container final-cta panel">
          <div><span className="eyebrow">НАСТУПНИЙ КРОК</span><h2>Опиши свою ситуацію. Пошукаємо те, що справді варто зробити далі.</h2><p>Без зайвих пакетів і без обіцянки, що тобі потрібно все одразу.</p></div>
          <a href="#ask" className="btn primary">Описати ситуацію <ArrowRight size={17} /></a>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="footer-brand"><BrandMark /><span><strong>Quality Visuality</strong><small>ETHICAL MARKETING SYSTEM</small></span></div>
          <div className="footer-values"><span>ЕТИКА У КОЖНОМУ РІШЕННІ</span><i /> <span>ГАРМОНІЯ У ПРОЦЕСІ</span><i /> <span>ЦІЛІСНІСТЬ У РЕЗУЛЬТАТІ</span></div>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </div>
        <div className="build-marker">© {new Date().getFullYear()} Quality Visuality · {BUILD_MARKER}</div>
      </footer>

      {seasonal && <SeasonalPopup onClose={closeSeasonal} />}
    </div>
  );
}
