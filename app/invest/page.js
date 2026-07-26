'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthProvider, useAuth } from '../../components/AuthProvider';
import LoggedInLayout from '../../components/LoggedInLayout';
import { ArrowUpRight, ArrowDownRight, Star, X, ShieldCheck } from 'lucide-react';

const offerings = [
  { id: 0, name: 'Golden A.I.', ticker: 'GAI', price: 18.75, change: +4.25, changePct: 29.33, marketCap: '$375M', volume: '8.1M', sector: 'AI Platform', status: 'Open', sharesAvailable: 250000, minInvest: 100, logo: 'GA', color: '#D4AF37', chart: [8, 9, 10, 9.5, 11, 12, 13, 14.5, 16, 18.75], desc: 'Next-gen AI platform empowering creators through intelligent tools for lifestyle, automation, and financial opportunity. Amplified Intelligence.', featured: true, logoImg: '/golden-ai-emblem.jpg', slug: '/startups/golden-ai' },
  { id: 1, name: 'NeuroFlow AI', ticker: 'NFAI', price: 42.50, change: +3.75, changePct: 9.68, marketCap: '$850M', volume: '2.4M', sector: 'AI & Data', status: 'Open', sharesAvailable: 50000, minInvest: 500, logo: 'N', color: '#7B68EE', chart: [30, 32, 28, 35, 38, 36, 40, 42, 39, 42.5], desc: 'Leading brain-computer interface company revolutionizing cognitive enhancement.' },
  { id: 2, name: 'Solaris Grid', ticker: 'SOLG', price: 28.90, change: +1.20, changePct: 4.33, marketCap: '$580M', volume: '1.8M', sector: 'Clean Energy', status: 'Open', sharesAvailable: 75000, minInvest: 250, logo: 'S', color: '#4ECDC4', chart: [20, 22, 21, 24, 23, 26, 25, 27, 28, 28.9], desc: 'Peer-to-peer solar energy trading and decentralized grid management.' },
  { id: 3, name: 'BioNova Labs', ticker: 'BNOV', price: 156.80, change: +12.40, changePct: 8.58, marketCap: '$3.1B', volume: '890K', sector: 'BioTech', status: 'Open', sharesAvailable: 25000, minInvest: 1000, logo: 'B', color: '#FF6B6B', chart: [120, 125, 130, 128, 140, 135, 145, 150, 148, 156.8], desc: 'CRISPR-based gene therapy and cellular reprogramming for longevity.' },
  { id: 4, name: 'EduSphere', ticker: 'EDSP', price: 15.20, change: -0.80, changePct: -5.00, marketCap: '$304M', volume: '3.1M', sector: 'EdTech', status: 'Open', sharesAvailable: 100000, minInvest: 100, logo: 'E', color: '#FF9F43', chart: [18, 17, 16.5, 17.2, 16, 15.8, 16.2, 15.5, 16, 15.2], desc: 'Immersive VR classrooms partnering with top universities worldwide.' },
  { id: 5, name: 'QuantumVault', ticker: 'QVLT', price: 89.30, change: +5.60, changePct: 6.69, marketCap: '$1.8B', volume: '1.2M', sector: 'Cybersecurity', status: 'Limited', sharesAvailable: 10000, minInvest: 2500, logo: 'Q', color: '#45B7D1', chart: [70, 72, 75, 73, 78, 80, 82, 85, 87, 89.3], desc: 'Quantum-resistant cryptographic hardware for enterprise data centers.' },
  { id: 6, name: 'Aether Space', ticker: 'AETH', price: 234.50, change: +18.90, changePct: 8.77, marketCap: '$4.7B', volume: '650K', sector: 'Space Tech', status: 'Open', sharesAvailable: 15000, minInvest: 5000, logo: 'A', color: '#DDA0DD', chart: [180, 190, 185, 200, 195, 210, 215, 220, 225, 234.5], desc: 'Orbital logistics and autonomous space debris management systems.' },
  { id: 7, name: 'GreenHarvest', ticker: 'GHRV', price: 8.75, change: -0.25, changePct: -2.78, marketCap: '$175M', volume: '5.2M', sector: 'AgriTech', status: 'Open', sharesAvailable: 200000, minInvest: 50, logo: 'G', color: '#96CEB4', chart: [10, 9.5, 9.8, 9.2, 9, 8.8, 9.1, 8.9, 9, 8.75], desc: 'AI-powered precision agriculture and vertical farming technology.' },
  { id: 8, name: 'MediChain', ticker: 'MDCH', price: 67.40, change: +2.80, changePct: 4.33, marketCap: '$1.3B', volume: '980K', sector: 'HealthTech', status: 'Limited', sharesAvailable: 20000, minInvest: 1000, logo: 'M', color: '#74B9FF', chart: [55, 58, 56, 60, 62, 59, 63, 65, 64, 67.4], desc: 'Blockchain-based health records and decentralized telemedicine platform.' }
];

function MiniChart({ data, color, height, width }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    
    const padding = 4;
    const drawWidth = width;
    const drawHeight = height - padding * 2;

    ctx.clearRect(0, 0, width, height);

    ctx.beginPath();
    data.forEach((val, i) => {
      const x = (i / (data.length - 1)) * drawWidth;
      const y = padding + drawHeight - ((val - min) / range) * drawHeight;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    ctx.stroke();

    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    
    // Quick hex to rgb
    let r = 212, g = 175, b = 55; // default gold
    if (color === '#ef4444') { r = 239; g = 68; b = 68; }
    else if (color !== '#D4AF37') {
      // Just parse hex string if needed
      const hex = color.replace('#', '');
      if (hex.length === 6) {
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
      }
    }

    gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.3)`);
    gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
    
    ctx.lineTo(drawWidth, height);
    ctx.lineTo(0, height);
    ctx.fillStyle = gradient;
    ctx.fill();

  }, [data, color, height, width]);

  return <canvas ref={canvasRef} style={{ display: 'block' }} />;
}

function PageContent() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [activeSector, setActiveSector] = useState('All');
  const [buyModal, setBuyModal] = useState(null);
  const [sharesAmount, setSharesAmount] = useState(1);

  if (loading || !user) return null;

  const sectors = ['All', ...new Set(offerings.map(o => o.sector))];
  const featured = offerings.find(o => o.featured);
  const filteredOfferings = activeSector === 'All' ? offerings : offerings.filter(o => o.sector === activeSector);
  
  const handleInvestClick = (stock) => {
    setBuyModal(stock);
    setSharesAmount(1);
  };

  return (
    <LoggedInLayout>
      <div className="section-container" style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0 0 10px 0', color: 'var(--text-primary)' }}>Marketplace</h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', margin: 0 }}>Discover and invest in visionary companies shaping the future.</p>
          </div>
          <div className="glass-card" style={{ display: 'flex', gap: '30px', padding: '20px 30px', borderRadius: '16px', background: 'var(--bg-card)' }}>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Total Market Cap</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>$12.4B</div>
            </div>
            <div style={{ width: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>24h Volume</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>$24.8M</div>
            </div>
            <div style={{ width: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Active Offerings</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--gold)' }}>24</div>
            </div>
          </div>
        </div>

        {/* Featured Stock Card */}
        {featured && (
          <div className="glass-card" style={{ 
            display: 'flex', 
            flexWrap: 'wrap',
            padding: '40px', 
            borderRadius: '24px', 
            background: 'linear-gradient(135deg, rgba(30,30,30,0.8) 0%, rgba(20,20,20,0.9) 100%)',
            border: '1px solid rgba(212,175,55,0.4)',
            boxShadow: '0 0 60px rgba(212,175,55,0.1)',
            gap: '40px',
            alignItems: 'center'
          }}>
            <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(212,175,55,0.15)', color: 'var(--gold)', padding: '6px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold', width: 'fit-content' }}>
                ★ Top Gainer • HOT
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer' }} onClick={() => featured.slug && router.push(featured.slug)}>
                <img src={featured.logoImg} alt={featured.name} style={{ width: '64px', height: '64px', borderRadius: '50%', border: '2px solid var(--gold)' }} />
                <div>
                  <h2 style={{ fontSize: '2rem', margin: '0 0 4px 0', color: 'var(--text-primary)', fontWeight: 'bold' }}>{featured.name}</h2>
                  <div style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: '600' }}>{featured.ticker} • {featured.sector}</div>
                </div>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.6', margin: 0 }}>
                {featured.desc}
              </p>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '16px', marginTop: '10px' }}>
                <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--text-primary)', lineHeight: '1' }}>${featured.price.toFixed(2)}</div>
                <div style={{ display: 'flex', alignItems: 'center', color: '#10B981', fontSize: '1.25rem', fontWeight: '600', paddingBottom: '4px' }}>
                  <ArrowUpRight size={24} style={{ marginRight: '4px' }}/> +{featured.changePct}%
                </div>
              </div>
              <button className="btn-gold" onClick={() => handleInvestClick(featured)} style={{ marginTop: '10px', padding: '14px 32px', fontSize: '1.1rem', width: 'fit-content' }}>
                Invest Now
              </button>
            </div>
            <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
              <MiniChart data={featured.chart} color="#D4AF37" width={400} height={200} />
            </div>
          </div>
        )}

        {/* Filter Row */}
        <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '10px', scrollbarWidth: 'none' }}>
          {sectors.map(sector => (
            <button 
              key={sector} 
              onClick={() => setActiveSector(sector)}
              style={{ 
                padding: '10px 24px', 
                borderRadius: '30px', 
                border: activeSector === sector ? '1px solid var(--gold)' : '1px solid rgba(255,255,255,0.08)',
                background: activeSector === sector ? 'var(--gold)' : 'rgba(255,255,255,0.04)',
                color: activeSector === sector ? '#000' : 'var(--text-primary)',
                fontWeight: '600',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s'
              }}
            >
              {sector}
            </button>
          ))}
        </div>

        {/* Stock Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {filteredOfferings.map(stock => {
            const isPositive = stock.change >= 0;
            const changeColor = isPositive ? '#10B981' : '#EF4444';
            const chartColor = isPositive ? '#D4AF37' : '#EF4444';

            return (
              <div key={stock.id} style={{ 
                background: 'var(--bg-card)', 
                border: '1px solid rgba(255,255,255,0.06)', 
                borderRadius: '16px', 
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                transition: 'all 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                {/* Top row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center', cursor: stock.slug ? 'pointer' : 'default' }} onClick={() => stock.slug && router.push(stock.slug)}>
                    {stock.logoImg ? (
                      <img src={stock.logoImg} alt={stock.name} style={{ width: '48px', height: '48px', borderRadius: '50%' }} />
                    ) : (
                      <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: stock.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.25rem', fontWeight: 'bold' }}>
                        {stock.logo}
                      </div>
                    )}
                    <div>
                      <h3 style={{ margin: '0 0 2px 0', fontSize: '1.1rem', color: 'var(--text-primary)', transition: 'color 0.2s' }} onMouseEnter={e => { if (stock.slug) e.target.style.color = 'var(--gold)'; }} onMouseLeave={e => e.target.style.color = 'var(--text-primary)'}>{stock.name}</h3>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 'bold' }}>{stock.ticker}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: '0.75rem', padding: '4px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)', fontWeight: 'bold' }}>
                    {stock.status}
                  </div>
                </div>

                {/* Middle */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>${stock.price.toFixed(2)}</div>
                    <div style={{ display: 'flex', alignItems: 'center', color: changeColor, fontSize: '0.9rem', fontWeight: 'bold', marginTop: '2px' }}>
                      {isPositive ? <ArrowUpRight size={16} style={{marginRight:'2px'}}/> : <ArrowDownRight size={16} style={{marginRight:'2px'}}/>}
                      {isPositive ? '+' : ''}{stock.changePct}%
                    </div>
                  </div>
                  <div style={{ opacity: 0.8 }}>
                    <MiniChart data={stock.chart} color={chartColor} width={100} height={50} />
                  </div>
                </div>

                {/* Stats Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: 'auto' }}>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Market Cap</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{stock.marketCap}</div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Shares Avail.</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{stock.sharesAvailable.toLocaleString()}</div>
                  </div>
                </div>

                {/* Bottom */}
                <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
                  <button className="btn-gold" onClick={() => handleInvestClick(stock)} style={{ flex: 1, padding: '12px 0', fontSize: '1rem' }}>
                    Invest
                  </button>
                  <button className="btn-outline" style={{ padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Star size={20} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Buy Modal */}
        {buyModal && (
          <div style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
          }}>
            <div style={{
              background: 'var(--bg-card)', border: '1px solid var(--gold-border)',
              borderRadius: '20px', width: '100%', maxWidth: '440px', padding: '30px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.6)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--text-primary)' }}>Purchase Shares</h3>
                <button onClick={() => setBuyModal(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}>
                  <X size={24} />
                </button>
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '30px', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                {buyModal.logoImg ? (
                  <img src={buyModal.logoImg} alt={buyModal.name} style={{ width: '56px', height: '56px', borderRadius: '50%' }} />
                ) : (
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: buyModal.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.5rem', fontWeight: 'bold' }}>
                    {buyModal.logo}
                  </div>
                )}
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '1.2rem', color: 'var(--text-primary)' }}>{buyModal.name}</h4>
                  <div style={{ color: 'var(--text-muted)' }}>{buyModal.ticker}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>${buyModal.price.toFixed(2)}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>per share</div>
                </div>
              </div>

              <div style={{ marginBottom: '30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <span>Amount of Shares</span>
                  <span>Min: {buyModal.minInvest}</span>
                </div>
                <div style={{ display: 'flex', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', overflow: 'hidden' }}>
                  <button 
                    onClick={() => setSharesAmount(Math.max(1, sharesAmount - 1))}
                    style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: 'var(--text-primary)', width: '60px', fontSize: '1.5rem', cursor: 'pointer' }}
                  >-</button>
                  <input 
                    type="number" 
                    value={sharesAmount}
                    onChange={(e) => setSharesAmount(Math.max(1, parseInt(e.target.value) || 1))}
                    style={{ flex: 1, background: 'transparent', border: 'none', color: 'var(--text-primary)', fontSize: '1.25rem', textAlign: 'center', outline: 'none' }}
                  />
                  <button 
                    onClick={() => setSharesAmount(sharesAmount + 1)}
                    style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: 'var(--text-primary)', width: '60px', fontSize: '1.5rem', cursor: 'pointer' }}
                  >+</button>
                </div>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '12px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                  <span>Price ({sharesAmount} shares)</span>
                  <span>${(sharesAmount * buyModal.price).toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                  <span>Platform Fees</span>
                  <span>$0.00</span>
                </div>
                <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '12px 0' }}></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--gold)', fontSize: '1.25rem', fontWeight: 'bold' }}>
                  <span>Total Total</span>
                  <span>${(sharesAmount * buyModal.price).toFixed(2)}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '24px', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                <ShieldCheck size={20} style={{ flexShrink: 0, color: 'var(--gold)' }} />
                <div>
                  By confirming this purchase, you agree to the Terms of Investment. Capital is at risk. 
                  Golden Angels verifies all offerings, but market volatility may affect your returns.
                </div>
              </div>

              <button className="btn-gold" style={{ width: '100%', padding: '16px', fontSize: '1.1rem', borderRadius: '12px' }} onClick={() => {
                alert(`Successfully purchased ${sharesAmount} shares of ${buyModal.name}`);
                setBuyModal(null);
              }}>
                Confirm Purchase
              </button>
            </div>
          </div>
        )}
      </div>
    </LoggedInLayout>
  );
}

export default function Page() {
  return (
    <AuthProvider>
      <PageContent />
    </AuthProvider>
  );
}
