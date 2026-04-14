'use client';

import { useState, useEffect } from 'react';
import { X, Mail, CheckCircle, Sparkles } from 'lucide-react';

const STORAGE_KEY = 'joe-sweets-popup-dismissed';
const DELAY_MS = 18000; // 18 seconds

export function NewsletterPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
    } catch {}
    const t = setTimeout(() => setVisible(true), DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  function dismiss() {
    try { sessionStorage.setItem(STORAGE_KEY, '1'); } catch {}
    setVisible(false);
  }

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
      if (res.ok) {
        setStatus('success');
        setTimeout(dismiss, 3200);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (!visible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={dismiss}
        style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: 'rgba(44,24,16,0.55)',
          backdropFilter: 'blur(3px)',
          animation: 'popup-fade-in 300ms ease',
        }}
      />

      {/* Popup card */}
      <div style={{
        position: 'fixed', zIndex: 201,
        bottom: '50%', left: '50%',
        transform: 'translate(-50%, 50%)',
        width: 'min(480px, calc(100vw - 2rem))',
        borderRadius: '20px',
        backgroundColor: 'var(--color-secondary)',
        overflow: 'hidden',
        boxShadow: '0 24px 80px rgba(0,0,0,0.45)',
        animation: 'popup-slide-up 380ms cubic-bezier(0.22, 1, 0.36, 1)',
      }}>
        {/* Gold top gradient bar */}
        <div style={{ height: '3px', background: 'linear-gradient(90deg, var(--color-primary), #f0c060, var(--color-primary))' }} />

        {/* Pattern overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cg fill='none' stroke='%23C8963E' stroke-width='0.5' opacity='0.06'%3E%3Cpolygon points='24,4 28,14 38,14 30,20 33,30 24,24 15,30 18,20 10,14 20,14'/%3E%3C/g%3E%3C/svg%3E\")",
          backgroundRepeat: 'repeat', pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', padding: '2.25rem 2rem 2rem' }}>
          {/* Close */}
          <button
            onClick={dismiss}
            aria-label="Close"
            style={{
              position: 'absolute', top: '1rem', right: '1rem',
              background: 'rgba(255,249,240,0.08)', border: '1px solid rgba(255,249,240,0.12)',
              borderRadius: '50%', width: '30px', height: '30px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'rgba(255,249,240,0.6)',
              transition: 'background 200ms',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,249,240,0.14)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,249,240,0.08)'; }}
          >
            <X size={14} />
          </button>

          {/* Icon */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <div style={{
              width: '60px', height: '60px', borderRadius: '50%',
              background: 'rgba(200,150,62,0.15)',
              border: '1.5px solid rgba(200,150,62,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
            }}>
              <Mail size={26} color="var(--color-primary)" strokeWidth={1.4} />
              <div style={{
                position: 'absolute', top: '-4px', right: '-4px',
                width: '18px', height: '18px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #f0c060, var(--color-primary))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Sparkles size={9} color="white" />
              </div>
            </div>
          </div>

          <p style={{ fontFamily: 'var(--font-script)', fontSize: '1.2rem', color: 'var(--color-primary)', textAlign: 'center', margin: '0 0 0.4rem' }}>
            A little gift for you
          </p>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.35rem, 4vw, 1.8rem)', color: 'var(--color-white)', textAlign: 'center', margin: '0 0 0.75rem', lineHeight: 1.2 }}>
            Get <span style={{ color: 'var(--color-primary)' }}>10% Off</span> Your First Order
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'rgba(255,249,240,0.6)', textAlign: 'center', margin: '0 0 1.5rem', lineHeight: 1.65 }}>
            Subscribe to our newsletter and receive exclusive deals, new menu items, and Egyptian food stories.
          </p>

          {status === 'success' ? (
            <div style={{
              background: 'rgba(200,150,62,0.12)', border: '1px solid rgba(200,150,62,0.3)',
              borderRadius: '12px', padding: '1.5rem', textAlign: 'center',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.625rem',
            }}>
              <CheckCircle size={32} color="var(--color-primary)" />
              <p style={{ margin: 0, color: 'var(--color-white)', fontFamily: 'var(--font-heading)', fontSize: '1rem' }}>
                Welcome to the family! 🎉
              </p>
              <p style={{ margin: 0, color: 'rgba(255,249,240,0.65)', fontFamily: 'var(--font-body)', fontSize: '0.82rem' }}>
                Check your inbox for your discount code.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%', padding: '0.8rem 1rem', borderRadius: '10px',
                  border: '1.5px solid rgba(200,150,62,0.3)',
                  background: 'rgba(255,249,240,0.06)',
                  color: 'var(--color-white)',
                  fontFamily: 'var(--font-body)', fontSize: '0.9rem',
                  outline: 'none', boxSizing: 'border-box',
                  transition: 'border-color 200ms',
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(200,150,62,0.3)'; }}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                  width: '100%', padding: '0.875rem',
                  background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
                  color: 'white', border: 'none', borderRadius: '10px',
                  fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: 700,
                  cursor: status === 'loading' ? 'wait' : 'pointer',
                  boxShadow: '0 4px 20px rgba(200,150,62,0.4)',
                  transition: 'transform 200ms, box-shadow 200ms',
                  opacity: status === 'loading' ? 0.8 : 1,
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'; }}
              >
                {status === 'loading' ? 'Subscribing…' : 'Get My 10% Off'}
              </button>
              {status === 'error' && (
                <p style={{ margin: 0, color: '#f87171', fontSize: '0.8rem', textAlign: 'center', fontFamily: 'var(--font-body)' }}>
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          )}

          <p style={{ textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'rgba(255,249,240,0.35)', margin: '1rem 0 0' }}>
            No spam, ever. Unsubscribe anytime.{' '}
            <button onClick={dismiss} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,249,240,0.4)', fontSize: '0.72rem', padding: 0, textDecoration: 'underline', fontFamily: 'var(--font-body)' }}>
              No thanks
            </button>
          </p>
        </div>
      </div>
    </>
  );
}
