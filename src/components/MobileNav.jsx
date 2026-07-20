'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Linkedin, 
  Twitter, 
  Instagram, 
  Facebook, 
  ChevronRight,
  Code,
  Briefcase,
  Users,
  Mail,
  Info,
  Phone,
  LayoutGrid
} from 'lucide-react';

export default function MobileNav({ isOpen, onClose }) {
  const pathname = usePathname();

  return (
    <div className={`nav-menu-mobile ${isOpen ? 'open' : ''}`}>
      
      {/* Scrollable Container */}
      <div className="mobile-menu-scroll-wrapper" style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '80px 24px 40px 24px',
        overflowY: 'auto',
        position: 'relative',
        zIndex: 5
      }}>
        
        {/* Overlay Logo */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
          <img
            src="/assets/logo-dark.png"
            alt="AWENUE"
            style={{ height: '36px', objectFit: 'contain', opacity: 0.92 }}
          />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '36px', width: '100%' }}>
          
          {/* A. MAIN SECTIONS CATEGORY */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '0.65rem', color: '#2563EB', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '8px', display: 'block' }}>Directory</span>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <Link 
                href="/" 
                className={`mobile-menu-nav-link ${pathname === '/' ? 'active' : ''}`}
                onClick={onClose}
                style={navLinkStyle(pathname === '/')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className="dot" style={dotStyle(pathname === '/')}></span>
                  <span>Home</span>
                </div>
                <ChevronRight style={{ width: '16px', height: '16px', opacity: 0.4 }} />
              </Link>
              
              <Link 
                href="/services" 
                className={`mobile-menu-nav-link ${pathname === '/services' ? 'active' : ''}`}
                onClick={onClose}
                style={navLinkStyle(pathname === '/services')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className="dot" style={dotStyle(pathname === '/services')}></span>
                  <span>Services</span>
                </div>
                <ChevronRight style={{ width: '16px', height: '16px', opacity: 0.4 }} />
              </Link>

              <Link 
                href="/about" 
                className={`mobile-menu-nav-link ${pathname === '/about' ? 'active' : ''}`}
                onClick={onClose}
                style={navLinkStyle(pathname === '/about')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className="dot" style={dotStyle(pathname === '/about')}></span>
                  <span>About Us</span>
                </div>
                <ChevronRight style={{ width: '16px', height: '16px', opacity: 0.4 }} />
              </Link>



              <Link 
                href="/contact" 
                className={`mobile-menu-nav-link ${pathname === '/contact' ? 'active' : ''}`}
                onClick={onClose}
                style={navLinkStyle(pathname === '/contact')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className="dot" style={dotStyle(pathname === '/contact')}></span>
                  <span>Contact</span>
                </div>
                <ChevronRight style={{ width: '16px', height: '16px', opacity: 0.4 }} />
              </Link>
            </div>
          </div>

          {/* B. CORE PRODUCTS PORTFOLIO */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ fontSize: '0.65rem', color: '#2563EB', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', display: 'block' }}>Enterprise Products</span>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
              {[
                { title: 'Awenue CRM', desc: 'Acquisition & pipeline system.', path: '/product-details', icon: <Users style={{ width: '14px', height: '14px', color: '#2563EB' }} /> },
                { title: 'Awenue ERP', desc: 'Invoicing & ledger compilers.', path: '/products#erp', icon: <Code style={{ width: '14px', height: '14px', color: '#2563EB' }} /> },
                { title: 'Awenue HRMS', desc: 'Workforce & personnel logs.', path: '/products#hrms', icon: <Briefcase style={{ width: '14px', height: '14px', color: '#2563EB' }} /> },
                { title: 'Awenue Education', desc: 'LMS databases & grade portal.', path: '/products#school', icon: <LayoutGrid style={{ width: '14px', height: '14px', color: '#2563EB' }} /> }
              ].map((prod, index) => (
                <Link 
                  key={index}
                  href={prod.path}
                  onClick={onClose}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 10px',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.04)',
                    textDecoration: 'none',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '7px',
                    background: 'rgba(37,99,235,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {prod.icon}
                  </div>
                  <div>
                    <h5 style={{ fontSize: '0.78rem', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>{prod.title}</h5>
                    <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', margin: '1px 0 0 0' }}>{prod.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* C. BOTTOM CTAS AND SOCIAL FOOTER */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', marginTop: '32px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '24px' }}>
          
          <Link href="/contact" className="btn btn-primary" onClick={onClose} style={{
            width: '100%',
            textAlign: 'center',
            padding: '12px',
            fontSize: '0.85rem',
            fontWeight: 600,
            borderRadius: '12px',
            background: '#2563EB',
            color: '#FFFFFF',
            display: 'block'
          }}>
            GET FREE CONSULTATION
          </Link>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>awenueglobalsoftwaresolutions@gmail.com</span>
            
            <div className="mobile-nav-socials" style={{ display: 'flex', gap: '10px' }}>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="LinkedIn">
                <Linkedin style={{ width: 16, height: 16 }} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="Twitter">
                <Twitter style={{ width: 16, height: 16 }} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="Facebook">
                <Facebook style={{ width: 16, height: 16 }} />
              </a>
            </div>
          </div>

        </div>
        
      </div>
    </div>
  );
}

// Inline Helper Styles
const navLinkStyle = (isActive) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '9px 12px',
  borderRadius: '10px',
  background: isActive ? 'rgba(255, 255, 255, 0.03)' : 'transparent',
  color: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.65)',
  fontSize: '0.92rem',
  fontWeight: isActive ? 700 : 500,
  textDecoration: 'none',
  border: isActive ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid transparent',
  transition: 'all 0.25s'
});

const dotStyle = (isActive) => ({
  width: '6px',
  height: '6px',
  borderRadius: '50%',
  background: isActive ? '#2563EB' : 'transparent',
  display: 'inline-block',
  transition: 'background-color 0.25s'
});
