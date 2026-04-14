'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import testimonialData from '@/data/testimonials.json';
import { StarRating } from '@/components/ui/StarRating';
import { Testimonial } from '@/types';
import { EgyptianDivider } from '@/components/ui/EgyptianDivider';

const testimonials = testimonialData as Testimonial[];

export function Testimonials() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setDirection(1);
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [paused]);

  function goTo(i: number) {
    setDirection(i > active ? 1 : -1);
    setActive(i);
  }

  const t = testimonials[active];

  return (
    <section style={{ padding: '5rem 1.5rem', backgroundColor: 'var(--color-bg-alt)', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cg fill='none' stroke='%23C8963E' stroke-width='0.5' opacity='0.06'%3E%3Cpolygon points='24,4 28,14 38,14 30,20 33,30 24,24 15,30 18,20 10,14 20,14'/%3E%3C/g%3E%3C/svg%3E\")",
        backgroundRepeat: 'repeat',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <p style={{ fontFamily: 'var(--font-script)', fontSize: '1.3rem', color: 'var(--color-primary)', marginBottom: '0.5rem', marginTop: 0 }}>What People Say</p>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: 'var(--color-secondary)', marginBottom: '0.75rem', marginTop: 0 }}>Customer Love</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ marginBottom: '2.5rem' }}
        >
          <EgyptianDivider />
        </motion.div>

        {/* Testimonial card */}
        <div
          style={{ position: 'relative', minHeight: '260px' }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Giant decorative quote mark */}
          <div style={{
            position: 'absolute', top: '-20px', left: '16px',
            fontFamily: 'Georgia, serif', fontSize: '8rem', lineHeight: 1,
            color: 'var(--color-primary)', opacity: 0.08,
            pointerEvents: 'none', userSelect: 'none',
            fontWeight: 700,
          }}>
            &ldquo;
          </div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              style={{
                backgroundColor: 'var(--color-white)',
                borderRadius: '20px',
                padding: '2.5rem 2rem',
                boxShadow: '0 8px 40px rgba(44,24,16,0.1)',
                border: '1px solid rgba(200,150,62,0.12)',
              }}
            >
              <StarRating rating={t.rating} size="md" />
              <blockquote style={{
                fontFamily: 'var(--font-body)', fontSize: '1.05rem',
                color: 'var(--color-secondary)', lineHeight: 1.8,
                margin: '1.25rem 0', fontStyle: 'italic',
                opacity: 0.9,
              }}>
                &ldquo;{t.text}&rdquo;
              </blockquote>

              {/* Thin gold divider */}
              <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(200,150,62,0.3), transparent)', margin: '1.25rem 0' }} />

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.875rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '2px solid rgba(200,150,62,0.3)', boxShadow: '0 0 0 3px rgba(200,150,62,0.08)' }}>
                  <Image src={t.avatar} alt={t.name} width={48} height={48} style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <p style={{ fontWeight: 700, margin: 0, color: 'var(--color-secondary)', fontSize: '0.95rem', fontFamily: 'var(--font-heading)' }}>{t.name}</p>
                  <p style={{ fontSize: '0.78rem', color: 'var(--color-primary)', margin: 0, fontFamily: 'var(--font-body)' }}>{new Date(t.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '1.75rem' }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: i === active ? '28px' : '8px',
                height: '8px',
                borderRadius: '4px',
                border: 'none',
                background: i === active
                  ? 'linear-gradient(90deg, var(--color-primary), #f0c060)'
                  : 'rgba(200,150,62,0.25)',
                cursor: 'pointer',
                transition: 'all 350ms ease',
                padding: 0,
                boxShadow: i === active ? '0 0 8px rgba(200,150,62,0.4)' : 'none',
              }}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
