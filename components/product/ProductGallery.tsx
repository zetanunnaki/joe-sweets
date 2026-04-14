'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  function prev() { setActiveIndex((i) => (i - 1 + images.length) % images.length); }
  function next() { setActiveIndex((i) => (i + 1) % images.length); }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {/* Main image */}
        <div
          style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', aspectRatio: '4/3', backgroundColor: 'var(--color-bg-alt)', cursor: 'zoom-in', boxShadow: '0 8px 32px rgba(44,24,16,0.1)' }}
          onClick={() => setLightbox(true)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ position: 'absolute', inset: 0 }}
            >
              <Image
                src={images[activeIndex]}
                alt={`${productName} — image ${activeIndex + 1}`}
                fill
                priority={activeIndex === 0}
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </AnimatePresence>

          {/* Zoom hint */}
          <div style={{ position: 'absolute', top: '0.875rem', right: '0.875rem', width: '32px', height: '32px', backgroundColor: 'rgba(44,24,16,0.5)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
            <ZoomIn size={15} color="white" />
          </div>

          {/* Navigation arrows for multiple images */}
          {images.length > 1 && (
            <>
              <button onClick={(e) => { e.stopPropagation(); prev(); }}
                style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(44,24,16,0.5)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white', backdropFilter: 'blur(4px)' }}>
                <ChevronLeft size={18} />
              </button>
              <button onClick={(e) => { e.stopPropagation(); next(); }}
                style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(44,24,16,0.5)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white', backdropFilter: 'blur(4px)' }}>
                <ChevronRight size={18} />
              </button>
            </>
          )}

          {/* Dot indicators */}
          {images.length > 1 && (
            <div style={{ position: 'absolute', bottom: '0.875rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '0.375rem' }}>
              {images.map((_, i) => (
                <button key={i} onClick={(e) => { e.stopPropagation(); setActiveIndex(i); }}
                  style={{ width: i === activeIndex ? '20px' : '6px', height: '6px', borderRadius: '3px', background: i === activeIndex ? 'var(--color-primary)' : 'rgba(255,255,255,0.5)', border: 'none', cursor: 'pointer', padding: 0, transition: 'width 200ms' }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {images.map((src, i) => (
              <button key={i} onClick={() => setActiveIndex(i)}
                style={{ width: '72px', height: '72px', borderRadius: '10px', overflow: 'hidden', border: `2px solid ${i === activeIndex ? 'var(--color-primary)' : 'rgba(200,150,62,0.15)'}`, padding: 0, cursor: 'pointer', flexShrink: 0, position: 'relative', transition: 'border-color 200ms', boxShadow: i === activeIndex ? '0 0 0 3px rgba(200,150,62,0.2)' : 'none' }}
                aria-label={`View image ${i + 1}`}
              >
                <Image src={src} alt={`Thumbnail ${i + 1}`} fill style={{ objectFit: 'cover' }} sizes="72px" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(false)}
            style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.92)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', cursor: 'zoom-out' }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              style={{ position: 'relative', width: '100%', maxWidth: '800px', aspectRatio: '4/3', borderRadius: '12px', overflow: 'hidden' }}
            >
              <Image src={images[activeIndex]} alt={productName} fill style={{ objectFit: 'contain' }} sizes="800px" />
              {images.length > 1 && (
                <>
                  <button onClick={prev} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white' }}>
                    <ChevronLeft size={22} />
                  </button>
                  <button onClick={next} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white' }}>
                    <ChevronRight size={22} />
                  </button>
                </>
              )}
            </motion.div>
            <button onClick={() => setLightbox(false)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '8px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white', fontSize: '1.2rem', fontWeight: 700 }}>✕</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
