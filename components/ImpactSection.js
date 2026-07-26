'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ImpactSection() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.fromTo(gridRef.current.children,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      }
    );
    
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section className="impact-section" ref={sectionRef} style={{ padding: '6rem 2rem', background: 'var(--bg-obsidian)' }}>
      <div className="section-container" style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <div className="section-label" style={{ color: 'var(--gold)', letterSpacing: '2px', marginBottom: '1rem', fontSize: '0.9rem' }}>● GLOBAL IMPACT</div>
        <h2 className="section-title" style={{ fontSize: '2.5rem', fontFamily: 'var(--font-outfit)', margin: '0 0 4rem 0', color: 'white' }}>Measuring What Matters</h2>
        
        <div className="stats-grid" ref={gridRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          {[
            { value: '$250M+', label: 'Capital Deployed' },
            { value: '150+', label: 'Ventures Funded' },
            { value: '35+', label: 'Nations Reached' },
            { value: '94/100', label: 'Impact Score' }
          ].map((stat, i) => (
            <div key={i} className="stat-item" style={{ padding: '2rem', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', background: 'rgba(255,255,255,0.02)' }}>
              <div style={{ fontSize: '3rem', fontFamily: 'var(--font-outfit)', color: 'white', fontWeight: 700, marginBottom: '0.5rem' }}>{stat.value}</div>
              <div style={{ color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
