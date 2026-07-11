'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Lightbulb, Compass, Cpu, Send, HeartHandshake, Code, Globe, Cloud, Shield, ShieldCheck, Smartphone, Users, FolderCheck, Award, Briefcase, GraduationCap, Activity, Phone, Mail, MapPin, Calendar, CheckCircle, Clock, ChevronRight, Target, Building
} from 'lucide-react';

export default function CareersPage() {
  return (
    <div className="page-route-careers">
      {/* HERO SECTION */}
  <section className="section careers-hero">
    <div className="container content-wrapper">
      <p style={{fontFamily: 'var(--font-heading)', fontSize: '0.8rem', letterSpacing: '0.25em', color: 'var(--text-muted)', textTransform: 'uppercase'}}>Engineering Lab</p>
      <h1 className="text-gradient-chrome">Open Positions</h1>
      <p style={{color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem'}}>
        Constructing technological frameworks alongside senior systems developers.
      </p>
    </div>
  </section>

  {/* JOBS LISTINGS */}
  <section className="section" style={{paddingTop: '0'}}>
    <div className="container content-wrapper">
      <div className="jobs-board">
        
        {/* Job 1 */}
        <div className="job-listing-card">
          <div className="job-details">
            <h3>Senior Frontend Architect (Next.js / CSS)</h3>
            <div className="job-meta-tags">
              <span className="job-tag">Hybrid</span>
              <span className="job-tag">Varanasi Lab</span>
              <span className="job-tag">Full-time</span>
            </div>
          </div>
          <Link href="/contact?subject=Application for Senior Frontend Architect" className="btn btn-primary">Apply Now</Link>
        </div>

        {/* Job 2 */}
        <div className="job-listing-card">
          <div className="job-details">
            <h3>Distributed Systems Engineer (Java / Microservices)</h3>
            <div className="job-meta-tags">
              <span className="job-tag">Remote</span>
              <span className="job-tag">India</span>
              <span className="job-tag">Full-time</span>
            </div>
          </div>
          <Link href="/contact?subject=Application for Distributed Systems Engineer" className="btn btn-primary">Apply Now</Link>
        </div>

        {/* Job 3 */}
        <div className="job-listing-card">
          <div className="job-details">
            <h3>Cloud Security Specialist (AWS / Kubernetes)</h3>
            <div className="job-meta-tags">
              <span className="job-tag">Hybrid</span>
              <span className="job-tag">Varanasi Lab</span>
              <span className="job-tag">Contract (1 Yr)</span>
            </div>
          </div>
          <Link href="/contact?subject=Application for Cloud Security Specialist" className="btn btn-primary">Apply Now</Link>
        </div>

      </div>
    </div>
  </section>

  {/* FOOTER */}
    </div>
  );
}
