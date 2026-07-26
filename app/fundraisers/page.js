'use client';
import { useState } from 'react';
import { AuthProvider } from '../../components/AuthProvider';
import LoggedInLayout from '../../components/LoggedInLayout';
import { Rocket, Clock, Users, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

function FundraisersContent() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Technology', 'Health', 'Energy', 'Education', 'Space'];

  const campaigns = [
    {
      title: 'NeuroFlow V2 Headset',
      desc: 'Consumer-grade BCI for enhanced focus, meditation, and seamless smart home integration.',
      goal: 5000000,
      raised: 4200000,
      daysLeft: 12,
      backers: 342,
      category: 'Health',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Solaris Mini-Reactor',
      desc: 'Portable clean energy reactor for off-grid communities and disaster relief zones.',
      goal: 10000000,
      raised: 3500000,
      daysLeft: 45,
      backers: 89,
      category: 'Energy',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'EduSphere VR Classrooms',
      desc: 'Immersive virtual education platform partnering with top Ivy League universities.',
      goal: 2000000,
      raised: 1800000,
      daysLeft: 5,
      backers: 215,
      category: 'Education',
      image: 'https://images.unsplash.com/photo-1531297172864-45d0b4352b5f?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Aether Debris Sweeper',
      desc: 'Autonomous orbital drone fleet to capture and recycle space debris in LEO.',
      goal: 15000000,
      raised: 15000000,
      daysLeft: 0,
      backers: 45,
      category: 'Space',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'QuantumVault Security',
      desc: 'Quantum-resistant encryption hardware module for enterprise data centers.',
      goal: 8000000,
      raised: 1200000,
      daysLeft: 60,
      backers: 12,
      category: 'Technology',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800'
    }
  ];

  const formatCurrency = (num) => {
    if (num >= 1000000) return '$' + (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return '$' + (num / 1000).toFixed(0) + 'K';
    return '$' + num;
  };

  const displayedCampaigns = activeTab === 'All' ? campaigns : campaigns.filter(c => c.category === activeTab);

  return (
    <LoggedInLayout>
      <div className="section-container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <h1 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Golden Fundraisers</h1>
            <p className="section-desc">Back exclusive campaigns from the world's most innovative founders.</p>
          </div>
          <button className="btn-gold" onClick={() => router.push('/start-fundraiser')}>
            <Plus size={18} /> Start a Fundraiser
          </button>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '40px', overflowX: 'auto', paddingBottom: '8px' }}>
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '8px 24px',
                borderRadius: '100px',
                background: activeTab === tab ? 'var(--gold)' : 'rgba(255,255,255,0.05)',
                color: activeTab === tab ? 'var(--bg-void)' : 'white',
                fontWeight: 600,
                fontSize: '0.9rem',
                border: 'none',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
          {displayedCampaigns.map((camp, idx) => (
            <div key={idx} className="glass-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', height: '200px' }}>
                <img src={camp.image} alt={camp.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '16px', left: '16px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', padding: '4px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--gold)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  {camp.category}
                </div>
                {camp.daysLeft === 0 && (
                  <div style={{ position: 'absolute', top: '16px', right: '16px', background: '#4CAF50', padding: '4px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 600, color: 'white' }}>
                    FUNDED
                  </div>
                )}
              </div>
              
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{camp.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '24px', flex: 1 }}>{camp.desc}</p>
                
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--gold)' }}>{formatCurrency(camp.raised)}</span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>of {formatCurrency(camp.goal)}</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'var(--bg-elevated)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${Math.min((camp.raised / camp.goal) * 100, 100)}%`, height: '100%', background: 'var(--gold)', borderRadius: '3px' }}></div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    <Clock size={16} />
                    <span>{camp.daysLeft > 0 ? `${camp.daysLeft} days left` : 'Completed'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    <Users size={16} />
                    <span>{camp.backers} backers</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </LoggedInLayout>
  );
}

export default function FundraisersPage() {
  return <AuthProvider><FundraisersContent /></AuthProvider>;
}
