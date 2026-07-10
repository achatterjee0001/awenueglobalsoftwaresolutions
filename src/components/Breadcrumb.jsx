'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumb({ customLabels = {} }) {
  const pathname = usePathname();
  if (pathname === '/') return null;

  const paths = pathname.split('/').filter(Boolean);

  return (
    <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
      <Link href="/" style={{ color: 'inherit', display: 'flex', alignItems: 'center', transition: 'var(--transition-fast)' }} className="hover-link">
        <Home style={{ width: '14px', height: '14px' }} />
      </Link>
      
      {paths.map((path, idx) => {
        const routeTo = `/${paths.slice(0, idx + 1).join('/')}`;
        const isLast = idx === paths.length - 1;
        
        let label = path
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
          
        if (customLabels[path]) {
          label = customLabels[path];
        }

        return (
          <React.Fragment key={path}>
            <ChevronRight style={{ width: '12px', height: '12px', opacity: 0.5 }} />
            {isLast ? (
              <span style={{ color: 'var(--text-primary)', fontWeight: 500 }} aria-current="page">
                {label}
              </span>
            ) : (
              <Link href={routeTo} style={{ color: 'inherit', transition: 'var(--transition-fast)' }} className="hover-link">
                {label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
