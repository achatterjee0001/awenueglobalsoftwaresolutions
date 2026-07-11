'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Lightbulb, Compass, Cpu, Send, HeartHandshake, Code, Globe, Cloud, Shield, ShieldCheck, Smartphone, Users, FolderCheck, Award, Briefcase, GraduationCap, Activity, Phone, Mail, MapPin, Calendar, CheckCircle, Clock, ChevronRight, Target, Building
} from 'lucide-react';

export default function ProductsPage() {
  return (
    <div className="page-route-products">
      {/* PRODUCTS HERO */}
  <section className="section products-hero">
    <div className="container content-wrapper">
      <p style={{fontFamily: 'var(--font-heading)', fontSize: '0.8rem', letterSpacing: '0.25em', color: 'var(--text-muted)', textTransform: 'uppercase'}}>Software Suite</p>
      <h1 className="text-gradient-chrome">Core Products</h1>
      <p style={{color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem'}}>
        Engineered for operational precision, cloud integration, and enterprise administration.
      </p>
      
      {/* Filters */}
      <div className="filter-bar">
        <button className="filter-btn active">All Systems</button>
        <button className="filter-btn">Enterprise</button>
        <button className="filter-btn">Verticals</button>
        <button className="filter-btn">AI Models</button>
      </div>
    </div>
  </section>

  {/* PRODUCTS CATALOG GRID */}
  <section className="section" style={{paddingTop: '0'}}>
    <div className="container content-wrapper">
      <div className="products-grid">
        
        {/* AVENUE CRM */}
        <div className="card-premium">
          <div className="product-badge-group">
            <span className="product-sector-badge">Enterprise</span>
            <span className="product-sector-badge">Marketing</span>
          </div>
          <div className="product-mockup-wrapper">
            <div className="product-mockup-inner">
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px'}}>
                <span style={{fontSize: '0.6rem', fontWeight: '600'}}>CRM PIPELINE</span>
                <span style={{fontSize: '0.55rem', color: '#10B981'}}>+$45,280</span>
              </div>
              <div className="mock-row" style={{width: '80%'}}></div>
              <div className="mock-row" style={{width: '50%'}}></div>
              <div style={{display: 'flex', gap: '6px', marginTop: 'auto'}}>
                <div style={{flexGrow: '1', height: '20px', border: '1px dashed var(--border-color)', borderRadius: '4px'}}></div>
                <div style={{flexGrow: '1', height: '20px', border: '1px dashed var(--border-color)', borderRadius: '4px'}}></div>
              </div>
            </div>
          </div>
          <h3 className="card-title">Avenue CRM</h3>
          <p className="card-desc">Advanced lead acquisition matrices, automated custom email drips, and integrated contract signature verification boards.</p>
          <Link href="/product-details" className="btn btn-primary" style={{marginTop: 'auto'}}>Explore Features</Link>
        </div>

        {/* AVENUE ERP */}
        <div className="card-premium" id="erp">
          <div className="product-badge-group">
            <span className="product-sector-badge">Enterprise</span>
            <span className="product-sector-badge">Operations</span>
          </div>
          <div className="product-mockup-wrapper">
            <div className="product-mockup-inner">
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px'}}>
                <span style={{fontSize: '0.6rem', fontWeight: '600'}}>INVENTORY LEDGER</span>
                <span style={{fontSize: '0.55rem', color: 'var(--text-muted)'}}>98% CAP</span>
              </div>
              <div className="mock-row"></div>
              <div className="mock-row" style={{width: '70%'}}></div>
              <div className="mock-row" style={{width: '40%'}}></div>
              <div style={{height: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '4px', marginTop: 'auto', display: 'flex', alignItems: 'center', padding: '2px'}}>
                <div style={{width: '60%', height: '100%', background: 'var(--gradient-chrome)', borderRadius: '2px'}}></div>
              </div>
            </div>
          </div>
          <h3 className="card-title">Avenue ERP</h3>
          <p className="card-desc">Supply ledger automation systems, ledger auditing panels, and localized invoicing compilers for multi-currency companies.</p>
          <Link href="/contact?subject=Request Demo: Avenue ERP" className="btn btn-primary" style={{marginTop: 'auto'}}>Request Demo</Link>
        </div>

        {/* AVENUE HRMS */}
        <div className="card-premium">
          <div className="product-badge-group">
            <span className="product-sector-badge">Enterprise</span>
            <span className="product-sector-badge">HR Logic</span>
          </div>
          <div className="product-mockup-wrapper">
            <div className="product-mockup-inner">
              <span style={{fontSize: '0.6rem', fontWeight: '600', marginBottom: '4px'}}>TEAM ATTENDANCE</span>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <span style={{fontSize: '0.75rem'}}>124 Active</span>
                <span style={{fontSize: '0.6rem', color: '#10B981'}}>0 Alert</span>
              </div>
              <div className="mock-row" style={{marginTop: '8px'}}></div>
              <div className="mock-row" style={{width: '60%'}}></div>
            </div>
          </div>
          <h3 className="card-title">Avenue HRMS</h3>
          <p className="card-desc">Interactive personnel logs, secure check-in modules, salary ledger configurations, and custom review pipelines.</p>
          <Link href="/contact?subject=Request Demo: Avenue HRMS" className="btn btn-primary" style={{marginTop: 'auto'}}>Request Demo</Link>
        </div>

        {/* SCHOOL MANAGEMENT */}
        <div className="card-premium" id="school">
          <div className="product-badge-group">
            <span className="product-sector-badge">Verticals</span>
            <span className="product-sector-badge">Education</span>
          </div>
          <div className="product-mockup-wrapper">
            <div className="product-mockup-inner">
              <span style={{fontSize: '0.6rem', fontWeight: '600', marginBottom: '4px'}}>STUDENT DATABASE</span>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid var(--border-color)', padding: '4px', borderRadius: '4px'}}>
                <span style={{fontSize: '0.6rem'}}>ID: #9902</span>
                <span style={{fontSize: '0.6rem', fontWeight: '600'}}>Grade: A+</span>
              </div>
              <div className="mock-row" style={{marginTop: '4px'}}></div>
            </div>
          </div>
          <h3 className="card-title">Avenue Education</h3>
          <p className="card-desc">Complete university databases, fee compiled invoice trackers, schedules grids, and digital grading systems.</p>
          <Link href="/contact?subject=Request Demo: Avenue Education" className="btn btn-primary" style={{marginTop: 'auto'}}>Request Demo</Link>
        </div>

        {/* HOSPITAL MANAGEMENT */}
        <div className="card-premium" id="hospital">
          <div className="product-badge-group">
            <span className="product-sector-badge">Verticals</span>
            <span className="product-sector-badge">Medical</span>
          </div>
          <div className="product-mockup-wrapper">
            <div className="product-mockup-inner">
              <span style={{fontSize: '0.6rem', fontWeight: '600', marginBottom: '4px'}}>BEDS OCCUPANCY</span>
              <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                <div style={{width: '24px', height: '24px', borderRadius: '50%', border: '2px solid #EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.5rem', color: '#EF4444', fontWeight: '700'}}>82%</div>
                <div style={{fontSize: '0.6rem'}}>High Load Warning</div>
              </div>
              <div className="mock-row" style={{marginTop: '6px'}}></div>
            </div>
          </div>
          <h3 className="card-title">Avenue Healthcare</h3>
          <p className="card-desc">Electronic medical logs, secure consultation queues, resource monitoring systems, and billing dashboards.</p>
          <Link href="/contact?subject=Request Demo: Avenue Healthcare" className="btn btn-primary" style={{marginTop: 'auto'}}>Request Demo</Link>
        </div>

        {/* CUSTOM AI SOLUTIONS */}
        <div className="card-premium" id="analytics">
          <div className="product-badge-group">
            <span className="product-sector-badge">AI Models</span>
            <span className="product-sector-badge">Data Science</span>
          </div>
          <div className="product-mockup-wrapper">
            <div className="product-mockup-inner">
              <span style={{fontSize: '0.6rem', fontWeight: '600', marginBottom: '4px'}}>NEURAL NET RUNNER</span>
              <div style={{height: '35px', border: '1px solid var(--border-color)', borderRadius: '6px', backgroundColor: '#060606', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <span style={{fontFamily: 'monospace', fontSize: '0.65rem', color: '#10B981'}}>Epoch 42/100 | loss: 0.012</span>
              </div>
              <div className="mock-row" style={{marginTop: '4px'}}></div>
            </div>
          </div>
          <h3 className="card-title">AI Solutions</h3>
          <p className="card-desc">Custom integrated predictive networks, parsing algorithms, automated speech engines, and smart decision nodes.</p>
          <Link href="/contact?subject=Request Demo: Avenue AI Solutions" className="btn btn-primary" style={{marginTop: 'auto'}}>Request Demo</Link>
        </div>

      </div>
    </div>
  </section>

  {/* PRODUCT CTA */}
  <section className="section" style={{textAlign: 'center', borderTop: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)'}}>
    <div className="container content-wrapper">
      <h2 className="text-gradient-chrome" style={{marginBottom: 'var(--space-3)'}}>Need Custom Logic?</h2>
      <p style={{color: 'var(--text-secondary)', maxWidth: '550px', margin: '0 auto var(--space-4) auto'}}>
        We construct customized enterprise layouts and databases tailored to your organizational grid. Get in touch to schedule a demo.
      </p>
      <div className="btn-wrapper">
        <Link href="/contact" className="btn btn-primary">Request Consultation</Link>
      </div>
    </div>
  </section>

  {/* FOOTER */}
    </div>
  );
}
