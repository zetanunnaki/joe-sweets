'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SectionReveal } from '@/components/ui/SectionReveal';
import { EgyptianDivider } from '@/components/ui/EgyptianDivider';
import type { Metadata } from 'next';

const values = [
  { icon: '🫓', title: 'Freshness First', desc: 'Every item is made fresh the day of your order. No preservatives, no shortcuts.' },
  { icon: '🏡', title: 'Home Kitchen Quality', desc: 'Prepared with the same care as a home-cooked meal — just more refined.' },
  { icon: '🌿', title: 'Authentic Recipes', desc: 'Recipes passed down through generations, rooted in Egyptian culinary heritage.' },
  { icon: '💛', title: 'Made With Love', desc: 'Each dish is prepared with intention, warmth, and a genuine desire to make you smile.' },
];

const milestones = [
  { year: '2019', label: 'First tray of baklava shared with the DMV community' },
  { year: '2021', label: 'Grew to 50+ weekly orders through word of mouth' },
  { year: '2023', label: 'Launched full menu — sweets, foods, drinks & gift boxes' },
  { year: '2026', label: 'Serving thousands of happy customers across DC, MD & VA' },
];

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>

      {/* ── Hero ───────────────────────────────────────────── */}
      <div className="page-hero-dark" style={{ paddingTop: 'calc(4.5rem + 72px)' }}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ fontFamily: 'var(--font-script)', fontSize: '1.4rem', color: 'var(--color-primary)', marginBottom: '0.5rem', marginTop: 0 }}
        >
          Our Story
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 6vw, 3.5rem)', color: 'var(--color-white)', margin: '0 0 1.5rem' }}
        >
          From Egypt, With Love
        </motion.h1>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
          <EgyptianDivider color="var(--color-primary)" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,249,240,0.7)', maxWidth: '520px', margin: '1.25rem auto 0', lineHeight: 1.7 }}
        >
          A family journey from Cairo kitchens to DMV doorsteps — bringing the authentic flavors of Egypt to your table.
        </motion.p>
      </div>

      {/* ── Roots ─────────────────────────────────────────── */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 1.5rem' }}>
        <SectionReveal>
          <section style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', color: 'var(--color-secondary)', marginBottom: '0.75rem', marginTop: 0 }}>
              Our Roots in Egypt
            </h2>
            <div style={{ height: '2px', background: 'linear-gradient(90deg, var(--color-primary), transparent)', marginBottom: '1.5rem', borderRadius: '1px' }} />
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', color: 'var(--color-secondary)', lineHeight: 1.85, marginBottom: '1rem', marginTop: 0, opacity: 0.85 }}>
              Joe Sweets was born from a deep love for Egyptian cuisine — the kind that fills kitchens with the scent of rose water and fried dough, and brings families together around the table. Growing up in Egypt, food was never just sustenance. It was memory, culture, and love made edible.
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', color: 'var(--color-secondary)', lineHeight: 1.85, margin: 0, opacity: 0.85 }}>
              From the bustling streets of Cairo where koshari vendors call out to passersby, to the home kitchens where grandmothers layer baklava with practiced hands — these flavors are etched into our soul.
            </p>
          </section>
        </SectionReveal>

        {/* Kitchen photo */}
        <SectionReveal>
          <div style={{ borderRadius: '16px', overflow: 'hidden', marginBottom: '4rem', position: 'relative', height: '300px', boxShadow: '0 12px 40px rgba(44,24,16,0.15)' }}>
            <Image src="https://placehold.co/800x300/2C1810/C8963E?text=From+Home+Kitchen" alt="Our kitchen" fill style={{ objectFit: 'cover' }} sizes="800px" />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(44,24,16,0.6), transparent 60%)' }} />
            <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem' }}>
              <p style={{ fontFamily: 'var(--font-script)', fontSize: '1.5rem', color: 'var(--color-primary)', margin: 0 }}>Made with love</p>
            </div>
          </div>
        </SectionReveal>

        {/* From Home Kitchen */}
        <SectionReveal>
          <section style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', color: 'var(--color-secondary)', marginBottom: '0.75rem', marginTop: 0 }}>
              From Home Kitchen to Your Doorstep
            </h2>
            <div style={{ height: '2px', background: 'linear-gradient(90deg, var(--color-primary), transparent)', marginBottom: '1.5rem', borderRadius: '1px' }} />
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', color: 'var(--color-secondary)', lineHeight: 1.85, marginBottom: '1rem', marginTop: 0, opacity: 0.85 }}>
              When we arrived in the DMV area, we brought those recipes with us. What started as cooking for family and friends — sharing trays of kunafa after Friday prayers, gifting boxes of ghorayeba for Eid — slowly grew into something more.
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', color: 'var(--color-secondary)', lineHeight: 1.85, margin: 0, opacity: 0.85 }}>
              People kept asking: &ldquo;Can I order more?&rdquo; So we built Joe Sweets to say yes — to everyone who missed the flavors of home, and to everyone discovering Egyptian cuisine for the first time.
            </p>
          </section>
        </SectionReveal>

        {/* Timeline */}
        <SectionReveal>
          <section style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', color: 'var(--color-secondary)', marginBottom: '2rem', marginTop: 0, textAlign: 'center' }}>
              Our Journey
            </h2>
            <EgyptianDivider />
            <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: 0 }}>
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: '1.25rem',
                    paddingBottom: i < milestones.length - 1 ? '1.75rem' : 0,
                    paddingLeft: '1rem',
                    borderLeft: i < milestones.length - 1 ? '2px solid rgba(200,150,62,0.25)' : '2px solid transparent',
                    marginLeft: '1.5rem',
                    position: 'relative',
                  }}
                >
                  {/* Dot */}
                  <div style={{
                    position: 'absolute', left: '-11px', top: '4px',
                    width: '20px', height: '20px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--color-primary), #A67A2E)',
                    boxShadow: '0 0 0 4px var(--color-bg)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'white' }} />
                  </div>
                  <div style={{ paddingLeft: '0.5rem' }}>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--color-primary)', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>{m.year}</span>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--color-secondary)', margin: 0, opacity: 0.85, lineHeight: 1.6 }}>{m.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </SectionReveal>

        {/* Our Promise */}
        <SectionReveal>
          <section style={{ backgroundColor: 'var(--color-secondary)', borderRadius: '20px', padding: '2.5rem', marginBottom: '4rem', position: 'relative', overflow: 'hidden' }}>
            {/* Subtle pattern */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cg fill='none' stroke='%23C8963E' stroke-width='0.5' opacity='0.06'%3E%3Cpolygon points='24,4 28,14 38,14 30,20 33,30 24,24 15,30 18,20 10,14 20,14'/%3E%3C/g%3E%3C/svg%3E\")", backgroundRepeat: 'repeat', pointerEvents: 'none' }} />
            <div style={{ position: 'relative' }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', color: 'var(--color-primary)', marginBottom: '1rem', marginTop: 0 }}>
                Our Promise
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', color: 'var(--color-bg)', lineHeight: 1.85, margin: 0, opacity: 0.9 }}>
                Every dish that leaves our kitchen is prepared with the same care we&apos;d give to food for our own family. We use traditional recipes, fresh ingredients, and a classy home touch — because you deserve nothing less. This is our promise to you.
              </p>
              <p style={{ fontFamily: 'var(--font-script)', fontSize: '1.5rem', color: 'var(--color-primary)', margin: '1.5rem 0 0', textAlign: 'right' }}>
                — Joe Sweets
              </p>
            </div>
          </section>
        </SectionReveal>

        {/* Values */}
        <SectionReveal>
          <section style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', color: 'var(--color-secondary)', marginBottom: '0.5rem', marginTop: 0, textAlign: 'center' }}>
              What We Stand For
            </h2>
            <EgyptianDivider />
            <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))', gap: '1.25rem' }}>
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  style={{
                    backgroundColor: 'var(--color-white)', borderRadius: '14px',
                    padding: '1.75rem 1.5rem', textAlign: 'center',
                    boxShadow: '0 4px 24px rgba(44,24,16,0.06)',
                    border: '1px solid rgba(200,150,62,0.08)',
                  }}
                >
                  <div style={{ fontSize: '2.25rem', marginBottom: '0.875rem' }}>{v.icon}</div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: 'var(--color-secondary)', margin: '0 0 0.5rem' }}>{v.title}</h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--color-muted)', margin: 0, lineHeight: 1.7 }}>{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </SectionReveal>

        {/* CTA */}
        <SectionReveal>
          <div style={{ textAlign: 'center', paddingTop: '1rem' }}>
            <p style={{ fontFamily: 'var(--font-script)', fontSize: '1.4rem', color: 'var(--color-primary)', marginBottom: '0.5rem', marginTop: 0 }}>Ready to taste it?</p>
            <Link href="/menu" style={{
              display: 'inline-flex', alignItems: 'center', padding: '1rem 2.75rem',
              background: 'linear-gradient(135deg, var(--color-primary), #A67A2E)',
              color: 'var(--color-white)', borderRadius: '50px',
              textDecoration: 'none', fontWeight: 700, fontSize: '1.05rem',
              fontFamily: 'var(--font-body)',
              boxShadow: '0 4px 20px rgba(200,150,62,0.35)',
            }}>
              Browse Our Menu
            </Link>
          </div>
        </SectionReveal>
      </div>
    </div>
  );
}
