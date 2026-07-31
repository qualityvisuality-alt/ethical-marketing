// Self-contained Web Audio ambient engine. No external files.
// Each element gets a synthesized soundscape. Starts on user gesture (element click).

export class AmbientAudio {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.active = [];
    this.timers = [];
    this.current = null;
    this.enabled = true;
    this._noiseCache = {};
  }

  _ensure() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0;
      this.master.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();
  }

  _noise(type = 'white') {
    if (this._noiseCache[type]) return this._noiseCache[type];
    const len = this.ctx.sampleRate * 2;
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const d = buf.getChannelData(0);
    if (type === 'brown') {
      let last = 0;
      for (let i = 0; i < len; i++) {
        const w = Math.random() * 2 - 1;
        last = (last + 0.02 * w) / 1.02;
        d[i] = last * 3.5;
      }
    } else if (type === 'pink') {
      let b0=0,b1=0,b2=0;
      for (let i=0;i<len;i++){
        const w=Math.random()*2-1;
        b0=0.99765*b0+w*0.0990460; b1=0.96300*b1+w*0.2965164; b2=0.57000*b2+w*1.0526913;
        d[i]=(b0+b1+b2+w*0.1848)*0.15;
      }
    } else {
      for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    }
    this._noiseCache[type] = buf;
    return buf;
  }

  _src(type) {
    const s = this.ctx.createBufferSource();
    s.buffer = this._noise(type);
    s.loop = true;
    s.start();
    this.active.push(s);
    return s;
  }

  _reg(node) { this.active.push(node); return node; }

  // ---- element builders ----
  _water(out) {
    const s = this._src('white');
    const lp = this.ctx.createBiquadFilter();
    lp.type = 'lowpass'; lp.frequency.value = 480; lp.Q.value = 0.6;
    const g = this.ctx.createGain(); g.gain.value = 0.9;
    const lfo = this.ctx.createOscillator(); const lfoG = this.ctx.createGain();
    lfo.frequency.value = 0.15; lfoG.gain.value = 180; lfo.connect(lfoG); lfoG.connect(lp.frequency); lfo.start();
    s.connect(lp); lp.connect(g); g.connect(out);
    this._reg(lfo); this._reg(lfoG);
    // occasional drips
    const drip = () => {
      if (this.current !== 'water') return;
      const o = this.ctx.createOscillator(); const dg = this.ctx.createGain();
      o.type = 'sine'; o.frequency.setValueAtTime(900 + Math.random()*500, this.ctx.currentTime);
      o.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.12);
      dg.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      dg.gain.exponentialRampToValueAtTime(0.12, this.ctx.currentTime + 0.01);
      dg.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.25);
      o.connect(dg); dg.connect(out); o.start(); o.stop(this.ctx.currentTime + 0.3);
    };
    this.timers.push(setInterval(drip, 1400));
  }

  _fire(out) {
    // Warm fire roar (brown noise body)
    const s = this._src('brown');
    const lp = this.ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 700; lp.Q.value = 0.7;
    const g = this.ctx.createGain(); g.gain.value = 0.6;
    // slow roar swell
    const lfo = this.ctx.createOscillator(); const lg = this.ctx.createGain();
    lfo.frequency.value = 0.25; lg.gain.value = 0.18; lfo.connect(lg); lg.connect(g.gain); lfo.start();
    s.connect(lp); lp.connect(g); g.connect(out);
    this._reg(lfo); this._reg(lg);
    // airy hiss layer
    const s2 = this._src('white');
    const bp = this.ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 1600; bp.Q.value = 0.5;
    const g2 = this.ctx.createGain(); g2.gain.value = 0.06;
    s2.connect(bp); bp.connect(g2); g2.connect(out);
    // crackle / pops
    const crackle = () => {
      if (this.current !== 'fire') return;
      const cs = this.ctx.createBufferSource(); cs.buffer = this._noise('white');
      const hp = this.ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 2500;
      const cg = this.ctx.createGain();
      const peak = 0.28 + Math.random() * 0.35;
      cg.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      cg.gain.exponentialRampToValueAtTime(peak, this.ctx.currentTime + 0.004);
      cg.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.06);
      cs.connect(hp); hp.connect(cg); cg.connect(out); cs.start(); cs.stop(this.ctx.currentTime + 0.08);
    };
    this.timers.push(setInterval(() => { for (let i = 0; i < Math.ceil(Math.random() * 4); i++) crackle(); }, 200));
  }

  _forest(out) {
    const s = this._src('pink');
    const bp = this.ctx.createBiquadFilter(); bp.type='bandpass'; bp.frequency.value = 700; bp.Q.value = 0.4;
    const g = this.ctx.createGain(); g.gain.value = 0.5;
    const lfo = this.ctx.createOscillator(); const lg = this.ctx.createGain();
    lfo.frequency.value = 0.08; lg.gain.value = 300; lfo.connect(lg); lg.connect(bp.frequency); lfo.start();
    s.connect(bp); bp.connect(g); g.connect(out); this._reg(lfo); this._reg(lg);
    const chirp = () => {
      if (this.current !== 'wood') return;
      const n = 2 + Math.floor(Math.random()*3);
      for (let i=0;i<n;i++){
        const t = this.ctx.currentTime + i*0.09;
        const o = this.ctx.createOscillator(); const cg = this.ctx.createGain();
        o.type='sine'; const base = 2200 + Math.random()*1400;
        o.frequency.setValueAtTime(base, t);
        o.frequency.exponentialRampToValueAtTime(base*1.4, t+0.05);
        cg.gain.setValueAtTime(0.0001, t);
        cg.gain.exponentialRampToValueAtTime(0.09, t+0.02);
        cg.gain.exponentialRampToValueAtTime(0.0001, t+0.09);
        o.connect(cg); cg.connect(out); o.start(t); o.stop(t+0.12);
      }
    };
    this.timers.push(setInterval(() => { if (Math.random() > 0.4) chirp(); }, 2600));
  }

  _earth(out) {
    // grounding low drone with 3-6-9 harmonic hint
    const freqs = [72, 108, 144];
    freqs.forEach((f, i) => {
      const o = this.ctx.createOscillator(); const g = this.ctx.createGain();
      o.type = 'sine'; o.frequency.value = f;
      g.gain.value = i === 0 ? 0.28 : 0.08 / i;
      const lfo = this.ctx.createOscillator(); const lg = this.ctx.createGain();
      lfo.frequency.value = 0.06 + i*0.02; lg.gain.value = g.gain.value * 0.6;
      lfo.connect(lg); lg.connect(g.gain); lfo.start();
      o.connect(g); g.connect(out); o.start();
      this._reg(o); this._reg(g); this._reg(lfo); this._reg(lg);
    });
  }

  _metal(out) {
    // Handpan (hang) tuned around 1111 Hz fundamental
    const strike = () => {
      if (this.current !== 'metal') return;
      const t = this.ctx.currentTime;
      const bases = [1111, 1111 * 0.75, 1111 * 1.5, 1111 * 0.5];
      const base = bases[Math.floor(Math.random() * bases.length)];
      const partials = [1, 2, 3.01];
      partials.forEach((p, idx) => {
        const o = this.ctx.createOscillator(); const g = this.ctx.createGain();
        o.type = 'sine'; o.frequency.value = base * p;
        const peak = 0.16 / (idx + 1);
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(peak, t + 0.008);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 3.0);
        o.connect(g); g.connect(out); o.start(t); o.stop(t + 3.1);
      });
    };
    // low warm sustain (fundamental / 4)
    const o = this.ctx.createOscillator(); const g = this.ctx.createGain();
    o.type = 'sine'; o.frequency.value = 1111 / 4; g.gain.value = 0.05;
    o.connect(g); g.connect(out); o.start(); this._reg(o); this._reg(g);
    strike();
    this.timers.push(setInterval(strike, 2600));
  }

  _cosmos(out) {
    const freqs = [130.81, 196.0, 261.63];
    freqs.forEach((f, i) => {
      const o = this.ctx.createOscillator(); const g = this.ctx.createGain();
      o.type = 'sine'; o.frequency.value = f; g.gain.value = 0.12 / (i + 1);
      const det = this.ctx.createOscillator(); const dg = this.ctx.createGain();
      det.type = 'sine'; det.frequency.value = f * 1.006; dg.gain.value = 0.06 / (i + 1);
      o.connect(g); g.connect(out); det.connect(dg); dg.connect(out);
      o.start(); det.start(); this._reg(o); this._reg(g); this._reg(det); this._reg(dg);
    });
    const shimmer = () => {
      if (this.current !== 'brand') return;
      const t = this.ctx.currentTime;
      const o = this.ctx.createOscillator(); const g = this.ctx.createGain();
      o.type = 'sine'; o.frequency.value = 1046 + Math.random() * 500;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.06, t + 0.4);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 3);
      o.connect(g); g.connect(out); o.start(t); o.stop(t + 3.1);
    };
    this.timers.push(setInterval(shimmer, 3400));
  }

  play(element) {
    if (!this.enabled) return;
    this._ensure();
    this.stop(true);
    this.current = element;
    const bus = this.ctx.createGain(); bus.gain.value = 1; bus.connect(this.master); this._reg(bus);
    const map = { water: '_water', fire: '_fire', wood: '_forest', earth: '_earth', metal: '_metal', brand: '_cosmos' };
    const fn = map[element];
    if (fn) this[fn](bus);
    const target = element === 'earth' ? 0.5 : element === 'brand' ? 0.3 : 0.32;
    this.master.gain.cancelScheduledValues(this.ctx.currentTime);
    this.master.gain.setValueAtTime(Math.max(0.0001, this.master.gain.value), this.ctx.currentTime);
    this.master.gain.linearRampToValueAtTime(target, this.ctx.currentTime + 0.6);
  }

  stop(immediate = false) {
    this.timers.forEach(clearInterval); this.timers = [];
    if (this.ctx && this.master) {
      this.master.gain.cancelScheduledValues(this.ctx.currentTime);
      this.master.gain.setValueAtTime(this.master.gain.value, this.ctx.currentTime);
      this.master.gain.linearRampToValueAtTime(0, this.ctx.currentTime + (immediate ? 0.05 : 0.4));
    }
    const toStop = this.active; this.active = [];
    const delay = immediate ? 80 : 450;
    setTimeout(() => {
      toStop.forEach(n => { try { n.stop && n.stop(); } catch(e){} try { n.disconnect && n.disconnect(); } catch(e){} });
    }, delay);
    if (immediate) this.current = null;
  }

  toggle(v) { this.enabled = v; if (!v) this.stop(); }
}

export const ambient = new AmbientAudio();
