'use client';
import { useState, useEffect, useRef } from 'react';
import { AuthProvider, useAuth } from '../../components/AuthProvider';
import Navbar from '../../components/Navbar';
import AuthModal from '../../components/AuthModal';
import LoggedInLayout from '../../components/LoggedInLayout';
import Footer from '../../components/Footer';
import { Target, Globe, Users, Heart, Award, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function PageContent() {
  const { user, logout } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState('signin');
  const cardsRef = useRef(null);

  useEffect(() => {
    if (cardsRef.current) {
      const cards = cardsRef.current.children;
      gsap.fromTo(cards, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.1, 
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%'
          }
        }
      );
    }
  }, []);

  const pageContent = (
    <>
      <section className="section-container" style={{ textAlign: 'center', paddingTop: '100px' }}>
        <h1 className="section-title"><span className="gold-text">About Golden Angels</span></h1>
        <p className="section-desc">Pioneering the future of investment through a global ecosystem of excellence, innovation, and impact.</p>
      </section>

      <section className="section-container">
        <div className="glass-card" style={{ padding: '3rem' }}>
          <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Our Story</h2>
          <p className="section-desc">Born from the vision of Golden Enterprises, Golden Angels is an exclusive collective of visionaries, operators, and capital providers. We don't just invest; we build ecosystems. Our platform connects disruptive startups with the capital, expertise, and network required to scale globally.</p>
        </div>
      </section>

      <section className="section-container">
        <h2 className="section-title" style={{ fontSize: '1.8rem', textAlign: 'center', marginBottom: '2rem' }}>Core Values</h2>
        <div ref={cardsRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}><Target size={40} className="gold-text" style={{ margin: '0 auto 1rem' }} /><h3>Precision</h3><p style={{ color: 'var(--text-secondary)' }}>Data-driven decisions for maximum alpha.</p></div>
          <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}><Globe size={40} className="gold-text" style={{ margin: '0 auto 1rem' }} /><h3>Global Reach</h3><p style={{ color: 'var(--text-secondary)' }}>Operating across continents seamlessly.</p></div>
          <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}><Users size={40} className="gold-text" style={{ margin: '0 auto 1rem' }} /><h3>Collective Genius</h3><p style={{ color: 'var(--text-secondary)' }}>Harnessing the network of experts.</p></div>
          <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}><Heart size={40} className="gold-text" style={{ margin: '0 auto 1rem' }} /><h3>Impact First</h3><p style={{ color: 'var(--text-secondary)' }}>Investing in a sustainable future.</p></div>
          <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}><Award size={40} className="gold-text" style={{ margin: '0 auto 1rem' }} /><h3>Excellence</h3><p style={{ color: 'var(--text-secondary)' }}>Uncompromising standards.</p></div>
          <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}><Sparkles size={40} className="gold-text" style={{ margin: '0 auto 1rem' }} /><h3>Innovation</h3><p style={{ color: 'var(--text-secondary)' }}>Backing the bleeding edge.</p></div>
        </div>
      </section>

      <section className="section-container">
        <h2 className="section-title" style={{ fontSize: '1.8rem', textAlign: 'center', marginBottom: '2rem' }}>Our Journey</h2>
        <div style={{ position: 'relative', paddingLeft: '2rem', borderLeft: '2px solid rgba(255, 215, 0, 0.2)' }}>
          {[
            { year: '2020', title: 'The Inception', desc: 'Golden Enterprises establishes the angel syndicate.' },
            { year: '2022', title: 'Global Expansion', desc: 'Opened offices in London, Dubai, and Singapore.' },
            { year: '2024', title: 'The Billion Dollar Milestone', desc: 'Crossed $1B in AUM with top-quartile returns.' },
            { year: '2026', title: 'The Next Frontier', desc: 'Launching the unified investment platform.' }
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: '2rem', position: 'relative' }}>
              <div style={{ position: 'absolute', left: '-2.45rem', top: '0.2rem', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--gold)' }}></div>
              <h3 className="gold-text" style={{ marginBottom: '0.5rem' }}>{item.year}: {item.title}</h3>
              <p style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
      
      <section className="section-container">
        <div className="dash-cards" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div className="dash-card" style={{ flex: '1 1 150px', textAlign: 'center' }}><h3 className="gold-text" style={{ fontSize: '2rem' }}>$1.2B</h3><p>AUM</p></div>
          <div className="dash-card" style={{ flex: '1 1 150px', textAlign: 'center' }}><h3 className="gold-text" style={{ fontSize: '2rem' }}>150+</h3><p>Portfolio Cos</p></div>
          <div className="dash-card" style={{ flex: '1 1 150px', textAlign: 'center' }}><h3 className="gold-text" style={{ fontSize: '2rem' }}>23</h3><p>Successful Exits</p></div>
          <div className="dash-card" style={{ flex: '1 1 150px', textAlign: 'center' }}><h3 className="gold-text" style={{ fontSize: '2rem' }}>3,500+</h3><p>Members</p></div>
          <div className="dash-card" style={{ flex: '1 1 150px', textAlign: 'center' }}><h3 className="gold-text" style={{ fontSize: '2rem' }}>4.2x</h3><p>Avg Return</p></div>
        </div>
      </section>

      <section className="section-container" style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 className="section-title">Ready to shape the future?</h2>
        <p className="section-desc" style={{ marginBottom: '2rem' }}>Join the exclusive network of visionaries.</p>
        <button className="btn-gold" style={{ padding: '0.75rem 2rem', fontSize: '1.1rem' }} onClick={() => { setAuthTab('signup'); setAuthOpen(true); }}>Apply to Join</button>
      </section>
    </>
  );

  if (user) return <LoggedInLayout>{pageContent}</LoggedInLayout>;
  return (
    <>
      <Navbar onAuthClick={() => { setAuthTab('signin'); setAuthOpen(true); }} onSignupClick={() => { setAuthTab('signup'); setAuthOpen(true); }} user={user} onLogout={logout} />
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} initialTab={authTab} />
      <main style={{ paddingTop: 'var(--nav-height)' }}>{pageContent}<Footer /></main>
    </>
  );
}
export default function Page() { return <AuthProvider><PageContent /></AuthProvider>; }
