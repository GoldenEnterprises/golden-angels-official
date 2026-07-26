'use client';

import React, { useEffect, useRef } from 'react';
import { TrendingUp, Shield, Zap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function InvestmentSection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (cardsRef.current.length > 0) {
      gsap.fromTo(cardsRef.current,
        { opacity: 0, y: 50 },
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

  return (
    <section className="invest-section" ref={sectionRef} style={{ padding: '6rem 2rem', background: 'var(--bg-obsidian)' }}>
      <div className="section-container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-label" style={{ color: 'var(--gold)', letterSpacing: '2px', marginBottom: '1rem', fontSize: '0.9rem' }}>● INVESTMENT THESIS</div>
          <h2 className="section-title" style={{ fontSize: '2.5rem', fontFamily: 'var(--font-outfit)', margin: '0 0 1rem 0', color: 'white' }}>The Opportunity</h2>
          <p className="section-desc" style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
            Access an exclusive pipeline of high-growth ventures backed by the global reach of Golden Enterprises.
          </p>
        </div>
        
        <div className="invest-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {[
            { icon: TrendingUp, title: 'Exponential Growth', desc: 'Access an exclusive pipeline of curated high-growth ventures.' },
            { icon: Shield, title: 'De-risked Innovation', desc: 'Co-investing with Golden Enterprises to minimize downside risk.' },
            { icon: Zap, title: 'Founder Empowerment', desc: 'Providing mentorship and ecosystem resources for unfair advantages.' }
          ].map((item, i) => (
            <div key={i} className="glass-card invest-card" ref={el => cardsRef.current[i] = el} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,175,55,0.1)', padding: '2.5rem', borderRadius: '16px', backdropFilter: 'blur(10px)', transition: 'transform 0.3s' }}>
              <div className="invest-card-icon" style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(212,175,55,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--gold)' }}>
                <item.icon size={24} />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-outfit)', marginBottom: '1rem', color: 'white' }}>{item.title}</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
