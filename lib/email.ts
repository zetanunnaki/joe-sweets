import { Resend } from 'resend';
import { Order } from '@/types';
import { getAllProducts } from '@/lib/products';
import { formatCurrency } from '@/lib/utils';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = 'Joe Sweets <orders@joe-sweets.com>';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'order@joe-sweets.com';

function getProductInfo(productId: string, variantId: string): { name: string; variantLabel: string; price: number } {
  const products = getAllProducts();
  const product = products.find((p) => p.id === productId || p.slug === productId);
  if (!product) return { name: productId, variantLabel: variantId, price: 0 };
  const variant = product.variants.find((v) => v.id === variantId);
  return { name: product.name, variantLabel: variant?.label ?? variantId, price: variant?.price ?? 0 };
}

function buildItemsTable(order: Order): string {
  const rows = order.items.map((item) => {
    const { name, variantLabel, price } = getProductInfo(item.productId, item.variantId);
    const lineTotal = formatCurrency(price * item.qty);
    return `
      <tr>
        <td style="padding:10px 12px;border-bottom:1px solid #f5ede0;color:#2C1810;font-family:Georgia,serif;">${name}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #f5ede0;color:#8C7A6B;font-size:13px;">${variantLabel}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #f5ede0;text-align:center;color:#2C1810;">${item.qty}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #f5ede0;text-align:right;color:#C8963E;font-weight:700;">${lineTotal}</td>
      </tr>`;
  }).join('');

  return `
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #f5ede0;border-radius:8px;overflow:hidden;margin-top:16px;">
      <thead>
        <tr style="background:#f5ede0;">
          <th style="padding:10px 12px;text-align:left;font-size:12px;color:#8C7A6B;font-family:system-ui;text-transform:uppercase;letter-spacing:0.05em;">Item</th>
          <th style="padding:10px 12px;text-align:left;font-size:12px;color:#8C7A6B;font-family:system-ui;text-transform:uppercase;letter-spacing:0.05em;">Size</th>
          <th style="padding:10px 12px;text-align:center;font-size:12px;color:#8C7A6B;font-family:system-ui;text-transform:uppercase;letter-spacing:0.05em;">Qty</th>
          <th style="padding:10px 12px;text-align:right;font-size:12px;color:#8C7A6B;font-family:system-ui;text-transform:uppercase;letter-spacing:0.05em;">Total</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>`;
}

function emailShell(title: string, body: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#fff9f0;font-family:system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center" style="padding:32px 16px;">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(44,24,16,0.08);">
        <!-- Header -->
        <tr><td style="background:#2C1810;padding:28px 32px;text-align:center;">
          <div style="height:3px;background:linear-gradient(90deg,transparent,#C8963E,#f0c060,#C8963E,transparent);margin-bottom:20px;border-radius:2px;"></div>
          <h1 style="margin:0;font-family:Georgia,serif;font-size:26px;color:#C8963E;letter-spacing:0.02em;">Joe Sweets</h1>
          <p style="margin:6px 0 0;font-size:13px;color:rgba(255,249,240,0.65);font-style:italic;">Making Life Sweeter</p>
        </td></tr>
        <!-- Title -->
        <tr><td style="padding:28px 32px 0;">
          <h2 style="margin:0;font-family:Georgia,serif;font-size:20px;color:#2C1810;">${title}</h2>
          <div style="height:1px;background:linear-gradient(90deg,transparent,#C8963E,transparent);margin:16px 0;"></div>
        </td></tr>
        <!-- Body -->
        <tr><td style="padding:0 32px 32px;">${body}</td></tr>
        <!-- Footer -->
        <tr><td style="background:#f5ede0;padding:20px 32px;text-align:center;">
          <p style="margin:0;font-size:12px;color:#8C7A6B;">Joe Sweets · DMV Area · Washington DC, Maryland &amp; Virginia</p>
          <p style="margin:6px 0 0;font-size:12px;color:#8C7A6B;">Questions? Reply to this email or message us on <a href="https://www.instagram.com/joe.sweets_/" style="color:#C8963E;">Instagram</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/* ── Owner notification email ─────────────────────────────────── */
function buildOwnerEmail(order: Order): string {
  const itemsSubtotal = order.items.reduce((s, i) => {
    const { price } = getProductInfo(i.productId, i.variantId);
    return s + price * i.qty;
  }, 0);
  const deliveryFee = order.total - itemsSubtotal;
  const body = `
    <p style="margin:0 0 16px;color:#2C1810;font-size:15px;">
      A new order has been placed. Here are the details:
    </p>

    <table width="100%" cellpadding="0" cellspacing="0" style="background:#fff9f0;border-radius:10px;padding:16px;margin-bottom:20px;">
      <tr>
        <td style="padding:4px 0;color:#8C7A6B;font-size:13px;width:130px;">Order ID</td>
        <td style="padding:4px 0;color:#2C1810;font-weight:700;font-family:monospace;">${order.id}</td>
      </tr>
      <tr>
        <td style="padding:4px 0;color:#8C7A6B;font-size:13px;">Customer</td>
        <td style="padding:4px 0;color:#2C1810;">${order.customer.name}</td>
      </tr>
      <tr>
        <td style="padding:4px 0;color:#8C7A6B;font-size:13px;">Phone</td>
        <td style="padding:4px 0;color:#2C1810;">${order.customer.phone}</td>
      </tr>
      <tr>
        <td style="padding:4px 0;color:#8C7A6B;font-size:13px;">Email</td>
        <td style="padding:4px 0;color:#2C1810;">${order.customer.email}</td>
      </tr>
      <tr>
        <td style="padding:4px 0;color:#8C7A6B;font-size:13px;">Delivery</td>
        <td style="padding:4px 0;color:#2C1810;">${order.customer.address}, ${order.customer.city}, ${order.customer.state} ${order.customer.zip}</td>
      </tr>
      <tr>
        <td style="padding:4px 0;color:#8C7A6B;font-size:13px;">Date Requested</td>
        <td style="padding:4px 0;color:#2C1810;font-weight:600;">${order.customer.deliveryDate}</td>
      </tr>
      ${order.customer.specialInstructions ? `<tr>
        <td style="padding:4px 0;color:#8C7A6B;font-size:13px;vertical-align:top;">Notes</td>
        <td style="padding:4px 0;color:#2C1810;font-style:italic;">${order.customer.specialInstructions}</td>
      </tr>` : ''}
    </table>

    <h3 style="margin:0 0 4px;font-family:Georgia,serif;color:#2C1810;font-size:15px;">Items Ordered</h3>
    ${buildItemsTable(order)}

    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;">
      <tr>
        <td style="padding:6px 0;color:#8C7A6B;font-size:14px;">Delivery Fee</td>
        <td style="padding:6px 0;text-align:right;color:#2C1810;">${deliveryFee <= 0 ? 'Free' : formatCurrency(deliveryFee)}</td>
      </tr>
      <tr style="border-top:2px solid #f5ede0;">
        <td style="padding:10px 0 0;color:#2C1810;font-weight:700;font-size:16px;font-family:Georgia,serif;">Total</td>
        <td style="padding:10px 0 0;text-align:right;color:#C8963E;font-weight:700;font-size:18px;">${formatCurrency(order.total)}</td>
      </tr>
    </table>

    <div style="margin-top:24px;padding:16px;background:#fff3cd;border-radius:8px;border-left:4px solid #C8963E;">
      <p style="margin:0;font-size:13px;color:#2C1810;font-weight:600;">Action Required</p>
      <p style="margin:6px 0 0;font-size:13px;color:#5a4a3a;">Confirm this order with the customer at <a href="tel:${order.customer.phone}" style="color:#C8963E;">${order.customer.phone}</a> or reply to their email.</p>
    </div>`;

  return emailShell(`New Order #${order.id}`, body);
}

/* ── Customer confirmation email ──────────────────────────────── */
function buildCustomerEmail(order: Order): string {
  const body = `
    <p style="margin:0 0 16px;color:#2C1810;font-size:15px;">
      Thank you, <strong>${order.customer.name.split(' ')[0]}</strong>! Your order has been received and we'll confirm it shortly.
    </p>

    <div style="background:linear-gradient(135deg,#C8963E,#A67A2E);border-radius:10px;padding:20px;text-align:center;margin-bottom:20px;">
      <p style="margin:0 0 4px;font-size:12px;color:rgba(255,255,255,0.8);text-transform:uppercase;letter-spacing:0.08em;">Order Number</p>
      <p style="margin:0;font-size:24px;font-weight:700;color:white;font-family:Georgia,serif;letter-spacing:0.05em;">${order.id}</p>
    </div>

    <table width="100%" cellpadding="0" cellspacing="0" style="background:#fff9f0;border-radius:10px;padding:16px;margin-bottom:20px;">
      <tr>
        <td style="padding:4px 0;color:#8C7A6B;font-size:13px;width:140px;">Delivery Address</td>
        <td style="padding:4px 0;color:#2C1810;">${order.customer.address}, ${order.customer.city}, ${order.customer.state} ${order.customer.zip}</td>
      </tr>
      <tr>
        <td style="padding:4px 0;color:#8C7A6B;font-size:13px;">Requested Date</td>
        <td style="padding:4px 0;color:#2C1810;font-weight:600;">${order.customer.deliveryDate}</td>
      </tr>
      ${order.customer.specialInstructions ? `<tr>
        <td style="padding:4px 0;color:#8C7A6B;font-size:13px;vertical-align:top;">Special Notes</td>
        <td style="padding:4px 0;color:#2C1810;font-style:italic;">${order.customer.specialInstructions}</td>
      </tr>` : ''}
    </table>

    <h3 style="margin:0 0 4px;font-family:Georgia,serif;color:#2C1810;font-size:15px;">Your Order</h3>
    ${buildItemsTable(order)}

    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;">
      <tr style="border-top:2px solid #f5ede0;">
        <td style="padding:10px 0 0;color:#2C1810;font-weight:700;font-size:16px;font-family:Georgia,serif;">Total Charged</td>
        <td style="padding:10px 0 0;text-align:right;color:#C8963E;font-weight:700;font-size:18px;">${formatCurrency(order.total)}</td>
      </tr>
    </table>

    <div style="margin-top:24px;padding:16px;background:#f5ede0;border-radius:8px;text-align:center;">
      <p style="margin:0 0 8px;font-size:13px;color:#2C1810;">Questions about your order?</p>
      <a href="https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hi%20Joe%20Sweets!%20My%20order%20ID%20is%20${order.id}"
         style="display:inline-block;background:#25D366;color:white;padding:10px 20px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">
        Message us on WhatsApp
      </a>
    </div>`;

  return emailShell('Order Confirmed!', body);
}

/* ── Public send functions ────────────────────────────────────── */
export async function sendOrderNotifications(order: Order): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    console.warn('[email] RESEND_API_KEY not set — skipping email notifications');
    return;
  }

  try {
    await Promise.all([
      // Notify owner
      resend.emails.send({
        from: FROM,
        to: [ADMIN_EMAIL],
        subject: `New Order #${order.id} — ${formatCurrency(order.total)} from ${order.customer.name}`,
        html: buildOwnerEmail(order),
      }),
      // Confirm to customer
      resend.emails.send({
        from: FROM,
        to: [order.customer.email],
        subject: `Order Confirmed — Joe Sweets #${order.id}`,
        html: buildCustomerEmail(order),
      }),
    ]);
    console.log(`[email] Notifications sent for order ${order.id}`);
  } catch (err) {
    // Email failure should not fail the order
    console.error('[email] Failed to send notifications:', err);
  }
}
