'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { EgyptianDivider } from '@/components/ui/EgyptianDivider';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh', backgroundColor: 'var(--color-secondary)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem 1.5rem', textAlign: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Star pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='none' stroke='%23C8963E' stroke-width='0.6' opacity='0.07'%3E%3Cpolygon points='30,5 34,18 47,18 37,26 41,39 30,31 19,39 23,26 13,18 26,18'/%3E%3C/g%3E%3C/svg%3E\")",
        backgroundRepeat: 'repeat', pointerEvents: 'none',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'relative', maxWidth: '520px' }}
      >
        {/* Giant decorative 404 */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1, type: 'spring', bounce: 0.25 }}
          style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(6rem, 20vw, 10rem)', color: 'var(--color-primary)', lineHeight: 1, marginBottom: '0.25rem', opacity: 0.2, fontWeight: 700, userSelect: 'none' }}
        >
          404
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          style={{ fontFamily: 'var(--font-script)', fontSize: '1.4rem', color: 'var(--color-primary)', marginTop: '-3rem', marginBottom: '0.5rem' }}
        >
          Oops!
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', color: 'var(--color-white)', margin: '0 0 1.25rem' }}
        >
          Page Not Found
        </motion.h1>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
          <EgyptianDivider color="var(--color-primary)" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,249,240,0.65)', lineHeight: 1.7, margin: '1.25rem 0 2rem', fontSize: '1rem' }}
        >
          Looks like this page wandered off into the desert. Let&apos;s get you back to something delicious.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          style={{ display: 'flex', gap: '0.875rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', padding: '0.875rem 2rem', background: 'linear-gradient(135deg, var(--color-primary), #A67A2E)', color: 'white', borderRadius: '50px', textDecoration: 'none', fontWeight: 700, fontFamily: 'var(--font-body)', boxShadow: '0 4px 20px rgba(200,150,62,0.35)' }}>
            Go Home
          </Link>
          <Link href="/menu" style={{ display: 'inline-flex', alignItems: 'center', padding: '0.875rem 2rem', border: '2px solid rgba(200,150,62,0.4)', color: 'var(--color-primary)', borderRadius: '50px', textDecoration: 'none', fontWeight: 600, fontFamily: 'var(--font-body)' }}>
            Browse Menu
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
