import { ProductForm } from '../ProductForm';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'New Product' };

export default function NewProductPage() {
  return (
    <div style={{ maxWidth: '760px' }}>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--color-secondary)', marginBottom: '1.5rem', marginTop: 0 }}>Add New Product</h2>
      <ProductForm mode="create" />
    </div>
  );
}
