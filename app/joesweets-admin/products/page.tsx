'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Search, Pencil, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import { Product } from '@/types';
import { formatCurrency } from '@/lib/utils';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/products').then(r => r.json()).then(data => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  async function toggleStock(product: Product) {
    const updated = { ...product, inStock: !product.inStock };
    await fetch(`/api/admin/products/${product.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inStock: updated.inStock }),
    });
    setProducts(prev => prev.map(p => p.id === product.id ? updated : p));
  }

  async function deleteProduct(product: Product) {
    if (!confirm(`Delete "${product.name}"? This cannot be undone.`)) return;
    await fetch(`/api/admin/products/${product.id}`, { method: 'DELETE' });
    setProducts(prev => prev.filter(p => p.id !== product.id));
  }

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const btnStyle = (color: string): React.CSSProperties => ({
    background: 'none', border: 'none', cursor: 'pointer',
    color, padding: '6px', borderRadius: '6px', display: 'flex', alignItems: 'center',
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--color-secondary)', margin: 0 }}>Products</h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--color-muted)', margin: 0 }}>{products.length} total</p>
        </div>
        <Link href="/joesweets-admin/products/new" style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.625rem 1.25rem', backgroundColor: 'var(--color-primary)',
          color: 'white', borderRadius: '8px', textDecoration: 'none',
          fontWeight: 600, fontSize: '0.875rem', fontFamily: 'var(--font-body)',
        }}>
          <Plus size={16} /> Add Product
        </Link>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', maxWidth: '360px' }}>
        <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-muted)' }} />
        <input
          type="text" placeholder="Search products…" value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: '100%', padding: '0.625rem 0.875rem 0.625rem 2.25rem', borderRadius: '8px', border: '2px solid #e2d9cf', backgroundColor: 'var(--color-white)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
        />
      </div>

      {/* Table */}
      <div style={{ backgroundColor: 'var(--color-white)', borderRadius: '12px', boxShadow: '0 2px 12px rgba(44,24,16,0.06)', overflow: 'hidden' }}>
        {loading ? (
          <p style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}>Loading…</p>
        ) : filtered.length === 0 ? (
          <p style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}>No products found.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--color-bg-alt)' }}>
                {['Image', 'Name', 'Category', 'Price', 'Stock', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '0.875rem 1rem', textAlign: 'left', fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((product, i) => (
                <tr key={product.id} style={{ borderBottom: i < filtered.length - 1 ? '1px solid var(--color-bg-alt)' : 'none', transition: 'background 150ms' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#faf7f4')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
                      <Image src={product.images[0]} alt={product.name} fill style={{ objectFit: 'cover' }} sizes="48px" />
                    </div>
                  </td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, color: 'var(--color-secondary)', margin: 0, fontSize: '0.875rem' }}>{product.name}</p>
                    <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-muted)', margin: 0, fontSize: '0.78rem' }}>{product.slug}</p>
                  </td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 600, padding: '0.2rem 0.6rem', borderRadius: '999px', backgroundColor: 'rgba(200,150,62,0.12)', color: 'var(--color-primary)' }}>
                      {product.category}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem 1rem', fontFamily: 'var(--font-body)', fontWeight: 700, color: 'var(--color-primary)', fontSize: '0.9rem' }}>
                    {formatCurrency(product.variants[0]?.price ?? 0)}
                  </td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <button onClick={() => toggleStock(product)} style={btnStyle(product.inStock ? '#22c55e' : 'var(--color-muted)')}>
                      {product.inStock ? <ToggleRight size={22} /> : <ToggleLeft size={22} />}
                      <span style={{ fontSize: '0.78rem', marginLeft: '4px', fontFamily: 'var(--font-body)' }}>
                        {product.inStock ? 'In Stock' : 'Out'}
                      </span>
                    </button>
                  </td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                      <Link href={`/joesweets-admin/products/${product.id}`} style={{ ...btnStyle('var(--color-primary)'), textDecoration: 'none' }}>
                        <Pencil size={15} />
                      </Link>
                      <button onClick={() => deleteProduct(product)} style={btnStyle('var(--color-accent)')}>
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
