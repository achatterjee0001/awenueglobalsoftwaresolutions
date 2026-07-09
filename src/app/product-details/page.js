'use client';

import React from 'react';
import Link from 'next/link';
import {
  Activity,
  Award,
  Briefcase,
  Building,
  Calendar,
  Check,
  CheckCircle,
  ChevronRight,
  Clock,
  Cloud,
  Code,
  Compass,
  Cpu,
  FolderCheck,
  Globe,
  GraduationCap,
  HeartHandshake,
  Lightbulb,
  Mail,
  MapPin,
  Phone,
  Send,
  Shield,
  ShieldCheck,
  Smartphone,
  Target,
  Users
} from 'lucide-react';

export default function ProductdetailsPage() {
  return (
    <div className="page-route-product-details">
      {/* PRODUCT HERO */}
  <section className="section product-hero">
    <div className="container content-wrapper product-hero-grid">
      <div className="product-hero-info">
        <p style={{fontFamily: 'var(--font-heading)', fontSize: '0.8rem', letterSpacing: '0.2em', color: 'var(--text-muted)', textTransform: 'uppercase'}}>Product Overview</p>
        <h1 className="text-gradient-chrome">Avenue CRM</h1>
        <p style={{color: 'var(--text-secondary)', fontSize: '1.15rem', marginBottom: 'var(--space-3)'}}>
          Scale customer pipelines, track communications, and trigger automated sales workflows with an integrated, luxury system.
        </p>
        <div className="btn-wrapper">
          <Link href="/contact" className="btn btn-primary">Book CRM Walkthrough</Link>
        </div>
      </div>
      
      <div className="service-showcase-visual">
        <div style={{fontSize: '0.75rem', fontFamily: 'var(--font-heading)', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '12px', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between'}}>
          <span>PIPELINE_STATUS</span>
          <span style={{color: '#10B981'}}>ONLINE</span>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.3)', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-color)'}}>
            <span style={{fontSize: '0.8rem', fontWeight: '600'}}>Acquisition Layer</span>
            <span style={{fontSize: '0.75rem', color: 'var(--text-muted)'}}>481 Leads</span>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.3)', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-color)'}}>
            <span style={{fontSize: '0.8rem', fontWeight: '600'}}>Meeting Set</span>
            <span style={{fontSize: '0.75rem', color: 'var(--text-muted)'}}>92 Accounts</span>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.3)', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-color)'}}>
            <span style={{fontSize: '0.8rem', fontWeight: '600'}}>Proposal compilations</span>
            <span style={{fontSize: '0.75rem', color: 'var(--text-muted)'}}>18 Closed</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* DETAIL FEATURES */}
  <section className="section" style={{paddingTop: '0'}}>
    <div className="container content-wrapper">
      
      {/* Feature 1 */}
      <div className="detail-feature-section">
        <div className="detail-feature-grid">
          <div>
            <h2 className="text-gradient-chrome" style={{fontSize: '1.8rem', marginBottom: 'var(--space-2)'}}>Lead Aggregation</h2>
            <p>
              Consolidate input vectors from web contact layers, external API channels, and calendar schedules instantly. Ensure no client conversation slips by using automated alerts and status grids.
            </p>
          </div>
          <div className="service-showcase-visual">
            <span style={{fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px'}}>ACQUISITION_GRAPH</span>
            <div style={{height: '100px', width: '100%', border: '1px dashed var(--border-color)', borderRadius: '8px', display: 'flex', alignItems: 'flex-end', padding: '8px', gap: '8px'}}>
              <div style={{width: '20%', height: '30%', background: 'var(--gradient-titanium)', borderRadius: '2px'}}></div>
              <div style={{width: '20%', height: '50%', background: 'var(--gradient-titanium)', borderRadius: '2px'}}></div>
              <div style={{width: '20%', height: '40%', background: 'var(--gradient-titanium)', borderRadius: '2px'}}></div>
              <div style={{width: '20%', height: '75%', background: 'var(--gradient-chrome)', borderRadius: '2px'}}></div>
              <div style={{width: '20%', height: '90%', background: 'var(--gradient-chrome)', borderRadius: '2px'}}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature 2 */}
      <div className="detail-feature-section">
        <div className="detail-feature-grid" style={{direction: 'rtl'}}>
          <div style={{direction: 'ltr'}}>
            <h2 className="text-gradient-chrome" style={{fontSize: '1.8rem', marginBottom: 'var(--space-2)'}}>Workflow Triggers</h2>
            <p>
              Formulate logic nodes that run when states change. Send verification e-mails, trigger staff check-ins, or compile invoices automatically on client approvals.
            </p>
          </div>
          <div className="service-showcase-visual" style={{direction: 'ltr'}}>
            <span style={{fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginBottom: '8px'}}>LOGIC_BUILDER</span>
            <div style={{display: 'flex', flexDirection: 'column', gap: '6px'}}>
              <p style={{fontSize: '0.8rem', padding: '6px', border: '1px solid var(--border-color)', borderRadius: '4px'}}><b>IF:</b> Lead status changes to "APPROVED"</p>
              <p style={{fontSize: '0.8rem', padding: '6px', border: '1px solid var(--border-color)', borderRadius: '4px', paddingLeft: '16px'}}><b>THEN:</b> Send Proposal document</p>
              <p style={{fontSize: '0.8rem', padding: '6px', border: '1px solid var(--border-color)', borderRadius: '4px', paddingLeft: '16px'}}><b>THEN:</b> Notify Account Manager</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>

  {/* PRICING TIERS */}
  <section className="section" style={{backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)'}}>
    <div className="container content-wrapper">
      <div style={{textAlign: 'center', marginBottom: 'var(--space-4)'}}>
        <h2 className="text-gradient-chrome">Deployment Tiers</h2>
        <p style={{color: 'var(--text-muted)'}}>Choose a configuration that aligns with your scale.</p>
      </div>
      
      <div className="pricing-grid">
        {/* Tier 1 */}
        <div className="pricing-card">
          <h3 style={{fontSize: '1.2rem'}}>Growth</h3>
          <p style={{color: 'var(--text-muted)', fontSize: '0.8rem'}}>For emerging organizations</p>
          <div className="price-value text-gradient-chrome">$490<span style={{fontSize: '1rem', color: 'var(--text-muted)'}}> / mo</span></div>
          <ul className="features-list">
            <li><Check  style={{ width: 24, height: 24, display: 'inline-block' }} /> Up to 5,000 Contacts</li>
            <li><Check  style={{ width: 24, height: 24, display: 'inline-block' }} /> Basic workflow automation</li>
            <li><Check  style={{ width: 24, height: 24, display: 'inline-block' }} /> Standard email campaigns</li>
            <li><Check  style={{ width: 24, height: 24, display: 'inline-block' }} /> 10 Users included</li>
          </ul>
          <button className="btn btn-glass" style={{marginTop: 'auto'}} onclick="location.href='contact.html'">Select Growth</button>
        </div>

        {/* Tier 2 */}
        <div className="pricing-card popular">
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <h3 style={{fontSize: '1.2rem'}}>Enterprise</h3>
            <span style={{fontSize: '0.6rem', border: '1px solid rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '20px'}}>POPULAR</span>
          </div>
          <p style={{color: 'var(--text-muted)', fontSize: '0.8rem'}}>For scale businesses</p>
          <div className="price-value text-gradient-chrome">$1,290<span style={{fontSize: '1rem', color: 'var(--text-muted)'}}> / mo</span></div>
          <ul className="features-list">
            <li><Check  style={{ width: 24, height: 24, display: 'inline-block' }} /> Unlimited Contacts</li>
            <li><Check  style={{ width: 24, height: 24, display: 'inline-block' }} /> Complete workflow building</li>
            <li><Check  style={{ width: 24, height: 24, display: 'inline-block' }} /> Integrated data analytics nodes</li>
            <li><Check  style={{ width: 24, height: 24, display: 'inline-block' }} /> 50 Users included</li>
          </ul>
          <button className="btn btn-primary" style={{marginTop: 'auto'}} onclick="location.href='contact.html'">Deploy Enterprise</button>
        </div>

        {/* Tier 3 */}
        <div className="pricing-card">
          <h3 style={{fontSize: '1.2rem'}}>Custom Dedicated</h3>
          <p style={{color: 'var(--text-muted)', fontSize: '0.8rem'}}>Dedicated node hosting</p>
          <div className="price-value text-gradient-chrome">Custom</div>
          <ul className="features-list">
            <li><Check  style={{ width: 24, height: 24, display: 'inline-block' }} /> On-prem / isolated AWS hosting</li>
            <li><Check  style={{ width: 24, height: 24, display: 'inline-block' }} /> Customized DB integration</li>
            <li><Check  style={{ width: 24, height: 24, display: 'inline-block' }} /> Dedicated support team</li>
            <li><Check  style={{ width: 24, height: 24, display: 'inline-block' }} /> SLA uptime guarantees</li>
          </ul>
          <button className="btn btn-glass" style={{marginTop: 'auto'}} onclick="location.href='contact.html'">Contact Architects</button>
        </div>
      </div>
    </div>
  </section>

  {/* FOOTER */}
    </div>
  );
}
