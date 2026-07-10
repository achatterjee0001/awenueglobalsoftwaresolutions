'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Shield, 
  Layers, 
  Check, 
  ArrowRight, 
  Sparkles, 
  ChevronRight,
  TrendingUp,
  Activity,
  HeartHandshake,
  Users,
  Building,
  Target,
  Clock,
  Compass,
  FileCode,
  Globe,
  Cpu
} from 'lucide-react';

export default function AboutPage() {
  const [activeTechTab, setActiveTechTab] = useState('frontend');

  const values = [
    {
      title: "Innovation First",
      desc: "We continuously explore better tech stacks, database schemas, and microservice architectures to solve real business bottlenecks."
    },
    {
      title: "Radical Transparency",
      desc: "Clear, bi-weekly sprint demo links, direct developer communication lines, and open codebase access metrics."
    },
    {
      title: "Product Ownership",
      desc: "Every custom CRM, LMS, or SaaS portal is engineered as if it were our own proprietary business product."
    },
    {
      title: "Long-Term Partnership",
      desc: "We build systems to scale over years, mapping ongoing patches, backups, and security monitoring into dedicated support SLAs."
    }
  ];

  const timelineEvents = [
    { year: "2025", title: "Awenue Founded", desc: "A team of database engineers and frontend developers established Awenue in Varanasi, India, to build custom software that scales safely." },
    { year: "2025", title: "First Enterprise Release", desc: "Launched a centralized student portal for an educational system with multiple campuses, reducing manual accounting errors by 40%." },
    { year: "2026", title: "SaaS Product Expansion", desc: "Released core CRM, HRMS, and portal frames, deploying modular architectures for startup founders internationally." },
    { year: "Future", title: "Global Scaling Roadmap", desc: "Expanding our developer squads, optimizing containerization tools, and integrating AI processing engines across business applications." }
  ];

  const techDirectory = {
    frontend: ['React.js', 'Next.js', 'Vue.js', 'Tailwind CSS', 'TypeScript'],
    backend: ['Node.js', 'Django/FastAPI', 'Go', 'PHP Laravel', '.NET Core'],
    mobile: ['Flutter', 'React Native', 'Swift (iOS)', 'Kotlin (Android)'],
    cloud: ['Amazon Web Services', 'Azure GCP', 'Docker Containers', 'Kubernetes Clusters']
  };

  return (
    <div className="about-page-redesign">
      
      {/* 1. HERO SECTION */}
      <section className="section about-hero" style={{ minHeight: '65vh', paddingTop: '160px', paddingBottom: '64px', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="grid-background"></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '40px', alignItems: 'center' }}>
            
            {/* Left Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.18)', borderRadius: '9999px', padding: '6px 16px', width: 'fit-content' }}>
                <Building style={{ width: '13px', height: '13px', color: '#2563EB' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#2563EB', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Corporate Profile</span>
              </div>
              
              <h1 className="text-gradient-chrome" style={{ fontSize: '3.6rem', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-1px' }}>
                Building Technology That Drives Business Transformation.
              </h1>
              
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>
                At Awenue Global Software Solutions, we believe technology should simplify operations, unlock growth, and create meaningful digital experiences. Every solution we build is guided by strategy, innovation, and long-term partnership.
              </p>

              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <Link href="/contact" className="btn btn-primary" style={{ padding: '14px 28px', fontSize: '0.95rem', borderRadius: '12px', background: 'var(--accent-blue)', color: '#FFFFFF', fontWeight: 600 }}>
                  Schedule a Consultation
                </Link>
                <Link href="/services" className="btn btn-glass" style={{ padding: '14px 28px', fontSize: '0.95rem', borderRadius: '12px', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontWeight: 600 }}>
                  Explore Our Services
                </Link>
              </div>
            </div>

            {/* Right Visual (CSS layout representing software architecture planning) */}
            <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '32px', height: '360px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: 'var(--text-muted)' }}>SYSTEM_STRATEGY_MAP // AWENUE</div>
              
              {/* Architecture Nodes visual block */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', zIndex: 2 }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.04)' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2563EB' }}></div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>1. Business Plan Routing</span>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.04)' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }}></div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>2. User UI UX Prototypes</span>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.04)' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#F59E0B' }}></div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>3. Scalable Database Nodes</span>
                </div>
              </div>

              {/* Progress Line */}
              <div style={{ height: '3px', width: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: '3px' }}>
                <div style={{ height: '100%', width: '75%', background: '#2563EB', borderRadius: '3px' }}></div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* 2. OUR STORY */}
      <section className="section" style={{ padding: '100px 0', borderTop: '1px solid var(--border-color)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: '#2563EB', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px' }}>Our History</span>
            <h2 className="text-gradient-chrome" style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '8px', marginBottom: '16px' }}>The Spark Behind Awenue</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '16px' }}>
              We founded Awenue after witnessing a recurring challenge in the technology industry: businesses getting caught in cycles of buying generic WordPress/Theme templates or hiring low-cost freelancers, only for systems to buckle under load, fail security tests, or require expensive refactoring.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7 }}>
              Our founding team of systems developers wanted to build something different: a company that prioritizes solid, custom-engineered code bases, clean microservices, and outcome-focused user designs. The name <strong>Awenue</strong> represents the digital road we map to transition businesses to secure, scalable futures.
            </p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '32px' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>Engineering Standards</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
              Every line of code compiled by our squad must satisfy performance checks, schema validations, and unit test requirements.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', padding: 0 }}>
              {["Modular code structures", "Documented REST API models", "Zero-downtime container hosting", "TLS 1.3 encryption configurations"].map((rule, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                  <Check style={{ width: '13px', height: '13px', color: '#2563EB', strokeWidth: '3px' }} />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 3. PURPOSE BEFORE MISSION */}
      <section className="section" style={{ padding: '100px 0', background: 'rgba(255,255,255,0.01)', borderTop: '1px solid var(--border-color)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
          
          {/* Why We Exist */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span style={{ fontSize: '0.7rem', color: '#2563EB', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>01 / Our Purpose</span>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)' }}>Why We Exist</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              We exist to help businesses embrace technology with confidence by creating software that solves real operational challenges rather than adding unnecessary complexity.
            </p>
          </div>

          {/* Our Mission */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span style={{ fontSize: '0.7rem', color: '#2563EB', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>02 / Our Mission</span>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)' }}>The Mission</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Helping businesses transform through scalable software architectures, thoughtful user design systems, and strategic technology partnerships.
            </p>
          </div>

          {/* Our Vision */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span style={{ fontSize: '0.7rem', color: '#2563EB', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>03 / Our Vision</span>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)' }}>The Vision</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Creating a future where organizations of every size have access to enterprise-grade digital solutions that ensure database safety and absolute user privacy.
            </p>
          </div>

        </div>
      </section>

      {/* 4. CORE VALUES */}
      <section className="section" style={{ padding: '100px 0', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto var(--space-5) auto' }}>
            <span style={{ fontSize: '0.75rem', color: '#2563EB', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px' }}>Core Beliefs</span>
            <h2 className="text-gradient-chrome" style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '8px', marginBottom: '16px' }}>Our Core Values</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
              These operational principles guide our code decisions, client calls, and roadmap plans.
            </p>
          </div>

          <div className="challenge-grid">
            {values.map((v, i) => (
              <div key={i} className="challenge-card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>{v.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. VISUAL TIMELINE */}
      <section className="section" style={{ padding: '100px 0', background: 'rgba(255,255,255,0.01)', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto var(--space-5) auto' }}>
            <span style={{ fontSize: '0.75rem', color: '#2563EB', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px' }}>Our Journey</span>
            <h2 className="text-gradient-chrome" style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '8px', marginBottom: '16px' }}>Visual Timeline</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
              A roadmap showing Awenue's founder foundation and product milestones.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', position: 'relative' }}>
            {timelineEvents.map((ev, idx) => (
              <div key={idx} style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '18px', padding: '24px', position: 'relative' }}>
                <span style={{ fontSize: '1.75rem', fontWeight: 800, color: '#2563EB', display: 'block', marginBottom: '8px' }}>{ev.year}</span>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>{ev.title}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{ev.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHAT MAKES AWENUE DIFFERENT (COMPARISON) */}
      <section className="section" style={{ padding: '100px 0', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto var(--space-5) auto' }}>
            <span style={{ fontSize: '0.75rem', color: '#2563EB', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px' }}>Contrast Matrix</span>
            <h2 className="text-gradient-chrome" style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '8px', marginBottom: '16px' }}>What Makes Awenue Different?</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
              Compare how we structure tech partnerships compared to standard development shops.
            </p>
          </div>

          <div className="comparison-table-wrapper">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th className="comparison-th">Strategy Metric</th>
                  <th className="comparison-th" style={{ color: 'var(--text-muted)' }}>Traditional Development</th>
                  <th className="comparison-th" style={{ color: '#2563EB' }}>Awenue Systems</th>
                </tr>
              </thead>
              <tbody>
                <tr className="comparison-tr">
                  <td className="comparison-td" style={{ fontWeight: 600 }}>Scoping Alignment</td>
                  <td className="comparison-td">Build only what is listed, without analyzing workflow dependencies.</td>
                  <td className="comparison-td" style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Analyze corporate workflow friction points before drafting code scripts.</td>
                </tr>
                <tr className="comparison-tr">
                  <td className="comparison-td" style={{ fontWeight: 600 }}>Operational Duration</td>
                  <td className="comparison-td">Deliver code packages, leaving database maintenance to local teams.</td>
                  <td className="comparison-td" style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Long-term SLA contracts covering automated monitoring layers.</td>
                </tr>
                <tr className="comparison-tr">
                  <td className="comparison-td" style={{ fontWeight: 600 }}>Tool Selection</td>
                  <td className="comparison-td">WordPress / Shopify templates with custom styling additions.</td>
                  <td className="comparison-td" style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Bespoke frameworks built using performant engines (Next.js, Node).</td>
                </tr>
                <tr className="comparison-tr">
                  <td className="comparison-td" style={{ fontWeight: 600 }}>Communications</td>
                  <td className="comparison-td">Monthly emails, minimal code staging previews.</td>
                  <td className="comparison-td" style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Staging URL updates, direct channels, transparent sprint reviews.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 7. DEVELOPMENT PHILOSOPHY */}
      <section className="section" style={{ padding: '100px 0', background: 'rgba(255,255,255,0.01)', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto var(--space-5) auto' }}>
            <span style={{ fontSize: '0.75rem', color: '#2563EB', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px' }}>Engineering Loop</span>
            <h2 className="text-gradient-chrome" style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '8px', marginBottom: '16px' }}>Our Development Philosophy</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
              A disciplined cycle ensures database reliability and secure API pipelines.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
            {[
              { num: "01", t: "Understand Business", d: "We map out your sales cycles, admin overhead procedures, and user retention barriers first." },
              { num: "02", t: "Research & Feasibility", d: "feasibility analysis on API connections, schema designs, and data transfer volumes." },
              { num: "03", t: "Design Systems UI", d: "Figma wireframe prototypes structured around ease of user task completion." },
              { num: "04", t: "Modular Development", d: "Code lines compiled following microservices specifications, unit tests, and security guidelines." },
              { num: "05", t: "QA Stress Verification", d: "Automated load tests and security scans run to check database latency thresholds." },
              { num: "06", t: "Dedicated SLA Support", d: "Active container monitoring, patch releases, and system optimization audits." }
            ].map((phil, idx) => (
              <div key={idx} style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '18px', padding: '24px' }}>
                <span style={{ fontSize: '0.7rem', color: '#2563EB', fontWeight: 700, display: 'block', marginBottom: '6px' }}>{phil.num}</span>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>{phil.t}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{phil.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. TECHNOLOGIES DIRECTORY */}
      <section className="section" style={{ padding: '100px 0', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto var(--space-4) auto' }}>
            <span style={{ fontSize: '0.75rem', color: '#2563EB', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px' }}>Competence Directory</span>
            <h2 className="text-gradient-chrome" style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '8px', marginBottom: '16px' }}>Competence Map</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
              Select a division tab to view corresponding technology stack tools.
            </p>
          </div>

          <div className="tech-directory-tabs">
            {Object.keys(techDirectory).map((tab) => (
              <button 
                key={tab}
                className={`tech-tab-button ${activeTechTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTechTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="tech-directory-grid">
            {techDirectory[activeTechTab].map((techName, idx) => (
              <div key={idx} className="tech-directory-item">
                {techName}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. GLOBAL VISION & CULTURE */}
      <section className="section" style={{ padding: '100px 0', background: 'rgba(255,255,255,0.01)', borderTop: '1px solid var(--border-color)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px' }}>
          
          {/* Global Vision */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span style={{ fontSize: '0.75rem', color: '#2563EB', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px' }}>International Standards</span>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>Global Vision</h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              Our team operates across geographical boundaries, compiling digital products using international engineering policies. We construct systems designed to scale with cross-border workflows and follow remote collaboration paradigms to keep project tracking updates centralized.
            </p>
          </div>

          {/* Culture */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span style={{ fontSize: '0.75rem', color: '#2563EB', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px' }}>Human Element</span>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>Corporate Culture</h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              We encourage continuous learning, shared database code audits, and regular system design sessions. By fostering an atmosphere centered on clean coding, logical structures, and proactive problem solving, our engineers deliver modules built with care.
            </p>
          </div>

        </div>
      </section>

      {/* 10. ACTION-ORIENTED FINAL CTA SECTION */}
      <section className="section cta-section" style={{ padding: '120px 0', textAlign: 'center', position: 'relative', overflow: 'hidden', borderTop: '1px solid var(--border-color)' }}>
        <div 
          style={{ 
            position: 'absolute',
            width: '60%',
            height: '60%',
            top: '20%',
            left: '20%',
            background: 'radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, rgba(37, 99, 235, 0) 60%)',
            filter: 'blur(50px)',
            pointerEvents: 'none',
            zIndex: 1
          }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <h2 className="text-gradient-chrome cta-title" style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '16px', lineHeight: 1.25 }}>
            Let's Build the Future of Your Business Together.
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '580px', margin: '0 auto var(--space-4) auto', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Whether you're launching a startup, modernizing enterprise systems, or creating your next SaaS product, we're ready to become your technology partner.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary" style={{ padding: '14px 28px', fontSize: '0.95rem', borderRadius: '12px', background: 'var(--accent-blue)', color: '#FFFFFF', fontWeight: 600 }}>
              Schedule a Consultation
            </Link>
            <Link href="/services" className="btn btn-glass" style={{ padding: '14px 28px', fontSize: '0.95rem', borderRadius: '12px', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontWeight: 600 }}>
              Explore Our Services
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
