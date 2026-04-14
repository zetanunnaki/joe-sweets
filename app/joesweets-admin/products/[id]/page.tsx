import { notFound } from 'next/navigation';
import { ProductForm } from '../ProductForm';
import type { Metadata } from 'next';
import productsData from '@/data/products.json';
import { Product } from '@/types';

interface Props { params: Promise<{ id: string }> }

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  const products = productsData as Product[];
  const product = products.find(p => p.id === id);
  if (!product) notFound();

  return (
    <div style={{ maxWidth: '760px' }}>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--color-secondary)', marginBottom: '1.5rem', marginTop: 0 }}>
        Edit: {product.name}
      </h2>
      <ProductForm mode="edit" initial={product} />
    </div>
  );
}
