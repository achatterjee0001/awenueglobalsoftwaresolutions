'use client';

import React from 'react';
import Link from 'next/link';
import ServiceThreeVisual from '../../components/ServiceThreeVisual';
import WebThreeVisual from '../../components/WebThreeVisual';
import {
  Activity,
  Award,
  Box,
  Briefcase,
  Building,
  Calendar,
  CheckCircle,
  CheckCircle2,
  ChevronRight,
  Clock,
  Cloud,
  Code,
  Code2,
  Compass,
  Container,
  Cpu,
  Database,
  FileCode,
  FolderCheck,
  Globe,
  GraduationCap,
  HeartHandshake,
  Layers,
  Layout,
  Lightbulb,
  Lock,
  Mail,
  MapPin,
  Phone,
  Send,
  Server,
  Shield,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Tablet,
  Target,
  Terminal,
  Users
} from 'lucide-react';

export default function ServicesPage() {
  return (
    <div className="page-route-services">
      {/* HERO SECTION */}
  <section className="section services-hero">
    <div className="container content-wrapper">
      <p style={{fontFamily: 'var(--font-heading)', fontSize: '0.8rem', letterSpacing: '0.25em', color: 'var(--text-muted)', textTransform: 'uppercase'}}>Technological Capabilities</p>
      <h1 className="text-gradient-chrome">Enterprise Services</h1>
      <p style={{color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem'}}>
        Delivering performant solutions, digital grid systems, and scalable frameworks for global organizations.
      </p>
    </div>
  </section>

  {/* SERVICE DETAIL 1: SOFTWARE ENGINEERING */}
  <section className="service-detail-section" id="software">
    <div className="container content-wrapper">
      <div className="service-detail-grid">
        <div className="service-detail-content">
          <p style={{fontFamily: 'var(--font-heading)', fontSize: '0.75rem', letterSpacing: '0.15em', color: 'var(--text-muted)'}}>01 / SYSTEM ARCHITECTURE</p>
          <h2 className="text-gradient-chrome" style={{margin: 'var(--space-1) 0 var(--space-2) 0', fontSize: '2rem'}}>Software Development</h2>
          <p>
            We design backend layers, database clusters, and API frameworks configured to process millions of requests smoothly. We prioritize safety, speed, and thread concurrency.
          </p>
          <ul className="service-bullet-list">
            <li><CheckCircle2  style={{ width: 24, height: 24, display: 'inline-block' }} /> Microservice design using Java, Node.js, and Python.</li>
            <li><CheckCircle2  style={{ width: 24, height: 24, display: 'inline-block' }} /> Relational & document database tuning (MongoDB, Postgres).</li>
            <li><CheckCircle2  style={{ width: 24, height: 24, display: 'inline-block' }} /> Optimized enterprise data flow pipelines.</li>
          </ul>
          <div className="tech-stack-badges">
            <span className="tech-badge"><Terminal  style={{ width: 24, height: 24, display: 'inline-block' }} /> Node.js</span>
            <span className="tech-badge"><Database  style={{ width: 24, height: 24, display: 'inline-block' }} /> MongoDB</span>
            <span className="tech-badge"><Code2  style={{ width: 24, height: 24, display: 'inline-block' }} /> Java</span>
            <span className="tech-badge"><Cpu  style={{ width: 24, height: 24, display: 'inline-block' }} /> Python</span>
            <span className="tech-badge"><Server  style={{ width: 24, height: 24, display: 'inline-block' }} /> Express</span>
          </div>
          <Link href="/contact" className="btn btn-primary" style={{marginTop: 'var(--space-3)'}}>Discuss Architecture</Link>
        </div>
        <div className="service-showcase-visual" style={{ padding: '0 !important', overflow: 'hidden' }}>
          <div style={{fontSize: '0.8rem', fontFamily: 'var(--font-heading)', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', paddingLeft: '20px', paddingRight: '20px', paddingTop: '15px', color: 'var(--text-muted)'}}>
            SYSTEMS_CORE_3D
          </div>
          <ServiceThreeVisual />
        </div>
      </div>
    </div>
  </section>

  {/* SERVICE DETAIL 2: WEB DEVELOPMENT */}
  <section className="service-detail-section" id="web">
    <div className="container content-wrapper">
      <div className="service-detail-grid">
        <div className="service-detail-content">
          <p style={{fontFamily: 'var(--font-heading)', fontSize: '0.75rem', letterSpacing: '0.15em', color: 'var(--text-muted)'}}>02 / CORE WEB APPS</p>
          <h2 className="text-gradient-chrome" style={{margin: 'var(--space-1) 0 var(--space-2) 0', fontSize: '2rem'}}>Website Development</h2>
          <p>
            Building interactive modern websites that rank exceptionally and look stunning. We compile clean modular templates that load in milliseconds under heavy visitor load.
          </p>
          <ul className="service-bullet-list">
            <li><CheckCircle2  style={{ width: 24, height: 24, display: 'inline-block' }} /> High performance Next.js and React interfaces.</li>
            <li><CheckCircle2  style={{ width: 24, height: 24, display: 'inline-block' }} /> Fluid luxury layouts with metallic/glass designs.</li>
            <li><CheckCircle2  style={{ width: 24, height: 24, display: 'inline-block' }} /> Complete responsive checks across all layouts.</li>
          </ul>
          <div className="tech-stack-badges">
            <span className="tech-badge"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', marginRight: '4px', verticalAlign: 'middle' }}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="21.17" y1="8" x2="12" y2="8"/><line x1="3.95" y1="6.06" x2="8.54" y2="14"/><line x1="10.88" y1="21.94" x2="15.46" y2="14"/></svg> Next.js</span>
            <span className="tech-badge"><FileCode  style={{ width: 24, height: 24, display: 'inline-block' }} /> React</span>
            <span className="tech-badge"><Layout  style={{ width: 24, height: 24, display: 'inline-block' }} /> HTML5 / CSS3</span>
            <span className="tech-badge"><Sparkles  style={{ width: 24, height: 24, display: 'inline-block' }} /> Tailwind</span>
          </div>
          <Link href="/contact" className="btn btn-primary" style={{marginTop: 'var(--space-3)'}}>Initiate Project</Link>
        </div>
        <div className="service-showcase-visual" style={{ padding: '0 !important', overflow: 'hidden' }}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', paddingLeft: '20px', paddingRight: '20px', paddingTop: '15px'}}>
            <span style={{fontSize: '0.8rem', fontFamily: 'var(--font-heading)', color: 'var(--text-muted)'}}>DOM_PARALLAX_3D</span>
            <span style={{color: '#10B981', fontSize: '0.75rem', fontWeight: '600'}}><span style={{display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981', marginRight: '4px'}}></span> ACTIVE</span>
          </div>
          <WebThreeVisual />
        </div>
      </div>
    </div>
  </section>

  {/* SERVICE DETAIL 3: CLOUD SOLUTIONS */}
  <section className="service-detail-section" id="cloud">
    <div className="container content-wrapper">
      <div className="service-detail-grid">
        <div className="service-detail-content">
          <p style={{fontFamily: 'var(--font-heading)', fontSize: '0.75rem', letterSpacing: '0.15em', color: 'var(--text-muted)'}}>03 / CLOUD OPERATIONS</p>
          <h2 className="text-gradient-chrome" style={{margin: 'var(--space-1) 0 var(--space-2) 0', fontSize: '2rem'}}>Cloud Solutions</h2>
          <p>
            Deploying resilient container network nodes, load balances, and storage grids. We coordinate CI/CD pipelines to ensure database scalability and zero-downtime updates.
          </p>
          <ul className="service-bullet-list">
            <li><CheckCircle2  style={{ width: 24, height: 24, display: 'inline-block' }} /> AWS, Azure, Google Cloud deployments.</li>
            <li><CheckCircle2  style={{ width: 24, height: 24, display: 'inline-block' }} /> Kubernetes cluster orchestration & Docker images.</li>
            <li><CheckCircle2  style={{ width: 24, height: 24, display: 'inline-block' }} /> Failover structures and database replication.</li>
          </ul>
          <div className="tech-stack-badges">
            <span className="tech-badge"><Box  style={{ width: 24, height: 24, display: 'inline-block' }} /> Docker</span>
            <span className="tech-badge"><Container  style={{ width: 24, height: 24, display: 'inline-block' }} /> Kubernetes</span>
            <span className="tech-badge"><Cloud  style={{ width: 24, height: 24, display: 'inline-block' }} /> AWS</span>
            <span className="tech-badge"><Cpu  style={{ width: 24, height: 24, display: 'inline-block' }} /> Azure</span>
          </div>
          <Link href="/contact" className="btn btn-primary" style={{marginTop: 'var(--space-3)'}}>Configure Cloud</Link>
        </div>
        <div className="service-showcase-visual">
          <div style={{fontSize: '0.8rem', fontFamily: 'var(--font-heading)', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '12px', color: 'var(--text-muted)'}}>
            KUBERNETES_CLUSTER
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', background: 'rgba(0,0,0,0.3)', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-color)'}}>
              <span style={{fontSize: '0.8rem'}}>node-us-east-1a</span>
              <span style={{color: '#10B981', fontSize: '0.8rem'}}>ACTIVE</span>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', background: 'rgba(0,0,0,0.3)', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-color)'}}>
              <span style={{fontSize: '0.8rem'}}>node-us-east-1b</span>
              <span style={{color: '#10B981', fontSize: '0.8rem'}}>ACTIVE</span>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', background: 'rgba(0,0,0,0.3)', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-color)'}}>
              <span style={{fontSize: '0.8rem'}}>load-balancer-ingress</span>
              <span style={{color: '#10B981', fontSize: '0.8rem'}}>HEALTHY</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* SERVICE DETAIL 4: MOBILE APP DEVELOPMENT */}
  <section className="service-detail-section" id="mobile">
    <div className="container content-wrapper">
      <div className="service-detail-grid">
        <div className="service-detail-content">
          <p style={{fontFamily: 'var(--font-heading)', fontSize: '0.75rem', letterSpacing: '0.15em', color: 'var(--text-muted)'}}>04 / MOBILE CHANNELS</p>
          <h2 className="text-gradient-chrome" style={{margin: 'var(--space-1) 0 var(--space-2) 0', fontSize: '2rem'}}>Mobile App Development</h2>
          <p>
            Constructing native and hybrid mobile software containing fluid page transitions, offline database caches, and responsive custom component logic.
          </p>
          <ul className="service-bullet-list">
            <li><CheckCircle2  style={{ width: 24, height: 24, display: 'inline-block' }} /> Native iOS apps using Swift & Android using Kotlin.</li>
            <li><CheckCircle2  style={{ width: 24, height: 24, display: 'inline-block' }} /> High performance React Native architectures.</li>
            <li><CheckCircle2  style={{ width: 24, height: 24, display: 'inline-block' }} /> App Store and Play Store deploy setups.</li>
          </ul>
          <div className="tech-stack-badges">
            <span className="tech-badge"><Smartphone  style={{ width: 24, height: 24, display: 'inline-block' }} /> React Native</span>
            <span className="tech-badge"><Tablet  style={{ width: 24, height: 24, display: 'inline-block' }} /> Swift</span>
            <span className="tech-badge"><Layers  style={{ width: 24, height: 24, display: 'inline-block' }} /> Kotlin</span>
            <span className="tech-badge"><Activity  style={{ width: 24, height: 24, display: 'inline-block' }} /> Firebase</span>
          </div>
          <Link href="/contact" className="btn btn-primary" style={{marginTop: 'var(--space-3)'}}>Start Mobile Build</Link>
        </div>
        <div className="service-showcase-visual">
          <div style={{fontSize: '0.8rem', fontFamily: 'var(--font-heading)', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '12px', color: 'var(--text-muted)'}}>
            MOBILE_PREVIEW
          </div>
          <div style={{width: '140px', height: '200px', border: '2px solid var(--border-color)', borderRadius: '20px', margin: '0 auto', padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: '#060606'}}>
            <div style={{width: '40px', height: '4px', backgroundColor: 'var(--border-color)', borderRadius: '2px', margin: '0 auto'}}></div>
            <div style={{flexGrow: '1', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <img src="assets/logo-dark.png" style={{width: '70px'}} alt="emblem" />
            </div>
            <div style={{width: '12px', height: '12px', border: '1.5px solid var(--border-color)', borderRadius: '50%', margin: '0 auto'}}></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* SERVICE DETAIL 5: IT CONSULTING & SECURITY */}
  <section className="service-detail-section" id="consulting">
    <div className="container content-wrapper">
      <div className="service-detail-grid">
        <div className="service-detail-content">
          <p style={{fontFamily: 'var(--font-heading)', fontSize: '0.75rem', letterSpacing: '0.15em', color: 'var(--text-muted)'}}>05 / SECURITY & PLANNING</p>
          <h2 className="text-gradient-chrome" style={{margin: 'var(--space-1) 0 var(--space-2) 0', fontSize: '2rem'}}>IT Consulting & Security</h2>
          <p>
            Securing endpoints, verifying network logic paths, and outlining digital plans to transition business operations safely from legacy setups.
          </p>
          <ul className="service-bullet-list">
            <li><CheckCircle2  style={{ width: 24, height: 24, display: 'inline-block' }} /> Threat mapping, SSL policies, firewall auditing.</li>
            <li><CheckCircle2  style={{ width: 24, height: 24, display: 'inline-block' }} /> Cloud deployment cost estimation reports.</li>
            <li><CheckCircle2  style={{ width: 24, height: 24, display: 'inline-block' }} /> Framework planning for microservice architecture migrations.</li>
          </ul>
          <div className="tech-stack-badges">
            <span className="tech-badge"><Shield  style={{ width: 24, height: 24, display: 'inline-block' }} /> Threat Audits</span>
            <span className="tech-badge"><Lock  style={{ width: 24, height: 24, display: 'inline-block' }} /> Penetration Testing</span>
            <span className="tech-badge"><Activity  style={{ width: 24, height: 24, display: 'inline-block' }} /> TLS 1.3 Standards</span>
          </div>
          <Link href="/contact" className="btn btn-primary" style={{marginTop: 'var(--space-3)'}}>Request Tech Audit</Link>
        </div>
        <div className="service-showcase-visual">
          <div style={{fontSize: '0.8rem', fontFamily: 'var(--font-heading)', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '12px', color: 'var(--text-muted)'}}>
            THREAT_MATRIX
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
            <div style={{width: '70px', height: '70px', borderRadius: '50%', border: '3px solid #10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', color: '#10B981', fontSize: '1.1rem'}}>
              SECURE
            </div>
            <div>
              <p style={{fontSize: '0.85rem', fontWeight: '600'}}>0 Vulnerabilities Detected</p>
              <p style={{color: 'var(--text-muted)', fontSize: '0.75rem'}}>TLS certificate status: valid (expires in 340 days)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* CTA */}
  <section className="section" style={{textAlign: 'center'}}>
    <div className="container content-wrapper">
      <h2 className="text-gradient-chrome" style={{marginBottom: 'var(--space-3)'}}>Ready to Scale Your Systems?</h2>
      <p style={{color: 'var(--text-secondary)', maxWidth: '550px', margin: '0 auto var(--space-4) auto'}}>
        Get in touch with an AWENUE solutions architect to scope your business architecture, database structures, or custom web portals.
      </p>
      <div className="btn-wrapper">
        <Link href="/contact" className="btn btn-primary">Book Consultation Session</Link>
      </div>
    </div>
  </section>

  {/* FOOTER */}
    </div>
  );
}
