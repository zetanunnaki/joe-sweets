import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Joe Sweets — Making Life Sweeter',
    short_name: 'Joe Sweets',
    description: 'Homemade Egyptian Food & Desserts — DMV Area | Fresh Daily | Delivery Available',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFF9F0',
    theme_color: '#C8963E',
    orientation: 'portrait',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
    categories: ['food', 'shopping'],
    lang: 'en',
    dir: 'ltr',
    prefer_related_applications: false,
  };
}
