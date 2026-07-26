'use client';
import { useState } from 'react';
import { AuthProvider, useAuth } from '../../components/AuthProvider';
import Navbar from '../../components/Navbar';
import AuthModal from '../../components/AuthModal';
import LoggedInLayout from '../../components/LoggedInLayout';
import Footer from '../../components/Footer';
import { Globe, TreePine, GraduationCap, HeartPulse, Lightbulb, Users } from 'lucide-react';

function PageContent() {
  const { user, logout } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState('signin');

  const pageContent = (
    <>
      <section className="section-container" style={{ textAlign: 'center', paddingTop: '100px' }}>
        <h1 className="section-title"><span className="gold-text">Measuring What Matters</span></h1>
        <p className="section-desc">Our commitment to generating measurable social and environmental impact alongside financial returns.</p>
      </section>

      <section className="section-container" style={{ display: 'flex', justifyContent: 'center', marginBottom: '4rem' }}>
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', maxWidth: '400px', width: '100%', boxShadow: '0 0 40px rgba(255, 215, 0, 0.15)', border: '1px solid rgba(255,215,0,0.3)' }}>
          <h2 style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Overall Impact Score</h2>
          <div style={{ fontSize: '5rem', fontWeight: 'bold', color: 'var(--gold)', textShadow: '0 0 20px rgba(255, 215, 0, 0.4)', lineHeight: 1 }}>94</div>
          <div style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>/ 100</div>
          <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>Audited by Global Impact Verify</p>
        </div>
      </section>

      <section className="section-container">
        <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '2rem' }}>Core Impact Areas</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {[
            { icon: Globe, title: 'Climate Action', stat: '2.5M+', desc: 'Tons of CO2 mitigated annually', color: '#4ade80' },
            { icon: HeartPulse, title: 'Global Health', stat: '15M+', desc: 'Lives positively impacted', color: '#f87171' },
            { icon: GraduationCap, title: 'Education', stat: '500k', desc: 'Students with improved access', color: '#60a5fa' },
            { icon: Users, title: 'Inclusion', stat: '45%', desc: 'Diverse founder representation', color: '#c084fc' },
            { icon: TreePine, title: 'Biodiversity', stat: '120k', desc: 'Hectares of land preserved', color: '#22c55e' },
            { icon: Lightbulb, title: 'Innovation', stat: '40+', desc: 'Breakthrough patents filed', color: '#fbbf24' }
          ].map((item, idx) => (
            <div key={idx} className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div style={{ padding: '1rem', background: `rgba(255,255,255,0.05)`, borderRadius: '12px', marginBottom: '1.5rem' }}>
                <item.icon size={32} color={item.color} />
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>{item.title}</h3>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--gold)', marginBottom: '0.5rem' }}>{item.stat}</div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-container">
        <div className="glass-card" style={{ padding: '2.5rem' }}>
          <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '2rem', textAlign: 'center' }}>UN Sustainable Development Goals (SDGs) Progress</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              { goal: 'SDG 3: Good Health & Well-being', progress: 85 },
              { goal: 'SDG 4: Quality Education', progress: 70 },
              { goal: 'SDG 7: Affordable & Clean Energy', progress: 92 },
              { goal: 'SDG 9: Industry, Innovation & Infrastructure', progress: 88 },
              { goal: 'SDG 13: Climate Action', progress: 95 }
            ].map((item, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                  <span>{item.goal}</span><span className="gold-text">{item.progress}%</span>
                </div>
                <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '5px', overflow: 'hidden' }}>
                  <div style={{ width: `${item.progress}%`, height: '100%', background: 'linear-gradient(90deg, rgba(255,215,0,0.5), var(--gold))', borderRadius: '5px' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-container" style={{ textAlign: 'center', marginBottom: '4rem', marginTop: '4rem' }}>
        <h2 className="section-title">Deep Dive into Our Impact</h2>
        <p className="section-desc" style={{ marginBottom: '2rem' }}>Download our comprehensive 2025 Impact Report.</p>
        <button className="btn-outline" style={{ padding: '0.75rem 2rem', fontSize: '1.1rem' }}>Download Report (PDF)</button>
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
