'use client';

import { useState } from 'react';
import { Product } from '@/types';
import { ProductCard } from './ProductCard';
import { QuickViewModal } from './QuickViewModal';

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
}

export function ProductGrid({ products, emptyMessage = 'No products found.' }: ProductGridProps) {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  if (products.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1.5rem', color: 'var(--color-muted)' }}>
        <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Nothing here yet</p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem' }}>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <>
      <div className="product-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: '1.5rem',
      }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onQuickView={() => setQuickViewProduct(product)} />
        ))}
      </div>
      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </>
  );
}
