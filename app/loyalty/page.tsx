'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, Gift, Repeat, Heart, Zap, Crown, CheckCircle } from 'lucide-react';
import { EgyptianDivider } from '@/components/ui/EgyptianDivider';
import { SectionReveal } from '@/components/ui/SectionReveal';
import type { Metadata } from 'next';

const tiers = [
  {
    name: 'Sweet Member',
    icon: Star,
    color: '#8B6914',
    points: '0–499',
    perks: ['1 point per $1 spent', 'Birthday reward', 'Early sale access'],
  },
  {
    name: 'Gold Member',
    icon: Crown,
    color: '#C8963E',
    points: '500–1,999',
    perks: ['1.25x points multiplier', 'Free delivery on orders $35+', 'Monthly exclusive offer', 'Priority support'],
    featured: true,
  },
  {
    name: 'Platinum Member',
    icon: Zap,
    color: '#f0c060',
    points: '2,000+',
    perks: ['1.5x points multiplier', 'Always free delivery', 'New product first taste', 'Dedicated WhatsApp line', 'Annual thank-you gift'],
  },
];

const howItWorks = [
  { num: 1, title: 'Join Free', desc: 'Sign up with your email — takes 30 seconds.' },
  { num: 2, title: 'Earn Points', desc: 'Get 1 point for every $1 you spend on orders.' },
  { num: 3, title: 'Redeem Rewards', desc: 'Use 100 points = $1 off your next order. No minimums.' },
  { num: 4, title: 'Level Up', desc: 'The more you order, the bigger your perks get.' },
];

const faqs = [
  { q: 'How do I join?', a: 'Click the "Join Now" button below and enter your email. We\'ll send you a welcome email with your 500 bonus points.' },
  { q: 'Do points expire?', a: 'Points expire after 12 months of inactivity. As long as you place one order per year, your points stay active.' },
  { q: 'Can I use points and promo codes together?', a: 'Yes! Points and promo codes can be stacked for extra savings.' },
  { q: 'How do I check my balance?', a: 'Log into your account or message us on WhatsApp and we\'ll check instantly.' },
];

export default function LoyaltyPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, var(--color-secondary) 0%, #1a0c06 100%)',
        padding: 'calc(5rem + 72px) 1.5rem 4rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Pattern */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cg fill='none' stroke='%23C8963E' stroke-width='0.5' opacity='0.08'%3E%3Cpolygon points='24,4 28,14 38,14 30,20 33,30 24,24 15,30 18,20 10,14 20,14'/%3E%3C/g%3E%3C/svg%3E\")",
          backgroundRepeat: 'repeat', pointerEvents: 'none',
        }} />

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} style={{ position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <div style={{
              width: '72px', height: '72px', borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--color-primary), #A67A2E)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 0 12px rgba(200,150,62,0.12)',
            }}>
              <Star size={32} color="white" fill="white" />
            </div>
          </div>
          <p style={{ fontFamily: 'var(--font-script)', fontSize: '1.4rem', color: 'var(--color-primary)', margin: '0 0 0.5rem' }}>For Our Sweet Family</p>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 6vw, 3.5rem)', color: 'var(--color-white)', margin: '0 0 1.25rem', lineHeight: 1.15 }}>
            Joe Sweets <span style={{ color: 'var(--color-primary)' }}>Rewards</span>
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: 'rgba(255,249,240,0.75)', maxWidth: '520px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
            Earn points on every order. Redeem for free sweets, discounts, and exclusive perks. Free to join — always.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 1.25rem', background: 'rgba(200,150,62,0.15)', border: '1px solid rgba(200,150,62,0.4)', borderRadius: '100px', marginBottom: '2rem' }}>
            <Star size={14} color="var(--color-primary)" fill="var(--color-primary)" />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: 600 }}>Get 500 bonus points when you join today</span>
          </div>
          <br />
          <Link href="/contact" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '1rem 2.5rem',
            background: 'linear-gradient(135deg, var(--color-primary), #A67A2E)',
            color: 'white', borderRadius: '50px',
            textDecoration: 'none', fontWeight: 700, fontSize: '1.05rem',
            fontFamily: 'var(--font-body)',
            boxShadow: '0 4px 24px rgba(200,150,62,0.4)',
            transition: 'transform 200ms, box-shadow 200ms',
          }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(200,150,62,0.5)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(200,150,62,0.4)'; }}
          >
            <Star size={18} fill="white" />
            Join Now — It&apos;s Free
          </Link>
        </motion.div>
      </div>

      {/* How it works */}
      <section style={{ padding: '5rem 1.5rem', backgroundColor: 'var(--color-bg)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <SectionReveal>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <p style={{ fontFamily: 'var(--font-script)', fontSize: '1.3rem', color: 'var(--color-primary)', margin: '0 0 0.5rem' }}>Simple as pie</p>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: 'var(--color-secondary)', margin: '0 0 0.75rem' }}>How Rewards Work</h2>
              <EgyptianDivider />
            </div>
          </SectionReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {howItWorks.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{
                  backgroundColor: 'var(--color-white)',
                  borderRadius: '16px', padding: '1.75rem',
                  boxShadow: '0 4px 24px rgba(44,24,16,0.07)',
                  border: '1px solid rgba(200,150,62,0.1)',
                  textAlign: 'center',
                }}
              >
                <div style={{
                  width: '52px', height: '52px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--color-primary), #A67A2E)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 1rem',
                  fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 700, color: 'white',
                }}>
                  {step.num}
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', color: 'var(--color-secondary)', margin: '0 0 0.5rem' }}>{step.title}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--color-muted)', margin: 0, lineHeight: 1.65 }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section style={{ padding: '5rem 1.5rem', backgroundColor: 'var(--color-secondary)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cg fill='none' stroke='%23C8963E' stroke-width='0.5' opacity='0.06'%3E%3Cpolygon points='24,4 28,14 38,14 30,20 33,30 24,24 15,30 18,20 10,14 20,14'/%3E%3C/g%3E%3C/svg%3E\")", backgroundRepeat: 'repeat', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
          <SectionReveal>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <p style={{ fontFamily: 'var(--font-script)', fontSize: '1.3rem', color: 'var(--color-primary)', margin: '0 0 0.5rem' }}>Unlock more</p>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: 'var(--color-white)', margin: '0 0 0.75rem' }}>Membership Tiers</h2>
              <EgyptianDivider color="var(--color-primary)" opacity={0.4} />
            </div>
          </SectionReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            {tiers.map((tier, i) => {
              const Icon = tier.icon;
              return (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  style={{
                    backgroundColor: tier.featured ? 'rgba(200,150,62,0.12)' : 'rgba(255,249,240,0.04)',
                    border: `1.5px solid ${tier.featured ? 'var(--color-primary)' : 'rgba(200,150,62,0.15)'}`,
                    borderRadius: '16px', padding: '1.75rem',
                    position: 'relative',
                    boxShadow: tier.featured ? '0 8px 40px rgba(200,150,62,0.2)' : 'none',
                  }}
                >
                  {tier.featured && (
                    <div style={{
                      position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)',
                      backgroundColor: 'var(--color-primary)', color: 'var(--color-secondary)',
                      padding: '0.2rem 0.875rem', borderRadius: '100px',
                      fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 700,
                      letterSpacing: '0.06em', textTransform: 'uppercase',
                    }}>
                      Most Popular
                    </div>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `${tier.color}22`, border: `1px solid ${tier.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={20} color={tier.color} />
                    </div>
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: 'var(--color-white)', margin: '0 0 2px' }}>{tier.name}</h3>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--color-muted)', margin: 0 }}>{tier.points} pts</p>
                    </div>
                  </div>
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                    {tier.perks.map((perk) => (
                      <li key={perk} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'rgba(255,249,240,0.8)' }}>
                        <CheckCircle size={14} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                        {perk}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mini FAQ */}
      <section style={{ padding: '5rem 1.5rem', backgroundColor: 'var(--color-bg-alt)' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <SectionReveal>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 4vw, 2rem)', color: 'var(--color-secondary)', margin: '0 0 0.75rem' }}>Common Questions</h2>
              <EgyptianDivider />
            </div>
          </SectionReveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                style={{ backgroundColor: 'var(--color-white)', borderRadius: '12px', padding: '1.25rem 1.5rem', boxShadow: '0 2px 16px rgba(44,24,16,0.06)', border: '1px solid rgba(200,150,62,0.08)' }}>
                <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', color: 'var(--color-secondary)', margin: '0 0 0.5rem', fontWeight: 600 }}>{faq.q}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'var(--color-muted)', margin: 0, lineHeight: 1.7 }}>{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '5rem 1.5rem', backgroundColor: 'var(--color-secondary)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cg fill='none' stroke='%23C8963E' stroke-width='0.5' opacity='0.06'%3E%3Cpolygon points='24,4 28,14 38,14 30,20 33,30 24,24 15,30 18,20 10,14 20,14'/%3E%3C/g%3E%3C/svg%3E\")", backgroundRepeat: 'repeat', pointerEvents: 'none' }} />
        <SectionReveal>
          <div style={{ position: 'relative', maxWidth: '500px', margin: '0 auto' }}>
            <p style={{ fontFamily: 'var(--font-script)', fontSize: '1.4rem', color: 'var(--color-primary)', margin: '0 0 0.5rem' }}>Ready to earn?</p>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: 'var(--color-white)', margin: '0 0 1rem' }}>Start Earning Today</h2>
            <p style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,249,240,0.65)', margin: '0 0 2rem', lineHeight: 1.7 }}>
              Join thousands of happy customers already earning rewards on every Joe Sweets order.
            </p>
            <div style={{ display: 'flex', gap: '0.875rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2.25rem', background: 'linear-gradient(135deg, var(--color-primary), #A67A2E)', color: 'white', borderRadius: '50px', textDecoration: 'none', fontWeight: 700, fontFamily: 'var(--font-body)', boxShadow: '0 4px 20px rgba(200,150,62,0.4)' }}>
                <Star size={16} fill="white" /> Join Rewards
              </Link>
              <Link href="/menu" style={{ display: 'inline-flex', alignItems: 'center', padding: '1rem 2rem', border: '2px solid rgba(200,150,62,0.35)', color: 'var(--color-primary)', borderRadius: '50px', textDecoration: 'none', fontWeight: 600, fontFamily: 'var(--font-body)' }}>
                Shop First
              </Link>
            </div>
          </div>
        </SectionReveal>
      </section>
    </div>
  );
}
