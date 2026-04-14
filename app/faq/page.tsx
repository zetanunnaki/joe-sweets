'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { EgyptianDivider } from '@/components/ui/EgyptianDivider';
import { SectionReveal } from '@/components/ui/SectionReveal';

const faqs = [
  {
    question: 'What area do you deliver to?',
    answer: "We currently deliver throughout the DMV area — Washington DC, Maryland, and Virginia. If you're unsure whether we deliver to your specific address, please contact us on WhatsApp.",
  },
  {
    question: 'How fresh is the food?',
    answer: "Everything is made fresh on the day of your order. We don't use preservatives or pre-made batches. Your food is prepared just before delivery.",
  },
  {
    question: 'How far in advance should I order?',
    answer: 'We recommend ordering at least 24–48 hours in advance to guarantee availability and freshness. For large catering orders, please give us 3–5 days notice.',
  },
  {
    question: 'Do you offer customization?',
    answer: 'Yes! Many of our items can be customized — nut-free baklava, specific fillings for qatayef, custom gift box contents, and more. Add your request in the Special Instructions at checkout or contact us directly.',
  },
  {
    question: 'What are your delivery fees?',
    answer: "Delivery is $5 flat. Orders over $50 get free delivery. We'll show you the delivery total at checkout.",
  },
  {
    question: 'Can I pick up my order?',
    answer: "We're currently delivery-only within the DMV area. If you have a special request for pickup, message us on WhatsApp and we'll see what we can arrange.",
  },
  {
    question: 'How do I pay?',
    answer: 'We accept all major credit and debit cards through our secure Stripe checkout. We do not accept cash on delivery.',
  },
  {
    question: 'What if something is wrong with my order?',
    answer: "We stand behind every item we prepare. If there's an issue with your order, please contact us within 2 hours of delivery via WhatsApp or email. We'll make it right.",
  },
  {
    question: 'Do you cater events?',
    answer: 'Absolutely! We love catering weddings, Eid celebrations, birthdays, and corporate events. Visit our Catering page for more details and to request a quote.',
  },
  {
    question: 'Are there vegetarian or vegan options?',
    answer: 'Yes! Many of our items are naturally vegetarian — including our sweets, koshari, foul & falafel, and drinks. Check the tags on each product page for dietary information.',
  },
];

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      style={{ borderBottom: '1px solid rgba(200,150,62,0.12)' }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', textAlign: 'left', padding: '1.4rem 0',
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          gap: '1rem',
        }}
      >
        <span style={{
          fontFamily: 'var(--font-heading)', fontSize: '1.05rem',
          color: open ? 'var(--color-primary)' : 'var(--color-secondary)',
          fontWeight: 600,
          transition: 'color 200ms',
        }}>
          {question}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          style={{ flexShrink: 0, color: 'var(--color-primary)', display: 'flex' }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '0.97rem',
              color: 'var(--color-secondary)', lineHeight: 1.75,
              margin: '0 0 1.4rem', opacity: 0.82,
            }}>
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)', paddingBottom: '5rem' }}>
      {/* Header */}
      <div className="page-hero-dark" style={{ paddingTop: 'calc(3.5rem + 72px)' }}>
        <p style={{ fontFamily: 'var(--font-script)', fontSize: '1.3rem', color: 'var(--color-primary)', marginBottom: '0.5rem', marginTop: 0 }}>Got Questions?</p>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--color-white)', margin: '0 0 1.5rem' }}>
          Frequently Asked Questions
        </h1>
        <EgyptianDivider color="var(--color-primary)" />
      </div>

      <div style={{ maxWidth: '720px', margin: '3.5rem auto 0', padding: '0 1.5rem' }}>
        <div style={{ backgroundColor: 'var(--color-white)', borderRadius: '16px', padding: '0.5rem 2.25rem', boxShadow: '0 8px 40px rgba(44,24,16,0.08)' }}>
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.question} answer={faq.answer} index={i} />
          ))}
        </div>

        {/* Still have questions? */}
        <SectionReveal>
          <div style={{ marginTop: '3rem', textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: 'var(--color-secondary)', marginBottom: '0.5rem', marginTop: 0 }}>
              Still have questions?
            </p>
            <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-muted)', marginBottom: '1.5rem', marginTop: 0 }}>
              We&apos;re happy to help — reach out anytime.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://wa.me/12025550000" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', padding: '0.875rem 1.75rem', backgroundColor: '#25D366', color: 'white', borderRadius: '50px', textDecoration: 'none', fontWeight: 600, fontFamily: 'var(--font-body)', fontSize: '0.95rem', boxShadow: '0 4px 16px rgba(37,211,102,0.3)' }}>
                WhatsApp Us
              </a>
              <Link href="/contact"
                style={{ display: 'inline-flex', alignItems: 'center', padding: '0.875rem 1.75rem', background: 'linear-gradient(135deg, var(--color-primary), #A67A2E)', color: 'var(--color-white)', borderRadius: '50px', textDecoration: 'none', fontWeight: 600, fontFamily: 'var(--font-body)', fontSize: '0.95rem', boxShadow: '0 4px 16px rgba(200,150,62,0.3)' }}>
                Contact Form
              </Link>
            </div>
          </div>
        </SectionReveal>
      </div>
    </div>
  );
}
