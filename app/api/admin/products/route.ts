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

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json(readProducts());
}

export async function POST(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body: Product = await req.json();

  if (!body.id || !body.name || !body.slug) {
    return NextResponse.json({ error: 'id, name, and slug are required' }, { status: 400 });
  }

  const products = readProducts();

  if (products.some(p => p.id === body.id)) {
    return NextResponse.json({ error: 'Product with this ID already exists' }, { status: 409 });
  }

  products.push(body);
  writeProducts(products);

  return NextResponse.json(body, { status: 201 });
}
