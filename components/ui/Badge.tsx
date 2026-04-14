type BadgeVariant = 'primary' | 'accent' | 'muted' | 'success';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
}

const styles: Record<BadgeVariant, React.CSSProperties> = {
  primary: { backgroundColor: 'var(--color-primary)', color: 'var(--color-white)' },
  accent:  { backgroundColor: 'var(--color-accent)',  color: 'var(--color-white)' },
  muted:   { backgroundColor: 'var(--color-bg-alt)',  color: 'var(--color-muted)' },
  success: { backgroundColor: '#22c55e',              color: 'var(--color-white)' },
};

export function Badge({ children, variant = 'primary' }: BadgeProps) {
  return (
    <span
      style={{
        ...styles[variant],
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.2rem 0.6rem',
        borderRadius: '999px',
        fontSize: '0.75rem',
        fontWeight: 600,
        fontFamily: 'var(--font-body)',
        letterSpacing: '0.02em',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  );
}
