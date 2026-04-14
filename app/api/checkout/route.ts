import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getProductBySlug } from '@/lib/products';
import { saveOrder, generateOrderId } from '@/lib/orders';
import { sendOrderNotifications } from '@/lib/email';
import { CartItem, Order } from '@/types';

interface CheckoutBody {
  items: CartItem[];
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    deliveryDate: string;
    specialInstructions?: string;
  };
}

export async function POST(req: NextRequest) {
  try {
    const body: CheckoutBody = await req.json();
    const { items, customer } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    // Validate items against product catalog (prevent price tampering)
    let subtotal = 0;
    const orderItems = [];
    for (const item of items) {
      const product = getProductBySlug(item.productId);
      if (!product) {
        return NextResponse.json({ error: `Product not found: ${item.productId}` }, { status: 400 });
      }
      const variant = product.variants.find((v) => v.id === item.variantId);
      if (!variant) {
        return NextResponse.json({ error: `Variant not found: ${item.variantId}` }, { status: 400 });
      }
      subtotal += variant.price * item.qty;
      orderItems.push({ productId: item.productId, variantId: item.variantId, qty: item.qty });
    }

    const deliveryFee = subtotal >= 50 ? 0 : 5;
    const total = subtotal + deliveryFee;
    const amountInCents = Math.round(total * 100);

    // Create Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'usd',
      metadata: {
        customerName: customer.name,
        customerEmail: customer.email,
      },
      receipt_email: customer.email,
    });

    // Save order
    const orderId = generateOrderId();
    const order: Order = {
      id: orderId,
      items: orderItems,
      customer,
      total,
      stripePaymentId: paymentIntent.id,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };
    saveOrder(order);

    // Send email notifications (non-blocking — won't fail the order if email fails)
    sendOrderNotifications(order).catch(() => {});

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      orderId,
      total,
    });
  } catch (err) {
    console.error('Checkout error:', err);
    return NextResponse.json({ error: 'Checkout failed. Please try again.' }, { status: 500 });
  }
}
