'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function CallToAction() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(sectionRef.current, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
    });
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section ref={sectionRef} className="cta-section" style={{ padding: '120px 24px', background: 'linear-gradient(180deg, var(--bg-void) 0%, #0a0800 100%)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient glow */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, var(--gold-muted) 0%, transparent 70%)', pointerEvents: 'none' }} />
      
      <div className="section-container" style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
        <div style={{ fontSize: '0.75rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '20px' }}>✦ THE INVITATION ✦</div>
        <h2 className="cta-title" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontFamily: 'var(--font-display)', margin: '0 0 20px 0', lineHeight: 1.1 }}>
          Join the <span className="gold-text">future of innovation.</span>
        </h2>
        <p className="cta-desc" style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '48px', lineHeight: '1.7', maxWidth: '600px', margin: '0 auto 48px' }}>
          Whether you are a visionary founder building the next paradigm or an investor seeking exclusive opportunities, the Golden Angels network welcomes you.
        </p>
        
        <div className="cta-buttons" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
          <a href="/portfolio" className="btn-gold" style={{ padding: '14px 32px', fontSize: '0.95rem' }}>Become an Angel Investor</a>
          <a href="/contact" className="btn-outline" style={{ padding: '14px 32px', fontSize: '0.95rem' }}>Submit Your Startup</a>
          <a href="/portfolio" className="btn-outline" style={{ padding: '14px 32px', fontSize: '0.95rem' }}>Explore Opportunities</a>
          <a href="/contact" className="btn-outline" style={{ padding: '14px 32px', fontSize: '0.95rem' }}>Contact Golden Angels</a>
        </div>
      </div>
    </section>
  );
}
