'use client';

import Link from 'next/link';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { EgyptianDivider } from '@/components/ui/EgyptianDivider';
import siteData from '@/data/site.json';

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Footer() {
  const site = siteData;
  return (
    <footer style={{
      backgroundColor: 'var(--color-secondary)',
      color: 'var(--color-bg)',
      paddingTop: '0',
      paddingBottom: '1.5rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cg fill='none' stroke='%23C8963E' stroke-width='0.5' opacity='0.05'%3E%3Cpolygon points='24,4 28,14 38,14 30,20 33,30 24,24 15,30 18,20 10,14 20,14'/%3E%3C/g%3E%3C/svg%3E\")",
        backgroundRepeat: 'repeat', pointerEvents: 'none',
      }} />

      {/* Gold top border */}
      <div style={{ height: '2px', background: 'linear-gradient(90deg, transparent 0%, var(--color-primary) 30%, #f0c060 50%, var(--color-primary) 70%, transparent 100%)' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem 0', position: 'relative' }}>
        {/* Egyptian divider below brand */}
        <div style={{ marginBottom: '2.5rem' }}>
          {/* Brand tagline row */}
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', color: 'var(--color-primary)', marginBottom: '0.25rem', marginTop: 0 }}>Joe Sweets</h3>
            <p style={{ fontFamily: 'var(--font-script)', fontSize: '1.1rem', color: 'var(--color-primary)', opacity: 0.75, margin: 0 }}>Making Life Sweeter</p>
          </div>
          <EgyptianDivider color="var(--color-primary)" opacity={0.3} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2.5rem', marginBottom: '2.5rem' }}>
          {/* About */}
          <div>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-muted)', lineHeight: 1.7, margin: 0 }}>
              Homemade Egyptian food &amp; desserts, crafted daily with love and a classy home touch.
            </p>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                marginTop: '1.25rem',
                color: 'var(--color-primary)', textDecoration: 'none',
                fontSize: '0.875rem', fontWeight: 600,
                border: '1px solid rgba(200,150,62,0.3)',
                borderRadius: '6px', padding: '0.4rem 0.75rem',
                transition: 'background 200ms, border-color 200ms',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(200,150,62,0.1)';
                e.currentTarget.style.borderColor = 'var(--color-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(200,150,62,0.3)';
              }}
            >
              <InstagramIcon size={15} />@joe.sweets_
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-body)', fontWeight: 600, marginBottom: '1rem', marginTop: 0, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Menu</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[['Egyptian Sweets', '/menu/sweets'], ['Egyptian Foods', '/menu/foods'], ['Drinks', '/menu/drinks'], ['Gift Boxes', '/menu/boxes']].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="footer-link">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-body)', fontWeight: 600, marginBottom: '1rem', marginTop: 0, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Company</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[['Our Story', '/about'], ['Rewards', '/loyalty'], ['Blog', '/blog'], ['Catering', '/catering'], ['Contact', '/contact'], ['FAQ', '/faq'], ['Track Order', '/orders'], ['Gift Builder', '/gift-builder'], ['Wishlist', '/wishlist'], ['Delivery Info', '/delivery']].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="footer-link">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-body)', fontWeight: 600, marginBottom: '1rem', marginTop: 0, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a href={`tel:${site.phone}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-muted)', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 200ms' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-primary)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-muted)'; }}
              >
                <Phone size={13} />{site.phone}
              </a>
              <a href={`mailto:${site.email}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-muted)', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 200ms' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-primary)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-muted)'; }}
              >
                <Mail size={13} />{site.email}
              </a>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'var(--color-muted)', fontSize: '0.875rem' }}>
                <MapPin size={13} style={{ marginTop: '2px', flexShrink: 0 }} />{site.address}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-muted)', fontSize: '0.875rem' }}>
                <Clock size={13} />{site.businessHours}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(200,150,62,0.12)', paddingTop: '1.5rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem' }}>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.8rem', margin: 0 }}>
            &copy; {new Date().getFullYear()} Joe Sweets. All rights reserved.
          </p>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.8rem', margin: 0 }}>
            Delivery: {site.deliveryZones.join(' · ')}
          </p>
        </div>
      </div>
    </footer>
  );
}
