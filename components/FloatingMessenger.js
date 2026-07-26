'use client';
import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, User, HelpCircle, ArrowRight, Maximize2, Minimize2, Search, Paperclip, Smile, ChevronDown, Image, FileText, Phone, Video, MoreHorizontal, Circle, Plus, Users, Settings, Edit } from 'lucide-react';

const EMOJIS = ['😀','😂','🥰','😎','🤩','🔥','💰','🚀','✨','💎','👏','🙌','💪','🎯','⭐','💡','🌟','❤️','💜','💙','🤝','👋','🎉','🎊','✅','📈','🌍','🦋','🏆','👑'];

const allContacts = [
  { id: 1, name: 'Sarah Chen', role: 'Investor • Sequoia Capital', avatar: 'S', status: 'online', lastMsg: 'Sounds great, let\'s connect!', time: '2m', unread: 2, color: '#D4AF37' },
  { id: 2, name: 'Marcus Williams', role: 'Founder • NeuroFlow AI', avatar: 'M', status: 'offline', lastMsg: 'Thanks for the intro.', time: '1h', unread: 0, color: '#7B68EE' },
  { id: 3, name: 'Elena Vasquez', role: 'Mentor • Golden Angels', avatar: 'E', status: 'online', lastMsg: 'See you at the summit.', time: '3h', unread: 1, color: '#FF6B6B' },
  { id: 4, name: 'James O\'Brien', role: 'Angel Investor', avatar: 'J', status: 'online', lastMsg: 'The deal looks solid. I\'m in.', time: '5h', unread: 0, color: '#4ECDC4' },
  { id: 5, name: 'Aisha Patel', role: 'Analyst • Goldman Sachs', avatar: 'A', status: 'offline', lastMsg: 'Report is ready for review.', time: '1d', unread: 0, color: '#FF9F43' },
  { id: 6, name: 'David Kim', role: 'CTO • Solaris Grid', avatar: 'D', status: 'online', lastMsg: 'Prototype is live!', time: '1d', unread: 3, color: '#45B7D1' },
  { id: 7, name: 'Rachel Torres', role: 'VP Operations', avatar: 'R', status: 'offline', lastMsg: 'Quarterly targets exceeded.', time: '2d', unread: 0, color: '#96CEB4' },
  { id: 8, name: 'Michael Brooks', role: 'Partner • Andreessen', avatar: 'M', status: 'online', lastMsg: 'Let\'s schedule a call.', time: '3d', unread: 0, color: '#DDA0DD' },
  { id: 9, name: 'Lisa Wong', role: 'Founder • BioNova', avatar: 'L', status: 'offline', lastMsg: 'Phase 3 trials begin next month.', time: '1w', unread: 0, color: '#FFEAA7' },
  { id: 10, name: 'Carlos Rivera', role: 'Fund Manager', avatar: 'C', status: 'online', lastMsg: 'Portfolio rebalanced.', time: '1w', unread: 0, color: '#74B9FF' },
];

const friendsList = [
  { id: 1, name: 'Sarah Chen', avatar: 'S', status: 'online', color: '#D4AF37' },
  { id: 3, name: 'Elena Vasquez', avatar: 'E', status: 'online', color: '#FF6B6B' },
  { id: 4, name: 'James O\'Brien', avatar: 'J', status: 'online', color: '#4ECDC4' },
  { id: 6, name: 'David Kim', avatar: 'D', status: 'online', color: '#45B7D1' },
  { id: 8, name: 'Michael Brooks', avatar: 'M', status: 'online', color: '#DDA0DD' },
  { id: 10, name: 'Carlos Rivera', avatar: 'C', status: 'online', color: '#74B9FF' },
];

export default function FloatingMessenger() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAiMode, setIsAiMode] = useState(false);
  const [activeContact, setActiveContact] = useState(null);
  const [message, setMessage] = useState('');
  const [chatHistories, setChatHistories] = useState({});
  const [showEmoji, setShowEmoji] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchScope, setSearchScope] = useState('all');
  const [showScopeDropdown, setShowScopeDropdown] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [sidebarTab, setSidebarTab] = useState('chats'); // 'chats' | 'friends' | 'online'
  const fileInputRef = useRef(null);
  const chatEndRef = useRef(null);
  const emojiRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistories, activeContact]);

  useEffect(() => {
    const handleClick = (e) => {
      if (emojiRef.current && !emojiRef.current.contains(e.target)) setShowEmoji(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const getChatKey = () => {
    if (!activeContact) return null;
    if (activeContact === 'ai') return 'ai-support';
    return `contact-${activeContact.id}`;
  };

  const currentHistory = chatHistories[getChatKey()] || [];

  const handleSend = () => {
    if (!message.trim() && attachments.length === 0) return;
    const key = getChatKey();
    const newMsg = { text: message, sender: 'me', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), attachments: [...attachments] };
    setChatHistories(prev => ({ ...prev, [key]: [...(prev[key] || []), newMsg] }));
    setMessage('');
    setAttachments([]);
    if (isAiMode && activeContact === 'ai') {
      setTimeout(() => {
        const replies = ['I\'d be happy to help! What specific area are you looking into?', 'Great question! Our investment team specializes in that sector.', 'Let me look into that for you. Is there anything else?', 'Thank you for reaching out! Here\'s what I can share...'];
        setChatHistories(prev => ({ ...prev, [key]: [...(prev[key] || []), { text: replies[Math.floor(Math.random() * replies.length)], sender: 'ai', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }] }));
      }, 1200);
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setAttachments(prev => [...prev, ...files.map(f => ({ name: f.name, size: (f.size / 1024).toFixed(1) + ' KB', type: f.type.startsWith('image') ? 'image' : 'file' }))]);
  };

  const filteredContacts = allContacts.filter(c => {
    const matchesSearch = !searchQuery || c.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesScope = searchScope === 'all' || c.status === 'online';
    return matchesSearch && matchesScope;
  });

  const accentColor = isAiMode ? '#00d4ff' : 'var(--gold)';

  // ═══ CLOSED STATE ═══
  if (!isOpen) {
    return (
      <button onClick={() => setIsOpen(true)} style={{ position: 'fixed', bottom: '24px', right: '24px', width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold-dark), var(--gold-bright))', color: 'black', border: 'none', cursor: 'pointer', zIndex: 9998, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 24px rgba(212,175,55,0.4)', transition: 'transform 0.2s, box-shadow 0.2s' }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(212,175,55,0.6)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(212,175,55,0.4)'; }}>
        <MessageSquare size={24} />
        <div style={{ position: 'absolute', top: '-2px', right: '-2px', width: '18px', height: '18px', borderRadius: '50%', background: '#ef4444', color: 'white', fontSize: '0.65rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--bg-void)' }}>3</div>
      </button>
    );
  }

  // ═══ COMPACT PANEL (non-fullscreen) ═══
  if (!isFullscreen) {
    return (
      <div style={{ position: 'fixed', bottom: '24px', right: '24px', width: '380px', height: '520px', borderRadius: '16px', zIndex: 9999, background: 'var(--bg-card)', border: `1px solid ${isAiMode ? 'rgba(0,212,255,0.3)' : 'var(--gold-border)'}`, display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: `0 20px 60px rgba(0,0,0,0.6), 0 0 40px ${isAiMode ? 'rgba(0,212,255,0.1)' : 'rgba(212,175,55,0.05)'}` }}>
        {/* Header */}
        <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0, background: isAiMode ? 'rgba(0,212,255,0.04)' : 'transparent' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {activeContact ? (
              <button onClick={() => setActiveContact(null)} style={{ color: accentColor, background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>← Back</button>
            ) : (
              <h3 style={{ margin: 0, fontSize: '1rem' }}>{isAiMode ? '✦ Support' : 'Messages'}</h3>
            )}
          </div>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button onClick={() => { setIsAiMode(!isAiMode); setActiveContact(null); }} style={{ padding: '5px 8px', borderRadius: '6px', background: isAiMode ? 'rgba(0,212,255,0.15)' : 'rgba(255,255,255,0.05)', color: isAiMode ? '#00d4ff' : 'var(--text-muted)', border: 'none', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '3px' }}><HelpCircle size={12} /> Support</button>
            <button onClick={() => setIsFullscreen(true)} style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}><Maximize2 size={15} /></button>
            <button onClick={() => setIsOpen(false)} style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}><X size={15} /></button>
          </div>
        </div>
        {/* Body */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {!activeContact ? (
            <>
              {!isAiMode && (
                <div style={{ padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,0.04)', flexShrink: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.04)', borderRadius: '8px', padding: '0 10px' }}>
                    <Search size={13} style={{ color: 'var(--text-muted)' }} />
                    <input type="text" placeholder="Search..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ flex: 1, padding: '7px', background: 'none', border: 'none', color: 'white', fontSize: '0.82rem', outline: 'none' }} />
                  </div>
                </div>
              )}
              <div style={{ flex: 1, overflowY: 'auto', padding: '4px 8px' }}>
                {isAiMode ? (
                  <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[{ key: 'ai', icon: HelpCircle, title: 'Chat with AI', desc: 'Get instant help' }, { key: 'ticket', icon: Send, title: 'Support Ticket', desc: 'Email our team' }].map(opt => (
                      <div key={opt.key} onClick={() => setActiveContact(opt.key)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', borderRadius: '10px', background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.12)', cursor: 'pointer' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(0,212,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00d4ff' }}><opt.icon size={18} /></div>
                        <div style={{ flex: 1 }}><div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{opt.title}</div><div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{opt.desc}</div></div>
                        <ArrowRight size={14} style={{ color: '#00d4ff' }} />
                      </div>
                    ))}
                  </div>
                ) : filteredContacts.slice(0, 6).map(c => (
                  <div key={c.id} onClick={() => setActiveContact(c)} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', borderRadius: '8px', cursor: 'pointer', transition: 'background 0.15s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <div style={{ position: 'relative' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'white', fontSize: '0.85rem' }}>{c.avatar}</div>
                      {c.status === 'online' && <div style={{ position: 'absolute', bottom: 0, right: 0, width: '10px', height: '10px', borderRadius: '50%', background: '#4ade80', border: '2px solid var(--bg-card)' }} />}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{c.name}</div>
                      <div style={{ fontSize: '0.73rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.lastMsg}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{c.time}</span>
                      {c.unread > 0 && <span style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'var(--gold)', color: 'black', fontSize: '0.6rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{c.unread}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : activeContact === 'ticket' ? (
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h4 style={{ margin: 0, color: '#00d4ff' }}>Submit a Ticket</h4>
              <input type="email" placeholder="Your email" style={{ padding: '10px', borderRadius: '8px', background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.12)', color: 'white', fontSize: '0.85rem', outline: 'none' }} />
              <input type="text" placeholder="Subject" style={{ padding: '10px', borderRadius: '8px', background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.12)', color: 'white', fontSize: '0.85rem', outline: 'none' }} />
              <textarea placeholder="Describe your issue..." rows={3} style={{ padding: '10px', borderRadius: '8px', background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.12)', color: 'white', fontSize: '0.85rem', resize: 'vertical', outline: 'none' }} />
              <button onClick={() => setActiveContact(null)} style={{ padding: '10px', borderRadius: '8px', background: '#00d4ff', color: 'black', fontWeight: 700, border: 'none', cursor: 'pointer' }}>Submit</button>
            </div>
          ) : (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <div style={{ padding: '8px 14px', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: activeContact === 'ai' ? 'rgba(0,212,255,0.15)' : (activeContact.color || 'var(--gold-muted)'), display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: activeContact === 'ai' ? '#00d4ff' : 'white', fontSize: '0.7rem' }}>{activeContact === 'ai' ? '✦' : activeContact.avatar}</div>
                <div style={{ flex: 1 }}><div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{activeContact === 'ai' ? 'GA AI' : activeContact.name}</div></div>
              </div>
              <div style={{ flex: 1, overflowY: 'auto', padding: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {currentHistory.length === 0 && <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '30px', fontSize: '0.82rem' }}>Start a conversation...</div>}
                {currentHistory.map((msg, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: msg.sender === 'me' ? 'flex-end' : 'flex-start' }}>
                    <div style={{ maxWidth: '78%', padding: '8px 12px', borderRadius: msg.sender === 'me' ? '12px 12px 4px 12px' : '12px 12px 12px 4px', background: msg.sender === 'me' ? (isAiMode ? 'rgba(0,212,255,0.2)' : 'var(--gold-muted)') : 'rgba(255,255,255,0.06)', fontSize: '0.82rem', lineHeight: 1.4 }}>
                      {msg.attachments?.map((att, j) => (<div key={j} style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', marginBottom: '4px', fontSize: '0.72rem' }}>{att.type === 'image' ? <Image size={11} /> : <FileText size={11} />} {att.name}</div>))}
                      {msg.text}
                      <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginTop: '2px', textAlign: 'right' }}>{msg.time}</div>
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
              <div style={{ padding: '8px 12px', borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                <div style={{ position: 'relative' }} ref={emojiRef}>
                  <button onClick={() => setShowEmoji(!showEmoji)} style={{ color: showEmoji ? accentColor : 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', padding: '3px' }}><Smile size={16} /></button>
                  {showEmoji && (<div style={{ position: 'absolute', bottom: '32px', left: 0, background: 'var(--bg-elevated)', border: '1px solid var(--gold-border)', borderRadius: '10px', padding: '8px', display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '2px', width: '200px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', zIndex: 100 }}>{EMOJIS.map((e, i) => (<button key={i} onClick={() => { setMessage(p => p + e); setShowEmoji(false); }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem', padding: '3px', borderRadius: '4px' }} onMouseEnter={ev => ev.target.style.background = 'rgba(255,255,255,0.1)'} onMouseLeave={ev => ev.target.style.background = 'none'}>{e}</button>))}</div>)}
                </div>
                <button onClick={() => fileInputRef.current?.click()} style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', padding: '3px' }}><Paperclip size={16} /></button>
                <input ref={fileInputRef} type="file" multiple style={{ display: 'none' }} onChange={handleFileUpload} />
                <input type="text" placeholder="Aa" value={message} onChange={e => setMessage(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} style={{ flex: 1, padding: '7px 12px', borderRadius: '18px', background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white', fontSize: '0.82rem', outline: 'none' }} />
                <button onClick={handleSend} style={{ width: '30px', height: '30px', borderRadius: '50%', background: accentColor, color: isAiMode ? 'white' : 'black', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Send size={13} /></button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ═══ FULLSCREEN MODE — Facebook Messenger Style ═══
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'var(--bg-void)', display: 'flex' }}>
      
      {/* LEFT SIDEBAR — Friends + Recent Chats */}
      <div style={{ width: '340px', borderRight: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', background: 'var(--bg-card)', flexShrink: 0 }}>
        {/* Sidebar Header */}
        <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800 }}>Chats</h2>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Edit size={16} /></button>
              <button onClick={() => { setIsFullscreen(false); }} style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Minimize2 size={16} /></button>
              <button onClick={() => { setIsOpen(false); setIsFullscreen(false); }} style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={16} /></button>
            </div>
          </div>

          {/* Search */}
          <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', padding: '0 14px' }}>
            <Search size={15} style={{ color: 'var(--text-muted)' }} />
            <input type="text" placeholder="Search Messenger" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ flex: 1, padding: '10px', background: 'none', border: 'none', color: 'white', fontSize: '0.9rem', outline: 'none' }} />
            <div style={{ position: 'relative' }}>
              <button onClick={() => setShowScopeDropdown(!showScopeDropdown)} style={{ padding: '4px 8px', borderRadius: '6px', background: 'rgba(255,255,255,0.06)', color: 'var(--text-muted)', border: 'none', cursor: 'pointer', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '3px' }}>{searchScope === 'all' ? 'All' : 'Friends'} <ChevronDown size={10} /></button>
              {showScopeDropdown && (
                <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '4px', background: 'var(--bg-elevated)', border: '1px solid var(--gold-border)', borderRadius: '8px', overflow: 'hidden', zIndex: 10, minWidth: '130px', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}>
                  {['all', 'friends'].map(s => (
                    <button key={s} onClick={() => { setSearchScope(s); setShowScopeDropdown(false); }} style={{ width: '100%', padding: '10px 16px', background: searchScope === s ? 'rgba(212,175,55,0.1)' : 'transparent', color: searchScope === s ? 'var(--gold)' : 'white', border: 'none', cursor: 'pointer', textAlign: 'left', fontSize: '0.85rem' }}>{s === 'all' ? 'All of Site' : 'Friends Only'}</button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', padding: '0 16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
          {[{ key: 'chats', label: 'Inbox', icon: MessageSquare }, { key: 'friends', label: 'Friends', icon: Users }, { key: 'online', label: 'Active', icon: Circle }].map(tab => (
            <button key={tab.key} onClick={() => setSidebarTab(tab.key)} style={{ flex: 1, padding: '12px 0', background: 'none', border: 'none', borderBottom: sidebarTab === tab.key ? '2px solid var(--gold)' : '2px solid transparent', color: sidebarTab === tab.key ? 'var(--gold)' : 'var(--text-muted)', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', transition: 'all 0.2s' }}>
              <tab.icon size={14} /> {tab.label}
            </button>
          ))}
        </div>

        {/* Contact List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
          {sidebarTab === 'chats' && filteredContacts.map(c => (
            <div key={c.id} onClick={() => setActiveContact(c)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '10px', cursor: 'pointer', background: activeContact?.id === c.id ? 'rgba(212,175,55,0.08)' : 'transparent', transition: 'background 0.15s' }} onMouseEnter={e => { if (activeContact?.id !== c.id) e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }} onMouseLeave={e => { if (activeContact?.id !== c.id) e.currentTarget.style.background = 'transparent'; }}>
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'white', fontSize: '1rem' }}>{c.avatar}</div>
                {c.status === 'online' && <div style={{ position: 'absolute', bottom: '1px', right: '1px', width: '12px', height: '12px', borderRadius: '50%', background: '#4ade80', border: '2.5px solid var(--bg-card)' }} />}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: c.unread > 0 ? 700 : 500, fontSize: '0.92rem', color: c.unread > 0 ? 'white' : 'var(--text-primary)' }}>{c.name}</div>
                <div style={{ fontSize: '0.78rem', color: c.unread > 0 ? 'var(--text-secondary)' : 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: c.unread > 0 ? 600 : 400 }}>{c.lastMsg} · {c.time}</div>
              </div>
              {c.unread > 0 && <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--gold)', color: 'black', fontSize: '0.65rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{c.unread}</div>}
            </div>
          ))}

          {sidebarTab === 'friends' && friendsList.map(f => (
            <div key={f.id} onClick={() => setActiveContact(allContacts.find(c => c.id === f.id))} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '10px', cursor: 'pointer', transition: 'background 0.15s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: f.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'white' }}>{f.avatar}</div>
              <div style={{ flex: 1 }}><div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{f.name}</div><div style={{ fontSize: '0.75rem', color: '#4ade80' }}>Active now</div></div>
              <button style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><MessageSquare size={14} /></button>
            </div>
          ))}

          {sidebarTab === 'online' && allContacts.filter(c => c.status === 'online').map(c => (
            <div key={c.id} onClick={() => setActiveContact(c)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '10px', cursor: 'pointer', transition: 'background 0.15s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <div style={{ position: 'relative' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'white' }}>{c.avatar}</div>
                <div style={{ position: 'absolute', bottom: '1px', right: '1px', width: '11px', height: '11px', borderRadius: '50%', background: '#4ade80', border: '2px solid var(--bg-card)' }} />
              </div>
              <div style={{ flex: 1 }}><div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{c.name}</div><div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.role}</div></div>
            </div>
          ))}
        </div>

        {/* AI Support toggle */}
        <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <button onClick={() => { setIsAiMode(!isAiMode); setActiveContact(isAiMode ? null : 'ai'); }} style={{ width: '100%', padding: '10px', borderRadius: '10px', background: isAiMode ? 'rgba(0,212,255,0.12)' : 'rgba(255,255,255,0.04)', border: `1px solid ${isAiMode ? 'rgba(0,212,255,0.2)' : 'rgba(255,255,255,0.06)'}`, color: isAiMode ? '#00d4ff' : 'var(--text-secondary)', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <HelpCircle size={16} /> {isAiMode ? 'Exit Support Mode' : 'GA Support'}
          </button>
        </div>
      </div>

      {/* RIGHT MAIN — Chat Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--bg-void)' }}>
        {!activeContact ? (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold-dark), var(--gold-bright))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><MessageSquare size={36} color="black" /></div>
            <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Your Messages</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '400px', textAlign: 'center' }}>Send private messages to investors, founders, and partners in the Golden Angels network.</p>
            <button className="btn-gold" onClick={() => setSidebarTab('friends')} style={{ marginTop: '8px' }}>Start Chatting</button>
          </div>
        ) : activeContact === 'ticket' ? (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '500px', maxWidth: '90%' }}>
              <h2 style={{ color: '#00d4ff', marginBottom: '24px' }}>Submit a Support Ticket</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <input type="email" placeholder="Your email" style={{ padding: '14px', borderRadius: '10px', background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.12)', color: 'white', fontSize: '0.95rem', outline: 'none' }} />
                <input type="text" placeholder="Subject" style={{ padding: '14px', borderRadius: '10px', background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.12)', color: 'white', fontSize: '0.95rem', outline: 'none' }} />
                <textarea placeholder="Describe your issue..." rows={6} style={{ padding: '14px', borderRadius: '10px', background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.12)', color: 'white', fontSize: '0.95rem', resize: 'vertical', outline: 'none' }} />
                <button onClick={() => setActiveContact(null)} style={{ padding: '14px', borderRadius: '10px', background: '#00d4ff', color: 'black', fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: '1rem' }}>Submit Ticket</button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Chat Header */}
            <div style={{ padding: '12px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-card)', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: activeContact === 'ai' ? 'rgba(0,212,255,0.15)' : (activeContact.color || 'var(--gold-muted)'), display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: activeContact === 'ai' ? '#00d4ff' : 'white' }}>{activeContact === 'ai' ? '✦' : activeContact.avatar}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '1rem' }}>{activeContact === 'ai' ? 'GA AI Support' : activeContact.name}</div>
                  <div style={{ fontSize: '0.78rem', color: activeContact === 'ai' ? '#00d4ff' : '#4ade80' }}>{activeContact === 'ai' ? 'Always online' : (activeContact.status === 'online' ? 'Active now' : `Last seen ${activeContact.time} ago`)}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {activeContact !== 'ai' && (
                  <>
                    <button style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: 'none', color: 'var(--gold)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Phone size={18} /></button>
                    <button style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: 'none', color: 'var(--gold)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Video size={18} /></button>
                  </>
                )}
                <button style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><MoreHorizontal size={18} /></button>
              </div>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {currentHistory.length === 0 && (
                <div style={{ textAlign: 'center', marginTop: '60px' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: activeContact === 'ai' ? 'rgba(0,212,255,0.15)' : (activeContact.color || 'var(--gold-muted)'), display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: activeContact === 'ai' ? '#00d4ff' : 'white', fontSize: '1.5rem', margin: '0 auto 16px' }}>{activeContact === 'ai' ? '✦' : activeContact.avatar}</div>
                  <h3 style={{ marginBottom: '4px' }}>{activeContact === 'ai' ? 'GA AI Support' : activeContact.name}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{activeContact === 'ai' ? 'Ask me anything about Golden Angels' : activeContact.role}</p>
                </div>
              )}
              {currentHistory.map((msg, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: msg.sender === 'me' ? 'flex-end' : 'flex-start', alignItems: 'flex-end', gap: '8px' }}>
                  {msg.sender !== 'me' && <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: activeContact === 'ai' ? 'rgba(0,212,255,0.15)' : (activeContact.color || '#666'), display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: activeContact === 'ai' ? '#00d4ff' : 'white', fontSize: '0.65rem', flexShrink: 0 }}>{activeContact === 'ai' ? '✦' : activeContact.avatar}</div>}
                  <div style={{ maxWidth: '55%', padding: '10px 16px', borderRadius: msg.sender === 'me' ? '18px 18px 4px 18px' : '18px 18px 18px 4px', background: msg.sender === 'me' ? (isAiMode ? 'rgba(0,212,255,0.25)' : 'var(--gold-muted)') : 'rgba(255,255,255,0.06)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                    {msg.attachments?.map((att, j) => (<div key={j} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 10px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', marginBottom: '6px', fontSize: '0.78rem' }}>{att.type === 'image' ? <Image size={12} /> : <FileText size={12} />} {att.name}</div>))}
                    {msg.text}
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '4px', textAlign: 'right' }}>{msg.time}</div>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Attachments */}
            {attachments.length > 0 && (
              <div style={{ padding: '8px 24px', borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {attachments.map((att, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 10px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', fontSize: '0.78rem' }}>{att.type === 'image' ? <Image size={12} /> : <FileText size={12} />} {att.name} <button onClick={() => setAttachments(a => a.filter((_, j) => j !== i))} style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}><X size={12} /></button></div>
                ))}
              </div>
            )}

            {/* Input */}
            <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--bg-card)', flexShrink: 0 }}>
              <button onClick={() => fileInputRef.current?.click()} style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: 'none', color: accentColor, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Paperclip size={18} /></button>
              <input ref={fileInputRef} type="file" multiple style={{ display: 'none' }} onChange={handleFileUpload} />
              <div style={{ position: 'relative' }} ref={emojiRef}>
                <button onClick={() => setShowEmoji(!showEmoji)} style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: 'none', color: showEmoji ? accentColor : 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Smile size={18} /></button>
                {showEmoji && (<div style={{ position: 'absolute', bottom: '44px', left: 0, background: 'var(--bg-elevated)', border: '1px solid var(--gold-border)', borderRadius: '12px', padding: '12px', display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '4px', width: '360px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', zIndex: 100 }}>{EMOJIS.map((e, i) => (<button key={i} onClick={() => { setMessage(p => p + e); setShowEmoji(false); }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.3rem', padding: '6px', borderRadius: '6px' }} onMouseEnter={ev => ev.target.style.background = 'rgba(255,255,255,0.1)'} onMouseLeave={ev => ev.target.style.background = 'none'}>{e}</button>))}</div>)}
              </div>
              <input type="text" placeholder="Type a message..." value={message} onChange={e => setMessage(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} style={{ flex: 1, padding: '12px 20px', borderRadius: '24px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)', color: 'white', fontSize: '0.95rem', outline: 'none' }} />
              <button onClick={handleSend} style={{ width: '42px', height: '42px', borderRadius: '50%', background: message.trim() ? accentColor : 'rgba(255,255,255,0.05)', color: message.trim() ? (isAiMode ? 'white' : 'black') : 'var(--text-muted)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}><Send size={18} /></button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
