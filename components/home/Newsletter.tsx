'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { EgyptianDivider } from '@/components/ui/EgyptianDivider';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) { setStatus('success'); setEmail(''); }
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section style={{ padding: '5rem 1.5rem', backgroundColor: 'var(--color-secondary)', position: 'relative', overflow: 'hidden' }}>
      {/* Pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cg fill='none' stroke='%23C8963E' stroke-width='0.5' opacity='0.07'%3E%3Cpolygon points='24,4 28,14 38,14 30,20 33,30 24,24 15,30 18,20 10,14 20,14'/%3E%3C/g%3E%3C/svg%3E\")",
        backgroundRepeat: 'repeat', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '580px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Icon */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '50%',
              background: 'rgba(200,150,62,0.15)',
              border: '1.5px solid rgba(200,150,62,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Mail size={24} color="var(--color-primary)" strokeWidth={1.5} />
            </div>
          </div>

          <p style={{ fontFamily: 'var(--font-script)', fontSize: '1.3rem', color: 'var(--color-primary)', marginBottom: '0.5rem', marginTop: 0 }}>Stay in the Loop</p>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 3.5vw, 2.1rem)', color: 'var(--color-white)', marginBottom: '0.75rem', marginTop: 0 }}>
            Get <span className="shimmer-gold-text">10% Off</span> Your First Order
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--color-muted)', marginBottom: '1.5rem', lineHeight: 1.7, marginTop: 0 }}>
            Subscribe for exclusive deals, new menu items, and Egyptian food stories.
          </p>
          <div style={{ marginBottom: '2rem' }}>
            <EgyptianDivider color="var(--color-primary)" opacity={0.3} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {status === 'success' ? (
            <div style={{
              backgroundColor: 'rgba(200,150,62,0.12)',
              border: '1px solid rgba(200,150,62,0.4)',
              borderRadius: '14px', padding: '2rem',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem',
            }}>
              <CheckCircle size={36} color="var(--color-primary)" />
              <p style={{ margin: 0, fontWeight: 600, color: 'var(--color-white)', fontFamily: 'var(--font-heading)' }}>
                You&apos;re subscribed! Your 10% discount code will arrive shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <div style={{ flex: '1 1 260px' }}>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email address"
                  style={{ backgroundColor: 'rgba(255,249,240,0.08)', borderColor: 'rgba(200,150,62,0.35)', color: 'var(--color-white)' } as React.CSSProperties}
                />
              </div>
              <Button type="submit" variant="primary" loading={status === 'loading'} size="md">
                Subscribe
              </Button>
            </form>
          )}
          {status === 'error' && (
            <p style={{ color: 'var(--color-accent)', fontSize: '0.875rem', marginTop: '0.75rem' }}>Something went wrong. Please try again.</p>
          )}
          <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)', marginTop: '1.25rem', marginBottom: 0, opacity: 0.7 }}>No spam, ever. Unsubscribe anytime.</p>
        </motion.div>
      </div>
    </section>
  );
}
