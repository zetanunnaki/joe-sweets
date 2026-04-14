import { CartItem } from '@/types';

const FREE_DELIVERY_MIN = 50;
const DELIVERY_FEE = 5;

export function buildWhatsAppOrderMessage(items: CartItem[]): string {
  if (items.length === 0) return "Hi Joe Sweets! I'd like to place an order 🍰";

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const deliveryFee = subtotal >= FREE_DELIVERY_MIN ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  const fmt = (n: number) => `$${n.toFixed(2)}`;

  const lines = items
    .map((item) => `• ${item.name} (${item.variantLabel}) × ${item.qty} — ${fmt(item.price * item.qty)}`)
    .join('\n');

  const deliveryLine = deliveryFee === 0 ? 'Delivery: Free 🎉' : `Delivery: ${fmt(deliveryFee)}`;

  return [
    "Hi Joe Sweets! 🍰 I'd like to place the following order:",
    '',
    lines,
    '',
    `Subtotal: ${fmt(subtotal)}`,
    deliveryLine,
    `*Total: ${fmt(total)}*`,
    '',
    'Please let me know your availability and delivery time. Thank you!',
  ].join('\n');
}

export function buildWhatsAppOrderUrl(items: CartItem[], phoneNumber: string): string {
  const message = buildWhatsAppOrderMessage(items);
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}
