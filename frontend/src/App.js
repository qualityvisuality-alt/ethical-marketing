import React, { useMemo, useRef, useState } from "react";
import "./App.css";
import { enhancedSource, photos, videos } from "./portfolioData";

const groups = {
  people: [2,3,5,6,7,8,9,10,11,12,13,14,15,16,21,22,23,24,25,26,28,35,36,38,39,40,41,43,47],
  travel: [1,4,17,18,19,27,42],
  conceptual: [20,37,44,45,46],
  nature: [29,30,31,32,33,34],
};

const copy = {
  ru: {
    name: "Александр Попович",
    lead: "Исследую эмоции и потребности в природной атмосфере с помощью объектива.",
    text1: "Люблю уличную фотографию за её непредвзятое отношение к тому, что происходит на улице и внутри человека.",
    text2: "Это портфолио собрано в разные периоды моей жизни — когда я был с камерой и когда был без неё. Эти фотографии не образец, а просто способ поделиться моим видением мира.",
    people: "Люди и портреты",
    travel: "Путешествия и пейзаж",
    conceptual: "Концептуальное и продакшн",
    nature: "Природа",
    food: "Фуд-съёмка",
    video: "Видео",
    peopleTitle: "Urban Bodies",
    travelTitle: "Travel & Landscape",
    conceptualTitle: "Conceptual & Production",
    natureTitle: "Nature — Golden Wetlands",
    natureBody: "Одна серия, один свет, один берег. Жёлто-золотые кадры собраны вместе и показаны в исходной последовательности.",
    foodTitle: "Food & Still Life",
    foodBody: "Серия с Cherrydeck будет добавляться здесь отдельным проектом без смешивания с портретами и пейзажами.",
    videoTitle: "Moving Image",
    contact: "Связаться",
  },
  ua: {
    name: "Олександр Попович",
    lead: "Досліджую емоції та потреби в природній атмосфері за допомогою об’єктива.",
    text1: "Люблю вуличну фотографію за її неупереджене ставлення до того, що відбувається на вулиці й усередині людини.",
    text2: "Це портфоліо зібране в різні періоди мого життя — коли я був із камерою і коли був без неї. Ці фотографії не взірець, а просто спосіб поділитися моїм баченням світу.",
    people: "Люди й портрети",
    travel: "Подорожі й пейзаж",
    conceptual: "Концептуальне й продакшн",
    nature: "Природа",
    food: "Фуд-зйомка",
    video: "Відео",
    peopleTitle: "Urban Bodies",
    travelTitle: "Travel & Landscape",
    conceptualTitle: "Conceptual & Production",
    natureTitle: "Nature — Golden Wetlands",
    natureBody: "Одна серія, одне світло, один берег. Жовто-золоті кадри зібрані разом і показані у вихідній послідовності.",
    foodTitle: "Food & Still Life",
    foodBody: "Серія з Cherrydeck буде додаватися тут окремим проєктом без змішування з портретами та пейзажами.",
    videoTitle: "Moving Image",
    contact: "Зв’язатися",
  },
  pl: {
    name: "Aleksandr Popovych",
    lead: "Badam emocje i potrzeby w naturalnej atmosferze za pomocą obiektywu.",
    text1: "Lubię fotografię uliczną za jej bezstronny stosunek do tego, co dzieje się na ulicy i wewnątrz człowieka.",
    text2: "To portfolio powstawało w różnych okresach mojego życia — kiedy miałem przy sobie aparat i kiedy go nie miałem. Te zdjęcia nie są wzorem, tylko sposobem dzielenia się moim widzeniem świata.",
    people: "Ludzie i portrety",
    travel: "Podróże i krajobraz",
    conceptual: "Koncept i produkcja",
    nature: "Natura",
    food: "Fotografia jedzenia",
    video: "Wideo",
    peopleTitle: "Urban Bodies",
    travelTitle: "Travel & Landscape",
    conceptualTitle: "Conceptual & Production",
    natureTitle: "Nature — Golden Wetlands",
    natureBody: "Jedna seria, jedno światło, jeden brzeg. Żółto-złote kadry są pokazane razem, w oryginalnym rytmie.",
    foodTitle: "Food & Still Life",
    foodBody: "Seria z Cherrydeck będzie umieszczona tutaj jako osobny projekt, bez mieszania jej z portretami i krajobrazami.",
    videoTitle: "Moving Image",
    contact: "Kontakt",
  },
  en: {
    name: "Aleksandr Popovych",
    lead: "I explore emotions and needs in a natural atmosphere through the lens.",
    text1: "I love street photography for its unbiased relationship with what happens in the street and inside a person.",
    text2: "This portfolio was gathered across different periods of my life — when I had a camera with me and when I did not. These photographs are not a standard to follow, only a way to share how I see the world.",
    people: "People & Lifestyle",
    travel: "Travel & Landscape",
    conceptual: "Conceptual & Production",
    nature: "Nature",
    food: "Food & Still Life",
    video: "Video",
    peopleTitle: "Urban Bodies",
    travelTitle: "Travel & Landscape",
    conceptualTitle: "Conceptual & Production",
    natureTitle: "Nature — Golden Wetlands",
    natureBody: "One series, one light, one shoreline. The yellow-gold frames are kept together and shown in their original rhythm.",
    foodTitle: "Food & Still Life",
    foodBody: "The Cherrydeck food series is reserved here as its own project, separate from portraits and landscapes.",
    videoTitle: "Moving Image",
    contact: "Contact",
  },
};

function getPhotos(ids) {
  return ids.map((id) => photos.find((p) => p.id === id)).filter(Boolean);
}

function Photo({ item, featured = false }) {
  const [src, setSrc] = useState(enhancedSource(item.src));
  return (
    <figure className={`still ${featured ? "featured" : ""} ${item.ratio || ""}`}>
      <img
        src={src}
        alt={item.alt}
        loading={featured ? "eager" : "lazy"}
        decoding="async"
        draggable="false"
        onError={() => setSrc(item.src)}
      />
    </figure>
  );
}

function Gallery({ items, className = "" }) {
  return (
    <div className={`gallery ${className}`}>
      {items.map((item, index) => (
        <Photo key={item.id} item={item} featured={index < 2 && item.kind === "featured"} />
      ))}
    </div>
  );
}

function VideoCard({ video, index }) {
  const frameRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [poster, setPoster] = useState(`https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`);

  const send = (func) => {
    const target = frameRef.current?.contentWindow;
    if (!target) return;
    target.postMessage(JSON.stringify({ event: "command", func, args: [] }), "*");
  };

  const togglePlay = () => {
    if (!mounted) {
      setMounted(true);
      setPlaying(true);
      window.setTimeout(() => send("playVideo"), 650);
      return;
    }
    send(playing ? "pauseVideo" : "playVideo");
    setPlaying((value) => !value);
  };

  const src = useMemo(() => {
    const origin = typeof window !== "undefined" ? encodeURIComponent(window.location.origin) : "";
    return `https://www.youtube-nocookie.com/embed/${video.id}?enablejsapi=1&controls=0&disablekb=1&fs=0&iv_load_policy=3&playsinline=1&rel=0&modestbranding=1&origin=${origin}`;
  }, [video.id]);

  return (
    <article className="video-card">
      <div className="video-stage">
        {!mounted && <img src={poster} alt="" aria-hidden="true" onError={() => setPoster(`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`)} />}
        {mounted && <iframe ref={frameRef} src={src} title={video.title} allow="autoplay; encrypted-media; picture-in-picture" tabIndex="-1" />}
        <button onClick={togglePlay} aria-label={playing ? "Pause video" : "Play video"}>{playing ? "Ⅱ" : "▶"}</button>
        <span>0{index + 1}</span>
      </div>
      <div className="video-meta"><h3>{video.title}</h3><p>{video.meta}</p></div>
    </article>
  );
}

function Section({ id, eyebrow, title, children, body, pale = false }) {
  return (
    <section id={id} className={`series ${pale ? "pale" : ""}`}>
      <div className="series-head">
        <p>{eyebrow}</p>
        <h2>{title}</h2>
        {body && <div className="series-copy">{body}</div>}
      </div>
      {children}
    </section>
  );
}

export default function App() {
  const [lang, setLang] = useState("ru");
  const t = copy[lang];
  const people = getPhotos(groups.people);
  const travel = getPhotos(groups.travel);
  const conceptual = getPhotos(groups.conceptual);
  const nature = getPhotos(groups.nature);

  return (
    <main className="portfolio-site" id="top">
      <header className="topbar">
        <a href="#top" className="mark">AP</a>
        <nav><a href="#people">PHOTO</a><a href="#video">VIDEO</a></nav>
        <div className="languages" aria-label="Language switcher">
          {["en","ru","ua","pl"].map((code) => <button className={lang === code ? "active" : ""} key={code} onClick={() => setLang(code)}>{code.toUpperCase()}</button>)}
        </div>
      </header>

      <section className="hero-text">
        <p className="hero-kicker">PHOTO · VIDEO · OBSERVATION</p>
        <h1>{t.name}</h1>
        <div className="manifesto">
          <p className="manifesto-lead">{t.lead}</p>
          <p>{t.text1}</p>
          <p>{t.text2}</p>
        </div>
      </section>

      <nav className="category-strip" aria-label="Portfolio sections">
        <a href="#people">{t.people}</a>
        <a href="#travel">{t.travel}</a>
        <a href="#conceptual">{t.conceptual}</a>
        <a href="#nature">{t.nature}</a>
        <a href="#food">{t.food}</a>
        <a href="#video">{t.video}</a>
      </nav>

      <Section id="people" eyebrow="01 / PEOPLE" title={t.peopleTitle}>
        <Gallery items={people} className="people-gallery" />
      </Section>

      <Section id="travel" eyebrow="02 / TRAVEL" title={t.travelTitle} pale>
        <Gallery items={travel} className="travel-gallery" />
      </Section>

      <Section id="conceptual" eyebrow="03 / CONCEPT" title={t.conceptualTitle}>
        <Gallery items={conceptual} className="concept-gallery" />
      </Section>

      <Section id="nature" eyebrow="04 / PROJECT" title={t.natureTitle} body={<p>{t.natureBody}</p>} pale>
        <Gallery items={nature} className="nature-gallery" />
      </Section>

      <Section id="food" eyebrow="05 / PROJECT" title={t.foodTitle} body={<p>{t.foodBody}</p>}>
        <div className="food-reserved" aria-label="Food project placeholder"><span>FOOD & STILL LIFE</span><span>CHERRYDECK SERIES</span></div>
      </Section>

      <section id="video" className="video-section">
        <div className="series-head"><p>06 / VIDEO</p><h2>{t.videoTitle}</h2></div>
        <div className="video-list">{videos.map((video, index) => <VideoCard key={video.id} video={video} index={index} />)}</div>
      </section>

      <footer>
        <span>{t.name}</span>
        <a href="mailto:qualityvisuality@gmail.com">{t.contact} ↗</a>
        <a href="#top">↑ TOP</a>
      </footer>
    </main>
  );
}
