'use client';

import React from 'react';
import Link from 'next/link';

export default function MobileNav({ isOpen, onClose }) {
  return (
    <div className={`nav-menu-mobile ${isOpen ? 'active' : ''}`}>
      <div className="mobile-nav-header">
        <img src="/assets/logo-dark.png" alt="AWENUE logo" style={{ height: '40px' }} />
        <button className="mobile-close-btn" aria-label="Close Navigation" onClick={onClose}>
          &times;
        </button>
      </div>
      <div className="mobile-nav-links">
        <Link href="/" className="mobile-nav-link" onClick={onClose}>HOME</Link>
        <Link href="/services" className="mobile-nav-link" onClick={onClose}>SERVICES</Link>
        <Link href="/products" className="mobile-nav-link" onClick={onClose}>OUR PRODUCTS</Link>
        <Link href="/about" className="mobile-nav-link" onClick={onClose}>ABOUT US</Link>
        <Link href="/blog" className="mobile-nav-link" onClick={onClose}>BLOG</Link>
        <Link href="/contact" className="mobile-nav-link" onClick={onClose}>CONTACT US</Link>
        <Link href="/contact" className="btn btn-primary" style={{ marginTop: 'var(--space-4)', textAlign: 'center' }} onClick={onClose}>
          GET IN TOUCH
        </Link>
      </div>
    </div>
  );
}
