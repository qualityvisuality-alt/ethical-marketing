import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { Globe2, ChevronDown } from "lucide-react";
import { ELEMENTS, STAGES, TOOLS, ABOUT, HELP, UI, CONTACT_EMAIL, METHOD, ENRICH, FLOW } from "./mock";
import ElementWheel from "./components/ElementWheel";
import ElementModal from "./components/ElementModal";
import Stages from "./components/Stages";
import Tools from "./components/Tools";
import AboutHelp from "./components/AboutHelp";

function Starfield() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current, ctx = c.getContext("2d");
    let w, h, stars, raf, dpr = Math.min(window.devicePixelRatio || 1, 2);
    const init = () => {
      w = c.width = window.innerWidth * dpr; h = c.height = window.innerHeight * dpr;
      c.style.width = window.innerWidth + "px"; c.style.height = window.innerHeight + "px";
      stars = Array.from({ length: 160 }, () => ({
        x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.4 * dpr + 0.2,
        a: Math.random(), s: Math.random() * 0.02 + 0.003, g: Math.random() > 0.85,
      }));
    };
    init();
    window.addEventListener("resize", init);
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      stars.forEach((st) => {
        st.a += st.s; const al = (Math.sin(st.a) + 1) / 2;
        ctx.globalAlpha = 0.2 + al * 0.8;
        ctx.fillStyle = st.g ? "#e6c67a" : "#dfe6f2";
        if (st.g) { ctx.shadowColor = "#e6c67a"; ctx.shadowBlur = 6 * dpr; }
        ctx.beginPath(); ctx.arc(st.x, st.y, st.r, 0, 6.283); ctx.fill();
        ctx.shadowBlur = 0;
      });
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", init); };
  }, []);
  return <canvas ref={ref} className="starfield" />;
}

function App() {
  const [lang, setLang] = useState("ua");
  const [selected, setSelected] = useState(null);
  const ui = UI[lang];
  const elements = ELEMENTS[lang].map((e) => ({ ...e, ...(ENRICH[lang][e.id] || {}) }));
  const method = { ...METHOD[lang], ...(ENRICH[lang].brand || {}) };

  // scroll reveal
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [lang]);

  const nav = [
    { id: "elements", label: ui.navElements },
    { id: "stages", label: ui.navStages },
    { id: "tools", label: ui.navTools },
    { id: "about", label: ui.navAbout },
    { id: "contact", label: ui.navContact },
  ];

  return (
    <div className="App">
      <div className="cosmic-bg" />
      <Starfield />

      {/* Header */}
      <header className="sticky top-0 z-40" style={{ background: "rgba(5,7,15,0.55)", backdropFilter: "blur(10px)", borderBottom: "1px solid rgba(230,198,122,0.14)" }}>
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <a href="#top" className="font-display gold-gradient-text" style={{ fontSize: 20, fontWeight: 800 }}>Quality Visuality</a>
          <nav className="hidden md:flex items-center gap-7">
            {nav.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="font-label text-[13px] tracking-widest text-dim hover:text-gold transition-colors">{n.label}</a>
            ))}
          </nav>
          <button onClick={() => setLang(lang === "ua" ? "en" : "ua")} className="btn-ghost px-3 py-1.5 flex items-center gap-2 text-sm font-label">
            <Globe2 size={15} /> {lang === "ua" ? "EN" : "UA"}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative pt-14 pb-10 px-5">
        <div id="elements" className="max-w-6xl mx-auto">
          <div className="text-center mb-8 reveal">
            <div className="font-label tracking-[0.2em] text-dim mb-2" style={{ fontSize: "clamp(13px,2vw,18px)" }}>{ui.heroKicker}</div>
            <h1 className="font-display gold-gradient-text" style={{ fontSize: "clamp(52px,11vw,140px)", fontWeight: 900, lineHeight: 0.92, letterSpacing: "0.01em" }}>{ui.heroTitle}</h1>
            <div className="gold-rule my-5 mx-auto" style={{ maxWidth: 420 }} />
            <p className="font-label tracking-[0.14em] text-dim uppercase" style={{ fontSize: "clamp(12px,1.7vw,17px)" }}>{ui.heroSub}</p>
          </div>

          <div className="reveal">
            <ElementWheel elements={elements} method={method} ui={ui} onSelect={setSelected} />
          </div>

          <div className="flex justify-center mt-6 reveal">
            <a href="#stages" className="flex flex-col items-center gap-1 text-dim hover:text-gold transition-colors">
              <span className="font-label text-[11px] tracking-widest">{ui.exploreBtn}</span>
              <ChevronDown size={18} className="animate-bounce" />
            </a>
          </div>
        </div>
      </section>

      <div className="gold-rule max-w-4xl mx-auto" />

      <Stages stages={STAGES[lang]} title={ui.stagesTitle} flow={FLOW[lang]} />
      <div className="gold-rule max-w-4xl mx-auto" />
      <Tools tools={TOOLS[lang]} title={ui.toolsTitle} />
      <div className="gold-rule max-w-4xl mx-auto" />
      <AboutHelp about={ABOUT[lang]} help={HELP[lang]} ui={ui} email={CONTACT_EMAIL} />

      {/* Footer */}
      <footer className="relative py-10 px-5 mt-6" style={{ borderTop: "1px solid rgba(230,198,122,0.16)" }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
          {ui.footer.map((f, i) => (
            <React.Fragment key={i}>
              <span className="font-label tracking-[0.14em] text-dim text-[12px] md:text-[13px]">{f}</span>
              {i < ui.footer.length - 1 && <span className="diamond hidden md:block" />}
            </React.Fragment>
          ))}
        </div>
        <div className="text-center mt-6 font-body text-[11px] text-dim opacity-60">© {new Date().getFullYear()} Quality Visuality · {CONTACT_EMAIL}</div>
      </footer>

      {selected && <ElementModal element={selected} ui={ui} onClose={() => setSelected(null)} />}
    </div>
  );
}

export default App;
