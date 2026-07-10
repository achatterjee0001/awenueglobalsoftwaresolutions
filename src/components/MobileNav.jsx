'use client';

import React from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

export default function MobileNav({ isOpen, onClose }) {
  return (
    <div className={`nav-menu-mobile ${isOpen ? 'open' : ''}`}>
      <div className="mobile-nav-header">
        <img src="/assets/logo-dark.png" alt="AWENUE logo" style={{ height: '36px', objectFit: 'contain' }} />
        <button className="mobile-close-btn" aria-label="Close Navigation" onClick={onClose}>
          <X style={{ width: 18, height: 18 }} />
        </button>
      </div>
      <div className="mobile-nav-links">
        <Link href="/" className="nav-link" onClick={onClose}>HOME</Link>
        <Link href="/services" className="nav-link" onClick={onClose}>SERVICES</Link>
        <Link href="/products" className="nav-link" onClick={onClose}>OUR PRODUCTS</Link>
        <Link href="/about" className="nav-link" onClick={onClose}>ABOUT US</Link>
        <Link href="/contact" className="nav-link" onClick={onClose}>CONTACT US</Link>
        <Link href="/contact" className="btn btn-primary" style={{ marginTop: 'var(--space-4)', textAlign: 'center', borderRadius: '9999px' }} onClick={onClose}>
          GET IN TOUCH
        </Link>
      </div>
    </div>
  );
}
