'use client';

import React from 'react';
import { 
  Eye, 
  Search, 
  Target, 
  Layers, 
  Code, 
  ShieldCheck, 
  Rocket, 
  LifeBuoy
} from 'lucide-react';

const steps = [
  {
    icon: Eye,
    title: "Phase 01 — Discover",
    desc: "We dive deep into your business goals, target audience, and project scope to align on clear objectives.",
    deliverable: "Scope & Goals Alignment, Requirement Matrix"
  },
  {
    icon: Search,
    title: "Phase 02 — Research",
    desc: "We analyze market trends, competitor strategies, and evaluate the ideal technology stack for your product.",
    deliverable: "Competitor Intelligence, Tech Architecture Audit"
  },
  {
    icon: Target,
    title: "Phase 03 — Strategy",
    desc: "We build an actionable product roadmap, sprint plans, and system architecture before writing code.",
    deliverable: "Sprint & Milestone Roadmap, System Design Blueprint"
  },
  {
    icon: Layers,
    title: "Phase 04 — Design",
    desc: "We create interactive wireframes, modern UI component libraries, and polished high-fidelity prototypes.",
    deliverable: "Interactive Prototypes, Design System & Tokens"
  },
  {
    icon: Code,
    title: "Phase 05 — Develop",
    desc: "We build your product using clean code, scalable APIs, and modern frameworks with weekly staging builds.",
    deliverable: "Weekly Staging Previews, Clean & Scalable Code"
  },
  {
    icon: ShieldCheck,
    title: "Phase 06 — Test",
    desc: "We perform rigorous quality assurance, cross-browser testing, security audits, and performance tuning.",
    deliverable: "End-to-End QA Testing, Security & Load Audits"
  },
  {
    icon: Rocket,
    title: "Phase 07 — Launch",
    desc: "We deploy your solution to production cloud infrastructure with zero downtime and real-time monitoring.",
    deliverable: "Zero-Downtime Deployment, Cloud Infra Setup"
  },
  {
    icon: LifeBuoy,
    title: "Phase 08 — Grow",
    desc: "We continuously optimize, scale server capacity, add new features, and provide long-term technical support.",
    deliverable: "Continuous Upgrades, 24/7 SLA Support"
  }
];

export default function ProcessTimeline() {
  return (
    <div className="process-vertical-timeline">
      {/* Central continuous track line */}
      <div className="process-track-line"></div>
      
      {/* Timeline Nodes */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', position: 'relative' }}>
        {steps.map((step, index) => {
          const StepIcon = step.icon;
          const isEven = index % 2 === 0;
          
          return (
            <div 
              key={index}
              className="process-timeline-node"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto 1fr',
                alignItems: 'center',
                width: '100%',
                position: 'relative'
              }}
            >
              {/* Left Column (Content or Empty) */}
              <div style={{ 
                textAlign: isEven ? 'right' : 'left', 
                paddingRight: isEven ? '32px' : '0px',
                paddingLeft: isEven ? '0px' : '32px',
                gridColumn: isEven ? 1 : 3,
                order: isEven ? 1 : 3
              }}>
                <div 
                  className="process-card"
                  style={{
                    background: 'var(--card-bg)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '18px',
                    padding: '24px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)',
                    transition: 'var(--transition-smooth)',
                    textAlign: 'left'
                  }}
                >
                  <h4 style={{ 
                    fontFamily: 'var(--font-heading)', 
                    fontSize: '1.25rem', 
                    fontWeight: 700, 
                    color: 'var(--text-primary)',
                    marginBottom: '10px'
                  }}>
                    {step.title}
                  </h4>
                  <p style={{ 
                    fontSize: '0.9rem', 
                    color: 'var(--text-secondary)', 
                    lineHeight: '1.6',
                    marginBottom: '16px'
                  }}>
                    {step.desc}
                  </p>
                  
                  {/* Deliverable Badge */}
                  <div style={{ 
                    borderTop: '1px solid rgba(255, 255, 255, 0.05)', 
                    paddingTop: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}>
                    <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--accent-blue)', fontWeight: 700, letterSpacing: '0.5px' }}>
                      Key Deliverables
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                      {step.deliverable}
                    </span>
                  </div>
                </div>
              </div>

              {/* Center Timeline Icon */}
              <div 
                className="process-icon-outer"
                style={{
                  gridColumn: 2,
                  order: 2,
                  zIndex: 2,
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'var(--bg-primary)',
                  border: '2px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-muted)',
                  boxShadow: '0 0 20px rgba(0, 0, 0, 0.4)',
                  transition: 'var(--transition-smooth)'
                }}
              >
                <StepIcon style={{ width: '22px', height: '22px' }} />
              </div>

              {/* Empty Column for Layout Offset */}
              <div style={{ gridColumn: isEven ? 3 : 1, order: isEven ? 3 : 1 }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
