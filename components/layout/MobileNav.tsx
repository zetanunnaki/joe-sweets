'use client';

import Link from 'next/link';
import { X, ShoppingBag, Phone, Search, Star, Heart, Gift, SlidersHorizontal } from 'lucide-react';
import { useEffect } from 'react';
import { LogoMark } from '@/components/ui/LogoMark';
import { motion, AnimatePresence } from 'framer-motion';

interface NavLink { href: string; label: string; }
interface MobileNavProps { isOpen: boolean; onClose: () => void; links: NavLink[]; onSearchOpen?: () => void; }

export function MobileNav({ isOpen, onClose, links, onSearchOpen }: MobileNavProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 45,
              backdropFilter: 'blur(2px)',
              WebkitBackdropFilter: 'blur(2px)',
            }}
          />

          {/* Drawer — slides from right */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            style={{
              position: 'fixed',
              top: 0, right: 0,
              height: '100%',
              width: 'min(300px, 85vw)',
              backgroundColor: 'var(--color-secondary)',
              zIndex: 50,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Pattern strip at top */}
            <div style={{
              height: '4px',
              background: 'linear-gradient(90deg, transparent, var(--color-primary), #f0c060, var(--color-primary), transparent)',
            }} />

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <LogoMark size={38} />
                <div>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', color: 'var(--color-primary)', fontWeight: 700, display: 'block' }}>
                    Joe Sweets
                  </span>
                  <span style={{ fontFamily: 'var(--font-script)', fontSize: '0.75rem', color: 'var(--color-primary)', opacity: 0.7 }}>
                    Making Life Sweeter
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                style={{
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer', color: 'rgba(255,249,240,0.8)', padding: '8px',
                  borderRadius: '8px', display: 'flex', alignItems: 'center',
                  transition: 'background 200ms',
                }}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(200,150,62,0.4), transparent)', margin: '0 1.5rem' }} />

            {/* Links */}
            <nav style={{ padding: '1rem 1rem', flex: 1 }}>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {links.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '0.875rem 1rem',
                        color: 'rgba(255,249,240,0.85)',
                        textDecoration: 'none',
                        fontWeight: 500, fontSize: '1rem',
                        borderRadius: '10px',
                        fontFamily: 'var(--font-body)',
                        transition: 'background 200ms, color 200ms',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(200,150,62,0.12)';
                        e.currentTarget.style.color = 'var(--color-primary)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = 'rgba(255,249,240,0.85)';
                      }}
                    >
                      {link.label}
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-primary)', opacity: 0.5 }}>›</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Quick links */}
            <div style={{ padding: '0.75rem 1.5rem', borderTop: '1px solid rgba(255,249,240,0.07)', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {[
                { href: '/loyalty', icon: Star, label: 'Rewards' },
                { href: '/wishlist', icon: Heart, label: 'Saved' },
                { href: '/gift-builder', icon: Gift, label: 'Gift Box' },
                { href: '/compare', icon: SlidersHorizontal, label: 'Compare' },
              ].map(({ href, icon: Icon, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={onClose}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                    padding: '0.4rem 0.75rem',
                    borderRadius: '100px',
                    border: '1px solid rgba(200,150,62,0.2)',
                    background: 'rgba(200,150,62,0.06)',
                    color: 'var(--color-primary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.78rem',
                    fontWeight: 500,
                    textDecoration: 'none',
                    transition: 'background 200ms',
                  }}
                >
                  <Icon size={12} />
                  {label}
                </Link>
              ))}
            </div>

            {/* Footer CTA */}
            <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(255,249,240,0.07)' }}>
              {onSearchOpen && (
                <button
                  onClick={() => { onClose(); onSearchOpen(); }}
                  style={{
                    width: '100%',
                    display: 'flex', alignItems: 'center', gap: '0.625rem',
                    padding: '0.75rem 1rem',
                    marginBottom: '0.625rem',
                    borderRadius: '10px',
                    border: '1px solid rgba(200,150,62,0.25)',
                    background: 'rgba(200,150,62,0.06)',
                    color: 'rgba(255,249,240,0.7)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                  }}
                >
                  <Search size={15} />
                  Search products…
                </button>
              )}
              <Link
                href="/menu"
                onClick={onClose}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  padding: '0.875rem',
                  background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
                  color: 'var(--color-white)',
                  borderRadius: '10px', textDecoration: 'none',
                  fontWeight: 700, fontFamily: 'var(--font-body)', fontSize: '0.95rem',
                  boxShadow: '0 4px 16px rgba(200,150,62,0.3)',
                }}
              >
                <ShoppingBag size={16} /> Order Now
              </Link>
              <a
                href="tel:+12025550000"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  marginTop: '0.75rem',
                  padding: '0.625rem',
                  color: 'var(--color-muted)', textDecoration: 'none',
                  fontSize: '0.82rem', fontFamily: 'var(--font-body)',
                }}
              >
                <Phone size={13} /> DMV Area · Fresh Daily
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
