'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Linkedin, Twitter, Instagram, Facebook } from 'lucide-react';

export default function MobileNav({ isOpen, onClose }) {
  const pathname = usePathname();

  return (
    <div className={`nav-menu-mobile ${isOpen ? 'open' : ''}`}>
      <div className="mobile-nav-links">
        <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`} onClick={onClose}>HOME</Link>
        <Link href="/services" className={`nav-link ${pathname === '/services' ? 'active' : ''}`} onClick={onClose}>SERVICES</Link>
        <Link href="/products" className={`nav-link ${pathname === '/products' ? 'active' : ''}`} onClick={onClose}>OUR PRODUCTS</Link>
        <Link href="/about" className={`nav-link ${pathname === '/about' ? 'active' : ''}`} onClick={onClose}>ABOUT US</Link>
        <Link href="/contact" className={`nav-link ${pathname === '/contact' ? 'active' : ''}`} onClick={onClose}>CONTACT US</Link>
      </div>
      
      <Link href="/contact" className="nav-cta mobile-menu-cta" onClick={onClose}>
        GET FREE CONSULTATION
      </Link>
      
      {/* Mobile menu bottom social links */}
      <div className="mobile-nav-socials">
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="LinkedIn">
          <Linkedin style={{ width: 18, height: 18 }} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="Twitter">
          <Twitter style={{ width: 18, height: 18 }} />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="Instagram">
          <Instagram style={{ width: 18, height: 18 }} />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="Facebook">
          <Facebook style={{ width: 18, height: 18 }} />
        </a>
      </div>
    </div>
  );
}
