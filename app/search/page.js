'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { AuthProvider } from '../../components/AuthProvider';
import LoggedInLayout from '../../components/LoggedInLayout';
import { Search, Building2, User, Briefcase, Newspaper } from 'lucide-react';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [activeTab, setActiveTab] = useState('All');

  const [results, setResults] = useState([]);

  useEffect(() => {
    // Mock search results based on query
    if (query) {
      const allResults = [
        { type: 'People', title: 'Sarah Chen', desc: 'Investor', icon: User, match: 'sarah chen investor' },
        { type: 'People', title: 'Marcus Williams', desc: 'Founder', icon: User, match: 'marcus williams founder' },
        { type: 'People', title: 'Elena Vasquez', desc: 'Mentor', icon: User, match: 'elena vasquez mentor' },
        { type: 'Companies', title: 'NeuroFlow AI', desc: 'HealthTech Startup', icon: Building2, match: 'neuroflow ai healthtech startup' },
        { type: 'Companies', title: 'BioNova Labs', desc: 'BioTech', icon: Building2, match: 'bionova labs biotech' },
        { type: 'Companies', title: 'Solaris Grid', desc: 'Clean Energy', icon: Building2, match: 'solaris grid clean energy' },
        { type: 'Opportunities', title: 'Series A Fund', desc: 'Currently Open for tech startups', icon: Briefcase, match: 'series a fund open tech startups' },
        { type: 'Opportunities', title: 'Clean Energy Fund', desc: 'Closing soon', icon: Briefcase, match: 'clean energy fund closing soon' },
        { type: 'News', title: 'AI Startups booming in 2026', desc: 'Article • 2 days ago', icon: Newspaper, match: 'ai startups booming 2026 article' },
      ];
      
      const q = query.toLowerCase();
      const filtered = allResults.filter(r => r.match.includes(q) || r.title.toLowerCase().includes(q));
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  const tabs = ['All', 'People', 'Companies', 'Opportunities', 'News'];
  
  const displayedResults = activeTab === 'All' 
    ? results 
    : results.filter(r => r.type === activeTab);

  return (
    <LoggedInLayout>
      <div className="section-container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 className="section-title" style={{ fontSize: '2rem', marginBottom: '8px' }}>
            Search Results
          </h1>
          <p className="section-desc">Showing results for <span className="gold-text">"{query}"</span></p>
        </div>

        <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', borderBottom: '1px solid var(--gold-border)', paddingBottom: '16px', overflowX: 'auto' }}>
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                background: activeTab === tab ? 'var(--gold-muted)' : 'transparent',
                color: activeTab === tab ? 'var(--gold)' : 'var(--text-secondary)',
                border: `1px solid ${activeTab === tab ? 'var(--gold-border)' : 'transparent'}`,
                fontWeight: 500,
                transition: 'all 0.2s',
                whiteSpace: 'nowrap'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {displayedResults.length === 0 ? (
          <div className="glass-card" style={{ textAlign: 'center', padding: '60px 20px' }}>
            <Search size={48} style={{ color: 'var(--text-muted)', margin: '0 auto 24px' }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>No results found</h3>
            <p style={{ color: 'var(--text-secondary)' }}>We couldn't find anything matching "{query}" in {activeTab !== 'All' ? activeTab : 'any category'}.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '16px' }}>
            {displayedResults.map((result, i) => {
              const Icon = result.icon;
              return (
                <div key={i} className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px', cursor: 'pointer' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: 'var(--bg-surface)', border: '1px solid var(--gold-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)' }}>
                    <Icon size={24} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>{result.title}</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{result.desc}</p>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '1px', background: 'var(--gold-muted)', padding: '4px 12px', borderRadius: '100px' }}>
                    {result.type}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </LoggedInLayout>
  );
}

export default function SearchPage() {
  return <AuthProvider><Suspense><SearchContent /></Suspense></AuthProvider>;
}
