import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface StockNotification {
  email: string;
  productId: string;
  productName: string;
  createdAt: string;
}

const filePath = path.join(process.cwd(), 'data', 'stock-notifications.json');

function readNotifications(): StockNotification[] {
  try {
    if (!fs.existsSync(filePath)) return [];
    return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as StockNotification[];
  } catch {
    return [];
  }
}

function writeNotifications(data: StockNotification[]): void {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function POST(req: NextRequest) {
  try {
    const { email, productId, productName } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }
    if (!productId) {
      return NextResponse.json({ error: 'Missing product ID.' }, { status: 400 });
    }

    const existing = readNotifications();

    const isDuplicate = existing.some(
      (n) => n.email.toLowerCase() === email.toLowerCase() && n.productId === productId
    );

    if (!isDuplicate) {
      existing.push({
        email: email.toLowerCase().trim(),
        productId,
        productName: productName || productId,
        createdAt: new Date().toISOString(),
      });
      writeNotifications(existing);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}
