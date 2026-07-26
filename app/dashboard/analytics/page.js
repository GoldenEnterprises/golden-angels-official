'use client';
import { useState } from 'react';
import { AuthProvider, useAuth } from '../../../components/AuthProvider';
import LoggedInLayout from '../../../components/LoggedInLayout';
import { BarChart3, TrendingUp, Users, Eye, ArrowUp, ArrowDown } from 'lucide-react';

function AnalyticsContent() {
  const { user, loading } = useAuth();

  if (loading || !user) return null;

  const metrics = [
    { label: 'Profile Views', value: '2,471', change: '+18%', up: true, period: 'vs last month' },
    { label: 'Post Impressions', value: '12,847', change: '+31%', up: true, period: 'vs last month' },
    { label: 'Search Appearances', value: '847', change: '+24%', up: true, period: 'vs last month' },
    { label: 'Connection Rate', value: '89%', change: '+5%', up: true, period: 'vs last month' },
  ];

  const weeklyViews = [
    { day: 'Mon', views: 142 }, { day: 'Tue', views: 198 },
    { day: 'Wed', views: 312 }, { day: 'Thu', views: 267 },
    { day: 'Fri', views: 445 }, { day: 'Sat', views: 189 },
    { day: 'Sun', views: 156 },
  ];
  const maxViews = Math.max(...weeklyViews.map(d => d.views));

  const topContent = [
    { title: 'Announced $250M Investment Milestone', impressions: '4,521', engagement: '12.4%', type: 'Post' },
    { title: 'NeuroFlow AI Partnership Update', impressions: '3,892', engagement: '9.8%', type: 'Post' },
    { title: 'Profile Page — About Section', impressions: '2,341', engagement: '—', type: 'Profile' },
    { title: 'Clean Energy Impact Report Q2', impressions: '1,987', engagement: '8.2%', type: 'Article' },
  ];

  const demographics = [
    { label: 'Investors', pct: 42 }, { label: 'Founders', pct: 28 },
    { label: 'Advisors', pct: 15 }, { label: 'Partners', pct: 10 },
    { label: 'Other', pct: 5 },
  ];

  return (
    <LoggedInLayout>
      <div style={{ padding: '24px', maxWidth: '1100px' }}>
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <BarChart3 size={22} color="var(--gold)" /> <span className="gold-text">Analytics</span>
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>Track your reach and engagement across Golden Angels</p>
        </div>

        {/* Metric Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '24px' }}>
          {metrics.map((m, i) => (
            <div key={i} className="profile-section-card" style={{ padding: '20px' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>{m.label}</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, fontFamily: 'var(--font-display)', marginBottom: '4px' }}>{m.value}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem' }}>
                {m.up ? <ArrowUp size={12} color="#4ade80" /> : <ArrowDown size={12} color="#f87171" />}
                <span style={{ color: m.up ? '#4ade80' : '#f87171' }}>{m.change}</span>
                <span style={{ color: 'var(--text-muted)' }}>{m.period}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '16px' }}>
          <div>
            {/* Weekly Chart */}
            <div className="profile-section-card" style={{ padding: '20px', marginBottom: '16px' }}>
              <div style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '20px' }}>Profile Views — Past 7 Days</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '160px' }}>
                {weeklyViews.map((d, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{d.views}</span>
                    <div style={{
                      width: '100%', borderRadius: '6px 6px 0 0',
                      height: `${(d.views / maxViews) * 130}px`,
                      background: `linear-gradient(to top, var(--gold-dark), var(--gold))`,
                      opacity: 0.7 + (d.views / maxViews) * 0.3,
                      transition: 'height 0.6s ease',
                    }} />
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{d.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Content */}
            <div className="profile-section-card" style={{ padding: '20px' }}>
              <div style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '16px' }}>Top Performing Content</div>
              {topContent.map((c, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < topContent.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 500, marginBottom: '2px' }}>{c.title}</div>
                    <span style={{ fontSize: '0.68rem', padding: '2px 6px', borderRadius: '3px', background: 'rgba(255,255,255,0.04)', color: 'var(--text-muted)' }}>{c.type}</span>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{c.impressions}</div>
                    <div style={{ fontSize: '0.72rem', color: '#4ade80' }}>{c.engagement} eng.</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right sidebar */}
          <div>
            <div className="profile-section-card" style={{ padding: '20px' }}>
              <div style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '16px' }}>Visitor Demographics</div>
              {demographics.map((d, i) => (
                <div key={i} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{d.label}</span>
                    <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>{d.pct}%</span>
                  </div>
                  <div style={{ background: 'var(--bg-deep)', borderRadius: '4px', height: '6px', overflow: 'hidden' }}>
                    <div style={{ width: `${d.pct}%`, height: '100%', background: 'linear-gradient(90deg, var(--gold-dark), var(--gold))', borderRadius: '4px', transition: 'width 0.8s ease' }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="profile-section-card" style={{ padding: '20px', marginTop: '16px' }}>
              <div style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '12px' }}>Quick Actions</div>
              <button className="btn-gold" style={{ width: '100%', padding: '10px', fontSize: '0.85rem', marginBottom: '8px' }}>Export Report</button>
              <button className="btn-outline" style={{ width: '100%', padding: '10px', fontSize: '0.85rem' }}>Share Analytics</button>
            </div>
          </div>
        </div>
      </div>
    </LoggedInLayout>
  );
}

export default function AnalyticsPage() { return <AuthProvider><AnalyticsContent /></AuthProvider>; }
