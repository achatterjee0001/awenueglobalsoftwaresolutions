'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Lightbulb, Compass, Cpu, Send, HeartHandshake, Code, Globe, Cloud, Shield, ShieldCheck, Smartphone, Users, FolderCheck, Award, Briefcase, GraduationCap, Activity, Phone, Mail, MapPin, Calendar, CheckCircle, Clock, ChevronRight, Target, Building
} from 'lucide-react';

export default function DesignsystemPage() {
  return (
    <div className="page-route-design-system">
      {/* HERO */}
  <section className="section ds-hero">
    <div className="container content-wrapper">
      <p style={{fontFamily: 'var(--font-heading)', fontSize: '0.8rem', letterSpacing: '0.25em', color: 'var(--text-muted)', textTransform: 'uppercase'}}>Brand Library</p>
      <h1 className="text-gradient-chrome">Design System</h1>
      <p style={{color: 'var(--text-secondary)', maxWidth: '600px', fontSize: '1.1rem'}}>
        Token guidelines, colors, typography scales, and copyable modular code classes for AWENUE.
      </p>
    </div>
  </section>

  {/* SECTIONS */}
  <main className="container content-wrapper" style={{paddingBottom: 'var(--space-7)'}}>
    
    {/* 1. Color Palette Swatches */}
    <section className="ds-section">
      <h2 className="text-gradient-chrome" style={{fontSize: '1.5rem', marginBottom: 'var(--space-2)'}}>1. Color Palette</h2>
      <div className="color-swatch-grid">
        <div className="color-swatch-card">
          <div className="color-swatch-display" style={{backgroundColor: '#060606'}}></div>
          <div className="color-swatch-info">
            <h4>Primary Background</h4>
            <p>#060606</p>
          </div>
        </div>
        <div className="color-swatch-card">
          <div className="color-swatch-display" style={{backgroundColor: '#101010'}}></div>
          <div className="color-swatch-info">
            <h4>Secondary Background</h4>
            <p>#101010</p>
          </div>
        </div>
        <div className="color-swatch-card">
          <div className="color-swatch-display" style={{backgroundColor: '#141414'}}></div>
          <div className="color-swatch-info">
            <h4>Card Background</h4>
            <p>#141414</p>
          </div>
        </div>
        <div className="color-swatch-card">
          <div className="color-swatch-display" style={{backgroundColor: '#2B2B2B'}}></div>
          <div className="color-swatch-info">
            <h4>Borders</h4>
            <p>#2B2B2B</p>
          </div>
        </div>
        <div className="color-swatch-card">
          <div className="color-swatch-display" style={{background: 'linear-gradient(135deg, #FFFFFF, #94A3B8, #FFFFFF)'}}></div>
          <div className="color-swatch-info">
            <h4>Chrome Gradient</h4>
            <p>Silver / Chrome</p>
          </div>
        </div>
      </div>
    </section>

    {/* 2. Typography */}
    <section className="ds-section">
      <h2 className="text-gradient-chrome" style={{fontSize: '1.5rem', marginBottom: 'var(--space-2)'}}>2. Typography</h2>
      <div style={{marginTop: 'var(--space-3)'}}>
        <p style={{fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase'}}>Heading Font (Space Grotesk - 700)</p>
        <h2 style={{fontSize: '2.5rem', marginBottom: 'var(--space-3)'}} className="text-gradient-chrome">AWENUE CORE HEADINGS</h2>
        
        <p style={{fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase'}}>Body Font (Inter - 400)</p>
        <p style={{fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '600px', marginBottom: 'var(--space-3)'}}>
          Building next-generation enterprise dashboards, databases, and microservices for organizations globally. We prioritize thread performance, security audits, and clean modular designs.
        </p>
      </div>
    </section>

    {/* 3. Components Library */}
    <section className="ds-section">
      <h2 className="text-gradient-chrome" style={{fontSize: '1.5rem', marginBottom: 'var(--space-3)'}}>3. Component Library</h2>
      
      {/* Primary Button Component */}
      <div style={{marginBottom: 'var(--space-4)'}}>
        <h4>Primary Button (Metallic Border Reflection)</h4>
        <div style={{padding: 'var(--space-3) 0'}}>
          <Link href="#" className="btn btn-primary">Book Consultation</Link>
        </div>
        <div className="snippet-box">
          <button className="copy-btn" onclick="copyText('btn-snippet-1', this)">COPY</button>
          <pre id="btn-snippet-1">&lt;a href="#" className="btn btn-primary"&gt;Book Consultation&lt;/a&gt;</pre>
        </div>
      </div>

      {/* Card Component */}
      <div style={{marginBottom: 'var(--space-4)'}}>
        <h4>Premium Card (Hover Lift & pointer-glow)</h4>
        <div style={{padding: 'var(--space-3) 0', maxWidth: '380px'}}>
          <div className="card-premium">
            <div className="card-icon"><Code  style={{ width: 24, height: 24, display: 'inline-block' }} /></div>
            <h3 className="card-title">Software Development</h3>
            <p className="card-desc">Bespoke backend microservices and API layers.</p>
          </div>
        </div>
        <div className="snippet-box">
          <button className="copy-btn" onclick="copyText('card-snippet-1', this)">COPY</button>
          <pre id="card-snippet-1">&lt;div className="card-premium"&gt;
  &lt;div className="card-icon"&gt;&lt;i data-lucide="code"&gt;&lt;/i&gt;&lt;/div&gt;
  &lt;h3 className="card-title"&gt;Software Development&lt;/h3&gt;
  &lt;p className="card-desc"&gt;Bespoke backend microservices and API layers.&lt;/p&gt;
&lt;/div&gt;</pre>
        </div>
      </div>
    </section>

    {/* 4. Figma-Ready Settings */}
    <section className="ds-section" style={{border: 'none'}}>
      <h2 className="text-gradient-chrome" style={{fontSize: '1.5rem', marginBottom: 'var(--space-2)'}}>4. Figma Guidelines</h2>
      <div style={{color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '12px'}}>
        <p>Ensure designers configure layout dimensions exactly as listed below to align UI designs with code templates:</p>
        <ul style={{paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px'}}>
          <li><b>Grid spacing:</b> 8px base grid (all margins are multiples of 8: 16, 24, 32, 48, 80, 120px)</li>
          <li><b>Corner Radii:</b> Cards: 24px | Buttons: 16px | Inputs: 14px</li>
          <li><b>Typography:</b> Space Grotesk Bold for headers. Uppercase with letter-spacing set to 15% tracking.</li>
          <li><b>Borders:</b> 1px width, colored #2B2B2B.</li>
          <li><b>SVGs:</b> Always export paths with fill/stroke gradients resolved as reference IDs (e.g. <code>url(#gradient-chrome)</code>).</li>
        </ul>
      </div>
    </section>

  </main>

  {/* FOOTER */}
    </div>
  );
}
