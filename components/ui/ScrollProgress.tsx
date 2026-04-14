'use client';

import { useState, useEffect } from 'react';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(pct);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (progress <= 0) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0,
      width: `${progress}%`,
      height: '2px',
      background: 'linear-gradient(90deg, var(--color-primary), #f0c060, var(--color-primary))',
      zIndex: 100,
      transition: 'width 50ms linear',
      boxShadow: '0 0 8px rgba(200,150,62,0.6)',
    }} />
  );
}
