'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Phone, 
  Globe, 
  Mail, 
  MapPin 
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        
        {/* Logo and desc */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Link href="/">
            <img src="/assets/logo-dark.png" alt="AWENUE logo" style={{ height: '140px', objectFit: 'contain', marginTop: '-35px', marginLeft: '-15px' }} />
          </Link>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginTop: '-15px' }}>
            Bespoke software structures, high-performance web platforms and digital transformation solutions.
          </p>
          
          {/* Socials */}
          <div className="footer-socials" style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>Services</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', padding: 0, fontSize: '0.88rem' }}>
            <li><Link href="/services#software" className="footer-link">Software Dev</Link></li>
            <li><Link href="/services#web" className="footer-link">Web Engineering</Link></li>
            <li><Link href="/services#mobile" className="footer-link">Mobile Apps</Link></li>
            <li><Link href="/services#cloud" className="footer-link">Cloud Operations</Link></li>
            <li><Link href="/services#consulting" className="footer-link">IT Security</Link></li>
          </ul>
        </div>

        {/* Products */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>Products</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', padding: 0, fontSize: '0.88rem' }}>
            <li><Link href="/product-details" className="footer-link">Awenue CRM</Link></li>
            <li><Link href="/products#hrms" className="footer-link">Awenue HRMS</Link></li>
            <li><Link href="/products#school" className="footer-link">School Manager</Link></li>
            <li><span className="footer-link" style={{ color: 'var(--text-muted)', cursor: 'default' }}>Hospital (Soon)</span></li>
          </ul>
        </div>



        {/* Resources */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>Resources</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', padding: 0, fontSize: '0.88rem' }}>
            <li><Link href="/blog" className="footer-link">Tech Logs</Link></li>
            <li><span className="footer-link" style={{ color: 'var(--text-muted)', cursor: 'default' }}>Careers (Soon)</span></li>
            <li><Link href="/contact" className="footer-link">SLA Support</Link></li>
            <li><Link href="/contact" className="footer-link">Contact Us</Link></li>
          </ul>
        </div>

        {/* Locations & Newsletter */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Office</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Varanasi, Uttar Pradesh, India<br />
              awenueglobalsoftwaresolutions@gmail.com
            </p>
          </div>
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Newsletter</h4>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input 
                type="email" 
                placeholder="Work email" 
                style={{ 
                  background: 'rgba(255,255,255,0.02)', 
                  border: '1px solid var(--border-color)', 
                  borderRadius: '8px', 
                  padding: '8px 12px', 
                  fontSize: '0.8rem', 
                  color: 'var(--text-primary)',
                  width: '100%' 
                }} 
              />
              <button style={{ background: '#2563EB', border: 'none', borderRadius: '8px', padding: '8px 12px', color: '#FFF', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>Go</button>
            </div>
          </div>
        </div>

      </div>
      
      <div className="footer-bottom" style={{ borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '24px' }}>
        <div className="container footer-bottom-flex" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>&copy; 2026 Avenue Global Software Solutions. All Rights Reserved.</p>
          <div className="footer-bottom-links" style={{ display: 'flex', gap: '20px', fontSize: '0.8rem' }}>
            <Link href="/terms#privacy" className="footer-link">Privacy Policy</Link>
            <Link href="/terms#terms" className="footer-link">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
