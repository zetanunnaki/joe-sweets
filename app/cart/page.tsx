'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, X, ArrowRight, Trash2, Tag, Check } from 'lucide-react';
import { useCartItems, useCartSubtotal, useCartStore } from '@/store/cart';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils';
import { buildWhatsAppOrderUrl } from '@/lib/whatsapp';
import { getAllProducts } from '@/lib/products';
import { useToastStore } from '@/store/toast';
import { useState, useMemo } from 'react';

const ALL_PRODUCTS = getAllProducts();

const PHONE = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '12025550000';

const PROMO_CODES: Record<string, { type: 'pct' | 'fixed'; value: number; label: string }> = {
  'WELCOME10': { type: 'pct', value: 10, label: '10% off your order' },
  'JOESWEETS15': { type: 'pct', value: 15, label: '15% off your order' },
  'FREESHIP': { type: 'fixed', value: 5, label: 'Free delivery' },
  'EID2026': { type: 'pct', value: 20, label: '20% Eid special' },
};

export default function CartPage() {
  const items = useCartItems();
  const subtotal = useCartSubtotal();
  const { removeItem, updateQty, clearCart, addItem } = useCartStore();
  const { addToast } = useToastStore();
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<typeof PROMO_CODES[string] | null>(null);
  const [promoError, setPromoError] = useState('');
  const [upsellAdded, setUpsellAdded] = useState<string>('');

  // Upsell: products not already in cart, top rated, in stock
  const cartIds = items.map((i) => i.productId);
  const upsells = useMemo(() =>
    ALL_PRODUCTS.filter((p) => p.inStock && !cartIds.includes(p.id))
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items]
  );

  function handleUpsellAdd(p: typeof ALL_PRODUCTS[0]) {
    addItem({ productId: p.id, variantId: p.variants[0].id, qty: 1, price: p.variants[0].price, name: p.name, image: p.images[0], variantLabel: p.variants[0].label });
    addToast(`${p.name} added to cart`);
    setUpsellAdded(p.id);
    setTimeout(() => setUpsellAdded(''), 1800);
  }

  function applyPromo() {
    const code = promoInput.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setAppliedPromo(PROMO_CODES[code]);
      setPromoError('');
    } else {
      setAppliedPromo(null);
      setPromoError('Invalid promo code');
    }
  }

  const DELIVERY_FEE = 5;
  const FREE_DELIVERY_MIN = 50;
  const rawDelivery = subtotal >= FREE_DELIVERY_MIN ? 0 : DELIVERY_FEE;
  const discount = appliedPromo
    ? appliedPromo.type === 'pct'
      ? (subtotal * appliedPromo.value) / 100
      : Math.min(appliedPromo.value, rawDelivery || appliedPromo.value)
    : 0;
  const deliveryFee = appliedPromo?.type === 'fixed' ? Math.max(0, rawDelivery - appliedPromo.value) : rawDelivery;
  const total = subtotal + deliveryFee - (appliedPromo?.type === 'pct' ? discount : 0);

  if (items.length === 0) {
    return (
      <div style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', padding: '4rem 1.5rem', backgroundColor: 'var(--color-bg)' }}>
        <ShoppingBag size={64} strokeWidth={1} color="var(--color-muted)" />
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--color-secondary)', margin: 0 }}>Your cart is empty</h1>
        <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-muted)', margin: 0, textAlign: 'center', maxWidth: '360px' }}>
          Looks like you haven&apos;t added anything yet. Browse our menu and find something delicious!
        </p>
        <Link href="/menu">
          <Button variant="primary" size="lg">
            Browse Menu <ArrowRight size={18} />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)', padding: '2.5rem 1.5rem 4rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: 'var(--color-secondary)', marginBottom: '2rem', marginTop: 0 }}>
          Your Cart
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 340px', gap: '2rem', alignItems: 'start' }} className="cart-layout">
          {/* Items list */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
              <button
                onClick={clearCart}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-muted)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.375rem', fontFamily: 'var(--font-body)' }}
              >
                <Trash2 size={14} /> Clear cart
              </button>
            </div>

            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {items.map((item) => (
                <li
                  key={`${item.productId}-${item.variantId}`}
                  style={{
                    display: 'flex',
                    gap: '1.25rem',
                    padding: '1.25rem',
                    backgroundColor: 'var(--color-white)',
                    borderRadius: '12px',
                    boxShadow: '0 2px 12px rgba(44,24,16,0.06)',
                    alignItems: 'center',
                  }}
                >
                  {/* Image */}
                  <div style={{ width: '88px', height: '88px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                    <Image src={item.image} alt={item.name} width={88} height={88} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                  </div>

                  {/* Details */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <Link href={`/product/${item.productId}`} style={{ textDecoration: 'none' }}>
                      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: 'var(--color-secondary)', margin: '0 0 0.25rem', lineHeight: 1.3 }}>
                        {item.name}
                      </h3>
                    </Link>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--color-muted)', margin: '0 0 0.75rem' }}>
                      {item.variantLabel}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                      <QuantityStepper
                        value={item.qty}
                        onChange={(qty) => updateQty(item.productId, item.variantId, qty)}
                      />
                      <span style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: '1rem' }}>
                        {formatCurrency(item.price * item.qty)}
                      </span>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.productId, item.variantId)}
                    aria-label="Remove item"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-muted)', padding: '4px', flexShrink: 0, borderRadius: '6px' }}
                  >
                    <X size={18} />
                  </button>
                </li>
              ))}
            </ul>

            {/* Upsell strip */}
            {upsells.length > 0 && (
              <div style={{ marginTop: '2rem', padding: '1.25rem', backgroundColor: 'var(--color-white)', borderRadius: '12px', boxShadow: '0 2px 12px rgba(44,24,16,0.06)' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 0.875rem' }}>
                  People also add
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                  {upsells.map((p) => (
                    <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                        <Image src={p.images[0]} alt={p.name} width={48} height={48} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.82rem', color: 'var(--color-secondary)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</p>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 700, margin: 0 }}>{formatCurrency(p.variants[0].price)}</p>
                      </div>
                      <button
                        onClick={() => handleUpsellAdd(p)}
                        style={{
                          flexShrink: 0, padding: '0.3rem 0.75rem', borderRadius: '8px', border: 'none',
                          background: upsellAdded === p.id ? '#15803d' : 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
                          color: 'white', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.75rem', cursor: 'pointer',
                          transition: 'all 200ms',
                        }}
                      >
                        {upsellAdded === p.id ? '✓ Added' : '+ Add'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ marginTop: '1.5rem' }}>
              <Link href="/menu" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500, fontSize: '0.9rem', fontFamily: 'var(--font-body)' }}>
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order summary */}
          <div style={{ backgroundColor: 'var(--color-white)', borderRadius: '12px', padding: '1.75rem', boxShadow: '0 4px 24px rgba(44,24,16,0.08)', position: 'sticky', top: '80px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: 'var(--color-secondary)', margin: '0 0 1.25rem' }}>Order Summary</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--color-secondary)', fontFamily: 'var(--font-body)' }}>
                <span>Subtotal ({items.reduce((s, i) => s + i.qty, 0)} items)</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--color-secondary)', fontFamily: 'var(--font-body)' }}>
                <span>Delivery</span>
                <span style={{ color: deliveryFee === 0 ? '#22c55e' : undefined }}>
                  {deliveryFee === 0 ? 'Free!' : formatCurrency(deliveryFee)}
                </span>
              </div>
              {subtotal < FREE_DELIVERY_MIN && (
                <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)', margin: 0, backgroundColor: 'var(--color-bg-alt)', padding: '0.625rem', borderRadius: '6px' }}>
                  Add {formatCurrency(FREE_DELIVERY_MIN - subtotal)} more for free delivery 🎁
                </p>
              )}
              {appliedPromo && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#15803d', fontFamily: 'var(--font-body)', fontWeight: 600 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Tag size={12} /> Promo discount</span>
                  <span>-{formatCurrency(discount)}</span>
                </div>
              )}
            </div>

            {/* Promo code */}
            <div style={{ marginBottom: '1rem' }}>
              {appliedPromo ? (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.625rem 0.875rem', borderRadius: '8px', backgroundColor: '#f0fdf4', border: '1.5px solid #bbf7d0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Check size={14} color="#15803d" />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#15803d', fontWeight: 600 }}>{appliedPromo.label}</span>
                  </div>
                  <button onClick={() => { setAppliedPromo(null); setPromoInput(''); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#15803d', fontSize: '0.75rem', fontFamily: 'var(--font-body)', fontWeight: 600 }}>Remove</button>
                </div>
              ) : (
                <div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => { setPromoInput(e.target.value); setPromoError(''); }}
                      placeholder="Promo code"
                      onKeyDown={(e) => { if (e.key === 'Enter') applyPromo(); }}
                      style={{
                        flex: 1, padding: '0.6rem 0.875rem', borderRadius: '8px',
                        border: `1.5px solid ${promoError ? '#D44D4D' : '#e2d9cf'}`,
                        fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-secondary)',
                        outline: 'none', textTransform: 'uppercase', letterSpacing: '0.05em',
                      }}
                    />
                    <button
                      onClick={applyPromo}
                      style={{ padding: '0.6rem 1rem', borderRadius: '8px', border: 'none', background: 'var(--color-secondary)', color: 'white', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer', whiteSpace: 'nowrap' }}
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#D44D4D', margin: '0.25rem 0 0' }}>{promoError}</p>}
                </div>
              )}
            </div>

            <div style={{ borderTop: '2px solid var(--color-bg-alt)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1.25rem' }}>
              <span style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-secondary)' }}>Total</span>
              <span style={{ color: 'var(--color-primary)' }}>{formatCurrency(total)}</span>
            </div>

            <Link href="/checkout" style={{ textDecoration: 'none', display: 'block' }}>
              <Button variant="primary" fullWidth size="lg">
                Proceed to Checkout <ArrowRight size={18} />
              </Button>
            </Link>

            {/* WhatsApp alternative */}
            <a
              href={buildWhatsAppOrderUrl(items, PHONE)}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                padding: '0.75rem', borderRadius: '8px',
                backgroundColor: '#f0fdf4', border: '1.5px solid #bbf7d0',
                color: '#15803d', textDecoration: 'none',
                fontSize: '0.875rem', fontWeight: 600, fontFamily: 'var(--font-body)',
                transition: 'background 200ms',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#dcfce7'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#f0fdf4'; }}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="#25D366">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Order via WhatsApp instead
            </a>

            <p style={{ fontSize: '0.78rem', color: 'var(--color-muted)', textAlign: 'center', marginTop: '0.5rem', marginBottom: 0, fontFamily: 'var(--font-body)' }}>
              Secure checkout · DMV delivery only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
