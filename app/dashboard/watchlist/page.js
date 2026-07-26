'use client';

import { useState } from 'react';
import { AuthProvider, useAuth } from '../../../components/AuthProvider';
import LoggedInLayout from '../../../components/LoggedInLayout';
import { Eye, TrendingUp, X, List, AlignJustify, Image as ImageIcon, Bell, BellOff } from 'lucide-react';

const initialWatchlist = [
  { id: 'w1', name: 'Aether Space Series B', category: 'Active Deals', status: 'Closing Soon', progress: 87, goal: '$15M', raised: '$13M', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600', alert: true },
  { id: 'w2', name: 'Clean Energy Fund II', category: 'Pipeline', status: 'Due Diligence', progress: 45, goal: '$50M', raised: '$22.5M', image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=600', alert: true },
  { id: 'w3', name: 'BioNova Phase 3', category: 'Watching', status: 'In Progress', progress: 60, goal: '$10M', raised: '$6M', image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=600', alert: false },
  { id: 'w4', name: 'QuantumVault Exit', category: 'Exited', status: 'Completed', progress: 100, goal: '$8M', raised: '$8M', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600', alert: false },
  { id: 'w5', name: 'EduSphere Seed', category: 'Active Deals', status: 'Open', progress: 30, goal: '$2M', raised: '$600K', image: 'https://images.unsplash.com/photo-1531297172864-45d0b4352b5f?auto=format&fit=crop&q=80&w=600', alert: true },
  { id: 'w6', name: 'Solaris Orbital', category: 'Pipeline', status: 'Negotiation', progress: 55, goal: '$20M', raised: '$11M', image: 'https://images.unsplash.com/photo-1614729939124-03290b55c9ce?auto=format&fit=crop&q=80&w=600', alert: false },
];

const categories = ['All', 'Active Deals', 'Pipeline', 'Watching', 'Exited'];

const viewModes = [
  { key: 'grid2', label: '2x' },
  { key: 'grid3', label: '3x' },
  { key: 'grid4', label: '4x' },
  { key: 'grid6', label: '6x' },
  { key: 'list', label: 'List', icon: List },
  { key: 'detail', label: 'Detail', icon: AlignJustify },
  { key: 'large', label: 'Large', icon: ImageIcon },
];

function Content() {
  const { user, loading } = useAuth();
  const [watchlist, setWatchlist] = useState(initialWatchlist);
  const [activeCategory, setActiveCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid4');

  if (loading || !user) return null;

  const filtered = watchlist.filter(w => activeCategory === 'All' || w.category === activeCategory);

  const removeItem = (id) => setWatchlist(watchlist.filter(w => w.id !== id));
  const toggleAlert = (id) => setWatchlist(watchlist.map(w => w.id === id ? { ...w, alert: !w.alert } : w));

  const renderGridItem = (item) => (
    <div key={item.id} style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ position: 'relative', height: viewMode === 'grid6' ? '120px' : viewMode === 'grid4' ? '150px' : '200px' }}>
        <img src={item.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={item.name} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%)' }} />
        <div style={{ position: 'absolute', bottom: 0, padding: viewMode === 'grid6' ? '8px' : '16px', width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ fontWeight: 600, fontSize: viewMode === 'grid6' ? '0.75rem' : '0.95rem', color: '#fff', marginBottom: '4px' }}>{item.name}</div>
          </div>
          <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>{item.category} • {item.status}</span>
          </div>
          {viewMode !== 'grid6' && (
            <div style={{ marginTop: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#aaa', marginBottom: '4px' }}>
                <span>{item.raised}</span>
                <span>{item.goal}</span>
              </div>
              <div style={{ height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: `${item.progress}%`, height: '100%', background: 'var(--gold)' }} />
              </div>
            </div>
          )}
        </div>
      </div>
      <div style={{ position: 'absolute', top: '8px', right: '8px', display: 'flex', gap: '4px' }}>
        <button onClick={() => toggleAlert(item.id)} style={{ background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%', padding: '4px', cursor: 'pointer', color: item.alert ? 'var(--gold)' : '#fff' }}>
          {item.alert ? <Bell size={14} /> : <BellOff size={14} />}
        </button>
        <button onClick={() => removeItem(item.id)} style={{ background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%', padding: '4px', cursor: 'pointer', color: '#fff' }}>
          <X size={14} />
        </button>
      </div>
    </div>
  );

  const renderListItem = (item) => (
    <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', marginBottom: '8px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Eye size={16} color="var(--gold)" /></div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#fff' }}>{item.name}</div>
            <span style={{ fontSize: '0.7rem', padding: '2px 6px', borderRadius: '4px', background: 'rgba(255,255,255,0.1)', color: '#aaa' }}>{item.status}</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.category}</div>
        </div>
        <div style={{ flex: 1, padding: '0 24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#aaa', marginBottom: '4px' }}>
              <span>{item.raised}</span>
              <span>{item.goal}</span>
            </div>
            <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ width: `${item.progress}%`, height: '100%', background: 'var(--gold)' }} />
            </div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button onClick={() => toggleAlert(item.id)} style={{ background: 'transparent', border: 'none', color: item.alert ? 'var(--gold)' : 'var(--text-muted)', cursor: 'pointer' }}>
          {item.alert ? <Bell size={18} /> : <BellOff size={18} />}
        </button>
        <button onClick={() => removeItem(item.id)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={18} /></button>
      </div>
    </div>
  );

  const renderDetailedItem = (item) => (
    <div key={item.id} style={{ display: 'flex', gap: '16px', padding: '16px', background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', marginBottom: '12px', alignItems: 'center' }}>
      <img src={item.image} style={{ width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover' }} alt={item.name} />
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: '1.1rem', color: '#fff' }}>{item.name}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--gold)', marginBottom: '8px' }}>{item.category} • {item.status}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
             <div style={{ fontSize: '0.8rem', color: '#fff', fontWeight: 600 }}>{item.raised} <span style={{color: 'var(--text-muted)', fontWeight: 400}}>of {item.goal}</span></div>
             <div style={{ fontSize: '0.75rem', color: 'var(--gold)' }}>{item.progress}% Funded</div>
          </div>
        </div>
        <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden', marginTop: '8px' }}>
           <div style={{ width: `${item.progress}%`, height: '100%', background: 'var(--gold)' }} />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '16px', borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
        <button onClick={() => toggleAlert(item.id)} style={{ background: 'transparent', border: 'none', color: item.alert ? 'var(--gold)' : 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}>
          {item.alert ? <Bell size={20} /> : <BellOff size={20} />}
        </button>
        <button onClick={() => removeItem(item.id)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}><X size={20} /></button>
      </div>
    </div>
  );

  const renderLargeItem = (item) => (
    <div key={item.id} style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', marginBottom: '16px', height: '250px' }}>
      <img src={item.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={item.name} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 40%, transparent 100%)' }} />
      <div style={{ position: 'absolute', bottom: 0, padding: '24px', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ flex: 1, paddingRight: '48px' }}>
            <div style={{ color: 'var(--gold)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>{item.category} • {item.status}</div>
            <div style={{ fontWeight: 700, fontSize: '1.8rem', color: '#fff', marginBottom: '12px' }}>{item.name}</div>
            <div style={{ maxWidth: '400px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#fff', marginBottom: '6px', fontWeight: 500 }}>
                <span>Raised: {item.raised}</span>
                <span>Goal: {item.goal}</span>
                </div>
                <div style={{ height: '6px', background: 'rgba(255,255,255,0.2)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${item.progress}%`, height: '100%', background: 'var(--gold)' }} />
                </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={() => toggleAlert(item.id)} style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: item.alert ? 'var(--gold)' : '#fff' }}>
              {item.alert ? <Bell size={20} /> : <BellOff size={20} />}
            </button>
            <button onClick={() => removeItem(item.id)} style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}>
              <X size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    if (viewMode === 'list') return filtered.map(renderListItem);
    if (viewMode === 'detail') return filtered.map(renderDetailedItem);
    if (viewMode === 'large') return filtered.map(renderLargeItem);
    
    let gridCols = 4;
    if (viewMode === 'grid2') gridCols = 2;
    if (viewMode === 'grid3') gridCols = 3;
    if (viewMode === 'grid6') gridCols = 6;

    return (
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${gridCols}, 1fr)`, gap: '16px' }}>
        {filtered.map(renderGridItem)}
      </div>
    );
  };

  return (
    <LoggedInLayout>
      <div style={{ padding: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 600, color: '#fff', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Eye color="var(--gold)" /> Watchlist
            </h1>
            <p style={{ color: 'var(--text-muted)' }}>Track upcoming deals and pipeline opportunities.</p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '6px 16px',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    border: '1px solid',
                    borderColor: activeCategory === cat ? 'var(--gold)' : 'rgba(255,255,255,0.1)',
                    background: activeCategory === cat ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
                    color: activeCategory === cat ? 'var(--gold)' : 'var(--text-muted)',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', background: 'rgba(255,255,255,0.04)', borderRadius: '8px', padding: '3px', gap: '2px' }}>
              {viewModes.map(vm => (
                <button key={vm.key} onClick={() => setViewMode(vm.key)} title={vm.label} style={{
                  padding: '6px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600,
                  background: viewMode === vm.key ? 'var(--gold)' : 'transparent',
                  color: viewMode === vm.key ? 'black' : 'var(--text-muted)',
                  border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px'
                }}>
                  {vm.icon ? <vm.icon size={14} /> : vm.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {renderContent()}

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '64px', color: 'var(--text-muted)', background: 'var(--bg-card)', borderRadius: '12px', border: '1px dashed rgba(255,255,255,0.1)' }}>
            <Eye size={48} style={{ opacity: 0.2, marginBottom: '16px' }} />
            <h3>No tracked items</h3>
            <p>Try changing your category filter.</p>
          </div>
        )}
      </div>
    </LoggedInLayout>
  );
}

export default function Page() {
  return (
    <AuthProvider>
      <Content />
    </AuthProvider>
  );
}
