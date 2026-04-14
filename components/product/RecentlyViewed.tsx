'use client';

import { useEffect } from 'react';
import { useRecentlyViewed } from '@/store/recentlyViewed';
import { getAllProducts } from '@/lib/products';
import { ProductCard } from './ProductCard';
import { EgyptianDivider } from '@/components/ui/EgyptianDivider';

const ALL_PRODUCTS = getAllProducts();

interface RecentlyViewedProps {
  currentSlug: string;
}

export function RecentlyViewedTracker({ slug }: { slug: string }) {
  const { addProduct } = useRecentlyViewed();
  useEffect(() => { addProduct(slug); }, [slug, addProduct]);
  return null;
}

export function RecentlyViewed({ currentSlug }: RecentlyViewedProps) {
  const { ids } = useRecentlyViewed();
  const products = ids
    .filter((id) => id !== currentSlug)
    .map((id) => ALL_PRODUCTS.find((p) => p.slug === id))
    .filter(Boolean)
    .slice(0, 4) as ReturnType<typeof ALL_PRODUCTS.find>[];

  if (products.length === 0) return null;

  return (
    <section style={{ paddingTop: '3rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.4rem, 3vw, 1.75rem)', color: 'var(--color-secondary)', margin: '0 0 0.75rem' }}>
          Recently Viewed
        </h2>
        <EgyptianDivider />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem' }}>
        {products.map((p) => p && <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}
