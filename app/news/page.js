'use client';
import { useState } from 'react';
import { AuthProvider, useAuth } from '../../components/AuthProvider';
import Navbar from '../../components/Navbar';
import AuthModal from '../../components/AuthModal';
import LoggedInLayout from '../../components/LoggedInLayout';
import Footer from '../../components/Footer';
import { TrendingUp, Cpu, Leaf, HeartPulse, Rocket, Clock, Bookmark } from 'lucide-react';

function PageContent() {
  const { user, logout } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState('signin');
  const [filter, setFilter] = useState('All');
  const [bookmarks, setBookmarks] = useState(new Set());

  const toggleBookmark = (id) => {
    const newB = new Set(bookmarks);
    if (newB.has(id)) newB.delete(id); else newB.add(id);
    setBookmarks(newB);
  };

  const articles = [
    { id: 1, title: 'Golden Angels Crosses $1B AUM', category: 'Platform News', date: 'Jul 20, 2026', read: '5 min read', desc: 'A major milestone validating our thesis on unified luxury investing and deep tech support.' },
    { id: 2, title: 'NeuroFlow AI Secures Series B', category: 'Portfolio', date: 'Jul 18, 2026', read: '3 min read', desc: 'Our portfolio company raised $50M to accelerate clinical trials for their interface.' },
    { id: 3, title: 'The Future of Quantum Cryptography', category: 'Insights', date: 'Jul 15, 2026', read: '8 min read', desc: 'An deep dive into the post-quantum landscape by our security partners.' },
    { id: 4, title: 'Solaris Grid Expands to MENA', category: 'Portfolio', date: 'Jul 10, 2026', read: '4 min read', desc: 'Bringing decentralized clean energy solutions to the Middle East.' },
    { id: 5, title: 'Q2 2026 Impact Report Released', category: 'Impact', date: 'Jul 05, 2026', read: '10 min read', desc: 'Detailed analysis of our environmental and social metrics.' },
    { id: 6, title: 'BioNova Labs FDA Fast Track', category: 'Portfolio', date: 'Jun 28, 2026', read: '3 min read', desc: 'Regulatory tailwinds for the longevity therapeutics startup.' },
    { id: 7, title: 'State of Space Tech Investing', category: 'Insights', date: 'Jun 20, 2026', read: '6 min read', desc: 'Why orbital logistics is the next trillion-dollar market.' },
    { id: 8, title: 'New Partner Joins London Office', category: 'Platform News', date: 'Jun 15, 2026', read: '2 min read', desc: 'Welcoming Sarah Jenkins to lead our European Deep Tech practice.' },
  ];

  const filtered = filter === 'All' ? articles : articles.filter(a => a.category === filter);

  const pageContent = (
    <>
      <section className="section-container" style={{ textAlign: 'center', paddingTop: '100px' }}>
        <h1 className="section-title"><span className="gold-text">The Golden Pulse</span></h1>
        <p className="section-desc">Latest news, portfolio updates, and market insights.</p>
      </section>

      <section className="section-container">
        <div className="glass-card" style={{ padding: '0', display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid var(--gold)', position: 'relative' }}>
          <div style={{ padding: '3rem', position: 'relative', zIndex: 2, background: 'linear-gradient(to right, rgba(10,10,10,1) 30%, rgba(10,10,10,0))' }}>
            <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', background: 'rgba(255,215,0,0.2)', color: 'var(--gold)', borderRadius: '20px', fontSize: '0.8rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Featured</span>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', maxWidth: '600px' }}>The 2026 Global Macro Outlook</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '500px', lineHeight: 1.6 }}>How AI integration, geopolitical shifts, and climate mandates are reshaping the private markets landscape over the next 18 months.</p>
            <button className="btn-gold" style={{ padding: '0.75rem 2rem' }}>Read Full Report</button>
          </div>
          <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '60%', background: 'url(https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80) center/cover no-repeat', opacity: 0.4 }}></div>
        </div>
      </section>

      <section className="section-container">
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2rem' }}>
          {['All', 'Platform News', 'Portfolio', 'Insights', 'Impact'].map(f => (
            <button 
              key={f} 
              className={filter === f ? 'btn-gold' : 'btn-outline'} 
              style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', borderRadius: '20px' }}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {filtered.map((article) => (
            <div key={article.id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--gold)' }}>{article.category}</span>
                <button onClick={() => toggleBookmark(article.id)} style={{ background: 'none', border: 'none', color: bookmarks.has(article.id) ? 'var(--gold)' : 'var(--text-secondary)', cursor: 'pointer' }}>
                  <Bookmark size={20} fill={bookmarks.has(article.id) ? 'var(--gold)' : 'none'} />
                </button>
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', lineHeight: 1.4 }}>{article.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', flex: 1, marginBottom: '1.5rem' }}>{article.desc}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={14} /> {article.date}</div>
                <div>•</div>
                <div>{article.read}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section className="section-container" style={{ textAlign: 'center', marginBottom: '4rem', marginTop: '2rem' }}>
        <button className="btn-outline" style={{ padding: '0.75rem 2rem' }}>Load More</button>
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
