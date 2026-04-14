'use client';

import { useEffect, useState } from 'react';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  // Render children immediately — Zustand store will self-hydrate from localStorage
  // The hydrated flag avoids flashing wrong cart count on SSR
  return <>{children}</>;
}
