'use client';

import { useState } from 'react';
import { AuthProvider, useAuth } from '../../../components/AuthProvider';
import LoggedInLayout from '../../../components/LoggedInLayout';
import { Star, TrendingUp, X, List, AlignJustify, Image as ImageIcon } from 'lucide-react';

const initialFavorites = [
  { id: 'f1', name: 'NeuroFlow AI', type: 'Company', sector: 'Technology', growth: '+142%', desc: 'Enterprise AI platform serving 200+ Fortune 500 clients', image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=600' },
  { id: 'f2', name: 'Solaris Grid', type: 'Company', sector: 'Energy', growth: '+89%', desc: 'Peer-to-peer solar energy trading across emerging markets', image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=600' },
  { id: 'f3', name: 'Sarah Chen', type: 'Person', sector: 'Finance', growth: null, desc: 'Partner at Sequoia Capital, Biotech & AI focus', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600' },
  { id: 'f4', name: 'BioNova Labs', type: 'Company', sector: 'Healthcare', growth: '+234%', desc: 'CRISPR gene therapy for rare genetic disorders', image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=600' },
  { id: 'f5', name: 'EduSphere VR', type: 'Company', sector: 'Technology', growth: '+156%', desc: 'Immersive VR classrooms for universities', image: 'https://images.unsplash.com/photo-1531297172864-45d0b4352b5f?auto=format&fit=crop&q=80&w=600' },
  { id: 'f6', name: 'Aether Space', type: 'Company', sector: 'Technology', growth: '+312%', desc: 'Orbital logistics and space debris management', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600' },
];

const categories = ['All', 'Technology', 'Healthcare', 'Energy', 'Finance'];

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
  const [favorites, setFavorites] = useState(initialFavorites);
  const [activeCategory, setActiveCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid4');

  if (loading || !user) return null;

  const filtered = favorites.filter(f => activeCategory === 'All' || f.sector === activeCategory);

  const removeFavorite = (id) => setFavorites(favorites.filter(f => f.id !== id));

  const renderGridItem = (item) => (
    <div key={item.id} style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ position: 'relative', height: viewMode === 'grid6' ? '120px' : viewMode === 'grid4' ? '150px' : '200px' }}>
        <img src={item.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={item.name} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 50%)' }} />
        <div style={{ position: 'absolute', bottom: 0, padding: viewMode === 'grid6' ? '8px' : '16px', width: '100%' }}>
          <div style={{ fontWeight: 600, fontSize: viewMode === 'grid6' ? '0.75rem' : '0.95rem', color: '#fff' }}>{item.name}</div>
          <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
            <span>{item.sector || item.type}</span>
            {item.growth && <span style={{ color: '#4ade80', display: 'flex', alignItems: 'center', gap: '2px' }}><TrendingUp size={10} /> {item.growth}</span>}
          </div>
        </div>
      </div>
      <button onClick={() => removeFavorite(item.id)} style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%', padding: '4px', cursor: 'pointer', color: '#fff' }}>
        <X size={14} />
      </button>
    </div>
  );

  const renderListItem = (item) => (
    <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', marginBottom: '8px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Star size={16} color="var(--gold)" /></div>
        <div>
          <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#fff' }}>{item.name}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.sector || item.type}</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {item.growth && <span style={{ color: '#4ade80', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}><TrendingUp size={14} /> {item.growth}</span>}
        <button onClick={() => removeFavorite(item.id)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={18} /></button>
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
            <div style={{ fontSize: '0.8rem', color: 'var(--gold)', marginBottom: '8px' }}>{item.sector || item.type}</div>
          </div>
          {item.growth && <span style={{ color: '#4ade80', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(74, 222, 128, 0.1)', padding: '4px 8px', borderRadius: '4px' }}><TrendingUp size={14} /> {item.growth}</span>}
        </div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item.desc}</div>
      </div>
      <button onClick={() => removeFavorite(item.id)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '8px' }}><X size={20} /></button>
    </div>
  );

  const renderLargeItem = (item) => (
    <div key={item.id} style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', marginBottom: '16px', height: '250px' }}>
      <img src={item.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={item.name} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 40%, transparent 100%)' }} />
      <div style={{ position: 'absolute', bottom: 0, padding: '24px', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div style={{ color: 'var(--gold)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>{item.sector || item.type}</div>
            <div style={{ fontWeight: 700, fontSize: '1.8rem', color: '#fff', marginBottom: '8px' }}>{item.name}</div>
            <div style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.8)', maxWidth: '600px' }}>{item.desc}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {item.growth && <span style={{ color: '#4ade80', fontSize: '1.2rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}><TrendingUp size={20} /> {item.growth}</span>}
            <button onClick={() => removeFavorite(item.id)} style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}>
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
              <Star color="var(--gold)" /> Favorites
            </h1>
            <p style={{ color: 'var(--text-muted)' }}>Manage your saved investments and contacts.</p>
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
            <Star size={48} style={{ opacity: 0.2, marginBottom: '16px' }} />
            <h3>No favorites found</h3>
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
