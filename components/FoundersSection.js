'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function FoundersSection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (cardsRef.current.length > 0) {
      gsap.fromTo(cardsRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      );
    }
    
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  const founders = [
    { name: 'Vision AI Labs', role: 'Artificial Intelligence', image: '/vision-ai-labs.jpg' },
    { name: 'BioNova Labs', role: 'Biotechnology', image: '/bionova-labs.jpg' },
    { name: 'Solaris Grid', role: 'Clean Energy', image: '/solaris-grid.jpg' }
  ];

  return (
    <section className="founders-section" ref={sectionRef} style={{ padding: '6rem 2rem', background: '#080808' }}>
      <div className="section-container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-label" style={{ color: 'var(--gold)', letterSpacing: '2px', marginBottom: '1rem', fontSize: '0.9rem' }}>● FOUNDERS & INNOVATORS</div>
          <h2 className="section-title" style={{ fontSize: '2.5rem', fontFamily: 'var(--font-outfit)', margin: '0 0 1rem 0', color: 'white' }}>Backing the Bold</h2>
          <p className="section-desc" style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
            We partner with visionary founders who are redefining the boundaries of what is possible.
          </p>
        </div>
        
        <div className="founders-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {founders.map((founder, i) => (
            <div key={i} className="founder-card" ref={el => cardsRef.current[i] = el} style={{ background: '#0e0e0e', border: '1px solid #1a1a1a', borderRadius: '16px', overflow: 'hidden', transition: 'all 0.3s', cursor: 'pointer' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.5)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = '#1a1a1a'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{ height: '240px', position: 'relative', overflow: 'hidden' }}>
                <img src={founder.image} alt={founder.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                  onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)' }} />
              </div>
              <div style={{ padding: '1.5rem 2rem', textAlign: 'center' }}>
                <h3 className="founder-name" style={{ margin: '0 0 0.5rem 0', fontFamily: 'var(--font-outfit)', fontSize: '1.5rem', color: 'white' }}>{founder.name}</h3>
                <p className="founder-role" style={{ color: 'var(--gold)', margin: 0, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{founder.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
