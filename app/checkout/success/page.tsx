'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { EgyptianDivider } from '@/components/ui/EgyptianDivider';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '12025550000';

function SuccessContent() {
  const params = useSearchParams();
  const orderId = params.get('orderId');
  const total = params.get('total');
  const whatsappMsg = encodeURIComponent(`Hi Joe Sweets! I just placed order ${orderId} and wanted to confirm receipt.`);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`;

  return (
    <div style={{
      minHeight: '100vh', backgroundColor: 'var(--color-secondary)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem 1.5rem',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Star pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cg fill='none' stroke='%23C8963E' stroke-width='0.5' opacity='0.06'%3E%3Cpolygon points='24,4 28,14 38,14 30,20 33,30 24,24 15,30 18,20 10,14 20,14'/%3E%3C/g%3E%3C/svg%3E\")",
        backgroundRepeat: 'repeat', pointerEvents: 'none',
      }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          backgroundColor: 'var(--color-white)', borderRadius: '24px',
          padding: 'clamp(2rem, 6vw, 3.5rem)',
          boxShadow: '0 24px 80px rgba(0,0,0,0.3)',
          maxWidth: '540px', width: '100%',
          textAlign: 'center', position: 'relative',
        }}
      >
        {/* Gold top accent */}
        <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: '3px', background: 'linear-gradient(90deg, transparent, var(--color-primary), #f0c060, var(--color-primary), transparent)', borderRadius: '0 0 4px 4px' }} />

        {/* Animated check icon */}
        <div style={{ position: 'relative', width: '88px', height: '88px', margin: '0 auto 1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="success-ring" />
          <div className="success-ring" />
          <div className="success-ring" />
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.2, type: 'spring', bounce: 0.4 }}
            style={{
              width: '72px', height: '72px', borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--color-primary), #A67A2E)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
            }}
          >
            <CheckCircle size={36} color="white" strokeWidth={2} />
          </motion.div>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.45 }}
          style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 5vw, 2.25rem)', color: 'var(--color-secondary)', marginBottom: '0.5rem', marginTop: 0 }}
        >
          Order Confirmed!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          style={{ fontFamily: 'var(--font-script)', fontSize: '1.2rem', color: 'var(--color-primary)', marginBottom: '1.25rem', marginTop: 0 }}
        >
          Making life sweeter, one order at a time
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <EgyptianDivider />
        </motion.div>

        {orderId && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            style={{ margin: '1.5rem 0' }}
          >
            <div style={{ background: 'linear-gradient(135deg, var(--color-primary), #A67A2E)', borderRadius: '12px', padding: '1.25rem' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'rgba(255,255,255,0.8)', margin: '0 0 0.3rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Order Number</p>
              <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'white', margin: 0, fontWeight: 700, letterSpacing: '0.05em' }}>{orderId}</p>
              {total && (
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'rgba(255,255,255,0.9)', fontWeight: 600, margin: '0.4rem 0 0' }}>
                  Total Charged: ${parseFloat(total).toFixed(2)}
                </p>
              )}
            </div>
          </motion.div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
          style={{ fontFamily: 'var(--font-body)', fontSize: '0.92rem', color: 'var(--color-muted)', lineHeight: 1.7, margin: '0 0 2rem' }}
        >
          We&apos;re preparing your food fresh and will deliver it on your chosen date.
          A confirmation email has been sent to you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}
        >
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              padding: '1rem', backgroundColor: '#25D366', color: 'white',
              borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
              fontFamily: 'var(--font-body)', fontSize: '0.95rem',
              boxShadow: '0 4px 16px rgba(37,211,102,0.3)',
            }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Track via WhatsApp
          </a>
          <Link href="/menu" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
            padding: '1rem',
            background: 'linear-gradient(135deg, var(--color-primary), #A67A2E)',
            color: 'var(--color-white)', borderRadius: '12px',
            textDecoration: 'none', fontWeight: 600,
            fontFamily: 'var(--font-body)', fontSize: '0.95rem',
          }}>
            Continue Shopping <ArrowRight size={16} />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', backgroundColor: 'var(--color-secondary)' }} />}>
      <SuccessContent />
    </Suspense>
  );
}
