import React, { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import { enhancedSource, photos, videos } from "./portfolioData";

const featuredIds = [10, 3, 7, 15, 8, 11, 16, 14, 13, 42, 47, 4];
const storyOne = [21, 22, 23, 24, 25, 26, 28, 38, 39, 40];
const storyTwo = [17, 18, 19, 27, 29, 30, 31, 32, 33, 34, 35, 36, 43];
const archiveIds = [1, 2, 5, 6, 37, 41, 44, 45, 46];

function getPhotos(ids) {
  return ids.map((id) => photos.find((p) => p.id === id)).filter(Boolean);
}

function Photo({ item, className = "", eager = false }) {
  const [src, setSrc] = useState(enhancedSource(item.src));
  const original = item.src;

  return (
    <figure className={`photo ${item.ratio || ""} ${className}`}>
      <img
        src={src}
        alt={item.alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        onError={() => {
          if (src !== original) setSrc(original);
        }}
      />
    </figure>
  );
}

function VideoCard({ video, index }) {
  const frameRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
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
    if (playing) send("pauseVideo");
    else send("playVideo");
    setPlaying((v) => !v);
  };

  const toggleMute = () => {
    send(muted ? "unMute" : "mute");
    setMuted((v) => !v);
  };

  const src = useMemo(() => {
    const origin = typeof window !== "undefined" ? encodeURIComponent(window.location.origin) : "";
    return `https://www.youtube-nocookie.com/embed/${video.id}?enablejsapi=1&controls=0&disablekb=1&fs=0&iv_load_policy=3&playsinline=1&rel=0&modestbranding=1&origin=${origin}`;
  }, [video.id]);

  return (
    <article className="video-card">
      <div className="video-stage">
        {!mounted && (
          <img
            className="video-poster"
            src={poster}
            alt=""
            aria-hidden="true"
            onError={() => setPoster(`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`)}
          />
        )}
        {mounted && (
          <iframe
            ref={frameRef}
            className="video-frame"
            src={src}
            title={video.title}
            allow="autoplay; encrypted-media; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            loading="lazy"
            tabIndex="-1"
          />
        )}
        <div className="video-shade" aria-hidden="true" />
        <button className="video-play" onClick={togglePlay} aria-label={playing ? "Pause video" : "Play video"}>
          <span>{playing ? "Ⅱ" : "▶"}</span>
        </button>
        {mounted && (
          <button className="video-mute" onClick={toggleMute} aria-label={muted ? "Unmute video" : "Mute video"}>
            {muted ? "MUTED" : "SOUND"}
          </button>
        )}
        <span className="video-index">0{index + 1}</span>
      </div>
      <div className="video-meta">
        <h3>{video.title}</h3>
        <p>{video.meta}</p>
      </div>
    </article>
  );
}

function SectionTitle({ index, kicker, title, body }) {
  return (
    <div className="section-title">
      <span className="section-index">{index}</span>
      <div>
        <p className="kicker">{kicker}</p>
        <h2>{title}</h2>
        {body && <p className="section-copy">{body}</p>}
      </div>
    </div>
  );
}

export default function App() {
  const [lightbox, setLightbox] = useState(null);
  const featured = getPhotos(featuredIds);
  const people = getPhotos(storyOne);
  const places = getPhotos(storyTwo);
  const archive = getPhotos(archiveIds);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <main className="portfolio-site" id="top">
      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="Back to top">OH</a>
        <nav aria-label="Portfolio navigation">
          <a href="#photo">PHOTO</a>
          <a href="#video">VIDEO</a>
          <a href="#about">ABOUT</a>
        </nav>
        <a className="contact-link" href="mailto:qualityvisuality@gmail.com">CONTACT</a>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">VISUAL PORTFOLIO · PHOTO / VIDEO / CONTENT</p>
          <h1>Oleksandr<br />Hulevych</h1>
          <div className="hero-bottom-copy">
            <p>Observation, atmosphere and human presence — from quiet landscape to staged production.</p>
            <a href="#photo">VIEW SELECTED WORK <span>↓</span></a>
          </div>
        </div>

        <div className="hero-grid" aria-label="Selected photography">
          {[featured[0], featured[1], featured[2], featured[3]].map((item, i) => (
            <button key={item.id} className={`hero-tile tile-${i + 1}`} onClick={() => setLightbox(item)} aria-label={`Open photo: ${item.alt}`}>
              <Photo item={item} eager />
            </button>
          ))}
          <div className="hero-stamp">SELECTED<br />WORK</div>
        </div>
      </section>

      <section className="intro-line" aria-label="Portfolio summary">
        <span>PEOPLE & LIFESTYLE</span>
        <span>TRAVEL & LANDSCAPE</span>
        <span>CONCEPTUAL & PRODUCTION</span>
        <span>VIDEO</span>
      </section>

      <section className="work-section" id="photo">
        <SectionTitle
          index="01"
          kicker="SELECTED PHOTOGRAPHY"
          title="Light, movement, people."
          body="A curated sequence from the available archive. Stronger source files are shown large; older low-resolution frames are kept in compact sets instead of being stretched beyond their texture."
        />

        <div className="featured-masonry">
          {featured.slice(4).map((item, index) => (
            <button key={item.id} className={`masonry-item m-${index + 1}`} onClick={() => setLightbox(item)} aria-label={`Open photo: ${item.alt}`}>
              <Photo item={item} />
            </button>
          ))}
        </div>
      </section>

      <section className="story-section">
        <div className="story-head">
          <span>STORY / 01</span>
          <h2>Urban bodies</h2>
          <p>Editorial frames built around gesture, architecture and distance.</p>
        </div>
        <div className="story-grid people-grid">
          {people.map((item, index) => (
            <button key={item.id} className={`story-item story-${index + 1}`} onClick={() => setLightbox(item)} aria-label={`Open photo: ${item.alt}`}>
              <Photo item={item} />
            </button>
          ))}
        </div>
      </section>

      <section className="story-section pale">
        <div className="story-head dark-text">
          <span>STORY / 02</span>
          <h2>Roads & stillness</h2>
          <p>Landscape, forest and city fragments — less spectacle, more attention.</p>
        </div>
        <div className="story-grid places-grid">
          {places.map((item, index) => (
            <button key={item.id} className={`story-item place-${index + 1}`} onClick={() => setLightbox(item)} aria-label={`Open photo: ${item.alt}`}>
              <Photo item={item} />
            </button>
          ))}
        </div>
      </section>

      <section className="archive-section">
        <SectionTitle
          index="02"
          kicker="EARLY / LOW-RES ARCHIVE"
          title="Contact sheets, not fake pixels."
          body="These frames come from small Cherrydeck / Instagram derivatives. I keep them as four-up studies so they remain visually honest and still work as part of the portfolio rhythm."
        />
        <div className="contact-sheets">
          {[archive.slice(0, 4), archive.slice(4, 8), archive.slice(8)].map((group, gi) => (
            <div className={`contact-sheet ${group.length === 1 ? "single" : ""}`} key={gi}>
              {group.map((item) => (
                <button key={item.id} onClick={() => setLightbox(item)} aria-label={`Open photo: ${item.alt}`}>
                  <Photo item={item} />
                </button>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="video-section" id="video">
        <SectionTitle
          index="03"
          kicker="MOVING IMAGE"
          title="Five pieces. One page."
          body="The videos play inside the portfolio through a custom player layer. The embedded YouTube frame does not accept pointer input, so clicking the image cannot send the viewer away to YouTube."
        />
        <div className="video-list">
          {videos.map((video, index) => <VideoCard key={video.id} video={video} index={index} />)}
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="about-label">ABOUT</div>
        <div className="about-copy">
          <h2>I work where image, attention and communication meet.</h2>
          <p>I studied cinema and TV camera work and developed through photography, video and real-world service work. Now I’m building that visual background into content and community work for mission-driven projects — without inventing clients, numbers or a louder identity than the work itself.</p>
          <div className="about-tags">
            <span>Photography</span><span>Video</span><span>Short-form content</span><span>Community support</span><span>Ethical communication</span>
          </div>
        </div>
        <div className="about-cta">
          <p>Available for selected collaborations and junior content / community roles.</p>
          <a href="mailto:qualityvisuality@gmail.com">qualityvisuality@gmail.com ↗</a>
        </div>
      </section>

      <footer>
        <span>OLEKSANDR HULEVYCH</span>
        <span>PHOTO · VIDEO · CONTENT</span>
        <a href="#top">BACK TO TOP ↑</a>
      </footer>

      {lightbox && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close photo">CLOSE ×</button>
          <img src={enhancedSource(lightbox.src)} alt={lightbox.alt} onError={(event) => { event.currentTarget.src = lightbox.src; }} />
        </div>
      )}
    </main>
  );
}
