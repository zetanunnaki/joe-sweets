'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
      {crumbs.map((crumb, i) => (
        <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          {i > 0 && <ChevronRight size={13} color="var(--color-muted)" />}
          {crumb.href ? (
            <Link href={crumb.href} style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500, transition: 'opacity 180ms' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.7'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1'; }}
            >
              {crumb.label}
            </Link>
          ) : (
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--color-muted)' }}>{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
