import { getProductBySlug, getAllProductSlugs, getRelatedProducts } from '@/lib/products';
import { getReviewsBySlug } from '@/lib/reviews';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ProductDetailClient } from './ProductDetailClient';
import { RelatedProducts } from '@/components/product/RelatedProducts';
import { RecentlyViewed, RecentlyViewedTracker } from '@/components/product/RecentlyViewed';
import { ReviewsSection } from '@/components/product/ReviewsSection';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { JsonLd } from '@/components/ui/JsonLd';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      images: [{ url: product.images[0] }],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product, 4);
  const reviews = getReviewsBySlug(product.slug);

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images,
    offers: product.variants.map((v) => ({
      '@type': 'Offer',
      price: v.price,
      priceCurrency: 'USD',
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: { '@type': 'Organization', name: 'Joe Sweets' },
    })),
    aggregateRating: product.reviewCount > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    } : undefined,
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)', padding: '2.5rem 1.5rem 4rem' }}>
      <JsonLd data={productJsonLd} />
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <Breadcrumb crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Menu', href: '/menu' },
          { label: product.category.charAt(0).toUpperCase() + product.category.slice(1), href: `/menu/${product.category}` },
          { label: product.name },
        ]} />
        <RecentlyViewedTracker slug={product.slug} />
        <ProductDetailClient product={product} />
        <ReviewsSection reviews={reviews} rating={product.rating} reviewCount={product.reviewCount} productSlug={product.slug} />
        <RelatedProducts products={related} />
        <RecentlyViewed currentSlug={product.slug} />
      </div>
    </div>
  );
}
