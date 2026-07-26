'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function StatsCounter() {
  const containerRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0, 0]);

  const stats = [
    { target: 250, prefix: '$', suffix: 'M+', label: 'Invested Globally' },
    { target: 150, prefix: '', suffix: '+', label: 'Portfolio Companies' },
    { target: 35, prefix: '', suffix: '+', label: 'Countries Impacted' },
    { target: 10, prefix: '', suffix: 'K+', label: 'Angels & Partners' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasAnimated) {
        setHasAnimated(true);
        const duration = 2000;
        let startTimestamp = null;
        
        const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          
          // easeOutQuad
          const easeProgress = progress * (2 - progress);
          
          setCounts(stats.map(stat => Math.floor(easeProgress * stat.target)));
          
          if (progress < 1) {
            requestAnimationFrame(step);
          }
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <div className="stats-bar" style={{ background: '#080808', padding: '4rem 2rem', borderTop: '1px solid rgba(212,175,55,0.1)', borderBottom: '1px solid rgba(212,175,55,0.1)' }}>
      <div className="section-container" ref={containerRef} style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
          {stats.map((stat, i) => (
            <div key={i} className="stat-item">
              <div style={{ fontSize: '3rem', fontFamily: 'var(--font-outfit)', color: 'var(--gold)', fontWeight: 700, marginBottom: '0.5rem' }}>
                {stat.prefix}{counts[i]}{stat.suffix}
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '1rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
