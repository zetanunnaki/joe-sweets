import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllProducts } from '@/lib/products';
import { getReviewsBySlug } from '@/lib/reviews';
import { EgyptianDivider } from '@/components/ui/EgyptianDivider';

export const metadata: Metadata = {
  title: 'Customer Reviews',
  description: 'Read what our customers say about Joe Sweets — authentic Egyptian food and desserts in the DMV area.',
};

interface ReviewEntry {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  text: string;
  productName: string;
  productSlug: string;
}

export default function ReviewsPage() {
  const products = getAllProducts();
  const allReviews: ReviewEntry[] = products.flatMap((p) =>
    getReviewsBySlug(p.slug).map((r) => ({ ...r, productName: p.name, productSlug: p.slug }))
  ).sort((a, b) => b.date.localeCompare(a.date));

  const totalReviews = allReviews.length;
  const avgRating = totalReviews > 0
    ? allReviews.reduce((s, r) => s + r.rating, 0) / totalReviews
    : 0;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)', paddingBottom: '5rem' }}>
      {/* Hero */}
      <div style={{ backgroundColor: 'var(--color-secondary)', padding: 'clamp(2rem,5vw,3.5rem) 1.5rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cg fill='none' stroke='%23C8963E' stroke-width='0.5' opacity='0.07'%3E%3Cpolygon points='24,4 28,14 38,14 30,20 33,30 24,24 15,30 18,20 10,14 20,14'/%3E%3C/g%3E%3C/svg%3E\")", backgroundRepeat: 'repeat', pointerEvents: 'none' }} />
        <div style={{ position: 'relative' }}>
          <p style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(1rem,3vw,1.3rem)', color: 'var(--color-primary)', marginBottom: '0.4rem', marginTop: 0 }}>Loved by our community</p>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem,5vw,3rem)', color: 'var(--color-white)', margin: '0 0 1.5rem' }}>Customer Reviews</h1>
          <EgyptianDivider color="var(--color-primary)" />
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
        {/* Summary */}
        <div style={{ backgroundColor: 'var(--color-white)', borderRadius: '16px', padding: '2rem', boxShadow: '0 4px 24px rgba(44,24,16,0.08)', marginBottom: '2.5rem', display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ textAlign: 'center', flexShrink: 0 }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: '4rem', fontWeight: 700, color: 'var(--color-primary)', margin: 0, lineHeight: 1 }}>{avgRating.toFixed(1)}</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2px', margin: '0.5rem 0 0.25rem' }}>
              {[1,2,3,4,5].map((s) => (
                <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill={s <= Math.round(avgRating) ? '#C8963E' : '#e2d9cf'}>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--color-muted)', margin: 0 }}>{totalReviews} reviews</p>
          </div>
          <div style={{ flex: 1, minWidth: '180px' }}>
            {[5,4,3,2,1].map((star) => {
              const count = allReviews.filter((r) => r.rating === star).length;
              const pct = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
              return (
                <div key={star} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.375rem' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--color-muted)', width: '24px', textAlign: 'right', flexShrink: 0 }}>{star}★</span>
                  <div style={{ flex: 1, height: '8px', borderRadius: '4px', backgroundColor: 'var(--color-bg-alt)', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, backgroundColor: 'var(--color-primary)', borderRadius: '4px' }} />
                  </div>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--color-secondary)', width: '20px', flexShrink: 0 }}>{count}</span>
                </div>
              );
            })}
          </div>
          <div style={{ flexShrink: 0 }}>
            <Link href="/menu" style={{ display: 'inline-flex', padding: '0.75rem 1.5rem', borderRadius: '10px', background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))', color: 'white', fontFamily: 'var(--font-body)', fontWeight: 600, textDecoration: 'none', fontSize: '0.9rem' }}>
              Order Now
            </Link>
          </div>
        </div>

        {/* All reviews */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {allReviews.map((r) => (
            <div key={r.id} style={{ backgroundColor: 'var(--color-white)', borderRadius: '14px', padding: '1.5rem', boxShadow: '0 2px 12px rgba(44,24,16,0.05)' }}>
              <div style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-start' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.9rem', flexShrink: 0 }}>
                  {r.avatar}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <div>
                      <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-secondary)' }}>{r.name}</span>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--color-muted)', marginLeft: '0.625rem' }}>
                        on <Link href={`/product/${r.productSlug}`} style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 600 }}>{r.productName}</Link>
                      </span>
                    </div>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--color-muted)', whiteSpace: 'nowrap' }}>
                      {new Date(r.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '1px', marginBottom: '0.5rem' }}>
                    {[1,2,3,4,5].map((s) => (
                      <svg key={s} width="13" height="13" viewBox="0 0 24 24" fill={s <= r.rating ? '#C8963E' : '#e2d9cf'}>
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                  {r.title && <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-secondary)', margin: '0 0 0.375rem' }}>{r.title}</p>}
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-muted)', margin: 0, lineHeight: 1.65 }}>{r.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
