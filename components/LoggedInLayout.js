'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from './AuthProvider';
import {
  LayoutDashboard, Briefcase, Users, Newspaper, MessageSquare,
  Eye, Star, Bookmark, Settings, Bell, Search, Menu, X,
  ChevronDown, Shield, LogOut, User, TrendingUp, Compass, HelpCircle, Rocket, Send, DollarSign, Wallet, Sparkles
} from 'lucide-react';
import FloatingMessenger from './FloatingMessenger';

const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { id: 'explore', label: 'Explore', icon: Compass, href: '/portfolio' },
  { id: 'invest', label: 'Invest', icon: DollarSign, href: '/invest' },
  { id: 'fundraisers', label: 'Fundraisers', icon: Rocket, href: '/fundraisers' },
  { id: 'submit_startup', label: 'Submit Startup', icon: Send, href: '/submit-startup' },
  { id: 'network', label: 'Network', icon: Users, href: '/dashboard/network' },
  { id: 'news', label: 'News', icon: Newspaper, href: '/news' },
  { id: 'divider1', type: 'divider' },
  { id: 'watchlist', label: 'Watchlist', icon: Eye, href: '/dashboard/watchlist' },
  { id: 'favorites', label: 'Favorites', icon: Star, href: '/dashboard/favorites' },
  { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark, href: '/dashboard/bookmarks' },
  { id: 'divider2', type: 'divider' },
  { id: 'my_portfolio', label: 'Portfolio', icon: Wallet, href: '/wallet' },
  { id: 'analytics', label: 'Analytics', icon: TrendingUp, href: '/dashboard/analytics' },
  { id: 'settings', label: 'Settings', icon: Settings, href: '/dashboard/settings' },
];

export default function LoggedInLayout({ children }) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const profileRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target)) setSearchFocused(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Detect mobile and set sidebar default
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 900;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(true);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close sidebar on mobile when navigating
  useEffect(() => {
    if (isMobile) setSidebarOpen(false);
  }, [pathname, isMobile]);

  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      if (searchQuery.trim()) {
        router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
        setSearchFocused(false);
      }
    }
  };

  const getSearchResults = () => {
    if (!searchQuery) return [];
    const q = searchQuery.toLowerCase();
    const results = [
      { type: 'people', title: 'Sarah Chen', desc: 'Investor' },
      { type: 'people', title: 'Marcus Williams', desc: 'Founder' },
      { type: 'people', title: 'Elena Vasquez', desc: 'Mentor' },
      { type: 'companies', title: 'Golden A.I.', desc: 'AI Platform • Amplified Intelligence', href: '/startups/golden-ai' },
      { type: 'companies', title: 'NeuroFlow AI', desc: 'HealthTech • Brain-Computer Interfaces', href: '/invest' },
      { type: 'companies', title: 'BioNova Labs', desc: 'BioTech • Gene Therapy', href: '/invest' },
      { type: 'companies', title: 'Solaris Grid', desc: 'Energy • Solar Trading', href: '/invest' },
      { type: 'companies', title: 'Aether Space', desc: 'Space Tech • Orbital Logistics', href: '/invest' },
      { type: 'companies', title: 'QuantumVault', desc: 'Cybersecurity • Quantum-Resistant', href: '/invest' },
      { type: 'companies', title: 'EduSphere', desc: 'EdTech • VR Classrooms', href: '/invest' },
      { type: 'companies', title: 'GreenHarvest', desc: 'AgriTech • Precision Agriculture', href: '/invest' },
      { type: 'companies', title: 'MediChain', desc: 'HealthTech • Blockchain Health Records', href: '/invest' },
      { type: 'opportunities', title: 'Series A Fund', desc: 'Open' },
      { type: 'opportunities', title: 'Clean Energy Fund', desc: 'Closing soon' },
      { type: 'opportunities', title: 'Golden A.I. IPO', desc: '$18.75/share • 29.33% growth', href: '/startups/golden-ai' },
      { type: 'news', title: 'AI Startups booming in 2026', desc: 'Article' },
      { type: 'news', title: 'Golden A.I. launches Amplified Intelligence platform', desc: 'Breaking' },
    ];
    return results.filter(r => r.title.toLowerCase().includes(q) || r.desc.toLowerCase().includes(q));
  };

  const searchResults = getSearchResults();
  const groupedResults = searchResults.reduce((acc, result) => {
    if (!acc[result.type]) acc[result.type] = [];
    acc[result.type].push(result);
    return acc;
  }, {});

  const isActive = (href) => pathname === href || (href !== '/dashboard' && pathname.startsWith(href));

  return (
    <div className="app-shell">
      {/* ═══ TOP BAR ═══ */}
      <header className="shell-topbar">
        <div className="topbar-left">
          <button className="topbar-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <a href="/" className="topbar-logo">
            <img src="/Golden Angels_LOGO.png" alt="GA" className="topbar-logo-img" />
            <span className="topbar-logo-text gold-text">GOLDEN ANGELS</span>
          </a>
        </div>

        <div className="topbar-center">
          <div className={`topbar-search ${searchFocused ? 'focused' : ''}`} ref={searchRef}>
            <Search size={16} className="topbar-search-icon" onClick={handleSearch} style={{cursor: 'pointer'}} />
            <input
              type="text"
              placeholder="Search companies, people, opportunities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onKeyDown={handleSearch}
            />
            {searchFocused && searchQuery && (
              <div className="search-dropdown-menu" style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'var(--bg-card)', border: '1px solid var(--gold-border)', borderRadius: '8px', marginTop: '8px', padding: '16px', maxHeight: '400px', overflowY: 'auto', zIndex: 1000, boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                {Object.keys(groupedResults).length === 0 ? (
                  <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '16px' }}>No results found</div>
                ) : (
                  Object.entries(groupedResults).map(([type, items]) => (
                    <div key={type} style={{ marginBottom: '16px' }}>
                      <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--gold)', letterSpacing: '2px', marginBottom: '8px' }}>
                        {type}
                      </div>
                      {items.map((item, idx) => (
                        <div 
                          key={idx} 
                          onClick={() => {
                            router.push(item.href || `/search?q=${encodeURIComponent(item.title)}`);
                            setSearchFocused(false);
                            setSearchQuery(item.title);
                          }}
                          style={{ padding: '8px', borderRadius: '6px', cursor: 'pointer', display: 'flex', flexDirection: 'column', transition: 'background 0.2s ease' }}
                          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                          <span style={{ fontSize: '0.9rem', color: 'white' }}>{item.title}</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{item.desc}</span>
                        </div>
                      ))}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        <div className="topbar-right">
          <button className="topbar-icon-btn" title="Notifications">
            <Bell size={18} />
            <span className="topbar-badge">5</span>
          </button>
          <button className="topbar-icon-btn" title="Messages" onClick={() => router.push('/dashboard/messages')}>
            <MessageSquare size={18} />
            <span className="topbar-badge">3</span>
          </button>

          <div className="topbar-profile" ref={profileRef}>
            <button className="topbar-profile-btn" onClick={() => setProfileOpen(!profileOpen)}>
              <div className="topbar-avatar">
                {(user?.displayName || 'U')[0].toUpperCase()}
              </div>
              <div className="topbar-profile-info">
                <span className="topbar-profile-name">{user?.displayName}</span>
                <span className="topbar-profile-role">{user?.role}</span>
              </div>
              <ChevronDown size={14} className={`topbar-chevron ${profileOpen ? 'open' : ''}`} />
            </button>

            {profileOpen && (
              <div className="topbar-dropdown">
                <div className="topbar-dropdown-header">
                  <div className="topbar-avatar lg">{(user?.displayName || 'U')[0].toUpperCase()}</div>
                  <div>
                    <div className="topbar-dropdown-name">{user?.displayName}</div>
                    <div className="topbar-dropdown-email">{user?.email}</div>
                    <span className={`role-badge ${user?.role}`} style={{ marginTop: '4px', display: 'inline-block' }}>{user?.role}</span>
                  </div>
                </div>
                <div className="topbar-dropdown-divider" />
                <button className="topbar-dropdown-item" onClick={() => { setProfileOpen(false); router.push(`/profile/${user?.uid}`); }}>
                  <User size={16} /> My Profile
                </button>
                <button className="topbar-dropdown-item" onClick={() => { setProfileOpen(false); router.push('/dashboard'); }}>
                  <LayoutDashboard size={16} /> Dashboard
                </button>
                {user?.role === 'admin' && (
                  <button className="topbar-dropdown-item gold" onClick={() => { setProfileOpen(false); router.push('/admin'); }}>
                    <Shield size={16} /> Admin Panel
                  </button>
                )}
                <button className="topbar-dropdown-item" onClick={() => { setProfileOpen(false); router.push('/wallet'); }}>
                  <Wallet size={16} /> Wallet
                </button>
                <button className="topbar-dropdown-item" onClick={() => { setProfileOpen(false); router.push('/dashboard/settings'); }}>
                  <Settings size={16} /> Settings
                </button>
                <div className="topbar-dropdown-divider" />
                <button className="topbar-dropdown-item danger" onClick={() => { setProfileOpen(false); logout(); router.push('/'); }}>
                  <LogOut size={16} /> Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ═══ SIDEBAR OVERLAY (mobile) ═══ */}
      <div 
        className={`sidebar-overlay ${sidebarOpen && isMobile ? 'visible' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* ═══ SIDEBAR ═══ */}
      <aside className={`shell-sidebar ${sidebarOpen ? 'open' : 'collapsed'}`}>
        <nav className="sidebar-nav">
          {sidebarItems.map((item) => {
            if (item.type === 'divider') return <div key={item.id} className="sidebar-divider" />;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`sidebar-item ${isActive(item.href) ? 'active' : ''}`}
                onClick={() => { router.push(item.href); if (isMobile) setSidebarOpen(false); }}
                title={item.label}
              >
                <Icon size={18} className="sidebar-item-icon" />
                <span className="sidebar-item-label">{item.label}</span>
                {item.badge && <span className="sidebar-item-badge">{item.badge}</span>}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-divider" />
          <div className="sidebar-section-title">Quick Stats</div>
          <div className="sidebar-stat">
            <span>Portfolio Value</span>
            <span className="gold-text">$4.2M</span>
          </div>
          <div className="sidebar-stat">
            <span>Active Deals</span>
            <span className="gold-text">7</span>
          </div>
          <div className="sidebar-stat">
            <span>Network</span>
            <span className="gold-text">1,247</span>
          </div>
          <div className="sidebar-divider" />
          <button 
            onClick={() => { router.push('/pricing'); if (isMobile) setSidebarOpen(false); }}
            style={{
              width: '100%', padding: '12px 16px', background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.05))',
              border: '1px solid rgba(212,175,55,0.3)', borderRadius: '10px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--gold)',
              fontSize: '0.85rem', fontWeight: 700, transition: 'all 0.3s', marginBottom: '8px',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(135deg, rgba(212,175,55,0.25), rgba(212,175,55,0.1))'; e.currentTarget.style.boxShadow = '0 0 20px rgba(212,175,55,0.15)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.05))'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <Sparkles size={16} /> Upgrade Plan
          </button>
          <a href="/contact" className="sidebar-help">
            <HelpCircle size={14} /> Help & Support
          </a>
        </div>
      </aside>

      {/* ═══ MAIN CONTENT ═══ */}
      <main className={`shell-main ${sidebarOpen && !isMobile ? '' : 'expanded'}`}>
        {children}
      </main>

      {/* ═══ MOBILE BOTTOM NAV ═══ */}
      <nav className="mobile-bottom-nav">
        <button className={`mobile-bottom-nav-item ${pathname === '/dashboard' ? 'active' : ''}`} onClick={() => router.push('/dashboard')}>
          <LayoutDashboard size={22} />
          <span>Home</span>
        </button>
        <button className={`mobile-bottom-nav-item ${pathname === '/portfolio' ? 'active' : ''}`} onClick={() => router.push('/portfolio')}>
          <Compass size={22} />
          <span>Explore</span>
        </button>
        <button className={`mobile-bottom-nav-item`} onClick={() => setMobileSearchOpen(true)}>
          <Search size={22} />
          <span>Search</span>
        </button>
        <button className={`mobile-bottom-nav-item ${pathname === '/invest' ? 'active' : ''}`} onClick={() => router.push('/invest')}>
          <DollarSign size={22} />
          <span>Invest</span>
        </button>
        <button className={`mobile-bottom-nav-item`} onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Menu size={22} />
          <span>Menu</span>
        </button>
      </nav>

      {/* ═══ MOBILE SEARCH OVERLAY ═══ */}
      {mobileSearchOpen && (
        <div className="mobile-search-overlay" style={{ display: 'flex' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                autoFocus
                type="text"
                placeholder="Search companies, people, opportunities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && searchQuery.trim()) { router.push(`/search?q=${encodeURIComponent(searchQuery)}`); setMobileSearchOpen(false); } }}
              />
            </div>
            <button onClick={() => { setMobileSearchOpen(false); setSearchQuery(''); }} style={{ background: 'none', border: 'none', color: 'var(--gold)', fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer', padding: '12px' }}>
              Cancel
            </button>
          </div>
          {searchQuery && (
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {Object.entries(getSearchResults().reduce((acc, r) => { if (!acc[r.type]) acc[r.type] = []; acc[r.type].push(r); return acc; }, {})).map(([type, items]) => (
                <div key={type} style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--gold)', letterSpacing: '2px', marginBottom: '8px' }}>{type}</div>
                  {items.map((item, idx) => (
                    <button key={idx} onClick={() => { router.push(item.href || `/search?q=${encodeURIComponent(item.title)}`); setMobileSearchOpen(false); setSearchQuery(''); }}
                      style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '12px', borderRadius: '8px', cursor: 'pointer', background: 'none', border: 'none', textAlign: 'left', transition: 'background 0.2s' }}
                    >
                      <span style={{ fontSize: '0.95rem', color: 'white' }}>{item.title}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{item.desc}</span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Floating Messenger */}
      <FloatingMessenger />
    </div>
  );
}
