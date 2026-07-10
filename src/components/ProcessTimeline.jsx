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
    title: "1. Discover",
    desc: "We align with your team to understand your digital business model, scope out key user requirements, and define concrete success parameters.",
    deliverable: "Project Scope Document & High-Level Architecture Map"
  },
  {
    icon: Search,
    title: "2. Research",
    desc: "Market landscaping, competitive benchmarking, and feasibility audits. We analyze data flows and legacy dependencies to de-risk development.",
    deliverable: "Tech Stack Recommendations & Feasibility Analysis Report"
  },
  {
    icon: Target,
    title: "3. Strategy",
    desc: "Constructing the development roadmaps, milestones, resource planning, and scoping clear project milestones to ensure budget-aligned delivery.",
    deliverable: "Detailed Product Roadmap & Sprint Milestones Plan"
  },
  {
    icon: Layers,
    title: "4. UI/UX Design",
    desc: "Translating architecture maps into wireframes, high-fidelity prototypes, and design tokens built for optimal accessibility and user retention.",
    deliverable: "Figma Interactive Prototypes & Visual Style Guide"
  },
  {
    icon: Code,
    title: "5. Development",
    desc: "Our engineering squad compiles modular, performant source code following strict repository policies, automated test suites, and microservices guidelines.",
    deliverable: "Alpha/Beta Version & CI/CD Pipelines Configuration"
  },
  {
    icon: ShieldCheck,
    title: "6. QA & Testing",
    desc: "End-to-end user testing, integration checks, automated security scans, load performance validations, and cross-browser responsiveness checks.",
    deliverable: "Audit QA Reports & Stress Testing Metrics Logs"
  },
  {
    icon: Rocket,
    title: "7. Deployment",
    desc: "Deploying code structures to production clusters on AWS, Azure, or Google Cloud under strict load balancing rules and zero-downtime guidelines.",
    deliverable: "Live Production Launch & Operational Runbooks"
  },
  {
    icon: LifeBuoy,
    title: "8. Support",
    desc: "24/7 infrastructure monitoring, database backups, security patch updates, and ongoing iterative improvements to scale with user load.",
    deliverable: "Monthly Maintenance SLA Logs & User Analytics Reviews"
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
                    <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: '#2563EB', fontWeight: 700, letterSpacing: '0.5px' }}>
                      Key Deliverable
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
