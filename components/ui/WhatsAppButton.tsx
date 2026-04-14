'use client';

import { useState } from 'react';
import { X, MessageCircle } from 'lucide-react';
import { useCartItems } from '@/store/cart';
import { buildWhatsAppOrderUrl } from '@/lib/whatsapp';

const PHONE = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '12025550000';

const QUICK_QUESTIONS = [
  { label: '🛍️ Send my cart', type: 'cart' as const },
  { label: '🕐 What are your hours?', msg: "Hi! I'd like to know your business hours." },
  { label: '🚚 Do you deliver to my area?', msg: "Hi! I'm wondering if you deliver to my area in the DMV." },
  { label: '🎂 Custom order / catering', msg: "Hi! I'm interested in a custom order or catering for an event." },
  { label: '🎁 Gift box options', msg: "Hi! I'd love to learn more about your gift box options." },
  { label: '💬 Just say hi!', msg: 'Hi Joe Sweets! 👋' },
];

function WhatsAppIcon({ size = 26 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const items = useCartItems();
  const cartUrl = buildWhatsAppOrderUrl(items, PHONE);
  const cartCount = items.reduce((s, i) => s + i.qty, 0);

  function handleQuestion(q: typeof QUICK_QUESTIONS[0]) {
    if (q.type === 'cart') {
      window.open(cartUrl, '_blank', 'noopener,noreferrer');
    } else {
      const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(q.msg!)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    }
    setOpen(false);
  }

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 30, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.75rem' }}>
      {/* Popup */}
      {open && (
        <div style={{
          backgroundColor: 'var(--color-white)',
          borderRadius: '16px',
          boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
          overflow: 'hidden',
          width: '270px',
          border: '1px solid rgba(200,150,62,0.12)',
          animation: 'fadeInUp 0.2s ease',
        }}>
          {/* Header */}
          <div style={{ background: '#25D366', padding: '0.875rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <WhatsAppIcon size={18} />
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.875rem', color: 'white', margin: 0 }}>Joe Sweets</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'rgba(255,255,255,0.8)', margin: 0 }}>Usually replies instantly</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.8)', display: 'flex', padding: '2px' }}>
              <X size={16} />
            </button>
          </div>

          {/* Greeting bubble */}
          <div style={{ padding: '1rem 1rem 0.5rem' }}>
            <div style={{ backgroundColor: 'var(--color-bg-alt)', borderRadius: '0 10px 10px 10px', padding: '0.625rem 0.875rem', display: 'inline-block', maxWidth: '90%' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--color-secondary)', margin: 0, lineHeight: 1.5 }}>
                👋 Hi! What can we help you with today?
              </p>
            </div>
          </div>

          {/* Quick questions */}
          <div style={{ padding: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            {QUICK_QUESTIONS.map((q) => (
              <button
                key={q.label}
                onClick={() => handleQuestion(q)}
                style={{
                  textAlign: 'left', padding: '0.5rem 0.875rem', borderRadius: '8px',
                  border: '1.5px solid rgba(37,211,102,0.25)',
                  backgroundColor: 'transparent',
                  fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--color-secondary)',
                  cursor: 'pointer', transition: 'all 150ms',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f0fdf4'; e.currentTarget.style.borderColor = '#25D366'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'rgba(37,211,102,0.25)'; }}
              >
                {q.label}
              </button>
            ))}
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', color: 'var(--color-muted)', textAlign: 'center', padding: '0.5rem 1rem 0.875rem', margin: 0 }}>
            Opens WhatsApp
          </p>
        </div>
      )}

      {/* FAB button */}
      <button
        onClick={() => setOpen((p) => !p)}
        aria-label="Chat on WhatsApp"
        style={{
          width: '56px', height: '56px', borderRadius: '50%',
          backgroundColor: '#25D366', color: 'white',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(37,211,102,0.4)',
          transition: 'transform 200ms, box-shadow 200ms',
          position: 'relative',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.1)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 28px rgba(37,211,102,0.55)'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 20px rgba(37,211,102,0.4)'; }}
      >
        {cartCount > 0 && !open && (
          <span style={{
            position: 'absolute', top: '-4px', right: '-4px',
            width: '18px', height: '18px', borderRadius: '50%',
            backgroundColor: 'var(--color-primary)', color: 'white',
            fontSize: '0.65rem', fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 0 2px white',
          }}>
            {cartCount}
          </span>
        )}
        {open ? <X size={22} /> : <WhatsAppIcon size={26} />}
      </button>
    </div>
  );
}
