'use client';
import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AuthProvider, useAuth } from '../../../components/AuthProvider';
import LoggedInLayout from '../../../components/LoggedInLayout';
import {
  Camera, Edit3, MapPin, Globe, Briefcase, UserPlus, UserCheck, Star, Eye,
  Heart, MessageSquare, Share2, Bookmark, Image, Play, X, MoreHorizontal, ThumbsUp, Send
} from 'lucide-react';

const suggestedConnections = [
  { name: 'Alex Rivera', role: 'Founder, GreenTech Labs', initial: 'A' },
  { name: 'Priya Sharma', role: 'Managing Partner, Horizon VC', initial: 'P' },
  { name: 'David Chen', role: 'CTO, QuantumVault', initial: 'D' },
];

function ProfileContent() {
  const params = useParams();
  const uid = params.uid;
  const router = useRouter();
  const { user, logout, getProfile, updateProfile, getSocial, addPost, toggleSocialItem, getAllUsers } = useAuth();
  const [profile, setProfile] = useState({});
  const [social, setSocial] = useState({ favorites: [], friends: [], watchlist: [], bookmarks: [], posts: [] });
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});
  const [newPost, setNewPost] = useState('');
  const [postMedia, setPostMedia] = useState({ type: null, url: '' });
  const [showVideoInput, setShowVideoInput] = useState(false);
  const [likedPosts, setLikedPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [activeSection, setActiveSection] = useState('activity');
  const fileInputRef = useRef(null);
  const isOwner = user && user.uid === uid;

  // Find display user info
  const allUsers = user ? getAllUsers() : [];
  const profileUser = allUsers.find(u => u.id === uid) || user || {};

  useEffect(() => {
    if (uid) {
      const p = getProfile(uid);
      setProfile(p);
      setEditData(p);
      setSocial(getSocial(uid));
    }
  }, [uid, user]);

  const handleSaveProfile = () => { updateProfile(uid, editData); setProfile(editData); setEditMode(false); };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) { const r = new FileReader(); r.onload = (ev) => { const d = { ...editData, avatar: ev.target.result }; setEditData(d); updateProfile(uid, d); setProfile(d); }; r.readAsDataURL(file); }
  };
  const handleBannerUpload = (e) => {
    const file = e.target.files[0];
    if (file) { const r = new FileReader(); r.onload = (ev) => { const d = { ...editData, banner: ev.target.result }; setEditData(d); updateProfile(uid, d); setProfile(d); }; r.readAsDataURL(file); }
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) { const r = new FileReader(); r.onload = (ev) => setPostMedia({ type: 'image', url: ev.target.result }); r.readAsDataURL(file); }
  };
  const handlePost = () => {
    if (!newPost.trim() && !postMedia.url) return;
    addPost(uid, { text: newPost, mediaType: postMedia.type, mediaUrl: postMedia.url, author: user.displayName, authorUid: user.uid });
    setNewPost(''); setPostMedia({ type: null, url: '' }); setShowVideoInput(false);
    setSocial(getSocial(uid));
  };
  const getEmbed = (url) => { const m = url?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/); return m ? `https://www.youtube.com/embed/${m[1]}` : url; };
  const formatTime = (d) => { const diff = Date.now() - new Date(d).getTime(); const m = Math.floor(diff / 60000); if (m < 60) return `${m}m`; const h = Math.floor(m / 60); if (h < 24) return `${h}h`; return `${Math.floor(h / 24)}d`; };

  if (!user) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-void)' }}>
      <img src="/Golden Angels_LOGO.png" alt="Golden Angels" style={{ width: '80px', height: '80px', objectFit: 'contain', animation: 'pulse 2s ease-in-out infinite' }} />
    </div>
  );

  return (
    <LoggedInLayout>
      <div className="profile-layout">
        {/* ═══ Hero Card (LinkedIn-style) ═══ */}
        <div className="profile-hero-card">
          <div className="profile-banner" style={profile.banner ? { backgroundImage: `url(${profile.banner})` } : {}}>
            {isOwner && (
              <label className="profile-banner-edit">
                <Camera size={14} /> Edit banner
                <input type="file" accept="image/*" onChange={handleBannerUpload} style={{ display: 'none' }} />
              </label>
            )}
          </div>

          <div className="profile-avatar-section">
            <div className="profile-avatar-large">
              {profile.avatar ? <img src={profile.avatar} alt="" /> : (profileUser.displayName || 'U')[0].toUpperCase()}
              {isOwner && (
                <label className="profile-avatar-edit">
                  <Camera size={13} color="#000" />
                  <input type="file" accept="image/*" onChange={handleAvatarUpload} style={{ display: 'none' }} />
                </label>
              )}
            </div>
          </div>

          <div className="profile-hero-body">
            <div className="profile-hero-name">{profileUser.displayName || 'User'}</div>
            <div className="profile-hero-headline">{profile.bio || (profile.company ? `${profile.company}` : 'Golden Angels Member')}</div>
            {(profile.location || profile.company) && (
              <div className="profile-hero-location">
                {profile.company && <><Briefcase size={13} /> {profile.company}</>}
                {profile.company && profile.location && <span style={{ margin: '0 6px' }}>·</span>}
                {profile.location && <><MapPin size={13} /> {profile.location}</>}
              </div>
            )}
            {profile.website && (
              <div style={{ fontSize: '0.82rem', color: 'var(--gold)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Globe size={13} /> {profile.website}
              </div>
            )}
            <div className="profile-hero-connections">247 connections</div>
          </div>

          <div className="profile-hero-actions">
            {isOwner ? (
              <>
                <button className="btn-gold" onClick={() => setEditMode(!editMode)} style={{ padding: '8px 24px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Edit3 size={14} /> Edit Profile
                </button>
                <button className="btn-outline" style={{ padding: '8px 20px', fontSize: '0.82rem' }}>Share Profile</button>
              </>
            ) : (
              <>
                <button className="btn-gold" style={{ padding: '8px 24px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <UserPlus size={14} /> Connect
                </button>
                <button className="btn-outline" style={{ padding: '8px 20px', fontSize: '0.82rem' }}>Message</button>
                <button className="btn-outline" style={{ padding: '8px 16px', fontSize: '0.82rem' }}>
                  <MoreHorizontal size={14} />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Edit Profile Panel */}
        {editMode && isOwner && (
          <div className="profile-section-card">
            <div className="profile-section-title">
              <span>Edit Profile</span>
              <button className="profile-section-edit" onClick={() => setEditMode(false)}>Cancel</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group"><label>Bio / Headline</label><textarea className="form-input" value={editData.bio || ''} onChange={e => setEditData({...editData, bio: e.target.value})} rows={3} style={{ resize: 'vertical' }} /></div>
              <div className="form-group"><label>Company</label><input className="form-input" value={editData.company || ''} onChange={e => setEditData({...editData, company: e.target.value})} /></div>
              <div className="form-group"><label>Location</label><input className="form-input" value={editData.location || ''} onChange={e => setEditData({...editData, location: e.target.value})} /></div>
              <div className="form-group"><label>Website</label><input className="form-input" value={editData.website || ''} onChange={e => setEditData({...editData, website: e.target.value})} /></div>
            </div>
            <button className="btn-gold" onClick={handleSaveProfile} style={{ marginTop: '16px', padding: '10px 28px', fontSize: '0.85rem' }}>Save Changes</button>
          </div>
        )}

        {/* ═══ Content Grid ═══ */}
        <div className="profile-content-grid">
          {/* Left — Activity Feed */}
          <div>
            {/* About Section */}
            <div className="profile-section-card">
              <div className="profile-section-title">
                <span>About</span>
                {isOwner && <button className="profile-section-edit" onClick={() => setEditMode(true)}>Edit</button>}
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                {profile.bio || 'No bio provided yet.'}
              </p>
            </div>

            {/* Activity Section */}
            <div className="profile-section-card" style={{ padding: '16px 0 0' }}>
              <div className="profile-section-title" style={{ padding: '0 20px 16px' }}>
                <span>Activity</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--gold)' }}>247 followers</span>
              </div>

              {/* Post Composer (owner only) */}
              {isOwner && (
                <div style={{ padding: '0 16px 16px' }}>
                  <div className="post-composer" style={{ marginBottom: 0 }}>
                    <div className="post-composer-top">
                      <div className="feed-post-avatar" style={{ width: '36px', height: '36px', fontSize: '0.85rem' }}>{(user.displayName || 'U')[0].toUpperCase()}</div>
                      <input className="post-composer-input" placeholder="Share an update..." value={newPost} onChange={e => setNewPost(e.target.value)} />
                    </div>
                    {postMedia.url && (
                      <div style={{ position: 'relative', margin: '8px 0' }}>
                        {postMedia.type === 'image' ? <img src={postMedia.url} alt="" style={{ maxHeight: '180px', borderRadius: '8px', width: '100%', objectFit: 'cover' }} /> : <iframe src={getEmbed(postMedia.url)} style={{ width: '100%', height: '200px', borderRadius: '8px', border: 'none' }} allowFullScreen />}
                        <button onClick={() => setPostMedia({ type: null, url: '' })} style={{ position: 'absolute', top: '6px', right: '6px', width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', border: 'none', cursor: 'pointer' }}><X size={12} /></button>
                      </div>
                    )}
                    {showVideoInput && <input className="form-input" placeholder="Paste YouTube URL..." style={{ fontSize: '0.82rem', marginBottom: '8px' }} onChange={e => setPostMedia({ type: 'video', url: e.target.value })} />}
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <button className="post-action-btn" onClick={() => fileInputRef.current?.click()} style={{ padding: '6px 10px' }}><Image size={14} className="icon-photo" /></button>
                        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                        <button className="post-action-btn" onClick={() => setShowVideoInput(!showVideoInput)} style={{ padding: '6px 10px' }}><Play size={14} className="icon-video" /></button>
                      </div>
                      {(newPost.trim() || postMedia.url) && <button className="btn-gold" onClick={handlePost} style={{ padding: '6px 18px', fontSize: '0.78rem' }}>Post</button>}
                    </div>
                  </div>
                </div>
              )}

              {/* Posts */}
              {social.posts?.length > 0 ? social.posts.map(post => (
                <div key={post.id} className="feed-post" style={{ borderRadius: 0, border: 'none', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                  <div className="feed-post-header">
                    <div className="feed-post-avatar">{(post.author || 'U')[0]}</div>
                    <div className="feed-post-meta">
                      <div className="feed-post-name">{post.author}</div>
                      <div className="feed-post-time">{formatTime(post.createdAt)}</div>
                    </div>
                  </div>
                  {post.text && <div className="feed-post-body">{post.text}</div>}
                  {post.mediaType === 'image' && post.mediaUrl && <img className="feed-post-media" src={post.mediaUrl} alt="" />}
                  {post.mediaType === 'video' && post.mediaUrl && <iframe className="feed-post-media-video" src={getEmbed(post.mediaUrl)} allowFullScreen />}
                  <div className="feed-post-actions">
                    <button className={`feed-action-btn ${likedPosts.includes(post.id) ? 'active' : ''}`} onClick={() => setLikedPosts(p => p.includes(post.id) ? p.filter(x => x !== post.id) : [...p, post.id])}><ThumbsUp size={15} /> Like</button>
                    <button className="feed-action-btn"><MessageSquare size={15} /> Comment</button>
                    <button className="feed-action-btn"><Share2 size={15} /> Share</button>
                    <button className={`feed-action-btn ${savedPosts.includes(post.id) ? 'active' : ''}`} onClick={() => setSavedPosts(p => p.includes(post.id) ? p.filter(x => x !== post.id) : [...p, post.id])}><Bookmark size={15} /> Save</button>
                  </div>
                </div>
              )) : (
                <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-muted)', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                  <p style={{ fontSize: '0.9rem' }}>No activity yet</p>
                  {isOwner && <p style={{ fontSize: '0.82rem', marginTop: '4px' }}>Share your first post with the community.</p>}
                </div>
              )}
            </div>
          </div>

          {/* Right — Sidebar */}
          <div className="dash-right-sidebar">
            {/* Similar Profiles */}
            <div className="right-panel">
              <div className="right-panel-header">
                <span>People also viewed</span>
              </div>
              {suggestedConnections.map((p, i) => (
                <div key={i} className="right-follow-item">
                  <div className="right-follow-avatar">{p.initial}</div>
                  <div className="right-follow-info">
                    <div className="right-follow-name">{p.name}</div>
                    <div className="right-follow-role">{p.role}</div>
                  </div>
                  <button className="right-follow-btn">+ Follow</button>
                </div>
              ))}
            </div>

            {/* Profile Stats */}
            <div className="right-panel" style={{ padding: '16px' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '12px' }}>Profile Stats</div>
              {[
                { label: 'Profile views', value: '132', sub: 'past 7 days' },
                { label: 'Post impressions', value: '2,471', sub: 'past 30 days' },
                { label: 'Search appearances', value: '83', sub: 'past 7 days' },
              ].map((s, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                  <div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{s.label}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{s.sub}</div>
                  </div>
                  <div className="gold-text" style={{ fontWeight: 700, fontSize: '1rem', fontFamily: 'var(--font-display)' }}>{s.value}</div>
                </div>
              ))}
            </div>

            {/* Social Lists Summary */}
            <div className="right-panel" style={{ padding: '16px' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '12px' }}>My Lists</div>
              {[
                { icon: Star, label: 'Favorites', count: social.favorites?.length || 0 },
                { icon: Eye, label: 'Watchlist', count: social.watchlist?.length || 0 },
                { icon: Bookmark, label: 'Bookmarks', count: social.bookmarks?.length || 0 },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', cursor: 'pointer', color: 'var(--text-secondary)', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
                  <item.icon size={16} />
                  <span style={{ flex: 1, fontSize: '0.82rem' }}>{item.label}</span>
                  <span className="gold-text" style={{ fontSize: '0.82rem', fontWeight: 600 }}>{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </LoggedInLayout>
  );
}

export default function ProfilePage() {
  return <AuthProvider><ProfileContent /></AuthProvider>;
}
