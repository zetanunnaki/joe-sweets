import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';
import { CartItem } from '@/types';

interface CartStore {
  items: CartItem[];
  isDrawerOpen: boolean;

  // Actions
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, variantId: string) => void;
  updateQty: (productId: string, variantId: string, qty: number) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;

  // Derived (computed via selectors below)
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,

      addItem: (newItem) => {
        const items = get().items;
        const existing = items.find(
          (i) => i.productId === newItem.productId && i.variantId === newItem.variantId
        );
        if (existing) {
          set({
            items: items.map((i) =>
              i.productId === newItem.productId && i.variantId === newItem.variantId
                ? { ...i, qty: i.qty + newItem.qty }
                : i
            ),
          });
        } else {
          set({ items: [...items, newItem] });
        }
      },

      removeItem: (productId, variantId) => {
        set({
          items: get().items.filter(
            (i) => !(i.productId === productId && i.variantId === variantId)
          ),
        });
      },

      updateQty: (productId, variantId, qty) => {
        if (qty <= 0) {
          get().removeItem(productId, variantId);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.productId === productId && i.variantId === variantId ? { ...i, qty } : i
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
    }),
    {
      name: 'joe-sweets-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }), // don't persist drawer open state
    }
  )
);

// Selectors (call these inside components)
export function useCartItems() {
  return useCartStore((s) => s.items);
}

export function useCartCount() {
  return useCartStore((s) => s.items.reduce((sum, i) => sum + i.qty, 0));
}

export function useCartSubtotal() {
  return useCartStore((s) =>
    s.items.reduce((sum, i) => sum + i.price * i.qty, 0)
  );
}

export function useCartDrawer() {
  return useCartStore(
    useShallow((s) => ({
      isOpen: s.isDrawerOpen,
      open: s.openDrawer,
      close: s.closeDrawer,
    }))
  );
}
