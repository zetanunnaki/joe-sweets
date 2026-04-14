'use client';

import { useState, useMemo } from 'react';
import { ShoppingBag, Check, Leaf, Clock, MapPin, Star, Share2, Truck } from 'lucide-react';
import { Product, ProductVariant } from '@/types';
import { ProductGallery } from '@/components/product/ProductGallery';
import { VariantSelector } from '@/components/product/VariantSelector';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { EgyptianDivider } from '@/components/ui/EgyptianDivider';
import { useCartStore } from '@/store/cart';
import { useToastStore } from '@/store/toast';
import { formatCurrency } from '@/lib/utils';
import { BackInStockForm } from '@/components/product/BackInStockForm';
import { IngredientHighlights } from '@/components/product/IngredientHighlights';

const guarantees = [
  { icon: Leaf, label: 'Fresh Ingredients', desc: 'No preservatives' },
  { icon: Clock, label: 'Made to Order', desc: 'Baked same day' },
  { icon: MapPin, label: 'DMV Delivery', desc: 'DC · MD · VA' },
  { icon: Star, label: '5-Star Rated', desc: 'By our customers' },
];

interface Props {
  product: Product;
}

export function ProductDetailClient({ product }: Props) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [shared, setShared] = useState(false);

  const deliveryDate = useMemo(() => {
    const now = new Date();
    const cutoff = 16; // 4 PM cutoff
    const target = new Date(now);
    if (now.getHours() >= cutoff || now.getDay() === 0) {
      target.setDate(target.getDate() + (now.getDay() === 6 ? 2 : 1));
    } else if (now.getDay() === 6) {
      target.setDate(target.getDate() + 2);
    }
    // Skip Sundays
    if (target.getDay() === 0) target.setDate(target.getDate() + 1);
    return target.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
  }, []);

  async function handleShare() {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    try {
      if (navigator.share) {
        await navigator.share({ title: product.name, text: product.description, url });
      } else {
        await navigator.clipboard.writeText(url);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      }
    } catch {}
  }
  const { addItem, openDrawer } = useCartStore();
  const { addToast } = useToastStore();

  function handleAddToCart() {
    addItem({
      productId: product.id,
      variantId: selectedVariant.id,
      qty,
      price: selectedVariant.price,
      name: product.name,
      image: product.images[0],
      variantLabel: selectedVariant.label,
    });
    setAdded(true);
    addToast(`${product.name} added to cart`);
    openDrawer();
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="product-page-content">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginBottom: '2rem' }}>
        {/* Gallery */}
        <ProductGallery images={product.images} productName={product.name} />

        {/* Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Category + badges */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <Badge variant="muted">{product.category}</Badge>
            {product.tags.includes('bestseller') && <Badge variant="primary">Bestseller</Badge>}
          </div>

          <div>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', color: 'var(--color-secondary)', margin: '0 0 0.25rem' }}>
              {product.name}
            </h1>
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--color-muted)', margin: 0, fontStyle: 'italic' }}>
              {product.nameAr}
            </p>
          </div>

          {/* Star rating — click to scroll to reviews */}
          <a
            href="#product-reviews"
            style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', textDecoration: 'none' }}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('product-reviews')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < Math.round(product.rating) ? 'var(--color-primary)' : '#e2d9cf'}>
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
            <span style={{ fontSize: '0.85rem', color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}>
              {product.rating.toFixed(1)} ({product.reviewCount} reviews)
            </span>
          </a>

          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 700, color: 'var(--color-primary)' }}>
              {formatCurrency(selectedVariant.price)}
            </span>
            {product.compareAtPrice && (
              <span style={{ fontSize: '1.1rem', color: 'var(--color-muted)', textDecoration: 'line-through' }}>
                {formatCurrency(product.compareAtPrice)}
              </span>
            )}
          </div>

          {/* Delivery estimate */}
          {product.inStock && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.625rem',
              padding: '0.625rem 0.875rem',
              backgroundColor: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '8px',
              fontFamily: 'var(--font-body)',
            }}>
              <Truck size={15} color="#15803d" style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '0.82rem', color: '#15803d', fontWeight: 500 }}>
                Order now · Estimated delivery: <strong>{deliveryDate}</strong>
              </span>
            </div>
          )}

          {/* Description */}
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--color-secondary)', lineHeight: 1.7, margin: 0, opacity: 0.85 }}>
            {product.description}
          </p>

          {/* Ingredient highlights */}
          <IngredientHighlights product={product} />

          {/* Variant selector */}
          <VariantSelector
            variants={product.variants}
            selectedId={selectedVariant.id}
            onChange={setSelectedVariant}
          />

          {/* Qty + Add to cart (hidden on mobile, shown via sticky bar) */}
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <QuantityStepper value={qty} onChange={setQty} size="md" />
            <Button
              variant="primary"
              size="lg"
              onClick={handleAddToCart}
              disabled={!product.inStock}
              style={{ flex: 1, minWidth: '180px' }}
            >
              {added ? <><Check size={18} /> Added!</> : <><ShoppingBag size={18} /> Add to Cart</>}
            </Button>
          </div>

          {!product.inStock && (
            <BackInStockForm productName={product.name} productId={product.id} />
          )}

          {/* Share button */}
          <button
            onClick={handleShare}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: '1px solid rgba(200,150,62,0.25)', borderRadius: '8px', padding: '0.5rem 0.875rem', cursor: 'pointer', color: shared ? '#15803d' : 'var(--color-muted)', fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 500, transition: 'border-color 180ms, color 180ms' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-primary)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(200,150,62,0.25)'; }}
          >
            {shared ? <Check size={14} /> : <Share2 size={14} />}
            {shared ? 'Copied!' : 'Share'}
          </button>

          {/* Tags */}
          {product.tags.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
              {product.tags.map((tag) => (
                <span key={tag} style={{ fontSize: '0.75rem', color: 'var(--color-muted)', backgroundColor: 'var(--color-bg-alt)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Guarantee strip */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.625rem', marginTop: '0.25rem' }}>
            {guarantees.map(({ icon: Icon, label, desc }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', padding: '0.75rem', backgroundColor: 'var(--color-bg-alt)', borderRadius: '10px', border: '1px solid rgba(200,150,62,0.1)' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, rgba(200,150,62,0.2), rgba(200,150,62,0.07))', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={15} color="var(--color-primary)" />
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-secondary)', fontFamily: 'var(--font-body)' }}>{label}</p>
                  <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Egyptian divider before related */}
      <div style={{ margin: '2.5rem 0 0' }}>
        <EgyptianDivider />
      </div>

      {/* Mobile sticky Add to Cart bar */}
      <div className="mobile-sticky-bar">
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontFamily: 'var(--font-heading)', fontSize: '0.95rem', color: 'var(--color-secondary)', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</p>
          <p style={{ margin: 0, color: 'var(--color-primary)', fontWeight: 700, fontSize: '1rem' }}>{formatCurrency(selectedVariant.price)}</p>
        </div>
        <QuantityStepper value={qty} onChange={setQty} size="sm" />
        <Button
          variant="primary"
          size="md"
          onClick={handleAddToCart}
          disabled={!product.inStock}
          style={{ flexShrink: 0 }}
        >
          {added ? <Check size={16} /> : <ShoppingBag size={16} />}
          {added ? 'Added!' : 'Add'}
        </Button>
      </div>
    </div>
  );
}
