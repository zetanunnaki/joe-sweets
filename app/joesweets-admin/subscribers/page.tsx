'use client';

import { useState } from 'react';
import subscribersData from '@/data/subscribers.json';
import inquiriesData from '@/data/inquiries.json';
import { Subscriber, Inquiry } from '@/types';
import { Mail, MessageSquare, Download } from 'lucide-react';

const subscribers = subscribersData as Subscriber[];
const inquiries = ([...inquiriesData] as Inquiry[]).reverse();

export default function AdminSubscribersPage() {
  const [tab, setTab] = useState<'subscribers' | 'inquiries'>('subscribers');

  function downloadCSV() {
    const rows = [['Email', 'Subscribed At'], ...subscribers.map(s => [s.email, s.subscribedAt])];
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'subscribers.csv'; a.click();
    URL.revokeObjectURL(url);
  }

  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: '0.625rem 1.25rem', border: 'none', cursor: 'pointer',
    fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: active ? 600 : 400,
    borderBottom: active ? '2px solid var(--color-primary)' : '2px solid transparent',
    backgroundColor: 'transparent',
    color: active ? 'var(--color-primary)' : 'var(--color-muted)',
    transition: 'all 150ms',
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--color-secondary)', margin: 0 }}>Subscribers &amp; Inquiries</h2>
        {tab === 'subscribers' && subscribers.length > 0 && (
          <button onClick={downloadCSV} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.5rem 1rem', backgroundColor: 'var(--color-bg-alt)', color: 'var(--color-secondary)', border: 'none', borderRadius: '8px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 600 }}>
            <Download size={14} /> Export CSV
          </button>
        )}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--color-bg-alt)' }}>
        <button onClick={() => setTab('subscribers')} style={tabStyle(tab === 'subscribers')}>
          <Mail size={14} style={{ display: 'inline', marginRight: '0.375rem', verticalAlign: 'middle' }} />
          Subscribers ({subscribers.length})
        </button>
        <button onClick={() => setTab('inquiries')} style={tabStyle(tab === 'inquiries')}>
          <MessageSquare size={14} style={{ display: 'inline', marginRight: '0.375rem', verticalAlign: 'middle' }} />
          Inquiries ({inquiries.length})
        </button>
      </div>

      {/* Subscribers tab */}
      {tab === 'subscribers' && (
        <div style={{ backgroundColor: 'var(--color-white)', borderRadius: '12px', boxShadow: '0 2px 12px rgba(44,24,16,0.06)', overflow: 'hidden' }}>
          {subscribers.length === 0 ? (
            <p style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}>No subscribers yet.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-bg-alt)' }}>
                  {['#', 'Email', 'Subscribed'].map(h => (
                    <th key={h} style={{ padding: '0.875rem 1rem', textAlign: 'left', fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...subscribers].reverse().map((s, i) => (
                  <tr key={s.email} style={{ borderBottom: i < subscribers.length - 1 ? '1px solid var(--color-bg-alt)' : 'none' }}>
                    <td style={{ padding: '0.75rem 1rem', fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--color-muted)' }}>{subscribers.length - i}</td>
                    <td style={{ padding: '0.75rem 1rem', fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-secondary)', fontWeight: 500 }}>{s.email}</td>
                    <td style={{ padding: '0.75rem 1rem', fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--color-muted)' }}>{new Date(s.subscribedAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Inquiries tab */}
      {tab === 'inquiries' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {inquiries.length === 0 ? (
            <div style={{ backgroundColor: 'var(--color-white)', borderRadius: '12px', padding: '3rem', textAlign: 'center', color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}>No inquiries yet.</div>
          ) : inquiries.map(inq => (
            <div key={inq.id} style={{ backgroundColor: 'var(--color-white)', borderRadius: '12px', padding: '1.25rem 1.5rem', boxShadow: '0 2px 12px rgba(44,24,16,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <p style={{ fontFamily: 'var(--font-body)', fontWeight: 700, color: 'var(--color-secondary)', margin: 0, fontSize: '0.9rem' }}>{inq.name}</p>
                  <a href={`mailto:${inq.email}`} style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--color-primary)', textDecoration: 'none' }}>{inq.email}</a>
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--color-muted)', margin: 0 }}>{new Date(inq.createdAt).toLocaleString()}</p>
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-secondary)', margin: '0 0 0.5rem' }}>{inq.subject}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-secondary)', lineHeight: 1.6, margin: 0, opacity: 0.8 }}>{inq.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
