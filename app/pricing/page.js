'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthProvider, useAuth } from '../../components/AuthProvider';
import LoggedInLayout from '../../components/LoggedInLayout';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Check, X, Sparkles, Crown, Shield, Zap, Star, TrendingUp, Users, Building2, Plus, Minus } from 'lucide-react';

function PricingContent() {
  const { user } = useAuth();
  const router = useRouter();
  const [isAnnual, setIsAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    if (openFaq === index) {
      setOpenFaq(null);
    } else {
      setOpenFaq(index);
    }
  };

  const faqs = [
    {
      q: "What happens if my campaign doesn't reach its goal?",
      a: "If your campaign does not reach its minimum goal, all funds are returned to investors with no fees charged to you."
    },
    {
      q: "Can I upgrade or downgrade my plan?",
      a: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle, and prorated credits will be applied."
    },
    {
      q: "How are success fees charged?",
      a: "Success fees are only charged on funds successfully raised. We deduct the fee automatically before transferring the final amount to your account."
    },
    {
      q: "What is the equity option for Sovereign and Divine tiers?",
      a: "Instead of paying the full cash success fee, Sovereign and Divine members can opt to offer a small percentage of equity, aligning our success completely with yours."
    },
    {
      q: "Is there a refund policy?",
      a: "We offer a 14-day money-back guarantee for all our subscription tiers if you're not fully satisfied with the platform features."
    },
    {
      q: "Do investors pay to browse?",
      a: "Basic browsing is free for all accredited investors. We offer Premium and Elite tiers for investors who want deeper analytics, early access, and co-investment opportunities."
    }
  ];

  const content = (
    <div style={{ backgroundColor: 'var(--bg-void)', color: 'var(--text-primary)', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      <style dangerouslySetInnerHTML={{__html: `
        .pricing-hero-container {
          padding: 80px 24px 60px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .pricing-hero-container::before {
          content: '';
          position: absolute;
          top: -200px;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(212,175,55,0.08) 0%, rgba(10,10,10,0) 70%);
          z-index: 0;
          pointer-events: none;
        }
        .section-label {
          color: var(--gold);
          text-transform: uppercase;
          letter-spacing: 0.2em;
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .pricing-hero h1 {
          font-size: 4rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 24px 0;
          letter-spacing: -0.02em;
          line-height: 1.1;
          position: relative;
          z-index: 1;
        }
        .pricing-hero p {
          font-size: 1.25rem;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto 40px;
          line-height: 1.6;
          position: relative;
          z-index: 1;
        }
        
        /* Toggle Switch */
        .billing-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-bottom: 64px;
          position: relative;
          z-index: 1;
        }
        .toggle-label {
          font-size: 1.1rem;
          font-weight: 500;
          color: var(--text-secondary);
          transition: color 0.3s ease;
          cursor: pointer;
        }
        .toggle-label.active {
          color: #ffffff;
        }
        .toggle-switch {
          width: 80px;
          height: 40px;
          background-color: var(--bg-surface);
          border-radius: 40px;
          position: relative;
          cursor: pointer;
          border: 1px solid rgba(255,255,255,0.1);
          transition: background-color 0.3s ease, border-color 0.3s ease;
        }
        .toggle-switch:hover {
          border-color: rgba(212,175,55,0.3);
        }
        .toggle-knob {
          width: 32px;
          height: 32px;
          background-color: var(--gold);
          border-radius: 50%;
          position: absolute;
          top: 3px;
          left: 4px;
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 0 10px rgba(212,175,55,0.4);
        }
        .toggle-switch.is-annual .toggle-knob {
          transform: translateX(40px);
        }
        .save-badge {
          background: rgba(34, 197, 94, 0.15);
          color: #4ade80;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
          border: 1px solid rgba(34, 197, 94, 0.3);
          position: absolute;
          right: -100px;
          top: -10px;
          animation: pulse-badge 2s infinite;
        }
        @keyframes pulse-badge {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        /* Grids */
        .pricing-section {
          max-width: 1300px;
          margin: 0 auto 80px;
          padding: 0 24px;
          position: relative;
          z-index: 1;
        }
        .section-header {
          text-align: center;
          margin-bottom: 40px;
        }
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        .investor-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 1000px;
          margin: 0 auto;
        }

        /* Cards */
        .pricing-card {
          background-color: var(--bg-card);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
          padding: 32px;
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .pricing-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.5);
          border-color: rgba(255,255,255,0.15);
        }
        .pricing-card.recommended {
          border: 2px solid var(--gold);
          box-shadow: 0 0 40px rgba(212,175,55,0.1);
        }
        .pricing-card.recommended:hover {
          box-shadow: 0 10px 50px rgba(212,175,55,0.2);
        }
        .pricing-card.elite {
          background: linear-gradient(135deg, rgba(30,30,30,0.9), rgba(20,15,5,0.95));
          border: 1px solid var(--gold-border);
        }
        .pricing-card.elite::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 4px;
          background: linear-gradient(90deg, var(--gold-dark, #b8860b), var(--gold-bright, #ffd700), var(--gold-dark, #b8860b));
        }

        /* Badges */
        .badge {
          position: absolute;
          top: -1px;
          left: 50%;
          transform: translateX(-50%);
          background-color: var(--gold);
          color: #000;
          padding: 4px 16px;
          border-radius: 0 0 8px 8px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .badge.elite-badge {
          background: linear-gradient(90deg, #d4af37, #f3e5ab);
        }

        /* Card Header */
        .card-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(212,175,55,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--gold);
          margin-bottom: 24px;
          border: 1px solid rgba(212,175,55,0.2);
        }
        .card-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #ffffff;
          margin: 0 0 8px 0;
        }
        .card-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin: 0 0 24px 0;
          min-height: 40px;
        }
        
        /* Price */
        .price-container {
          margin-bottom: 8px;
          display: flex;
          align-items: flex-end;
          gap: 4px;
        }
        .price {
          font-size: 3rem;
          font-weight: 700;
          color: #ffffff;
          line-height: 1;
        }
        .price.free {
          font-size: 2.5rem;
        }
        .period {
          font-size: 1rem;
          color: var(--text-muted);
          margin-bottom: 6px;
        }
        .original-price {
          text-decoration: line-through;
          color: var(--text-muted);
          font-size: 1rem;
          margin-bottom: 8px;
          display: block;
          height: 20px;
        }
        .success-fee {
          font-size: 0.85rem;
          color: var(--gold-muted, #cca953);
          margin-bottom: 32px;
          padding-bottom: 24px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          font-weight: 500;
        }

        /* Features */
        .features-list {
          list-style: none;
          padding: 0;
          margin: 0 0 32px 0;
          flex-grow: 1;
        }
        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 16px;
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }
        .feature-icon {
          flex-shrink: 0;
          margin-top: 2px;
        }
        .feature-icon.check {
          color: var(--gold);
        }
        .feature-icon.cross {
          color: var(--text-muted);
          opacity: 0.5;
        }
        .feature-text.strikethrough {
          text-decoration: line-through;
          color: var(--text-muted);
          opacity: 0.6;
        }
        .highlight-text {
          color: #ffffff;
          font-weight: 500;
        }

        /* Buttons */
        .btn {
          width: 100%;
          padding: 14px 24px;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: none;
        }
        .btn-outline {
          background: transparent;
          color: #ffffff;
          border: 1px solid rgba(255,255,255,0.2);
        }
        .btn-outline:hover {
          background: rgba(255,255,255,0.05);
          border-color: rgba(255,255,255,0.4);
        }
        .btn-gold {
          background: var(--gold);
          color: #000000;
        }
        .btn-gold:hover {
          background: var(--gold-bright, #ffd700);
          box-shadow: 0 0 20px rgba(212,175,55,0.4);
        }
        .btn-elite {
          background: transparent;
          color: var(--gold);
          border: 1px solid var(--gold);
        }
        .btn-elite:hover {
          background: rgba(212,175,55,0.1);
          box-shadow: 0 0 20px rgba(212,175,55,0.2);
        }

        /* FAQ */
        .faq-section {
          max-width: 800px;
          margin: 0 auto 100px;
          padding: 0 24px;
        }
        .faq-item {
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding: 24px 0;
        }
        .faq-question {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 1.1rem;
          font-weight: 500;
          color: #ffffff;
          cursor: pointer;
          transition: color 0.3s ease;
        }
        .faq-question:hover {
          color: var(--gold);
        }
        .faq-icon {
          color: var(--gold);
          transition: transform 0.3s ease;
        }
        .faq-icon.open {
          transform: rotate(45deg);
        }
        .faq-answer {
          margin-top: 16px;
          color: var(--text-secondary);
          line-height: 1.6;
          display: none;
        }
        .faq-answer.open {
          display: block;
          animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* CTA */
        .cta-section {
          background: linear-gradient(to top, rgba(212,175,55,0.05), transparent);
          padding: 100px 24px;
          text-align: center;
          border-top: 1px solid rgba(255,255,255,0.03);
        }
        .cta-title {
          font-size: 3rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 16px 0;
        }
        .cta-desc {
          font-size: 1.25rem;
          color: var(--text-secondary);
          margin: 0 auto 40px;
          max-width: 600px;
        }
        .cta-buttons {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
        }
        .cta-btn {
          padding: 14px 32px;
          border-radius: 30px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
        }
        .cta-btn-primary {
          background: var(--gold);
          color: #000;
        }
        .cta-btn-primary:hover {
          background: var(--gold-bright, #ffd700);
          box-shadow: 0 0 20px rgba(212,175,55,0.4);
        }
        .cta-btn-secondary {
          background: transparent;
          color: #ffffff;
          border: 1px solid rgba(255,255,255,0.2);
        }
        .cta-btn-secondary:hover {
          background: rgba(255,255,255,0.05);
          border-color: rgba(255,255,255,0.4);
        }

        /* Responsive */
        @media (max-width: 1200px) {
          .pricing-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .pricing-hero h1 { font-size: 2.5rem !important; }
          .pricing-grid { grid-template-columns: 1fr !important; }
          .investor-grid { grid-template-columns: 1fr !important; }
          .pricing-card { padding: 24px !important; }
          .cta-title { font-size: 2.5rem; }
          .cta-buttons { flex-direction: column; }
          .cta-btn { width: 100%; max-width: 300px; }
          .billing-toggle { flex-direction: column; gap: 8px; margin-bottom: 40px; }
          .save-badge { position: relative; right: auto; top: auto; display: inline-block; margin-top: 8px; }
        }
      `}} />

      {/* Hero Section */}
      <div className="pricing-hero-container">
        <div className="pricing-hero">
          <div className="section-label">
            <Sparkles size={16} /> PRICING
          </div>
          <h1>Choose Your Path to Impact</h1>
          <p>Whether you're raising your first round or scaling to billions, we have a plan for you.</p>

          <div className="billing-toggle">
            <span className={`toggle-label ${!isAnnual ? 'active' : ''}`} onClick={() => setIsAnnual(false)}>Monthly</span>
            <div className={`toggle-switch ${isAnnual ? 'is-annual' : ''}`} onClick={() => setIsAnnual(!isAnnual)}>
              <div className="toggle-knob"></div>
            </div>
            <span className={`toggle-label ${isAnnual ? 'active' : ''}`} onClick={() => setIsAnnual(true)}>
              Annually
              {isAnnual && <span className="save-badge">Save 17%</span>}
            </span>
          </div>
        </div>
      </div>

      {/* Fundraiser Tiers */}
      <div className="pricing-section">
        <div className="section-header">
          <div className="section-label">
            <Building2 size={16} /> FOR FUNDRAISERS & STARTUPS
          </div>
        </div>
        
        <div className="pricing-grid">
          {/* Tier 1 */}
          <div className="pricing-card">
            <div className="card-icon"><Zap size={24} /></div>
            <h3 className="card-title">Spark</h3>
            <p className="card-desc">For founders seeking ≤ $1M</p>
            
            <div className="original-price"></div>
            <div className="price-container">
              <span className="price free">Free Forever</span>
            </div>
            <div className="success-fee">5% success fee</div>
            
            <ul className="features-list">
              <li className="feature-item"><Check size={18} className="feature-icon check" /> <span className="feature-text"><span className="highlight-text">1</span> active campaign</span></li>
              <li className="feature-item"><Check size={18} className="feature-icon check" /> <span className="feature-text">Basic profile page</span></li>
              <li className="feature-item"><Check size={18} className="feature-icon check" /> <span className="feature-text">Community forum access</span></li>
              <li className="feature-item"><Check size={18} className="feature-icon check" /> <span className="feature-text">Standard listing</span></li>
              <li className="feature-item"><Check size={18} className="feature-icon check" /> <span className="feature-text">Basic analytics</span></li>
              <li className="feature-item"><Check size={18} className="feature-icon check" /> <span className="feature-text">5 messages/day</span></li>
              <li className="feature-item"><X size={18} className="feature-icon cross" /> <span className="feature-text strikethrough">Video pitch hosting</span></li>
              <li className="feature-item"><X size={18} className="feature-icon cross" /> <span className="feature-text strikethrough">Dedicated manager</span></li>
            </ul>
            
            <button className="btn btn-outline">Get Started Free</button>
          </div>

          {/* Tier 2 */}
          <div className="pricing-card recommended">
            <div className="badge"><Star size={12} fill="#000" /> POPULAR</div>
            <div className="card-icon"><TrendingUp size={24} /></div>
            <h3 className="card-title">Ascend</h3>
            <p className="card-desc">For startups seeking $1M – $10M</p>
            
            <div className="original-price">{isAnnual ? '$199/mo' : ''}</div>
            <div className="price-container">
              <span className="price">{isAnnual ? '$1,999' : '$199'}</span>
              <span className="period">{isAnnual ? '/yr' : '/mo'}</span>
            </div>
            <div className="success-fee">3.5% success fee</div>
            
            <ul className="features-list">
              <li className="feature-item"><Check size={18} className="feature-icon check" /> <span className="feature-text">Everything in Spark, plus:</span></li>
              <li className="feature-item"><Check size={18} className="feature-icon check" /> <span className="feature-text"><span className="highlight-text">3</span> active campaigns</span></li>
              <li className="feature-item"><Check size={18} className="feature-icon check" /> <span className="feature-text">Featured listing priority</span></li>
              <li className="feature-item"><Check size={18} className="feature-icon check" /> <span className="feature-text">Advanced analytics dashboard</span></li>
              <li className="feature-item"><Check size={18} className="feature-icon check" /> <span className="feature-text">Investor matching algorithm</span></li>
              <li className="feature-item"><Check size={18} className="feature-icon check" /> <span className="feature-text">Unlimited messaging</span></li>
              <li className="feature-item"><Check size={18} className="feature-icon check" /> <span className="feature-text">Video pitch hosting</span></li>
              <li className="feature-item"><Check size={18} className="feature-icon check" /> <span className="feature-text">Verified ✦ badge</span></li>
              <li className="feature-item"><Check size={18} className="feature-icon check" /> <span className="feature-text">Monthly pitch events</span></li>
            </ul>
            
            <button className="btn btn-gold">Start Ascending</button>
          </div>

          {/* Tier 3 */}
          <div className="pricing-card">
            <div className="card-icon"><Shield size={24} /></div>
            <h3 className="card-title">Sovereign</h3>
            <p className="card-desc">For companies seeking $10M – $100M</p>
            
            <div className="original-price">{isAnnual ? '$999/mo' : ''}</div>
            <div className="price-container">
              <span className="price">{isAnnual ? '$9,999' : '$999'}</span>
              <span className="period">{isAnnual ? '/yr' : '/mo'}</span>
            </div>
            <div className="success-fee">2% success fee (or 1% + equity option)</div>
            
            <ul className="features-list">
              <li className="feature-item"><Check size={18} className="feature-icon check" /> <span className="feature-text">Everything in Ascend, plus:</span></li>
              <li className="feature-item"><Check size={18} className="feature-icon check" /> <span className="feature-text"><span className="highlight-text">Unlimited</span> campaigns</span></li>
              <li className="feature-item"><Check size={18} className="feature-icon check" /> <span className="feature-text">Dedicated account manager</span></li>
              <li className="feature-item"><Check size={18} className="feature-icon check" /> <span className="feature-text">Due diligence support</span></li>
              <li className="feature-item"><Check size={18} className="feature-icon check" /> <span className="feature-text">Custom branded campaign page</span></li>
              <li className="feature-item"><Check size={18} className="feature-icon check" /> <span className="feature-text">Priority investor introductions</span></li>
              <li className="feature-item"><Check size={18} className="feature-icon check" /> <span className="feature-text">Quarterly advisory calls</span></li>
              <li className="feature-item"><Check size={18} className="feature-icon check" /> <span className="feature-text">Investor events access</span></li>
              <li className="feature-item"><Check size={18} className="feature-icon check" /> <span className="feature-text">Data room hosting</span></li>
              <li className="feature-item"><Check size={18} className="feature-icon check" /> <span className="feature-text">Sovereign ✦✦ badge</span></li>
            </ul>
            
            <button className="btn btn-gold">Go Sovereign</button>
          </div>

          {/* Tier 4 */}
          <div className="pricing-card elite">
            <div className="badge elite-badge"><Crown size={12} fill="#000" /> ELITE</div>
            <div className="card-icon"><Crown size={24} /></div>
            <h3 className="card-title">Divine</h3>
            <p className="card-desc">For enterprises seeking $100M+</p>
            
            <div className="original-price">{isAnnual ? '$4,999/mo' : ''}</div>
            <div className="price-container">
              <span className="price">{isAnnual ? '$49,999' : '$4,999'}</span>
              <span className="period">{isAnnual ? '/yr' : '/mo'}</span>
            </div>
            <div className="success-fee">1.5% success fee (or 0.5% + equity option)</div>
            
            <ul className="features-list">
              <li className="feature-item"><Check size={18} className="feature-icon check" /> <span className="feature-text">Everything in Sovereign, plus:</span></li>
              <li className="feature-item"><Check size={18} className="feature-icon check" /> <span className="feature-text">White-glove concierge</span></li>
              <li className="feature-item"><Check size={18} className="feature-icon check" /> <span className="feature-text">Co-investment consideration</span></li>
              <li className="feature-item"><Check size={18} className="feature-icon check" /> <span className="feature-text">Board advisory access</span></li>
              <li className="feature-item"><Check size={18} className="feature-icon check" /> <span className="feature-text">Custom deal structuring</span></li>
              <li className="feature-item"><Check size={18} className="feature-icon check" /> <span className="feature-text">Syndicate creation tools</span></li>
              <li className="feature-item"><Check size={18} className="feature-icon check" /> <span className="feature-text">Press & media support</span></li>
              <li className="feature-item"><Check size={18} className="feature-icon check" /> <span className="feature-text">Annual CEO strategic review</span></li>
              <li className="feature-item"><Check size={18} className="feature-icon check" /> <span className="feature-text">VIP summit invitations</span></li>
              <li className="feature-item"><Check size={18} className="feature-icon check" /> <span className="feature-text">Divine ✦✦✦ badge</span></li>
            </ul>
            
            <button className="btn btn-elite">Apply for Divine</button>
            <div style={{textAlign: 'center', marginTop: '12px', fontSize: '0.8rem', color: 'var(--text-muted)'}}>Application reviewed within 48 hours</div>
          </div>
        </div>
      </div>

      {/* Investor Tiers */}
      <div className="pricing-section">
        <div className="section-header">
          <div className="section-label" style={{marginTop: '40px'}}>
            <Users size={16} /> FOR INVESTORS
          </div>
        </div>
        
        <div className="investor-grid">
          {/* Free Investor */}
          <div className="pricing-card">
            <h3 className="card-title" style={{fontSize: '1.25rem'}}>Free Investor</h3>
            <div className="price-container" style={{margin: '16px 0'}}>
              <span className="price" style={{fontSize: '2rem'}}>Free</span>
            </div>
            <ul className="features-list">
              <li className="feature-item"><Check size={16} className="feature-icon check" /> <span className="feature-text">Browse all deals</span></li>
              <li className="feature-item"><Check size={16} className="feature-icon check" /> <span className="feature-text">Basic portfolio view</span></li>
              <li className="feature-item"><Check size={16} className="feature-icon check" /> <span className="feature-text">Community access</span></li>
              <li className="feature-item"><Check size={16} className="feature-icon check" /> <span className="feature-text">$1,000 minimum investment</span></li>
            </ul>
            <button className="btn btn-outline" style={{padding: '10px'}}>Browse Free</button>
          </div>

          {/* Premium Investor */}
          <div className="pricing-card">
            <h3 className="card-title" style={{fontSize: '1.25rem'}}>Premium Investor</h3>
            <div className="price-container" style={{margin: '16px 0'}}>
              <span className="price" style={{fontSize: '2rem'}}>{isAnnual ? '$1,499' : '$149'}</span>
              <span className="period">{isAnnual ? '/yr' : '/mo'}</span>
            </div>
            <ul className="features-list">
              <li className="feature-item"><Check size={16} className="feature-icon check" /> <span className="feature-text">Everything in Free, plus:</span></li>
              <li className="feature-item"><Check size={16} className="feature-icon check" /> <span className="feature-text">Full due diligence reports</span></li>
              <li className="feature-item"><Check size={16} className="feature-icon check" /> <span className="feature-text">Advanced portfolio analytics</span></li>
              <li className="feature-item"><Check size={16} className="feature-icon check" /> <span className="feature-text">$500 minimum investment</span></li>
              <li className="feature-item"><Check size={16} className="feature-icon check" /> <span className="feature-text">Quarterly investor events</span></li>
              <li className="feature-item"><Check size={16} className="feature-icon check" /> <span className="feature-text">Premium badge</span></li>
            </ul>
            <button className="btn btn-gold" style={{padding: '10px'}}>Go Premium</button>
          </div>

          {/* Elite Investor */}
          <div className="pricing-card elite">
            <h3 className="card-title" style={{fontSize: '1.25rem'}}>Elite Investor</h3>
            <div className="price-container" style={{margin: '16px 0'}}>
              <span className="price" style={{fontSize: '2rem'}}>{isAnnual ? '$4,999' : '$499'}</span>
              <span className="period">{isAnnual ? '/yr' : '/mo'}</span>
            </div>
            <ul className="features-list">
              <li className="feature-item"><Check size={16} className="feature-icon check" /> <span className="feature-text">Everything in Premium, plus:</span></li>
              <li className="feature-item"><Check size={16} className="feature-icon check" /> <span className="feature-text">48hr early deal access</span></li>
              <li className="feature-item"><Check size={16} className="feature-icon check" /> <span className="feature-text">Co-invest with Golden Angels</span></li>
              <li className="feature-item"><Check size={16} className="feature-icon check" /> <span className="feature-text">$100 minimum investment</span></li>
              <li className="feature-item"><Check size={16} className="feature-icon check" /> <span className="feature-text">Monthly VIP events</span></li>
              <li className="feature-item"><Check size={16} className="feature-icon check" /> <span className="feature-text">Private deal room access</span></li>
              <li className="feature-item"><Check size={16} className="feature-icon check" /> <span className="feature-text">Elite badge</span></li>
            </ul>
            <button className="btn btn-elite" style={{padding: '10px'}}>Join Elite</button>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="faq-section">
        <div className="section-header">
          <h2 style={{fontSize: '2.5rem', margin: '0 0 16px', color: '#fff'}}>Frequently Asked Questions</h2>
          <p style={{color: 'var(--text-secondary)'}}>Find answers to common questions about our platform and pricing.</p>
        </div>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <div className="faq-question" onClick={() => toggleFaq(index)}>
                {faq.q}
                {openFaq === index ? <Minus size={20} className="faq-icon" /> : <Plus size={20} className="faq-icon" />}
              </div>
              <div className={`faq-answer \${openFaq === index ? 'open' : ''}`}>
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <h2 className="cta-title">Ready to Change the World?</h2>
        <p className="cta-desc">Join thousands of founders and investors building the future on Golden Angels.</p>
        <div className="cta-buttons">
          <button className="cta-btn cta-btn-primary">Start Free</button>
          <button className="cta-btn cta-btn-secondary">Talk to Sales</button>
        </div>
      </div>
    </div>
  );

  return user ? <LoggedInLayout>{content}</LoggedInLayout> : <><Navbar />{content}<Footer /></>;
}

export default function Page() {
  return (
    <AuthProvider>
      <PricingContent />
    </AuthProvider>
  );
}
