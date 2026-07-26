'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function HeroSection() {
  const canvasRef = useRef(null);
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Setup images
    const frameCount = 211;
    const currentFrame = index => `/sequence/ezgif-frame-${String(index).padStart(3, '0')}.jpg`;
    const images = [];
    let imagesLoaded = 0;
    
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        imagesLoaded++;
        if (imagesLoaded === 1) render(0); // initial render
      };
      images.push(img);
    }
    
    const obj = { frame: 0 };
    
    const render = (index) => {
      if (images[index] && images[index].complete) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const img = images[index];
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      }
    };
    
    const trigger = ScrollTrigger.create({
      trigger: heroRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      animation: gsap.to(obj, {
        frame: frameCount - 1,
        snap: 'frame',
        ease: 'none',
        onUpdate: () => render(Math.round(obj.frame))
      })
    });
    
    // Fade out content
    gsap.to(contentRef.current, {
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: '30% top',
        scrub: true
      }
    });

    const resize = () => render(Math.round(obj.frame));
    window.addEventListener('resize', resize);
    
    return () => {
      window.removeEventListener('resize', resize);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="hero-wrapper" ref={heroRef} style={{ height: '300vh', position: 'relative' }}>
      <div className="hero-sticky" style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        <canvas className="hero-canvas" ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }} />

        <div className="hero-content" ref={contentRef} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 3, textAlign: 'center', width: '100%', padding: '0 2rem' }}>
          <div className="hero-badge" style={{ color: 'var(--gold)', letterSpacing: '2px', fontSize: '0.9rem', marginBottom: '1rem', fontFamily: 'var(--font-outfit)' }}>✦ THE FUTURE OF ANGEL INVESTING</div>
          <h1 className="hero-title gold-text" style={{ fontSize: '4rem', fontFamily: 'var(--font-outfit)', margin: '0 0 1rem 0' }}>GOLDEN ANGELS</h1>
          <h3 className="hero-subtitle" style={{ fontSize: '1.2rem', letterSpacing: '4px', opacity: 0.9, margin: '0 0 1rem 0', color: 'white' }}>A DIVISION OF GOLDEN ENTERPRISES</h3>
          <p className="hero-slogan" style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.5rem', fontStyle: 'italic', opacity: 0.8, marginBottom: '2rem', color: 'white' }}>"Guarding Vision with Divine Care"</p>
          <div className="hero-actions" style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button className="btn-gold" style={{ padding: '1rem 2rem', fontSize: '1.1rem', cursor: 'pointer', background: 'var(--gold)', color: 'black', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}>Become an Angel</button>
            <button className="btn-outline" style={{ padding: '1rem 2rem', fontSize: '1.1rem', cursor: 'pointer', background: 'transparent', border: '1px solid var(--gold)', color: 'var(--gold)', borderRadius: '4px' }}>Explore Portfolio</button>
          </div>
        </div>
      </div>
    </div>
  );
}
