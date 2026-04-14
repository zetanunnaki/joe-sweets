'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Check, Plus, Minus, Gift, ShoppingBag, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';
import { getAllProducts } from '@/lib/products';
import { useCartStore } from '@/store/cart';
import { useToastStore } from '@/store/toast';
import { formatCurrency } from '@/lib/utils';
import { EgyptianDivider } from '@/components/ui/EgyptianDivider';

const ALL_PRODUCTS = getAllProducts().filter((p) => p.inStock && p.category !== 'drinks');

const BOX_SIZES = [
  { id: 'small', label: 'Small Box', capacity: 3, price: 5, desc: 'Perfect for 1–2 people' },
  { id: 'medium', label: 'Medium Box', capacity: 6, price: 8, desc: 'Great for 3–4 people' },
  { id: 'large', label: 'Large Box', capacity: 10, price: 12, desc: 'Ideal for gatherings' },
];

const RIBBON_COLORS = [
  { id: 'gold', label: 'Gold', hex: '#C8963E' },
  { id: 'red', label: 'Red', hex: '#D44D4D' },
  { id: 'green', label: 'Emerald', hex: '#15803d' },
  { id: 'navy', label: 'Navy', hex: '#1e3a5f' },
  { id: 'white', label: 'White', hex: '#f5f5f5' },
];

type Step = 'size' | 'items' | 'ribbon' | 'message' | 'review';
const STEPS: Step[] = ['size', 'items', 'ribbon', 'message', 'review'];
const STEP_LABELS: Record<Step, string> = {
  size: 'Box Size',
  items: 'Choose Items',
  ribbon: 'Ribbon',
  message: 'Gift Note',
  review: 'Review',
};

export default function GiftBuilderPage() {
  const [step, setStep] = useState<Step>('size');
  const [boxSize, setBoxSize] = useState<typeof BOX_SIZES[0] | null>(null);
  const [selections, setSelections] = useState<Record<string, number>>({});
  const [ribbon, setRibbon] = useState(RIBBON_COLORS[0]);
  const [message, setMessage] = useState('');
  const [done, setDone] = useState(false);

  const { addItem, openDrawer } = useCartStore();
  const { addToast } = useToastStore();

  const stepIndex = STEPS.indexOf(step);
  const capacity = boxSize?.capacity ?? 0;

  const totalSelected = useMemo(
    () => Object.values(selections).reduce((s, q) => s + q, 0),
    [selections]
  );

  const itemsTotal = useMemo(() => {
    return ALL_PRODUCTS.reduce((sum, p) => {
      const qty = selections[p.id] ?? 0;
      return sum + qty * p.variants[0].price;
    }, 0);
  }, [selections]);

  const grandTotal = (boxSize?.price ?? 0) + itemsTotal;

  function adjustQty(productId: string, delta: number) {
    setSelections((prev) => {
      const cur = prev[productId] ?? 0;
      const next = Math.max(0, cur + delta);
      if (delta > 0 && totalSelected >= capacity) return prev;
      const updated = { ...prev, [productId]: next };
      if (next === 0) delete updated[productId];
      return updated;
    });
  }

  function goNext() {
    const idx = STEPS.indexOf(step);
    if (idx < STEPS.length - 1) setStep(STEPS[idx + 1]);
  }

  function goBack() {
    const idx = STEPS.indexOf(step);
    if (idx > 0) setStep(STEPS[idx - 1]);
  }

  function handleAddToCart() {
    // Add each selected product
    Object.entries(selections).forEach(([productId, qty]) => {
      const product = ALL_PRODUCTS.find((p) => p.id === productId);
      if (!product || qty === 0) return;
      addItem({
        productId: product.id,
        variantId: product.variants[0].id,
        qty,
        price: product.variants[0].price,
        name: `[Gift Box] ${product.name}`,
        image: product.images[0],
        variantLabel: product.variants[0].label,
      });
    });
    addToast('Gift box added to cart!');
    openDrawer();
    setDone(true);
  }

  if (done) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '460px' }}>
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.5rem', boxShadow: '0 8px 32px rgba(200,150,62,0.4)',
          }}>
            <Gift size={36} color="white" />
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--color-secondary)', margin: '0 0 0.75rem' }}>
            Beautiful Gift Box Ready!
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-muted)', marginBottom: '2rem' }}>
            Your custom gift box has been added to your cart. Complete your order and we&apos;ll wrap it with love.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => { setDone(false); setStep('size'); setBoxSize(null); setSelections({}); setMessage(''); }}
              style={{ padding: '0.75rem 1.5rem', borderRadius: '10px', border: '2px solid #e2d9cf', background: 'transparent', fontFamily: 'var(--font-body)', fontWeight: 600, cursor: 'pointer', color: 'var(--color-secondary)' }}
            >
              Build Another
            </button>
            <a href="/cart" style={{ padding: '0.75rem 1.75rem', borderRadius: '10px', background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))', color: 'white', fontFamily: 'var(--font-body)', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShoppingBag size={16} /> View Cart
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)', paddingBottom: '5rem' }}>
      {/* Hero */}
      <div style={{
        backgroundColor: 'var(--color-secondary)', padding: 'clamp(2rem,5vw,3rem) 1.5rem',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cg fill='none' stroke='%23C8963E' stroke-width='0.5' opacity='0.07'%3E%3Cpolygon points='24,4 28,14 38,14 30,20 33,30 24,24 15,30 18,20 10,14 20,14'/%3E%3C/g%3E%3C/svg%3E\")", backgroundRepeat: 'repeat', pointerEvents: 'none' }} />
        <div style={{ position: 'relative' }}>
          <p style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(1rem,3vw,1.3rem)', color: 'var(--color-primary)', marginBottom: '0.4rem', marginTop: 0 }}>Curated with love</p>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem,5vw,3rem)', color: 'var(--color-white)', margin: '0 0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <Gift size={32} /> Gift Box Builder
          </h1>
          <EgyptianDivider color="var(--color-primary)" />
        </div>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
        {/* Step progress */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
          {STEPS.map((s, i) => {
            const isDone = stepIndex > i;
            const isCurrent = step === s;
            return (
              <div key={s} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                  <div style={{
                    width: '32px', height: '32px', borderRadius: '50%',
                    background: isDone ? 'var(--color-primary)' : isCurrent ? 'var(--color-secondary)' : '#e2d9cf',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: isDone || isCurrent ? 'white' : 'var(--color-muted)',
                    fontSize: '0.78rem', fontWeight: 700, fontFamily: 'var(--font-body)',
                    transition: 'all 300ms',
                  }}>
                    {isDone ? <Check size={14} /> : i + 1}
                  </div>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', color: isCurrent ? 'var(--color-secondary)' : 'var(--color-muted)', fontWeight: isCurrent ? 600 : 400, whiteSpace: 'nowrap' }}>
                    {STEP_LABELS[s]}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div style={{ width: '32px', height: '2px', background: stepIndex > i ? 'var(--color-primary)' : '#e2d9cf', margin: '0 0.25rem', marginTop: '-14px', transition: 'background 300ms' }} />
                )}
              </div>
            );
          })}
        </div>

        {/* Step content */}
        <div style={{ backgroundColor: 'var(--color-white)', borderRadius: '16px', padding: 'clamp(1.5rem,4vw,2.5rem)', boxShadow: '0 4px 32px rgba(44,24,16,0.08)', minHeight: '340px' }}>

          {/* STEP 1: Box size */}
          {step === 'size' && (
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--color-secondary)', margin: '0 0 0.4rem' }}>Choose Your Box Size</h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-muted)', margin: '0 0 1.75rem' }}>Each box size lets you pick a different number of items.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {BOX_SIZES.map((bs) => {
                  const isSelected = boxSize?.id === bs.id;
                  return (
                    <button
                      key={bs.id}
                      onClick={() => setBoxSize(bs)}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '1.1rem 1.25rem', borderRadius: '12px', cursor: 'pointer',
                        border: `2px solid ${isSelected ? 'var(--color-primary)' : '#e2d9cf'}`,
                        background: isSelected ? 'rgba(200,150,62,0.06)' : 'transparent',
                        transition: 'all 200ms', textAlign: 'left',
                      }}
                    >
                      <div>
                        <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, color: 'var(--color-secondary)', margin: 0 }}>{bs.label}</p>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--color-muted)', margin: 0 }}>{bs.desc} · up to {bs.capacity} items</p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--color-primary)', fontSize: '1.1rem' }}>+{formatCurrency(bs.price)}</span>
                        {isSelected && <Check size={18} color="var(--color-primary)" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Items */}
          {step === 'items' && boxSize && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--color-secondary)', margin: '0 0 0.25rem' }}>Pick Your Items</h2>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-muted)', margin: 0 }}>Choose up to {capacity} items for your {boxSize.label}.</p>
                </div>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.5rem 1rem', borderRadius: '999px',
                  background: totalSelected >= capacity ? 'rgba(200,150,62,0.1)' : 'var(--color-bg-alt)',
                  border: `1.5px solid ${totalSelected >= capacity ? 'var(--color-primary)' : 'transparent'}`,
                }}>
                  <Sparkles size={13} color={totalSelected >= capacity ? 'var(--color-primary)' : 'var(--color-muted)'} />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 600, color: totalSelected >= capacity ? 'var(--color-primary)' : 'var(--color-muted)' }}>
                    {totalSelected}/{capacity} slots
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', maxHeight: '360px', overflowY: 'auto' }}>
                {ALL_PRODUCTS.map((p) => {
                  const qty = selections[p.id] ?? 0;
                  return (
                    <div key={p.id} style={{
                      display: 'flex', alignItems: 'center', gap: '0.875rem',
                      padding: '0.75rem', borderRadius: '10px',
                      border: `1.5px solid ${qty > 0 ? 'var(--color-primary)' : '#e2d9cf'}`,
                      background: qty > 0 ? 'rgba(200,150,62,0.04)' : 'transparent',
                      transition: 'all 200ms',
                    }}>
                      <div style={{ position: 'relative', width: '52px', height: '52px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                        <Image src={p.images[0]} alt={p.name} fill style={{ objectFit: 'cover' }} sizes="52px" />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-secondary)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</p>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--color-primary)', fontWeight: 700, margin: 0 }}>{formatCurrency(p.variants[0].price)}</p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                        <button
                          onClick={() => adjustQty(p.id, -1)}
                          disabled={qty === 0}
                          style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1.5px solid #e2d9cf', background: 'transparent', cursor: qty === 0 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: qty === 0 ? 0.4 : 1 }}
                        >
                          <Minus size={12} />
                        </button>
                        <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-secondary)', minWidth: '16px', textAlign: 'center' }}>{qty}</span>
                        <button
                          onClick={() => adjustQty(p.id, 1)}
                          disabled={totalSelected >= capacity}
                          style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1.5px solid', borderColor: totalSelected >= capacity ? '#e2d9cf' : 'var(--color-primary)', background: totalSelected >= capacity ? 'transparent' : 'rgba(200,150,62,0.1)', cursor: totalSelected >= capacity ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: totalSelected >= capacity ? 0.4 : 1 }}
                        >
                          <Plus size={12} color={totalSelected < capacity ? 'var(--color-primary)' : undefined} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Ribbon */}
          {step === 'ribbon' && (
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--color-secondary)', margin: '0 0 0.4rem' }}>Choose a Ribbon</h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-muted)', margin: '0 0 1.75rem' }}>We&apos;ll tie it beautifully.</p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {RIBBON_COLORS.map((rc) => (
                  <button
                    key={rc.id}
                    onClick={() => setRibbon(rc)}
                    style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
                      padding: '0.875rem 1.25rem', borderRadius: '12px', cursor: 'pointer',
                      border: `2px solid ${ribbon.id === rc.id ? 'var(--color-secondary)' : '#e2d9cf'}`,
                      background: ribbon.id === rc.id ? 'var(--color-bg-alt)' : 'transparent',
                      transition: 'all 200ms',
                    }}
                  >
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: rc.hex, boxShadow: ribbon.id === rc.id ? `0 0 0 3px white, 0 0 0 5px ${rc.hex}` : '0 2px 8px rgba(0,0,0,0.15)' }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: ribbon.id === rc.id ? 700 : 400, color: 'var(--color-secondary)' }}>{rc.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Message */}
          {step === 'message' && (
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--color-secondary)', margin: '0 0 0.4rem' }}>Gift Message</h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-muted)', margin: '0 0 1.5rem' }}>Optional — we&apos;ll include a handwritten note. (Max 120 characters)</p>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value.slice(0, 120))}
                placeholder="Happy Birthday! Enjoy these Egyptian sweets with love..."
                rows={4}
                style={{
                  width: '100%', padding: '0.875rem', borderRadius: '10px',
                  border: '2px solid #e2d9cf', fontFamily: 'var(--font-body)', fontSize: '0.9rem',
                  color: 'var(--color-secondary)', outline: 'none', resize: 'vertical',
                  boxSizing: 'border-box', lineHeight: 1.6,
                  transition: 'border-color 200ms',
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = '#e2d9cf'; }}
              />
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--color-muted)', textAlign: 'right', margin: '0.25rem 0 0' }}>{message.length}/120</p>
            </div>
          )}

          {/* STEP 5: Review */}
          {step === 'review' && boxSize && (
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--color-secondary)', margin: '0 0 1.25rem' }}>Review Your Gift Box</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {/* Box details */}
                <div style={{ padding: '1rem', borderRadius: '10px', backgroundColor: 'var(--color-bg-alt)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, color: 'var(--color-secondary)', margin: 0 }}>{boxSize.label}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--color-muted)', margin: 0 }}>Ribbon: {ribbon.label} · {message ? 'Note included' : 'No note'}</p>
                  </div>
                  <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, color: 'var(--color-primary)' }}>{formatCurrency(boxSize.price)}</span>
                </div>
                {/* Items */}
                {ALL_PRODUCTS.filter((p) => (selections[p.id] ?? 0) > 0).map((p) => (
                  <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', borderRadius: '10px', border: '1.5px solid #e2d9cf' }}>
                    <div style={{ position: 'relative', width: '44px', height: '44px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                      <Image src={p.images[0]} alt={p.name} fill style={{ objectFit: 'cover' }} sizes="44px" />
                    </div>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-secondary)', flex: 1 }}>{p.name}</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--color-muted)' }}>×{selections[p.id]}</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, color: 'var(--color-primary)', fontSize: '0.875rem' }}>{formatCurrency((selections[p.id] ?? 0) * p.variants[0].price)}</span>
                  </div>
                ))}
                {/* Total */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '2px solid var(--color-bg-alt)' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, color: 'var(--color-secondary)' }}>Total</span>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-primary)' }}>{formatCurrency(grandTotal)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.25rem', gap: '0.75rem' }}>
          <button
            onClick={goBack}
            disabled={step === 'size'}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.375rem',
              padding: '0.75rem 1.5rem', borderRadius: '10px',
              border: '2px solid #e2d9cf', background: 'transparent',
              fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9rem',
              color: 'var(--color-secondary)', cursor: step === 'size' ? 'not-allowed' : 'pointer',
              opacity: step === 'size' ? 0.4 : 1,
            }}
          >
            <ChevronLeft size={16} /> Back
          </button>

          {step !== 'review' ? (
            <button
              onClick={goNext}
              disabled={step === 'size' && !boxSize}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.375rem',
                padding: '0.75rem 2rem', borderRadius: '10px',
                background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
                border: 'none', color: 'white',
                fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9rem',
                cursor: (step === 'size' && !boxSize) ? 'not-allowed' : 'pointer',
                opacity: (step === 'size' && !boxSize) ? 0.5 : 1,
                boxShadow: '0 4px 16px rgba(200,150,62,0.35)',
              }}
            >
              Next <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              disabled={totalSelected === 0}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.875rem 2rem', borderRadius: '10px',
                background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
                border: 'none', color: 'white',
                fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.95rem',
                cursor: totalSelected === 0 ? 'not-allowed' : 'pointer',
                opacity: totalSelected === 0 ? 0.5 : 1,
                boxShadow: '0 4px 16px rgba(200,150,62,0.4)',
              }}
            >
              <ShoppingBag size={17} /> Add Gift Box to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
