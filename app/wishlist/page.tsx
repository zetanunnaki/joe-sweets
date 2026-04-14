'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlist';
import { getAllProducts } from '@/lib/products';
import { ProductGrid } from '@/components/product/ProductGrid';
import { EgyptianDivider } from '@/components/ui/EgyptianDivider';

const ALL_PRODUCTS = getAllProducts();

export default function WishlistPage() {
  const { ids, clear } = useWishlistStore();

  const saved = useMemo(
    () => ALL_PRODUCTS.filter((p) => ids.includes(p.id)),
    [ids]
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)', paddingBottom: '4rem' }}>
      {/* Hero */}
      <div style={{
        backgroundColor: 'var(--color-secondary)',
        padding: 'clamp(2rem, 5vw, 3.5rem) 1.5rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cg fill='none' stroke='%23C8963E' stroke-width='0.5' opacity='0.07'%3E%3Cpolygon points='24,4 28,14 38,14 30,20 33,30 24,24 15,30 18,20 10,14 20,14'/%3E%3C/g%3E%3C/svg%3E\")",
          backgroundRepeat: 'repeat', pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative' }}>
          <p style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(1rem, 3vw, 1.3rem)', color: 'var(--color-primary)', marginBottom: '0.4rem', marginTop: 0 }}>
            Your Saved Items
          </p>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 5vw, 3rem)', color: 'var(--color-white)', margin: '0 0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <Heart size={28} fill="#D44D4D" color="#D44D4D" />
            Wishlist
          </h1>
          <EgyptianDivider color="var(--color-primary)" />
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        {saved.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 1.5rem' }}>
            <div style={{
              width: '80px', height: '80px', borderRadius: '50%',
              background: 'rgba(212,77,77,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.5rem',
            }}>
              <Heart size={36} color="#D44D4D" />
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: 'var(--color-secondary)', marginBottom: '0.75rem' }}>
              Nothing saved yet
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-muted)', marginBottom: '2rem', fontSize: '0.95rem' }}>
              Tap the heart on any product to save it here for later.
            </p>
            <Link href="/menu" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.875rem 2rem', borderRadius: '10px',
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
              color: 'var(--color-white)', fontFamily: 'var(--font-body)', fontWeight: 600,
              fontSize: '0.95rem', textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(200,150,62,0.35)',
            }}>
              <ShoppingBag size={16} /> Browse Menu
            </Link>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-muted)', margin: 0 }}>
                {saved.length} {saved.length === 1 ? 'item' : 'items'} saved
              </p>
              <button
                onClick={clear}
                style={{
                  background: 'none', border: '1.5px solid #e2d9cf',
                  borderRadius: '8px', padding: '0.4rem 1rem',
                  fontFamily: 'var(--font-body)', fontSize: '0.8rem',
                  color: 'var(--color-muted)', cursor: 'pointer',
                }}
              >
                Clear all
              </button>
            </div>
            <ProductGrid products={saved} />
          </>
        )}
      </div>
    </div>
  );
}
