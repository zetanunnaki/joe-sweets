'use client';

import { useState, useMemo, useCallback } from 'react';
import { Search, SlidersHorizontal, X, LayoutGrid, List, SlidersHorizontal as FiltersIcon } from 'lucide-react';
import { getAllProducts, getAllCategories } from '@/lib/products';
import { ProductGrid } from '@/components/product/ProductGrid';
import { ProductListView } from '@/components/product/ProductListView';
import { EgyptianDivider } from '@/components/ui/EgyptianDivider';
import { RecentlyViewedBar } from '@/components/product/RecentlyViewedBar';
import { Product } from '@/types';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating-desc';
type ViewMode = 'grid' | 'list';

const ALL_PRODUCTS = getAllProducts();
const ALL_CATEGORIES = getAllCategories();

const MAX_PRICE = Math.ceil(Math.max(...ALL_PRODUCTS.map((p) => p.variants[0].price)));
const MIN_PRICE = Math.floor(Math.min(...ALL_PRODUCTS.map((p) => p.variants[0].price)));

const DIET_FILTERS = [
  { id: 'vegan', label: '🌱 Vegan' },
  { id: 'vegetarian', label: '🥦 Vegetarian' },
  { id: 'bestseller', label: '⭐ Bestseller' },
  { id: 'gift', label: '🎁 Gift' },
  { id: 'nuts', label: '🥜 Contains Nuts' },
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [activeTag, setActiveTag] = useState<string>('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([MIN_PRICE, MAX_PRICE]);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let products: Product[] = ALL_PRODUCTS;
    if (activeCategory !== 'all') {
      products = products.filter((p) => p.category === activeCategory);
    }
    if (activeTag) {
      products = products.filter((p) => p.tags.includes(activeTag));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (inStockOnly) {
      products = products.filter((p) => p.inStock);
    }
    products = products.filter(
      (p) => p.variants[0].price >= priceRange[0] && p.variants[0].price <= priceRange[1]
    );
    switch (sortBy) {
      case 'price-asc': return [...products].sort((a, b) => a.variants[0].price - b.variants[0].price);
      case 'price-desc': return [...products].sort((a, b) => b.variants[0].price - a.variants[0].price);
      case 'rating-desc': return [...products].sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
      default: return [...products].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
  }, [activeCategory, searchQuery, sortBy, activeTag, inStockOnly, priceRange]);

  const hasActiveFilters = inStockOnly || priceRange[0] > MIN_PRICE || priceRange[1] < MAX_PRICE || activeTag !== '';

  function clearAllFilters() {
    setInStockOnly(false);
    setPriceRange([MIN_PRICE, MAX_PRICE]);
    setActiveTag('');
  }

  const categories = [{ id: 'all', name: 'All Items' }, ...ALL_CATEGORIES];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)', paddingBottom: '4rem' }}>
      {/* Page header */}
      <div style={{
        backgroundColor: 'var(--color-secondary)',
        padding: 'clamp(2rem, 5vw, 3.5rem) 1.5rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Pattern */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cg fill='none' stroke='%23C8963E' stroke-width='0.5' opacity='0.07'%3E%3Cpolygon points='24,4 28,14 38,14 30,20 33,30 24,24 15,30 18,20 10,14 20,14'/%3E%3C/g%3E%3C/svg%3E\")",
          backgroundRepeat: 'repeat', pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative' }}>
          <p style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(1rem, 3vw, 1.3rem)', color: 'var(--color-primary)', marginBottom: '0.4rem', marginTop: 0 }}>Fresh Daily</p>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 5vw, 3rem)', color: 'var(--color-white)', margin: '0 0 1.5rem' }}>Our Menu</h1>
          <EgyptianDivider color="var(--color-primary)" />
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        {/* Controls bar */}
        <div style={{ paddingTop: '1.5rem', paddingBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>

          {/* Row 1: Search + Sort + Filter toggle + View toggle */}
          <div style={{ display: 'flex', gap: '0.625rem', alignItems: 'center' }}>
            {/* Search */}
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={16} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-muted)', pointerEvents: 'none' }} />
              <input
                type="text"
                placeholder="Search menu…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.7rem 2.25rem 0.7rem 2.5rem',
                  borderRadius: '10px',
                  border: '2px solid #e2d9cf',
                  backgroundColor: 'var(--color-white)',
                  color: 'var(--color-secondary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 200ms',
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = '#e2d9cf'; }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-muted)', display: 'flex', alignItems: 'center', padding: '2px' }}
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Sort */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <SlidersHorizontal size={15} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-muted)', pointerEvents: 'none' }} />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                style={{
                  padding: '0.7rem 0.875rem 0.7rem 2.25rem',
                  borderRadius: '10px',
                  border: '2px solid #e2d9cf',
                  backgroundColor: 'var(--color-white)',
                  color: 'var(--color-secondary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  outline: 'none',
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  minWidth: '140px',
                }}
              >
                <option value="featured">Featured</option>
                <option value="rating-desc">Top Rated</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
              </select>
            </div>

            {/* Filter toggle button */}
            <button
              onClick={() => setShowFilters((v) => !v)}
              title="Advanced filters"
              style={{
                flexShrink: 0,
                display: 'flex', alignItems: 'center', gap: '0.35rem',
                padding: '0.7rem 0.875rem',
                borderRadius: '10px',
                border: `2px solid ${showFilters || hasActiveFilters ? 'var(--color-primary)' : '#e2d9cf'}`,
                background: showFilters || hasActiveFilters ? 'rgba(200,150,62,0.08)' : 'var(--color-white)',
                color: showFilters || hasActiveFilters ? 'var(--color-primary)' : 'var(--color-muted)',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                fontSize: '0.82rem',
                fontWeight: 500,
                transition: 'all 200ms',
                position: 'relative',
              }}
            >
              <FiltersIcon size={14} />
              <span className="menu-filter-label">Filters</span>
              {hasActiveFilters && (
                <span style={{
                  position: 'absolute', top: '-6px', right: '-6px',
                  width: '16px', height: '16px',
                  borderRadius: '50%',
                  background: 'var(--color-primary)',
                  color: 'white',
                  fontSize: '0.6rem',
                  fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '2px solid var(--color-bg)',
                }}>!</span>
              )}
            </button>

            {/* View mode toggle */}
            <div style={{ display: 'flex', borderRadius: '10px', border: '2px solid #e2d9cf', overflow: 'hidden', flexShrink: 0 }}>
              <button
                onClick={() => setViewMode('grid')}
                title="Grid view"
                style={{
                  padding: '0.6rem 0.75rem',
                  border: 'none',
                  background: viewMode === 'grid' ? 'rgba(200,150,62,0.1)' : 'var(--color-white)',
                  color: viewMode === 'grid' ? 'var(--color-primary)' : 'var(--color-muted)',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center',
                  transition: 'all 180ms',
                }}
              >
                <LayoutGrid size={15} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                title="List view"
                style={{
                  padding: '0.6rem 0.75rem',
                  border: 'none',
                  borderLeft: '1px solid #e2d9cf',
                  background: viewMode === 'list' ? 'rgba(200,150,62,0.1)' : 'var(--color-white)',
                  color: viewMode === 'list' ? 'var(--color-primary)' : 'var(--color-muted)',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center',
                  transition: 'all 180ms',
                }}
              >
                <List size={15} />
              </button>
            </div>
          </div>

          {/* Advanced filters panel */}
          {showFilters && (
            <div style={{
              padding: '1rem 1.25rem',
              backgroundColor: 'var(--color-white)',
              borderRadius: '12px',
              border: '1.5px solid rgba(200,150,62,0.2)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}>
              {/* Price range */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <label style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-secondary)' }}>
                    Price Range
                  </label>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--color-primary)', fontWeight: 600 }}>
                    ${priceRange[0]} – ${priceRange[1]}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <input
                    type="range"
                    min={MIN_PRICE}
                    max={MAX_PRICE}
                    value={priceRange[0]}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      if (v <= priceRange[1]) setPriceRange([v, priceRange[1]]);
                    }}
                    style={{ flex: 1, accentColor: 'var(--color-primary)' }}
                  />
                  <input
                    type="range"
                    min={MIN_PRICE}
                    max={MAX_PRICE}
                    value={priceRange[1]}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      if (v >= priceRange[0]) setPriceRange([priceRange[0], v]);
                    }}
                    style={{ flex: 1, accentColor: 'var(--color-primary)' }}
                  />
                </div>
              </div>

              {/* In stock only */}
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', cursor: 'pointer' }}>
                <div
                  onClick={() => setInStockOnly((v) => !v)}
                  style={{
                    width: '36px', height: '20px',
                    borderRadius: '10px',
                    background: inStockOnly ? 'var(--color-primary)' : '#e2d9cf',
                    position: 'relative',
                    transition: 'background 200ms',
                    flexShrink: 0,
                    cursor: 'pointer',
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: '2px',
                    left: inStockOnly ? '18px' : '2px',
                    width: '16px', height: '16px',
                    borderRadius: '50%',
                    background: 'white',
                    transition: 'left 200ms',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                  }} />
                </div>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--color-secondary)', fontWeight: 500, userSelect: 'none' }}>
                  In stock only
                </span>
              </label>

              {/* Tag filters */}
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-secondary)', margin: '0 0 0.5rem' }}>Dietary / Tags</p>
                <div className="category-pills">
                  {DIET_FILTERS.map((f) => {
                    const isActive = activeTag === f.id;
                    return (
                      <button
                        key={f.id}
                        onClick={() => setActiveTag(isActive ? '' : f.id)}
                        style={{
                          padding: '0.35rem 0.9rem',
                          borderRadius: '999px',
                          border: '1.5px solid',
                          borderColor: isActive ? 'var(--color-primary)' : 'rgba(200,150,62,0.3)',
                          background: isActive ? 'rgba(200,150,62,0.12)' : 'transparent',
                          color: isActive ? 'var(--color-primary-dark)' : 'var(--color-muted)',
                          fontWeight: isActive ? 600 : 400,
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          fontFamily: 'var(--font-body)',
                          transition: 'all 200ms',
                          whiteSpace: 'nowrap',
                          flexShrink: 0,
                        }}
                      >
                        {f.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.35rem',
                    padding: '0.4rem 0.875rem',
                    borderRadius: '8px',
                    border: '1px solid #e2d9cf',
                    background: 'transparent',
                    color: 'var(--color-muted)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    alignSelf: 'flex-start',
                    transition: 'border-color 200ms, color 200ms',
                  }}
                >
                  <X size={12} /> Clear all filters
                </button>
              )}
            </div>
          )}

          {/* Category pills — horizontally scrollable on mobile */}
          <div className="category-pills">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    padding: '0.5rem 1.1rem',
                    borderRadius: '999px',
                    border: '2px solid',
                    borderColor: isActive ? 'var(--color-primary)' : '#e2d9cf',
                    background: isActive
                      ? 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))'
                      : 'var(--color-white)',
                    color: isActive ? 'var(--color-white)' : 'var(--color-secondary)',
                    fontWeight: isActive ? 600 : 500,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-body)',
                    transition: 'all 200ms',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    boxShadow: isActive ? '0 2px 12px rgba(200,150,62,0.3)' : 'none',
                  }}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Result count + active filter chips */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--color-muted)', margin: 0 }}>
            {filtered.length} {filtered.length === 1 ? 'item' : 'items'} found
            {activeCategory !== 'all' && ` in ${categories.find(c => c.id === activeCategory)?.name}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.25rem',
                padding: '0.3rem 0.6rem',
                borderRadius: '6px',
                border: '1px solid rgba(200,150,62,0.3)',
                background: 'rgba(200,150,62,0.06)',
                color: 'var(--color-primary)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <X size={10} /> Clear filters
            </button>
          )}
        </div>

        <RecentlyViewedBar />

        {viewMode === 'grid' ? (
          <ProductGrid
            products={filtered}
            emptyMessage={searchQuery ? `No results for "${searchQuery}". Try a different search.` : 'No products in this category yet.'}
          />
        ) : (
          <ProductListView
            products={filtered}
            emptyMessage={searchQuery ? `No results for "${searchQuery}". Try a different search.` : 'No products in this category yet.'}
          />
        )}
      </div>
    </div>
  );
}
