'use client';
import { useState, useRef, useEffect } from 'react';
import { AuthProvider, useAuth } from '../../../components/AuthProvider';
import LoggedInLayout from '../../../components/LoggedInLayout';
import Navbar from '../../../components/Navbar';
import AuthModal from '../../../components/AuthModal';
import Footer from '../../../components/Footer';

export default function GoldenAIPage() {
  return (
    <AuthProvider>
      <GoldenAIContent />
    </AuthProvider>
  );
}

function GoldenAIContent() {
  const { user, loading } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  // Custom styles for hover effects and animations
  const customStyles = `
    @keyframes goldenPulse {
      0%, 100% { box-shadow: 0 0 40px rgba(212,175,55,0.3), 0 0 80px rgba(212,175,55,0.1); }
      50% { box-shadow: 0 0 60px rgba(212,175,55,0.5), 0 0 120px rgba(212,175,55,0.2); }
    }
    
    .hover-card {
      transition: all 0.3s ease;
    }
    .hover-card:hover {
      transform: translateY(-5px);
      border-color: rgba(212, 175, 55, 0.5) !important;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5), 0 0 20px rgba(212,175,55,0.1) !important;
    }
    
    .btn-gold {
      background: linear-gradient(135deg, var(--gold), var(--gold-bright));
      color: #000;
      padding: 14px 32px;
      border-radius: 8px;
      font-weight: 700;
      font-size: 1.1rem;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
      text-decoration: none;
      display: inline-block;
      box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
    }
    .btn-gold:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(212, 175, 55, 0.5);
    }
    
    .btn-outline {
      background: transparent;
      color: var(--gold);
      padding: 14px 32px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 1.1rem;
      border: 1px solid var(--gold);
      cursor: pointer;
      transition: all 0.3s ease;
      text-decoration: none;
      display: inline-block;
    }
    .btn-outline:hover {
      background: rgba(212, 175, 55, 0.1);
      transform: translateY(-2px);
    }
  `;

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about-section');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const content = (
    <div style={{ backgroundColor: 'var(--bg-void)', color: 'var(--text-primary)', fontFamily: 'system-ui, -apple-system, sans-serif', overflowX: 'hidden' }}>
      <style>{customStyles}</style>

      {/* Hero Section */}
      <section style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center',
        padding: '100px 20px',
        position: 'relative',
        background: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.05) 0%, var(--bg-void) 70%)'
      }}>
        <div style={{
          width: '280px',
          height: '280px',
          borderRadius: '50%',
          marginBottom: '40px',
          animation: 'goldenPulse 4s infinite ease-in-out',
          background: 'url(/golden-ai-emblem.jpg) center/cover no-repeat',
          border: '2px solid rgba(212, 175, 55, 0.3)'
        }} />
        
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: 900,
          letterSpacing: '8px',
          color: 'var(--gold)',
          margin: '0 0 10px 0',
          textAlign: 'center',
          textShadow: '0 0 20px rgba(212, 175, 55, 0.3)'
        }}>GOLDEN A.I.</h1>
        
        <h2 style={{
          fontSize: '1.2rem',
          letterSpacing: '6px',
          color: 'var(--text-muted)',
          fontWeight: 400,
          margin: '0 0 20px 0',
          textAlign: 'center'
        }}>AMPLIFIED INTELLIGENCE</h2>
        
        <p style={{
          color: 'var(--gold)',
          fontWeight: 600,
          fontSize: '1.1rem',
          margin: '0 0 50px 0',
          textAlign: 'center'
        }}>AUTOMATE | AMPLIFY | ELEVATE</p>
        
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="/invest" className="btn-gold">Invest Now</a>
          <button onClick={scrollToAbout} className="btn-outline">Learn More</button>
        </div>
      </section>

      {/* Four Pillars Section */}
      <section style={{ padding: '100px 20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h3 style={{ textAlign: 'center', color: 'var(--gold)', fontSize: '2rem', marginBottom: '60px' }}>Our Core Pillars</h3>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '24px' 
          }}>
            {[
              { icon: '⚙️', title: 'Automation', desc: 'Streamlining complex workflows and daily tasks to give you back your most valuable resource: time.' },
              { icon: '🧠', title: 'Intelligence', desc: 'State-of-the-art AI systems that adapt, learn, and provide unparalleled insights for decision making.' },
              { icon: '📈', title: 'Growth', desc: 'Tools designed not just to maintain, but to accelerate personal and professional development.' },
              { icon: '❤️', title: 'Impact', desc: 'Creating technology with heart, focusing on accessibility and improving quality of life for all.' }
            ].map((pillar, i) => (
              <div key={i} className="hover-card" style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '16px',
                padding: '30px',
                textAlign: 'center',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '20px' }}>{pillar.icon}</div>
                <h4 style={{ color: 'var(--text-primary)', fontSize: '1.3rem', marginBottom: '15px' }}>{pillar.title}</h4>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About / Mission Section */}
      <section id="about-section" style={{ padding: '100px 20px', backgroundColor: 'var(--bg-elevated)' }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '60px',
          alignItems: 'center'
        }}>
          <div>
            <span style={{ color: 'var(--gold-muted)', fontWeight: 600, letterSpacing: '2px', fontSize: '0.9rem', textTransform: 'uppercase' }}>
              About Golden A.I.
            </span>
            <h2 style={{ fontSize: '2.5rem', margin: '20px 0', color: 'var(--text-primary)', lineHeight: 1.2 }}>
              Amplified Intelligence.<br/>Limitless Potential.
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '20px' }}>
              Golden A.I. is a next-generation AI platform ecosystem empowering creators and everyday people through intelligent tools for lifestyle enhancement, creative expression, automation, and financial opportunity.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '40px' }}>
              Our mission is to create technology with heart—AI that inspires people, elevates quality of life, and makes powerful tools accessible to everyone.
            </p>
            <button className="btn-outline">Our Mission</button>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              width: '100%',
              maxWidth: '400px',
              aspectRatio: '1/1',
              borderRadius: '20px',
              background: 'url(/golden-ai-emblem.jpg) center/cover no-repeat',
              boxShadow: '0 0 40px rgba(212,175,55,0.2)',
              border: '1px solid rgba(212,175,55,0.1)'
            }} />
          </div>
        </div>
      </section>

      {/* Platform Ecosystem Section */}
      <section style={{ padding: '100px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '60px', color: 'var(--text-primary)' }}>Platform Ecosystem</h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '24px' 
          }}>
            {[
              { icon: '🎨', name: 'Creator Tools', desc: 'AI-assisted content generation and design.' },
              { icon: '🌱', name: 'Personal Development', desc: 'Smart coaching and habit tracking.' },
              { icon: '🎬', name: 'Entertainment', desc: 'Immersive and interactive AI experiences.' },
              { icon: '🛒', name: 'Digital Commerce', desc: 'Automated storefronts and market analysis.' },
              { icon: '📚', name: 'Education', desc: 'Personalized learning paths and tutoring.' },
              { icon: '🧘', name: 'Wellness', desc: 'Health insights and mental well-being companions.' },
              { icon: '🤖', name: 'AI Assistants', desc: 'Intelligent agents for everyday life.' }
            ].map((sector, i) => (
              <div key={i} className="hover-card" style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '12px',
                padding: '24px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px'
              }}>
                <div style={{ fontSize: '2rem' }}>{sector.icon}</div>
                <div>
                  <h4 style={{ color: 'var(--text-primary)', margin: '0 0 8px 0', fontSize: '1.1rem' }}>{sector.name}</h4>
                  <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem', lineHeight: 1.5 }}>{sector.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Opportunity Section */}
      <section style={{ padding: '100px 20px', background: 'linear-gradient(to bottom, var(--bg-void), rgba(212,175,55,0.03))' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ color: 'var(--gold)', fontWeight: 600, letterSpacing: '2px', fontSize: '0.9rem', textTransform: 'uppercase' }}>
            Invest in the future
          </span>
          <h2 style={{ fontSize: '2.5rem', margin: '20px 0 40px', color: 'var(--text-primary)' }}>
            Join the Golden A.I. Revolution
          </h2>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center',
            gap: '40px',
            flexWrap: 'wrap',
            marginBottom: '60px'
          }}>
            <div>
              <div style={{ fontSize: '2.5rem', color: 'var(--gold)', fontWeight: 'bold' }}>$18.75</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Per Share</div>
            </div>
            <div>
              <div style={{ fontSize: '2.5rem', color: 'var(--gold)', fontWeight: 'bold' }}>250K</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Shares Available</div>
            </div>
            <div>
              <div style={{ fontSize: '2.5rem', color: 'var(--gold)', fontWeight: 'bold' }}>$100</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Minimum Invest</div>
            </div>
            <div>
              <div style={{ fontSize: '2.5rem', color: '#4ade80', fontWeight: 'bold' }}>29.33%</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Proj. Growth</div>
            </div>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
            gap: '20px',
            marginBottom: '50px'
          }}>
            {['Scalable Platform Model', 'Multi-Industry Expansion', 'Community-First Growth', 'Long-Term Vision: Robotics & Smart Devices'].map((metric, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                padding: '20px',
                color: 'var(--text-secondary)',
                fontWeight: 500
              }}>
                {metric}
              </div>
            ))}
          </div>
          
          <a href="/invest" className="btn-gold" style={{ fontSize: '1.2rem', padding: '16px 40px' }}>
            Invest Now — $18.75/share
          </a>
        </div>
      </section>

      {/* Community Section */}
      <section style={{ padding: '100px 20px', backgroundColor: 'var(--bg-elevated)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '60px', color: 'var(--text-primary)' }}>
            Welcome to the Golden A.I. Community
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '24px',
            marginBottom: '60px'
          }}>
            {[
              { title: 'Connect', desc: 'Network with creators, investors, and visionaries globally.' },
              { title: 'Join Discussions', desc: 'Engage in deep conversations about the future of AI.' },
              { title: 'Learn & Grow', desc: 'Access exclusive resources, workshops, and tutorials.' },
              { title: 'Make an Impact', desc: 'Contribute to open-source initiatives and community projects.' }
            ].map((feature, i) => (
              <div key={i} className="hover-card" style={{
                background: 'rgba(212,175,55,0.05)',
                border: '1px solid rgba(212,175,55,0.15)',
                borderRadius: '16px',
                padding: '30px',
                textAlign: 'center'
              }}>
                <h4 style={{ color: 'var(--gold)', fontSize: '1.3rem', marginBottom: '15px' }}>{feature.title}</h4>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{feature.desc}</p>
              </div>
            ))}
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '30px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '40px' }}>
             <div style={{ textAlign: 'center' }}><strong style={{ display: 'block', fontSize: '2rem', color: 'var(--text-primary)' }}>50K+</strong><span style={{ color: 'var(--text-muted)' }}>Members</span></div>
             <div style={{ textAlign: 'center' }}><strong style={{ display: 'block', fontSize: '2rem', color: 'var(--text-primary)' }}>120+</strong><span style={{ color: 'var(--text-muted)' }}>Countries</span></div>
             <div style={{ textAlign: 'center' }}><strong style={{ display: 'block', fontSize: '2rem', color: 'var(--text-primary)' }}>2K+</strong><span style={{ color: 'var(--text-muted)' }}>Discussions Daily</span></div>
             <div style={{ textAlign: 'center' }}><strong style={{ display: 'block', fontSize: '2rem', color: 'var(--text-primary)' }}>100+</strong><span style={{ color: 'var(--text-muted)' }}>Events Yearly</span></div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section style={{ padding: '120px 20px', background: 'var(--bg-void)', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '2rem', color: 'var(--gold)', marginBottom: '30px' }}>The Horizon</h3>
          <p style={{ fontSize: '1.2rem', lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: '30px' }}>
            While our immediate focus centers on scalable AI software, our long-term vision encompasses assistive AI systems, smart devices, and robotics designed for accessibility and compassionate technology.
          </p>
          <p style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--text-primary)', fontStyle: 'italic' }}>
            Golden A.I. is more than software—it's the beginning of a connected ecosystem.
          </p>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section style={{ 
        padding: '100px 20px', 
        background: 'linear-gradient(45deg, rgba(212,175,55,0.1), rgba(0,0,0,0))',
        borderTop: '1px solid rgba(212,175,55,0.2)',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '40px', color: 'var(--text-primary)' }}>
          Be Part of Something Extraordinary
        </h2>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/invest" className="btn-gold">Invest in Golden A.I.</a>
          <a href="/contact" className="btn-outline">Contact Us</a>
        </div>
      </section>
    </div>
  );

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-void)' }}>
        <div style={{ color: 'var(--gold)', fontSize: '1.5rem', animation: 'goldenPulse 2s infinite' }}>Loading...</div>
      </div>
    );
  }

  return user ? (
    <LoggedInLayout>{content}</LoggedInLayout>
  ) : (
    <>
      <Navbar onLoginClick={() => setIsAuthModalOpen(true)} />
      <main style={{ minHeight: '100vh', paddingTop: '80px', backgroundColor: 'var(--bg-void)' }}>
        {content}
      </main>
      <Footer />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
}
