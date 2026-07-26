'use client';
import { useState, useRef } from 'react';
import { useAuth } from './AuthProvider';
import { X, ArrowRight, ArrowLeft, User, Building2, Landmark } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, initialTab }) {
  const { loginWithEmail, signupWithEmail, loginWithGoogle, validateInvestorCode, authError, setAuthError } = useAuth();
  const [tab, setTab] = useState(initialTab || 'signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [investorDigits, setInvestorDigits] = useState(['', '', '', '', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [codeSuccess, setCodeSuccess] = useState(false);
  const digitRefs = useRef([]);

  // Signup multi-step
  const [signupStep, setSignupStep] = useState(1);
  const [signupData, setSignupData] = useState({
    name: '', email: '', password: '', type: 'individual',
    company: '', industry: '', goals: '', investmentRange: '', website: '', linkedin: ''
  });

  const resetForm = () => {
    setEmail(''); setPassword('');
    setInvestorDigits(['', '', '', '', '', '']);
    setAuthError(null); setCodeSuccess(false);
    setSignupStep(1);
    setSignupData({ name: '', email: '', password: '', type: 'individual', company: '', industry: '', goals: '', investmentRange: '', website: '', linkedin: '' });
  };

  const handleTabChange = (t) => { setTab(t); resetForm(); };
  const handleClose = () => { resetForm(); setTab(initialTab || 'signin'); onClose(); };

  // Login
  const handleLogin = async (e) => {
    e.preventDefault(); setIsSubmitting(true);
    try { await loginWithEmail(email, password); handleClose(); } catch {}
    setIsSubmitting(false);
  };

  // Google
  const handleGoogle = async () => {
    setIsSubmitting(true);
    try { await loginWithGoogle(); handleClose(); } catch {}
    setIsSubmitting(false);
  };

  // Investor code digits
  const handleDigitChange = (idx, value) => {
    if (!/^\d*$/.test(value)) return;
    const newDigits = [...investorDigits];
    newDigits[idx] = value.slice(-1);
    setInvestorDigits(newDigits);
    if (value && idx < 5) digitRefs.current[idx + 1]?.focus();
  };
  const handleDigitKeyDown = (idx, e) => {
    if (e.key === 'Backspace' && !investorDigits[idx] && idx > 0) {
      digitRefs.current[idx - 1]?.focus();
    }
  };
  const handleDigitPaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newDigits = [...investorDigits];
    for (let i = 0; i < 6; i++) newDigits[i] = paste[i] || '';
    setInvestorDigits(newDigits);
    if (paste.length > 0) digitRefs.current[Math.min(paste.length, 5)]?.focus();
  };
  const handleInvestorSubmit = async (e) => {
    e.preventDefault(); setIsSubmitting(true);
    const code = investorDigits.join('');
    if (code.length < 6) { setAuthError('Please enter all 6 digits.'); setIsSubmitting(false); return; }
    const ok = await validateInvestorCode(code);
    if (ok) { setCodeSuccess(true); setTimeout(() => handleClose(), 1500); }
    setIsSubmitting(false);
  };

  // Multi-step signup
  const handleSignupNext = () => {
    if (signupStep === 1) {
      if (!signupData.name || !signupData.email || !signupData.password) { setAuthError('Please fill in all required fields.'); return; }
      if (signupData.password.length < 6) { setAuthError('Password must be at least 6 characters.'); return; }
      setAuthError(null);
    }
    setSignupStep(s => s + 1);
  };
  const handleSignupSubmit = async () => {
    setIsSubmitting(true);
    try { await signupWithEmail(signupData); handleClose(); } catch {}
    setIsSubmitting(false);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay open" onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}>
      <div className="auth-modal" style={{ maxWidth: tab === 'signup' ? '520px' : '440px' }}>
        <button className="modal-close" onClick={handleClose}><X size={20} /></button>

        <h2 className="gold-text" style={{ fontSize: '1.5rem', marginBottom: '8px' }}>
          {tab === 'investor' ? '🔐 Investor Access' : tab === 'signin' ? 'Welcome Back' : 'Join the Movement'}
        </h2>
        <p className="modal-subtitle">
          {tab === 'investor' ? 'Enter your 6-digit exclusive access code.' : tab === 'signin' ? 'Sign in to your Golden Angels account.' : signupStep === 1 ? 'Tell us about yourself.' : signupStep === 2 ? 'What type of account?' : 'Your goals and vision.'}
        </p>

        {/* Tabs */}
        <div className="auth-tabs">
          <button className={`auth-tab ${tab === 'signin' ? 'active' : ''}`} onClick={() => handleTabChange('signin')}>Sign In</button>
          <button className={`auth-tab ${tab === 'signup' ? 'active' : ''}`} onClick={() => handleTabChange('signup')}>Join</button>
          <button className={`auth-tab ${tab === 'investor' ? 'active' : ''}`} onClick={() => handleTabChange('investor')}>Investor</button>
        </div>

        {authError && (
          <div style={{ padding: '12px 16px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', color: '#f87171', fontSize: '0.85rem', marginBottom: '20px' }}>{authError}</div>
        )}
        {codeSuccess && (
          <div style={{ padding: '12px 16px', background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: '10px', color: '#4ade80', fontSize: '0.85rem', marginBottom: '20px', textAlign: 'center' }}>✦ Investor access granted. Welcome to the inner circle.</div>
        )}

        {/* === SIGN IN === */}
        {tab === 'signin' && (
          <>
            <button className="btn-google" onClick={handleGoogle} disabled={isSubmitting}>
              <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Continue with Google
            </button>
            <div className="auth-divider">or</div>
            <form onSubmit={handleLogin}>
              <div className="form-group"><label>Email</label><input className="form-input" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required /></div>
              <div className="form-group"><label>Password</label><input className="form-input" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required /></div>
              <button className="btn-gold btn-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Signing in...' : 'Sign In'}</button>
            </form>
          </>
        )}

        {/* === INVESTOR CODE (6 digit boxes) === */}
        {tab === 'investor' && (
          <form onSubmit={handleInvestorSubmit}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '28px' }}>
              {investorDigits.map((digit, i) => (
                <input
                  key={i}
                  ref={el => digitRefs.current[i] = el}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleDigitChange(i, e.target.value)}
                  onKeyDown={e => handleDigitKeyDown(i, e)}
                  onPaste={i === 0 ? handleDigitPaste : undefined}
                  style={{
                    width: '52px', height: '64px', textAlign: 'center', fontSize: '1.6rem', fontWeight: 700,
                    background: 'var(--bg-deep)', border: digit ? '2px solid var(--gold)' : '2px solid rgba(255,255,255,0.08)',
                    borderRadius: '12px', color: 'var(--gold)', caretColor: 'var(--gold)', outline: 'none',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                    boxShadow: digit ? '0 0 20px var(--gold-muted)' : 'none',
                    fontFamily: 'var(--font-display)',
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--gold)'}
                  onBlur={e => { if (!digit) e.target.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                />
              ))}
            </div>
            <button className="btn-gold btn-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Validating...' : 'Verify Code'}</button>
            <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Codes are provided to verified angel investors by Golden Angels leadership.</p>
          </form>
        )}

        {/* === MULTI-STEP SIGNUP === */}
        {tab === 'signup' && (
          <>
            {/* Progress */}
            <div style={{ display: 'flex', gap: '6px', marginBottom: '24px' }}>
              {[1, 2, 3].map(s => (
                <div key={s} style={{ flex: 1, height: '3px', borderRadius: '2px', background: signupStep >= s ? 'var(--gold)' : 'rgba(255,255,255,0.06)', transition: 'background 0.3s' }} />
              ))}
            </div>

            {/* Step 1: Basics */}
            {signupStep === 1 && (
              <>
                <div className="form-group"><label>Full Name *</label><input className="form-input" placeholder="Your full name" value={signupData.name} onChange={e => setSignupData({...signupData, name: e.target.value})} required /></div>
                <div className="form-group"><label>Email Address *</label><input className="form-input" type="email" placeholder="you@example.com" value={signupData.email} onChange={e => setSignupData({...signupData, email: e.target.value})} required /></div>
                <div className="form-group"><label>Password *</label><input className="form-input" type="password" placeholder="Min 6 characters" value={signupData.password} onChange={e => setSignupData({...signupData, password: e.target.value})} required minLength={6} /></div>
                <button className="btn-gold btn-submit" onClick={handleSignupNext} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>Continue <ArrowRight size={16} /></button>
              </>
            )}

            {/* Step 2: Account Type */}
            {signupStep === 2 && (
              <>
                <div style={{ display: 'grid', gap: '12px', marginBottom: '24px' }}>
                  {[
                    { value: 'individual', icon: User, label: 'Individual', desc: 'Angel investor, entrepreneur, or professional' },
                    { value: 'company', icon: Building2, label: 'Company', desc: 'Startup, business, or organization' },
                    { value: 'fund', icon: Landmark, label: 'Fund', desc: 'VC firm, family office, or investment fund' },
                  ].map(opt => (
                    <button key={opt.value} onClick={() => setSignupData({...signupData, type: opt.value})}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px',
                        background: signupData.type === opt.value ? 'var(--gold-muted)' : 'var(--bg-deep)',
                        border: signupData.type === opt.value ? '2px solid var(--gold)' : '2px solid rgba(255,255,255,0.04)',
                        borderRadius: '14px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', color: 'var(--text-primary)',
                      }}>
                      <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: signupData.type === opt.value ? 'var(--gold-muted)' : 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <opt.icon size={22} color={signupData.type === opt.value ? 'var(--gold)' : 'var(--text-muted)'} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{opt.label}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{opt.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
                {(signupData.type === 'company' || signupData.type === 'fund') && (
                  <div className="form-group"><label>{signupData.type === 'fund' ? 'Fund Name' : 'Company Name'}</label><input className="form-input" placeholder="Enter name" value={signupData.company} onChange={e => setSignupData({...signupData, company: e.target.value})} /></div>
                )}
                <div className="form-group"><label>Industry</label>
                  <select className="form-input" value={signupData.industry} onChange={e => setSignupData({...signupData, industry: e.target.value})}>
                    <option value="">Select industry</option>
                    <option>Artificial Intelligence</option><option>Biotechnology</option><option>Clean Energy</option>
                    <option>Cybersecurity</option><option>Education</option><option>FinTech</option>
                    <option>Health & Wellness</option><option>Space Technology</option><option>Other</option>
                  </select>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button className="btn-outline" onClick={() => setSignupStep(1)} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}><ArrowLeft size={16} /> Back</button>
                  <button className="btn-gold" onClick={handleSignupNext} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>Continue <ArrowRight size={16} /></button>
                </div>
              </>
            )}

            {/* Step 3: Goals */}
            {signupStep === 3 && (
              <>
                <div className="form-group"><label>What are your goals?</label>
                  <textarea className="form-input" placeholder="Tell us about your vision, goals, and what you hope to achieve with Golden Angels..." value={signupData.goals} onChange={e => setSignupData({...signupData, goals: e.target.value})} rows={4} style={{ resize: 'vertical', minHeight: '100px' }} />
                </div>
                <div className="form-group"><label>Investment Range</label>
                  <select className="form-input" value={signupData.investmentRange} onChange={e => setSignupData({...signupData, investmentRange: e.target.value})}>
                    <option value="">Select range</option>
                    <option>$5K - $25K</option><option>$25K - $100K</option><option>$100K - $500K</option>
                    <option>$500K - $1M</option><option>$1M - $5M</option><option>$5M+</option>
                  </select>
                </div>
                <div className="form-group"><label>LinkedIn Profile (optional)</label><input className="form-input" placeholder="https://linkedin.com/in/..." value={signupData.linkedin} onChange={e => setSignupData({...signupData, linkedin: e.target.value})} /></div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button className="btn-outline" onClick={() => setSignupStep(2)} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}><ArrowLeft size={16} /> Back</button>
                  <button className="btn-gold" onClick={handleSignupSubmit} disabled={isSubmitting} style={{ flex: 1 }}>{isSubmitting ? 'Creating...' : '✦ Create Account'}</button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
