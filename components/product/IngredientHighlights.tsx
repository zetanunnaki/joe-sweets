'use client';

import { Leaf, Flame, Wheat, Droplets, Star, Gift } from 'lucide-react';
import { Product } from '@/types';

const TAG_HIGHLIGHTS: Record<string, { icon: typeof Leaf; label: string; color: string }> = {
  vegan: { icon: Leaf, label: 'Vegan', color: '#4dba7f' },
  vegetarian: { icon: Leaf, label: 'Vegetarian', color: '#4dba7f' },
  nuts: { icon: Star, label: 'Contains Nuts', color: '#c8963e' },
  warm: { icon: Flame, label: 'Served Warm', color: '#d44d4d' },
  hot: { icon: Flame, label: 'Served Hot', color: '#d44d4d' },
  cold: { icon: Droplets, label: 'Served Cold', color: '#4d9bd4' },
  'gluten-free': { icon: Wheat, label: 'Gluten Free', color: '#4dba7f' },
  semolina: { icon: Wheat, label: 'Contains Semolina', color: '#c8963e' },
  dairy: { icon: Droplets, label: 'Contains Dairy', color: '#94a3b8' },
  cream: { icon: Droplets, label: 'Contains Cream', color: '#94a3b8' },
  butter: { icon: Droplets, label: 'Contains Butter', color: '#94a3b8' },
  premium: { icon: Star, label: 'Premium Quality', color: '#c8963e' },
  luxury: { icon: Star, label: 'Luxury Grade', color: '#c8963e' },
  gift: { icon: Gift, label: 'Gift Ready', color: '#6366f1' },
};

const FRESHNESS_INFO: Record<string, { made: string; shelf: string }> = {
  sweets: { made: 'Made fresh daily', shelf: 'Best within 3–5 days' },
  foods: { made: 'Prepared to order', shelf: 'Consume same day' },
  drinks: { made: 'Freshly prepared', shelf: 'Best within 2 days' },
  boxes: { made: 'Assembled fresh', shelf: 'Best within 5–7 days' },
};

export function IngredientHighlights({ product }: { product: Product }) {
  const highlights = product.tags
    .map((tag) => TAG_HIGHLIGHTS[tag])
    .filter(Boolean)
    .slice(0, 5);

  const freshness = FRESHNESS_INFO[product.category] ?? FRESHNESS_INFO.sweets;

  if (highlights.length === 0) return null;

  return (
    <div style={{ marginTop: '0.25rem' }}>
      <p style={{ margin: '0 0 0.625rem', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}>
        Highlights
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.875rem' }}>
        {highlights.map(({ icon: Icon, label, color }) => (
          <div
            key={label}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
              padding: '0.3rem 0.625rem',
              borderRadius: '100px',
              backgroundColor: `${color}14`,
              border: `1px solid ${color}30`,
              fontSize: '0.78rem',
              fontFamily: 'var(--font-body)',
              color: 'var(--color-secondary)',
              fontWeight: 500,
            }}
          >
            <Icon size={11} color={color} />
            {label}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '1rem', padding: '0.75rem', borderRadius: '8px', backgroundColor: 'rgba(200,150,62,0.05)', border: '1px solid rgba(200,150,62,0.1)' }}>
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}>Made</p>
          <p style={{ margin: '0.125rem 0 0', fontSize: '0.82rem', color: 'var(--color-secondary)', fontFamily: 'var(--font-body)', fontWeight: 500 }}>{freshness.made}</p>
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}>Storage</p>
          <p style={{ margin: '0.125rem 0 0', fontSize: '0.82rem', color: 'var(--color-secondary)', fontFamily: 'var(--font-body)', fontWeight: 500 }}>{freshness.shelf}</p>
        </div>
      </div>
    </div>
  );
}
