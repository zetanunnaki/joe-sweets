'use client';

import { useToastStore } from '@/store/toast';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export function Toaster() {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div className="toaster-wrap" style={{
      position: 'fixed',
      bottom: '1.5rem',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      alignItems: 'center',
      pointerEvents: 'none',
      width: 'min(400px, calc(100vw - 2rem))',
    }}>
      {toasts.map((toast) => {
        const Icon = toast.type === 'success' ? CheckCircle : toast.type === 'error' ? AlertCircle : Info;
        const iconColor = toast.type === 'success' ? '#22c55e' : toast.type === 'error' ? 'var(--color-accent)' : 'var(--color-primary)';
        return (
          <div
            key={toast.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              backgroundColor: 'var(--color-secondary)',
              color: 'var(--color-white)',
              padding: '0.875rem 1rem',
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
              animation: 'toast-in 0.3s ease forwards',
              pointerEvents: 'auto',
              border: '1px solid rgba(255,255,255,0.08)',
              width: '100%',
              backdropFilter: 'blur(8px)',
            }}
          >
            <Icon size={18} color={iconColor} style={{ flexShrink: 0 }} />
            <span style={{ flex: 1, fontSize: '0.9rem', fontFamily: 'var(--font-body)', fontWeight: 500 }}>
              {toast.message}
            </span>
            <button
              onClick={() => removeToast(toast.id)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,249,240,0.5)', padding: '2px', display: 'flex', alignItems: 'center', flexShrink: 0 }}
              aria-label="Dismiss"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
