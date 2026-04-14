'use client';

import { motion } from 'framer-motion';
import { SectionReveal } from '@/components/ui/SectionReveal';
import { EgyptianDivider } from '@/components/ui/EgyptianDivider';

const HANDLE = 'joe.sweets_';
const IG_URL = `https://www.instagram.com/${HANDLE}/`;

const POSTS = [
  {
    id: 1,
    bg: '#8B4513',
    accent: '#C8963E',
    emoji: '🍯',
    label: 'Kunafa',
    caption: 'Freshly baked',
    likes: '234',
  },
  {
    id: 2,
    bg: '#2C1810',
    accent: '#f0c060',
    emoji: '🥐',
    label: 'Baklava',
    caption: 'Layers of love',
    likes: '512',
  },
  {
    id: 3,
    bg: '#A67A2E',
    accent: '#FFF9F0',
    emoji: '🍮',
    label: 'Om Ali',
    caption: 'Warm & golden',
    likes: '178',
  },
  {
    id: 4,
    bg: '#1A0C06',
    accent: '#C8963E',
    emoji: '🍰',
    label: 'Basbousa',
    caption: 'Semolina cake',
    likes: '320',
  },
  {
    id: 5,
    bg: '#6B3A1F',
    accent: '#f0c060',
    emoji: '🫓',
    label: 'Feteer',
    caption: 'Flaky & crispy',
    likes: '411',
  },
  {
    id: 6,
    bg: '#2C1810',
    accent: '#C8963E',
    emoji: '✨',
    label: 'More Sweets',
    caption: 'Shop the menu',
    likes: '860',
  },
];

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const HeartIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

export function InstagramFeed() {
  return (
    <section style={{ backgroundColor: 'var(--color-bg)', padding: '5rem 1.5rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <SectionReveal>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.875rem', padding: '0.375rem 1rem', backgroundColor: 'rgba(200,150,62,0.08)', borderRadius: '100px', border: '1px solid rgba(200,150,62,0.2)' }}>
              <InstagramIcon />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-primary)', letterSpacing: '0.04em' }}>@{HANDLE}</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: 'var(--color-secondary)', margin: '0 0 0.875rem' }}>
              Follow Along
            </h2>
            <EgyptianDivider />
            <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-muted)', marginTop: '1rem', fontSize: '0.95rem', lineHeight: 1.65 }}>
              Behind-the-scenes baking, seasonal specials &amp; happy customers
            </p>
          </div>
        </SectionReveal>

        {/* Post grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.625rem', marginBottom: '2.5rem' }} className="instagram-grid">
          {POSTS.map((post, i) => (
            <motion.a
              key={post.id}
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: 'block',
                aspectRatio: '1 / 1',
                borderRadius: '10px',
                overflow: 'hidden',
                cursor: 'pointer',
                position: 'relative',
                backgroundColor: post.bg,
                textDecoration: 'none',
              }}
            >
              {/* Egyptian pattern overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath d='M20 4 L22 16 L34 14 L24 22 L30 34 L20 26 L10 34 L16 22 L6 14 L18 16Z' fill='none' stroke='rgba(255,255,255,0.09)' stroke-width='1'/%3E%3C/svg%3E")`,
                backgroundSize: '40px 40px',
              }} />

              {/* Content */}
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '0.75rem',
              }}>
                {/* Top: fake IG header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: `linear-gradient(135deg, ${post.accent}, ${post.bg})`, border: '1.5px solid rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem' }}>
                    🍫
                  </div>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', color: 'rgba(255,255,255,0.75)', fontWeight: 600 }}>joe.sweets_</span>
                </div>

                {/* Center: big emoji */}
                <div style={{ textAlign: 'center', fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1 }}>
                  {post.emoji}
                </div>

                {/* Bottom: label + likes */}
                <div>
                  <p style={{ margin: '0 0 2px', fontFamily: 'var(--font-heading)', fontSize: '0.7rem', color: 'rgba(255,255,255,0.95)', fontWeight: 700 }}>{post.label}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <span style={{ color: '#f87171' }}><HeartIcon /></span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', color: 'rgba(255,255,255,0.65)' }}>{post.likes}</span>
                  </div>
                </div>
              </div>

              {/* Gold accent top-right */}
              <div style={{
                position: 'absolute', top: 0, right: 0,
                width: '0', height: '0',
                borderStyle: 'solid',
                borderWidth: `0 32px 32px 0`,
                borderColor: `transparent ${post.accent} transparent transparent`,
                opacity: 0.4,
              }} />

              {/* Hover overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(44,24,16,0.6)',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                  backdropFilter: 'blur(2px)',
                }}
              >
                <div style={{ color: 'white' }}><InstagramIcon /></div>
                <span style={{ color: 'white', fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600 }}>
                  {post.caption}
                </span>
                <div style={{
                  marginTop: '0.25rem', padding: '0.25rem 0.75rem',
                  background: 'rgba(200,150,62,0.25)',
                  border: '1px solid rgba(200,150,62,0.5)',
                  borderRadius: '100px',
                }}>
                  <span style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.05em' }}>
                    VIEW ON INSTAGRAM
                  </span>
                </div>
              </motion.div>
            </motion.a>
          ))}
        </div>

        {/* Follower count + CTA */}
        <SectionReveal>
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              {[
                { value: '2.1K', label: 'Followers' },
                { value: '120+', label: 'Posts' },
                { value: '4.9★', label: 'Rating' },
              ].map(({ value, label }) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-primary)', margin: '0 0 2px' }}>{value}</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--color-muted)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</p>
                </div>
              ))}
            </div>

            <a
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.625rem',
                padding: '0.875rem 2.25rem',
                background: 'linear-gradient(135deg, #C8963E, #A67A2E)',
                color: 'white', textDecoration: 'none',
                borderRadius: '50px',
                fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1rem',
                boxShadow: '0 4px 20px rgba(200,150,62,0.35)',
                transition: 'transform 180ms, box-shadow 180ms',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 28px rgba(200,150,62,0.45)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 20px rgba(200,150,62,0.35)';
              }}
            >
              <InstagramIcon />
              Follow @{HANDLE}
            </a>
            <p style={{ marginTop: '0.875rem', fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--color-muted)' }}>
              Daily drops, behind-the-scenes baking &amp; exclusive deals
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
