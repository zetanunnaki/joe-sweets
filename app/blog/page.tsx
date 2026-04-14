import { motion } from 'framer-motion';
import type { Metadata } from 'next';
import { EgyptianDivider } from '@/components/ui/EgyptianDivider';
import BlogCard from './BlogCard';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Egyptian food stories, recipes, and culture from the Joe Sweets kitchen.',
};

const posts = [
  {
    slug: 'history-of-baklava',
    title: 'The Rich History of Egyptian Baklava',
    excerpt: "From ancient Ottoman kitchens to modern DMV tables — the story of Egypt's most iconic sweet.",
    date: '2026-03-20',
    image: 'https://placehold.co/600x360/C8963E/FFFFFF?text=Baklava+History',
    category: 'Culture',
    readTime: '5 min read',
  },
  {
    slug: 'kunafa-guide',
    title: "Kunafa: A Complete Guide to Egypt's Golden Dessert",
    excerpt: "Everything you need to know about kunafa — its origins, varieties, and why ours is made fresh daily.",
    date: '2026-03-28',
    image: 'https://placehold.co/600x360/D44D4D/FFFFFF?text=Kunafa+Guide',
    category: 'Guide',
    readTime: '7 min read',
  },
  {
    slug: 'ramadan-sweets',
    title: 'Ramadan Sweets: A DMV Community Tradition',
    excerpt: 'How Egyptian sweets became a beloved part of Ramadan celebrations across the Washington DC metro area.',
    date: '2026-04-02',
    image: 'https://placehold.co/600x360/A67A2E/FFFFFF?text=Ramadan+Sweets',
    category: 'Culture',
    readTime: '4 min read',
  },
];

export default function BlogPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)', paddingBottom: '5rem' }}>
      {/* Header */}
      <div className="page-hero-dark" style={{ paddingTop: 'calc(3.5rem + 72px)' }}>
        <p style={{ fontFamily: 'var(--font-script)', fontSize: '1.3rem', color: 'var(--color-primary)', marginBottom: '0.5rem', marginTop: 0 }}>
          Stories &amp; Recipes
        </p>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--color-white)', margin: '0 0 1.5rem' }}>
          Joe Sweets Blog
        </h1>
        <EgyptianDivider color="var(--color-primary)" />
        <p style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,249,240,0.65)', marginTop: '1rem', fontSize: '0.95rem', maxWidth: '480px', margin: '1rem auto 0' }}>
          Dive into the rich world of Egyptian cuisine — history, culture, and kitchen secrets
        </p>
      </div>

      <div style={{ maxWidth: '1000px', margin: '3.5rem auto 0', padding: '0 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }} className="blog-grid">
          {posts.map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
