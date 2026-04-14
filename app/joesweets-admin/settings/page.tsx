'use client';

import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { SiteConfig } from '@/types';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteConfig | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/admin/settings').then(r => r.json()).then(setSettings);
  }, []);

  function update<K extends keyof SiteConfig>(key: K, value: SiteConfig[K]) {
    setSettings(prev => prev ? { ...prev, [key]: value } : prev);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.625rem 0.875rem', borderRadius: '8px',
    border: '2px solid #e2d9cf', backgroundColor: 'var(--color-white)',
    color: 'var(--color-secondary)', fontFamily: 'var(--font-body)',
    fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-muted)',
    fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.06em',
  };

  const sectionStyle: React.CSSProperties = {
    backgroundColor: 'var(--color-white)', borderRadius: '12px',
    padding: '1.5rem', boxShadow: '0 2px 12px rgba(44,24,16,0.06)',
    display: 'flex', flexDirection: 'column', gap: '1rem',
  };

  const field = (label: string, key: keyof SiteConfig, type = 'text') => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
      <label style={labelStyle}>{label}</label>
      <input
        style={inputStyle}
        type={type}
        value={settings ? String(settings[key] ?? '') : ''}
        onChange={e => {
          if (!settings) return;
          const val = type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value;
          update(key, val as SiteConfig[typeof key]);
        }}
      />
    </div>
  );

  if (!settings) return <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-muted)' }}>Loading…</p>;

  return (
    <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '680px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--color-secondary)', margin: 0 }}>Site Settings</h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--color-muted)', margin: 0 }}>Global configuration for Joe Sweets</p>
        </div>
        <button type="submit" disabled={saving} style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.625rem 1.25rem', backgroundColor: saved ? '#22c55e' : 'var(--color-primary)',
          color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer',
          fontWeight: 600, fontSize: '0.875rem', fontFamily: 'var(--font-body)', transition: 'background 300ms',
        }}>
          <Save size={15} /> {saved ? 'Saved!' : saving ? 'Saving…' : 'Save Changes'}
        </button>
      </div>

      <div style={sectionStyle}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: 'var(--color-secondary)', margin: 0 }}>Brand</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {field('Business Name', 'name')}
          {field('Tagline', 'tagline')}
        </div>
        {field('Description', 'description')}
      </div>

      <div style={sectionStyle}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: 'var(--color-secondary)', margin: 0 }}>Contact</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {field('Phone', 'phone', 'tel')}
          {field('Email', 'email', 'email')}
        </div>
        {field('Address / Area', 'address')}
        {field('Instagram URL', 'instagram')}
        {field('Business Hours', 'businessHours')}
      </div>

      <div style={sectionStyle}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: 'var(--color-secondary)', margin: 0 }}>Delivery</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {field('Delivery Fee (USD)', 'deliveryFee', 'number')}
          {field('Free Delivery Above (USD)', 'freeDeliveryMin', 'number')}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
          <label style={labelStyle}>Delivery Zones (comma-separated)</label>
          <input
            style={inputStyle}
            value={settings.deliveryZones.join(', ')}
            onChange={e => update('deliveryZones', e.target.value.split(',').map(z => z.trim()).filter(Boolean))}
          />
        </div>
      </div>
    </form>
  );
}
