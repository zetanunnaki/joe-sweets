import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RecentlyViewedStore {
  ids: string[];
  addProduct: (slug: string) => void;
  clear: () => void;
}

export const useRecentlyViewed = create<RecentlyViewedStore>()(
  persist(
    (set) => ({
      ids: [],
      addProduct: (slug) =>
        set((state) => ({
          ids: [slug, ...state.ids.filter((id) => id !== slug)].slice(0, 6),
        })),
      clear: () => set({ ids: [] }),
    }),
    { name: 'joe-sweets-recently-viewed' }
  )
);
