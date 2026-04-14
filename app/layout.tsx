import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/components/layout/CartProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { Toaster } from '@/components/ui/Toaster';
import { BackToTop } from '@/components/ui/BackToTop';
import { Analytics } from '@/components/layout/Analytics';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { JsonLd } from '@/components/ui/JsonLd';
import { CookieConsent } from '@/components/layout/CookieConsent';
import { CompareTray } from '@/components/product/CompareTray';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { NewsletterPopup } from '@/components/ui/NewsletterPopup';
import { SocialProofToast } from '@/components/ui/SocialProofToast';

export const metadata: Metadata = {
  title: {
    default: 'Joe Sweets — Making Life Sweeter',
    template: '%s | Joe Sweets',
  },
  description: 'Homemade Egyptian Food & Desserts — DMV Area | Fresh Daily | Delivery Available',
  keywords: ['Egyptian food', 'Egyptian desserts', 'baklava', 'kunafa', 'DMV', 'delivery'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://joe-sweets.com',
    siteName: 'Joe Sweets',
    title: 'Joe Sweets — Making Life Sweeter',
    description: 'Homemade Egyptian Food & Desserts — DMV Area | Fresh Daily | Delivery Available',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Joe Sweets — Making Life Sweeter',
    description: 'Homemade Egyptian Food & Desserts',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <JsonLd data={{
          '@context': 'https://schema.org',
          '@type': 'FoodEstablishment',
          name: 'Joe Sweets',
          description: 'Homemade Egyptian Food & Desserts — DMV Area | Fresh Daily | Delivery Available',
          url: 'https://joe-sweets.com',
          telephone: '+12025550000',
          servesCuisine: 'Egyptian',
          priceRange: '$$',
          address: { '@type': 'PostalAddress', addressRegion: 'DC', addressCountry: 'US' },
          areaServed: ['Washington DC', 'Maryland', 'Virginia'],
          openingHours: 'Mo-Sa 09:00-20:00',
          sameAs: ['https://www.instagram.com/joe.sweets_/'],
        }} />
      </head>
      <body>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <ScrollProgress />
        <AnnouncementBar />
        <CartProvider>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <CartDrawer />
          <WhatsAppButton />
          <Toaster />
          <BackToTop />
          <CookieConsent />
          <CompareTray />
          <MobileBottomNav />
          <NewsletterPopup />
          <SocialProofToast />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  );
}
