export default function Loading() {
  return (
    <div style={{
      minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      backgroundColor: 'var(--color-bg)',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
        {/* Gold spinning star */}
        <svg width="40" height="40" viewBox="0 0 48 48" style={{ animation: 'spin 1.4s linear infinite' }}>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <polygon points="24,4 28,14 38,14 30,20 33,30 24,24 15,30 18,20 10,14 20,14" fill="none" stroke="#C8963E" strokeWidth="2.5" strokeLinejoin="round" />
        </svg>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--color-muted)', margin: 0 }}>Loading…</p>
      </div>
    </div>
  );
}
