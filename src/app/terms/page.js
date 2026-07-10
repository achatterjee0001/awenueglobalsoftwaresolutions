'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import { 
  ShieldCheck, 
  Lock, 
  FileText, 
  Mail, 
  Check, 
  Clock, 
  Sparkles,
  LifeBuoy
} from 'lucide-react';

export default function TermsPage() {
  const [activeTab, setActiveTab] = useState('terms');

  // Monitor URL hash to switch tabs automatically
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && ['terms', 'security', 'privacy', 'reliability', 'compliance', 'contact'].includes(hash)) {
        setActiveTab(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Run on mount

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const selectTab = (tab) => {
    setActiveTab(tab);
    window.history.pushState(null, '', `#${tab}`);
  };

  return (
    <div className="terms-trust-page" style={{ paddingTop: '140px', paddingBottom: '100px' }}>
      <div className="container">
        
        {/* Breadcrumb */}
        <Breadcrumb customLabels={{ terms: 'Terms & Trust Center' }} />

        {/* Hero Section */}
        <div style={{ marginBottom: '48px', borderBottom: '1px solid var(--border-color)', paddingBottom: '32px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.18)', borderRadius: '9999px', padding: '6px 16px', width: 'fit-content', marginBottom: '16px' }}>
            <ShieldCheck style={{ width: '13px', height: '13px', color: '#2563EB' }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#2563EB', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Terms of Service & Trust Center</span>
          </div>
          <h1 className="text-gradient-chrome" style={{ fontSize: '3rem', fontWeight: 800, lineHeight: 1.2, marginBottom: '8px' }}>Legal & Security Directory</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '600px' }}>
            Access all Awenue Global Software Solutions corporate policies, SLA compliance matrices, and security protocols in one place.
          </p>
        </div>

        {/* Split Layout: Tabs Sidebar & Content */}
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '48px', alignItems: 'start' }}>
          
          {/* Tabs Sidebar */}
          <aside style={{ position: 'sticky', top: '120px', background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '20px' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '16px' }}>Policy Categories</span>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { id: 'terms', label: '1. General Terms' },
                { id: 'security', label: '2. Security Practices' },
                { id: 'privacy', label: '3. Privacy & Cookies' },
                { id: 'reliability', label: '4. Service SLAs' },
                { id: 'compliance', label: '5. Compliance & AI' },
                { id: 'contact', label: '6. Legal Contacts' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => selectTab(tab.id)}
                  style={{
                    background: activeTab === tab.id ? 'rgba(37,99,235,0.08)' : 'none',
                    border: activeTab === tab.id ? '1px solid rgba(37,99,235,0.18)' : '1px solid transparent',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    fontSize: '0.8rem',
                    color: activeTab === tab.id ? '#2563EB' : 'var(--text-secondary)',
                    fontWeight: activeTab === tab.id ? 700 : 500,
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'var(--transition-fast)'
                  }}
                  className="hover-link"
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </aside>

          {/* Active Tab Content Area */}
          <article style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '40px' }}>
            
            {activeTab === 'terms' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <div>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>SECTION 1.0</span>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>Terms & Conditions</h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginTop: '8px' }}>
                    [Placeholder] By utilizing Awenue's digital layouts or requesting custom database designs, you consent to these parameters. All software solutions deliverables remain Awenue assets until billing reconciliations are finalized.
                  </p>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Acceptable Use Limits</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginTop: '4px' }}>
                    [Placeholder] You may not scan or load test database shards without explicit security approvals. All query rate limits are set to safeguard microservices performance.
                  </p>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Refund & Deposit Rules</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginTop: '4px' }}>
                    [Placeholder] Consultation deposit files and custom coding sprints are non-refundable after staging compilation starts. SLA offsets are credited under active service agreements.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <div>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>SECTION 2.0</span>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>Security Practices & Policies</h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginTop: '8px' }}>
                    [Placeholder] We isolate patient data and payment databases behind VPC gateways. All transaction fields are encrypted with AES-256 keys, and SSL socket logs are audited weekly.
                  </p>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Incident Response Times</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginTop: '4px' }}>
                    [Placeholder] Severity 1 vulnerabilities trigger page team escalations within 30 minutes, outputting public post-mortem logs within 24 hours.
                  </p>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Vulnerability Management</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginTop: '4px' }}>
                    [Placeholder] Dynamic package audits scanner routines execute weekly. We provide safe harbor provisions for responsible security disclosures.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <div>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>SECTION 3.0</span>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>Privacy & Data Processing</h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginTop: '8px' }}>
                    [Placeholder] We process user accounts data fields solely to coordinate database transactions and system configurations. Custom DPA contracts are signed for multi-tenant SaaS clients.
                  </p>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Cookie Consent Rules</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginTop: '4px' }}>
                    [Placeholder] Analytics tracking caches are set to off by default. Users toggle cookie retention parameters inside their dashboard profiles.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'reliability' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <div>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>SECTION 4.0</span>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>Service SLAs & Backup</h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginTop: '8px' }}>
                    [Placeholder] We target 99.9% database availability metrics. Backups replicate dynamically to secondary cloud zones every 6 hours with a 2-hour target recovery window.
                  </p>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Scheduled Maintenance</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginTop: '4px' }}>
                    [Placeholder] System upgrades execute during Sunday low-traffic frames. Users receive notifications 5 business days before migrations begin.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'compliance' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <div>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>SECTION 5.0</span>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>Compliance & AI Policies</h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginTop: '8px' }}>
                    [Placeholder] We align layouts code with WCAG 2.1 AA screen-reader checklists. Model training inputs do not index tenant database files or transactions registers.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <div>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>SECTION 6.0</span>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>Legal Contacts</h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginTop: '8px' }}>
                    [Placeholder] For legal notices, GPG key logs or SAR details requests, connect directly with our compliance desks:
                  </p>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Email Address</span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>awenueglobalsoftwaresolutions@gmail.com</span>
                  </div>
                  <a href="mailto:awenueglobalsoftwaresolutions@gmail.com" className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '8px', fontSize: '0.85rem', background: '#2563EB', color: '#FFF', textDecoration: 'none', fontWeight: 600 }}>
                    Email Legal Team
                  </a>
                </div>
              </div>
            )}

          </article>
        </div>

      </div>
    </div>
  );
}
