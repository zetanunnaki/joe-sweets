import fs from 'fs';
import path from 'path';
import { Order } from '@/types';

const ordersPath = path.join(process.cwd(), 'data', 'orders.json');

export function getOrders(): Order[] {
  const raw = fs.readFileSync(ordersPath, 'utf-8');
  return JSON.parse(raw) as Order[];
}

export function saveOrder(order: Order): void {
  const orders = getOrders();
  orders.push(order);
  fs.writeFileSync(ordersPath, JSON.stringify(orders, null, 2), 'utf-8');
}

export function generateOrderId(): string {
  const date = new Date();
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
  const orders = getOrders();
  const todayOrders = orders.filter((o) => o.id.startsWith(`ORD-${dateStr}`));
  const seq = String(todayOrders.length + 1).padStart(3, '0');
  return `ORD-${dateStr}-${seq}`;
}
