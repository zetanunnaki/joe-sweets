'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { EgyptianDivider } from '@/components/ui/EgyptianDivider';

const stats = [
  { value: 500, suffix: '+', label: 'Happy Customers', desc: 'And growing every week' },
  { value: 4,   suffix: '+', label: 'Years of Flavor', desc: 'Serving the DMV since 2020' },
  { value: 17,  suffix: '',  label: 'Menu Items', desc: 'Fresh, authentic, delicious' },
  { value: 100, suffix: '%', label: 'Made to Order', desc: 'No batches, no shortcuts' },
];

function CountUp({ target, suffix, start }: { target: number; suffix: string; start: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    const duration = 1800;
    const stepTime = 30;
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [start, target]);

  return (
    <span>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export function StatsStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ backgroundColor: 'var(--color-secondary)', padding: '4rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
      {/* Pattern */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cg fill='none' stroke='%23C8963E' stroke-width='0.5' opacity='0.06'%3E%3Cpolygon points='24,4 28,14 38,14 30,20 33,30 24,24 15,30 18,20 10,14 20,14'/%3E%3C/g%3E%3C/svg%3E\")", backgroundRepeat: 'repeat', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <p style={{ fontFamily: 'var(--font-script)', fontSize: '1.1rem', color: 'var(--color-primary)', margin: '0 0 0.25rem' }}>By the numbers</p>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', color: 'var(--color-white)', margin: '0 0 1.25rem' }}>
            Why Customers Love Joe Sweets
          </h2>
          <EgyptianDivider color="var(--color-primary)" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0', position: 'relative' }}>
          {stats.map(({ value, suffix, label, desc }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                textAlign: 'center', padding: '2rem 1rem',
                borderRight: i < stats.length - 1 ? '1px solid rgba(200,150,62,0.12)' : 'none',
              }}
            >
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 700, color: 'var(--color-primary)', lineHeight: 1, marginBottom: '0.5rem' }}>
                <CountUp target={value} suffix={suffix} start={started} />
              </div>
              <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: 'var(--color-white)', margin: '0 0 0.25rem' }}>{label}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'rgba(255,249,240,0.5)', margin: 0 }}>{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
