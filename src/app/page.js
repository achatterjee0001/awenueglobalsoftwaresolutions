'use client';

import React from 'react';
import Link from 'next/link';
import HeroThreeSciFi from '../components/HeroThreeSciFi';
import { 
  Lightbulb, 
  Compass, 
  Cpu, 
  Send, 
  HeartHandshake, 
  Code, 
  Cloud, 
  Shield, 
  Smartphone, 
  Users, 
  FolderCheck, 
  Award 
} from 'lucide-react';

export default function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="section hero-section" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="grid-background"></div>
        <div className="vertical-grid-line"></div>
        
        {/* Fullscreen Interactive 3D Holographic Quantum Core (Three.js) */}
        <HeroThreeSciFi />
        
        <div className="container hero-grid" style={{ position: 'relative', zIndex: 1 }}>
          <div className="hero-content">
            <h1 className="hero-title hero-reveal text-gradient-chrome" style={{ opacity: 0, transform: 'translateY(30px)' }}>
              TECHNOLOGY<br className="desktop-only" /> THAT EMPOWERS<br className="desktop-only" /> BUSINESSES
            </h1>
            <p className="hero-tagline hero-reveal" style={{ opacity: 0, transform: 'translateY(30px)', fontSize: '1.1rem', maxWidth: '500px', color: 'var(--text-secondary)', lineHeight: '1.6', marginTop: 'var(--space-3)' }}>
              We build powerful software solutions that drive innovation, automate processes and accelerate your business growth.
            </p>
            <div className="hero-ctas hero-reveal" style={{ opacity: 0, transform: 'translateY(30px)', marginTop: 'var(--space-4)', display: 'flex' }}>
              <Link href="/services" className="btn btn-glass" style={{ borderRadius: '9999px', padding: '12px 28px', backgroundColor: 'rgba(255, 255, 255, 0.02)', borderColor: 'rgba(255, 255, 255, 0.15)', color: '#FFFFFF' }}>EXPLORE SERVICES &rarr;</Link>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BANNERS */}
      <section className="trust-slider">
        <div className="trust-track">
          <span className="trust-logo">ENTERPRISE</span>
          <span className="trust-logo">STARTUPS</span>
          <span className="trust-logo">GOVERNMENT</span>
          <span className="trust-logo">HEALTHCARE</span>
          <span className="trust-logo">EDUCATION</span>
          {/* Duplicate for looping animation scroll */}
          <span className="trust-logo">ENTERPRISE</span>
          <span className="trust-logo">STARTUPS</span>
          <span className="trust-logo">GOVERNMENT</span>
          <span className="trust-logo">HEALTHCARE</span>
          <span className="trust-logo">EDUCATION</span>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="section" id="services">
        <div className="container content-wrapper">
          <div style={{textAlign: 'center', marginBottom: 'var(--space-5)'}}>
            <div className="section-subtitle-divider">WHAT WE DO</div>
            <h2 className="text-gradient-chrome" style={{marginTop: 'var(--space-1)', fontSize: '2.2rem', letterSpacing: '0.12em'}}>OUR SERVICES</h2>
          </div>
          
          <div className="card-grid" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))'}}>
            <div className="card-premium card-centered">
              <div className="card-icon"><Code style={{ width: 24, height: 24 }} /></div>
              <h3 className="card-title" style={{fontSize: '1.05rem'}}>Software Development</h3>
              <p className="card-desc">Custom software solutions designed to solve real-world problems and drive efficiency.</p>
              <Link href="/services#software" className="card-action btn-text">Learn More</Link>
            </div>
            
            <div className="card-premium card-centered">
              <div className="card-icon"><Cloud style={{ width: 24, height: 24 }} /></div>
              <h3 className="card-title" style={{fontSize: '1.05rem'}}>Cloud Solutions</h3>
              <p className="card-desc">Scalable, secure and reliable cloud solutions to modernize your infrastructure.</p>
              <Link href="/services#cloud" className="card-action btn-text">Learn More</Link>
            </div>
            
            <div className="card-premium card-centered">
              <div className="card-icon"><Shield style={{ width: 24, height: 24 }} /></div>
              <h3 className="card-title" style={{fontSize: '1.05rem'}}>Cybersecurity</h3>
              <p className="card-desc">Advanced security solutions to protect your systems, data and digital assets.</p>
              <Link href="/services#consulting" className="card-action btn-text">Learn More</Link>
            </div>
            
            <div className="card-premium card-centered">
              <div className="card-icon"><Smartphone style={{ width: 24, height: 24 }} /></div>
              <h3 className="card-title" style={{fontSize: '1.05rem'}}>Mobile App Development</h3>
              <p className="card-desc">Building intuitive and high-performance mobile apps for iOS and Android.</p>
              <Link href="/services#mobile" className="card-action btn-text">Learn More</Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US TIMELINE SECTION */}
      <section className="section" style={{backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)'}}>
        <div className="container content-wrapper">
          <div style={{textAlign: 'center', marginBottom: 'var(--space-5)'}}>
            <p className="section-subtitle" style={{fontFamily: 'var(--font-heading)', fontSize: '0.8rem', letterSpacing: '0.2em', color: 'var(--text-muted)', textTransform: 'uppercase'}}>Engineering Philosophy</p>
            <h2 className="text-gradient-chrome" style={{marginTop: 'var(--space-1)'}}>Why Choose Us</h2>
          </div>
          
          <div className="timeline-container">
            <div className="timeline-line"></div>
            <div className="timeline-grid">
              <div className="timeline-node">
                <div className="timeline-dot"><Lightbulb style={{width: '20px', height: '20px'}} /></div>
                <h4 className="timeline-title">Innovation</h4>
                <p className="timeline-desc">Pioneering edge tech solutions rather than legacy frameworks.</p>
              </div>
              <div className="timeline-node">
                <div className="timeline-dot"><Compass style={{width: '20px', height: '20px'}} /></div>
                <h4 className="timeline-title">Strategy</h4>
                <p className="timeline-desc">Thorough client scoping to build exact corporate logic paths.</p>
              </div>
              <div className="timeline-node">
                <div className="timeline-dot"><Cpu style={{width: '20px', height: '20px'}} /></div>
                <h4 className="timeline-title">Engineering</h4>
                <p className="timeline-desc">Clean, optimized codebases supporting concurrent scaling.</p>
              </div>
              <div className="timeline-node">
                <div className="timeline-dot"><Send style={{width: '20px', height: '20px'}} /></div>
                <h4 className="timeline-title">Deployment</h4>
                <p className="timeline-desc">Automated CI/CD validation checks with zero-downtime.</p>
              </div>
              <div className="timeline-node">
                <div className="timeline-dot"><HeartHandshake style={{width: '20px', height: '20px'}} /></div>
                <h4 className="timeline-title">Support</h4>
                <p className="timeline-desc">Continuous monitoring and server updates round-the-clock.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="section" id="products">
        <div className="container content-wrapper">
          <div style={{textAlign: 'center', marginBottom: 'var(--space-5)'}}>
            <div className="section-subtitle-divider">INNOVATIVE SOLUTIONS</div>
            <h2 className="text-gradient-chrome" style={{marginTop: 'var(--space-1)', fontSize: '2.2rem', letterSpacing: '0.12em'}}>OUR PRODUCTS</h2>
          </div>
          
          <div className="card-grid" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))'}}>
            {/* Card 1 */}
            <div className="card-product-horizontal">
              <svg className="product-emblem-svg" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="emblem-chrome-1" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1F252C" />
                    <stop offset="20%" stopColor="#8A95A5" />
                    <stop offset="40%" stopColor="#CFD6DF" />
                    <stop offset="60%" stopColor="#FFFFFF" />
                    <stop offset="80%" stopColor="#8A95A5" />
                    <stop offset="100%" stopColor="#1F252C" />
                  </linearGradient>
                  <linearGradient id="emblem-chrome-2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="30%" stopColor="#D1D7E0" />
                    <stop offset="50%" stopColor="#5C6673" />
                    <stop offset="70%" stopColor="#EBEFF5" />
                    <stop offset="100%" stopColor="#151A21" />
                  </linearGradient>
                </defs>
                <path d="M 32 85 C 32 85 45 42 55 25 C 62 13 70 12 75 22 C 80 32 85 48 85 48 C 85 48 76 68 70 78 C 65 85 58 87 50 82 Z" fill="url(#emblem-chrome-1)" opacity="0.9" />
                <path d="M 22 82 C 12 60 22 30 45 15 C 65 2 82 8 92 25 C 102 42 101 70 85 85 C 75 95 62 98 48 90 C 44 87 48 80 54 82 C 64 85 74 81 81 74 C 91 64 92 42 84 28 C 76 15 63 11 48 21 C 32 32 23 55 30 74 C 32 80 24 84 22 82 Z" fill="url(#emblem-chrome-2)" />
                <path d="M 33 62 C 37 58 48 55 60 57 C 72 59 81 65 85 71 C 88 77 82 81 77 78 C 72 75 66 70 56 68 C 46 66 38 68 35 71 C 31 75 29 66 33 62 Z" fill="url(#emblem-chrome-1)" />
              </svg>
              <div className="product-content">
                <h3 className="product-title">AWENUE CRM</h3>
                <p className="product-desc">A powerful CRM to manage leads, customers and sales pipeline effortlessly.</p>
                <Link href="/product-details" className="product-link btn-text">VIEW PRODUCT</Link>
              </div>
            </div>

            {/* Card 2 */}
            <div className="card-product-horizontal">
              <svg className="product-emblem-svg" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="emblem-chrome-1" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1F252C" />
                    <stop offset="20%" stopColor="#8A95A5" />
                    <stop offset="40%" stopColor="#CFD6DF" />
                    <stop offset="60%" stopColor="#FFFFFF" />
                    <stop offset="80%" stopColor="#8A95A5" />
                    <stop offset="100%" stopColor="#1F252C" />
                  </linearGradient>
                  <linearGradient id="emblem-chrome-2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="30%" stopColor="#D1D7E0" />
                    <stop offset="50%" stopColor="#5C6673" />
                    <stop offset="70%" stopColor="#EBEFF5" />
                    <stop offset="100%" stopColor="#151A21" />
                  </linearGradient>
                </defs>
                <path d="M 32 85 C 32 85 45 42 55 25 C 62 13 70 12 75 22 C 80 32 85 48 85 48 C 85 48 76 68 70 78 C 65 85 58 87 50 82 Z" fill="url(#emblem-chrome-1)" opacity="0.9" />
                <path d="M 22 82 C 12 60 22 30 45 15 C 65 2 82 8 92 25 C 102 42 101 70 85 85 C 75 95 62 98 48 90 C 44 87 48 80 54 82 C 64 85 74 81 81 74 C 91 64 92 42 84 28 C 76 15 63 11 48 21 C 32 32 23 55 30 74 C 32 80 24 84 22 82 Z" fill="url(#emblem-chrome-2)" />
                <path d="M 33 62 C 37 58 48 55 60 57 C 72 59 81 65 85 71 C 88 77 82 81 77 78 C 72 75 66 70 56 68 C 46 66 38 68 35 71 C 31 75 29 66 33 62 Z" fill="url(#emblem-chrome-1)" />
              </svg>
              <div className="product-content">
                <h3 className="product-title">AWENUE ERP</h3>
                <p className="product-desc">An intelligent ERP system to streamline your operations and improve productivity.</p>
                <Link href="/products#erp" className="product-link btn-text">VIEW PRODUCT</Link>
              </div>
            </div>

            {/* Card 3 */}
            <div className="card-product-horizontal">
              <svg className="product-emblem-svg" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="emblem-chrome-1" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1F252C" />
                    <stop offset="20%" stopColor="#8A95A5" />
                    <stop offset="40%" stopColor="#CFD6DF" />
                    <stop offset="60%" stopColor="#FFFFFF" />
                    <stop offset="80%" stopColor="#8A95A5" />
                    <stop offset="100%" stopColor="#1F252C" />
                  </linearGradient>
                  <linearGradient id="emblem-chrome-2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="30%" stopColor="#D1D7E0" />
                    <stop offset="50%" stopColor="#5C6673" />
                    <stop offset="70%" stopColor="#EBEFF5" />
                    <stop offset="100%" stopColor="#151A21" />
                  </linearGradient>
                </defs>
                <path d="M 32 85 C 32 85 45 42 55 25 C 62 13 70 12 75 22 C 80 32 85 48 85 48 C 85 48 76 68 70 78 C 65 85 58 87 50 82 Z" fill="url(#emblem-chrome-1)" opacity="0.9" />
                <path d="M 22 82 C 12 60 22 30 45 15 C 65 2 82 8 92 25 C 102 42 101 70 85 85 C 75 95 62 98 48 90 C 44 87 48 80 54 82 C 64 85 74 81 81 74 C 91 64 92 42 84 28 C 76 15 63 11 48 21 C 32 32 23 55 30 74 C 32 80 24 84 22 82 Z" fill="url(#emblem-chrome-2)" />
                <path d="M 33 62 C 37 58 48 55 60 57 C 72 59 81 65 85 71 C 88 77 82 81 77 78 C 72 75 66 70 56 68 C 46 66 38 68 35 71 C 31 75 29 66 33 62 Z" fill="url(#emblem-chrome-1)" />
              </svg>
              <div className="product-content">
                <h3 className="product-title">AWENUE ANALYTICS</h3>
                <p className="product-desc">Data analytics platform that turns your data into actionable business insights.</p>
                <Link href="/products#analytics" className="product-link btn-text">VIEW PRODUCT</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT US SPLIT SECTION */}
      <section className="section" style={{backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)'}} id="about">
        <div className="container content-wrapper about-split-layout">
          {/* Left side copy */}
          <div className="about-text-content">
            <div className="section-subtitle-left">ABOUT US</div>
            <h2 className="text-gradient-chrome" style={{fontSize: '2.2rem', letterSpacing: '0.12em', lineHeight: '1.2', margin: 'var(--space-1) 0 var(--space-2) 0'}}>
              DRIVEN BY INNOVATION<br className="desktop-only" /> FOCUSED ON IMPACT
            </h2>
            <p style={{fontSize: '0.95rem', lineHeight: '1.8', marginBottom: 'var(--space-3)', color: 'var(--text-secondary)'}}>
              Avenue Global Software Solutions is a technology company passionate about delivering innovative, reliable and scalable software solutions. We partner with businesses to turn ideas into impactful digital experiences.
            </p>
            <Link href="/about" className="btn btn-primary">READ MORE ABOUT US &rarr;</Link>
          </div>
          
          {/* Right side metrics */}
          <div className="about-stats-container">
            {/* Stat 1 */}
            <div className="about-stat-box">
              <Users className="stat-icon" />
              <span className="stat-num text-gradient-chrome">50+</span>
              <span className="stat-lbl">Happy Clients</span>
            </div>
            {/* Stat 2 */}
            <div className="about-stat-box">
              <FolderCheck className="stat-icon" />
              <span className="stat-num text-gradient-chrome">120+</span>
              <span className="stat-lbl">Projects Delivered</span>
            </div>
            {/* Stat 3 */}
            <div className="about-stat-box">
              <Award className="stat-icon" />
              <span className="stat-num text-gradient-chrome">10+</span>
              <span className="stat-lbl">Years of Experience</span>
            </div>
            {/* Stat 4 */}
            <div className="about-stat-box">
              <Users className="stat-icon" />
              <span className="stat-num text-gradient-chrome">25+</span>
              <span className="stat-lbl">Expert Team</span>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION BOTTOM */}
      <section className="section" style={{textAlign: 'center', padding: 'var(--space-8) 0'}}>
        <div className="container content-wrapper">
          <h2 className="text-gradient-chrome" style={{fontSize: '3rem', marginBottom: 'var(--space-3)', lineHeight: '1.2'}}>
            Let's Build Something<br className="desktop-only" /> Extraordinary
          </h2>
          <p style={{color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto var(--space-4) auto', fontSize: '1.1rem'}}>
            Partner with AWENUE to map your enterprise systems, deploy scalable web structures, and lead your digital transformation cycle.
          </p>
          <div className="btn-wrapper">
            <Link href="/contact" className="btn btn-primary" style={{fontSize: '1.1rem', padding: '18px 48px'}}>Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
