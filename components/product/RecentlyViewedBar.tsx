'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Clock } from 'lucide-react';
import { useRecentlyViewed } from '@/store/recentlyViewed';
import { getAllProducts } from '@/lib/products';
import { formatCurrency } from '@/lib/utils';

const ALL_PRODUCTS = getAllProducts();

export function RecentlyViewedBar() {
  const { ids } = useRecentlyViewed();

  const products = ids
    .map((slug) => ALL_PRODUCTS.find((p) => p.slug === slug))
    .filter(Boolean) as ReturnType<typeof getAllProducts>;

  if (products.length === 0) return null;

  return (
    <div style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.875rem' }}>
        <Clock size={15} color="var(--color-muted)" />
        <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', margin: 0 }}>
          Recently Viewed
        </h3>
      </div>
      <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'none' }}>
        {products.map((p) => (
          <Link
            key={p.slug}
            href={`/product/${p.slug}`}
            style={{
              display: 'flex', flexDirection: 'column', textDecoration: 'none',
              backgroundColor: 'var(--color-white)', borderRadius: '10px',
              overflow: 'hidden', flexShrink: 0, width: '120px',
              boxShadow: '0 2px 8px rgba(44,24,16,0.08)',
              transition: 'transform 200ms, box-shadow 200ms',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(200,150,62,0.2)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 2px 8px rgba(44,24,16,0.08)'; }}
          >
            <div style={{ position: 'relative', width: '120px', height: '90px', flexShrink: 0 }}>
              <Image src={p.images[0]} alt={p.name} fill style={{ objectFit: 'cover' }} sizes="120px" />
            </div>
            <div style={{ padding: '0.5rem 0.6rem' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-secondary)', margin: '0 0 0.15rem', lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {p.name}
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-primary)', margin: 0 }}>
                {formatCurrency(p.variants[0].price)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
