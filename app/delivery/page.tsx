import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Clock, Truck, DollarSign, Phone } from 'lucide-react';
import { EgyptianDivider } from '@/components/ui/EgyptianDivider';

export const metadata: Metadata = {
  title: 'Delivery Info',
  description: 'Joe Sweets delivery zones, fees, and hours for the DMV area — DC, Maryland, and Virginia.',
};

const ZONES = [
  {
    zone: 'Zone 1 — Free Delivery',
    fee: 0,
    minOrder: 50,
    areas: ['Washington DC (all neighborhoods)', 'Arlington, VA', 'Alexandria, VA', 'Falls Church, VA'],
    eta: '1–2 hours',
    color: '#15803d',
    bg: '#f0fdf4',
  },
  {
    zone: 'Zone 2 — $5 Delivery',
    fee: 5,
    minOrder: 0,
    areas: ['Bethesda, MD', 'Silver Spring, MD', 'College Park, MD', 'Rockville, MD', 'Fairfax, VA', 'Reston, VA'],
    eta: '2–3 hours',
    color: 'var(--color-primary)',
    bg: 'rgba(200,150,62,0.06)',
  },
  {
    zone: 'Zone 3 — Contact Us',
    fee: null,
    minOrder: 0,
    areas: ['Annapolis, MD', 'Baltimore, MD (selected areas)', 'Manassas, VA', 'Woodbridge, VA', 'Other DMV locations'],
    eta: 'Varies',
    color: '#6366f1',
    bg: '#f5f3ff',
  },
];

const FAQS = [
  { q: 'How far in advance do I need to order?', a: 'We recommend ordering at least 24 hours ahead. For large catering orders (50+ guests), please order 3+ days in advance.' },
  { q: 'Can I pick up my order?', a: 'Yes! Contact us on WhatsApp and we can arrange a pickup from our kitchen in DC. No delivery fee for pickups.' },
  { q: "What if I'm outside the delivery zones?", a: "Reach out to us — we try to accommodate special requests, especially for large orders. We've delivered as far as Richmond, VA for catering events!" },
  { q: 'Do you offer same-day delivery?', a: 'Yes, for orders placed before 12 PM. Subject to availability. WhatsApp us to confirm.' },
  { q: 'What happens if I miss my delivery?', a: "We'll contact you via WhatsApp before arrival. If you miss it, we'll attempt redelivery or arrange a pickup." },
];

export default function DeliveryPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)', paddingBottom: '5rem' }}>
      {/* Hero */}
      <div style={{
        backgroundColor: 'var(--color-secondary)',
        padding: 'clamp(2rem,5vw,3.5rem) 1.5rem',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cg fill='none' stroke='%23C8963E' stroke-width='0.5' opacity='0.07'%3E%3Cpolygon points='24,4 28,14 38,14 30,20 33,30 24,24 15,30 18,20 10,14 20,14'/%3E%3C/g%3E%3C/svg%3E\")", backgroundRepeat: 'repeat', pointerEvents: 'none' }} />
        <div style={{ position: 'relative' }}>
          <p style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(1rem,3vw,1.3rem)', color: 'var(--color-primary)', marginBottom: '0.4rem', marginTop: 0 }}>DMV Area</p>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem,5vw,3rem)', color: 'var(--color-white)', margin: '0 0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <Truck size={28} /> Delivery Info
          </h1>
          <EgyptianDivider color="var(--color-primary)" />
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
        {/* Quick stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
          {[
            { icon: Clock, label: 'Same-day delivery', sub: 'Order by 12 PM' },
            { icon: DollarSign, label: 'Free delivery', sub: 'Orders over $50' },
            { icon: MapPin, label: 'DC · MD · VA', sub: 'Full DMV coverage' },
            { icon: Phone, label: 'WhatsApp orders', sub: 'Always available' },
          ].map((item) => (
            <div key={item.label} style={{ backgroundColor: 'var(--color-white)', borderRadius: '12px', padding: '1.25rem', textAlign: 'center', boxShadow: '0 2px 12px rgba(44,24,16,0.06)' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(200,150,62,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem' }}>
                <item.icon size={20} color="var(--color-primary)" />
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.875rem', color: 'var(--color-secondary)', margin: '0 0 0.2rem' }}>{item.label}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--color-muted)', margin: 0 }}>{item.sub}</p>
            </div>
          ))}
        </div>

        {/* Delivery zones */}
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--color-secondary)', margin: '0 0 0.5rem', textAlign: 'center' }}>Delivery Zones</h2>
        <EgyptianDivider />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem', marginBottom: '3rem' }}>
          {ZONES.map((z) => (
            <div key={z.zone} style={{ backgroundColor: z.bg, border: `1.5px solid ${z.color}20`, borderRadius: '14px', padding: '1.5rem', borderLeft: `4px solid ${z.color}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1rem', color: z.color, margin: '0 0 0.25rem' }}>{z.zone}</h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--color-muted)', margin: 0 }}>
                    Estimated delivery: {z.eta} {z.minOrder > 0 && `· Min. order: $${z.minOrder}`}
                  </p>
                </div>
                <div style={{ padding: '0.35rem 0.875rem', borderRadius: '999px', backgroundColor: z.color, color: 'white', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.82rem', whiteSpace: 'nowrap' }}>
                  {z.fee === null ? 'Call us' : z.fee === 0 ? 'FREE' : `$${z.fee}`}
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {z.areas.map((area) => (
                  <span key={area} style={{ padding: '0.25rem 0.75rem', borderRadius: '999px', backgroundColor: 'rgba(255,255,255,0.7)', border: `1px solid ${z.color}30`, fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--color-secondary)' }}>
                    {area}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Delivery hours */}
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--color-secondary)', margin: '0 0 0.5rem', textAlign: 'center' }}>Delivery Hours</h2>
        <EgyptianDivider />
        <div style={{ marginTop: '2rem', marginBottom: '3rem', backgroundColor: 'var(--color-white)', borderRadius: '14px', padding: '1.5rem', boxShadow: '0 2px 12px rgba(44,24,16,0.06)' }}>
          {[
            { day: 'Monday – Saturday', hours: '9:00 AM – 8:00 PM' },
            { day: 'Sunday', hours: '10:00 AM – 6:00 PM' },
            { day: 'Holidays & Eid', hours: 'Special hours — check WhatsApp' },
          ].map((row, i, arr) => (
            <div key={row.day} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.875rem 0', borderBottom: i < arr.length - 1 ? '1px solid var(--color-bg-alt)' : 'none', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-secondary)' }}>{row.day}</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-primary)', fontWeight: 600 }}>{row.hours}</span>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--color-secondary)', margin: '0 0 0.5rem', textAlign: 'center' }}>Frequently Asked</h2>
        <EgyptianDivider />
        <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.875rem', marginBottom: '3rem' }}>
          {FAQS.map((faq) => (
            <div key={faq.q} style={{ backgroundColor: 'var(--color-white)', borderRadius: '12px', padding: '1.25rem', boxShadow: '0 2px 8px rgba(44,24,16,0.05)' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-secondary)', margin: '0 0 0.5rem' }}>{faq.q}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-muted)', margin: 0, lineHeight: 1.65 }}>{faq.a}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-script)', fontSize: '1.3rem', color: 'var(--color-primary)', marginBottom: '1.25rem', marginTop: 0 }}>Ready to order?</p>
          <div style={{ display: 'flex', gap: '0.875rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/menu" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 2rem', borderRadius: '10px', background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))', color: 'white', fontFamily: 'var(--font-body)', fontWeight: 700, textDecoration: 'none' }}>
              Browse Menu
            </Link>
            <a href={`https://wa.me/12025550000?text=${encodeURIComponent("Hi! I'd like to place an order.")}`} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 2rem', borderRadius: '10px', backgroundColor: '#25D366', color: 'white', fontFamily: 'var(--font-body)', fontWeight: 700, textDecoration: 'none' }}>
              Order on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
