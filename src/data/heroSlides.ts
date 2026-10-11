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
  product?: Product;
}

// Phase 5.0: exactly these 5 products, in this order
const heroSlugs = ['amour', 'raat-ki-rani', 'noor', 'resham-oudh', 'atlas'];

export const heroSlides: HeroSlide[] = heroSlugs
  .map((slug) => {
    const product = PRODUCTS.find((p) => p.slug === slug);
    if (!product) return null;
    return {
      id: `slide-${slug}`,
      slug,
      name: product.name,
      type: product.type,
      moment: product.occasion,
      line: product.shortDescription || product.tagline || '',
      img: slug,
      href: `/products/${slug}`,
      product,
    };
  })
  .filter(Boolean) as HeroSlide[];
