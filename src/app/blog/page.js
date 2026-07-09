'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Lightbulb, Compass, Cpu, Send, HeartHandshake, Code, Globe, Cloud, Shield, ShieldCheck, Smartphone, Users, FolderCheck, Award, Briefcase, GraduationCap, Activity, Phone, Mail, MapPin, Calendar, CheckCircle, Clock, ChevronRight, Target, Building
} from 'lucide-react';

export default function BlogPage() {
  return (
    <div className="page-route-blog">
      {/* BLOG HERO */}
  <section className="section blog-hero">
    <div className="container content-wrapper">
      <p style={{fontFamily: 'var(--font-heading)', fontSize: '0.8rem', letterSpacing: '0.25em', color: 'var(--text-muted)', textTransform: 'uppercase'}}>Engineering Records</p>
      <h1 className="text-gradient-chrome">Tech Logs</h1>
      <p style={{color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem'}}>
        Technical logs, systems guides, and updates published by the AWENUE developers.
      </p>
      
      {/* Filters */}
      <div className="filter-bar">
        <button className="filter-btn active">All logs</button>
        <button className="filter-btn">Architecture</button>
        <button className="filter-btn">Next.js</button>
        <button className="filter-btn">Security</button>
      </div>
    </div>
  </section>

  {/* BLOG LISTINGS */}
  <section className="section" style={{paddingTop: '0'}}>
    <div className="container content-wrapper">
      <div className="blog-grid">
        
        {/* Post 1 */}
        <div className="card-premium">
          <div className="blog-meta">
            <span>Architecture</span>
            <span>July 8, 2026</span>
          </div>
          <h3 className="card-title">Designing High-Concurrency API Gateways in Node.js</h3>
          <p className="card-desc">Analyzing cluster thread behaviors, load calculations, and database connection pools to manage millions of active API requests.</p>
          <Link href="/blog-details" className="card-action btn-text">Read Log</Link>
        </div>

        {/* Post 2 */}
        <div className="card-premium">
          <div className="blog-meta">
            <span>Next.js</span>
            <span>June 24, 2026</span>
          </div>
          <h3 className="card-title">Next.js vs Vanilla HTML: Core SEO and Performance audits</h3>
          <p className="card-desc">Analyzing LCP speeds, index structures, and DOM sizes across different templates to establish optimal page ranking positions.</p>
          <Link href="/blog-details" className="card-action btn-text">Read Log</Link>
        </div>

        {/* Post 3 */}
        <div className="card-premium">
          <div className="blog-meta">
            <span>Security</span>
            <span>June 12, 2026</span>
          </div>
          <h3 className="card-title">Securing Docker Cluster Endpoints in Production Environments</h3>
          <p className="card-desc">A deep dive into firewall variables, network policies, TLS verification requirements, and regular cluster health diagnostics.</p>
          <Link href="/blog-details" className="card-action btn-text">Read Log</Link>
        </div>

      </div>
    </div>
  </section>

  {/* FOOTER */}
    </div>
  );
}
