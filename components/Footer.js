'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer className="site-footer" style={{ background: '#030303', padding: '4rem 2rem 2rem 2rem', borderTop: '1px solid #1a1a1a' }}>
      <div className="section-container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
              <img src="/Golden Angels_LOGO.png" alt="GA" style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--gold-border)' }} />
              <h3 style={{ color: 'var(--gold)', fontFamily: 'var(--font-display)', fontSize: '1.3rem', margin: 0, letterSpacing: '2px' }}>GOLDEN ANGELS</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '0.88rem', maxWidth: '400px' }}>
              A prestigious division of Golden Enterprises, dedicated to guarding vision with divine care and funding the future of human potential.
            </p>
            <p style={{ color: 'var(--gold)', fontStyle: 'italic', fontSize: '0.85rem', marginTop: '12px', fontFamily: 'var(--font-accent)' }}>
              "Guarding Vision with Divine Care"
            </p>
          </div>
          
          <div className="footer-col">
            <h4 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '0.95rem', letterSpacing: '1px' }}>Company</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <a href="/about" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.88rem', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--gold)'} onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>About</a>
              <a href="/portfolio" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.88rem', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--gold)'} onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>Portfolio</a>
              <a href="/news" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.88rem', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--gold)'} onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>News</a>
              <a href="/contact" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.88rem', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--gold)'} onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>Careers</a>
            </div>
          </div>
          
          <div className="footer-col">
            <h4 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '0.95rem', letterSpacing: '1px' }}>Invest</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <a href="/portfolio" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.88rem', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--gold)'} onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>Opportunities</a>
              <a href="/portfolio" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.88rem', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--gold)'} onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>Portfolio</a>
              <a href="/impact" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.88rem', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--gold)'} onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>Impact</a>
              <a href="/contact" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.88rem', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--gold)'} onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>FAQ</a>
            </div>
          </div>
          
          <div className="footer-col">
            <h4 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '0.95rem', letterSpacing: '1px' }}>Connect</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <a href="/contact" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.88rem', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--gold)'} onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>Contact</a>
              <a href="/news" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.88rem', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--gold)'} onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>Community</a>
              <a href="/news" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.88rem', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--gold)'} onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>Events</a>
              <a href="/contact" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.88rem', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--gold)'} onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>Newsletter</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom" style={{ borderTop: '1px solid #1a1a1a', paddingTop: '2rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.78rem', letterSpacing: '0.5px' }}>
          <span>© 2026 Golden Angels. A Division of Golden Enterprises.</span>
          <div style={{ display: 'flex', gap: '24px' }}>
            <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
            <span style={{ cursor: 'pointer' }}>Terms of Service</span>
            <span>All Rights Reserved</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
