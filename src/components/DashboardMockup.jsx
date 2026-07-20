'use client';

import React, { useState, useEffect } from 'react';
import { Terminal, Cpu, Database, Shield, Check, Play } from 'lucide-react';

export default function DashboardMockup() {
  const [logs, setLogs] = useState([
    'Initializing secure handshakes...',
    'System status: OPTIMAL',
    'Concurrences: 14,240 req/s'
  ]);
  const [uptime, setUptime] = useState(99.982);

  useEffect(() => {
    // Simulate real-time logs updating
    const logInterval = setInterval(() => {
      const logTemplates = [
        'Secure token verified successfully.',
        'PostgreSQL database pool refreshed.',
        'Kubernetes pods scaling automatically.',
        'AWS ECS task runner completed sprint.',
        'API endpoint latency: 24ms (within threshold).',
        'CDN cache sync completed globally.',
        'Threat protection scans: 0 alerts.'
      ];
      const randomLog = logTemplates[Math.floor(Math.random() * logTemplates.length)];
      setLogs((prev) => [...prev.slice(-3), `[${new Date().toLocaleTimeString()}] ${randomLog}`]);
      setUptime((prev) => Math.min(99.999, Math.max(99.95, prev + (Math.random() - 0.5) * 0.002)));
    }, 4000);

    return () => clearInterval(logInterval);
  }, []);

  return (
    <div 
      className="telemetry-console-wrapper"
      style={{
        width: '100%',
        maxWidth: '520px',
        background: 'rgba(10, 15, 30, 0.45)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        borderRadius: '20px',
        backdropFilter: 'blur(16px)',
        padding: '24px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.02)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}
    >
      {/* Header bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981', boxShadow: '0 0 8px #10B981' }} />
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '1px', textTransform: 'uppercase' }}>Operations Control</span>
        </div>
        <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>v4.2.0-STABLE</span>
      </div>

      {/* Grid of basic parameters */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
        <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.04)', padding: '12px 16px', borderRadius: '12px' }}>
          <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>SLA Uptime</span>
          <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px', display: 'block', fontFamily: 'monospace' }}>
            {uptime.toFixed(3)}%
          </span>
        </div>
        <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.04)', padding: '12px 16px', borderRadius: '12px' }}>
          <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>Latency Metrics</span>
          <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-blue)', marginTop: '4px', display: 'block', fontFamily: 'monospace' }}>
            24 ms
          </span>
        </div>
      </div>

      {/* Active Stacks Info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Infrastructure Protocols</span>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[
            { label: "TLS Encrypted", icon: <Shield style={{ width: '10px', height: '10px', color: '#10B981' }} /> },
            { label: "Containerized", icon: <Cpu style={{ width: '10px', height: '10px', color: 'var(--accent-blue)' }} /> },
            { label: "PostgreSQL DB", icon: <Database style={{ width: '10px', height: '10px', color: 'var(--accent-blue)' }} /> }
          ].map((item, i) => (
            <div 
              key={i} 
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '6px', 
                background: 'rgba(255,255,255,0.03)', 
                border: '1px solid rgba(255,255,255,0.05)', 
                padding: '4px 10px', 
                borderRadius: '6px',
                fontSize: '0.7rem',
                color: 'var(--text-secondary)'
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Real-time Simulated Terminal Logs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Terminal style={{ width: '12px', height: '12px', color: 'var(--text-muted)' }} />
          <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Terminal Output</span>
        </div>
        <div 
          style={{ 
            background: 'rgba(0, 0, 0, 0.35)', 
            border: '1px solid rgba(255, 255, 255, 0.04)', 
            borderRadius: '12px', 
            padding: '16px', 
            minHeight: '110px',
            fontFamily: 'monospace',
            fontSize: '0.7rem',
            color: '#10B981',
            lineHeight: 1.5,
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            overflow: 'hidden'
          }}
        >
          {logs.map((log, index) => (
            <div key={index} style={{ opacity: index === logs.length - 1 ? 1 : 0.6, transition: 'opacity 0.3s' }}>
              &gt; {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
