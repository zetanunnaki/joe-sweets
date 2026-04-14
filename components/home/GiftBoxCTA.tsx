'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Gift } from 'lucide-react';

export function GiftBoxCTA() {
  return (
    <section style={{
      padding: '5rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 50%, #d4a44a 100%)',
    }}>
      {/* Pattern overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='0.5' opacity='0.08'%3E%3Cpolygon points='24,4 28,14 38,14 30,20 33,30 24,24 15,30 18,20 10,14 20,14'/%3E%3C/g%3E%3C/svg%3E\")",
        backgroundRepeat: 'repeat',
        pointerEvents: 'none',
      }} />

      {/* Corner ornaments */}
      <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', width: '40px', height: '40px', borderTop: '2px solid rgba(255,255,255,0.3)', borderLeft: '2px solid rgba(255,255,255,0.3)', borderRadius: '4px 0 0 0' }} />
      <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', width: '40px', height: '40px', borderTop: '2px solid rgba(255,255,255,0.3)', borderRight: '2px solid rgba(255,255,255,0.3)', borderRadius: '0 4px 0 0' }} />
      <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', width: '40px', height: '40px', borderBottom: '2px solid rgba(255,255,255,0.3)', borderLeft: '2px solid rgba(255,255,255,0.3)', borderRadius: '0 0 0 4px' }} />
      <div style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', width: '40px', height: '40px', borderBottom: '2px solid rgba(255,255,255,0.3)', borderRight: '2px solid rgba(255,255,255,0.3)', borderRadius: '0 0 4px 0' }} />

      <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}
        >
          <div style={{
            width: '64px', height: '64px', borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.15)',
            border: '1.5px solid rgba(255,255,255,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(4px)',
          }}>
            <Gift size={28} color="white" strokeWidth={1.5} />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontFamily: 'var(--font-script)', fontSize: '1.5rem', color: 'rgba(255,255,255,0.85)', marginBottom: '0.75rem', marginTop: 0 }}
        >
          The perfect gift
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', color: 'var(--color-white)', marginBottom: '1rem', marginTop: 0, textShadow: '0 2px 12px rgba(44,24,16,0.2)' }}
        >
          Build Your Custom Sweet Box
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', color: 'rgba(255,249,240,0.88)', marginBottom: '2.25rem', lineHeight: 1.7, marginTop: 0 }}
        >
          Perfect for Eid, weddings, birthdays, and corporate gifting.<br />Starting at $30.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link
              href="/gift-builder"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '1rem 2.5rem',
                backgroundColor: 'var(--color-secondary)', color: 'var(--color-white)',
                borderRadius: '8px', textDecoration: 'none', fontWeight: 700, fontSize: '1.05rem',
                fontFamily: 'var(--font-body)',
                boxShadow: '0 4px 24px rgba(44,24,16,0.35)',
                transition: 'transform 200ms, box-shadow 200ms',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(44,24,16,0.45)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 24px rgba(44,24,16,0.35)';
              }}
            >
              <Gift size={18} />
              Build Your Box
            </Link>
            <Link
              href="/menu/boxes"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '1rem 2rem',
                backgroundColor: 'transparent', color: 'rgba(255,249,240,0.9)',
                border: '1.5px solid rgba(255,249,240,0.4)',
                borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '1rem',
                fontFamily: 'var(--font-body)', transition: 'all 200ms',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,249,240,0.8)'; e.currentTarget.style.color = 'white'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,249,240,0.4)'; e.currentTarget.style.color = 'rgba(255,249,240,0.9)'; }}
            >
              Shop Gift Boxes
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
