'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Code, 
  Globe, 
  Cloud, 
  Smartphone, 
  ShieldCheck, 
  Palette, 
  Users, 
  Briefcase, 
  GraduationCap, 
  Activity,
  ChevronDown
} from 'lucide-react';

export default function Header({ onMobileMenuToggle, isOpen }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header-nav ${scrolled ? 'scrolled' : ''} ${isOpen ? 'menu-open' : ''}`}>
      <div className="container nav-container">
        <Link href="/" className="brand-logo-container">
          <img src="/assets/logo-dark.png" alt="AWENUE logo" className="brand-logo-img" />
        </Link>
        
        <nav className="nav-menu-desktop">
          <div className="nav-item">
            <Link href="/" className="nav-link">Home</Link>
          </div>
          <div className="nav-item">
            <Link href="/services" className="nav-link">Services</Link>
            {/* MEGA MENU SERVICES */}
            <div className="mega-menu-wrapper">
              <div className="mega-menu-column">
                <span className="mega-menu-title">Digital Solutions</span>
                <Link href="/services#software" className="mega-menu-item">
                  <Code className="mega-menu-icon" />
                  <div className="mega-menu-info">
                    <h4>Software Engineering</h4>
                    <p>Scalable, bespoke backend systems & microservices.</p>
                  </div>
                </Link>
                <Link href="/services#web" className="mega-menu-item">
                  <Globe className="mega-menu-icon" />
                  <div className="mega-menu-info">
                    <h4>Web Engineering</h4>
                    <p>Next.js interfaces optimized for indexing.</p>
                  </div>
                </Link>
              </div>
              <div className="mega-menu-column">
                <span className="mega-menu-title">Enterprise Infrastructure</span>
                <Link href="/services#cloud" className="mega-menu-item">
                  <Cloud className="mega-menu-icon" />
                  <div className="mega-menu-info">
                    <h4>Cloud Architectures</h4>
                    <p>Dockerized cluster deployments on AWS/Azure.</p>
                  </div>
                </Link>
                <Link href="/services#mobile" className="mega-menu-item">
                  <Smartphone className="mega-menu-icon" />
                  <div className="mega-menu-info">
                    <h4>Mobile Development</h4>
                    <p>Native Swift/Kotlin & React Native app builds.</p>
                  </div>
                </Link>
              </div>
              <div className="mega-menu-column">
                <span className="mega-menu-title">Security & consulting</span>
                <Link href="/services#consulting" className="mega-menu-item">
                  <ShieldCheck className="mega-menu-icon" />
                  <div className="mega-menu-info">
                    <h4>Cybersecurity & Consulting</h4>
                    <p>Security architectures & legacy audits.</p>
                  </div>
                </Link>
                <Link href="/design-system" className="mega-menu-item">
                  <Palette className="mega-menu-icon" />
                  <div className="mega-menu-info">
                    <h4>UI Kit & Design System</h4>
                    <p>View brand tokens, Figma details, assets.</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="nav-item">
            <Link href="/products" className="nav-link">Products</Link>
            {/* MEGA MENU PRODUCTS */}
            <div className="mega-menu-wrapper" style={{ width: '600px' }}>
              <div className="mega-menu-column">
                <span className="mega-menu-title">Enterprise Suite</span>
                <Link href="/product-details" className="mega-menu-item">
                  <Users className="mega-menu-icon" />
                  <div className="mega-menu-info">
                    <h4>Avenue CRM</h4>
                    <p>Automate workflows and drive pipeline conversions.</p>
                  </div>
                </Link>
                <Link href="/products#erp" className="mega-menu-item">
                  <Briefcase className="mega-menu-icon" />
                  <div className="mega-menu-info">
                    <h4>Avenue ERP</h4>
                    <p>Resource tracking, financials, inventory modules.</p>
                  </div>
                </Link>
              </div>
              <div className="mega-menu-column">
                <span className="mega-menu-title">Specialized Verticals</span>
                <Link href="/products#school" className="mega-menu-item">
                  <GraduationCap className="mega-menu-icon" />
                  <div className="mega-menu-info">
                    <h4>Avenue Education</h4>
                    <p>School/University management systems.</p>
                  </div>
                </Link>
                <Link href="/products#hospital" className="mega-menu-item">
                  <Activity className="mega-menu-icon" />
                  <div className="mega-menu-info">
                    <h4>Avenue Healthcare</h4>
                    <p>Hospital records & automated scheduling systems.</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div className="nav-item">
            <Link href="/about" className="nav-link">About</Link>
          </div>
          <div className="nav-item">
            <Link href="/blog" className="nav-link">Resources</Link>
          </div>
          <div className="nav-item">
            <Link href="/contact" className="nav-link">Contact</Link>
          </div>
        </nav>
        
        <div className="btn-wrapper">
          <Link href="/contact" className="nav-cta">Get Free Consultation</Link>
        </div>
        
        {/* Mobile Burger Trigger */}
        <button className={`menu-btn ${isOpen ? 'open' : ''}`} aria-label="Toggle Navigation" onClick={onMobileMenuToggle}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
