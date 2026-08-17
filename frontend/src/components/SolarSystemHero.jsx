import React, { useEffect, useRef, useState } from "react";
import { ArrowDown, Pause, Play, RotateCcw } from "lucide-react";
import "./QualityVisualityEnhancements.css";
import "./ExperienceUX.css";
import "./ScrollCinematics.css";

const CINEMATIC_DURATION = 6_000;
const ELEMENT_SOUND = { Вода: "water", Дерево: "wood", Вогонь: "fire", Земля: "earth", Метал: "metal" };
const ELEMENT_META = {
  Вода: { chakra: "Вішуддха", frequency: "741 Hz", tone: "голос · сенс · глибина" },
  Дерево: { chakra: "Анахата", frequency: "639 Hz", tone: "зв'язок · ріст · напрям" },
  Вогонь: { chakra: "Маніпура", frequency: "528 Hz", tone: "воля · дія · прояв" },
  Земля: { chakra: "Муладхара", frequency: "396 Hz", tone: "опора · втілення · довіра" },
  Метал: { chakra: "Аджна", frequency: "852 Hz", tone: "структура · ясність · система" },
};

const PLANETS = [
  { id: "sun", name: "Сонце", en: "Sun", role: "Ядро бренду", enRole: "Brand core", archetype: "Ātman · центр · світло волі", enArchetype: "Self · center · directional light", lens: "КЛАСИЧНА NAVAGRAHA · SŪRYA", element: "Вогонь", color: "#ffd36b", image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Sun_disk.jpg", orbit: 0, speed: 0 },
  { id: "mercury", name: "Меркурій", en: "Mercury", role: "Мова та комунікація", enRole: "Language & communication", archetype: "Vāk · інтелект · розрізнення", enArchetype: "Speech · intellect · discernment", lens: "КЛАСИЧНА NAVAGRAHA · BUDHA", element: "Метал", color: "#b9a99a", image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Mercury_-_accurate_colour.png", orbit: 1, speed: 1 },
  { id: "venus", name: "Венера", en: "Venus", role: "Цінність та естетика", enRole: "Value & aesthetics", archetype: "Śukra · потяг · цінність · краса", enArchetype: "Attraction · value · refinement", lens: "КЛАСИЧНА NAVAGRAHA · ŚUKRA", element: "Земля", color: "#e4b27b", image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Venus_colour.png", orbit: 2, speed: 0.82 },
  { id: "earth", name: "Земля", en: "Earth", role: "Досвід і втілення", enRole: "Experience & embodiment", archetype: "Pṛthivī · форма · опора · матеріальність", enArchetype: "Form · support · materiality", lens: "ВЕДИЧНА ФІЛОСОФІЯ · PṚTHIVĪ · НЕ GRAHA", element: "Земля", color: "#66a9ff", image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/NASA_Earth_America_2002.jpg", orbit: 3, speed: 0.68 },
  { id: "mars", name: "Марс", en: "Mars", role: "Дія та запуск", enRole: "Action & launch", archetype: "Maṅgala · сила · сміливість · дія", enArchetype: "Force · courage · action", lens: "КЛАСИЧНА NAVAGRAHA · MAṄGALA", element: "Вогонь", color: "#d8784e", image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Mars_accurate_colour.png", orbit: 4, speed: 0.56 },
  { id: "jupiter", name: "Юпітер", en: "Jupiter", role: "Стратегія і ріст", enRole: "Strategy & growth", archetype: "Guru · знання · сенс · наставництво", enArchetype: "Knowledge · meaning · counsel", lens: "КЛАСИЧНА NAVAGRAHA · BṚHASPATI / GURU", element: "Дерево", color: "#d8b98e", image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Jupiter_in_true_color.jpg", orbit: 5, speed: 0.34 },
  { id: "saturn", name: "Сатурн", en: "Saturn", role: "Система та межі", enRole: "System & boundaries", archetype: "Śani · час · межа · витривалість", enArchetype: "Time · limits · endurance", lens: "КЛАСИЧНА NAVAGRAHA · ŚANI", element: "Метал", color: "#d8c08d", image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Saturn_With_Rhea_and_Dione_%28true_color%29.jpg", orbit: 6, speed: 0.27, rings: true },
  { id: "uranus", name: "Уран", en: "Uranus", role: "Інновація та AI", enRole: "Innovation & AI", archetype: "Свобода · розрив шаблону · новаторство", enArchetype: "Freedom · disruption · innovation", lens: "СУЧАСНЕ РОЗШИРЕННЯ · ПОЗА NAVAGRAHA", element: "Дерево", color: "#8ad4d8", image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Uranus_true_colour.jpg", orbit: 7, speed: 0.21 },
  { id: "neptune", name: "Нептун", en: "Neptune", role: "Образ, відео, уява", enRole: "Image, video & imagination", archetype: "Уява · атмосфера · символ", enArchetype: "Imagination · atmosphere · symbol", lens: "СУЧАСНЕ РОЗШИРЕННЯ · ПОЗА NAVAGRAHA", element: "Вода", color: "#5f7cff", image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Neptune_Full.jpg", orbit: 8, speed: 0.16 },
  { id: "pluto", name: "Плутон", en: "Pluto", role: "Глибинна трансформація", enRole: "Deep transformation", archetype: "Відсікання · перетворення · оновлення", enArchetype: "Elimination · transformation · renewal", lens: "СУЧАСНЕ РОЗШИРЕННЯ · ПОЗА NAVAGRAHA", element: "Земля", color: "#b8958a", image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Nh-pluto-in-true-color_2x.jpg", orbit: 9, speed: 0.12, dwarf: true },
];

const DETAILS = {
  sun: { ua: "Сур'я — принцип центру, самості та світла, що задає напрям. У бренді це не гучність, а ясність того, що ми представляємо, за що відповідаємо і навколо якого сенсу збирається система.", en: "Sūrya is the principle of center, selfhood and directional light. In a brand this is clarity about what the whole system stands around." },
  mercury: { ua: "Будха — архетип мовлення, інтелекту, навчання й розрізнення: здатності перекласти складне у зрозумілу мову. У бренді це точність слів, смислів і зв'язків, а не copywriting як трюк.", en: "Budha is speech, intellect, learning and discernment: the ability to translate complexity into clear language." },
  venus: { ua: "Шукра — архетип потягу, цінності, краси й витонченості взаємодії. У бренді форма має не маскувати відсутність сенсу, а робити справжню цінність відчутною через естетику й досвід.", en: "Śukra is attraction, value, beauty and refinement. Form should make real value felt rather than hide a lack of meaning." },
  earth: { ua: "Pṛthivī тут не є класичною graha: це принцип землі серед pañcamahābhūta — форма, щільність, опора й матеріальне втілення. У бренді він питає, де стратегія стала реальним продуктом, сайтом, сервісом і досвідом людини.", en: "Pṛthivī is not presented as a graha; it is the earth principle of form, solidity, support and material embodiment." },
  mars: { ua: "Maṅgala — архетип сили, сміливості й переходу від наміру до дії. У бренді це запуск, тест і рух після ясності — з конкретною метою, а не активність заради активності.", en: "Maṅgala is force, courage and movement from intention into action. In a brand it is purposeful launch and testing after clarity." },
  jupiter: { ua: "Bṛhaspati / Guru — архетип знання, поради, сенсу, навчання й ширшої перспективи. У бренді це стратегія й ріст через розуміння контексту, а не хаотичне збільшення всього одразу.", en: "Bṛhaspati / Guru is knowledge, counsel, meaning and wider perspective. In a brand it is strategic growth through understanding." },
  saturn: { ua: "Śani — архетип часу, меж, витривалості й дисципліни. У бренді це процеси, відповідальність, вимірювання та правила якості, які дозволяють системі витримати довгу дистанцію.", en: "Śani is time, limits, endurance and discipline. In a brand it becomes process, responsibility, measurement and durable quality." },
  uranus: { ua: "Уран не належить до класичної Navagraha, тому тут це чесно позначене сучасне символічне розширення: свобода, розрив шаблону, технологічне новаторство. У бренді — експеримент та AI лише там, де новизна служить реальній задачі.", en: "Uranus is outside classical Navagraha and is explicitly treated as a modern symbolic extension: freedom, disruption and innovation." },
  neptune: { ua: "Нептун не належить до класичної Navagraha; тут це сучасний архетип уяви, атмосфери й символу. У бренді образ, відео та історія мають поглиблювати правду, а не створювати красивий туман.", en: "Neptune is outside classical Navagraha; here it is a modern archetype of imagination, atmosphere and symbol." },
  pluto: { ua: "Плутон не належить до класичної Navagraha; тут це сучасний архетип глибинного перетворення й відсікання віджилого. У бренді він доречний, коли треба змінити саму конструкцію шляху, а не просто посилити тиск.", en: "Pluto is outside classical Navagraha; here it is a modern archetype of deep transformation and removal of what no longer works." },
};

const OFFERS = {
  sun: ["Стратегічна сесія бренду", "Позиціонування та офер", "Комплексний супровід"], mercury: ["Tone of voice + copy", "SEO / семантика", "Email-сценарії"], venus: ["Фотоконтент", "12-тижневий курс фотографії", "Візуальна система"], earth: ["Сайт або лендинг", "UX-аудит", "Customer journey"], mars: ["SMM / запуск", "Таргетована реклама", "Контент для просування"], jupiter: ["Аналіз ніші й конкурентів", "Маркетингова стратегія", "Стратегічна сесія"], saturn: ["Воронка продажів", "Web-аналітика", "CRO та оптимізація"], uranus: ["AI-автоматизація", "AI-процес для команди", "Digital sprint"], neptune: ["Сакральна консультаційна сесія", "Фокус уваги", "Відео / storytelling"], pluto: ["CRO-аудит", "A/B roadmap", "Перебудова конверсійного шляху"],
};
const CASES = {
  sun: "З розрізнених ідей — одне ядро без зайвого шуму.", mercury: "Замість випадкових текстів — точна мова всіх каналів.", venus: "Візуал перестає бути декором і робить цінність відчутною.", earth: "Стратегія стає реальним досвідом і зрозумілим маршрутом.", mars: "Дія запускається під конкретну мету й метрику.", jupiter: "Ширший контекст показує напрям росту замість копіювання.", saturn: "Процеси й аналітика роблять роботу повторюваною.", uranus: "AI прибирає рутину, залишаючи людині контроль.", neptune: "Образ поглиблює сенс замість створення туману.", pluto: "Змінюємо саму фрикцію та конструкцію шляху.",
};
const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

function BrandMark({ compact = false }) {
  return <span className={`qv-brand-mark ${compact ? "is-compact" : ""}`} aria-label="Quality Visuality">
    <svg viewBox="0 0 72 72" role="img" aria-hidden="true">
      <circle className="qv-ring qv-ring-one" cx="36" cy="36" r="25" />
      <circle className="qv-ring qv-ring-two" cx="36" cy="36" r="17" />
      <path className="qv-eye" d="M12 36c7-10 15-15 24-15s17 5 24 15c-7 10-15 15-24 15S19 46 12 36Z" />
      <circle className="qv-iris" cx="36" cy="36" r="7" />
      <circle className="qv-core" cx="36" cy="36" r="2.7" />
      <circle className="qv-element-dot dot-water" cx="36" cy="7" r="2.2" />
      <circle className="qv-element-dot dot-wood" cx="63" cy="27" r="2.2" />
      <circle className="qv-element-dot dot-fire" cx="53" cy="60" r="2.2" />
      <circle className="qv-element-dot dot-earth" cx="19" cy="60" r="2.2" />
      <circle className="qv-element-dot dot-metal" cx="9" cy="27" r="2.2" />
    </svg>
    {!compact && <span><b>QUALITY</b><em>VISUALITY</em></span>}
  </span>;
}

function CinematicJourney({ progress, playing, lang, onReplay, onToggle }) {
  const flyby = PLANETS.slice(1);
  const flyRatio = clamp((progress - 0.16) / 0.64);
  const rawIndex = Math.min(flyby.length - 1, Math.floor(flyRatio * flyby.length));
  const planet = progress >= 0.16 && progress < 0.8 ? flyby[rawIndex] : null;
  const segment = planet ? flyRatio * flyby.length - rawIndex : 0;
  const opacity = planet ? Math.sin(segment * Math.PI) : 0;
  const scale = 0.35 + Math.sin(segment * Math.PI) * 3.1;
  const isUa = lang === "ua";
  const intro = progress < 0.16;
  const finale = progress >= 0.8;
  return <div className="solar-cinema" aria-label={isUa ? "Шестисекундна кінематографічна подорож від темряви до світла" : "Six-second cinematic journey from darkness to light"}>
    <div className="cinema-galaxy" style={{ "--galaxy-scale": 0.36 + progress * 3.8, "--galaxy-opacity": Math.max(0, 1 - progress * 1.45) }} aria-hidden="true" />
    <div className="cinema-tunnel" style={{ "--cinema-progress": progress }} aria-hidden="true">{Array.from({ length: 24 }, (_, index) => <i key={index} style={{ "--i": index }} />)}</div>
    {planet && <div className="cinema-flyby" style={{ opacity, transform: `translate3d(${38 - segment * 76}vw, ${8 - Math.sin(segment * Math.PI) * 13}vh,0) translate(-50%,-50%) scale(${scale}) rotate(${segment * 18 - 8}deg)`, "--fly-color": planet.color }} aria-hidden="true"><img src={planet.image} alt="" />{planet.rings && <span className="cinema-rings" />}</div>}
    <div className={`cinema-caption ${finale ? "is-finale" : ""}`}>{finale && <BrandMark compact />}<span>{intro ? "00 · DARKNESS" : finale ? "QUALITY VISUALITY" : `${String(rawIndex + 1).padStart(2, "0")} · DEEP SPACE`}</span><strong>{intro ? (isUa ? "З тиші народжується напрям" : "Direction emerges from silence") : finale ? (isUa ? "Менше шуму. Більше ясності." : "Less noise. More clarity.") : (isUa ? planet?.name : planet?.en)}</strong><p>{intro ? (isUa ? "Чорний екран → зорі → галактика → світло" : "Black → stars → galaxy → light") : finale ? (isUa ? "Етичний маркетинг для людей, які створюють цінність людям" : "Ethical marketing for people who create value for people") : (isUa ? planet?.archetype : planet?.enArchetype)}</p></div>
    <div className="cinema-timeline" aria-label={isUa ? "Прогрес 6-секундного вступу" : "6-second intro progress"}><span style={{ width: `${progress * 100}%` }} /><b>{Math.min(6, Math.ceil(progress * 6))} / 6 SEC</b></div>
    <div className="cinema-controls"><button type="button" onClick={onToggle} aria-label={playing ? (isUa ? "Призупинити анімацію" : "Pause animation") : (isUa ? "Продовжити анімацію" : "Continue animation")}>{playing ? <Pause size={14} /> : <Play size={14} />}<span>{playing ? (isUa ? "ПАУЗА" : "PAUSE") : (isUa ? "ПРОДОВЖИТИ" : "CONTINUE")}</span></button><button type="button" onClick={onReplay} aria-label={isUa ? "Відтворити анімацію спочатку" : "Replay animation from the start"}><RotateCcw size={14} /><span>{isUa ? "З ПОЧАТКУ" : "REPLAY"}</span></button></div>
  </div>;
}

export default function SolarSystemHero({ lang = "ua", onIntroProgress }) {
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [runId, setRunId] = useState(0);
  const heroRef = useRef(null);
  const scrubReadyRef = useRef(false);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) { setProgress(1); setPlaying(false); return undefined; }
    if (!playing) return undefined;
    const startedAt = performance.now() - progress * CINEMATIC_DURATION;
    let raf;
    const tick = now => { const next = clamp((now - startedAt) / CINEMATIC_DURATION); setProgress(next); if (next >= 1) setPlaying(false); else raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, runId]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { onIntroProgress?.(progress); }, [progress, onIntroProgress]);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return undefined;
    let raf = 0;
    const update = () => {
      raf = 0;
      const node = heroRef.current;
      if (!node || (!scrubReadyRef.current && progress < .99)) return;
      const rect = node.getBoundingClientRect();
      const travel = Math.max(node.offsetHeight - window.innerHeight, 1);
      const scrollProgress = clamp(-rect.top / travel);
      if (scrollProgress > .72) scrubReadyRef.current = true;
      if (scrubReadyRef.current) setProgress(scrollProgress);
    };
    const requestUpdate = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => { if (raf) cancelAnimationFrame(raf); window.removeEventListener("scroll", requestUpdate); window.removeEventListener("resize", requestUpdate); };
  }, [progress]);

  const replay = () => { scrubReadyRef.current = false; setProgress(0); setPlaying(true); setRunId(value => value + 1); };
  return <section ref={heroRef} id="solar" className="cinematic-intro-section">
    <div className="cinematic-intro-sticky">
      <CinematicJourney progress={progress} playing={playing} lang={lang} onReplay={replay} onToggle={() => setPlaying(value => !value)} />
      <a href="#dao" className={`intro-next ${progress>.94?"is-visible":""}`}><span>{lang==="ua"?"LESS IS MORE":"LESS IS MORE"}</span><ArrowDown size={18}/></a>
    </div>
  </section>;
}

export { BrandMark, PLANETS, DETAILS, ELEMENT_META, OFFERS, CASES };
