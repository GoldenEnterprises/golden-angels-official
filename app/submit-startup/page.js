'use client';
import { useState } from 'react';
import { AuthProvider } from '../../components/AuthProvider';
import LoggedInLayout from '../../components/LoggedInLayout';
import { CheckCircle2, ChevronRight, ChevronLeft, Upload } from 'lucide-react';

function SubmitStartupContent() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const totalSteps = 5;

  const nextStep = () => setStep(s => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <LoggedInLayout>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '40px', textAlign: 'center' }}>
          <div style={{ position: 'relative', marginBottom: '32px' }}>
            <div style={{ position: 'absolute', inset: -20, background: 'radial-gradient(circle, var(--gold-glow) 0%, transparent 70%)', zIndex: 0, animation: 'pulse 2s infinite' }}></div>
            <CheckCircle2 size={100} className="gold-text" style={{ position: 'relative', zIndex: 1 }} />
          </div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Application Submitted!</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', marginBottom: '40px' }}>
            Thank you for sharing your vision with Golden Angels. Our investment team will review your materials and get back to you within 48 hours.
          </p>
          <button className="btn-gold" onClick={() => window.location.href = '/dashboard'}>Return to Dashboard</button>
        </div>
      </LoggedInLayout>
    );
  }

  return (
    <LoggedInLayout>
      <div className="section-container" style={{ maxWidth: '800px', paddingTop: '60px', paddingBottom: '80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '12px' }}>Submit Your Startup</h1>
          <p className="section-desc" style={{ margin: '0 auto' }}>Partner with the most exclusive angel network in the world.</p>
        </div>

        {/* Progress Bar */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.85rem', color: 'var(--gold)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
            <span>Step {step} of {totalSteps}</span>
            <span>{Math.round((step / totalSteps) * 100)}% Completed</span>
          </div>
          <div style={{ width: '100%', height: '6px', background: 'var(--bg-elevated)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${(step / totalSteps) * 100}%`, height: '100%', background: 'linear-gradient(90deg, var(--gold-dark), var(--gold-bright))', transition: 'width 0.4s cubic-bezier(0.25, 1, 0.5, 1)' }}></div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '40px', position: 'relative', overflow: 'hidden' }}>
          {/* Step 1: Company Info */}
          <div style={{ display: step === 1 ? 'block' : 'none', animation: 'fadeIn 0.4s ease' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '24px', color: 'var(--gold)' }}>1. Company Info</h3>
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Company Name</label>
              <input type="text" className="form-input" placeholder="e.g. NeuroFlow AI" style={{ width: '100%', padding: '12px', background: 'var(--bg-surface)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} />
            </div>
            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Website</label>
                <input type="text" className="form-input" placeholder="https://" style={{ width: '100%', padding: '12px', background: 'var(--bg-surface)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Founded Year</label>
                <input type="text" className="form-input" placeholder="YYYY" style={{ width: '100%', padding: '12px', background: 'var(--bg-surface)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Location</label>
                <input type="text" className="form-input" placeholder="City, Country" style={{ width: '100%', padding: '12px', background: 'var(--bg-surface)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Industry</label>
                <select className="form-input" style={{ width: '100%', padding: '12px', background: 'var(--bg-surface)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }}>
                  <option>AI & Machine Learning</option>
                  <option>HealthTech & BioTech</option>
                  <option>Climate & Energy</option>
                  <option>FinTech</option>
                  <option>SpaceTech</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Step 2: Team */}
          <div style={{ display: step === 2 ? 'block' : 'none', animation: 'fadeIn 0.4s ease' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '24px', color: 'var(--gold)' }}>2. Team</h3>
            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Founder Name</label>
                <input type="text" className="form-input" style={{ width: '100%', padding: '12px', background: 'var(--bg-surface)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Co-founder(s)</label>
                <input type="text" className="form-input" style={{ width: '100%', padding: '12px', background: 'var(--bg-surface)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Team Size</label>
                <input type="number" className="form-input" style={{ width: '100%', padding: '12px', background: 'var(--bg-surface)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>LinkedIn Profiles (comma separated)</label>
                <input type="text" className="form-input" style={{ width: '100%', padding: '12px', background: 'var(--bg-surface)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} />
              </div>
            </div>
          </div>

          {/* Step 3: Product */}
          <div style={{ display: step === 3 ? 'block' : 'none', animation: 'fadeIn 0.4s ease' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '24px', color: 'var(--gold)' }}>3. Product</h3>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>One-line Pitch</label>
              <input type="text" className="form-input" placeholder="What do you do in one sentence?" style={{ width: '100%', padding: '12px', background: 'var(--bg-surface)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Product Description</label>
              <textarea rows={4} className="form-input" placeholder="Explain the problem and your solution..." style={{ width: '100%', padding: '12px', background: 'var(--bg-surface)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', resize: 'vertical' }} />
            </div>
            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Stage</label>
                <select className="form-input" style={{ width: '100%', padding: '12px', background: 'var(--bg-surface)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }}>
                  <option>Pre-seed</option>
                  <option>Seed</option>
                  <option>Series A</option>
                  <option>Series B+</option>
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Demo URL (optional)</label>
                <input type="text" className="form-input" placeholder="https://" style={{ width: '100%', padding: '12px', background: 'var(--bg-surface)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} />
              </div>
            </div>
          </div>

          {/* Step 4: Financials */}
          <div style={{ display: step === 4 ? 'block' : 'none', animation: 'fadeIn 0.4s ease' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '24px', color: 'var(--gold)' }}>4. Financials</h3>
            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Current ARR / Revenue</label>
                <select className="form-input" style={{ width: '100%', padding: '12px', background: 'var(--bg-surface)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }}>
                  <option>Pre-revenue</option>
                  <option>&lt; $100k</option>
                  <option>$100k - $1M</option>
                  <option>$1M - $5M</option>
                  <option>&gt; $5M</option>
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Funding Needed</label>
                <input type="text" className="form-input" placeholder="e.g. $2M" style={{ width: '100%', padding: '12px', background: 'var(--bg-surface)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Current Runway</label>
                <input type="text" className="form-input" placeholder="e.g. 12 months" style={{ width: '100%', padding: '12px', background: 'var(--bg-surface)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Previous Raises (Total)</label>
                <input type="text" className="form-input" placeholder="e.g. $500k" style={{ width: '100%', padding: '12px', background: 'var(--bg-surface)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} />
              </div>
            </div>
          </div>

          {/* Step 5: Vision */}
          <div style={{ display: step === 5 ? 'block' : 'none', animation: 'fadeIn 0.4s ease' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '24px', color: 'var(--gold)' }}>5. Vision</h3>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Why Golden Angels?</label>
              <textarea rows={3} className="form-input" style={{ width: '100%', padding: '12px', background: 'var(--bg-surface)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', resize: 'vertical' }} />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>5-Year Vision</label>
              <textarea rows={3} className="form-input" style={{ width: '100%', padding: '12px', background: 'var(--bg-surface)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', resize: 'vertical' }} />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '12px', color: 'var(--text-secondary)' }}>Pitch Deck Upload (PDF)</label>
              <div style={{ border: '2px dashed var(--gold-border)', borderRadius: '12px', padding: '40px', textAlign: 'center', background: 'rgba(212,175,55,0.02)', cursor: 'pointer' }}>
                <Upload size={32} className="gold-text" style={{ margin: '0 auto 16px' }} />
                <p style={{ margin: 0, fontWeight: 500 }}>Click to upload or drag & drop</p>
                <p style={{ margin: '8px 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Max file size: 20MB</p>
              </div>
            </div>
          </div>

          <style jsx>{`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateX(20px); }
              to { opacity: 1; transform: translateX(0); }
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
              {isSubmitting ? 'Submitting...' : 'Submit Startup'} <CheckCircle2 size={18} />
            </button>
          )}
        </div>
      </div>
    </LoggedInLayout>
  );
}

export default function SubmitStartupPage() {
  return <AuthProvider><SubmitStartupContent /></AuthProvider>;
}
