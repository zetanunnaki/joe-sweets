import reviewsData from '@/data/reviews.json';

export interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  text: string;
}

const reviews = reviewsData as Record<string, Review[]>;

export function getReviewsBySlug(slug: string): Review[] {
  return reviews[slug] ?? [];
}
