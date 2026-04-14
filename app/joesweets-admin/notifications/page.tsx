import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import { Bell } from 'lucide-react';

export const metadata: Metadata = { title: 'Stock Notifications' };

interface StockNotification {
  email: string;
  productId: string;
  productName: string;
  createdAt: string;
}

function readNotifications(): StockNotification[] {
  const filePath = path.join(process.cwd(), 'data', 'stock-notifications.json');
  try {
    if (!fs.existsSync(filePath)) return [];
    return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as StockNotification[];
  } catch {
    return [];
  }
}

export default function NotificationsPage() {
  const notifications = readNotifications().reverse();

  // Group by product
  const byProduct = notifications.reduce<Record<string, { name: string; emails: string[] }>>((acc, n) => {
    if (!acc[n.productId]) acc[n.productId] = { name: n.productName, emails: [] };
    if (!acc[n.productId].emails.includes(n.email)) acc[n.productId].emails.push(n.email);
    return acc;
  }, {});

  const cardStyle: React.CSSProperties = {
    backgroundColor: 'var(--color-white)',
    borderRadius: '12px',
    padding: '1.25rem 1.5rem',
    boxShadow: '0 2px 12px rgba(44,24,16,0.06)',
    border: '1px solid #e8ddd4',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--color-secondary)', margin: 0 }}>
            Stock Notifications
          </h2>
          <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}>
            Customers waiting to be notified when products come back in stock
          </p>
        </div>
        <div style={{ padding: '0.625rem 1rem', backgroundColor: 'rgba(200,150,62,0.1)', borderRadius: '8px', border: '1px solid rgba(200,150,62,0.2)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Bell size={16} color="var(--color-primary)" />
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-secondary)' }}>
            {notifications.length} total sign-ups
          </span>
        </div>
      </div>

      {notifications.length === 0 ? (
        <div style={{ ...cardStyle, textAlign: 'center', padding: '3rem 1.5rem' }}>
          <Bell size={40} color="var(--color-muted)" style={{ opacity: 0.3 }} />
          <p style={{ margin: '0.75rem 0 0', fontFamily: 'var(--font-body)', color: 'var(--color-muted)', fontSize: '0.9rem' }}>
            No stock notification requests yet. They'll appear here when customers sign up.
          </p>
        </div>
      ) : (
        <>
          {/* Summary by product */}
          <div style={cardStyle}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: 'var(--color-secondary)', margin: '0 0 1rem' }}>
              By Product
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {Object.entries(byProduct).map(([productId, { name, emails }]) => (
                <div key={productId} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', borderRadius: '8px', backgroundColor: 'var(--color-bg)', border: '1px solid rgba(200,150,62,0.1)', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-secondary)' }}>{name}</p>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}>{productId}</p>
                  </div>
                  <div style={{ padding: '0.3rem 0.75rem', borderRadius: '100px', backgroundColor: 'rgba(200,150,62,0.15)', color: 'var(--color-secondary)', fontSize: '0.82rem', fontWeight: 700, fontFamily: 'var(--font-body)', flexShrink: 0 }}>
                    {emails.length} waiting
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Full list */}
          <div style={cardStyle}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: 'var(--color-secondary)', margin: '0 0 1rem' }}>
              All Sign-ups
            </h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-body)', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--color-bg)' }}>
                    {['Email', 'Product', 'Signed Up'].map((h) => (
                      <th key={h} style={{ padding: '0.625rem 0.875rem', textAlign: 'left', fontWeight: 600, color: 'var(--color-secondary)', borderBottom: '2px solid #e8ddd4', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {notifications.map((n, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #f0e8df' }}>
                      <td style={{ padding: '0.625rem 0.875rem', color: 'var(--color-secondary)' }}>{n.email}</td>
                      <td style={{ padding: '0.625rem 0.875rem', color: 'var(--color-secondary)' }}>{n.productName}</td>
                      <td style={{ padding: '0.625rem 0.875rem', color: 'var(--color-muted)', whiteSpace: 'nowrap' }}>
                        {new Date(n.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
