'use client';

import React from 'react';
import Link from 'next/link';
import {
  Activity,
  Award,
  Briefcase,
  Building,
  Calendar,
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
  Layers,
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

export default function AboutPage() {
  return (
    <div className="page-route-about">
      {/* ABOUT HERO */}
  <section className="section about-hero">
    <div className="container content-wrapper">
      <p style={{fontFamily: 'var(--font-heading)', fontSize: '0.8rem', letterSpacing: '0.25em', color: 'var(--text-muted)', textTransform: 'uppercase'}}>Corporate Profile</p>
      <h1 className="text-gradient-chrome">Our Philosophy</h1>
      <p style={{color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem'}}>
        Building secure software structures and scalable database grids for global enterprise systems.
      </p>
    </div>
  </section>

  {/* ABOUT BODY SPLIT */}
  <section className="section" style={{paddingTop: '0'}}>
    <div className="container content-wrapper">
      <div className="about-split">
        <div>
          <h2 className="text-gradient-chrome" style={{fontSize: '2rem', marginBottom: 'var(--space-2)'}}>Our Story</h2>
          <p style={{marginBottom: 'var(--space-2)'}}>
            AWENUE was founded by a team of systems architects and cloud software developers with a simple target: to replace fragile standard templates with highly resilient, premium, and custom-engineered software layers.
          </p>
          <p>
            Operating across global markets, we support large firms, growing startups, and medical and educational organizations. We craft custom logic, compile clean structures, and audit security layers to scale business procedures safely.
          </p>
        </div>
        <div className="service-showcase-visual">
          <div style={{fontSize: '0.8rem', fontFamily: 'var(--font-heading)', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '12px', color: 'var(--text-muted)'}}>
            CORE_VALUES
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
            <p style={{fontSize: '0.9rem'}}><b>Mission:</b> Constructing secure technological baselines to automate administrative overhead.</p>
            <p style={{fontSize: '0.9rem'}}><b>Vision:</b> Seamless microservice networks with zero downtime and total user privacy.</p>
          </div>
        </div>
      </div>
      
      {/* Pillars */}
      <div className="about-pillars">
        <div className="pillar-card">
          <div className="pillar-icon"><Shield  style={{ width: 24, height: 24, display: 'inline-block' }} /></div>
          <h3 style={{fontSize: '1rem', marginBottom: '6px'}}>Security First</h3>
          <p style={{fontSize: '0.85rem', color: 'var(--text-muted)'}}>Enforcing strict TLS, clean schema validation layers, and firewall configurations.</p>
        </div>
        
        <div className="pillar-card">
          <div className="pillar-icon"><Activity  style={{ width: 24, height: 24, display: 'inline-block' }} /></div>
          <h3 style={{fontSize: '1rem', marginBottom: '6px'}}>Scale Performance</h3>
          <p style={{fontSize: '0.85rem', color: 'var(--text-muted)'}}>Constructing clusters that balance workloads seamlessly on elastic networks.</p>
        </div>
        
        <div className="pillar-card">
          <div className="pillar-icon"><Layers  style={{ width: 24, height: 24, display: 'inline-block' }} /></div>
          <h3 style={{fontSize: '1rem', marginBottom: '6px'}}>Clean Codebases</h3>
          <p style={{fontSize: '0.85rem', color: 'var(--text-muted)'}}>Writing structured modules, maintaining docs, and ensuring quick compilation rates.</p>
        </div>
      </div>
    </div>
  </section>

  {/* CTA */}
  <section className="section" style={{textAlign: 'center', borderTop: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)'}}>
    <div className="container content-wrapper">
      <h2 className="text-gradient-chrome" style={{marginBottom: 'var(--space-3)'}}>Let's Build Something Extraordinary</h2>
      <p style={{color: 'var(--text-secondary)', maxWidth: '550px', margin: '0 auto var(--space-4) auto'}}>
        Get in touch with an AWENUE representative to request custom case studies or arrange a consultation session.
      </p>
      <div className="btn-wrapper">
        <Link href="/contact" className="btn btn-primary" style={{fontSize: '1.1rem', padding: '18px 48px'}}>Get In Touch</Link>
      </div>
    </div>
  </section>

  {/* FOOTER */}
    </div>
  );
}
