'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { searchProducts } from '@/lib/products';
import { Product } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { useCartStore } from '@/store/cart';
import { useToastStore } from '@/store/toast';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { addItem, openDrawer } = useCartStore();
  const { addToast } = useToastStore();

  const search = useCallback((q: string) => {
    if (q.trim().length < 2) { setResults([]); return; }
    setResults(searchProducts(q).slice(0, 6));
  }, []);

  useEffect(() => {
    const id = setTimeout(() => search(query), 180);
    return () => clearTimeout(id);
  }, [query, search]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  function handleAddToCart(e: React.MouseEvent, product: Product) {
    e.preventDefault();
    const variant = product.variants[0];
    addItem({ productId: product.id, variantId: variant.id, qty: 1, price: variant.price, name: product.name, image: product.images[0], variantLabel: variant.label });
    addToast(`${product.name} added to cart`);
    openDrawer();
    onClose();
  }

  const popularSearches = ['Baklava', 'Kunafa', 'Gift Box', 'Koshari', 'Kahk'];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0,
            backgroundColor: 'rgba(13,6,3,0.85)',
            zIndex: 200,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '80px',
            backdropFilter: 'blur(6px)',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '640px',
              margin: '0 1rem',
              backgroundColor: 'var(--color-white)',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
            }}
          >
            {/* Search input */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 1.25rem', borderBottom: '1px solid rgba(200,150,62,0.15)' }}>
              <Search size={20} color="var(--color-primary)" style={{ flexShrink: 0 }} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for baklava, kunafa, gift boxes..."
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  color: 'var(--color-secondary)',
                  backgroundColor: 'transparent',
                }}
              />
              {query && (
                <button onClick={() => setQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-muted)', display: 'flex', flexShrink: 0 }}>
                  <X size={18} />
                </button>
              )}
              <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-muted)', fontFamily: 'var(--font-body)', fontSize: '0.8rem', flexShrink: 0, padding: '0.25rem 0.5rem' }}>ESC</button>
            </div>

            {/* Results / Popular */}
            <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
              {query.trim().length < 2 ? (
                <div style={{ padding: '1.25rem' }}>
                  <p style={{ margin: '0 0 0.75rem', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}>
                    Popular Searches
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {popularSearches.map((s) => (
                      <button
                        key={s}
                        onClick={() => setQuery(s)}
                        style={{
                          padding: '0.375rem 0.875rem',
                          borderRadius: '100px',
                          border: '1px solid rgba(200,150,62,0.25)',
                          background: 'none',
                          cursor: 'pointer',
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.85rem',
                          color: 'var(--color-secondary)',
                          transition: 'border-color 150ms, color 150ms',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.color = 'var(--color-primary)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(200,150,62,0.25)'; e.currentTarget.style.color = 'var(--color-secondary)'; }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : results.length === 0 ? (
                <div style={{ padding: '2rem', textAlign: 'center' }}>
                  <p style={{ margin: 0, fontFamily: 'var(--font-body)', color: 'var(--color-muted)', fontSize: '0.9rem' }}>
                    No results for &ldquo;{query}&rdquo;
                  </p>
                  <Link href={`/menu`} onClick={onClose} style={{ display: 'inline-block', marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--color-primary)', fontFamily: 'var(--font-body)', fontWeight: 600 }}>
                    Browse all products →
                  </Link>
                </div>
              ) : (
                <div>
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.slug}`}
                      onClick={onClose}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.875rem',
                        padding: '0.875rem 1.25rem',
                        textDecoration: 'none',
                        borderBottom: '1px solid rgba(200,150,62,0.07)',
                        transition: 'background 150ms',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(200,150,62,0.05)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                    >
                      {/* Thumbnail */}
                      <div style={{ width: '52px', height: '52px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
                        <Image src={product.images[0]} alt={product.name} fill style={{ objectFit: 'cover' }} sizes="52px" />
                      </div>
                      {/* Info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ margin: 0, fontFamily: 'var(--font-heading)', fontSize: '0.9rem', color: 'var(--color-secondary)', fontWeight: 600 }}>{product.name}</p>
                        <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--color-muted)', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.category} · {product.variants[0].label}</p>
                      </div>
                      {/* Price + add */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
                        <span style={{ fontWeight: 700, color: 'var(--color-primary)', fontFamily: 'var(--font-body)', fontSize: '0.9rem' }}>{formatCurrency(product.variants[0].price)}</span>
                        {product.inStock && (
                          <button
                            onClick={(e) => handleAddToCart(e, product)}
                            style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                            aria-label={`Add ${product.name} to cart`}
                          >
                            <ShoppingBag size={13} color="white" />
                          </button>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {results.length > 0 && (
              <div style={{ padding: '0.75rem 1.25rem', borderTop: '1px solid rgba(200,150,62,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}>
                  {results.length} result{results.length !== 1 ? 's' : ''}
                </span>
                <Link href={`/menu`} onClick={onClose} style={{ fontSize: '0.82rem', color: 'var(--color-primary)', fontWeight: 600, fontFamily: 'var(--font-body)', textDecoration: 'none' }}>
                  Browse full menu →
                </Link>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
