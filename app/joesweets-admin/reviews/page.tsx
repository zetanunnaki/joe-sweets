import { getAllProducts } from '@/lib/products';
import reviewsData from '@/data/reviews.json';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Reviews | Admin' };

interface ReviewEntry {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  text: string;
}

const STAR_SVG = (filled: boolean) => (
  `<svg width="11" height="11" viewBox="0 0 24 24" fill="${filled ? '#C8963E' : '#e2d9cf'}">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>`
);

export default function ReviewsAdminPage() {
  const products = getAllProducts();
  const reviews = reviewsData as Record<string, ReviewEntry[]>;

  // Flatten all reviews with product info
  const allReviews = products.flatMap((p) =>
    (reviews[p.slug] ?? []).map((r) => ({ ...r, productName: p.name, productSlug: p.slug }))
  ).sort((a, b) => b.date.localeCompare(a.date));

  const totalReviews = allReviews.length;
  const avgRating = totalReviews > 0
    ? (allReviews.reduce((s, r) => s + r.rating, 0) / totalReviews).toFixed(1)
    : '—';

  const dist = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: allReviews.filter((r) => r.rating === star).length,
  }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--color-secondary)', margin: '0 0 0.25rem' }}>Reviews</h2>
        <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-muted)', margin: 0, fontSize: '0.875rem' }}>
          {totalReviews} total reviews across all products
        </p>
      </div>

      {/* Summary row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        {/* Avg rating */}
        <div style={{ backgroundColor: 'var(--color-white)', borderRadius: '12px', padding: '1.25rem', boxShadow: '0 2px 12px rgba(44,24,16,0.06)' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 0.5rem' }}>Avg Rating</p>
          <p style={{ fontFamily: 'var(--font-heading)', fontSize: '2.25rem', fontWeight: 700, color: 'var(--color-primary)', margin: 0 }}>{avgRating}</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--color-muted)', margin: '0.25rem 0 0' }}>out of 5 stars</p>
        </div>

        {/* Star distribution */}
        <div style={{ backgroundColor: 'var(--color-white)', borderRadius: '12px', padding: '1.25rem', boxShadow: '0 2px 12px rgba(44,24,16,0.06)', gridColumn: 'span 2' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 0.75rem' }}>Distribution</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {dist.map(({ star, count }) => (
              <div key={star} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--color-muted)', width: '20px', textAlign: 'right' }}>{star}★</span>
                <div style={{ flex: 1, height: '8px', borderRadius: '4px', backgroundColor: 'var(--color-bg-alt)', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', borderRadius: '4px',
                    width: totalReviews > 0 ? `${(count / totalReviews) * 100}%` : '0%',
                    backgroundColor: 'var(--color-primary)',
                    transition: 'width 600ms ease',
                  }} />
                </div>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--color-secondary)', width: '24px' }}>{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews list */}
      <div style={{ backgroundColor: 'var(--color-white)', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 12px rgba(44,24,16,0.06)' }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: 'var(--color-secondary)', margin: '0 0 1.25rem' }}>All Reviews</h3>
        {allReviews.length === 0 ? (
          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-muted)', fontSize: '0.875rem', textAlign: 'center', padding: '2rem 0', margin: 0 }}>No reviews yet.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {allReviews.map((r, i) => (
              <div key={r.id} style={{
                display: 'grid',
                gridTemplateColumns: '36px 1fr auto',
                gap: '0.75rem',
                alignItems: 'flex-start',
                padding: '1rem 0',
                borderBottom: i < allReviews.length - 1 ? '1px solid var(--color-bg-alt)' : 'none',
              }}>
                {/* Avatar */}
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.85rem',
                  flexShrink: 0,
                }}>
                  {r.avatar}
                </div>
                {/* Content */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.2rem' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-secondary)' }}>{r.name}</span>
                    <span style={{ display: 'inline-flex', gap: '1px' }}>
                      {[1,2,3,4,5].map((s) => (
                        <svg key={s} width="11" height="11" viewBox="0 0 24 24" fill={s <= r.rating ? '#C8963E' : '#e2d9cf'}>
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      ))}
                    </span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--color-muted)' }}>
                      on <strong>{r.productName}</strong>
                    </span>
                  </div>
                  {r.title && <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-secondary)', margin: '0 0 0.2rem' }}>{r.title}</p>}
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--color-muted)', margin: 0, lineHeight: 1.5 }}>{r.text}</p>
                </div>
                {/* Date */}
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--color-muted)', whiteSpace: 'nowrap' }}>
                  {new Date(r.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
