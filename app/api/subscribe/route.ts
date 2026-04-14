import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Subscriber } from '@/types';

const subscribersPath = path.join(process.cwd(), 'data', 'subscribers.json');

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const raw = fs.readFileSync(subscribersPath, 'utf-8');
    const subscribers: Subscriber[] = JSON.parse(raw);

    // Prevent duplicates
    if (subscribers.some((s) => s.email === email)) {
      return NextResponse.json({ message: 'Already subscribed' });
    }

    subscribers.push({ email, subscribedAt: new Date().toISOString() });
    fs.writeFileSync(subscribersPath, JSON.stringify(subscribers, null, 2));

    return NextResponse.json({ message: 'Subscribed successfully' });
  } catch (err) {
    console.error('Subscribe error:', err);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}
