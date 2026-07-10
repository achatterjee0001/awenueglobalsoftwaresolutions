'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Check, 
  ArrowRight, 
  Sparkles, 
  ChevronDown, 
  ChevronUp,
  Phone,
  Mail,
  MapPin,
  Clock,
  Briefcase,
  Lock,
  Target,
  FileCheck,
  Calendar
} from 'lucide-react';

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: 'software',
    budget: '$10k - $25k',
    timeline: '3 - 6 months',
    country: '',
    message: ''
  });

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API request
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      // Reset form
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        service: 'software',
        budget: '$10k - $25k',
        timeline: '3 - 6 months',
        country: '',
        message: ''
      });
    }, 5000);
  };

  const contactFaqs = [
    { q: "How quickly will someone respond to my inquiry?", a: "Our engineering and sales squad reviews incoming technical forms daily. You will receive an initial response or scheduling link within 24 business hours." },
    { q: "Can we sign a Non-Disclosure Agreement (NDA) first?", a: "Absolutely. If your project contains proprietary data or logic, we can sign a standard mutual NDA before reviewing system details or sharing files." },
    { q: "Do you work with international clients?", a: "Yes. Our team serves startups and enterprises globally, coordinating calls across multiple time zones (including US, Europe, and APAC)." },
    { q: "How do you estimate custom software costs?", a: "We analyze scope, database layers, third-party integrations, and team scale to compile a detailed milestone proposal. Estimates are fixed-price to ensure full cost transparency." }
  ];

  return (
    <div className="contact-page-redesign">
      
      {/* 1. HERO SECTION */}
      <section className="section contact-hero" style={{ minHeight: '55vh', paddingTop: '160px', paddingBottom: '48px', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="grid-background"></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '16px', margin: '0 auto', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.18)', borderRadius: '9999px', padding: '6px 16px', width: 'fit-content' }}>
              <Sparkles style={{ width: '13px', height: '13px', color: '#2563EB' }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#2563EB', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Technical Consultation</span>
            </div>
            
            <h1 className="text-gradient-chrome" style={{ fontSize: '3.6rem', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-1px' }}>
              Tell Us About Your Project. Let's Build the Future.
            </h1>
            
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6, maxWidth: '640px', textAlign: 'center' }}>
              Whether you are modernizing outdated legacy software, deploying containerized cloud microservices, launching a mobile app, or building a SaaS platform, our team is ready to design and execute.
            </p>
          </div>
        </div>
      </section>

      {/* 2. CHOOSE HOW TO CONNECT */}
      <section className="section" style={{ padding: '40px 0 80px 0', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            
            {/* Consultation */}
            <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span style={{ fontSize: '1.5rem' }}>📞</span>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>Book Discovery Call</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>Arrange a live 20-minute Zoom technical alignment meeting with our lead architect.</p>
              <a href="mailto:awenueglobalsoftwaresolutions@gmail.com" style={{ fontSize: '0.85rem', color: '#2563EB', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: 'auto' }}>
                Schedule Meeting &rarr;
              </a>
            </div>

            {/* WhatsApp */}
            <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span style={{ fontSize: '1.5rem' }}>💬</span>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>WhatsApp Business</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>Connect directly with a sales representative for immediate scoping updates.</p>
              <a href="https://wa.me/917398068193" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.85rem', color: '#2563EB', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: 'auto' }}>
                Chat on WhatsApp &rarr;
              </a>
            </div>

            {/* Email Sales */}
            <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span style={{ fontSize: '1.5rem' }}>📧</span>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>Email Sales</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>Send us RFPs, technical documents, or database design sheets directly.</p>
              <a href="mailto:awenueglobalsoftwaresolutions@gmail.com" style={{ fontSize: '0.85rem', color: '#2563EB', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: 'auto' }}>
                Email Sales Inbox &rarr;
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 3. PROJECT INQUIRY FORM (SPLIT LAYOUT) */}
      <section className="section" style={{ padding: '80px 0', background: 'rgba(255,255,255,0.01)', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '64px', alignItems: 'start' }}>
            
            {/* Left Side: Form */}
            <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '40px', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '24px' }}>Project Inquiry Form</h2>
              
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>Full Name *</label>
                    <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="form-control" style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px 14px', color: 'var(--text-primary)' }} placeholder="Jane Doe" />
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>Company Name</label>
                    <input type="text" name="company" value={formData.company} onChange={handleInputChange} className="form-control" style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px 14px', color: 'var(--text-primary)' }} placeholder="Acme Corp" />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>Work Email *</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="form-control" style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px 14px', color: 'var(--text-primary)' }} placeholder="jane@company.com" />
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="form-control" style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px 14px', color: 'var(--text-primary)' }} placeholder="+91 99999 99999" />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>What are you looking for? *</label>
                  <select name="service" value={formData.service} onChange={handleInputChange} className="form-control" style={{ width: '100%', background: '#0D1426', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px 14px', color: 'var(--text-primary)', cursor: 'pointer' }}>
                    <option value="software">Custom Software Dev</option>
                    <option value="saas">SaaS Product Build</option>
                    <option value="web">Next.js Web Engineering</option>
                    <option value="mobile">Mobile Application</option>
                    <option value="design">UI/UX Design</option>
                    <option value="devops">DevOps & Cloud Orchestration</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>Budget Range</label>
                    <select name="budget" value={formData.budget} onChange={handleInputChange} className="form-control" style={{ width: '100%', background: '#0D1426', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px 14px', color: 'var(--text-primary)', cursor: 'pointer' }}>
                      <option>$10k - $25k</option>
                      <option>$25k - $50k</option>
                      <option>$50k - $100k</option>
                      <option>$100k+</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>Target Timeline</label>
                    <select name="timeline" value={formData.timeline} onChange={handleInputChange} className="form-control" style={{ width: '100%', background: '#0D1426', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px 14px', color: 'var(--text-primary)', cursor: 'pointer' }}>
                      <option>Under 3 months</option>
                      <option>3 - 6 months</option>
                      <option>6 - 12 months</option>
                      <option>No tight deadline</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>Country *</label>
                  <input type="text" name="country" required value={formData.country} onChange={handleInputChange} className="form-control" placeholder="e.g. India, United States" style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px 14px', color: 'var(--text-primary)' }} />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>Describe Your Project Requirements</label>
                  <textarea name="message" value={formData.message} onChange={handleInputChange} className="form-control" rows="4" style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px 14px', color: 'var(--text-primary)' }} placeholder="Briefly detail what you are aiming to build, compliance guidelines, or current bottlenecks."></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', background: 'var(--accent-blue)', color: '#FFFFFF', border: 'none', borderRadius: '12px', padding: '14px', fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                  Submit Project Inquiry <ArrowRight style={{ width: '16px', height: '16px' }} />
                </button>
              </form>

              {formSubmitted && (
                <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10B981', borderRadius: '12px', padding: '16px', marginTop: '20px', color: '#10B981', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span>✓</span>
                  <div>
                    <span style={{ fontWeight: 700, display: 'block', fontSize: '0.85rem' }}>Request Received Successfully</span>
                    <span style={{ fontSize: '0.75rem', display: 'block', opacity: 0.85 }}>An engineer will contact you via email within 24 business hours.</span>
                  </div>
                </div>
              )}
            </div>

            {/* Right Side: Trust & Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div>
                <span style={{ fontSize: '0.7rem', color: '#2563EB', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>Response Guarantees</span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px' }}>Reducing Scoping Uncertainty</h3>
                
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', padding: 0 }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                    <Check style={{ width: '16px', height: '16px', color: '#10B981', strokeWidth: '3px' }} />
                    <span>Initial response within 24 business hours.</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                    <Check style={{ width: '16px', height: '16px', color: '#10B981', strokeWidth: '3px' }} />
                    <span>Free architectural consultation call.</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                    <Check style={{ width: '16px', height: '16px', color: '#10B981', strokeWidth: '3px' }} />
                    <span>Mutual NDA signed before detailed scoping.</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                    <Check style={{ width: '16px', height: '16px', color: '#10B981', strokeWidth: '3px' }} />
                    <span>Transparent, fixed-milestone proposals.</span>
                  </li>
                </ul>
              </div>

              <div>
                <span style={{ fontSize: '0.7rem', color: '#2563EB', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>Common Scoping Areas</span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px' }}>Why Businesses Scopes with Awenue</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
                  Our team regularly collaborates with technology officers and startup founders to:
                </p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', padding: 0 }}>
                  {["Launch new multi-tenant SaaS products", "Refactor slow legacy database nodes", "Deploy containerized networks on AWS", "Build responsive cross-platform mobile apps"].map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#2563EB' }}></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. WHAT HAPPENS NEXT? */}
      <section className="section" style={{ padding: '100px 0', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto var(--space-5) auto' }}>
            <span style={{ fontSize: '0.75rem', color: '#2563EB', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px' }}>Scoping Steps</span>
            <h2 className="text-gradient-chrome" style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '8px', marginBottom: '16px' }}>What Happens After You Submit?</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
              A roadmap explaining Awenue's process from review to project initiation.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
            {[
              { t: "1. Scope Review", d: "Our database and backend engineers review your project requirements and note integration lines." },
              { t: "2. Consultation Call", d: "We coordinate a 20-minute Zoom technical alignment meeting to define success parameters." },
              { t: "3. Proposal Dispatch", d: "You receive a detailed architecture roadmap proposal mapping sprints and cost options." },
              { t: "4. Project Launch", d: "Design wireframes and source code compiles begin after contract parameters approval." }
            ].map((step, idx) => (
              <div key={idx} style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '18px', padding: '24px' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>{step.t}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. OFFICE & AVAILABILITY */}
      <section className="section" style={{ padding: '100px 0', background: 'rgba(255,255,255,0.01)', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#2563EB', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px' }}>Location details</span>
              <h2 className="text-gradient-chrome" style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '8px', marginBottom: '16px' }}>Office & Availability</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '24px' }}>
                Our engineering team operates from our main lab center in Varanasi. We coordinate and support international operations using centralized tracking workflows.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <MapPin style={{ width: '18px', height: '18px', color: '#2563EB' }} />
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>Varanasi, Uttar Pradesh, India</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Clock style={{ width: '18px', height: '18px', color: '#2563EB' }} />
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>Monday - Friday (9:00 AM - 6:00 PM IST)</span>
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Direct Contacts</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '8px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Direct Sales:</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>+91 7398068193</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '8px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Email Scopes:</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>awenueglobalsoftwaresolutions@gmail.com</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>System SLA Help:</span>
                  <span style={{ color: '#2563EB', fontWeight: 600 }}>24/7 SLA Portal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ ACCORDION SECTION */}
      <section className="section" style={{ padding: '100px 0', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto' }}>
            <span style={{ fontSize: '0.75rem', color: '#2563EB', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px' }}>Help Center</span>
            <h2 className="text-gradient-chrome" style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '8px', marginBottom: '16px' }}>Contact FAQ</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
               Scoping details startup founders clarify before submitting proposals.
            </p>
          </div>

          <div className="faq-accordion-container" style={{ marginTop: '48px' }}>
            {contactFaqs.map((faq, index) => (
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

      {/* 7. ACTION-ORIENTED FINAL CTA SECTION */}
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
            Ready to Turn Your Idea Into Reality?
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '580px', margin: '0 auto var(--space-4) auto', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Whether you are a startup validating an MVP or an enterprise planning digital transformation, let's discuss how Awenue can help.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#consultation-form" className="btn btn-primary" style={{ padding: '14px 28px', fontSize: '0.95rem', borderRadius: '12px', background: 'var(--accent-blue)', color: '#FFFFFF', fontWeight: 600 }}>
              Schedule a Free Consultation
            </a>
            <Link href="/services" className="btn btn-glass" style={{ padding: '14px 28px', fontSize: '0.95rem', borderRadius: '12px', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontWeight: 600 }}>
              Explore Our Services
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
