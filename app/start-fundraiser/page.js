'use client';
import { useState } from 'react';
import { AuthProvider } from '../../components/AuthProvider';
import LoggedInLayout from '../../components/LoggedInLayout';
import { CheckCircle2, ChevronRight, ChevronLeft, Upload, Copy, Share2, Rocket } from 'lucide-react';

function StartFundraiserContent() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const totalSteps = 4;

  const nextStep = () => setStep(s => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const shareLink = "https://goldenangels.com/f/new-campaign-xyz";

  if (isSuccess) {
    return (
      <LoggedInLayout>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '40px', textAlign: 'center' }}>
          <div style={{ position: 'relative', marginBottom: '32px' }}>
            <div style={{ position: 'absolute', inset: -20, background: 'radial-gradient(circle, var(--gold-glow) 0%, transparent 70%)', zIndex: 0, animation: 'pulse 2s infinite' }}></div>
            <CheckCircle2 size={100} className="gold-text" style={{ position: 'relative', zIndex: 1 }} />
          </div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Campaign Created!</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', marginBottom: '32px' }}>
            Your fundraiser is now live and pending final review by our moderation team. You can start sharing it right away.
          </p>
          
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--gold-border)', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px', width: '100%', maxWidth: '500px' }}>
            <div style={{ flex: 1, textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--text-secondary)' }}>
              {shareLink}
            </div>
            <button className="btn-outline" style={{ padding: '8px 16px' }} onClick={() => navigator.clipboard.writeText(shareLink)}>
              <Copy size={16} /> Copy
            </button>
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <button className="btn-gold" onClick={() => window.location.href = '/fundraisers'}><Share2 size={18} /> View Campaign</button>
          </div>
        </div>
      </LoggedInLayout>
    );
  }

  return (
    <LoggedInLayout>
      <div className="section-container" style={{ maxWidth: '800px', paddingTop: '60px', paddingBottom: '80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '12px' }}>Start a Fundraiser</h1>
          <p className="section-desc" style={{ margin: '0 auto' }}>Launch your campaign to our exclusive network of investors.</p>
        </div>

        {/* Progress */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '40px' }}>
          {[1, 2, 3, 4].map(s => (
            <div key={s} style={{ flex: 1, height: '4px', borderRadius: '2px', background: s <= step ? 'var(--gold)' : 'var(--bg-elevated)', transition: 'background 0.3s' }} />
          ))}
        </div>

        <div className="glass-card" style={{ padding: '40px' }}>
          {/* Step 1: Basics */}
          {step === 1 && (
            <div style={{ animation: 'fadeIn 0.4s' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '24px', color: 'var(--gold)' }}>1. Basics</h3>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Campaign Title</label>
                <input type="text" className="form-input" placeholder="e.g. Solaris Mini-Reactor" style={{ width: '100%', padding: '12px', background: 'var(--bg-surface)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Category</label>
                <select className="form-input" style={{ width: '100%', padding: '12px', background: 'var(--bg-surface)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }}>
                  <option>Technology</option>
                  <option>Health</option>
                  <option>Energy</option>
                  <option>Education</option>
                  <option>Space</option>
                </select>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Short Description</label>
                <textarea rows={2} className="form-input" placeholder="A brief summary for the campaign card..." style={{ width: '100%', padding: '12px', background: 'var(--bg-surface)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '12px', color: 'var(--text-secondary)' }}>Cover Image</label>
                <div style={{ border: '2px dashed var(--gold-border)', borderRadius: '12px', padding: '40px', textAlign: 'center', background: 'rgba(212,175,55,0.02)', cursor: 'pointer' }}>
                  <Upload size={32} className="gold-text" style={{ margin: '0 auto 16px' }} />
                  <p style={{ margin: 0, fontWeight: 500 }}>Upload Cover Image (16:9)</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Goal */}
          {step === 2 && (
            <div style={{ animation: 'fadeIn 0.4s' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '24px', color: 'var(--gold)' }}>2. Funding Goal</h3>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Funding Goal Amount ($)</label>
                <input type="number" className="form-input" placeholder="e.g. 5000000" style={{ width: '100%', padding: '12px', background: 'var(--bg-surface)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', fontSize: '1.2rem' }} />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Campaign Duration</label>
                <select className="form-input" style={{ width: '100%', padding: '12px', background: 'var(--bg-surface)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }}>
                  <option>30 Days</option>
                  <option>60 Days</option>
                  <option>90 Days</option>
                </select>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Minimum Contribution ($)</label>
                <input type="number" className="form-input" placeholder="e.g. 1000" style={{ width: '100%', padding: '12px', background: 'var(--bg-surface)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} />
              </div>
            </div>
          )}

          {/* Step 3: Story */}
          {step === 3 && (
            <div style={{ animation: 'fadeIn 0.4s' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '24px', color: 'var(--gold)' }}>3. Campaign Story</h3>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Full Description</label>
                <textarea rows={8} className="form-input" placeholder="Tell your story, explain the problem, solution, and market..." style={{ width: '100%', padding: '12px', background: 'var(--bg-surface)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', resize: 'vertical' }} />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Key Milestones</label>
                <textarea rows={3} className="form-input" placeholder="What will the funds be used for?" style={{ width: '100%', padding: '12px', background: 'var(--bg-surface)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} />
              </div>
            </div>
          )}

          {/* Step 4: Rewards */}
          {step === 4 && (
            <div style={{ animation: 'fadeIn 0.4s' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '24px', color: 'var(--gold)' }}>4. Rewards (Optional)</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Offer perks or early access to backers.</p>
              
              {[1, 2, 3].map(tier => (
                <div key={tier} style={{ background: 'var(--bg-surface)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '20px', marginBottom: '16px' }}>
                  <h4 style={{ marginBottom: '16px', color: 'var(--gold)' }}>Tier {tier}</h4>
                  <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem' }}>Amount ($)</label>
                      <input type="number" className="form-input" style={{ width: '100%', padding: '8px', background: 'var(--bg-elevated)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', color: 'white' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem' }}>Est. Delivery</label>
                      <input type="text" placeholder="MM/YYYY" className="form-input" style={{ width: '100%', padding: '8px', background: 'var(--bg-elevated)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', color: 'white' }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem' }}>Description</label>
                    <input type="text" className="form-input" style={{ width: '100%', padding: '8px', background: 'var(--bg-elevated)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', color: 'white' }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          <style jsx>{`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </div>

        {/* Navigation Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
          <button 
            className="btn-outline" 
            onClick={prevStep}
            style={{ visibility: step === 1 ? 'hidden' : 'visible' }}
          >
            <ChevronLeft size={18} /> Back
          </button>
          
          {step < totalSteps ? (
            <button className="btn-gold" onClick={nextStep}>
              Next Step <ChevronRight size={18} />
            </button>
          ) : (
            <button className="btn-gold" onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? 'Launching...' : 'Launch Campaign'} <Rocket size={18} />
            </button>
          )}
        </div>
      </div>
    </LoggedInLayout>
  );
}

export default function StartFundraiserPage() {
  return <AuthProvider><StartFundraiserContent /></AuthProvider>;
}
