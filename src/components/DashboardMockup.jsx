'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  TrendingUp, 
  Users, 
  Activity, 
  Settings, 
  MessageSquare, 
  Layers, 
  Play, 
  Check, 
  Smartphone,
  Sparkles
} from 'lucide-react';

export default function DashboardMockup() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate mouse position relative to center of the container
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    // Limit rotation to max 12 degrees
    const rotateX = -(mouseY / (height / 2)) * 10;
    const rotateY = (mouseX / (width / 2)) * 12;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    // Settle back to default slight angle
    setTilt({ x: -4, y: 8 });
  };

  useEffect(() => {
    // Set default initial tilt
    setTilt({ x: -4, y: 8 });

    // Handle viewport resize scaling
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 480) {
        setScale(0.5);
      } else if (width < 768) {
        setScale(0.68);
      } else if (width < 1024) {
        setScale(0.85);
      } else {
        setScale(1);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        width: '100%',
        height: `${520 * scale}px`,
        perspective: '1500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        cursor: 'pointer',
        userSelect: 'none',
        overflow: 'hidden'
      }}
    >
      {/* 3D Transform Wrapper */}
      <div 
        style={{
          width: '90%',
          height: '85%',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transform: `scale(${scale}) rotateX(${scale < 1 ? 0 : tilt.x}deg) rotateY(${scale < 1 ? 0 : tilt.y}deg)`,
          transition: 'transform 0.15s ease-out'
        }}
      >
        {/* Glow backdrop behind layers */}
        <div 
          style={{
            position: 'absolute',
            width: '80%',
            height: '80%',
            top: '10%',
            left: '10%',
            background: 'radial-gradient(circle, rgba(37, 99, 235, 0.22) 0%, rgba(37, 99, 235, 0) 70%)',
            filter: 'blur(40px)',
            transform: 'translateZ(-40px)',
            pointerEvents: 'none'
          }}
        />

        {/* LAYER 1: Core SaaS CRM & Analytics Window (Z: 0) */}
        <div 
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: 'rgba(10, 15, 30, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '20px',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
            overflow: 'hidden',
            transform: 'translateZ(0px)',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Header Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 18px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ff5f56' }}></div>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ffbd2e' }}></div>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#27c93f' }}></div>
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'monospace', letterSpacing: '1px' }}>
              AWENUE_CLOUD_DASHBOARD v4.2
            </div>
            <div style={{ width: '20px' }}></div>
          </div>

          {/* Main CRM Area */}
          <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
            {/* Minimal Sidebar */}
            <div style={{ width: '48px', borderRight: '1px solid rgba(255, 255, 255, 0.06)', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '16px', gap: '20px' }}>
              <Activity style={{ width: '16px', height: '16px', color: '#2563EB' }} />
              <Users style={{ width: '16px', height: '16px', color: 'var(--text-muted)' }} />
              <Layers style={{ width: '16px', height: '16px', color: 'var(--text-muted)' }} />
              <Settings style={{ width: '16px', height: '16px', color: 'var(--text-muted)' }} />
            </div>

            {/* Dashboard Contents */}
            <div style={{ flex: 1, padding: '18px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Row 1: Metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '10px', padding: '10px 14px' }}>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block' }}>Monthly Revenue</span>
                  <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px', display: 'block' }}>$142,380</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '10px', padding: '10px 14px' }}>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block' }}>Active Users</span>
                  <span style={{ fontSize: '1rem', fontWeight: 700, color: '#2563EB', marginTop: '4px', display: 'block' }}>18,450 <span style={{ fontSize: '0.6rem', color: '#10B981' }}>+12%</span></span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '10px', padding: '10px 14px' }}>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block' }}>Conversion Rate</span>
                  <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px', display: 'block' }}>3.24%</span>
                </div>
              </div>

              {/* Row 2: Analytics Chart */}
              <div style={{ flex: 1, background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '12px', padding: '14px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Active Enterprise Sessions</span>
                  <div style={{ display: 'flex', gap: '6px', fontSize: '0.6rem', color: 'var(--text-muted)' }}>
                    <span>1D</span><span style={{ color: '#2563EB' }}>1W</span><span>1M</span>
                  </div>
                </div>
                {/* SVG mock vector chart */}
                <div style={{ width: '100%', height: '140px', marginTop: '12px', position: 'relative' }}>
                  <svg viewBox="0 0 400 120" style={{ width: '100%', height: '100%' }}>
                    {/* Grid lines */}
                    <line x1="0" y1="20" x2="400" y2="20" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                    <line x1="0" y1="60" x2="400" y2="60" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                    <line x1="0" y1="100" x2="400" y2="100" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                    
                    {/* Area fill */}
                    <path 
                      d="M0,110 Q40,60 80,80 T160,40 T240,70 T320,30 T400,20 L400,120 L0,120 Z" 
                      fill="url(#chartGrad)" 
                      opacity="0.15"
                    />
                    {/* Line path */}
                    <path 
                      d="M0,110 Q40,60 80,80 T160,40 T240,70 T320,30 T400,20" 
                      fill="none" 
                      stroke="#2563EB" 
                      strokeWidth="2.5" 
                      strokeLinecap="round"
                    />
                    
                    {/* Glow gradients definition */}
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2563EB" />
                        <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LAYER 2: Admin Panel float widget (Z: 40px) */}
        <div 
          style={{
            position: 'absolute',
            width: '260px',
            height: '140px',
            background: 'rgba(15, 23, 42, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '16px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
            top: '8%',
            left: '-6%',
            transform: 'translateZ(40px)',
            padding: '14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#F8FAFC' }}>Security Audit Layer</span>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981', boxShadow: '0 0 8px #10B981' }}></div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.65rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
              <span>Threat Mitigation v2</span>
              <span style={{ color: '#10B981' }}>Active</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
              <span>SSL Handshake API</span>
              <span>100% OK</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
              <span>Ingress Traffic Limit</span>
              <span>15.2k req/s</span>
            </div>
          </div>
        </div>

        {/* LAYER 3: Interactive Workflow Node Diagram (Z: 60px) */}
        <div 
          style={{
            position: 'absolute',
            width: '280px',
            height: '130px',
            background: 'rgba(15, 23, 42, 0.9)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '16px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
            bottom: '-5%',
            left: '4%',
            transform: 'translateZ(60px)',
            padding: '14px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block' }}>Integrated Core Workflows</span>
          
          {/* Dynamic Nodes Map */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px', position: 'relative', height: '50px' }}>
            {/* SVG Connector Lines */}
            <svg style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, zIndex: 0 }}>
              <path d="M 30 25 C 80 25, 80 25, 120 25" stroke="rgba(37,99,235,0.4)" strokeWidth="1.5" strokeDasharray="3, 3" fill="none" />
              <path d="M 140 25 C 180 25, 180 25, 220 25" stroke="#2563EB" strokeWidth="2" fill="none" />
            </svg>
            
            {/* Node 1 */}
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', color: 'var(--text-secondary)' }}>DB</div>
              <span style={{ fontSize: '0.55rem', color: 'var(--text-muted)', marginTop: '4px' }}>Query</span>
            </div>
            {/* Node 2 */}
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', color: '#FFF', boxShadow: '0 0 10px rgba(37,99,235,0.4)' }}>
                <Play style={{ width: '10px', height: '10px', fill: '#FFF' }} />
              </div>
              <span style={{ fontSize: '0.55rem', color: '#2563EB', fontWeight: 600, marginTop: '4px' }}>Process</span>
            </div>
            {/* Node 3 */}
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', color: '#10B981' }}>
                <Check style={{ width: '12px', height: '12px' }} />
              </div>
              <span style={{ fontSize: '0.55rem', color: '#10B981', marginTop: '4px' }}>Webhook</span>
            </div>
          </div>
        </div>

        {/* LAYER 4: Mobile App Preview Frame (Z: 90px) */}
        <div 
          style={{
            position: 'absolute',
            width: '130px',
            height: '240px',
            background: '#040814',
            border: '4px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '24px',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.6)',
            bottom: '10%',
            right: '-6%',
            transform: 'translateZ(90px)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            padding: '8px'
          }}
        >
          {/* Phone Ear Speaker and Camera notch */}
          <div style={{ width: '40px', height: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', margin: '0 auto 8px auto', display: 'flex', justifyContent: 'center', gap: '4px', alignItems: 'center' }}>
            <div style={{ width: '16px', height: '2px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px' }}></div>
            <div style={{ width: '3px', height: '3px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%' }}></div>
          </div>

          {/* Phone content list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, justifyContent: 'center' }}>
            <span style={{ fontSize: '0.55rem', color: 'var(--text-muted)', textAlign: 'center', display: 'block' }}>Mobile Platform</span>
            <div style={{ width: '100%', height: '55px', background: 'rgba(37, 99, 235, 0.1)', border: '1px solid rgba(37, 99, 235, 0.2)', borderRadius: '8px', padding: '6px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.5rem', color: 'var(--text-muted)' }}>Tasks done</span>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>84%</span>
              <div style={{ width: '100%', height: '3px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px' }}>
                <div style={{ width: '84%', height: '100%', background: '#2563EB', borderRadius: '3px' }}></div>
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '4px' }}>
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '6px', padding: '4px', textAlign: 'center' }}>
                <span style={{ fontSize: '0.45rem', color: 'var(--text-muted)', display: 'block' }}>Speed</span>
                <span style={{ fontSize: '0.6rem', fontWeight: 700, color: 'var(--text-primary)' }}>120ms</span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '6px', padding: '4px', textAlign: 'center' }}>
                <span style={{ fontSize: '0.45rem', color: 'var(--text-muted)', display: 'block' }}>Sync</span>
                <span style={{ fontSize: '0.6rem', fontWeight: 700, color: '#10B981' }}>Live</span>
              </div>
            </div>
          </div>
          
          <div style={{ width: '30px', height: '2px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '2px', margin: '8px auto 0 auto' }}></div>
        </div>

        {/* LAYER 5: AI Assistant chat node (Z: 120px) */}
        <div 
          style={{
            position: 'absolute',
            width: '210px',
            height: '95px',
            background: 'rgba(15, 23, 42, 0.92)',
            border: '1px solid #2563EB',
            borderRadius: '16px',
            boxShadow: '0 0 25px rgba(37, 99, 235, 0.25)',
            top: '-5%',
            right: '-2%',
            transform: 'translateZ(120px)',
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles style={{ width: '12px', height: '12px', color: '#2563EB' }} />
            <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#F8FAFC' }}>Awenue AI Engine</span>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '8px', padding: '6px 8px', fontSize: '0.6rem', color: 'var(--text-secondary)' }}>
            "Optimizing microservice container scaling cycles. 14% performance boost achieved."
          </div>
        </div>
      </div>
    </div>
  );
}
