'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { getAllCategories } from '@/lib/products';
import { EgyptianDivider } from '@/components/ui/EgyptianDivider';
import { staggerContainer, staggerItem } from '@/components/ui/SectionReveal';

export function CategoryGrid() {
  const categories = getAllCategories();

  return (
    <section style={{ padding: '5rem 1.5rem', backgroundColor: 'var(--color-bg-alt)', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle pattern background */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cg fill='none' stroke='%23C8963E' stroke-width='0.5' opacity='0.07'%3E%3Cpolygon points='24,4 28,14 38,14 30,20 33,30 24,24 15,30 18,20 10,14 20,14'/%3E%3C/g%3E%3C/svg%3E\")",
        backgroundRepeat: 'repeat',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', marginBottom: '1rem' }}
        >
          <p style={{ fontFamily: 'var(--font-script)', fontSize: '1.3rem', color: 'var(--color-primary)', marginBottom: '0.5rem', marginTop: 0 }}>Explore Our</p>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: 'var(--color-secondary)', margin: 0 }}>Menu Categories</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ marginBottom: '2.5rem', padding: '0 2rem' }}
        >
          <EgyptianDivider />
        </motion.div>

        {/* Category cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}
        >
          {categories.map((cat) => (
            <motion.div key={cat.id} variants={staggerItem}>
              <Link href={`/menu/${cat.id}`} style={{ textDecoration: 'none', display: 'block' }}>
                <div
                  className="cat-grid-item"
                  style={{
                    borderRadius: '14px',
                    overflow: 'hidden',
                    height: '280px',
                    position: 'relative',
                    cursor: 'pointer',
                    boxShadow: '0 4px 24px rgba(44,24,16,0.12)',
                    transition: 'box-shadow 350ms ease, transform 350ms ease',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.boxShadow = '0 12px 40px rgba(200,150,62,0.3)';
                    el.style.transform = 'translateY(-6px)';
                    const img = el.querySelector('.cat-img') as HTMLImageElement;
                    if (img) img.style.transform = 'scale(1.07)';
                    const panel = el.querySelector('.cat-panel') as HTMLDivElement;
                    if (panel) panel.style.background = 'linear-gradient(to top, rgba(44,24,16,0.95) 0%, rgba(44,24,16,0.5) 60%, transparent 100%)';
                    const arrow = el.querySelector('.cat-arrow') as HTMLDivElement;
                    if (arrow) { arrow.style.opacity = '1'; arrow.style.transform = 'translateY(0)'; }
                    const corner = el.querySelector('.cat-corner') as HTMLDivElement;
                    if (corner) corner.style.opacity = '0.9';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.boxShadow = '0 4px 24px rgba(44,24,16,0.12)';
                    el.style.transform = 'translateY(0)';
                    const img = el.querySelector('.cat-img') as HTMLImageElement;
                    if (img) img.style.transform = 'scale(1)';
                    const panel = el.querySelector('.cat-panel') as HTMLDivElement;
                    if (panel) panel.style.background = 'linear-gradient(to top, rgba(44,24,16,0.85) 0%, rgba(44,24,16,0.3) 55%, transparent 100%)';
                    const arrow = el.querySelector('.cat-arrow') as HTMLDivElement;
                    if (arrow) { arrow.style.opacity = '0'; arrow.style.transform = 'translateY(8px)'; }
                    const corner = el.querySelector('.cat-corner') as HTMLDivElement;
                    if (corner) corner.style.opacity = '0.35';
                  }}
                >
                  {/* Image */}
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="cat-img"
                    style={{ objectFit: 'cover', transition: 'transform 500ms ease' }}
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />

                  {/* Gradient overlay */}
                  <div className="cat-panel" style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(44,24,16,0.85) 0%, rgba(44,24,16,0.3) 55%, transparent 100%)',
                    transition: 'background 350ms ease',
                  }} />

                  {/* Corner ornament */}
                  <div className="cat-corner" style={{
                    position: 'absolute', top: '0.875rem', right: '0.875rem',
                    width: '20px', height: '20px',
                    borderTop: '2px solid var(--color-primary)',
                    borderRight: '2px solid var(--color-primary)',
                    borderRadius: '0 4px 0 0',
                    opacity: 0.35,
                    transition: 'opacity 350ms ease',
                  }} />

                  {/* Text overlay */}
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    padding: '1.5rem 1.25rem 1.25rem',
                  }}>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--color-white)', margin: '0 0 0.25rem', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>{cat.name}</h3>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'rgba(255,249,240,0.75)', margin: '0 0 0.75rem', lineHeight: 1.4 }}>{cat.description}</p>
                    <div className="cat-arrow" style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                      color: 'var(--color-primary)', fontSize: '0.82rem', fontWeight: 600,
                      fontFamily: 'var(--font-body)',
                      opacity: 0, transform: 'translateY(8px)',
                      transition: 'opacity 300ms ease, transform 300ms ease',
                    }}>
                      Shop now <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginTop: '2.5rem', padding: '0 2rem' }}
        >
          <EgyptianDivider />
        </motion.div>
      </div>
    </section>
  );
}
