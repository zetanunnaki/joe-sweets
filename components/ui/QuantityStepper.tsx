'use client';

interface QuantityStepperProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  size?: 'sm' | 'md';
}

export function QuantityStepper({ value, min = 1, max = 99, onChange, size = 'sm' }: QuantityStepperProps) {
  const dim = size === 'md' ? '40px' : '36px';
  const btnStyle: React.CSSProperties = {
    width: dim, height: dim,
    borderRadius: '8px',
    border: '1.5px solid var(--color-primary)',
    backgroundColor: 'transparent',
    color: 'var(--color-primary)',
    fontSize: '1.1rem',
    fontWeight: 700,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 200ms',
    lineHeight: 1,
    touchAction: 'manipulation',
    WebkitTapHighlightColor: 'transparent',
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        style={{ ...btnStyle, opacity: value <= min ? 0.35 : 1 }}
        onMouseEnter={(e) => { if (value > min) (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(200,150,62,0.1)'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'; }}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span style={{
        minWidth: '32px', textAlign: 'center',
        fontWeight: 700, fontSize: size === 'md' ? '1.05rem' : '0.95rem',
        color: 'var(--color-secondary)',
        fontFamily: 'var(--font-body)',
      }}>
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        style={{ ...btnStyle, opacity: value >= max ? 0.35 : 1 }}
        onMouseEnter={(e) => { if (value < max) (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(200,150,62,0.1)'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'; }}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
