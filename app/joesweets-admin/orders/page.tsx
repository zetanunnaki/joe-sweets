import ordersData from '@/data/orders.json';
import { Order } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { getAllProducts } from '@/lib/products';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Orders' };

export default function AdminOrdersPage() {
  const orders = ([...ordersData] as Order[]).reverse();
  const products = getAllProducts();

  function getProductName(productId: string, variantId: string): string {
    const p = products.find((p) => p.id === productId || p.slug === productId);
    if (!p) return productId;
    const v = p.variants.find((v) => v.id === variantId);
    return v ? `${p.name} — ${v.label}` : p.name;
  }

  const statusColor: Record<string, { bg: string; color: string }> = {
    confirmed:  { bg: '#dcfce7', color: '#15803d' },
    preparing:  { bg: '#fef9c3', color: '#854d0e' },
    delivered:  { bg: '#e0f2fe', color: '#075985' },
    cancelled:  { bg: '#fee2e2', color: '#991b1b' },
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--color-secondary)', margin: 0 }}>Orders</h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--color-muted)', margin: 0 }}>{orders.length} total orders</p>
      </div>

      {orders.length === 0 ? (
        <div style={{ backgroundColor: 'var(--color-white)', borderRadius: '12px', padding: '3rem', textAlign: 'center', color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}>
          No orders yet.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {orders.map(order => {
            const sc = statusColor[order.status] ?? { bg: '#f3f4f6', color: '#374151' };
            return (
              <div key={order.id} style={{ backgroundColor: 'var(--color-white)', borderRadius: '12px', padding: '1.25rem 1.5rem', boxShadow: '0 2px 12px rgba(44,24,16,0.06)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.875rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, color: 'var(--color-secondary)', fontSize: '0.95rem' }}>{order.id}</span>
                      <span style={{ fontSize: '0.72rem', fontWeight: 600, padding: '0.15rem 0.6rem', borderRadius: '999px', backgroundColor: sc.bg, color: sc.color }}>
                        {order.status}
                      </span>
                    </div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--color-muted)', margin: '0.2rem 0 0' }}>
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                    {formatCurrency(order.total)}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', paddingTop: '0.875rem', borderTop: '1px solid var(--color-bg-alt)' }}>
                  <div>
                    <p style={{ fontSize: '0.72rem', color: 'var(--color-muted)', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.25rem' }}>Customer</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, color: 'var(--color-secondary)', fontSize: '0.875rem', margin: 0 }}>{order.customer.name}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--color-muted)', margin: 0 }}>{order.customer.email}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
                      <a href={`tel:${order.customer.phone}`} style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 600 }}>{order.customer.phone}</a>
                      <a href={`https://wa.me/${order.customer.phone.replace(/\D/g, '')}?text=Hi%20${encodeURIComponent(order.customer.name.split(' ')[0])}!%20Your%20Joe%20Sweets%20order%20${order.id}%20is%20confirmed.`} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.72rem', backgroundColor: '#25D366', color: 'white', padding: '0.1rem 0.45rem', borderRadius: '4px', textDecoration: 'none', fontWeight: 600 }}>WA</a>
                    </div>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.72rem', color: 'var(--color-muted)', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.25rem' }}>Delivery</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--color-secondary)', margin: 0 }}>{order.customer.address}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--color-secondary)', margin: 0 }}>{order.customer.city}, {order.customer.state} {order.customer.zip}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--color-primary)', fontWeight: 600, margin: 0 }}>📅 {order.customer.deliveryDate}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.72rem', color: 'var(--color-muted)', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.25rem' }}>Items</p>
                    {order.items.map((item, i) => (
                      <p key={i} style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--color-secondary)', margin: '0 0 0.15rem' }}>
                        ×{item.qty} {getProductName(item.productId, item.variantId)}
                      </p>
                    ))}
                  </div>
                </div>

                {order.customer.specialInstructions && (
                  <div style={{ marginTop: '0.75rem', padding: '0.625rem', backgroundColor: 'var(--color-bg-alt)', borderRadius: '6px' }}>
                    <p style={{ fontSize: '0.78rem', color: 'var(--color-muted)', fontFamily: 'var(--font-body)', margin: 0 }}>
                      📝 {order.customer.specialInstructions}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
