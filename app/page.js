'use client';
import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from '../components/AuthProvider';
import AuthModal from '../components/AuthModal';
import ParticleField from '../components/ParticleField';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import MissionSection from '../components/MissionSection';
import StatsCounter from '../components/StatsCounter';
import InvestmentSection from '../components/InvestmentSection';
import EcosystemSection from '../components/EcosystemSection';
import FoundersSection from '../components/FoundersSection';
import ImpactSection from '../components/ImpactSection';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';

function HomePage() {
  const { user, logout } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState('signin');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 2200);
    return () => clearTimeout(timer);
  }, []);

  const openSignIn = () => { setAuthTab('signin'); setAuthOpen(true); };
  const openSignUp = () => { setAuthTab('signup'); setAuthOpen(true); };

  return (
    <>
      <div className={`loading-screen ${isLoaded ? 'hidden' : ''}`}>
        <img src="/Golden Angels_LOGO.png" alt="Golden Angels" style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
        <div className="loading-bar-track">
          <div className="loading-bar-fill" ref={el => { if (el) setTimeout(() => { el.style.width = '100%'; }, 100); }} style={{ width: '0%', transition: 'width 2s ease-out' }} />
        </div>
      </div>

      <ParticleField />
      <Navbar onAuthClick={openSignIn} onSignupClick={openSignUp} user={user} onLogout={logout} />
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} initialTab={authTab} />

      <main>
        <HeroSection />
        <MissionSection />
        <StatsCounter />
        <InvestmentSection />
        <EcosystemSection />
        <FoundersSection />
        <ImpactSection />
        <CallToAction />
        <Footer />
      </main>
    </>
  );
}

export default function Page() {
  return <AuthProvider><HomePage /></AuthProvider>;
}
