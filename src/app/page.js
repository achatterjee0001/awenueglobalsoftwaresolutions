'use client';

import React from 'react';
import Link from 'next/link';
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
      <section className="section hero-section" style={{ position: 'relative' }}>
        <div className="grid-background"></div>
        <div className="vertical-grid-line"></div>
        <div className="container hero-grid">
          <div className="hero-content">
            <h1 className="hero-title hero-reveal text-gradient-chrome" style={{ opacity: 0, transform: 'translateY(30px)', fontSize: '5rem', lineHeight: '1.05', fontWeight: '700', letterSpacing: '0.04em' }}>
              TECHNOLOGY<br />THAT EMPOWERS<br />BUSINESSES
            </h1>
            <p className="hero-tagline hero-reveal" style={{ opacity: 0, transform: 'translateY(30px)', fontSize: '1.1rem', maxWidth: '500px', color: 'var(--text-secondary)', lineHeight: '1.6', marginTop: 'var(--space-3)' }}>
              We build powerful software solutions that drive innovation, automate processes and accelerate your business growth.
            </p>
            <div className="hero-ctas hero-reveal" style={{ opacity: 0, transform: 'translateY(30px)', marginTop: 'var(--space-4)', display: 'flex' }}>
              <Link href="/services" className="btn btn-glass" style={{ borderRadius: '9999px', padding: '12px 28px', backgroundColor: 'rgba(255, 255, 255, 0.02)', borderColor: 'rgba(255, 255, 255, 0.15)', color: '#FFFFFF' }}>EXPLORE SERVICES &rarr;</Link>
            </div>
          </div>
          
          {/* Right Side: Dotted World Map & Circuit Traces */}
          <div className="hero-parallax hero-reveal" style={{ opacity: 0, transform: 'scale(0.95)', position: 'relative', height: '100%', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 500 400" width="100%" height="100%" style={{ opacity: 0.9 }}>
              {/* Stylized Dotted World Map */}
              <g fill="#FFFFFF" opacity="0.08" transform="scale(1.15) translate(20, 20)">
                {/* North America / South America dots */}
                <circle cx="40" cy="60" r="1.5"/><circle cx="50" cy="50" r="1.5"/><circle cx="60" cy="70" r="1.5"/>
                <circle cx="70" cy="80" r="1.5"/><circle cx="80" cy="110" r="1.5"/><circle cx="90" cy="130" r="1.5"/>
                <circle cx="100" cy="140" r="1.5"/><circle cx="110" cy="150" r="1.5"/><circle cx="120" cy="170" r="1.5"/>
                {/* Africa */}
                <circle cx="190" cy="120" r="1.5"/><circle cx="200" cy="130" r="1.5"/><circle cx="210" cy="150" r="1.5"/>
                <circle cx="220" cy="160" r="1.5"/><circle cx="230" cy="180" r="1.5"/>
                {/* Europe / Russia / Asia */}
                <circle cx="180" cy="50" r="1.5"/><circle cx="190" cy="60" r="1.5"/><circle cx="210" cy="40" r="1.5"/>
                <circle cx="230" cy="50" r="1.5"/><circle cx="250" cy="60" r="1.5"/><circle cx="270" cy="55" r="1.5"/>
                <circle cx="290" cy="70" r="1.5"/><circle cx="310" cy="65" r="1.5"/><circle cx="330" cy="80" r="1.5"/>
                <circle cx="350" cy="90" r="1.5"/><circle cx="370" cy="100" r="1.5"/><circle cx="390" cy="95" r="1.5"/>
                {/* India / South East Asia */}
                <circle cx="270" cy="100" r="1.5"/><circle cx="280" cy="110" r="1.5"/><circle cx="290" cy="120" r="1.5"/>
                <circle cx="310" cy="130" r="1.5"/><circle cx="330" cy="140" r="1.5"/>
                {/* Australia */}
                <circle cx="360" cy="180" r="1.5"/><circle cx="370" cy="190" r="1.5"/><circle cx="380" cy="200" r="1.5"/>
              </g>
              
              {/* Circuit Board Traces */}
              <g fill="none" strokeLinecap="round">
                {/* Background Static Traces */}
                <path d="M 0 100 L 150 100 L 220 170 L 380 170 L 410 140 L 500 140" stroke="#2B2B2B" strokeWidth="1.5"/>
                <path d="M 80 320 L 180 320 L 230 270 L 390 270 L 420 300 L 500 300" stroke="#2B2B2B" strokeWidth="1.5"/>
                <path d="M 280 0 L 280 120 L 310 150 L 310 240 L 350 280 L 350 400" stroke="#2B2B2B" strokeWidth="1.5"/>
                
                {/* Active White Flows */}
                <path d="M 0 100 L 150 100 L 220 170 L 380 170" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.3" strokeDasharray="10 10" className="dash-flow"/>
                <path d="M 280 120 L 310 150 L 310 240" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.25" strokeDasharray="10 10" className="dash-flow"/>
              </g>
              
              {/* Glowing Node Dots */}
              <g fill="#FFFFFF" className="glow-dots">
                <circle cx="150" cy="100" r="3"/>
                <circle cx="220" cy="170" r="4" className="pulsing-node"/>
                <circle cx="380" cy="170" r="3"/>
                <circle cx="230" cy="270" r="3"/>
                <circle cx="310" cy="150" r="4.5" className="pulsing-node"/>
              </g>
            </svg>
          </div>
        </div>
      </section>

  {/* TRUST BANNERS */}
  <section className="trust-slider">
    <div className="trust-track">
      <span className="trust-logo">{/* Leftover Lucide Icon building */} ENTERPRISE</span>
      <span className="trust-logo">{/* Leftover Lucide Icon rocket */} STARTUPS</span>
      <span className="trust-logo">{/* Leftover Lucide Icon landmark */} GOVERNMENT</span>
      <span className="trust-logo">{/* Leftover Lucide Icon activity */} HEALTHCARE</span>
      <span className="trust-logo">{/* Leftover Lucide Icon graduation-cap */} EDUCATION</span>
      {/* Duplicate for looping animation scroll */}
      <span className="trust-logo">{/* Leftover Lucide Icon building */} ENTERPRISE</span>
      <span className="trust-logo">{/* Leftover Lucide Icon rocket */} STARTUPS</span>
      <span className="trust-logo">{/* Leftover Lucide Icon landmark */} GOVERNMENT</span>
      <span className="trust-logo">{/* Leftover Lucide Icon activity */} HEALTHCARE</span>
      <span className="trust-logo">{/* Leftover Lucide Icon graduation-cap */} EDUCATION</span>
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
          <div className="card-icon"><Code className="card-icon-lucide" style={{ width: 24, height: 24 }} /></div>
          <h3 className="card-title" style={{fontSize: '1.05rem'}}>Software Development</h3>
          <p className="card-desc">Custom software solutions designed to solve real-world problems and drive efficiency.</p>
          <a href="services.html#software" className="card-action btn-text">Learn More</a>
        </div>
        
        <div className="card-premium card-centered">
          <div className="card-icon"><Cloud className="card-icon-lucide" style={{ width: 24, height: 24 }} /></div>
          <h3 className="card-title" style={{fontSize: '1.05rem'}}>Cloud Solutions</h3>
          <p className="card-desc">Scalable, secure and reliable cloud solutions to modernize your infrastructure.</p>
          <a href="services.html#cloud" className="card-action btn-text">Learn More</a>
        </div>
        
        <div className="card-premium card-centered">
          <div className="card-icon"><Shield className="card-icon-lucide" style={{ width: 24, height: 24 }} /></div>
          <h3 className="card-title" style={{fontSize: '1.05rem'}}>Cybersecurity</h3>
          <p className="card-desc">Advanced security solutions to protect your systems, data and digital assets.</p>
          <a href="services.html#consulting" className="card-action btn-text">Learn More</a>
        </div>
        
        <div className="card-premium card-centered">
          <div className="card-icon"><Smartphone className="card-icon-lucide" style={{ width: 24, height: 24 }} /></div>
          <h3 className="card-title" style={{fontSize: '1.05rem'}}>Mobile App Development</h3>
          <p className="card-desc">Building intuitive and high-performance mobile apps for iOS and Android.</p>
          <a href="services.html#mobile" className="card-action btn-text">Learn More</a>
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
            <div className="timeline-dot"><i data-lucide="lightbulb" style={{width: '20px', height: '20px'}}></i></div>
            <h4 className="timeline-title">Innovation</h4>
            <p className="timeline-desc">Pioneering edge tech solutions rather than legacy frameworks.</p>
          </div>
          <div className="timeline-node">
            <div className="timeline-dot"><i data-lucide="compass" style={{width: '20px', height: '20px'}}></i></div>
            <h4 className="timeline-title">Strategy</h4>
            <p className="timeline-desc">Thorough client scoping to build exact corporate logic paths.</p>
          </div>
          <div className="timeline-node">
            <div className="timeline-dot"><i data-lucide="cpu" style={{width: '20px', height: '20px'}}></i></div>
            <h4 className="timeline-title">Engineering</h4>
            <p className="timeline-desc">Clean, optimized codebases supporting concurrent scaling.</p>
          </div>
          <div className="timeline-node">
            <div className="timeline-dot"><i data-lucide="send" style={{width: '20px', height: '20px'}}></i></div>
            <h4 className="timeline-title">Deployment</h4>
            <p className="timeline-desc">Automated CI/CD validation checks with zero-downtime.</p>
          </div>
          <div className="timeline-node">
            <div className="timeline-dot"><i data-lucide="heart-handshake" style={{width: '20px', height: '20px'}}></i></div>
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
      
      <div className="card-grid" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))'}}>
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
            <a href="product-details.html" className="product-link btn-text">VIEW PRODUCT</a>
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
            <a href="products.html#erp" className="product-link btn-text">VIEW PRODUCT</a>
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
            <a href="products.html#analytics" className="product-link btn-text">VIEW PRODUCT</a>
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
          DRIVEN BY INNOVATION<br />FOCUSED ON IMPACT
        </h2>
        <p style={{fontSize: '0.95rem', lineHeight: '1.8', marginBottom: 'var(--space-3)', color: 'var(--text-secondary)'}}>
          Avenue Global Software Solutions is a technology company passionate about delivering innovative, reliable and scalable software solutions. We partner with businesses to turn ideas into impactful digital experiences.
        </p>
        <a href="about.html" className="btn btn-primary">READ MORE ABOUT US &rarr;</a>
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
        Let's Build Something<br />Extraordinary
      </h2>
      <p style={{color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto var(--space-4) auto', fontSize: '1.1rem'}}>
        Partner with AWENUE to map your enterprise systems, deploy scalable web structures, and lead your digital transformation cycle.
      </p>
      <div className="btn-wrapper">
        <a href="contact.html" className="btn btn-primary" style={{fontSize: '1.1rem', padding: '18px 48px'}}>Contact Us</a>
      </div>
    </div>
  </section>
    </>
  );
}
