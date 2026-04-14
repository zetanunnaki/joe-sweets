'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { EgyptianDivider } from '@/components/ui/EgyptianDivider';
import { SectionReveal } from '@/components/ui/SectionReveal';
import { Users, Calendar, Star, Gift, CheckCircle } from 'lucide-react';

const features = [
  { icon: Users, title: 'Any Group Size', desc: 'From intimate gatherings of 10 to large events of 500+ — we scale to your needs.' },
  { icon: Calendar, title: 'Advance Booking', desc: "Book 3+ days ahead for custom orders. Last-minute? We'll try our best." },
  { icon: Star, title: 'Custom Menus', desc: "Mix and match from our full menu. We'll curate the perfect spread for your event." },
  { icon: Gift, title: 'Gift Packaging', desc: 'Beautiful branded presentation for every dish — we make events memorable.' },
];

const eventTypes = [
  { emoji: '💒', label: 'Wedding' },
  { emoji: '🎂', label: 'Birthday Party' },
  { emoji: '🌙', label: 'Eid Celebration' },
  { emoji: '💼', label: 'Corporate Event' },
  { emoji: '👶', label: 'Baby Shower' },
  { emoji: '✨', label: 'Other' },
];

export default function CateringPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', eventDate: '', eventType: '', guestCount: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const subject = `Catering Inquiry — ${form.eventType} for ${form.guestCount} guests`;
      const message = `Event Type: ${form.eventType}\nGuest Count: ${form.guestCount}\nEvent Date: ${form.eventDate}\nPhone: ${form.phone}\n\n${form.message}`;
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, subject, message }),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', phone: '', eventDate: '', eventType: '', guestCount: '', message: '' });
      } else {
        const data = await res.json();
        setStatus('error');
        setErrorMsg(data.error || 'Failed to send inquiry.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please try again.');
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)', paddingBottom: '5rem' }}>
      {/* Header */}
      <div className="page-hero-dark" style={{ paddingTop: 'calc(3.5rem + 72px)' }}>
        <motion.p
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          style={{ fontFamily: 'var(--font-script)', fontSize: '1.3rem', color: 'var(--color-primary)', marginBottom: '0.5rem', marginTop: 0 }}
        >
          For Your Special Events
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.12 }}
          style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--color-white)', margin: '0 0 0.75rem' }}
        >
          Catering Services
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }}
          style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,249,240,0.7)', fontSize: '1rem', maxWidth: '520px', margin: '0 auto 1.5rem' }}
        >
          Bring authentic Egyptian flavors to your wedding, Eid celebration, corporate event, or birthday party.
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <EgyptianDivider color="var(--color-primary)" />
        </motion.div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Feature cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', margin: '3.5rem 0' }}>
          {features.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              style={{ backgroundColor: 'var(--color-white)', borderRadius: '14px', padding: '1.75rem', boxShadow: '0 4px 24px rgba(44,24,16,0.07)', textAlign: 'center', border: '1px solid rgba(200,150,62,0.08)' }}
            >
              <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(200,150,62,0.18), rgba(200,150,62,0.06))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <Icon size={22} color="var(--color-primary)" />
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: 'var(--color-secondary)', margin: '0 0 0.5rem' }}>{title}</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--color-muted)', margin: 0, lineHeight: 1.65 }}>{desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Event types */}
        <SectionReveal>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', color: 'var(--color-secondary)', margin: '0 0 0.5rem' }}>
              We Cater All Occasions
            </h2>
            <EgyptianDivider />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center', marginTop: '1.75rem' }}>
              {eventTypes.map((et) => (
                <div key={et.label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 1.25rem', backgroundColor: 'var(--color-white)', borderRadius: '50px', border: '1.5px solid rgba(200,150,62,0.2)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--color-secondary)', fontWeight: 500 }}>
                  <span>{et.emoji}</span> {et.label}
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>

        {/* Quote form */}
        <SectionReveal>
          <div style={{ backgroundColor: 'var(--color-white)', borderRadius: '20px', padding: 'clamp(1.5rem, 4vw, 2.5rem)', boxShadow: '0 8px 40px rgba(44,24,16,0.08)', border: '1px solid rgba(200,150,62,0.08)' }}>
            {/* Gold top accent */}
            <div style={{ height: '3px', background: 'linear-gradient(90deg, transparent, var(--color-primary), #f0c060, var(--color-primary), transparent)', borderRadius: '999px', marginBottom: '2rem' }} />
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--color-secondary)', margin: '0 0 1.75rem' }}>Request a Catering Quote</h2>

            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ backgroundColor: '#dcfce7', border: '1px solid #22c55e', borderRadius: '12px', padding: '2rem', textAlign: 'center' }}
              >
                <CheckCircle size={44} color="#15803d" style={{ marginBottom: '0.875rem' }} />
                <p style={{ margin: 0, fontWeight: 600, color: '#15803d', fontFamily: 'var(--font-body)', fontSize: '1rem' }}>
                  Inquiry received! We&apos;ll contact you within 24 hours to discuss your event.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row-2">
                  <Input label="Your Name" value={form.name} onChange={(e) => update('name', e.target.value)} required placeholder="Jane Smith" />
                  <Input label="Email" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} required placeholder="you@email.com" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row-2">
                  <Input label="Phone" type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} required placeholder="+1 (202) 555-0100" />
                  <Input label="Event Date" type="date" value={form.eventDate} onChange={(e) => update('eventDate', e.target.value)} required />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row-2">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    <label style={{ fontWeight: 500, fontSize: '0.875rem', color: 'var(--color-secondary)', fontFamily: 'var(--font-body)' }}>
                      Event Type <span style={{ color: 'var(--color-accent)' }}>*</span>
                    </label>
                    <select value={form.eventType} onChange={(e) => update('eventType', e.target.value)} required
                      style={{ padding: '0.625rem 0.875rem', borderRadius: '8px', border: '2px solid #e2d9cf', backgroundColor: 'var(--color-white)', color: 'var(--color-secondary)', fontFamily: 'var(--font-body)', fontSize: '1rem', outline: 'none' }}>
                      <option value="">Select type</option>
                      {eventTypes.map((t) => <option key={t.label} value={t.label}>{t.emoji} {t.label}</option>)}
                    </select>
                  </div>
                  <Input label="Guest Count" type="number" value={form.guestCount} onChange={(e) => update('guestCount', e.target.value)} required placeholder="e.g. 50" min="1" />
                </div>
                <Textarea label="Additional Details" value={form.message} onChange={(e) => update('message', e.target.value)} placeholder="Tell us about your vision — preferred dishes, dietary restrictions, theme…" />
                {status === 'error' && <p style={{ color: 'var(--color-accent)', fontSize: '0.875rem', margin: 0 }}>{errorMsg}</p>}
                <Button type="submit" variant="primary" size="lg" loading={status === 'loading'} fullWidth>Send Catering Inquiry</Button>
              </form>
            )}
          </div>
        </SectionReveal>
      </div>
    </div>
  );
}
