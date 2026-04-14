'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface SeasonalEvent {
  id: string;
  emoji: string;
  name: string;
  arabicName: string;
  tagline: string;
  cta: string;
  ctaLink: string;
  gradient: string;
  accentColor: string;
  // date range [month (0-based), day] pairs for start/end
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
}

const SEASONAL_EVENTS: SeasonalEvent[] = [
  {
    id: 'ramadan',
    emoji: '🌙',
    name: 'Ramadan Specials',
    arabicName: 'رمضان كريم',
    tagline: 'Celebrate the holy month with our traditional Qatayef, Kunafa & Om Ali. Free delivery on all Ramadan boxes.',
    cta: 'Shop Ramadan Menu',
    ctaLink: '/menu?tag=ramadan',
    gradient: 'linear-gradient(135deg, #1a1040 0%, #2d1b69 50%, #1a1040 100%)',
    accentColor: '#c8963e',
    startMonth: 2, startDay: 1,
    endMonth: 3, endDay: 30,
  },
  {
    id: 'eid',
    emoji: '🎉',
    name: 'Eid Celebration',
    arabicName: 'عيد مبارك',
    tagline: 'Make Eid unforgettable with custom gift boxes, Kahk cookies & our signature sweet trays. Order now.',
    cta: 'Build an Eid Box',
    ctaLink: '/gift-builder',
    gradient: 'linear-gradient(135deg, #1a0e05 0%, #2C1810 50%, #1a0e05 100%)',
    accentColor: '#c8963e',
    startMonth: 3, startDay: 1,
    endMonth: 4, endDay: 15,
  },
  {
    id: 'summer',
    emoji: '☀️',
    name: 'Summer Sips & Sweets',
    arabicName: 'يلا نبرد',
    tagline: 'Beat the heat with our chilled Ayran, Lemon Mint, and refreshing summer desserts.',
    cta: 'Shop Summer Drinks',
    ctaLink: '/menu/drinks',
    gradient: 'linear-gradient(135deg, #0a2a1a 0%, #0d3320 50%, #0a2a1a 100%)',
    accentColor: '#4dba7f',
    startMonth: 5, startDay: 1,
    endMonth: 8, endDay: 31,
  },
];

const STORAGE_KEY = 'joe-sweets-seasonal-dismissed';

function getActiveEvent(): SeasonalEvent | null {
  const now = new Date();
  const month = now.getMonth();
  const day = now.getDate();
  return SEASONAL_EVENTS.find((ev) => {
    const afterStart = month > ev.startMonth || (month === ev.startMonth && day >= ev.startDay);
    const beforeEnd = month < ev.endMonth || (month === ev.endMonth && day <= ev.endDay);
    return afterStart && beforeEnd;
  }) ?? null;
}

export function SeasonalBanner() {
  const [event, setEvent] = useState<SeasonalEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const active = getActiveEvent();
    if (!active) return;
    try {
      const key = `${STORAGE_KEY}-${active.id}`;
      if (!sessionStorage.getItem(key)) {
        setEvent(active);
      }
    } catch {
      setEvent(active);
    }
  }, []);

  function dismiss() {
    if (!event) return;
    try { sessionStorage.setItem(`${STORAGE_KEY}-${event.id}`, '1'); } catch {}
    setDismissed(true);
  }

  if (!event || dismissed) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: event.gradient,
        padding: 'clamp(2.5rem, 5vw, 4rem) 1.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Star pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cg fill='none' stroke='%23C8963E' stroke-width='0.5' opacity='0.08'%3E%3Cpolygon points='24,4 28,14 38,14 30,20 33,30 24,24 15,30 18,20 10,14 20,14'/%3E%3C/g%3E%3C/svg%3E\")",
        backgroundRepeat: 'repeat', pointerEvents: 'none',
      }} />

      {/* Glow orbs */}
      <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '300px', height: '300px', borderRadius: '50%', background: `radial-gradient(circle, ${event.accentColor}22 0%, transparent 70%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '250px', height: '250px', borderRadius: '50%', background: `radial-gradient(circle, ${event.accentColor}15 0%, transparent 70%)`, pointerEvents: 'none' }} />

      {/* Gold shimmer line */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${event.accentColor}, transparent)` }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${event.accentColor}, transparent)` }} />

      {/* Dismiss */}
      <button
        onClick={dismiss}
        aria-label="Dismiss"
        style={{
          position: 'absolute', top: '1rem', right: '1rem',
          background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '50%', width: '32px', height: '32px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: 'rgba(255,255,255,0.7)',
          transition: 'background 200ms',
        }}
      >
        <X size={14} />
      </button>

      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        {/* Emoji + Arabic name */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '2.5rem', lineHeight: 1 }}>{event.emoji}</span>
          <p style={{ fontFamily: 'var(--font-script)', fontSize: '1.5rem', color: event.accentColor, margin: 0, opacity: 0.9 }}>
            {event.arabicName}
          </p>
          <span style={{ fontSize: '2.5rem', lineHeight: 1 }}>{event.emoji}</span>
        </div>

        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: '#fff', margin: '0 0 0.875rem' }}>
          {event.name}
        </h2>

        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.9rem, 2.5vw, 1.05rem)', color: 'rgba(255,249,240,0.82)', lineHeight: 1.7, margin: '0 auto 2rem', maxWidth: '560px' }}>
          {event.tagline}
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href={event.ctaLink}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.875rem 2rem',
              borderRadius: '8px',
              background: `linear-gradient(135deg, ${event.accentColor}, ${event.accentColor}cc)`,
              color: event.id === 'summer' ? '#0a2a1a' : 'var(--color-secondary)',
              fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.95rem',
              textDecoration: 'none',
              boxShadow: `0 4px 20px ${event.accentColor}55`,
              transition: 'transform 200ms, box-shadow 200ms',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 28px ${event.accentColor}66`; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 4px 20px ${event.accentColor}55`; }}
          >
            <Sparkles size={16} />
            {event.cta}
          </Link>
          <Link
            href="/menu"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.875rem 1.5rem',
              borderRadius: '8px',
              background: 'transparent',
              color: 'rgba(255,249,240,0.85)',
              border: '1.5px solid rgba(255,249,240,0.3)',
              fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9rem',
              textDecoration: 'none',
              transition: 'border-color 200ms, color 200ms',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,249,240,0.65)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,249,240,0.3)'; e.currentTarget.style.color = 'rgba(255,249,240,0.85)'; }}
          >
            View Full Menu
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
