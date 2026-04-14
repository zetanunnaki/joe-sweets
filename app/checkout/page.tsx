'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useCartItems, useCartSubtotal, useCartStore } from '@/store/cart';
import { StepIndicator } from '@/components/checkout/StepIndicator';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { StripeCardInput } from '@/components/checkout/StripeCardInput';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || '');

interface CustomerInfo {
  name: string; email: string; phone: string;
  address: string; city: string; state: string; zip: string;
  deliveryDate: string; specialInstructions: string;
}
const INITIAL_INFO: CustomerInfo = { name: '', email: '', phone: '', address: '', city: '', state: '', zip: '', deliveryDate: '', specialInstructions: '' };
const DELIVERY_ZONES = ['Washington DC', 'Maryland', 'Virginia'];
const STEPS = ['Contact', 'Delivery', 'Payment'];

function getDateRange() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const max = new Date();
  max.setDate(max.getDate() + 7);
  return { min: tomorrow.toISOString().split('T')[0], max: max.toISOString().split('T')[0] };
}

/* ── Inner form that uses Stripe hooks ───────────────────────── */
function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const items = useCartItems();
  const subtotal = useCartSubtotal();
  const { clearCart } = useCartStore();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [info, setInfo] = useState<CustomerInfo>(INITIAL_INFO);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dateRange = getDateRange();

  function update(field: keyof CustomerInfo, value: string) {
    setInfo((prev) => ({ ...prev, [field]: value }));
  }

  const validateStep1 = () => info.name.trim() && info.email.includes('@') && info.phone.trim().length >= 7;
  const validateStep2 = () => info.address.trim() && info.city.trim() && info.state.trim() && info.zip.trim() && info.deliveryDate;

  async function handlePlaceOrder(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;
    const card = elements.getElement(CardElement);
    if (!card) { setError('Card details missing.'); return; }

    setLoading(true);
    setError('');

    try {
      // 1. Create PaymentIntent + save order on server
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, customer: info }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Checkout failed.'); setLoading(false); return; }

      // 2. Confirm payment with real card via Stripe
      const { error: stripeError } = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card,
          billing_details: { name: info.name, email: info.email, phone: info.phone },
        },
      });

      if (stripeError) {
        setError(stripeError.message || 'Payment failed. Please try again.');
        setLoading(false);
        return;
      }

      clearCart();
      router.push(`/checkout/success?orderId=${data.orderId}&total=${data.total}`);
    } catch {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  }

  if (items.length === 0 && step < 3) {
    return (
      <div style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', padding: '4rem 1.5rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--color-secondary)' }}>Your cart is empty</h1>
        <Link href="/menu"><Button variant="primary">Browse Menu</Button></Link>
      </div>
    );
  }

  const sectionStyle: React.CSSProperties = {
    backgroundColor: 'var(--color-white)', borderRadius: '12px',
    padding: 'clamp(1.25rem, 4vw, 2rem)', boxShadow: '0 4px 24px rgba(44,24,16,0.08)',
  };
  const inputRow: React.CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)', padding: '2.5rem 1.5rem 4rem' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', color: 'var(--color-secondary)', marginBottom: '2rem', marginTop: 0, textAlign: 'center' }}>
          Checkout
        </h1>
        <StepIndicator currentStep={step} steps={STEPS} />

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 320px', gap: '2rem', alignItems: 'start' }} className="checkout-layout">
          <div>
            {/* Step 1 */}
            {step === 1 && (
              <div style={sectionStyle}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: 'var(--color-secondary)', margin: '0 0 1.5rem' }}>Contact Information</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <Input label="Full Name" value={info.name} onChange={(e) => update('name', e.target.value)} required placeholder="Your full name" />
                  <div className="checkout-input-row" style={inputRow}>
                    <Input label="Email" type="email" value={info.email} onChange={(e) => update('email', e.target.value)} required placeholder="you@email.com" />
                    <Input label="Phone" type="tel" value={info.phone} onChange={(e) => update('phone', e.target.value)} required placeholder="+1 (202) 555-0100" />
                  </div>
                  <Button variant="primary" size="lg" fullWidth onClick={() => validateStep1() && setStep(2)} disabled={!validateStep1()}>
                    Continue to Delivery →
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div style={sectionStyle}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: 'var(--color-secondary)', margin: '0 0 1.5rem' }}>Delivery Details</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <Input label="Street Address" value={info.address} onChange={(e) => update('address', e.target.value)} required placeholder="123 Main Street" />
                  <div className="checkout-input-row" style={inputRow}>
                    <Input label="City" value={info.city} onChange={(e) => update('city', e.target.value)} required placeholder="Washington DC" />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                      <label style={{ fontWeight: 500, fontSize: '0.875rem', color: 'var(--color-secondary)', fontFamily: 'var(--font-body)' }}>
                        State <span style={{ color: 'var(--color-accent)' }}>*</span>
                      </label>
                      <select value={info.state} onChange={(e) => update('state', e.target.value)} required
                        style={{ padding: '0.625rem 0.875rem', borderRadius: '8px', border: '2px solid #e2d9cf', backgroundColor: 'var(--color-white)', color: 'var(--color-secondary)', fontFamily: 'var(--font-body)', fontSize: '1rem', outline: 'none' }}>
                        <option value="">Select state</option>
                        {DELIVERY_ZONES.map((z) => <option key={z} value={z}>{z}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="checkout-input-row" style={inputRow}>
                    <Input label="ZIP Code" value={info.zip} onChange={(e) => update('zip', e.target.value)} required placeholder="20001" />
                    <Input label="Delivery Date" type="date" value={info.deliveryDate} onChange={(e) => update('deliveryDate', e.target.value)} required min={dateRange.min} max={dateRange.max} />
                  </div>
                  <Textarea label="Special Instructions" value={info.specialInstructions} onChange={(e) => update('specialInstructions', e.target.value)} placeholder="Allergies, access instructions, gift message…" />
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <Button variant="outline" onClick={() => setStep(1)}>← Back</Button>
                    <Button variant="primary" size="lg" style={{ flex: 1 }} onClick={() => validateStep2() && setStep(3)} disabled={!validateStep2()}>
                      Continue to Payment →
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3 — Real Stripe Elements */}
            {step === 3 && (
              <form onSubmit={handlePlaceOrder}>
                <div style={sectionStyle}>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: 'var(--color-secondary)', margin: '0 0 1.5rem' }}>Payment</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {/* Trust badges */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', padding: '0.875rem 1rem', backgroundColor: 'var(--color-bg-alt)', borderRadius: '8px', border: '1px solid rgba(200,150,62,0.15)' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                      <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}>
                        256-bit SSL encryption · Secured by Stripe · Card details never stored
                      </p>
                    </div>

                    <StripeCardInput />

                    {error && (
                      <div style={{ padding: '0.75rem 1rem', backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px' }}>
                        <p style={{ color: 'var(--color-accent)', fontSize: '0.875rem', margin: 0 }}>{error}</p>
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.25rem' }}>
                      <Button type="button" variant="outline" onClick={() => setStep(2)}>← Back</Button>
                      <Button type="submit" variant="primary" size="lg" loading={loading} disabled={!stripe} style={{ flex: 1 }}>
                        {loading ? 'Processing…' : `Pay ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format((subtotal >= 50 ? subtotal : subtotal + 5))}`}
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>

          <div style={{ position: 'sticky', top: '80px' }}>
            <OrderSummary items={items} subtotal={subtotal} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Page wrapper with Stripe provider ───────────────────────── */
export default function CheckoutPage() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
