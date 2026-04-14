'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Plus, Trash2, Upload } from 'lucide-react';
import { Product, ProductVariant } from '@/types';

interface ProductFormProps {
  initial?: Product;
  mode: 'create' | 'edit';
}

const CATEGORIES = ['sweets', 'foods', 'drinks', 'boxes'];
const EMPTY_PRODUCT: Omit<Product, 'id'> = {
  slug: '', name: '', nameAr: '', category: 'sweets', description: '',
  price: 0, compareAtPrice: undefined, currency: 'USD',
  images: [], variants: [{ id: 'v1', label: 'Standard', price: 0 }],
  tags: [], inStock: true, featured: false, rating: 5, reviewCount: 0,
};

export function ProductForm({ initial, mode }: ProductFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<Omit<Product, 'id'>>(initial ?? EMPTY_PRODUCT);
  const [productId, setProductId] = useState(initial?.id ?? '');
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  function update<K extends keyof typeof form>(key: K, value: typeof form[K]) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  function updateVariant(idx: number, field: keyof ProductVariant, value: string | number) {
    const variants = [...form.variants];
    variants[idx] = { ...variants[idx], [field]: value };
    update('variants', variants);
  }

  function addVariant() {
    update('variants', [...form.variants, { id: `v${Date.now()}`, label: '', price: 0 }]);
  }

  function removeVariant(idx: number) {
    update('variants', form.variants.filter((_, i) => i !== idx));
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
    const data = await res.json();
    if (res.ok) {
      update('images', [...form.images, data.url]);
    } else {
      setError(data.error ?? 'Upload failed');
    }
    setUploading(false);
    e.target.value = '';
  }

  function removeImage(idx: number) {
    update('images', form.images.filter((_, i) => i !== idx));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');

    const payload = mode === 'create' ? { ...form, id: productId } : form;

    const res = await fetch(
      mode === 'create' ? '/api/admin/products' : `/api/admin/products/${initial!.id}`,
      {
        method: mode === 'create' ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );

    if (res.ok) {
      router.push('/joesweets-admin/products');
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error ?? 'Save failed');
      setSaving(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.625rem 0.875rem', borderRadius: '8px',
    border: '2px solid #e2d9cf', backgroundColor: 'var(--color-white)',
    color: 'var(--color-secondary)', fontFamily: 'var(--font-body)',
    fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    fontWeight: 600, fontSize: '0.8rem', color: 'var(--color-muted)',
    fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.06em',
  };

  const sectionStyle: React.CSSProperties = {
    backgroundColor: 'var(--color-white)', borderRadius: '12px',
    padding: '1.5rem', boxShadow: '0 2px 12px rgba(44,24,16,0.06)',
    display: 'flex', flexDirection: 'column', gap: '1rem',
  };

  const grid2: React.CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Basic info */}
      <div style={sectionStyle}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: 'var(--color-secondary)', margin: 0 }}>Basic Info</h3>
        {mode === 'create' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            <label style={labelStyle}>Product ID *</label>
            <input style={inputStyle} value={productId} onChange={e => setProductId(e.target.value)} placeholder="baklava-classic" required />
            <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--color-muted)' }}>Unique identifier, no spaces. Also used as the URL slug.</p>
          </div>
        )}
        <div style={grid2}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            <label style={labelStyle}>Name (English) *</label>
            <input style={inputStyle} value={form.name} onChange={e => { update('name', e.target.value); if (mode === 'create') setProductId(e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')); update('slug', e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')); }} placeholder="Classic Baklava" required />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            <label style={labelStyle}>Name (Arabic)</label>
            <input style={inputStyle} value={form.nameAr} onChange={e => update('nameAr', e.target.value)} placeholder="بقلاوة كلاسيك" dir="rtl" />
          </div>
        </div>
        <div style={grid2}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            <label style={labelStyle}>Category *</label>
            <select style={inputStyle} value={form.category} onChange={e => update('category', e.target.value)} required>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            <label style={labelStyle}>Tags (comma-separated)</label>
            <input style={inputStyle} value={form.tags.join(', ')} onChange={e => update('tags', e.target.value.split(',').map(t => t.trim()).filter(Boolean))} placeholder="bestseller, nuts, gift" />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
          <label style={labelStyle}>Description *</label>
          <textarea style={{ ...inputStyle, resize: 'vertical' }} rows={3} value={form.description} onChange={e => update('description', e.target.value)} required placeholder="Describe this product…" />
        </div>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-secondary)' }}>
            <input type="checkbox" checked={form.inStock} onChange={e => update('inStock', e.target.checked)} />
            In Stock
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-secondary)' }}>
            <input type="checkbox" checked={form.featured} onChange={e => update('featured', e.target.checked)} />
            Featured (shows on home page)
          </label>
        </div>
      </div>

      {/* Pricing / Variants */}
      <div style={sectionStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: 'var(--color-secondary)', margin: 0 }}>Variants &amp; Pricing</h3>
          <button type="button" onClick={addVariant} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'none', border: '1px solid var(--color-primary)', color: 'var(--color-primary)', padding: '0.375rem 0.75rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontFamily: 'var(--font-body)', fontWeight: 600 }}>
            <Plus size={14} /> Add Variant
          </button>
        </div>
        {form.variants.map((v, idx) => (
          <div key={v.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '0.75rem', alignItems: 'end' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              <label style={labelStyle}>Label</label>
              <input style={inputStyle} value={v.label} onChange={e => updateVariant(idx, 'label', e.target.value)} placeholder="Small (12 pcs)" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              <label style={labelStyle}>Price (USD)</label>
              <input style={inputStyle} type="number" min="0" step="0.01" value={v.price} onChange={e => updateVariant(idx, 'price', parseFloat(e.target.value) || 0)} />
            </div>
            <button type="button" onClick={() => removeVariant(idx)} disabled={form.variants.length === 1} style={{ padding: '0.625rem', background: 'none', border: 'none', cursor: form.variants.length === 1 ? 'not-allowed' : 'pointer', color: form.variants.length === 1 ? '#ccc' : 'var(--color-accent)', borderRadius: '6px' }}>
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
          <label style={labelStyle}>Compare-At Price (optional — shows strikethrough)</label>
          <input style={{ ...inputStyle, maxWidth: '180px' }} type="number" min="0" step="0.01" value={form.compareAtPrice ?? ''} onChange={e => update('compareAtPrice', e.target.value ? parseFloat(e.target.value) : undefined)} placeholder="0.00" />
        </div>
      </div>

      {/* Images */}
      <div style={sectionStyle}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: 'var(--color-secondary)', margin: 0 }}>Images</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          {form.images.map((img, idx) => (
            <div key={idx} style={{ position: 'relative', width: '100px', height: '100px', borderRadius: '8px', overflow: 'hidden', border: '2px solid #e2d9cf' }}>
              <Image src={img} alt={`Product image ${idx + 1}`} fill style={{ objectFit: 'cover' }} sizes="100px" />
              <button type="button" onClick={() => removeImage(idx)} style={{ position: 'absolute', top: '4px', right: '4px', width: '22px', height: '22px', borderRadius: '50%', backgroundColor: 'rgba(212,77,77,0.9)', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>×</button>
            </div>
          ))}
          <label style={{ width: '100px', height: '100px', borderRadius: '8px', border: '2px dashed #e2d9cf', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--color-muted)', fontSize: '0.75rem', fontFamily: 'var(--font-body)', gap: '0.25rem', backgroundColor: '#faf7f4' }}>
            <Upload size={18} />
            {uploading ? 'Uploading…' : 'Upload'}
            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} disabled={uploading} />
          </label>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
          <label style={labelStyle}>Or paste image URL</label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input id="img-url-input" style={{ ...inputStyle, flex: 1 }} placeholder="https://placehold.co/600x400/..." />
            <button type="button" onClick={() => { const el = document.getElementById('img-url-input') as HTMLInputElement; if (el.value) { update('images', [...form.images, el.value]); el.value = ''; } }} style={{ padding: '0.625rem 1rem', backgroundColor: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem', whiteSpace: 'nowrap' }}>
              Add URL
            </button>
          </div>
        </div>
      </div>

      {error && <p style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-body)', fontSize: '0.875rem', margin: 0 }}>{error}</p>}

      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button type="button" onClick={() => router.push('/joesweets-admin/products')} style={{ padding: '0.75rem 1.5rem', backgroundColor: 'var(--color-bg-alt)', color: 'var(--color-secondary)', border: 'none', borderRadius: '8px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: 600 }}>
          Cancel
        </button>
        <button type="submit" disabled={saving} style={{ flex: 1, padding: '0.75rem 1.5rem', backgroundColor: saving ? '#d4a96a' : 'var(--color-primary)', color: 'white', border: 'none', borderRadius: '8px', cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1rem' }}>
          {saving ? 'Saving…' : mode === 'create' ? 'Create Product' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}
