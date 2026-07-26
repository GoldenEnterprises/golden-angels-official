'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { LayoutDashboard, Shield, LogOut, User } from 'lucide-react';

export default function Navbar({ onAuthClick, onSignupClick, user, onLogout }) {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleJoin = () => { if (onSignupClick) onSignupClick(); else if (onAuthClick) onAuthClick(); };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <a className="nav-logo" href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <img src="/Golden Angels_LOGO.png" alt="Golden Angels" style={{ height: '38px', width: '38px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--gold-border)' }} />
        <span className="gold-text" style={{ fontSize: '1.05rem', letterSpacing: '2px', fontWeight: 700 }}>GOLDEN ANGELS</span>
      </a>

      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/portfolio">Portfolio</a>
        <a href="/impact">Impact</a>
        <a href="/news">News</a>
        <a href="/contact">Contact</a>
      </div>

      <div className="nav-cta" ref={dropdownRef} style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '12px' }}>
        {!user ? (
          <>
            <button className="btn-outline" onClick={onAuthClick} style={{ padding: '8px 20px', fontSize: '0.8rem', borderRadius: '8px' }}>
              Sign In
            </button>
            <button className="btn-gold" onClick={handleJoin} style={{ padding: '8px 20px', fontSize: '0.8rem' }}>
              Join the Movement
            </button>
          </>
        ) : (
          <>
            <button className="profile-trigger" onClick={() => setDropdownOpen(!dropdownOpen)}>
              {(user.displayName || user.email || 'U')[0].toUpperCase()}
            </button>
            <div className={`profile-dropdown ${dropdownOpen ? 'open' : ''}`}>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)', marginBottom: '4px' }}>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{user.displayName}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>{user.email}</div>
                <div style={{ marginTop: '4px' }}><span className={`role-badge ${user.role}`} style={{ fontSize: '0.65rem' }}>{user.role}</span></div>
              </div>
              <button className="dropdown-item" onClick={() => { setDropdownOpen(false); router.push(`/profile/${user.uid}`); }}>
                <User size={16} /> My Profile
              </button>
              <button className="dropdown-item" onClick={() => { setDropdownOpen(false); router.push('/dashboard'); }}>
                <LayoutDashboard size={16} /> Dashboard
              </button>
              {user.role === 'admin' && (
                <button className="dropdown-item admin" onClick={() => { setDropdownOpen(false); router.push('/admin'); }}>
                  <Shield size={16} /> Admin Dashboard
                </button>
              )}
              <div className="dropdown-divider" />
              <button className="dropdown-item" onClick={() => { setDropdownOpen(false); onLogout(); }}>
                <LogOut size={16} /> Sign Out
              </button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
