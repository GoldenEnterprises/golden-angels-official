'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthProvider, useAuth } from '../../components/AuthProvider';
import LoggedInLayout from '../../components/LoggedInLayout';
import { Users, Key, Settings, Plus, Trash2, Shield, TrendingUp, Activity, BarChart3, UserCheck, AlertCircle } from 'lucide-react';

function AdminContent() {
  const { user, loading, getAllUsers, updateUserRole, getAllCodes, createCode, deleteCode } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState([]);
  const [investorCodes, setInvestorCodes] = useState([]);
  const [newCode, setNewCode] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) router.push('/');
  }, [user, loading, router]);

  useEffect(() => {
    if (user && user.role === 'admin') {
      setUsers(getAllUsers());
      setInvestorCodes(getAllCodes());
    }
  }, [user, refreshKey]);

  const handleCreateCode = () => {
    if (!newCode.trim()) return;
    createCode(newCode);
    setNewCode('');
    setRefreshKey(k => k + 1);
  };

  if (loading || !user || user.role !== 'admin') return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-void)' }}>
      <img src="/Golden Angels_LOGO.png" alt="Golden Angels" style={{ width: '80px', height: '80px', objectFit: 'contain', animation: 'pulse 2s ease-in-out infinite' }} />
    </div>
  );

  const totalMembers = users.length;
  const totalInvestors = users.filter(u => u.role === 'investor').length;
  const totalAdmins = users.filter(u => u.role === 'admin').length;
  const activeCodes = investorCodes.filter(c => c.active).length;

  const adminTabs = [
    { id: 'overview', icon: BarChart3, label: 'Overview' },
    { id: 'users', icon: Users, label: 'Users' },
    { id: 'codes', icon: Key, label: 'Investor Codes' },
    { id: 'analytics', icon: Activity, label: 'Analytics' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <LoggedInLayout>
      <div style={{ padding: '24px' }}>
        {/* Admin Header */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <Shield size={20} color="var(--gold)" />
            <h1 style={{ fontSize: '1.5rem' }}>Admin <span className="gold-text">Panel</span></h1>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Manage your Golden Angels platform.</p>
        </div>

        {/* Admin Tabs */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '28px', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '0' }}>
          {adminTabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', fontSize: '0.85rem',
                color: activeTab === tab.id ? 'var(--gold)' : 'var(--text-muted)',
                borderBottom: activeTab === tab.id ? '2px solid var(--gold)' : '2px solid transparent',
                background: 'none', border: 'none', borderBottomWidth: '2px', borderBottomStyle: 'solid',
                borderBottomColor: activeTab === tab.id ? 'var(--gold)' : 'transparent',
                cursor: 'pointer', transition: 'all 0.2s', fontWeight: activeTab === tab.id ? 600 : 400,
              }}>
              <tab.icon size={16} /> {tab.label}
            </button>
          ))}
        </div>

        {/* ═══ OVERVIEW ═══ */}
        {activeTab === 'overview' && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '32px' }}>
              {[
                { label: 'Total Users', value: totalMembers, icon: Users, change: '+12 this month', color: '#60a5fa' },
                { label: 'Active Investors', value: totalInvestors, icon: UserCheck, change: '+3 this week', color: '#4ade80' },
                { label: 'Admins', value: totalAdmins, icon: Shield, change: 'System', color: '#D4AF37' },
                { label: 'Active Codes', value: activeCodes, icon: Key, change: `${investorCodes.length} total`, color: '#c084fc' },
                { label: 'Total Invested', value: '$250M+', icon: TrendingUp, change: '+$18M this quarter', color: '#D4AF37' },
              ].map((card, i) => (
                <div key={i} className="profile-section-card" style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>{card.label}</div>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: `${card.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <card.icon size={18} color={card.color} />
                    </div>
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 700, fontFamily: 'var(--font-display)', marginBottom: '4px' }}>{card.value}</div>
                  <div style={{ fontSize: '0.75rem', color: '#4ade80' }}>{card.change}</div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="profile-section-card">
              <div className="profile-section-title"><span>Recent Activity</span></div>
              {[
                { action: 'New user registered', detail: 'gamegod7heaven@gmail.com', time: 'Just now', icon: Users },
                { action: 'Investor code validated', detail: 'Code ANGEL2026 used', time: '2h ago', icon: Key },
                { action: 'Portfolio milestone', detail: '$250M+ invested globally', time: '1d ago', icon: TrendingUp },
                { action: 'New partnership', detail: 'Golden Health division launched', time: '3d ago', icon: Activity },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '12px 0', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--gold-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <item.icon size={16} color="var(--gold)" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 500 }}>{item.action}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{item.detail}</div>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.time}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ═══ USERS ═══ */}
        {activeTab === 'users' && (
          <div className="profile-section-card">
            <div className="profile-section-title">
              <span>User Management</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{totalMembers} registered</span>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {['User', 'Email', 'Type', 'Role', 'Actions'].map(h => (
                      <th key={h} style={{ textAlign: 'left', padding: '12px 16px', fontSize: '0.72rem', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-muted)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'var(--gold-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--gold)', fontSize: '0.85rem' }}>
                            {(u.displayName || 'U')[0].toUpperCase()}
                          </div>
                          <span style={{ fontWeight: 500 }}>{u.displayName || 'Unknown'}</span>
                        </div>
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{u.email}</td>
                      <td style={{ padding: '12px 16px' }}><span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>{u.type || 'individual'}</span></td>
                      <td style={{ padding: '12px 16px' }}><span className={`role-badge ${u.role}`}>{u.role}</span></td>
                      <td style={{ padding: '12px 16px' }}>
                        <select value={u.role} onChange={(e) => { updateUserRole(u.email, e.target.value); setRefreshKey(k => k + 1); }}
                          style={{ background: 'var(--bg-deep)', color: 'var(--text-primary)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', padding: '6px 10px', fontSize: '0.8rem', cursor: 'pointer' }}>
                          <option value="member">Member</option>
                          <option value="investor">Investor</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ═══ CODES ═══ */}
        {activeTab === 'codes' && (
          <div className="profile-section-card">
            <div className="profile-section-title">
              <span>Investor Codes</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{activeCodes} active</span>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <input className="form-input" type="text" placeholder="Enter new 6-digit code" value={newCode} onChange={(e) => setNewCode(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreateCode()}
                style={{ maxWidth: '300px', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '1rem', fontWeight: 600 }} />
              <button className="btn-gold" onClick={handleCreateCode} style={{ padding: '10px 24px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
                <Plus size={16} /> Create Code
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '12px' }}>
              {investorCodes.map((code) => (
                <div key={code.id} style={{ padding: '16px', background: 'var(--bg-deep)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '4px', color: 'var(--gold)', fontSize: '1.1rem' }}>{code.id}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>{code.active ? '● Active' : '○ Used'}</div>
                  </div>
                  <button onClick={() => { deleteCode(code.id); setRefreshKey(k => k + 1); }}
                    style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(239,68,68,0.1)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#f87171', transition: 'background 0.2s' }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ ANALYTICS ═══ */}
        {activeTab === 'analytics' && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
              <div className="profile-section-card">
                <div className="profile-section-title"><span>Growth Metrics</span></div>
                {[
                  { label: 'Monthly Active Users', value: '2,471', change: '+18%' },
                  { label: 'New Signups (30d)', value: '342', change: '+24%' },
                  { label: 'Investor Conversions', value: '47', change: '+12%' },
                  { label: 'Page Views (30d)', value: '89,231', change: '+31%' },
                ].map((m, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{m.label}</span>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontWeight: 600, fontFamily: 'var(--font-display)' }}>{m.value}</span>
                      <span style={{ fontSize: '0.75rem', color: '#4ade80', marginLeft: '8px' }}>{m.change}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="profile-section-card">
                <div className="profile-section-title"><span>Top Content</span></div>
                {[
                  { title: '$250M Investment Milestone Post', views: '12,453', engagement: '94%' },
                  { title: 'NeuroFlow AI Series A Announcement', views: '8,912', engagement: '89%' },
                  { title: 'Golden Angels Community Update', views: '6,234', engagement: '82%' },
                  { title: 'Solaris Grid Kenya Launch', views: '5,891', engagement: '91%' },
                ].map((c, i) => (
                  <div key={i} style={{ padding: '10px 0', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 500, marginBottom: '4px' }}>{c.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.views} views · {c.engagement} engagement</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ═══ SETTINGS ═══ */}
        {activeTab === 'settings' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '16px' }}>
            <div className="profile-section-card">
              <div className="profile-section-title"><span>General Settings</span></div>
              <div className="form-group"><label>Platform Name</label><input className="form-input" defaultValue="Golden Angels" /></div>
              <div className="form-group"><label>Contact Email</label><input className="form-input" type="email" defaultValue="goldenenterprises.ceo@gmail.com" /></div>
              <div className="form-group"><label>Platform Tagline</label><input className="form-input" defaultValue="Guarding Vision with Divine Care" /></div>
              <button className="btn-gold" style={{ marginTop: '8px' }}>Save Changes</button>
            </div>
            <div className="profile-section-card">
              <div className="profile-section-title"><span>Security</span></div>
              <div className="form-group"><label>Change Admin Password</label><input className="form-input" type="password" placeholder="New password" /></div>
              <div className="form-group"><label>Two-Factor Authentication</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '44px', height: '24px', borderRadius: '12px', background: 'var(--gold)', cursor: 'pointer', position: 'relative' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'white', position: 'absolute', top: '2px', right: '2px' }} />
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Enabled</span>
                </div>
              </div>
              <button className="btn-gold" style={{ marginTop: '8px' }}>Update Security</button>
            </div>
          </div>
        )}
      </div>
    </LoggedInLayout>
  );
}

export default function AdminPage() {
  return <AuthProvider><AdminContent /></AuthProvider>;
}
