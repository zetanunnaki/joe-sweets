'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Post {
  slug: string; title: string; excerpt: string;
  date: string; image: string; category: string; readTime: string;
}

export default function BlogCard({ post, index = 0 }: { post: Post; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
    >
      <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
        <article
          style={{ backgroundColor: 'var(--color-white)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 24px rgba(44,24,16,0.08)', height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 220ms, box-shadow 220ms', border: '1px solid rgba(200,150,62,0.06)' }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = 'translateY(-5px)';
            (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(44,24,16,0.16)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(44,24,16,0.08)';
          }}
        >
          {/* Image */}
          <div style={{ position: 'relative', height: '210px', overflow: 'hidden', flexShrink: 0 }}>
            <Image src={post.image} alt={post.title} fill style={{ objectFit: 'cover', transition: 'transform 400ms' }} sizes="(max-width: 768px) 100vw, 33vw" />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 60%, rgba(44,24,16,0.6))' }} />
            {/* Category pill */}
            <div style={{ position: 'absolute', top: '0.875rem', left: '0.875rem', background: 'linear-gradient(135deg, var(--color-primary), #A67A2E)', color: 'white', padding: '0.2rem 0.7rem', borderRadius: '999px', fontSize: '0.72rem', fontWeight: 600, fontFamily: 'var(--font-body)', letterSpacing: '0.04em' }}>
              {post.category}
            </div>
          </div>
          {/* Content */}
          <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)', margin: '0 0 0.625rem', fontFamily: 'var(--font-body)' }}>
              {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              <span style={{ margin: '0 0.4rem', opacity: 0.5 }}>·</span>
              {post.readTime}
            </p>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--color-secondary)', margin: '0 0 0.625rem', lineHeight: 1.35 }}>{post.title}</h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--color-muted)', margin: '0 0 1rem', lineHeight: 1.65, flex: 1 }}>{post.excerpt}</p>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-primary)' }}>
              Read more →
            </span>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
