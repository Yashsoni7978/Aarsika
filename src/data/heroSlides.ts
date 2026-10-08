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
    // TODO: placeholder until the formulas are final
    line: 'Lemon and white florals.',
    img: 'hero-nayaab',
  },
  {
    id: 'slide-saaz',
    slug: 'saaz',
    name: 'Saaz',
    type: 'Eau de Parfum',
    moment: 'Day',
    // TODO: placeholder until the formulas are final
    line: 'Bergamot and white jasmine.',
    img: 'hero-saaz',
  },
  {
    id: 'slide-madhuri',
    slug: 'madhuri',
    name: 'Madhuri',
    type: 'Eau de Parfum',
    moment: 'Evening',
    // TODO: placeholder until the formulas are final
    line: 'Rose and oud.',
    img: 'hero-madhuri',
  },
  {
    id: 'slide-razmi',
    slug: 'razmi',
    name: 'Razmi',
    type: 'Eau de Parfum',
    moment: 'Night',
    // TODO: placeholder until the formulas are final
    line: 'Oud and amber resin.',
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
