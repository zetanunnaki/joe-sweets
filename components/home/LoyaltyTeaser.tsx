'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Gift, Star, Repeat, Heart } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/components/ui/SectionReveal';

const perks = [
  { icon: Star, title: 'Earn Points', desc: '$1 spent = 1 point. Redeem for free sweets.', color: '#c8963e' },
  { icon: Gift, title: 'Birthday Treat', desc: 'Free dessert on your birthday, every year.', color: '#d44d4d' },
  { icon: Repeat, title: 'Member Discounts', desc: 'Exclusive pricing on new items and seasonal specials.', color: '#4d9bd4' },
  { icon: Heart, title: 'Early Access', desc: 'Shop new menu items before anyone else.', color: '#4dba7f' },
];

export function LoyaltyTeaser() {
  return (
    <section style={{ padding: '5rem 1.5rem', backgroundColor: 'var(--color-bg-alt)', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle bg pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Cg fill='none' stroke='%23C8963E' stroke-width='0.5' opacity='0.06'%3E%3Cpolygon points='32,4 36,16 50,16 40,24 44,36 32,28 20,36 24,24 14,16 28,16'/%3E%3C/g%3E%3C/svg%3E\")",
        backgroundRepeat: 'repeat', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <p style={{ fontFamily: 'var(--font-script)', fontSize: '1.3rem', color: 'var(--color-primary)', marginBottom: '0.5rem', marginTop: 0 }}>For Our Sweet Family</p>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: 'var(--color-secondary)', margin: '0 0 0.75rem' }}>
            Join the <span className="shimmer-gold-text">Rewards</span> Program
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--color-muted)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
            Become a Joe Sweets member and earn rewards on every order. The more you treat yourself, the more you save.
          </p>
        </motion.div>

        {/* Perks grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}
        >
          {perks.map(({ icon: Icon, title, desc, color }) => (
            <motion.div
              key={title}
              variants={staggerItem}
              whileHover={{ y: -4 }}
              style={{
                padding: '1.5rem',
                borderRadius: '14px',
                backgroundColor: 'var(--color-white)',
                border: '1px solid rgba(200,150,62,0.1)',
                boxShadow: '0 4px 20px rgba(44,24,16,0.06)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.875rem',
              }}
            >
              <div style={{
                width: '44px', height: '44px', borderRadius: '12px',
                backgroundColor: `${color}18`,
                border: `1px solid ${color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon size={20} color={color} strokeWidth={1.5} />
              </div>
              <div>
                <p style={{ margin: '0 0 0.3rem', fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 700, color: 'var(--color-secondary)' }}>{title}</p>
                <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: '0.84rem', color: 'var(--color-muted)', lineHeight: 1.55 }}>{desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ textAlign: 'center' }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1.25rem', borderRadius: '100px', backgroundColor: 'rgba(200,150,62,0.08)', border: '1px solid rgba(200,150,62,0.2)', marginBottom: '1.25rem' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--color-secondary)' }}>
              🎉 <strong>Sign up now</strong> and get <strong style={{ color: 'var(--color-primary)' }}>500 bonus points</strong> to start
            </span>
          </div>
          <br />
          <Link
            href="/loyalty"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.875rem 2rem',
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
              color: 'white',
              borderRadius: '8px',
              textDecoration: 'none',
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
              fontSize: '0.95rem',
              boxShadow: '0 4px 20px rgba(200,150,62,0.35)',
              transition: 'transform 200ms, box-shadow 200ms',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(200,150,62,0.45)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(200,150,62,0.35)'; }}
          >
            <Star size={16} />
            Join Joe Sweets Rewards
          </Link>
          <p style={{ marginTop: '0.75rem', fontSize: '0.78rem', color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}>
            Free to join · No credit card required
          </p>
        </motion.div>
      </div>
    </section>
  );
}
