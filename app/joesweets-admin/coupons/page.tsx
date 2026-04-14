'use client';

import { useState } from 'react';
import { Plus, Copy, Check, Tag, Trash2 } from 'lucide-react';

interface Coupon {
  code: string;
  type: 'pct' | 'fixed';
  value: number;
  label: string;
  active: boolean;
  uses: number;
}

const INITIAL_COUPONS: Coupon[] = [
  { code: 'WELCOME10', type: 'pct', value: 10, label: '10% off your order', active: true, uses: 34 },
  { code: 'JOESWEETS15', type: 'pct', value: 15, label: '15% off your order', active: true, uses: 12 },
  { code: 'FREESHIP', type: 'fixed', value: 5, label: 'Free delivery', active: true, uses: 58 },
  { code: 'EID2026', type: 'pct', value: 20, label: '20% Eid special', active: false, uses: 7 },
];

export default function CouponsAdminPage() {
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [copiedCode, setCopiedCode] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ code: '', type: 'pct' as 'pct' | 'fixed', value: 10, label: '' });

  function copyCode(code: string) {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 1800);
  }

  function toggleActive(code: string) {
    setCoupons((prev) => prev.map((c) => c.code === code ? { ...c, active: !c.active } : c));
  }

  function remove(code: string) {
    setCoupons((prev) => prev.filter((c) => c.code !== code));
  }

  function addCoupon() {
    if (!form.code.trim() || !form.label.trim()) return;
    setCoupons((prev) => [...prev, { ...form, code: form.code.toUpperCase().trim(), active: true, uses: 0 }]);
    setForm({ code: '', type: 'pct', value: 10, label: '' });
    setShowForm(false);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--color-secondary)', margin: '0 0 0.25rem' }}>Coupon Codes</h2>
          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-muted)', margin: 0, fontSize: '0.875rem' }}>
            Manage promo codes and discounts. Changes apply to the live store immediately.
          </p>
        </div>
        <button
          onClick={() => setShowForm((p) => !p)}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.375rem',
            padding: '0.625rem 1.25rem', borderRadius: '8px',
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
            border: 'none', color: 'white', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem',
            cursor: 'pointer',
          }}
        >
          <Plus size={15} /> New Coupon
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <div style={{ backgroundColor: 'var(--color-white)', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 12px rgba(44,24,16,0.06)', border: '1.5px solid rgba(200,150,62,0.2)' }}>
          <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-secondary)', margin: '0 0 1rem' }}>New Coupon</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.875rem' }}>
            <div>
              <label style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.375rem' }}>Code</label>
              <input
                type="text"
                value={form.code}
                onChange={(e) => setForm((p) => ({ ...p, code: e.target.value.toUpperCase() }))}
                placeholder="SAVE20"
                style={{ width: '100%', padding: '0.6rem 0.875rem', borderRadius: '8px', border: '1.5px solid #e2d9cf', fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-secondary)', outline: 'none', boxSizing: 'border-box', letterSpacing: '0.05em' }}
              />
            </div>
            <div>
              <label style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.375rem' }}>Type</label>
              <select
                value={form.type}
                onChange={(e) => setForm((p) => ({ ...p, type: e.target.value as 'pct' | 'fixed' }))}
                style={{ width: '100%', padding: '0.6rem 0.875rem', borderRadius: '8px', border: '1.5px solid #e2d9cf', fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-secondary)', outline: 'none', cursor: 'pointer', boxSizing: 'border-box' }}
              >
                <option value="pct">Percentage off</option>
                <option value="fixed">Fixed $ off</option>
              </select>
            </div>
            <div>
              <label style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.375rem' }}>Value</label>
              <input
                type="number"
                value={form.value}
                onChange={(e) => setForm((p) => ({ ...p, value: Number(e.target.value) }))}
                min={1}
                max={form.type === 'pct' ? 100 : 999}
                style={{ width: '100%', padding: '0.6rem 0.875rem', borderRadius: '8px', border: '1.5px solid #e2d9cf', fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-secondary)', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.375rem' }}>Label</label>
              <input
                type="text"
                value={form.label}
                onChange={(e) => setForm((p) => ({ ...p, label: e.target.value }))}
                placeholder="20% off your order"
                style={{ width: '100%', padding: '0.6rem 0.875rem', borderRadius: '8px', border: '1.5px solid #e2d9cf', fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-secondary)', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
            <button onClick={addCoupon} style={{ padding: '0.6rem 1.25rem', borderRadius: '8px', background: 'var(--color-secondary)', border: 'none', color: 'white', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer' }}>
              Add Coupon
            </button>
            <button onClick={() => setShowForm(false)} style={{ padding: '0.6rem 1rem', borderRadius: '8px', border: '1.5px solid #e2d9cf', background: 'transparent', fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-muted)', cursor: 'pointer' }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Coupons list */}
      <div style={{ backgroundColor: 'var(--color-white)', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 12px rgba(44,24,16,0.06)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {coupons.map((c, i) => (
            <div key={c.code} style={{
              display: 'flex', alignItems: 'center', gap: '0.875rem', flexWrap: 'wrap',
              padding: '1rem 0',
              borderBottom: i < coupons.length - 1 ? '1px solid var(--color-bg-alt)' : 'none',
            }}>
              {/* Badge */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.375rem',
                padding: '0.35rem 0.875rem', borderRadius: '8px',
                backgroundColor: 'var(--color-bg-alt)',
                border: '1px dashed rgba(200,150,62,0.4)',
                flexShrink: 0,
              }}>
                <Tag size={12} color="var(--color-primary)" />
                <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.875rem', color: 'var(--color-secondary)', letterSpacing: '0.06em' }}>{c.code}</span>
              </div>

              {/* Details */}
              <div style={{ flex: 1, minWidth: '120px' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-secondary)', margin: 0, fontWeight: 500 }}>{c.label}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--color-muted)', margin: 0 }}>
                  {c.type === 'pct' ? `${c.value}% discount` : `$${c.value} off`} · {c.uses} uses
                </p>
              </div>

              {/* Active toggle */}
              <button
                onClick={() => toggleActive(c.code)}
                style={{
                  padding: '0.3rem 0.875rem', borderRadius: '999px',
                  border: `1.5px solid ${c.active ? '#bbf7d0' : '#e2d9cf'}`,
                  backgroundColor: c.active ? '#f0fdf4' : 'transparent',
                  color: c.active ? '#15803d' : 'var(--color-muted)',
                  fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600,
                  cursor: 'pointer', transition: 'all 200ms',
                }}
              >
                {c.active ? 'Active' : 'Inactive'}
              </button>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '0.375rem' }}>
                <button
                  onClick={() => copyCode(c.code)}
                  title="Copy code"
                  style={{ width: '30px', height: '30px', borderRadius: '6px', border: '1.5px solid #e2d9cf', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-muted)' }}
                >
                  {copiedCode === c.code ? <Check size={13} color="#15803d" /> : <Copy size={13} />}
                </button>
                <button
                  onClick={() => remove(c.code)}
                  title="Delete coupon"
                  style={{ width: '30px', height: '30px', borderRadius: '6px', border: '1.5px solid #fecaca', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D44D4D' }}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--color-muted)', margin: 0 }}>
        Note: Changes here are UI-only. In production, update <code>app/cart/page.tsx</code> PROMO_CODES to persist.
      </p>
    </div>
  );
}
