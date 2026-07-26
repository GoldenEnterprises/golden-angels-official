'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function EcosystemSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(sectionRef.current, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
    });
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section className="ecosystem-section" ref={sectionRef} style={{ padding: '120px 24px', background: 'var(--bg-obsidian)' }}>
      <div className="section-container" style={{ textAlign: 'center' }}>
        <div className="section-label" style={{ justifyContent: 'center' }}>● THE ECOSYSTEM</div>
        <h2 className="section-title" style={{ marginBottom: '16px' }}>One Vision. Infinite Potential.</h2>
        <p className="section-desc" style={{ maxWidth: '600px', margin: '0 auto 48px' }}>
          Golden Angels is the catalyst within the interconnected Golden Enterprises ecosystem, accelerating innovation across every frontier.
        </p>
        <div style={{ maxWidth: '900px', margin: '0 auto', borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--gold-border)', boxShadow: '0 0 60px var(--gold-muted)' }}>
          <img src="/ecosystem.png" alt="Golden Enterprises Ecosystem — Golden A.I., Golden Life, Golden Robotics, Golden Health, Golden Tech, Golden Security, Golden Energy, Golden Ventures, Golden Space" style={{ width: '100%', height: 'auto', display: 'block' }} />
        </div>
      </div>
    </section>
  );
}
