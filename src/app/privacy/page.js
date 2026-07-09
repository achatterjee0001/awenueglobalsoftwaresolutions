'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Lightbulb, Compass, Cpu, Send, HeartHandshake, Code, Globe, Cloud, Shield, ShieldCheck, Smartphone, Users, FolderCheck, Award, Briefcase, GraduationCap, Activity, Phone, Mail, MapPin, Calendar, CheckCircle, Clock, ChevronRight, Target, Building
} from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="page-route-privacy">
      <section className="section legal-hero">
    <div className="container">
      <h1 className="text-gradient-chrome">Privacy Policy</h1>
      <p style={{color: 'var(--text-muted)'}}>Last Updated: July 9, 2026</p>
    </div>
  </section>

  <article className="container legal-content">
    <h2>1. Data Acquisition</h2>
    <p>
      We gather user contact data when you request consultations, submit career files, or query product demonstrations. We gather system browser strings and device screen dimensions to scale page elements cleanly.
    </p>

    <h2>2. Data Utilization</h2>
    <p>
      Acquired email addresses, messages, and project specifications are processed exclusively to schedule architecture consultation calls or reply to career enquiries. We do not distribute database elements to marketing nodes.
    </p>

    <h2>3. Security Measures</h2>
    <p>
      All data flows are encrypted utilizing TLS 1.3 standards. Server nodes are firewalled inside isolated subnets with strict access policies.
    </p>
  </article>

  {/* FOOTER */}
    </div>
  );
}
