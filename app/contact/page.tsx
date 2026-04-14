'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { EgyptianDivider } from '@/components/ui/EgyptianDivider';
import { SectionReveal } from '@/components/ui/SectionReveal';
import { MapPin, Phone, Mail, Clock, AtSign, CheckCircle } from 'lucide-react';

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '12025550000';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please try again.');
    }
  }

  const contactInfo = [
    { icon: Phone, label: 'Phone', value: '+1-202-555-0100', href: 'tel:+12025550100' },
    { icon: Mail, label: 'Email', value: 'order@joe-sweets.com', href: 'mailto:order@joe-sweets.com' },
    { icon: MapPin, label: 'Area', value: 'DMV — DC, Maryland, Virginia', href: undefined },
    { icon: Clock, label: 'Hours', value: 'Mon–Sat: 9AM – 8PM', href: undefined },
    { icon: AtSign, label: 'Instagram', value: '@joe.sweets_', href: 'https://www.instagram.com/joe.sweets_/' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)', paddingBottom: '5rem' }}>
      {/* Header */}
      <div className="page-hero-dark" style={{ paddingTop: 'calc(3.5rem + 72px)' }}>
        <motion.p
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          style={{ fontFamily: 'var(--font-script)', fontSize: '1.25rem', color: 'var(--color-primary)', marginBottom: '0.5rem', marginTop: 0 }}
        >
          We&apos;d Love to Hear From You
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.12 }}
          style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--color-white)', margin: '0 0 1.5rem' }}
        >
          Contact Us
        </motion.h1>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
          <EgyptianDivider color="var(--color-primary)" />
        </motion.div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '3.5rem auto 0', padding: '0 1.5rem', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '2.5rem', alignItems: 'start' }} className="contact-layout">
        {/* Form */}
        <SectionReveal>
          <div style={{ backgroundColor: 'var(--color-white)', borderRadius: '16px', padding: '2.25rem', boxShadow: '0 8px 40px rgba(44,24,16,0.08)', border: '1px solid rgba(200,150,62,0.08)' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--color-secondary)', margin: '0 0 1.5rem' }}>Send a Message</h2>

            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ backgroundColor: '#dcfce7', border: '1px solid #22c55e', borderRadius: '12px', padding: '2rem', textAlign: 'center' }}
              >
                <CheckCircle size={40} color="#15803d" style={{ marginBottom: '0.875rem' }} />
                <p style={{ margin: 0, fontWeight: 600, color: '#15803d', fontFamily: 'var(--font-body)', fontSize: '1rem' }}>
                  Message sent! We&apos;ll be in touch within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row-2">
                  <Input label="Your Name" value={form.name} onChange={(e) => update('name', e.target.value)} required placeholder="Jane Smith" />
                  <Input label="Email" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} required placeholder="you@email.com" />
                </div>
                <Input label="Subject" value={form.subject} onChange={(e) => update('subject', e.target.value)} placeholder="Order inquiry, catering, feedback…" />
                <Textarea label="Message" value={form.message} onChange={(e) => update('message', e.target.value)} required placeholder="Tell us how we can help you!" />
                {status === 'error' && <p style={{ color: 'var(--color-accent)', fontSize: '0.875rem', margin: 0 }}>{errorMsg}</p>}
                <Button type="submit" variant="primary" size="lg" loading={status === 'loading'} fullWidth>Send Message</Button>
              </form>
            )}
          </div>
        </SectionReveal>

        {/* Contact info sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <SectionReveal>
            <div style={{ backgroundColor: 'var(--color-white)', borderRadius: '16px', padding: '1.75rem', boxShadow: '0 8px 40px rgba(44,24,16,0.08)', border: '1px solid rgba(200,150,62,0.08)' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--color-secondary)', margin: '0 0 1.25rem' }}>Get in Touch</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {contactInfo.map(({ icon: Icon, label, value, href }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.07 }}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}
                  >
                    <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'linear-gradient(135deg, rgba(200,150,62,0.15), rgba(200,150,62,0.08))', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={16} color="var(--color-primary)" />
                    </div>
                    <div>
                      <p style={{ margin: 0, fontSize: '0.72rem', color: 'var(--color-muted)', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</p>
                      {href ? (
                        <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                          style={{ color: 'var(--color-secondary)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, fontFamily: 'var(--font-body)', transition: 'color 180ms' }}
                          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-primary)'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-secondary)'; }}
                        >
                          {value}
                        </a>
                      ) : (
                        <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-secondary)', fontFamily: 'var(--font-body)' }}>{value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </SectionReveal>

          {/* WhatsApp CTA */}
          <SectionReveal>
            <a
              href={`https://wa.me/${WHATSAPP}?text=Hi%20Joe%20Sweets!%20I%27d%20like%20to%20place%20an%20order`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.625rem',
                padding: '1.1rem', backgroundColor: '#25D366', color: 'white', borderRadius: '12px',
                textDecoration: 'none', fontWeight: 600, fontFamily: 'var(--font-body)',
                boxShadow: '0 4px 20px rgba(37,211,102,0.3)',
                transition: 'transform 180ms, box-shadow 180ms',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 28px rgba(37,211,102,0.4)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 20px rgba(37,211,102,0.3)';
              }}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </SectionReveal>
        </div>
      </div>
    </div>
  );
}
