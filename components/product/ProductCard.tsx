'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { ShoppingBag, Eye, Check, Heart, GitCompare } from 'lucide-react';
import { Product } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/store/cart';
import { useToastStore } from '@/store/toast';
import { useWishlistStore } from '@/store/wishlist';
import { useCompareStore } from '@/store/compare';
import { formatCurrency } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  onQuickView?: () => void;
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addItem, openDrawer } = useCartStore();
  const { addToast } = useToastStore();
  const { toggle: toggleWishlist, has: isWishlisted } = useWishlistStore();
  const { toggle: toggleCompare, has: isCompared, ids: compareIds } = useCompareStore();
  const [added, setAdded] = useState(false);
  const defaultVariant = product.variants[0];
  const wishlisted = isWishlisted(product.id);
  const compared = isCompared(product.id);
  const compareFull = compareIds.length >= 3 && !compared;

  // Deterministic scarcity signal from product id (no real inventory needed)
  const stockSignal = useMemo(() => {
    if (!product.inStock) return null;
    const sum = product.id.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    const n = sum % 22;
    if (n < 4) return { type: 'critical' as const, count: n + 2 };
    if (n < 9 || product.tags.includes('bestseller')) return { type: 'popular' as const };
    return null;
  }, [product.id, product.inStock, product.tags]);

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    addItem({
      productId: product.id,
      variantId: defaultVariant.id,
      qty: 1,
      price: defaultVariant.price,
      name: product.name,
      image: product.images[0],
      variantLabel: defaultVariant.label,
    });
    addToast(`${product.name} added to cart`);
    openDrawer();
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div
      className="gold-top-border product-card"
      style={{
        borderRadius: '14px',
        overflow: 'hidden',
        backgroundColor: 'var(--color-white)',
        boxShadow: '0 4px 24px rgba(44,24,16,0.08)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 300ms ease, box-shadow 300ms ease',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = 'translateY(-6px)';
        el.style.boxShadow = '0 16px 48px rgba(200,150,62,0.22)';
        const qv = el.querySelector('.qv-btn') as HTMLButtonElement;
        if (qv) qv.style.opacity = '1';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = 'translateY(0)';
        el.style.boxShadow = '0 4px 24px rgba(44,24,16,0.08)';
        const qv = el.querySelector('.qv-btn') as HTMLButtonElement;
        if (qv) qv.style.opacity = '0';
      }}
    >
      <Link href={`/product/${product.slug}`} style={{ textDecoration: 'none', display: 'block', position: 'relative' }}>
        <div className="product-card-img-wrap" style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            style={{ objectFit: 'cover', transition: 'transform 450ms ease' }}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.06)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(44,24,16,0.18) 0%, transparent 55%)' }} />
          {!product.inStock && (
            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(1px)' }}>
              <Badge variant="muted">Out of Stock</Badge>
            </div>
          )}

          {/* Quick view button */}
          {onQuickView && (
            <button
              className="qv-btn"
              onClick={(e) => { e.preventDefault(); onQuickView(); }}
              style={{
                position: 'absolute', bottom: '0.75rem', left: '50%', transform: 'translateX(-50%)',
                display: 'flex', alignItems: 'center', gap: '0.35rem',
                padding: '0.4rem 0.875rem',
                borderRadius: '100px',
                backgroundColor: 'rgba(255,255,255,0.92)',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: 'var(--color-secondary)',
                opacity: 0,
                transition: 'opacity 200ms',
                backdropFilter: 'blur(4px)',
                whiteSpace: 'nowrap',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              }}
              aria-label="Quick view"
            >
              <Eye size={12} />
              Quick View
            </button>
          )}
        </div>
        {/* Badges */}
        <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {product.tags.includes('bestseller') && <Badge variant="primary">Bestseller</Badge>}
        </div>
        <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', alignItems: 'flex-end' }}>
          {product.compareAtPrice && <Badge variant="accent">Sale</Badge>}
          <button
            onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); addToast(wishlisted ? 'Removed from wishlist' : `${product.name} saved!`); }}
            style={{
              width: '30px', height: '30px', borderRadius: '50%',
              background: wishlisted ? 'rgba(212,77,77,0.15)' : 'rgba(255,255,255,0.85)',
              border: wishlisted ? '1.5px solid rgba(212,77,77,0.4)' : '1.5px solid rgba(255,255,255,0.6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', backdropFilter: 'blur(4px)',
              transition: 'all 200ms', padding: 0,
            }}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
          >
            <Heart size={13} fill={wishlisted ? '#D44D4D' : 'none'} color={wishlisted ? '#D44D4D' : 'rgba(255,255,255,0.9)'} />
          </button>
        </div>
      </Link>

      <div className="product-card-body" style={{ padding: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', flex: 1 }}>
        <Link href={`/product/${product.slug}`} style={{ textDecoration: 'none' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', color: 'var(--color-secondary)', margin: 0, lineHeight: 1.3 }}>
            {product.name}
          </h3>
        </Link>
        {/* Star rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill={i < Math.round(product.rating) ? 'var(--color-primary)' : '#e2d9cf'}>
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          ))}
          <span style={{ fontSize: '0.72rem', color: 'var(--color-muted)', marginLeft: '0.125rem', fontFamily: 'var(--font-body)' }}>({product.reviewCount})</span>
        </div>
        {stockSignal && (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
            fontSize: '0.7rem', fontWeight: 700,
            padding: '0.2rem 0.5rem',
            borderRadius: '100px',
            ...(stockSignal.type === 'critical'
              ? { backgroundColor: '#fff3f0', color: '#c0392b', border: '1px solid rgba(192,57,43,0.2)' }
              : { backgroundColor: '#fff8e6', color: '#92600a', border: '1px solid rgba(200,150,62,0.25)' }
            ),
            fontFamily: 'var(--font-body)',
            width: 'fit-content',
          }}>
            {stockSignal.type === 'critical'
              ? `⚡ Only ${stockSignal.count} left!`
              : '🔥 Popular · Low stock'}
          </div>
        )}
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--color-muted)', margin: 0, lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {product.description}
        </p>
        <div style={{ marginTop: 'auto', paddingTop: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
          <div>
            <span style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-primary)' }}>
              {formatCurrency(defaultVariant.price)}
            </span>
            {product.compareAtPrice && (
              <span style={{ marginLeft: '0.4rem', fontSize: '0.82rem', color: 'var(--color-muted)', textDecoration: 'line-through' }}>
                {formatCurrency(product.compareAtPrice)}
              </span>
            )}
          </div>
          <div style={{ display: 'flex', gap: '0.375rem' }}>
            <button
              onClick={(e) => { e.preventDefault(); if (!compareFull) toggleCompare(product.id); }}
              title={compareFull ? 'Compare is full (max 3)' : compared ? 'Remove from compare' : 'Add to compare'}
              style={{
                width: '32px', height: '32px', borderRadius: '8px',
                border: `1.5px solid ${compared ? 'var(--color-secondary)' : '#e2d9cf'}`,
                background: compared ? 'var(--color-secondary)' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: compareFull ? 'not-allowed' : 'pointer',
                opacity: compareFull ? 0.4 : 1, transition: 'all 200ms',
              }}
            >
              <GitCompare size={13} color={compared ? 'var(--color-primary)' : 'var(--color-muted)'} />
            </button>
            <Button variant="primary" size="sm" onClick={handleAddToCart} disabled={!product.inStock}>
              {added ? <Check size={13} /> : <ShoppingBag size={14} />}
              {added ? 'Added' : 'Add'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
