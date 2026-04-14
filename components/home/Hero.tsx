'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

function StarOrnament() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon
        points="16,2 18.4,10.4 27,10.4 20,15.6 22.5,24 16,19 9.5,24 12,15.6 5,10.4 13.6,10.4"
        fill="var(--color-primary)"
        opacity="0.9"
      />
      <polygon
        points="16,6 17.2,11.2 22.5,11.2 18.3,14.2 19.5,19.4 16,16.6 12.5,19.4 13.7,14.2 9.5,11.2 14.8,11.2"
        fill="#f0c060"
        opacity="0.5"
      />
    </svg>
  );
}

export function Hero() {
  return (
    <section style={{
      position: 'relative',
      height: 'calc(92vh + 72px + var(--bar-height, 0px))',
      marginTop: 'calc(-72px - var(--bar-height, 0px))',
      minHeight: '620px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      background: 'radial-gradient(ellipse at center, #3D1F10 0%, #1A0C06 70%, #0D0603 100%)',
    }}>
      {/* Egyptian star pattern overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cg fill='none' stroke='%23C8963E' stroke-width='0.5' opacity='0.12'%3E%3Cpolygon points='24,4 28,14 38,14 30,20 33,30 24,24 15,30 18,20 10,14 20,14'/%3E%3C/g%3E%3C/svg%3E\")",
        backgroundRepeat: 'repeat',
        pointerEvents: 'none',
      }} />

      {/* Corner glow */}
      <div style={{
        position: 'absolute',
        bottom: 0, right: 0,
        width: '600px', height: '600px',
        background: 'radial-gradient(circle at bottom right, rgba(200,150,62,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '400px', height: '400px',
        background: 'radial-gradient(circle at top left, rgba(200,150,62,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Pulse rings */}
      {[0, 1].map((i) => (
        <div key={i} style={{
          position: 'absolute',
          top: '50%', left: '50%',
          width: '400px', height: '400px',
          marginLeft: '-200px',
          marginTop: '-200px',
          border: '1px solid rgba(200,150,62,0.25)',
          borderRadius: '50%',
          animation: `pulse-ring 4s ease-out ${i * 2}s infinite`,
          pointerEvents: 'none',
        }} />
      ))}

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 1.5rem', maxWidth: '780px' }}>

        {/* Floating star ornament */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}
          className="animate-float"
        >
          <StarOrnament />
        </motion.div>

        {/* Script tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(1.4rem, 3.5vw, 2.25rem)', color: 'var(--color-primary)', marginBottom: '0.75rem', marginTop: 0, letterSpacing: '0.02em' }}
        >
          Homemade · Authentic · Egyptian
        </motion.p>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.8rem, 8vw, 5.5rem)', fontWeight: 700, color: 'var(--color-white)', lineHeight: 1.05, marginBottom: '1.25rem', marginTop: 0 }}
        >
          Making Life<br />
          <span className="shimmer-gold-text">Sweeter</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: 'rgba(255,249,240,0.8)', marginBottom: '2.5rem', lineHeight: 1.7, marginTop: 0 }}
        >
          Fresh daily. Delivered to your door.<br />
          DMV Area — Washington DC, Maryland &amp; Virginia.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <Link href="/menu" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '1rem 2.25rem',
            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)',
            color: 'var(--color-white)',
            borderRadius: '8px', textDecoration: 'none', fontWeight: 700, fontSize: '1.05rem',
            fontFamily: 'var(--font-body)',
            boxShadow: '0 4px 24px rgba(200,150,62,0.45), 0 0 0 1px rgba(200,150,62,0.2)',
            transition: 'transform 200ms, box-shadow 200ms',
          }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(200,150,62,0.55), 0 0 0 1px rgba(200,150,62,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 24px rgba(200,150,62,0.45), 0 0 0 1px rgba(200,150,62,0.2)';
            }}
          >
            Order Now
          </Link>
          <Link href="/about" style={{
            display: 'inline-flex', alignItems: 'center', padding: '1rem 2.25rem',
            backgroundColor: 'transparent', color: 'var(--color-white)',
            border: '1.5px solid rgba(255,249,240,0.35)', borderRadius: '8px',
            textDecoration: 'none', fontWeight: 600, fontSize: '1.05rem',
            fontFamily: 'var(--font-body)', transition: 'border-color 200ms, background 200ms',
          }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-primary)';
              e.currentTarget.style.backgroundColor = 'rgba(200,150,62,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,249,240,0.35)';
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Our Story
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '2rem', left: '50%',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem',
        animation: 'bounce-chevron 2s ease-in-out infinite',
      }}>
        <span style={{ color: 'rgba(200,150,62,0.6)', fontSize: '0.7rem', letterSpacing: '0.15em', fontFamily: 'var(--font-body)' }}>SCROLL</span>
        <ChevronDown size={18} color="rgba(200,150,62,0.6)" />
      </div>
    </section>
  );
}
