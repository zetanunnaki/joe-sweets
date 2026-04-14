'use client';

import { CardElement } from '@stripe/react-stripe-js';

export function StripeCardInput() {
  return (
    <div>
      <label style={{
        display: 'block',
        fontWeight: 500,
        fontSize: '0.875rem',
        color: 'var(--color-secondary)',
        fontFamily: 'var(--font-body)',
        marginBottom: '0.375rem',
      }}>
        Card Details <span style={{ color: 'var(--color-accent)' }}>*</span>
      </label>
      <div style={{
        padding: '0.75rem 0.875rem',
        borderRadius: '8px',
        border: '2px solid #e2d9cf',
        backgroundColor: 'var(--color-white)',
        transition: 'border-color 200ms',
      }}
        onFocus={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--color-primary)'; }}
        onBlur={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = '#e2d9cf'; }}
      >
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#2C1810',
                fontFamily: 'system-ui, sans-serif',
                '::placeholder': { color: '#8C7A6B' },
              },
              invalid: { color: '#D44D4D' },
            },
          }}
        />
      </div>
      <p style={{ margin: '0.375rem 0 0', fontSize: '0.75rem', color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}>
        Secured by Stripe · Your card details are never stored
      </p>
    </div>
  );
}
