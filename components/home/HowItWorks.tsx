'use client';

import { Search, ChefHat, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import { EgyptianDivider } from '@/components/ui/EgyptianDivider';
import { staggerContainer, staggerItem } from '@/components/ui/SectionReveal';

const steps = [
  { icon: Search, title: 'Browse & Choose', description: 'Explore our menu of authentic Egyptian sweets and dishes. Filter by category, find your favorites.' },
  { icon: ChefHat, title: 'We Prepare Fresh', description: 'Every order is prepared fresh daily with authentic ingredients and a classy home touch.' },
  { icon: Truck, title: 'Delivered to Your Door', description: 'We deliver across the DMV area — Washington DC, Maryland, and Virginia — with care.' },
];

export function HowItWorks() {
  return (
    <section style={{ padding: '5rem 1.5rem', backgroundColor: 'var(--color-secondary)', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cg fill='none' stroke='%23C8963E' stroke-width='0.5' opacity='0.06'%3E%3Cpolygon points='24,4 28,14 38,14 30,20 33,30 24,24 15,30 18,20 10,14 20,14'/%3E%3C/g%3E%3C/svg%3E\")",
        backgroundRepeat: 'repeat',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', marginBottom: '1rem' }}
        >
          <p style={{ fontFamily: 'var(--font-script)', fontSize: '1.3rem', color: 'var(--color-primary)', marginBottom: '0.5rem', marginTop: 0 }}>Simple &amp; Easy</p>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: 'var(--color-white)', margin: 0 }}>How It Works</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ marginBottom: '3.5rem', padding: '0 2rem' }}
        >
          <EgyptianDivider color="var(--color-primary)" opacity={0.4} />
        </motion.div>

        {/* Steps */}
        <div style={{ position: 'relative' }}>
          {/* Connecting line (desktop only) */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              top: '36px',
              left: 'calc(16.66% + 36px)',
              right: 'calc(16.66% + 36px)',
              height: '1px',
              background: 'linear-gradient(90deg, var(--color-primary), rgba(200,150,62,0.3), var(--color-primary))',
              transformOrigin: 'left',
            }}
            className="hiw-line"
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}
          >
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div key={idx} variants={staggerItem} style={{ textAlign: 'center', padding: '1.5rem 1rem' }}>
                  {/* Icon circle */}
                  <div style={{ position: 'relative', display: 'inline-block', marginBottom: '1.5rem' }}>
                    {/* Outer glow ring */}
                    <div style={{
                      position: 'absolute', inset: '-6px',
                      borderRadius: '50%',
                      background: 'rgba(200,150,62,0.08)',
                      border: '1px solid rgba(200,150,62,0.2)',
                    }} />
                    <div style={{
                      width: '72px', height: '72px', borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(200,150,62,0.2) 0%, rgba(200,150,62,0.08) 100%)',
                      border: '1.5px solid var(--color-primary)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      position: 'relative',
                    }}>
                      <Icon size={28} color="var(--color-primary)" strokeWidth={1.5} />
                      {/* Step number badge */}
                      <div style={{
                        position: 'absolute', top: '-8px', right: '-8px',
                        width: '22px', height: '22px', borderRadius: '50%',
                        background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
                        color: 'white', fontWeight: 700, fontSize: '0.7rem',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 2px 8px rgba(200,150,62,0.4)',
                      }}>
                        {idx + 1}
                      </div>
                    </div>
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--color-white)', marginBottom: '0.75rem', marginTop: 0 }}>{step.title}</h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--color-muted)', lineHeight: 1.7, margin: 0 }}>{step.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
