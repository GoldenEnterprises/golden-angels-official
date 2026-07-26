'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function MissionSection() {
  const sectionRef = useRef(null);
  const pRefs = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (pRefs.current.length > 0) {
      gsap.fromTo(pRefs.current, 
        { opacity: 0, y: 40 },
        {
          opacity: 1, 
          y: 0, 
          stagger: 0.3,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      );
    }
    
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section className="mission-section" ref={sectionRef} style={{ padding: '6rem 2rem', background: 'var(--bg-obsidian)', position: 'relative', zIndex: 10 }}>
      <div className="section-container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <div className="section-label" style={{ color: 'var(--gold)', letterSpacing: '2px', marginBottom: '2rem', fontSize: '0.9rem' }}>● OUR PURPOSE</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', fontSize: '1.5rem', lineHeight: '1.6', fontFamily: 'var(--font-inter)', color: 'white' }}>
          <p ref={el => pRefs.current[0] = el} style={{ margin: 0 }}>
            We invest in visionary people and transformative ideas that create lasting impact and generational wealth.
          </p>
          <p ref={el => pRefs.current[1] = el} style={{ margin: 0 }}>
            Golden Angels is more than an investment network. We are a movement of creators, innovators, and changemakers.
          </p>
          <p ref={el => pRefs.current[2] = el} style={{ margin: 0 }}>
            Building a future of <span className="mission-highlight" style={{ color: 'var(--gold)', fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}>abundance, freedom, and purpose</span>.
          </p>
        </div>
      </div>
    </section>
  );
}
