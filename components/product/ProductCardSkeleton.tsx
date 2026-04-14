export function ProductCardSkeleton() {
  return (
    <div style={{
      borderRadius: '14px',
      overflow: 'hidden',
      backgroundColor: 'var(--color-white)',
      boxShadow: '0 4px 24px rgba(44,24,16,0.06)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Image placeholder */}
      <div className="skeleton" style={{ height: '220px', width: '100%' }} />

      <div style={{ padding: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        {/* Title */}
        <div className="skeleton" style={{ height: '18px', borderRadius: '6px', width: '70%' }} />
        {/* Stars */}
        <div className="skeleton" style={{ height: '12px', borderRadius: '4px', width: '45%' }} />
        {/* Description lines */}
        <div className="skeleton" style={{ height: '12px', borderRadius: '4px', width: '100%' }} />
        <div className="skeleton" style={{ height: '12px', borderRadius: '4px', width: '80%' }} />
        {/* Price + button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.5rem' }}>
          <div className="skeleton" style={{ height: '22px', borderRadius: '6px', width: '60px' }} />
          <div className="skeleton" style={{ height: '34px', borderRadius: '8px', width: '72px' }} />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
      gap: '1.5rem',
    }}>
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
