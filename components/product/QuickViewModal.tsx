'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Check, ExternalLink } from 'lucide-react';
import { Product, ProductVariant } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { useCartStore } from '@/store/cart';
import { useToastStore } from '@/store/toast';
import { formatCurrency } from '@/lib/utils';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const { addItem, openDrawer } = useCartStore();
  const { addToast } = useToastStore();

  useEffect(() => {
    if (product) {
      setSelectedVariant(product.variants[0]);
      setQty(1);
      setAdded(false);
      setActiveImage(0);
    }
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [product, onClose]);

  function handleAdd() {
    if (!product || !selectedVariant) return;
    addItem({
      productId: product.id,
      variantId: selectedVariant.id,
      qty,
      price: selectedVariant.price,
      name: product.name,
      image: product.images[0],
      variantLabel: selectedVariant.label,
    });
    addToast(`${product.name} added to cart`);
    setAdded(true);
    openDrawer();
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <AnimatePresence>
      {product && selectedVariant && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0,
            backgroundColor: 'rgba(13,6,3,0.75)',
            zIndex: 150,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            backdropFilter: 'blur(4px)',
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'var(--color-white)',
              borderRadius: '20px',
              overflow: 'hidden',
              width: '100%',
              maxWidth: '760px',
              maxHeight: '90vh',
              overflowY: 'auto',
              display: 'grid',
              gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.35)',
            }}
            className="quick-view-grid"
          >
            {/* Left: Images */}
            <div style={{ position: 'relative', backgroundColor: 'var(--color-bg-alt)' }}>
              <div style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ position: 'absolute', inset: 0 }}
                  >
                    <Image src={product.images[activeImage]} alt={product.name} fill style={{ objectFit: 'cover' }} sizes="380px" />
                  </motion.div>
                </AnimatePresence>
              </div>
              {product.images.length > 1 && (
                <div style={{ display: 'flex', gap: '0.5rem', padding: '0.75rem', overflowX: 'auto' }}>
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      style={{
                        width: '52px', height: '52px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0,
                        border: `2px solid ${i === activeImage ? 'var(--color-primary)' : 'transparent'}`,
                        padding: 0, cursor: 'pointer', position: 'relative',
                      }}
                    >
                      <Image src={img} alt={`View ${i + 1}`} fill style={{ objectFit: 'cover' }} sizes="52px" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Info */}
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto' }}>
              {/* Close */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Badge variant="muted">{product.category}</Badge>
                <button
                  onClick={onClose}
                  style={{ background: 'var(--color-bg)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--color-muted)', flexShrink: 0 }}
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Badges */}
              <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                {product.tags.includes('bestseller') && <Badge variant="primary">Bestseller</Badge>}
                {product.compareAtPrice && <Badge variant="accent">Sale</Badge>}
                {!product.inStock && <Badge variant="muted">Out of Stock</Badge>}
              </div>

              {/* Name */}
              <div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: 'var(--color-secondary)', margin: '0 0 0.2rem' }}>{product.name}</h2>
                <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', color: 'var(--color-muted)', margin: 0, fontStyle: 'italic' }}>{product.nameAr}</p>
              </div>

              {/* Stars */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill={i < Math.round(product.rating) ? 'var(--color-primary)' : '#e2d9cf'}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
                <span style={{ fontSize: '0.78rem', color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}>
                  {product.rating.toFixed(1)} ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                  {formatCurrency(selectedVariant.price)}
                </span>
                {product.compareAtPrice && (
                  <span style={{ fontSize: '1rem', color: 'var(--color-muted)', textDecoration: 'line-through' }}>
                    {formatCurrency(product.compareAtPrice)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'var(--color-secondary)', lineHeight: 1.65, margin: 0, opacity: 0.85 }}>
                {product.description}
              </p>

              {/* Variants */}
              {product.variants.length > 1 && (
                <div>
                  <p style={{ margin: '0 0 0.5rem', fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}>Size</p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {product.variants.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariant(v)}
                        style={{
                          padding: '0.4rem 0.875rem', borderRadius: '8px',
                          border: `1.5px solid ${v.id === selectedVariant.id ? 'var(--color-primary)' : 'rgba(200,150,62,0.2)'}`,
                          backgroundColor: v.id === selectedVariant.id ? 'rgba(200,150,62,0.1)' : 'transparent',
                          color: 'var(--color-secondary)', fontFamily: 'var(--font-body)', fontSize: '0.82rem',
                          fontWeight: v.id === selectedVariant.id ? 700 : 400,
                          cursor: 'pointer', transition: 'all 150ms',
                        }}
                      >
                        {v.label} — {formatCurrency(v.price)}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Qty + Add */}
              {product.inStock ? (
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginTop: 'auto' }}>
                  <QuantityStepper value={qty} onChange={setQty} size="sm" />
                  <Button variant="primary" size="md" onClick={handleAdd} style={{ flex: 1 }}>
                    {added ? <><Check size={16} /> Added!</> : <><ShoppingBag size={16} /> Add to Cart</>}
                  </Button>
                </div>
              ) : (
                <p style={{ color: 'var(--color-accent)', fontWeight: 500, fontSize: '0.88rem', margin: 0, fontFamily: 'var(--font-body)' }}>
                  Currently out of stock.
                </p>
              )}

              {/* View full page */}
              <Link href={`/product/${product.slug}`} onClick={onClose} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.82rem', color: 'var(--color-muted)', fontFamily: 'var(--font-body)', textDecoration: 'none', transition: 'color 150ms' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-primary)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-muted)'; }}
              >
                <ExternalLink size={12} /> View full product page
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
