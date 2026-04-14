'use client';

import { ProductVariant } from '@/types';
import { formatCurrency } from '@/lib/utils';

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedId: string;
  onChange: (variant: ProductVariant) => void;
}

export function VariantSelector({ variants, selectedId, onChange }: VariantSelectorProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <label style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-secondary)', fontFamily: 'var(--font-body)' }}>
        Size / Quantity
      </label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {variants.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => onChange(v)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              border: `2px solid ${selectedId === v.id ? 'var(--color-primary)' : '#e2d9cf'}`,
              backgroundColor: selectedId === v.id ? 'rgba(200,150,62,0.08)' : 'var(--color-white)',
              color: selectedId === v.id ? 'var(--color-primary)' : 'var(--color-secondary)',
              fontWeight: selectedId === v.id ? 600 : 400,
              fontSize: '0.875rem',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              transition: 'all 200ms',
              textAlign: 'left',
            }}
          >
            <span style={{ display: 'block' }}>{v.label}</span>
            <span style={{ display: 'block', fontSize: '0.8rem', color: selectedId === v.id ? 'var(--color-primary-dark)' : 'var(--color-muted)' }}>
              {formatCurrency(v.price)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
