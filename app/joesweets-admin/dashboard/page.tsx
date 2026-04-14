import { getAllProducts } from '@/lib/products';
import ordersData from '@/data/orders.json';
import subscribersData from '@/data/subscribers.json';
import inquiriesData from '@/data/inquiries.json';
import { Order, Subscriber, Inquiry } from '@/types';
import { TrendingUp, AlertCircle, BarChart2 } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import StatCard, { StatIconName } from './StatCard';

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export const metadata: Metadata = { title: 'Dashboard' };

export default function DashboardPage() {
  const products = getAllProducts();
  const orders = ordersData as Order[];
  const subscribers = subscribersData as Subscriber[];
  const inquiries = inquiriesData as Inquiry[];

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const outOfStock = products.filter(p => !p.inStock).length;
  const recentOrders = [...orders].reverse().slice(0, 5);

  // Monthly revenue for the current year
  const now = new Date();
  const currentYear = now.getFullYear();
  const monthlyRevenue: number[] = Array(12).fill(0);
  orders.forEach((o) => {
    const d = new Date(o.createdAt);
    if (d.getFullYear() === currentYear) {
      monthlyRevenue[d.getMonth()] += o.total;
    }
  });
  const maxMonthly = Math.max(...monthlyRevenue, 1);
  const chartW = 540, chartH = 120, barW = 34, gap = 10;
  const totalBarsW = 12 * (barW + gap) - gap;
  const offsetX = (chartW - totalBarsW) / 2;

  const stats: { label: string; value: number; iconName: StatIconName; href: string; color: string }[] = [
    { label: 'Total Products', value: products.length, iconName: 'Package', href: '/joesweets-admin/products', color: 'var(--color-primary)' },
    { label: 'Total Orders', value: orders.length, iconName: 'ShoppingBag', href: '/joesweets-admin/orders', color: '#6366f1' },
    { label: 'Subscribers', value: subscribers.length, iconName: 'Users', href: '/joesweets-admin/subscribers', color: '#22c55e' },
    { label: 'Inquiries', value: inquiries.length, iconName: 'MessageSquare', href: '/joesweets-admin/subscribers', color: '#f59e0b' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Welcome */}
      <div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--color-secondary)', margin: '0 0 0.25rem' }}>Welcome back 👋</h2>
        <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-muted)', margin: 0, fontSize: '0.9rem' }}>Here&apos;s what&apos;s happening with Joe Sweets today.</p>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
        {stats.map(({ label, value, iconName, href, color }) => (
          <StatCard key={label} label={label} value={value} iconName={iconName} href={href} color={color} />
        ))}
      </div>

      {/* Revenue + alerts row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
        <div style={{ backgroundColor: 'var(--color-white)', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 12px rgba(44,24,16,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <TrendingUp size={18} color="var(--color-primary)" />
            <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-muted)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Revenue</h3>
          </div>
          <p style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--color-primary)', margin: 0, fontWeight: 700 }}>
            ${totalRevenue.toFixed(2)}
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--color-muted)', margin: '0.25rem 0 0' }}>from {orders.length} orders</p>
        </div>

        {outOfStock > 0 && (
          <div style={{ backgroundColor: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '12px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <AlertCircle size={18} color="#f97316" />
              <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 600, color: '#c2410c', margin: 0 }}>Stock Alert</h3>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#7c2d12', margin: '0 0 0.75rem' }}>
              {outOfStock} product{outOfStock > 1 ? 's' : ''} out of stock
            </p>
            <Link href="/joesweets-admin/products" style={{ fontSize: '0.82rem', color: '#f97316', fontWeight: 600, textDecoration: 'none' }}>View products →</Link>
          </div>
        )}
      </div>

      {/* Monthly revenue chart */}
      <div style={{ backgroundColor: 'var(--color-white)', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 12px rgba(44,24,16,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <BarChart2 size={18} color="var(--color-primary)" />
          <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-muted)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Monthly Revenue {currentYear}
          </h3>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <svg width={chartW} height={chartH + 32} style={{ display: 'block', minWidth: '320px' }}>
            <defs>
              <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C8963E" />
                <stop offset="100%" stopColor="#A67A2E" />
              </linearGradient>
            </defs>
            {monthlyRevenue.map((rev, i) => {
              const barH = rev > 0 ? Math.max(4, (rev / maxMonthly) * chartH) : 2;
              const x = offsetX + i * (barW + gap);
              const y = chartH - barH;
              const isCurrentMonth = i === now.getMonth();
              return (
                <g key={i}>
                  <rect
                    x={x} y={y} width={barW} height={barH}
                    rx={4} ry={4}
                    fill={rev > 0 ? 'url(#barGrad)' : '#F5EDE0'}
                    opacity={isCurrentMonth ? 1 : 0.65}
                  />
                  {isCurrentMonth && (
                    <rect x={x} y={0} width={barW} height={chartH} rx={4} ry={4} fill="rgba(200,150,62,0.06)" />
                  )}
                  {rev > 0 && (
                    <text
                      x={x + barW / 2} y={y - 4}
                      textAnchor="middle"
                      fontSize="9" fill="#8C7A6B" fontFamily="Inter,sans-serif"
                    >
                      ${rev >= 1000 ? `${(rev / 1000).toFixed(1)}k` : rev.toFixed(0)}
                    </text>
                  )}
                  <text
                    x={x + barW / 2} y={chartH + 16}
                    textAnchor="middle"
                    fontSize="10"
                    fill={isCurrentMonth ? '#C8963E' : '#8C7A6B'}
                    fontWeight={isCurrentMonth ? 700 : 400}
                    fontFamily="Inter,sans-serif"
                  >
                    {MONTHS[i]}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Recent orders */}
      <div style={{ backgroundColor: 'var(--color-white)', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 12px rgba(44,24,16,0.06)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: 'var(--color-secondary)', margin: 0 }}>Recent Orders</h3>
          <Link href="/joesweets-admin/orders" style={{ fontSize: '0.82rem', color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}>View all →</Link>
        </div>
        {recentOrders.length === 0 ? (
          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-muted)', fontSize: '0.875rem', margin: 0, textAlign: 'center', padding: '2rem 0' }}>No orders yet.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {recentOrders.map((order, i) => (
              <div key={order.id} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '0.875rem 0',
                borderBottom: i < recentOrders.length - 1 ? '1px solid var(--color-bg-alt)' : 'none',
              }}>
                <div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-secondary)', margin: 0 }}>{order.id}</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--color-muted)', margin: 0 }}>{order.customer.name} · {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-primary)', margin: 0 }}>${order.total.toFixed(2)}</p>
                  <span style={{
                    fontSize: '0.72rem', fontWeight: 600, padding: '0.15rem 0.5rem', borderRadius: '999px',
                    backgroundColor: order.status === 'confirmed' ? '#dcfce7' : '#fef9c3',
                    color: order.status === 'confirmed' ? '#15803d' : '#854d0e',
                  }}>{order.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
