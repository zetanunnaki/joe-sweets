'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Save, Upload } from 'lucide-react';
import { Category } from '@/types';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/categories').then(r => r.json()).then(data => {
      setCategories(data);
      setLoading(false);
    });
  }, []);

  function updateCategory(id: string, field: keyof Category, value: string) {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c));
  }

  async function handleImageUpload(catId: string, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(catId);
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
    const data = await res.json();
    if (res.ok) updateCategory(catId, 'image', data.url);
    setUploading(null);
    e.target.value = '';
  }

  async function handleSave() {
    setSaving(true);
    await fetch('/api/admin/categories', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(categories),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.5rem 0.75rem', borderRadius: '8px',
    border: '2px solid #e2d9cf', backgroundColor: 'var(--color-white)',
    color: 'var(--color-secondary)', fontFamily: 'var(--font-body)',
    fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '0.72rem', fontWeight: 600, color: 'var(--color-muted)',
    fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.06em',
  };

  if (loading) return <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-muted)' }}>Loading…</p>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '800px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--color-secondary)', margin: 0 }}>Categories</h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--color-muted)', margin: 0 }}>Edit category names, descriptions and images</p>
        </div>
        <button onClick={handleSave} disabled={saving} style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.625rem 1.25rem', backgroundColor: saved ? '#22c55e' : 'var(--color-primary)',
          color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer',
          fontWeight: 600, fontSize: '0.875rem', fontFamily: 'var(--font-body)', transition: 'background 300ms',
        }}>
          <Save size={15} /> {saved ? 'Saved!' : saving ? 'Saving…' : 'Save All'}
        </button>
      </div>

      {categories.map(cat => (
        <div key={cat.id} style={{ backgroundColor: 'var(--color-white)', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 12px rgba(44,24,16,0.06)', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          {/* Image */}
          <div style={{ flexShrink: 0 }}>
            <div style={{ position: 'relative', width: '120px', height: '90px', borderRadius: '8px', overflow: 'hidden', border: '2px solid #e2d9cf', marginBottom: '0.5rem' }}>
              <Image src={cat.image} alt={cat.name} fill style={{ objectFit: 'cover' }} sizes="120px" />
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', cursor: 'pointer', fontSize: '0.78rem', color: 'var(--color-primary)', fontWeight: 600, fontFamily: 'var(--font-body)' }}>
              <Upload size={13} /> {uploading === cat.id ? 'Uploading…' : 'Change'}
              <input type="file" accept="image/*" onChange={e => handleImageUpload(cat.id, e)} style={{ display: 'none' }} disabled={uploading === cat.id} />
            </label>
            <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label style={labelStyle}>Image URL</label>
              <input style={{ ...inputStyle, width: '120px', fontSize: '0.72rem' }} value={cat.image} onChange={e => updateCategory(cat.id, 'image', e.target.value)} />
            </div>
          </div>

          {/* Fields */}
          <div style={{ flex: 1, minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: '999px', backgroundColor: 'rgba(200,150,62,0.12)', color: 'var(--color-primary)', fontFamily: 'var(--font-body)', textTransform: 'uppercase' }}>{cat.id}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <label style={labelStyle}>Name (English)</label>
              <input style={inputStyle} value={cat.name} onChange={e => updateCategory(cat.id, 'name', e.target.value)} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <label style={labelStyle}>Name (Arabic)</label>
              <input style={inputStyle} value={cat.nameAr} onChange={e => updateCategory(cat.id, 'nameAr', e.target.value)} dir="rtl" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <label style={labelStyle}>Description</label>
              <input style={inputStyle} value={cat.description} onChange={e => updateCategory(cat.id, 'description', e.target.value)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
