'use client';
import { useState } from 'react';
import { AuthProvider, useAuth } from '../../../components/AuthProvider';
import LoggedInLayout from '../../../components/LoggedInLayout';
import { Settings, User, Bell, Shield, Palette, Globe, Mail, Check } from 'lucide-react';

function SettingsContent() {
  const { user, loading, getProfile, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({});

  useState(() => {
    if (user) setProfile(getProfile(user.uid) || {});
  }, [user]);

  const handleSave = () => {
    if (user) updateProfile(user.uid, profile);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (loading || !user) return null;

  const tabs = [
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'privacy', icon: Shield, label: 'Privacy' },
    { id: 'appearance', icon: Palette, label: 'Appearance' },
  ];

  return (
    <LoggedInLayout>
      <div style={{ padding: '24px', maxWidth: '900px' }}>
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Settings size={22} color="var(--gold)" /> <span className="gold-text">Settings</span>
          </h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '24px' }}>
          {/* Tab nav */}
          <div>
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '10px 14px',
                  borderRadius: '10px', fontSize: '0.85rem', marginBottom: '4px', cursor: 'pointer', border: 'none', transition: 'all 0.2s',
                  background: activeTab === tab.id ? 'var(--gold-muted)' : 'transparent',
                  color: activeTab === tab.id ? 'var(--gold)' : 'var(--text-muted)',
                }}>
                <tab.icon size={16} /> {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div>
            {activeTab === 'profile' && (
              <div className="profile-section-card" style={{ padding: '24px' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '20px' }}>Profile Settings</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group"><label>Display Name</label><input className="form-input" defaultValue={user.displayName} /></div>
                  <div className="form-group"><label>Email</label><input className="form-input" type="email" defaultValue={user.email} readOnly style={{ opacity: 0.5 }} /></div>
                  <div className="form-group"><label>Bio</label><textarea className="form-input" defaultValue={profile.bio || ''} rows={3} style={{ resize: 'vertical' }} onChange={e => setProfile({...profile, bio: e.target.value})} /></div>
                  <div className="form-group"><label>Company</label><input className="form-input" defaultValue={profile.company || ''} onChange={e => setProfile({...profile, company: e.target.value})} /></div>
                  <div className="form-group"><label>Location</label><input className="form-input" defaultValue={profile.location || ''} onChange={e => setProfile({...profile, location: e.target.value})} /></div>
                  <div className="form-group"><label>Website</label><input className="form-input" defaultValue={profile.website || ''} onChange={e => setProfile({...profile, website: e.target.value})} /></div>
                </div>
                <button className="btn-gold" onClick={handleSave} style={{ marginTop: '16px', padding: '10px 28px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {saved ? <><Check size={16} /> Saved!</> : 'Save Changes'}
                </button>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="profile-section-card" style={{ padding: '24px' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '20px' }}>Notification Preferences</div>
                {[
                  { label: 'New investment opportunities', desc: 'Get notified about new deals', enabled: true },
                  { label: 'Portfolio updates', desc: 'Updates from your portfolio companies', enabled: true },
                  { label: 'Connection requests', desc: 'When someone wants to connect', enabled: true },
                  { label: 'Message notifications', desc: 'New messages from your network', enabled: true },
                  { label: 'Weekly digest', desc: 'Summary of platform activity', enabled: false },
                  { label: 'Marketing emails', desc: 'News and promotional content', enabled: false },
                ].map((n, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{n.label}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{n.desc}</div>
                    </div>
                    <div style={{ width: '44px', height: '24px', borderRadius: '12px', background: n.enabled ? 'var(--gold)' : 'var(--bg-elevated)', cursor: 'pointer', position: 'relative', transition: 'background 0.2s' }}>
                      <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'white', position: 'absolute', top: '2px', transition: 'all 0.2s', ...(n.enabled ? { right: '2px' } : { left: '2px' }) }} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="profile-section-card" style={{ padding: '24px' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '20px' }}>Privacy & Security</div>
                {[
                  { label: 'Profile Visibility', desc: 'Who can see your profile', value: 'Everyone' },
                  { label: 'Activity Status', desc: 'Show when you\'re online', value: 'Connections only' },
                  { label: 'Search Appearance', desc: 'Appear in search results', value: 'Enabled' },
                  { label: 'Two-Factor Auth', desc: 'Extra layer of security', value: 'Enabled' },
                ].map((s, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{s.label}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{s.desc}</div>
                    </div>
                    <select style={{ background: 'var(--bg-deep)', color: 'var(--text-primary)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', padding: '6px 12px', fontSize: '0.8rem', cursor: 'pointer' }} defaultValue={s.value}>
                      <option>{s.value}</option>
                    </select>
                  </div>
                ))}
                <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(239,68,68,0.06)', borderRadius: '10px', border: '1px solid rgba(239,68,68,0.12)' }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#f87171', marginBottom: '4px' }}>Danger Zone</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '12px' }}>Once you delete your account, there is no going back.</div>
                  <button style={{ padding: '8px 20px', borderRadius: '8px', background: 'rgba(239,68,68,0.12)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)', fontSize: '0.82rem', cursor: 'pointer' }}>Delete Account</button>
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="profile-section-card" style={{ padding: '24px' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '20px' }}>Appearance</div>
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 500, marginBottom: '12px' }}>Theme</div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    {[
                      { name: 'Obsidian Gold', colors: ['#000000', '#D4AF37'], active: true },
                      { name: 'Midnight Blue', colors: ['#0a0a1a', '#60a5fa'], active: false },
                      { name: 'Deep Rose', colors: ['#1a0a0a', '#e879a6'], active: false },
                    ].map((theme, i) => (
                      <div key={i} style={{
                        padding: '16px', borderRadius: '12px', cursor: 'pointer', flex: 1, textAlign: 'center',
                        background: 'var(--bg-deep)', border: theme.active ? '2px solid var(--gold)' : '2px solid rgba(255,255,255,0.04)',
                        transition: 'all 0.2s'
                      }}>
                        <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', marginBottom: '8px' }}>
                          {theme.colors.map((c, j) => <div key={j} style={{ width: '24px', height: '24px', borderRadius: '50%', background: c }} />)}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: theme.active ? 'var(--gold)' : 'var(--text-muted)' }}>{theme.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 500, marginBottom: '8px' }}>Font Size</div>
                <input type="range" min="12" max="18" defaultValue="14" style={{ width: '100%', accentColor: 'var(--gold)' }} />
              </div>
            )}
          </div>
        </div>
      </div>
    </LoggedInLayout>
  );
}

export default function SettingsPage() { return <AuthProvider><SettingsContent /></AuthProvider>; }
