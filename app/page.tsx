import { Hero } from '@/components/home/Hero';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { StatsStrip } from '@/components/home/StatsStrip';
import { HowItWorks } from '@/components/home/HowItWorks';
import { Testimonials } from '@/components/home/Testimonials';
import { LoyaltyTeaser } from '@/components/home/LoyaltyTeaser';
import { GiftBoxCTA } from '@/components/home/GiftBoxCTA';
import { InstagramFeed } from '@/components/home/InstagramFeed';
import { Newsletter } from '@/components/home/Newsletter';
import { FlashDeals } from '@/components/home/FlashDeals';
import { TrendingProducts } from '@/components/home/TrendingProducts';
import { SeasonalBanner } from '@/components/home/SeasonalBanner';

export default function HomePage() {
  return (
    <>
      <Hero />
      <SeasonalBanner />
      <CategoryGrid />
      <FeaturedProducts />
      <TrendingProducts />
      <StatsStrip />
      <FlashDeals />
      <HowItWorks />
      <Testimonials />
      <LoyaltyTeaser />
      <GiftBoxCTA />
      <InstagramFeed />
      <Newsletter />
    </>
  );
}
