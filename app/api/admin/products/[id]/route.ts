import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Product } from '@/types';
import { isAdminAuthenticated } from '@/lib/admin-auth';

const productsPath = path.join(process.cwd(), 'data', 'products.json');

function readProducts(): Product[] {
  return JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
}

function writeProducts(products: Product[]): void {
  fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));
}

interface Props { params: Promise<{ id: string }> }

export async function PUT(req: NextRequest, { params }: Props) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body: Partial<Product> = await req.json();
  const products = readProducts();
  const idx = products.findIndex(p => p.id === id);

  if (idx === -1) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  products[idx] = { ...products[idx], ...body, id };
  writeProducts(products);

  return NextResponse.json(products[idx]);
}

export async function DELETE(_req: NextRequest, { params }: Props) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const products = readProducts();
  const idx = products.findIndex(p => p.id === id);

  if (idx === -1) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  products.splice(idx, 1);
  writeProducts(products);

  return NextResponse.json({ ok: true });
}
