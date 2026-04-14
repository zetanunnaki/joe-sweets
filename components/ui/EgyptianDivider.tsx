export function EgyptianDivider({ color = 'var(--color-primary)', opacity = 0.5 }: { color?: string; opacity?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%', padding: '0.5rem 0', opacity }}>
      <div style={{ flex: 1, height: '1px', background: `linear-gradient(to right, transparent, ${color})` }} />
      <svg
        width="40" height="20" viewBox="0 0 40 20" fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ margin: '0 0.75rem', flexShrink: 0 }}
      >
        {/* Central 8-pointed star */}
        <polygon
          points="20,2 21.8,8.2 28,8.2 23,12 24.9,18.2 20,14.5 15.1,18.2 17,12 12,8.2 18.2,8.2"
          fill={color}
        />
        {/* Side diamonds */}
        <polygon points="5,10 7,8 9,10 7,12" fill={color} opacity="0.7" />
        <polygon points="31,10 33,8 35,10 33,12" fill={color} opacity="0.7" />
        {/* Dots */}
        <circle cx="1" cy="10" r="1" fill={color} opacity="0.4" />
        <circle cx="39" cy="10" r="1" fill={color} opacity="0.4" />
      </svg>
      <div style={{ flex: 1, height: '1px', background: `linear-gradient(to left, transparent, ${color})` }} />
    </div>
  );
}
