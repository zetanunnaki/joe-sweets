'use client';

import Link from 'next/link';
import Image from 'next/image';
import { X, ShoppingBag, Gift } from 'lucide-react';
import { useCartDrawer, useCartItems, useCartSubtotal, useCartStore } from '@/store/cart';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils';
import { buildWhatsAppOrderUrl } from '@/lib/whatsapp';

const PHONE = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '12025550000';

const DELIVERY_FEE = 5;
const FREE_DELIVERY_MIN = 50;

export function CartDrawer() {
  const { isOpen, close } = useCartDrawer();
  const items = useCartItems();
  const subtotal = useCartSubtotal();
  const { removeItem, updateQty } = useCartStore();

  const deliveryFee = subtotal >= FREE_DELIVERY_MIN ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;
  const freeDeliveryProgress = Math.min((subtotal / FREE_DELIVERY_MIN) * 100, 100);
  const amountToFree = FREE_DELIVERY_MIN - subtotal;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={close}
          style={{
            position: 'fixed', inset: 0,
            backgroundColor: 'rgba(0,0,0,0.45)',
            zIndex: 45,
            backdropFilter: 'blur(2px)',
            WebkitBackdropFilter: 'blur(2px)',
          }}
        />
      )}

      {/* Drawer */}
      <div
        style={{
          position: 'fixed',
          top: 0, right: 0,
          height: '100%',
          width: 'min(420px, 100vw)',
          backgroundColor: 'var(--color-white)',
          zIndex: 50,
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 350ms cubic-bezier(0.22, 1, 0.36, 1)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-8px 0 40px rgba(0,0,0,0.15)',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--color-bg-alt)',
          background: 'var(--color-secondary)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <ShoppingBag size={20} color="var(--color-primary)" />
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', margin: 0, color: 'var(--color-white)' }}>
              Your Cart
            </h2>
            {items.length > 0 && (
              <span style={{
                backgroundColor: 'var(--color-primary)', color: 'white',
                borderRadius: '999px', padding: '1px 8px',
                fontSize: '0.75rem', fontWeight: 700,
              }}>
                {items.reduce((s, i) => s + i.qty, 0)}
              </span>
            )}
          </div>
          <button
            onClick={close}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,249,240,0.7)', padding: '6px', borderRadius: '6px', display: 'flex', alignItems: 'center', transition: 'color 150ms' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'white'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,249,240,0.7)'; }}
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free delivery progress bar */}
        {items.length > 0 && (
          <div style={{ padding: '0.875rem 1.5rem', backgroundColor: 'var(--color-bg-alt)', borderBottom: '1px solid rgba(200,150,62,0.12)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Gift size={14} color={amountToFree <= 0 ? '#22c55e' : 'var(--color-primary)'} />
              <p style={{ margin: 0, fontSize: '0.8rem', fontFamily: 'var(--font-body)', color: 'var(--color-secondary)', fontWeight: 500 }}>
                {amountToFree <= 0
                  ? 'You\'ve unlocked free delivery!'
                  : `Add ${formatCurrency(amountToFree)} more for free delivery`}
              </p>
            </div>
            <div style={{ height: '5px', backgroundColor: 'rgba(200,150,62,0.2)', borderRadius: '999px', overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${freeDeliveryProgress}%`,
                background: amountToFree <= 0
                  ? 'linear-gradient(90deg, #22c55e, #16a34a)'
                  : 'linear-gradient(90deg, var(--color-primary), #f0c060)',
                borderRadius: '999px',
                transition: 'width 600ms cubic-bezier(0.22, 1, 0.36, 1)',
              }} />
            </div>
          </div>
        )}

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.5rem' }}>
          {items.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '1.25rem', color: 'var(--color-muted)', textAlign: 'center', padding: '2rem' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--color-bg-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShoppingBag size={36} strokeWidth={1.25} color="var(--color-primary)" />
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', color: 'var(--color-secondary)', margin: '0 0 0.375rem' }}>Your cart is empty</p>
                <p style={{ fontSize: '0.875rem', margin: 0, lineHeight: 1.5 }}>Add some delicious Egyptian sweets to get started!</p>
              </div>
              <Link href="/menu" onClick={close} style={{ textDecoration: 'none' }}>
                <Button variant="primary">Browse Menu</Button>
              </Link>
            </div>
          ) : (
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {items.map((item) => (
                <li key={`${item.productId}-${item.variantId}`} style={{
                  display: 'flex', gap: '0.875rem', alignItems: 'flex-start',
                  padding: '0.875rem',
                  backgroundColor: 'var(--color-bg-alt)',
                  borderRadius: '10px',
                  border: '1px solid rgba(200,150,62,0.08)',
                }}>
                  <Link href={`/product/${item.productId}`} onClick={close} style={{ flexShrink: 0, display: 'block' }}>
                    <div style={{ width: '68px', height: '68px', borderRadius: '8px', overflow: 'hidden' }}>
                      <Image src={item.image} alt={item.name} width={68} height={68} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                    </div>
                  </Link>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: '0 0 2px', fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-secondary)', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</p>
                    <p style={{ margin: '0 0 6px', fontSize: '0.75rem', color: 'var(--color-muted)' }}>{item.variantLabel}</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                      <QuantityStepper
                        value={item.qty}
                        onChange={(qty) => updateQty(item.productId, item.variantId, qty)}
                      />
                      <span style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: '0.9rem' }}>
                        {formatCurrency(item.price * item.qty)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.productId, item.variantId)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-muted)', padding: '4px', flexShrink: 0, borderRadius: '4px', transition: 'color 150ms' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-accent)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-muted)'; }}
                    aria-label="Remove item"
                  >
                    <X size={15} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{ borderTop: '1px solid var(--color-bg-alt)', padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.625rem', backgroundColor: 'var(--color-white)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}>
              <span>Subtotal</span><span style={{ color: 'var(--color-secondary)', fontWeight: 500 }}>{formatCurrency(subtotal)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}>
              <span>Delivery</span>
              <span style={{ color: deliveryFee === 0 ? '#22c55e' : 'var(--color-secondary)', fontWeight: deliveryFee === 0 ? 700 : 500 }}>
                {deliveryFee === 0 ? 'Free!' : formatCurrency(deliveryFee)}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.05rem', color: 'var(--color-secondary)', paddingTop: '0.625rem', borderTop: '1px solid var(--color-bg-alt)', marginTop: '0.125rem' }}>
              <span style={{ fontFamily: 'var(--font-heading)' }}>Total</span>
              <span style={{ color: 'var(--color-primary)' }}>{formatCurrency(total)}</span>
            </div>
            <Link href="/checkout" onClick={close} style={{ textDecoration: 'none', marginTop: '0.25rem' }}>
              <Button variant="primary" fullWidth size="lg">Proceed to Checkout</Button>
            </Link>

            {/* WhatsApp alternative */}
            <a
              href={buildWhatsAppOrderUrl(items, PHONE)}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                padding: '0.65rem', borderRadius: '8px',
                backgroundColor: '#f0fdf4', border: '1.5px solid #bbf7d0',
                color: '#15803d', textDecoration: 'none',
                fontSize: '0.85rem', fontWeight: 600, fontFamily: 'var(--font-body)',
                transition: 'background 200ms',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#dcfce7'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#f0fdf4'; }}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="#25D366">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Order via WhatsApp instead
            </a>

            <button
              onClick={close}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-muted)', fontSize: '0.82rem', textDecoration: 'underline', padding: '0.25rem', fontFamily: 'var(--font-body)' }}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
