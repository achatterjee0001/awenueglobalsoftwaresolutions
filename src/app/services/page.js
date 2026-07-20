'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Code, 
  Globe, 
  Smartphone, 
  Layers, 
  Shield, 
  Users, 
  Check, 
  ArrowRight, 
  Sparkles, 
  Cpu, 
  Cloud, 
  Database, 
  ChevronDown, 
  ChevronUp,
  Activity,
  Server,
  Lock,
  Briefcase,
  Search,
  FileCode,
  TrendingUp
} from 'lucide-react';

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState('engineering');
  const [openFaq, setOpenFaq] = useState(null);

  // Initialize scroll animations
  useEffect(() => {
    const { gsap } = require('gsap');
    const { ScrollTrigger } = require('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo('.reveal-service-card', 
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.reveal-services-grid',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const categories = {
    engineering: {
      title: "Software Engineering",
      services: [
        {
          title: "Custom Software Development",
          image: "/assets/service_software_engineering.jpg",
          problem: "Legacy backend monoliths causing operational lags, high server maintenance overhead, and unstable databases under peak load.",
          solution: "Bespoke backend modules, microservices, and database tuning mapped to scale securely with lower CPU execution cycles.",
          technologies: ["Node.js", "Python", "Golang", "PostgreSQL", "MongoDB"],
          deliverables: ["Microservices Architecture Plan", "REST/GraphQL API Documentation", "Database Schema Optimization", "Unit Test Coverage Logs"]
        },
        {
          title: "SaaS Product Engineering",
          image: "/assets/service_saas_product.jpg",
          problem: "Businesses struggling to design and launch stable, multi-tenant workspace platforms with integrated user billing systems.",
          solution: "Multi-tenant SaaS architectures engineered with secure user access levels, automated payment pipelines, and analytics boards.",
          technologies: ["Next.js", "Node.js", "Stripe Billing", "JWT Auth", "Postgres"],
          deliverables: ["Multi-Tenant DB Configuration", "Stripe Checkout Integrations", "User Permissions Logic Matrix", "Analytics Audit Board"]
        },
        {
          title: "Enterprise ERP & CRM systems",
          image: "/assets/service_erp_crm.jpg",
          problem: "Operational friction and data loss from manual billing, disjointed CRM tracking sheets, and manual inventory audits.",
          solution: "Custom resource planning dashboards built to centralize sales pipelines, employee logs, and automatic invoice generations.",
          technologies: ["React", "Express", "REST APIs", "AWS RDS", "Docker"],
          deliverables: ["CRM Sales Pipeline Matrix", "Automated Billing & PDF Dispatch", "Inventory Audit Trackers", "LDAP Admin Auth Setup"]
        }
      ]
    },
    webMobile: {
      title: "Web & Mobile Development",
      services: [
        {
          title: "Next.js Web Engineering",
          image: "/assets/service_web_engineering.jpg",
          problem: "Websites with slow page load times, poor mobile response layouts, and low conversion/retention metrics.",
          solution: "Optimized Next.js templates, static site rendering (SSR), and smooth CSS grids to maximize load speeds and mobile UX.",
          technologies: ["Next.js", "React", "Tailwind CSS", "Vercel", "HTML5/CSS3"],
          deliverables: ["Page-Speed Audit Score Logs", "Custom Responsive Layout Maps", "Modular Component Library", "SEO Metadata Integrations"]
        },
        {
          title: "Mobile App Development",
          image: "/assets/service_mobile_app.jpg",
          problem: "Unresponsive hybrid framework wrappers, missing offline cache architectures, and poor app performance.",
          solution: "Hybrid React Native and native iOS/Android code blocks featuring offline state caches and fluid visual transitions.",
          technologies: ["Flutter", "React Native", "Swift", "Kotlin", "Firebase"],
          deliverables: ["React Native Build Configurations", "SQLite Offline Cache Setup", "App Store Compliance Check", "Push Notification Channels"]
        }
      ]
    },
    design: {
      title: "UI/UX & Branding Design",
      services: [
        {
          title: "UI/UX Architecture & Prototyping",
          image: "/assets/service_uiux_design.jpg",
          problem: "User drop-offs and poor tool adoption caused by complicated task flows and inconsistent page structures.",
          solution: "Detailed Figma user journey frames, interactive click prototypes, and modular system tokens styled for accessibility.",
          technologies: ["Figma", "Adobe CC", "Tailwind Design Tokens"],
          deliverables: ["User Journey Wireframe Boards", "Interactive Click Prototypes", "Developer Design Token Assets", "Accessibility Compliance Reports"]
        },
        {
          title: "Brand Identity Design",
          image: "/assets/service_brand_identity.jpg",
          problem: "Innovative technology companies lacking corporate credibility due to outdated assets and inconsistent brand style guidelines.",
          solution: "Premium typographic scales, vectorized emblems, landing layout wireframes, and corporate identity specifications.",
          technologies: ["Vector Design Toolsets", "Figma", "Typography Sheets"],
          deliverables: ["Vector Logo Master Files", "Corporate Typography Specifications", "Digital Asset Design Guidelines", "Branding Color Palettes"]
        }
      ]
    },
    growth: {
      title: "Business Growth & Consulting",
      services: [
        {
          title: "Cloud Operations & DevOps",
          image: "/assets/service_cloud_devops.jpg",
          problem: "High hosting bills, manual cluster deployments, server downtime, and slow version release schedules.",
          solution: "Containerized deployment automation using Docker and Kubernetes clusters on AWS/Azure to secure high availability.",
          technologies: ["Docker", "Kubernetes", "AWS ECS", "GitHub Actions CI/CD"],
          deliverables: ["CI/CD Deployment Pipelines", "Kubernetes Config Manifests", "AWS Cost Optimization Reports", "Auto-Scale System Triggers"]
        },
        {
          title: "Strategic IT Consulting",
          image: "/assets/service_it_consulting.jpg",
          problem: "Companies lacking a clear roadmap to migrate legacy infrastructures to modern technology stacks.",
          solution: "Full code base security checks, performance analysis logs, database mapping, and phase-by-phase migration plans.",
          technologies: ["Tech Audits", "System Diagrams", "Database Schema Maps"],
          deliverables: ["Legacy System Auditing Reports", "Phased Migration Blueprints", "Database Refactoring Maps", "Risk Mitigation Checklists"]
        }
      ]
    }
  };

  const processSteps = [
    { title: "1. Discovery Call", desc: "Align with your technical stakeholders to map out systems challenges and scope success parameters." },
    { title: "2. Requirement Analysis", desc: "Audit legacy database schemas, dependencies, API models, and data security standards." },
    { title: "3. Scope & Proposal", desc: "Deliver a fixed-milestone architectural specification outlining exact deliverables and timelines." },
    { title: "4. UI/UX Prototyping", desc: "Build interactive Figma prototypes and design components before starting engineering sprint lines." },
    { title: "5. Agile Development", desc: "Write modular code structures backed by automated CI/CD validation checks." },
    { title: "6. QA & Testing", desc: "Execute load stress checks, end-to-end user validations, and automated security scans." },
    { title: "7. Deployment", desc: "Deploy container nodes to AWS/Azure with active monitoring layers." },
    { title: "8. Support SLA", desc: "Establish ongoing patches, performance monitors, database backups, and maintenance logs." }
  ];

  const serviceFaqs = [
    { q: "How do you scope custom software project timelines?", a: "We outline phases using detailed functional specifications. Sprints run in bi-weekly delivery blocks with demo links so your stakeholders track ongoing builds." },
    { q: "Do you supply dedicated engineers?", a: "Yes. Our models assign dedicated backend, frontend, and QA engineers managed directly by an Awenue Project Manager." },
    { q: "What happens after the product is deployed?", a: "We provide dedicated maintenance SLAs that cover server uptime logs, security upgrades, database backups, and monthly reviews." }
  ];

  return (
    <div className="services-page-redesign">
      
      {/* 1. HERO SECTION */}
      <section className="section services-hero" style={{ minHeight: '75vh', paddingTop: '120px', paddingBottom: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="grid-background"></div>
        <div className="container" style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'center', width: '100%' }}>
          <div style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.18)', borderRadius: '9999px', padding: '6px 16px', width: 'fit-content' }}>
              <Sparkles style={{ width: '13px', height: '13px', color: '#2563EB' }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#2563EB', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Professional Capabilities</span>
            </div>
            
            <h1 className="text-gradient-chrome" style={{ fontSize: 'clamp(2.2rem, 7vw, 3.6rem)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-1px' }}>
              Technology Solutions Built Around Your Business Goals.
            </h1>
            
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6, maxWidth: '640px', textAlign: 'center' }}>
              We partner with startup founders and enterprise CTOs to engineer custom software, scalable cloud architectures, high-performance web systems, and design tokens that translate into business growth.
            </p>
 
            <div style={{ display: 'flex', gap: '12px', marginTop: '8px', justifyContent: 'center' }}>
              <Link href="/contact" className="btn btn-primary" style={{ padding: '14px 28px', fontSize: '0.95rem', borderRadius: '12px', background: 'var(--accent-blue)', color: '#FFFFFF', fontWeight: 600 }}>
                Start Your Project
              </Link>
              <a href="#challenges" className="btn btn-glass" style={{ padding: '14px 28px', fontSize: '0.95rem', borderRadius: '12px', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontWeight: 600 }}>
                Explore Solutions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROBLEMS WE SOLVE */}
      <section className="section" id="challenges" style={{ padding: '100px 0', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto var(--space-5) auto' }}>
            <span style={{ fontSize: '0.75rem', color: '#2563EB', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px' }}>Business Barriers</span>
            <h2 className="text-gradient-chrome" style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '8px', marginBottom: '16px' }}>Is your business facing these challenges?</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
              Acknowledge your systems bottleneck cycles. We construct tailored tech solutions to resolve operational roadblocks.
            </p>
          </div>

          <div className="challenge-grid">
            {[
              { t: "Outdated Legacy Code", d: "Old code frameworks causing performance lags, API errors, and high hosting bills." },
              { t: "Manual Working Cycles", d: "Staff members manually entering databases, matching billing reports, and filing forms." },
              { t: "Low Online Conversion", d: "Slow load speeds and poor mobile responsive UI layouts causing visitor drop-offs." },
              { t: "Lack of System Scales", d: "Monolith software breaking under peak user requests and missing container rules." }
            ].map((chall, idx) => (
              <div key={idx} className="challenge-card">
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>{chall.t}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{chall.d}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <p style={{ fontSize: '1.1rem', color: '#2563EB', fontWeight: 600 }}>
              "Awenue maps these systems problems and engineers custom code structures to solve them."
            </p>
          </div>
        </div>
      </section>

      {/* 3. GROUPED SERVICE CATEGORIES & SERVICE CARDS */}
      <section className="section" style={{ padding: '100px 0', background: 'rgba(255,255,255,0.01)', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto var(--space-4) auto' }}>
            <span style={{ fontSize: '0.75rem', color: '#2563EB', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px' }}>Our Services</span>
            <h2 className="text-gradient-chrome" style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '8px', marginBottom: '16px' }}>Grouped Capabilities</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
              Select an engineering division to view corresponding technical scope and deliverables.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="tech-directory-tabs" style={{ marginBottom: '48px' }}>
            {Object.keys(categories).map((key) => (
              <button 
                key={key}
                className={`tech-tab-button ${activeCategory === key ? 'active' : ''}`}
                onClick={() => setActiveCategory(key)}
              >
                {categories[key].title}
              </button>
            ))}
          </div>

          {/* Detailed Cards for Active Category */}
          <div className="reveal-services-grid" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {categories[activeCategory].services.map((service, index) => (
              <div 
                key={index} 
                className="reveal-service-card"
                style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '24px',
                  padding: '40px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
                  gap: '40px',
                  alignItems: 'start',
                  transition: 'var(--transition-smooth)'
                }}
              >
                {/* Left Side: Problem & Solution Alignments */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>{service.title}</h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                      <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: '#EF4444', fontWeight: 700, letterSpacing: '0.5px', display: 'block' }}>Operational Barrier</span>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.5 }}>{service.problem}</p>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: '#10B981', fontWeight: 700, letterSpacing: '0.5px', display: 'block' }}>Our Solution</span>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.5 }}>{service.solution}</p>
                    </div>
                  </div>

                  {/* Technologies Badges */}
                  <div>
                    <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, display: 'block', marginBottom: '8px' }}>Stack Competencies</span>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {service.technologies.map((t, idx) => (
                        <span key={idx} style={{ fontSize: '0.75rem', color: 'var(--text-primary)', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '4px 10px' }}>{t}</span>
                      ))}
                    </div>
                  </div>

                  <Link href="/contact" className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: '10px 22px', fontSize: '0.85rem', background: '#2563EB', color: '#FFF', borderRadius: '10px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '8px' }}>
                    Request Scope Details <ArrowRight style={{ width: '14px', height: '14px' }} />
                  </Link>
                </div>

                {/* Right Side: Service Image + Key Deliverables Checklist */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {/* Service Visual */}
                  {service.image && (
                    <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
                      <img
                        src={service.image}
                        alt={service.title}
                        style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }}
                      />
                    </div>
                  )}
                  {/* Deliverables */}
                  <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '16px', padding: '24px' }}>
                    <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: '#2563EB', fontWeight: 700, letterSpacing: '1px', display: 'block', marginBottom: '14px' }}>Project Deliverables</span>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', padding: 0 }}>
                      {service.deliverables.map((del, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'start', gap: '10px', fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                          <Check style={{ width: '14px', height: '14px', color: '#10B981', marginTop: '2px', strokeWidth: '3px' }} />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DEVELOPMENT PROCESS */}
      <section className="section" style={{ padding: '100px 0', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto var(--space-5) auto' }}>
            <span style={{ fontSize: '0.75rem', color: '#2563EB', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px' }}>Engagement Flow</span>
            <h2 className="text-gradient-chrome" style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '8px', marginBottom: '16px' }}>How We Work Together</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
              What happens after you contact us? A clean, milestone-based timeline outlining our engagement track.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {processSteps.map((step, idx) => (
              <div key={idx} style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '18px', padding: '24px', position: 'relative' }}>
                <span style={{ fontSize: '0.7rem', color: '#2563EB', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Step {idx + 1}</span>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>{step.title.split('. ')[1]}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY AWENUE (DIFFERENTIATORS COMPARISON) */}
      <section className="section" style={{ padding: '100px 0', background: 'rgba(255,255,255,0.01)', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto var(--space-5) auto' }}>
            <span style={{ fontSize: '0.75rem', color: '#2563EB', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px' }}>Why Choose Awenue</span>
            <h2 className="text-gradient-chrome" style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '8px', marginBottom: '16px' }}>Tangible Differentiators</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
              Why startup founders and tech leaders select Awenue over generic freelance contracts.
            </p>
          </div>

          <div className="challenge-grid">
            {[
              { t: "Dedicated PM Support", d: "A single, technically aligned project manager keeping task milestones updated and coordinating all developer logs." },
              { t: "Security-First Coding", d: "We embed security scans directly into CI/CD pipelines to mitigate authentication and SQL leakage cycles." },
              { t: "Agile Sprints Visibility", d: "Demo staging setups deploy automatically at the end of every sprint, offering full development progress tracking." },
              { t: "Long-Term SLA Maintenance", d: "Post-deployment checks, patching configurations, database backups, and hosting reviews mapped clearly." }
            ].map((diff, i) => (
              <div key={i} className="challenge-card" style={{ padding: '28px' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>{diff.t}</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{diff.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FEATURED CASE STUDIES */}
      <section className="section" style={{ padding: '100px 0', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto var(--space-5) auto' }}>
            <span style={{ fontSize: '0.75rem', color: '#2563EB', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px' }}>Proof of Execution</span>
            <h2 className="text-gradient-chrome" style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '8px', marginBottom: '16px' }}>Proven Solutions in Action</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
              Explore how our services solved real operational bottlenecks.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))', gap: '32px' }}>
            {[
              {
                title: "Custom CRM Deployment",
                problem: "Agencies managing client leads manually across Google sheets, leading to 25% follow-up delays.",
                solution: "Integrated a custom CRM dashboard with automated lead routing, calendar notifications, and automatic logs.",
                outcome: "Follow-up delays eliminated; pipeline conversions improved by 18%."
              },
              {
                title: "Next.js E-Commerce Scale",
                problem: "Slow page response layouts and high loading times resulting in high bounce rates and low checkouts.",
                solution: "Migrated infrastructure to a containerized Next.js grid on Vercel utilizing static data regeneration rules.",
                outcome: "Page loading speed improved to 180ms; checkout conversions boosted by 22%."
              }
            ].map((caseStudy, idx) => (
              <div key={idx} style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>{caseStudy.title}</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
                  <p style={{ color: 'var(--text-secondary)' }}><strong style={{ color: '#EF4444' }}>Challenge: </strong>{caseStudy.problem}</p>
                  <p style={{ color: 'var(--text-secondary)' }}><strong style={{ color: '#10B981' }}>Solution: </strong>{caseStudy.solution}</p>
                  <p style={{ color: 'var(--text-primary)', fontWeight: 500 }}><strong style={{ color: '#2563EB' }}>Result: </strong>{caseStudy.outcome}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. INDUSTRIES */}
      <section className="section" style={{ padding: '100px 0', borderTop: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.01)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto var(--space-5) auto' }}>
            <span style={{ fontSize: '0.75rem', color: '#2563EB', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px' }}>Sector Integration</span>
            <h2 className="text-gradient-chrome" style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '8px', marginBottom: '16px' }}>We Build Solutions For</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
              Adapting software structures to match compliance standards and operational paths in specific markets.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            {["Healthcare", "Education", "Manufacturing", "Retail", "Logistics", "Finance", "Real Estate", "Hospitality"].map((ind, i) => (
              <div key={i} style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '20px', textAlign: 'center', fontWeight: 600, color: 'var(--text-primary)' }}>
                {ind}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. SERVICES FAQ SECTION */}
      <section className="section" style={{ padding: '100px 0', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto' }}>
            <span style={{ fontSize: '0.75rem', color: '#2563EB', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px' }}>Scoping Queries</span>
            <h2 className="text-gradient-chrome" style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '8px', marginBottom: '16px' }}>Services FAQ</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
              Common integration questions clarified before starting projects.
            </p>
          </div>

          <div className="faq-accordion-container" style={{ marginTop: '48px' }}>
            {serviceFaqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <button 
                  className="faq-question-button"
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.q}</span>
                  {openFaq === index ? (
                    <ChevronUp style={{ width: '18px', height: '18px', color: '#2563EB' }} />
                  ) : (
                    <ChevronDown style={{ width: '18px', height: '18px', color: 'var(--text-muted)' }} />
                  )}
                </button>
                {openFaq === index && (
                  <div className="faq-answer-wrapper">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. ACTION-ORIENTED FINAL CTA SECTION */}
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
            Let's Build Your Next Digital Solution.
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '580px', margin: '0 auto var(--space-4) auto', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Whether you're launching a startup, modernizing legacy software, or building a scalable SaaS platform, our team is ready to help.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary" style={{ padding: '14px 28px', fontSize: '0.95rem', borderRadius: '12px', background: 'var(--accent-blue)', color: '#FFFFFF', fontWeight: 600 }}>
              Schedule a Free Consultation
            </Link>
            <Link href="/contact" className="btn btn-glass" style={{ padding: '14px 28px', fontSize: '0.95rem', borderRadius: '12px', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontWeight: 600 }}>
              Request a Proposal
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
