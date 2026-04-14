'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Menu, Search, Heart } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlist';
import { useCartCount, useCartDrawer } from '@/store/cart';
import { MobileNav } from './MobileNav';
import { SearchOverlay } from './SearchOverlay';
import { LogoMark } from '@/components/ui/LogoMark';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/about', label: 'Our Story' },
  { href: '/blog', label: 'Blog' },
  { href: '/catering', label: 'Catering' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const cartCount = useCartCount();
  const { open: openCart } = useCartDrawer();
  const wishlistCount = useWishlistStore((s) => s.ids.length);
  const pathname = usePathname();

  useEffect(() => {
    let lastY = 0;
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      // Hide on scroll down, show on scroll up (only after 200px)
      if (y > 200) {
        setHidden(y > lastY && y - lastY > 4);
      } else {
        setHidden(false);
      }
      lastY = y;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 'var(--bar-height, 0px)',
          left: 0,
          right: 0,
          zIndex: 40,
          backgroundColor: scrolled ? 'var(--color-secondary)' : 'transparent',
          boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,0.25)' : 'none',
          transition: 'background-color 400ms ease, box-shadow 400ms ease, transform 350ms cubic-bezier(0.22,1,0.36,1)',
          borderBottom: scrolled ? '1px solid rgba(200,150,62,0.15)' : '1px solid transparent',
          transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
        }}
      >
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1.5rem',
          height: scrolled ? '60px' : '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'height 400ms ease',
        }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <div style={{ flexShrink: 0, transition: 'transform 300ms ease', filter: scrolled ? 'none' : 'drop-shadow(0 0 10px rgba(200,150,62,0.4))' }}>
              <LogoMark size={scrolled ? 36 : 42} />
            </div>
            <div style={{ lineHeight: 1.1 }}>
              <span style={{
                display: 'block',
                fontFamily: 'var(--font-heading)',
                fontSize: scrolled ? '1.25rem' : '1.4rem',
                fontWeight: 700,
                color: 'var(--color-primary)',
                transition: 'font-size 400ms ease',
                textShadow: scrolled ? 'none' : '0 0 20px rgba(200,150,62,0.25)',
              }}>
                Joe Sweets
              </span>
              <span style={{ display: 'block', fontFamily: 'var(--font-script)', fontSize: '0.78rem', color: 'var(--color-primary)', opacity: 0.7 }}>
                Making Life Sweeter
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: 'none' }} className="md-nav">
            <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', margin: 0, padding: 0 }}>
              {navLinks.map((link) => (
                <li key={link.href} style={{ position: 'relative' }}>
                  <Link
                    href={link.href}
                    style={{
                      color: (link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)) ? 'var(--color-primary)' : 'rgba(255,249,240,0.9)',
                      textDecoration: 'none',
                      fontWeight: (link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)) ? 600 : 500,
                      fontSize: '0.92rem',
                      fontFamily: 'var(--font-body)',
                      letterSpacing: '0.02em',
                      paddingBottom: '4px',
                      display: 'inline-block',
                      position: 'relative',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--color-primary)';
                      const line = e.currentTarget.querySelector('.nav-underline') as HTMLSpanElement;
                      if (line) line.style.transform = 'scaleX(1)';
                    }}
                    onMouseLeave={(e) => {
                      const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
                      e.currentTarget.style.color = isActive ? 'var(--color-primary)' : 'rgba(255,249,240,0.9)';
                      const line = e.currentTarget.querySelector('.nav-underline') as HTMLSpanElement;
                      if (line && !isActive) line.style.transform = 'scaleX(0)';
                    }}
                  >
                    {link.label}
                    <span className="nav-underline" style={{
                      display: 'block',
                      position: 'absolute',
                      bottom: 0, left: 0, right: 0,
                      height: '1.5px',
                      background: 'linear-gradient(90deg, var(--color-primary), #f0c060)',
                      transform: (link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)) ? 'scaleX(1)' : 'scaleX(0)',
                      transformOrigin: 'left',
                      transition: 'transform 250ms ease',
                      borderRadius: '1px',
                    }} />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Wishlist */}
            <Link
              href="/wishlist"
              aria-label={`Wishlist (${wishlistCount} items)`}
              style={{
                position: 'relative', display: 'flex', alignItems: 'center',
                color: wishlistCount > 0 ? '#D44D4D' : 'rgba(255,249,240,0.9)',
                padding: '6px', borderRadius: '8px',
                transition: 'color 200ms, transform 200ms',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
            >
              <Heart size={20} fill={wishlistCount > 0 ? '#D44D4D' : 'none'} />
              {wishlistCount > 0 && (
                <span style={{
                  position: 'absolute', top: '-2px', right: '-2px',
                  background: '#D44D4D', color: 'white', borderRadius: '50%',
                  width: '16px', height: '16px', fontSize: '0.62rem', fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 0 0 2px var(--color-secondary)',
                }}>
                  {wishlistCount}
                </span>
              )}
            </Link>
            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'rgba(255,249,240,0.9)', padding: '6px',
                borderRadius: '8px', display: 'flex', alignItems: 'center',
                transition: 'color 200ms, transform 200ms',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-primary)'; (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.1)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,249,240,0.9)'; (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; }}
            >
              <Search size={20} />
            </button>
            {/* Cart */}
            <button
              onClick={openCart}
              aria-label={`Cart (${cartCount} items)`}
              style={{
                position: 'relative',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: cartCount > 0 ? 'var(--color-primary)' : 'rgba(255,249,240,0.9)',
                padding: '6px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                transition: 'color 200ms, transform 200ms',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
              }}
            >
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-2px', right: '-2px',
                  background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
                  color: 'var(--color-white)',
                  borderRadius: '50%',
                  width: '18px', height: '18px',
                  fontSize: '0.68rem', fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 0 0 2px var(--color-secondary)',
                }}>
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="mobile-menu-btn"
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'rgba(255,249,240,0.9)', padding: '6px',
                display: 'flex', alignItems: 'center',
              }}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Spacer for fixed header on non-hero pages */}
      <div style={{ height: 'calc(72px + var(--bar-height, 0px))' }} id="header-spacer" />
      {/* Note: announcement bar is not fixed so no extra spacer needed */}

      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} links={navLinks} onSearchOpen={() => setSearchOpen(true)} />
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
