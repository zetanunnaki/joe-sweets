'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Zap, ShoppingBag, Check } from 'lucide-react';
import { getAllProducts } from '@/lib/products';
import { useCartStore } from '@/store/cart';
import { useToastStore } from '@/store/toast';
import { formatCurrency } from '@/lib/utils';

const DEAL_PRODUCTS = getAllProducts().filter((p) => p.compareAtPrice && p.inStock).slice(0, 4);

// Flash deal resets every 8 hours
function getEndTime() {
  const now = new Date();
  const periodMs = 8 * 60 * 60 * 1000;
  const elapsed = now.getTime() % periodMs;
  return new Date(now.getTime() + (periodMs - elapsed));
}

function formatTime(ms: number) {
  if (ms <= 0) return { h: '00', m: '00', s: '00' };
  const totalSec = Math.floor(ms / 1000);
  const h = String(Math.floor(totalSec / 3600)).padStart(2, '0');
  const m = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0');
  const s = String(totalSec % 60).padStart(2, '0');
  return { h, m, s };
}

function CountdownUnit({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{
        width: '44px', height: '44px', borderRadius: '8px',
        background: 'rgba(44,24,16,0.85)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.3rem',
        color: 'var(--color-primary)', letterSpacing: '0.02em',
      }}>
        {value}
      </div>
      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', color: 'rgba(255,249,240,0.55)', marginTop: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</span>
    </div>
  );
}

export function FlashDeals() {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [addedId, setAddedId] = useState<string>('');
  const { addItem, openDrawer } = useCartStore();
  const { addToast } = useToastStore();

  useEffect(() => {
    const end = getEndTime().getTime();
    function tick() {
      setTimeLeft(Math.max(0, end - Date.now()));
    }
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  if (DEAL_PRODUCTS.length === 0) return null;

  const { h, m, s } = formatTime(timeLeft);

  function handleAdd(p: typeof DEAL_PRODUCTS[0]) {
    addItem({ productId: p.id, variantId: p.variants[0].id, qty: 1, price: p.variants[0].price, name: p.name, image: p.images[0], variantLabel: p.variants[0].label });
    addToast(`${p.name} added to cart`);
    openDrawer();
    setAddedId(p.id);
    setTimeout(() => setAddedId(''), 1800);
  }

  return (
    <section style={{
      padding: '4rem 1.5rem',
      background: 'linear-gradient(180deg, var(--color-secondary) 0%, #1a0e09 100%)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Gold shimmer line at top */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--color-primary), transparent)' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              animation: 'float 3s ease-in-out infinite',
            }}>
              <Zap size={20} color="white" fill="white" />
            </div>
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.4rem,3vw,2rem)', color: 'var(--color-white)', margin: 0 }}>Flash Deals</h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--color-primary)', margin: 0, fontWeight: 500 }}>Limited time · While supplies last</p>
            </div>
          </div>

          {/* Countdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <CountdownUnit value={h} label="hrs" />
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--color-primary)', alignSelf: 'flex-start', marginTop: '4px' }}>:</span>
            <CountdownUnit value={m} label="min" />
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--color-primary)', alignSelf: 'flex-start', marginTop: '4px' }}>:</span>
            <CountdownUnit value={s} label="sec" />
          </div>
        </div>

        {/* Product cards */}
        <div className="flash-deals-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '1.25rem',
        }}>
          {DEAL_PRODUCTS.map((p) => {
            const savings = p.compareAtPrice! - p.variants[0].price;
            const pct = Math.round((savings / p.compareAtPrice!) * 100);
            const isAdded = addedId === p.id;
            return (
              <div key={p.id} style={{
                backgroundColor: 'rgba(255,249,240,0.04)',
                border: '1px solid rgba(200,150,62,0.2)',
                borderRadius: '14px', overflow: 'hidden',
                transition: 'border-color 200ms, transform 200ms',
              }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = 'rgba(200,150,62,0.5)'; el.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = 'rgba(200,150,62,0.2)'; el.style.transform = ''; }}
              >
                <Link href={`/product/${p.slug}`} style={{ display: 'block', position: 'relative' }}>
                  <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                    <Image src={p.images[0]} alt={p.name} fill style={{ objectFit: 'cover' }} sizes="260px" />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)' }} />
                    <div style={{
                      position: 'absolute', top: '0.75rem', left: '0.75rem',
                      backgroundColor: '#D44D4D', color: 'white',
                      padding: '0.2rem 0.6rem', borderRadius: '999px',
                      fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.78rem',
                    }}>
                      -{pct}%
                    </div>
                  </div>
                </Link>
                <div style={{ padding: '1rem' }}>
                  <Link href={`/product/${p.slug}`} style={{ textDecoration: 'none' }}>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', color: 'var(--color-white)', margin: '0 0 0.5rem', lineHeight: 1.3 }}>{p.name}</h3>
                  </Link>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.875rem' }}>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary)' }}>{formatCurrency(p.variants[0].price)}</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'rgba(255,249,240,0.4)', textDecoration: 'line-through' }}>{formatCurrency(p.compareAtPrice!)}</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: '#6ee7b7', fontWeight: 600 }}>Save {formatCurrency(savings)}</span>
                  </div>
                  <button
                    onClick={() => handleAdd(p)}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                      padding: '0.625rem', borderRadius: '8px', border: 'none', cursor: 'pointer',
                      background: isAdded ? '#166534' : 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
                      color: 'white', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.85rem',
                      transition: 'all 200ms',
                    }}
                  >
                    {isAdded ? <><Check size={14} /> Added!</> : <><ShoppingBag size={14} /> Add to Cart</>}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link href="/menu" style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none', opacity: 0.8 }}>
            View all deals →
          </Link>
        </div>
      </div>

      {/* Gold shimmer line at bottom */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--color-primary), transparent)' }} />
    </section>
  );
}
