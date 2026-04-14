interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  className?: string;
}

export function Skeleton({ width = '100%', height = '1rem', borderRadius = '6px', className = '' }: SkeletonProps) {
  return (
    <div
      className={`skeleton ${className}`}
      style={{ width, height, borderRadius, display: 'block' }}
      aria-hidden="true"
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div style={{ borderRadius: '12px', overflow: 'hidden', backgroundColor: 'var(--color-white)', boxShadow: 'var(--shadow-card)' }}>
      <Skeleton height="220px" borderRadius="0" />
      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Skeleton height="1.25rem" width="70%" />
        <Skeleton height="1rem" width="90%" />
        <Skeleton height="1rem" width="40%" />
      </div>
    </div>
  );
}
