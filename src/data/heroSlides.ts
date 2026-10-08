import { PRODUCTS, Product } from './products';

export interface HeroSlide {
  id: string;
  slug: string;
  name: string;
  type: string;
  moment: string;
  line: string;
  img: string;
  href: string;
}

// TODO: placeholder until the formulas are final
const rawHeroSlidesData = [
  {
    id: 'slide-nayaab',
    slug: 'nayaab',
    name: 'Nayaab',
    type: 'Eau de Parfum',
    moment: 'Every day',
    line: 'Lemon and white florals. Clean, rare, made for every day.',
    img: 'hero-nayaab',
  },
  {
    id: 'slide-saaz',
    slug: 'saaz',
    name: 'Saaz',
    type: 'Eau de Parfum',
    moment: 'Day',
    line: 'Citrus and white jasmine. Fresh, luminous, made for the day.',
    img: 'hero-saaz',
  },
  {
    id: 'slide-madhuri',
    slug: 'madhuri',
    name: 'Madhuri',
    type: 'Eau de Parfum',
    moment: 'Evening',
    line: 'Rose and oud. Warm, romantic, made for the evening.',
    img: 'hero-madhuri',
  },
  {
    id: 'slide-razmi',
    slug: 'razmi',
    name: 'Razmi',
    type: 'Eau de Parfum',
    moment: 'Night',
    line: 'Oud and amber resin. Deep, smoky, made for the night.',
    img: 'hero-razmi',
  },
];

export const heroSlides: HeroSlide[] = rawHeroSlidesData.map((slide) => {
  const productExists = PRODUCTS.some((p: Product) => p.slug === slide.slug);
  return {
    ...slide,
    href: productExists ? `/products/${slide.slug}` : '/perfumes',
  };
});
