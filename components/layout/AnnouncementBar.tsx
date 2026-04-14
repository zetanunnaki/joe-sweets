'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const STORAGE_KEY = 'joe-sweets-announcement-dismissed-v2';

const MESSAGES = [
  { text: '🎁 Free delivery on orders over $50', link: '/menu', linkText: 'Shop now' },
  { text: '⭐ 500+ happy customers in the DMV', link: '/menu', linkText: 'Order today' },
  { text: '🌹 Fresh baked daily — no preservatives', link: '/about', linkText: 'Our story' },
  { text: '📦 Gift boxes available for Eid, weddings & birthdays', link: '/menu/boxes', linkText: 'View boxes' },
  { text: '🎉 Join rewards — earn points on every order', link: '/loyalty', linkText: 'Learn more' },
];

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(true);
  const [active, setActive] = useState(0);

  useEffect(() => {
    try { setDismissed(!!localStorage.getItem(STORAGE_KEY)); } catch { setDismissed(false); }
  }, []);

  // Keep CSS var in sync so the fixed Header can offset itself
  useEffect(() => {
    document.documentElement.style.setProperty('--bar-height', dismissed ? '0px' : '36px');
  }, [dismissed]);

  // Auto-rotate messages
  useEffect(() => {
    if (dismissed) return;
    const id = setInterval(() => setActive((a) => (a + 1) % MESSAGES.length), 4500);
    return () => clearInterval(id);
  }, [dismissed]);

  function dismiss() {
    try { localStorage.setItem(STORAGE_KEY, '1'); } catch {}
    setDismissed(true);
  }

  function prev() { setActive((a) => (a - 1 + MESSAGES.length) % MESSAGES.length); }
  function next() { setActive((a) => (a + 1) % MESSAGES.length); }

  if (dismissed) return null;

  const msg = MESSAGES[active];

  return (
    <>
    {/* Spacer so page content isn't hidden under the fixed bar */}
    <div style={{ height: '36px' }} />
    <div style={{
      backgroundColor: 'var(--color-primary)',
      color: 'var(--color-secondary)',
      padding: '0.45rem 2.5rem',
      textAlign: 'center',
      fontSize: '0.82rem',
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 45,
      letterSpacing: '0.015em',
      height: '36px',
      overflow: 'hidden',
    }}>
      {/* Prev/next (desktop) */}
      <button onClick={prev} aria-label="Previous" style={{ position: 'absolute', left: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-secondary)', opacity: 0.6, padding: '3px', display: 'flex', alignItems: 'center' }}>
        <ChevronLeft size={13} />
      </button>

      <span style={{ transition: 'opacity 300ms' }}>
        {msg.text}{' '}
        <Link href={msg.link} style={{ color: 'var(--color-secondary)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
          {msg.linkText}
        </Link>
      </span>

      {/* Dots */}
      <div style={{ display: 'flex', gap: '3px', position: 'absolute', bottom: '3px', left: '50%', transform: 'translateX(-50%)' }}>
        {MESSAGES.map((_, i) => (
          <div key={i} style={{ width: i === active ? '12px' : '4px', height: '3px', borderRadius: '2px', backgroundColor: i === active ? 'var(--color-secondary)' : 'rgba(44,24,16,0.35)', transition: 'width 250ms, background 250ms' }} />
        ))}
      </div>

      <button onClick={next} aria-label="Next" style={{ position: 'absolute', right: '2rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-secondary)', opacity: 0.6, padding: '3px', display: 'flex', alignItems: 'center' }}>
        <ChevronRight size={13} />
      </button>

      <button
        onClick={dismiss}
        aria-label="Dismiss"
        style={{
          position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)',
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--color-secondary)', opacity: 0.7, padding: '4px',
          display: 'flex', alignItems: 'center',
        }}
      >
        <X size={13} />
      </button>
    </div>
    </>
  );
}
