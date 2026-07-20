'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import DashboardMockup from '../components/DashboardMockup';
import ProcessTimeline from '../components/ProcessTimeline';
import { 
  Code, 
  Globe, 
  Smartphone, 
  Layers, 
  Shield, 
  Users, 
  Award, 
  Check, 
  ArrowRight, 
  Sparkles, 
  Cpu, 
  Cloud, 
  Database, 
  ChevronDown, 
  ChevronUp,
  Activity,
  Terminal,
  Server,
  Lock,
  Building,
  HeartHandshake
} from 'lucide-react';

const rotatingWords = [
  "Digital Vision",
  "Web Development",
  "Mobile Apps",
  "AI Automation",
  "Business Growth"
];

const backgroundSlides = [
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop"
];


export default function Home() {
  const [activeTechTab, setActiveTechTab] = useState('frontend');
  const [openFaq, setOpenFaq] = useState(null);
  const [rotatingWordIndex, setRotatingWordIndex] = useState(0);
  const [activeBgIndex, setActiveBgIndex] = useState(0);

  // Initialize scroll animations using GSAP on client mount and rotate words
  useEffect(() => {
    const wordInterval = setInterval(() => {
      setRotatingWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);

    const bgInterval = setInterval(() => {
      setActiveBgIndex((prev) => (prev + 1) % 17);
    }, 6000);

    const { gsap } = require('gsap');
    const { ScrollTrigger } = require('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    // Stagger reveal of section cards
    gsap.fromTo('.reveal-card', 
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.reveal-card-trigger',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );

    // Stagger reveal of services
    gsap.fromTo('.reveal-service', 
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.reveal-services-trigger',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );

    // Stagger reveal of products
    gsap.fromTo('.reveal-product', 
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.reveal-products-trigger',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );

    return () => {
      clearInterval(wordInterval);
      clearInterval(bgInterval);
    };
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const techDirectory = {
    frontend: ['React', 'Next.js', 'Vue.js', 'Angular', 'Tailwind CSS', 'TypeScript'],
    backend: ['Node.js', 'Python (Django/FastAPI)', 'Java (Spring Boot)', 'Go', 'PHP (Laravel)', '.NET Core'],
    mobile: ['Flutter', 'React Native', 'Swift (iOS)', 'Kotlin (Android)'],
    cloud: ['Amazon Web Services (AWS)', 'Microsoft Azure', 'Google Cloud Platform', 'Docker', 'Kubernetes', 'Firebase']
  };

  const faqs = [
    {
      q: "How long does custom software development take?",
      a: "Depending on scope, a typical MVP (Minimum Viable Product) takes 8 to 12 weeks. Large-scale enterprise systems with microservices, complex integrations, and security migrations typically span 4 to 9 months, structured into bi-weekly agile sprint deliverables."
    },
    {
      q: "How much does a typical software project cost?",
      a: "Costs vary based on complexity, integration layers, and team scale. We provide transparent, outcome-aligned proposals after our initial discovery phase, outlining fixed milestone allocations to prevent budget creep."
    },
    {
      q: "Do you sign Non-Disclosure Agreements (NDAs)?",
      a: "Yes, 100%. We sign standard enterprise NDAs before scoping conversations or receiving data logs to protect your proprietary logic and business models."
    },
    {
      q: "Do you provide post-launch maintenance and support?",
      a: "Absolutely. We offer dedicated SLAs (Service Level Agreements) covering 24/7 server monitoring, security patching, database backups, and ongoing iterative feature improvements."
    },
    {
      q: "Can you modernize or scale our existing software?",
      a: "Yes. We frequently audit legacy code bases, migrate monolith architectures to secure serverless/containerized microservices, and optimize database layers to improve transaction performance."
    },
    {
      q: "What industries do you specialize in?",
      a: "Our core team has deep domain experience engineering digital products across Healthcare (HIPAA-compliant platforms), Education (scalable LMS systems), Finance, Logistics, and E-commerce."
    }
  ];

  return (
    <div className="homepage-redesign">
      
      {/* 1. HERO SECTION */}
      <section className="section hero-section" style={{ minHeight: '85vh', paddingTop: '150px', paddingBottom: '50px', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        <style>{`
          @keyframes kenburnsBgEffect {
            0% { transform: scale(1.0) translate(0, 0); }
            100% { transform: scale(1.12) translate(-0.5%, -0.5%); }
          }
          .kenburns-bg-active {
            animation: kenburnsBgEffect 7s ease-out forwards;
          }
        `}</style>

        {/* Looping Full Background Slideshow */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}>
          {backgroundSlides.map((slide, index) => {
            const isActive = index === activeBgIndex;
            return (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  opacity: isActive ? 0.22 : 0,
                  transition: 'opacity 2.0s ease-in-out',
                  zIndex: isActive ? 2 : 1,
                  overflow: 'hidden'
                }}
              >
                <img
                  src={slide}
                  alt="Tech Ecosystem"
                  loading="eager"
                  className={isActive ? 'kenburns-bg-active' : ''}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'grayscale(30%)'
                  }}
                />
              </div>
            );
          })}
          {/* Dark Radial Overlay for High Readability */}
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'radial-gradient(circle at 30% 30%, rgba(10, 15, 30, 0.4) 0%, rgba(10, 15, 30, 0.95) 100%)',
              zIndex: 3
            }}
          />
          {/* Blueprint grid overlay */}
          <div className="grid-background" style={{ zIndex: 4, opacity: 0.6 }}></div>
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 5 }}>
          <div className="hero-grid" style={{ maxWidth: '100%' }}>
            
            {/* Left Content */}
            <div className="hero-text-content" style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '640px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.18)', borderRadius: '9999px', padding: '6px 16px', width: 'fit-content' }}>
                <Sparkles style={{ width: '13px', height: '13px', color: 'var(--accent-blue)' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent-blue)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>YOUR DIGITAL GROWTH PARTNER</span>
              </div>
              
              <h1 className="hero-title text-gradient-chrome" style={{ fontSize: 'clamp(1.9rem, 5.5vw, 3.2rem)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-1px' }}>
                We Build Digital<br />Solutions That Turn<br /><span style={{ color: 'var(--accent-blue)' }}>Ideas Into Growth.</span>
              </h1>
              
              <p className="hero-tagline" style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '520px', margin: '2px 0 4px 0' }}>
                From websites and mobile apps to SaaS products and AI automation — we build technology that helps your business move forward.
              </p>
              
              {/* Rotating dynamic words rotator (Side-by-side on one line, smaller and aligned properly) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '4px 0 10px 0', minHeight: '20px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', lineHeight: '20px' }}>We Build</span>
                <div style={{ position: 'relative', height: '20px', overflow: 'hidden', width: '280px' }}>
                  {rotatingWords.map((word, index) => (
                    <span 
                      key={index} 
                      style={{ 
                        position: 'absolute', 
                        left: 0, 
                        top: 0,
                        color: 'var(--accent-blue)', 
                        fontWeight: 700, 
                        fontSize: '0.8rem',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        whiteSpace: 'nowrap',
                        lineHeight: '20px',
                        opacity: rotatingWordIndex === index ? 1 : 0,
                        transform: rotatingWordIndex === index ? 'translateY(0)' : 'translateY(10px)',
                        transition: 'opacity 0.4s ease, transform 0.4s ease'
                      }}
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* CTA Buttons */}
              <div className="hero-ctas" style={{ display: 'flex', gap: '14px', margin: '6px 0', flexWrap: 'wrap' }}>
                <Link href="/contact" className="btn btn-primary" style={{ padding: '14px 28px', fontSize: '0.95rem', borderRadius: '12px', background: 'var(--accent-blue)', color: '#FFFFFF', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  Start Your Project <ArrowRight style={{ width: '16px', height: '16px' }} />
                </Link>
                <Link href="/contact" className="btn btn-glass" style={{ padding: '14px 28px', fontSize: '0.95rem', borderRadius: '12px', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontWeight: 600 }}>
                  Get Free Consultation
                </Link>
              </div>

              {/* Horizontal Divider Line */}
              <div style={{ height: '1px', background: 'var(--border-color)', margin: '18px 0 14px 0', opacity: 0.6 }} />

              {/* Authenticity Bullet Points (Horizontal below divider) */}
              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <Check style={{ width: '14px', height: '14px', color: 'var(--accent-blue)', strokeWidth: '3px' }} />
                  <span>Built Around Your Business</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <Check style={{ width: '14px', height: '14px', color: 'var(--accent-blue)', strokeWidth: '3px' }} />
                  <span>End-to-End Solutions</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <Check style={{ width: '14px', height: '14px', color: 'var(--accent-blue)', strokeWidth: '3px' }} />
                  <span>Long-Term Support</span>
                </div>
              </div>
            </div>
 
            {/* Right Spacer Column (mockup removed) */}
            <div />
            
          </div>
        </div>

        {/* Carousel indicators at the bottom center of the hero section */}
        <div 
          style={{
            position: 'absolute',
            bottom: '30px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            zIndex: 6
          }}
        >
          {[0, 1, 2, 3, 4].map((dot) => {
            const isActive = (activeBgIndex % 5) === dot;
            return (
              <button
                key={dot}
                onClick={() => {
                  setActiveBgIndex(dot);
                }}
                style={{
                  width: isActive ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: isActive ? 'var(--accent-blue)' : 'rgba(255, 255, 255, 0.25)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.3s ease'
                }}
                aria-label={`Go to slide group ${dot + 1}`}
              />
            );
          })}
        </div>
      </section>

      {/* 2. TRUSTED TECHNOLOGY STACK BAR */}
      <section className="trust-slider" style={{ borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '24px 0', marginTop: '30px', background: 'rgba(255,255,255,0.01)' }}>
        <div className="container">
          <p style={{ textAlign: 'center', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '2px', marginBottom: '16px' }}>
            Built With a Trusted Technology Stack
          </p>
          <div className="tech-marquee-container">
            <div className="tech-marquee-track">
              {[
                { name: 'React', svg: <svg viewBox="0 0 24 24" width="32" height="32" fill="none" strokeWidth="1.5"><ellipse cx="12" cy="12" rx="11" ry="4.2" /><ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(120 12 12)" /><circle cx="12" cy="12" r="2" fill="currentColor" /></svg> },
                { name: 'Next.js', svg: <svg viewBox="0 0 24 24" width="32" height="32" fill="none" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M9 17V7l7.5 9.5V7" /></svg> },
                { name: 'Node.js', svg: <svg viewBox="0 0 24 24" width="32" height="32" fill="none" strokeWidth="1.5"><path d="M12 2L3 7v10l9 5 9-5V7L12 2z" /><path d="M12 22V12m0 0L3 7m9 5l9-5" /></svg> },
                { name: 'Amazon Web Services', svg: <svg viewBox="0 0 24 24" width="32" height="32" fill="none" strokeWidth="1.5"><path d="M6 14s2.5-3 6-3 6 3 6 3M3 17s4-5 9-5 9 5 9 5M12 6c-3 0-5.5 2-5.5 4.5S9 15 12 15s5.5-2 5.5-4.5S15 6 12 6z" /></svg> },
                { name: 'MongoDB', svg: <svg viewBox="0 0 24 24" width="32" height="32" fill="none" strokeWidth="1.5"><path d="M12 2C12 2 6 7 6 13C6 17.5 9.5 21 12 22C14.5 21 18 17.5 18 13C18 7 12 2 12 2Z" /><path d="M12 2V22" /></svg> },
                { name: 'Flutter', svg: <svg viewBox="0 0 24 24" width="32" height="32" fill="none" strokeWidth="1.5"><path d="M14 2L6 10l4 4l8-8zM18 10l-4 4l4 4h-4l-4-4l4-4z" /></svg> },
                { name: 'Microsoft Azure', svg: <svg viewBox="0 0 24 24" width="32" height="32" fill="none" strokeWidth="1.5"><path d="M19 19L5 19L11 5L19 19Z" /><path d="M11 5L15 12L7 16" /></svg> },
                { name: 'Docker', svg: <svg viewBox="0 0 24 24" width="32" height="32" fill="none" strokeWidth="1.5"><path d="M2 14h20v2H2zM5 11h3v3H5zm4 0h3v3H9zm4 0h3v3h-3zm4 0h3v3h-3zM9 8h3v3H9zm4 0h3v3h-3z" /></svg> },
                { name: 'Kubernetes', svg: <svg viewBox="0 0 24 24" width="32" height="32" fill="none" strokeWidth="1.5"><path d="M12 2L3 6v12l9 4 9-4V6L12 2z" /><path d="M12 2v20M3 6l18 12M3 18L21 6" /></svg> },
                { name: 'Python', svg: <svg viewBox="0 0 24 24" width="32" height="32" fill="none" strokeWidth="1.5"><path d="M12 2C8.7 2 8 2.7 8 6v2h8V6c0-3.3-.7-4-4-4zM12 22c3.3 0 4-2.7 4-6v-2H8v2c0 3.3.7 6 4 6z" /><circle cx="10" cy="4" r="0.75" fill="currentColor" /><circle cx="14" cy="20" r="0.75" fill="currentColor" /></svg> }
              ].reduce((acc, current, _, arr) => {
                if (acc.length === 0) {
                  return [...arr, ...arr];
                }
                return acc;
              }, []).map((tech, i) => (
                <div key={i} className="tech-marquee-item">
                  {tech.svg}
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHY AWENUE SECTION */}
      <section className="section" id="about" style={{ padding: '100px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto var(--space-5) auto' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-blue)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px' }}>WHY AWENUE</span>
            <h2 className="text-gradient-chrome" style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '8px', marginBottom: '16px' }}>Built Around Your Business. Focused on Your Growth.</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
              We partner with local businesses, startups, and growing companies to turn ideas into powerful digital solutions.
            </p>
          </div>

          <div className="challenge-grid reveal-card-trigger">
            {[
              { title: "Business-First Approach", desc: "We understand your goals before recommending any technology." },
              { title: "Transparent Process", desc: "Clear communication and structured milestones throughout." },
              { title: "End-to-End Solutions", desc: "Strategy, design, development, launch, and ongoing support." },
              { title: "Built for Growth", desc: "Solutions designed to evolve as your business scales." }
            ].map((item, index) => (
              <div key={index} className="challenge-card reveal-card">
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>{item.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SERVICES SECTION */}
      <section className="section" id="services" style={{ padding: '100px 0', background: 'rgba(255,255,255,0.01)', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto var(--space-5) auto' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-blue)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px' }}>OUR SERVICES</span>
            <h2 className="text-gradient-chrome" style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '8px', marginBottom: '16px' }}>Everything You Need to Build, Automate & Grow Digitally.</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
              From your first website to scalable software and AI-powered automation — <strong>one technology partner for your complete digital journey.</strong>
            </p>
          </div>

          <div className="services-category-grid reveal-services-trigger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
            {[
              {
                title: "Web Development",
                tagline: "Build a Powerful Digital Presence.",
                desc: "Fast, responsive, conversion-focused websites that help your business look professional and grow online.",
                features: ["Business & Corporate Websites", "E-Commerce Websites", "High-Converting Landing Pages", "Custom Web Applications", "Website Redesign & Modernization", "Maintenance & Performance Optimization"],
                image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=400&auto=format&fit=crop"
              },
              {
                title: "SaaS Development",
                tagline: "Turn Your Idea Into a Scalable Software Product.",
                desc: "From MVP to a production-ready SaaS platform — designed for real users and built for future growth.",
                features: ["Product Strategy & Planning", "UI/UX Product Design", "MVP Development", "Custom SaaS Platforms", "Subscription & Payment Integration", "Scalable Cloud Architecture"],
                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop"
              },
              {
                title: "Mobile App Development",
                tagline: "Take Your Business Wherever Your Customers Go.",
                desc: "Intuitive, high-performance mobile applications that connect businesses with customers seamlessly.",
                features: ["Android Applications", "iOS Applications", "Cross-Platform Apps", "Business & Enterprise Apps", "E-Commerce Applications", "App Maintenance & Updates"],
                image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=400&auto=format&fit=crop"
              },
              {
                title: "AI & Automation",
                tagline: "Work Smarter. Automate the Repetitive.",
                desc: "AI-powered automation that eliminates manual workflows — giving your team time to focus on what matters.",
                features: ["Business Workflow Automation", "AI Chatbots & Assistants", "Lead Capture & Follow-Ups", "CRM Automation", "AI Integration With Existing Systems", "Custom AI-Powered Workflows"],
                image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=400&auto=format&fit=crop"
              },
              {
                title: "Digital Marketing",
                tagline: "Turn Your Digital Presence Into Business Growth.",
                desc: "Reach the right audience, strengthen your online presence, and drive meaningful business growth.",
                features: ["Search Engine Optimization — SEO", "Local SEO & Google Business Profile", "Social Media Marketing", "Content Marketing", "Performance Marketing", "Paid Advertising Campaigns"],
                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop"
              },
              {
                title: "Graphic Design & Branding",
                tagline: "Build a Brand People Remember.",
                desc: "Professional visual identities that make your business stand out — from logo to complete brand system.",
                features: ["Logo Design", "Complete Brand Identity", "Brand Guidelines", "Social Media Creatives", "Marketing & Advertising Graphics", "UI/UX Design"],
                image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=400&auto=format&fit=crop"
              }
            ].map((service, index) => (
              <div key={index} className="service-premium-card reveal-service">
                {/* Glow overlay */}
                <div className="service-card-glow" />

                {/* Top Cover Image */}
                <div className="service-card-img-wrapper">
                  <img src={service.image} alt={service.title} className="service-card-img" />
                </div>

                {/* Card Body content */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1, padding: '28px', position: 'relative', zIndex: 2 }}>
                  <div>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>{service.title}</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--accent-blue)', fontWeight: 600, marginBottom: '12px' }}>{service.tagline}</p>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>{service.desc}</p>
                    
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                      {service.features.map((feat, i) => (
                        <li key={i} className="service-feature-item">
                          <Check style={{ width: '13px', height: '13px', color: 'var(--accent-blue)', strokeWidth: '3px', marginTop: '3px', flexShrink: 0 }} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Link href="/contact" className="service-card-btn">
                    Explore {service.title}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Not Sure Which Service CTA */}
          <div style={{ marginTop: '64px', background: 'linear-gradient(135deg, rgba(37,99,235,0.03) 0%, rgba(10,15,30,0.99) 100%)', border: '1px solid rgba(37,99,235,0.15)', borderRadius: '24px', padding: '48px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px' }}>Not Sure Which Service Your Business Needs?</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '580px', margin: '0 auto 24px auto', lineHeight: 1.6 }}>
              Tell us about your business, idea, or challenge. We'll help you identify the right digital solution.
            </p>
            <Link href="/contact" className="btn btn-primary" style={{ padding: '12px 28px', fontSize: '0.95rem', borderRadius: '12px', display: 'inline-block', textDecoration: 'none', background: 'var(--accent-blue)', color: '#FFF' }}>
              Get Free Consultation
            </Link>
          </div>
        </div>
      </section>


      {/* 5. FEATURED SAAS PRODUCTS */}
      <section className="section" id="products" style={{ padding: '100px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ maxWidth: '600px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-blue)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px' }}>OUR PRODUCTS</span>
              <h2 className="text-gradient-chrome" style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '8px', marginBottom: '16px' }}>Software Built for Real Business.</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
                Practical digital products we've designed and built to simplify operations and help organizations grow smarter.
              </p>
            </div>
            <Link href="/products" className="btn btn-glass" style={{ padding: '12px 24px', borderRadius: '12px', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
              View All Products &rarr;
            </Link>
          </div>

          <div className="services-category-grid reveal-products-trigger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {[
              { 
                name: "Awenue CRM", 
                tag: "Sales Pipeline",
                desc: "Manage leads, customers, sales, and business relationships — all in one place.",
                features: ["Lead Management", "Sales Pipeline", "Customer Management"],
                link: "https://crm.awenue.io",
                linkLabel: "Visit CRM Website",
                isComingSoon: false
              },
              { 
                name: "Awenue College ERP", 
                tag: "Business Platform",
                desc: "A smarter platform to manage students, faculty, academics, fees, and campus operations.",
                features: ["Student Management", "Attendance", "Fee Management"],
                link: "https://erp.awenue.io",
                linkLabel: "Visit ERP Website",
                isComingSoon: false
              },
              { 
                name: "Awenue Hospital Management", 
                tag: "Healthcare Platform",
                desc: "A connected digital solution designed to simplify hospital and healthcare operations.",
                features: ["Patient Management", "Appointments", "Hospital Operations"],
                link: "#",
                linkLabel: "Coming Soon",
                isComingSoon: true
              }
            ].map((prod, index) => (
              <div key={index} className="service-premium-card reveal-product" style={{ padding: '32px', background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', opacity: prod.isComingSoon ? 0.8 : 1 }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <span style={{ fontSize: '0.65rem', color: 'var(--accent-blue)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>{prod.tag}</span>
                    {prod.isComingSoon && (
                      <span style={{ fontSize: '0.65rem', color: '#EAB308', background: 'rgba(234,179,8,0.1)', border: '1px solid rgba(234,179,8,0.3)', borderRadius: '4px', padding: '2px 8px', fontWeight: 600, textTransform: 'uppercase' }}>Coming Soon</span>
                    )}
                  </div>
                  
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '10px' }}>{prod.name}</h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>{prod.desc}</p>
                  
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                    {prod.features.map((feat, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        <Check style={{ width: '13px', height: '13px', color: 'var(--accent-blue)', strokeWidth: '3px' }} />
                        <span>{prod.features[i]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {prod.isComingSoon ? (
                  <span style={{ width: '100%', textAlign: 'center', padding: '10px', fontSize: '0.85rem', fontWeight: 600, border: '1px solid rgba(255,255,255,0.05)', borderRadius: '10px', color: 'var(--text-muted)', display: 'block', cursor: 'default' }}>
                    {prod.linkLabel}
                  </span>
                ) : (
                  <a href={prod.link} target="_blank" rel="noopener noreferrer" className="btn btn-glass" style={{ width: '100%', textAlign: 'center', padding: '10px', fontSize: '0.85rem', fontWeight: 600, border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)', display: 'block', textDecoration: 'none' }}>
                    {prod.linkLabel} &rarr;
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. DEVELOPMENT PROCESS SECTION */}
      <section className="section" style={{ padding: '100px 0', borderTop: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.01)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto var(--space-5) auto' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-blue)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px' }}>HOW WE WORK</span>
            <h2 className="text-gradient-chrome" style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '8px', marginBottom: '16px' }}>From Idea to Impact.</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
              A simple, transparent journey to turn your vision into reality.
            </p>
          </div>

          <ProcessTimeline />
        </div>
      </section>

      {/* 7. FEATURED CASE STUDY */}
      <section className="section" id="portfolio" style={{ padding: '100px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-blue)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px' }}>Featured Case Study</span>
              <h2 className="text-gradient-chrome" style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '8px', marginBottom: '16px' }}>Scalable Digital Architecture in Practice</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
                How we solved manual overhead cycles for a prominent educational system.
              </p>
            </div>
          </div>

          {/* Case Study Card */}
          <div 
            style={{ 
              background: 'var(--card-bg)', 
              border: '1px solid var(--border-color)', 
              borderRadius: '24px', 
              padding: '40px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '40px',
              alignItems: 'center'
            }}
          >
            {/* Left Case Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--accent-blue)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>PROJECT_SHOWCASE</span>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>LMS & Billing Centralization</h3>
              </div>
              
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                An educational organization with 12 campuses processed fee collections, student logs, and grades manually, causing data lags and billing discrepancies.
              </p>

              {/* Problem/Solution split */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ borderLeft: '3px solid #EF4444', paddingLeft: '16px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#EF4444', textTransform: 'uppercase' }}>The challenge</span>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    100+ manual spreadsheets, delayed payment reconciliations, and slow load times on legacy student records databases.
                  </p>
                </div>
                <div style={{ borderLeft: '3px solid #10B981', paddingLeft: '16px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10B981', textTransform: 'uppercase' }}>The architecture</span>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Developed a cloud-native Next.js portal powered by Node.js microservices. Integrated Stripe Billing APIs for auto-invoicing and built an offline-sync mobile app.
                  </p>
                </div>
              </div>

              {/* Technologies Badge */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
                {['Next.js', 'Node.js', 'PostgreSQL', 'AWS ECS', 'Stripe Billing'].map((tech, i) => (
                  <span key={i} style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '4px 10px' }}>{tech}</span>
                ))}
              </div>
            </div>

            {/* Right Case Metrics */}
            <div 
              style={{ 
                background: 'rgba(255, 255, 255, 0.01)', 
                border: '1px solid rgba(255, 255, 255, 0.04)', 
                borderRadius: '16px', 
                padding: '32px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '24px',
                textAlign: 'center'
              }}
            >
              <div>
                <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-blue)', display: 'block' }}>-40%</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px', display: 'block' }}>Admin Overhead Hours</span>
              </div>
              <div>
                <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#10B981', display: 'block' }}>100%</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px', display: 'block' }}>Auto Billing Reconciliations</span>
              </div>
              <div style={{ gridColumn: 'span 2', borderTop: '1px solid rgba(255, 255, 255, 0.04)', paddingTop: '24px', textAlign: 'left' }}>
                <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.5px' }}>Business Impact</span>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.5 }}>
                  The transition consolidated accounting records into one dashboard, freeing up administration workers for direct parent support lines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. INDUSTRIES SERVED */}
      <section className="section" style={{ padding: '100px 0', borderTop: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.01)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto var(--space-5) auto' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-blue)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px' }}>Domain Expertise</span>
            <h2 className="text-gradient-chrome" style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '8px', marginBottom: '16px' }}>Outcome-Focused Industries</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
              We adapt software structures to meet the compliance frameworks and user models of specific sectors.
            </p>
          </div>

          <div className="challenge-grid">
            {[
              { ind: "Healthcare", desc: "Secure digital management grids, HIPAA-compliant patient dashboards, and automated clinic consultation schedules." },
              { ind: "Education", desc: "Learning Management Systems, student personnel tracking databases, auto-billing invoices, and exam grade portals." },
              { ind: "Real Estate", desc: "Interactive asset listings, custom CRM lead-tracking software, and Stripe payment gateway interfaces." },
              { ind: "Logistics", desc: "Database record management for fleets, automated shipping logs, and live tracking map configurations." }
            ].map((item, index) => (
              <div key={index} className="challenge-card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>{item.ind}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. STRUCTURED TECHNOLOGIES DIRECTORY */}
      <section className="section" style={{ padding: '100px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto var(--space-5) auto' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-blue)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px' }}>Competence Map</span>
            <h2 className="text-gradient-chrome" style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '8px', marginBottom: '16px' }}>Structured Tech Stack</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
              We build using modern, developer-supported technologies to ensure long-term database scalability.
            </p>
          </div>

          {/* Interactive tabs */}
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

          {/* Tech List Grid */}
          <div className="tech-directory-grid">
            {techDirectory[activeTechTab].map((techName, index) => (
              <div key={index} className="tech-directory-item">
                {techName}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. WHY CHOOSE AWENUE (COMPARISON TABLE) */}
      <section className="section" style={{ padding: '100px 0', borderTop: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.01)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto var(--space-5) auto' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-blue)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px' }}>Operational Strategy</span>
            <h2 className="text-gradient-chrome" style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '8px', marginBottom: '16px' }}>Measurable Advantages</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
              Compare how we structure development cycles compared to legacy outsourced IT agencies.
            </p>
          </div>

          {/* Comparison Matrix */}
          <div className="comparison-table-wrapper">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th className="comparison-th">Operational Metric</th>
                  <th className="comparison-th" style={{ color: 'var(--text-muted)' }}>Traditional Vendor</th>
                  <th className="comparison-th" style={{ color: 'var(--accent-blue)' }}>Awenue Systems</th>
                </tr>
              </thead>
              <tbody>
                <tr className="comparison-tr">
                  <td className="comparison-td" style={{ fontWeight: 600 }}>Architecture Customization</td>
                  <td className="comparison-td">WordPress / Theme templates with bloated styling rules.</td>
                  <td className="comparison-td" style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Bespoke backend modules engineered for high concurrency.</td>
                </tr>
                <tr className="comparison-tr">
                  <td className="comparison-td" style={{ fontWeight: 600 }}>Agile Visibility</td>
                  <td className="comparison-td">Vague project checkpoints, slow update emails.</td>
                  <td className="comparison-td" style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Live development staging links, bi-weekly sprint reviews.</td>
                </tr>
                <tr className="comparison-tr">
                  <td className="comparison-td" style={{ fontWeight: 600 }}>Security Layering</td>
                  <td className="comparison-td">Basic plugin firewall locks, legacy network configs.</td>
                  <td className="comparison-td" style={{ color: 'var(--text-primary)', fontWeight: 500 }}>TLS encryption layers, secure database authorization policies.</td>
                </tr>
                <tr className="comparison-tr">
                  <td className="comparison-td" style={{ fontWeight: 600 }}>Post-Launch Support</td>
                  <td className="comparison-td">Freelance support contracts, delayed bug patch logs.</td>
                  <td className="comparison-td" style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Dedicated SLA response metrics, automatic system updates.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 11. CORE PHILOSOPHY & VISION */}
      <section className="section" style={{ padding: '100px 0' }}>
        <div className="container">
          <div 
            style={{ 
              background: 'linear-gradient(135deg, rgba(37,99,235,0.05) 0%, rgba(10,15,30,0.6) 100%)', 
              border: '1px solid rgba(37,99,235,0.15)', 
              borderRadius: '24px', 
              padding: '48px',
              maxWidth: '900px',
              margin: '0 auto'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <Building style={{ width: '16px', height: '16px', color: 'var(--accent-blue)' }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-blue)', textTransform: 'uppercase', letterSpacing: '1px' }}>Engineering Philosophy</span>
            </div>
            
            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px', lineHeight: '1.3' }}>
              "We believe enterprise software should be measured by business speed metrics, security, and scalability—not lines of code."
            </h3>
            
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
              Our founding team established Awenue to solve a major operational gap: many development houses deliver features that look good but buckle under database load or fail compliance audits. We build digital architectures aligned to support enterprise transactions from step one.
            </p>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <HeartHandshake style={{ width: '18px', height: '18px', color: 'var(--text-secondary)' }} />
              </div>
              <div>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block' }}>Awenue Engineering Core</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Founding Vision Statement</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. FAQ ACCORDION SECTION */}
      <section className="section" style={{ padding: '100px 0', borderTop: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.01)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-blue)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px' }}>Help Center</span>
            <h2 className="text-gradient-chrome" style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '8px', marginBottom: '16px' }}>Frequently Asked Questions</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
              Key scoping details startup founders and enterprise CTOs clarify before initiating builds.
            </p>
          </div>

          <div className="faq-accordion-container">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <button 
                  className="faq-question-button"
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.q}</span>
                  {openFaq === index ? (
                    <ChevronUp style={{ width: '18px', height: '18px', color: 'var(--accent-blue)' }} />
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

      {/* 13. ACTION-ORIENTED FINAL CTA SECTION */}
      <section className="section cta-section" style={{ padding: '120px 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
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
            Ready to Build Your Next Digital Product?
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '580px', margin: '0 auto var(--space-4) auto', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Let's discuss your operational bottleneck cycles, system parameters, and construct software modules that deliver real business growth.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary" style={{ padding: '14px 28px', fontSize: '0.95rem', borderRadius: '12px', background: 'var(--accent-blue)', color: '#FFFFFF', fontWeight: 600 }}>
              Schedule a Consultation
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
