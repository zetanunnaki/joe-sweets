'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Package } from 'lucide-react';

export default function OrderLookupPage() {
  const [orderId, setOrderId] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = orderId.trim().toUpperCase();
    if (!trimmed) { setError('Please enter an order ID.'); return; }
    setError('');
    router.push(`/orders/${trimmed}`);
  }

  return (
    <div style={{ minHeight: '80vh', backgroundColor: 'var(--color-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.5rem' }}>
      <div style={{ width: '100%', maxWidth: '480px', textAlign: 'center' }}>
        {/* Icon */}
        <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(200,150,62,0.15), rgba(200,150,62,0.05))', border: '1.5px solid rgba(200,150,62,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
          <Package size={32} color="var(--color-primary)" strokeWidth={1.5} />
        </div>

        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 4vw, 2rem)', color: 'var(--color-secondary)', margin: '0 0 0.5rem' }}>
          Track Your Order
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--color-muted)', marginBottom: '2rem', lineHeight: 1.6 }}>
          Enter your order ID from your confirmation email to check your order status.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          <div style={{ position: 'relative' }}>
            <Search size={16} color="var(--color-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="e.g. ORD-20260414-001"
              style={{
                width: '100%',
                padding: '0.875rem 1rem 0.875rem 2.75rem',
                borderRadius: '10px',
                border: `2px solid ${error ? 'var(--color-accent)' : 'rgba(200,150,62,0.2)'}`,
                backgroundColor: 'var(--color-white)',
                color: 'var(--color-secondary)',
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 150ms',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => { if (!error) e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = error ? 'var(--color-accent)' : 'rgba(200,150,62,0.2)'; }}
            />
          </div>
          {error && <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--color-accent)', fontFamily: 'var(--font-body)' }}>{error}</p>}
          <button
            type="submit"
            style={{
              padding: '0.875rem',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
              color: 'white',
              border: 'none',
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(200,150,62,0.35)',
              transition: 'transform 150ms, box-shadow 150ms',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(200,150,62,0.45)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(200,150,62,0.35)'; }}
          >
            Track Order
          </button>
        </form>

        <p style={{ marginTop: '1.5rem', fontSize: '0.82rem', color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}>
          Can&apos;t find your order?{' '}
          <a href={`https://wa.me/12025550000`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}>
            Contact us on WhatsApp
          </a>
        </p>
      </div>
    </div>
  );
}
