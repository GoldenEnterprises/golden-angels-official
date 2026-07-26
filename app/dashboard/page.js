'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { AuthProvider, useAuth } from '../../components/AuthProvider';
import LoggedInLayout from '../../components/LoggedInLayout';
import { Image, Play, FileText, PenLine, Heart, MessageSquare, Share2, Bookmark, Send, X, MoreHorizontal, ThumbsUp } from 'lucide-react';

const samplePosts = [
  {
    id: 's1', author: 'Golden Angels', authorRole: 'Official', avatar: null,
    text: 'We are thrilled to announce that Golden Angels has officially crossed $250M+ in global investments across 150+ portfolio companies. This milestone belongs to every member of our community. The future is golden. ✦',
    mediaType: null, mediaUrl: null, likes: 342, comments: 48, shares: 127,
    createdAt: '2026-07-15T10:00:00Z'
  },
  {
    id: 's2', author: 'NeuroFlow AI', authorRole: 'Portfolio Company', avatar: null,
    text: 'Excited to share: we just closed our $18M Series A! Enormous gratitude to Golden Angels for believing in us at the seed stage. Our enterprise AI platform now serves 200+ Fortune 500 clients. This is only the beginning. 🚀',
    mediaType: 'image', mediaUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop', likes: 891, comments: 156, shares: 234,
    createdAt: '2026-07-12T14:30:00Z'
  },
  {
    id: 's3', author: 'Solaris Grid', authorRole: 'Portfolio Company', avatar: null,
    text: 'Today we launched peer-to-peer energy trading in Kenya, connecting 50,000 households to clean, affordable solar energy. This is what impact investing looks like.',
    mediaType: 'image', mediaUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=400&fit=crop', likes: 567, comments: 89, shares: 201,
    createdAt: '2026-07-10T09:15:00Z'
  },
  {
    id: 's4', author: 'Mr. Golden', authorRole: 'CEO, Golden Enterprises', avatar: null,
    text: 'To every founder in our ecosystem: your vision matters. Your work matters. We are not just investing capital — we are investing belief. Keep building. The world needs what you are creating.',
    mediaType: null, mediaUrl: null, likes: 1247, comments: 312, shares: 489,
    createdAt: '2026-07-08T18:00:00Z'
  },
];

const trendingNews = [
  { title: 'BioNova Labs receives FDA Breakthrough designation', time: '2h ago', comments: 42 },
  { title: 'Aether Space deploys first satellite constellation', time: '5h ago', comments: 89 },
  { title: 'QuantumVault partners with NATO on encryption', time: '1d ago', comments: 156 },
  { title: 'Golden Angels reaches 10,000 member milestone', time: '2d ago', comments: 234 },
  { title: 'EduSphere surpasses 2M student users globally', time: '3d ago', comments: 67 },
];

const whoToFollow = [
  { name: 'Sarah Chen', role: 'Partner, Sequoia Capital', initial: 'S' },
  { name: 'Marcus Williams', role: 'Founder, NeuroFlow AI', initial: 'M' },
  { name: 'Elena Vasquez', role: 'CTO, Solaris Grid', initial: 'E' },
  { name: 'James Kim', role: 'Angel Investor', initial: 'J' },
];

function DashboardContent() {
  const { user, loading, getProfile, getSocial, addPost } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState({});
  const [social, setSocial] = useState({ posts: [] });
  const [newPostText, setNewPostText] = useState('');
  const [showComposer, setShowComposer] = useState(false);
  const [postMedia, setPostMedia] = useState({ type: null, url: '' });
  const [showVideoInput, setShowVideoInput] = useState(false);
  const [likedPosts, setLikedPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!loading && !user) router.push('/');
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      setProfile(getProfile(user.uid));
      setSocial(getSocial(user.uid));
    }
  }, [user]);

  const handlePost = () => {
    if (!newPostText.trim() && !postMedia.url) return;
    addPost(user.uid, {
      text: newPostText, mediaType: postMedia.type, mediaUrl: postMedia.url,
      author: user.displayName, authorUid: user.uid
    });
    setNewPostText(''); setPostMedia({ type: null, url: '' }); setShowComposer(false); setShowVideoInput(false);
    setSocial(getSocial(user.uid));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setPostMedia({ type: 'image', url: ev.target.result });
      reader.readAsDataURL(file);
    }
  };

  const getEmbed = (url) => {
    if (!url) return null;
    const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    return m ? `https://www.youtube.com/embed/${m[1]}` : url;
  };

  const formatTime = (date) => {
    const diff = Date.now() - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h`;
    return `${Math.floor(hrs / 24)}d`;
  };

  const allPosts = [...(social.posts || []).map(p => ({ ...p, isUser: true })), ...samplePosts];

  if (loading || !user) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-void)' }}>
      <img src="/Golden Angels_LOGO.png" alt="Golden Angels" style={{ width: '80px', height: '80px', objectFit: 'contain', animation: 'pulse 2s ease-in-out infinite' }} />
    </div>
  );

  return (
    <LoggedInLayout>
      <div className="dash-feed-layout">
        {/* ═══ LEFT — Profile Card ═══ */}
        <div>
          <div className="dash-profile-card">
            <div className="dash-profile-banner">
              <div className="dash-profile-avatar">
                {profile.avatar ? <img src={profile.avatar} alt="" /> : (user.displayName || 'U')[0].toUpperCase()}
              </div>
            </div>
            <div className="dash-profile-body">
              <h3>{user.displayName}</h3>
              <div className="role">{user.role}</div>
              {profile.bio && <div className="bio">{profile.bio}</div>}
            </div>
            <div className="dash-profile-stats">
              <div className="dash-profile-stat">
                <div className="num">132</div>
                <div className="lbl">Connections</div>
              </div>
              <div className="dash-profile-stat">
                <div className="num">83</div>
                <div className="lbl">Views</div>
              </div>
            </div>
            <div className="dash-profile-links">
              <div className="dash-profile-link" onClick={() => router.push(`/profile/${user.uid}`)}>
                <span>View Profile</span><span className="gold-text">→</span>
              </div>
              <div className="dash-profile-link" onClick={() => router.push('/portfolio')}>
                <span>My Portfolio</span><span className="gold-text">→</span>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ CENTER — Feed ═══ */}
        <div>
          {/* Post Composer */}
          <div className="post-composer">
            <div className="post-composer-top">
              <div className="feed-post-avatar">{(user.displayName || 'U')[0].toUpperCase()}</div>
              <input className="post-composer-input" placeholder="Start a post..." onFocus={() => setShowComposer(true)} value={newPostText} onChange={(e) => setNewPostText(e.target.value)} />
            </div>

            {showComposer && postMedia.url && (
              <div style={{ position: 'relative', marginBottom: '12px', padding: '0 8px' }}>
                {postMedia.type === 'image' ? (
                  <img src={postMedia.url} alt="Upload" style={{ maxHeight: '200px', borderRadius: '10px', objectFit: 'cover', width: '100%' }} />
                ) : (
                  <iframe src={getEmbed(postMedia.url)} style={{ width: '100%', height: '240px', borderRadius: '10px', border: 'none' }} allowFullScreen />
                )}
                <button onClick={() => setPostMedia({ type: null, url: '' })} style={{ position: 'absolute', top: '8px', right: '16px', width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', border: 'none', cursor: 'pointer' }}>
                  <X size={14} />
                </button>
              </div>
            )}

            {showVideoInput && (
              <div style={{ padding: '0 8px', marginBottom: '12px' }}>
                <input className="form-input" placeholder="Paste YouTube or video URL..." style={{ fontSize: '0.85rem' }} onChange={(e) => setPostMedia({ type: 'video', url: e.target.value })} />
              </div>
            )}

            <div className="post-composer-actions">
              <button className="post-action-btn" onClick={() => fileInputRef.current?.click()}>
                <Image size={16} className="icon-photo" /> <span>Photo</span>
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
              <button className="post-action-btn" onClick={() => { setShowComposer(true); setShowVideoInput(!showVideoInput); }}>
                <Play size={16} className="icon-video" /> <span>Video</span>
              </button>
              <button className="post-action-btn">
                <FileText size={16} className="icon-doc" /> <span>Document</span>
              </button>
              <button className="post-action-btn">
                <PenLine size={16} className="icon-article" /> <span>Article</span>
              </button>
            </div>

            {showComposer && (newPostText.trim() || postMedia.url) && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '12px 0 0', gap: '8px' }}>
                <button className="btn-outline" onClick={() => { setShowComposer(false); setNewPostText(''); setPostMedia({ type: null, url: '' }); setShowVideoInput(false); }} style={{ padding: '8px 20px', fontSize: '0.82rem' }}>Cancel</button>
                <button className="btn-gold" onClick={handlePost} style={{ padding: '8px 24px', fontSize: '0.82rem' }}>Post</button>
              </div>
            )}
          </div>

          {/* Feed Posts */}
          {allPosts.map((post, i) => (
            <div key={post.id || i} className="feed-post">
              <div className="feed-post-header">
                <div className="feed-post-avatar">{(post.author || 'G')[0]}</div>
                <div className="feed-post-meta">
                  <div className="feed-post-name">{post.author}</div>
                  <div className="feed-post-detail">{post.authorRole || post.authorUid || ''}</div>
                  <div className="feed-post-time">{formatTime(post.createdAt)}</div>
                </div>
                <button style={{ color: 'var(--text-muted)', padding: '4px' }}><MoreHorizontal size={18} /></button>
              </div>

              {post.text && <div className="feed-post-body">{post.text}</div>}

              {post.mediaType === 'image' && post.mediaUrl && (
                <img className="feed-post-media" src={post.mediaUrl} alt="Post media" />
              )}
              {post.mediaType === 'video' && post.mediaUrl && (
                <iframe className="feed-post-media-video" src={getEmbed(post.mediaUrl)} allowFullScreen />
              )}

              <div className="feed-post-stats">
                <span>{post.likes || 0} likes</span>
                <span>{post.comments || 0} comments · {post.shares || 0} shares</span>
              </div>

              <div className="feed-post-actions">
                <button className={`feed-action-btn ${likedPosts.includes(post.id) ? 'active' : ''}`}
                  onClick={() => setLikedPosts(p => p.includes(post.id) ? p.filter(x => x !== post.id) : [...p, post.id])}>
                  <ThumbsUp size={16} /> Like
                </button>
                <button className="feed-action-btn"><MessageSquare size={16} /> Comment</button>
                <button className="feed-action-btn"><Share2 size={16} /> Share</button>
                <button className={`feed-action-btn ${savedPosts.includes(post.id) ? 'active' : ''}`}
                  onClick={() => setSavedPosts(p => p.includes(post.id) ? p.filter(x => x !== post.id) : [...p, post.id])}>
                  <Bookmark size={16} /> Save
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ═══ RIGHT — Sidebar ═══ */}
        <div className="dash-right-sidebar">
          {/* Golden News */}
          <div className="right-panel">
            <div className="right-panel-header">
              <span className="gold-text">Golden News</span>
              <span className="see-all" onClick={() => router.push('/news')}>See all →</span>
            </div>
            {trendingNews.map((news, i) => (
              <div key={i} className="right-news-item">
                <div className="right-news-dot" />
                <div>
                  <div className="right-news-title">{news.title}</div>
                  <div className="right-news-meta">{news.time} · {news.comments} comments</div>
                </div>
              </div>
            ))}
          </div>

          {/* Who to Follow */}
          <div className="right-panel">
            <div className="right-panel-header">
              <span>Who to Follow</span>
              <span className="see-all">See all →</span>
            </div>
            {whoToFollow.map((person, i) => (
              <div key={i} className="right-follow-item">
                <div className="right-follow-avatar">{person.initial}</div>
                <div className="right-follow-info">
                  <div className="right-follow-name">{person.name}</div>
                  <div className="right-follow-role">{person.role}</div>
                </div>
                <button className="right-follow-btn">+ Follow</button>
              </div>
            ))}
          </div>

          {/* Promoted */}
          <div className="right-panel" style={{ padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>Promoted</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>Golden Angels Fund II</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>$7M allocation now open for qualified investors.</div>
            <button className="btn-gold" style={{ width: '100%', padding: '8px', fontSize: '0.8rem' }}>Learn More</button>
          </div>
        </div>
      </div>
    </LoggedInLayout>
  );
}

export default function DashboardPage() {
  return <AuthProvider><DashboardContent /></AuthProvider>;
}
