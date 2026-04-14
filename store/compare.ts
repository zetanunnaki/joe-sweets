import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const MAX = 3;

interface CompareStore {
  ids: string[];
  toggle: (productId: string) => void;
  has: (productId: string) => boolean;
  remove: (productId: string) => void;
  clear: () => void;
}

export const useCompareStore = create<CompareStore>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (productId) => {
        const ids = get().ids;
        if (ids.includes(productId)) {
          set({ ids: ids.filter((i) => i !== productId) });
        } else if (ids.length < MAX) {
          set({ ids: [...ids, productId] });
        }
      },
      has: (productId) => get().ids.includes(productId),
      remove: (productId) => set({ ids: get().ids.filter((i) => i !== productId) }),
      clear: () => set({ ids: [] }),
    }),
    {
      name: 'joe-sweets-compare',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
