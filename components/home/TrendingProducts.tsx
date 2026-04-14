'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TrendingUp, ShoppingBag, Check, Flame } from 'lucide-react';
import { getAllProducts } from '@/lib/products';
import { useCartStore } from '@/store/cart';
import { useToastStore } from '@/store/toast';
import { formatCurrency } from '@/lib/utils';
import { staggerContainer, staggerItem } from '@/components/ui/SectionReveal';

// Top 5 by rating × review count (weighted score)
const TRENDING = getAllProducts()
  .filter((p) => p.inStock)
  .map((p) => ({ ...p, score: p.rating * Math.log1p(p.reviewCount) }))
  .sort((a, b) => b.score - a.score)
  .slice(0, 5);

function TrendingCard({ product, rank }: { product: typeof TRENDING[0]; rank: number }) {
  const { addItem, openDrawer } = useCartStore();
  const { addToast } = useToastStore();
  const [added, setAdded] = useState(false);
  const variant = product.variants[0];

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    addItem({
      productId: product.id, variantId: variant.id,
      qty: 1, price: variant.price,
      name: product.name, image: product.images[0],
      variantLabel: variant.label,
    });
    addToast(`${product.name} added to cart`);
    openDrawer();
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  const isTop = rank === 1;

  return (
    <motion.div
      variants={staggerItem}
      style={{
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
        padding: '0.875rem 1rem',
        borderRadius: '14px',
        backgroundColor: isTop ? 'rgba(200,150,62,0.07)' : 'var(--color-white)',
        border: `1.5px solid ${isTop ? 'rgba(200,150,62,0.3)' : 'rgba(200,150,62,0.1)'}`,
        boxShadow: isTop ? '0 4px 20px rgba(200,150,62,0.1)' : '0 2px 10px rgba(44,24,16,0.04)',
        transition: 'box-shadow 250ms, transform 250ms',
        cursor: 'pointer',
      }}
      whileHover={{ y: -3, boxShadow: '0 8px 28px rgba(200,150,62,0.18)' }}
    >
      {/* Rank badge */}
      <div style={{
        width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
        background: rank === 1
          ? 'linear-gradient(135deg, #f0c060, var(--color-primary))'
          : rank === 2
          ? 'linear-gradient(135deg, #c0c0c0, #a0a0a0)'
          : rank === 3
          ? 'linear-gradient(135deg, #cd7f32, #a05c1e)'
          : 'rgba(200,150,62,0.12)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--font-heading)', fontSize: '0.75rem', fontWeight: 700,
        color: rank <= 3 ? 'white' : 'var(--color-muted)',
      }}>
        {rank}
      </div>

      {/* Image */}
      <Link href={`/product/${product.slug}`} style={{ flexShrink: 0 }}>
        <div style={{ position: 'relative', width: '64px', height: '64px', borderRadius: '10px', overflow: 'hidden' }}>
          <Image src={product.images[0]} alt={product.name} fill style={{ objectFit: 'cover' }} sizes="64px" />
        </div>
      </Link>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <Link href={`/product/${product.slug}`} style={{ textDecoration: 'none' }}>
          <p style={{ margin: 0, fontFamily: 'var(--font-heading)', fontSize: '0.9rem', color: 'var(--color-secondary)', fontWeight: 600, lineHeight: 1.3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {product.name}
          </p>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.2rem' }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="var(--color-primary)">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          <span style={{ fontSize: '0.72rem', color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}>
            {product.rating.toFixed(1)} · {product.reviewCount} reviews
          </span>
        </div>
        <p style={{ margin: '0.2rem 0 0', fontFamily: 'var(--font-heading)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-primary)' }}>
          {formatCurrency(variant.price)}
        </p>
      </div>

      {/* Add button */}
      <button
        onClick={handleAdd}
        title={`Add ${product.name} to cart`}
        style={{
          width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
          border: 'none',
          background: added ? '#166534' : 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
          color: 'white',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          transition: 'background 250ms, transform 150ms',
          boxShadow: '0 2px 8px rgba(200,150,62,0.3)',
        }}
      >
        {added ? <Check size={15} /> : <ShoppingBag size={15} />}
      </button>
    </motion.div>
  );
}

export function TrendingProducts() {
  if (TRENDING.length === 0) return null;

  return (
    <section style={{ padding: '4.5rem 1.5rem', backgroundColor: 'var(--color-bg)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }} className="trending-grid">

          {/* Left: section header + featured */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Flame size={16} color="white" />
              </div>
              <p style={{ fontFamily: 'var(--font-script)', fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>Right now</p>
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem, 3.5vw, 2.25rem)', color: 'var(--color-secondary)', margin: '0 0 1rem' }}>
              Trending This Week
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--color-muted)', lineHeight: 1.7, margin: '0 0 1.75rem' }}>
              Based on customer reviews and repeat orders — these are the items everyone&apos;s talking about.
            </p>

            {/* Featured #1 product hero card */}
            <Link href={`/product/${TRENDING[0].slug}`} style={{ textDecoration: 'none', display: 'block' }}>
              <motion.div
                whileHover={{ y: -4 }}
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  position: 'relative',
                  height: '240px',
                  boxShadow: '0 8px 32px rgba(200,150,62,0.2)',
                  border: '1.5px solid rgba(200,150,62,0.2)',
                }}
              >
                <Image
                  src={TRENDING[0].images[0]}
                  alt={TRENDING[0].name}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(44,24,16,0.9) 0%, rgba(44,24,16,0.2) 60%, transparent 100%)' }} />
                {/* #1 badge */}
                <div style={{
                  position: 'absolute', top: '0.75rem', left: '0.75rem',
                  display: 'flex', alignItems: 'center', gap: '0.3rem',
                  padding: '0.3rem 0.75rem', borderRadius: '100px',
                  background: 'linear-gradient(135deg, #f0c060, var(--color-primary))',
                  color: 'white', fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 700,
                }}>
                  <TrendingUp size={11} />
                  #1 This Week
                </div>
                <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', right: '1rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'white', margin: '0 0 0.25rem' }}>
                    {TRENDING[0].name}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'rgba(255,249,240,0.75)' }}>
                      ★ {TRENDING[0].rating.toFixed(1)} · {TRENDING[0].reviewCount} reviews
                    </span>
                    <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--color-primary)', fontSize: '1rem' }}>
                      {formatCurrency(TRENDING[0].variants[0].price)}
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>

          {/* Right: ranked list */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
          >
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 0.25rem' }}>
              Top Picks
            </p>
            {TRENDING.slice(0, 5).map((p, i) => (
              <TrendingCard key={p.id} product={p} rank={i + 1} />
            ))}
            <Link href="/menu?sort=rating-desc" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
              marginTop: '0.25rem',
              fontFamily: 'var(--font-body)', fontSize: '0.82rem',
              color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none',
            }}>
              View all top-rated items →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
