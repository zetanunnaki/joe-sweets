'use client';

import Image from 'next/image';
import Link from 'next/link';
import { X, ShoppingBag, Star } from 'lucide-react';
import { useCompareStore } from '@/store/compare';
import { useCartStore } from '@/store/cart';
import { useToastStore } from '@/store/toast';
import { getAllProducts } from '@/lib/products';
import { formatCurrency } from '@/lib/utils';
import { EgyptianDivider } from '@/components/ui/EgyptianDivider';

const ALL_PRODUCTS = getAllProducts();

const ROWS = [
  { label: 'Category', key: 'category' as const },
  { label: 'Rating', key: 'rating' as const },
  { label: 'Reviews', key: 'reviewCount' as const },
  { label: 'Price', key: 'price' as const },
  { label: 'In Stock', key: 'inStock' as const },
  { label: 'Tags', key: 'tags' as const },
];

export default function ComparePage() {
  const { ids, remove, clear } = useCompareStore();
  const { addItem, openDrawer } = useCartStore();
  const { addToast } = useToastStore();

  const products = ids
    .map((id) => ALL_PRODUCTS.find((p) => p.id === id))
    .filter(Boolean) as ReturnType<typeof getAllProducts>;

  function handleAdd(p: (typeof products)[0]) {
    addItem({
      productId: p.id, variantId: p.variants[0].id,
      qty: 1, price: p.variants[0].price,
      name: p.name, image: p.images[0],
      variantLabel: p.variants[0].label,
    });
    addToast(`${p.name} added to cart`);
    openDrawer();
  }

  function getCellValue(p: (typeof products)[0], key: string): string | number | boolean {
    if (key === 'price') return formatCurrency(p.variants[0].price);
    if (key === 'inStock') return p.inStock ? '✓ Available' : '✗ Out of Stock';
    if (key === 'tags') return p.tags.join(', ') || '—';
    if (key === 'rating') return `${p.rating.toFixed(1)} / 5.0`;
    if (key === 'reviewCount') return `${p.reviewCount} reviews`;
    if (key === 'category') return p.category.charAt(0).toUpperCase() + p.category.slice(1);
    return '—';
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)', paddingBottom: '4rem' }}>
      {/* Hero */}
      <div style={{ backgroundColor: 'var(--color-secondary)', padding: 'clamp(2rem,5vw,3.5rem) 1.5rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cg fill='none' stroke='%23C8963E' stroke-width='0.5' opacity='0.07'%3E%3Cpolygon points='24,4 28,14 38,14 30,20 33,30 24,24 15,30 18,20 10,14 20,14'/%3E%3C/g%3E%3C/svg%3E\")", backgroundRepeat: 'repeat', pointerEvents: 'none' }} />
        <div style={{ position: 'relative' }}>
          <p style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(1rem,3vw,1.3rem)', color: 'var(--color-primary)', marginBottom: '0.4rem', marginTop: 0 }}>Side by side</p>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem,5vw,3rem)', color: 'var(--color-white)', margin: '0 0 1.5rem' }}>Compare Products</h1>
          <EgyptianDivider color="var(--color-primary)" />
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1rem' }}>
        {products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 1.5rem' }}>
            <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'var(--color-bg-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
              <Star size={32} color="var(--color-muted)" />
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--color-secondary)', marginBottom: '0.75rem' }}>Nothing to compare yet</h2>
            <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-muted)', marginBottom: '2rem', fontSize: '0.95rem' }}>
              Add up to 3 products from the menu to compare them side by side.
            </p>
            <Link href="/menu" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 2rem', borderRadius: '10px', background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))', color: 'white', fontFamily: 'var(--font-body)', fontWeight: 600, textDecoration: 'none' }}>
              Browse Menu
            </Link>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-muted)', margin: 0 }}>
                Comparing {products.length} of 3 products
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <Link href="/menu" style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}>
                  + Add more
                </Link>
                <button onClick={clear} style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--color-muted)', background: 'none', border: '1.5px solid #e2d9cf', borderRadius: '8px', padding: '0.35rem 0.875rem', cursor: 'pointer' }}>
                  Clear all
                </button>
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '500px' }}>
                <thead>
                  <tr>
                    <th style={{ width: '140px', padding: '0 0.75rem 1rem 0' }} />
                    {products.map((p) => (
                      <th key={p.id} style={{ padding: '0 0.75rem 1rem', textAlign: 'center', verticalAlign: 'top' }}>
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                          <button
                            onClick={() => remove(p.id)}
                            style={{ position: 'absolute', top: '-6px', right: '-6px', zIndex: 1, width: '22px', height: '22px', borderRadius: '50%', background: 'var(--color-secondary)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}
                          >
                            <X size={11} />
                          </button>
                          <Link href={`/product/${p.slug}`} style={{ textDecoration: 'none' }}>
                            <div style={{ position: 'relative', width: '110px', height: '110px', borderRadius: '12px', overflow: 'hidden', margin: '0 auto 0.75rem' }}>
                              <Image src={p.images[0]} alt={p.name} fill style={{ objectFit: 'cover' }} sizes="110px" />
                            </div>
                            <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-secondary)', margin: 0, lineHeight: 1.3 }}>{p.name}</p>
                          </Link>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((row, ri) => (
                    <tr key={row.key} style={{ backgroundColor: ri % 2 === 0 ? 'var(--color-bg-alt)' : 'transparent' }}>
                      <td style={{ padding: '0.875rem 0.75rem', fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {row.label}
                      </td>
                      {products.map((p) => (
                        <td key={p.id} style={{ padding: '0.875rem 0.75rem', fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-secondary)', textAlign: 'center', borderRadius: '4px' }}>
                          {getCellValue(p, row.key)}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {/* Add to cart row */}
                  <tr>
                    <td />
                    {products.map((p) => (
                      <td key={p.id} style={{ padding: '1.25rem 0.75rem', textAlign: 'center' }}>
                        <button
                          onClick={() => handleAdd(p)}
                          disabled={!p.inStock}
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                            padding: '0.625rem 1.25rem', borderRadius: '8px',
                            background: p.inStock ? 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))' : '#e2d9cf',
                            border: 'none', color: p.inStock ? 'white' : 'var(--color-muted)',
                            fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.82rem',
                            cursor: p.inStock ? 'pointer' : 'not-allowed',
                          }}
                        >
                          <ShoppingBag size={13} /> {p.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
