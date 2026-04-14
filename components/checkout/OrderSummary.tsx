'use client';

import { useState } from 'react';
import { CartItem } from '@/types';
import { formatCurrency } from '@/lib/utils';
import Image from 'next/image';
import { Tag, Check } from 'lucide-react';

/* Hard-coded promo codes (in prod, validate server-side) */
const PROMO_CODES: Record<string, { discount: number; label: string }> = {
  WELCOME10: { discount: 0.10, label: '10% off' },
  SWEET15:   { discount: 0.15, label: '15% off' },
  EGYPT20:   { discount: 0.20, label: '20% off' },
};

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  onDiscountChange?: (discount: number) => void;
}

export function OrderSummary({ items, subtotal, onDiscountChange }: OrderSummaryProps) {
  const [code, setCode] = useState('');
  const [applied, setApplied] = useState<{ discount: number; label: string } | null>(null);
  const [promoError, setPromoError] = useState('');

  const deliveryFee = subtotal >= 50 ? 0 : 5;
  const discountAmount = applied ? subtotal * applied.discount : 0;
  const total = subtotal + deliveryFee - discountAmount;

  function applyPromo() {
    const promo = PROMO_CODES[code.trim().toUpperCase()];
    if (promo) {
      setApplied(promo);
      setPromoError('');
      onDiscountChange?.(discountAmount);
    } else {
      setPromoError('Invalid code. Try WELCOME10');
      setApplied(null);
      onDiscountChange?.(0);
    }
  }

  function removePromo() {
    setApplied(null);
    setCode('');
    setPromoError('');
    onDiscountChange?.(0);
  }

  return (
    <div style={{ backgroundColor: 'var(--color-white)', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 24px rgba(44,24,16,0.08)', border: '1px solid rgba(200,150,62,0.08)' }}>
      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--color-secondary)', margin: '0 0 1.25rem' }}>Order Summary</h3>

      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
        {items.map((item) => (
          <li key={`${item.productId}-${item.variantId}`} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <div style={{ position: 'relative', width: '48px', height: '48px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
              <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} sizes="48px" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-secondary)', fontFamily: 'var(--font-body)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</p>
              <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--color-muted)' }}>{item.variantLabel} × {item.qty}</p>
            </div>
            <span style={{ fontWeight: 600, color: 'var(--color-secondary)', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>{formatCurrency(item.price * item.qty)}</span>
          </li>
        ))}
      </ul>

      {/* Promo code */}
      <div style={{ marginBottom: '1rem', padding: '0.875rem', backgroundColor: 'var(--color-bg-alt)', borderRadius: '10px' }}>
        {applied ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Check size={13} color="white" />
              </div>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#15803d', fontFamily: 'var(--font-body)' }}>
                {code.toUpperCase()} · {applied.label} applied!
              </span>
            </div>
            <button onClick={removePromo} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-muted)', fontSize: '0.78rem', fontFamily: 'var(--font-body)', fontWeight: 500 }}>Remove</button>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <Tag size={14} style={{ position: 'absolute', left: '0.625rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-muted)', pointerEvents: 'none' }} />
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && applyPromo()}
                  placeholder="Promo code"
                  style={{ width: '100%', padding: '0.5rem 0.625rem 0.5rem 2rem', borderRadius: '6px', border: `1px solid ${promoError ? '#fca5a5' : '#e2d9cf'}`, backgroundColor: 'var(--color-white)', fontFamily: 'var(--font-body)', fontSize: '0.82rem', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
              <button
                onClick={applyPromo}
                disabled={!code.trim()}
                style={{ padding: '0.5rem 0.875rem', background: 'linear-gradient(135deg, var(--color-primary), #A67A2E)', color: 'white', border: 'none', borderRadius: '6px', cursor: code.trim() ? 'pointer' : 'not-allowed', opacity: code.trim() ? 1 : 0.5, fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 600, whiteSpace: 'nowrap' }}
              >
                Apply
              </button>
            </div>
            {promoError && <p style={{ margin: '0.35rem 0 0', fontSize: '0.75rem', color: 'var(--color-accent)', fontFamily: 'var(--font-body)' }}>{promoError}</p>}
          </div>
        )}
      </div>

      <div style={{ borderTop: '1px solid var(--color-bg-alt)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--color-muted)' }}>
          <span>Subtotal</span><span>{formatCurrency(subtotal)}</span>
        </div>
        {applied && (
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#15803d', fontWeight: 600 }}>
            <span>Discount ({applied.label})</span><span>−{formatCurrency(discountAmount)}</span>
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--color-muted)' }}>
          <span>Delivery</span>
          <span style={{ color: deliveryFee === 0 ? '#22c55e' : undefined }}>{deliveryFee === 0 ? 'Free!' : formatCurrency(deliveryFee)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.05rem', paddingTop: '0.5rem', borderTop: '1px solid var(--color-bg-alt)' }}>
          <span style={{ color: 'var(--color-secondary)', fontFamily: 'var(--font-heading)' }}>Total</span>
          <span style={{ color: 'var(--color-primary)' }}>{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );
}
