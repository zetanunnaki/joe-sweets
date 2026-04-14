'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThumbsUp, ChevronDown, PenLine, CheckCircle, Star } from 'lucide-react';
import type { Review } from '@/lib/reviews';

interface ReviewsSectionProps {
  reviews: Review[];
  rating: number;
  reviewCount: number;
  productSlug?: string;
}

function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div style={{ display: 'flex', gap: '4px' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: '2px',
            transition: 'transform 120ms',
            transform: (hovered || value) >= star ? 'scale(1.15)' : 'scale(1)',
          }}
          aria-label={`${star} star${star !== 1 ? 's' : ''}`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24"
            fill={(hovered || value) >= star ? 'var(--color-primary)' : '#e2d9cf'}>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </button>
      ))}
    </div>
  );
}

function WriteReviewForm({ productSlug, onClose }: { productSlug: string; onClose: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating === 0) { setErrorMsg('Please select a star rating.'); return; }
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: productSlug, name, email, rating, title, text }),
      });
      const data = await res.json();
      if (res.ok) { setStatus('success'); }
      else { setStatus('error'); setErrorMsg(data.error || 'Something went wrong.'); }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please try again.');
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.65rem 0.875rem',
    borderRadius: '8px', border: '1.5px solid #e2d9cf',
    backgroundColor: 'var(--color-bg)', color: 'var(--color-secondary)',
    fontFamily: 'var(--font-body)', fontSize: '0.875rem',
    outline: 'none', boxSizing: 'border-box', transition: 'border-color 200ms',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.3 }}
      style={{
        marginTop: '1.5rem',
        padding: '1.5rem',
        borderRadius: '14px',
        backgroundColor: 'var(--color-bg-alt)',
        border: '1.5px solid rgba(200,150,62,0.2)',
      }}
    >
      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', color: 'var(--color-secondary)', margin: '0 0 1.25rem' }}>
        Write a Review
      </h3>

      {status === 'success' ? (
        <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
          <CheckCircle size={36} color="var(--color-primary)" style={{ marginBottom: '0.75rem' }} />
          <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, color: 'var(--color-secondary)', margin: '0 0 0.375rem' }}>
            Thank you for your review!
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--color-muted)', margin: '0 0 1rem' }}>
            Your review is pending moderation and will appear shortly.
          </p>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 600 }}
          >
            Close
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          {/* Star rating */}
          <div>
            <label style={{ display: 'block', marginBottom: '0.375rem', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-secondary)', fontFamily: 'var(--font-body)' }}>
              Your Rating *
            </label>
            <StarPicker value={rating} onChange={setRating} />
          </div>

          {/* Name + Email */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }} className="form-row-2">
            <div>
              <label style={{ display: 'block', marginBottom: '0.375rem', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-secondary)', fontFamily: 'var(--font-body)' }}>Name *</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" style={inputStyle}
                onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = '#e2d9cf'; }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.375rem', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-secondary)', fontFamily: 'var(--font-body)' }}>Email *</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="not published" style={inputStyle}
                onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = '#e2d9cf'; }}
              />
            </div>
          </div>

          {/* Title */}
          <div>
            <label style={{ display: 'block', marginBottom: '0.375rem', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-secondary)', fontFamily: 'var(--font-body)' }}>Review Title *</label>
            <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Sum up your experience" style={inputStyle} maxLength={80}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = '#e2d9cf'; }}
            />
          </div>

          {/* Text */}
          <div>
            <label style={{ display: 'block', marginBottom: '0.375rem', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-secondary)', fontFamily: 'var(--font-body)' }}>Your Review *</label>
            <textarea
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Tell other customers what you thought..."
              rows={4}
              style={{ ...inputStyle, resize: 'vertical', minHeight: '90px' }}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = '#e2d9cf'; }}
            />
          </div>

          {errorMsg && (
            <p style={{ margin: 0, color: 'var(--color-accent)', fontSize: '0.82rem', fontFamily: 'var(--font-body)' }}>{errorMsg}</p>
          )}

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
            <button type="button" onClick={onClose} style={{
              padding: '0.6rem 1.25rem', borderRadius: '8px',
              border: '1px solid #e2d9cf', background: 'transparent',
              color: 'var(--color-muted)', cursor: 'pointer',
              fontFamily: 'var(--font-body)', fontSize: '0.85rem',
            }}>Cancel</button>
            <button type="submit" disabled={status === 'loading'} style={{
              padding: '0.6rem 1.5rem', borderRadius: '8px',
              border: 'none',
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
              color: 'white', cursor: status === 'loading' ? 'wait' : 'pointer',
              fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 600,
              opacity: status === 'loading' ? 0.7 : 1,
            }}>
              {status === 'loading' ? 'Submitting…' : 'Submit Review'}
            </button>
          </div>
        </form>
      )}
    </motion.div>
  );
}

function StarRow({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24"
          fill={i < Math.round(rating) ? 'var(--color-primary)' : '#e2d9cf'}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

function RatingBar({ label, count, total }: { label: string; count: number; total: number }) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', fontSize: '0.8rem' }}>
      <span style={{ color: 'var(--color-muted)', width: '40px', textAlign: 'right', flexShrink: 0 }}>{label}</span>
      <div style={{ flex: 1, height: '6px', borderRadius: '3px', backgroundColor: 'rgba(200,150,62,0.12)', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          style={{ height: '100%', borderRadius: '3px', backgroundColor: 'var(--color-primary)' }}
        />
      </div>
      <span style={{ color: 'var(--color-muted)', width: '24px', flexShrink: 0 }}>{count}</span>
    </div>
  );
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const [helpful, setHelpful] = useState(false);
  const formattedDate = new Date(review.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      style={{
        padding: '1.25rem',
        borderRadius: '12px',
        backgroundColor: 'var(--color-bg)',
        border: '1px solid rgba(200,150,62,0.12)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.625rem',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
        <div style={{
          width: '38px', height: '38px', borderRadius: '50%', flexShrink: 0,
          background: 'linear-gradient(135deg, var(--color-primary), #a67a2e)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-heading)', fontSize: '0.95rem', color: 'white', fontWeight: 700,
        }}>
          {review.avatar}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-secondary)' }}>
              {review.name}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>{formattedDate}</span>
          </div>
          <StarRow rating={review.rating} size={12} />
        </div>
      </div>

      {/* Title */}
      <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.88rem', color: 'var(--color-secondary)' }}>
        {review.title}
      </p>

      {/* Text */}
      <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--color-secondary)', lineHeight: 1.65, opacity: 0.8 }}>
        {review.text}
      </p>

      {/* Helpful */}
      <button
        onClick={() => setHelpful((h) => !h)}
        style={{
          alignSelf: 'flex-start',
          display: 'flex', alignItems: 'center', gap: '0.3rem',
          background: 'none', border: 'none', cursor: 'pointer',
          fontSize: '0.75rem',
          color: helpful ? 'var(--color-primary)' : 'var(--color-muted)',
          fontFamily: 'var(--font-body)',
          padding: '0.2rem 0',
          transition: 'color 150ms',
        }}
      >
        <ThumbsUp size={12} />
        {helpful ? 'Helpful!' : 'Helpful?'}
      </button>
    </motion.div>
  );
}

export function ReviewsSection({ reviews, rating, reviewCount, productSlug }: ReviewsSectionProps) {
  const [showAll, setShowAll] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const INITIAL_COUNT = 3;

  if (reviews.length === 0) return null;

  // Compute distribution
  const dist = [5, 4, 3, 2, 1].map((stars) => ({
    label: `${stars}★`,
    count: reviews.filter((r) => r.rating === stars).length,
  }));

  const displayed = showAll ? reviews : reviews.slice(0, INITIAL_COUNT);

  return (
    <section id="product-reviews" style={{ paddingTop: '2.5rem' }}>
      {/* Section header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', color: 'var(--color-secondary)', margin: '0 0 0.25rem' }}>
          Customer Reviews
        </h2>
        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}>
          {reviewCount} verified reviews
        </p>
      </div>

      {/* Summary + bars */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        gap: '1.5rem 2rem',
        padding: '1.25rem',
        borderRadius: '12px',
        backgroundColor: 'var(--color-bg-alt)',
        border: '1px solid rgba(200,150,62,0.12)',
        marginBottom: '1.5rem',
        alignItems: 'center',
      }}>
        {/* Big score */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ margin: 0, fontFamily: 'var(--font-heading)', fontSize: '3rem', fontWeight: 700, color: 'var(--color-primary)', lineHeight: 1 }}>
            {rating.toFixed(1)}
          </p>
          <StarRow rating={rating} size={16} />
          <p style={{ margin: '0.25rem 0 0', fontSize: '0.75rem', color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}>
            out of 5
          </p>
        </div>
        {/* Bars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {dist.map((d) => (
            <RatingBar key={d.label} label={d.label} count={d.count} total={reviews.length} />
          ))}
        </div>
      </div>

      {/* Review cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
        {displayed.map((review, i) => (
          <ReviewCard key={review.id} review={review} index={i} />
        ))}
      </div>

      {/* Show more / less + Write review button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        {reviews.length > INITIAL_COUNT ? (
          <button
            onClick={() => setShowAll((s) => !s)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
              background: 'none',
              border: '1px solid rgba(200,150,62,0.3)',
              borderRadius: '8px',
              padding: '0.5rem 1.25rem',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              fontWeight: 500,
              color: 'var(--color-secondary)',
              transition: 'border-color 180ms, color 180ms',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-primary)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-primary)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(200,150,62,0.3)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-secondary)'; }}
          >
            <motion.span animate={{ rotate: showAll ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ display: 'flex' }}>
              <ChevronDown size={15} />
            </motion.span>
            {showAll ? `Show fewer reviews` : `Show all ${reviews.length} reviews`}
          </button>
        ) : <div />}

        {productSlug && (
          <button
            onClick={() => setShowForm((v) => !v)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.5rem 1.1rem',
              borderRadius: '8px',
              border: '1.5px solid var(--color-primary)',
              background: showForm ? 'rgba(200,150,62,0.08)' : 'transparent',
              color: 'var(--color-primary)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background 180ms',
            }}
          >
            <PenLine size={14} />
            Write a Review
          </button>
        )}
      </div>

      {/* Write review form */}
      <AnimatePresence>
        {showForm && productSlug && (
          <WriteReviewForm productSlug={productSlug} onClose={() => setShowForm(false)} />
        )}
      </AnimatePresence>
    </section>
  );
}
