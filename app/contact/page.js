'use client';
import { useState } from 'react';
import { AuthProvider, useAuth } from '../../components/AuthProvider';
import Navbar from '../../components/Navbar';
import AuthModal from '../../components/AuthModal';
import LoggedInLayout from '../../components/LoggedInLayout';
import Footer from '../../components/Footer';
import { Mail, MapPin, Phone, Send, Clock, MessageSquare } from 'lucide-react';

function PageContent() {
  const { user, logout } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState('signin');
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    { q: 'What is the minimum investment for syndicates?', a: 'Standard syndicate minimum is $50,000, though special purpose vehicles (SPVs) may have varying thresholds depending on the asset class and allocation.' },
    { q: 'How do I pitch my startup to Golden Angels?', a: 'Founders can submit their deck through the Portfolio page portal. Due to volume, we only respond to companies that fit our current thesis and stage.' },
    { q: 'Is the platform open to non-accredited investors?', a: 'No, Golden Angels is strictly for accredited investors, qualified purchasers, and institutional entities.' },
    { q: 'What are the fees associated with the platform?', a: 'We operate on a standard 2/20 model for managed funds, with zero platform fees for direct syndicate co-investments.' }
  ];

  const pageContent = (
    <>
      <section className="section-container" style={{ textAlign: 'center', paddingTop: '100px' }}>
        <h1 className="section-title"><span className="gold-text">Get in Touch</span></h1>
        <p className="section-desc">Global presence. Exclusive access. Connect with our team.</p>
      </section>

      <section className="section-container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
          <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
            <MapPin size={32} className="gold-text" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ marginBottom: '0.5rem' }}>London (HQ)</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>1 Mayfair Place<br/>London, W1J 8AJ<br/>United Kingdom</p>
          </div>
          <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
            <MapPin size={32} className="gold-text" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ marginBottom: '0.5rem' }}>Dubai</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>DIFC, Gate Village<br/>Building 3, Level 4<br/>Dubai, UAE</p>
          </div>
          <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
            <Mail size={32} className="gold-text" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ marginBottom: '0.5rem' }}>Email Inquiries</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>investors@goldenangels.com<br/>pitch@goldenangels.com</p>
          </div>
          <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
            <Clock size={32} className="gold-text" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ marginBottom: '0.5rem' }}>Operating Hours</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Monday - Friday<br/>9:00 AM - 6:00 PM (GMT)</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
          <div className="glass-card" style={{ padding: '3rem' }}>
            <h2 className="section-title" style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>Send a Message</h2>
            <form onSubmit={e => e.preventDefault()}>
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Full Name</label>
                <input type="text" className="form-input" style={{ width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} placeholder="Jane Doe" />
              </div>
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Email Address</label>
                <input type="email" className="form-input" style={{ width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} placeholder="jane@example.com" />
              </div>
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Inquiry Type</label>
                <select className="form-input" style={{ width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}>
                  <option>Investor Relations</option>
                  <option>Startup Pitch</option>
                  <option>Press & Media</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="form-group" style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Message</label>
                <textarea className="form-input" rows="4" style={{ width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} placeholder="How can we help?"></textarea>
              </div>
              <button className="btn-gold" style={{ width: '100%', padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                Send Message <Send size={18} />
              </button>
            </form>
          </div>

          <div>
            <h2 className="section-title" style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>Frequently Asked Questions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {faqs.map((faq, idx) => (
                <div key={idx} className="glass-card" style={{ padding: '1.5rem', cursor: 'pointer' }} onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ margin: 0, fontSize: '1.1rem', color: openFaq === idx ? 'var(--gold)' : '#fff' }}>{faq.q}</h4>
                    <span style={{ fontSize: '1.5rem', color: 'var(--gold)' }}>{openFaq === idx ? '−' : '+'}</span>
                  </div>
                  {openFaq === idx && (
                    <p style={{ marginTop: '1rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{faq.a}</p>
                  )}
                </div>
              ))}
            </div>
            <div className="glass-card" style={{ padding: '2rem', marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '1rem', border: '1px solid rgba(255,215,0,0.2)' }}>
              <MessageSquare size={32} className="gold-text" />
              <div>
                <h4 style={{ margin: '0 0 0.25rem 0' }}>Need immediate assistance?</h4>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Existing members can contact their dedicated concierges via the platform.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <div style={{ marginBottom: '4rem' }}></div>
    </>
  );

  if (user) return <LoggedInLayout>{pageContent}</LoggedInLayout>;
  return (
    <>
      <Navbar onAuthClick={() => { setAuthTab('signin'); setAuthOpen(true); }} onSignupClick={() => { setAuthTab('signup'); setAuthOpen(true); }} user={user} onLogout={logout} />
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} initialTab={authTab} />
      <main style={{ paddingTop: 'var(--nav-height)' }}>{pageContent}<Footer /></main>
    </>
  );
}
export default function Page() { return <AuthProvider><PageContent /></AuthProvider>; }
