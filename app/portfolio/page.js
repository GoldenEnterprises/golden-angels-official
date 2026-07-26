'use client';
import { useState, useRef } from 'react';
import { AuthProvider, useAuth } from '../../components/AuthProvider';
import Navbar from '../../components/Navbar';
import AuthModal from '../../components/AuthModal';
import LoggedInLayout from '../../components/LoggedInLayout';
import Footer from '../../components/Footer';
import { Play, AlignLeft, AlignCenter, AlignRight, Maximize2, X, ChevronRight, ChevronLeft, ExternalLink, TrendingUp, Cpu, HeartPulse, Leaf, Rocket, GraduationCap, ShieldCheck } from 'lucide-react';

function LoggedInExplore() {
  const [videoModal, setVideoModal] = useState(null);
  const [filter, setFilter] = useState('All');
  const sliderRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const campaigns = [
    {
      title: 'NeuroFlow AI V2',
      desc: 'Next-generation brain-computer interfaces for mass consumer adoption. Revolutionizing how humans interact with technology.',
      raised: '$4.2M', goal: '$5M', progress: 84,
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200',
      align: 'left'
    },
    {
      title: 'Solaris Orbital',
      desc: 'Space-based solar power beaming energy directly to Earth grids. Clean, unlimited energy from beyond the atmosphere.',
      raised: '$12.5M', goal: '$20M', progress: 62,
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200',
      align: 'center'
    },
    {
      title: 'BioNova Longevity',
      desc: 'Cellular reprogramming therapies targeting age-related diseases. Extending healthy human lifespan by decades.',
      raised: '$8.9M', goal: '$10M', progress: 89,
      image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=1200',
      align: 'right'
    },
    {
      title: 'EduSphere VR',
      desc: 'Immersive virtual reality classrooms partnering with Ivy League universities to democratize world-class education.',
      raised: '$1.8M', goal: '$2M', progress: 90,
      image: 'https://images.unsplash.com/photo-1531297172864-45d0b4352b5f?auto=format&fit=crop&q=80&w=1200',
      align: 'left'
    },
    {
      title: 'QuantumVault',
      desc: 'Quantum-resistant encryption hardware protecting enterprise data from next-gen computational threats.',
      raised: '$3.1M', goal: '$8M', progress: 39,
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200',
      align: 'center'
    }
  ];

  const companies = [
    { name: 'NeuroFlow AI', sector: 'AI & Data', icon: Cpu, desc: 'Advanced neural interfaces for cognitive enhancement and next-gen human-computer interaction.', tag: 'AI & Data', growth: '+142%' },
    { name: 'BioNova Labs', sector: 'Health & Bio', icon: HeartPulse, desc: 'Next-gen longevity therapeutics and CRISPR-based gene therapy for rare diseases.', tag: 'Health & Bio', growth: '+234%' },
    { name: 'Solaris Grid', sector: 'Climate Tech', icon: Leaf, desc: 'Decentralized sustainable energy networks enabling peer-to-peer solar trading.', tag: 'Climate Tech', growth: '+89%' },
    { name: 'EduSphere', sector: 'EdTech', icon: GraduationCap, desc: 'Immersive VR learning platforms partnering with top universities worldwide.', tag: 'EdTech', growth: '+156%' },
    { name: 'QuantumVault', sector: 'Cybersecurity', icon: ShieldCheck, desc: 'Quantum-resistant cryptographic solutions for enterprise data protection.', tag: 'Cybersecurity', growth: '+67%' },
    { name: 'Aether Space', sector: 'Space Tech', icon: Rocket, desc: 'Orbital logistics and autonomous debris management for sustainable space.', tag: 'Space Tech', growth: '+312%' },
  ];

  const videos = [
    { title: 'The Future of BCI', author: 'Dr. Sarah Chen', time: '2h ago', img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400' },
    { title: 'Q3 Market Analysis', author: 'Marcus Williams', time: '5h ago', img: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=400' },
    { title: 'Founder Interview', author: 'GA Media', time: '1d ago', img: 'https://images.unsplash.com/photo-1614729939124-03290b55c9ce?auto=format&fit=crop&q=80&w=400' },
    { title: 'Longevity Deep Dive', author: 'Elena Vasquez', time: '2d ago', img: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=400' },
    { title: 'Seed vs Series A', author: 'Investor Relations', time: '3d ago', img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32b7?auto=format&fit=crop&q=80&w=400' },
    { title: 'Tech Trends 2027', author: 'Research Team', time: '4d ago', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400' },
    { title: 'Portfolio Update', author: 'Admin', time: '1w ago', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400' },
    { title: 'Pitching Tips', author: 'Mentorship', time: '1w ago', img: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=400' }
  ];

  const filtered = filter === 'All' ? companies : companies.filter(c => c.tag === filter);

  const scrollSlider = (dir) => {
    const newIdx = dir === 'next' ? Math.min(activeSlide + 1, campaigns.length - 1) : Math.max(activeSlide - 1, 0);
    setActiveSlide(newIdx);
    if (sliderRef.current) {
      const card = sliderRef.current.children[newIdx];
      if (card) card.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    }
  };

  return (
    <div style={{ display: 'flex', height: '100%', gap: '0' }}>
      {/* LEFT: Main Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
        
        {/* ═══ FEATURED PROJECTS HORIZONTAL SLIDER ═══ */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '1.4rem', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
              ✦ <span className="gold-text">Featured Projects</span>
            </h2>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => scrollSlider('prev')} disabled={activeSlide === 0} style={{ width: '36px', height: '36px', borderRadius: '50%', background: activeSlide === 0 ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', color: activeSlide === 0 ? 'var(--text-muted)' : 'white', cursor: activeSlide === 0 ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ChevronLeft size={18} />
              </button>
              <button onClick={() => scrollSlider('next')} disabled={activeSlide === campaigns.length - 1} style={{ width: '36px', height: '36px', borderRadius: '50%', background: activeSlide === campaigns.length - 1 ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', color: activeSlide === campaigns.length - 1 ? 'var(--text-muted)' : 'white', cursor: activeSlide === campaigns.length - 1 ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div ref={sliderRef} style={{ display: 'flex', gap: '20px', overflowX: 'auto', scrollSnapType: 'x mandatory', scrollBehavior: 'smooth', paddingBottom: '12px', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
            {campaigns.map((camp, idx) => (
              <div key={idx} style={{ minWidth: '100%', scrollSnapAlign: 'start', position: 'relative', height: '380px', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', flexShrink: 0 }}>
                <img src={camp.image} alt={camp.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.1) 100%)' }} />
                
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px', textAlign: camp.align, display: 'flex', flexDirection: 'column', alignItems: camp.align === 'left' ? 'flex-start' : camp.align === 'right' ? 'flex-end' : 'center' }}>
                  <h3 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '2px' }}>{camp.title}</h3>
                  <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.8)', marginBottom: '20px', maxWidth: '550px' }}>{camp.desc}</p>
                  
                  <div style={{ width: '100%', maxWidth: '380px', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 600 }}>
                      <span className="gold-text">{camp.raised} Raised</span>
                      <span>{camp.progress}% of {camp.goal}</span>
                    </div>
                    <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.2)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${camp.progress}%`, height: '100%', background: 'linear-gradient(90deg, var(--gold-dark), var(--gold-bright))', borderRadius: '3px' }} />
                    </div>
                  </div>
                  
                  <button className="btn-gold" style={{ padding: '10px 24px' }}>Learn More <ChevronRight size={16} /></button>
                </div>
              </div>
            ))}
          </div>

          {/* Slider dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '16px' }}>
            {campaigns.map((_, idx) => (
              <button key={idx} onClick={() => { setActiveSlide(idx); sliderRef.current?.children[idx]?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' }); }} style={{ width: activeSlide === idx ? '24px' : '8px', height: '8px', borderRadius: '4px', background: activeSlide === idx ? 'var(--gold)' : 'rgba(255,255,255,0.2)', border: 'none', cursor: 'pointer', transition: 'all 0.3s' }} />
            ))}
          </div>
        </div>

        {/* ═══ PORTFOLIO STATS ═══ */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '40px' }}>
          {[
            { icon: TrendingUp, value: '$250M+', label: 'Capital Deployed' },
            { icon: Cpu, value: '150+', label: 'Active Investments' },
            { icon: Rocket, value: '4.2x', label: 'Average Return' },
            { icon: ExternalLink, value: '23', label: 'Successful Exits' }
          ].map((stat, idx) => (
            <div key={idx} className="glass-card" style={{ padding: '20px', textAlign: 'center' }}>
              <stat.icon className="gold-text" size={24} style={{ marginBottom: '8px' }} />
              <h3 className="gold-text" style={{ fontSize: '1.8rem', margin: '4px 0' }}>{stat.value}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0 }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* ═══ SECTOR ALLOCATION ═══ */}
        <div className="glass-card" style={{ padding: '24px', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Sector Allocation</h2>
          {[
            { name: 'AI & Data', pct: 35 }, { name: 'Health & Bio', pct: 20 },
            { name: 'Climate Tech', pct: 15 }, { name: 'Other Frontiers', pct: 30 }
          ].map((s, i) => (
            <div key={i} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '0.88rem' }}><span>{s.name}</span><span>{s.pct}%</span></div>
              <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px' }}>
                <div style={{ width: `${s.pct}%`, height: '100%', background: 'var(--gold)', borderRadius: '3px', transition: 'width 1s' }} />
              </div>
            </div>
          ))}
        </div>

        {/* ═══ COMPANY FILTER + GRID ═══ */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.3rem', marginBottom: '20px' }}>Portfolio Companies</h2>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
            {['All', 'AI & Data', 'Health & Bio', 'Climate Tech', 'EdTech', 'Cybersecurity', 'Space Tech'].map(f => (
              <button key={f} className={filter === f ? 'btn-gold' : 'btn-outline'} style={{ padding: '6px 16px', fontSize: '0.85rem', borderRadius: '20px' }} onClick={() => setFilter(f)}>{f}</button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            {filtered.map((company, idx) => (
              <div key={idx} className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div style={{ padding: '10px', background: 'rgba(255,215,0,0.1)', borderRadius: '12px' }}>
                    <company.icon className="gold-text" size={22} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: 0, fontSize: '1rem' }}>{company.name}</h3>
                    <span style={{ fontSize: '0.78rem', color: 'var(--gold)' }}>{company.sector}</span>
                  </div>
                  <span style={{ color: '#4ade80', fontWeight: 700, fontSize: '0.88rem' }}>{company.growth}</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', flex: 1, fontSize: '0.88rem', lineHeight: 1.5 }}>{company.desc}</p>
                <div style={{ marginTop: '12px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '12px', textAlign: 'right' }}>
                  <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', marginLeft: 'auto', fontSize: '0.85rem' }}>
                    View Details <ExternalLink size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ CTA ═══ */}
        <div style={{ textAlign: 'center', padding: '40px 0', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Are you building the future?</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>We partner with extraordinary founders.</p>
          <button className="btn-gold" style={{ padding: '12px 32px', fontSize: '1.05rem' }} onClick={() => window.location.href = '/submit-startup'}>Submit Your Startup</button>
        </div>
      </div>

      {/* RIGHT: Video Feed */}
      <div style={{ width: '300px', borderLeft: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <h3 style={{ fontSize: '1rem', padding: '20px 16px 12px', margin: 0, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Recent Videos</h3>
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
          {videos.map((vid, idx) => (
            <div key={idx} style={{ background: 'var(--bg-card)', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.04)', marginBottom: '12px' }}>
              <div style={{ position: 'relative', height: '140px' }}>
                <img src={vid.img} alt={vid.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Play size={20} color="white" style={{ marginLeft: '3px' }} />
                  </div>
                </div>
                <button onClick={() => setVideoModal(vid)} style={{ position: 'absolute', bottom: '8px', right: '8px', background: 'rgba(0,0,0,0.6)', padding: '5px', borderRadius: '6px', color: 'white', border: 'none', cursor: 'pointer' }}>
                  <Maximize2 size={14} />
                </button>
              </div>
              <div style={{ padding: '10px 12px' }}>
                <h4 style={{ fontSize: '0.85rem', marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{vid.title}</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  <span>{vid.author}</span><span>{vid.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {videoModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setVideoModal(null)}>
          <div style={{ width: '800px', maxWidth: '90vw', background: 'var(--bg-elevated)', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--gold-border)' }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 style={{ margin: 0 }}>{videoModal.title}</h3>
              <button onClick={() => setVideoModal(null)} style={{ color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
            </div>
            <div style={{ height: '450px', background: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Play size={64} color="var(--gold)" opacity={0.5} />
            </div>
            <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>By {videoModal.author} • {videoModal.time}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PageContent() {
  const { user, logout } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState('signin');
  
  if (user) {
    return (
      <LoggedInLayout>
        <LoggedInExplore />
      </LoggedInLayout>
    );
  }

  return (
    <>
      <Navbar onAuthClick={() => { setAuthTab('signin'); setAuthOpen(true); }} onSignupClick={() => { setAuthTab('signup'); setAuthOpen(true); }} user={user} onLogout={logout} />
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} initialTab={authTab} />
      <main style={{ paddingTop: 'var(--nav-height)' }}>
        <section className="section-container" style={{ textAlign: 'center', paddingTop: '100px', minHeight: '60vh' }}>
          <h1 className="section-title"><span className="gold-text">Explore Portfolio</span></h1>
          <p className="section-desc">Sign in to view active deals, campaigns, and exclusive content.</p>
          <button className="btn-gold" style={{ marginTop: '32px' }} onClick={() => setAuthOpen(true)}>Sign In / Register</button>
        </section>
        <Footer />
      </main>
    </>
  );
}

export default function Page() { return <AuthProvider><PageContent /></AuthProvider>; }
