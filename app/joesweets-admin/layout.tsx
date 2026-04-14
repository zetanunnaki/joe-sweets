'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, Package, Tag, Settings, ShoppingBag,
  Users, LogOut, ChevronRight, Menu, X, Bell, Star
} from 'lucide-react';
import { useState } from 'react';

const navLinks = [
  { href: '/joesweets-admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/joesweets-admin/products', icon: Package, label: 'Products' },
  { href: '/joesweets-admin/categories', icon: Tag, label: 'Categories' },
  { href: '/joesweets-admin/orders', icon: ShoppingBag, label: 'Orders' },
  { href: '/joesweets-admin/subscribers', icon: Users, label: 'Subscribers' },
  { href: '/joesweets-admin/notifications', icon: Bell, label: 'Stock Alerts' },
  { href: '/joesweets-admin/reviews', icon: Star, label: 'Reviews' },
  { href: '/joesweets-admin/coupons', icon: Tag, label: 'Coupons' },
  { href: '/joesweets-admin/settings', icon: Settings, label: 'Settings' },
];

function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/joesweets-admin');
  }

  return (
    <div style={{
      width: '220px', flexShrink: 0,
      backgroundColor: 'var(--color-secondary)',
      display: 'flex', flexDirection: 'column',
      height: '100%',
    }}>
      {/* Brand */}
      <div style={{ padding: '1.5rem 1.25rem', borderBottom: '1px solid rgba(255,249,240,0.1)' }}>
        <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--color-primary)', margin: 0, fontWeight: 700 }}>Joe Sweets</p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--color-muted)', margin: 0, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Admin Panel</p>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '1rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        {navLinks.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || pathname.startsWith(href + '/');
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.625rem',
                padding: '0.625rem 0.875rem', borderRadius: '8px',
                textDecoration: 'none',
                backgroundColor: active ? 'rgba(200,150,62,0.18)' : 'transparent',
                color: active ? 'var(--color-primary)' : 'rgba(255,249,240,0.75)',
                fontFamily: 'var(--font-body)', fontWeight: active ? 600 : 400,
                fontSize: '0.875rem', transition: 'all 150ms',
              }}
            >
              <Icon size={16} />
              {label}
              {active && <ChevronRight size={14} style={{ marginLeft: 'auto' }} />}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div style={{ padding: '0.75rem', borderTop: '1px solid rgba(255,249,240,0.1)' }}>
        <button
          onClick={handleLogout}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: '0.625rem',
            padding: '0.625rem 0.875rem', borderRadius: '8px',
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'rgba(255,249,240,0.5)', fontFamily: 'var(--font-body)',
            fontSize: '0.875rem', transition: 'color 150ms',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,249,240,0.5)')}
        >
          <LogOut size={16} /> Sign Out
        </button>
      </div>
    </div>
  );
}

function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const pathname = usePathname();
  const label = navLinks.find(l => pathname.startsWith(l.href))?.label ?? 'Admin';
  return (
    <div style={{
      height: '56px', backgroundColor: 'var(--color-white)',
      borderBottom: '1px solid #e8ddd4',
      display: 'flex', alignItems: 'center', padding: '0 1.5rem',
      gap: '1rem', flexShrink: 0,
    }}>
      <button onClick={onMenuClick} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-secondary)', display: 'flex' }} className="admin-mobile-menu">
        <Menu size={20} />
      </button>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--color-secondary)', margin: 0 }}>{label}</h1>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: 'white', fontSize: '0.8rem', fontWeight: 700 }}>J</span>
        </div>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f4ef' }}>
      {/* Desktop sidebar */}
      <div className="admin-sidebar-desktop" style={{ display: 'flex' }}>
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <>
          <div onClick={() => setMobileOpen(false)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 40 }} />
          <div style={{ position: 'fixed', top: 0, left: 0, height: '100%', zIndex: 50, display: 'flex' }}>
            <Sidebar onClose={() => setMobileOpen(false)} />
            <button onClick={() => setMobileOpen(false)} style={{ position: 'absolute', top: '1rem', right: '-2.5rem', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
              <X size={20} />
            </button>
          </div>
        </>
      )}

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Topbar onMenuClick={() => setMobileOpen(true)} />
        <main style={{ flex: 1, padding: '1.5rem 2rem', overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
