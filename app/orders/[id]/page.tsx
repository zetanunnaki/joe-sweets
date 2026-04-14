import { getOrders } from '@/lib/orders';
import { getAllProducts } from '@/lib/products';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, Clock, Package, Truck, XCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return { title: `Order ${id}` };
}

const STATUS_CONFIG = {
  confirmed: { icon: CheckCircle, label: 'Order Confirmed', color: '#15803d', bg: '#dcfce7', desc: 'Your order has been received and confirmed. We\'ll start preparing it soon.' },
  preparing: { icon: Package, label: 'Preparing Your Order', color: '#854d0e', bg: '#fef9c3', desc: 'Our kitchen is carefully preparing your fresh Egyptian treats.' },
  delivered: { icon: Truck, label: 'Delivered!', color: '#075985', bg: '#e0f2fe', desc: 'Your order has been delivered. Enjoy your treats!' },
  cancelled: { icon: XCircle, label: 'Order Cancelled', color: '#991b1b', bg: '#fee2e2', desc: 'This order has been cancelled. Contact us if you have questions.' },
};

const TIMELINE = [
  { key: 'confirmed', label: 'Confirmed' },
  { key: 'preparing', label: 'Preparing' },
  { key: 'delivered', label: 'Delivered' },
] as const;

export default async function OrderTrackingPage({ params }: Props) {
  const { id } = await params;
  const orders = getOrders();
  const order = orders.find((o) => o.id === id);
  if (!order) notFound();

  const products = getAllProducts();
  function getProductInfo(productId: string, variantId: string) {
    const p = products.find((p) => p.id === productId || p.slug === productId);
    if (!p) return { name: productId, image: null, variantLabel: variantId };
    const v = p.variants.find((v) => v.id === variantId);
    return { name: p.name, image: p.images[0], variantLabel: v?.label ?? variantId };
  }

  const statusConfig = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.confirmed;
  const StatusIcon = statusConfig.icon;

  const activeStep = TIMELINE.findIndex((s) => s.key === order.status);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)', padding: '2.5rem 1.5rem 5rem' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.85rem', color: 'var(--color-muted)', fontFamily: 'var(--font-body)', textDecoration: 'none', marginBottom: '1rem' }}>
            ← Back to Home
          </Link>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 4vw, 2rem)', color: 'var(--color-secondary)', margin: '0 0 0.25rem' }}>
            Order Tracking
          </h1>
          <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--color-muted)' }}>
            Order <strong style={{ color: 'var(--color-secondary)' }}>{order.id}</strong> · Placed {new Date(order.createdAt).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {/* Status card */}
        <div style={{ backgroundColor: statusConfig.bg, border: `1px solid ${statusConfig.color}30`, borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
          <StatusIcon size={32} color={statusConfig.color} style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <p style={{ margin: '0 0 0.25rem', fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 700, color: statusConfig.color }}>{statusConfig.label}</p>
            <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: statusConfig.color, opacity: 0.85 }}>{statusConfig.desc}</p>
          </div>
        </div>

        {/* Timeline (only for non-cancelled) */}
        {order.status !== 'cancelled' && (
          <div style={{ backgroundColor: 'var(--color-white)', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 4px 24px rgba(44,24,16,0.07)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 0, position: 'relative' }}>
              {TIMELINE.map((step, i) => {
                const done = i <= activeStep;
                const isCurrent = i === activeStep;
                return (
                  <div key={step.key} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                    {/* Line before (except first) */}
                    {i > 0 && (
                      <div style={{
                        position: 'absolute', top: '16px', right: '50%', width: '100%', height: '2px',
                        backgroundColor: done && i <= activeStep ? 'var(--color-primary)' : '#e2d9cf',
                        zIndex: 0,
                      }} />
                    )}
                    {/* Circle */}
                    <div style={{
                      width: '32px', height: '32px', borderRadius: '50%', zIndex: 1,
                      backgroundColor: done ? 'var(--color-primary)' : '#e2d9cf',
                      border: isCurrent ? '3px solid var(--color-primary)' : done ? 'none' : '2px solid #e2d9cf',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: isCurrent ? '0 0 0 4px rgba(200,150,62,0.2)' : 'none',
                    }}>
                      {done && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
                    </div>
                    <p style={{ margin: '0.5rem 0 0', fontSize: '0.75rem', fontWeight: isCurrent ? 700 : 500, color: done ? 'var(--color-secondary)' : 'var(--color-muted)', fontFamily: 'var(--font-body)', textAlign: 'center' }}>
                      {step.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Delivery info */}
        <div style={{ backgroundColor: 'var(--color-white)', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 4px 24px rgba(44,24,16,0.07)' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: 'var(--color-secondary)', margin: '0 0 1rem' }}>Delivery Details</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div>
              <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}>Name</p>
              <p style={{ margin: '0.2rem 0 0', fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--color-secondary)' }}>{order.customer.name}</p>
            </div>
            <div>
              <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}>Delivery Date</p>
              <p style={{ margin: '0.2rem 0 0', fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--color-secondary)' }}>
                {new Date(order.customer.deliveryDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}>Address</p>
              <p style={{ margin: '0.2rem 0 0', fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--color-secondary)' }}>
                {order.customer.address}, {order.customer.city}, {order.customer.state} {order.customer.zip}
              </p>
            </div>
            {order.customer.specialInstructions && (
              <div style={{ gridColumn: '1 / -1' }}>
                <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}>Instructions</p>
                <p style={{ margin: '0.2rem 0 0', fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--color-secondary)' }}>{order.customer.specialInstructions}</p>
              </div>
            )}
          </div>
        </div>

        {/* Items */}
        <div style={{ backgroundColor: 'var(--color-white)', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 4px 24px rgba(44,24,16,0.07)' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: 'var(--color-secondary)', margin: '0 0 1rem' }}>Order Items</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {order.items.map((item, i) => {
              const info = getProductInfo(item.productId, item.variantId);
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '0.75rem', borderRadius: '8px', backgroundColor: 'var(--color-bg)' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, backgroundColor: 'var(--color-bg-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {info.image ? (
                      <img src={info.image} alt={info.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <Package size={20} color="var(--color-muted)" />
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.88rem', color: 'var(--color-secondary)' }}>{info.name}</p>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}>{info.variantLabel} · Qty {item.qty}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(200,150,62,0.12)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, color: 'var(--color-secondary)', fontSize: '0.95rem' }}>Total</span>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary)' }}>{formatCurrency(order.total)}</span>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link href="/menu" style={{ flex: 1, minWidth: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.875rem', borderRadius: '8px', background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))', color: 'white', fontFamily: 'var(--font-body)', fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem' }}>
            Order Again
          </Link>
          <a href={`https://wa.me/12025550000?text=Hi%20Joe%20Sweets!%20I%20have%20a%20question%20about%20order%20${order.id}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, minWidth: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.875rem', borderRadius: '8px', backgroundColor: '#25D366', color: 'white', fontFamily: 'var(--font-body)', fontWeight: 600, textDecoration: 'none', fontSize: '0.9rem' }}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
