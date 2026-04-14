'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ShoppingBag, Check, Heart, Star } from 'lucide-react';
import { Product } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { useCartStore } from '@/store/cart';
import { useToastStore } from '@/store/toast';
import { useWishlistStore } from '@/store/wishlist';
import { formatCurrency } from '@/lib/utils';

interface Props {
  products: Product[];
  emptyMessage?: string;
}

function ListItem({ product }: { product: Product }) {
  const { addItem, openDrawer } = useCartStore();
  const { addToast } = useToastStore();
  const { toggle: toggleWishlist, has: isWishlisted } = useWishlistStore();
  const [added, setAdded] = useState(false);
  const defaultVariant = product.variants[0];
  const wishlisted = isWishlisted(product.id);

  function handleAdd(e: React.MouseEvent) {
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
      className="product-list-item"
      style={{
        display: 'flex',
        gap: '1.25rem',
        padding: '1rem',
        backgroundColor: 'var(--color-white)',
        borderRadius: '12px',
        border: '1px solid rgba(200,150,62,0.1)',
        boxShadow: '0 2px 12px rgba(44,24,16,0.05)',
        alignItems: 'center',
        transition: 'box-shadow 250ms, border-color 250ms',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.boxShadow = '0 6px 24px rgba(200,150,62,0.15)';
        el.style.borderColor = 'rgba(200,150,62,0.3)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.boxShadow = '0 2px 12px rgba(44,24,16,0.05)';
        el.style.borderColor = 'rgba(200,150,62,0.1)';
      }}
    >
      {/* Image */}
      <Link href={`/product/${product.slug}`} style={{ flexShrink: 0 }}>
        <div style={{ position: 'relative', width: '100px', height: '100px', borderRadius: '10px', overflow: 'hidden' }}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            style={{ objectFit: 'cover' }}
            sizes="100px"
          />
          {!product.inStock && (
            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'white', fontSize: '0.65rem', fontWeight: 700, fontFamily: 'var(--font-body)' }}>OUT OF STOCK</span>
            </div>
          )}
        </div>
      </Link>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', gap: '0.375rem', marginBottom: '0.3rem', flexWrap: 'wrap' }}>
          <Badge variant="muted">{product.category}</Badge>
          {product.tags.includes('bestseller') && <Badge variant="primary">Bestseller</Badge>}
          {product.compareAtPrice && <Badge variant="accent">Sale</Badge>}
        </div>
        <Link href={`/product/${product.slug}`} style={{ textDecoration: 'none' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: 'var(--color-secondary)', margin: '0 0 0.25rem', lineHeight: 1.3 }}>
            {product.name}
          </h3>
        </Link>
        {/* Stars */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', marginBottom: '0.3rem' }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill={i < Math.round(product.rating) ? 'var(--color-primary)' : '#e2d9cf'}>
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          ))}
          <span style={{ fontSize: '0.7rem', color: 'var(--color-muted)', fontFamily: 'var(--font-body)', marginLeft: '2px' }}>
            {product.rating.toFixed(1)} ({product.reviewCount})
          </span>
        </div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--color-muted)', margin: 0, lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {product.description}
        </p>
      </div>

      {/* Price + Actions */}
      <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.625rem' }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary)' }}>
            {formatCurrency(defaultVariant.price)}
          </div>
          {product.compareAtPrice && (
            <div style={{ fontSize: '0.78rem', color: 'var(--color-muted)', textDecoration: 'line-through', fontFamily: 'var(--font-body)' }}>
              {formatCurrency(product.compareAtPrice)}
            </div>
          )}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => toggleWishlist(product.id)}
            title={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
            style={{
              width: '36px', height: '36px',
              borderRadius: '8px',
              border: '1.5px solid',
              borderColor: wishlisted ? '#D44D4D' : 'rgba(200,150,62,0.2)',
              background: wishlisted ? 'rgba(212,77,77,0.08)' : 'transparent',
              color: wishlisted ? '#D44D4D' : 'var(--color-muted)',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 200ms',
            }}
          >
            <Heart size={14} fill={wishlisted ? '#D44D4D' : 'none'} />
          </button>
          <button
            onClick={handleAdd}
            disabled={!product.inStock}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.35rem',
              padding: '0.5rem 0.875rem',
              borderRadius: '8px',
              border: 'none',
              background: added
                ? '#166534'
                : product.inStock
                ? 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))'
                : '#e2d9cf',
              color: 'white',
              fontFamily: 'var(--font-body)',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: product.inStock ? 'pointer' : 'not-allowed',
              transition: 'all 200ms',
              whiteSpace: 'nowrap',
            }}
          >
            {added ? <><Check size={13} /> Added</> : <><ShoppingBag size={13} /> Add</>}
          </button>
        </div>
      </div>
    </div>
  );
}

export function ProductListView({ products, emptyMessage = 'No products found.' }: Props) {
  if (products.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1.5rem', color: 'var(--color-muted)' }}>
        <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Nothing here yet</p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem' }}>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
      {products.map((product) => (
        <ListItem key={product.id} product={product} />
      ))}
    </div>
  );
}
