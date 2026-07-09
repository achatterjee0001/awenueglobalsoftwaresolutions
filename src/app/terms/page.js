'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Lightbulb, Compass, Cpu, Send, HeartHandshake, Code, Globe, Cloud, Shield, ShieldCheck, Smartphone, Users, FolderCheck, Award, Briefcase, GraduationCap, Activity, Phone, Mail, MapPin, Calendar, CheckCircle, Clock, ChevronRight, Target, Building
} from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="page-route-terms">
      <section className="section legal-hero">
    <div className="container">
      <h1 className="text-gradient-chrome">Terms of Service</h1>
      <p style={{color: 'var(--text-muted)'}}>Last Updated: July 9, 2026</p>
    </div>
  </section>

  <article className="container legal-content">
    <h2>1. Agreement Scope</h2>
    <p>
      By accessing the digital portals, downloading logos, or submitting details on AWENUE website, you consent to these operational rules.
    </p>

    <h2>2. Intellectual Property</h2>
    <p>
      The stylized chrome logos, code classes, and textual designs of Awenue Global Software Solutions are owned IP assets. You may download them for partner representation but may not sell or re-license.
    </p>

    <h2>3. Service SLA Limits</h2>
    <p>
      General information on the site is provided without warranty. Product SLAs are defined separately in signed enterprise software contracts.
    </p>
  </article>

  {/* FOOTER */}
    </div>
  );
}
