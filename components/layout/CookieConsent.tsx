'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const STORAGE_KEY = 'joe-sweets-cookie-consent';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        // Small delay so page content loads first
        const t = setTimeout(() => setVisible(true), 1500);
        return () => clearTimeout(t);
      }
    } catch {}
  }, []);

  function accept() {
    try { localStorage.setItem(STORAGE_KEY, 'accepted'); } catch {}
    setVisible(false);
  }

  function decline() {
    try { localStorage.setItem(STORAGE_KEY, 'declined'); } catch {}
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
          style={{
            position: 'fixed', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)',
            zIndex: 50, width: 'calc(100% - 3rem)', maxWidth: '600px',
            backgroundColor: 'var(--color-secondary)',
            borderRadius: '16px',
            border: '1px solid rgba(200,150,62,0.2)',
            padding: '1.25rem 1.5rem',
            boxShadow: '0 16px 60px rgba(0,0,0,0.3)',
            display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap',
          }}
        >
          {/* Gold accent line */}
          <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: '2px', background: 'linear-gradient(90deg, transparent, var(--color-primary), transparent)', borderRadius: '0 0 2px 2px' }} />

          <p style={{ flex: 1, fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'rgba(255,249,240,0.8)', margin: 0, lineHeight: 1.6, minWidth: '200px' }}>
            We use cookies to improve your experience and for analytics.{' '}
            <Link href="/faq" style={{ color: 'var(--color-primary)', textDecoration: 'underline', textUnderlineOffset: '2px' }}>Learn more</Link>
          </p>
          <div style={{ display: 'flex', gap: '0.625rem', flexShrink: 0 }}>
            <button onClick={decline} style={{ padding: '0.5rem 1rem', background: 'none', border: '1px solid rgba(200,150,62,0.3)', color: 'rgba(255,249,240,0.6)', borderRadius: '8px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 500 }}>
              Decline
            </button>
            <button onClick={accept} style={{ padding: '0.5rem 1.25rem', background: 'linear-gradient(135deg, var(--color-primary), #A67A2E)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 600 }}>
              Accept
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
