'use client';
import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from '../../../components/AuthProvider';
import LoggedInLayout from '../../../components/LoggedInLayout';
import { MessageSquare, Search, Send, Circle } from 'lucide-react';

const contacts = [
  { id: 1, name: 'Sarah Chen', role: 'Partner, Sequoia', lastMsg: 'Looking forward to the Q3 review meeting!', time: '2m ago', online: true },
  { id: 2, name: 'Marcus Williams', role: 'Founder, NeuroFlow AI', lastMsg: 'The Series A docs are ready for review.', time: '1h ago', online: true },
  { id: 3, name: 'Elena Vasquez', role: 'CTO, Solaris Grid', lastMsg: 'Kenya deployment is live! 🎉', time: '3h ago', online: false },
  { id: 4, name: 'James Kim', role: 'Angel Investor', lastMsg: 'Can we schedule a call about the new fund?', time: '1d ago', online: false },
  { id: 5, name: 'Golden Angels Team', role: 'Official', lastMsg: 'Welcome to Golden Angels! We are thrilled...', time: '2d ago', online: true },
];

function MessagesContent() {
  const { user, loading } = useAuth();
  const [selected, setSelected] = useState(1);
  const [msgInput, setMsgInput] = useState('');
  const [messages, setMessages] = useState({
    1: [
      { from: 'them', text: 'Looking forward to the Q3 review meeting!', time: '2:30 PM' },
      { from: 'me', text: 'Same here! I will prepare the portfolio summary.', time: '2:31 PM' },
    ],
    2: [
      { from: 'them', text: 'The Series A docs are ready for review.', time: '11:00 AM' },
      { from: 'me', text: 'Excellent! I will review them this afternoon.', time: '11:15 AM' },
      { from: 'them', text: 'Perfect. Let me know if you need anything.', time: '11:16 AM' },
    ],
  });

  const handleSend = () => {
    if (!msgInput.trim()) return;
    setMessages(prev => ({
      ...prev,
      [selected]: [...(prev[selected] || []), { from: 'me', text: msgInput, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]
    }));
    setMsgInput('');
  };

  if (loading || !user) return null;

  const activeContact = contacts.find(c => c.id === selected);

  return (
    <LoggedInLayout>
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', height: 'calc(100vh - 60px)' }}>
        {/* Contact List */}
        <div style={{ borderRight: '1px solid rgba(255,255,255,0.04)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
            <h2 style={{ fontSize: '1.1rem', marginBottom: '12px' }}>Messages</h2>
            <div className="topbar-search" style={{ borderRadius: '8px' }}>
              <Search size={14} className="topbar-search-icon" />
              <input placeholder="Search messages..." style={{ padding: '8px', background: 'transparent', border: 'none', color: 'var(--text-primary)', fontSize: '0.82rem', outline: 'none', width: '100%' }} />
            </div>
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {contacts.map(c => (
              <div key={c.id} onClick={() => setSelected(c.id)}
                style={{
                  display: 'flex', gap: '12px', padding: '14px 16px', cursor: 'pointer',
                  background: selected === c.id ? 'var(--gold-muted)' : 'transparent',
                  borderLeft: selected === c.id ? '3px solid var(--gold)' : '3px solid transparent',
                  transition: 'all 0.2s'
                }}>
                <div style={{ position: 'relative' }}>
                  <div className="feed-post-avatar" style={{ width: '44px', height: '44px' }}>{c.name[0]}</div>
                  {c.online && <div style={{ position: 'absolute', bottom: '0', right: '0', width: '12px', height: '12px', borderRadius: '50%', background: '#4ade80', border: '2px solid var(--bg-void)' }} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{c.name}</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{c.time}</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.lastMsg}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="feed-post-avatar" style={{ width: '36px', height: '36px', fontSize: '0.85rem' }}>{activeContact?.name[0]}</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{activeContact?.name}</div>
              <div style={{ fontSize: '0.72rem', color: activeContact?.online ? '#4ade80' : 'var(--text-muted)' }}>{activeContact?.online ? '● Online' : '○ Offline'}</div>
            </div>
          </div>
          <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {(messages[selected] || []).map((msg, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: msg.from === 'me' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '65%', padding: '10px 16px', borderRadius: '14px',
                  background: msg.from === 'me' ? 'var(--gold-muted)' : 'var(--bg-elevated)',
                  border: msg.from === 'me' ? '1px solid var(--gold-border)' : '1px solid rgba(255,255,255,0.04)',
                  color: 'var(--text-primary)', fontSize: '0.88rem', lineHeight: 1.5,
                }}>
                  <div>{msg.text}</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textAlign: 'right', marginTop: '4px' }}>{msg.time}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: '12px 20px', borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', gap: '12px' }}>
            <input className="post-composer-input" placeholder="Type a message..." value={msgInput} onChange={e => setMsgInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              style={{ flex: 1, borderRadius: '12px' }} />
            <button className="btn-gold" onClick={handleSend} style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '6px' }}><Send size={16} /> Send</button>
          </div>
        </div>
      </div>
    </LoggedInLayout>
  );
}

export default function MessagesPage() { return <AuthProvider><MessagesContent /></AuthProvider>; }
