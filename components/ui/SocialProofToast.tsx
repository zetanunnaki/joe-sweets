'use client';

import { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';

const PROOF_ITEMS = [
  { name: 'Sarah M.', city: 'Washington DC', item: 'Kunafa Cream', time: '2 min ago' },
  { name: 'Ahmed K.', city: 'Maryland', item: 'Baklava Classic', time: '5 min ago' },
  { name: 'Fatima R.', city: 'Virginia', item: 'Om Ali', time: '8 min ago' },
  { name: 'Michael T.', city: 'Washington DC', item: 'Sweet Box (Medium)', time: '12 min ago' },
  { name: 'Nour A.', city: 'Maryland', item: 'Basbousa Classic', time: '15 min ago' },
  { name: 'Jennifer L.', city: 'Virginia', item: 'Qatayef', time: '18 min ago' },
  { name: 'Omar S.', city: 'Washington DC', item: 'Feteer Meshaltit', time: '22 min ago' },
];

// Show after 8s, then cycle every 6s, hide after 3 cycles
const INITIAL_DELAY = 8000;
const CYCLE_INTERVAL = 6000;
const MAX_SHOWS = 3;

export function SocialProofToast() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [showCount, setShowCount] = useState(0);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      // Start with random item
      setIndex(Math.floor(Math.random() * PROOF_ITEMS.length));
      setVisible(true);
      setShowCount(1);
    }, INITIAL_DELAY);

    return () => clearTimeout(startTimer);
  }, []);

  useEffect(() => {
    if (!visible) return;

    // Hide after 4s
    const hideTimer = setTimeout(() => setVisible(false), 4000);

    // Show next after cycle interval
    const nextTimer = setTimeout(() => {
      if (showCount >= MAX_SHOWS) return;
      setIndex((i) => (i + 1) % PROOF_ITEMS.length);
      setVisible(true);
      setShowCount((c) => c + 1);
    }, CYCLE_INTERVAL);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, [visible, showCount]);

  if (!visible) return null;

  const item = PROOF_ITEMS[index];

  return (
    <div
      className="social-proof-toast"
      style={{
        position: 'fixed',
        bottom: '5.5rem',
        left: '1.25rem',
        zIndex: 60,
        backgroundColor: 'var(--color-white)',
        borderRadius: '12px',
        padding: '0.875rem 1rem',
        boxShadow: '0 8px 32px rgba(44,24,16,0.16)',
        border: '1px solid rgba(200,150,62,0.2)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        maxWidth: '260px',
        animation: 'social-proof-in 350ms cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      {/* Icon */}
      <div style={{
        width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0,
        background: 'linear-gradient(135deg, rgba(200,150,62,0.15), rgba(200,150,62,0.05))',
        border: '1px solid rgba(200,150,62,0.25)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <ShoppingBag size={16} color="var(--color-primary)" />
      </div>

      {/* Text */}
      <div style={{ minWidth: 0 }}>
        <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {item.name} from {item.city}
        </p>
        <p style={{ margin: '2px 0 0', fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--color-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          Just ordered <strong style={{ color: 'var(--color-primary)' }}>{item.item}</strong>
        </p>
        <p style={{ margin: '2px 0 0', fontFamily: 'var(--font-body)', fontSize: '0.66rem', color: 'var(--color-muted)', opacity: 0.7 }}>
          {item.time}
        </p>
      </div>
    </div>
  );
}
