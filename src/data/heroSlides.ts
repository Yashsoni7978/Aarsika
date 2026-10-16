export interface HeroSlide {
  id: string;
  slideNumber: number;
  eyebrow: string;
  headline: string;
  headlineAccent?: string;
  headlineAfterAccent?: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  desktopImage: string;
  tabletImage: string;
  mobileImage: string;
  alt: string;
  sourceFilename: string;
  mobileSourceFilename: string;
  productName: string;
  depiction: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'amour',
    slideNumber: 1,
    eyebrow: 'THE ART OF ATTRACTION',
    headline: 'Fragrance That Stays With',
    headlineAccent: 'Your',
    headlineAfterAccent: 'Story.',
    description: 'Romantic, warm and unforgettable. Discover a scent that turns fleeting moments into lasting memories.',
    ctaText: 'DISCOVER AMOUR',
    ctaLink: '/products/amour',
    desktopImage: '/photos/hero/hero-amour.webp',
    tabletImage: '/photos/hero/hero-amour-tablet.webp',
    mobileImage: '/photos/hero/hero-amour-mobile.webp',
    alt: 'Aarsika Amour Eau de Parfum in Golden Palace Courtyard',
    sourceFilename: 'Aarsika Amour Perfume in Golden Courtyard.png',
    mobileSourceFilename: 'Aarsika Amour in Golden Palace Light.png',
    productName: 'Aarsika Amour Eau de Parfum (50 ml)',
    depiction: 'Individual AMOUR amber perfume bottle resting on a marble pedestal with red rose petals and Moorish palace arches in warm golden light.',
  },
  {
    id: 'atlas',
    slideNumber: 2,
    eyebrow: 'MADE TO LEAVE AN IMPRESSION',
    headline: 'Make Your Presence',
    headlineAccent: 'Unmistakable.',
    headlineAfterAccent: '',
    description: 'Bold character. Refined depth. A confident signature crafted for those who leave an impression.',
    ctaText: 'EXPLORE ATLAS',
    ctaLink: '/products/atlas',
    desktopImage: '/photos/hero/hero-atlas.webp',
    tabletImage: '/photos/hero/hero-atlas-tablet.webp',
    mobileImage: '/photos/hero/hero-atlas-mobile.webp',
    alt: 'Aarsika Atlas Eau de Parfum in Golden Palace Courtyard',
    sourceFilename: 'Aarsika Atlas in a Golden Palace Courtyard.png',
    mobileSourceFilename: 'Royal Courtyard Atlas Perfume Ad.png',
    productName: 'Aarsika Atlas Eau de Parfum (50 ml)',
    depiction: 'Individual aquatic blue ATLAS perfume bottle resting on a marble and gold platter beside white jasmine blooms in a sunset palace courtyard.',
  },
  {
    id: 'perfume-collection',
    slideNumber: 3,
    eyebrow: 'DISCOVER YOUR SIGNATURE',
    headline: 'Your Signature.',
    headlineAccent: 'Your',
    headlineAfterAccent: 'Scent.',
    description: 'From captivating florals to rich, sophisticated blends, find the fragrance that feels unmistakably you.',
    ctaText: 'EXPLORE PERFUMES',
    ctaLink: '/collections/perfumes',
    desktopImage: '/photos/hero/hero-perfume-collection.webp',
    tabletImage: '/photos/hero/hero-perfume-collection-tablet.webp',
    mobileImage: '/photos/hero/hero-perfume-collection-mobile.webp',
    alt: 'Aarsika Perfume Collection Velvet Presentation Coffret at Sunset',
    sourceFilename: 'Aarsika Perfume Collection at Sunset.png',
    mobileSourceFilename: 'Aarsika Royal Perfume Collection.png',
    productName: 'Aarsika Perfume Collection Coffret',
    depiction: 'Open burgundy velvet presentation coffret box showcasing four signature perfumes (Amour, Roman, Noor, Saira) with the Aarsika gold crest on the lid.',
  },
  {
    id: 'house-collection',
    slideNumber: 4,
    eyebrow: 'THE WORLD OF AARSIKA',
    headline: 'A World of Fragrance.',
    headlineAccent: 'One',
    headlineAfterAccent: 'House.',
    description: 'Meet the AARSIKA collection—distinctive scents created for different moods, moments and memories.',
    ctaText: 'DISCOVER THE HOUSE',
    ctaLink: '/collections',
    desktopImage: '/photos/hero/hero-house-collection.webp',
    tabletImage: '/photos/hero/hero-house-collection-tablet.webp',
    mobileImage: '/photos/hero/hero-house-collection-mobile.webp',
    alt: 'The House of Aarsika Fragrance Collection in Golden Palace Light',
    sourceFilename: 'Aarsika Perfumes combo in Golden Palace Light.png',
    mobileSourceFilename: 'Aarsika Perfumes in a Regal Courtyard.png',
    productName: 'The House of Aarsika Fragrance Line',
    depiction: 'Five distinctive house perfumes (Mehfil, Atlas, Amour, Roman, Saira) arranged together across marble pedestals beneath golden palace arches.',
  },
  {
    id: 'discovery-set-10',
    slideNumber: 5,
    eyebrow: 'YOUR FRAGRANCE JOURNEY STARTS HERE',
    headline: 'Find the Scent That Feels Like',
    headlineAccent: 'You.',
    headlineAfterAccent: '',
    description: 'Explore a curated selection of fragrances and discover your next signature scent, one spray at a time.',
    ctaText: 'SHOP THE DISCOVERY SET',
    ctaLink: '/products/the-royal-perfume-sampler',
    desktopImage: '/photos/hero/hero-discovery-set-10.webp',
    tabletImage: '/photos/hero/hero-discovery-set-10-tablet.webp',
    mobileImage: '/photos/hero/hero-discovery-set-10-mobile.webp',
    alt: 'Aarsika Perfume Discovery Set 10 Piece in Burgundy Chest at Sunset',
    sourceFilename: 'Aarsika Perfume Discovery Set at Sunset 10 piece.png',
    mobileSourceFilename: 'Aarsika Royal Sunset Discovery Set.png',
    productName: 'The Royal Perfume Sampler (10 × 2 ml Discovery Set)',
    depiction: 'Burgundy velvet presentation chest open with ten 2 ml Eau de Parfum atomizer spray vials on a sunset terrace.',
  },
  {
    id: 'discovery-set-5',
    slideNumber: 6,
    eyebrow: 'MORE TO DISCOVER',
    headline: 'Five Fragrances. Endless',
    headlineAccent: 'Possibilities.',
    headlineAfterAccent: '',
    description: 'Explore five distinctive scents and make room for a new favourite in your everyday ritual.',
    ctaText: 'EXPLORE THE DISCOVERY SET',
    ctaLink: '/products/the-discovery-gift-set',
    desktopImage: '/photos/hero/hero-discovery-set-5.webp',
    tabletImage: '/photos/hero/hero-discovery-set-5-tablet.webp',
    mobileImage: '/photos/hero/hero-discovery-set-5-mobile.webp',
    alt: 'Aarsika Discovery Set 5 Larger Vials at Sunset',
    sourceFilename: 'Aarsika Perfume Discovery Set at Sunset.png',
    mobileSourceFilename: 'Aarsika Discovery Set at Sunset.png',
    productName: 'The Discovery Gift Set (5 × 12 ml Flacons)',
    depiction: 'Pale pink presentation box with burgundy floral patterns housing five larger 12 ml flacons on a sunlit marble terrace with brass lantern.',
  },
  {
    id: 'sehar-e-gulab',
    slideNumber: 7,
    eyebrow: 'THE POETRY OF ROSE',
    headline: 'The Timeless Romance of',
    headlineAccent: 'Rose.',
    headlineAfterAccent: '',
    description: 'Discover a rose-inspired attar that brings floral richness and timeless elegance to your fragrance ritual.',
    ctaText: 'DISCOVER SEHAR-E-GULAB',
    ctaLink: '/products/sehar-e-gulab',
    desktopImage: '/photos/hero/hero-sehar-e-gulab.webp',
    tabletImage: '/photos/hero/hero-sehar-e-gulab-tablet.webp',
    mobileImage: '/photos/hero/hero-sehar-e-gulab-mobile.webp',
    alt: 'Aarsika Sehar E Gulab Pure Attar at Sunset',
    sourceFilename: 'Aarsika Sehar Gulab Attar at Sunset.png',
    mobileSourceFilename: 'Aarsika Sehar Gulab Attar at Sunset.png',
    productName: 'Aarsika Sehar E Gulab Attar (30 ml)',
    depiction: 'Individual multifaceted ruby crystal attar flacon on a sunlit marble balustrade as warm light streams over fresh roses.',
  },
  {
    id: 'attar-collection',
    slideNumber: 8,
    eyebrow: 'ROOTED IN FRAGRANCE TRADITION',
    headline: 'Tradition, Bottled',
    headlineAccent: 'Beautifully.',
    headlineAfterAccent: '',
    description: 'Discover expressive attars inspired by rich fragrance traditions and reimagined for the modern connoisseur.',
    ctaText: 'EXPLORE ATTARS',
    ctaLink: '/collections/attar',
    desktopImage: '/photos/hero/hero-attar-collection.webp',
    tabletImage: '/photos/hero/hero-attar-collection-tablet.webp',
    mobileImage: '/photos/hero/hero-attar-collection-mobile.webp',
    alt: 'Aarsika Pure Attar Collection at Sunset',
    sourceFilename: 'Aarsika Attar Collection at Sunset.png',
    mobileSourceFilename: 'Opulent Attar Collection at Sunset.png',
    productName: 'Aarsika Pure Attar Collection',
    depiction: 'Tiered marble steps presenting eight jewel-toned crystal flacon attars overlooking a palatial golden sunset courtyard.',
  },
  {
    id: 'amber-crimson-navy',
    slideNumber: 9,
    eyebrow: 'FIND YOUR FRAGRANCE',
    headline: 'Every Bottle Holds a Different',
    headlineAccent: 'World.',
    headlineAfterAccent: '',
    description: 'From warm amber to deep crimson and midnight blue, explore a collection as individual as your taste.',
    ctaText: 'FIND YOUR ATTAR',
    ctaLink: '/collections/attar',
    desktopImage: '/photos/hero/hero-amber-crimson-navy.webp',
    tabletImage: '/photos/hero/hero-amber-crimson-navy-tablet.webp',
    mobileImage: '/photos/hero/hero-amber-crimson-navy-mobile.webp',
    alt: 'Aarsika Luxury Amber, Crimson and Navy Attars',
    sourceFilename: 'Luxury Amber, Crimson & Navy Attars.png',
    mobileSourceFilename: 'Opulent Palace Attar Collection.png',
    productName: 'Aarsika Statement Attar Trio (Amber, Crimson & Navy)',
    depiction: 'Trio of faceted crystal attars in warm amber (Tobacco Oudh), crimson (Shaam Ka Noor), and midnight navy (Raat Ki Rani) amidst white jasmine.',
  },
];

export const heroSlides = HERO_SLIDES;

export interface MobileHeroSlide {
  id: string;
  slideNumber: number;
  title: string;
  subtitle: string;
  productName: string;
  link: string;
  mobileWebp: string;
  mobileAvif: string;
  fallbackImage: string;
  alt: string;
  sourceFilename: string;
  aspectRatio: string;
  objectFitClass: string;
  objectPositionClass: string;
}

export const MOBILE_HERO_SLIDES: MobileHeroSlide[] = [
  {
    id: 'mobile-amour',
    slideNumber: 1,
    title: 'Amour — A Fragrance of Love',
    subtitle: 'Rose ❖ Oud ❖ Amber',
    productName: 'Aarsika Amour Eau de Parfum (50 ml)',
    link: '/products/amour',
    mobileWebp: '/photos/hero/mobile-amour-love.webp',
    mobileAvif: '/photos/hero/mobile-amour-love.avif',
    fallbackImage: '/photos/hero/mobile-amour-love.webp',
    alt: 'Aarsika Amour Eau de Parfum - A Fragrance of Love',
    sourceFilename: 'Amour_ A Fragrance of Love.png',
    aspectRatio: '4/5',
    objectFitClass: 'object-contain',
    objectPositionClass: 'object-center',
  },
  {
    id: 'mobile-scent-of-royalty',
    slideNumber: 2,
    title: 'Scent of Royalty — The Signature Collection',
    subtitle: 'Discover Your Signature Fragrance',
    productName: 'Aarsika Signature Perfumes (Mehfil, Atlas, Amour, Roman, Saira)',
    link: '/collections/perfumes',
    mobileWebp: '/photos/hero/mobile-scent-of-royalty.webp',
    mobileAvif: '/photos/hero/mobile-scent-of-royalty.avif',
    fallbackImage: '/photos/hero/mobile-scent-of-royalty.webp',
    alt: 'Aarsika Scent of Royalty - Luxury Signature Perfume Collection',
    sourceFilename: 'Scent of Royalty Perfume Collection.png',
    aspectRatio: '4/5',
    objectFitClass: 'object-contain',
    objectPositionClass: 'object-center',
  },
  {
    id: 'mobile-heritage-attar',
    slideNumber: 3,
    title: 'Heritage in Every Scent — Premium Attar Collection',
    subtitle: 'Timeless Fragrances Rooted in Tradition',
    productName: 'Aarsika Pure Attars (Tobacco Oudh, Shaam Ka Noor, Raat Ki Rani)',
    link: '/collections/attar',
    mobileWebp: '/photos/hero/mobile-heritage-attar.webp',
    mobileAvif: '/photos/hero/mobile-heritage-attar.avif',
    fallbackImage: '/photos/hero/mobile-heritage-attar.webp',
    alt: 'Aarsika Heritage in Every Scent - Pure Luxury Attars',
    sourceFilename: 'Heritage Attar Collection at Golden Hour.png',
    aspectRatio: '2/3',
    objectFitClass: 'object-contain',
    objectPositionClass: 'object-center',
  },
  {
    id: 'mobile-scent-for-every-story',
    slideNumber: 4,
    title: 'A Scent for Every Story — The Aarsika Attar House',
    subtitle: 'Discover the Art of Attar',
    productName: 'The Aarsika Pure Attar Range',
    link: '/collections/attar',
    mobileWebp: '/photos/hero/mobile-scent-for-every-story.webp',
    mobileAvif: '/photos/hero/mobile-scent-for-every-story.avif',
    fallbackImage: '/photos/hero/mobile-scent-for-every-story.webp',
    alt: 'The Aarsika Attar House - A Scent for Every Story',
    sourceFilename: 'A Scent for Every Story.png',
    aspectRatio: '9/16',
    objectFitClass: 'object-contain',
    objectPositionClass: 'object-center',
  },
  {
    id: 'mobile-fragrances-tradition',
    slideNumber: 5,
    title: 'Fragrances Rooted in Tradition — Perfume Discovery Set',
    subtitle: 'Scents for Every You — 10 × 3 ml',
    productName: 'The Royal Perfume Sampler (10 × 3 ml Discovery Chest)',
    link: '/products/the-royal-perfume-sampler',
    mobileWebp: '/photos/hero/mobile-fragrances-tradition.webp',
    mobileAvif: '/photos/hero/mobile-fragrances-tradition.avif',
    fallbackImage: '/photos/hero/mobile-fragrances-tradition.webp',
    alt: 'Aarsika Fragrances Rooted in Tradition - The Royal Perfume Sampler',
    sourceFilename: 'Fragrances Rooted in Tradition.png',
    aspectRatio: '9/16',
    objectFitClass: 'object-contain',
    objectPositionClass: 'object-center',
  },
  {
    id: 'mobile-discovery-set-sunset',
    slideNumber: 6,
    title: 'Find Your Signature — The Aarsika Edit',
    subtitle: 'A World of Fragrance, Waiting to Be Discovered — 5 × 12 ml',
    productName: 'The Discovery Gift Set (5 × 12 ml Flacons)',
    link: '/products/the-discovery-gift-set',
    mobileWebp: '/photos/hero/mobile-discovery-set-sunset.webp',
    mobileAvif: '/photos/hero/mobile-discovery-set-sunset.avif',
    fallbackImage: '/photos/hero/mobile-discovery-set-sunset.webp',
    alt: 'Aarsika Discovery Gift Set at Sunset - 5 x 12 ml Flacons',
    sourceFilename: 'Aarsika Discovery Set at Sunset.png',
    aspectRatio: '4/5',
    objectFitClass: 'object-contain',
    objectPositionClass: 'object-center',
  },
];

export const mobileHeroSlides = MOBILE_HERO_SLIDES;

