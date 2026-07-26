'use client';
import { useState } from 'react';
import { AuthProvider, useAuth } from '../../../components/AuthProvider';
import LoggedInLayout from '../../../components/LoggedInLayout';
import { Users, UserPlus, UserCheck, Search, Filter } from 'lucide-react';

const networkPeople = [
  { id: 'n1', name: 'Sarah Chen', role: 'Partner, Sequoia Capital', sector: 'Biotech & AI', mutual: 12, connected: true },
  { id: 'n2', name: 'Marcus Williams', role: 'Founder & CEO, NeuroFlow AI', sector: 'AI / Machine Learning', mutual: 8, connected: true },
  { id: 'n3', name: 'Elena Vasquez', role: 'CTO, Solaris Grid', sector: 'Clean Energy', mutual: 5, connected: true },
  { id: 'n4', name: 'James Kim', role: 'Angel Investor', sector: 'General', mutual: 15, connected: false },
  { id: 'n5', name: 'Priya Sharma', role: 'Managing Partner, Horizon VC', sector: 'Enterprise SaaS', mutual: 9, connected: false },
  { id: 'n6', name: 'David Thompson', role: 'CEO, BioNova Labs', sector: 'Biotechnology', mutual: 4, connected: false },
  { id: 'n7', name: 'Lisa Park', role: 'CFO, Golden Enterprises', sector: 'Corporate', mutual: 22, connected: true },
  { id: 'n8', name: 'Ahmed Hassan', role: 'Founder, EduSphere', sector: 'EdTech', mutual: 3, connected: false },
  { id: 'n9', name: 'Maria Rodriguez', role: 'VP Engineering, QuantumVault', sector: 'Cybersecurity', mutual: 7, connected: true },
  { id: 'n10', name: 'Robert Zhang', role: 'Co-Founder, Aether Space', sector: 'Aerospace', mutual: 6, connected: false },
];

function NetworkContent() {
  const { user, loading } = useAuth();
  const [people, setPeople] = useState(networkPeople);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const toggleConnect = (id) => setPeople(prev => prev.map(p => p.id === id ? { ...p, connected: !p.connected } : p));

  const filtered = people.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.role.toLowerCase().includes(search.toLowerCase());
    if (filter === 'connected') return matchSearch && p.connected;
    if (filter === 'suggested') return matchSearch && !p.connected;
    return matchSearch;
  });

  if (loading || !user) return null;

  const connectedCount = people.filter(p => p.connected).length;

  return (
    <LoggedInLayout>
      <div style={{ padding: '24px', maxWidth: '1000px' }}>
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Users size={22} color="var(--gold)" /> My <span className="gold-text">Network</span>
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>{connectedCount} connections · {people.length - connectedCount} suggested</p>
        </div>

        {/* Search & Filters */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <div className="topbar-search" style={{ flex: 1, minWidth: '200px', maxWidth: '400px', borderRadius: '10px' }}>
            <Search size={14} className="topbar-search-icon" />
            <input placeholder="Search people..." value={search} onChange={e => setSearch(e.target.value)}
              style={{ padding: '9px 12px', background: 'transparent', border: 'none', color: 'var(--text-primary)', fontSize: '0.85rem', outline: 'none', width: '100%' }} />
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['all', 'connected', 'suggested'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                style={{
                  padding: '8px 18px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer', textTransform: 'capitalize', transition: 'all 0.2s',
                  background: filter === f ? 'var(--gold-muted)' : 'var(--bg-elevated)',
                  color: filter === f ? 'var(--gold)' : 'var(--text-muted)',
                  border: filter === f ? '1px solid var(--gold-border)' : '1px solid rgba(255,255,255,0.04)',
                }}>{f}</button>
            ))}
          </div>
        </div>

        {/* People Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '12px' }}>
          {filtered.map(person => (
            <div key={person.id} className="profile-section-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--gold-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--gold)', fontSize: '1.3rem', fontFamily: 'var(--font-display)', marginBottom: '12px' }}>
                {person.name[0]}
              </div>
              <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '2px' }}>{person.name}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>{person.role}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '12px' }}>{person.mutual} mutual connections</div>
              <button onClick={() => toggleConnect(person.id)}
                className={person.connected ? 'btn-outline' : 'btn-gold'}
                style={{ width: '100%', padding: '8px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                {person.connected ? <><UserCheck size={14} /> Connected</> : <><UserPlus size={14} /> Connect</>}
              </button>
            </div>
          ))}
        </div>
      </div>
    </LoggedInLayout>
  );
}

export default function NetworkPage() { return <AuthProvider><NetworkContent /></AuthProvider>; }
