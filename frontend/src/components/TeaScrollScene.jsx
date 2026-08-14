import React, { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, Volume2, VolumeX } from "lucide-react";
import teaScene from "../assets/tea-scroll-scene.webp";
import { ambient } from "../lib/audio";
import "./ScrollCinematics.css";

const clamp = value => Math.min(1, Math.max(0, value));

export default function TeaScrollScene({ lang = "ua" }) {
  const rootRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [soundOn, setSoundOn] = useState(false);
  const isUa = lang === "ua";
  const complete = progress >= 0.78;

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const node = rootRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const travel = Math.max(node.offsetHeight - window.innerHeight, 1);
      setProgress(clamp(-rect.top / travel));
    };
    const requestUpdate = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  useEffect(() => () => {
    if (ambient.current === "tea") ambient.stop();
  }, []);

  useEffect(() => {
    if (progress > 0.985 && soundOn) {
      ambient.stop();
      setSoundOn(false);
    }
  }, [progress, soundOn]);

  const sceneStyle = useMemo(() => {
    const fill = clamp((progress - 0.28) / 0.4);
    const streamIn = clamp((progress - 0.22) / 0.12);
    const streamOut = 1 - clamp((progress - 0.7) / 0.1);
    const textChange = clamp((progress - 0.74) / 0.12);
    return {
      "--tea-progress": progress,
      "--tea-zoom": 1.025 + progress * 0.018,
      "--tea-fill": fill,
      "--tea-steam-opacity": 0.16 + fill * 0.58,
      "--tea-stream": streamIn * streamOut,
      "--tea-copy-change": textChange,
    };
  }, [progress]);

  const toggleSound = () => {
    if (progress > 0.985) return;
    const next = !soundOn;
    setSoundOn(next);
    if (next) {
      ambient.toggle(true);
      ambient.play("tea");
    } else {
      ambient.stop();
    }
  };

  return <div ref={rootRef} className={`tea-scroll-chapter ${complete ? "is-complete" : ""}`} style={sceneStyle}>
    <div className="tea-scroll-sticky">
      <div className="tea-scroll-frame">
        <img className="tea-scroll-photo" src={teaScene} alt={isUa ? "Рука з ісинським чайником над третьою чашкою на круглому чабані з візерунком Квітка життя" : "Hand holding a Yixing teapot above the third cup on a round Flower of Life tea tray"} />
        <div className="tea-scroll-grade" aria-hidden="true" />
        <span className="tea-scroll-stream" aria-hidden="true"><i /></span>
        <span className="tea-scroll-fill" aria-hidden="true"><i /><b /></span>
        <span className="tea-scroll-steam steam-one" aria-hidden="true" />
        <span className="tea-scroll-steam steam-two" aria-hidden="true" />

        <div className="tea-scroll-copy" aria-live="polite">
          <div className="tea-copy-state tea-copy-before" aria-hidden={complete}>
            <span>功夫茶 · GONGFU CHA · WATER</span>
            <strong>{isUa ? "Наступний пролив починається з уваги" : "The next pour begins with attention"}</strong>
            <p>{isUa ? "Гортай повільно: чай наповнить третю чашку разом із рухом сторінки." : "Scroll slowly: the tea fills the third cup with the movement of the page."}</p>
          </div>
          <div className="tea-copy-state tea-copy-after" aria-hidden={!complete}>
            <span>下一泡 · NEXT CYCLE · WATER</span>
            <strong>{isUa ? "Чаша наповнена. Сенс переходить у новий цикл." : "The cup is full. Meaning enters a new cycle."}</strong>
            <p>{isUa ? "Нові дані повертають нас до Води — вже на іншій глибині." : "New information returns us to Water — at a different depth."}</p>
            <a href="#clarity" tabIndex={complete ? 0 : -1}><ArrowDown size={15} />{isUa ? "Далі — знайти свою точку" : "Next — find your starting point"}</a>
          </div>
        </div>

        <button type="button" className="tea-sound-control" onClick={toggleSound} aria-pressed={soundOn} disabled={progress > 0.985}>
          {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
          <span>{soundOn ? (isUa ? "ЗВУК ЧАЮ + AUM 936 HZ" : "TEA + AUM 936 HZ ON") : (isUa ? "УВІМКНУТИ ЧАЙ + AUM 936 HZ" : "ENABLE TEA + AUM 936 HZ")}</span>
        </button>
        <div className="tea-scroll-meter" aria-hidden="true"><span style={{ height: `${progress * 100}%` }} /><b>SCROLL · POUR</b></div>
      </div>
    </div>
  </div>;
}
