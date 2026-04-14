import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { EgyptianDivider } from '@/components/ui/EgyptianDivider';
import { ShareButtons } from '@/components/blog/ShareButtons';

const posts: Record<string, { title: string; date: string; content: string; image: string; category: string; readTime: string; excerpt: string }> = {
  'history-of-baklava': {
    title: 'The Rich History of Egyptian Baklava',
    date: '2026-03-20',
    category: 'Culture',
    readTime: '5 min read',
    excerpt: "From ancient Ottoman kitchens to modern DMV tables — the story of Egypt's most iconic sweet.",
    image: 'https://placehold.co/1200x500/C8963E/FFFFFF?text=Baklava+History',
    content: "Baklava has graced Egyptian tables for centuries. Its layers of phyllo dough, honey, and nuts tell a story of trade routes, imperial kitchens, and home bakers who kept the tradition alive across generations.\n\nThe word \"baklava\" itself traces back through Turkish, Persian, and Arabic culinary traditions. Yet Egypt put its own unmistakable stamp on the sweet — lighter on the syrup, heavier on the nuts, with a distinct use of orange blossom water that perfumes the kitchen and lingers on the palate.\n\nAt Joe Sweets, we honor that legacy every time we prepare a fresh tray. Each layer is laid by hand. The honey syrup is poured just after baking, so every bite delivers that signature crunch followed by a yielding, fragrant sweetness.\n\nWhen you taste our baklava, you're tasting history — made fresh, today.",
  },
  'kunafa-guide': {
    title: "Kunafa: A Complete Guide to Egypt's Golden Dessert",
    date: '2026-03-28',
    category: 'Guide',
    readTime: '7 min read',
    excerpt: "Everything you need to know about kunafa — its origins, varieties, and why ours is made fresh daily.",
    image: 'https://placehold.co/1200x500/D44D4D/FFFFFF?text=Kunafa+Guide',
    content: "Kunafa — known across the Arab world by many names — is one of the most beloved desserts in Egyptian cuisine. At its heart: shredded wheat pastry, fresh clotted cream or cheese, and a fragrant orange blossom syrup that ties it all together.\n\nThere are two main styles: the crunchy, cheese-filled \"Na'ameh\" (fine ground pastry) and the \"Khishnah\" (coarse shredded pastry). Egyptian kunafa traditionally uses the fine variety, baked to a deep golden hue and soaked generously in syrup.\n\nThe cheese inside is the soul of the dish — it should be mild, slightly salty, and melt on contact with the warm pastry. We use a blend of fresh mozzarella and akkawi to achieve exactly that balance.\n\nOurs is made fresh daily, to order. No reheating. No compromise.",
  },
  'ramadan-sweets': {
    title: 'Ramadan Sweets: A DMV Community Tradition',
    date: '2026-04-02',
    category: 'Culture',
    readTime: '4 min read',
    excerpt: 'How Egyptian sweets became a beloved part of Ramadan celebrations across the Washington DC metro area.',
    image: 'https://placehold.co/1200x500/A67A2E/FFFFFF?text=Ramadan+Sweets',
    content: "In the DMV area, Ramadan brings together Muslim communities from across the world — and Egyptian sweets have become a beloved part of the iftar tradition. From qatayef pancakes to om ali, these desserts carry the warmth of a shared cultural memory.\n\nQatayef — small folded pancakes filled with nuts or cream — are perhaps the most iconic Ramadan sweet. They appear in markets and kitchens from the first day of the month. At Joe Sweets, we make them fresh each evening during Ramadan season.\n\nOm Ali, Egypt's beloved bread pudding layered with puff pastry, nuts, coconut, and cream, is another staple that we bring to tables across DC, Maryland, and Virginia.\n\nFood during Ramadan is never just food. It's reunion, gratitude, and generosity expressed in every serving.",
  },
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, images: [post.image] },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) notFound();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)', paddingBottom: '5rem' }}>
      {/* Hero image */}
      <div style={{ position: 'relative', height: 'clamp(260px, 40vw, 440px)' }}>
        <Image src={post.image} alt={post.title} fill priority style={{ objectFit: 'cover' }} sizes="100vw" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(44,24,16,0.3) 0%, rgba(44,24,16,0.85) 100%)' }} />
        {/* Overlay text */}
        <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '700px', padding: '0 1.5rem', textAlign: 'center' }}>
          <span style={{ display: 'inline-block', background: 'linear-gradient(135deg, var(--color-primary), #A67A2E)', color: 'white', padding: '0.2rem 0.8rem', borderRadius: '999px', fontSize: '0.72rem', fontWeight: 600, fontFamily: 'var(--font-body)', marginBottom: '0.875rem' }}>
            {post.category}
          </span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: 'white', margin: 0, lineHeight: 1.25 }}>
            {post.title}
          </h1>
        </div>
      </div>

      {/* Article card */}
      <div style={{ maxWidth: '720px', margin: '-2rem auto 0', position: 'relative', padding: '0 1.5rem' }}>
        <div style={{ backgroundColor: 'var(--color-white)', borderRadius: '20px', padding: 'clamp(1.75rem, 5vw, 3rem)', boxShadow: '0 12px 50px rgba(44,24,16,0.12)' }}>
          {/* Meta */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--color-muted)', margin: 0 }}>
              {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--color-muted)', display: 'inline-block' }} />
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--color-muted)', margin: 0 }}>{post.readTime}</p>
          </div>

          <EgyptianDivider />

          {/* Content */}
          <div style={{ marginTop: '1.75rem' }}>
            {post.content.split('\n\n').map((para, i) => (
              <p key={i} style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', color: 'var(--color-secondary)', lineHeight: 1.85, marginBottom: '1.25rem', marginTop: 0, opacity: 0.88 }}>
                {para}
              </p>
            ))}
          </div>

          {/* Pull quote */}
          <div style={{ borderLeft: '4px solid var(--color-primary)', paddingLeft: '1.25rem', margin: '2rem 0', backgroundColor: 'var(--color-bg-alt)', padding: '1.25rem 1.25rem 1.25rem 1.5rem', borderRadius: '0 10px 10px 0' }}>
            <p style={{ fontFamily: 'var(--font-script)', fontSize: '1.1rem', color: 'var(--color-primary)', margin: 0, fontStyle: 'italic' }}>
              Made fresh, daily — because flavor only lives in the present.
            </p>
          </div>

          {/* Share buttons */}
          <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(200,150,62,0.12)' }}>
            <ShareButtons
              title={post.title}
              url={`https://joe-sweets.com/blog/${slug}`}
            />
          </div>

          {/* Back + CTA */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginTop: '1.5rem' }}>
            <Link href="/blog" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500, fontSize: '0.9rem', fontFamily: 'var(--font-body)' }}>
              ← Back to Blog
            </Link>
            <Link href="/menu" style={{ display: 'inline-flex', alignItems: 'center', padding: '0.75rem 1.5rem', background: 'linear-gradient(135deg, var(--color-primary), #A67A2E)', color: 'white', borderRadius: '50px', textDecoration: 'none', fontWeight: 600, fontFamily: 'var(--font-body)', fontSize: '0.9rem' }}>
              Order Now →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
