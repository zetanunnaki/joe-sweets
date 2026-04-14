'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, CheckCircle } from 'lucide-react';

interface BackInStockFormProps {
  productName: string;
  productId: string;
}

export function BackInStockForm({ productName, productId }: BackInStockFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes('@')) { setErrorMsg('Please enter a valid email address.'); return; }
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/notify-stock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, productId, productName }),
      });
      if (res.ok) {
        setStatus('success');
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error || 'Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
      setStatus('error');
    }
  }

  return (
    <div style={{
      padding: '1.25rem',
      borderRadius: '12px',
      backgroundColor: 'var(--color-bg-alt)',
      border: '1px solid rgba(200,150,62,0.15)',
    }}>
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.625rem', textAlign: 'center', padding: '0.5rem 0' }}
          >
            <CheckCircle size={32} color="var(--color-primary)" />
            <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.95rem', color: 'var(--color-secondary)' }}>
              You're on the list!
            </p>
            <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}>
              We'll email you as soon as {productName} is back in stock.
            </p>
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <Bell size={16} color="var(--color-primary)" />
              <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-secondary)' }}>
                Notify me when back in stock
              </p>
            </div>
            <p style={{ margin: '0 0 0.875rem', fontSize: '0.8rem', color: 'var(--color-muted)', fontFamily: 'var(--font-body)', lineHeight: 1.5 }}>
              Enter your email and we'll let you know the moment {productName} is available again.
            </p>
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                style={{
                  flex: 1,
                  minWidth: '180px',
                  padding: '0.625rem 0.875rem',
                  borderRadius: '8px',
                  border: '2px solid rgba(200,150,62,0.2)',
                  backgroundColor: 'var(--color-white)',
                  color: 'var(--color-secondary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  outline: 'none',
                  transition: 'border-color 150ms',
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(200,150,62,0.2)'; }}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                  padding: '0.625rem 1.125rem',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
                  color: 'white',
                  border: 'none',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  cursor: status === 'loading' ? 'wait' : 'pointer',
                  opacity: status === 'loading' ? 0.7 : 1,
                  transition: 'opacity 150ms',
                  flexShrink: 0,
                }}
              >
                {status === 'loading' ? 'Saving…' : 'Notify Me'}
              </button>
            </form>
            {errorMsg && (
              <p style={{ margin: '0.5rem 0 0', fontSize: '0.78rem', color: 'var(--color-accent)', fontFamily: 'var(--font-body)' }}>
                {errorMsg}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
