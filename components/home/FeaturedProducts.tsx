'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Check } from 'lucide-react';
import { getFeaturedProducts, getAllProducts } from '@/lib/products';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/store/cart';
import { useToastStore } from '@/store/toast';
import { formatCurrency } from '@/lib/utils';
import { Product } from '@/types';
import { staggerContainer, staggerItem } from '@/components/ui/SectionReveal';
import { EgyptianDivider } from '@/components/ui/EgyptianDivider';

const CATEGORY_LABELS: Record<string, string> = {
  all: 'All',
  sweets: 'Sweets',
  foods: 'Savory',
  drinks: 'Drinks',
  boxes: 'Gift Boxes',
};

function ProductCard({ product }: { product: Product }) {
  const { addItem, openDrawer } = useCartStore();
  const { addToast } = useToastStore();
  const [added, setAdded] = useState(false);
  const defaultVariant = product.variants[0];

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
      className="gold-top-border"
      style={{
        borderRadius: '14px',
        overflow: 'hidden',
        backgroundColor: 'var(--color-white)',
        boxShadow: '0 4px 24px rgba(44,24,16,0.08)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 300ms ease, box-shadow 300ms ease',
        height: '100%',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = 'translateY(-6px)';
        el.style.boxShadow = '0 16px 48px rgba(200,150,62,0.22)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = 'translateY(0)';
        el.style.boxShadow = '0 4px 24px rgba(44,24,16,0.08)';
      }}
    >
      <Link href={`/product/${product.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
        <div style={{ position: 'relative', height: '210px', overflow: 'hidden' }}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            style={{ objectFit: 'cover', transition: 'transform 450ms ease' }}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.06)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(44,24,16,0.2) 0%, transparent 55%)' }} />
          {!product.inStock && (
            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Badge variant="muted">Out of Stock</Badge>
            </div>
          )}
          {product.tags.includes('bestseller') && (
            <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem' }}>
              <Badge variant="primary">
                <span style={{ background: 'linear-gradient(90deg,#C8963E,#f0c060,#C8963E)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'shimmer-gold 3s linear infinite' }}>Bestseller</span>
              </Badge>
            </div>
          )}
          {product.compareAtPrice && (
            <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}>
              <Badge variant="accent">Sale</Badge>
            </div>
          )}
        </div>
      </Link>

      <div style={{ padding: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1 }}>
        <Link href={`/product/${product.slug}`} style={{ textDecoration: 'none' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: 'var(--color-secondary)', margin: 0, lineHeight: 1.3 }}>{product.name}</h3>
        </Link>

        {/* Stars */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill={i < Math.round(product.rating) ? 'var(--color-primary)' : '#e2d9cf'}>
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          ))}
          <span style={{ fontSize: '0.7rem', color: 'var(--color-muted)', marginLeft: '0.125rem', fontFamily: 'var(--font-body)' }}>
            {product.rating.toFixed(1)} ({product.reviewCount})
          </span>
        </div>

        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--color-muted)', margin: 0, lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {product.description}
        </p>

        <div style={{ marginTop: 'auto', paddingTop: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
          <div>
            <span style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--color-primary)' }}>{formatCurrency(defaultVariant.price)}</span>
            {product.compareAtPrice && (
              <span style={{ marginLeft: '0.4rem', fontSize: '0.8rem', color: 'var(--color-muted)', textDecoration: 'line-through' }}>{formatCurrency(product.compareAtPrice)}</span>
            )}
          </div>
          <Button variant="primary" size="sm" onClick={handleAddToCart} disabled={!product.inStock}>
            {added ? <><Check size={13} /> Done</> : <><ShoppingBag size={13} /> Add</>}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function FeaturedProducts() {
  const featured = getFeaturedProducts();
  const all = getAllProducts().filter((p) => p.inStock);

  // Build category list from featured + all products
  const cats = ['all', ...Array.from(new Set(featured.map((p) => p.category)))];
  const [activeTab, setActiveTab] = useState('all');

  const displayed = activeTab === 'all'
    ? featured
    : featured.filter((p) => p.category === activeTab);

  return (
    <section style={{ padding: '5rem 0', backgroundColor: 'var(--color-bg)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ padding: '0 1.5rem', textAlign: 'center', marginBottom: '0.75rem' }}
        >
          <p style={{ fontFamily: 'var(--font-script)', fontSize: '1.3rem', color: 'var(--color-primary)', marginBottom: '0.5rem', marginTop: 0 }}>Fresh Today</p>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: 'var(--color-secondary)', margin: '0 0 1rem' }}>
            <span className="shimmer-gold-text">Featured</span> Items
          </h2>
          <EgyptianDivider />
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap', padding: '1.25rem 1.5rem 2rem' }}
        >
          {cats.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              style={{
                padding: '0.5rem 1.125rem',
                borderRadius: '100px',
                border: `1.5px solid ${activeTab === cat ? 'var(--color-primary)' : 'rgba(200,150,62,0.2)'}`,
                backgroundColor: activeTab === cat ? 'var(--color-primary)' : 'transparent',
                color: activeTab === cat ? 'white' : 'var(--color-secondary)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                fontWeight: activeTab === cat ? 700 : 500,
                cursor: 'pointer',
                transition: 'all 200ms ease',
              }}
            >
              {CATEGORY_LABELS[cat] ?? cat}
            </button>
          ))}
        </motion.div>

        {/* Product grid with AnimatePresence */}
        <div style={{ padding: '0 1.5rem' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}
            >
              {displayed.map((product) => (
                <motion.div key={product.id} variants={staggerItem}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Browse all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ textAlign: 'center', marginTop: '2.5rem', padding: '0 1.5rem' }}
        >
          <Link href="/menu" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.875rem 2rem',
            border: '1.5px solid rgba(200,150,62,0.4)',
            borderRadius: '8px',
            color: 'var(--color-secondary)',
            fontFamily: 'var(--font-body)',
            fontSize: '0.95rem',
            fontWeight: 600,
            textDecoration: 'none',
            transition: 'border-color 200ms, color 200ms, background 200ms',
          }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.color = 'var(--color-primary)'; e.currentTarget.style.background = 'rgba(200,150,62,0.04)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(200,150,62,0.4)'; e.currentTarget.style.color = 'var(--color-secondary)'; e.currentTarget.style.background = 'transparent'; }}
          >
            View Full Menu — {all.length} items →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
