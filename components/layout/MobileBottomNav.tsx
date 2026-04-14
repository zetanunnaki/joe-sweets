'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, UtensilsCrossed, ShoppingBag, Heart, Grid3X3 } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { useWishlistStore } from '@/store/wishlist';

const NAV = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/menu', icon: Grid3X3, label: 'Menu' },
  { href: '/cart', icon: ShoppingBag, label: 'Cart', countKey: 'cart' as const },
  { href: '/wishlist', icon: Heart, label: 'Saved', countKey: 'wishlist' as const },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const items = useCartStore((s) => s.items);
  const wishlistIds = useWishlistStore((s) => s.ids);

  const cartCount = items.reduce((sum, i) => sum + i.qty, 0);
  const wishlistCount = wishlistIds.length;

  // Hide on admin pages
  if (pathname.startsWith('/joesweets-admin')) return null;

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
      {NAV.map(({ href, icon: Icon, label, countKey }) => {
        const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
        const count = countKey === 'cart' ? cartCount : countKey === 'wishlist' ? wishlistCount : 0;

        return (
          <Link
            key={href}
            href={href}
            className={`mobile-bottom-nav-item${isActive ? ' mobile-bottom-nav-active' : ''}`}
            aria-label={`${label}${count > 0 ? ` (${count})` : ''}`}
          >
            <div className="mobile-bottom-nav-icon">
              <Icon size={21} strokeWidth={isActive ? 2.2 : 1.8} />
              {count > 0 && (
                <span className="mobile-nav-badge">
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </div>
            <span className="mobile-bottom-nav-label">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
