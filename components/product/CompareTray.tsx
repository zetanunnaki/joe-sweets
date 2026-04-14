'use client';

import Image from 'next/image';
import Link from 'next/link';
import { X, GitCompare } from 'lucide-react';
import { useCompareStore } from '@/store/compare';
import { getAllProducts } from '@/lib/products';

const ALL_PRODUCTS = getAllProducts();

export function CompareTray() {
  const { ids, remove, clear } = useCompareStore();

  if (ids.length === 0) return null;

  const products = ids
    .map((id) => ALL_PRODUCTS.find((p) => p.id === id))
    .filter(Boolean) as ReturnType<typeof getAllProducts>;

  return (
    <div style={{
      position: 'fixed', bottom: '1rem', left: '50%', transform: 'translateX(-50%)',
      zIndex: 45,
      backgroundColor: 'var(--color-secondary)',
      borderRadius: '14px',
      padding: '0.875rem 1.25rem',
      boxShadow: '0 8px 40px rgba(0,0,0,0.35)',
      display: 'flex', alignItems: 'center', gap: '1rem',
      border: '1px solid rgba(200,150,62,0.2)',
      maxWidth: 'calc(100vw - 2rem)',
    }}>
      <div style={{ display: 'flex', gap: '0.625rem', alignItems: 'center' }}>
        {products.map((p) => (
          <div key={p.id} style={{ position: 'relative' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '8px', overflow: 'hidden', border: '1.5px solid rgba(200,150,62,0.4)' }}>
              <Image src={p.images[0]} alt={p.name} width={44} height={44} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
            </div>
            <button
              onClick={() => remove(p.id)}
              style={{
                position: 'absolute', top: '-6px', right: '-6px',
                width: '16px', height: '16px', borderRadius: '50%',
                background: '#D44D4D', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
              }}
            >
              <X size={9} />
            </button>
          </div>
        ))}
        {/* Empty slots */}
        {Array.from({ length: 3 - products.length }).map((_, i) => (
          <div key={i} style={{ width: '44px', height: '44px', borderRadius: '8px', border: '1.5px dashed rgba(200,150,62,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '1.2rem', color: 'rgba(200,150,62,0.3)' }}>+</span>
          </div>
        ))}
      </div>

      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'rgba(255,249,240,0.65)', whiteSpace: 'nowrap' }}>
        {products.length}/3
      </span>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button onClick={clear} style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'rgba(255,249,240,0.5)', background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem' }}>
          Clear
        </button>
        <Link
          href="/compare"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
            padding: '0.5rem 1rem', borderRadius: '8px',
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
            color: 'white', textDecoration: 'none',
            fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.82rem',
            whiteSpace: 'nowrap',
          }}
        >
          <GitCompare size={13} /> Compare
        </Link>
      </div>
    </div>
  );
}
