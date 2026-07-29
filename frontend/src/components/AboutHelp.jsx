import React from "react";
import { GraduationCap, Briefcase, Brain, Film, Sparkles, PersonStanding, Headphones, Award, Check, Compass, Users, Send, Mail } from "lucide-react";
import portrait from "../assets/portrait.png";

const ICO = { GraduationCap, Briefcase, Brain, Film, Sparkles, PersonStanding, Headphones, Award };

export default function AboutHelp({ about, help, ui, email }) {
  return (
    <section id="about" className="relative py-20 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_360px_1fr] gap-8 items-start">
          {/* About */}
          <div className="reveal">
            <h2 className="font-label tracking-[0.14em] gold-gradient-text mb-6" style={{ fontSize: 22 }}>{ui.aboutTitle}</h2>
            <ul className="space-y-4">
              {about.map((a, i) => {
                const Icon = ICO[a.icon] || Sparkles;
                return (
                  <li key={i} className="flex gap-3">
                    <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: "rgba(230,198,122,0.08)", border: "1px solid rgba(230,198,122,0.28)" }}>
                      <Icon size={16} className="text-gold" />
                    </div>
                    <p className="font-body text-[13px] leading-relaxed text-dim pt-1">{a.text}</p>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Portrait */}
          <div className="reveal order-first lg:order-none">
            <div className="relative anim-float">
              <div className="absolute -inset-3 rounded-2xl" style={{ background: "radial-gradient(circle, rgba(230,198,122,0.22), transparent 70%)" }} />
              <div className="relative rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(230,198,122,0.35)", boxShadow: "0 20px 60px rgba(0,0,0,0.6)" }}>
                <img src={portrait} alt="Ethical marketing specialist" className="w-full block" />
              </div>
            </div>
          </div>

          {/* Help */}
          <div className="reveal">
            <h2 className="font-label tracking-[0.14em] gold-gradient-text mb-6" style={{ fontSize: 22 }}>{ui.helpTitle}</h2>
            <ul className="space-y-4">
              {help.map((h, i) => (
                <li key={i} className="flex gap-3">
                  <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5" style={{ background: "rgba(230,198,122,0.12)", border: "1px solid rgba(230,198,122,0.4)" }}>
                    <Check size={13} className="text-gold" />
                  </div>
                  <p className="font-body text-[13px] leading-relaxed text-dim">{h}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* North star + neighbors */}
        <div className="grid md:grid-cols-2 gap-5 mt-14">
          <div className="panel p-6 reveal flex gap-4 items-start">
            <Compass size={26} className="text-gold flex-shrink-0 mt-1" />
            <p className="font-body text-sm leading-relaxed text-dim">{ui.northStar}</p>
          </div>
          <div className="panel p-6 reveal flex gap-4 items-start">
            <Users size={26} className="text-gold flex-shrink-0 mt-1" />
            <div>
              <div className="font-label tracking-widest text-gold text-xs mb-2">{ui.neighborsTitle}</div>
              <p className="font-body text-sm leading-relaxed text-dim">{ui.neighbors}</p>
            </div>
          </div>
        </div>

        {/* CTA contact */}
        <div id="contact" className="panel panel-glow mt-6 p-8 md:p-10 text-center reveal relative overflow-hidden">
          <div className="absolute inset-0 opacity-40" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(230,198,122,0.15), transparent 60%)" }} />
          <div className="relative">
            <Send size={30} className="text-gold mx-auto mb-4" />
            <h3 className="font-display gold-gradient-text mb-2" style={{ fontSize: "clamp(22px,3.4vw,34px)", fontWeight: 800 }}>{ui.ctaTitle}</h3>
            <p className="font-body text-dim mb-6">{ui.ctaText}</p>
            <a href={`mailto:${email}`} className="btn-gold inline-flex items-center gap-2 px-7 py-3.5">
              <Mail size={18} /> {email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
