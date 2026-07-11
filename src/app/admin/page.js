'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Laptop, 
  Smartphone, 
  Trash2, 
  Save, 
  Check, 
  Settings, 
  RefreshCw, 
  Eye,
  Layers,
  GripVertical,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Sparkles,
  ArrowRight,
  Menu,
  Sliders,
  ChevronDown,
  ChevronUp,
  Maximize2
} from 'lucide-react';
import DashboardMockup from '../../components/DashboardMockup';
import ProcessTimeline from '../../components/ProcessTimeline';

// PAGE LAYOUT TEMPLATES WITH DETAILED STYLE PROPERTIES FOR ALL PARAMETERS
const PAGE_TEMPLATES = {
  home: [
    {
      id: 'h-header',
      type: 'header',
      name: 'Navigation Bar',
      padding: 'small',
      bgTheme: 'dark',
      glowStrength: 0,
      elements: [
        { 
          id: 'hdr-logo', type: 'logo', src: '/assets/logo-dark.png', align: 'left',
          styles: { width: 120, height: 40, marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0, borderRadius: 0 }
        },
        { 
          id: 'hdr-links', type: 'nav-links', links: ['HOME', 'SERVICES', 'OUR PRODUCTS', 'ABOUT US', 'CONTACT US'], align: 'center',
          styles: { fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', letterSpacing: 1, lineHeight: 1.5, marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, paddingTop: 4, paddingBottom: 4, paddingLeft: 8, paddingRight: 8, borderRadius: 0 }
        },
        { 
          id: 'hdr-cta', type: 'nav-cta', text: 'GET FREE CONSULTATION', align: 'right',
          styles: { fontSize: 12, fontWeight: 500, color: '#FFFFFF', letterSpacing: 1, lineHeight: 1.5, marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, paddingTop: 8, paddingBottom: 8, paddingLeft: 18, paddingRight: 18, borderRadius: 30 }
        }
      ]
    },
    {
      id: 'h-hero',
      type: 'hero',
      name: '1. Hero Section',
      padding: 'large',
      bgTheme: 'blue-glow',
      glowStrength: 3,
      elements: [
        { 
          id: 'hero-badge', type: 'badge', text: 'Next-Gen Software Engineering', align: 'center',
          styles: { fontSize: 12, fontWeight: 600, color: '#2563EB', letterSpacing: 0.5, lineHeight: 1.5, marginTop: 0, marginBottom: 12, marginLeft: 0, marginRight: 0, paddingTop: 6, paddingBottom: 6, paddingLeft: 16, paddingRight: 16, borderRadius: 9999 }
        },
        { 
          id: 'hero-title', type: 'title', text: 'Enterprise Software. Exceptional Experiences. Real Business Growth.', align: 'center',
          styles: { fontSize: 44, fontWeight: 800, color: '#FFFFFF', letterSpacing: -1, lineHeight: 1.15, marginTop: 0, marginBottom: 12, marginLeft: 0, marginRight: 0, paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0, borderRadius: 0 }
        },
        { 
          id: 'hero-tagline', type: 'tagline', text: 'We design, build and scale custom digital products that resolve operational bottlenecks, automate legacy processes and drive measurable performance metrics.', align: 'center',
          styles: { fontSize: 16, fontWeight: 400, color: '#A0AEC0', letterSpacing: 0, lineHeight: 1.6, width: 620, height: 100, marginTop: 0, marginBottom: 20, marginLeft: 0, marginRight: 0, paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0, borderRadius: 0 }
        },
        { 
          id: 'hero-ctas', type: 'ctas', primaryText: 'Start Your Project', secondaryText: 'Explore Our Solutions', align: 'center',
          styles: { fontSize: 14, fontWeight: 600, color: '#FFFFFF', letterSpacing: 0, lineHeight: 1.5, marginTop: 0, marginBottom: 24, marginLeft: 0, marginRight: 0, paddingTop: 14, paddingBottom: 14, paddingLeft: 28, paddingRight: 28, borderRadius: 12 }
        },
        { 
          id: 'hero-mockup', type: 'mockup', scale: 0.85, width: 800, height: 400, align: 'center',
          styles: { marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0, borderRadius: 0 }
        }
      ]
    },
    {
      id: 'h-marquee',
      type: 'marquee',
      name: '2. Tech Marquee Banner',
      padding: 'small',
      bgTheme: 'dark',
      glowStrength: 1,
      elements: [
        { 
          id: 'marq-text', type: 'text', text: 'Built With a Trusted Technology Stack', align: 'center',
          styles: { fontSize: 12, fontWeight: 700, color: '#718096', letterSpacing: 2, lineHeight: 1.5, marginTop: 0, marginBottom: 12, marginLeft: 0, marginRight: 0, paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0, borderRadius: 0 }
        },
        { 
          id: 'marq-track', type: 'track', align: 'center',
          styles: { marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0, borderRadius: 0 }
        }
      ]
    },
    {
      id: 'h-challenges',
      type: 'challenges',
      name: '3. Business Challenges',
      padding: 'medium',
      bgTheme: 'dark',
      glowStrength: 2,
      elements: [
        { 
          id: 'ch-label', type: 'label', text: 'Business Barriers', align: 'center',
          styles: { fontSize: 12, fontWeight: 700, color: '#2563EB', letterSpacing: 1.5, lineHeight: 1.5, marginTop: 0, marginBottom: 8, marginLeft: 0, marginRight: 0, paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0, borderRadius: 0 }
        },
        { 
          id: 'ch-title', type: 'title', text: 'Are you facing these digital scaling challenges?', align: 'center',
          styles: { fontSize: 32, fontWeight: 800, color: '#FFFFFF', letterSpacing: -0.5, lineHeight: 1.25, marginTop: 0, marginBottom: 12, marginLeft: 0, marginRight: 0, paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0, borderRadius: 0 }
        },
        { 
          id: 'ch-desc', type: 'desc', text: 'Enterprise software development shouldn\'t be a guessing game. We address your critical operational friction points first.', align: 'center',
          styles: { fontSize: 15, fontWeight: 400, color: '#A0AEC0', letterSpacing: 0, lineHeight: 1.6, width: 650, height: 80, marginTop: 0, marginBottom: 30, marginLeft: 0, marginRight: 0, paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0, borderRadius: 0 }
        },
        { 
          id: 'ch-grid', type: 'barriers-grid', align: 'center',
          styles: { marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, paddingTop: 20, paddingBottom: 20, paddingLeft: 20, paddingRight: 20, borderRadius: 12 }
        }
      ]
    },
    {
      id: 'h-services',
      type: 'services',
      name: '4. Capabilities Grid',
      padding: 'medium',
      bgTheme: 'minimal-border',
      glowStrength: 2,
      elements: [
        { 
          id: 'serv-label', type: 'label', text: 'Our Capabilities', align: 'center',
          styles: { fontSize: 12, fontWeight: 700, color: '#2563EB', letterSpacing: 1.5, lineHeight: 1.5, marginTop: 0, marginBottom: 8, marginLeft: 0, marginRight: 0, paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0, borderRadius: 0 }
        },
        { 
          id: 'serv-title', type: 'title', text: 'Grouped Capabilities. High-Performance Execution.', align: 'center',
          styles: { fontSize: 32, fontWeight: 800, color: '#FFFFFF', letterSpacing: -0.5, lineHeight: 1.25, marginTop: 0, marginBottom: 12, marginLeft: 0, marginRight: 0, paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0, borderRadius: 0 }
        },
        { 
          id: 'serv-desc', type: 'desc', text: 'We compile robust code blocks and layout frameworks organized into specialized engineering divisions.', align: 'center',
          styles: { fontSize: 15, fontWeight: 400, color: '#A0AEC0', letterSpacing: 0, lineHeight: 1.6, width: 650, height: 80, marginTop: 0, marginBottom: 30, marginLeft: 0, marginRight: 0, paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0, borderRadius: 0 }
        },
        { 
          id: 'serv-grid', type: 'grid', cardWidth: 320, align: 'center',
          styles: { marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, paddingTop: 20, paddingBottom: 20, paddingLeft: 20, paddingRight: 20, borderRadius: 12 }
        }
      ]
    },
    {
      id: 'h-products',
      type: 'products',
      name: '5. Holographic SaaS Products',
      padding: 'medium',
      bgTheme: 'dark',
      glowStrength: 2,
      elements: [
        { 
          id: 'prod-label', type: 'label', text: 'Product Suite', align: 'center',
          styles: { fontSize: 12, fontWeight: 700, color: '#2563EB', letterSpacing: 1.5, lineHeight: 1.5, marginTop: 0, marginBottom: 8, marginLeft: 0, marginRight: 0, paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0, borderRadius: 0 }
        },
        { 
          id: 'prod-title', type: 'title', text: 'Holographic SaaS Products', align: 'center',
          styles: { fontSize: 32, fontWeight: 800, color: '#FFFFFF', letterSpacing: -0.5, lineHeight: 1.25, marginTop: 0, marginBottom: 12, marginLeft: 0, marginRight: 0, paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0, borderRadius: 0 }
        },
        { 
          id: 'prod-desc', type: 'desc', text: 'Pre-engineered white-label core architectures deployed and configured to match your company\'s workflows.', align: 'center',
          styles: { fontSize: 15, fontWeight: 400, color: '#A0AEC0', letterSpacing: 0, lineHeight: 1.6, width: 650, height: 80, marginTop: 0, marginBottom: 30, marginLeft: 0, marginRight: 0, paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0, borderRadius: 0 }
        },
        { 
          id: 'prod-grid', type: 'products-grid', align: 'center',
          styles: { marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, paddingTop: 24, paddingBottom: 24, paddingLeft: 24, paddingRight: 24, borderRadius: 12 }
        }
      ]
    },
    {
      id: 'h-timeline',
      type: 'timeline',
      name: '6. Process Timeline',
      padding: 'large',
      bgTheme: 'dark',
      glowStrength: 2,
      elements: [
        { 
          id: 'time-label', type: 'label', text: 'Our Framework', align: 'center',
          styles: { fontSize: 12, fontWeight: 700, color: '#2563EB', letterSpacing: 1.5, lineHeight: 1.5, marginTop: 0, marginBottom: 8, marginLeft: 0, marginRight: 0, paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0, borderRadius: 0 }
        },
        { 
          id: 'time-title', type: 'title', text: 'Agile Development Journey', align: 'center',
          styles: { fontSize: 32, fontWeight: 800, color: '#FFFFFF', letterSpacing: -0.5, lineHeight: 1.25, marginTop: 0, marginBottom: 12, marginLeft: 0, marginRight: 0, paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0, borderRadius: 0 }
        },
        { 
          id: 'time-desc', type: 'desc', text: 'We follow a disciplined 8-step engineering standard to deliver codebases on fixed-milestones.', align: 'center',
          styles: { fontSize: 15, fontWeight: 400, color: '#A0AEC0', letterSpacing: 0, lineHeight: 1.6, width: 650, height: 80, marginTop: 0, marginBottom: 40, marginLeft: 0, marginRight: 0, paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0, borderRadius: 0 }
        },
        { 
          id: 'time-timeline', type: 'timeline', align: 'center',
          styles: { marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0, borderRadius: 0 }
        }
      ]
    },
    {
      id: 'h-case-study',
      type: 'case-showcase',
      name: '7. Featured Case Study',
      padding: 'medium',
      bgTheme: 'minimal-border',
      glowStrength: 2,
      elements: [
        { 
          id: 'cs-label', type: 'label', text: 'Featured Case Study', align: 'center',
          styles: { fontSize: 12, fontWeight: 700, color: '#2563EB', letterSpacing: 1.5, lineHeight: 1.5, marginTop: 0, marginBottom: 8, marginLeft: 0, marginRight: 0, paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0, borderRadius: 0 }
        },
        { 
          id: 'cs-title', type: 'title', text: 'Scalable Digital Architecture in Practice', align: 'center',
          styles: { fontSize: 32, fontWeight: 800, color: '#FFFFFF', letterSpacing: -0.5, lineHeight: 1.25, marginTop: 0, marginBottom: 12, marginLeft: 0, marginRight: 0, paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0, borderRadius: 0 }
        },
        { 
          id: 'cs-tagline', type: 'tagline', text: 'How we solved manual overhead cycles for a prominent educational system.', align: 'center',
          styles: { fontSize: 15, fontWeight: 400, color: '#A0AEC0', letterSpacing: 0, lineHeight: 1.6, width: 650, height: 80, marginTop: 0, marginBottom: 30, marginLeft: 0, marginRight: 0, paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0, borderRadius: 0 }
        },
        { 
          id: 'cs-card', type: 'case-card', align: 'center',
          styles: { marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, paddingTop: 30, paddingBottom: 30, paddingLeft: 30, paddingRight: 30, borderRadius: 16 }
        }
      ]
    },
    {
      id: 'h-industries',
      type: 'industries',
      name: '8. Industries Served',
      padding: 'medium',
      bgTheme: 'dark',
      glowStrength: 2,
      elements: [
        { 
          id: 'ind-label', type: 'label', text: 'Domain Expertise', align: 'center',
          styles: { fontSize: 12, fontWeight: 700, color: '#2563EB', letterSpacing: 1.5, lineHeight: 1.5, marginTop: 0, marginBottom: 8, marginLeft: 0, marginRight: 0, paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0, borderRadius: 0 }
        },
        { 
          id: 'ind-title', type: 'title', text: 'Outcome-Focused Industries', align: 'center',
          styles: { fontSize: 32, fontWeight: 800, color: '#FFFFFF', letterSpacing: -0.5, lineHeight: 1.25, marginTop: 0, marginBottom: 12, marginLeft: 0, marginRight: 0, paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0, borderRadius: 0 }
        },
        { 
          id: 'ind-desc', type: 'desc', text: 'We adapt software structures to meet compliance frameworks and user models of specific sectors.', align: 'center',
          styles: { fontSize: 15, fontWeight: 400, color: '#A0AEC0', letterSpacing: 0, lineHeight: 1.6, width: 650, height: 80, marginTop: 0, marginBottom: 30, marginLeft: 0, marginRight: 0, paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0, borderRadius: 0 }
        },
        { 
          id: 'ind-grid', type: 'industries-grid', align: 'center',
          styles: { marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, paddingTop: 20, paddingBottom: 20, paddingLeft: 20, paddingRight: 20, borderRadius: 10 }
        }
      ]
    },
    {
      id: 'h-advantages',
      type: 'advantages',
      name: '9. Comparison Advantages',
      padding: 'medium',
      bgTheme: 'minimal-border',
      glowStrength: 2,
      elements: [
        { 
          id: 'adv-label', type: 'label', text: 'Operational Strategy', align: 'center',
          styles: { fontSize: 12, fontWeight: 700, color: '#2563EB', letterSpacing: 1.5, lineHeight: 1.5, marginTop: 0, marginBottom: 8, marginLeft: 0, marginRight: 0, paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0, borderRadius: 0 }
        },
        { 
          id: 'adv-title', type: 'title', text: 'Measurable Advantages', align: 'center',
          styles: { fontSize: 32, fontWeight: 800, color: '#FFFFFF', letterSpacing: -0.5, lineHeight: 1.25, marginTop: 0, marginBottom: 12, marginLeft: 0, marginRight: 0, paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0, borderRadius: 0 }
        },
        { 
          id: 'adv-desc', type: 'desc', text: 'Compare how we structure development cycles compared to legacy outsourced IT agencies.', align: 'center',
          styles: { fontSize: 15, fontWeight: 400, color: '#A0AEC0', letterSpacing: 0, lineHeight: 1.6, width: 650, height: 80, marginTop: 0, marginBottom: 30, marginLeft: 0, marginRight: 0, paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0, borderRadius: 0 }
        },
        { 
          id: 'adv-table', type: 'table-comp', align: 'center',
          styles: { marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, paddingTop: 16, paddingBottom: 16, paddingLeft: 16, paddingRight: 16, borderRadius: 12 }
        }
      ]
    },
    {
      id: 'h-philosophy',
      type: 'philosophy',
      name: '10. Vision & Philosophy',
      padding: 'medium',
      bgTheme: 'blue-glow',
      glowStrength: 3,
      elements: [
        { 
          id: 'ph-label', type: 'label', text: 'Engineering Philosophy', align: 'center',
          styles: { fontSize: 12, fontWeight: 700, color: '#2563EB', letterSpacing: 1, lineHeight: 1.5, marginTop: 0, marginBottom: 12, marginLeft: 0, marginRight: 0, paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0, borderRadius: 0 }
        },
        { 
          id: 'ph-quote', type: 'title', text: '"We believe enterprise software should be measured by business speed metrics, security, and scalability—not lines of code."', align: 'center',
          styles: { fontSize: 24, fontWeight: 800, color: '#FFFFFF', letterSpacing: 0, lineHeight: 1.3, marginTop: 0, marginBottom: 16, marginLeft: 0, marginRight: 0, paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0, borderRadius: 0 }
        },
        { 
          id: 'ph-desc', type: 'tagline', text: 'Our founding team established Awenue to solve a major operational gap: many development houses deliver features that look good but buckle under database load or fail compliance audits. We build digital architectures aligned to support enterprise transactions from step one.', align: 'center',
          styles: { fontSize: 15, fontWeight: 400, color: '#A0AEC0', letterSpacing: 0, lineHeight: 1.6, width: 750, height: 100, marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0, borderRadius: 0 }
        }
      ]
    },
    {
      id: 'h-faq',
      type: 'faq',
      name: '11. FAQ Accordion',
      padding: 'medium',
      bgTheme: 'dark',
      glowStrength: 2,
      elements: [
        { 
          id: 'faq-label', type: 'label', text: 'Help Center', align: 'center',
          styles: { fontSize: 12, fontWeight: 700, color: '#2563EB', letterSpacing: 1.5, lineHeight: 1.5, marginTop: 0, marginBottom: 8, marginLeft: 0, marginRight: 0, paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0, borderRadius: 0 }
        },
        { 
          id: 'faq-title', type: 'title', text: 'Frequently Asked Questions', align: 'center',
          styles: { fontSize: 32, fontWeight: 800, color: '#FFFFFF', letterSpacing: -0.5, lineHeight: 1.25, marginTop: 0, marginBottom: 12, marginLeft: 0, marginRight: 0, paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0, borderRadius: 0 }
        },
        { 
          id: 'faq-desc', type: 'desc', text: 'Key scoping details startup founders and enterprise CTOs clarify before initiating builds.', align: 'center',
          styles: { fontSize: 15, fontWeight: 400, color: '#A0AEC0', letterSpacing: 0, lineHeight: 1.6, width: 650, height: 80, marginTop: 0, marginBottom: 30, marginLeft: 0, marginRight: 0, paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0, borderRadius: 0 }
        },
        { 
          id: 'faq-list', type: 'accordion', align: 'center',
          styles: { marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0, borderRadius: 0 }
        }
      ]
    },
    {
      id: 'h-cta',
      type: 'cta',
      name: '12. Final Call-To-Action',
      padding: 'large',
      bgTheme: 'blue-glow',
      glowStrength: 4,
      elements: [
        { 
          id: 'fc-title', type: 'title', text: 'Ready to Build Your Next Digital Product?', align: 'center',
          styles: { fontSize: 38, fontWeight: 800, color: '#FFFFFF', letterSpacing: 0, lineHeight: 1.25, marginTop: 0, marginBottom: 16, marginLeft: 0, marginRight: 0, paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0, borderRadius: 0 }
        },
        { 
          id: 'fc-tagline', type: 'tagline', text: 'Let\'s discuss your operational bottleneck cycles, system parameters, and construct software modules that deliver real business growth.', align: 'center',
          styles: { fontSize: 16, fontWeight: 400, color: '#A0AEC0', letterSpacing: 0, lineHeight: 1.6, width: 580, height: 80, marginTop: 0, marginBottom: 24, marginLeft: 0, marginRight: 0, paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0, borderRadius: 0 }
        },
        { 
          id: 'fc-button', type: 'cta', text: 'Schedule a Consultation', align: 'center',
          styles: { fontSize: 15, fontWeight: 600, color: '#FFFFFF', letterSpacing: 0, lineHeight: 1.5, marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, paddingTop: 14, paddingBottom: 14, paddingLeft: 28, paddingRight: 28, borderRadius: 12 }
        }
      ]
    },
    {
      id: 'h-footer',
      type: 'footer',
      name: 'Site Footer',
      padding: 'medium',
      bgTheme: 'dark',
      glowStrength: 0,
      elements: [
        { 
          id: 'ftr-logo', type: 'logo', src: '/assets/logo-dark.png', align: 'left',
          styles: { width: 100, height: 32, marginTop: 0, marginBottom: 10, marginLeft: 0, marginRight: 0, paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0, borderRadius: 0 }
        },
        { 
          id: 'ftr-copy', type: 'text', text: '© 2026 Awenue Global Software Solutions. All rights reserved.', align: 'right',
          styles: { fontSize: 12, fontWeight: 400, color: 'rgba(255,255,255,0.4)', letterSpacing: 0, lineHeight: 1.5, marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0, borderRadius: 0 }
        }
      ]
    }
  ],
  services: [
    {
      id: 's-header',
      type: 'header',
      name: 'Navigation Bar',
      padding: 'small',
      bgTheme: 'dark',
      glowStrength: 0,
      elements: [
        { 
          id: 'sh-logo', type: 'logo', src: '/assets/logo-dark.png', align: 'left',
          styles: { width: 120, height: 40, marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0, borderRadius: 0 }
        },
        { 
          id: 'sh-links', type: 'nav-links', links: ['HOME', 'SERVICES', 'OUR PRODUCTS', 'ABOUT US', 'CONTACT US'], align: 'center',
          styles: { fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', letterSpacing: 1, lineHeight: 1.5, marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, paddingTop: 4, paddingBottom: 4, paddingLeft: 8, paddingRight: 8, borderRadius: 0 }
        },
        { 
          id: 'sh-cta', type: 'nav-cta', text: 'GET FREE CONSULTATION', align: 'right',
          styles: { fontSize: 12, fontWeight: 500, color: '#FFFFFF', letterSpacing: 1, lineHeight: 1.5, marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, paddingTop: 8, paddingBottom: 8, paddingLeft: 18, paddingRight: 18, borderRadius: 30 }
        }
      ]
    },
    {
      id: 's-hero',
      type: 'hero',
      name: 'Services Hero Section',
      padding: 'large',
      bgTheme: 'purple-gradient',
      glowStrength: 2,
      elements: [
        { 
          id: 'sh-badge', type: 'badge', text: 'Our Capabilities', align: 'center',
          styles: { fontSize: 12, fontWeight: 600, color: '#2563EB', letterSpacing: 0.5, lineHeight: 1.5, marginTop: 0, marginBottom: 12, marginLeft: 0, marginRight: 0, paddingTop: 6, paddingBottom: 6, paddingLeft: 16, paddingRight: 16, borderRadius: 9999 }
        },
        { 
          id: 'sh-title', type: 'title', text: 'Software Engineering & Digital Transformation', align: 'center',
          styles: { fontSize: 44, fontWeight: 800, color: '#FFFFFF', letterSpacing: -1, lineHeight: 1.15, marginTop: 0, marginBottom: 12, marginLeft: 0, marginRight: 0, paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0, borderRadius: 0 }
        },
        { 
          id: 'sh-tagline', type: 'tagline', text: 'We construct secure serverless engines, database architectures, and custom digital portals.', align: 'center',
          styles: { fontSize: 16, fontWeight: 400, color: '#A0AEC0', letterSpacing: 0, lineHeight: 1.6, width: 620, height: 100, marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0, borderRadius: 0 }
        }
      ]
    },
    {
      id: 's-grid',
      type: 'services',
      name: 'Capabilities Grid',
      padding: 'medium',
      bgTheme: 'minimal-border',
      glowStrength: 2,
      elements: [
        { 
          id: 'sg-title', type: 'title', text: 'High-Performance Operations', align: 'center',
          styles: { fontSize: 32, fontWeight: 800, color: '#FFFFFF', letterSpacing: -0.5, lineHeight: 1.25, marginTop: 0, marginBottom: 30, marginLeft: 0, marginRight: 0, paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0, borderRadius: 0 }
        },
        { 
          id: 'sg-grid', type: 'grid', cardWidth: 320, align: 'center',
          styles: { marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, paddingTop: 20, paddingBottom: 20, paddingLeft: 20, paddingRight: 20, borderRadius: 12 }
        }
      ]
    },
    {
      id: 's-footer',
      type: 'footer',
      name: 'Site Footer',
      padding: 'medium',
      bgTheme: 'dark',
      glowStrength: 0,
      elements: [
        { 
          id: 'sf-logo', type: 'logo', src: '/assets/logo-dark.png', align: 'left',
          styles: { width: 100, height: 32, marginTop: 0, marginBottom: 10, marginLeft: 0, marginRight: 0, paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0, borderRadius: 0 }
        },
        { 
          id: 'sf-copy', type: 'text', text: '© 2026 Awenue Global Software Solutions. All rights reserved.', align: 'right',
          styles: { fontSize: 12, fontWeight: 400, color: 'rgba(255,255,255,0.4)', letterSpacing: 0, lineHeight: 1.5, marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0, borderRadius: 0 }
        }
      ]
    }
  ]
};

export default function AdminPage() {
  const [currentPage, setCurrentPage] = useState('home');
  const [sections, setSections] = useState(PAGE_TEMPLATES.home);
  
  const [activeSectionId, setActiveSectionId] = useState('h-hero');
  const [activeElementId, setActiveElementId] = useState('hero-title');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  
  const [viewMode, setViewMode] = useState('desktop'); 
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployStep, setDeployStep] = useState(0);
  const [logs, setLogs] = useState([]);
  
  // Sidebars toggle states
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);

  // Drag & Drop states
  const [draggedElementId, setDraggedElementId] = useState(null);
  const [draggedSectionId, setDraggedSectionId] = useState(null);
  const [dragOverElementId, setDragOverElementId] = useState(null);

  // Mouse-Drag Resizing State for multidirectional dragging
  const [resizingElement, setResizingElement] = useState(null); // { sectionId, elementId, startX, startY, startVal, type: 'width'|'height'|'fontSize'|'scale' }

  const canvasRef = useRef(null);

  // Active section / sub-element finders
  const activeSection = sections.find(s => s.id === activeSectionId) || null;
  const activeElement = activeSection ? activeSection.elements.find(e => e.id === activeElementId) : null;

  // Auto-collapse sidebars when viewing desktop, open on phone view
  useEffect(() => {
    if (viewMode === 'desktop') {
      setLeftSidebarOpen(false);
      setRightSidebarOpen(false);
    } else {
      setLeftSidebarOpen(true);
      setRightSidebarOpen(true);
    }
  }, [viewMode]);

  // Global mousemove & mouseup listeners for resize handles
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!resizingElement) return;
      const { sectionId, elementId, startX, startY, startVal, type } = resizingElement;

      setSections(prevSections => prevSections.map(sec => {
        if (sec.id === sectionId) {
          const updatedElements = sec.elements.map(el => {
            if (el.id === elementId) {
              const styles = { ...el.styles };

              if (type === 'width') {
                const deltaX = e.clientX - startX;
                styles.width = Math.max(40, startVal + deltaX);
              } else if (type === 'height') {
                const deltaY = e.clientY - startY;
                styles.height = Math.max(10, startVal + deltaY);
              } else if (type === 'fontSize') {
                const deltaY = startY - e.clientY;
                styles.fontSize = Math.max(8, Math.min(120, startVal + deltaY * 0.4));
              } else if (type === 'scale') {
                const deltaY = e.clientY - startY;
                return { ...el, scale: parseFloat(Math.max(0.3, Math.min(2.0, startVal + deltaY * 0.002)).toFixed(2)) };
              }

              return { ...el, styles };
            }
            return el;
          });
          return { ...sec, elements: updatedElements };
        }
        return sec;
      }));
    };

    const handleMouseUp = () => {
      setResizingElement(null);
    };

    if (resizingElement) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [resizingElement]);

  const startResize = (e, sectionId, elementId, type, startVal) => {
    e.stopPropagation();
    e.preventDefault();
    setResizingElement({
      sectionId,
      elementId,
      startX: e.clientX,
      startY: e.clientY,
      startVal,
      type
    });
  };

  // Switch page in builder
  const handlePageChange = (pageName) => {
    setCurrentPage(pageName);
    const template = PAGE_TEMPLATES[pageName];
    setSections(template);
    
    // Auto focus the primary text element
    if (template && template.length > 1) {
      setActiveSectionId(template[1].id);
      if (template[1].elements.length > 1) {
        setActiveElementId(template[1].elements[1].id);
      }
    }
  };

  // --- DRAG AND DROP HANDLERS FOR CANVAS SUB-ELEMENTS ---
  const handleElementDragStart = (e, sectionId, elementId) => {
    setDraggedSectionId(sectionId);
    setDraggedElementId(elementId);
    e.dataTransfer.setData('source', 'sub-element');
    e.dataTransfer.setData('sectionId', sectionId);
    e.dataTransfer.setData('elementId', elementId);
  };

  const handleElementDragOver = (e, targetElementId) => {
    e.preventDefault();
    setDragOverElementId(targetElementId);
  };

  const handleElementDrop = (e, sectionId, targetElementId) => {
    e.preventDefault();
    const source = e.dataTransfer.getData('source');
    const sourceSectionId = e.dataTransfer.getData('sectionId');
    const sourceElementId = e.dataTransfer.getData('elementId');

    if (source === 'sub-element' && sourceSectionId === sectionId) {
      const section = sections.find(s => s.id === sectionId);
      if (!section) return;

      const elements = [...section.elements];
      const originalIdx = elements.findIndex(el => el.id === sourceElementId);
      const targetIdx = elements.findIndex(el => el.id === targetElementId);

      if (originalIdx !== -1 && targetIdx !== -1) {
        const [removed] = elements.splice(originalIdx, 1);
        elements.splice(targetIdx, 0, removed);

        setSections(sections.map(s => {
          if (s.id === sectionId) {
            return { ...s, elements };
          }
          return s;
        }));
      }
    }

    setDraggedElementId(null);
    setDraggedSectionId(null);
    setDragOverElementId(null);
  };

  // Update Section Meta
  const updateSectionMeta = (key, value) => {
    setSections(sections.map(s => {
      if (s.id === activeSectionId) {
        return { ...s, [key]: value };
      }
      return s;
    }));
  };

  // Update Sub-element style properties
  const updateStyleProp = (key, value) => {
    setSections(sections.map(s => {
      if (s.id === activeSectionId) {
        const elements = s.elements.map(el => {
          if (el.id === activeElementId) {
            const styles = { ...el.styles, [key]: value };
            return { ...el, styles };
          }
          return el;
        });
        return { ...s, elements };
      }
      return s;
    }));
  };

  const updateSubElementMeta = (key, value) => {
    setSections(sections.map(s => {
      if (s.id === activeSectionId) {
        const elements = s.elements.map(el => {
          if (el.id === activeElementId) {
            return { ...el, [key]: value };
          }
          return el;
        });
        return { ...s, elements };
      }
      return s;
    }));
  };

  const handleInlineEdit = (sectionId, key, e) => {
    const value = e.currentTarget.textContent;
    setSections(sections.map(s => {
      if (s.id === sectionId) {
        const elements = s.elements.map(el => {
          if (el.id === activeElementId) {
            return { ...el, [key]: value };
          }
          return el;
        });
        return { ...s, elements };
      }
      return s;
    }));
  };

  // Deploy simulation console flow
  const deploySteps = [
    'Initializing Next.js Edge build configuration...',
    `Compiling routes for page: /${currentPage === 'home' ? '' : currentPage}...`,
    'Parsing dynamic page routes and layout schema structures...',
    'Bundling CSS variables and inline dynamic sizing matrices...',
    'Executing automated integration unit tests... [PASS]',
    'Pushing layout updates to production AWS clusters...',
    'SUCCESS: Layout deployed successfully!'
  ];

  const handleDeploy = () => {
    setIsDeploying(true);
    setDeployStep(0);
    setLogs([]);
  };

  useEffect(() => {
    if (!isDeploying) return;
    if (deployStep < deploySteps.length) {
      const timer = setTimeout(() => {
        setLogs(prev => [...prev, deploySteps[deployStep]]);
        setDeployStep(prev => prev + 1);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      const endTimer = setTimeout(() => {
        setIsDeploying(false);
      }, 1500);
      return () => clearTimeout(endTimer);
    }
  }, [isDeploying, deployStep]);

  // Style helper converters
  const getPaddingClass = (padding) => {
    switch (padding) {
      case 'small': return { paddingTop: '24px', paddingBottom: '24px' };
      case 'medium': return { paddingTop: '80px', paddingBottom: '80px' };
      case 'large': return { paddingTop: '140px', paddingBottom: '140px' };
      default: return { paddingTop: '80px', paddingBottom: '80px' };
    }
  };

  const getBackgroundStyle = (theme, glow) => {
    const shadowColor = '0 10px 40px rgba(0, 0, 0, 0.4)';
    const glowShadow = glow > 0 ? `, 0 0 ${glow * 10}px rgba(37, 99, 235, ${glow * 0.08})` : '';

    switch (theme) {
      case 'dark':
        return {
          background: '#040713',
          borderTop: '1px solid rgba(255, 255, 255, 0.04)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
          boxShadow: shadowColor + glowShadow
        };
      case 'blue-glow':
        return {
          background: `radial-gradient(circle at center, rgba(37,99,235,0.06) 0%, #040713 85%)`,
          borderTop: '1px solid rgba(37, 99, 235, 0.2)',
          borderBottom: '1px solid rgba(37, 99, 235, 0.2)',
          boxShadow: shadowColor + glowShadow
        };
      case 'purple-gradient':
        return {
          background: `linear-gradient(135deg, rgba(147,51,234,0.04) 0%, #040713 100%)`,
          borderTop: '1px solid rgba(147, 51, 234, 0.15)',
          borderBottom: '1px solid rgba(147, 51, 234, 0.15)',
          boxShadow: shadowColor + glowShadow
        };
      case 'minimal-border':
        return {
          background: 'transparent',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: shadowColor + glowShadow
        };
      default:
        return {
          background: '#040713',
          boxShadow: shadowColor
        };
    }
  };

  // Convert element styles into inline React style attributes
  const buildInlineStyles = (element, flexAlign, isElActive) => {
    const s = element.styles || {};
    return {
      fontSize: s.fontSize ? `${s.fontSize}px` : undefined,
      fontWeight: s.fontWeight || undefined,
      color: s.color || undefined,
      lineHeight: s.lineHeight || undefined,
      letterSpacing: s.letterSpacing ? `${s.letterSpacing}px` : undefined,
      
      width: s.width ? `${s.width}px` : 'auto',
      height: s.height ? `${s.height}px` : 'auto',
      
      marginTop: s.marginTop !== undefined ? `${s.marginTop}px` : undefined,
      marginBottom: s.marginBottom !== undefined ? `${s.marginBottom}px` : '12px',
      marginLeft: s.marginLeft !== undefined ? `${s.marginLeft}px` : undefined,
      marginRight: s.marginRight !== undefined ? `${s.marginRight}px` : undefined,
      
      paddingTop: s.paddingTop !== undefined ? `${s.paddingTop}px` : undefined,
      paddingBottom: s.paddingBottom !== undefined ? `${s.paddingBottom}px` : undefined,
      paddingLeft: s.paddingLeft !== undefined ? `${s.paddingLeft}px` : undefined,
      paddingRight: s.paddingRight !== undefined ? `${s.paddingRight}px` : undefined,
      
      borderRadius: s.borderRadius !== undefined ? `${s.borderRadius}px` : undefined,
      
      outline: 'none',
      border: isElActive ? '1.5px solid #2563EB' : '1.5px dashed transparent',
      transition: 'border-color 0.2s',
      position: 'relative'
    };
  };

  return (
    <div className="admin-builder-dashboard" style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      backgroundColor: '#03050a',
      color: '#F8FAFC',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      overflow: 'hidden',
      position: 'relative'
    }}>
      
      {/* 1. TOP BUILDER BAR */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 24px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        background: 'rgba(5, 8, 16, 0.85)',
        backdropFilter: 'blur(20px)',
        zIndex: 50
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Left Sidebar toggle */}
          <button 
            onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '8px',
              padding: '6px 10px',
              color: '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Menu style={{ width: '16px', height: '16px' }} />
          </button>

          <div style={{
            background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '1.1rem',
            color: '#FFFFFF'
          }}>A</div>
          
          {/* Page Routing Selector Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '6px' }}>
            <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>Page:</span>
            <select
              value={currentPage}
              onChange={(e) => handlePageChange(e.target.value)}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '8px',
                padding: '6px 12px',
                color: '#FFFFFF',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="home" style={{ background: '#05070f' }}>Home Redesign</option>
              <option value="services" style={{ background: '#05070f' }}>Services Page</option>
            </select>
          </div>
        </div>

        {/* Viewport Toggles */}
        <div style={{
          display: 'flex',
          background: 'rgba(255, 255, 255, 0.03)',
          borderRadius: '30px',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          padding: '4px'
        }}>
          <button 
            onClick={() => setViewMode('desktop')}
            style={{
              background: viewMode === 'desktop' ? 'rgba(255,255,255,0.06)' : 'transparent',
              border: 'none',
              borderRadius: '20px',
              padding: '6px 16px',
              color: viewMode === 'desktop' ? '#FFFFFF' : 'rgba(255,255,255,0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: 600,
              transition: 'all 0.2s'
            }}
          >
            <Laptop style={{ width: '14px', height: '14px' }} />
            Desktop View
          </button>
          <button 
            onClick={() => setViewMode('phone')}
            style={{
              background: viewMode === 'phone' ? 'rgba(255,255,255,0.06)' : 'transparent',
              border: 'none',
              borderRadius: '20px',
              padding: '6px 16px',
              color: viewMode === 'phone' ? '#FFFFFF' : 'rgba(255,255,255,0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: 600,
              transition: 'all 0.2s'
            }}
          >
            <Smartphone style={{ width: '14px', height: '14px' }} />
            Phone View
          </button>
        </div>

        {/* Action CTAs */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Link href="/" style={{
            background: 'transparent',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '10px',
            padding: '8px 16px',
            color: '#FFFFFF',
            fontSize: '0.85rem',
            fontWeight: 600,
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Eye style={{ width: '14px', height: '14px' }} />
            Live Site
          </Link>
          <button 
            onClick={handleDeploy}
            style={{
              background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
              border: 'none',
              borderRadius: '10px',
              padding: '8px 20px',
              color: '#FFFFFF',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 0 15px rgba(37,99,235,0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Save style={{ width: '14px', height: '14px' }} />
            Save & Deploy
          </button>

          {/* Right sidebar toggle */}
          <button 
            onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '8px',
              padding: '6px 10px',
              color: '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: '6px'
            }}
          >
            <Settings style={{ width: '16px', height: '16px' }} />
          </button>
        </div>
      </header>

      {/* 2. MAIN WORKSPACE CONTAINER */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' }}>
        
        {/* LEFT SECTIONS OUTLINE LIST */}
        <aside style={{
          width: leftSidebarOpen ? '280px' : '0px',
          opacity: leftSidebarOpen ? 1 : 0,
          borderRight: leftSidebarOpen ? '1px solid rgba(255, 255, 255, 0.06)' : 'none',
          background: 'rgba(3, 5, 10, 0.75)',
          padding: leftSidebarOpen ? '24px' : '0px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          zIndex: 40
        }}>
          {leftSidebarOpen && (
            <>
              <div>
                <h2 style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: '#2563EB', marginBottom: '4px' }}>Sections Outline</h2>
                <p style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.4)', lineHeight: 1.4 }}>
                  Select containers on the active page to adjust styles.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {sections.map((sec, idx) => (
                  <button
                    key={sec.id}
                    onClick={() => {
                      setActiveSectionId(sec.id);
                      if (sec.elements.length > 0) setActiveElementId(sec.elements[0].id);
                    }}
                    style={{
                      background: activeSectionId === sec.id ? 'rgba(37,99,235,0.08)' : 'rgba(255,255,255,0.02)',
                      border: activeSectionId === sec.id ? '1px solid #2563EB' : '1px solid rgba(255, 255, 255, 0.06)',
                      borderRadius: '8px',
                      padding: '12px 14px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      color: '#FFFFFF',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      transition: 'all 0.2s'
                    }}
                  >
                    {idx + 1}. {sec.name}
                  </button>
                ))}
              </div>
            </>
          )}
        </aside>

        {/* CENTER PREVIEW CANVAS */}
        <main style={{
          flex: 1,
          background: 'radial-gradient(circle at center, #070b16 0%, #020308 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: viewMode === 'desktop' ? '0' : '40px',
          overflowY: 'auto',
          position: 'relative',
          transition: 'padding 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          {/* Blueprint Grid Background Pattern */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.005) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.005) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            pointerEvents: 'none'
          }} />

          {/* DYNAMIC VIEWPORT FRAME WRAPPER */}
          <div 
            ref={canvasRef}
            style={{
              width: viewMode === 'phone' ? '375px' : '100%',
              maxWidth: viewMode === 'phone' ? '375px' : 'none',
              height: viewMode === 'phone' ? '760px' : '100%',
              minHeight: viewMode === 'phone' ? '760px' : '100%',
              background: '#020308',
              borderRadius: viewMode === 'phone' ? '24px' : '0',
              border: viewMode === 'phone' ? '12px solid #111422' : 'none',
              boxShadow: viewMode === 'phone' ? '0 30px 60px rgba(0, 0, 0, 0.75)' : 'none',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              scrollbarWidth: 'none'
            }}
          >
            {/* Mock iPhone Bezel Notch Header details */}
            {viewMode === 'phone' && (
              <div style={{
                position: 'sticky',
                top: 0,
                width: '100%',
                height: '32px',
                background: '#020308',
                zIndex: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 24px',
                fontSize: '0.65rem',
                color: 'rgba(255,255,255,0.4)',
                borderBottom: '1px solid rgba(255,255,255,0.03)',
                pointerEvents: 'none'
              }}>
                <span>9:41</span>
                <div style={{ width: '80px', height: '14px', background: '#111422', borderRadius: '0 0 10px 10px', position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)' }}></div>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <span>5G</span>
                  <span>100%</span>
                </div>
              </div>
            )}

            {/* Canvas Area Layout Flow */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0' }}>
              
              {sections.map((section) => {
                const isSecActive = section.id === activeSectionId;
                const paddingClass = getPaddingClass(section.padding);
                const bgDesign = getBackgroundStyle(section.bgTheme, section.glowStrength);

                return (
                  <div
                    key={section.id}
                    onClick={() => setActiveSectionId(section.id)}
                    style={{
                      position: 'relative',
                      ...paddingClass,
                      ...bgDesign,
                      borderTop: isSecActive ? '1px dashed #2563EB' : bgDesign.borderTop,
                      borderBottom: isSecActive ? '1px dashed #2563EB' : bgDesign.borderBottom,
                      transition: 'all 0.25s',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px'
                    }}
                  >
                    {/* Section container outline */}
                    <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
                      
                      {/* SUB-ELEMENTS INTERACTIVE STACK FLOW */}
                      {section.elements.map((element, elIdx) => {
                        const isElActive = activeElementId === element.id;
                        const elAlign = element.align || 'center';
                        
                        const flexAlign = elAlign === 'left' ? 'flex-start' : elAlign === 'right' ? 'flex-end' : 'center';
                        const textAlignment = elAlign;

                        // Check dragged over state
                        const isElementDragOver = dragOverElementId === element.id;

                        // Inline CSS compile
                        const renderedStyles = buildInlineStyles(element, flexAlign, isElActive);

                        return (
                          <div
                            key={element.id}
                            draggable
                            onDragStart={(e) => handleElementDragStart(e, section.id, element.id)}
                            onDragOver={(e) => handleElementDragOver(e, element.id)}
                            onDrop={(e) => handleElementDrop(e, section.id, element.id)}
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveSectionId(section.id);
                              setActiveElementId(element.id);
                            }}
                            style={{
                              position: 'relative',
                              padding: '2px',
                              border: isElActive ? '1px solid rgba(37,99,235,0.4)' : isElementDragOver ? '2px solid #10B981' : '1px dashed transparent',
                              borderRadius: '6px',
                              cursor: 'grab',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: flexAlign,
                              width: '100%',
                              transition: 'border-color 0.2s'
                            }}
                          >
                            {/* Grip Indicator Tab on hover selection */}
                            {isElActive && (
                              <div style={{
                                position: 'absolute',
                                top: '-20px',
                                left: '4px',
                                background: '#2563EB',
                                color: '#FFFFFF',
                                fontSize: '0.58rem',
                                fontWeight: 700,
                                padding: '1px 6px',
                                borderRadius: '3px',
                                zIndex: 30,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}>
                                <GripVertical style={{ width: '10px', height: '10px' }} />
                                {element.type.toUpperCase()}
                              </div>
                            )}

                            {/* SUB-ELEMENT TYPES RENDERING BLOCK */}

                            {/* A. BRAND LOGOS */}
                            {element.type === 'logo' && (
                              <div style={renderedStyles}>
                                <img src={element.src} alt="Brand Logo" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
                              </div>
                            )}

                            {/* B. HEADER NAVIGATION LINKS */}
                            {element.type === 'nav-links' && (
                              <div style={renderedStyles}>
                                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: flexAlign, width: '100%' }}>
                                  {element.links && element.links.map((linkText, lIdx) => (
                                    <span key={lIdx}>{linkText}</span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* C. HEADER CTA BUTTONS */}
                            {element.type === 'nav-cta' && (
                              <div style={renderedStyles}>
                                <span 
                                  contentEditable
                                  suppressContentEditableWarning
                                  onBlur={(e) => handleInlineEdit(section.id, 'text', e)}
                                  style={{ border: '1px solid rgba(255,255,255,0.12)', padding: 'inherit', borderRadius: 'inherit', outline: 'none' }}
                                >
                                  {element.text}
                                </span>
                              </div>
                            )}

                            {/* D. BADGE TAG */}
                            {element.type === 'badge' && (
                              <div style={renderedStyles}>
                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.18)', borderRadius: 'inherit', padding: '6px 14px' }}>
                                  <Sparkles style={{ width: '13px', height: '13px', color: '#2563EB' }} />
                                  <span 
                                    contentEditable
                                    suppressContentEditableWarning
                                    onBlur={(e) => handleInlineEdit(section.id, 'text', e)}
                                    style={{ outline: 'none' }}
                                  >
                                    {element.text}
                                  </span>
                                </div>
                              </div>
                            )}

                            {/* E. SECTION TITLES */}
                            {element.type === 'title' && (
                              <h2 
                                className="text-gradient-chrome"
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => handleInlineEdit(section.id, 'text', e)}
                                style={renderedStyles}
                              >
                                {element.text}
                              </h2>
                            )}

                            {/* F. DESCRIPTION / TAGLINES / FOOTER COPY */}
                            {(element.type === 'tagline' || element.type === 'desc' || element.type === 'text' || element.type === 'label') && (
                              <p 
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => handleInlineEdit(section.id, 'text', e)}
                                style={renderedStyles}
                              >
                                {element.text}
                              </p>
                            )}

                            {/* G. HERO CALL-TO-ACTIONS */}
                            {element.type === 'ctas' && (
                              <div style={renderedStyles}>
                                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: flexAlign }}>
                                  <span style={{ padding: '12px 24px', background: 'var(--accent-blue)', color: '#FFFFFF', fontWeight: 600, borderRadius: 'inherit' }}>
                                    {element.primaryText}
                                  </span>
                                  <span style={{ padding: '12px 24px', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontWeight: 600, borderRadius: 'inherit' }}>
                                    {element.secondaryText}
                                  </span>
                                </div>
                              </div>
                            )}

                            {/* H. 3D DASHBOARD GRAPHIC MOCKUP */}
                            {element.type === 'mockup' && (
                              <div style={renderedStyles}>
                                <div style={{ display: 'flex', justifyContent: 'center', width: '100%', transform: `scale(${element.scale || 0.85})`, transformOrigin: 'top center' }}>
                                  <DashboardMockup />
                                </div>
                              </div>
                            )}

                            {/* I. TRUSTED TECH SLIDER LOGOS TRACK */}
                            {element.type === 'track' && (
                              <div style={renderedStyles}>
                                <div className="tech-marquee-container" style={{ width: '100%' }}>
                                  <div className="tech-marquee-track" style={{ display: 'flex', justifyContent: flexAlign, gap: '30px' }}>
                                    {[
                                      { name: 'React', svg: <svg viewBox="0 0 24 24" width="24" height="24" fill="none" strokeWidth="1.5"><ellipse cx="12" cy="12" rx="11" ry="4.2" /><ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(120 12 12)" /><circle cx="12" cy="12" r="2" fill="currentColor" /></svg> },
                                      { name: 'Next.js', svg: <svg viewBox="0 0 24 24" width="24" height="24" fill="none" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M9 17V7l7.5 9.5V7" /></svg> },
                                      { name: 'Node.js', svg: <svg viewBox="0 0 24 24" width="24" height="24" fill="none" strokeWidth="1.5"><path d="M12 2L3 7v10l9 5 9-5V7L12 2z" /><path d="M12 22V12m0 0L3 7m9 5l9-5" /></svg> }
                                    ].map((tech, i) => (
                                      <div key={i} className="tech-marquee-item" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', opacity: 0.6 }}>
                                        {tech.svg}
                                        <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{tech.name}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* J. CAPABILITIES SERVICES GRID */}
                            {element.type === 'grid' && (
                              <div style={renderedStyles}>
                                <div className="services-category-grid" style={{ gridTemplateColumns: viewMode === 'phone' ? '1fr' : '1fr 1fr 1fr', gap: '20px', width: '100%' }}>
                                  {[
                                    { title: "Custom Software Development", desc: "We design robust microservices, custom database schemas, and clean API gateways built to handle transactional loads with low latencies.", benefit: "Boosts process automation metrics by up to 60%." },
                                    { title: "SaaS Product Engineering", desc: "Multi-tenant platforms engineered with secure authorization levels, billing portals, and visual dashboards.", benefit: "Accelerates time-to-market delivery cycles." },
                                    { title: "Enterprise Systems Integration", desc: "We build connections between your CRM, ERP, and payment databases to establish a unified operational environment.", benefit: "Consolidates analytics in real-time." }
                                  ].map((service, i) => (
                                    <div key={i} className="service-premium-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '20px', borderRadius: 'inherit', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', maxWidth: element.cardWidth ? `${element.cardWidth}px` : '100%', margin: '0 auto', textAlign: textAlignment }}>
                                      <div>
                                        <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>{service.title}</h4>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '12px' }}>{service.desc}</p>
                                      </div>
                                      <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '10px' }}>
                                        <span style={{ fontSize: '0.6rem', textTransform: 'uppercase', color: '#2563EB', fontWeight: 700, display: 'block', marginBottom: '2px' }}>Business Impact</span>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--text-primary)', fontWeight: 500 }}>{service.benefit}</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* K. TIMELINE ENGINE */}
                            {element.type === 'timeline' && (
                              <div style={renderedStyles}>
                                <ProcessTimeline />
                              </div>
                            )}

                            {/* L. CTA ACTION BUTTON */}
                            {element.type === 'cta' && (
                              <span style={renderedStyles}>
                                <span className="btn btn-primary" style={{ padding: 'inherit', borderRadius: 'inherit', background: 'var(--accent-blue)', color: '#FFFFFF', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                  {element.text} <ArrowRight style={{ width: '16px', height: '16px' }} />
                                </span>
                              </span>
                            )}

                            {/* M. BUSINESS BARRIERS GRID */}
                            {element.type === 'barriers-grid' && (
                              <div style={renderedStyles}>
                                <div className="challenge-grid" style={{ gridTemplateColumns: viewMode === 'phone' ? '1fr' : '1fr 1fr', gap: '16px', width: '100%' }}>
                                  {[
                                    { title: "Outdated Legacy Systems", desc: "Monolith database architectures slowing transaction processing times and degrading system throughput." },
                                    { title: "Manual Operation Overload", desc: "Employees spending hours manual-billing, scheduling, and matching data logs across disjointed legacy systems." },
                                    { title: "Fragmented Data Silos", desc: "CRM, HRMS, and finance ledgers operating independently without unified analytical dashboards." },
                                    { title: "Sub-Optimal Retention", desc: "User retention drop-offs caused by unresponsive layouts, slow API queries, and outdated UX interfaces." }
                                  ].map((item, index) => (
                                    <div key={index} className="challenge-card" style={{ padding: '20px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 'inherit', textAlign: textAlignment }}>
                                      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>{item.title}</h3>
                                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{item.desc}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* N. HOLOGRAPHIC PRODUCTS GRID */}
                            {element.type === 'products-grid' && (
                              <div style={renderedStyles}>
                                <div className="services-category-grid" style={{ gridTemplateColumns: viewMode === 'phone' ? '1fr' : '1fr 1fr 1fr', gap: '20px', width: '100%' }}>
                                  {[
                                    { name: "Awenue CRM", tag: "Sales Pipeline", desc: "Cloud pipeline system built to automate lead scoring, monitor sales task grids, and generate auto-performance logs." },
                                    { name: "Awenue HRMS", tag: "Workforce Management", desc: "Secure workforce portal to handle staff logs, salary structures, leave requests, and digital assessment review loops." },
                                    { name: "Awenue School Manager", tag: "LMS & Admin Suite", desc: "Integrated student information system supporting automated attendance tracks, fee dispatch, and parent portals." }
                                  ].map((prod, index) => (
                                    <div key={index} className="service-premium-card" style={{ padding: '24px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 'inherit', textAlign: textAlignment }}>
                                      <span style={{ fontSize: '0.6rem', color: '#2563EB', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>{prod.tag}</span>
                                      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>{prod.name}</h3>
                                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>{prod.desc}</p>
                                      <span className="btn btn-glass" style={{ width: '100%', textAlign: 'center', padding: '8px', fontSize: '0.75rem', fontWeight: 600, border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'var(--text-primary)', display: 'block' }}>
                                        Request Demo Setup
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* O. CASE STUDY DETAILS SECTION */}
                            {element.type === 'case-card' && (
                              <div style={renderedStyles}>
                                <div style={{ 
                                  display: 'grid',
                                  gridTemplateColumns: viewMode === 'phone' ? '1fr' : '1.2fr 0.8fr',
                                  gap: '30px',
                                  width: '100%',
                                  textAlign: 'left'
                                }}>
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                    <span style={{ fontSize: '0.65rem', color: '#2563EB', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>PROJECT_SHOWCASE</span>
                                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>LMS & Billing Centralization</h3>
                                    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                                      An educational organization with 12 campuses processed fee collections, student logs, and grades manually, causing data lags and billing discrepancies.
                                    </p>
                                    <div style={{ borderLeft: '3px solid #10B981', paddingLeft: '12px' }}>
                                      <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#10B981', textTransform: 'uppercase' }}>The architecture</span>
                                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                                        Developed a cloud-native Next.js portal powered by Node.js microservices. Integrated Stripe Billing APIs for auto-invoicing.
                                      </p>
                                    </div>
                                  </div>
                                  <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '16px', textAlign: 'center' }}>
                                    <div>
                                      <span style={{ fontSize: '2rem', fontWeight: 800, color: '#2563EB' }}>-40%</span>
                                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Admin Overhead Hours</span>
                                    </div>
                                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '12px' }}>
                                      <span style={{ fontSize: '2rem', fontWeight: 800, color: '#10B981' }}>100%</span>
                                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Auto Reconciliations</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* P. INDUSTRIES GRID LIST */}
                            {element.type === 'industries-grid' && (
                              <div style={renderedStyles}>
                                <div className="challenge-grid" style={{ gridTemplateColumns: viewMode === 'phone' ? '1fr' : '1fr 1fr', gap: '16px', width: '100%' }}>
                                  {[
                                    { ind: "Healthcare", desc: "Secure digital management grids, HIPAA-compliant patient dashboards, and automated clinic schedules." },
                                    { ind: "Education", desc: "Learning Management Systems, student databases, auto-billing invoices, and exam grade portals." },
                                    { ind: "Real Estate", desc: "Interactive asset listings, custom CRM lead-tracking software, and Stripe payment gateway interfaces." },
                                    { ind: "Logistics", desc: "Database record management for fleets, automated shipping logs, and live tracking maps." }
                                  ].map((item, index) => (
                                    <div key={index} className="challenge-card" style={{ padding: '20px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 'inherit', textAlign: textAlignment }}>
                                      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>{item.ind}</h3>
                                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{item.desc}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Q. ADVANTAGES COMPARISON TABLE MATRIX */}
                            {element.type === 'table-comp' && (
                              <div style={renderedStyles}>
                                <div style={{ width: '100%', overflowX: 'auto', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 'inherit', padding: '16px' }}>
                                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', textAlign: 'left' }}>
                                    <thead>
                                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                                        <th style={{ padding: '10px', color: 'var(--text-muted)' }}>Operational Metric</th>
                                        <th style={{ padding: '10px', color: 'var(--text-muted)' }}>Traditional Vendor</th>
                                        <th style={{ padding: '10px', color: '#2563EB', fontWeight: 700 }}>Awenue Systems</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {[
                                        { metric: "Architecture", trad: "WordPress bloated templates", aw: "Bespoke high-concurrency code" },
                                        { metric: "Agile Visibility", trad: "Vague milestone reviews", aw: "Bi-weekly sprint staging links" },
                                        { metric: "Security Layer", trad: "Basic plugin firewalls", aw: "TLS certificates & data auth policies" }
                                      ].map((row, i) => (
                                        <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                                          <td style={{ padding: '12px 10px', fontWeight: 600 }}>{row.metric}</td>
                                          <td style={{ padding: '12px 10px', color: 'rgba(255,255,255,0.5)' }}>{row.trad}</td>
                                          <td style={{ padding: '12px 10px', color: 'var(--text-primary)', fontWeight: 500 }}>{row.aw}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            )}

                            {/* R. FAQ ACCORDION BLOCKS */}
                            {element.type === 'accordion' && (
                              <div style={renderedStyles}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
                                  {[
                                    { q: "How long does custom software development take?", a: "Depending on scope, a typical MVP takes 8 to 12 weeks." },
                                    { q: "Do you sign Non-Disclosure Agreements (NDAs)?", a: "Yes, 100%. We sign NDAs before discovery scoping starts." },
                                    { q: "Do you provide post-launch support?", a: "Absolutely. We offer dedicated SLA monitoring and security patches." }
                                  ].map((faq, index) => (
                                    <div key={index} style={{ border: '1px solid rgba(255,255,255,0.04)', borderRadius: '8px', overflow: 'hidden' }}>
                                      <button 
                                        onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                                        style={{ width: '100%', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)', border: 'none', color: '#FFFFFF', cursor: 'pointer', textAlign: 'left', fontSize: '0.85rem', fontWeight: 600 }}
                                      >
                                        <span>{faq.q}</span>
                                        {openFaqIndex === index ? <ChevronUp style={{ width: '14px', height: '14px', color: '#2563EB' }} /> : <ChevronDown style={{ width: '14px', height: '14px' }} />}
                                      </button>
                                      {openFaqIndex === index && (
                                        <div style={{ padding: '12px 16px', fontSize: '0.8rem', color: 'var(--text-secondary)', background: 'transparent', borderTop: '1px solid rgba(255,255,255,0.03)', lineHeight: 1.5 }}>
                                          {faq.a}
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* --- 4-DIRECTIONAL RESIZE HANDLES --- */}
                            {isElActive && (
                              <>
                                {/* Right Edge Handle (Width) */}
                                <div
                                  onMouseDown={(e) => startResize(e, section.id, element.id, 'width', element.styles?.width || 200)}
                                  style={{
                                    position: 'absolute', right: '-4px', top: '50%', transform: 'translateY(-50%)',
                                    width: '8px', height: '8px', background: '#2563EB', border: '1px solid #FFF',
                                    borderRadius: '50%', cursor: 'ew-resize', zIndex: 40
                                  }}
                                  title="Width Resizer"
                                />

                                {/* Bottom Edge Handle (Height or FontSize) */}
                                <div
                                  onMouseDown={(e) => startResize(
                                    e, section.id, element.id, 
                                    element.type === 'mockup' ? 'scale' : (element.styles?.height && element.styles.height !== 'auto' ? 'height' : 'fontSize'), 
                                    element.type === 'mockup' ? element.scale || 0.85 : (element.styles?.height && element.styles.height !== 'auto' ? element.styles.height : element.styles?.fontSize || 16)
                                  )}
                                  style={{
                                    position: 'absolute', bottom: '-4px', left: '50%', transform: 'translateX(-50%)',
                                    width: '8px', height: '8px', background: '#2563EB', border: '1px solid #FFF',
                                    borderRadius: '50%', cursor: 'ns-resize', zIndex: 40
                                  }}
                                  title={element.type === 'mockup' ? 'Scale Graphic' : 'Vertical Size/Font Resizer'}
                                />
                              </>
                            )}

                          </div>
                        );
                      })}

                    </div>
                  </div>
                );
              })}

            </div>
          </div>
        </main>

        {/* RIGHT COLUMN PROPERTY settings INSPECTOR */}
        <aside style={{
          width: rightSidebarOpen ? '320px' : '0px',
          opacity: rightSidebarOpen ? 1 : 0,
          borderLeft: rightSidebarOpen ? '1px solid rgba(255, 255, 255, 0.06)' : 'none',
          background: 'rgba(3, 5, 10, 0.75)',
          padding: rightSidebarOpen ? '24px' : '0px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          zIndex: 40
        }}>
          {rightSidebarOpen && (
            <>
              <div>
                <h2 style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: '#2563EB', marginBottom: '4px' }}>Properties Inspector</h2>
                <p style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.4)', lineHeight: 1.4 }}>
                  Tweak each and every styling parameter.
                </p>
              </div>

              {/* 1. CONTAINER PROPERTIES */}
              {activeSection && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '20px' }}>
                  <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontWeight: 700 }}>Container Settings</span>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)' }}>Section Theme</span>
                    <select
                      value={activeSection.bgTheme || 'dark'}
                      onChange={(e) => updateSectionMeta('bgTheme', e.target.value)}
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '8px', color: '#FFFFFF', fontSize: '0.75rem', outline: 'none' }}
                    >
                      <option value="dark" style={{ background: '#05070f' }}>Minimal Charcoal</option>
                      <option value="blue-glow" style={{ background: '#05070f' }}>Dynamic Blue Glow</option>
                      <option value="purple-gradient" style={{ background: '#05070f' }}>Purple Gradient</option>
                      <option value="minimal-border" style={{ background: '#05070f' }}>Outline Panel</option>
                    </select>
                  </div>
                </div>
              )}

              {/* 2. ALL PARAMETERS STYLING CONTROLLER */}
              {activeElement ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.02)', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.04)' }}>
                    <Sliders style={{ width: '14px', height: '14px', color: '#2563EB' }} />
                    <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>Active: {activeElement.id}</span>
                  </div>

                  {/* Element Alignment */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)' }}>Alignment</span>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px', background: 'rgba(255,255,255,0.02)', padding: '3px', borderRadius: '6px' }}>
                      {['left', 'center', 'right'].map(align => (
                        <button
                          key={align}
                          onClick={() => updateSubElementMeta('align', align)}
                          style={{
                            background: activeElement.align === align ? 'rgba(255,255,255,0.08)' : 'transparent',
                            border: 'none', borderRadius: '4px', padding: '6px', color: '#FFFFFF', cursor: 'pointer', fontSize: '0.7rem', textTransform: 'capitalize'
                          }}
                        >
                          {align}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* TYPOGRAPHY GROUP */}
                  {activeElement.styles?.fontSize !== undefined && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '16px' }}>
                      <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontWeight: 700 }}>Typography Parameters</span>

                      {/* Font Size */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem' }}>
                          <span>Font Size</span>
                          <span style={{ color: '#2563EB' }}>{activeElement.styles.fontSize}px</span>
                        </div>
                        <input type="range" min="8" max="90" value={activeElement.styles.fontSize} onChange={(e) => updateStyleProp('fontSize', parseInt(e.target.value, 10))} style={{ accentColor: '#2563EB', height: '4px' }} />
                      </div>

                      {/* Font Weight */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem' }}>
                          <span>Font Weight</span>
                          <span style={{ color: '#2563EB' }}>{activeElement.styles.fontWeight || 500}</span>
                        </div>
                        <input type="range" min="300" max="900" step="100" value={activeElement.styles.fontWeight || 500} onChange={(e) => updateStyleProp('fontWeight', parseInt(e.target.value, 10))} style={{ accentColor: '#2563EB', height: '4px' }} />
                      </div>

                      {/* Line Height */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem' }}>
                          <span>Line Height</span>
                          <span style={{ color: '#2563EB' }}>{activeElement.styles.lineHeight || 1.5}</span>
                        </div>
                        <input type="range" min="1.0" max="2.0" step="0.05" value={activeElement.styles.lineHeight || 1.5} onChange={(e) => updateStyleProp('lineHeight', parseFloat(e.target.value))} style={{ accentColor: '#2563EB', height: '4px' }} />
                      </div>

                      {/* Letter Spacing */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem' }}>
                          <span>Letter Spacing</span>
                          <span style={{ color: '#2563EB' }}>{activeElement.styles.letterSpacing || 0}px</span>
                        </div>
                        <input type="range" min="-2" max="10" step="0.5" value={activeElement.styles.letterSpacing || 0} onChange={(e) => updateStyleProp('letterSpacing', parseFloat(e.target.value))} style={{ accentColor: '#2563EB', height: '4px' }} />
                      </div>
                    </div>
                  )}

                  {/* LENGTH AND BREADTH DIMENSIONS GROUP */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '16px' }}>
                    <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontWeight: 700 }}>Length & Breadth (Dimensions)</span>

                    {/* Width (Length) */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem' }}>
                        <span>Width (Length)</span>
                        <span style={{ color: '#2563EB' }}>{activeElement.styles?.width || 'Auto'}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <input type="range" min="40" max="1200" value={activeElement.styles?.width || 600} disabled={!activeElement.styles?.width} onChange={(e) => updateStyleProp('width', parseInt(e.target.value, 10))} style={{ accentColor: '#2563EB', height: '4px', flex: 1 }} />
                        <button onClick={() => updateStyleProp('width', activeElement.styles?.width ? undefined : 400)} style={{ padding: '3px 8px', fontSize: '0.65rem', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '4px', background: activeElement.styles?.width ? 'transparent' : '#2563EB', color: '#FFF', cursor: 'pointer' }}>Auto</button>
                      </div>
                    </div>

                    {/* Height (Breadth) */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem' }}>
                        <span>Height (Breadth)</span>
                        <span style={{ color: '#2563EB' }}>{activeElement.styles?.height || 'Auto'}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <input type="range" min="10" max="800" value={activeElement.styles?.height || 200} disabled={!activeElement.styles?.height} onChange={(e) => updateStyleProp('height', parseInt(e.target.value, 10))} style={{ accentColor: '#2563EB', height: '4px', flex: 1 }} />
                        <button onClick={() => updateStyleProp('height', activeElement.styles?.height ? undefined : 150)} style={{ padding: '3px 8px', fontSize: '0.65rem', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '4px', background: activeElement.styles?.height ? 'transparent' : '#2563EB', color: '#FFF', cursor: 'pointer' }}>Auto</button>
                      </div>
                    </div>
                  </div>

                  {/* SPACING: PADDING & MARGIN GROUP */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '16px' }}>
                    <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontWeight: 700 }}>Spacing (Padding & Margins)</span>

                    {/* Padding Top & Bottom */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem' }}>
                        <span>Padding Top / Bottom</span>
                        <span style={{ color: '#2563EB' }}>{activeElement.styles?.paddingTop || 0}px</span>
                      </div>
                      <input type="range" min="0" max="80" value={activeElement.styles?.paddingTop || 0} onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        updateStyleProp('paddingTop', val);
                        updateStyleProp('paddingBottom', val);
                      }} style={{ accentColor: '#2563EB', height: '4px' }} />
                    </div>

                    {/* Padding Left & Right */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem' }}>
                        <span>Padding Left / Right</span>
                        <span style={{ color: '#2563EB' }}>{activeElement.styles?.paddingLeft || 0}px</span>
                      </div>
                      <input type="range" min="0" max="80" value={activeElement.styles?.paddingLeft || 0} onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        updateStyleProp('paddingLeft', val);
                        updateStyleProp('paddingRight', val);
                      }} style={{ accentColor: '#2563EB', height: '4px' }} />
                    </div>

                    {/* Margin Top */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem' }}>
                        <span>Margin Top</span>
                        <span style={{ color: '#2563EB' }}>{activeElement.styles?.marginTop ?? 0}px</span>
                      </div>
                      <input type="range" min="0" max="80" value={activeElement.styles?.marginTop ?? 0} onChange={(e) => updateStyleProp('marginTop', parseInt(e.target.value, 10))} style={{ accentColor: '#2563EB', height: '4px' }} />
                    </div>

                    {/* Margin Bottom */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem' }}>
                        <span>Margin Bottom</span>
                        <span style={{ color: '#2563EB' }}>{activeElement.styles?.marginBottom ?? 12}px</span>
                      </div>
                      <input type="range" min="0" max="80" value={activeElement.styles?.marginBottom ?? 12} onChange={(e) => updateStyleProp('marginBottom', parseInt(e.target.value, 10))} style={{ accentColor: '#2563EB', height: '4px' }} />
                    </div>
                  </div>

                  {/* BORDERS & CORNER ROUNDING */}
                  {activeElement.styles?.borderRadius !== undefined && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '16px' }}>
                      <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontWeight: 700 }}>Borders & Effects</span>

                      {/* Border Radius */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem' }}>
                          <span>Corner Radius (Rounding)</span>
                          <span style={{ color: '#2563EB' }}>{activeElement.styles.borderRadius}px</span>
                        </div>
                        <input type="range" min="0" max="40" value={activeElement.styles.borderRadius} onChange={(e) => updateStyleProp('borderRadius', parseInt(e.target.value, 10))} style={{ accentColor: '#2563EB', height: '4px' }} />
                      </div>
                    </div>
                  )}

                  {/* COLOR PICKERS */}
                  {activeElement.styles?.color !== undefined && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '16px' }}>
                      <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)' }}>Text Color Hex</span>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <input
                          type="color"
                          value={activeElement.styles.color.startsWith('#') ? activeElement.styles.color : '#FFFFFF'}
                          onChange={(e) => updateStyleProp('color', e.target.value)}
                          style={{ border: 'none', background: 'transparent', width: '32px', height: '32px', cursor: 'pointer', borderRadius: '4px' }}
                        />
                        <input
                          type="text"
                          value={activeElement.styles.color}
                          onChange={(e) => updateStyleProp('color', e.target.value)}
                          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '6px 10px', color: '#FFFFFF', fontSize: '0.75rem', flex: 1, outline: 'none' }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Direct Text edit panel input */}
                  {activeElement.text !== undefined && (
                    <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '16px' }}>
                      <label style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.5)' }}>Content Text</label>
                      <textarea 
                        value={activeElement.text || ''}
                        onChange={(e) => updateSubElementMeta('text', e.target.value)}
                        rows={4}
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '8px 10px', color: '#FFFFFF', fontSize: '0.75rem', resize: 'vertical', outline: 'none' }}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '200px',
                  border: '1px dashed rgba(255,255,255,0.05)',
                  borderRadius: '12px',
                  color: 'rgba(255,255,255,0.3)',
                  textAlign: 'center',
                  padding: '20px'
                }}>
                  <span style={{ fontSize: '0.75rem' }}>No element selected. Click any block in the canvas view to edit.</span>
                </div>
              )}
            </>
          )}
        </aside>

      </div>

      {/* 3. SIMULATED DEPLOYMENT LOGS CONSOLE */}
      {isDeploying && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(3, 5, 12, 0.95)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px'
        }}>
          <div style={{
            width: '600px',
            background: '#040713',
            border: '1px solid rgba(37,99,235,0.25)',
            borderRadius: '18px',
            padding: '32px',
            boxShadow: '0 0 40px rgba(37,99,235,0.15)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justify: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <RefreshCw style={{ width: '18px', height: '18px', color: '#2563EB', animation: 'spin 1.5s linear infinite' }} />
                <h3 style={{ fontSize: '1rem', fontWeight: 800, margin: 0 }}>Building Production Nodes...</h3>
              </div>
              <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>STAGE: OPTIMIZATION</span>
            </div>

            {/* Simulated Shell Terminal Lines */}
            <div style={{
              background: '#020308',
              borderRadius: '10px',
              padding: '18px',
              height: '240px',
              overflowY: 'auto',
              fontFamily: 'monospace',
              fontSize: '0.75rem',
              color: '#10B981',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              border: '1px solid rgba(255,255,255,0.02)'
            }}>
              {logs.map((log, index) => (
                <div key={index} style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ color: 'rgba(255,255,255,0.2)' }}>$</span>
                  <span>{log}</span>
                </div>
              ))}
              {deployStep < deploySteps.length && (
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ color: 'rgba(255,255,255,0.2)' }}>$</span>
                  <span style={{ width: '8px', height: '14px', background: '#10B981', display: 'inline-block', animation: 'pulse 1s infinite' }}></span>
                </div>
              )}
            </div>

            {/* Bottom State */}
            {deployStep === deploySteps.length && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                borderRadius: '8px',
                padding: '12px',
                color: '#10B981',
                fontSize: '0.85rem',
                fontWeight: 600,
                animation: 'pulse 2s infinite'
              }}>
                <Check style={{ width: '16px', height: '16px' }} />
                Production Deployment Completed Successfully!
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tailwind keyframes injection for deployment animations */}
      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
