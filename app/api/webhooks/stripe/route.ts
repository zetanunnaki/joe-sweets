import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature') ?? '';
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET ?? '';

  if (!webhookSecret) {
    return NextResponse.json({ received: true });
  }

  try {
    const event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    // Handle payment_intent.succeeded if needed for additional order updates
    if (event.type === 'payment_intent.succeeded') {
      console.log('Payment succeeded:', event.data.object.id);
    }
    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Webhook error:', err);
    return NextResponse.json({ error: 'Webhook signature failed' }, { status: 400 });
  }
}
