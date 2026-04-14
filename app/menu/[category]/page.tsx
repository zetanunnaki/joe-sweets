import { getAllCategories, getProductsByCategory, getCategoryById } from '@/lib/products';
import { ProductGrid } from '@/components/product/ProductGrid';
import { EgyptianDivider } from '@/components/ui/EgyptianDivider';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((c) => ({ category: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryById(category);
  if (!cat) return {};
  return {
    title: cat.name,
    description: `Browse our ${cat.name} — ${cat.description}`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = getCategoryById(category);
  if (!cat) notFound();

  const products = getProductsByCategory(category);
  const allCategories = getAllCategories();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)', paddingBottom: '4rem' }}>
      {/* Header */}
      <div className="page-hero-dark" style={{ paddingTop: 'calc(3.5rem + 72px)' }}>
        <p style={{ fontFamily: 'var(--font-script)', fontSize: '1.2rem', color: 'var(--color-primary)', marginBottom: '0.5rem', marginTop: 0 }}>
          {cat.description}
        </p>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--color-white)', margin: '0 0 1.5rem' }}>
          {cat.name}
        </h1>
        <EgyptianDivider color="var(--color-primary)" />
      </div>

      {/* Category pill nav */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem 0' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2.5rem' }}>
          <Link href="/menu" style={{ display: 'inline-flex', alignItems: 'center', padding: '0.5rem 1.1rem', borderRadius: '50px', textDecoration: 'none', border: '1.5px solid rgba(200,150,62,0.25)', color: 'var(--color-muted)', fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 500, transition: 'background 180ms' }}>
            All
          </Link>
          {allCategories.map((c) => (
            <Link
              key={c.id}
              href={`/menu/${c.id}`}
              style={{
                display: 'inline-flex', alignItems: 'center', padding: '0.5rem 1.1rem',
                borderRadius: '50px', textDecoration: 'none', fontFamily: 'var(--font-body)',
                fontSize: '0.85rem', fontWeight: 600,
                ...(c.id === category
                  ? { background: 'linear-gradient(135deg, var(--color-primary), #A67A2E)', color: 'white', border: '1.5px solid transparent' }
                  : { border: '1.5px solid rgba(200,150,62,0.25)', color: 'var(--color-secondary)' }
                ),
              }}
            >
              {c.name}
            </Link>
          ))}
        </div>

        <ProductGrid
          products={products}
          emptyMessage={`No ${cat.name} items available yet. Check back soon!`}
        />
      </div>
    </div>
  );
}
